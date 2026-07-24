import type { Item } from "../../../types/Show"
import { addStyle, addStyleString, getLineText } from "../edit/scripts/textStyle"
import { getBoxStyle } from "../edit/scripts/itemClipboard"
import { clone } from "../helpers/array"
import { history } from "../helpers/history"
import { getLayoutRef } from "../helpers/show"
import { _show } from "../helpers/shows"
import { getStyles } from "../helpers/style"
import { wait } from "../../utils/common"
import { getAllSlideIdsFromRef } from "./quickStyleMath"

// The quick-style toolbar always applies to every slide in the show's current layout.
export function resolveTargetSlideIds(showId: string): string[] {
    return getAllSlideIdsFromRef(getLayoutRef(showId))
}

function getTextItems(showId: string, slideId: string): { index: number; item: Item }[] {
    const items: Item[] = _show(showId).slides([slideId]).get()[0]?.items || []
    return items.map((item, index) => ({ index, item })).filter(({ item }) => (item.type || "text") === "text")
}

// Read the current font-family/color/font-size/alignment from a slide's first text item,
// to seed the toolbar's inputs when the target slide changes. Returns null if the slide
// has no text item yet. `_updateTrigger` isn't read directly, it just lets callers pass a
// store value (e.g. $showsCache) so Svelte re-runs this whenever the slide data changes.
export function readCurrentStyle(showId: string, slideId: string, _updateTrigger: any = null) {
    const item = getTextItems(showId, slideId)[0]?.item
    if (!item) return null

    const styles = getBoxStyle(item).style

    return {
        fontFamily: styles["font-family"] || "",
        color: styles.color || "",
        fontSize: styles["font-size"] || "",
        fontWeight: styles["font-weight"] || "",
        fontStyle: styles["font-style"] || "",
        textDecoration: styles["text-decoration"] || "",
        textAlign: item.lines?.[0]?.align || "left",
        alignItems: getStyles(item.align || "")["align-items"] || "center"
    }
}

// Apply one font-family/color/font-size/font-weight/font-style/text-decoration change to every
// text item on every target slide, preserving every other style property already on each item.
export async function applyTextStyle(showId: string, slideIds: string[], key: "font-family" | "color" | "font-size" | "font-weight" | "font-style" | "text-decoration", value: string) {
    for (const slideId of slideIds) {
        const textItems = getTextItems(showId, slideId)
        if (!textItems.length) continue

        const values = textItems.map(({ item }) => {
            if (!item.lines) return addStyleString(item.style || "", [key, value])

            const selection = item.lines.map((line) => ({ start: 0, end: getLineText(line).length }))
            return addStyle(selection, clone(item), [key, value]).lines!.map((line) => line.text)
        })

        history({
            id: "textStyle",
            newData: { style: { key: "text", values } },
            location: { page: "edit", show: { id: showId }, slide: slideId, items: textItems.map((t) => t.index) }
        })

        await wait(10)
    }
}

// Apply horizontal text alignment to every text item's lines on every target slide.
export async function applyTextAlign(showId: string, slideIds: string[], value: string) {
    for (const slideId of slideIds) {
        const textItems = getTextItems(showId, slideId)
        if (!textItems.length) continue

        const values = textItems.map(({ item }) => (item.lines || []).map((line) => addStyleString(line.align || "", ["text-align", value])))

        history({
            id: "textAlign",
            newData: { style: { key: "align", values } },
            location: { page: "edit", show: { id: showId }, slide: slideId, items: textItems.map((t) => t.index) }
        })

        await wait(10)
    }
}

// Apply vertical alignment (align-items) to every text item on every target slide.
export async function applyVerticalAlign(showId: string, slideIds: string[], value: string) {
    for (const slideId of slideIds) {
        const textItems = getTextItems(showId, slideId)
        if (!textItems.length) continue

        const values = textItems.map(({ item }) => addStyleString(item.align || "", ["align-items", value]))

        history({
            id: "setItems",
            newData: { style: { key: "align", values } },
            location: { page: "edit", show: { id: showId }, slide: slideId, items: textItems.map((t) => t.index) }
        })

        await wait(10)
    }
}
