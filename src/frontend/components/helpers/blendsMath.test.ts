import { describe, expect, it } from "vitest"
import { getCropClipPathCss, getFeatherMaskCss, hasValidSource, moveLayer } from "./blendsMath"

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

describe("getCropClipPathCss", () => {
    it("returns empty string when absent or all-zero", () => {
        expect(getCropClipPathCss(undefined)).toBe("")
        expect(getCropClipPathCss({ left: 0, right: 0, top: 0, bottom: 0 })).toBe("")
    })

    it("builds a clip-path inset in top/right/bottom/left order", () => {
        expect(getCropClipPathCss({ left: 5, right: 10, top: 15, bottom: 20 })).toBe("clip-path: inset(15% 10% 20% 5%);")
    })

    it("clamps each edge to 0-45", () => {
        expect(getCropClipPathCss({ left: -5, right: 999, top: 0, bottom: 0 })).toBe("clip-path: inset(0% 45% 0% 0%);")
    })
})

describe("getFeatherMaskCss", () => {
    it("returns empty string when absent", () => {
        expect(getFeatherMaskCss(undefined)).toBe("")
    })

    it("returns empty string for rect shape with all edges zero", () => {
        expect(getFeatherMaskCss({ shape: "rect", left: 0, right: 0, top: 0, bottom: 0, amount: 0 })).toBe("")
    })

    it("builds independent per-edge linear-gradient masks for rect, composited with intersect", () => {
        const css = getFeatherMaskCss({ shape: "rect", left: 10, right: 0, top: 20, bottom: 0, amount: 0 })
        expect(css).toContain("linear-gradient(to right, transparent 0%, #000 10%)")
        expect(css).toContain("linear-gradient(to bottom, transparent 0%, #000 20%)")
        expect(css).toContain("mask-composite: intersect")
    })

    it("returns empty string for circle/ellipse with zero amount", () => {
        expect(getFeatherMaskCss({ shape: "circle", left: 0, right: 0, top: 0, bottom: 0, amount: 0 })).toBe("")
    })

    it("builds a radial-gradient mask for circle/ellipse shapes", () => {
        expect(getFeatherMaskCss({ shape: "circle", left: 0, right: 0, top: 0, bottom: 0, amount: 20 })).toContain("radial-gradient(circle at center, #000 80%, transparent 100%)")
        expect(getFeatherMaskCss({ shape: "ellipse", left: 0, right: 0, top: 0, bottom: 0, amount: 10 })).toContain("radial-gradient(ellipse at center, #000 90%, transparent 100%)")
    })

    it("clamps amount to 0-50", () => {
        expect(getFeatherMaskCss({ shape: "circle", left: 0, right: 0, top: 0, bottom: 0, amount: 999 })).toContain("#000 50%")
    })
})
