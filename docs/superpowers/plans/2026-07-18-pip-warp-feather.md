# PiP Corner-Pin Warp + Edge Feather — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add per-pane corner-pin warp (4 draggable/numeric corners, keystone/projection mapping) and per-edge feather (transparent gradient fade on each side) to Picture-in-Picture.

**Architecture:** Warp is a 2D projective (homography) transform rendered as CSS `matrix3d`, computed by a pure, unit-tested module. Feather is a CSS `mask-image` built from up to four edge linear-gradients. Both are applied on the pane element in `MultiPaneLayer`; the PiP editor gains numeric inputs, corner drag-handles, and per-side feather sliders. Warp/feather data lives on the `Pane` object so it persists with layouts/templates/shows.

**Tech Stack:** Svelte 4, TypeScript, Electron, vitest, CSS matrix3d + mask-image.

---

## File Structure

- `src/types/Show.ts` — add `warp` and `feather` to `Pane`.
- `src/frontend/components/output/layers/warpMatrix.ts` (new) — pure homography math (`computeProjection`, `projectPoint`, `getWarpMatrix`, `hasWarp`).
- `src/frontend/components/output/layers/warpMatrix.test.ts` (new) — vitest for the math.
- `src/frontend/components/output/layers/MultiPaneLayer.svelte` — apply warp transform + feather mask in `getPaneStyle`.
- `src/frontend/components/drawer/pip/PiP.svelte` — feather sliders, warp numeric inputs, warp-mode toggle + corner drag-handles, helpers.

---

## Task 1: Types

**Files:**
- Modify: `src/types/Show.ts` (inside `export interface Pane`)

- [ ] **Step 1: Add warp + feather fields**

In `interface Pane`, after the `rotate3d?...` line, add:

```ts
    warp?: { tl: { x: number; y: number }; tr: { x: number; y: number }; br: { x: number; y: number }; bl: { x: number; y: number } } // per-corner offset in % of pane size; absent/all-zero = no warp
    feather?: { left: number; right: number; top: number; bottom: number } // 0-50 (% of pane w/h faded to transparent per edge)
```

- [ ] **Step 2: Lint**

Run: `npx eslint -c config/linting/eslint.frontend.json --ext .ts src/types/Show.ts`
Expected: no new errors (compare to baseline for this file).

- [ ] **Step 3: Commit**

```bash
git add src/types/Show.ts
git commit -m "feat(pip): add warp + feather fields to Pane"
```

---

## Task 2: Warp homography math (TDD)

**Files:**
- Create: `src/frontend/components/output/layers/warpMatrix.ts`
- Test: `src/frontend/components/output/layers/warpMatrix.test.ts`

- [ ] **Step 1: Write the failing tests**

```ts
import { describe, it, expect } from "vitest"
import { computeProjection, projectPoint, getWarpMatrix, hasWarp } from "./warpMatrix"

const zero = { tl: { x: 0, y: 0 }, tr: { x: 0, y: 0 }, br: { x: 0, y: 0 }, bl: { x: 0, y: 0 } }

describe("warpMatrix", () => {
    it("hasWarp is false for all-zero and missing", () => {
        expect(hasWarp(undefined)).toBe(false)
        expect(hasWarp(zero)).toBe(false)
        expect(hasWarp({ ...zero, tl: { x: 5, y: 0 } })).toBe(true)
    })

    it("identity: source corners map back to themselves", () => {
        const w = 200, h = 100
        const t = computeProjection(w, h, zero)
        expect(projectPoint(t, 0, 0)).toEqual({ x: 0, y: 0 })
        const tr = projectPoint(t, w, 0)
        expect(tr.x).toBeCloseTo(w, 3)
        expect(tr.y).toBeCloseTo(0, 3)
        const br = projectPoint(t, w, h)
        expect(br.x).toBeCloseTo(w, 3)
        expect(br.y).toBeCloseTo(h, 3)
    })

    it("keystone: shifting top-left corner moves the projected (0,0) by that offset", () => {
        const w = 200, h = 100
        // tl offset +10% x, +20% y  => +20px, +20px
        const corners = { ...zero, tl: { x: 10, y: 20 } }
        const t = computeProjection(w, h, corners)
        const p = projectPoint(t, 0, 0)
        expect(p.x).toBeCloseTo(20, 3)
        expect(p.y).toBeCloseTo(20, 3)
    })

    it("getWarpMatrix returns empty string when there is no warp", () => {
        expect(getWarpMatrix(200, 100, undefined)).toBe("")
        expect(getWarpMatrix(200, 100, zero)).toBe("")
    })

    it("getWarpMatrix returns a matrix3d string when warped", () => {
        const m = getWarpMatrix(200, 100, { ...zero, tr: { x: -5, y: 5 } })
        expect(m.startsWith("matrix3d(")).toBe(true)
    })
})
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm run test:unit -- warpMatrix`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement**

