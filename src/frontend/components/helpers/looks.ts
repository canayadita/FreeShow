import { get } from "svelte/store"
import { uid } from "uid"
import type { Look } from "../../../types/Look"
import { activeLook, looks } from "../../stores"
import { buildOutputStylesFromCurrent, getLookStyleChanges } from "./looksMath"
import { getAllNormalOutputs } from "./output"
import { changeOutputStyle } from "./showActions"

// Apply a look live to the audience (normal) outputs, without changing the current slide/content.
export function applyLook(lookId: string) {
    const look = get(looks)[lookId]
    if (!look) return
    const existingIds = getAllNormalOutputs().map((a) => a.id)
    getLookStyleChanges(look, existingIds).forEach(({ outputId, styleId }) => {
        changeOutputStyle({ outputId, styleId })
    })
    activeLook.set(lookId)
}

// Create a look capturing the current output styles; returns the new id.
export function createLookFromCurrent(): string {
    const id = uid()
    const outputStyles = buildOutputStylesFromCurrent(getAllNormalOutputs().map((a) => ({ id: a.id, style: a.style })))
    const index = Object.keys(get(looks)).length
    looks.update((a) => {
        a[id] = { name: "New Look", outputStyles, index }
        return a
    })
    return id
}

export function updateLook(lookId: string, changes: Partial<Look>) {
    looks.update((a) => {
        if (a[lookId]) a[lookId] = { ...a[lookId], ...changes }
        return a
    })
}

export function deleteLook(lookId: string) {
    looks.update((a) => {
        delete a[lookId]
        return a
    })
    if (get(activeLook) === lookId) activeLook.set("")
}
