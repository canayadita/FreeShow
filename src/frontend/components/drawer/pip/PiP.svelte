<script lang="ts">
    import { onMount } from "svelte"
    import { uid } from "uid"
    import type { MultiPane, Pane, PaneSourceType } from "../../../../types/Show"
    import { multiPaneLayouts, ndiData, outputs } from "../../../stores"
    import { cameraManager } from "../../../media/cameraManager"
    import { getActiveOutputs, setOutput } from "../../helpers/output"
    import { newToast } from "../../../utils/common"
    import Icon from "../../helpers/Icon.svelte"
    import MaterialButton from "../../inputs/MaterialButton.svelte"
    import MaterialDropdown from "../../inputs/MaterialDropdown.svelte"
    import MaterialFilePicker from "../../inputs/MaterialFilePicker.svelte"
    import MaterialNumberInput from "../../inputs/MaterialNumberInput.svelte"
    import MaterialTextInput from "../../inputs/MaterialTextInput.svelte"
    import T from "../../helpers/T.svelte"
    import { imageExtensions, videoExtensions } from "../../../values/extensions"

    export let active: string | null = null

    const pipLayouts = [
        { id: "pipBottomRight", name: "PiP Bottom Right", icon: "pip", description: "Small pane at bottom right" },
        { id: "pipBottomLeft", name: "PiP Bottom Left", icon: "pip", description: "Small pane at bottom left" },
        { id: "pipTopRight", name: "PiP Top Right", icon: "pip", description: "Small pane at top right" },
        { id: "pipSideRight", name: "PiP Side Right", icon: "pip", description: "Side panel at right" },
        { id: "pipBottomBar", name: "PiP Bottom Bar", icon: "pip", description: "Bottom bar" },
        { id: "splitVertical", name: "Split Vertical", icon: "pip", description: "Two equal panes side by side" },
        { id: "splitHorizontal", name: "Split Horizontal", icon: "pip", description: "Two equal panes stacked" },
        { id: "grid2x2", name: "Grid 2x2", icon: "pip", description: "Four equal panes" }
    ]

    function getPipLayoutPanes(layoutId: string): Pane[] {
        const layouts: { [key: string]: Pane[] } = {
            pipBottomRight: [
                { id: "1", sourceType: "slide", position: { x: 0, y: 0, width: 65, height: 100 } },
                { id: "2", sourceType: "camera", position: { x: 65, y: 60, width: 32, height: 35 }, zIndex: 1, shadow: true, borderRadius: 10 }
            ],
            pipBottomLeft: [
                { id: "1", sourceType: "slide", position: { x: 35, y: 0, width: 65, height: 100 } },
                { id: "2", sourceType: "camera", position: { x: 3, y: 60, width: 32, height: 35 }, zIndex: 1, shadow: true, borderRadius: 10 }
            ],
            pipTopRight: [
                { id: "1", sourceType: "slide", position: { x: 0, y: 0, width: 65, height: 60 } },
                { id: "2", sourceType: "camera", position: { x: 65, y: 5, width: 32, height: 35 }, zIndex: 1, shadow: true, borderRadius: 10 }
            ],
            pipSideRight: [
                { id: "1", sourceType: "slide", position: { x: 0, y: 0, width: 65, height: 100 } },
                { id: "2", sourceType: "camera", position: { x: 65, y: 0, width: 35, height: 100 }, zIndex: 1 }
            ],
            pipBottomBar: [
                { id: "1", sourceType: "slide", position: { x: 0, y: 0, width: 100, height: 80 } },
                { id: "2", sourceType: "camera", position: { x: 0, y: 80, width: 100, height: 20 }, zIndex: 1 }
            ],
            splitVertical: [
                { id: "1", sourceType: "slide", position: { x: 0, y: 0, width: 50, height: 100 } },
                { id: "2", sourceType: "camera", position: { x: 50, y: 0, width: 50, height: 100 }, zIndex: 1 }
            ],
            splitHorizontal: [
                { id: "1", sourceType: "slide", position: { x: 0, y: 0, width: 100, height: 50 } },
                { id: "2", sourceType: "camera", position: { x: 0, y: 50, width: 100, height: 50 }, zIndex: 1 }
            ],
            grid2x2: [
                { id: "1", sourceType: "slide", position: { x: 0, y: 0, width: 50, height: 50 } },
                { id: "2", sourceType: "camera", position: { x: 50, y: 0, width: 50, height: 50 }, zIndex: 1 },
                { id: "3", sourceType: "screen", position: { x: 0, y: 50, width: 50, height: 50 }, zIndex: 1 },
                { id: "4", sourceType: "video", position: { x: 50, y: 50, width: 50, height: 50 }, zIndex: 1 }
            ]
        }
        return layouts[layoutId] || []
    }

    function applyPipLayout(layoutId: string) {
        const panes = getPipLayoutPanes(layoutId)
        const layout = pipLayouts.find((l) => l.id === layoutId)
        const multiPane: MultiPane = {
            id: uid(),
            name: layout?.name || "PiP Layout",
            panes,
            visible: false // Don't show immediately
        }
        
        const activeOutputIds = getActiveOutputs($outputs, true, true, true)
        if (activeOutputIds.length > 0) {
            setOutput("multiPane", multiPane, false, activeOutputIds[0])
        } else {
            setOutput("multiPane", multiPane)
        }
    }

    function clearPip() {
        setOutput("multiPane", null)
    }

    function togglePipVisibility() {
        const currentOutputId = getActiveOutputs($outputs, true, true, true)[0] || ""
        if (!currentOutputId) return

        const currentMultiPane = $outputs[currentOutputId]?.out?.multiPane
        if (!currentMultiPane) return

        setOutput("multiPane", { ...currentMultiPane, visible: !currentMultiPane.visible })
    }

    function updatePaneSource(paneId: string, sourceType: PaneSourceType, sourceId?: string) {
        updatePane(paneId, (p) => ({ ...p, sourceType, sourceId: sourceId || p.sourceId }))
    }

    // for file-based sources (image/video): the renderer reads pane.sourcePath
    function updatePaneSourcePath(paneId: string, sourcePath: string) {
        updatePane(paneId, (p) => ({ ...p, sourcePath }))
    }

    // generic pane updater (position, size, shape...)
    function updatePane(paneId: string, updater: (pane: Pane) => Pane) {
        const currentOutputId = getActiveOutputs($outputs, true, true, true)[0] || ""
        if (!currentOutputId) return

        const currentMultiPane = $outputs[currentOutputId]?.out?.multiPane
        if (!currentMultiPane) return

        const updatedPanes = currentMultiPane.panes.map((p) => (p.id === paneId ? updater(p) : p))
        setOutput("multiPane", { ...currentMultiPane, panes: updatedPanes })
    }

    function updatePanePosition(paneId: string, key: "x" | "y" | "width" | "height", value: number) {
        const n = Number(value) || 0
        const clamped = key === "width" || key === "height" ? Math.max(1, Math.min(300, n)) : Math.max(-200, Math.min(300, n))
        updatePane(paneId, (p) => ({ ...p, position: { ...p.position, [key]: clamped } }))
    }

    // --- drag-to-move / drag-to-resize in preview ---
    let previewElem: HTMLDivElement | null = null
    let dragMode: "move" | "resize" | "warp" | null = null
    let warpCorner: "tl" | "tr" | "br" | "bl" | null = null
    let warpStartX = 0
    let warpStartY = 0
    let draggingPaneId = ""
    let dragStartCX = 0, dragStartCY = 0
    let dragStartV1 = 0, dragStartV2 = 0

    function startDrag(e: MouseEvent, pane: Pane, mode: "move" | "resize") {
        if (e.button !== 0) return
        e.preventDefault()
        e.stopPropagation()
        dragMode = mode
        draggingPaneId = pane.id
        dragStartCX = e.clientX
        dragStartCY = e.clientY
        dragStartV1 = mode === "move" ? pane.position.x : pane.position.width
        dragStartV2 = mode === "move" ? pane.position.y : pane.position.height
    }

    function startWarpDrag(e: MouseEvent, pane: Pane, corner: "tl" | "tr" | "br" | "bl") {
        if (e.button !== 0) return
        e.preventDefault()
        e.stopPropagation()
        dragMode = "warp"
        draggingPaneId = pane.id
        warpCorner = corner
        dragStartCX = e.clientX
        dragStartCY = e.clientY
        warpStartX = pane.warp?.[corner]?.x ?? 0
        warpStartY = pane.warp?.[corner]?.y ?? 0
    }

    function onWindowMousemove(e: MouseEvent) {
        if (!dragMode || !draggingPaneId || !previewElem) return
        const rect = previewElem.getBoundingClientRect()
        const dx = ((e.clientX - dragStartCX) / rect.width) * 100
        const dy = ((e.clientY - dragStartCY) / rect.height) * 100
        if (dragMode === "warp" && warpCorner) {
            // convert preview-% delta into pane-% delta (offset is % of pane size)
            const pane = ($outputs[getActiveOutputs($outputs, true, true, true)[0] || ""]?.out?.multiPane?.panes || []).find((p: any) => p.id === draggingPaneId)
            if (!pane) return
            const paneWpct = pane.position.width || 1
            const paneHpct = pane.position.height || 1
            const x = Math.round((warpStartX + (dx / paneWpct) * 100) * 10) / 10
            const y = Math.round((warpStartY + (dy / paneHpct) * 100) * 10) / 10
            updatePaneWarp(draggingPaneId, warpCorner, "x", x)
            updatePaneWarp(draggingPaneId, warpCorner, "y", y)
            return
        }
        if (dragMode === "move") {
            const x = Math.round((dragStartV1 + dx) * 10) / 10
            const y = Math.round((dragStartV2 + dy) * 10) / 10
            updatePaneDirect(draggingPaneId, { x, y })
        } else {
            const width = Math.max(5, Math.round((dragStartV1 + dx) * 10) / 10)
            const height = Math.max(5, Math.round((dragStartV2 + dy) * 10) / 10)
            updatePaneDirect(draggingPaneId, { width, height })
        }
    }

    function onWindowMouseup() {
        dragMode = null
        draggingPaneId = ""
        warpCorner = null
    }

    function updatePaneDirect(paneId: string, changes: Partial<{ x: number; y: number; width: number; height: number }>) {
        const oid = getActiveOutputs($outputs, true, true, true)[0] || ""
        const mp = $outputs[oid]?.out?.multiPane
        if (!mp) return
        const updatedPanes = mp.panes.map((p) => (p.id === paneId ? { ...p, position: { ...p.position, ...changes } } : p))
        setOutput("multiPane", { ...mp, panes: updatedPanes })
    }

    const PANE_COLORS = [
        { bg: "rgba(59,130,246,0.35)", border: "rgba(59,130,246,0.9)" },
        { bg: "rgba(34,197,94,0.35)", border: "rgba(34,197,94,0.9)" },
        { bg: "rgba(249,115,22,0.35)", border: "rgba(249,115,22,0.9)" },
        { bg: "rgba(168,85,247,0.35)", border: "rgba(168,85,247,0.9)" },
        { bg: "rgba(236,72,153,0.35)", border: "rgba(236,72,153,0.9)" }
    ]

    function updatePaneShape(paneId: string, key: "borderRadius" | "opacity" | "zIndex", value: number) {
        updatePane(paneId, (p) => ({ ...p, [key]: Number(value) || 0 }))
    }

    function togglePaneShadow(paneId: string) {
        updatePane(paneId, (p) => ({ ...p, shadow: !p.shadow }))
    }

    // static 3D tilt: axis "x" = tilt up/down (rotateX), "y" = turn left/right (rotateY)
    function updatePaneRotation(paneId: string, axis: "x" | "y", value: number) {
        updatePane(paneId, (p) => ({ ...p, rotate3d: { x: p.rotate3d?.x ?? 0, y: p.rotate3d?.y ?? 0, [axis]: Number(value) || 0 } }))
    }

    function updatePaneCrop(paneId: string, value: number) {
        updatePane(paneId, (p) => ({ ...p, crop: Math.min(45, Math.max(0, Number(value) || 0)) }))
    }

    function updatePaneFeather(paneId: string, side: "left" | "right" | "top" | "bottom", value: number) {
        updatePane(paneId, (p) => ({ ...p, feather: { left: p.feather?.left ?? 0, right: p.feather?.right ?? 0, top: p.feather?.top ?? 0, bottom: p.feather?.bottom ?? 0, [side]: Math.min(50, Math.max(0, Number(value) || 0)) } }))
    }

    const ZERO_WARP = { tl: { x: 0, y: 0 }, tr: { x: 0, y: 0 }, br: { x: 0, y: 0 }, bl: { x: 0, y: 0 } }
    function updatePaneWarp(paneId: string, corner: "tl" | "tr" | "br" | "bl", axis: "x" | "y", value: number) {
        updatePane(paneId, (p) => {
            const warp = p.warp ? { tl: { ...p.warp.tl }, tr: { ...p.warp.tr }, br: { ...p.warp.br }, bl: { ...p.warp.bl } } : { tl: { x: 0, y: 0 }, tr: { x: 0, y: 0 }, br: { x: 0, y: 0 }, bl: { x: 0, y: 0 } }
            warp[corner][axis] = Math.min(100, Math.max(-100, Number(value) || 0))
            return { ...p, warp }
        })
    }
    function resetPaneWarp(paneId: string) {
        updatePane(paneId, (p) => ({ ...p, warp: JSON.parse(JSON.stringify(ZERO_WARP)) }))
    }
    let warpMode = false

    function addPane() {
        if (!currentMultiPane) return
        const newPane: Pane = { id: uid(5), sourceType: "camera", position: { x: 60, y: 60, width: 35, height: 35 }, zIndex: (currentMultiPane.panes.length || 0) + 1, shadow: true, borderRadius: 10 }
        setOutput("multiPane", { ...currentMultiPane, panes: [...currentMultiPane.panes, newPane] })
    }

    function removePane(paneId: string) {
        if (!currentMultiPane) return
        setOutput("multiPane", { ...currentMultiPane, panes: currentMultiPane.panes.filter((p) => p.id !== paneId) })
    }

    // CUSTOM TEMPLATES (persisted)

    let templateName = ""

    function saveAsTemplate() {
        if (!currentMultiPane) return
        const name = templateName.trim() || `${currentMultiPane.name} (Custom)`
        const id = uid()

        multiPaneLayouts.update((a) => {
            a[id] = { id, name, panes: clonePanes(currentMultiPane!.panes) }
            return a
        })

        templateName = ""
        newToast(`Template PiP '${name}' tersimpan!`)
    }

    function applyCustomLayout(id: string) {
        const layout = $multiPaneLayouts[id]
        if (!layout) return

        const multiPane: MultiPane = { id: uid(), name: layout.name, panes: clonePanes(layout.panes), visible: false }
        const activeOutputIds = getActiveOutputs($outputs, true, true, true)
        if (activeOutputIds.length > 0) setOutput("multiPane", multiPane, false, activeOutputIds[0])
        else setOutput("multiPane", multiPane)
    }

    function deleteCustomLayout(id: string) {
        multiPaneLayouts.update((a) => {
            delete a[id]
            return a
        })
    }

    function newBlankLayout() {
        const multiPane: MultiPane = {
            id: uid(),
            name: "Custom PiP",
            panes: [{ id: uid(5), sourceType: "slide", position: { x: 0, y: 0, width: 100, height: 100 } }],
            visible: false
        }
        const activeOutputIds = getActiveOutputs($outputs, true, true, true)
        if (activeOutputIds.length > 0) setOutput("multiPane", multiPane, false, activeOutputIds[0])
        else setOutput("multiPane", multiPane)
    }

    function clonePanes(panes: Pane[]): Pane[] {
        return JSON.parse(JSON.stringify(panes))
    }

    $: currentOutputId = getActiveOutputs($outputs, true, true, true)[0] || ""
    $: currentMultiPane = currentOutputId ? $outputs[currentOutputId]?.out?.multiPane : null
    $: isPipVisible = currentMultiPane?.visible || false

    // Get available sources
    let cameraList: { value: string; label: string }[] = []
    $: ndiList = Object.keys($ndiData).map((id) => ({ value: id, label: id }))

    // Load cameras on mount
    onMount(async () => {
        const cameras = await cameraManager.getCamerasList()
        cameraList = cameras.map((cam: any) => ({ value: cam.id, label: cam.name || `Camera ${cam.id}` }))
    })

    function getSourceOptions(pane: Pane) {
        if (pane.sourceType === "camera") return cameraList
        if (pane.sourceType === "ndi") return ndiList
        // "slide" always mirrors the LIVE clicked slide - no source selection needed
        // "image"/"video" use a file picker (sets pane.sourcePath) instead of a dropdown
        return []
    }

    const paneSourceTypes: { value: PaneSourceType; label: string }[] = [
        { value: "camera", label: "Camera" },
        { value: "screen", label: "Screen" },
        { value: "ndi", label: "NDI" },
        { value: "blackmagic", label: "Blackmagic" },
        { value: "video", label: "Video" },
        { value: "image", label: "Image" },
        { value: "player", label: "Player" },
        { value: "slide", label: "Slide/Show" },
        { value: "transparent", label: "Transparent" }
    ]
