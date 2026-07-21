# Background Blend Mixer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let the operator combine 2+ background sources (photo, video, solid color, camera, NDI, screen, Blackmagic) into a single, continuously-live composited background using CSS blend modes, built in a new dedicated "Mixer" Drawer tab, saved explicitly, and reusable anywhere a background can be picked.

**Architecture:** New `Blend` entity (name + ordered list of layers, each with a source + blend mode + opacity), persisted exactly like the existing `Look`/`Style` stores. A new `BlendBackground.svelte` renderer stacks each layer as a full-frame absolutely-positioned element with CSS `mix-blend-mode`, reusing the exact same source components (`Camera`, `NdiStream`, `BmdStream`, `Window`, `Media`) that `MultiPaneLayer.svelte` already uses for PiP. The Mixer workspace is a new Drawer tab (sibling to PiP) that edits an unsaved draft and feeds it straight into `BlendBackground` for a live, sandboxed preview — nothing touches the real output until "Save" is pressed.

**Tech Stack:** Svelte, TypeScript, vitest (for the pure-logic unit tests). No Electron/native changes.

**Spec:** `docs/superpowers/specs/2026-07-21-background-blend-mixer-design.md`

---

## Reference: exact behavior this plan reuses

These are not tasks — they're facts confirmed by reading the actual code, needed to understand why later tasks are written the way they are:

