import { get } from "svelte/store"
import { uid } from "uid"
import { actionHistory, actions, activeShow, audioPlaylists, audioStreams, runningActions, shows, stageShows, styles } from "../../stores"
import { newToast, wait } from "../../utils/common"
import { DEFAULT_ANIMATION_CONFIG } from "../../../types/animation"
import { TEXT_PRESETS } from "../../../types/textPresets"
import type { Item } from "../../../types/Show"
import { getShowBPM } from "../drawer/audio/metronome"
import { addStyleString } from "../edit/scripts/textStyle"
import { getDynamicValue } from "../edit/scripts/itemHelpers"
import { clone, keysToID } from "../helpers/array"
import { history } from "../helpers/history"
import { getFirstActiveOutput } from "../helpers/output"
import { getLayoutRef } from "../helpers/show"
import { _show } from "../helpers/shows"
import { actionData } from "./actionData"
import type { API_toggle } from "./api"
import { API_ACTIONS } from "./api"
import { sortByClosestMatch } from "./apiHelper"
import { convertOldMidiToNewAction } from "./midi"

export function runActionId(id: string, source = "action") {
    runAction(get(actions)[id], { source })
}

export function runActionByName(name: string, source = "action") {
    if (name.includes("{")) name = getDynamicValue(name)
    const sortedActions = sortByClosestMatch(keysToID(get(actions)), name)
    if (!sortedActions.length) return
    runAction(sortedActions[0], { source })
}

const MAX_ACTION_HISTORY_ENTRIES = 200
const loopPrevention = { actionId: "", count: 0, timeout: null as NodeJS.Timeout | null }
export async function runAction(action, { midiIndex = -1, slideIndex = -1, source = "action" } = {}, isCategoryAction = false) {
    // console.log(action)
    if (!action) return
    action = convertOldMidiToNewAction(action)

    const actionTriggers = action.triggers || []
    if (!actionTriggers.length) return

    // prevent infinite loops
    // if it's run more than once every 10ms it's probably looping
    if (loopPrevention.actionId === action.id) {
        loopPrevention.count++
        if (loopPrevention.count > 10) return
    } else {
        loopPrevention.actionId = action.id
        if (loopPrevention.timeout) clearTimeout(loopPrevention.timeout)
        loopPrevention.timeout = setTimeout(() => {
            loopPrevention.actionId = ""
            loopPrevention.count = 0
        }, 100)
    }

    const actionValues = action.actionValues || {}

    // set to active
    runningActions.set([...get(runningActions), action.id])

    for (const actionId of actionTriggers) {
        await runTrigger(actionId)
    }

    // remove from active (timeout to show outline)
    setTimeout(() => {
        runningActions.update((a) => {
            const currentIndex = a.findIndex((id) => action.id === id)
            if (currentIndex < 0) return a
            a.splice(currentIndex, 1)
            return a
        })
    }, 20)

    async function runTrigger(actionId: string) {
        let triggerData = actionValues[actionId] || {}
        if (midiIndex > -1) triggerData = { ...triggerData, index: midiIndex }

        actionId = getActionTriggerId(actionId)

        if (actionId === "wait") {
            await wait((triggerData.number || 0) * 1000)
            return
        }

        if (!API_ACTIONS[actionId]) {
            console.error("Missing API for trigger")
            return
        }

        if (actionId === "start_slide_timers" && slideIndex > -1) {
            const outputRef = getFirstActiveOutput()?.out?.slide
            const showId = outputRef?.id || "active"
            const layoutRef = _show(showId)
                .layouts(outputRef?.layout ? [outputRef.layout] : "active")
                .ref()[0]
            if (layoutRef) {
                const overlayIds = layoutRef[slideIndex]?.data?.overlays || []
                triggerData = { overlayIds }
            }
        } else if (actionId === "send_midi" && triggerData.midi) triggerData = triggerData.midi

        if (actionId === "clear_slide" && !isCategoryAction) {
            // without this slide content might get "stuck", if cleared when transitioning
            await wait(10)
        }

        API_ACTIONS[actionId](triggerData)

        // add to history
        actionHistory.update((a) => {
            const time = Date.now()

            const previous = clone(a[0] || {})
            previous.count = 1
            previous.time = time

            const data = { action: actionId, data: triggerData, time, count: 1, source }
            const matchingPrevious = JSON.stringify(previous) === JSON.stringify(data)

            if (matchingPrevious) {
                a[0].time = time
                a[0].count++
            } else {
                a.unshift(data)
            }

            if (a.length > MAX_ACTION_HISTORY_ENTRIES) {
                a = a.slice(0, MAX_ACTION_HISTORY_ENTRIES)
            }

            return a
        })
    }
}

export function toggleAction(data: API_toggle) {
    if (!data.id) return

    actions.update((a) => {
        if (!a[data.id]) return a

        const previousValue = a[data.id].enabled ?? true
        a[data.id].enabled = data.value ?? !previousValue

        return a
    })
}

export function checkStartupActions() {
    customActionActivation("startup")
}

export function customActionActivation(id: string, specificActivation: any = null) {
    let actionTriggered = false
    Object.keys(get(actions)).forEach((actionId) => {
        const action = get(actions)[actionId]

        if (action.customActivation !== id || action.enabled === false) return
        if (specificActivation && action.specificActivation?.includes(id) && (!action.specificActivation.split("__")[1] || action.specificActivation.split("__")[1] !== specificActivation)) return

        runAction(action, { source: "custom_activation" })
        actionTriggered = true
    })

    if (actionTriggered && id === "startup") {
        newToast("toast.starting_action")
    }
}

