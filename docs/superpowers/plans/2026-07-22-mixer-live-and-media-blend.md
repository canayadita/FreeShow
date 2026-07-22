# Mixer "Show on Primary" + Media "Blend Selected" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a one-click "Show on Primary" button to the Mixer (pushes the current Blend live, auto-saving first if needed) and a "Blend Selected" context-menu action in the Media drawer tab (turns 2+ selected media items into a Blend, opened ready-to-edit in the Mixer).

**Architecture:** Both features are thin glue over already-existing, already-tested primitives — no new data model, no new persistence. "Show on Primary" reuses the exact same `setOutput`/`getAllActiveOutputs` mechanism `MediaCard.svelte` already uses for instant single-media output pushes, just with a `{type:"blend", id}` payload. "Blend Selected" reuses the existing multi-select (`selected` store) and context-menu system (`contextMenus.ts` / `ContextItem.svelte` / `menuClick.ts`), plus the existing (currently unused) `active` prop wiring between the Drawer tab system and `Mixer.svelte`.

**Tech Stack:** Svelte, TypeScript. No Electron/native changes, no new tests beyond manual verification (both features are integration glue, not new logic).

**Spec:** `docs/superpowers/specs/2026-07-22-mixer-live-and-media-blend-design.md`

---

### Task 1: "Show on Primary" button (Mixer)

**Files:**
- Modify: `src/frontend/components/drawer/mixer/Mixer.svelte`

- [ ] **Step 1: Add the `getAllActiveOutputs`/`setOutput` import**

In `src/frontend/components/drawer/mixer/Mixer.svelte`, the import block currently reads:

```ts
import type { Blend, BlendLayer } from "../../../../types/Blend"
import { blends } from "../../../stores"
import { keysToID, sortByName } from "../../helpers/array"
import { createLayer, deleteBlend, saveBlend } from "../../helpers/blends"
import { moveLayer } from "../../helpers/blendsMath"
import MaterialButton from "../../inputs/MaterialButton.svelte"
import MaterialTextInput from "../../inputs/MaterialTextInput.svelte"
import BlendBackground from "../../output/layers/BlendBackground.svelte"
import MixerLayerRow from "./MixerLayerRow.svelte"
```

change to:

```ts
import type { Blend, BlendLayer } from "../../../../types/Blend"
import { blends } from "../../../stores"
import { keysToID, sortByName } from "../../helpers/array"
import { createLayer, deleteBlend, saveBlend } from "../../helpers/blends"
import { moveLayer } from "../../helpers/blendsMath"
import { getAllActiveOutputs, setOutput } from "../../helpers/output"
import MaterialButton from "../../inputs/MaterialButton.svelte"
import MaterialTextInput from "../../inputs/MaterialTextInput.svelte"
import BlendBackground from "../../output/layers/BlendBackground.svelte"
import MixerLayerRow from "./MixerLayerRow.svelte"
```

- [ ] **Step 2: Add the `showOnPrimary` function**

Find the existing `save()` function:

```ts
function save() {
    editingId = saveBlend(name, layers, editingId)
}
```

Add directly below it:

```ts
function showOnPrimary() {
    editingId = saveBlend(name, layers, editingId)
    getAllActiveOutputs().forEach((output) => {
        setOutput("background", { type: "blend", id: editingId }, false, output.id)
    })
}
```

- [ ] **Step 3: Add the button**

Find the `.save-row` block:

```svelte
    <div class="save-row">
        <MaterialTextInput label="Name" value={name} on:change={(e) => (name = e.detail)} />
        <MaterialButton icon="save" variant="outlined" on:click={save}>Save</MaterialButton>
        {#if editingId}
            <MaterialButton icon="add" variant="outlined" on:click={newBlend}>New</MaterialButton>
        {/if}
    </div>
```

change to:

