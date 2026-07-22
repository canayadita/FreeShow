<!-- src/frontend/components/drawer/mixer/Mixer.svelte -->
<script lang="ts">
    import type { Blend, BlendLayer } from "../../../../types/Blend"
    import { blends } from "../../../stores"
    import { keysToID, sortByName } from "../../helpers/array"
    import { createLayer, deleteBlend, saveBlend } from "../../helpers/blends"
    import { moveLayer } from "../../helpers/blendsMath"
    import { getAllActiveOutputs, setOutput } from "../../helpers/output"
    import MaterialButton from "../../inputs/MaterialButton.svelte"
    import MaterialTextInput from "../../inputs/MaterialTextInput.svelte"
    import BlendBackground from "../../output/layers/BlendBackground.svelte"
    import MixerLayerRow from "./MixerLayerRow.svelte"

    export let active: string | null = null

    let editingId = ""
    let name = "New Blend"
    let layers: BlendLayer[] = []

    function newBlend() {
        editingId = ""
        name = "New Blend"
        layers = []
    }

    function loadBlend(id: string) {
        const blend = $blends[id]
        if (!blend) return
        editingId = id
        name = blend.name
        layers = blend.layers.map((l) => ({ ...l }))
    }

    function addLayer() {
        layers = [...layers, createLayer()]
    }
    function removeLayer(index: number) {
        layers = layers.filter((_, i) => i !== index)
    }
    function updateLayer(index: number, updated: BlendLayer) {
        layers = layers.map((l, i) => (i === index ? updated : l))
    }
    function move(index: number, direction: "up" | "down") {
        layers = moveLayer(layers, index, direction)
    }

    function save() {
        editingId = saveBlend(name, layers, editingId)
    }

    function showOnPrimary() {
        editingId = saveBlend(name, layers, editingId)
        getAllActiveOutputs().forEach((output) => {
            setOutput("background", { type: "blend", id: editingId }, false, output.id)
        })
    }

    function remove(id: string) {
        deleteBlend(id)
        if (editingId === id) newBlend()
    }

    // draft blend fed straight into BlendBackground for a live, sandboxed preview —
    // never touches the `blends` store or the real output until Save is pressed
    $: draftBlend = { name, layers } as Blend

    $: savedBlends = sortByName(keysToID($blends))
    // displayed top-to-bottom = stack top-to-bottom (reverse of the underlying array,
    // where index 0 is the bottom of the stack)
    $: displayLayers = layers.map((layer, i) => ({ layer, i })).reverse()
</script>

<div class="mixerContainer">
    <div class="header">
        <h2>Mixer</h2>
        <p class="description">Blend multiple backgrounds together live using blend modes, like a VJ mixer.</p>
    </div>

    <div class="preview">
        <BlendBackground blend={draftBlend} />
    </div>

    <div class="layers">
        {#each displayLayers as { layer, i } (layer.id)}
            <MixerLayerRow
                {layer}
                canMoveUp={i < layers.length - 1}
                canMoveDown={i > 0}
                on:update={(e) => updateLayer(i, e.detail)}
                on:remove={() => removeLayer(i)}
                on:moveUp={() => move(i, "up")}
                on:moveDown={() => move(i, "down")}
            />
        {/each}
        <MaterialButton icon="add" variant="outlined" style="width: 100%; justify-content: center;" on:click={addLayer}>Add Layer</MaterialButton>
    </div>

    <div class="save-row">
        <MaterialTextInput label="Name" value={name} on:change={(e) => (name = e.detail)} />
        <MaterialButton icon="save" variant="outlined" on:click={save}>Save</MaterialButton>
        <MaterialButton icon="play" variant="outlined" on:click={showOnPrimary}>Show on Primary</MaterialButton>
        {#if editingId}
            <MaterialButton icon="add" variant="outlined" on:click={newBlend}>New</MaterialButton>
        {/if}
    </div>

    {#if savedBlends.length}
        <div class="saved">
            <h3>Saved Blends</h3>
            <div class="saved-grid">
                {#each savedBlends as blend (blend.id)}
                    <div class="blend-card" class:active={editingId === blend.id}>
                        <button class="card-main" on:click={() => loadBlend(blend.id)}>
                            <span class="blend-name">{blend.name}</span>
                            <span class="blend-count">{blend.layers.length} layer{blend.layers.length === 1 ? "" : "s"}</span>
                        </button>
                        <MaterialButton icon="delete" title="Delete Blend" on:click={() => remove(blend.id)} />
                    </div>
                {/each}
            </div>
        </div>
    {/if}
</div>

<style>
    .mixerContainer {
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

    .preview {
        position: relative;
        width: 100%;
        aspect-ratio: 16 / 9;
        flex-shrink: 0;
        background: #111;
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 16px;
    }

    .layers {
        margin-bottom: 16px;
    }

    .save-row {
        display: flex;
        gap: 8px;
        align-items: center;
        margin-bottom: 16px;
    }
    .save-row > :global(:first-child) {
        flex: 1;
    }

    .saved h3 {
        color: var(--text);
        margin: 0 0 12px 0;
        font-size: 1em;
    }

    .saved-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 12px;
    }

    .blend-card {
        display: flex;
        flex-direction: row;
        align-items: stretch;
        padding: 0;
        background: var(--primary-lighter);
        border: 2px solid transparent;
        border-radius: 8px;
    }
    .blend-card.active {
        border-color: var(--secondary);
    }
    .blend-card .card-main {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 12px;
        background: transparent;
        border: none;
        cursor: pointer;
        color: inherit;
    }

    .blend-name {
        color: var(--text);
        font-size: 0.85em;
        font-weight: 500;
    }

    .blend-count {
        color: var(--text);
        opacity: 0.6;
        font-size: 0.7em;
        margin-top: 2px;
    }
</style>
