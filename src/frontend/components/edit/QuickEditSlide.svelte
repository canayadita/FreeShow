<script lang="ts">
    import { onDestroy, onMount } from "svelte"
    import { quickEditSlide, showsCache } from "../../stores"
    import { _show } from "../helpers/shows"
    import Editbox from "./editbox/Editbox.svelte"

    let popupEl: HTMLDivElement | null = null
    let posX = 0
    let posY = 0
    // last right-click position (the popup floats over the clicked slide)
    let lastX = 0
    let lastY = 0

    const WIDTH = 420
    const MAX_HEIGHT = 320

    $: target = $quickEditSlide
    $: slideId = target ? _show(target.showId).layouts("active").ref()[0]?.[target.index]?.id || "" : ""
    $: slide = target && slideId ? $showsCache[target.showId]?.slides?.[slideId] : null
    $: textItems = (slide?.items || []).map((item, i) => ({ item, i })).filter((x) => Array.isArray(x.item?.lines))

    function close() {
        quickEditSlide.set(null)
    }

    function onKey(e: KeyboardEvent) {
        if (e.key === "Escape") close()
    }

    function onContextMenu(e: MouseEvent) {
        lastX = e.clientX
        lastY = e.clientY
    }

    function onMouseDown(e: MouseEvent) {
        if (target && popupEl && !popupEl.contains(e.target as Node)) close()
    }

    function position() {
        posX = Math.min(Math.max(8, lastX), window.innerWidth - WIDTH - 8)
        posY = Math.min(Math.max(8, lastY), window.innerHeight - MAX_HEIGHT - 8)
    }

    $: if (target) position()

    onMount(() => {
        window.addEventListener("keydown", onKey)
        window.addEventListener("contextmenu", onContextMenu)
        // delay mousedown listener so the click that opened the menu doesn't immediately close the popup
        setTimeout(() => window.addEventListener("mousedown", onMouseDown), 0)
    })
    onDestroy(() => {
        window.removeEventListener("keydown", onKey)
        window.removeEventListener("contextmenu", onContextMenu)
        window.removeEventListener("mousedown", onMouseDown)
    })
</script>

{#if target && slide}
    <div class="quick-edit-popup" bind:this={popupEl} style="left:{posX}px;top:{posY}px;width:{WIDTH}px;max-height:{MAX_HEIGHT}px;">
        <div class="qe-header">
            <span>Quick Edit</span>
            <button class="qe-close" on:click={close} title="Close (Esc)">✕</button>
        </div>
        <div class="qe-body">
            {#if textItems.length}
                {#each textItems as { item, i } (i)}
                    <Editbox {item} ref={{ showId: target.showId, id: slideId }} editIndex={target.index} index={i} plain />
                {/each}
            {:else}
                <p class="qe-empty">No text to edit</p>
            {/if}
        </div>
    </div>
{/if}

<style>
    .quick-edit-popup {
        position: fixed;
        z-index: 5000;
        overflow: auto;
        background: var(--primary-darker);
        border: 1px solid var(--primary-lighter);
        border-radius: 8px;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
    }
    .qe-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 6px 10px;
        background: var(--primary-darkest);
        font-size: 0.85em;
        position: sticky;
        top: 0;
    }
    .qe-close {
        background: none;
        border: none;
        color: var(--text);
        cursor: pointer;
        opacity: 0.7;
    }
    .qe-close:hover {
        opacity: 1;
    }
    .qe-body {
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .qe-empty {
        opacity: 0.6;
        font-size: 0.85em;
        text-align: center;
    }
</style>
