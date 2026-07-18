import { describe, it, expect } from "vitest"
import { shouldSendSyphon } from "./syphonRouting"

describe("shouldSendSyphon", () => {
    it("true only on macOS when the output has syphon enabled", () => {
        expect(shouldSendSyphon({ syphon: true }, "darwin")).toBe(true)
    })
    it("false on non-macOS even when enabled", () => {
        expect(shouldSendSyphon({ syphon: true }, "win32")).toBe(false)
        expect(shouldSendSyphon({ syphon: true }, "linux")).toBe(false)
    })
    it("false when disabled/missing", () => {
        expect(shouldSendSyphon({ syphon: false }, "darwin")).toBe(false)
        expect(shouldSendSyphon({}, "darwin")).toBe(false)
    })
})
