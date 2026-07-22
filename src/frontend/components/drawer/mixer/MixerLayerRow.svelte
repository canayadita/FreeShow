<!-- src/frontend/components/drawer/mixer/MixerLayerRow.svelte -->
<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte"
    import type { BlendLayer, BlendSourceType } from "../../../../types/Blend"
    import { blendModeOptions } from "../../edit/values/media"
    import { cameraManager } from "../../../media/cameraManager"
    import { ndiData } from "../../../stores"
    import { imageExtensions, videoExtensions } from "../../../values/extensions"
    import MaterialButton from "../../inputs/MaterialButton.svelte"
    import MaterialColorInput from "../../inputs/MaterialColorInput.svelte"
    import MaterialDropdown from "../../inputs/MaterialDropdown.svelte"
    import MaterialFilePicker from "../../inputs/MaterialFilePicker.svelte"
    import MaterialNumberInput from "../../inputs/MaterialNumberInput.svelte"

    export let layer: BlendLayer
    export let canMoveUp = true
    export let canMoveDown = true

    const dispatch = createEventDispatcher()

    function update(changes: Partial<BlendLayer>) {
        dispatch("update", { ...layer, ...changes })
    }

    const sourceTypeOptions: { value: BlendSourceType; label: string }[] = [
        { value: "image", label: "Image" },
        { value: "video", label: "Video" },
        { value: "color", label: "Color" },
        { value: "camera", label: "Camera" },
        { value: "ndi", label: "NDI" },
        { value: "screen", label: "Screen" },
        { value: "blackmagic", label: "Blackmagic" }
    ]

    let cameraList: { value: string; label: string }[] = []
    $: ndiList = Object.keys($ndiData).map((id) => ({ value: id, label: id }))

    onMount(async () => {
        const cameras = await cameraManager.getCamerasList()
        cameraList = cameras.map((cam: any) => ({ value: cam.id, label: cam.name || `Camera ${cam.id}` }))
    })
</script>

<div class="layerRow">
    <div class="layerHeader">
        <MaterialButton icon="up" title="Move layer up" disabled={!canMoveUp} on:click={() => dispatch("moveUp")} />
        <MaterialButton icon="down" title="Move layer down" disabled={!canMoveDown} on:click={() => dispatch("moveDown")} />
        <MaterialButton icon={layer.visible ? "show" : "hide"} title={layer.visible ? "Hide layer" : "Show layer"} on:click={() => update({ visible: !layer.visible })} />
        <span class="layerLabel">{layer.sourceType}</span>
        <MaterialButton icon="delete" title="Remove layer" on:click={() => dispatch("remove")} />
    </div>

    <div class="layerControls">
        <MaterialDropdown
            label="Source Type"
            value={layer.sourceType}
            options={sourceTypeOptions}
            on:change={(e) => update({ sourceType: e.detail?.value ?? e.detail, sourcePath: "", sourceId: "", color: "" })}
        />

        {#if layer.sourceType === "image"}
            <MaterialFilePicker label="Image" value={layer.sourcePath} filter={{ name: "Image files", extensions: imageExtensions }} allowEmpty on:change={(e) => update({ sourcePath: e.detail })} />
        {:else if layer.sourceType === "video"}
            <MaterialFilePicker label="Video" value={layer.sourcePath} filter={{ name: "Video files", extensions: videoExtensions }} allowEmpty on:change={(e) => update({ sourcePath: e.detail })} />
        {:else if layer.sourceType === "color"}
            <MaterialColorInput label="Color" value={layer.color || "#00ff00"} defaultValue="#00ff00" on:input={(e) => update({ color: e.detail })} />
        {:else if layer.sourceType === "camera"}
            <MaterialDropdown label="Camera" value={layer.sourceId || ""} options={cameraList} on:change={(e) => update({ sourceId: e.detail?.value ?? e.detail })} />
        {:else if layer.sourceType === "ndi"}
            <MaterialDropdown label="NDI Source" value={layer.sourceId || ""} options={ndiList} on:change={(e) => update({ sourceId: e.detail?.value ?? e.detail })} />
        {/if}

        <MaterialDropdown label="Blend Mode" value={layer.blendMode} options={blendModeOptions} on:change={(e) => update({ blendMode: e.detail?.value ?? e.detail })} />
        <MaterialNumberInput label="Opacity (%)" value={layer.opacity} min={0} max={100} step={1} scrub on:change={(e) => update({ opacity: Number(e.detail) })} />
    </div>
</div>

<style>
    .layerRow {
        background: var(--primary-darker);
        border-radius: 6px;
        padding: 8px 12px;
        margin-bottom: 8px;
    }

    .layerHeader {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-bottom: 8px;
    }

    .layerLabel {
        flex: 1;
        color: var(--text);
        text-transform: capitalize;
        opacity: 0.8;
    }

    .layerControls {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }
</style>
