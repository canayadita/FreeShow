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
