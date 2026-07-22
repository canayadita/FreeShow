import { describe, expect, it } from "vitest"
import { selectTargetSlideIdsFromRef } from "./quickStyleMath"

describe("selectTargetSlideIdsFromRef", () => {
    const ref = [{ id: "a" }, { id: "b" }, { id: "c" }] as any

    it("returns every slide id when scope is 'all'", () => {
        expect(selectTargetSlideIdsFromRef(ref, "all", null)).toEqual(["a", "b", "c"])
        expect(selectTargetSlideIdsFromRef(ref, "all", 1)).toEqual(["a", "b", "c"])
    })

    it("returns just the selected slide's id when scope is 'slide'", () => {
        expect(selectTargetSlideIdsFromRef(ref, "slide", 1)).toEqual(["b"])
    })

    it("returns an empty array when scope is 'slide' and nothing is selected", () => {
        expect(selectTargetSlideIdsFromRef(ref, "slide", null)).toEqual([])
    })

    it("returns an empty array when the selected index is out of range", () => {
        expect(selectTargetSlideIdsFromRef(ref, "slide", 99)).toEqual([])
    })

    it("filters out ref entries with no id when scope is 'all'", () => {
        const refWithGap = [{ id: "a" }, {}, { id: "c" }] as any
        expect(selectTargetSlideIdsFromRef(refWithGap, "all", null)).toEqual(["a", "c"])
    })
})
