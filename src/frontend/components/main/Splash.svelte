<script lang="ts">
    import { onDestroy, onMount } from "svelte"
    import { activePopup, activeProject, projects, projectView, quickSearchActive, showRecentlyUsedProjects, version } from "../../stores"
    import { history } from "../helpers/history"
    import Icon from "../helpers/Icon.svelte"
    import T from "../helpers/T.svelte"
    import MaterialButton from "../inputs/MaterialButton.svelte"
    import Center from "../system/Center.svelte"
    import { startVerseRotation, type BibleVerse } from "./votd"

    function createProject() {
        if ($projects[$activeProject || ""]?.shows?.length === 0) {
            activeProject.set(null)
            projectView.set(true)
        }

        history({ id: "UPDATE", location: { page: "show", id: "project" } })
        showRecentlyUsedProjects.set(false)
    }

    let currentVerse: BibleVerse | null = null
    let stopRotation: (() => void) | null = null

    onMount(() => {
        // rotate every 1 hour
        stopRotation = startVerseRotation((verse) => {
            currentVerse = verse
        }, 60 * 60 * 1000)
    })

    onDestroy(() => {
        if (stopRotation) stopRotation()
    })
</script>

<Center class="context #splash">
    <h1>ProShow</h1>
    <p style="opacity: 0.5;">v{$version}</p>

    {#if currentVerse}
        <div class="verse-block">
            <p class="verse-id">{currentVerse.id}</p>
            <p class="verse-en">{currentVerse.en}</p>
            <p class="verse-ref">— {currentVerse.ref} / {currentVerse.refEn}</p>
        </div>
    {/if}

    <span style="padding-top: 24px" class="buttons">
        <MaterialButton icon="search" title="main.quick_search" on:click={() => quickSearchActive.set(true)}>
            <T id="main.quick_search" />
        </MaterialButton>
        <MaterialButton icon="project" title="tooltip.project" on:click={createProject}>
            <T id="new.project" />
        </MaterialButton>
        <MaterialButton
            icon="add"
            title="tooltip.show"
            on:click={(e) => {
                if (e.detail.ctrl) {
                    history({ id: "UPDATE", newData: { remember: { project: $activeProject } }, location: { page: "show", id: "show" } })
                } else activePopup.set("show")
            }}
        >
            <T id="new.show" />
        </MaterialButton>
    </span>
</Center>

<style>
    h1 {
        font-size: 3.5em;
        overflow: initial;
    }

    .verse-block {
        margin-top: 28px;
        max-width: 560px;
        padding: 16px 20px;
        border-left: 3px solid var(--secondary);
        background: rgba(255, 255, 255, 0.04);
        border-radius: 0 6px 6px 0;
        text-align: left;
        white-space: normal;
    }

    .verse-id {
        font-size: 0.92em;
        line-height: 1.6;
        margin-bottom: 8px;
        opacity: 0.95;
        white-space: normal;
        overflow: visible;
        word-break: break-word;
    }

    .verse-en {
        font-size: 0.82em;
        line-height: 1.5;
        opacity: 0.65;
        font-style: italic;
        margin-bottom: 8px;
        white-space: normal;
        overflow: visible;
        word-break: break-word;
    }

    .verse-ref {
        font-size: 0.78em;
        opacity: 0.5;
        font-weight: 600;
        letter-spacing: 0.03em;
    }

    .buttons {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .buttons :global(button) {
        justify-content: start;
        padding: 8px 12px;
    }

    @media screen and (max-height: 500px) {
        h1 { font-size: 2.5em; }
        .verse-block { display: none; }
    }
    @media screen and (max-height: 400px), screen and (max-width: 800px) {
        h1 { font-size: 2em; }
    }
</style>
