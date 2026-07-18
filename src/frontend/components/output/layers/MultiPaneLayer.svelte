<script lang="ts">
    import type { MultiPane, Pane } from "../../../../types/Show"
    import BmdStream from "../../drawer/live/BMDStream.svelte"
    import NdiStream from "../../drawer/live/NDIStream.svelte"
    import Player from "../../system/Player.svelte"
    import Camera from "../Camera.svelte"
    import Window from "../Window.svelte"
    import Media from "./Media.svelte"
    import { getWarpMatrix } from "./warpMatrix"

    export let outputId = ""
    export let multiPane: MultiPane | null = null
    export let resolution: { width: number; height: number } = { width: 1920, height: 1080 }
    export let mirror = false
    export let preview = false

    $: panes = multiPane?.panes || []
    $: isVisible = multiPane?.visible || false
    $: sortedPanes = [...panes].sort((a, b) => (a.zIndex ?? 0) - (b.zIndex ?? 0))

    let playerVideoData: { [key: string]: any } = {}
    let playerVideoTime: { [key: string]: number } = {}

    function getPaneStyle(pane: Pane): string {
        const { x, y, width, height } = pane.position
        let style = `position: absolute; left: ${x}%; top: ${y}%; width: ${width}%; height: ${height}%;`
        style += ` z-index: ${pane.zIndex ?? 0};`
        style += ` background: ${pane.sourceType === "slide" ? "transparent" : "#000000"};`
        if (pane.opacity !== undefined && pane.opacity < 100) style += ` opacity: ${pane.opacity / 100};`
        if (pane.borderRadius) style += ` border-radius: ${pane.borderRadius}px;`
        if (pane.border) style += ` border: ${pane.border.width}px solid ${pane.border.color};`
        if (pane.shadow) style += ` box-shadow: 0 4px 20px rgba(0,0,0,0.5);`
        style += ` overflow: hidden;`
        // static 3D tilt (rotateX = up/down, rotateY = left/right)
        let transform = ""
        if (pane.rotate3d && (pane.rotate3d.x || pane.rotate3d.y)) {
            transform += ` perspective(1200px) rotateX(${pane.rotate3d.x}deg) rotateY(${pane.rotate3d.y}deg)`
        }
        // corner-pin warp (matrix3d from 4 corner offsets); needs pixel size of the pane
        const paneW = (pane.position.width / 100) * resolution.width
        const paneH = (pane.position.height / 100) * resolution.height
        const warpMatrix = getWarpMatrix(paneW, paneH, pane.warp)
        if (warpMatrix) transform += " " + warpMatrix
        if (transform) style += ` transform-origin: 0 0; transform:${transform};`

        // edge feather via mask gradients (per side, % of pane w/h)
        const f = pane.feather
        if (f && (f.left || f.right || f.top || f.bottom)) {
            const grads: string[] = []
            if (f.left > 0) grads.push(`linear-gradient(to right, transparent 0%, #000 ${f.left}%)`)
            if (f.right > 0) grads.push(`linear-gradient(to left, transparent 0%, #000 ${f.right}%)`)
            if (f.top > 0) grads.push(`linear-gradient(to bottom, transparent 0%, #000 ${f.top}%)`)
            if (f.bottom > 0) grads.push(`linear-gradient(to top, transparent 0%, #000 ${f.bottom}%)`)
            const list = grads.join(", ")
            const composite = grads.map(() => "source-in").slice(1).join(", ") // n-1 composites
            style += ` -webkit-mask-image: ${list}; mask-image: ${list};`
            if (composite) style += ` -webkit-mask-composite: ${composite}; mask-composite: intersect;`
        }

        return style
    }

    function hasValidSource(pane: Pane): boolean {
        if (pane.sourceType === "transparent") return false
        if (pane.sourceType === "camera" && !pane.sourceId) return false
        if (pane.sourceType === "screen" && !pane.sourceId) return false
        if (pane.sourceType === "ndi" && !pane.sourceId) return false
        if (pane.sourceType === "blackmagic" && !pane.sourceId) return false
        if (pane.sourceType === "video" && !pane.sourcePath) return false
        if (pane.sourceType === "image" && !pane.sourcePath) return false
        if (pane.sourceType === "player" && !pane.sourceId) return false
        return true
    }

    // Slide canvas is the full output resolution (1920×1080), rendered faithfully
    // (WYSIWYG — same layout as the main output) and scaled to fit the pane with
    // "contain" so nothing is ever clipped (may leave letterbox bars when the pane
    // aspect differs from 16:9). The optional `crop` (0-45%) zooms in and crops
    // equally from all sides, so the user can fill the pane / remove the bars.
    const CANVAS_WIDTH = 1920
    const CANVAS_HEIGHT = 1080
    function getSlideScaleStyle(pane: Pane): string {
        const paneWidth = Math.max(1, (pane.position.width / 100) * resolution.width)
        const paneHeight = Math.max(1, (pane.position.height / 100) * resolution.height)
        const cropFrac = Math.min(0.45, Math.max(0, (pane.crop || 0) / 100))
        const containScale = Math.min(paneWidth / CANVAS_WIDTH, paneHeight / CANVAS_HEIGHT)
        const scale = containScale / (1 - 2 * cropFrac)
        const offsetX = (paneWidth - CANVAS_WIDTH * scale) / 2
        const offsetY = (paneHeight - CANVAS_HEIGHT * scale) / 2
        return `position: absolute; left: ${offsetX}px; top: ${offsetY}px; width: ${CANVAS_WIDTH}px; height: ${CANVAS_HEIGHT}px; transform: scale(${scale}); transform-origin: top left;`
    }

    // crop/zoom for non-slide (direct media) sources: scale the content up and let the
    // pane's overflow:hidden clip the edges. Same crop fraction meaning as slide panes.
    function getDirectCropStyle(pane: Pane): string {
        const cropFrac = Math.min(0.45, Math.max(0, (pane.crop || 0) / 100))
        if (!cropFrac) return ""
        const scale = 1 / (1 - 2 * cropFrac)
        return `transform: scale(${scale}); transform-origin: center center;`
    }

    function getPaneResolution(pane: Pane) {
        return {
            width: Math.max(1, Math.round((pane.position.width / 100) * resolution.width)),
            height: Math.max(1, Math.round((pane.position.height / 100) * resolution.height))
        }
    }
