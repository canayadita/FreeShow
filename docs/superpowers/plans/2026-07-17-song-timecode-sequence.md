# Song Timecode Sequence Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let a song show record slide-change timings against an MP3 once, then during a live show press Play to auto-advance the slides on a virtual clock (no audio), with second-based nudge and an auto/manual toggle.

**Architecture:** A small pure-logic layer (cue lookup + clamp) is unit-tested with vitest. A `SequencePlayer` class drives a requestAnimationFrame clock and calls back with the slide index to show; the UI wires that callback to the existing `setOutput("slide", …)` / `updateOut(…)` navigation. Recording captures cues from `AudioPlayer.getTime()` while the operator advances slides. The sequence is stored on the show object and opened through the existing popup system.

**Tech Stack:** Svelte 4, TypeScript, Electron, vitest.

---

## File Structure

- `src/types/Show.ts` — add `SequenceCue` + `ShowSequence`, and `sequence?` on `Show`.
- `src/frontend/components/sequence/sequenceCues.ts` — pure helpers (sort, clamp, active-cue lookup, add cue).
- `src/frontend/components/sequence/sequenceCues.test.ts` — vitest for the pure helpers.
- `src/frontend/components/sequence/SequencePlayer.ts` — clock/player class (injectable `now` for tests).
- `src/frontend/components/sequence/SequencePlayer.test.ts` — vitest for player state + cue firing.
- `src/frontend/components/sequence/sequenceOutput.ts` — `jumpToShowSlide(showId, index)` using existing nav.
- `src/frontend/components/sequence/SequencePanel.svelte` — record + live UI.
- `src/frontend/utils/popup.ts` — register `song_sequence` popup.
- Trigger button — `src/frontend/components/show/tools/MetadataPanel.svelte` area (Task 8 locates the exact insert).

---

## Task 1: Types

**Files:**
- Modify: `src/types/Show.ts:11-57`

- [ ] **Step 1: Add the sequence types and field**

Add above `export interface Show {`:

```ts
export interface SequenceCue {
    time: number // ms into the recording
    slideIndex: number // absolute show slide index to display at/after this time
}
export interface ShowSequence {
    cues: SequenceCue[]
    audioPath?: string // MP3 used for authoring only
    duration?: number // ms
}
```

Inside `interface Show`, after `midi?: { [key: ID]: Action }`, add:

```ts
    sequence?: ShowSequence
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit -p config/typescript/tsconfig.electron.json` is not needed; instead run: `npx eslint -c config/linting/eslint.frontend.json --ext .ts src/types/Show.ts`
Expected: no new errors (compare to baseline for this file).

- [ ] **Step 3: Commit**

```bash
git add src/types/Show.ts
git commit -m "feat(sequence): add ShowSequence types to Show"
```

---

## Task 2: Pure cue helpers (TDD)

**Files:**
- Create: `src/frontend/components/sequence/sequenceCues.ts`
- Test: `src/frontend/components/sequence/sequenceCues.test.ts`

- [ ] **Step 1: Write the failing tests**

```ts
import { describe, it, expect } from "vitest"
import { sortCues, clampTime, findActiveCue, addCue } from "./sequenceCues"
import type { SequenceCue } from "../../../types/Show"

const cues: SequenceCue[] = [
    { time: 0, slideIndex: 0 },
    { time: 5000, slideIndex: 1 },
    { time: 12000, slideIndex: 2 }
]

describe("sequenceCues", () => {
    it("sortCues sorts ascending by time", () => {
        expect(sortCues([{ time: 5000, slideIndex: 1 }, { time: 0, slideIndex: 0 }])).toEqual([
            { time: 0, slideIndex: 0 },
            { time: 5000, slideIndex: 1 }
        ])
    })
    it("clampTime clamps to [0, duration]", () => {
        expect(clampTime(-10, 20000)).toBe(0)
        expect(clampTime(999999, 20000)).toBe(20000)
        expect(clampTime(3000, 20000)).toBe(3000)
    })
    it("findActiveCue returns the latest cue at or before time", () => {
        expect(findActiveCue(cues, 0)).toEqual({ time: 0, slideIndex: 0 })
        expect(findActiveCue(cues, 4999)).toEqual({ time: 0, slideIndex: 0 })
        expect(findActiveCue(cues, 5000)).toEqual({ time: 5000, slideIndex: 1 })
        expect(findActiveCue(cues, 999999)).toEqual({ time: 12000, slideIndex: 2 })
    })
    it("findActiveCue returns null before the first cue / empty", () => {
        expect(findActiveCue(cues, -1)).toBeNull()
        expect(findActiveCue([], 100)).toBeNull()
    })
    it("addCue inserts sorted", () => {
        expect(addCue(cues, { time: 8000, slideIndex: 5 }).map((c) => c.time)).toEqual([0, 5000, 8000, 12000])
    })
})
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm run test:unit -- sequenceCues`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement**