```ts
import type { Pane } from "../../../../types/Show"

type Corners = NonNullable<Pane["warp"]>

// ---- 3x3 matrix helpers (row-major, length 9) ----
function adj(m: number[]): number[] {
    return [
        m[4] * m[8] - m[5] * m[7], m[2] * m[7] - m[1] * m[8], m[1] * m[5] - m[2] * m[4],
        m[5] * m[6] - m[3] * m[8], m[0] * m[8] - m[2] * m[6], m[2] * m[3] - m[0] * m[5],
        m[3] * m[7] - m[4] * m[6], m[1] * m[6] - m[0] * m[7], m[0] * m[4] - m[1] * m[3]
    ]
}
function multmm(a: number[], b: number[]): number[] {
    const c: number[] = []
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let cij = 0
            for (let k = 0; k < 3; k++) cij += a[3 * i + k] * b[3 * k + j]
            c[3 * i + j] = cij
        }
    }
    return c
}
function multmv(m: number[], v: number[]): number[] {
    return [m[0] * v[0] + m[1] * v[1] + m[2] * v[2], m[3] * v[0] + m[4] * v[1] + m[5] * v[2], m[6] * v[0] + m[7] * v[1] + m[8] * v[2]]
}
function basisToPoints(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number): number[] {
    const m = [x1, x2, x3, y1, y2, y3, 1, 1, 1]
    const v = multmv(adj(m), [x4, y4, 1])
    return multmm(m, [v[0], 0, 0, 0, v[1], 0, 0, 0, v[2]])
}
function general2DProjection(
    x1s: number, y1s: number, x1d: number, y1d: number,
    x2s: number, y2s: number, x2d: number, y2d: number,
    x3s: number, y3s: number, x3d: number, y3d: number,
    x4s: number, y4s: number, x4d: number, y4d: number
): number[] {
    const s = basisToPoints(x1s, y1s, x2s, y2s, x3s, y3s, x4s, y4s)
    const d = basisToPoints(x1d, y1d, x2d, y2d, x3d, y3d, x4d, y4d)
    return multmm(d, adj(s))
}

export function hasWarp(warp: Pane["warp"]): boolean {
    if (!warp) return false
    return [warp.tl, warp.tr, warp.br, warp.bl].some((c) => c.x !== 0 || c.y !== 0)
}

// 3x3 projection mapping the element's local rect (0,0)-(w,h) to the warped corners
export function computeProjection(w: number, h: number, warp: Corners): number[] {
    const dst = {
        tl: { x: (warp.tl.x / 100) * w, y: (warp.tl.y / 100) * h },
        tr: { x: w + (warp.tr.x / 100) * w, y: (warp.tr.y / 100) * h },
        br: { x: w + (warp.br.x / 100) * w, y: h + (warp.br.y / 100) * h },
        bl: { x: (warp.bl.x / 100) * w, y: h + (warp.bl.y / 100) * h }
    }
    return general2DProjection(
        0, 0, dst.tl.x, dst.tl.y,
        w, 0, dst.tr.x, dst.tr.y,
        w, h, dst.br.x, dst.br.y,
        0, h, dst.bl.x, dst.bl.y
    )
}

export function projectPoint(t: number[], x: number, y: number): { x: number; y: number } {
    const v = multmv(t, [x, y, 1])
    return { x: v[0] / v[2], y: v[1] / v[2] }
}

export function getWarpMatrix(w: number, h: number, warp: Pane["warp"]): string {
    if (!hasWarp(warp) || w <= 0 || h <= 0) return ""
    const t = computeProjection(w, h, warp as Corners)
    if (!isFinite(t[8]) || t[8] === 0) return "" // degenerate quad guard
    for (let i = 0; i < 9; i++) t[i] = t[i] / t[8]
    const matrix = [t[0], t[3], 0, t[6], t[1], t[4], 0, t[7], 0, 0, 1, 0, t[2], t[5], 0, t[8]]
    if (matrix.some((n) => !isFinite(n))) return ""
    return "matrix3d(" + matrix.join(",") + ")"
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npm run test:unit -- warpMatrix`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add src/frontend/components/output/layers/warpMatrix.ts src/frontend/components/output/layers/warpMatrix.test.ts
git commit -m "feat(pip): corner-pin homography math with tests"
```

---

## Task 3: Render warp + feather in MultiPaneLayer

**Files:**
- Modify: `src/frontend/components/output/layers/MultiPaneLayer.svelte` (`getPaneStyle`, ~line 23-37)

- [ ] **Step 1: Import the warp helper**

At the top `<script>` imports of `MultiPaneLayer.svelte`, add:

```ts
    import { getWarpMatrix } from "./warpMatrix"
