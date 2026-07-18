import { describe, it, expect } from "vitest"
import { getStageDownscaleSize } from "./stageFrameSize"

// The stage "Output window" mirror was sending full-resolution raw bitmaps
// (~8MB per 1080p frame) which caused lag. We downscale large frames to a
// max width before sending. This helper decides the target size.
describe("getStageDownscaleSize", () => {
    it("downscales 1080p to 1280 wide, keeping aspect ratio", () => {
        expect(getStageDownscaleSize({ width: 1920, height: 1080 }, 1280)).toEqual({ width: 1280, height: 720 })
    })

    it("downscales an ultrawide frame by width", () => {
        expect(getStageDownscaleSize({ width: 2560, height: 1080 }, 1280)).toEqual({ width: 1280, height: 540 })
    })

    it("returns null when already at or below the max width (no upscaling)", () => {
        expect(getStageDownscaleSize({ width: 1280, height: 720 }, 1280)).toBeNull()
        expect(getStageDownscaleSize({ width: 640, height: 480 }, 1280)).toBeNull()
    })

    it("returns null for invalid sizes", () => {
        expect(getStageDownscaleSize({ width: 0, height: 0 }, 1280)).toBeNull()
    })
})
