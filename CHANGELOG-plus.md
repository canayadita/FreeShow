# FreeShow+ — Changelog

Fork of [FreeShow](https://github.com/ChurchApps/FreeShow) with extra features for small churches.
Use these notes as the release description when uploading a new build.

---

## 1.6.6-plus (unreleased — current build)

Everything below was added on top of the previously uploaded FreeShow+ build.

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
