export type BlendSourceType = "image" | "video" | "color" | "camera" | "ndi" | "screen" | "blackmagic"

export type BlendFeatherShape = "rect" | "circle" | "ellipse"

export interface BlendFeather {
    shape: BlendFeatherShape
    // shape "rect": independent per-edge fade, 0-50 (% of layer w/h), mirrors Pane["feather"]
    left: number
    right: number
    top: number
    bottom: number
    // shape "circle"/"ellipse": single fade amount inward from the edge, 0-50
    amount: number
}

export interface BlendLayer {
    id: string
    sourceType: BlendSourceType
    sourcePath?: string // image/video file path
    sourceId?: string // camera/ndi/screen/blackmagic device id
    color?: string // sourceType "color"
    blendMode: string // "" = Normal, else a CSS mix-blend-mode value
    opacity: number // 0-100
    visible: boolean
    position?: { x: number; y: number } // -50 to 50, % pan offset from center — lets the media be framed off-center instead of always centered
    zoom?: number // 100-400, % scale; 100 = no zoom (default)
    crop?: { left: number; right: number; top: number; bottom: number } // 0-45 each, % hard-cropped inward from each edge of the layer's frame (unlike feather, this cuts rather than fades)
    feather?: BlendFeather // absent = no feather
}

export interface Blend {
    name: string
    layers: BlendLayer[] // stack order, index 0 = bottom
    index?: number // display order in the saved-blends list
}
