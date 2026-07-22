# Mixer "Show on Primary" + Media "Blend Selected" — Design Spec

**Date:** 2026-07-22
**Feature:** Two connected additions to the [[Background Blend Mixer]] feature for FreeShowPlus:
1. A one-click "Show on Primary" button inside the Mixer, pushing the current (auto-saved) Blend live to the active output(s).
2. A "Blend Selected" context-menu action in the Media drawer tab, letting the user multi-select 2+ existing media items and turn them straight into a Blend, opened ready-to-edit in the Mixer.

## Goal

Close the loop the Background Blend Mixer left open: today, using a Blend live requires manually going to Settings → Styles, picking the Blend, and clicking "Use style" — and building a Blend from scratch always starts from an empty Mixer, even when the two backgrounds the user wants to combine already exist in their Media library. This spec adds a direct "go live" action from the Mixer itself, and a direct "start a Blend from what I already have" action from Media.

## Background (existing systems reused)

- **`setOutput` / `getAllActiveOutputs`** (`src/frontend/components/helpers/output.ts`): the exact mechanism `MediaCard.svelte`'s plain-click handler already uses to push a media item live to the current output(s), instantly, with no Style involved:
  ```ts
  getAllActiveOutputs().forEach((output) => {
      setOutput("background", { path, type, loop, muted, startAt: 0, ...currentMediaStyle, ignoreLayer }, false, output.id)
  })
  ```
  `setOutput(type: string, data: any, toggle = false, outputId = "", add = false)`. For a Blend, the equivalent `data` is simply `{ type: "blend", id: blendId }` — `BackgroundMedia.svelte`'s existing `"blend"` dispatch branch (landed with the original Mixer plan) only reads `data.id`, so none of `MediaCard`'s media-specific fields (`loop`/`muted`/`currentMediaStyle`) apply.
- **Media multi-select**: already fully wired. `MediaCard.svelte` wraps each card in `<SelectElem id="media" class="context #media_card" data={{ name, path, type, contentProvider }} {shiftRange} draggable fill>`. Shift-click/Cmd-click accumulate into the shared `selected` store (`{ id: "media", data: [...] }` in `src/frontend/stores.ts`). No new selection code needed.
- **Context menu system**: menu contents per element are declared in `src/frontend/components/context/contextMenus.ts` (`contextMenuItems` for label/icon, per-target arrays like `media_card` for which items appear and in what order); per-item visibility/enable logic lives in `src/frontend/components/context/ContextItem.svelte`'s `conditions` object; the actual action runs in `src/frontend/components/context/menuClick.ts`'s `clickActions` object. The existing `createSlideshow` entry is the direct precedent for a "requires 2+ selected media items" action — same visibility condition, same `$selected.data` shape consumed.
- **Drawer tab switch + payload**: `activeDrawerTab` (`src/frontend/stores.ts`) selects the visible Drawer tab; `setDrawerTabData(tabId, data)` (`src/frontend/components/helpers/historyHelpers.ts`) stores a per-tab "active sub-item" in `drawerTabsData`, which `Content.svelte` already reads and forwards as the `active` prop to whichever tab component is rendered — including `<Mixer {active} />`, already wired end to end, just not yet consumed inside `Mixer.svelte`. This is the same pattern `Reference.svelte` uses to jump to the Scripture tab with a specific reference pre-loaded.
- **`saveBlend`/`BlendLayer`** (`src/frontend/components/helpers/blends.ts`, `src/types/Blend.ts`): unchanged, reused as-is for both new flows.

## Part A — "Show on Primary" button (Mixer)

- New button in `Mixer.svelte`'s `.save-row`, next to Save.
- On click:
  1. Ensure the current draft is saved: call `saveBlend(name, layers, editingId)`, which both persists it and returns the id (creating if `editingId` is empty, updating in place otherwise) — update local `editingId` with the result, exactly like the existing `save()` function already does.
  2. For each output in `getAllActiveOutputs()`, call `setOutput("background", { type: "blend", id }, false, output.id)`.