```

- [ ] **Step 2: Add feather + warp to `getPaneStyle`**

Replace the existing `rotate3d` block and `return style` at the end of `getPaneStyle` with:

```ts
        // static 3D tilt (rotateX = up/down, rotateY = left/right)
        let transform = ""
        if (pane.rotate3d && (pane.rotate3d.x || pane.rotate3d.y)) {
            transform += ` perspective(1200px) rotateX(${pane.rotate3d.x}deg) rotateY(${pane.rotate3d.y}deg)`
        }
        // corner-pin warp (matrix3d from 4 corner offsets); needs pixel size of the pane
        const paneW = (pane.position.width / 100) * resolution.width
        const paneH = (pane.position.height / 100) * resolution.height
        const warpMatrix = getWarpMatrix(paneW, paneH, pane.warp)
        if (warpMatrix) transform += " " + warpMatrix
        if (transform) style += ` transform-origin: 0 0; transform:${transform};`

        // edge feather via mask gradients (per side, % of pane w/h)
        const f = pane.feather
        if (f && (f.left || f.right || f.top || f.bottom)) {
            const grads: string[] = []
            if (f.left > 0) grads.push(`linear-gradient(to right, transparent 0%, #000 ${f.left}%)`)
            if (f.right > 0) grads.push(`linear-gradient(to left, transparent 0%, #000 ${f.right}%)`)
            if (f.top > 0) grads.push(`linear-gradient(to bottom, transparent 0%, #000 ${f.top}%)`)
            if (f.bottom > 0) grads.push(`linear-gradient(to top, transparent 0%, #000 ${f.bottom}%)`)
            const list = grads.join(", ")
            const composite = grads.map(() => "source-in").slice(1).join(", ") // n-1 composites
            style += ` -webkit-mask-image: ${list}; mask-image: ${list};`
            if (composite) style += ` -webkit-mask-composite: ${composite}; mask-composite: intersect;`
        }

        return style
```

Note: `resolution` is already a prop of this component (used by `getSlideScaleStyle`). Keep the earlier lines of `getPaneStyle` (position/opacity/borderRadius/border/shadow/overflow) unchanged; only the tail changes.

- [ ] **Step 3: Lint**

Run: `npx eslint -c config/linting/eslint.svelte.js --ext .svelte src/frontend/components/output/layers/MultiPaneLayer.svelte`
Expected: no new errors (baseline-compared; the file already has a pre-existing `preview` unused-export warning).

- [ ] **Step 4: Commit**

```bash
git add src/frontend/components/output/layers/MultiPaneLayer.svelte
git commit -m "feat(pip): render corner-pin warp + edge feather"
```

---

## Task 4: Feather sliders in the editor

**Files:**
- Modify: `src/frontend/components/drawer/pip/PiP.svelte`

- [ ] **Step 1: Add the feather helper**

Near the other pane helpers (after `updatePaneCrop`, ~line 199), add:

```ts
    function updatePaneFeather(paneId: string, side: "left" | "right" | "top" | "bottom", value: number) {
        updatePane(paneId, (p) => ({ ...p, feather: { left: p.feather?.left ?? 0, right: p.feather?.right ?? 0, top: p.feather?.top ?? 0, bottom: p.feather?.bottom ?? 0, [side]: Math.min(50, Math.max(0, Number(value) || 0)) } }))
    }