```ts
import type { SequenceCue } from "../../../types/Show"

export function sortCues(cues: SequenceCue[]): SequenceCue[] {
    return [...cues].sort((a, b) => a.time - b.time)
}

export function clampTime(time: number, duration: number): number {
    return Math.max(0, Math.min(duration, time))
}

// latest cue whose time <= t, or null if none
export function findActiveCue(cues: SequenceCue[], t: number): SequenceCue | null {
    let active: SequenceCue | null = null
    for (const cue of sortCues(cues)) {
        if (cue.time <= t) active = cue
        else break
    }
    return active
}

export function addCue(cues: SequenceCue[], cue: SequenceCue): SequenceCue[] {
    return sortCues([...cues, cue])
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npm run test:unit -- sequenceCues`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add src/frontend/components/sequence/sequenceCues.ts src/frontend/components/sequence/sequenceCues.test.ts
git commit -m "feat(sequence): pure cue helpers with tests"
```

---

## Task 3: SequencePlayer clock (TDD for logic)

**Files:**
- Create: `src/frontend/components/sequence/SequencePlayer.ts`
- Test: `src/frontend/components/sequence/SequencePlayer.test.ts`

- [ ] **Step 1: Write the failing tests**

```ts
import { describe, it, expect, vi } from "vitest"
import { SequencePlayer } from "./SequencePlayer"

function makePlayer() {
    let now = 0
    const fired: number[] = []
    const p = new SequencePlayer((slideIndex) => fired.push(slideIndex), () => now)
    p.setDuration(20000)
    p.setCues([
        { time: 0, slideIndex: 0 },
        { time: 5000, slideIndex: 1 },
        { time: 12000, slideIndex: 2 }
    ])
    return { p, fired, setNow: (n: number) => (now = n) }
}

describe("SequencePlayer", () => {
    it("seek fires the cue for that time and updates currentTime", () => {
        const { p, fired } = makePlayer()
        p.seek(6000)
        expect(p.currentTime).toBe(6000)
        expect(fired.at(-1)).toBe(1)
    })
    it("nudge adds seconds and clamps to duration", () => {
        const { p } = makePlayer()
        p.seek(19000)
        p.nudge(5) // +5s -> clamp 20000
        expect(p.currentTime).toBe(20000)
    })
    it("nudge backward clamps to 0", () => {
        const { p } = makePlayer()
        p.seek(1000)
        p.nudge(-5)
        expect(p.currentTime).toBe(0)
    })
    it("tick advances time and fires a cue only when the slide changes", () => {
        const { p, fired, setNow } = makePlayer()
        setNow(0)
        p.play()
        setNow(3000); p.tick()
        setNow(5000); p.tick()
        setNow(5500); p.tick()
        expect(fired).toEqual([0, 1]) // 0 at start (seek 0), 1 at 5000; no duplicate at 5500
    })
})
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm run test:unit -- SequencePlayer`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement**

```ts
import type { SequenceCue } from "../../../types/Show"
import { clampTime, findActiveCue } from "./sequenceCues"

export class SequencePlayer {
    currentTime = 0 // ms
    playing = false
    private duration = 0
    private cues: SequenceCue[] = []
    private lastSlideIndex: number | null = null
    private lastNow = 0
    private rafId: number | null = null

    constructor(private onCue: (slideIndex: number) => void, private now: () => number = () => performance.now()) {}

