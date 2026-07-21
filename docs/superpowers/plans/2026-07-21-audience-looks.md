# Audience Looks Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a curated, named list of "Looks" that switch the audience output's Output Style(s) live in one click, from a button row under the output preview in the Show view.

**Architecture:** A new `looks` store (persisted) holds `Look` objects mapping `outputId → styleId`. Clicking a Look applies each mapped style via the existing `changeOutputStyle()` path. A `LooksBar.svelte` renders the buttons in `Preview.svelte`; a `LooksEdit` popup manages name/color/per-output style/delete. Pure mapping logic lives in `helpers/looks.ts` and is unit-tested.

**Tech Stack:** Svelte 4, TypeScript, Svelte stores, vitest.

---

## File Structure

- `src/types/Look.ts` — `Look` interface (new).
- `src/frontend/stores.ts` — add `looks`, `activeLook` stores (modify).
- `src/frontend/utils/save.ts` — persist `looks` (modify).
- `src/frontend/components/helpers/looks.ts` — pure helpers + apply/create/update/delete (new).
- `src/frontend/components/helpers/looks.test.ts` — unit tests for pure helpers (new).
- `src/frontend/components/output/preview/LooksBar.svelte` — button row (new).
- `src/frontend/components/output/preview/Preview.svelte` — mount `LooksBar` (modify).
- `src/frontend/components/main/popups/LooksEdit.svelte` — edit popup (new).
- `src/frontend/utils/popup.ts` — register `looks_edit` popup (modify).
- `src/types/Main.ts` (Popups type) — add `"looks_edit"` (modify, if Popups is a string union there).
- `public/lang/en.json`, `public/lang/id_ID.json` — labels (modify).

---

## Task 1: Look type + stores + persistence

**Files:**
- Create: `src/types/Look.ts`
- Modify: `src/frontend/stores.ts`
- Modify: `src/frontend/utils/save.ts`

- [ ] **Step 1: Create the Look type**

Create `src/types/Look.ts`:

```ts
export interface Look {
    name: string
    color?: string
    outputStyles: { [outputId: string]: string } // outputId -> Output Style id
    index?: number
}
```

- [ ] **Step 2: Add stores**

In `src/frontend/stores.ts`, add an import near the other type imports:

```ts
import type { Look } from "../types/Look"
```

And add these two stores next to `activeStyle` (around line 68):

```ts
export const looks: Writable<{ [key: string]: Look }> = writable({})
export const activeLook: Writable<string> = writable("") // session-only, not persisted
```

- [ ] **Step 3: Persist `looks`**

In `src/frontend/utils/save.ts`:
1. Add `looks,` to the store import block (alphabetical area near `loaded`/`media`).
2. Add `looks,` next to `styles,` in the config-save object around line 253.
3. Add `looks,` next to `styles,` in the save map around line 454.

(`activeLook` is intentionally NOT added — session-only.)

- [ ] **Step 4: Verify build compiles**

Run: `npx svelte-check 2>&1 | grep -E "types/Look|stores.ts|save.ts" | head`
Expected: no new errors for these files.

- [ ] **Step 5: Commit**

```bash
git add src/types/Look.ts src/frontend/stores.ts src/frontend/utils/save.ts
git commit -m "feat(looks): Look type + looks/activeLook stores + persistence"
```

---

## Task 2: Pure helpers + unit tests (TDD)

**Files:**
- Create: `src/frontend/components/helpers/looks.test.ts`
- Create: `src/frontend/components/helpers/looks.ts`

The pure functions have NO store/DOM dependency so they are unit-testable. The side-effecting
functions (apply/create/delete against stores) live in the same file but are thin wrappers.

- [ ] **Step 1: Write the failing test**

Create `src/frontend/components/helpers/looks.test.ts`:

```ts
import { describe, expect, it } from "vitest"
import { buildOutputStylesFromCurrent, getLookStyleChanges } from "./looks"

describe("buildOutputStylesFromCurrent", () => {
    it("maps each output id to its current style id", () => {
        const outputs = [
            { id: "o1", style: "styleA" },
            { id: "o2", style: "styleB" }
        ]
        expect(buildOutputStylesFromCurrent(outputs)).toEqual({ o1: "styleA", o2: "styleB" })
    })

    it("uses empty string for an output with no style", () => {
        const outputs = [{ id: "o1", style: "" }, { id: "o2" }]
        expect(buildOutputStylesFromCurrent(outputs as any)).toEqual({ o1: "", o2: "" })
    })
})

describe("getLookStyleChanges", () => {
    const look = { name: "Worship", outputStyles: { o1: "styleA", o2: "styleB", gone: "styleX" } }

    it("returns one change per mapped output that still exists", () => {
        const changes = getLookStyleChanges(look, ["o1", "o2"])
        expect(changes).toEqual([
            { outputId: "o1", styleId: "styleA" },
            { outputId: "o2", styleId: "styleB" }
        ])
    })

    it("skips outputs that no longer exist", () => {
        const changes = getLookStyleChanges(look, ["o1"])
        expect(changes).toEqual([{ outputId: "o1", styleId: "styleA" }])
    })

    it("returns empty for a look with no mapping", () => {
        expect(getLookStyleChanges({ name: "x", outputStyles: {} }, ["o1"])).toEqual([])
    })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run --config config/testing/vitest.config.ts src/frontend/components/helpers/looks.test.ts`
Expected: FAIL — "buildOutputStylesFromCurrent is not a function" (module has no exports yet).

- [ ] **Step 3: Write the implementation**

Create `src/frontend/components/helpers/looks.ts`:

```ts
import { get } from "svelte/store"
import { uid } from "uid"
import type { Look } from "../../../types/Look"
import { activeLook, looks } from "../../stores"
import { getAllNormalOutputs } from "./output"
import { changeOutputStyle } from "./showActions"

// PURE: build an outputId->styleId map from a list of outputs
export function buildOutputStylesFromCurrent(outputs: { id: string; style?: string }[]): { [id: string]: string } {
    const map: { [id: string]: string } = {}
    for (const o of outputs) map[o.id] = o.style || ""
    return map
}

// PURE: the concrete style changes a look implies, skipping outputs that no longer exist
export function getLookStyleChanges(look: Pick<Look, "outputStyles">, existingOutputIds: string[]): { outputId: string; styleId: string }[] {
    const set = new Set(existingOutputIds)
    return Object.entries(look.outputStyles || {})
        .filter(([outputId]) => set.has(outputId))
        .map(([outputId, styleId]) => ({ outputId, styleId }))
}

// SIDE-EFFECTING: apply a look live to the audience outputs
export function applyLook(lookId: string) {
    const look = get(looks)[lookId]
    if (!look) return
    const existingIds = getAllNormalOutputs().map((a) => a.id)
    getLookStyleChanges(look, existingIds).forEach(({ outputId, styleId }) => {
        changeOutputStyle({ outputId, styleId })
    })
    activeLook.set(lookId)
}

// SIDE-EFFECTING: create a look capturing the current output styles, returns new id
export function createLookFromCurrent(): string {
    const id = uid()
    const outputStyles = buildOutputStylesFromCurrent(getAllNormalOutputs().map((a) => ({ id: a.id, style: a.style })))
    const index = Object.keys(get(looks)).length
    looks.update((a) => {
        a[id] = { name: "New Look", outputStyles, index }
        return a
    })
    return id
}

export function updateLook(lookId: string, changes: Partial<Look>) {
    looks.update((a) => {
        if (a[lookId]) a[lookId] = { ...a[lookId], ...changes }
        return a
    })
}

export function deleteLook(lookId: string) {
    looks.update((a) => {
        delete a[lookId]
        return a
    })
    if (get(activeLook) === lookId) activeLook.set("")
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run --config config/testing/vitest.config.ts src/frontend/components/helpers/looks.test.ts`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add src/frontend/components/helpers/looks.ts src/frontend/components/helpers/looks.test.ts
git commit -m "feat(looks): pure look-mapping helpers + apply/create/update/delete (tested)"
```

---

## Task 3: LooksEdit popup

**Files:**
- Create: `src/frontend/components/main/popups/LooksEdit.svelte`
- Modify: `src/frontend/utils/popup.ts`
- Modify: `src/frontend/types/Main.ts` (Popups union — only if it is a string union; otherwise skip)
- Modify: `public/lang/en.json`, `public/lang/id_ID.json`

- [ ] **Step 1: Create the popup component**

Create `src/frontend/components/main/popups/LooksEdit.svelte`:

```svelte
<script lang="ts">
    import { keysToID, sortByName } from "../../helpers/array"
    import { activePopup, looks, popupData, styles } from "../../../stores"
    import { deleteLook, updateLook } from "../../helpers/looks"
    import { getAllNormalOutputs } from "../../helpers/output"
    import { translateText } from "../../../utils/language"
    import T from "../../helpers/T.svelte"
    import MaterialButton from "../../inputs/MaterialButton.svelte"
    import MaterialTextInput from "../../inputs/MaterialTextInput.svelte"
    import MaterialDropdown from "../../inputs/MaterialDropdown.svelte"

    $: lookId = $popupData.lookId || ""
    $: look = $looks[lookId]

    $: outputs = getAllNormalOutputs()
    // depends on $styles so the dropdown stays in sync when styles change
    $: styleOptions = [{ id: "", name: translateText("main.none") }, ...sortByName(keysToID($styles), "name").map((s) => ({ id: s.id, name: s.name }))]

    function setName(v: string) { updateLook(lookId, { name: v }) }
    function setStyle(outputId: string, styleId: string) {
        const outputStyles = { ...(look?.outputStyles || {}), [outputId]: styleId }
        updateLook(lookId, { outputStyles })
    }
    function remove() { deleteLook(lookId); activePopup.set(null) }
