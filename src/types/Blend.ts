export type BlendSourceType = "image" | "video" | "color" | "camera" | "ndi" | "screen" | "blackmagic"

export interface BlendLayer {
    id: string
    sourceType: BlendSourceType
    sourcePath?: string // image/video file path
    sourceId?: string // camera/ndi/screen/blackmagic device id
    color?: string // sourceType "color"
    blendMode: string // "" = Normal, else a CSS mix-blend-mode value
    opacity: number // 0-100
    visible: boolean
}

export interface Blend {
    name: string
    layers: BlendLayer[] // stack order, index 0 = bottom
    index?: number // display order in the saved-blends list
}
