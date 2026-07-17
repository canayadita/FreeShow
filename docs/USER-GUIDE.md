# FreeShow+ User Guide

This guide covers the **FreeShow+-specific features** (added on top of upstream FreeShow). For core FreeShow features (creating shows, slides, outputs, etc.), see the official docs at https://freeshow.app/docs.

> Version: 1.6.4-plus.6 and later · Language: English (Indonesian version: `PANDUAN-PENGGUNAAN.md`)

## Table of Contents
1. [Text Animations & Typography Presets](#1-text-animations--typography-presets)
2. [Picture-in-Picture (PiP) / Multi-Pane](#2-picture-in-picture-pip--multi-pane)
3. [3D Tilt & Drag-Scrub on Panes](#3-3d-tilt--drag-scrub-on-panes)
4. [Stage Slide Preview](#4-stage-slide-preview)
5. [Song Sequence (Auto-Lyrics from MP3)](#5-song-sequence-auto-lyrics-from-mp3)
6. [YouTube / RTMP Streaming](#6-youtube--rtmp-streaming)
7. [Lower-Third Overlays & PiP Templates](#7-lower-third-overlays--pip-templates)
8. [Background Blend Mode](#8-background-blend-mode)
9. [PowerPoint Import (PPT/PPTX)](#9-powerpoint-import-pptpptx)
10. [Bundled Bibles & Scripture Search](#10-bundled-bibles--scripture-search)
11. [Auto-Update](#11-auto-update)

---

## 1. Text Animations & Typography Presets

FreeShow+ adds a per-item text animation system and ready-made typography presets.

**Text animations:**
1. Open **Edit** on a slide and select a text item.
2. Open the item's animation panel (AnimationPicker).
3. Choose an **Entrance** animation (e.g. fade, shakeIn, comicPop, kapow, neonFlash) and/or a **Loop** animation (e.g. pulse, heartbeat, disco, sparkle).
4. Adjust duration, easing, and delay as needed.
5. Optionally add a **Decoration** (underline, highlight, box, circle, rays, etc.) that pops in after the entrance animation finishes.

**Typography presets:**
1. Open the **Typography** tab in the bottom panel.
2. Pick a preset from the list (categorized, including a "sketch" style).
3. **Drag** the preset onto a slide in the **Show** view to apply the style to all of that slide's text items.

---

## 2. Picture-in-Picture (PiP) / Multi-Pane

Display several sources (slide, camera, screen, video, image, etc.) at once in a single output.

**Create a PiP layout:**
1. Open the **Picture-in-Picture** tab in the bottom panel.
2. Pick an available PiP template, or click **Buat Manual** (Create manually) to start from one slide pane.
3. Click **Tambah Pane** (Add pane) to add more panes.

**Configure a pane:**
- **Source Type:** choose the pane source — Slide, Camera, Screen, NDI, Blackmagic, Video, Image, Player, or Transparent.
- **Import image/video:** when Source Type = **Image** or **Video**, an **Import** button appears to pick a file (images show a thumbnail preview).
- **Position & size:** set **X, Y, Width, Height** (in %). Type the value or **click-drag** the number (see section 3).
- **Shape:** corner Radius, Layer (z-index), and a **Shadow** toggle.
- **Crop / Zoom** (Slide panes only): `0` = full slide (may show letterbox bars); increase to zoom in and crop the edges to fill the pane.
- Panes can be **dragged** and **resized** from the bottom-right corner in the editor.

**Enable in the output:** activate the PiP layout; when a slide is shown, the slide pane automatically mirrors the live slide.

**Save a template:** enter a name in the "Nama template" field and click **Simpan Template** to reuse it later.

---

## 3. 3D Tilt & Drag-Scrub on Panes

**3D tilt (static):** each PiP pane has two controls:
- **Putar ↔ (Y):** rotates the pane left/right like an opening door.
- **Dongak ↕ (X):** tilts the pane up/down.
- Range −85° to 85°. The pane's contents (slide/camera/image) tilt with it.

**Drag-scrub (fast value change):** every pane number input (X, Y, Width, Height, Radius, Layer, Crop, and rotation) supports **click-and-drag up/down** to change the value quickly (the cursor becomes ↕). A plain click still lets you type a value.

---

## 4. Stage Slide Preview

A new stage item that shows the **slide visually** (not just text) on the stage monitor — works for text, image, and **PPT/PDF** slides, and stays visible **while PiP is active** (without the PiP camera).

1. Open the **Stage** tab.
2. In the item panel, add **"Preview slide"** (screen icon).
   - First one added → automatically **Slide offset 0** (current slide).
   - Second one added → automatically **Slide offset 1** (next slide).
3. Position/size the items in the stage layout.
4. **Slide offset** can be changed manually in the item's tools panel (0 = current, 1 = next, etc.).

---

## 5. Song Sequence (Auto-Lyrics from MP3)

Record the slide-change timing against an MP3 once, then during the live show just press **Play** and the slides advance automatically (the MP3 is not played live).

**Open it:**
1. **Click the song title** to open the show (lyrics appear).
2. Click the **⋯ (three dots)** button at the top-right of the show area.
3. Choose **Song Sequence** (clock icon).

**Recording (preparation):**
1. Pick an **MP3** file (used only to build the automation).
2. Press **Rekam** (Record) → the MP3 starts playing.
3. **Advance the slides** (space/next) following the lyrics — each change is captured automatically as a cue.
4. Press **Stop Rekam**. The cue list appears.
5. Press **Simpan** (Save) — the data is stored in the show file.

**Live show (no MP3):**
- **Play** → slides advance automatically on the recorded timecode.
- **Nudge:** type a number of seconds and press **+** or **−** to jump forward/back; playback continues from the new position and immediately syncs to the correct slide.
- **Auto/Manual:** turn **Auto** off to take manual control (space/next); turn it back on to resume automatic playback.
- Cues can be deleted individually if any are off.

> Note: cues reference the **absolute slide index**, so nudging backward returns to the correct slide.

---

## 6. YouTube / RTMP Streaming

**Quick button:** a Start/Stop **YouTube Stream** button is available directly in the **top toolbar** — red while live, dimmed when no RTMP config exists.

**Configuration:**
1. Open **Settings → Outputs**.
2. Enter the **RTMP URL** and **Stream Key** (paste buttons are available in both fields).
3. The stream follows the selected output.

---

## 7. Lower-Third Overlays & PiP Templates

- **Lower-thirds:** several built-in lower-third overlays are available under the **"lower_thirds"** category (e.g. plain, white, blue, color) — use them like any overlay.
- **PiP templates:** several ready-made templates exist (e.g. PiP Bottom Right, PiP Bottom Left, PiP Top Right, PiP Side Panel) under the presentation category.

---

## 8. Background Blend Mode

Apply a blend mode to background media.
1. Open **Edit** for the background media.
2. In the media style panel, choose a **Blend Mode** and **Blend Color**.

---

## 9. PowerPoint Import (PPT/PPTX)

1. In the **Shows** tab, click **Import** and choose a **.ppt/.pptx** file.
2. On macOS, conversion uses **Microsoft PowerPoint** (if installed) for the most accurate result; otherwise it falls back to **LibreOffice**.
3. If neither is available, a message asks you to install LibreOffice.
4. The import becomes slides (one page = one slide). These PPT slides can also be shown in a PiP pane and in Stage Slide Preview.

---

## 10. Bundled Bibles & Scripture Search

- **Bundled Bibles:** Indonesian translations (e.g. **TB** and **BIS**) are available out of the box, no download needed.
- **Search in the Scripture tab:** the search box recognizes **verse references** (e.g. "John 3:16", including abbreviations, case-insensitive) as well as full-text search.
- Long verses are automatically split cleanly across slides based on the template size.

---

## 11. Auto-Update

FreeShow+ checks for and downloads updates from the FreeShow+ repository (canayadita/FreeShow), not upstream FreeShow. When a new version is available, a notification appears with a download button to the FreeShow+ releases page.

---

*For questions or issues, contact the FreeShow+ maintainer.*