</script>

{#if look}
    <MaterialTextInput label="inputs.name" value={look.name} on:change={(e) => setName(e.detail)} />
    {#each outputs as output}
        <MaterialDropdown label={output.name || "Output"} value={look.outputStyles?.[output.id] || ""} options={styleOptions} on:change={(e) => setStyle(output.id, e.detail?.id ?? e.detail)} />
    {/each}
    <MaterialButton variant="outlined" icon="delete" style="width: 100%;justify-content:center;" on:click={remove}>
        <T id="actions.delete" />
    </MaterialButton>
{/if}
```

Note: if `MaterialDropdown`/`MaterialTextInput`/`MaterialButton` prop names differ, match the usage already in `settings/tabs/Outputs.svelte` (it uses all three).

- [ ] **Step 2: Register the popup**

In `src/frontend/utils/popup.ts`, import and register (mirroring the existing `assign_shortcut: SlideShortcut` entry):

```ts
import LooksEdit from "../components/main/popups/LooksEdit.svelte"
// ... in the popups map:
    looks_edit: LooksEdit,
```

If `Popups` is a string-literal union type, add `"looks_edit"` to it (search `type Popups =`).

- [ ] **Step 3: Add labels**

In `public/lang/en.json` and `public/lang/id_ID.json`, ensure `main.none` exists (it does) and add under `"popup"`:
- en: `"looks_edit": "Edit Look"`
- id: `"looks_edit": "Edit Look"` (English per project preference)

- [ ] **Step 4: Verify build**

Run: `npx svelte-check 2>&1 | grep -E "LooksEdit|popup.ts" | head`
Expected: no new errors.

- [ ] **Step 5: Commit**

```bash
git add src/frontend/components/main/popups/LooksEdit.svelte src/frontend/utils/popup.ts src/frontend/types/Main.ts public/lang/en.json public/lang/id_ID.json
git commit -m "feat(looks): LooksEdit popup (name + per-output style + delete)"
```

---

## Task 4: LooksBar + mount in Preview

**Files:**
- Create: `src/frontend/components/output/preview/LooksBar.svelte`
- Modify: `src/frontend/components/output/preview/Preview.svelte`

- [ ] **Step 1: Create the LooksBar**

Create `src/frontend/components/output/preview/LooksBar.svelte`:

```svelte
<script lang="ts">
    import { activeLook, activePopup, looks, popupData } from "../../../stores"
    import { applyLook, createLookFromCurrent } from "../../helpers/looks"
    import { sortObjectNumbers } from "../../helpers/array"
    import { keysToID } from "../../helpers/array"
    import Icon from "../../helpers/Icon.svelte"
    import MaterialButton from "../../inputs/MaterialButton.svelte"

    $: lookList = sortObjectNumbers(keysToID($looks), "index")

    function openEdit(id: string) {
        popupData.set({ lookId: id })
        activePopup.set("looks_edit")
    }
    function addLook() {
        const id = createLookFromCurrent()
        openEdit(id)
    }
</script>

<div class="looksBar">
    {#each lookList as look}
        <button class="look" class:active={$activeLook === look.id} title={look.name} on:click={() => applyLook(look.id)} on:contextmenu|preventDefault={() => openEdit(look.id)}>
            {#if look.color}<span class="dot" style="background:{look.color};" />{/if}
            <span class="label">{look.name}</span>
        </button>
    {/each}
    <MaterialButton icon="add" title="new.look" on:click={addLook} />
</div>

<style>
    .looksBar {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        padding: 5px;
        align-items: center;
    }
    .look {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 4px 10px;
        border-radius: 6px;
        background: var(--primary-lighter);
        color: var(--text);
        border: 2px solid transparent;
        cursor: pointer;
        font-size: 0.8em;
    }
    .look.active { border-color: var(--secondary); }
    .look:hover { filter: brightness(1.2); }
    .dot { width: 10px; height: 10px; border-radius: 50%; }
</style>
```

- [ ] **Step 2: Mount in Preview**

In `src/frontend/components/output/preview/Preview.svelte`:
1. Add import near the other component imports: `import LooksBar from "./LooksBar.svelte"`
2. Insert `<LooksBar />` immediately AFTER the `ShowActions` section `</div>` (the `<div class="section" ...><ShowActions .../></div>` block around line 272–274), before the next `<div class="section" style="margin-top: 2px;">`.

- [ ] **Step 3: Add labels**

Add `"look": "New Look"` under `"new"` in `public/lang/en.json` and `public/lang/id_ID.json`.

- [ ] **Step 4: Verify build**

Run: `npx svelte-check 2>&1 | grep -E "LooksBar|preview/Preview.svelte" | head`
Expected: no new errors (baseline Preview errors, if any, unchanged).

- [ ] **Step 5: Commit**

```bash
git add src/frontend/components/output/preview/LooksBar.svelte src/frontend/components/output/preview/Preview.svelte public/lang/en.json public/lang/id_ID.json
git commit -m "feat(looks): LooksBar button row under output preview (apply/create/edit)"
```

---

## Task 5: Full verification + build DMG

**Files:** none (verification only)

- [ ] **Step 1: Run all unit tests**

Run: `npx vitest run --config config/testing/vitest.config.ts`
Expected: all pass (existing 66 + 5 new looks tests).

- [ ] **Step 2: Full type check (no new errors)**

Run: `npx svelte-check 2>&1 | grep "svelte-check found"`
Expected: error count == baseline (241), i.e. zero new errors from Looks files.

- [ ] **Step 3: Build local DMG for visual review**

Run: `npm run build && npx electron-builder --config config/building/electron-builder.yaml --mac dmg --arm64 --publish never`
Expected: `dist/FreeShowPlus-<version>-arm64.dmg` produced.

- [ ] **Step 4: Manual review checklist (in the DMG)**
  - `+` under the output preview creates a Look and opens the edit popup.
  - Naming + picking a style in the popup updates the Look.
  - Clicking a Look applies its style to the audience output live (background/template changes, slide unchanged).
  - Active Look is highlighted.
  - Right-click a Look opens its edit popup; delete removes it.
  - Restart app → Looks persist (activeLook highlight resets — expected).

---

## Notes for the implementer

- Applying a Look must NOT change the current slide/content — `changeOutputStyle` only swaps the output style; do not call any slide/output content setter.
- Only normal (audience) outputs are targeted via `getAllNormalOutputs()`. Stage outputs are out of scope.
- Match existing Material input component prop names by copying usage from `src/frontend/components/settings/tabs/Outputs.svelte`.
- Keep `activeLook` session-only; do not add it to `save.ts`.
