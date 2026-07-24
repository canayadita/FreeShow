<!-- src/frontend/components/drawer/mixer/MixerLayerRow.svelte -->
<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte"
    import type { BlendFeather, BlendFeatherShape, BlendLayer, BlendSourceType } from "../../../../types/Blend"
    import { blendModeOptions } from "../../edit/values/media"
    import { cameraManager } from "../../../media/cameraManager"
    import { ndiData } from "../../../stores"
    import { translateText } from "../../../utils/language"
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

    // position/zoom/crop don't apply to a flat color fill — only to actual visual media
    $: framingApplies = layer.sourceType !== "color"

    function updatePosition(axis: "x" | "y", value: number) {
        update({ position: { x: layer.position?.x ?? 0, y: layer.position?.y ?? 0, [axis]: value } })
    }

    const emptyCrop = { left: 0, right: 0, top: 0, bottom: 0 }
    function updateCrop(changes: Partial<typeof emptyCrop>) {
        update({ crop: { ...emptyCrop, ...layer.crop, ...changes } })
    }

    const featherShapeOptions: { value: BlendFeatherShape; label: string }[] = [
        { value: "rect", label: "Rectangle (per edge)" },
        { value: "circle", label: "Circle" },
        { value: "ellipse", label: "Ellipse" }
    ]
    const emptyFeather: BlendFeather = { shape: "rect", left: 0, right: 0, top: 0, bottom: 0, amount: 0 }
    function updateFeatherShape(shape: string) {
        if (!shape) {
            update({ feather: undefined })
            return
        }
        update({ feather: { ...emptyFeather, ...layer.feather, shape: shape as BlendFeatherShape } })
    }
    function updateFeather(changes: Partial<BlendFeather>) {
        update({ feather: { ...emptyFeather, ...layer.feather, ...changes } })
    }

    const sourceTypeOptions: { value: BlendSourceType; label: string }[] = [
        { value: "image", label: "Image" },
        { value: "video", label: "Video" },
        { value: "color", label: "Color" },
        { value: "camera", label: "Camera" },
        { value: "ndi", label: "NDI" }
    ]

    let cameraList: { value: string; label: string }[] = []
    $: ndiList = Object.keys($ndiData).map((id) => ({ value: id, label: id }))
    // blendModeOptions' first entry is a raw "example.default" translation key (from the
    // pre-existing single-media blend feature, whose own settings-editor layer normally
    // translates labels before rendering) — MaterialDropdown here shows labels verbatim,
    // so translate explicitly. translateText leaves plain words (e.g. "Screen") untouched.
    $: translatedBlendModeOptions = blendModeOptions.map((o) => ({ ...o, label: translateText(o.label) }))

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

        <MaterialDropdown label="Blend Mode" value={layer.blendMode} options={translatedBlendModeOptions} on:change={(e) => update({ blendMode: e.detail?.value ?? e.detail })} />
        <MaterialNumberInput label="Opacity (%)" value={layer.opacity} min={0} max={100} step={1} scrub on:change={(e) => update({ opacity: Number(e.detail) })} />

        {#if framingApplies}
            <div class="controlRow">
                <MaterialNumberInput label="Position X (%)" value={layer.position?.x ?? 0} min={-50} max={50} step={1} scrub on:change={(e) => updatePosition("x", Number(e.detail))} />
                <MaterialNumberInput label="Position Y (%)" value={layer.position?.y ?? 0} min={-50} max={50} step={1} scrub on:change={(e) => updatePosition("y", Number(e.detail))} />
            </div>
            <MaterialNumberInput label="Zoom (%)" value={layer.zoom ?? 100} min={100} max={400} step={5} scrub on:change={(e) => update({ zoom: Number(e.detail) })} />

            <span class="groupLabel">Crop</span>
            <div class="controlRow">
                <MaterialNumberInput label="Crop Left (%)" value={layer.crop?.left ?? 0} min={0} max={45} step={1} scrub on:change={(e) => updateCrop({ left: Number(e.detail) })} />
                <MaterialNumberInput label="Crop Right (%)" value={layer.crop?.right ?? 0} min={0} max={45} step={1} scrub on:change={(e) => updateCrop({ right: Number(e.detail) })} />
            </div>
            <div class="controlRow">
                <MaterialNumberInput label="Crop Top (%)" value={layer.crop?.top ?? 0} min={0} max={45} step={1} scrub on:change={(e) => updateCrop({ top: Number(e.detail) })} />
                <MaterialNumberInput label="Crop Bottom (%)" value={layer.crop?.bottom ?? 0} min={0} max={45} step={1} scrub on:change={(e) => updateCrop({ bottom: Number(e.detail) })} />
            </div>
        {/if}

        <span class="groupLabel">Feather</span>
        <MaterialDropdown label="Feather Shape" value={layer.feather?.shape || ""} options={featherShapeOptions} allowEmpty on:change={(e) => updateFeatherShape(e.detail?.value ?? e.detail ?? "")} />
        {#if layer.feather?.shape === "rect"}
            <div class="controlRow">
                <MaterialNumberInput label="Feather Left (%)" value={layer.feather?.left ?? 0} min={0} max={50} step={1} scrub on:change={(e) => updateFeather({ left: Number(e.detail) })} />
                <MaterialNumberInput label="Feather Right (%)" value={layer.feather?.right ?? 0} min={0} max={50} step={1} scrub on:change={(e) => updateFeather({ right: Number(e.detail) })} />
            </div>
            <div class="controlRow">
                <MaterialNumberInput label="Feather Top (%)" value={layer.feather?.top ?? 0} min={0} max={50} step={1} scrub on:change={(e) => updateFeather({ top: Number(e.detail) })} />
                <MaterialNumberInput label="Feather Bottom (%)" value={layer.feather?.bottom ?? 0} min={0} max={50} step={1} scrub on:change={(e) => updateFeather({ bottom: Number(e.detail) })} />
            </div>
        {:else if layer.feather?.shape === "circle" || layer.feather?.shape === "ellipse"}
            <MaterialNumberInput label="Feather Amount (%)" value={layer.feather?.amount ?? 0} min={0} max={50} step={1} scrub on:change={(e) => updateFeather({ amount: Number(e.detail) })} />
        {/if}
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

    .controlRow {
        display: flex;
        gap: 6px;
    }
    .controlRow > :global(*) {
        flex: 1;
        min-width: 0;
    }

    .groupLabel {
        margin-top: 4px;
        font-size: 0.7em;
        opacity: 0.5;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
</style>