</script>

{#if isVisible}
    {#each sortedPanes as pane, paneIndex (pane.id)}
        {#if pane.sourceType !== "transparent"}
            <div class="pane" class:directSource={pane.sourceType !== "slide"} style={getPaneStyle(pane)}>
                {#if hasValidSource(pane)}
                    {#if pane.sourceType === "slide"}
                        <div class="slideScaler" style={getSlideScaleStyle(pane)}>
                            <slot name="slide" paneResolution={getPaneResolution(pane)} />
                        </div>
                    {:else}
                        <!-- crop/zoom wrapper: scaling up + pane overflow:hidden crops the edges (works for any direct source) -->
                        <div class="cropWrapper" style={getDirectCropStyle(pane)}>
                            {#if pane.sourceType === "camera"}
                                <Camera id={pane.sourceId || ""} groupId="" style="width: 100%; height: 100%; object-fit: cover;" {mirror} />
                            {:else if pane.sourceType === "screen"}
                                <Window id={pane.sourceId || ""} class="media" style="width: 100%; height: 100%;" />
                            {:else if pane.sourceType === "ndi"}
                                <NdiStream screen={{ id: pane.sourceId || "", name: "" }} background={false} {mirror} />
                            {:else if pane.sourceType === "blackmagic"}
                                <BmdStream screen={{ id: pane.sourceId || "", name: "" }} background={false} {mirror} />
                            {:else if pane.sourceType === "video" || pane.sourceType === "image"}
                                <Media path={pane.sourcePath || ""} data={{ type: pane.sourceType === "video" ? "video" : "image", muted: pane.muted, loop: pane.loop, flipped: pane.flipped }} mediaStyle={{ fit: "cover" }} {mirror} />
                            {:else if pane.sourceType === "player"}
                                <Player {outputId} id={pane.sourceId || ""} videoData={playerVideoData[pane.id] || {}} videoTime={playerVideoTime[pane.id] || 0} />
                            {/if}
                        </div>
                    {/if}
                {:else}
                    <div class="placeholder">
                        <span class="placeholder-text">{pane.sourceType}</span>
                    </div>
                {/if}
            </div>
        {/if}
    {/each}
{/if}

<style>
    .pane {
        pointer-events: none;
        background: #000000;
    }

    /* crop/zoom wrapper for direct media sources — fills the pane, scaled by getDirectCropStyle */
    .cropWrapper {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
    }

    /* only force-fit direct media sources (camera/screen/video...) — the slide pane
       renders full slide content scaled via .slideScaler and must keep its own layout */
    .pane.directSource :global(video),
    .pane.directSource :global(.media),
    .pane.directSource :global(img),
    .pane.directSource :global(canvas) {
        width: 100% !important;
        height: 100% !important;
        max-width: none !important;
        max-height: none !important;
        object-fit: cover !important;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
    }

    .placeholder {
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .placeholder-text {
        color: white;
        font-size: 14px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;
        opacity: 0.8;
    }
</style>