    setCues(cues: SequenceCue[]) { this.cues = cues }
    setDuration(ms: number) { this.duration = ms }

    private syncSlide() {
        const cue = findActiveCue(this.cues, this.currentTime)
        if (cue && cue.slideIndex !== this.lastSlideIndex) {
            this.lastSlideIndex = cue.slideIndex
            this.onCue(cue.slideIndex)
        }
    }

    seek(ms: number) {
        this.currentTime = clampTime(ms, this.duration)
        this.lastNow = this.now()
        this.syncSlide()
    }

    nudge(seconds: number) { this.seek(this.currentTime + seconds * 1000) }

    // advance the clock one frame (called by the rAF loop; exposed for tests)
    tick() {
        if (!this.playing) return
        const t = this.now()
        this.currentTime = clampTime(this.currentTime + (t - this.lastNow), this.duration)
        this.lastNow = t
        this.syncSlide()
        if (this.currentTime >= this.duration) this.pause()
    }

    play() {
        if (this.playing) return
        this.playing = true
        this.lastNow = this.now()
        this.syncSlide()
        const loop = () => {
            if (!this.playing) return
            this.tick()
            this.rafId = requestAnimationFrame(loop)
        }
        this.rafId = requestAnimationFrame(loop)
    }

    pause() {
        this.playing = false
        if (this.rafId !== null) cancelAnimationFrame(this.rafId)
        this.rafId = null
    }

