# Show Quick-Style Toolbar — Design Spec

**Date:** 2026-07-22
**Feature:** A persistent font-styling toolbar pinned to the Show tab's slide-grid header, letting the operator change font family, color, size, and text alignment live — during an active service — without opening the Edit tab.

## Goal

Today, changing a slide's text styling (font, color, size, alignment) requires switching to the Edit tab, which is disruptive mid-service. This adds a lightweight, always-visible toolbar directly in the Show tab (next to the show name / "⋮" menu) that applies the same kind of change instantly, to either the currently-selected slide or every slide in the show.

## Background (existing systems reused)

- **`ShowHeader.svelte`** (`src/frontend/components/show/ShowHeader.svelte`): the title bar rendered directly above the slide grid in `Slides.svelte` (shows the show name + the "⋮" "more options" `MaterialButton`, `position: sticky; top: 0`). This is where the new toolbar row is added.
- **Slide selection**: a plain click on a slide thumbnail sets the shared `selected` store (`src/frontend/stores.ts`) to `{ id: "slide", data: [{ index, showId }] }` (via `SelectElem.svelte`) — this is the existing, already-populated signal for "which slide is the operator currently pointing at," independent of and simultaneous with that click also pushing the slide live. `Ctrl`/`Cmd`/`Shift`-click extends this to a multi-selection without changing the live output.
- **Reading a text item's current style**: `getStyles(styleString)` (`src/frontend/components/helpers/style.ts`) parses a CSS string into a flat `{ [property]: value }` object — the exact same lookup `BoxStyle.svelte` already uses (`getStyles(style)["font"]`, etc.) to seed its own inputs.
- **Applying a single-property change**: `addStyleString(oldStyle, [key, value])` and `addStyle(selection, item, [key, value])` (`src/frontend/components/edit/scripts/textStyle.ts`) — these replace exactly one CSS declaration in an existing style string/item, leaving every other property untouched. This is the correct primitive (confirmed by reading `setBoxStyle`'s internals, which is instead a full-replace "clone whole style from item A to item B" pair used only by the existing Copy/Paste Style feature — wrong fit for "change just this one property").
- **Persistence/undo**: the same `history({ id: "textStyle" | "textAlign" | "setItems", newData: { style: { key, values } }, location: { page: "edit", show, slide, items } })` calls `BoxStyle.svelte` already makes for font-family/color/font-size (`id: "textStyle"`), horizontal text-align (`id: "textAlign"`), and vertical align (`id: "setItems"`). Reusing these exact shapes keeps the new toolbar's edits indistinguishable, from history's point of view, from an Edit-tab change — same undo/redo, same "unlink template on manual edit" side effect (`removeTemplatesFromShow`, triggered inside `history.ts`'s existing `textStyle`/`textAlign` cases).
- **Bulk "apply to every slide in the show"**: already has three precedents (`copy_text_style`/`paste_text_style` context-menu actions, `EditTools.svelte`'s `pasteStyle(applyToAll)`, and `menuClick.ts`'s `format()` helper) — all resolve a target slide-id list (via `getLayoutRef()` for "all," or `$selected.data` for "selected only") and loop one `history()` call per slide, `await wait(10)` between each to avoid UI lag on shows with many slides.

## Scope

- **Properties:** font family, font color, font size, text alignment (horizontal: left/center/right; vertical: top/middle/bottom).
- **Not in scope:** textbox position/size (drag/resize) — explicitly out, per Papi Mika's own clarification that "position" means text alignment, not box geometry. Bold/italic/underline, letter-spacing, outline/shadow, and every other `BoxStyle.svelte` property are also out for this pass — this toolbar is intentionally a curated subset, not a full style-panel port.
- **Target scope toggle:** "This Slide" (the slide currently held in the `selected` store, id `"slide"`) vs. "All Slides" (every slide in the current show, via `getLayoutRef()`). No third "multi-selected slides" option for v1 — even though `$selected.data` can already hold more than one slide (from Ctrl/Shift-click), this toolbar's "This Slide" mode only reads/writes `$selected.data[0]` to keep the interaction simple; multi-select bulk-apply is not requested and left to the existing Copy/Paste Style context-menu actions.

## Data flow

**Reading current values** (to populate the toolbar's inputs when the target slide changes):
1. Resolve the target slide id: `"This Slide"` → `$selected.data[0]?.index` via `getLayoutRef()`; `"All Slides"` → the first slide in the layout (used only to seed initial display values — the applied change still fans out to every slide).
2. Get that slide's first text-type item (`_show(showId).slides([slideId]).get()[0]?.items?.find(i => (i.type || "text") === "text")`).
3. `getStyles(item.lines?.[0]?.text?.[0]?.style || item.style)` → read `font-family`, `color`, `font-size` directly from the resulting object. Horizontal align reads from `item.lines?.[0]?.align`; vertical align reads from `item.align` (the item-level `align-items` style key, same source `BoxStyle.svelte`'s `alignY` input reads).

**Applying a change** (e.g. user picks a new color):
1. Resolve target slide id(s): one id for "This Slide," or every slide id in the current layout for "All Slides" (via `getLayoutRef()`).
2. For each target slide: get its text items' indexes (all items where `(item.type || "text") === "text"`, mirroring `BoxStyle.svelte`'s default-to-all-matching-items behavior when nothing is explicitly selected).
3. For font-family / color / font-size: for each such item, build the "whole line" selection range (`{ start: 0, end: <line text length> }` per line, matching `BoxStyle.svelte:513-519`'s no-selection default) and call `addStyle(selection, item, [key, value])`, then `history({ id: "textStyle", newData: { style: { key: "text", values: [...] } }, location: { page: "edit", show: showId, slide: slideId, items: [...] } })`.
4. For horizontal text-align: call `addStyleString(item.lines[i].align || "", ["text-align", value])` per line, then `history({ id: "textAlign", newData: { style: { key: "align", values: [...] } }, location: {...} })`.
5. For vertical align: `addStyleString(item.align || "", ["align-items", value])`, then `history({ id: "setItems", newData: { style: { key: "align", values: [...] } }, location: {...} })`.
6. When looping over multiple slides ("All Slides"), `await wait(10)` between each `history()` call, matching the existing bulk-apply precedent.

This is a **new, small set of helper functions** (not a modification of `BoxStyle.svelte`, which stays untouched) — `BoxStyle.svelte`'s own logic additionally handles partial in-text-selection styling (a caret/highlighted-range case that doesn't apply here, since the Show tab has no active text cursor) and multi-item-type editing; the toolbar only needs the simpler "no selection, whole item, text items only" slice of that logic, reusing the same underlying `addStyle`/`addStyleString`/`history()` primitives.

## UI

- New row in `ShowHeader.svelte`, directly below the existing `.header` div (show name + "⋮" button), still inside the same `position: sticky` header so it stays visible while scrolling the slide grid.
- Controls, left to right: scope toggle ("This Slide" / "All Slides"), font-family dropdown (reusing the existing `fontDropdown` input type / font list already used by `BoxStyle.svelte`), color swatch/picker, font-size number input, then two small button groups for horizontal align (left/center/right) and vertical align (top/middle/bottom).
- When "This Slide" is selected and nothing is currently selected in the grid (`$selected.id !== "slide"`), the toolbar shows disabled/greyed-out controls (nothing to edit yet) rather than guessing a target.

## File structure (planned)

- `src/frontend/components/show/ShowHeader.svelte` — add the new toolbar row + its scope-toggle state.
- `src/frontend/components/show/ShowQuickStyle.svelte` (new) — the toolbar's controls, extracted into its own component so `ShowHeader.svelte` doesn't balloon in size (it already renders the name/notes/dropdown; the toolbar is a distinct, self-contained concern).
- `src/frontend/components/show/quickStyleActions.ts` (new) — the read/apply helper functions described above (resolve target slide(s), read current values, apply one property change via `addStyle`/`addStyleString` + `history()`).

## Testing

- The "resolve target slide id(s) for This Slide vs All Slides" logic and the "build the whole-line selection range for an item" logic are pure enough to unit test in isolation (given a mock `Slide`/`Item`, do they return the expected slide-id list / selection range?). The actual `history()`-dispatching apply functions are integration glue over already-tested primitives (`addStyle`, `addStyleString`, `history`) — verified by eye, consistent with how the rest of this session's features have been tested.

## Non-goals (YAGNI for v1)

- No textbox position/size editing (confirmed out of scope by Papi Mika).
- No bold/italic/underline/letter-spacing/outline/shadow controls — a curated subset only.
- No "multi-selected slides" scope tier (Ctrl/Shift-click selecting several specific slides) — just "This Slide" (single) and "All Slides."
- No per-run/partial-text-selection styling (e.g. bolding one word) — whole-item only, matching the Show tab having no active text cursor.