```

- [ ] **Step 2: Add the feather UI row**

After the Crop/Zoom `pane-inputs` div (the block containing `label="Crop / Zoom (%)"`), add:

```svelte
                            <!-- Feather: transparent gradient fade per edge (0 = sharp) -->
                            <div class="pane-inputs">
                                <MaterialNumberInput label="Feather L" value={pane.feather?.left || 0} min={0} max={50} step={1} scrub on:change={(e) => updatePaneFeather(pane.id, "left", e.detail)} />
                                <MaterialNumberInput label="Feather R" value={pane.feather?.right || 0} min={0} max={50} step={1} scrub on:change={(e) => updatePaneFeather(pane.id, "right", e.detail)} />
                                <MaterialNumberInput label="Feather T" value={pane.feather?.top || 0} min={0} max={50} step={1} scrub on:change={(e) => updatePaneFeather(pane.id, "top", e.detail)} />
                                <MaterialNumberInput label="Feather B" value={pane.feather?.bottom || 0} min={0} max={50} step={1} scrub on:change={(e) => updatePaneFeather(pane.id, "bottom", e.detail)} />
                            </div>
```

- [ ] **Step 3: Lint**

Run: `npx eslint -c config/linting/eslint.svelte.js --ext .svelte src/frontend/components/drawer/pip/PiP.svelte`
Expected: no new errors (baseline has a pre-existing `active` warning + one assertion error).

- [ ] **Step 4: Commit**

```bash
git add src/frontend/components/drawer/pip/PiP.svelte
git commit -m "feat(pip): per-edge feather sliders"
```

---

## Task 5: Warp numeric inputs + reset

**Files:**
- Modify: `src/frontend/components/drawer/pip/PiP.svelte`

- [ ] **Step 1: Add warp helpers**

After `updatePaneFeather`, add:

```ts
    const ZERO_WARP = { tl: { x: 0, y: 0 }, tr: { x: 0, y: 0 }, br: { x: 0, y: 0 }, bl: { x: 0, y: 0 } }
    function updatePaneWarp(paneId: string, corner: "tl" | "tr" | "br" | "bl", axis: "x" | "y", value: number) {
        updatePane(paneId, (p) => {
            const warp = p.warp ? { tl: { ...p.warp.tl }, tr: { ...p.warp.tr }, br: { ...p.warp.br }, bl: { ...p.warp.bl } } : { tl: { x: 0, y: 0 }, tr: { x: 0, y: 0 }, br: { x: 0, y: 0 }, bl: { x: 0, y: 0 } }
            warp[corner][axis] = Math.min(100, Math.max(-100, Number(value) || 0))
            return { ...p, warp }
        })
    }
    function resetPaneWarp(paneId: string) {
        updatePane(paneId, (p) => ({ ...p, warp: JSON.parse(JSON.stringify(ZERO_WARP)) }))
    }
    let warpMode = false
