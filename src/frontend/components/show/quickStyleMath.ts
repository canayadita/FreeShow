// Pure, store-free logic for the Show quick-style toolbar — kept separate from
// quickStyleActions.ts (which pulls in the store/history system) so it's unit-testable
// in isolation, mirroring the blendsMath.ts/blends.ts split used by the Mixer feature.

export type QuickStyleScope = "slide" | "all"

// Given a layout's ref array (as returned by getLayoutRef()) and the current scope/selection,
// return the slide id(s) a quick-style change should apply to.
export function selectTargetSlideIdsFromRef(ref: { id?: string }[], scope: QuickStyleScope, selectedIndex: number | null): string[] {
    if (scope === "all") return ref.map((r) => r?.id).filter((id): id is string => !!id)
    if (selectedIndex === null) return []
    const id = ref[selectedIndex]?.id
    return id ? [id] : []
}
