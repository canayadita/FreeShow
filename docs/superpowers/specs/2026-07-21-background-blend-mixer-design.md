# Background Blend Mixer — Design Spec

**Date:** 2026-07-21
**Feature:** Live multi-layer background blending (Resolume-style) for FreeShow+

## Goal

Let the operator combine 2+ background sources (photo, video, solid color, or live sources:
camera/NDI/Blackmagic/screen) into a single composited, continuously-live background using CSS
blend modes — so a handful of base assets can produce many distinct visual variations. Built and
previewed live in a dedicated workspace ("Mixer"), saved explicitly (not auto-saved), and then
reusable anywhere a normal background can be picked (Style background, per-slide background,
etc.) — the same integration point as any other media background.

## Background (existing systems reused)

- **Existing single-media blend**: `mediaStyle.blendMode` + `mediaStyle.blendColor` in
  `edit/values/media.ts` / `output/layers/Media.svelte` already does CSS `mix-blend-mode` for
  **one** media item against a flat color ("Resolume style" per the existing code comment). This
  spec generalizes that same CSS technique to a full **stack of N layers**, each optionally
  blended against everything under it.
- **Background rendering dispatch**: `output/layers/BackgroundMedia.svelte` routes by `data.type`
  (currently `"video"`/`"image"` → `Media.svelte`). Add `data.type === "blend"` → new
  `BlendBackground.svelte`.
- **Live capture components already built & reusable**: `Camera.svelte`,
  `drawer/live/NDIStream.svelte`, `drawer/live/BMDStream.svelte`, and PiP's existing
  screen-capture path (`sourceType: "screen"` on `Pane`/`PaneSourceType` in `types/Show.ts`).
- **Drawer-tab pattern**: PiP (`components/drawer/pip/PiP.svelte`, registered in
  `drawer/Navigation.svelte` + `drawer/Content.svelte` + `values/tabs.ts`) is the direct
  precedent for where Mixer lives, and its "Save Template" capture-then-persist flow
  (`multiPaneLayouts` store) is the same pattern as the Blend "Save" button.
- **Persistence pattern**: `looks`/`styles` SYNCED_SETTINGS mirror (`types/Save.ts`,
  `utils/save.ts`, `electron/data/defaults.ts`, `electron/cloud/syncManager.ts`,
  `utils/updateSettings.ts`) — `blends` follows the identical registration.

## Data model (new)

```ts
// types/Blend.ts
export interface BlendLayer {
    id: string
    sourceType: "image" | "video" | "color" | "camera" | "ndi" | "screen" | "blackmagic"
    sourcePath?: string     // image/video file path
    sourceId?: string       // camera / ndi / blackmagic device id
    color?: string          // sourceType "color"
    blendMode: string       // "" = Normal, else one of the 15 existing mix-blend-mode values
    opacity: number         // 0-100, default 100
    visible: boolean        // default true; hidden layers are skipped at render
}

export interface Blend {
    name: string
    layers: BlendLayer[]    // array order = stack order, index 0 = bottom
    index?: number          // display order in library
}
```

- `blends: Writable<{ [id: string]: Blend }>` — new persisted store (SYNCED_SETTINGS, mirrors
  `styles`/`looks`).
- No "activeBlend" concept needed (unlike Look) — once a Blend is picked as a background it
  behaves like any other background reference; there's nothing extra to highlight as "currently
  applied".

## Rendering & integration

- New `output/layers/BlendBackground.svelte`, sibling to `Media.svelte`. Prop: `blendId`. Reads
  `$blends[blendId]`, renders each **visible** layer bottom→top as a full-frame,
  absolutely-positioned div:
  - `image`/`video` → `Image.svelte`/`Video.svelte` (muted + looping, matching current
    background-video behavior)
  - `color` → flat `background: color` div
  - `camera` → `Camera.svelte`
  - `ndi` → `NdiStream.svelte`
  - `blackmagic` → `BmdStream.svelte`
  - `screen` → the same screen-capture mechanism PiP already uses for its `"screen"` pane
  - Every layer except the bottom gets `mix-blend-mode: {blendMode}` (when set) and
    `opacity: {opacity}%` applied inline.
- `BackgroundMedia.svelte`: add one branch — `data.type === "blend"` → render
  `<BlendBackground blendId={data.id} />`. Every existing background-consuming surface (Style
  background, per-slide background override, etc.) gets Blend support for free through this
  single dispatch point — no other call site needs to change.
- Wherever a background is currently picked (e.g. the `MaterialFilePicker` background field in
  `Styles.svelte`), add a "Blends" section listing `$blends` entries alongside images/videos;
  selecting one sets `{ type: "blend", id: blendId }` instead of a file path.