```svelte
    <div class="save-row">
        <MaterialTextInput label="Name" value={name} on:change={(e) => (name = e.detail)} />
        <MaterialButton icon="save" variant="outlined" on:click={save}>Save</MaterialButton>
        <MaterialButton icon="play" variant="outlined" on:click={showOnPrimary}>Show on Primary</MaterialButton>
        {#if editingId}
            <MaterialButton icon="add" variant="outlined" on:click={newBlend}>New</MaterialButton>
        {/if}
    </div>
```

- [ ] **Step 4: Typecheck**

Run: `npx svelte-check --tsconfig ./src/frontend/tsconfig.json 2>&1 | tail -30`
Expected: no new errors mentioning `Mixer.svelte`. (This repo has no root `tsconfig.json` — use `./src/frontend/tsconfig.json` directly, or whatever `package.json`'s `test:svelte` script uses; there's a pre-existing baseline of ~373 unrelated errors, ignore those.)

- [ ] **Step 5: Commit**

```bash
git add src/frontend/components/drawer/mixer/Mixer.svelte
git commit -m "feat(mixer): add 'Show on Primary' button (auto-saves then pushes live)"
```

---

### Task 2: Register the "Blend Selected" context-menu item

**Files:**
- Modify: `src/frontend/components/context/contextMenus.ts`
- Modify: `src/frontend/components/context/ContextItem.svelte`
- Modify: `public/lang/en.json`, `public/lang/id_ID.json`

This task only registers the menu item (label, icon, position, visibility condition) — no action logic yet. That's Task 3. After this task, "Blend Selected" will appear in the menu (when 2+ media items are selected) but clicking it will do nothing yet (no handler registered) — that's expected and fine as an intermediate state, since Task 3 lands immediately after in this same plan.

- [ ] **Step 1: Add the menu item metadata and position**

In `src/frontend/components/context/contextMenus.ts`, find:

```ts
    createSlideshow: { label: "context.create_slideshow", icon: "slide" },
```

add directly below it:

```ts
    blend_selected: { label: "context.blend_selected", icon: "mixer" },
```

Then find the `media_card` array:

```ts
    media_card: ["GROUP_open", "createSlideshow", "play_no_audio", "play_no_filters", "SEPARATOR", "favourite", "SEPARATOR", "media_tag_set", "media_tag_filter", "sort_media_by", "SEPARATOR", "system_open"],
```

change to:

```ts
    media_card: ["GROUP_open", "createSlideshow", "blend_selected", "play_no_audio", "play_no_filters", "SEPARATOR", "favourite", "SEPARATOR", "media_tag_set", "media_tag_filter", "sort_media_by", "SEPARATOR", "system_open"],
```

- [ ] **Step 2: Add the visibility condition**

In `src/frontend/components/context/ContextItem.svelte`, find (inside the `conditions` object):

```ts
        createSlideshow: () => {
            hide = $selected.id !== "media" || $selected.data.length < 2
        },
```

add directly below it:

```ts
        blend_selected: () => {
            hide = $selected.id !== "media" || $selected.data.length < 2
        },
```

- [ ] **Step 3: Add the translation**

In `public/lang/en.json`, inside the `"context"` object, find the `"create_slideshow"` key:

```json
"create_slideshow": "Create slideshow",
```

add directly below it:

```json
"blend_selected": "Blend Selected",
```

In `public/lang/id_ID.json`, inside the same `"context"` object, add the identical line (this project keeps newer feature labels in English in both locale files):

```json
"blend_selected": "Blend Selected",
```

- [ ] **Step 4: Verify both JSON files are still valid**

Run: `node -e "JSON.parse(require('fs').readFileSync('public/lang/en.json', 'utf8')); JSON.parse(require('fs').readFileSync('public/lang/id_ID.json', 'utf8')); console.log('OK')"`
Expected: `OK`

- [ ] **Step 5: Typecheck**

Run: `npx svelte-check --tsconfig ./src/frontend/tsconfig.json 2>&1 | tail -30`
Expected: no new errors mentioning `contextMenus.ts` or `ContextItem.svelte`.

- [ ] **Step 6: Commit**

