import { describe, expect, it } from "vitest"
import { buildOutputStylesFromCurrent, getLookStyleChanges } from "./looksMath"

describe("buildOutputStylesFromCurrent", () => {
    it("maps each output id to its current style id", () => {
        const outputs = [
            { id: "o1", style: "styleA" },
            { id: "o2", style: "styleB" }
        ]
        expect(buildOutputStylesFromCurrent(outputs)).toEqual({ o1: "styleA", o2: "styleB" })
    })

    it("uses empty string for an output with no style", () => {
        const outputs = [{ id: "o1", style: "" }, { id: "o2" }]
        expect(buildOutputStylesFromCurrent(outputs as any)).toEqual({ o1: "", o2: "" })
    })
})

describe("getLookStyleChanges", () => {
    const look = { name: "Worship", outputStyles: { o1: "styleA", o2: "styleB", gone: "styleX" } }

    it("returns one change per mapped output that still exists", () => {
        const changes = getLookStyleChanges(look, ["o1", "o2"])
        expect(changes).toEqual([
            { outputId: "o1", styleId: "styleA" },
            { outputId: "o2", styleId: "styleB" }
        ])
    })

    it("skips outputs that no longer exist", () => {
        const changes = getLookStyleChanges(look, ["o1"])
        expect(changes).toEqual([{ outputId: "o1", styleId: "styleA" }])
    })

    it("returns empty for a look with no mapping", () => {
        expect(getLookStyleChanges({ name: "x", outputStyles: {} }, ["o1"])).toEqual([])
    })
})