</script>

<svelte:window on:mousemove={onWindowMousemove} on:mouseup={onWindowMouseup} />

<div class="pip-container">
    <div class="header">
        <h2><T id="tabs.pip" /></h2>
        <p class="description"><T id="tabs.pip_info" /></p>
    </div>

    {#if currentMultiPane}
        <div class="active-layout">
            <div class="active-header">
                <h3>{currentMultiPane.name}</h3>
                <div class="header-actions">
                    <MaterialButton 
                        icon={isPipVisible ? "hide" : "show"} 
                        on:click={togglePipVisibility}
                        title={isPipVisible ? "Hide PiP" : "Show PiP"}
                    >
                        <T id={isPipVisible ? "actions.hide" : "actions.show"} />
                    </MaterialButton>
                    <MaterialButton icon="close" on:click={clearPip}>
                        <T id="actions.disable" />
                    </MaterialButton>
                </div>
            </div>

            <!-- mini preview — drag to move, drag resize-handle to resize -->
            <div class="pip-preview-wrap">
                <div class="pip-preview" bind:this={previewElem}>
                    {#each currentMultiPane.panes as pane, i}
                        {@const col = PANE_COLORS[i % PANE_COLORS.length]}
                        <div
                            class="preview-pane"
                            class:is-dragging={draggingPaneId === pane.id && dragMode === "move"}
                            style="left:{pane.position.x}%;top:{pane.position.y}%;width:{pane.position.width}%;height:{pane.position.height}%;background:{col.bg};border:2px solid {col.border};"
                            on:mousedown={(e) => startDrag(e, pane, "move")}
                            role="button"
                            tabindex="0"
                            aria-label="Drag pane {i + 1}"
                        >
                            <span class="pp-label">{i + 1} {pane.sourceType}</span>
                            <div
                                class="resize-handle"
                                on:mousedown={(e) => startDrag(e, pane, "resize")}
                                role="button"
                                tabindex="0"
                                aria-label="Resize pane {i + 1}"
                            />
                            {#if warpMode}
                                <div class="warp-handle tl" on:mousedown|stopPropagation={(e) => startWarpDrag(e, pane, "tl")} role="button" tabindex="-1" aria-label="Warp TL"></div>
                                <div class="warp-handle tr" on:mousedown|stopPropagation={(e) => startWarpDrag(e, pane, "tr")} role="button" tabindex="-1" aria-label="Warp TR"></div>
                                <div class="warp-handle br" on:mousedown|stopPropagation={(e) => startWarpDrag(e, pane, "br")} role="button" tabindex="-1" aria-label="Warp BR"></div>
                                <div class="warp-handle bl" on:mousedown|stopPropagation={(e) => startWarpDrag(e, pane, "bl")} role="button" tabindex="-1" aria-label="Warp BL"></div>
                            {/if}
                        </div>
                    {/each}
                </div>
                <p class="preview-hint">Drag to move · bottom-right corner to resize</p>
            </div>

            <div class="pane-configs">
                {#each currentMultiPane.panes as pane, i}
                    <div class="pane-config">
                        <div class="pane-header">
                            <Icon id="pip" size={1.2} />
                            <span>Pane {i + 1}</span>
                            <span class="pane-size">{pane.position.width}% × {pane.position.height}%</span>
                            <MaterialButton icon="delete" title="Remove pane" on:click={() => removePane(pane.id)} />
                        </div>
                        <div class="pane-controls">
                            <MaterialDropdown
                                label="Source Type"
                                value={pane.sourceType}
                                options={paneSourceTypes}
                                on:change={(e) => updatePaneSource(pane.id, e.detail)}
                            />
                            {#if getSourceOptions(pane).length > 0}
                                <MaterialDropdown
                                    label="Source"
                                    value={pane.sourceId || ""}
                                    options={getSourceOptions(pane)}
                                    on:change={(e) => updatePaneSource(pane.id, pane.sourceType, e.detail)}
                                />
                            {:else if pane.sourceType === "image"}
                                <MaterialFilePicker
                                    label="Import Image"
                                    value={pane.sourcePath}
                                    filter={{ name: "Image files", extensions: imageExtensions }}
                                    showThumbnail
                                    allowEmpty
                                    on:change={(e) => updatePaneSourcePath(pane.id, e.detail)}
                                />
                            {:else if pane.sourceType === "video"}
                                <MaterialFilePicker
                                    label="Import Video"
                                    value={pane.sourcePath}
                                    filter={{ name: "Video files", extensions: videoExtensions }}
                                    allowEmpty
                                    on:change={(e) => updatePaneSourcePath(pane.id, e.detail)}
                                />
                            {/if}

                            <!-- position & size (percentage of output, X/Y can be negative to push pane off-edge) -->
                            <div class="pane-inputs">
                                <MaterialNumberInput label="X (%)" value={pane.position.x} min={-200} max={300} step={1} scrub on:change={(e) => updatePanePosition(pane.id, "x", e.detail)} />
                                <MaterialNumberInput label="Y (%)" value={pane.position.y} min={-200} max={300} step={1} scrub on:change={(e) => updatePanePosition(pane.id, "y", e.detail)} />
                                <MaterialNumberInput label="Width (%)" value={pane.position.width} min={1} max={300} step={1} scrub on:change={(e) => updatePanePosition(pane.id, "width", e.detail)} />
                                <MaterialNumberInput label="Height (%)" value={pane.position.height} min={1} max={300} step={1} scrub on:change={(e) => updatePanePosition(pane.id, "height", e.detail)} />
                            </div>

                            <!-- shape -->
                            <div class="pane-inputs">
                                <MaterialNumberInput label="Corner radius" value={pane.borderRadius || 0} min={0} max={200} step={2} scrub on:change={(e) => updatePaneShape(pane.id, "borderRadius", e.detail)} />
                                <MaterialNumberInput label="Layer (z)" value={pane.zIndex || 0} min={0} max={20} step={1} scrub on:change={(e) => updatePaneShape(pane.id, "zIndex", e.detail)} />
                                <MaterialButton icon="theme" variant={pane.shadow ? "contained" : "outlined"} title="Shadow" on:click={() => togglePaneShadow(pane.id)}>
                                    Shadow {pane.shadow ? "ON" : "OFF"}
                                </MaterialButton>
                            </div>

                            <!-- static 3D tilt (click & drag the number up/down for a quick change) -->
                            <div class="pane-inputs">
                                <MaterialNumberInput label="Rotate ↔ (Y)" value={pane.rotate3d?.y || 0} min={-85} max={85} step={5} scrub on:change={(e) => updatePaneRotation(pane.id, "y", e.detail)} />
                                <MaterialNumberInput label="Tilt ↕ (X)" value={pane.rotate3d?.x || 0} min={-85} max={85} step={5} scrub on:change={(e) => updatePaneRotation(pane.id, "x", e.detail)} />
                            </div>

                            <!-- Crop / Zoom for any source: 0 = full content (slide may show letterbox bars). Increase to zoom in & crop the edges to fill the pane. Click-drag for quick change. -->
                            <div class="pane-inputs">
                                <MaterialNumberInput label="Crop / Zoom (%)" value={pane.crop || 0} min={0} max={45} step={1} scrub on:change={(e) => updatePaneCrop(pane.id, e.detail)} />
                            </div>

                            <!-- Feather: transparent gradient fade per edge (0 = sharp) -->
                            <div class="pane-inputs">
                                <MaterialNumberInput label="Feather L" value={pane.feather?.left || 0} min={0} max={50} step={1} scrub on:change={(e) => updatePaneFeather(pane.id, "left", e.detail)} />
                                <MaterialNumberInput label="Feather R" value={pane.feather?.right || 0} min={0} max={50} step={1} scrub on:change={(e) => updatePaneFeather(pane.id, "right", e.detail)} />
                                <MaterialNumberInput label="Feather T" value={pane.feather?.top || 0} min={0} max={50} step={1} scrub on:change={(e) => updatePaneFeather(pane.id, "top", e.detail)} />
                                <MaterialNumberInput label="Feather B" value={pane.feather?.bottom || 0} min={0} max={50} step={1} scrub on:change={(e) => updatePaneFeather(pane.id, "bottom", e.detail)} />
                            </div>

                            <!-- Warp (corner-pin): drag handles in preview when Warp mode on, or type per-corner offsets -->
                            <div class="pane-inputs">
                                <MaterialButton icon="edit" variant={warpMode ? "contained" : "outlined"} title="Warp mode (drag corners in preview)" on:click={() => (warpMode = !warpMode)}>
                                    Warp {warpMode ? "ON" : "OFF"}
                                </MaterialButton>
                                <MaterialButton icon="reset" variant="outlined" title="Reset warp" on:click={() => resetPaneWarp(pane.id)}>Reset Warp</MaterialButton>
                            </div>
                            {#if warpMode}
                                <div class="pane-inputs">
                                    <MaterialNumberInput label="TL X" value={pane.warp?.tl.x || 0} min={-100} max={100} step={1} scrub on:change={(e) => updatePaneWarp(pane.id, "tl", "x", e.detail)} />
                                    <MaterialNumberInput label="TL Y" value={pane.warp?.tl.y || 0} min={-100} max={100} step={1} scrub on:change={(e) => updatePaneWarp(pane.id, "tl", "y", e.detail)} />
                                    <MaterialNumberInput label="TR X" value={pane.warp?.tr.x || 0} min={-100} max={100} step={1} scrub on:change={(e) => updatePaneWarp(pane.id, "tr", "x", e.detail)} />
                                    <MaterialNumberInput label="TR Y" value={pane.warp?.tr.y || 0} min={-100} max={100} step={1} scrub on:change={(e) => updatePaneWarp(pane.id, "tr", "y", e.detail)} />
                                </div>
                                <div class="pane-inputs">
                                    <MaterialNumberInput label="BR X" value={pane.warp?.br.x || 0} min={-100} max={100} step={1} scrub on:change={(e) => updatePaneWarp(pane.id, "br", "x", e.detail)} />
                                    <MaterialNumberInput label="BR Y" value={pane.warp?.br.y || 0} min={-100} max={100} step={1} scrub on:change={(e) => updatePaneWarp(pane.id, "br", "y", e.detail)} />
                                    <MaterialNumberInput label="BL X" value={pane.warp?.bl.x || 0} min={-100} max={100} step={1} scrub on:change={(e) => updatePaneWarp(pane.id, "bl", "x", e.detail)} />
                                    <MaterialNumberInput label="BL Y" value={pane.warp?.bl.y || 0} min={-100} max={100} step={1} scrub on:change={(e) => updatePaneWarp(pane.id, "bl", "y", e.detail)} />
                                </div>
                            {/if}
                        </div>
                    </div>
                {/each}

                <MaterialButton icon="add" variant="outlined" style="width: 100%; justify-content: center;" on:click={addPane}>Add Pane</MaterialButton>
            </div>

            <!-- save current layout as a custom template -->
            <div class="save-template">
                <MaterialTextInput label="Template name" value={templateName} placeholder={currentMultiPane.name} on:change={(e) => (templateName = e.detail)} />
                <MaterialButton icon="save" variant="outlined" on:click={saveAsTemplate}>Save Template</MaterialButton>
            </div>
        </div>
    {/if}

    <div class="layouts">
        <h3><T id="templates.templates" /></h3>
        <div class="layout-grid">
            <button class="layout-card" on:click={newBlankLayout}>
                <div class="layout-preview">
                    <Icon id="add" size={2} />
                </div>
                <div class="layout-info">
                    <span class="layout-name">Create Manually</span>
                    <span class="layout-description">Start from one slide pane, add & arrange your own</span>
                </div>
            </button>

            {#each pipLayouts as layout}
                <button
                    class="layout-card"
                    class:active={currentMultiPane?.name === layout.name}
                    on:click={() => applyPipLayout(layout.id)}
                >
                    <div class="layout-preview">
                        <Icon id="pip" size={2} />
                    </div>
                    <div class="layout-info">
                        <span class="layout-name">{layout.name}</span>
                        <span class="layout-description">{layout.description}</span>
                    </div>
                </button>
            {/each}
        </div>
    </div>

    {#if Object.keys($multiPaneLayouts).length}
        <div class="layouts" style="margin-top: 16px;">
            <h3>Template Custom</h3>
            <div class="layout-grid">
                {#each Object.values($multiPaneLayouts) as layout (layout.id)}
                    <div class="layout-card custom" class:active={currentMultiPane?.name === layout.name}>
                        <button class="card-main" on:click={() => applyCustomLayout(layout.id)}>
                            <div class="layout-preview">
                                <Icon id="pip" size={2} />
                            </div>
                            <div class="layout-info">
                                <span class="layout-name">{layout.name}</span>
                                <span class="layout-description">{layout.panes.length} pane</span>
                            </div>
                        </button>
                        <MaterialButton icon="delete" title="Delete template" on:click={() => deleteCustomLayout(layout.id)} />
                    </div>
                {/each}
            </div>
        </div>
    {/if}
</div>

<style>
    .pip-container {
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow-y: auto;
        padding: 16px;
    }

    .header {
        margin-bottom: 16px;
    }

    .header h2 {
        color: var(--text);
        margin: 0 0 4px 0;
        font-size: 1.2em;
    }

    .description {
        color: var(--text);
        opacity: 0.6;
        font-size: 0.85em;
        margin: 0;
    }

    .active-layout {
        background: var(--primary-lighter);
        border-radius: 8px;
        padding: 12px;
        margin-bottom: 16px;
    }

    .active-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
    }

    .active-header h3 {
        color: var(--text);
        margin: 0;
        font-size: 1em;
    }

    .header-actions {
        display: flex;
        gap: 8px;
    }

    .pane-configs {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .pane-config {
        background: var(--primary-darker);
        border-radius: 6px;
        padding: 8px 12px;
    }

    .pane-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
        color: var(--text);
    }

    .pane-size {
        margin-left: auto;
        opacity: 0.6;
        font-size: 0.85em;
    }

    .pane-controls {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    .pane-inputs {
        display: flex;
        gap: 6px;
        align-items: center;
    }
    .pane-inputs > :global(*) {
        flex: 1;
    }

    .save-template {
        display: flex;
        gap: 8px;
        align-items: center;
        margin-top: 12px;
    }
    .save-template > :global(:first-child) {
        flex: 1;
    }

    .layout-card.custom {
        display: flex;
        flex-direction: row;
        align-items: stretch;
        padding: 0;
    }
    .layout-card.custom .card-main {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 12px;
        background: transparent;
        border: none;
        cursor: pointer;
        color: inherit;
    }

    .layouts h3 {
        color: var(--text);
        margin: 0 0 12px 0;
        font-size: 1em;
    }

    .layout-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 12px;
    }

    .layout-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 12px;
        background: var(--primary-lighter);
        border: 2px solid transparent;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s;
    }

    .layout-card:hover {
        background: var(--primary);
        border-color: var(--secondary);
    }

    .layout-card.active {
        border-color: var(--secondary);
        background: var(--primary);
    }

    .layout-preview {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60px;
        height: 40px;
        margin-bottom: 8px;
        background: var(--primary-darker);
        border-radius: 4px;
    }

    .layout-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .layout-name {
        color: var(--text);
        font-size: 0.85em;
        font-weight: 500;
    }

    .layout-description {
        color: var(--text);
        opacity: 0.6;
        font-size: 0.7em;
        margin-top: 2px;
    }

    /* --- PiP mini preview --- */
    .pip-preview-wrap {
        margin-bottom: 12px;
    }

    .pip-preview {
        position: relative;
        width: 100%;
        aspect-ratio: 16 / 9;
        background: #111;
        border-radius: 4px;
        overflow: hidden;
        cursor: default;
    }

    .preview-pane {
        position: absolute;
        cursor: move;
        border-radius: 2px;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        box-sizing: border-box;
        user-select: none;
        touch-action: none;
        transition: box-shadow 0.1s;
    }

    .preview-pane:hover {
        box-shadow: 0 0 0 2px white;
    }

    .preview-pane.is-dragging {
        box-shadow: 0 0 0 2px white;
        opacity: 0.85;
    }

    .pp-label {
        font-size: 9px;
        color: white;
        padding: 2px 4px;
        background: rgba(0, 0, 0, 0.55);
        border-radius: 2px;
        pointer-events: none;
        white-space: nowrap;
        overflow: hidden;
        max-width: 100%;
        text-overflow: ellipsis;
        line-height: 1.4;
    }

    .resize-handle {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 14px;
        height: 14px;
        background: white;
        opacity: 0.75;
        cursor: se-resize;
        border-radius: 3px 0 0 0;
    }

    .warp-handle {
        position: absolute;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: var(--secondary);
        border: 2px solid #fff;
        cursor: crosshair;
        z-index: 5;
    }
    .warp-handle.tl {
        top: -6px;
        left: -6px;
    }
    .warp-handle.tr {
        top: -6px;
        right: -6px;
    }
    .warp-handle.br {
        bottom: -6px;
        right: -6px;
    }
    .warp-handle.bl {
        bottom: -6px;
        left: -6px;
    }

    .resize-handle:hover {
        opacity: 1;
    }

    .preview-hint {
        font-size: 0.7em;
        color: var(--text);
        opacity: 0.45;
        margin: 4px 0 0 0;
        text-align: center;
    }
</style>