export function addSlideAction(slideIndex: number, actionId: string, actionValue: any = {}, allowMultiple = false) {
    if (slideIndex < 0) return

    const ref = getLayoutRef()
    if (!ref[slideIndex]) return

    const slideActions = clone(ref[slideIndex].data?.actions) || {}

    const id = uid()
    if (!slideActions.slideActions) slideActions.slideActions = []
    const actionValues: { [key: string]: any } = {}
    if (actionValue) actionValues[actionId] = actionValue

    const action = { id, triggers: [actionId], actionValues }

    // Check if this action type can have multiple instances
    const data = actionData[actionId]
    const canAddMultiple = data?.canAddMultiple || allowMultiple

    const existingIndex = slideActions.slideActions.findIndex((a) => a.triggers?.[0] === actionId)
    if (canAddMultiple || existingIndex < 0) slideActions.slideActions.push(action)
    else slideActions.slideActions[existingIndex] = action

    history({ id: "SHOW_LAYOUT", newData: { key: "actions", data: slideActions, indexes: [slideIndex] } })
}

// remove all custom actions previously added to a slide (keeps other bindings like MIDI)
export function clearSlideActions(slideIndex: number) {
    if (slideIndex < 0) return

    const ref = getLayoutRef()
    if (!ref[slideIndex]) return

    const slideActions = clone(ref[slideIndex].data?.actions) || {}
    if (!slideActions.slideActions?.length) return

    slideActions.slideActions = []
    history({ id: "SHOW_LAYOUT", newData: { key: "actions", data: slideActions, indexes: [slideIndex] } })
}

// every CSS property any Typography preset can set (types/textPresets.ts), so clearing stays
// correct as new presets are added — computed once from the actual preset data, not hardcoded.
const TYPOGRAPHY_STYLE_KEYS: string[] = [
    ...new Set(
        TEXT_PRESETS.flatMap((preset) => [preset.style.lineStyle || "", preset.style.textStyle || ""])
            .join(";")
            .split(";")
            .map((s) => s.split(":")[0].trim())
            .filter(Boolean)
    )
]

// reset every text item on a slide back to "no Typography preset": default animation
// (DEFAULT_ANIMATION_CONFIG, which also clears any background/decoration effect) and strip
// just the CSS properties presets can set, leaving other item styling (font-size, color, etc.
// set elsewhere, e.g. the Show tab's quick-style toolbar) untouched.
function clearSlideTypography(slideIndex: number) {
    const ref = getLayoutRef()
    const slideId = ref[slideIndex]?.id
    if (!slideId) return

    const items: Item[] = _show().slides([slideId]).get()[0]?.items || []
    const textItemIndexes: number[] = []
    const newStyles: string[] = []
    items.forEach((item, index) => {
        if ((item.type || "text") !== "text") return
        textItemIndexes.push(index)
        newStyles.push(TYPOGRAPHY_STYLE_KEYS.reduce((style, key) => addStyleString(style, [key, null]), item.style || ""))
    })
    if (!textItemIndexes.length) return

    const showId = get(activeShow)?.id || ""
    const location = { page: "edit", show: { id: showId }, slide: slideId, items: textItemIndexes }
    history({ id: "setItems", newData: { style: { key: "animationConfig", values: [DEFAULT_ANIMATION_CONFIG] } }, location })
    history({ id: "setItems", newData: { style: { key: "style", values: newStyles } }, location })
}

// the slide right-click menu's single "clear everything applied to this slide" action:
// custom slide actions, filters, overlay effects, and every text item's Typography preset.
export function clearAllSlideEffects(slideIndex: number) {
    if (slideIndex < 0) return

    clearSlideActions(slideIndex)

    const indexes = [slideIndex]
    history({ id: "SHOW_LAYOUT", newData: { key: "filterEnabled", indexes } }) // pre 1.4.4
    history({ id: "SHOW_LAYOUT", newData: { key: "filter", indexes } }) // pre 1.5.0
    history({ id: "SHOW_LAYOUT", newData: { key: "backdrop-filter", indexes } })
    history({ id: "SHOW_LAYOUT", newData: { key: "effects", indexes } })

    clearSlideTypography(slideIndex)
}

export function slideHasAction(slideActions: any, key: string) {
    return slideActions?.slideActions?.find((a) => a.triggers?.includes(key))
}

export function getActionIcon(id: string) {
    const actionTriggers = get(actions)[id]?.triggers || {}
    if (actionTriggers.length > 1) return "actions"

    const trigger = getActionTriggerId(actionTriggers[0])
    return actionData[trigger]?.icon || "actions"
}

export function getActionTriggerId(id: string) {
    let trigger = id || ""
    if (trigger.includes(":")) trigger = trigger.slice(0, trigger.indexOf(":"))
    return trigger
}

// extra names

const namedObjects = {
    run_action: () => get(actions),
    start_show: () => get(shows),
    start_audio_stream: () => get(audioStreams),
    start_playlist: () => get(audioPlaylists),
    id_select_stage_layout: () => get(stageShows)
}
export function getActionName(actionId: string, actionValue: any): string {
    if (!actionValue) return ""

    if (actionId === "change_output_style") {
        return get(styles)[actionValue.outputStyle]?.name || ""
    }

    if (actionId === "start_metronome") {
        const beats = (actionValue.beats || 4) === 4 ? "" : " | " + actionValue.beats
        if (actionValue.metadataBPM) actionValue.tempo = getShowBPM()
        return (actionValue.tempo || 120) + beats
    }

    if (actionId === "change_volume") {
        return (Number(actionValue.volume || 1) * 100).toString()
    }

    if (!namedObjects[actionId]) return ""

    return namedObjects[actionId]()[actionValue.id]?.name || ""
}
