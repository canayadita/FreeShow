# Quick Edit Slide — floating popup text editor

Date: 2026-07-18
Status: Approved (design)

## Goal

Let the operator right-click a slide in the Show view and pick **Quick Edit** to
fix the slide's text in a small floating popup — without leaving the Show view or
switching to the full Edit page. When the edited slide is currently live, the
output updates in real-time (so typos already on screen can be corrected mid
service).

## Background (what already exists)

- `editSlideText` context action exists but navigates to the Edit page
  (`activePage.set("edit")`) — disruptive during a live service.
- Inline text editing already exists in the Show **list view mode** via
  `<Editbox {item} … plain />` (writes to `showsCache`, so the live output
  updates reactively). We reuse this exact component in a popup.

## Non-Goals

- Editing style/font/color/position — that stays in the full Edit page. Quick
  Edit is text-only for fast typo fixes.
- A bespoke undo — the existing history system covers text edits.

## Design

### 1. Trigger — context menu

Add a `quick_edit_slide` item (label "Quick Edit", icon "edit") to the `slide`,
`slideChild`, and `slideFocus` context menus in
`src/frontend/components/context/contextMenus.ts`.

Handler in `src/frontend/components/context/menuClick.ts`:

```ts
quick_edit_slide: (obj) => {
    if (obj.sel.id !== "slide") return
    const slide = obj.sel.data[0]
    if (!slide || slide.showId === undefined) return
    quickEditSlide.set({ showId: slide.showId, index: slide.index })
}
```

(`obj.sel.data[0]` provides `{ index, showId }`, same as `editSlideText`.)

### 2. State — store

Add to `src/frontend/stores.ts`:

```ts
export const quickEditSlide = writable<{ showId: string; index: number } | null>(null)
```

### 3. Component — `QuickEditSlide.svelte`

New `src/frontend/components/edit/QuickEditSlide.svelte`, mounted once at
top-level in `src/frontend/App.svelte` next to `<ContextMenu />` / `<Popup />`.

When `$quickEditSlide` is set:
- Resolve the layout ref: `_show(showId).layouts("active").ref()[0]` and get
  `slideId = ref[index]?.id`. Read the slide `showsCache[showId].slides[slideId]`.
- Anchor a floating box over the slide element: query the slide DOM node by
  `[data-index="<index>"]` inside the slides area; position the popup near its
  bounding rect, clamped to stay in the viewport (flip up/left when near an edge).
  Fallback: center of the screen.
- Render each text item of the slide with the existing editor:

```svelte
{#each textItems as item, itemIndex}
    <Editbox {item} ref={{ showId, id: slideId }} editIndex={index} index={itemIndex} plain />
{/each}
```

- `textItems` = slide items where `item.lines` exists (text items only).
- Close on **Esc** or **click outside** → `quickEditSlide.set(null)`.

### 4. Live update

No extra work: `Editbox … plain` edits `showsCache`; the output renders slide
text reactively, so a currently-live slide updates as the operator types.

## Behaviour / edge cases

- Slide with no text items → popup shows an empty state ("No text to edit").
- Popup clamped within the viewport; flips when near right/bottom edge.
- Works in normal grid and focus mode (both use the `slide` selection id).
- Opening Quick Edit does not change the active output/selection.

## Files touched

- `src/frontend/stores.ts` — add `quickEditSlide` store.
- `src/frontend/components/context/contextMenus.ts` — add `quick_edit_slide` item + to slide menus.
- `src/frontend/components/context/menuClick.ts` — add `quick_edit_slide` handler.
- `src/frontend/components/edit/QuickEditSlide.svelte` (new) — the floating popup.
- `src/frontend/App.svelte` — mount `<QuickEditSlide />`.
- `public/lang/en.json`, `public/lang/id_ID.json` — label for the menu item.

## Verification

- `npx eslint` on changed files (compare to baseline).
- Build DMG arm64; in-app: right-click a slide → Quick Edit → popup appears over
  the slide; edit text; if that slide is live, the output updates live; Esc /
  click-outside closes; reload the show → edit persisted.