```bash
git add src/frontend/components/context/contextMenus.ts src/frontend/components/context/ContextItem.svelte public/lang/en.json public/lang/id_ID.json
git commit -m "feat(mixer): register 'Blend Selected' context-menu item for 2+ selected media"
```

---

### Task 3: "Blend Selected" action + Mixer auto-load

**Files:**
- Modify: `src/frontend/components/context/menuClick.ts`
- Modify: `src/frontend/components/drawer/mixer/Mixer.svelte`

- [ ] **Step 1: Add imports to `menuClick.ts`**

`uid` (from `"uid"`) and `setOutput`/`activeDrawerTab` are already imported in this file — do not re-import them. Two new imports are needed.

Find:

```ts
import { getExtension, getFileName, getMediaLayerType, getMediaStyle, getMediaType, removeExtension, splitPath } from "../helpers/media"
import { defaultOutput, getCurrentStyle, getFirstActiveOutput, setOutput, toggleOutput, toggleOutputs } from "../helpers/output"
```

change to:

```ts
import type { BlendLayer } from "../../../types/Blend"
import { saveBlend } from "../helpers/blends"
import { getExtension, getFileName, getMediaLayerType, getMediaStyle, getMediaType, removeExtension, splitPath } from "../helpers/media"
import { defaultOutput, getCurrentStyle, getFirstActiveOutput, setOutput, toggleOutput, toggleOutputs } from "../helpers/output"
```

Also find the existing `historyHelpers`-adjacent helper import area (near `../helpers/show`):

```ts
import { bindSlidesToOutput, checkName, formatToFileName, getLayoutRef, openShow, removeTemplatesFromShow, updateShowsList } from "../helpers/show"
```

add directly below it:

```ts
import { setDrawerTabData } from "../helpers/historyHelpers"
```

- [ ] **Step 2: Add the `blend_selected` action**

Find the `createSlideshow` entry inside the `clickActions` object (`src/frontend/components/context/menuClick.ts`):

```ts
    createSlideshow: (obj: ObjData) => {
        const data = obj.sel?.data || []
        const slides = data.map((a) => ({ group: removeExtension(a.name || a.path || ""), color: null, settings: {}, notes: "", items: [] }))

        const layoutId = uid()
        const show = new ShowObj(false, "presentation", layoutId, Date.now(), false)
        const folderName = splitPath(data[0]?.path).at(-2) || ""
        show.name = checkName(translateText("create_show.slideshow") + (folderName ? `" "${folderName}` : ""))

        const videoData = { muted: false, loop: false }
        const duration = 6

        const layoutSlides: SlideData[] = []
        slides.forEach((slide, i) => {
            const slideId = uid()
            show.slides[slideId] = slide

            const mediaId = uid(5)
            const mediaData = data[i]
            if (!mediaData) return

            show.media[mediaId] = { ...mediaData, path: mediaData.path || mediaData.id, ...(mediaData.type === "video" ? videoData : {}) }

            const layoutData: SlideData = { id: slideId, background: mediaId }
            if (mediaData.type === "video") {
                layoutData.actions = { nextAfterMedia: true }
            } else if (mediaData.type === "image") {
                layoutData.nextTimer = duration
                layoutData.actions = { animate: { actions: [{ type: "change", duration: duration + 2, id: "background", key: "zoom" }] } }
            }
            if (i === slides.length - 1) layoutData.end = true

            layoutSlides.push(layoutData)
        })

        show.layouts[layoutId].slides = layoutSlides

        history({ id: "UPDATE", newData: { data: show, remember: { project: get(activeProject) } }, location: { page: "show", id: "show" } })
    },
```

add directly below it:

```ts
    blend_selected: (obj: ObjData) => {
        const data = obj.sel?.data || []
        const layers: BlendLayer[] = data.map((item: any) => ({
            id: uid(),
            sourceType: item.type === "video" ? "video" : "image",
            sourcePath: item.path,
            blendMode: "",
            opacity: 100,
            visible: true
        }))

        const blendId = saveBlend("New Blend", layers)

        setDrawerTabData("mixer", blendId)
        activeDrawerTab.set("mixer")
    },
```