    stop() { this.pause(); this.seek(0) }
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npm run test:unit -- SequencePlayer`
Expected: PASS (4 tests). Note: `play()` schedules rAF but tests call `tick()` directly, so rAF is not required in the test environment.

- [ ] **Step 5: Commit**

```bash
git add src/frontend/components/sequence/SequencePlayer.ts src/frontend/components/sequence/SequencePlayer.test.ts
git commit -m "feat(sequence): SequencePlayer virtual clock with tests"
```

---

## Task 4: Output wiring (jump to slide index)

**Files:**
- Create: `src/frontend/components/sequence/sequenceOutput.ts`
- Reference: `src/frontend/components/helpers/showActions.ts:233-241` (`setOutput`/`updateOut`), `src/frontend/components/helpers/shows.ts` (`_show`)

- [ ] **Step 1: Implement the helper**

```ts
import { _show } from "../helpers/shows"
import { setOutput } from "../helpers/output"
import { updateOut } from "../helpers/showActions"

// Output a specific slide of a show by its index in the active layout.
export function jumpToShowSlide(showId: string, index: number) {
    const layoutId = _show(showId).get("settings.activeLayout")
    const layoutRef = _show(showId).layouts([layoutId]).ref()[0] || []
    if (index < 0 || index >= layoutRef.length) return
    setOutput("slide", { id: showId, layout: layoutId, index }, false)
    updateOut(showId, index, layoutRef)
}
```

- [ ] **Step 2: Lint**

Run: `npx eslint -c config/linting/eslint.frontend.json --ext .ts src/frontend/components/sequence/sequenceOutput.ts`
Expected: no errors. (If `_show(...).get("settings.activeLayout")` is not a valid accessor, use `get(showsCache)[showId]?.settings?.activeLayout` — verify against `shows.ts` during this task and adjust.)

- [ ] **Step 3: Commit**

```bash
git add src/frontend/components/sequence/sequenceOutput.ts
git commit -m "feat(sequence): jumpToShowSlide output helper"
```

---

## Task 5: SequencePanel — record + live UI

**Files:**
- Create: `src/frontend/components/sequence/SequencePanel.svelte`
- Reference: `src/frontend/audio/audioPlayer.ts` (`AudioPlayer.play/stop/getTime/getDuration`), `src/frontend/components/inputs/*` (Material inputs), `src/frontend/stores.ts` (`activeShow`, `showsCache`)

- [ ] **Step 1: Create the component skeleton (state + logic)**

Create `SequencePanel.svelte` with:
- Props: `show` id (default `$activeShow?.id`).
- Local: `player = new SequencePlayer(onCue)`, `cues`, `audioPath`, `duration`, `recording`, `auto`, `nudgeSeconds = 5`.
- `onCue(index)` → `jumpToShowSlide(showId, index)`.
- Load `sequence` from `$showsCache[showId]?.sequence` on mount into `cues/audioPath/duration`; push to `player.setCues/setDuration`.
- `saveSequence()` → write `{ cues, audioPath, duration }` to the show via `history({ id: "UPDATE", newData: { key: "sequence", data }, oldData: { id: showId }, location: { page: "show", id: "show_key" } })` (verify the exact history action against an existing show-field write; fall back to `showsCache.update(...)` + `saveShow`).

```svelte
<script lang="ts">
    import { onDestroy, onMount } from "svelte"
    import { activeShow, showsCache } from "../../stores"
    import { AudioPlayer } from "../../audio/audioPlayer"
    import { SequencePlayer } from "./SequencePlayer"
    import { jumpToShowSlide } from "./sequenceOutput"
    import { addCue } from "./sequenceCues"
    import type { SequenceCue } from "../../../types/Show"

    export let showId: string = $activeShow?.id || ""

    let cues: SequenceCue[] = []
    let audioPath = ""
    let duration = 0
    let recording = false
    let auto = true
    let nudgeSeconds = 5
    let currentSlideIndex = 0

    const player = new SequencePlayer((index) => { if (auto) jumpToShowSlide(showId, index) })

    onMount(() => {
        const seq = $showsCache[showId]?.sequence
        if (seq) { cues = seq.cues || []; audioPath = seq.audioPath || ""; duration = seq.duration || 0 }
        player.setCues(cues); player.setDuration(duration)
    })
    onDestroy(() => player.stop())

    function startRecording() {
        if (!audioPath) return
        cues = []; recording = true
        AudioPlayer.play(audioPath, {}, {} as any)
    }
    function markCue() { // call on each slide advance while recording
        if (!recording) return
        const t = AudioPlayer.getTime(audioPath) * 1000
        cues = addCue(cues, { time: t, slideIndex: currentSlideIndex })
    }
    function stopRecording() {
        recording = false
        AudioPlayer.stop(audioPath)
        duration = AudioPlayer.getDuration?.(audioPath) * 1000 || cues.at(-1)?.time || 0
        player.setCues(cues); player.setDuration(duration)
    }

    function play() { player.setCues(cues); player.setDuration(duration); player.play() }
    function pause() { player.pause() }
    function stop() { player.stop() }
    function nudge(sign: number) { player.nudge(sign * nudgeSeconds) }
</script>
```

- [ ] **Step 2: Add the markup (controls)**

Add MP3 file picker (`MaterialFilePicker` with `audioExtensions`), Record/Stop buttons, Play/Pause/Stop, a numeric nudge input with +/− buttons (reuse `MaterialNumberInput` with `scrub`), an Auto/Manual toggle, and a cue list (time + slide index, delete button). Bind the recording "advance" to the app's existing next-slide action so `markCue()` runs on each advance (Task 6 wires this).

- [ ] **Step 3: Lint**

Run: `npx eslint -c config/linting/eslint.svelte.js --ext .svelte src/frontend/components/sequence/SequencePanel.svelte`
Expected: no new errors (baseline-compared). Fix any `AudioPlayer.getDuration`/history-call mismatches by checking the referenced files.

- [ ] **Step 4: Commit**

```bash
git add src/frontend/components/sequence/SequencePanel.svelte
git commit -m "feat(sequence): SequencePanel record + live UI"
```

---

## Task 6: Record cue on slide advance

**Files:**
- Modify: `src/frontend/components/sequence/SequencePanel.svelte`
- Reference: `src/frontend/stores.ts` (`outputs`) — the active output slide index updates when slides advance.

- [ ] **Step 1: Track the current output slide index and record on change while recording**

In `SequencePanel.svelte`, subscribe to the active output slide so `currentSlideIndex` reflects the shown slide, and when it changes during `recording`, call `markCue()`:

```svelte
<script lang="ts">
    import { getActiveOutputs, getOutputResolution } from "../helpers/output"
    // ...
    $: outSlide = $showsCache && (() => {
        const outs = Object.values($outputs || {})
        const out: any = outs.find((o: any) => o?.out?.slide)?.out?.slide
        return out?.id === showId ? out : null
    })()
    let prevIndex = -1
    $: if (recording && outSlide && outSlide.index !== prevIndex) {
        prevIndex = outSlide.index
        currentSlideIndex = outSlide.index
        markCue()
    }
</script>
```

(Import `outputs` from stores.) This makes recording driven by the operator's normal next-slide action — no special key handling needed.

- [ ] **Step 2: Lint + build check**

Run: `npx eslint -c config/linting/eslint.svelte.js --ext .svelte src/frontend/components/sequence/SequencePanel.svelte`
Expected: clean (baseline-compared).

- [ ] **Step 3: Commit**

```bash
git add src/frontend/components/sequence/SequencePanel.svelte
git commit -m "feat(sequence): record cue automatically on slide advance"
```

---

## Task 7: Register popup + trigger button

**Files:**
- Modify: `src/frontend/utils/popup.ts` (register `song_sequence`)
- Modify: `src/frontend/components/show/tools/MetadataPanel.svelte` (or the show toolbar located during this task) — add a button that runs `activePopup.set("song_sequence")`.
- Modify: `src/types/Popups.ts` (or wherever `PopupIds` is typed) — add `"song_sequence"`.

- [ ] **Step 1: Register the popup**

In `popup.ts`, import and add to the map:

```ts
import SequencePanel from "../components/sequence/SequencePanel.svelte"
// ... inside the popups object:
    song_sequence: SequencePanel,
```

- [ ] **Step 2: Add the popup id to the type**

Find the `PopupIds` union (grep `"timecode"` in `src/types`), add `| "song_sequence"`.

- [ ] **Step 3: Add a trigger button**

In the show tools/toolbar (locate the file that renders per-show tool buttons; `grep -rn "activePopup.set(\"timecode\")" src/frontend`), add:

```svelte
<MaterialButton title="Sequence" icon="clock" on:click={() => activePopup.set("song_sequence")}>Sequence</MaterialButton>
```

- [ ] **Step 4: Lint + build**

Run: `npx eslint -c config/linting/eslint.svelte.js --ext .svelte <changed .svelte>` and `npx eslint -c config/linting/eslint.frontend.json --ext .ts src/frontend/utils/popup.ts`
Expected: clean (baseline-compared).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(sequence): open Song Sequence via popup + trigger button"
```

---

## Task 8: Persistence verification + labels

**Files:**
- Reference: `src/frontend/components/helpers/save.ts` / show save path.
- Modify: `public/lang/en.json`, `public/lang/id_ID.json` (labels if keys were used).

- [ ] **Step 1: Verify the sequence persists**

Shows serialize the full object. Confirm `sequence` survives a save/reload: add a temporary log or inspect the saved `.show` file after saving from the panel. If a save allowlist strips unknown keys, add `sequence` to it (grep the show-save serializer).

- [ ] **Step 2: Add labels if used**

If any `label`/`title` i18n keys were referenced (e.g. `"sequence.title"`), add them to `en.json` and `id_ID.json`.

- [ ] **Step 3: Full build**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore(sequence): persistence verification + labels"
```

---

## Manual verification (after Task 8)

1. Build DMG arm64; open a song show.
2. Open **Sequence**, pick an MP3, press **Record**, advance slides following the lyrics, **Stop**. Cues appear.
3. Switch to live: press **Play** (no audio) — slides advance at the recorded times.
4. Type a nudge value and press **+ / −** — playback jumps by that many seconds and continues from the correct slide.
5. Toggle **Manual** — auto stops, manual next works; toggle **Auto** — resumes.
6. Reload the show — the sequence is still there.

## Self-review notes

- Spec coverage: data model (Task 1), record from MP3 (Tasks 5-6), virtual-clock live playback (Task 3), nudge (Task 3/5), auto/manual (Task 5), output jump (Task 4), UI + open (Tasks 5,7), persistence (Task 8). ✓
- Uncertain integration points flagged inline with concrete fallbacks: `_show().get(...)` accessor (Task 4), history save call (Task 5), `AudioPlayer.getDuration` (Task 5), popup-id type + toolbar location (Task 7), save allowlist (Task 8). These are confirmed during their task.
