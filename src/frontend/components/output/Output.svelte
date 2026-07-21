<!-- Used in output window, and currently in draw! -->

<script lang="ts">
    import { onDestroy } from "svelte"
    import { uid } from "uid"
    import { OutData } from "../../../types/Output"
    import type { Styles } from "../../../types/Settings"
    import type { AnimationData, Item, LayoutRef, OutBackground, OutSlide, Slide, SlideData, Template, Overlays as TOverlays } from "../../../types/Show"
    import { allOutputs, colorbars, currentWindow, drawSettings, drawTool, effects, media, outputs, overlays, showsCache, styles, templates, transitionData } from "../../stores"
    import { wait } from "../../utils/common"
    import { custom } from "../../utils/transitions"
    import Draw from "../draw/Draw.svelte"
    import { clone } from "../helpers/array"
    import { defaultLayers, getCurrentStyle, getMetadata, getOutputLines, getOutputTransitions, getOutputResolution, getResolution, getSlideFilter, getStyleTemplate, setTemplateStyle } from "../helpers/output"
    import { _show } from "../helpers/shows"
    import Image from "../media/Image.svelte"
    import Zoomed from "../slide/Zoomed.svelte"
    import { updateAnimation } from "./animation"
    import EffectOutput from "./effects/EffectOutput.svelte"
    import Background from "./layers/Background.svelte"
    import MultiPaneLayer from "./layers/MultiPaneLayer.svelte"
    import Overlay from "./layers/Overlay.svelte"
    import Overlays from "./layers/Overlays.svelte"
    import PdfOutput from "./layers/PdfOutput.svelte"
    import SlideContent from "./layers/SlideContent.svelte"
    import Textbox from "../slide/Textbox.svelte"
    import Window from "./Window.svelte"

    export let outputId = ""
    export let style = ""
    export let ratio = 0
    export let mirror = false
    export let preview = false
    export let slideOnly = false // render plain slide/background/PDF, ignore PiP (stage Slide Preview)
    export let styleIdOverride = ""
    export let outOverride: OutData | null = null

    $: currentOutput = $outputs[outputId] || $allOutputs[outputId] || {}

    // output styling
    $: currentStyling = getCurrentStyle($styles, styleIdOverride || currentOutput.style)
    let currentStyle: Styles = { name: "" }
    let cachedStyleStr = ""
    // don't refresh content unless it changes
    $: {
        const newStr = JSON.stringify(currentStyling)
        if (newStr !== cachedStyleStr) {
            cachedStyleStr = newStr
            currentStyle = clone(currentStyling)
        }
    }

    $: alignPosition = currentStyle?.aspectRatio?.alignPosition || "center"

    // layers
    let layers: string[] = []
    let out: OutData = {}
    let slide: OutSlide | null = null
    let background: OutBackground | null = null
    let clonedOverlays: TOverlays | null = null
    let multiPanePanes: any[] = []

    let effectsIds: string[] = []
    $: allEffects = $effects
    $: effectsUnderSlide = effectsIds.filter((id) => allEffects[id]?.placeUnderSlide === true)
    $: effectsOverSlide = effectsIds.filter((id) => !allEffects[id]?.placeUnderSlide)

    // don't update when layer content changes, only when refreshing or adding/removing layer
    // currentOutput is set to refresh state when changed in preview
    let cachedLayersStr = ""
    $: if (currentOutput) {
        const newLayersStr = JSON.stringify(currentStyle.layers || defaultLayers)
        if (newLayersStr !== cachedLayersStr) {
            cachedLayersStr = newLayersStr
            layers = clone(Array.isArray(currentStyle.layers) ? currentStyle.layers : defaultLayers)
            if (!Array.isArray(layers)) layers = []
        }
    }
    let cachedOutStr = ""
    $: {
        const newOutStr = JSON.stringify(outOverride || currentOutput?.out || {})
        if (newOutStr !== cachedOutStr) {
            cachedOutStr = newOutStr
            out = clone(outOverride || currentOutput?.out || {})
        }
    }

    let cachedSlideStr = ""
    $: {
        const newSlideStr = JSON.stringify(out.slide || null)
        if (newSlideStr !== cachedSlideStr) {
            cachedSlideStr = newSlideStr
            updateOutData("slide")
        }
    }
    let cachedBgStr = ""
    $: {
        const newBgStr = JSON.stringify(out.background || null)
        if (newBgStr !== cachedBgStr) {
            cachedBgStr = newBgStr
            updateOutData("background")
        }
    }
    let cachedEffectsStr = ""
    $: {
        const newEffectsStr = JSON.stringify(out.effects || [])
        if (newEffectsStr !== cachedEffectsStr) {
            cachedEffectsStr = newEffectsStr
            effectsIds = clone(out.effects || [])
        }
    }
    let cachedMultiPaneStr = ""
    $: {
        const newMultiPaneStr = JSON.stringify(out.multiPane || null)
        if (newMultiPaneStr !== cachedMultiPaneStr) {
            cachedMultiPaneStr = newMultiPaneStr
            multiPanePanes = clone(out.multiPane?.panes || [])
        }
    }

    // Always read multiPane directly from store so pane position/size changes are instantly reactive
    $: liveMultiPane = $outputs[outputId]?.out?.multiPane ?? out.multiPane ?? null
    $: multiPanePanes = liveMultiPane?.panes || []
    // slideOnly (e.g. stage Slide Preview) renders the plain slide as if PiP were off
    $: pipActive = !slideOnly && !!liveMultiPane?.visible && multiPanePanes.length > 0

    $: pipTransparentPane = pipActive
        ? (liveMultiPane?.panes || [])
            .filter((p: any) => p.sourceType === "transparent")
            .sort((a: any, b: any) => (b.position.width * b.position.height) - (a.position.width * a.position.height))[0]
        : null

    $: hasSlidePane = (liveMultiPane?.panes || []).some((p: any) => p.sourceType === "slide")

    $: slideClipPath = pipTransparentPane
        ? `inset(${pipTransparentPane.position.y}% ${100 - pipTransparentPane.position.x - pipTransparentPane.position.width}% ${100 - pipTransparentPane.position.y - pipTransparentPane.position.height}% ${pipTransparentPane.position.x}%)`
        : hasSlidePane && pipActive && actualSlide?.type !== "pdf"
        ? "inset(0% 100% 0% 0%)"
        : "none"

    $: refreshOutput = out.refresh
    $: if (outputId || refreshOutput) updateOutData()
    function updateOutData(type = "") {
        if (!type || type === "slide") {
            let noLineCurrent = clone(slide)
            if (noLineCurrent) delete noLineCurrent.line
            let noLineNew = clone(out?.slide)
            if (noLineNew) delete noLineNew.line

            // don't refresh if changing lines on another slide & content is unchanged
            if (!refreshOutput && !out?.slide?.type && lines[currentLineId || ""]?.start === null && JSON.stringify(noLineCurrent) === JSON.stringify(noLineNew)) return

            // WIP option to turn off "content refresh" if slide content is identical to previous content ?

            // this will reset transitions...
            // currentSlide = null
            // // timeout to allow component text to clear before removing component (needed for videoTime condition updates)
            // setTimeout(() => (slide = clone(out.slide || null)))

            slide = clone(out.slide || null)
        }
        if (!type || type === "background") background = clone(out.background || null)
        if (!type || type === "overlays") {
            storedOverlayIds = JSON.stringify(out.overlays)
            if (JSON.stringify($overlays) !== storedOverlays) {
                clonedOverlays = clone($overlays)
                storedOverlays = JSON.stringify($overlays)
            }
        }
        if (!type || type === "multiPane") {
            multiPanePanes = clone(out.multiPane?.panes || [])
        }
    }

    // overlays
    $: overlayIds = out.overlays
    let storedOverlayIds = ""
    let storedOverlays = ""
    $: {
        const newOverlayIdsStr = JSON.stringify(overlayIds)
        if (newOverlayIdsStr !== storedOverlayIds) updateOutData("overlays")
    }
    $: outOverlays = out.overlays?.filter((id) => !clonedOverlays?.[id]?.placeUnderSlide) || []
    $: outUnderlays = out.overlays?.filter((id) => clonedOverlays?.[id]?.placeUnderSlide) || []

    // layout & slide data
    let currentLayout: LayoutRef[] = []
    let slideData: SlideData | null = null
    let currentSlide: Slide | null = null

    $: updateSlideData(slide, outputId)
    function updateSlideData(slide, _outputChanged) {
        if (!slide) {
            currentLayout = []
            slideData = null
            currentSlide = null
            return
        }

        currentLayout = clone(_show(slide.id).layouts([slide.layout]).ref()[0] || [])
        slideData = currentLayout[slide?.index]?.data || null

        // don't refresh content unless it changes
        let newCurrentSlide = getCurrentSlide()
        const newSlideFormatStr = JSON.stringify(formatSlide(newCurrentSlide))
        const curSlideStr = JSON.stringify(currentSlide)
        if (newSlideFormatStr !== curSlideStr) currentSlide = newCurrentSlide

        function getCurrentSlide() {
            if (!slide && !outputId) return null
            if (slide.id === "temp" || slide.id === "tempText") return { items: slide.tempItems }
            if (!currentLayout) return null

            let slideId: string = currentLayout[slide?.index]?.id || ""
            return clone(_show(slide.id).slides([slideId]).get()[0] || {})
        }

        // add template item keys to not update item when no changes is made (when custom style template is set)
        function formatSlide(currentSlide) {
            if (!currentSlide) return null
            let newSlide = clone(currentSlide)
            newSlide.items = setTemplateStyle(slide, currentStyle, newSlide.items, outputId, newSlide.customDynamicValues)
            return newSlide
        }
    }

    // slide styling
    // currentSlide?.settings?.resolution
    $: resolution = getResolution(null, { currentOutput, currentStyle }, false, outputId, styleIdOverride)
    // actual pixel resolution (1920x1080) for PiP pane scaling calculations
    $: outputPixelResolution = getOutputResolution(outputId, $outputs)
    $: transitions = getOutputTransitions(slideData, currentStyle.transition, $transitionData, mirror && !preview)
    $: slideFilter = getSlideFilter(slideData)

    // custom template
    // WIP revert to old style when output style is reverted to no style (REFRESH OUTPUT)
    $: outputStyle = styleIdOverride || currentOutput?.style
    // currentSlide is so the background updates when scripture is removed (if template background on both) - not changed in preview
    $: if (outputStyle && currentStyle && currentSlide !== undefined) {
        if (currentSlide) setTemplateItems()
        getStyleTemplateData()
    }
    const setTemplateItems = () => (currentSlide!.items = setTemplateStyle(slide!, currentStyle, currentSlide!.items, outputId, currentSlide!.customDynamicValues))
    let styleTemplate: Template | null = null
    const getStyleTemplateData = () => (styleTemplate = getStyleTemplate(slide!, currentStyle))
    $: templateBackground = styleTemplate?.settings?.backgroundPath || ""

    // lines
    let lines: { [key: string]: { start: number | null; end: number | null; linesStart?: number | null; linesEnd?: number | null; clickRevealed?: boolean } } = {}
    $: currentLineId = slide?.id
    const updateLinesTime = $currentWindow === "output" ? 50 : 10
    $: if (currentLineId) {
        // don't update until all outputs has updated their "line" value
        setTimeout(() => {
            lines[currentLineId] = getOutputLines(slide!, currentStyle.lines) // , currentSlide
        }, updateLinesTime)
    }

    // metadata
    $: metadataItems = getMetadata($showsCache[(slide as any)?.id || ""], currentStyle, slide, $templates)
    let currentMetadataItems: Item[] = []
    let cachedMetadataStr = ""
    let isMetadataClearing = false
    $: if (metadataItems !== null) {
        isMetadataClearing = false
        const newMetaStr = JSON.stringify(metadataItems)
        if (newMetaStr !== cachedMetadataStr) {
            cachedMetadataStr = newMetaStr
            currentMetadataItems = clone(metadataItems)
        }
    } else {
        isMetadataClearing = true
        setTimeout(() => {
            currentMetadataItems = []
            cachedMetadataStr = ""
        })
    }

    // ANIMATE
    let animationData: AnimationData = {}
    let currentAnimationId = ""
    $: slideAnimation = slideData?.actions?.animate || null

    $: if (slide) stopAnimation()
    onDestroy(stopAnimation)
    function stopAnimation() {
        animationData = {}
        currentAnimationId = ""
    }

    // DEPRECATED!!
    $: if (slideAnimation) initializeAnimation()
    async function initializeAnimation() {
        if (!Object.keys(slideAnimation || {}).length) {
            stopAnimation()
            return
        }

        let duration = 50
        if (transitions.text?.type !== "none" && transitions.text?.duration) duration = Math.max(duration, transitions.text.duration / 2)

        let currentId = uid()
        let animation = clone(slideAnimation) || { actions: [] }
        animationData = { id: currentId, animation }

        await wait(duration)

        if (animationData.id !== currentId) return
        currentAnimationId = currentId

        startAnimation(currentId)
    }

    function startAnimation(currentId: string) {
        animate(0)

        async function animate(currentIndex: number) {
            if (currentAnimationId !== currentId) return

            animationData = await updateAnimation(animationData, currentIndex, slide, background)
            if (currentAnimationId !== currentId) {
                animationData = {}
                return
            }

            if (typeof animationData.newIndex !== "number") return

            // stop if ended & not repeating
            if (!animationData.animation?.repeat && !animationData.animation?.actions[animationData.newIndex]) return

            animate(animationData.newIndex)
        }
    }

    $: cropping = currentOutput.cropping || currentStyle.cropping

    // values
    $: backgroundColor = currentOutput.transparent ? "transparent" : styleTemplate?.settings?.backgroundColor || currentSlide?.settings?.color || currentStyle.background || slide?.settings?.backgroundColor || "black"
    // background image
    $: styleBackgroundCleared = !!(currentStyle?.clearStyleBackgroundOnText && (slide || background))
    $: styleBackground = styleBackgroundCleared ? "" : currentStyle?.backgroundBlend ? "blend" : currentStyle?.backgroundImage || ""
    $: styleBackgroundData = styleBackgroundCleared
        ? {}
        : currentStyle?.backgroundBlend
          ? { type: "blend" as const, id: currentStyle.backgroundBlend, loop: true }
          : { path: styleBackground, ...($media[styleBackground] || {}), loop: true }
    $: templateBackgroundData = { path: templateBackground, loop: true, ...($media[templateBackground] || {}) }
    $: backgroundData = templateBackground ? templateBackgroundData : background

    $: overlaysActive = !!(layers.includes("overlays") && clonedOverlays)

    // draw zoom
    $: zoomActive = currentOutput.active || (mirror && !preview)
    $: drawZoom = $drawTool === "zoom" && zoomActive ? ($drawSettings.zoom?.size || 200) / 100 : 1

    // CLEARING
    $: if (slide !== undefined || layers) updateSlide()
    let actualSlide: OutSlide | null = null
    let actualSlideData: SlideData | null = null
    let actualCurrentSlide: Slide | null = null
    let actualCurrentLineId: string | undefined = undefined
    let isSlideClearing = false
    function updateSlide() {
        // update clearing variable before setting slide value (used for conditions to not show up again while clearing)
        const slideActive = layers.includes("slide")
        isSlideClearing = !slide || !slideActive

        setTimeout(() => {
            actualSlide = slideActive ? clone(slide) : null
            actualSlideData = clone(slideData)
            actualCurrentSlide = clone(currentSlide)
            actualCurrentLineId = clone(currentLineId)
        }, slide ? updateLinesTime : 0)
    }
