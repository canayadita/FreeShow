import { _show } from "../helpers/shows"
import { setOutput } from "../helpers/output"
import { updateOut } from "../helpers/showActions"

// Output a specific slide of a show by its index in the active layout.
// Mirrors the pattern used by playRandomSlide/nextSlide in showActions.ts.
export function jumpToShowSlide(showId: string, index: number) {
    if (!showId) return
    const layoutId = _show(showId).get("settings.activeLayout")
    const layout = _show(showId).layouts([layoutId]).ref()[0] || []
    if (index < 0 || index >= layout.length) return
    setOutput("slide", { id: showId, layout: layoutId, index }, false)
    updateOut(showId, index, layout)
}
