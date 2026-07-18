# Quick Edit Slide Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Right-click a slide → "Quick Edit" opens a floating popup to fix the slide's text without leaving the Show view; a currently-live slide updates in real-time.

**Architecture:** A new store holds the target slide; a context-menu action sets it; a top-level `QuickEditSlide.svelte` popup renders the slide's text items with the existing `<Editbox … plain />` editor (which writes to `showsCache`, so the live output updates reactively). Close on Esc / click-outside.

**Tech Stack:** Svelte 4, TypeScript, existing Editbox + context-menu + history systems.

---

## File Structure

- `src/frontend/stores.ts` — add `quickEditSlide` store.
- `src/frontend/components/context/contextMenus.ts` — add `quick_edit_slide` item + to slide menus.
- `src/frontend/components/context/menuClick.ts` — add `quick_edit_slide` handler.
- `src/frontend/components/edit/QuickEditSlide.svelte` (new) — floating popup editor.
- `src/frontend/App.svelte` — mount `<QuickEditSlide />`.
- `public/lang/en.json`, `public/lang/id_ID.json` — menu label.

---

## Task 1: Store

**Files:**
- Modify: `src/frontend/stores.ts`

- [ ] **Step 1: Add the store**

Find a nearby `export const … = writable(` line in stores.ts and add after it:

```ts
export const quickEditSlide: Writable<{ showId: string; index: number } | null> = writable(null)
```

(`Writable` and `writable` are already imported at stores.ts line 6.)

- [ ] **Step 2: Lint**

Run: `npx eslint -c config/linting/eslint.frontend.json --ext .ts src/frontend/stores.ts`
Expected: no new errors (baseline-compared).

- [ ] **Step 3: Commit**

```bash
git add src/frontend/stores.ts
git commit -m "feat(quick-edit): add quickEditSlide store"
```

---

## Task 2: Context menu item + label

**Files:**
- Modify: `src/frontend/components/context/contextMenus.ts`
- Modify: `public/lang/en.json`, `public/lang/id_ID.json`

- [ ] **Step 1: Add the menu item definition**

In `contextMenus.ts`, after the `editSlideText: { … }` line (line ~122), add:

```ts
    quick_edit_slide: { label: "actions.quick_edit", icon: "edit", iconColor: "#97c7ff" },
```

- [ ] **Step 2: Add it to the slide menus**

In the same file, the slide menu arrays (search `slide: [` ~line 362). Insert `"quick_edit_slide"` right after `"GROUP_edit"` in `slide` and `slideChild`, and change `slideFocus`:

```ts
    slide: ["GROUP_edit", "quick_edit_slide", "slideGroups", "actions", "bind_to", "format", "remove_layers", "slide_transition", "disable", "SEPARATOR", "duplicate", "make_unique", "GROUP_slide_remove"],
    slideChild: ["GROUP_edit", "quick_edit_slide", "slideGroups", "actions", "bind_to", "format", "remove_layers", "slide_transition", "disable", "SEPARATOR", "duplicate", "make_unique", "GROUP_slide_remove"],
    slideFocus: ["quick_edit_slide", "editSlideText"],
```

- [ ] **Step 3: Add the label to en.json**

In `public/lang/en.json`, find the `"actions": {` object and add a key (keep valid JSON, add a comma on the previous line if needed):

```json
        "quick_edit": "Quick Edit",
```

- [ ] **Step 4: Add the label to id_ID.json**

In `public/lang/id_ID.json`, in the `"actions": {` object add:

```json
        "quick_edit": "Edit Cepat",
```

- [ ] **Step 5: Validate JSON + lint**

Run: `node -e "JSON.parse(require('fs').readFileSync('public/lang/en.json'));JSON.parse(require('fs').readFileSync('public/lang/id_ID.json'));console.log('OK')"`
Expected: `OK`
Run: `npx eslint -c config/linting/eslint.frontend.json --ext .ts src/frontend/components/context/contextMenus.ts`
Expected: no new errors.

