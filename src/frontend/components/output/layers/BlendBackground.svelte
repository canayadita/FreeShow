<script lang="ts">
    import type { Blend, BlendLayer } from "../../../../types/Blend"
    import { blends } from "../../../stores"
    import BmdStream from "../../drawer/live/BMDStream.svelte"
    import NdiStream from "../../drawer/live/NDIStream.svelte"
    import { getCropClipPathCss, getFeatherMaskCss, hasValidSource } from "../../helpers/blendsMath"
    import Camera from "../Camera.svelte"
    import Window from "../Window.svelte"
    import Media from "./Media.svelte"

    export let blendId = ""
    // Optional override: render this data directly instead of looking `blendId` up in the
    // store. Used by the Mixer's sandboxed live preview, which edits an unsaved draft and
    // must never touch the real `blends` store or the real output.
    export let blend: Blend | null = null
    export let mirror = false

    $: resolvedBlend = blend || $blends[blendId]
    $: layers = resolvedBlend?.layers || []

    // Media.svelte only reads its `data` prop to pick a media *type* — looping is driven
    // entirely by its `videoData` prop (bound two-way, mirroring how BackgroundMedia.svelte
    // does it for the normal background). Without this, a Blend layer's video plays once and
    // stops instead of looping. One entry per layer id, seeded with loop:true up front so it's
    // already set by the time each layer's <Media> first mounts.
    let videoDataByLayer: Record<string, { paused: boolean; muted: boolean; duration: number; loop: boolean }> = {}
    $: layers.forEach((layer) => {
        if (layer.sourceType === "video" && !videoDataByLayer[layer.id]) {
            videoDataByLayer[layer.id] = { paused: false, muted: true, duration: 0, loop: true }
        }
    })

    function getLayerStyle(layer: BlendLayer, index: number): string {
        let style = `opacity:${(layer.opacity ?? 100) / 100};`
        if (index > 0 && layer.blendMode) style += `mix-blend-mode:${layer.blendMode};`

        // pan/zoom: read by the video/img/media/canvas rule below, so they apply to whatever
        // element actually renders this layer's source, regardless of source type.
        const panX = 50 + Math.min(50, Math.max(-50, layer.position?.x ?? 0))
        const panY = 50 + Math.min(50, Math.max(-50, layer.position?.y ?? 0))
        const zoom = Math.max(1, (layer.zoom ?? 100) / 100)
        style += `--pan-x:${panX}%;--pan-y:${panY}%;--zoom:${zoom};`

        style += getCropClipPathCss(layer.crop)
        style += getFeatherMaskCss(layer.feather)
        return style
    }
</script>

<div class="blendBackground">
    {#each layers as layer, i (layer.id)}
        {#if layer.visible !== false && hasValidSource(layer)}
            <div class="layer" style={getLayerStyle(layer, i)}>
                {#if layer.sourceType === "color"}
                    <div class="colorFill" style="background:{layer.color};"></div>
                {:else if layer.sourceType === "camera"}
                    <Camera id={layer.sourceId || ""} groupId="" style="width:100%;height:100%;object-fit:cover;" {mirror} />
                {:else if layer.sourceType === "screen"}
                    <Window id={layer.sourceId || ""} class="media" style="width:100%;height:100%;" />
                {:else if layer.sourceType === "ndi"}
                    <NdiStream screen={{ id: layer.sourceId || "", name: "" }} background {mirror} />
                {:else if layer.sourceType === "blackmagic"}
                    <BmdStream screen={{ id: layer.sourceId || "", name: "" }} background {mirror} />
                {:else if layer.sourceType === "video"}
                    <Media path={layer.sourcePath || ""} data={{ type: "video", muted: true, loop: true }} mediaStyle={{ fit: "cover" }} {mirror} bind:videoData={videoDataByLayer[layer.id]} />
                {:else if layer.sourceType === "image"}
                    <Media path={layer.sourcePath || ""} data={{ type: "image" }} mediaStyle={{ fit: "cover" }} {mirror} />
                {/if}
            </div>
        {/if}
    {/each}
</div>

<style>
    .blendBackground {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
    }

    .layer {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        /* clips zoomed-in media (transform: scale on the child below) and hard crop (clip-path) */
        overflow: hidden;
    }

    .colorFill {
        position: absolute;
        inset: 0;
    }

    .layer :global(video),
    .layer :global(img),
    .layer :global(.media),
    .layer :global(canvas) {
        width: 100% !important;
        height: 100% !important;
        max-width: none !important;
        max-height: none !important;
        object-fit: cover !important;
        object-position: var(--pan-x, 50%) var(--pan-y, 50%);
        position: absolute;
        top: 0;
        left: 0;
        transform: scale(var(--zoom, 1));
        transform-origin: center center;
    }
</style>
