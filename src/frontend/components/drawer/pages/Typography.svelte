<script lang="ts">
    import { activeEdit, activeShow, selected } from "../../../stores"
    import { _show } from "../../helpers/shows"
    import { getLayoutRef } from "../../helpers/show"
    import { history } from "../../helpers/history"
    import { newToast } from "../../../utils/common"
    import { PRESET_CATEGORIES, TEXT_PRESETS, type TextPreset } from "../../../../types/textPresets"
    import type { Item } from "../../../../types/Show"
    import T from "../../helpers/T.svelte"

    let selectedCategory: TextPreset["category"] | "all" = "all"
    let hoverId: string | null = null

    $: filteredPresets = selectedCategory === "all" ? TEXT_PRESETS : TEXT_PRESETS.filter((p) => p.category === selectedCategory)

    // Determine the currently selected text item (in Edit mode)
    $: selectedItem = getSelectedTextItem()

    function getSelectedTextItem(): Item | null {
        if (!$activeEdit?.id) return null
        const allItems: number[] = $activeEdit.items || []
        if (!allItems.length) return null
        const allSlideItems = getCurrentSlideItems()
        if (!allSlideItems) return null
        for (const i of allItems) {
            const it = allSlideItems[i]
            if (!it) continue
            if ((it.type || "text") === "text") return it
        }
        return null
    }

    function getCurrentSlideItems(): Item[] | null {
        const slideId = getCurrentSlideId()
        if (!slideId || !$activeShow) return null
        const slide = _show().slides([slideId]).get()[0]
        if (!slide) return null
        return (slide.items as Item[]) || null
    }

    function getCurrentSlideId(): string | null {
        if ($activeEdit.slide === null || $activeEdit.slide === undefined) return null
        const ref = getLayoutRef()
        return ref[$activeEdit.slide]?.id || null
    }

    function addStyleString(oldStyle: string, style: any[]): string {
        if (!oldStyle) return style[1] !== null ? style.join(":") + ";" : ""
        if (typeof oldStyle !== "string") return ""
        let array: string[] = oldStyle.split(";")
        if (!array[array.length - 1].length) array.pop()
        array = array.filter((s) => {
            return s.split(":")[0].trim() !== style[0] && s.length > 0
        })
        if (style[0] === "font-family") {
            array = array.filter((a) => !a.includes("font:"))
        }
        if (style[0] === "font") {
            array.unshift(style.join(":"))
        } else if (style[1] !== null) array.push(style.join(":"))
        let newStyle: string = array.join(";")
        if (newStyle.slice(-1) !== ";") newStyle += ";"
        return newStyle
    }

    function applyPresetToSelected(preset: TextPreset) {
        const slideId = getCurrentSlideId()
        if (!slideId || !$activeShow) {
            newToast("Buka show & slide dulu")
            return
        }
        const items = $activeEdit.items?.length ? [...$activeEdit.items] : []
        if (!items.length) {
            newToast("Pilih text item di Edit dulu")
            return
        }

        // 1) animation config (apply once with full object)
        history({
            id: "setItems",
            newData: { style: { key: "animationConfig", values: [preset.animation] } },
            location: { page: "edit", show: $activeShow, slide: slideId, items },
        })

        // 2) per-line typography (merged into item.style)
        if (preset.style.lineStyle) {
            const newStyle = buildStyleWithUpdates(getCurrentStyleForFirstItem(slideId, items), preset.style.lineStyle)
            if (newStyle !== null) {
                history({
                    id: "setItems",
                    newData: { style: { key: "style", values: [newStyle] } },
                    location: { page: "edit", show: $activeShow, slide: slideId, items },
                })
            }
        }

        // 3) per-text typography (merged into item.style too — same string)
        if (preset.style.textStyle) {
            const newStyle = buildStyleWithUpdates(getCurrentStyleForFirstItem(slideId, items), preset.style.textStyle)
            if (newStyle !== null) {
                history({
                    id: "setItems",
                    newData: { style: { key: "style", values: [newStyle] } },
                    location: { page: "edit", show: $activeShow, slide: slideId, items },
                })
            }
        }

        newToast(`Preset '${preset.name}' diterapkan!`)
    }

    function getCurrentStyleForFirstItem(slideId: string, items: number[]): string {
        const slide = _show().slides([slideId]).get()[0]
        return slide?.items?.[items[0]]?.style || ""
    }

    function buildStyleWithUpdates(oldStyle: string, cssString: string): string | null {
        if (!cssString) return null
        let style = oldStyle || ""
        cssString
            .split(";")
            .map((s) => s.trim())
            .filter(Boolean)
            .forEach((statement) => {
                const idx = statement.indexOf(":")
                if (idx < 0) return
                const key = statement.slice(0, idx).trim()
                const value = statement.slice(idx + 1).trim()
                if (!key || !value) return
                style = addStyleString(style, [key, value])
            })
        return style
    }

    function previewStyle(preset: TextPreset) {
        const lineStyle = preset.style.lineStyle || ""
        const textStyle = preset.style.textStyle || ""
        return `${lineStyle}${lineStyle && !lineStyle.endsWith(";") ? ";" : ""}${textStyle}`
    }

    // HTML5 drag-and-drop: preset can be dropped onto any text item in the slide editor
    function onDragStart(e: DragEvent, preset: TextPreset) {
        // also register in FreeShow's custom drop system, so presets can be
        // dropped onto slides in the Show view (DropArea reads this store)
        selected.set({ id: "text_preset", data: [{ presetId: preset.id }] })

        if (!e.dataTransfer) return
        e.dataTransfer.setData("application/x-proshow-preset", preset.id)
        e.dataTransfer.setData("text/plain", preset.name)
        e.dataTransfer.effectAllowed = "copy"
        // Custom drag image (use the preset card)
        const target = e.currentTarget as HTMLElement
        if (target) {
            // small transparent-ish ghost
            e.dataTransfer.setDragImage(target, 40, 30)
        }
    }
