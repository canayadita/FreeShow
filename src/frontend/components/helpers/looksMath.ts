// Pure, store-free logic for Audience Looks. Kept separate from looks.ts (which pulls in
// heavy frontend modules) so it can be unit-tested in isolation, mirroring scriptureSplitMath.ts.

import type { Look } from "../../../types/Look"

// Build an outputId -> styleId map from a list of outputs (their current style).
export function buildOutputStylesFromCurrent(outputs: { id: string; style?: string }[]): { [id: string]: string } {
    const map: { [id: string]: string } = {}
    for (const o of outputs) map[o.id] = o.style || ""
    return map
}

// The concrete style changes a look implies, skipping outputs that no longer exist.
export function getLookStyleChanges(look: Pick<Look, "outputStyles">, existingOutputIds: string[]): { outputId: string; styleId: string }[] {
    const existing = new Set(existingOutputIds)
    return Object.entries(look.outputStyles || {})
        .filter(([outputId]) => existing.has(outputId))
        .map(([outputId, styleId]) => ({ outputId, styleId }))
}
