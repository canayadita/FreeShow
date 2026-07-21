import { get } from "svelte/store"
import { uid } from "uid"
import type { BlendLayer } from "../../../types/Blend"
import { blends } from "../../stores"
import { hasValidSource } from "./blendsMath"

export function createLayer(): BlendLayer {
    return { id: uid(), sourceType: "image", blendMode: "", opacity: 100, visible: true }
}

// Create or update a Blend from the Mixer's draft state. Layers with no source configured
// are dropped on save. Returns the saved id (existingId if updating, a new id otherwise).
export function saveBlend(name: string, layers: BlendLayer[], existingId = ""): string {
    const id = existingId || uid()
    const index = existingId ? get(blends)[existingId]?.index : Object.keys(get(blends)).length

    blends.update((a) => {
        a[id] = { name: name.trim() || "New Blend", layers: layers.filter(hasValidSource), index }
        return a
    })
    return id
}

export function deleteBlend(id: string) {
    blends.update((a) => {
        delete a[id]
        return a
    })
}
