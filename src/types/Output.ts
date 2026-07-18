import type { Cropping, Resolution } from "./Settings"
import type { MultiPane, OutBackground, OutSlide, OutTransition } from "./Show"

export interface Outputs {
    [key: string]: Output
}

export interface Output {
    id?: string
    hideFromPreview?: boolean
    stageOutput?: string
    enabled: boolean
    active: boolean
    name: string
    color: string
    bounds: { x: number; y: number; width: number; height: number }
    boundsLocked?: boolean
    cropping?: Cropping
    blending?: { left: number; right: number; rotate: number; opacity: number; centered: boolean; offset: number }
    screen: string | null
    kioskMode?: boolean
    alwaysOnTop?: boolean
    transparent?: boolean
    allowMainScreen?: boolean // allow custom output bounds
    ndi?: boolean
    ndiData?: any
    syphon?: boolean // macOS: publish this output as a Syphon server
    syphonName?: string // optional publish name (default: output name)
    blackmagic?: boolean
    blackmagicData?: any
    webrtc?: boolean
    webrtcData?: any
    rtmp?: boolean
    rtmpData?: any
    forcedResolution?: Resolution
    invisible?: boolean
    taskbar?: boolean
    style?: string
    show?: any
    out?: OutData
}

export interface OutData {
    refresh?: boolean
    background?: null | OutBackground
    slide?: null | OutSlide
    effects?: string[]
    overlays?: string[]
    transition?: null | OutTransition
    multiPane?: null | MultiPane
}

export interface Animation {
    actions: AnimationAction[]
    repeat?: boolean
    easing?: string
}

export interface AnimationAction {
    type: "change" | "set" | "wait"
    id?: "background" | "text" | "item"
    key?: string
    extension?: string
    value?: number
    duration: number
}
