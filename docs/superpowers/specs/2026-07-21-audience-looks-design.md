# Audience Looks — Design Spec

**Date:** 2026-07-21
**Feature:** Audience Looks (ProPresenter-style one-click live output presets) for FreeShow+

## Goal

Let an operator switch the audience output's whole visual presentation (background,
template, resolution, layers — i.e. an Output Style) **live, in one click**, from the
Show view. Looks are a curated, named list the user manages; clicking a Look applies
its Output Style(s) to the audience output(s) without changing the current slide/content.

## Background (existing systems reused)

- **Output Styles** (`styles` store, `Styles` type in `types/Settings.ts`): each style holds
  background, template, resolution/aspectRatio, layers, transition, fit, blur, etc.
- **Per-output style**: each output already has `output.style` (a style id). It is applied by the
  existing output-style path (`changeOutputStyle` in `helpers/showActions.ts`, and
  `output[id].style = styleId` in `helpers/output.ts` + persisting via the `outputs` store and the
  electron `SET_VALUE` message).
- **Persistence**: stores like `styles`/`templates` are saved via the list in `utils/save.ts`.
- **Context menus**: reusable system (`contextMenus.ts`, `menuClick.ts`, `loadItems.ts`).
- **Preview area**: `components/output/preview/Preview.svelte` renders the output preview and its
  nav controls (previous/next/lock). The Looks bar mounts here, below those controls.

## Data model (new)

```ts
// types/Look.ts (or add to Settings.ts)
export interface Look {
    name: string
    color?: string          // dot/label color on the button
    outputStyles: { [outputId: string]: string } // output id -> Output Style id
    index?: number          // display order
}
```

- `looks: Writable<{ [id: string]: Look }>` — new store.
- `activeLook: Writable<string>` — id of the last-applied Look (highlight only; **session-only, not persisted**).
- An output id absent from `outputStyles` is left unchanged when the Look is applied.
- Single-output churches: `outputStyles` has exactly one entry — same simplicity as picking a style.

## Apply flow (clicking a Look)

1. For each `(outputId, styleId)` in `look.outputStyles`, apply that Output Style to that output
   using the **existing** output-style change path (set `outputs[outputId].style = styleId`,
   persist, and send the electron `SET_VALUE`/`changeOutputStyle` so the live output updates).
2. Set `activeLook = <lookId>`.
3. Only **normal (audience) outputs** are targeted. Stage outputs keep their Stage Layout.
4. No slide/content change — only the output presentation (style) changes.

## Create / manage flow

- **Create**: a `+` button on the Looks bar → creates a new Look whose `outputStyles` captures the
  *current* style of each enabled normal output (a sensible starting snapshot) → user names it.
- **Rename / recolor / delete / edit**: right-click a Look button → context menu (reuse the existing
  context-menu system with new items `rename`, `recolor`, `delete`, and an `edit`/`change_look_style`).
- **Edit mapping** (`edit`): a small popup listing each enabled normal output with a dropdown of
  available Output Styles (defaulting to the Look's stored style for that output). 1 output = 1 dropdown.

## UI — Looks bar

- New component `LooksBar.svelte`, mounted in `Preview.svelte` directly under the output nav controls.
- Horizontal, wrapping row of compact buttons: each shows the Look name + a color dot; the `activeLook`
  is highlighted. A trailing `+` button creates a new Look.
- Empty state: only the `+` button (with a short hint) is shown.
- Reuses existing button/menu components for consistency.

## Persistence

- Add `looks` to the saved-stores list in `utils/save.ts`, mirroring `styles`. `activeLook` is
  session-only (not persisted).
- Backward compatible: absent `looks` = empty object; feature simply shows the empty state.

## File structure (planned)

- `src/types/Look.ts` — `Look` interface.
- `src/frontend/stores.ts` — `looks`, `activeLook` stores.
- `src/frontend/utils/save.ts` — persist `looks`.
- `src/frontend/components/output/preview/LooksBar.svelte` — the button row (mounted in `Preview.svelte`).
- `src/frontend/components/helpers/looks.ts` — pure/near-pure helpers: `applyLook(id)`, `createLookFromCurrent()`, `updateLookStyle(...)`, `deleteLook(id)`.
- `src/frontend/components/context/contextMenus.ts` / `menuClick.ts` — Look context-menu items.
- A small edit popup (reuse popup system) for the per-output style mapping.
- No native/electron additions — reuse the existing `output.style` update path.

## Testing

- Unit test the pure logic in `looks.ts` (vitest, mirroring `scriptureSplitMath.test.ts`):
  - `createLookFromCurrent()` captures each normal output's current style into `outputStyles`.
  - Applying a Look produces the correct `{ outputId: styleId }` set of style changes.
  - Missing/deleted output ids are skipped safely.

## Non-goals (YAGNI for v1)

- A Look does **not** capture overlays/props/background/media state — only Output Styles.
- No default/preset Looks shipped — the list starts empty.
- No dedicated Looks drawer tab or right sidebar (chosen placement is the button row under the preview).
- Stage outputs are out of scope (they use Stage Layouts).

## Open considerations

- **Active-look staleness**: `activeLook` highlights the last-clicked Look; if the user later edits a
  style manually, the highlight may not reflect reality. Acceptable for v1 (highlight = last applied).
- **Access/permissions**: respect existing output lock/profile access the same way current output-style
  changes do.
