// Pure, store-free logic for the Background Blend Mixer, mirroring looksMath.ts —
// kept separate from blends.ts (which pulls in the store) so it's unit-testable in isolation.
import type { BlendLayer } from "../../../types/Blend"

// Swap a layer with its neighbor. "up" = toward the end of the array (higher in the
// stack, displayed nearer the top of the Mixer's layer list). "down" = the opposite.
export function moveLayer(layers: BlendLayer[], index: number, direction: "up" | "down"): BlendLayer[] {
    const targetIndex = direction === "up" ? index + 1 : index - 1
    if (index < 0 || index >= layers.length || targetIndex < 0 || targetIndex >= layers.length) return layers

    const result = [...layers]
    const temp = result[index]
    result[index] = result[targetIndex]
    result[targetIndex] = temp
    return result
}

// A layer only renders once it actually has a source configured.
export function hasValidSource(layer: Pick<BlendLayer, "sourceType" | "sourcePath" | "sourceId" | "color">): boolean {
    if (layer.sourceType === "color") return !!layer.color
    if (layer.sourceType === "image" || layer.sourceType === "video") return !!layer.sourcePath
    return !!layer.sourceId
}