</script>

<Zoomed id={outputId} background={backgroundColor} checkered={(preview || mirror) && backgroundColor === "transparent"} backgroundDuration={transitions.media?.type === "none" ? 0 : (transitions.media?.duration ?? 800)} align={alignPosition} center {style} {resolution} {mirror} {drawZoom} {cropping} bind:ratio>
    <!-- always show style background (behind other backgrounds) -->
    {#if styleBackground}
        <Background data={styleBackgroundData} {outputId} transition={transitions.media} {currentStyle} {slideFilter} {ratio} animationStyle={animationData.style?.background || ""} mirror styleBackground />
    {/if}

    <!-- background — hide full-screen when PiP slide pane is active (will be drawn inside pane) -->
    {#if (backgroundData?.ignoreLayer ? layers.includes("slide") : layers.includes("background")) && backgroundData && !(pipActive && hasSlidePane)}
        <Background data={backgroundData} {outputId} transition={transitions.media} {currentStyle} {slideFilter} {ratio} animationStyle={animationData.style?.background || ""} {mirror} />
    {/if}

    <!-- colorbars for testing -->
    {#if $colorbars[outputId]}
        <Image path="./assets/{$colorbars[outputId]}" mediaStyle={{ rendering: "pixelated", fit: "fill" }} />
    {/if}

    <!-- effects -->
    {#if effectsUnderSlide}
        <EffectOutput ids={effectsUnderSlide} transition={transitions.overlay} {mirror} />
    {/if}

    <!-- "underlays" -->
    {#if overlaysActive}
        <!-- && outUnderlays?.length -->
        <Overlays {outputId} overlays={clonedOverlays} activeOverlays={outUnderlays} transition={transitions.overlay} {mirror} {preview} />
    {/if}

    <!-- slide -->
    {#if actualSlide?.type === "ppt" && layers.includes("slide")}
        <span style="zoom: {1 / ratio};">
            {#if actualSlide?.screen?.id}
                <Window id={actualSlide?.screen?.id} class="media" style="width: 100%;height: 100%;" />
            {/if}
        </span>
    {:else if actualSlide && actualSlide?.type !== "pdf"}
        <div style="clip-path: {slideClipPath};">
            <SlideContent {outputId} outSlide={actualSlide} isClearing={isSlideClearing} slideData={actualSlideData} currentSlide={actualCurrentSlide} {currentStyle} {animationData} currentLineId={actualCurrentLineId} {lines} {ratio} {mirror} {preview} transition={transitions.text} transitionEnabled={!mirror || preview} {styleIdOverride} />
        </div>

        <!-- metadata -->
        <Overlay overlay={{ items: currentMetadataItems }} isClearing={isMetadataClearing || isSlideClearing} {outputId} transition={transitions.text} />
    {/if}

    <!-- PDF slide full-screen — only when PiP not active -->
    {#if actualSlide?.type === "pdf" && layers.includes("slide") && !pipActive}
        <span style="zoom: {1 / ratio};">
            <PdfOutput slide={actualSlide} {currentStyle} transition={transitions.media} />
        </span>
    {/if}

    <!-- multi-pane / picture-in-picture -->
    {#if pipActive && layers.includes("slide")}
        <MultiPaneLayer {outputId} multiPane={liveMultiPane} resolution={outputPixelResolution} {mirror} {preview}>
            <svelte:fragment slot="slide">
                <!-- slide background color — omit when a media background is active -->
                {#if !backgroundData && !styleBackground}
                    <div style="position: absolute; inset: 0; background: {backgroundColor};" />
                {/if}
                <!-- style template background image -->
                {#if styleBackground}
                    <Background data={styleBackgroundData} {outputId} transition={transitions.media} {currentStyle} {slideFilter} {ratio} mirror={false} styleBackground />
                {/if}
                <!-- background image dragged to slide — rendered inside pane so it follows pane size -->
                {#if backgroundData && (backgroundData?.ignoreLayer ? layers.includes("slide") : layers.includes("background"))}
                    <Background data={backgroundData} {outputId} transition={transitions.media} {currentStyle} {slideFilter} {ratio} mirror={false} animationStyle={animationData.style?.background || ""} />
                {/if}
                <!-- PDF slide (PPT imported) — rendered inside slideScaler so it scales with the pane -->
                {#if actualSlide?.type === "pdf"}
                    <div style="position: absolute; inset: 0;">
                        <PdfOutput slide={actualSlide} {currentStyle} transition={transitions.media} />
                    </div>
                {/if}
                <!-- slide items (non-pdf, non-ppt) -->
                {#if actualSlide && actualSlide?.type !== "pdf" && actualSlide?.type !== "ppt" && actualCurrentSlide?.items?.length}
                    {#each actualCurrentSlide.items as item}
                        {#if item}
                            <Textbox {item} {ratio} {outputId} outputStyle={currentStyle} {mirror} {preview} {styleIdOverride} ref={{ type: "show", showId: actualSlide?.id, slideId: actualCurrentSlide?.id, id: actualCurrentSlide?.id || "", layoutId: actualSlide?.layout }} animationConfig={item.animationConfig} />
                        {/if}
                    {/each}
                {/if}
            </svelte:fragment>
        </MultiPaneLayer>
    {/if}

    {#if layers.includes("overlays")}
        <!-- effects -->
        {#if effectsOverSlide}
            <EffectOutput ids={effectsOverSlide} transition={transitions.overlay} {mirror} />
        {/if}

        <!-- overlays -->
        <!-- outOverlays?.length -->
        {#if overlaysActive}
            <Overlays {outputId} overlays={clonedOverlays} activeOverlays={outOverlays} transition={transitions.overlay} {mirror} {preview} />
        {/if}
    {/if}

    {#if actualSlide?.attributionString && layers.includes("slide")}
        {#if mirror}
            <p class="attributionString">{actualSlide.attributionString.slice(0, 135)}</p>
        {:else}
            <p class="attributionString" transition:custom={transitions.text}>{actualSlide.attributionString.slice(0, 135)}</p>
        {/if}
    {/if}

    <!-- draw -->
    {#if zoomActive}
        <Draw />
    {/if}
</Zoomed>

<style>
    .attributionString {
        position: absolute;
        bottom: 15px;
        left: 50%;
        transform: translateX(-50%);

        font-size: 28px;
        font-style: italic;
        opacity: 0.7;
    }
</style>
