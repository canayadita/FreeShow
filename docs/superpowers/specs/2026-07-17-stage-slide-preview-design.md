# Stage "Slide Preview" — visual current/next slide (works during PiP)

Date: 2026-07-17
Status: Approved (design)

## Problem

On the Stage monitor, the presenter needs to see the slide visually. Today:

- The "Current Slide Text" (`slide_text`) item only extracts *text* from the
  slide, so imported PowerPoint/PDF slides (which have no text items) show
  blank.
- When PiP (multi-pane) is active, the presenter wants to see just the slide
  (current + next), not the camera composite.

## Goal

A new stage item that renders the **slide layer only** (no PiP camera) as a
visual, for a chosen slide offset (0 = current, 1 = next, …). Works for text,
image, and PPT/PDF slides, and while PiP is active.

## Non-Goals

- AirPlay (separate topic).
- Stage-specific transition animations.
- A full grid of all slide thumbnails.

## Design

### 1. New stage item type: `slide`

A new stage item type `"slide"` (a *visual* slide preview), added to the stage
"add item" menu alongside `current_output`, `slide_text`, `slide_notes`.
It reuses the existing `slideOffset` field on the stage item (0 = current,
1 = next, …).

### 2. `Output` gets a `slideOnly` prop

`src/frontend/components/output/Output.svelte` gains `export let slideOnly = false`.

Introduce a single derived flag used by the layer conditions:

```
$: pipActive = !slideOnly && liveMultiPane?.visible && multiPanePanes.length > 0
```

Replace the current inline `liveMultiPane?.visible` checks in the layer
conditions (fullscreen slide/background at ~376, PDF at ~413, MultiPaneLayer at
~420, and the `hasSlidePane && liveMultiPane?.visible` at ~134) so that when
`slideOnly` is true the output renders the **fullscreen slide/background/PDF**
and does **not** render `MultiPaneLayer`. Net effect: `slideOnly` renders the
plain slide exactly as if PiP were off.

### 3. Rendering the item (Stagebox)

In `src/frontend/components/stage/Stagebox.svelte`, add a render branch
**before** the existing `id.includes("slide")` check (so it doesn't fall into
`slide_text`):

```svelte
{:else if item.type === "slide"}
    <Output outputId={outputWindowId} mirror slideOnly
            outOverride={slideOffset > 0 ? nextOut : null}
            style="width: 100%; height: 100%;" />
```

- `slideOffset === 0`: render the live output slide, slide-only.
- `slideOffset > 0`: pass `outOverride` = clone of the current `out` with
  `slide` replaced by the offset slide reference (see §4).

### 4. Next-slide reference

Compute the offset slide from the live output slide `{ id, layout, index }`:

- `targetIndex = index + slideOffset`.
- Resolve the layout ref (`_show(id).layouts([layout]).ref()`); if
  `targetIndex` is within range, build `outOverride.slide` = `{ id, layout,
  index: targetIndex, ... }` (for PDF/PPT slides carry `page = page + slideOffset`).
- If out of range or no active slide → render nothing (blank), same as today.

Put this in a small helper (e.g. `getOffsetOut(out, offset)`) so it is testable
in isolation.

### 5. Tools / creation UI

- Register `slide` in the stage add-item menu and any item-type list/labels.
- The tools panel reuses the existing **Slide offset** field for this type
  (no new controls required). Optional label toggle may be added later.

## Behavior / edge cases

- PiP active → item still shows the slide (camera excluded). ✅
- No active slide, or next beyond the last slide → blank.
- PPT/PDF slide → PdfOutput renders the correct page for the offset.
- Performance: each `slide` item renders one `Output` mirror; two items
  (current + next) is acceptable (comparable to existing `current_output`).

## Files touched

- `src/types/Stage.ts` — allow `slide` item type (comment/union if applicable).
- `src/frontend/components/output/Output.svelte` — `slideOnly` prop + `pipActive` gating.
- `src/frontend/components/stage/Stagebox.svelte` — `slide` render branch + `getOffsetOut` helper.
- Stage add-item menu / item-type labels — register `slide`.

## Verification

- `npx eslint` on changed files (compare to baseline).
- Build DMG arm64, then in-app: add a "Slide Preview" item (offset 0) and a
  second (offset 1); with a PPT slide + PiP active, confirm the stage shows the
  current and next slide visuals with no camera; confirm normal text slides also
  render.