- `edit/values/media.ts` already has a single-media-vs-color blend feature (`blendMode`/`blendColor`, CSS `mix-blend-mode`, comment says "Resolume style"). This plan generalizes that same CSS technique to N layers.
- `output/layers/MultiPaneLayer.svelte` (PiP's renderer) already renders `camera`/`screen`/`ndi`/`blackmagic`/`video`/`image` sources using `Camera.svelte`, `Window.svelte`, `NdiStream.svelte`, `BmdStream.svelte`, and `Media.svelte` respectively. `BlendBackground.svelte` (Task 6) copies these exact same render branches.
- PiP's own layer-source picker (`components/drawer/pip/PiP.svelte`) only wires up a device dropdown for `camera` and `ndi` — `screen` and `blackmagic` have no source-id picker UI yet in this codebase. This plan matches that same scope (no screen/blackmagic device picker) rather than inventing new device-enumeration UI that doesn't exist anywhere else in the app.
- Style backgrounds do **not** flow through the same `{type, id}` dispatch as per-slide backgrounds. `Output.svelte` builds `styleBackgroundData` from `currentStyle.backgroundImage` (a plain file-path string). Task 8 adds a sibling `backgroundBlend` field instead of overloading that string field.
- Per-slide background picking (dragging media onto a slide) is a separate, not-yet-traced UI surface. **Out of scope for this plan** — only the Style background picker is wired up as the concrete example, matching the spec's non-goals.

---

### Task 1: Data model

**Files:**
- Create: `src/types/Blend.ts`
- Modify: `src/types/Show.ts:659`

- [ ] **Step 1: Create the `Blend`/`BlendLayer` types**

```ts
// src/types/Blend.ts
export type BlendSourceType = "image" | "video" | "color" | "camera" | "ndi" | "screen" | "blackmagic"

export interface BlendLayer {
    id: string
    sourceType: BlendSourceType
    sourcePath?: string // image/video file path
    sourceId?: string // camera/ndi/screen/blackmagic device id
    color?: string // sourceType "color"
    blendMode: string // "" = Normal, else a CSS mix-blend-mode value
    opacity: number // 0-100
    visible: boolean
}

export interface Blend {
    name: string
    layers: BlendLayer[] // stack order, index 0 = bottom
    index?: number // display order in the saved-blends list
}
```

- [ ] **Step 2: Add `"blend"` to `MediaType`**

In `src/types/Show.ts:659`, change:

```ts
export type MediaType = "media" | "video" | "image" | "effect" | "screen" | "ndi" | "camera" | "player" | "audio"
```

to:

```ts
export type MediaType = "media" | "video" | "image" | "effect" | "screen" | "ndi" | "camera" | "player" | "audio" | "blend"
```

- [ ] **Step 3: Commit**

```bash
git add src/types/Blend.ts src/types/Show.ts
git commit -m "feat(mixer): add Blend/BlendLayer types"
```

---

### Task 2: `blends` store

**Files:**
- Modify: `src/frontend/stores.ts:13` (import), `src/frontend/stores.ts:70` (store)

- [ ] **Step 1: Add the import**

In `src/frontend/stores.ts:13`, next to the existing `Look` import:

```ts
import type { Look } from "../types/Look"
```

add directly below it:

```ts
import type { Blend } from "../types/Blend"
```

- [ ] **Step 2: Add the store**

In `src/frontend/stores.ts:70`, next to the existing `looks` store:

```ts
export const looks: Writable<{ [key: string]: Look }> = writable({})
```

add directly below it:

```ts
export const blends: Writable<{ [key: string]: Blend }> = writable({})
```

- [ ] **Step 3: Commit**

```bash
git add src/frontend/stores.ts
git commit -m "feat(mixer): add blends store"
```

---

### Task 3: Persistence wiring

Mirrors exactly how `looks`/`styles` are registered — five files, each adding one `blends` entry alongside the existing `looks` entry.

**Files:**
- Modify: `src/types/Save.ts:18`
- Modify: `src/frontend/utils/save.ts` (import list, `getSyncedSettings()`, `allSavedData`)
- Modify: `src/electron/data/defaults.ts:111`
- Modify: `src/electron/cloud/syncManager.ts:71`
- Modify: `src/frontend/utils/updateSettings.ts` (import list, load-apply switch)

- [ ] **Step 1: Register the save-list type**

In `src/types/Save.ts:17-18`:

```ts
    | "styles"
    | "looks"
```

change to:

```ts
    | "styles"
    | "looks"
    | "blends"
```

- [ ] **Step 2: Import the store in `save.ts`**

In `src/frontend/utils/save.ts`, the store import block currently reads (around line 21):

```ts
    audioPlaylists,
    multiPaneLayouts,
    autoOutput,
    autosave,
    calendarAddShow,
```

change to:

```ts
    audioPlaylists,
    multiPaneLayouts,
    autoOutput,
    autosave,
    blends,
    calendarAddShow,
```

- [ ] **Step 3: Add `blends` to `getSyncedSettings()`**

In `src/frontend/utils/save.ts`, around line 244-256:

```ts
export function getSyncedSettings(): { [key in SaveListSyncedSettings]: any } {
    return {
        categories,
        drawSettings,
        groups,
        overlayCategories,
        scriptures,
        scriptureSettings,
        templateCategories,
        styles,
        looks,
        profiles,
```

change `styles,\n        looks,` to:

```ts
        styles,
        looks,
        blends,
```

- [ ] **Step 4: Add `blends` to the `allSavedData` object**

In `src/frontend/utils/save.ts`, around line 456-458:

```ts
    styles,
    looks,
    profiles,
```

change to:

```ts
    styles,
    looks,
    blends,
    profiles,
```

- [ ] **Step 5: Add the default value**

In `src/electron/data/defaults.ts:110-111`:

```ts
    styles: {},
    looks: {},
```

change to:

```ts
    styles: {},
    looks: {},
    blends: {},
```

- [ ] **Step 6: Add to the cloud-sync collections list**

In `src/electron/cloud/syncManager.ts:71`:

```ts
const SYNCED_SETTINGS_COLLECTIONS = ["categories", "overlayCategories", "templateCategories", "styles", "looks", "profiles", "timers", "variables", "audioStreams", "audioPlaylists", "scriptures", "groups", "midiIn", "emitters", "playerVideos", "videoMarkers", "mediaTags", "playerTags", "actionTags", "variableTags", "timerTags", "customizedIcons", "globalTags", "globalRegexes", "customMetadata", "effects"]
```

change `"styles", "looks",` to `"styles", "looks", "blends",`.

- [ ] **Step 7: Import in `updateSettings.ts`**

In `src/frontend/utils/updateSettings.ts`, around line 78-79:

```ts
    styles,
    looks,
```

change to:

```ts
    styles,
    looks,
    blends,
```

- [ ] **Step 8: Add the load-apply case**

In `src/frontend/utils/updateSettings.ts:395`:

```ts
    looks: (v: any) => looks.set(v),
```

add directly below it:

```ts
    blends: (v: any) => blends.set(v),
```

- [ ] **Step 9: Typecheck**

Run: `npx svelte-check --tsconfig ./tsconfig.json 2>&1 | tail -30`
Expected: no new errors mentioning `blends` or `Blend`.

- [ ] **Step 10: Commit**

```bash
git add src/types/Save.ts src/frontend/utils/save.ts src/electron/data/defaults.ts src/electron/cloud/syncManager.ts src/frontend/utils/updateSettings.ts
git commit -m "feat(mixer): persist blends (SYNCED_SETTINGS, mirrors looks/styles)"
```

---

### Task 4: Pure blend helpers (TDD)

**Files:**
- Create: `src/frontend/components/helpers/blendsMath.ts`
- Test: `src/frontend/components/helpers/blendsMath.test.ts`

- [ ] **Step 1: Write the failing tests**

```ts
// src/frontend/components/helpers/blendsMath.test.ts
import { describe, expect, it } from "vitest"
import { hasValidSource, moveLayer } from "./blendsMath"

describe("moveLayer", () => {
    const layers = [{ id: "a" }, { id: "b" }, { id: "c" }] as any

    it("moves a layer up (toward the end of the array = higher in the stack)", () => {
        const result = moveLayer(layers, 0, "up")
        expect(result.map((l) => l.id)).toEqual(["b", "a", "c"])
    })

    it("moves a layer down (toward the start of the array = lower in the stack)", () => {
        const result = moveLayer(layers, 2, "down")
        expect(result.map((l) => l.id)).toEqual(["a", "c", "b"])
    })

    it("does nothing when already at the top", () => {
        const result = moveLayer(layers, 2, "up")
        expect(result.map((l) => l.id)).toEqual(["a", "b", "c"])
    })

    it("does nothing when already at the bottom", () => {
        const result = moveLayer(layers, 0, "down")
        expect(result.map((l) => l.id)).toEqual(["a", "b", "c"])
    })

    it("does not mutate the original array", () => {
        moveLayer(layers, 0, "up")
        expect(layers.map((l) => l.id)).toEqual(["a", "b", "c"])
    })
})

describe("hasValidSource", () => {
    it("requires a color for sourceType color", () => {
        expect(hasValidSource({ sourceType: "color", color: "" } as any)).toBe(false)
        expect(hasValidSource({ sourceType: "color", color: "#00ff00" } as any)).toBe(true)
    })

    it("requires sourcePath for image/video", () => {
        expect(hasValidSource({ sourceType: "image", sourcePath: "" } as any)).toBe(false)
        expect(hasValidSource({ sourceType: "video", sourcePath: "/a.mp4" } as any)).toBe(true)
    })

    it("requires sourceId for camera/ndi/screen/blackmagic", () => {
        expect(hasValidSource({ sourceType: "camera", sourceId: "" } as any)).toBe(false)
        expect(hasValidSource({ sourceType: "ndi", sourceId: "dev1" } as any)).toBe(true)
    })
})
```

- [ ] **Step 2: Run the tests and confirm they fail**

Run: `npx vitest run --config config/testing/vitest.config.ts src/frontend/components/helpers/blendsMath.test.ts`
Expected: FAIL — `blendsMath.ts` does not exist yet.

- [ ] **Step 3: Implement the pure helpers**

```ts
// src/frontend/components/helpers/blendsMath.ts
// Pure, store-free logic for the Background Blend Mixer, mirroring looksMath.ts —
// kept separate from blends.ts (which pulls in the store) so it's unit-testable in isolation.
import type { BlendLayer } from "../../../types/Blend"

// Swap a layer with its neighbor. "up" = toward the end of the array (higher in the
// stack, displayed nearer the top of the Mixer's layer list). "down" = the opposite.
export function moveLayer(layers: BlendLayer[], index: number, direction: "up" | "down"): BlendLayer[] {
    const targetIndex = direction === "up" ? index + 1 : index - 1
    if (index < 0 || index >= layers.length || targetIndex < 0 || targetIndex >= layers.length) return layers

    const result = [...layers]
    const temp = result[index]
    result[index] = result[targetIndex]
    result[targetIndex] = temp
    return result
}

// A layer only renders once it actually has a source configured.
export function hasValidSource(layer: Pick<BlendLayer, "sourceType" | "sourcePath" | "sourceId" | "color">): boolean {
    if (layer.sourceType === "color") return !!layer.color
    if (layer.sourceType === "image" || layer.sourceType === "video") return !!layer.sourcePath
    return !!layer.sourceId
}
```

- [ ] **Step 4: Run the tests and confirm they pass**

Run: `npx vitest run --config config/testing/vitest.config.ts src/frontend/components/helpers/blendsMath.test.ts`
Expected: PASS — all 8 tests green.

- [ ] **Step 5: Commit**

```bash
git add src/frontend/components/helpers/blendsMath.ts src/frontend/components/helpers/blendsMath.test.ts
git commit -m "feat(mixer): add blendsMath pure helpers (moveLayer, hasValidSource) + tests"
```

---

### Task 5: Store-touching blend helpers

**Files:**
- Create: `src/frontend/components/helpers/blends.ts`

- [ ] **Step 1: Implement `createLayer`, `saveBlend`, `deleteBlend`**

```ts
// src/frontend/components/helpers/blends.ts
import { get } from "svelte/store"
import { uid } from "uid"
import type { BlendLayer } from "../../../types/Blend"
import { blends } from "../../stores"
import { hasValidSource } from "./blendsMath"

export function createLayer(): BlendLayer {
    return { id: uid(), sourceType: "image", blendMode: "", opacity: 100, visible: true }
}

// Create or update a Blend from the Mixer's draft state. Layers with no source configured
// are dropped on save. Returns the saved id (existingId if updating, a new id otherwise).
export function saveBlend(name: string, layers: BlendLayer[], existingId = ""): string {
    const id = existingId || uid()
    const index = existingId ? get(blends)[existingId]?.index : Object.keys(get(blends)).length

    blends.update((a) => {
        a[id] = { name: name.trim() || "New Blend", layers: layers.filter(hasValidSource), index }
        return a
    })
    return id
}

export function deleteBlend(id: string) {
    blends.update((a) => {
        delete a[id]
        return a
    })
}
```

- [ ] **Step 2: Commit**

```bash
git add src/frontend/components/helpers/blends.ts
git commit -m "feat(mixer): add blends.ts (createLayer, saveBlend, deleteBlend)"
```

---

### Task 6: `BlendBackground.svelte` renderer

**Files:**
- Create: `src/frontend/components/output/layers/BlendBackground.svelte`

- [ ] **Step 1: Implement the component**

```svelte
<script lang="ts">
    import type { Blend } from "../../../../types/Blend"
    import { blends } from "../../../stores"
    import BmdStream from "../../drawer/live/BMDStream.svelte"
    import NdiStream from "../../drawer/live/NDIStream.svelte"
    import { hasValidSource } from "../../helpers/blendsMath"
    import Camera from "../Camera.svelte"
    import Window from "../Window.svelte"
    import Media from "./Media.svelte"

    export let blendId = ""
    // Optional override: render this data directly instead of looking `blendId` up in the
    // store. Used by the Mixer's sandboxed live preview, which edits an unsaved draft and
    // must never touch the real `blends` store or the real output.
    export let blend: Blend | null = null
    export let mirror = false

    $: resolvedBlend = blend || $blends[blendId]
    $: layers = resolvedBlend?.layers || []
</script>

<div class="blendBackground">
    {#each layers as layer, i (layer.id)}
        {#if layer.visible !== false && hasValidSource(layer)}
            <div class="layer" style="opacity:{(layer.opacity ?? 100) / 100};{i > 0 && layer.blendMode ? `mix-blend-mode:${layer.blendMode};` : ''}">
                {#if layer.sourceType === "color"}
                    <div class="colorFill" style="background:{layer.color};"></div>
                {:else if layer.sourceType === "camera"}
                    <Camera id={layer.sourceId || ""} groupId="" style="width:100%;height:100%;object-fit:cover;" {mirror} />
                {:else if layer.sourceType === "screen"}
                    <Window id={layer.sourceId || ""} class="media" style="width:100%;height:100%;" />
                {:else if layer.sourceType === "ndi"}
                    <NdiStream screen={{ id: layer.sourceId || "", name: "" }} background={false} {mirror} />
                {:else if layer.sourceType === "blackmagic"}
                    <BmdStream screen={{ id: layer.sourceId || "", name: "" }} background={false} {mirror} />
                {:else if layer.sourceType === "video" || layer.sourceType === "image"}
                    <Media path={layer.sourcePath || ""} data={{ type: layer.sourceType, muted: true, loop: true }} mediaStyle={{ fit: "cover" }} {mirror} />
                {/if}
            </div>
        {/if}
    {/each}
</div>

<style>
    .blendBackground {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
    }

    .layer {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
    }

    .colorFill {
        position: absolute;
        inset: 0;
    }

    .layer :global(video),
    .layer :global(img),
    .layer :global(.media) {
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
        position: absolute;
        top: 0;
        left: 0;
    }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/frontend/components/output/layers/BlendBackground.svelte
git commit -m "feat(mixer): add BlendBackground live-stack renderer"
```

---

### Task 7: Wire `blend` into `BackgroundMedia.svelte`

**Files:**
- Modify: `src/frontend/components/output/layers/BackgroundMedia.svelte`

- [ ] **Step 1: Import `BlendBackground`**

In `src/frontend/components/output/layers/BackgroundMedia.svelte`, the import block ends with:

```ts
import Camera from "../Camera.svelte"
import OutputTransition from "../transitions/OutputTransition.svelte"
import Window from "../Window.svelte"
import Media from "./Media.svelte"
```

change to:

```ts
import Camera from "../Camera.svelte"
import OutputTransition from "../transitions/OutputTransition.svelte"
import Window from "../Window.svelte"
import BlendBackground from "./BlendBackground.svelte"
import Media from "./Media.svelte"
```

- [ ] **Step 2: Add the `blend` render branch**

In the template, currently:

```svelte
    {#if type === "media"}
        <Media path={id} {data} {animationStyle} bind:video bind:videoData bind:videoTime {mirror} {mediaStyle} volume={videoVolumeProp} on:loaded on:ended={videoEnded} />
    {:else if type === "screen"}
```

change to:

```svelte
    {#if type === "media"}
        <Media path={id} {data} {animationStyle} bind:video bind:videoData bind:videoTime {mirror} {mediaStyle} volume={videoVolumeProp} on:loaded on:ended={videoEnded} />
    {:else if type === "blend"}
        <BlendBackground blendId={id} {mirror} />
    {:else if type === "screen"}
```

`id` at the top of this file is already derived as `data.path || data.id || ""` (line 33) — for a blend, `data.id` will hold the blend's id (no `data.path` is set), so `id` resolves correctly with no further change needed. `type` is `data.type || "media"`, and only `"video"`/`"image"` get collapsed into `"media"` — `"blend"` passes through untouched.

- [ ] **Step 3: Typecheck**

Run: `npx svelte-check --tsconfig ./tsconfig.json 2>&1 | tail -30`
Expected: no new errors.

- [ ] **Step 4: Commit**

```bash
git add src/frontend/components/output/layers/BackgroundMedia.svelte
git commit -m "feat(mixer): render blend backgrounds from BackgroundMedia's type dispatch"
```

---

### Task 8: Style background integration

Lets a Style reference a saved Blend as its background, alongside the existing file-path background.

**Files:**
- Modify: `src/types/Settings.ts:17`
- Modify: `src/frontend/components/output/Output.svelte:340-343`
- Modify: `src/frontend/components/settings/tabs/Styles.svelte`

- [ ] **Step 1: Add the field to `Styles`**

In `src/types/Settings.ts:17`:

```ts
    backgroundImage?: string
```

add directly below it:

```ts
    backgroundBlend?: string // Blend id — takes precedence over backgroundImage when set
```

- [ ] **Step 2: Resolve `backgroundBlend` in `Output.svelte`**

In `src/frontend/components/output/Output.svelte:340-342`, currently:

```ts
    $: styleBackground = currentStyle?.clearStyleBackgroundOnText && (slide || background) ? "" : currentStyle?.backgroundImage || ""
    $: styleBackgroundData = { path: styleBackground, ...($media[styleBackground] || {}), loop: true }
    $: templateBackgroundData = { path: templateBackground, loop: true, ...($media[templateBackground] || {}) }
```

change the first two lines to:

```ts
    $: styleBackgroundCleared = !!(currentStyle?.clearStyleBackgroundOnText && (slide || background))
    $: styleBackground = styleBackgroundCleared ? "" : currentStyle?.backgroundBlend ? "blend" : currentStyle?.backgroundImage || ""
    $: styleBackgroundData = styleBackgroundCleared
        ? {}
        : currentStyle?.backgroundBlend
          ? { type: "blend", id: currentStyle.backgroundBlend, loop: true }
          : { path: styleBackground, ...($media[styleBackground] || {}), loop: true }
    $: templateBackgroundData = { path: templateBackground, loop: true, ...($media[templateBackground] || {}) }
```

`styleBackground` is only ever used as a truthy/falsy gate elsewhere in this file (`{#if styleBackground}`) — the literal string `"blend"` satisfies that check without colliding with any real file path.

- [ ] **Step 3: Add the Blend picker to `Styles.svelte`**

In `src/frontend/components/settings/tabs/Styles.svelte`, extend the store import (currently `import { activeDrawerTab, activeEdit, activePage, activeStyle, outputs, styles, templates } from "../../../stores"`) to also pull in `blends`:

```ts
import { activeDrawerTab, activeEdit, activePage, activeStyle, blends, outputs, styles, templates } from "../../../stores"
```

extend the helpers import (currently `import { clone } from "../../helpers/array"`) to also pull in `keysToID`/`sortByName`:

```ts
import { clone, keysToID, sortByName } from "../../helpers/array"
```

and add a new `MaterialDropdown` import — this file does **not** currently import it (it uses `MaterialPopupButton` elsewhere, which is a different component). Next to the existing `MaterialColorInput` import:

```ts
import MaterialColorInput from "../../inputs/MaterialColorInput.svelte"
```

add directly below it:

```ts
import MaterialDropdown from "../../inputs/MaterialDropdown.svelte"
```

Then find the existing background-media `InputRow` block:

```svelte
<InputRow arrow={!!(currentStyle.backgroundImage && (currentStyle.clearStyleBackgroundOnText || activeLayers.includes("slide")))}>
    <MaterialFilePicker label="edit.background_media{templateBackgroundImage && bgImage ? ' <span style="color: var(--text);opacity: 0.5;font-weight: normal;">settings.overrided_value<span>' : ''}" value={bgImage} filter={{ name: "Media files", extensions: mediaExtensions }} on:change={(e) => updateStyle(e, "backgroundImage")} allowEmpty />
    {#if bgImage}
        <MaterialButton title="titlebar.edit" icon="edit" on:click={editBackgroundImage} />
    {/if}

    <div slot="menu">
        <MaterialToggleSwitch label="settings.clear_style_background_on_text" checked={currentStyle.clearStyleBackgroundOnText} defaultValue={false} on:change={(e) => updateStyle(e.detail, "clearStyleBackgroundOnText")} />
    </div>
</InputRow>
```

Change the `MaterialFilePicker`'s `on:change` from `(e) => updateStyle(e, "backgroundImage")` to `(e) => updateBackgroundImage(e)`, and add a new dropdown directly after the closing `</InputRow>`:

```svelte
<InputRow arrow={!!(currentStyle.backgroundImage && (currentStyle.clearStyleBackgroundOnText || activeLayers.includes("slide")))}>
    <MaterialFilePicker label="edit.background_media{templateBackgroundImage && bgImage ? ' <span style="color: var(--text);opacity: 0.5;font-weight: normal;">settings.overrided_value<span>' : ''}" value={bgImage} filter={{ name: "Media files", extensions: mediaExtensions }} on:change={(e) => updateBackgroundImage(e)} allowEmpty />
    {#if bgImage}
        <MaterialButton title="titlebar.edit" icon="edit" on:click={editBackgroundImage} />
    {/if}

    <div slot="menu">
        <MaterialToggleSwitch label="settings.clear_style_background_on_text" checked={currentStyle.clearStyleBackgroundOnText} defaultValue={false} on:change={(e) => updateStyle(e.detail, "clearStyleBackgroundOnText")} />
    </div>
</InputRow>

<MaterialDropdown label="Blend" value={currentStyle.backgroundBlend || ""} options={blendOptions} on:change={(e) => updateBackgroundBlend(e.detail?.value ?? e.detail)} />
```

Add the supporting script (near the other `$:` derivations, e.g. right after the `normalOutputs`/`useStyle` block):

```ts
$: blendOptions = [{ value: "", label: "example.none" }, ...sortByName(keysToID($blends)).map((b) => ({ value: b.id, label: b.name }))]

function updateBackgroundImage(e: any) {
    if ((e?.detail ?? e?.target?.value ?? e) && currentStyle.backgroundBlend) updateStyle("", "backgroundBlend")
    updateStyle(e, "backgroundImage")
}
function updateBackgroundBlend(blendId: string) {
    if (blendId && currentStyle.backgroundImage) updateStyle("", "backgroundImage")
    updateStyle(blendId, "backgroundBlend")
}
```

- [ ] **Step 4: Typecheck**

Run: `npx svelte-check --tsconfig ./tsconfig.json 2>&1 | tail -30`
Expected: no new errors.

- [ ] **Step 5: Commit**

```bash
git add src/types/Settings.ts src/frontend/components/output/Output.svelte src/frontend/components/settings/tabs/Styles.svelte
git commit -m "feat(mixer): let a Style background reference a saved Blend"
```

---

### Task 9: Drawer tab registration

**Files:**
- Modify: `src/types/Tabs.ts:61`
- Modify: `src/frontend/values/tabs.ts`
- Modify: `src/frontend/values/icons.ts`
- Modify: `src/frontend/components/drawer/Navigation.svelte:12`
- Modify: `src/frontend/components/drawer/Content.svelte`
- Modify: `public/lang/en.json`, `public/lang/id_ID.json`

- [ ] **Step 1: Add `"mixer"` to `DrawerTabIds`**

In `src/types/Tabs.ts:61`:

```ts
export type DrawerTabIds = "shows" | "media" | "overlays" | "audio" | "scripture" | "calendar" | "timers" | "templates" | "functions" | "typography" | "pip"
```

change to:

```ts
export type DrawerTabIds = "shows" | "media" | "overlays" | "audio" | "scripture" | "calendar" | "timers" | "templates" | "functions" | "typography" | "pip" | "mixer"
```

- [ ] **Step 2: Register the tab**

In `src/frontend/values/tabs.ts`, the object ends with:

```ts
    typography: { name: "tabs.typography", icon: "text", title: "tabs.typography_info" },
    pip: { name: "tabs.pip", icon: "pip", title: "tabs.pip_info" }
}
```

change to:

```ts
    typography: { name: "tabs.typography", icon: "text", title: "tabs.typography_info" },
    pip: { name: "tabs.pip", icon: "pip", title: "tabs.pip_info" },
    mixer: { name: "tabs.mixer", icon: "mixer", title: "tabs.mixer_info" }
}
```

- [ ] **Step 3: Add a `mixer` icon**

`values/icons.ts` has no existing "layers" glyph. Reuse the exact `styles` icon path as a safe, valid placeholder (swap for a dedicated glyph later if desired). Next to the existing `styles` entry:

```ts
    styles: '<path d="M0 0h24v24H0z" fill="none"/><path d="M2.53 19.65l1.34.56v-9.03l-2.43 5.86c-.41 1.02.08 2.19 1.09 2.61zm19.5-3.7L17.07 3.98c-.31-.75-1.04-1.21-1.81-1.23-.26 0-.53.04-.79.15L7.1 5.95c-.75.31-1.21 1.03-1.23 1.8-.01.27.04.54.15.8l4.96 11.97c.31.76 1.05 1.22 1.83 1.23.26 0 .52-.05.77-.15l7.36-3.05c1.02-.42 1.51-1.59 1.09-2.6zM7.88 8.75c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-2 11c0 1.1.9 2 2 2h1.45l-3.45-8.34v6.34z"/>',
```

add directly below it:

```ts
    mixer: '<path d="M0 0h24v24H0z" fill="none"/><path d="M2.53 19.65l1.34.56v-9.03l-2.43 5.86c-.41 1.02.08 2.19 1.09 2.61zm19.5-3.7L17.07 3.98c-.31-.75-1.04-1.21-1.81-1.23-.26 0-.53.04-.79.15L7.1 5.95c-.75.31-1.21 1.03-1.23 1.8-.01.27.04.54.15.8l4.96 11.97c.31.76 1.05 1.22 1.83 1.23.26 0 .52-.05.77-.15l7.36-3.05c1.02-.42 1.51-1.59 1.09-2.6zM7.88 8.75c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-2 11c0 1.1.9 2 2 2h1.45l-3.45-8.34v6.34z"/>',
```

- [ ] **Step 4: Add `"mixer"` to `Navigation.svelte`'s prop type**

In `src/frontend/components/drawer/Navigation.svelte:12`:

```ts
    export let id: "shows" | "media" | "overlays" | "audio" | "effects" | "scripture" | "calendar" | "functions" | "templates" | "timers" | "pip"
```

change to:

```ts
    export let id: "shows" | "media" | "overlays" | "audio" | "effects" | "scripture" | "calendar" | "functions" | "templates" | "timers" | "pip" | "mixer"
```

(No new branch needed in the template — like `"pip"`, `"mixer"` has no drawer sub-categories, so it falls through to the empty `.categories` div, exactly matching `pip`'s current behavior.)

- [ ] **Step 5: Route `"mixer"` to the `Mixer` component in `Content.svelte`**

In `src/frontend/components/drawer/Content.svelte`, the import block currently has:

```ts
import Media from "./media/Media.svelte"
import PiP from "./pip/PiP.svelte"
```

change to:

```ts
import Media from "./media/Media.svelte"
import Mixer from "./mixer/Mixer.svelte"
import PiP from "./pip/PiP.svelte"
```

and the template's final branch:

```svelte
    {:else if id === "pip"}
        <PiP {active} />
    {/if}
```

change to:

```svelte
    {:else if id === "pip"}
        <PiP {active} />
    {:else if id === "mixer"}
        <Mixer {active} />
    {/if}
```

- [ ] **Step 6: Add translations**

In `public/lang/en.json`, inside the `"tabs"` object, next to the existing `"pip"`/`"pip_info"` keys:

```json
"pip": "Picture-in-Picture",
"pip_info": "Create multi-pane layouts with different content sources like camera, screen, video, and more.",
```

add:

```json
"pip": "Picture-in-Picture",
"pip_info": "Create multi-pane layouts with different content sources like camera, screen, video, and more.",
"mixer": "Mixer",
"mixer_info": "Blend multiple backgrounds together live using blend modes, like a VJ mixer.",
```

In `public/lang/id_ID.json`, inside the same `"tabs"` object (this project keeps newer feature labels in English in both locale files — see the existing `"pip"`/`"pip_info"` entries there), add the identical two lines:

```json
"mixer": "Mixer",
"mixer_info": "Blend multiple backgrounds together live using blend modes, like a VJ mixer.",
```

- [ ] **Step 7: Commit**

```bash
git add src/types/Tabs.ts src/frontend/values/tabs.ts src/frontend/values/icons.ts src/frontend/components/drawer/Navigation.svelte src/frontend/components/drawer/Content.svelte public/lang/en.json public/lang/id_ID.json
git commit -m "feat(mixer): register the Mixer Drawer tab"
```

(This commit references `./mixer/Mixer.svelte`, which doesn't exist until Task 11 — that's fine; Svelte only resolves the import at build/dev-server time, and Task 10-11 land immediately after in the same plan.)

---

### Task 10: `MixerLayerRow.svelte`

One layer's row of controls: move up/down, visibility, source type + contextual source picker, blend mode, opacity, delete.

**Files:**
- Create: `src/frontend/components/drawer/mixer/MixerLayerRow.svelte`

- [ ] **Step 1: Export `blendModeOptions` from `edit/values/media.ts`**

In `src/frontend/components/edit/values/media.ts`, the file currently defines the blend options inline inside `defaultMedia`:

```ts
const defaultMedia = splitIntoRows([
    {
        id: "videoType", // can be image as well
        ...
    },
    { id: "fit", ... },
    { id: "flipped", ... },
    { id: "flippedY", ... },
    // background blending (Resolume style) - blend the media with the color layer below it
    {
        id: "blendMode",
        type: "dropdown",
        value: "",
        values: {
            label: "Blend Mode",
            defaultValue: "",
            options: [
                { value: "", label: "example.default" },
                { value: "screen", label: "Screen" },
                { value: "multiply", label: "Multiply" },
                { value: "overlay", label: "Overlay" },
                { value: "soft-light", label: "Soft Light" },
                { value: "hard-light", label: "Hard Light" },
                { value: "color-dodge", label: "Color Dodge (Add)" },
                { value: "color-burn", label: "Color Burn" },
                { value: "lighten", label: "Lighten" },
                { value: "darken", label: "Darken" },
                { value: "difference", label: "Difference" },
                { value: "exclusion", label: "Exclusion" },
                { value: "hue", label: "Hue" },
                { value: "saturation", label: "Saturation" },
                { value: "color", label: "Color" },
                { value: "luminosity", label: "Luminosity" }
            ]
        }
    },
    { id: "blendColor", type: "color", value: "", values: { label: "Blend Color", allowGradients: true, allowOpacity: true, allowEmpty: true } }
])
```

Extract the options array to a named export placed **before** `defaultMedia` (so it's initialized before use), and reference it from the inline definition:

```ts
export const blendModeOptions = [
    { value: "", label: "example.default" },
    { value: "screen", label: "Screen" },
    { value: "multiply", label: "Multiply" },
    { value: "overlay", label: "Overlay" },
    { value: "soft-light", label: "Soft Light" },
    { value: "hard-light", label: "Hard Light" },
    { value: "color-dodge", label: "Color Dodge (Add)" },
    { value: "color-burn", label: "Color Burn" },
    { value: "lighten", label: "Lighten" },
    { value: "darken", label: "Darken" },
    { value: "difference", label: "Difference" },
    { value: "exclusion", label: "Exclusion" },
    { value: "hue", label: "Hue" },
    { value: "saturation", label: "Saturation" },
    { value: "color", label: "Color" },
    { value: "luminosity", label: "Luminosity" }
]

const defaultMedia = splitIntoRows([
    {
        id: "videoType", // can be image as well
        type: "dropdown",
        value: "",
        values: {
            label: "clock.type",
            defaultValue: "",
            options: [
                { value: "", label: "example.default" },
                { value: "background", label: "preview.background" }, // muted, looping
                { value: "foreground", label: "preview.foreground" } // unmuted, not looping, will display even when the "Background" layer is turned off.
            ]
        }
    },
    { id: "fit", type: "dropdown", value: "", values: { label: "media.fit", defaultValue: "", options: [{ value: "", label: "themes.default" }, ...mediaFitOptions] } },
    { id: "flipped", type: "checkbox", value: false, values: { label: "media.flip_horizontally" } },
    { id: "flippedY", type: "checkbox", value: false, values: { label: "media.flip_vertically" } },
    // background blending (Resolume style) - blend the media with the color layer below it
    {
        id: "blendMode",
        type: "dropdown",
        value: "",
        values: {
            label: "Blend Mode",
            defaultValue: "",
            options: blendModeOptions
        }
    },
    { id: "blendColor", type: "color", value: "", values: { label: "Blend Color", allowGradients: true, allowOpacity: true, allowEmpty: true } }
])
```

- [ ] **Step 2: Create the component**

```svelte
<!-- src/frontend/components/drawer/mixer/MixerLayerRow.svelte -->
<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte"
    import type { BlendLayer, BlendSourceType } from "../../../../types/Blend"
    import { blendModeOptions } from "../../edit/values/media"
    import { cameraManager } from "../../../media/cameraManager"
    import { ndiData } from "../../../stores"
    import { imageExtensions, videoExtensions } from "../../../values/extensions"
    import MaterialButton from "../../inputs/MaterialButton.svelte"
    import MaterialColorInput from "../../inputs/MaterialColorInput.svelte"
    import MaterialDropdown from "../../inputs/MaterialDropdown.svelte"
    import MaterialFilePicker from "../../inputs/MaterialFilePicker.svelte"
    import MaterialNumberInput from "../../inputs/MaterialNumberInput.svelte"

    export let layer: BlendLayer
    export let canMoveUp = true
    export let canMoveDown = true

    const dispatch = createEventDispatcher()

    function update(changes: Partial<BlendLayer>) {
        dispatch("update", { ...layer, ...changes })
    }

    const sourceTypeOptions: { value: BlendSourceType; label: string }[] = [
        { value: "image", label: "Image" },
        { value: "video", label: "Video" },
        { value: "color", label: "Color" },
        { value: "camera", label: "Camera" },
        { value: "ndi", label: "NDI" },
        { value: "screen", label: "Screen" },
        { value: "blackmagic", label: "Blackmagic" }
    ]

    let cameraList: { value: string; label: string }[] = []
    $: ndiList = Object.keys($ndiData).map((id) => ({ value: id, label: id }))

    onMount(async () => {
        const cameras = await cameraManager.getCamerasList()
        cameraList = cameras.map((cam: any) => ({ value: cam.id, label: cam.name || `Camera ${cam.id}` }))
    })
</script>

<div class="layerRow">
    <div class="layerHeader">
        <MaterialButton icon="up" title="Move layer up" disabled={!canMoveUp} on:click={() => dispatch("moveUp")} />
        <MaterialButton icon="down" title="Move layer down" disabled={!canMoveDown} on:click={() => dispatch("moveDown")} />
        <MaterialButton icon={layer.visible ? "show" : "hide"} title={layer.visible ? "Hide layer" : "Show layer"} on:click={() => update({ visible: !layer.visible })} />
        <span class="layerLabel">{layer.sourceType}</span>
        <MaterialButton icon="delete" title="Remove layer" on:click={() => dispatch("remove")} />
    </div>

    <div class="layerControls">
        <MaterialDropdown
            label="Source Type"
            value={layer.sourceType}
            options={sourceTypeOptions}
            on:change={(e) => update({ sourceType: e.detail?.value ?? e.detail, sourcePath: "", sourceId: "", color: "" })}
        />

        {#if layer.sourceType === "image"}
            <MaterialFilePicker label="Image" value={layer.sourcePath} filter={{ name: "Image files", extensions: imageExtensions }} allowEmpty on:change={(e) => update({ sourcePath: e.detail })} />
        {:else if layer.sourceType === "video"}
            <MaterialFilePicker label="Video" value={layer.sourcePath} filter={{ name: "Video files", extensions: videoExtensions }} allowEmpty on:change={(e) => update({ sourcePath: e.detail })} />
        {:else if layer.sourceType === "color"}
            <MaterialColorInput label="Color" value={layer.color || "#00ff00"} defaultValue="#00ff00" on:input={(e) => update({ color: e?.detail ?? e?.target?.value ?? e })} />
        {:else if layer.sourceType === "camera"}
            <MaterialDropdown label="Camera" value={layer.sourceId || ""} options={cameraList} on:change={(e) => update({ sourceId: e.detail?.value ?? e.detail })} />
        {:else if layer.sourceType === "ndi"}
            <MaterialDropdown label="NDI Source" value={layer.sourceId || ""} options={ndiList} on:change={(e) => update({ sourceId: e.detail?.value ?? e.detail })} />
        {/if}

        <MaterialDropdown label="Blend Mode" value={layer.blendMode} options={blendModeOptions} on:change={(e) => update({ blendMode: e.detail?.value ?? e.detail })} />
        <MaterialNumberInput label="Opacity (%)" value={layer.opacity} min={0} max={100} step={1} scrub on:change={(e) => update({ opacity: Number(e.detail) })} />
    </div>
</div>

<style>
    .layerRow {
        background: var(--primary-darker);
        border-radius: 6px;
        padding: 8px 12px;
        margin-bottom: 8px;
    }

    .layerHeader {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-bottom: 8px;
    }

    .layerLabel {
        flex: 1;
        color: var(--text);
        text-transform: capitalize;
        opacity: 0.8;
    }

    .layerControls {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }
</style>
```

`screen` and `blackmagic` deliberately get no source-id picker here — see the "Reference" section at the top of this plan. Those two source types can be added, muted, and reordered, but won't render (no `sourceId`) until a device picker exists somewhere in the app.

- [ ] **Step 3: Commit**

```bash
git add src/frontend/components/edit/values/media.ts src/frontend/components/drawer/mixer/MixerLayerRow.svelte
git commit -m "feat(mixer): add MixerLayerRow (per-layer source/blend/opacity controls)"
```

---

### Task 11: `Mixer.svelte`

The workspace: layer list, live sandboxed preview, name + save, saved-Blends grid.

**Files:**
- Create: `src/frontend/components/drawer/mixer/Mixer.svelte`

- [ ] **Step 1: Create the component**

```svelte
<!-- src/frontend/components/drawer/mixer/Mixer.svelte -->
<script lang="ts">
    import type { Blend, BlendLayer } from "../../../../types/Blend"
    import { blends } from "../../../stores"
    import { keysToID, sortByName } from "../../helpers/array"
    import { createLayer, deleteBlend, saveBlend } from "../../helpers/blends"
    import { moveLayer } from "../../helpers/blendsMath"
    import MaterialButton from "../../inputs/MaterialButton.svelte"
    import MaterialTextInput from "../../inputs/MaterialTextInput.svelte"
    import BlendBackground from "../../output/layers/BlendBackground.svelte"
    import MixerLayerRow from "./MixerLayerRow.svelte"

    export let active: string | null = null

    let editingId = ""
    let name = "New Blend"
    let layers: BlendLayer[] = []

    function newBlend() {
        editingId = ""
        name = "New Blend"
        layers = []
    }

    function loadBlend(id: string) {
        const blend = $blends[id]
        if (!blend) return
        editingId = id
        name = blend.name
        layers = blend.layers.map((l) => ({ ...l }))
    }

    function addLayer() {
        layers = [...layers, createLayer()]
    }
    function removeLayer(index: number) {
        layers = layers.filter((_, i) => i !== index)
    }
    function updateLayer(index: number, updated: BlendLayer) {
        layers = layers.map((l, i) => (i === index ? updated : l))
    }
    function move(index: number, direction: "up" | "down") {
        layers = moveLayer(layers, index, direction)
    }

    function save() {
        editingId = saveBlend(name, layers, editingId)
    }

    function remove(id: string) {
        deleteBlend(id)
        if (editingId === id) newBlend()
    }

    // draft blend fed straight into BlendBackground for a live, sandboxed preview —
    // never touches the `blends` store or the real output until Save is pressed
    $: draftBlend = { name, layers } as Blend

    $: savedBlends = sortByName(keysToID($blends))
    // displayed top-to-bottom = stack top-to-bottom (reverse of the underlying array,
    // where index 0 is the bottom of the stack)
    $: displayLayers = layers.map((layer, i) => ({ layer, i })).reverse()
</script>

<div class="mixerContainer">
    <div class="header">
        <h2>Mixer</h2>
        <p class="description">Blend multiple backgrounds together live using blend modes, like a VJ mixer.</p>
    </div>

    <div class="preview">
        <BlendBackground blend={draftBlend} />
    </div>

    <div class="layers">
        {#each displayLayers as { layer, i } (layer.id)}
            <MixerLayerRow
                {layer}
                canMoveUp={i < layers.length - 1}
                canMoveDown={i > 0}
                on:update={(e) => updateLayer(i, e.detail)}
                on:remove={() => removeLayer(i)}
                on:moveUp={() => move(i, "up")}
                on:moveDown={() => move(i, "down")}
            />
        {/each}
        <MaterialButton icon="add" variant="outlined" style="width: 100%; justify-content: center;" on:click={addLayer}>Add Layer</MaterialButton>
    </div>

    <div class="save-row">
        <MaterialTextInput label="Name" value={name} on:change={(e) => (name = e.detail)} />
        <MaterialButton icon="save" variant="outlined" on:click={save}>Save</MaterialButton>
        {#if editingId}
            <MaterialButton icon="add" variant="outlined" on:click={newBlend}>New</MaterialButton>
        {/if}
    </div>

    {#if savedBlends.length}
        <div class="saved">
            <h3>Saved Blends</h3>
            <div class="saved-grid">
                {#each savedBlends as blend (blend.id)}
                    <div class="blend-card" class:active={editingId === blend.id}>
                        <button class="card-main" on:click={() => loadBlend(blend.id)}>
                            <span class="blend-name">{blend.name}</span>
                            <span class="blend-count">{blend.layers.length} layer{blend.layers.length === 1 ? "" : "s"}</span>
                        </button>
                        <MaterialButton icon="delete" title="Delete Blend" on:click={() => remove(blend.id)} />
                    </div>
                {/each}
            </div>
        </div>
    {/if}
</div>

<style>
    .mixerContainer {
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow-y: auto;
        padding: 16px;
    }

    .header {
        margin-bottom: 16px;
    }

    .header h2 {
        color: var(--text);
        margin: 0 0 4px 0;
        font-size: 1.2em;
    }

    .description {
        color: var(--text);
        opacity: 0.6;
        font-size: 0.85em;
        margin: 0;
    }

    .preview {
        position: relative;
        width: 100%;
        aspect-ratio: 16 / 9;
        background: #111;
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 16px;
    }

    .layers {
        margin-bottom: 16px;
    }

    .save-row {
        display: flex;
        gap: 8px;
        align-items: center;
        margin-bottom: 16px;
    }
    .save-row > :global(:first-child) {
        flex: 1;
    }

    .saved h3 {
        color: var(--text);
        margin: 0 0 12px 0;
        font-size: 1em;
    }

    .saved-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 12px;
    }

    .blend-card {
        display: flex;
        flex-direction: row;
        align-items: stretch;
        padding: 0;
        background: var(--primary-lighter);
        border: 2px solid transparent;
        border-radius: 8px;
    }
    .blend-card.active {
        border-color: var(--secondary);
    }
    .blend-card .card-main {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 12px;
        background: transparent;
        border: none;
        cursor: pointer;
        color: inherit;
    }

    .blend-name {
        color: var(--text);
        font-size: 0.85em;
        font-weight: 500;
    }

    .blend-count {
        color: var(--text);
        opacity: 0.6;
        font-size: 0.7em;
        margin-top: 2px;
    }
</style>
```

- [ ] **Step 2: Typecheck**

Run: `npx svelte-check --tsconfig ./tsconfig.json 2>&1 | tail -30`
Expected: no new errors.

- [ ] **Step 3: Commit**

```bash
git add src/frontend/components/drawer/mixer/Mixer.svelte
git commit -m "feat(mixer): add Mixer workspace (layer list, live preview, save, saved grid)"
```

- [ ] **Step 4: Manual verification**

Run: `npm run dev` (or however this project's dev server is normally started), open the app, click the new **Mixer** tab in the Drawer (bottom panel, sibling to PiP):

1. Click "Add Layer" twice.
2. Set layer 1 to Color (green), layer 2 to Image (pick any photo), set layer 2's Blend Mode to "Screen" or "Multiply".
3. Confirm the preview box updates live to show the blended result.
4. Name it and click Save — confirm it appears under "Saved Blends".
5. Go to Settings → Styles, confirm the new "Blend" dropdown lists the saved Blend; pick it, click "Use style", confirm the real output preview shows the same blended result.

This step has no pass/fail command — it's a visual check, consistent with how the spec's Testing section describes verifying this feature (by eye, not automated).

---

## Plan self-review notes

- **Spec coverage:** data model (Task 1), rendering & `BackgroundMedia` integration (Tasks 6-7), Style background integration (Task 8), Mixer workspace as its own Drawer tab (Tasks 9-11), persistence (Task 3), pure-logic tests (Task 4). Per-slide background picking and the screen/blackmagic device picker are explicitly out of scope, matching the spec's non-goals and the "Reference" section above.
- **Type consistency:** `BlendLayer`/`Blend` (Task 1) are the only shapes used throughout — `blendsMath.ts` (Task 4), `blends.ts` (Task 5), `BlendBackground.svelte` (Task 6), `MixerLayerRow.svelte` (Task 10), and `Mixer.svelte` (Task 11) all import the same types from `types/Blend.ts` rather than re-declaring them.
- **No placeholders:** every step has complete, real code, copied from and cross-checked against actual working code already in this codebase (`MultiPaneLayer.svelte`, `PiP.svelte`, `LooksEdit.svelte`, `Styles.svelte`, `save.ts`/`updateSettings.ts`/`syncManager.ts`/`defaults.ts`).

---

## Execution options

**1. Subagent-Driven (recommended)** — a fresh subagent per task, with review between tasks and fast iteration.

**2. Inline Execution** — execute tasks in this session using `executing-plans`, batch execution with checkpoints.
