<script lang="ts">
    import type { Blend } from "../../../../types/Blend"
    import { blends } from "../../../stores"
    import BmdStream from "../../drawer/live/BMDStream.svelte"
    import NdiStream from "../../drawer/live/NDIStream.svelte"
    import { hasValidSource } from "../../helpers/blendsMath"
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
</script>

<div class="blendBackground">
    {#each layers as layer, i (layer.id)}
        {#if layer.visible !== false && hasValidSource(layer)}
            <div class="layer" style="opacity:{(layer.opacity ?? 100) / 100};{i > 0 && layer.blendMode ? `mix-blend-mode:${layer.blendMode};` : ''}">
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
                {:else if layer.sourceType === "video" || layer.sourceType === "image"}
                    <Media path={layer.sourcePath || ""} data={{ type: layer.sourceType, muted: true, loop: true }} mediaStyle={{ fit: "cover" }} {mirror} />
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
        position: absolute;
        top: 0;
        left: 0;
    }
</style>
