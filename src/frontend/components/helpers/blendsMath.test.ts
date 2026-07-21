import { describe, expect, it } from "vitest"
import { hasValidSource, moveLayer } from "./blendsMath"

describe("moveLayer", () => {
    const layers = [{ id: "a" }, { id: "b" }, { id: "c" }] as any

    it("moves a layer up (toward the end of the array = higher in the stack)", () => {
        const result = moveLayer(layers, 0, "up")
        expect(result.map((l) => l.id)).toEqual(["b", "a", "c"])
    })

    it("moves a layer down (toward the start of the array = lower in the stack)", () => {
        const result = moveLayer(layers, 2, "down")
        expect(result.map((l) => l.id)).toEqual(["a", "c", "b"])
    })

    it("does nothing when already at the top", () => {
        const result = moveLayer(layers, 2, "up")
        expect(result.map((l) => l.id)).toEqual(["a", "b", "c"])
    })

    it("does nothing when already at the bottom", () => {
        const result = moveLayer(layers, 0, "down")
        expect(result.map((l) => l.id)).toEqual(["a", "b", "c"])
    })

    it("does not mutate the original array", () => {
        moveLayer(layers, 0, "up")
        expect(layers.map((l) => l.id)).toEqual(["a", "b", "c"])
    })
})

describe("hasValidSource", () => {
    it("requires a color for sourceType color", () => {
        expect(hasValidSource({ sourceType: "color", color: "" } as any)).toBe(false)
        expect(hasValidSource({ sourceType: "color", color: "#00ff00" } as any)).toBe(true)
    })

    it("requires sourcePath for image/video", () => {
        expect(hasValidSource({ sourceType: "image", sourcePath: "" } as any)).toBe(false)
        expect(hasValidSource({ sourceType: "video", sourcePath: "/a.mp4" } as any)).toBe(true)
    })

    it("requires sourceId for camera/ndi/screen/blackmagic", () => {
        expect(hasValidSource({ sourceType: "camera", sourceId: "" } as any)).toBe(false)
        expect(hasValidSource({ sourceType: "ndi", sourceId: "dev1" } as any)).toBe(true)
    })
})
