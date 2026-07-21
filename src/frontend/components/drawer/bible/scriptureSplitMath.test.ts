import { describe, expect, it } from "vitest"
import { computeSplitDimensions } from "./scriptureSplitMath"

// Regression coverage for the "Bible verse overflows a small template" bug.
// A long verse shown with a lower-third template (small box) must split across
// slides instead of overflowing / overlapping. Splitting is driven by linesCount:
// if the splitter thinks many lines fit, it never chunks the verse.

describe("computeSplitDimensions", () => {
    // The exact "Lower Third Blue" default template box that triggered the bug report.
    const lowerThirdStyle = "top: 820px;left: 50px;width: 1820px;height: 220px;background: linear-gradient(340deg, rgba(16,28,65) 0%);padding: 25px;border-width: 5px;"
    const lowerThirdText = "font-size: 80px;font-weight: bold;"

    it("gives a small linesCount for a short lower-third box so long verses chunk", () => {
        const { charsPerLine, linesCount } = computeSplitDimensions(lowerThirdStyle, lowerThirdText, true)
        // usableHeight 170 / lineHeight 108 rounds down to 1 native line; shrinkToFit bumps to 2.
        expect(linesCount).toBe(2)
        // usableWidth 1770 / charWidth 40 = 44.
        expect(charsPerLine).toBe(44)
    })

    it("forces a multi-line verse to split (partsNeeded > 1) in a lower third", () => {
        const { charsPerLine, linesCount } = computeSplitDimensions(lowerThirdStyle, lowerThirdText, true)
        // Kejadian 1:2 (Terjemahan Baru) is ~123 chars -> ~3 wrapped lines at 44 chars/line.
        const verse = "Bumi belum berbentuk dan kosong; gelap gulita menutupi samudera raya, dan Roh Allah melayang-layang di atas permukaan air."
        const estimatedLines = Math.ceil(verse.length / charsPerLine)
        const partsNeeded = Math.max(1, Math.ceil(estimatedLines / Math.max(1, linesCount)))
        expect(estimatedLines).toBeGreaterThan(linesCount)
        expect(partsNeeded).toBeGreaterThan(1)
    })

    it("without auto-fit a tiny box computes only 1 native line (the pre-fix danger)", () => {
        // Documents WHY the shrinkToFit bump matters: a non-fitting box under-reports lines.
        const { linesCount } = computeSplitDimensions(lowerThirdStyle, lowerThirdText, false)
        expect(linesCount).toBe(1)
    })

    it("gives a generous linesCount for a full-slide scripture box", () => {
        const fullStyle = "top: 150px;left: 50px;width: 1820px;height: 780px;"
        const { charsPerLine, linesCount } = computeSplitDimensions(fullStyle, "font-size: 80px;", false)
        expect(charsPerLine).toBe(45)
        expect(linesCount).toBe(7)
    })

    it("falls back to safe defaults when the style has no dimensions", () => {
        const { charsPerLine, linesCount } = computeSplitDimensions("", "", false)
        // default width 1820 / charWidth 40 = 45; default height 780 / 108 = 7.
        expect(charsPerLine).toBe(45)
        expect(linesCount).toBe(7)
    })
})