- [ ] **Step 6: Commit**

```bash
git add src/frontend/components/context/contextMenus.ts public/lang/en.json public/lang/id_ID.json
git commit -m "feat(quick-edit): add Quick Edit context menu item + labels"
```

---

## Task 3: Menu click handler

**Files:**
- Modify: `src/frontend/components/context/menuClick.ts`

- [ ] **Step 1: Import the store**

Ensure `quickEditSlide` is imported from stores at the top of `menuClick.ts`. Find the existing `import { … } from "../../stores"` line and add `quickEditSlide` to it.

- [ ] **Step 2: Add the handler**

Add next to the existing `editSlideText:` handler (search `editSlideText: (obj)`):

```ts
    quick_edit_slide: (obj) => {
        if (obj.sel.id !== "slide") return
        const slide = obj.sel.data[0]
        if (!slide || slide.showId === undefined || slide.index === undefined) return
        quickEditSlide.set({ showId: slide.showId, index: slide.index })
    },
```

- [ ] **Step 3: Lint**

Run: `npx eslint -c config/linting/eslint.frontend.json --ext .ts src/frontend/components/context/menuClick.ts`
Expected: no new errors (baseline-compared).

- [ ] **Step 4: Commit**

```bash
git add src/frontend/components/context/menuClick.ts
git commit -m "feat(quick-edit): open quick edit popup from context menu"
```

---

## Task 4: Floating popup component

**Files:**
- Create: `src/frontend/components/edit/QuickEditSlide.svelte`
- Reference: `src/frontend/components/slide/Slide.svelte:446-458` (list-view quickEdit reuse of `<Editbox … plain />`), `src/frontend/components/helpers/shows.ts` (`_show`)

- [ ] **Step 1: Create the component**

```svelte
<script lang="ts">
    import { onDestroy, onMount } from "svelte"
    import { quickEditSlide, showsCache } from "../../stores"
    import { _show } from "../helpers/shows"
    import Editbox from "./editbox/Editbox.svelte"

    let popupEl: HTMLDivElement | null = null
    let posX = 0
    let posY = 0

    $: target = $quickEditSlide
    $: slideId = target ? _show(target.showId).layouts("active").ref()[0]?.[target.index]?.id || "" : ""
    $: slide = target && slideId ? $showsCache[target.showId]?.slides?.[slideId] : null
    $: textItems = (slide?.items || []).map((item, i) => ({ item, i })).filter((x) => Array.isArray(x.item?.lines))

    function close() {
        quickEditSlide.set(null)
    }

    function onKey(e: KeyboardEvent) {
        if (e.key === "Escape") close()
    }

    function onClickOutside(e: MouseEvent) {
        if (popupEl && !popupEl.contains(e.target as Node)) close()
    }

    // anchor near the clicked slide, clamped to viewport
    function position() {
        const el = document.querySelector(`.slides [data-index="${target?.index}"]`) as HTMLElement | null
        const w = 420
        const h = 260
        if (el) {
            const r = el.getBoundingClientRect()
            posX = Math.min(Math.max(8, r.left), window.innerWidth - w - 8)
            posY = Math.min(r.bottom + 6, window.innerHeight - h - 8)
        } else {
            posX = (window.innerWidth - w) / 2
            posY = (window.innerHeight - h) / 2
        }
    }

    $: if (target) position()

    onMount(() => {
        window.addEventListener("keydown", onKey)
        // delay so the click that opened the menu doesn't immediately close it
        setTimeout(() => window.addEventListener("mousedown", onClickOutside), 0)
    })
    onDestroy(() => {
        window.removeEventListener("keydown", onKey)
        window.removeEventListener("mousedown", onClickOutside)
    })
</script>

{#if target && slide}
    <div class="quick-edit-popup" bind:this={popupEl} style="left:{posX}px;top:{posY}px;">
        <div class="qe-header">
            <span>Quick Edit</span>
            <button class="qe-close" on:click={close} title="Close (Esc)">✕</button>
        </div>
        <div class="qe-body">
            {#if textItems.length}
                {#each textItems as { item, i } (i)}
                    <Editbox {item} ref={{ showId: target.showId, id: slideId }} editIndex={target.index} index={i} plain />
                {/each}
            {:else}
                <p class="qe-empty">No text to edit</p>
            {/if}
        </div>
    </div>
{/if}

<style>
    .quick-edit-popup {
        position: fixed;
        z-index: 5000;
        width: 420px;
        max-height: 320px;
        overflow: auto;
        background: var(--primary-darker);
        border: 1px solid var(--primary-lighter);
        border-radius: 8px;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
    }
    .qe-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 6px 10px;
        background: var(--primary-darkest);
        font-size: 0.85em;
        position: sticky;
        top: 0;
    }
    .qe-close {
        background: none;
        border: none;
        color: var(--text);
        cursor: pointer;
        opacity: 0.7;
    }
    .qe-close:hover {
        opacity: 1;
    }
    .qe-body {
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .qe-empty {
        opacity: 0.6;
        font-size: 0.85em;
        text-align: center;
    }
</style>
```

