<!-- src/frontend/components/show/ShowQuickStyle.svelte -->
<script lang="ts">
    import { selected } from "../../stores"
    import Icon from "../helpers/Icon.svelte"
    import MaterialButton from "../inputs/MaterialButton.svelte"
    import MaterialColorInput from "../inputs/MaterialColorInput.svelte"
    import MaterialFontDropdown from "../inputs/MaterialFontDropdown.svelte"
    import MaterialNumberInput from "../inputs/MaterialNumberInput.svelte"
    import { applyTextAlign, applyTextStyle, applyVerticalAlign, readCurrentStyle, resolveTargetSlideIds, type QuickStyleScope } from "./quickStyleActions"

    export let showId: string

    let scope: QuickStyleScope = "slide"

    $: selectedIndex = $selected.id === "slide" && $selected.data[0]?.showId === showId ? ($selected.data[0]?.index ?? null) : null
    $: previewSlideId = resolveTargetSlideIds(showId, "slide", selectedIndex)[0] || ""
    $: current = previewSlideId ? readCurrentStyle(showId, previewSlideId) : null
    $: disabled = scope === "slide" && selectedIndex === null

    function targetIds() {
        return resolveTargetSlideIds(showId, scope, selectedIndex)
    }

    function changeFontFamily(value: string) {
        applyTextStyle(showId, targetIds(), "font-family", value)
    }
    function changeColor(value: string) {
        applyTextStyle(showId, targetIds(), "color", value)
    }
    function changeFontSize(value: number) {
        applyTextStyle(showId, targetIds(), "font-size", `${value}px`)
    }
    function changeTextAlign(value: string) {
        applyTextAlign(showId, targetIds(), value)
    }
    function changeVerticalAlign(value: string) {
        applyVerticalAlign(showId, targetIds(), value)
    }
</script>

<div class="quickStyleToolbar">
    <div class="scopeToggle">
        <MaterialButton variant={scope === "slide" ? "contained" : "outlined"} on:click={() => (scope = "slide")}>This Slide</MaterialButton>
        <MaterialButton variant={scope === "all" ? "contained" : "outlined"} on:click={() => (scope = "all")}>All Slides</MaterialButton>
    </div>

    <MaterialFontDropdown label="Font" value={current?.fontFamily || ""} on:change={(e) => changeFontFamily(e.detail?.value ?? e.detail)} />
    <MaterialColorInput label="Color" value={current?.color || "#FFFFFF"} defaultValue="#FFFFFF" disabled={disabled} on:input={(e) => changeColor(e.detail)} />
    <MaterialNumberInput label="Size" value={parseFloat(current?.fontSize || "") || 100} min={1} max={500} disabled={disabled} on:change={(e) => changeFontSize(Number(e.detail))} />

    <div class="alignGroup">
        <MaterialButton {disabled} title="Align left" on:click={() => changeTextAlign("left")}><Icon id="alignLeft" white /></MaterialButton>
        <MaterialButton {disabled} title="Align center" on:click={() => changeTextAlign("center")}><Icon id="alignCenter" white /></MaterialButton>
        <MaterialButton {disabled} title="Align right" on:click={() => changeTextAlign("right")}><Icon id="alignRight" white /></MaterialButton>
    </div>
    <div class="alignGroup">
        <MaterialButton {disabled} title="Align top" on:click={() => changeVerticalAlign("flex-start")}><Icon id="alignTop" white /></MaterialButton>
        <MaterialButton {disabled} title="Align middle" on:click={() => changeVerticalAlign("center")}><Icon id="alignMiddle" white /></MaterialButton>
        <MaterialButton {disabled} title="Align bottom" on:click={() => changeVerticalAlign("flex-end")}><Icon id="alignBottom" white /></MaterialButton>
    </div>
</div>

<style>
    .quickStyleToolbar {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        background-color: rgb(0 0 10 / 0.2);
        flex-wrap: wrap;
    }

    .scopeToggle,
    .alignGroup {
        display: flex;
        gap: 4px;
    }
</style>
