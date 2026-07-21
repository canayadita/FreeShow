<script lang="ts">
    import { onDestroy } from "svelte"
    import { uid } from "uid"
    import { BLACKMAGIC, NDI, OUTPUT } from "../../../../types/Channels"
    import { Option } from "../../../../types/Main"
    import type { Output } from "../../../../types/Output"
    import type { MultiPane, Pane, PaneSourceType } from "../../../../types/Show"
    import { AudioAnalyser } from "../../../audio/audioAnalyser"
    import { activePage, activePopup, activeStage, activeStyle, alertMessage, currentOutputSettings, multiPaneLayouts, ndiData, os, outputDisplay, outputs, saved, settingsTab, stageShows, styles, toggleOutputEnabled } from "../../../stores"
    import { newToast } from "../../../utils/common"
    import { translateText } from "../../../utils/language"
    import { destroy, receive, send } from "../../../utils/request"
    import { clone, keysToID, sortByName, sortObject } from "../../helpers/array"
    import { refreshOut, setOutput, startRtmpStreaming, startStreaming, stopRtmpStreaming, stopStreaming, toggleOutput, updateOutputRtmpData, updateOutputWebrtcData } from "../../helpers/output"
    import InputRow from "../../input/InputRow.svelte"
    import Title from "../../input/Title.svelte"
    import MaterialButton from "../../inputs/MaterialButton.svelte"
    import MaterialDropdown from "../../inputs/MaterialDropdown.svelte"
    import MaterialPopupButton from "../../inputs/MaterialPopupButton.svelte"
    import MaterialTextInput from "../../inputs/MaterialTextInput.svelte"
    import MaterialToggleSwitch from "../../inputs/MaterialToggleSwitch.svelte"

    let outputsList: Output[] = []
    $: outputsList = sortObject(sortByName(keysToID($outputs)), "stageOutput")

    let currentOutput: Output | null = null
    $: if ($currentOutputSettings) currentOutput = clone({ id: $currentOutputSettings, ...$outputs[$currentOutputSettings] })

    $: if (currentOutput?.blackmagic) send(BLACKMAGIC, ["GET_DEVICES"])

    const autoRevert: string[] = ["kioskMode"] // changing these settings could break some things in some cases
    const revertTime = 5 // seconds
    let reverted: string[] = []

    function updateOutput(key: string, value: any, outputId = "") {
        if (!outputId) outputId = currentOutput?.id || ""
        if (!outputId || !$outputs[outputId]) return

        // auto revert special values
        if (autoRevert.includes(key) && value && !reverted.includes(key)) {
            newToast(translateText("toast.reverting_setting").replace("{}", revertTime.toString()))
            reverted.push(key)
            setTimeout(() => {
                updateOutput(key, false, outputId)
                newToast(translateText("toast.reverted"))
            }, revertTime * 1000)
        }

        // properly update output content
        if (key === "style") {
            // wait to update output, so slide is refreshed after style is changed in output window
            setTimeout(refreshOut)
        }

        if (key === "ndi" || key === "webrtc" || key === "rtmp" || key === "syphon") {
            if (value) {
                newToast("toast.output_capture_enabled")

                // auto enable transparent & invisible if more than 1 non invisible output enabled
                const enabledOutputs = Object.values($outputs).filter((a) => a.enabled && !a.stageOutput && !a.invisible)
                if (enabledOutputs.length > 1) {
                    updateOutput("transparent", true)
                    updateOutput("invisible", true)
                }

                if (key === "ndi") ndiMenuOpened = true
                else if (key === "webrtc") webrtcMenuOpened = true
                else rtmpMenuOpened = true
            }
        } else if (key === "blackmagic") {
            if (value === true) {
                // send(BLACKMAGIC, ["GET_DEVICES"])
                updateOutput("transparent", true)
                updateOutput("invisible", true)

                // Set default resolution (backend will adjust based on display mode)
                const blackmagicBounds = { ...currentOutput?.bounds, width: 1920, height: 1080 }
                updateOutput("bounds", blackmagicBounds)
                updateOutput("screen", null)
            } else {
                send(BLACKMAGIC, ["STOP_SENDER"], { id: outputId })
            }
        }

        // TODO: history
        outputs.update((a: any) => {
            if (key.includes(".")) {
                let split = key.split(".")
                a[outputId][split[0]][split[1]] = value
                if (split[1] === "lines" && !Number(value)) delete a[outputId][split[0]][split[1]]
            } else {
                a[outputId][key] = value
            }

            if (key === "ndi") {
                if (!value) {
                    ndiData.update((a) => {
                        delete a[outputId]
                        return a
                    })

                    // delete a[outputId].ndiData
                    if (!a[outputId].blackmagic) {
                        if (a[outputId].ndiData?.audio) delete a[outputId].ndiData.audio
                        delete a[outputId].transparent
                        delete a[outputId].invisible
                    }
                }
            }

            if (key === "blackmagic") {
                if (!value) {
                    // ndiData.update((a) => {
                    //     delete a[outputId]
                    //     return a
                    // })

                    // delete a[outputId].blackmagicData
                    if (!a[outputId].ndi) {
                        delete a[outputId].transparent
                        delete a[outputId].invisible
                    }
                }
            }

            if (key === "webrtc" || key === "rtmp") {
                if (!value) AudioAnalyser.recorderDeactivate()
            }

            if (key === "enabled") {
                if (value) send(OUTPUT, ["CREATE"], currentOutput)
                else {
                    send(OUTPUT, ["REMOVE"], { id: outputId })
                    updateOutput("hideFromPreview", false, outputId)
                }

                // WIP if only one left, all outputs should be "active"
            }

            if (!a[outputId].enabled) return a

            // UPDATE OUTPUT WINDOW

            if (["blackmagic"].includes(key)) {
                send(OUTPUT, ["SET_VALUE"], { id: outputId, key, value: a[outputId] })
            } else if (["alwaysOnTop", "kioskMode", "transparent", "invisible", "ndi", "webrtc", "rtmp", "syphon", "syphonData"].includes(key)) {
                send(OUTPUT, ["SET_VALUE"], { id: outputId, key, value })
            }

            return a
        })
    }

    function _toggleOutput(state: boolean) {
        toggleOutputEnabled.set(true) // disable preview output transitions (to prevent visual svelte bug)
        setTimeout(() => {
            updateOutput("enabled", state)
            if ($outputDisplay) toggleOutput(currentOutput?.id || "")
        }, 100)
    }

    $: styleId = currentOutput?.style || ""
    function editStyle() {
        activeStyle.set(styleId)
        settingsTab.set("styles")
    }

    $: stageId = currentOutput?.stageOutput || ""
    function editStage() {
        activeStage.set({ id: stageId, items: [] })
        activePage.set("stage")
    }

    // ndi
    const syphonResolutions = [
        { id: "0", name: "Native (Full)" },
        { id: "1920", name: "1080p (1920)" },
        { id: "1600", name: "900p (1600)" },
        { id: "1280", name: "720p (1280)" },
        { id: "960", name: "540p (960)" }
    ]
    function updateSyphonData(e: any) {
        let id = currentOutput?.id
        if (!id) return
        const width = Number(e?.detail?.id ?? e ?? 1280)
        updateOutput("syphonData", { ...($outputs[id]?.syphonData || {}), maxWidth: width })
    }

    function updateNdiData(e: any, key: string) {
        let id = currentOutput?.id
        if (!id) return

        let newData = $outputs[id]?.ndiData
        if (!newData) newData = {}

        let value = e?.detail?.id ?? e

        newData[key] = value

        updateOutput("ndiData", newData)

        send(NDI, ["NDI_DATA"], { id, ...newData })

        if (key === "audio") {
            if (value) AudioAnalyser.recorderActivate()
            else AudioAnalyser.recorderDeactivate()
        }

        if (key === "name" || key === "groups") {
            alertMessage.set("settings.restart_for_change")
            activePopup.set("alert")
            saved.set(false)
        }
    }

    // webrtc
    function updateWebrtcData(e: any, key: string) {
        let id = currentOutput?.id
        if (!id) return

        let value = e?.detail?.id ?? e
        const updated = updateOutputWebrtcData(id, key, value)
        if (!updated) return

        saved.set(false)
    }

    // rtmp (YouTube live etc.)
    function updateRtmpData(e: any, key: string) {
        let id = currentOutput?.id
        if (!id) return

        let value = e?.detail?.id ?? e
        const updated = updateOutputRtmpData(id, key, value)
        if (!updated) return

        saved.set(false)
    }

    const rtmpResolutions = [
        { value: "1920x1080", label: "1080p (1920×1080)" },
        { value: "1280x720", label: "720p (1280×720)" },
        { value: "854x480", label: "480p (854×480)" }
    ]
    const rtmpFramerates = [
        { value: "24", label: "24 fps" },
        { value: "25", label: "25 fps" },
        { value: "30", label: "30 fps" },
        { value: "50", label: "50 fps" },
        { value: "60", label: "60 fps" }
    ]
    const rtmpBitrates = [
        { value: "2500", label: "2500 kbps (480p/720p)" },
        { value: "4500", label: "4500 kbps (1080p)" },
        { value: "6000", label: "6000 kbps (1080p tajam)" },
        { value: "9000", label: "9000 kbps (1080p60)" }
    ]

    const framerates = [
        { value: "10", label: "10 fps" },
        { value: "12", label: "12 fps" },
        { value: "24", label: "24 fps" },
        { value: "25", label: "25 fps" },
        { value: "30", label: "30 fps" },
        { value: "48", label: "48 fps" },
        { value: "50", label: "50 fps" },
        { value: "60", label: "60 fps" }
    ]

    // blackmagic
    let blackmagicDevices: Option[] = []
    function getUsedBlackmagicDeviceIds(excludeId = "") {
        return Object.entries($outputs)
            .filter(([id, o]: any) => id !== excludeId && o.blackmagic && o.blackmagicData?.deviceId)
            .map(([_id, o]: any) => String(o.blackmagicData.deviceId))
    }

    function updateBlackmagicData(e: any, key: string) {
        let id = currentOutput?.id
        if (!id) return

        let newData = $outputs[id]?.blackmagicData
        if (!newData) newData = {}
        let value = e?.detail?.id || e?.detail?.name || e

        if (key === "deviceId") {
            const usedIds = getUsedBlackmagicDeviceIds(id)
            if (usedIds.includes(String(value))) {
                newToast("Device already in use by another output.")
                return
            }
        }

        newData[key] = value

        updateOutput("blackmagicData", newData)
        // send(NDI, ["NDI_DATA"], { id, ...newData })

        // wait for current value to update
        setTimeout(() => {
            if (key === "deviceId") {
                let device = blackmagicDevices.find((a) => a.id === value)
                if (!device) return

                let displayModes = device.data?.displayModes || []
                updateBlackmagicData(displayModes, "displayModes")
                if (displayModes.length) {
                    // try setting to "preferred" modes, or set to first available
                    updateBlackmagicData(displayModes.find((a) => a.name === "1080i59.94" || a.name === "1080p29.97")?.name || displayModes[0]?.name, "displayMode")
                }
            } else if (key === "displayMode") {
                let device = blackmagicDevices.find((a) => a.id === currentOutput?.blackmagicData?.deviceId)
                if (!device) return

                let displayModes = device.data?.displayModes || []
                let modeData = displayModes.find((a) => a.name === value) || {}
                if (!modeData.width) return

                // pixel format
                let pixelFormats = (modeData.videoModes || []).map((format) => ({ name: format }))
                updateBlackmagicData(pixelFormats, "pixelFormats")
                updateBlackmagicData(pixelFormats[0]?.name, "pixelFormat")

                // force resolution & update framerate
                updateOutput("forcedResolution", { width: modeData.width, height: modeData.height })
                updateBlackmagicData(modeData.frameRate, "framerate")
                // updateBlackmagicData(modeData.videoModes, "pixelFormats")

                // allow data to update first
                setTimeout(() => {
                    if (newData.displayMode && newData.pixelFormat) send(OUTPUT, ["SET_VALUE"], { id: currentOutput?.id, key: "blackmagic", value: currentOutput })
                })
            } else if (key === "pixelFormat" || key === "alphaKey") {
                setTimeout(() => {
                    if (newData.displayMode && newData.pixelFormat) send(OUTPUT, ["SET_VALUE"], { id: currentOutput?.id, key: "blackmagic", value: currentOutput })
                })
            }

            saved.set(false)
        })
    }

    $: activeOutputs = Object.values($outputs).filter((a) => !a.stageOutput && a.enabled && a.active === true)

    // RECEIVE BLACKMAGIC DEVICES

    let listenerId = uid()
    onDestroy(() => destroy(BLACKMAGIC, listenerId))
    const receiveBMD = {
        GET_DEVICES: (data) => {
            const parsedData = JSON.parse(data)
            blackmagicDevices = parsedData.map((a) => ({
                id: a.deviceHandle,
                name: a.displayName || a.modelName,
                data: {
                    displayModes: a.outputDisplayModes || a.inputDisplayModes,
                    supportsInternalKeying: a.supportsInternalKeying || false,
                    supportsExternalKeying: a.supportsExternalKeying || false
                }
            }))
            // auto-select first available device (not in use)
            if (blackmagicDevices.length && (!currentOutput?.blackmagicData?.deviceId || !currentOutput?.blackmagicData?.displayModes?.length)) {
                const usedIds = getUsedBlackmagicDeviceIds(currentOutput?.id)
                const availableDevice = blackmagicDevices.find((d) => !usedIds.includes(String(d.id || "")))
                if (availableDevice) updateBlackmagicData({ detail: { id: availableDevice.id } }, "deviceId")
            }
        }
    }
    receive(BLACKMAGIC, receiveBMD, listenerId)

    // Check if alpha keying is supported by the device
    function isAlphaSupported(): boolean {
        const device = blackmagicDevices.find((a) => a.id === currentOutput?.blackmagicData?.deviceId)
        if (!device) return false
        return device.data?.supportsInternalKeying || device.data?.supportsExternalKeying || false
    }

    $: isCropped = currentOutput?.cropping && (currentOutput.cropping.left || 0) + (currentOutput.cropping.right || 0) + (currentOutput.cropping.top || 0) + (currentOutput.cropping.bottom || 0) > 0
    $: outputLabel = (currentOutput?.blackmagicData?.displayMode || `${currentOutput?.bounds?.width || 1920}x${currentOutput?.bounds?.height || 1080}`) + (isCropped ? ` - settings.cropped` : "")

    let ndiMenuOpened = false
    let bmdMenuOpened = false
    let webrtcMenuOpened = false
    let rtmpMenuOpened = false
    let pipMenuOpened = false

    // Picture-in-Picture
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

    const pipLayouts = [
        { value: "pipBottomRight", label: "PiP Bottom Right" },
        { value: "pipBottomLeft", label: "PiP Bottom Left" },
        { value: "pipTopRight", label: "PiP Top Right" },
        { value: "pipSideRight", label: "PiP Side Right" },
        { value: "pipBottomBar", label: "PiP Bottom Bar" },
        { value: "splitVertical", label: "Split Vertical" },
        { value: "splitHorizontal", label: "Split Horizontal" },
        { value: "grid2x2", label: "Grid 2x2" }
    ]

    function getPipLayoutPanes(layoutId: string): Pane[] {
        const layouts: { [key: string]: Pane[] } = {
            pipBottomRight: [
                { id: "1", sourceType: "slide", position: { x: 0, y: 0, width: 65, height: 100 } },
                { id: "2", sourceType: "camera", position: { x: 65, y: 60, width: 32, height: 35 }, zIndex: 1, shadow: true, borderRadius: 10 }
            ],
            pipBottomLeft: [
                { id: "1", sourceType: "slide", position: { x: 35, y: 0, width: 65, height: 100 } },
                { id: "2", sourceType: "camera", position: { x: 3, y: 60, width: 32, height: 35 }, zIndex: 1, shadow: true, borderRadius: 10 }
            ],
            pipTopRight: [
                { id: "1", sourceType: "slide", position: { x: 0, y: 0, width: 65, height: 60 } },
                { id: "2", sourceType: "camera", position: { x: 65, y: 5, width: 32, height: 35 }, zIndex: 1, shadow: true, borderRadius: 10 }
            ],
            pipSideRight: [
                { id: "1", sourceType: "slide", position: { x: 0, y: 0, width: 65, height: 100 } },
                { id: "2", sourceType: "camera", position: { x: 65, y: 0, width: 35, height: 100 }, zIndex: 1 }
            ],
            pipBottomBar: [
                { id: "1", sourceType: "slide", position: { x: 0, y: 0, width: 100, height: 80 } },
                { id: "2", sourceType: "camera", position: { x: 0, y: 80, width: 100, height: 20 }, zIndex: 1 }
            ],
            splitVertical: [
                { id: "1", sourceType: "slide", position: { x: 0, y: 0, width: 50, height: 100 } },
                { id: "2", sourceType: "camera", position: { x: 50, y: 0, width: 50, height: 100 }, zIndex: 1 }
            ],
            splitHorizontal: [
                { id: "1", sourceType: "slide", position: { x: 0, y: 0, width: 100, height: 50 } },
                { id: "2", sourceType: "camera", position: { x: 0, y: 50, width: 100, height: 50 }, zIndex: 1 }
            ],
            grid2x2: [
                { id: "1", sourceType: "slide", position: { x: 0, y: 0, width: 50, height: 50 } },
                { id: "2", sourceType: "camera", position: { x: 50, y: 0, width: 50, height: 50 }, zIndex: 1 },
                { id: "3", sourceType: "screen", position: { x: 0, y: 50, width: 50, height: 50 }, zIndex: 1 },
                { id: "4", sourceType: "video", position: { x: 50, y: 50, width: 50, height: 50 }, zIndex: 1 }
            ]
        }
        return layouts[layoutId] || []
    }

    function applyPipLayout(layoutId: string) {
        const panes = getPipLayoutPanes(layoutId)
        const multiPane: MultiPane = {
            id: uid(),
            name: pipLayouts.find((l) => l.value === layoutId)?.label || "PiP Layout",
            panes
        }
        setOutput("multiPane", multiPane)
    }

    function clearPip() {
        setOutput("multiPane", null)
    }

    function updatePaneSource(paneId: string, sourceType: PaneSourceType, sourceId?: string) {
        if (!currentOutput?.id) return
        const currentMultiPane = $outputs[currentOutput.id]?.out?.multiPane
        if (!currentMultiPane) return

        const updatedPanes = currentMultiPane.panes.map((p) => {
            if (p.id === paneId) {
                return { ...p, sourceType, sourceId }
            }
            return p
        })

        setOutput("multiPane", { ...currentMultiPane, panes: updatedPanes })
    }
