<script lang="ts">
    import { activeLook, activePopup, looks, popupData } from "../../../stores"
    import { keysToID, sortObjectNumbers } from "../../helpers/array"
    import { applyLook, createLookFromCurrent } from "../../helpers/looks"
    import T from "../../helpers/T.svelte"
    import MaterialButton from "../../inputs/MaterialButton.svelte"

    $: lookList = sortObjectNumbers(keysToID($looks), "index")

    function openEdit(id: string) {
        popupData.set({ lookId: id })
        activePopup.set("looks_edit")
    }
    function addLook() {
        const id = createLookFromCurrent()
        openEdit(id)
    }
</script>

<div class="looksBar">
    <span class="barLabel"><T id="edit.looks" /></span>
    {#each lookList as look}
        <button class="look" class:active={$activeLook === look.id} title={look.name} on:click={() => applyLook(look.id)} on:contextmenu|preventDefault={() => openEdit(look.id)}>
            {#if look.color}<span class="dot" style="background:{look.color};" />{/if}
            <span class="label">{look.name}</span>
        </button>
    {/each}
    <MaterialButton icon="add" title="new.look" on:click={addLook} />
</div>

<style>
    .looksBar {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        padding: 5px;
        align-items: center;
    }
    .look {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 4px 10px;
        border-radius: 6px;
        background: var(--primary-lighter);
        color: var(--text);
        border: 2px solid transparent;
        cursor: pointer;
        font-size: 0.8em;
    }
    .barLabel {
        font-size: 0.7em;
        opacity: 0.5;
        text-transform: uppercase;
        letter-spacing: 1px;
        padding-inline-end: 3px;
    }
    .look.active {
        border-color: var(--secondary);
    }
    .look:hover {
        filter: brightness(1.2);
    }
    .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
    }
</style>
