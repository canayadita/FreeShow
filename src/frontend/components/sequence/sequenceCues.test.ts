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
        expect(
            sortCues([
                { time: 5000, slideIndex: 1 },
                { time: 0, slideIndex: 0 }
            ])
        ).toEqual([
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
