// Pure, store-free logic for the Show quick-style toolbar — kept separate from
// quickStyleActions.ts (which pulls in the store/history system) so it's unit-testable
// in isolation, mirroring the blendsMath.ts/blends.ts split used by the Mixer feature.

// Given a layout's ref array (as returned by getLayoutRef()), return every slide id in it.
export function getAllSlideIdsFromRef(ref: { id?: string }[]): string[] {
    return ref.map((r) => r?.id).filter((refId): refId is string => !!refId)
}