## Mixer workspace (new Drawer tab)

- Registered exactly like PiP: new entry in `values/tabs.ts` (name/icon), routed in
  `drawer/Content.svelte`, added to `drawer/Navigation.svelte`'s tab union type.
- New component `components/drawer/mixer/Mixer.svelte`, structurally mirroring `PiP.svelte`:
  - **Layer list** (top of list = top of stack, i.e. the list is displayed in reverse of the
    `layers` array order, matching a typical layers-panel convention): drag handle (reorder), visibility toggle,
    source-type dropdown with a contextual sub-picker (file picker for image/video, color input
    for color, device dropdown for camera/ndi/blackmagic, screen picker for screen), blend-mode
    dropdown (reuses the existing 15-option list from `edit/values/media.ts`), opacity slider,
    delete button. "+ Add Layer" button to append a new layer.
  - **Live preview**: renders `<BlendBackground>` fed the **draft** (unsaved) layer array
    directly — the same component used in production output, so the preview is exactly what will
    render once saved/used. Fully sandboxed: never touches any real `output`, so it's safe to
    tweak mid-service.
  - **Name field + Save button**: only on explicit Save does the draft get written to the
    `blends` store (create new, or update in place if editing an existing saved Blend opened from
    the library). Nothing persists while merely experimenting.
  - **Saved Blends grid**: below the editor, cards for each saved Blend (mirrors PiP's "Template
    Custom" grid) — click to load into the editor, delete button per card.

## Persistence

- `blends` registered in the same SYNCED_SETTINGS collection list as `looks`/`styles`
  (`types/Save.ts`, `utils/save.ts`, `electron/data/defaults.ts`, `electron/cloud/syncManager.ts`,
  `utils/updateSettings.ts`).
- Backward compatible: absent `blends` = empty object, Mixer just shows its empty state.

## File structure (planned)

- `src/types/Blend.ts` — `Blend`/`BlendLayer` interfaces.
- `src/frontend/stores.ts` — `blends` store.
- Persistence registration: `types/Save.ts`, `utils/save.ts`, `electron/data/defaults.ts`,
  `electron/cloud/syncManager.ts`, `utils/updateSettings.ts`.
- `src/frontend/components/output/layers/BlendBackground.svelte` — live stack renderer.
- `src/frontend/components/output/layers/BackgroundMedia.svelte` — add the `"blend"` dispatch
  branch.
- `src/frontend/components/drawer/mixer/Mixer.svelte` — the workspace.
- `src/frontend/components/drawer/Navigation.svelte`, `drawer/Content.svelte`, `values/tabs.ts` —
  register the new Drawer tab.
- `src/frontend/components/helpers/blends.ts` — pure/near-pure helpers: `saveBlend(draft,
  existingId?)`, `deleteBlend(id)`, layer add/remove/reorder helpers.
- Background-picker components (wherever a background `MaterialFilePicker` is used, starting with
  `Styles.svelte`) — add the "Blends" option.

## Testing

- Unit test the pure helpers in `blends.ts` (vitest): layer reorder, add/remove, save-as-new vs.
  update-existing.
- Manual/visual: this is fundamentally a live-rendering feature (CSS blend across multiple
  concurrent video/camera streams), so correctness is mostly verified by eye in the Mixer preview
  and in the real output — there's no meaningful way to unit-test the visual blend result itself.

## Non-goals (YAGNI for v1)

- No per-layer video trim/speed/crop controls beyond what's inherent (loop, muted) — reuses
  default background-video behavior; can be added later if needed.
- No nested Blends (a Blend layer cannot itself reference another Blend) for v1.
- No blend support inside PiP panes — Mixer and PiP stay separate tools with separate data
  models, per the earlier trade-off discussion (PiP is spatial composition; Mixer is full-frame
  blend composition).
- No auto-save/undo history for in-progress Mixer edits — the draft is lost if the app closes
  before Save (acceptable; matches the "session, then explicit save" request).

## Open considerations / risks

- **Performance**: stacking multiple concurrent video and/or live-capture (camera/NDI/Blackmagic/
  screen) layers, each blended via CSS `mix-blend-mode`, is meaningfully heavier than a single
  background — more so than the existing one-media-blend feature. Worth watching for frame-rate/
  CPU impact when a Blend has several live sources active at once; no specific mitigation planned
  for v1 beyond not rendering hidden layers.
- **Screen-capture layer**: needs to reuse whatever OS-level capture permission/flow PiP's
  `"screen"` pane already goes through; not expected to need new native/Electron work, but worth
  confirming during implementation.
