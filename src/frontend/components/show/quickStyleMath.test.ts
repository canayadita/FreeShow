import { describe, expect, it } from "vitest"
import { getAllSlideIdsFromRef } from "./quickStyleMath"

describe("getAllSlideIdsFromRef", () => {
    it("returns every slide id in order", () => {
        const ref = [{ id: "a" }, { id: "b" }, { id: "c" }] as any
        expect(getAllSlideIdsFromRef(ref)).toEqual(["a", "b", "c"])
    })

    it("filters out ref entries with no id", () => {
        const refWithGap = [{ id: "a" }, {}, { id: "c" }] as any
        expect(getAllSlideIdsFromRef(refWithGap)).toEqual(["a", "c"])
    })

    it("returns an empty array for an empty layout", () => {
        expect(getAllSlideIdsFromRef([])).toEqual([])
    })
})
