import { describe, it, expect } from "vitest"
import { SequencePlayer } from "./SequencePlayer"

function makePlayer() {
    let now = 0
    const fired: number[] = []
    const p = new SequencePlayer(
        (slideIndex) => fired.push(slideIndex),
        () => now
    )
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
        setNow(3000)
        p.tick()
        setNow(5000)
        p.tick()
        setNow(5500)
        p.tick()
        expect(fired).toEqual([0, 1]) // 0 at start (play->syncSlide), 1 at 5000; no duplicate at 5500
    })
})
