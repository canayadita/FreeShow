import { describe, it, expect } from "vitest"
import { clone } from "./clone"

// Regression: saving sends `clone(allSavedData)` over Electron IPC, which
// structured-clones the payload. If some field is non-structured-cloneable
// (e.g. a function/class instance), clone() must still return a value that
// itself survives structuredClone — otherwise the IPC send throws
// "An object could not be cloned." and the show never saves to disk.
describe("clone", () => {
    it("returns a structured-cloneable value even when the input has a function", () => {
        const input = { name: "Show", fn: () => 1, nested: { keep: 2, cb: () => 2 } }

        const result = clone(input) as any

        // must not throw — this is exactly what Electron IPC does with the payload
        expect(() => structuredClone(result)).not.toThrow()
        // real data is preserved, only the non-cloneable bits are dropped
        expect(result.name).toBe("Show")
        expect(result.nested.keep).toBe(2)
        expect(result.fn).toBeUndefined()
    })

    it("still deep-clones normal objects (independent copy)", () => {
        const input = { a: 1, b: { c: [1, 2, 3] } }
        const result = clone(input)
        expect(result).toEqual(input)
        expect(result).not.toBe(input)
        expect(result.b).not.toBe(input.b)
    })

    it("passes through primitives", () => {
        expect(clone(5)).toBe(5)
        expect(clone("x")).toBe("x")
        expect(clone(null)).toBe(null)
    })
})
