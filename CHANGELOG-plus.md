# FreeShow+ — Changelog

Fork of [FreeShow](https://github.com/ChurchApps/FreeShow) with extra features for small churches.
Use these notes as the release description when uploading a new build.

---

## 1.6.8-plus (unreleased — current build)

Everything below was added on top of the previously uploaded FreeShow+ build.

### 🎚️ Show tab quick-style toolbar
- A slim, always-visible toolbar under the Show tab's slide grid — change **Font, Color, Size, Bold, Italic, Underline, and Align (horizontal + vertical)** for a whole show's slides without opening Edit.
- Compact single-row layout (à la Word/Office), with a hide/show toggle from the show's "⋮" menu.
- Applies to every slide in the show — simpler and more predictable than a per-slide toggle.

### 🖱️ Slide right-click menu — "Clear all effects"
- "Clear actions" is now **"Clear all effects"** — one click clears a slide's custom actions, filters, overlay effects, *and* any Typography preset (animation/background/decoration) applied to its text.

### 🎛️ Mixer — framing controls
- Per-layer **Position** (pan), **Zoom**, **Crop** (per edge), and **Feather** (Rectangle, Circle, or Ellipse vignette) — frame a background layer exactly how you want instead of always fit-to-screen.
- Fixed: video layers in the Mixer (and "Show on Primary") now actually loop instead of stopping when they reach the end.

### 📖 Bible / Scripture
- Added **French (Louis Segond 1910)** and **Spanish (Reina-Valera 1909)** to the splash-screen opening verse and the scrolling verse ticker, alongside the existing Indonesian/English.
- Verse library expanded from 229 to **501** verses, sourced from public-domain translations for accuracy.

### 🎥 Background video looping — smooth by default
- Looping video backgrounds now use the browser's **native video loop**, so they **loop seamlessly with no stutter or frozen frame** at the loop point — no setup required. (This replaces the earlier crossfade/"dissolve" approach, which seeked the video at the loop point and itself caused a brief freeze the crossfade never reliably hid.)
- **Fixed:** the output **preview** used to freeze for a moment at the loop point while the live output was already fine — the preview now loops as smoothly as the real output.
- New **Enable/Disable Loop** right-click option in two places:
  - On a **slide**, toggles looping for that slide's video background directly, without opening Edit.
  - On a **file in the Media tab**, sets a per-file preference (e.g. mark a news clip "don't loop") that's inherited automatically whenever that file is used as a background afterwards.
- **Fixed:** "Disable loop" from the right-click menu now takes effect in the **preview** too — previously the preview never reflected the loop state, so the toggle looked like it did nothing there.

---

## 1.6.7-plus

### 🎯 Audience Looks
- One-click output style presets bar under the output preview — save the current output styling as a named "Look" and reapply it live with a single click, great for switching between song/sermon/worship looks instantly.

### 🎛️ Mixer (Resolume-style live background blending)
- A new **Mixer** drawer tab: stack multiple background layers (image, video, color, camera, NDI, screen, Blackmagic) with per-layer **blend mode** and **opacity**, live-previewed as you build.
- **Save/recall** named Blends, **Show on Primary** to push the current mix live, and **Blend Selected** from the Media tab's right-click menu to start a Blend from selected media in one step.
- A Style's background can reference a saved Blend directly.

### 🎥 Syphon
- Fixed the Syphon resolution dropdown showing "—" and not applying the selected resolution.

### 🎥 Syphon output for OBS (macOS)
- Send any output straight into OBS — or any Syphon-capable app — on macOS, with no extra software. (Windows/Linux continue to use NDI.)
- **Flexible published resolution** per output: Native / 1080p / 900p / 720p / 540p. Lower it on weaker Macs for smooth animations, raise it on powerful machines for sharper output.
- Correct image orientation and colors; frames are downscaled and published zero-copy so the app stays smooth while streaming.
- Enable per output in **Settings → Outputs → Enable Syphon** (macOS only).

### 🎨 Ready-made template packs (4 kits · 48 templates)
Four fully coordinated design kits so any church can look polished instantly. Each kit covers ~12 slots (heading, general text, lyrics, list, quote, scripture, lower-thirds, and more):
- **Elegant** — navy & gold, refined.
- **Bright Playful** — pink/blue, bold and friendly.
- **Modern Bold** — dark background, heavy sans, orange accents.
- **Warm Minimal** — cream, brown, gold; light and airy.

### 📖 Bible / Scripture
- **Always fits the template** — verse text now shrinks to fit the template's text box on any template (lower-third or full-screen), so it never overflows or gets cut off.
- **Smart verse splitting** — long verses split across slides automatically so text stays readable.
- **One unified Next** — a single Next button steps through the split parts of a long verse, then continues to the next verse. No separate "Next chunk" button, so navigation is simpler and never confusing.
- **No size flash** — verse text no longer briefly appears oversized/cut before fitting; it stays hidden until it has been sized to the box, so each verse appears already fitted.

### 🖱️ Slide right-click menu — new options
- **Add action** — attach actions to a slide, grouped by category.
- **Clear actions** — remove every action added to a slide in one click.
- **Template** — apply any template (the design packs + built-ins) to the selected slide(s) in one click.
- **Copy style / Paste style** — copy a slide's text styling and paste it onto other slides.
- **Shortcut key** — assign a keyboard shortcut to a slide.

### 🎛️ Output controls
- New **Audience** and **Stage** output toggle buttons in the top bar — turn each on or off at a glance, with a live green indicator. Modifier-click (Shift/Ctrl/Cmd) opens Output settings.

### ✏️ Quick Edit
- **Floating Quick Edit popup** — edit slide text quickly from the right-click menu without leaving your current view.

### ⚡ Performance & fixes
- Stage output mirror no longer lags.
- Audio playlist fix — playback no longer stops after a single song (ported from upstream).

---

## Previously uploaded (1.6.6-plus base and earlier)
- Bible verse ticker.
- Picture-in-Picture background fix.
- Warp & feather (edge blending) tools.
- FreeShow+ branding.
