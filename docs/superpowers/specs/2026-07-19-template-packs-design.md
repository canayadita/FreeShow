# Template Packs — ready-made coordinated template kits

Date: 2026-07-19
Status: Approved (design)

## Goal

Ship several coordinated "template packs" (like a ProPresenter theme kit): each
pack is a set of matching, good-looking templates (Title, Main Point, List,
Quote, Scripture, Lyrics, Lower Third, …) sharing one visual style. They appear
in the existing **Templates** tab under their own category, ready to drag onto a
slide. No new engine — pure content added to FreeShow's existing template system.

## Packs (4, all aesthetics — churches span denominations)

1. **Elegant** — soft dark gradient, serif, gold accents (universal)
2. **Bright Playful** — bright pink/blue/cyan, bold rounded (youth/kids)
3. **Modern Bold** — high-contrast, heavy sans, vivid accent
4. **Warm Minimal** — cream/brown/gold, airy, calm

Build order: **Elegant → Bright Playful → Modern Bold → Warm Minimal** (one pack
per implementation plan; each pack is independently usable).

## Slots per pack (12)

Each pack contains these 12 coordinated templates:

1. Title
2. Extra Title (subtitle / secondary title)
3. Main Point
4. Main Point ALT (alternate emphasis)
5. List (bulleted lines, left aligned)
6. General Text (paragraph body)
7. Quote
8. Scripture (verse text + reference line, uses `{scripture_*}` style/disableTemplate ref line)
9. Lyrics & Text (song lyrics, centered)
10. General Lyrics (simpler lyrics)
11. Lower Third Text (bottom bar)
12. Lower Third Quote (bottom bar, quote styling)

4 packs × 12 = **48 templates total**.

## Data model (existing FreeShow template shape)

Templates are added to `getDefaultTemplates()` in
`src/frontend/utils/createData.ts`, using the same object shape as the existing
`lowerThirdBlue` etc.:

```ts
a.<id> = {
    isDefault: true,
    name: "Elegant – Title",
    color: "#RRGGBB",            // swatch color in the drawer
    category: "elegant",          // the pack's category id
    items: [
        {
            style: "top:0;left:0;width:1920px;height:1080px;background:<gradient/color>;padding:<n>px;",
            align: "",             // vertical align of the box
            textFit: "shrinkToFit",
            lines: [{ align: "text-align:center;", text: [{ value: "1", style: "font-size:<n>px;font-family:<font>;color:<c>;font-weight:<w>;" }] }]
        }
        // lower-third slots use a bottom bar box (e.g. top:820px;height:220px)
    ]
}
```

Each pack registers its category (like `ensureOverlayCategories`):

```ts
templateCategories.update((a) => {
    if (!a.elegant) a.elegant = { default: true, name: "Elegant", icon: "text" }
    return a
})
```

called from the template-init path (where default templates are created).

## Styling guidelines (per slot)

- **Full-slide slots** (Title…General Lyrics): box fills 1920×1080 (with padding),
  background = the pack's gradient/color, text centered (List/General Text left).
- **Title / Main Point:** large font (~120–160px), bold, high contrast.
- **List / General Text:** medium (~64–80px), left aligned, line spacing.
- **Scripture:** verse ~70px centered + a smaller reference line (~40px) using the
  `disableTemplate` custom type so the reference keeps its own size (mirror the
  existing scripture-template pattern in createData.ts).
- **Lower Third slots:** box `top:820px;left:50px;width:1820px;height:220px` with
  the pack's accent bar background; text left aligned, bold.
- Colors/fonts consistent within a pack; distinct between packs.

## Non-Goals

- A "Kit/slot" engine (apply-as-one-unit) — chosen scope is content packs.
- Background photos/videos (use color/gradient; users add their own media).
- New template categories UI (reuse existing Templates drawer + categories).

## Files touched (per pack)

- `src/frontend/utils/createData.ts` — register the pack category + add its 12 templates to `getDefaultTemplates()`.
- (No type or engine changes.)

## Verification

- `npx eslint` / build (createData.ts compiles).
- Build DMG; in-app: Templates tab shows the new pack category with 12 matching
  templates; drag one onto a slide → styled correctly; looks coordinated.
- Because it's default content, confirm the pack appears on a fresh profile and
  survives reload.