</script>

<div class="typography-panel">
    {#if !selectedItem}
        <div class="hint-banner">
            <T id="typography.select_item_hint" />
            <p style="font-size: 11px; opacity: 0.7; margin: 4px 0 0;">
                <strong>Klik</strong> preset untuk apply ke item yang dipilih, atau
                <strong>drag &amp; drop</strong> preset ke text item di slide.
            </p>
        </div>
    {:else}
        <div class="selected-banner">
            <span class="check">✓</span>
            Text item dipilih — klik preset, atau drag ke text item lain
        </div>
    {/if}

    <div class="category-tabs">
        <button class="cat-tab" class:active={selectedCategory === "all"} on:click={() => (selectedCategory = "all")}>
            Semua ({TEXT_PRESETS.length})
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
                draggable="true"
                on:click={() => applyPresetToSelected(preset)}
                on:dragstart={(e) => onDragStart(e, preset)}
                on:mouseenter={() => (hoverId = preset.id)}
                on:mouseleave={() => (hoverId = null)}
                title={`${preset.description} (drag ke text item untuk apply)`}
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
    .typography-panel {
        padding: 14px;
        height: 100%;
        overflow-y: auto;
    }
    .hint-banner,
    .selected-banner {
        padding: 10px 14px;
        border-radius: 6px;
        margin-bottom: 12px;
        font-size: 12px;
    }
    .hint-banner {
        background: rgba(255, 200, 0, 0.08);
        border: 1px solid rgba(255, 200, 0, 0.2);
    }
    .selected-banner {
        background: rgba(37, 99, 235, 0.1);
        border: 1px solid rgba(37, 99, 235, 0.3);
    }
    .check {
        color: #6bcf7f;
        font-weight: bold;
        margin-right: 6px;
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
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
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
        cursor: grab;
        color: inherit;
        text-align: left;
        transition: all 0.2s;
        position: relative;
    }
    .preset-card:active {
        cursor: grabbing;
    }
    .preset-card::after {
        content: "⋮⋮";
        position: absolute;
        top: 6px;
        right: 8px;
        font-size: 10px;
        opacity: 0.3;
        letter-spacing: -2px;
    }
    .preset-card:hover,
    .preset-card.hovered {
        background: rgba(37, 99, 235, 0.1);
        border-color: #2563eb;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }
    .preview {
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        background: rgba(0, 0, 0, 0.25);
        border-radius: 6px;
    }
    .info {
        display: flex;
        flex-direction: column;
        gap: 3px;
    }
    .name {
        font-size: 13px;
        font-weight: 600;
    }
    .desc {
        font-size: 10px;
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
