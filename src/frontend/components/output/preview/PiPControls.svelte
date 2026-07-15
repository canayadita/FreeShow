<script lang="ts">
    import type { Output } from "../../../../types/Output"
    import type { PaneSourceType } from "../../../../types/Show"
    import { outputs } from "../../../stores"
    import { setOutput } from "../../helpers/output"
    import Icon from "../../helpers/Icon.svelte"
    import MaterialDropdown from "../../inputs/MaterialDropdown.svelte"
    import T from "../../helpers/T.svelte"

    export let currentOutput: Output

    const paneSourceTypes: { value: PaneSourceType; label: string }[] = [
        { value: "camera", label: "Camera" },
        { value: "screen", label: "Screen" },
        { value: "ndi", label: "NDI" },
        { value: "blackmagic", label: "Blackmagic" },
        { value: "video", label: "Video" },
        { value: "image", label: "Image" },
        { value: "player", label: "Player" },
        { value: "transparent", label: "Transparent" }
    ]

    function updatePaneSource(paneId: string, sourceType: PaneSourceType) {
        const outputId = currentOutput.id || ""
        if (!outputId) return

        const currentMultiPane = $outputs[outputId]?.out?.multiPane
        if (!currentMultiPane) return

        const updatedPanes = currentMultiPane.panes.map((p) => {
            if (p.id === paneId) {
                return { ...p, sourceType }
            }
            return p
        })

        setOutput("multiPane", { ...currentMultiPane, panes: updatedPanes })
    }

    $: multiPane = currentOutput?.out?.multiPane
</script>

{#if multiPane}
    <div class="pip-controls">
        <div class="header">
            <Icon id="pip" size={1.2} />
            <span>{multiPane.name}</span>
        </div>

        <div class="pane-list">
            {#each multiPane.panes as pane, i}
                <div class="pane-item">
                    <div class="pane-info">
                        <span class="pane-number">{i + 1}</span>
                        <span class="pane-size">{pane.position.width}% × {pane.position.height}%</span>
                    </div>
                    <MaterialDropdown
                        label="Source"
                        value={pane.sourceType}
                        options={paneSourceTypes}
                        on:change={(e) => updatePaneSource(pane.id, e.detail)}
                    />
                </div>
            {/each}
        </div>
    </div>
{/if}

<style>
    .pip-controls {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 8px;
    }

    .header {
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--text);
        font-weight: 500;
    }

    .pane-list {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    .pane-item {
        display: flex;
        align-items: center;
        gap: 8px;
        background: var(--primary-darker);
        padding: 6px 8px;
        border-radius: 6px;
    }

    .pane-info {
        display: flex;
        align-items: center;
        gap: 6px;
        min-width: 80px;
    }

    .pane-number {
        background: var(--secondary);
        color: white;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75em;
        font-weight: 600;
    }

    .pane-size {
        color: var(--text);
        opacity: 0.7;
        font-size: 0.8em;
    }

    .pane-item :global(.dropdown) {
        flex: 1;
    }
</style>
