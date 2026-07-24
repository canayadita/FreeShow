<!-- src/frontend/components/show/ShowQuickStyle.svelte -->
<script lang="ts">
    import { createEventDispatcher } from "svelte"
    import { showsCache } from "../../stores"
    import Icon from "../helpers/Icon.svelte"
    import MaterialButton from "../inputs/MaterialButton.svelte"
    import MaterialColorInput from "../inputs/MaterialColorInput.svelte"
    import MaterialFontDropdown from "../inputs/MaterialFontDropdown.svelte"
    import MaterialNumberInput from "../inputs/MaterialNumberInput.svelte"
    import { applyTextAlign, applyTextStyle, applyVerticalAlign, readCurrentStyle, resolveTargetSlideIds } from "./quickStyleActions"

    export let showId: string

    const dispatch = createEventDispatcher()

    $: previewSlideId = resolveTargetSlideIds(showId)[0] || ""
    // re-read whenever the slide data changes (style applied elsewhere, undo/redo), not just when the show changes
    $: current = previewSlideId ? readCurrentStyle(showId, previewSlideId, $showsCache) : null

    $: isBold = current?.fontWeight === "bold" || current?.fontWeight === "700"
    $: isItalic = current?.fontStyle === "italic"
    $: isUnderline = (current?.textDecoration || "").includes("underline")

    // Toggles decide their new value from a FRESH read at click time — not from the `current`/
    // `isBold` bindings above, which only drive the buttons' pressed-look and can lag a tick
    // behind the store on a slide's first render. Reading fresh here means the toggle direction
    // is always correct even if that display value hasn't caught up yet.
    // applyTextStyle also fans out to every slide over several `await wait(10)` ticks — a second
    // click landing mid-fan-out would race the first click's remaining slides, so clicks are
    // serialized until the previous one fully finishes.
    let toggling = false
    async function toggle(key: "font-weight" | "font-style" | "text-decoration", onValue: string, offValue: string, readValue: (style: ReturnType<typeof readCurrentStyle>) => boolean) {
        if (toggling) return
        toggling = true
        try {
            const slideId = resolveTargetSlideIds(showId)[0]
            const isOn = slideId ? readValue(readCurrentStyle(showId, slideId)) : false
            await applyTextStyle(showId, resolveTargetSlideIds(showId), key, isOn ? offValue : onValue)
        } finally {
            toggling = false
        }
    }
    const toggleBold = () => toggle("font-weight", "bold", "normal", (s) => s?.fontWeight === "bold" || s?.fontWeight === "700")
    const toggleItalic = () => toggle("font-style", "italic", "normal", (s) => s?.fontStyle === "italic")
    const toggleUnderline = () => toggle("text-decoration", "underline", "none", (s) => (s?.textDecoration || "").includes("underline"))

    function changeFontFamily(value: string) {
        applyTextStyle(showId, resolveTargetSlideIds(showId), "font-family", value)
    }
    function changeColor(value: string) {
        applyTextStyle(showId, resolveTargetSlideIds(showId), "color", value)
    }
    function changeFontSize(value: number) {
        applyTextStyle(showId, resolveTargetSlideIds(showId), "font-size", `${value}px`)
    }
    function changeTextAlign(value: string) {
        applyTextAlign(showId, resolveTargetSlideIds(showId), value)
    }
    function changeVerticalAlign(value: string) {
        applyVerticalAlign(showId, resolveTargetSlideIds(showId), value)
    }
</script>

<div class="quickStyleToolbar">
    <div class="control" data-title="Font family">
        <MaterialFontDropdown label="Font" value={current?.fontFamily || "CMGSans"} style="width: 140px;" on:change={(e) => changeFontFamily(e.detail?.value ?? e.detail)} />
    </div>
    <div class="control" data-title="Font color">
        <MaterialColorInput label="Color" noLabel value={current?.color || "#FFFFFF"} style="width: 30px;" on:input={(e) => changeColor(e.detail)} />
    </div>
    <div class="control" data-title="Font size">
        <MaterialNumberInput label="Size" value={parseFloat(current?.fontSize || "") || 100} min={1} max={500} style="width: 64px;" on:change={(e) => changeFontSize(Number(e.detail))} />
    </div>

    <div class="alignGroup">
        <MaterialButton small disabled={toggling} isActive={isBold} title="Bold" on:click={toggleBold}><Icon id="bold" white /></MaterialButton>
        <MaterialButton small disabled={toggling} isActive={isItalic} title="Italic" on:click={toggleItalic}><Icon id="italic" white /></MaterialButton>
        <MaterialButton small disabled={toggling} isActive={isUnderline} title="Underline" on:click={toggleUnderline}><Icon id="underline" white /></MaterialButton>
    </div>

    <span class="divider" />

    <div class="alignGroup">
        <MaterialButton small title="Align left" on:click={() => changeTextAlign("left")}><Icon id="alignLeft" white /></MaterialButton>
        <MaterialButton small title="Align center" on:click={() => changeTextAlign("center")}><Icon id="alignCenter" white /></MaterialButton>
        <MaterialButton small title="Align right" on:click={() => changeTextAlign("right")}><Icon id="alignRight" white /></MaterialButton>
    </div>
    <div class="alignGroup">
        <MaterialButton small title="Align top" on:click={() => changeVerticalAlign("flex-start")}><Icon id="alignTop" white /></MaterialButton>
        <MaterialButton small title="Align middle" on:click={() => changeVerticalAlign("center")}><Icon id="alignMiddle" white /></MaterialButton>
        <MaterialButton small title="Align bottom" on:click={() => changeVerticalAlign("flex-end")}><Icon id="alignBottom" white /></MaterialButton>
    </div>

    <MaterialButton small class="hideToolbar" title="Hide quick-style toolbar" on:click={() => dispatch("hide")}><Icon id="close" white /></MaterialButton>
</div>

<style>
    .quickStyleToolbar {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 10px;
        background-color: rgb(0 0 10 / 0.2);
        flex-wrap: nowrap;
        /* no overflow-x here: it forces overflow-y to clip too (CSS spec), which cuts off the
           font/color dropdown popups that open downward into the slide grid below */
    }

    .alignGroup,
    .control {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        gap: 2px;
    }

    .quickStyleToolbar :global(.hideToolbar) {
        margin-left: auto;
    }

    .divider {
        width: 1px;
        flex-shrink: 0;
        align-self: stretch;
        margin: 2px 2px;
        background: var(--primary-lighter);
        opacity: 0.6;
    }

    /* keep this toolbar slim (Word-style, 1 line) instead of the full-size settings-form look */
    .quickStyleToolbar :global(.control .textfield) {
        height: 26px;
        min-height: 26px;
        border-bottom: none;
        --margin: 3px;
    }
    .quickStyleToolbar :global(.control .textfield .background) {
        border-radius: 4px;
    }
    .quickStyleToolbar :global(.control .textfield label) {
        display: none;
    }
    .quickStyleToolbar :global(.control .textfield .input) {
        padding: 0 1.5rem 0 0.4rem;
        font-size: 0.8rem;
    }
    .quickStyleToolbar :global(.control .numberfield .input) {
        text-align: center;
    }
</style>
