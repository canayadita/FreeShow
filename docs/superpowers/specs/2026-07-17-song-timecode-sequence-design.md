# Song Timecode Sequence — auto-advance lyrics from a recorded MP3 timing

Date: 2026-07-17
Status: Approved (design)

## Problem / Goal

For a song show, the operator wants the slides to advance automatically during a
live service without playing the backing MP3 live. The MP3 is used only during
**authoring** to record when each slide should change. During the **live show**,
the operator presses Play and a virtual clock advances the slides at the recorded
times (like scrubbing a video), with the ability to nudge forward/backward by a
number of seconds, and to fall back to manual control at any time.

## Key decisions (from brainstorming)

- Lyrics are a **normal FreeShow song show** (slides). This feature records the
  timing of slide changes, it does not author lyrics text.
- The MP3 **plays only while recording** the sequence. During live playback the
  MP3 does **not** play; a virtual clock drives the slide changes.
- Nudge forward/back is by a typed **number of seconds** (e.g. +3 / −5), after
  which playback continues from the new position.
- Auto can be toggled **off to manual** at any time; turning it back on resumes
  auto from the current clock position.

## Data model

Stored on the show (travels with the song):

```ts
interface ShowSequence {
    cues: { time: number; slideIndex: number }[] // time in ms → show slide index to display
    audioPath?: string  // MP3 used for authoring only
    duration?: number   // ms, for the scrub bar / clamp
}
```

- Cues use an **absolute slide index** (not "next"), so seeking/nudging jumps to
  the correct slide for any time.
- Cues are kept sorted by `time`.

## Components

### 1. Authoring / record panel (per show)

- Attach an MP3 (`audioPath`) — reference only.
- **Record:** play the MP3; each time the operator advances the slide (normal
  next/space/click), append a cue `{ time: audioCurrentTimeMs, slideIndex }`.
- Edit: list of cues with editable time; delete a cue; re-record (clears cues).
- Save writes `sequence` to the show.

### 2. Live sequence player

A focused `SequencePlayer` (reusing the requestAnimationFrame clock pattern from
`TimelinePlayback`):

- `play()` / `pause()` / `stop()` — runs a clock in ms; no audio.
- On each frame, find the cue whose `time` is the latest `<= currentTime`; if its
  `slideIndex` differs from what is shown, set the output to that slide index.
- `nudge(seconds)` — `currentTime = clamp(currentTime + seconds*1000, 0, duration)`,
  then immediately sync the shown slide to the current time and keep playing.
- Auto/Manual toggle: manual stops the clock (operator controls slides); auto
  resumes from `currentTime`.

### 3. Output integration

- Jumping to a slide reuses the existing "go to slide index" navigation
  (set the active output slide for the show/layout to `slideIndex`).
- Manual control keeps working normally (space/next) — it simply is not driven
  by the clock while in manual mode.

### 4. UI

- A "Sequence" tab/panel for the song show with: MP3 picker, Record/Stop,
  Play/Pause/Stop, a scrub bar with cue markers, a numeric nudge input with
  +/− buttons, and an Auto/Manual switch.

## Behavior / edge cases

- No cues yet → live Play does nothing until recorded.
- Nudge/seek beyond `[0, duration]` → clamp.
- Switching to manual mid-play → clock stops; shown slide stays.
- Re-recording clears existing cues (with confirm).
- Reordering slides after recording: cues reference slide index; if the show
  structure changes materially the operator re-records (documented limitation).

## Out of scope

- Playing the MP3 during the live performance.
- Word-level / karaoke sync (slide/line level only).
- Chaining multiple songs into one project sequence.

## Files (anticipated; finalized in the plan)

- `src/types/Show.ts` — add `ShowSequence` to the show type.
- New: `src/frontend/components/sequence/SequencePlayer.ts` — the clock/player.
- New: `src/frontend/components/sequence/SequencePanel.svelte` — record + live UI.
- Show navigation helper — jump to a slide index for a show/layout.
- Persistence — include `sequence` in show save/load.

## Verification

- `npx eslint` on changed files (compare to baseline).
- Build DMG arm64; in-app: attach an MP3, record cues while advancing a song,
  save; then in live mode press Play (no audio) and confirm slides advance at the
  recorded times; test nudge +/−, and Auto→Manual→Auto.
