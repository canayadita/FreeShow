# FreeShow+ v1.6.8-plus

Extra features for small churches, built on top of FreeShow.

## ✨ Added

- **Show tab quick-style toolbar** — a slim, always-visible toolbar under the Show tab's slide grid to change **Font, Color, Size, Bold, Italic, Underline, and Align** (horizontal + vertical) for a whole show's slides, without opening Edit. Hide/show it from the show's "⋮" menu.
- **Mixer framing controls** — per-layer **Position** (pan), **Zoom**, **Crop** (per edge), and **Feather** (Rectangle / Circle / Ellipse vignette), so a background layer can be framed exactly instead of always fit-to-screen.
- **Bible / Scripture — more languages & verses** — added **French (Louis Segond 1910)** and **Spanish (Reina-Valera 1909)** to the splash opening verse and the scrolling ticker, alongside Indonesian/English. Verse library expanded from 229 to **501** verses (public-domain sources).
- **Enable/Disable Loop right-click** — on a **slide** it toggles looping for that slide's video background directly; on a **file in the Media tab** it sets a per-file preference (e.g. mark a clip "don't loop") that's inherited whenever the file is used as a background.
- **Slide right-click "Clear all effects"** — one click clears a slide's custom actions, filters, overlay effects, *and* any Typography preset applied to its text.

## 🐛 Fixed

- **Background video loops are seamless** — looping video backgrounds now use the browser's native video loop, so they loop with **no stutter and no frozen frame** at the loop point (replacing the old crossfade/"dissolve" approach, which itself caused a brief freeze at the seam).
- **Output preview no longer freezes at the loop point** — the live output was already fine, but the in-app preview used to freeze for a moment at each loop; it now loops as smoothly as the real output.
- **"Disable loop" now works in the preview too** — previously the preview never reflected the loop state, so the right-click toggle looked like it did nothing there.
- **Mixer video layers now loop** instead of stopping when they reach the end.

---

**Downloads:** macOS (Apple Silicon & Intel `.dmg`), Windows (`.exe`), Linux (`.AppImage`, `.deb`, `.rpm`).
