<script lang="ts">
    import type { Item } from "../../../../types/Show"
    import { activeEdit, activeShow, openToolsTab, os, outputs, showsCache, special, templates, variables } from "../../../stores"
    import { translateText } from "../../../utils/language"
    import { getAccess } from "../../../utils/profile"
    import { deleteAction } from "../../helpers/clipboard"
    import { _show } from "../../helpers/shows"
    import { history } from "../../helpers/history"
    import { getExtension, getFileName, getMediaType } from "../../helpers/media"
    import { getFirstActiveOutput, getOutputResolution, percentageStylePos } from "../../helpers/output"
    import { createCSSVariables } from "../../helpers/showActions"
    import { TEXT_PRESETS, type TextPreset } from "../../../../types/textPresets"
    import { newToast } from "../../../utils/common"
    import { getLayoutRef } from "../../helpers/show"
    import MaterialButton from "../../inputs/MaterialButton.svelte"
    import SlideItems from "../../slide/SlideItems.svelte"
    import EditboxCropping from "./EditboxCropping.svelte"
    import EditboxLines from "./EditboxLines.svelte"
    import EditboxPlain from "./EditboxPlain.svelte"

    export let item: Item | null
    export let filter = ""
    export let backdropFilter = ""
    export let ref: {
        type?: "show" | "overlay" | "template"
        showId?: string
        origin?: string
        id: string
    }
    export let index: number
    export let editIndex = -1
    export let ratio = 1
    export let plain = false
    export let chordsMode = false
    export let chordsAction = ""

    let itemElem: HTMLElement | undefined
    let cropElem: EditboxCropping | undefined
    let cropActive = false
    let cropPreview = { top: 0, right: 0, bottom: 0, left: 0 }

    export let mouse: any = {}
    function mousedown(e: any) {
        if (e.target.closest(".chords") || e.target.closest(".editTools")) return
        if (!e.target.closest(".line") && !e.target.closest(".square") && !e.target.closest(".rotate") && !e.target.closest(".radius") && !e.target.closest(".cropHandle") && !e.target.closest(".cropOverlay")) {
            openToolsTab.set("text")

            // Table shouldn't be draggable from the center
            if (item?.type === "table") return
        }

        const rightClick: boolean = e.button === 2 || e.buttons === 2 || ($os.platform === "darwin" && e.ctrlKey)

        activeEdit.update((ae) => {
            if (rightClick) {
                if (ae.items.includes(index)) return ae
                ae.items = [index]

                return ae
            }

            if (e.shiftKey) {
                if (ae.items.includes(index)) {
                    if (e.target.closest(".line")) ae.items.splice(ae.items.indexOf(index), 1)
                } else {
                    ae.items.push(index)
                }

                return ae
            }

            ae.items = [index]

            return ae
        })

        let target = e.target.closest(".item")
        if (!target) return

        mouse = {
            x: e.clientX,
            y: e.clientY,
            width: target.offsetWidth,
            height: target.offsetHeight,
            top: target.offsetTop,
            left: target.offsetLeft,
            offset: {
                x: (e.clientX - e.target.closest(".slide").offsetLeft) / ratio - target.offsetLeft,
                y: (e.clientY - e.target.closest(".slide").offsetTop) / ratio - target.offsetTop,
                width: e.clientX / ratio - target.offsetWidth,
                height: e.clientY / ratio - target.offsetHeight
            },
            item,
            e: e,
            rightClick
        }
    }

    $: active = $activeShow?.id
    $: layout = active && $showsCache[active]?.settings ? $showsCache[active].settings.activeLayout : ""
    // $: slide = layout && $activeEdit.slide !== null && $activeEdit.slide !== undefined ? [$showsCache, GetLayoutRef(active, layout)[$activeEdit.slide].id][1] : null

    function keydown(e: KeyboardEvent) {
        if (cropElem?.handleKeydown(e)) return

        if (e.key === "Escape") {
            ;(document.activeElement as HTMLElement).blur()
            window.getSelection()?.removeAllRanges()
            if ($activeEdit.items.length) {
                // give time so output don't clear
                setTimeout(() => {
                    activeEdit.update((a) => {
                        a.items = []
                        return a
                    })
                })
            }
        }

        if (!$activeEdit.items.includes(index) || document.activeElement?.closest(".item") || document.activeElement?.closest("input")) return
        // selected timeline actions
        if (document.querySelector(".timeline-track .action-marker.selected")) return

        if (e.key === "Backspace" || e.key === "Delete") {
            // delete slide item using shortcut
            deleteAction({ id: "item", data: { layout, slideId: ref.id } })
        }
    }

    function deselect(e: any) {
        if (e.target.closest(".menus") || e.target.closest(".popup") || e.target.closest(".drawer") || e.target.closest(".chords") || e.target.closest(".contextMenu") || e.target.closest(".editTools") || e.target.closest(".group") || e.target.closest(".timeline")) return

        if (e.ctrlKey || e.metaKey || e.target.closest(".item") === itemElem || !$activeEdit.items.includes(index) || e.target.closest(".item")) return

        if (window.getSelection()) window.getSelection()?.removeAllRanges()

        // timeout to allow CSS to update selected items first if any
        setTimeout(() => {
            activeEdit.update((ae) => {
                ae.items = []
                return ae
            })
        })
    }

    $: customOutputId = getFirstActiveOutput($outputs)?.id || ""
    function getCustomStyle(style: string, outputId = "") {
        if (outputId) {
            let outputResolution = getOutputResolution(outputId, $outputs, true)
            style = percentageStylePos(style, outputResolution)
        }

        // minimum of 50% opacity on all items in the editor
        if (style.includes("opacity:")) {
            style = style.replace(/opacity:\s*([0-9.]+)/, (match, p1) => {
                if (parseFloat(p1) < 0.5) return "opacity: 0.5"
                return match
            })
        }

        return style
    }

    // check if media fills entire slide, if it does it might be intended as a background
    let mediaShouldBeBackground = false
    $: if (item?.type === "media" && checkMedia()) mediaShouldBeBackground = true
    else mediaShouldBeBackground = false
    function checkMedia() {
        if (!item?.src) return false
        if ((ref?.type || "show") !== "show") return false

        // item fills entire width and height
        if (!item.style?.includes("width:1920") || !item.style?.includes("height:1080")) return false

        const currentLayoutSlide = $showsCache[active || ""]?.layouts?.[layout]?.slides?.[$activeEdit.slide ?? -1]
        // background is already set
        if (currentLayoutSlide?.background) return false

        return true
    }
    function convertToBackground() {
        if (!item?.src) return

        history({
            id: "showMedia",
            newData: { name: getFileName(item.src), path: item.src, type: getMediaType(getExtension(item.src)) },
            location: { page: "show", show: { id: active || "" }, layout: $showsCache[active || ""]?.settings?.activeLayout, layoutSlide: $activeEdit.slide ?? -1 }
        })

        deleteAction({ id: "item", data: { layout, slideId: ref.id } })
    }

    function dblclick(e: MouseEvent) {
        cropElem?.handleDblclick(e)
    }

    $: isDisabledVariable = item?.type === "variable" && $variables[item.variable?.id]?.enabled === false
    // SHOW IS LOCKED FOR EDITING
    let profile = getAccess("shows")
    $: currentSlide = (ref.type || "show") === "show" ? $showsCache[active || ""]?.slides?.[ref.id] : null // WIP get group slide
    $: isLocked = (ref.type || "show") !== "show" ? false : $showsCache[active || ""]?.locked || currentSlide?.locked || profile.global === "read" || profile[$showsCache[active || ""]?.category || ""] === "read"

    // give CSS access to certain dynamic values
    $: cssVariables = createCSSVariables($variables)

    const isOptimized = $special.optimizedMode
    let previewCropType: "clip" | "ppt" = "clip"
    $: previewCropType = item?.cropping?.type === "ppt" ? "ppt" : "clip"
    $: previewItem = cropActive && item ? { ...item, cropping: { ...cropPreview, type: previewCropType } } : item

    // fixed letter width
    $: fixedWidth = item?.type === "timer" || item?.type === "clock" ? "font-feature-settings: 'tnum' 1;" : ""

    $: noTextMode = ref?.type === "template" && $templates[ref?.id]?.settings?.mode === "item"

    // Drag-and-drop preset from Typography tab
    let isDragOver = false
    let dragCounter = 0

    function onDragEnter(e: DragEvent) {
        if (!e.dataTransfer) return
        // Only react if a preset is being dragged
        if (!Array.from(e.dataTransfer.types).includes("application/x-proshow-preset")) return
        dragCounter++
        isDragOver = true
    }
    function onDragLeave(e: DragEvent) {
        dragCounter--
        if (dragCounter <= 0) {
            dragCounter = 0
            isDragOver = false
        }
    }
    function onDragOver(e: DragEvent) {
        if (!e.dataTransfer) return
        if (!Array.from(e.dataTransfer.types).includes("application/x-proshow-preset")) return
        e.preventDefault()
        e.dataTransfer.dropEffect = "copy"
    }
    function onDrop(e: DragEvent) {
        if (!e.dataTransfer) return
        const presetId = e.dataTransfer.getData("application/x-proshow-preset")
        if (!presetId) return
        e.preventDefault()
        e.stopPropagation()
        isDragOver = false
        dragCounter = 0

        const preset = TEXT_PRESETS.find((p) => p.id === presetId)
        if (!preset) return

        // Only allow drop on text items
        if (!item || (item.type || "text") !== "text") {
            newToast("Preset hanya untuk text item")
            return
        }

        // Make sure the dropped item is the selected one
        activeEdit.update((ae) => {
            if (!ae.items.includes(index)) ae.items = [index]
            return ae
        })

        const slideId = getCurrentSlideId()
        if (!slideId || !$activeShow) return

        // 1) animation config
        history({
            id: "setItems",
            newData: { style: { key: "animationConfig", values: [preset.animation] } },
            location: { page: "edit", show: $activeShow, slide: slideId, items: [index] },
        })

        // 2) per-line typography (merged into item.style)
        if (preset.style.lineStyle) {
            const currentStyle = getCurrentStyleForItem(slideId, index)
            const newStyle = buildStyleWithUpdates(currentStyle, preset.style.lineStyle)
            if (newStyle !== null) {
                history({
                    id: "setItems",
                    newData: { style: { key: "style", values: [newStyle] } },
                    location: { page: "edit", show: $activeShow, slide: slideId, items: [index] },
                })
            }
        }

        // 3) per-text typography
        if (preset.style.textStyle) {
            const currentStyle = getCurrentStyleForItem(slideId, index)
            const newStyle = buildStyleWithUpdates(currentStyle, preset.style.textStyle)
            if (newStyle !== null) {
                history({
                    id: "setItems",
                    newData: { style: { key: "style", values: [newStyle] } },
                    location: { page: "edit", show: $activeShow, slide: slideId, items: [index] },
                })
            }
        }

        newToast(`Preset '${preset.name}' diterapkan!`)
    }

    function getCurrentStyleForItem(slideId: string, itemIndex: number): string {
        const slide = _show().slides([slideId]).get()[0]
        return slide?.items?.[itemIndex]?.style || ""
    }

    function buildStyleWithUpdates(oldStyle: string, cssString: string): string | null {
        if (!cssString) return null
        let style = oldStyle || ""
        cssString
            .split(";")
            .map((s) => s.trim())
            .filter(Boolean)
            .forEach((statement) => {
                const idx = statement.indexOf(":")
                if (idx < 0) return
                const key = statement.slice(0, idx).trim()
                const value = statement.slice(idx + 1).trim()
                if (!key || !value) return
                style = addStyleString(style, [key, value])
            })
        return style
    }

    function getCurrentSlideId(): string | null {
        if ($activeEdit.slide === null || $activeEdit.slide === undefined) return null
        const ref = getLayoutRef()
        return ref[$activeEdit.slide]?.id || null
    }

    function addStyleString(oldStyle: string, style: any[]): string {
        if (!oldStyle) return style[1] !== null ? style.join(":") + ";" : ""
        if (typeof oldStyle !== "string") return ""
        let array: string[] = oldStyle.split(";")
        if (!array[array.length - 1].length) array.pop()
        array = array.filter((s) => s.split(":")[0].trim() !== style[0] && s.length > 0)
        if (style[0] === "font") {
            array.unshift(style.join(":"))
        } else if (style[1] !== null) array.push(style.join(":"))
        let newStyle: string = array.join(";")
        if (newStyle.slice(-1) !== ";") newStyle += ";"
        return newStyle
    }

    function applyTextStyleString(cssString: string) {
        if (!cssString) return
        const slideId = getCurrentSlideId()
        if (!slideId || !$activeShow) return
        cssString
            .split(";")
            .map((s) => s.trim())
            .filter(Boolean)
            .forEach((statement) => {
                const idx = statement.indexOf(":")
                if (idx < 0) return
                const key = statement.slice(0, idx).trim()
                const value = statement.slice(idx + 1).trim()
                if (!key || !value) return
                const oldStyle = item?.style || ""
                const newStyle = addStyleString(oldStyle, [key, value])
                history({
                    id: "setItems",
                    newData: { style: { key: "style", values: [newStyle] } },
                    location: { page: "edit", show: $activeShow, slide: slideId, items: [index] },
                })
            })
    }
