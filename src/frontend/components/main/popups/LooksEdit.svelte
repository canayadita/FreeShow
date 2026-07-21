<script lang="ts">
    import { activePopup, looks, popupData, styles } from "../../../stores"
    import { translateText } from "../../../utils/language"
    import { keysToID, sortByName } from "../../helpers/array"
    import { deleteLook, updateLook } from "../../helpers/looks"
    import { getAllNormalOutputs } from "../../helpers/output"
    import T from "../../helpers/T.svelte"
    import MaterialButton from "../../inputs/MaterialButton.svelte"
    import MaterialDropdown from "../../inputs/MaterialDropdown.svelte"
    import MaterialTextInput from "../../inputs/MaterialTextInput.svelte"

    $: lookId = $popupData?.lookId || ""
    $: look = $looks[lookId]

    $: outputs = getAllNormalOutputs()
    // depends on $styles so the dropdown stays in sync when styles change
    $: styleOptions = [{ value: "", label: translateText("main.none") }, ...sortByName(keysToID($styles), "name").map((s) => ({ value: s.id, label: s.name }))]

    function setName(v: string) {
        updateLook(lookId, { name: v })
    }
    function setStyle(outputId: string, styleId: string) {
        const outputStyles = { ...(look?.outputStyles || {}), [outputId]: styleId }
        updateLook(lookId, { outputStyles })
    }
    function remove() {
        deleteLook(lookId)
        activePopup.set(null)
    }
</script>

{#if look}
    <MaterialTextInput label="inputs.name" value={look.name} on:change={(e) => setName(e.detail)} />

    {#each outputs as output}
        <MaterialDropdown label={output.name || "Output"} value={look.outputStyles?.[output.id] || ""} options={styleOptions} on:change={(e) => setStyle(output.id, e.detail?.value ?? e.detail)} />
    {/each}

    <MaterialButton variant="outlined" icon="delete" style="width: 100%;justify-content: center;margin-top: 10px;" on:click={remove}>
        <T id="actions.delete" />
    </MaterialButton>
{/if}