```

- [ ] **Step 2: Add the warp toggle + numeric UI**

After the feather `pane-inputs` row, add:

```svelte
                            <!-- Warp (corner-pin): drag handles in preview when Warp mode on, or type per-corner offsets -->
                            <div class="pane-inputs">
                                <MaterialButton icon="edit" variant={warpMode ? "contained" : "outlined"} title="Warp mode (drag corners in preview)" on:click={() => (warpMode = !warpMode)}>
                                    Warp {warpMode ? "ON" : "OFF"}
                                </MaterialButton>
                                <MaterialButton icon="reset" variant="outlined" title="Reset warp" on:click={() => resetPaneWarp(pane.id)}>Reset Warp</MaterialButton>
                            </div>
                            {#if warpMode}
                                <div class="pane-inputs">
                                    <MaterialNumberInput label="TL X" value={pane.warp?.tl.x || 0} min={-100} max={100} step={1} scrub on:change={(e) => updatePaneWarp(pane.id, "tl", "x", e.detail)} />
                                    <MaterialNumberInput label="TL Y" value={pane.warp?.tl.y || 0} min={-100} max={100} step={1} scrub on:change={(e) => updatePaneWarp(pane.id, "tl", "y", e.detail)} />
                                    <MaterialNumberInput label="TR X" value={pane.warp?.tr.x || 0} min={-100} max={100} step={1} scrub on:change={(e) => updatePaneWarp(pane.id, "tr", "x", e.detail)} />
                                    <MaterialNumberInput label="TR Y" value={pane.warp?.tr.y || 0} min={-100} max={100} step={1} scrub on:change={(e) => updatePaneWarp(pane.id, "tr", "y", e.detail)} />
                                </div>
                                <div class="pane-inputs">
                                    <MaterialNumberInput label="BR X" value={pane.warp?.br.x || 0} min={-100} max={100} step={1} scrub on:change={(e) => updatePaneWarp(pane.id, "br", "x", e.detail)} />
                                    <MaterialNumberInput label="BR Y" value={pane.warp?.br.y || 0} min={-100} max={100} step={1} scrub on:change={(e) => updatePaneWarp(pane.id, "br", "y", e.detail)} />
                                    <MaterialNumberInput label="BL X" value={pane.warp?.bl.x || 0} min={-100} max={100} step={1} scrub on:change={(e) => updatePaneWarp(pane.id, "bl", "x", e.detail)} />
                                    <MaterialNumberInput label="BL Y" value={pane.warp?.bl.y || 0} min={-100} max={100} step={1} scrub on:change={(e) => updatePaneWarp(pane.id, "bl", "y", e.detail)} />
                                </div>
                            {/if}
```

- [ ] **Step 3: Lint**

Run: `npx eslint -c config/linting/eslint.svelte.js --ext .svelte src/frontend/components/drawer/pip/PiP.svelte`
Expected: no new errors (baseline-compared).

- [ ] **Step 4: Commit**

```bash
git add src/frontend/components/drawer/pip/PiP.svelte
git commit -m "feat(pip): warp corner numeric inputs + reset + warp-mode toggle"
```

---

## Task 6: Warp corner drag-handles in the preview

**Files:**
- Modify: `src/frontend/components/drawer/pip/PiP.svelte` (drag logic ~line 130-168 + preview markup ~line 326-351)

- [ ] **Step 1: Extend the drag state for warp corners**

Change the drag-mode type and add corner tracking. Replace the `let dragMode: "move" | "resize" | null = null` line with:

```ts
    let dragMode: "move" | "resize" | "warp" | null = null
    let warpCorner: "tl" | "tr" | "br" | "bl" | null = null
    let warpStartX = 0
    let warpStartY = 0
```

- [ ] **Step 2: Add a warp-drag starter**

After `startDrag(...)`, add:

```ts
    function startWarpDrag(e: MouseEvent, pane: Pane, corner: "tl" | "tr" | "br" | "bl") {
        if (e.button !== 0) return
        e.preventDefault()
        e.stopPropagation()
        dragMode = "warp"
        draggingPaneId = pane.id
        warpCorner = corner
        dragStartCX = e.clientX
        dragStartCY = e.clientY
        warpStartX = pane.warp?.[corner]?.x ?? 0
        warpStartY = pane.warp?.[corner]?.y ?? 0
    }
```

- [ ] **Step 3: Handle warp in `onWindowMousemove`**

Inside `onWindowMousemove`, after the existing `if (dragMode === "move") { ... } else { ... }` block, guard it for warp. Change the body to branch first on warp:

```ts
    function onWindowMousemove(e: MouseEvent) {
        if (!dragMode || !draggingPaneId || !previewElem) return
        const rect = previewElem.getBoundingClientRect()
        const dx = ((e.clientX - dragStartCX) / rect.width) * 100
        const dy = ((e.clientY - dragStartCY) / rect.height) * 100
        if (dragMode === "warp" && warpCorner) {
            // convert preview-% delta into pane-% delta (offset is % of pane size)
            const pane = ($outputs[getActiveOutputs($outputs, true, true, true)[0] || ""]?.out?.multiPane?.panes || []).find((p: any) => p.id === draggingPaneId)
            if (!pane) return
            const paneWpct = pane.position.width || 1
            const paneHpct = pane.position.height || 1
            const x = Math.round((warpStartX + (dx / paneWpct) * 100) * 10) / 10
            const y = Math.round((warpStartY + (dy / paneHpct) * 100) * 10) / 10
            updatePaneWarp(draggingPaneId, warpCorner, "x", x)
            updatePaneWarp(draggingPaneId, warpCorner, "y", y)
            return
        }
        if (dragMode === "move") {
            const x = Math.round((dragStartV1 + dx) * 10) / 10
            const y = Math.round((dragStartV2 + dy) * 10) / 10
            updatePaneDirect(draggingPaneId, { x, y })
        } else {
            const width = Math.max(5, Math.round((dragStartV1 + dx) * 10) / 10)
            const height = Math.max(5, Math.round((dragStartV2 + dy) * 10) / 10)
            updatePaneDirect(draggingPaneId, { width, height })
        }
    }
```

- [ ] **Step 4: Reset warp state on mouseup**

Change `onWindowMouseup` to also clear `warpCorner`:

```ts
    function onWindowMouseup() {
        dragMode = null
        draggingPaneId = ""
        warpCorner = null
    }
```

- [ ] **Step 5: Render corner handles in the preview when warp mode is on**

In the mini-preview pane box markup (the `<div>` created per pane in the preview, around line 333 where `class:is-dragging` and the resize-handle live), add 4 corner handles after the resize-handle element, guarded by `warpMode`:

```svelte
                            {#if warpMode}
                                <div class="warp-handle tl" on:mousedown|stopPropagation={(e) => startWarpDrag(e, pane, "tl")} role="button" tabindex="-1" aria-label="Warp TL"></div>
                                <div class="warp-handle tr" on:mousedown|stopPropagation={(e) => startWarpDrag(e, pane, "tr")} role="button" tabindex="-1" aria-label="Warp TR"></div>
                                <div class="warp-handle br" on:mousedown|stopPropagation={(e) => startWarpDrag(e, pane, "br")} role="button" tabindex="-1" aria-label="Warp BR"></div>
                                <div class="warp-handle bl" on:mousedown|stopPropagation={(e) => startWarpDrag(e, pane, "bl")} role="button" tabindex="-1" aria-label="Warp BL"></div>
                            {/if}
```

- [ ] **Step 6: Add handle CSS**

In the `<style>` block of `PiP.svelte`, near `.resize-handle`, add:

```css
    .warp-handle {
        position: absolute;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: var(--secondary);
        border: 2px solid #fff;
        cursor: crosshair;
        z-index: 5;
    }
    .warp-handle.tl { top: -6px; left: -6px; }
    .warp-handle.tr { top: -6px; right: -6px; }
    .warp-handle.br { bottom: -6px; right: -6px; }
    .warp-handle.bl { bottom: -6px; left: -6px; }
```

- [ ] **Step 7: Lint**

Run: `npx eslint -c config/linting/eslint.svelte.js --ext .svelte src/frontend/components/drawer/pip/PiP.svelte`
Expected: no new errors (baseline-compared).

- [ ] **Step 8: Commit**

```bash
git add src/frontend/components/drawer/pip/PiP.svelte
git commit -m "feat(pip): draggable warp corner handles in preview"
```

---

## Task 7: Build + manual verification

- [ ] **Step 1: Run all unit tests**

Run: `npm run test:unit`
Expected: all pass (existing + warpMatrix).

- [ ] **Step 2: Full build**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 3: Package DMG (local test only — do NOT publish)**

Run: `npx electron-builder --config config/building/electron-builder.yaml --mac dmg --arm64 --publish never`
Expected: `dist/FreeShowPlus-<version>-arm64.dmg` created.

- [ ] **Step 4: Manual checks in-app**
  - Enable **Warp ON**, drag a corner handle in the preview → the pane keystones in the output; type per-corner offsets; **Reset Warp** returns it flat.
  - Set **Feather L/R/T/B** → the matching edges fade to transparent.
  - Confirm warp + 3D tilt + crop combine sensibly.
  - Save, reload the show → warp/feather persist.

## Self-review notes

- Spec coverage: types (T1), warp math (T2), render warp+feather (T3), feather UI (T4), warp numeric+reset+toggle (T5), warp drag handles (T6), build/verify (T7). ✓
- Type/name consistency: `warp.{tl,tr,br,bl}.{x,y}`, `feather.{left,right,top,bottom}`, helpers `updatePaneWarp/resetPaneWarp/updatePaneFeather`, math `computeProjection/projectPoint/getWarpMatrix/hasWarp` — used consistently across tasks.
- Uncertain integration points flagged with fallbacks: `resolution` prop already exists in MultiPaneLayer (used by getSlideScaleStyle); mask-composite webkit chain; verify exact preview markup location in T6 during implementation.