</script>

<!-- on:mouseup={() => chordUp({ showRef: ref, itemIndex: index, item })} -->
<svelte:window on:mousedown={deselect} on:keydown={keydown} />

<div
    bind:this={itemElem}
    class={plain ? "editItem" : `editItem item ${isLocked ? "" : "context #edit_box"}`}
    class:selected={$activeEdit.items.includes(index)}
    class:decoration={item?.decoration}
    class:isDisabledVariable
    class:chords={chordsMode}
    class:isOptimized
    class:showOverflow={item?.type === "table" || cropActive}
    class:preset-drag-over={isDragOver}
    style="{plain ? 'width: 100%;' : `${getCustomStyle(item?.style || '', customOutputId)}; outline: ${3 / ratio}px solid rgb(255 255 255 / 0.2);z-index: ${index + 1 + ($activeEdit.items.includes(index) ? 100 : 0)};${filter ? 'filter: ' + filter + ';' : ''}${backdropFilter ? 'backdrop-filter: ' + backdropFilter + ';' : ''}`}{cssVariables}{fixedWidth}"
    data-index={index}
    on:mousedown={mousedown}
    on:dblclick={dblclick}
    on:dragenter={onDragEnter}
    on:dragleave={onDragLeave}
    on:dragover={onDragOver}
    on:drop={onDrop}