- [ ] **Step 3: Consume `active` in `Mixer.svelte`**

In `src/frontend/components/drawer/mixer/Mixer.svelte`, add the import (the import block after Task 1's changes reads as below — add `setDrawerTabData`):

```ts
import type { Blend, BlendLayer } from "../../../../types/Blend"
import { blends } from "../../../stores"
import { keysToID, sortByName } from "../../helpers/array"
import { createLayer, deleteBlend, saveBlend } from "../../helpers/blends"
import { moveLayer } from "../../helpers/blendsMath"
import { setDrawerTabData } from "../../helpers/historyHelpers"
import { getAllActiveOutputs, setOutput } from "../../helpers/output"
import MaterialButton from "../../inputs/MaterialButton.svelte"
import MaterialTextInput from "../../inputs/MaterialTextInput.svelte"
import BlendBackground from "../../output/layers/BlendBackground.svelte"
import MixerLayerRow from "./MixerLayerRow.svelte"
```

Then find the existing `loadBlend` function:

```ts
    function loadBlend(id: string) {
        const blend = $blends[id]
        if (!blend) return
        editingId = id
        name = blend.name
        layers = blend.layers.map((l) => ({ ...l }))
    }
```

add directly below it:

```ts
    // auto-load a Blend passed in via the Drawer tab system (e.g. from Media's "Blend Selected"
    // action), then clear it — otherwise `active` would keep pointing at this same Blend on
    // every future casual visit to the Mixer tab, since Content.svelte remounts Mixer fresh
    // each time the Drawer switches to it.
    $: if (active && $blends[active]) {
        loadBlend(active)
        setDrawerTabData("mixer", "")
    }
```

- [ ] **Step 4: Typecheck**

Run: `npx svelte-check --tsconfig ./src/frontend/tsconfig.json 2>&1 | tail -30`
Expected: no new errors mentioning `menuClick.ts` or `Mixer.svelte`.

- [ ] **Step 5: Commit**

```bash
git add src/frontend/components/context/menuClick.ts src/frontend/components/drawer/mixer/Mixer.svelte
git commit -m "feat(mixer): implement 'Blend Selected' action and Mixer auto-load"
```

- [ ] **Step 6: Manual verification**

No automated test covers this end-to-end flow (it's integration glue over already-tested primitives — see spec's Testing section). Run the app (`npm start`, or build+package per this project's usual flow) and verify by hand:

1. Go to the Media drawer tab, select 2+ image/video items (Shift-click or Cmd/Ctrl-click).
2. Right-click → confirm "Blend Selected" appears (and does **not** appear with 0 or 1 item selected).
3. Click "Blend Selected" → confirm the Drawer switches to the Mixer tab, with a new Blend already loaded showing both items as layers, live in the preview.
4. Click "Show on Primary" → confirm the real output (or its preview thumbnail) shows the blended result.
5. Switch to another Drawer tab, then back to Mixer → confirm it now shows the normal empty/last-manually-loaded state, **not** the same auto-loaded Blend again (verifies the `setDrawerTabData("mixer", "")` clear worked).

---

## Plan self-review notes

- **Spec coverage:** Part A ("Show on Primary") → Task 1. Part B ("Blend Selected") → Tasks 2–3 (registration, then action + Mixer consumption). Both file-structure entries from the spec are covered; no gaps.
- **Type consistency:** `BlendLayer` shape used in Task 3's `blend_selected` action matches exactly what `createLayer()` (`helpers/blends.ts`, already-shipped) and `MixerLayerRow.svelte` (already-shipped) both already produce/consume — same field names (`id`, `sourceType`, `sourcePath`, `blendMode`, `opacity`, `visible`), no drift.
- **No placeholders:** every step has complete, real code, cross-checked against the actual current file contents (via the research pass that preceded this plan) rather than assumed.

---

## Execution options

**1. Subagent-Driven (recommended)** — a fresh subagent per task, with review between tasks and fast iteration.

**2. Inline Execution** — execute tasks in this session using `executing-plans`, batch execution with checkpoints.