- [ ] **Step 2: Lint**

Run: `npx eslint -c config/linting/eslint.svelte.js --ext .svelte src/frontend/components/edit/QuickEditSlide.svelte`
Expected: no errors (if `_show(...).layouts("active")` accessor signature differs, adjust to `.layouts([_show(showId).get("settings.activeLayout")])` — verify against `shows.ts` during this task).

- [ ] **Step 3: Commit**

```bash
git add src/frontend/components/edit/QuickEditSlide.svelte
git commit -m "feat(quick-edit): floating popup slide text editor"
```

---

## Task 5: Mount in App

**Files:**
- Modify: `src/frontend/App.svelte`

- [ ] **Step 1: Import + mount**

Add the import with the other component imports near the top of `App.svelte`:

```ts
    import QuickEditSlide from "./components/edit/QuickEditSlide.svelte"
```

Mount it next to `<Popup />` (inside the `{:else if $loaded}` block, right after `<Popup />`):

```svelte
            <Popup />
            <QuickEditSlide />
```

- [ ] **Step 2: Lint**

Run: `npx eslint -c config/linting/eslint.svelte.js --ext .svelte src/frontend/App.svelte`
Expected: no new errors (baseline-compared).

- [ ] **Step 3: Commit**

```bash
git add src/frontend/App.svelte
git commit -m "feat(quick-edit): mount QuickEditSlide popup at app root"
```

---

## Task 6: Build + manual verification

- [ ] **Step 1: Unit tests still pass**

Run: `npm run test:unit`
Expected: all pass (unchanged).

- [ ] **Step 2: Full build**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 3: Package DMG (local test only — do NOT publish)**

Run: `npx electron-builder --config config/building/electron-builder.yaml --mac dmg --arm64 --publish never`
Expected: `dist/FreeShowPlus-<version>-arm64.dmg` created.

- [ ] **Step 4: Manual checks**
  - Right-click a text slide → **Quick Edit** → popup appears anchored to the slide.
  - Edit text; if that slide is currently live, the output updates in real-time.
  - **Esc** and **click-outside** both close the popup.
  - A slide with no text items shows "No text to edit".
  - Reload the show → the edit persisted.

## Self-review notes

- Spec coverage: store (T1), context item + labels (T2), handler (T3), popup component with Editbox reuse + anchor + Esc/click-outside + empty state (T4), mount (T5), build/verify (T6). ✓
- Names consistent: store `quickEditSlide` `{ showId, index }`, action `quick_edit_slide`, component `QuickEditSlide.svelte`, label key `actions.quick_edit`.
- Live update relies on `<Editbox … plain />` writing to `showsCache` (same as list-view quickEdit) — no extra wiring.
- Uncertain accessor `_show(showId).layouts("active").ref()` flagged in T4 with a concrete fallback.