- No Style bookkeeping, no new data model — this is a straight reuse of the same instant "push to live output" mechanism `MediaCard.svelte` already uses for a single media file, just with a `{type:"blend", id}` payload instead of a raw media path.
- This means clicking "Show on Primary" **always** persists the current draft as a saved Blend first (there is no going live without it existing as a saved Blend somewhere) — consistent with the existing Mixer design principle that nothing reaches the real output silently/implicitly.

## Part B — "Blend Selected" (Media)

- New context-menu item `blend_selected`, added to `media_card`'s array in `contextMenus.ts` (label/icon entry in `contextMenuItems`, e.g. `{ label: "context.blend_selected", icon: "mixer" }`), positioned next to `createSlideshow` (same multi-select category).
- Visibility: hidden unless `$selected.id === "media" && $selected.data.length >= 2` — identical condition to `createSlideshow`'s, added to `ContextItem.svelte`'s `conditions` object.
- Action (`menuClick.ts`'s `clickActions.blend_selected`):
  1. Read `obj.sel.data` (array of `{ name, path, type, contentProvider }`, exactly what `createSlideshow` already reads from the same selection).
  2. Build one `BlendLayer` per selected item, in the order they appear in `$selected.data` (array index 0 = bottom of the stack). The exact resulting stack order is not load-bearing — it's trivially adjustable afterward via the Mixer's existing up/down layer controls:
     ```ts
     { id: uid(), sourceType: item.type === "video" ? "video" : "image", sourcePath: item.path, blendMode: "", opacity: 100, visible: true }
     ```
     (`item.type` is confirmed to already be the literal string `"video"`/`"image"` here — `createSlideshow` branches on it the same way.)
  3. `const blendId = saveBlend("New Blend", layers)` — persists immediately (so it shows up in the Mixer's "Saved Blends" grid right away, and survives even if the user never opens the Mixer).
  4. `setDrawerTabData("mixer", blendId)` then `activeDrawerTab.set("mixer")` — switches the Drawer to the Mixer tab with this Blend's id as its `activeSubTab`.
- **`Mixer.svelte` consumes `active`** (currently declared but unused): add
  ```ts
  $: if (active && $blends[active]) {
      loadBlend(active)
      setDrawerTabData("mixer", "")
  }
  ```
  near the existing `loadBlend` function. The `setDrawerTabData("mixer", "")` call immediately after loading clears `activeSubTab` back to empty — without this, `active` would keep holding the same blend id indefinitely, and since `Content.svelte` fully unmounts/remounts `Mixer.svelte` on every tab switch (its `{#if id === "mixer"}` block), a later *casual* re-visit to the Mixer tab (not via "Blend Selected") would keep re-loading that same old Blend instead of starting from the normal empty-draft state. Clearing it after the one-time auto-load restores the tab's normal behavior for all subsequent visits.

## File structure (planned)

- `src/frontend/components/drawer/mixer/Mixer.svelte` — add the "Show on Primary" button + handler; add the `active`-consuming reactive block.
- `src/frontend/components/context/contextMenus.ts` — add `blend_selected` to `contextMenuItems` and to the `media_card` array.
- `src/frontend/components/context/ContextItem.svelte` — add the `blend_selected` visibility condition.
- `src/frontend/components/context/menuClick.ts` — add the `blend_selected` action.
- `public/lang/en.json`, `public/lang/id_ID.json` — add the `context.blend_selected` label (English text in both, per this project's established convention).

## Testing

- No new pure logic worth unit-testing in isolation here (both additions are thin glue over already-tested helpers: `saveBlend`, `setOutput`, `getAllActiveOutputs`, the context-menu system). Verified by eye: select 2+ media items → right-click → "Blend Selected" appears only then → clicking it opens Mixer with both as layers → "Show on Primary" pushes the visible result to the real output.

## Non-goals (YAGNI for this pass)

- No auto-generated Blend name from the source filenames — stays "New Blend", renamable same as today.
- No confirmation dialog before "Show on Primary" overwrites the current live output — matches the existing precedent (`MediaCard`'s plain click already does this instantly, no confirmation).
- "Blend Selected" only ever produces layers from `image`/`video` media items — camera/NDI/screen/Blackmagic layers still require manual setup inside the Mixer, unchanged.
