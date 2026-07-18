# PiP Pane — Corner-Pin Warp + Edge Feather

Date: 2026-07-18
Status: Approved (design)

## Goal

Add two per-pane effects to Picture-in-Picture:

1. **Warp (corner-pin):** move each of the pane's 4 corners independently, for
   keystone correction / projection mapping / strong perspective. Editable both
   by dragging handles on the corners in the editor preview and by numeric X/Y
   inputs per corner.
2. **Feather:** a transparent gradient fade on each edge (left/right/top/bottom),
   each side independently adjustable (0 = sharp, higher = wider fade).

Both effects show in the live output/preview. The editor's move/resize rectangle
stays flat (axis-aligned) for easy manipulation.

## Non-Goals

- Mesh/grid warp (curved distortion).
- Animated warp/feather.
- Photoshop-style blend modes between panes (feather = edge transparency only).

## Data model (`Pane` in `src/types/Show.ts`)

```ts
warp?: {
    tl: { x: number; y: number }
    tr: { x: number; y: number }
    br: { x: number; y: number }
    bl: { x: number; y: number }
} // per-corner offset in percent of pane size; absent/all-zero = no warp
feather?: { left: number; right: number; top: number; bottom: number } // 0-50 (% of pane w/h faded)
```

Stored on the Pane object, so it persists with saved layouts and custom
templates and travels in the `.show` file.

## Rendering (`MultiPaneLayer.svelte`)

### Warp → matrix3d

Corner-pin is a 2D projective (homography) transform. Compute a `matrix3d(...)`
that maps the pane's unit quad `(0,0),(1,0),(1,1),(0,1)` to the four (possibly
offset) corners, using the standard general-2d-projection algorithm:

- `getWarpMatrix(w, h, corners)` returns a CSS `matrix3d` string.
- Corner target pixel positions = base corner + offset (offset% × pane px).
- Apply as `transform` on the pane element (`transform-origin: 0 0`).
- If `rotate3d` is also set, compose: apply the 3D tilt as an additional
  `perspective(...) rotateX/rotateY` before the warp matrix (concatenated in the
  `transform` string, tilt first then warp, so warp maps the tilted quad).

The matrix math lives in a small pure module `warpMatrix.ts` and is unit-tested
(identity corners → identity-ish matrix; a known keystone → expected mapping of
corner points).

### Feather → mask

Use `-webkit-mask-image` / `mask-image` with up to four `linear-gradient`s
(one per non-zero side) composited with `mask-composite: intersect` (webkit:
`-webkit-mask-composite: source-in` chain). Each gradient goes from transparent
at the edge to opaque at `feather%` inward:

- left: `linear-gradient(to right, transparent 0%, #000 <left>%)`
- right: `linear-gradient(to left, transparent 0%, #000 <right>%)`
- top: `linear-gradient(to bottom, transparent 0%, #000 <top>%)`
- bottom: `linear-gradient(to top, transparent 0%, #000 <bottom>%)`

Only include sides with value > 0. Applied to the pane element so all source
types (slide/camera/image/video/…) are feathered. `getFeatherStyle(pane)`
returns the mask CSS string.

## Editor UI (`PiP.svelte`)

### Warp
- A **"Warp mode"** toggle button. When on, render 4 draggable handles at the
  pane corners in the mini preview; dragging a handle updates that corner's
  offset (px in preview → % of pane).
- A row of **8 numeric inputs** (TL X/Y, TR X/Y, BR X/Y, BL X/Y), drag-scrub
  enabled, for precise adjustment.
- A **Reset warp** button (sets all corner offsets to 0).
- Helper `updatePaneWarp(paneId, corner, axis, value)` and `resetPaneWarp(paneId)`.

### Feather
- A row of **4 inputs/sliders**: Left, Right, Top, Bottom (0-50, step 1),
  drag-scrub enabled. Helper `updatePaneFeather(paneId, side, value)`.

## Behaviour / edge cases

- Warp/feather render in live output & preview; the editor move/resize box stays
  axis-aligned.
- Warp composes with existing `rotate3d` and `crop`.
- Feather uses mask, independent of border-radius/shadow; when all four are 0 no
  mask is applied (no perf cost).
- Reset warp returns corners to normal; feather 0 on a side = sharp edge there.
- Degenerate warp (corners crossing) → matrix may be non-invertible; clamp/guard
  so it falls back to no transform instead of rendering garbage.

## Files touched

- `src/types/Show.ts` — add `warp`, `feather` to `Pane`.
- `src/frontend/components/output/layers/warpMatrix.ts` (new) — pure matrix3d math + tests.
- `src/frontend/components/output/layers/MultiPaneLayer.svelte` — apply warp transform + feather mask in `getPaneStyle`.
- `src/frontend/components/drawer/pip/PiP.svelte` — warp mode + handles + numeric inputs + reset; feather sliders; helpers.

## Verification

- `npm run test:unit` for `warpMatrix` (identity + known keystone).
- `npx eslint` on changed files (compare to baseline).
- Build DMG arm64; in-app: enable Warp mode, drag corners → pane keystones in
  output; set numeric corners; Reset. Set feather per side → edges fade to
  transparent. Confirm it saves & reloads with the show.