</script>

{#if outputsList.filter((a) => !a.stageOutput).length > 1 || !currentOutput?.enabled || currentOutput?.stageOutput}
    <MaterialToggleSwitch label="settings.enabled" checked={currentOutput?.enabled} defaultValue={true} disabled={!currentOutput?.stageOutput && currentOutput?.enabled && activeOutputs.length < 2} on:change={(e) => _toggleOutput(e.detail)} />
{/if}

{#if stageId}
    <InputRow>
        <MaterialPopupButton label="stage.stage_layout" value={stageId} name={$stageShows[stageId]?.name} icon="stage" popupId="select_stage_layout" on:change={(e) => updateOutput("stageOutput", e.detail)} />
        {#if $stageShows[stageId]}
            <MaterialButton title="titlebar.edit" icon="edit" on:click={editStage} />
        {/if}
    </InputRow>
{:else}
    <InputRow>
        <MaterialPopupButton label="settings.active_style" value={styleId} name={$styles[styleId]?.name} icon="styles" popupId="select_style" on:change={(e) => updateOutput("style", e.detail)} allowEmpty />
        {#if $styles[styleId]}
            <MaterialButton title="titlebar.edit" icon="edit" on:click={editStyle} />
        {/if}
    </InputRow>
{/if}

<!-- WIP toggle fullscreen (Mac) ?? Only working one time for some reason -->
<!-- WIP toggle visibleOnAllWorkspaces (Mac) -->

<!-- window -->
<Title label="settings.window" icon="window" />

<MaterialPopupButton label="settings.output_screen" value={outputLabel} name={outputLabel} icon={currentOutput?.invisible ? "stage" : currentOutput?.boundsLocked ? "locked" : "screen"} popupId={currentOutput?.invisible ? "change_output_values" : "choose_screen"} />
<MaterialToggleSwitch label="settings.always_on_top" checked={currentOutput?.alwaysOnTop !== false} defaultValue={true} disabled={currentOutput?.invisible} on:change={(e) => updateOutput("alwaysOnTop", e.detail)} />

<!-- this will make the whole application "locked" so no other apps can be accessed, might increase performance, but generally not recommend -->
<!-- disable on windows -->
<!-- only <= 1.4.5 -->
{#if $os.platform !== "win32" && currentOutput?.kioskMode === true}
    <MaterialToggleSwitch label="settings.kiosk_mode" checked={currentOutput?.kioskMode === true} defaultValue={false} on:change={(e) => updateOutput("kioskMode", e.detail)} />
{/if}

<!-- NDI -->
<Title label="NDI®" icon="ndi" />

<InputRow arrow={currentOutput?.ndi} bind:open={ndiMenuOpened}>
    <MaterialToggleSwitch label={translateText("actions.enable_specific", null, ["NDI®"])} style="width: 100%;" checked={currentOutput?.ndi} defaultValue={false} data={$ndiData[currentOutput?.id || ""]?.connections || null} on:change={(e) => updateOutput("ndi", e.detail)} />

    <svelte:fragment slot="menu">
        {#if currentOutput}
            <InputRow>
                <MaterialTextInput label="inputs.name" value={currentOutput.ndiData?.name || `ProShow NDI${currentOutput.name ? ` - ${currentOutput.name}` : ""}`} defaultValue={`ProShow NDI${currentOutput.name ? ` - ${currentOutput.name}` : ""}`} on:change={(e) => updateNdiData(e.detail, "name")} />
                <MaterialTextInput label="inputs.group" title="settings.comma_seperated" value={currentOutput.ndiData?.groups || ""} defaultValue="" placeholder="public" on:change={(e) => updateNdiData(e.detail, "groups")} />
            </InputRow>

            <MaterialToggleSwitch label="preview.audio" checked={currentOutput.ndiData?.audio} defaultValue={false} on:change={(e) => updateNdiData(e.detail, "audio")} />
            <MaterialDropdown label="settings.frame_rate" value={currentOutput.ndiData?.framerate || "30"} defaultValue="30" options={framerates} on:change={(e) => updateNdiData(e.detail, "framerate")} />
        {/if}
    </svelte:fragment>
</InputRow>

<!-- Syphon (macOS → OBS) -->
{#if $os.platform === "darwin"}
    <Title label="settings.enable_syphon" icon="ndi" />
    <MaterialToggleSwitch label="settings.enable_syphon" style="width: 100%;" checked={currentOutput?.syphon} defaultValue={false} on:change={(e) => updateOutput("syphon", e.detail)} />
    {#if currentOutput?.syphon}
        <MaterialDropdown label="settings.syphon_resolution" value={String(currentOutput?.syphonData?.maxWidth ?? 1280)} defaultValue="1280" options={syphonResolutions} on:change={(e) => updateSyphonData(e.detail)} />
    {/if}
{/if}

<!-- Blackmagic -->
<Title label="Blackmagic Design" icon="blackmagic" />

<InputRow arrow={currentOutput?.blackmagic} bind:open={bmdMenuOpened}>
    <MaterialToggleSwitch label={translateText("actions.enable_specific", null, ["Blackmagic"])} style="width: 100%;" checked={currentOutput?.blackmagic} defaultValue={false} on:change={(e) => updateOutput("blackmagic", e.detail)} />

    <svelte:fragment slot="menu">
        <MaterialDropdown
            label="settings.device"
            value={currentOutput?.blackmagicData?.deviceId || ""}
            options={(() => {
                const usedIds = getUsedBlackmagicDeviceIds(currentOutput?.id)
                return blackmagicDevices.map((device) => ({
                    label: usedIds.includes(String(device.id || "")) ? `${device.name} (in use)` : device.name,
                    value: device.id ? String(device.id) : "",
                    disabled: usedIds.includes(String(device.id))
                }))
            })()}
            on:change={(e) => updateBlackmagicData(e.detail, "deviceId")}
        />

        {#if currentOutput?.blackmagicData?.deviceId}
            <InputRow>
                <MaterialDropdown label="settings.display_mode" value={currentOutput.blackmagicData?.displayMode} options={currentOutput.blackmagicData?.displayModes?.map((mode) => ({ label: mode.name, value: mode.name })) || []} on:change={(e) => updateBlackmagicData(e.detail, "displayMode")} />
                <MaterialDropdown label="settings.pixel_format" value={currentOutput.blackmagicData?.pixelFormat} options={currentOutput.blackmagicData?.pixelFormats?.map((format) => ({ label: format.name, value: format.name })) || []} on:change={(e) => updateBlackmagicData(e.detail, "pixelFormat")} />
            </InputRow>

            {#if isAlphaSupported()}
                <MaterialToggleSwitch label="settings.alpha_key" checked={currentOutput.blackmagicData?.alphaKey} on:change={(e) => updateBlackmagicData(e.detail, "alphaKey")} />
            {/if}
        {/if}
    </svelte:fragment>
</InputRow>

<!-- WebRTC -->
<Title label="WebRTC Streaming" icon="record" />

<InputRow arrow={currentOutput?.webrtc} bind:open={webrtcMenuOpened}>
    <MaterialToggleSwitch label={translateText("actions.enable_specific", null, ["WebRTC"])} style="width: 100%;" checked={currentOutput?.webrtc} defaultValue={false} on:change={(e) => updateOutput("webrtc", e.detail)} />

    <svelte:fragment slot="menu">
        {#if currentOutput}
            <MaterialTextInput label="WHIP Endpoint URL" value={currentOutput.webrtcData?.url || ""} placeholder="e.g. https://live.restream.io/whip/live/YOUR_KEY" on:change={(e) => updateWebrtcData(e.detail, "url")} />
            <MaterialTextInput label="Bearer Token (Optional)" value={currentOutput.webrtcData?.token || ""} placeholder="Authorization token" on:change={(e) => updateWebrtcData(e.detail, "token")} />
        {/if}
    </svelte:fragment>
</InputRow>

{#if currentOutput?.webrtc && currentOutput?.webrtcData?.url}
    <div style="padding-bottom: 10px;">
        <MaterialButton variant="outlined" icon={currentOutput.webrtcData?.streaming ? "stop" : "record"} style="width: 100%; justify-content: center; {currentOutput.webrtcData?.streaming ? 'background: #b60707 !important;' : ''}" on:click={() => (currentOutput?.webrtcData?.streaming ? stopStreaming(currentOutput.id, true) : startStreaming(currentOutput?.id))} white>
            {translateText(currentOutput.webrtcData?.streaming ? "output.stop_streaming" : "output.start_streaming")}
        </MaterialButton>
    </div>
{/if}

<!-- RTMP / YouTube Live -->
<Title label="YouTube / RTMP Live" icon="record" />

<InputRow arrow={currentOutput?.rtmp} bind:open={rtmpMenuOpened}>
    <MaterialToggleSwitch label={translateText("actions.enable_specific", null, ["YouTube / RTMP"])} style="width: 100%;" checked={currentOutput?.rtmp} defaultValue={false} on:change={(e) => updateOutput("rtmp", e.detail)} />

    <svelte:fragment slot="menu">
        {#if currentOutput}
            <MaterialTextInput label="RTMP URL" value={currentOutput.rtmpData?.url || ""} placeholder="rtmp://a.rtmp.youtube.com/live2" pasteBtn on:change={(e) => updateRtmpData(e.detail, "url")} />
            <MaterialTextInput label="Stream Key" value={currentOutput.rtmpData?.key || ""} placeholder="xxxx-xxxx-xxxx-xxxx-xxxx" pasteBtn on:change={(e) => updateRtmpData(e.detail, "key")} />
            <InputRow>
                <MaterialDropdown label="settings.resolution" value={currentOutput.rtmpData?.resolution || "1920x1080"} options={rtmpResolutions} on:change={(e) => updateRtmpData(e.detail, "resolution")} />
                <MaterialDropdown label="settings.frame_rate" value={String(currentOutput.rtmpData?.fps || 30)} options={rtmpFramerates} on:change={(e) => updateRtmpData(Number(e.detail?.id ?? e.detail), "fps")} />
            </InputRow>
            <MaterialDropdown label="Video Bitrate" value={String(currentOutput.rtmpData?.videoBitrate || 4500)} options={rtmpBitrates} on:change={(e) => updateRtmpData(Number(e.detail?.id ?? e.detail), "videoBitrate")} />
        {/if}
    </svelte:fragment>
</InputRow>

{#if currentOutput?.rtmp && currentOutput?.rtmpData?.key}
    <div style="padding-bottom: 10px;">
        <MaterialButton variant="outlined" icon={currentOutput.rtmpData?.streaming ? "stop" : "record"} style="width: 100%; justify-content: center; {currentOutput.rtmpData?.streaming ? 'background: #b60707 !important;' : ''}" on:click={() => (currentOutput?.rtmpData?.streaming ? stopRtmpStreaming(currentOutput.id || "", true) : startRtmpStreaming(currentOutput?.id || ""))} white>
            {translateText(currentOutput.rtmpData?.streaming ? "output.stop_streaming" : "output.start_streaming")}
        </MaterialButton>
    </div>
{/if}

<!-- Picture-in-Picture -->
<Title label="Picture-in-Picture" icon="pip" />

<InputRow arrow={!!currentOutput?.out?.multiPane} bind:open={pipMenuOpened}>
    <MaterialToggleSwitch label="output.enable_pip" style="width: 100%;" checked={!!currentOutput?.out?.multiPane} defaultValue={false} on:change={(e) => (e.detail ? applyPipLayout("pipBottomRight") : clearPip())} />

    <svelte:fragment slot="menu">
        {#if currentOutput?.out?.multiPane}
            <MaterialDropdown label="output.pip_layout" value={currentOutput.out.multiPane.name} options={pipLayouts.map((l) => ({ label: l.label, value: l.value }))} on:change={(e) => applyPipLayout(e.detail)} />

            <br />
            <p style="font-size: 12px; opacity: 0.7; margin-bottom: 10px;">Configure each pane:</p>

            {#each currentOutput.out.multiPane.panes as pane, i}
                <div style="background: var(--background-lighter); padding: 10px; border-radius: 8px; margin-bottom: 8px;">
                    <p style="font-size: 11px; opacity: 0.6; margin-bottom: 5px;">Pane {i + 1} ({pane.position.width}% x {pane.position.height}%)</p>
                    <MaterialDropdown label="Source Type" value={pane.sourceType} options={paneSourceTypes} on:change={(e) => updatePaneSource(pane.id, e.detail)} />
                </div>
            {/each}
        {/if}
    </svelte:fragment>
</InputRow>

{#if currentOutput?.ndi || currentOutput?.blackmagic}
    <br />

    <MaterialToggleSwitch label="settings.transparent" checked={currentOutput.transparent} defaultValue={true} on:change={(e) => updateOutput("transparent", e.detail)} />
    <MaterialToggleSwitch label="settings.invisible_window" checked={currentOutput.invisible} defaultValue={true} on:change={(e) => updateOutput("invisible", e.detail)} />
{/if}
