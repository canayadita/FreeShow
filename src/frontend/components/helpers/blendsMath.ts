// Pure, store-free logic for the Background Blend Mixer, mirroring looksMath.ts —
// kept separate from blends.ts (which pulls in the store) so it's unit-testable in isolation.
import type { BlendFeather, BlendLayer } from "../../../types/Blend"

// CSS clip-path for a layer's hard edge crop (as opposed to feather, which fades rather
// than cuts). 0-45% per edge, same range/meaning as Pane["crop"] but independent per side.
export function getCropClipPathCss(crop?: BlendLayer["crop"]): string {
    if (!crop) return ""
    const left = Math.min(45, Math.max(0, crop.left || 0))
    const right = Math.min(45, Math.max(0, crop.right || 0))
    const top = Math.min(45, Math.max(0, crop.top || 0))
    const bottom = Math.min(45, Math.max(0, crop.bottom || 0))
    if (!left && !right && !top && !bottom) return ""
    return `clip-path: inset(${top}% ${right}% ${bottom}% ${left}%);`
}

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

// CSS mask-image for a layer's edge feather. "rect" fades each edge independently (same
// technique as Pane["feather"] in MultiPaneLayer.svelte); "circle"/"ellipse" fade inward
// from the edge uniformly via a radial gradient, for a vignette-style blend.
export function getFeatherMaskCss(feather?: BlendFeather): string {
    if (!feather) return ""

    if (feather.shape === "circle" || feather.shape === "ellipse") {
        const amount = Math.min(50, Math.max(0, feather.amount || 0))
        if (!amount) return ""
        const gradient = `radial-gradient(${feather.shape} at center, #000 ${100 - amount}%, transparent 100%)`
        return `-webkit-mask-image: ${gradient}; mask-image: ${gradient};`
    }

    const left = Math.min(50, Math.max(0, feather.left || 0))
    const right = Math.min(50, Math.max(0, feather.right || 0))
    const top = Math.min(50, Math.max(0, feather.top || 0))
    const bottom = Math.min(50, Math.max(0, feather.bottom || 0))

    const gradients: string[] = []
    if (left > 0) gradients.push(`linear-gradient(to right, transparent 0%, #000 ${left}%)`)
    if (right > 0) gradients.push(`linear-gradient(to left, transparent 0%, #000 ${right}%)`)
    if (top > 0) gradients.push(`linear-gradient(to bottom, transparent 0%, #000 ${top}%)`)
    if (bottom > 0) gradients.push(`linear-gradient(to top, transparent 0%, #000 ${bottom}%)`)
    if (!gradients.length) return ""

    const list = gradients.join(", ")
    const composite = gradients.map(() => "source-in").slice(1).join(", ")
    let style = `-webkit-mask-image: ${list}; mask-image: ${list};`
    if (composite) style += ` -webkit-mask-composite: ${composite}; mask-composite: intersect;`
    return style
}
