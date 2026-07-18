import { describe, it, expect } from "vitest"
import { computeProjection, projectPoint, getWarpMatrix, hasWarp } from "./warpMatrix"

const zero = { tl: { x: 0, y: 0 }, tr: { x: 0, y: 0 }, br: { x: 0, y: 0 }, bl: { x: 0, y: 0 } }

describe("warpMatrix", () => {
    it("hasWarp is false for all-zero and missing", () => {
        expect(hasWarp(undefined)).toBe(false)
        expect(hasWarp(zero)).toBe(false)
        expect(hasWarp({ ...zero, tl: { x: 5, y: 0 } })).toBe(true)
    })

    it("identity: source corners map back to themselves", () => {
        const w = 200,
            h = 100
        const t = computeProjection(w, h, zero)
        const tl = projectPoint(t, 0, 0)
        expect(tl.x).toBeCloseTo(0, 3)
        expect(tl.y).toBeCloseTo(0, 3)
        const tr = projectPoint(t, w, 0)
        expect(tr.x).toBeCloseTo(w, 3)
        expect(tr.y).toBeCloseTo(0, 3)
        const br = projectPoint(t, w, h)
        expect(br.x).toBeCloseTo(w, 3)
        expect(br.y).toBeCloseTo(h, 3)
    })

    it("keystone: shifting top-left corner moves the projected (0,0) by that offset", () => {
        const w = 200,
            h = 100
        // tl offset +10% x, +20% y  => +20px, +20px
        const corners = { ...zero, tl: { x: 10, y: 20 } }
        const t = computeProjection(w, h, corners)
        const p = projectPoint(t, 0, 0)
        expect(p.x).toBeCloseTo(20, 3)
        expect(p.y).toBeCloseTo(20, 3)
    })

    it("getWarpMatrix returns empty string when there is no warp", () => {
        expect(getWarpMatrix(200, 100, undefined)).toBe("")
        expect(getWarpMatrix(200, 100, zero)).toBe("")
    })

    it("getWarpMatrix returns a matrix3d string when warped", () => {
        const m = getWarpMatrix(200, 100, { ...zero, tr: { x: -5, y: 5 } })
        expect(m.startsWith("matrix3d(")).toBe(true)
    })
})
