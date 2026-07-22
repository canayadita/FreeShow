# Show Quick-Style Toolbar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a persistent toolbar to the Show tab's slide-grid header letting the operator change font family, color, size, and text alignment live — for the currently-selected slide or every slide in the show — without opening the Edit tab.

**Architecture:** A pure logic file (`quickStyleMath.ts`, testable in isolation) resolves which slide id(s) a change applies to; a store-touching helpers file (`quickStyleActions.ts`) reads current values and applies changes via the existing `addStyle`/`addStyleString` + `history()` pipeline (the exact same primitives `BoxStyle.svelte` already uses in the Edit tab, so undo/redo and template-unlinking behave identically); a new `ShowQuickStyle.svelte` component renders the controls and is mounted from `ShowHeader.svelte`.

**Tech Stack:** Svelte, TypeScript, vitest.

**Spec:** `docs/superpowers/specs/2026-07-22-show-quick-style-toolbar-design.md`

---

## Reference: exact behavior this plan reuses

- **`_show(showId).slides([slideId]).get()[0]`** returns a slide object with an `items` array (`src/frontend/components/helpers/shows.ts`).
- **`getLayoutRef(showId)`** (`src/frontend/components/helpers/show.ts:381`) returns a `LayoutRef[]` array indexed by layout position, each with an `.id` — this turns a slide-grid index into the actual slide id.
- **`getStyles(cssString)`** (`src/frontend/components/helpers/style.ts`) parses a CSS string into a flat `{ [property]: value }` object.
- **`addStyle(selection, item, [key, value])`** (`src/frontend/components/edit/scripts/textStyle.ts`) replaces exactly one CSS declaration across an item's lines within the given selection ranges, preserving every other property. **Mutates its `item` argument** — always pass a `clone()` of the item, matching `BoxStyle.svelte:533`'s own `addStyle(selected, clone(currentSlideItem), [input.key, input.value])`.
- **`addStyleString(oldStyle, [key, value])`** — the same single-property replace, but operating on a raw style string directly (used for per-line `align` and item-level `align-items`, which aren't stored as run-level styles).
- **`getLineText(line)`** (`src/frontend/components/edit/scripts/textStyle.ts`) returns a line's plain text — `.length` gives the "whole line" selection range when nothing is explicitly selected, matching `BoxStyle.svelte:513-519`'s own no-selection default.
- **`history({ id: "textStyle" | "textAlign" | "setItems", newData: { style: { key, values } }, location: { page: "edit", show, slide, items } })`** — `values` is an array parallel to `items` (one entry per item index). `id: "textStyle"` for font-family/color/font-size (`key: "text"`), `id: "textAlign"` for horizontal text-align (`key: "align"`), `id: "setItems"` for vertical align-items (`key: "align"`).
- **`wait(ms)`** (`src/frontend/utils/common.ts`) — `await wait(10)` between successive `history()` calls when looping over multiple slides, matching the existing bulk-apply precedent in `menuClick.ts`'s `format()`/`paste_text_style`.
- **Alignment icons already exist and are already wired to this exact purpose**: `alignLeft`/`alignCenter`/`alignRight` (horizontal), `alignTop`/`alignMiddle`/`alignBottom` (vertical) — `src/frontend/values/icons.ts`, no placeholder needed.
- **`MaterialColorInput`**: `value`/`defaultValue`/`label` props, dispatches `change`/`input` with `e.detail` as the plain color string directly (not `e.detail.value`).

---

### Task 1: Pure slide-targeting logic (TDD)

**Files:**
- Create: `src/frontend/components/show/quickStyleMath.ts`
- Test: `src/frontend/components/show/quickStyleMath.test.ts`

- [ ] **Step 1: Write the failing tests**

```ts
// src/frontend/components/show/quickStyleMath.test.ts
import { describe, expect, it } from "vitest"
import { selectTargetSlideIdsFromRef } from "./quickStyleMath"

describe("selectTargetSlideIdsFromRef", () => {
    const ref = [{ id: "a" }, { id: "b" }, { id: "c" }] as any

    it("returns every slide id when scope is 'all'", () => {
        expect(selectTargetSlideIdsFromRef(ref, "all", null)).toEqual(["a", "b", "c"])
        expect(selectTargetSlideIdsFromRef(ref, "all", 1)).toEqual(["a", "b", "c"])
    })

    it("returns just the selected slide's id when scope is 'slide'", () => {
        expect(selectTargetSlideIdsFromRef(ref, "slide", 1)).toEqual(["b"])
    })

    it("returns an empty array when scope is 'slide' and nothing is selected", () => {
        expect(selectTargetSlideIdsFromRef(ref, "slide", null)).toEqual([])
    })

    it("returns an empty array when the selected index is out of range", () => {
        expect(selectTargetSlideIdsFromRef(ref, "slide", 99)).toEqual([])
    })

    it("filters out ref entries with no id when scope is 'all'", () => {
        const refWithGap = [{ id: "a" }, {}, { id: "c" }] as any
        expect(selectTargetSlideIdsFromRef(refWithGap, "all", null)).toEqual(["a", "c"])
    })
})
```

- [ ] **Step 2: Run the tests and confirm they fail**

Run: `npx vitest run --config config/testing/vitest.config.ts src/frontend/components/show/quickStyleMath.test.ts`
Expected: FAIL — `quickStyleMath.ts` does not exist yet.

- [ ] **Step 3: Implement the pure helper**

```ts
// src/frontend/components/show/quickStyleMath.ts
// Pure, store-free logic for the Show quick-style toolbar — kept separate from
// quickStyleActions.ts (which pulls in the store/history system) so it's unit-testable
// in isolation, mirroring the blendsMath.ts/blends.ts split used by the Mixer feature.
export type QuickStyleScope = "slide" | "all"

// Given a layout's ref array (as returned by getLayoutRef()) and the current scope/selection,
// return the slide id(s) a quick-style change should apply to.
export function selectTargetSlideIdsFromRef(ref: { id?: string }[], scope: QuickStyleScope, selectedIndex: number | null): string[] {
    if (scope === "all") return ref.map((r) => r?.id).filter((id): id is string => !!id)
    if (selectedIndex === null) return []
    const id = ref[selectedIndex]?.id
    return id ? [id] : []
}
```

- [ ] **Step 4: Run the tests and confirm they pass**

Run: `npx vitest run --config config/testing/vitest.config.ts src/frontend/components/show/quickStyleMath.test.ts`
Expected: PASS — all 5 tests green.

- [ ] **Step 5: Commit**

```bash
git add src/frontend/components/show/quickStyleMath.ts src/frontend/components/show/quickStyleMath.test.ts
git commit -m "feat(show): add quickStyleMath pure slide-targeting helper + tests"
```

---

### Task 2: Store-touching read/apply helpers

**Files:**
- Create: `src/frontend/components/show/quickStyleActions.ts`

- [ ] **Step 1: Implement the helpers**

```ts
// src/frontend/components/show/quickStyleActions.ts
import type { Item } from "../../../types/Show"
import { addStyle, addStyleString, getLineText } from "../edit/scripts/textStyle"
import { clone } from "../helpers/array"
import { history } from "../helpers/history"
import { getLayoutRef } from "../helpers/show"
import { _show } from "../helpers/shows"
import { getStyles } from "../helpers/style"
import { wait } from "../../utils/common"
import { selectTargetSlideIdsFromRef, type QuickStyleScope } from "./quickStyleMath"

export type { QuickStyleScope }

// Resolve which slide id(s) a quick-style change should apply to, given the current scope/selection.
export function resolveTargetSlideIds(showId: string, scope: QuickStyleScope, selectedIndex: number | null): string[] {
    return selectTargetSlideIdsFromRef(getLayoutRef(showId), scope, selectedIndex)
}

function getTextItems(showId: string, slideId: string): { index: number; item: Item }[] {
    const items: Item[] = _show(showId).slides([slideId]).get()[0]?.items || []
    return items.map((item, index) => ({ index, item })).filter(({ item }) => (item.type || "text") === "text")
}

// Read the current font-family/color/font-size/alignment from a slide's first text item,
// to seed the toolbar's inputs when the target slide changes. Returns null if the slide
// has no text item yet.
export function readCurrentStyle(showId: string, slideId: string) {
    const item = getTextItems(showId, slideId)[0]?.item
    if (!item) return null

    const runStyle = item.lines?.[0]?.text?.[0]?.style || item.style || ""
    const styles = getStyles(runStyle)

    return {
        fontFamily: styles["font-family"] || "",
        color: styles["color"] || "",
        fontSize: styles["font-size"] || "",
        textAlign: item.lines?.[0]?.align || "left",
        alignItems: getStyles(item.align || "")["align-items"] || "center"
    }
}

// Apply one font-family/color/font-size change to every text item on every target slide,
// preserving every other style property already on each item.
export async function applyTextStyle(showId: string, slideIds: string[], key: "font-family" | "color" | "font-size", value: string) {
    for (const slideId of slideIds) {
        const textItems = getTextItems(showId, slideId)
        if (!textItems.length) continue

        const values = textItems.map(({ item }) => {
            const selection = (item.lines || []).map((line) => ({ start: 0, end: getLineText(line).length }))
            return addStyle(selection, clone(item), [key, value]).lines!.map((line) => line.text)
        })

        history({
            id: "textStyle",
            newData: { style: { key: "text", values } },
            location: { page: "edit", show: showId, slide: slideId, items: textItems.map((t) => t.index) }
        })

        await wait(10)
    }
}

// Apply horizontal text alignment to every text item's lines on every target slide.
export async function applyTextAlign(showId: string, slideIds: string[], value: string) {
    for (const slideId of slideIds) {
        const textItems = getTextItems(showId, slideId)
        if (!textItems.length) continue

        const values = textItems.map(({ item }) => (item.lines || []).map((line) => addStyleString(line.align || "", ["text-align", value])))

        history({
            id: "textAlign",
            newData: { style: { key: "align", values } },
            location: { page: "edit", show: showId, slide: slideId, items: textItems.map((t) => t.index) }
        })

        await wait(10)
    }
}

// Apply vertical alignment (align-items) to every text item on every target slide.
export async function applyVerticalAlign(showId: string, slideIds: string[], value: string) {
    for (const slideId of slideIds) {
        const textItems = getTextItems(showId, slideId)
        if (!textItems.length) continue

        const values = textItems.map(({ item }) => addStyleString(item.align || "", ["align-items", value]))

        history({
            id: "setItems",
            newData: { style: { key: "align", values } },
            location: { page: "edit", show: showId, slide: slideId, items: textItems.map((t) => t.index) }
        })

        await wait(10)
    }
}
```

- [ ] **Step 2: Typecheck**

Run: `npx svelte-check --tsconfig ./src/frontend/tsconfig.json 2>&1 | tail -30`
Expected: no new errors mentioning `quickStyleActions.ts`. (Pre-existing baseline of unrelated errors — ignore those.)

- [ ] **Step 3: Commit**

```bash
git add src/frontend/components/show/quickStyleActions.ts
git commit -m "feat(show): add quick-style read/apply helpers (reuse addStyle/history)"
```

---

### Task 3: `ShowQuickStyle.svelte` component

**Files:**
- Create: `src/frontend/components/show/ShowQuickStyle.svelte`

- [ ] **Step 1: Check `MaterialFontDropdown.svelte`'s exact props first**

Read `src/frontend/components/inputs/MaterialFontDropdown.svelte` before writing this component. Confirm it accepts `label`, `value`, and a `disabled` prop, and dispatches `change`. If it does **not** support `disabled`, omit the `disabled` binding on that one control only (leave every other control's `disabled` binding as specified below) and note this in your self-review — don't guess at an undocumented prop.

- [ ] **Step 2: Implement the component**

```svelte
<!-- src/frontend/components/show/ShowQuickStyle.svelte -->
<script lang="ts">
    import { selected } from "../../stores"
    import Icon from "../helpers/Icon.svelte"
    import MaterialButton from "../inputs/MaterialButton.svelte"
    import MaterialColorInput from "../inputs/MaterialColorInput.svelte"
    import MaterialFontDropdown from "../inputs/MaterialFontDropdown.svelte"
    import MaterialNumberInput from "../inputs/MaterialNumberInput.svelte"
    import { applyTextAlign, applyTextStyle, applyVerticalAlign, readCurrentStyle, resolveTargetSlideIds, type QuickStyleScope } from "./quickStyleActions"

    export let showId: string

    let scope: QuickStyleScope = "slide"

    $: selectedIndex = $selected.id === "slide" ? ($selected.data[0]?.index ?? null) : null
    $: previewSlideId = resolveTargetSlideIds(showId, "slide", selectedIndex)[0] || ""
    $: current = previewSlideId ? readCurrentStyle(showId, previewSlideId) : null
    $: disabled = scope === "slide" && selectedIndex === null

    function targetIds() {
        return resolveTargetSlideIds(showId, scope, selectedIndex)
    }

    function changeFontFamily(value: string) {
        applyTextStyle(showId, targetIds(), "font-family", value)
    }
    function changeColor(value: string) {
        applyTextStyle(showId, targetIds(), "color", value)
    }
    function changeFontSize(value: number) {
        applyTextStyle(showId, targetIds(), "font-size", `${value}px`)
    }
    function changeTextAlign(value: string) {
        applyTextAlign(showId, targetIds(), value)
    }
    function changeVerticalAlign(value: string) {
        applyVerticalAlign(showId, targetIds(), value)
    }
</script>

<div class="quickStyleToolbar">
    <div class="scopeToggle">
        <MaterialButton variant={scope === "slide" ? "contained" : "outlined"} on:click={() => (scope = "slide")}>This Slide</MaterialButton>
        <MaterialButton variant={scope === "all" ? "contained" : "outlined"} on:click={() => (scope = "all")}>All Slides</MaterialButton>
    </div>

    <MaterialFontDropdown label="Font" value={current?.fontFamily || ""} disabled={disabled} on:change={(e) => changeFontFamily(e.detail?.value ?? e.detail)} />
    <MaterialColorInput label="Color" value={current?.color || "#FFFFFF"} defaultValue="#FFFFFF" disabled={disabled} on:input={(e) => changeColor(e.detail)} />
    <MaterialNumberInput label="Size" value={Number(current?.fontSize) || 100} min={1} max={500} disabled={disabled} on:change={(e) => changeFontSize(Number(e.detail))} />

    <div class="alignGroup">
        <MaterialButton {disabled} title="Align left" on:click={() => changeTextAlign("left")}><Icon id="alignLeft" white /></MaterialButton>
        <MaterialButton {disabled} title="Align center" on:click={() => changeTextAlign("center")}><Icon id="alignCenter" white /></MaterialButton>
        <MaterialButton {disabled} title="Align right" on:click={() => changeTextAlign("right")}><Icon id="alignRight" white /></MaterialButton>
    </div>
    <div class="alignGroup">
        <MaterialButton {disabled} title="Align top" on:click={() => changeVerticalAlign("flex-start")}><Icon id="alignTop" white /></MaterialButton>
        <MaterialButton {disabled} title="Align middle" on:click={() => changeVerticalAlign("center")}><Icon id="alignMiddle" white /></MaterialButton>
        <MaterialButton {disabled} title="Align bottom" on:click={() => changeVerticalAlign("flex-end")}><Icon id="alignBottom" white /></MaterialButton>
    </div>
</div>

<style>
    .quickStyleToolbar {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        background-color: rgb(0 0 10 / 0.2);
        flex-wrap: wrap;
    }

    .scopeToggle,
    .alignGroup {
        display: flex;
        gap: 4px;
    }
</style>
```

If Step 1 found `MaterialFontDropdown` does not support `disabled`, remove the `disabled={disabled}` binding from that one line only, leaving the rest of the component as shown.

- [ ] **Step 3: Typecheck**

Run: `npx svelte-check --tsconfig ./src/frontend/tsconfig.json 2>&1 | tail -30`
Expected: no new errors mentioning `ShowQuickStyle.svelte`.

- [ ] **Step 4: Commit**

```bash
git add src/frontend/components/show/ShowQuickStyle.svelte
git commit -m "feat(show): add ShowQuickStyle toolbar component"
```

---

### Task 4: Wire into `ShowHeader.svelte`

**Files:**
- Modify: `src/frontend/components/show/ShowHeader.svelte`

- [ ] **Step 1: Add the import**

In `src/frontend/components/show/ShowHeader.svelte`, the import block currently ends with:

```ts
    import T from "../helpers/T.svelte"
    import MaterialButton from "../inputs/MaterialButton.svelte"
```

change to:

```ts
    import T from "../helpers/T.svelte"
    import MaterialButton from "../inputs/MaterialButton.svelte"
    import ShowQuickStyle from "./ShowQuickStyle.svelte"
```

- [ ] **Step 2: Render it right after the header row**

Find the closing of the `.header` div:

```svelte
        {/if}
    </div>
</div>

<style>
```

change to:

```svelte
        {/if}
    </div>
</div>

<ShowQuickStyle {showId} />

<style>
```

- [ ] **Step 3: Typecheck**

Run: `npx svelte-check --tsconfig ./src/frontend/tsconfig.json 2>&1 | tail -30`
Expected: no new errors mentioning `ShowHeader.svelte`.

- [ ] **Step 4: Commit**

```bash
git add src/frontend/components/show/ShowHeader.svelte
git commit -m "feat(show): mount the quick-style toolbar under the Show header"
```

- [ ] **Step 5: Manual verification**

No automated test covers the full live-editing flow (it's integration glue over already-tested primitives — same rationale as this session's Mixer work). Run the app and verify by hand:

1. Open a show with text slides, click one slide thumbnail.
2. In the new toolbar under the show title, confirm the font/color/size/alignment controls are now enabled and show that slide's current values.
3. Change the color — confirm only that slide's text color changes (font-size/family untouched), and the change is visible immediately (whether or not that slide is currently live on output).
4. Click another slide — confirm the toolbar's displayed values update to match it.
5. Switch scope to "All Slides", change the font size — confirm every slide in the show updates.
6. Press Undo (however this project's undo shortcut/menu works) — confirm the change reverts, proving it went through the standard `history()` system.
7. With no slide selected (fresh show open, before any click) and scope on "This Slide" — confirm the toolbar shows disabled controls rather than erroring.

---

## Plan self-review notes

- **Spec coverage:** pure targeting logic (Task 1), read/apply helpers (Task 2), UI component (Task 3), header wiring (Task 4) — all four spec sections (Scope, Data flow, UI, File structure) are covered.
- **Type consistency:** `QuickStyleScope` defined once in `quickStyleMath.ts`, re-exported from `quickStyleActions.ts`, imported from there by `ShowQuickStyle.svelte` — no duplicate/drifting type definitions.
- **Known open item, called out explicitly rather than guessed:** `MaterialFontDropdown.svelte`'s exact `disabled` prop support is unconfirmed from research alone — Task 3 Step 1 requires the implementer to verify this directly before writing the component, rather than the plan asserting it as fact.
