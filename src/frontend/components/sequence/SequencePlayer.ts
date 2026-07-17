import type { SequenceCue } from "../../../types/Show"
import { clampTime, findActiveCue } from "./sequenceCues"

// requestAnimationFrame guards so the class also works in the node test environment
const raf = (cb: FrameRequestCallback): number => (typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame(cb) : 0)
const caf = (id: number): void => {
    if (typeof cancelAnimationFrame !== "undefined") cancelAnimationFrame(id)
}

export class SequencePlayer {
    currentTime = 0 // ms
    playing = false
    private duration = 0
    private cues: SequenceCue[] = []
    private lastSlideIndex: number | null = null
    private lastNow = 0
    private rafId: number | null = null

    constructor(
        private onCue: (slideIndex: number) => void,
        private now: () => number = () => performance.now()
    ) {}

    setCues(cues: SequenceCue[]) {
        this.cues = cues
    }
    setDuration(ms: number) {
        this.duration = ms
    }

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

    nudge(seconds: number) {
        this.seek(this.currentTime + seconds * 1000)
    }

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
            this.rafId = raf(loop)
        }
        this.rafId = raf(loop)
    }

    pause() {
        this.playing = false
        if (this.rafId !== null) caf(this.rafId)
        this.rafId = null
    }

    stop() {
        this.pause()
        this.seek(0)
    }
}
