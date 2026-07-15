<script lang="ts">
    import { activePopup, popupData } from "../../../stores"
    import { PRESET_CATEGORIES, TEXT_PRESETS, type TextPreset } from "../../../../types/textPresets"

    let selectedCategory: TextPreset["category"] | "all" = "all"
    let hoverId: string | null = null

    $: filteredPresets = selectedCategory === "all" ? TEXT_PRESETS : TEXT_PRESETS.filter((p) => p.category === selectedCategory)

    function selectPreset(preset: TextPreset) {
        popupData.set({ id: "text_preset_picker", value: preset })
        activePopup.set(null)
    }

    function previewStyle(preset: TextPreset) {
        const lineStyle = preset.style.lineStyle || ""
        const textStyle = preset.style.textStyle || ""
        return `${lineStyle}${lineStyle && !lineStyle.endsWith(";") ? ";" : ""}${textStyle}`
    }
</script>

<div class="text-preset-picker">
    <p class="hint">Pilih preset typography + animasi. Style diterapkan ke text lyric, animasi jalan saat slide muncul.</p>

    <div class="category-tabs">
        <button class="cat-tab" class:active={selectedCategory === "all"} on:click={() => (selectedCategory = "all")}>
            Semua
        </button>
        {#each PRESET_CATEGORIES as cat}
            <button
                class="cat-tab"
                class:active={selectedCategory === cat.value}
                on:click={() => (selectedCategory = cat.value)}
            >
                <span class="cat-icon">{cat.icon}</span>
                <span>{cat.label}</span>
            </button>
        {/each}
    </div>

    <div class="preset-grid">
        {#each filteredPresets as preset (preset.id)}
            <button
                class="preset-card"
                class:hovered={hoverId === preset.id}
                on:click={() => selectPreset(preset)}
                on:mouseenter={() => (hoverId = preset.id)}
                on:mouseleave={() => (hoverId = null)}
                title={preset.description}
            >
                <div class="preview" style={previewStyle(preset)}>
                    {preset.icon}
                </div>
                <div class="info">
                    <div class="name">{preset.name}</div>
                    <div class="desc">{preset.description}</div>
                    <div class="anim-tag">
                        <span class="anim-label">anim:</span>
                        <code>{preset.animation.type}</code>
                        {#if preset.animation.background?.enabled}
                            <span class="bg-icon" title="+ background animation">●</span>
                        {/if}
                    </div>
                </div>
            </button>
        {/each}
    </div>
</div>

<style>
    .text-preset-picker {
        padding: 8px 0;
    }
    .hint {
        font-size: 11px;
        opacity: 0.6;
        font-style: italic;
        margin: 0 0 12px;
    }
    .category-tabs {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        margin-bottom: 14px;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }
    .cat-tab {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 5px 10px;
        border-radius: 14px;
        border: 1px solid transparent;
        background: rgba(255, 255, 255, 0.05);
        cursor: pointer;
        color: inherit;
        font-size: 10px;
        transition: all 0.15s;
    }
    .cat-tab:hover {
        background: rgba(255, 255, 255, 0.1);
    }
    .cat-tab.active {
        background: rgba(37, 99, 235, 0.25);
        border-color: #2563eb;
    }
    .cat-icon {
        font-size: 11px;
    }
    .preset-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        gap: 8px;
    }
    .preset-card {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 10px;
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(255, 255, 255, 0.03);
        cursor: pointer;
        color: inherit;
        text-align: left;
        transition: all 0.2s;
    }
    .preset-card:hover,
    .preset-card.hovered {
        background: rgba(37, 99, 235, 0.1);
        border-color: #2563eb;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }
    .preview {
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        background: rgba(0, 0, 0, 0.25);
        border-radius: 6px;
    }
    .info {
        display: flex;
        flex-direction: column;
        gap: 3px;
    }
    .name {
        font-size: 12px;
        font-weight: 600;
    }
    .desc {
        font-size: 9.5px;
        opacity: 0.6;
        line-height: 1.3;
    }
    .anim-tag {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 9px;
        margin-top: 2px;
        opacity: 0.7;
    }
    .anim-label {
        opacity: 0.5;
    }
    .anim-tag code {
        background: rgba(0, 0, 0, 0.3);
        padding: 1px 4px;
        border-radius: 3px;
        font-size: 9px;
        font-family: ui-monospace, "SF Mono", Menlo, monospace;
    }
    .bg-icon {
        color: #2563eb;
        font-size: 8px;
    }
</style>
