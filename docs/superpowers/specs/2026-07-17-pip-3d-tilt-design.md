# PiP Pane — Static 3D Tilt + Drag-Scrub Number Input

Date: 2026-07-17
Status: Approved (design)

## Goal

Let each Picture-in-Picture pane be tilted in 3D space (like PowerPoint's
"3D rotation"): rotate left/right (like an opening door) and tilt up/down.
The pane stays fixed at the chosen tilt — this is static positioning, not an
animated transition. Panes remain draggable and resizable as today.

Additionally, the rotation values must be adjustable by **click-and-drag
scrubbing** (drag up = increase, down = decrease), not only by typing or
clicking arrows.

## Non-Goals (explicitly out of scope)

- Animated 3D entrance/exit transitions.
- Flat 2D rotation (rotateZ).
- A manual perspective/depth control (perspective is fixed).
- Applying the 3D tilt to the editor's drag/resize rectangles (they stay flat
  for easy manipulation; the tilt shows in the live output/preview only).

## Design

### 1. Data model — `Pane` type (`src/types/Show.ts`)

Add one optional field:

```ts
rotate3d?: { x: number; y: number } // degrees: x = tilt up/down (rotateX), y = turn left/right (rotateY)
```

Absent/`{x:0,y:0}` means no rotation. The field lives on the `Pane` object, so
it is automatically persisted with saved layouts and custom templates
(`multiPaneLayouts` synced setting) — no extra persistence work.

### 2. Rendering — `MultiPaneLayer.svelte` `getPaneStyle()`

When `rotate3d` has a non-zero x or y, append to the pane style:

```css
transform: perspective(1200px) rotateX(<x>deg) rotateY(<y>deg);
```

- Fixed `perspective(1200px)` gives a natural 3D feel across pane sizes.
- Default `transform-origin` (center) tilts around the pane's center.
- Pane children (slide/camera/media/PDF) inherit the transform, so the whole
  pane tilts together.
- Existing `overflow: hidden`, `border-radius`, `box-shadow` stay as-is.

### 3. Editor UI — `PiP.svelte`

Add one control row (matching the existing "Radius sudut / Layer" row) with two
number inputs:

- **Putar ↔ (Y)** → `rotate3d.y`, range −85..85, step 5
- **Dongak ↕ (X)** → `rotate3d.x`, range −85..85, step 5

Limit ±85° so a pane never becomes edge-on/invisible at exactly 90°.

Add a helper:

```ts
function updatePaneRotation(paneId: string, axis: "x" | "y", value: number) {
    updatePane(paneId, (p) => ({ ...p, rotate3d: { x: p.rotate3d?.x ?? 0, y: p.rotate3d?.y ?? 0, [axis]: value } }))
}
```

Both rotation inputs pass `scrub={true}` (see below).

### 4. Drag-scrub number input — `MaterialNumberInput.svelte`

Add an **opt-in** prop `scrub = false` (default off → zero change to every
existing usage). When `scrub` is true:

- `pointerdown` on the field records `startY` and `startValue`, calls
  `setPointerCapture`, sets cursor `ns-resize`.
- `pointermove`: `deltaSteps = Math.round((startY - clientY) / PIXELS_PER_STEP)`
  (up increases). New value = `startValue + deltaSteps * step`, clamped to
  `min`/`max`, then dispatch `change`. `PIXELS_PER_STEP ≈ 4`.
- `pointerup`/`pointercancel`: release capture, restore cursor, end scrub.
- Click vs type: if total movement stayed under ~3px between down and up, treat
  it as a normal click so the user can still focus and type a value.
- Respects existing `min`, `max`, `step`, `maxDecimals`.

## Behavior / edge cases

- Editor drag & resize keep working on the pane's `%` position and are
  unaffected by the visual tilt (tilt is output-side only).
- Scrub does not interfere with typing: a plain click still focuses the input.
- Non-scrub number inputs elsewhere are unchanged (prop defaults false).

## Files touched

- `src/types/Show.ts` — add `rotate3d` to `Pane`.
- `src/frontend/components/output/layers/MultiPaneLayer.svelte` — transform in `getPaneStyle`.
- `src/frontend/components/drawer/pip/PiP.svelte` — 2 rotation inputs + `updatePaneRotation`.
- `src/frontend/components/inputs/MaterialNumberInput.svelte` — opt-in `scrub` prop.

## Verification

- `npx eslint` on changed files (compare against baseline).
- Build DMG arm64 and confirm in-app: tilt a pane via typing and via
  drag-scrub; confirm output shows 3D tilt; confirm other number inputs
  unchanged.