>
    {#if !plain}
        <EditboxPlain {item} {index} {ratio} hideMovebox={cropActive} />
    {/if}
    {#if item?.lines && !noTextMode}
        <EditboxLines {item} {ref} {index} {editIndex} {plain} {chordsMode} {chordsAction} {isLocked} />
    {:else if previewItem}
        {#if previewItem.type === "media"}
            <div class="mediaFrame" class:showOverflow={cropActive}>
                <SlideItems item={previewItem} {ratio} {ref} {itemElem} slideIndex={$activeEdit.slide || 0} edit cropPreviewMode={cropActive} />
            </div>
        {:else if previewItem.type === "table"}
            <SlideItems item={previewItem} {ratio} {ref} {itemElem} slideIndex={$activeEdit.slide || 0} {index} edit />
        {:else}
            <SlideItems item={previewItem} {ratio} {ref} {itemElem} slideIndex={$activeEdit.slide || 0} edit />
        {/if}
    {/if}

    <EditboxCropping bind:this={cropElem} {item} {index} {ref} {itemElem} {plain} {isLocked} selected={$activeEdit.items.includes(index)} bind:cropActive bind:cropPreview />

    {#if mediaShouldBeBackground}
        <div class="tip">
            {translateText("edit.media_item_tip")}
            <MaterialButton style="color: var(--secondary);" on:click={convertToBackground}>{translateText("edit.convert_to_background")}</MaterialButton>
        </div>
    {/if}
</div>

<style>
    .item {
        outline: 5px solid rgb(255 255 255 / 0.2);
        outline-offset: 0;
        transition: background-color 0.3s;
        /* cursor: text; */

        /* media items */
        overflow: hidden;
    }
    .item.selected {
        overflow: visible;
    }
    .item.showOverflow {
        overflow: visible !important;
    }
    .item.selected :global(.align) {
        outline: 5px solid var(--secondary-opacity);
        overflow: visible !important;
    }

    /* Drag-over visual feedback for preset drop targets */
    .item.preset-drag-over {
        outline: 3px dashed #2563eb !important;
        outline-offset: 4px;
        background-color: rgba(37, 99, 235, 0.08);
        box-shadow: 0 0 0 9999px rgba(37, 99, 235, 0.05);
    }
    .item.preset-drag-over::before {
        content: "Drop preset di sini";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(37, 99, 235, 0.95);
        color: white;
        padding: 6px 14px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 600;
        pointer-events: none;
        z-index: 9999;
        white-space: nowrap;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    .item.chords {
        overflow: visible;
    }

    .item.isDisabledVariable {
        opacity: 0.5;
    }

    .item:hover {
        /* .item:hover > .edit { */
        background-color: rgb(255 255 255 / 0.05);
        backdrop-filter: blur(20px);
    }

    .mediaFrame {
        position: absolute;
        inset: 0;
        overflow: hidden;
    }
    .mediaFrame.showOverflow {
        overflow: visible;
    }

    .item.decoration:not(.selected) {
        pointer-events: none;
        outline: none !important;
    }

    .tip {
        position: absolute;
        top: 0;
        left: 0;

        background-color: rgb(0 0 0 / 0.5);
        padding: 12px;

        font-family: unset;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.32em;
        text-shadow: none;

        /* if parent is flipped, this will apply the same flip, so it's flipped back */
        /* WIP rotate means this also rotates on top */
        transform: inherit;
    }
</style>
