export interface FrameSize {
    width: number
    height: number
}

// Decide the target size for the stage "Output window" mirror frame.
// Large frames (e.g. 1080p raw bitmaps) are downscaled to a max width to avoid
// lag from pushing huge uncompressed buffers over IPC/WebSocket. Returns null
// when no resize is needed (already at/below max, or invalid), never upscales.
export function getStageDownscaleSize(size: FrameSize, maxWidth: number): FrameSize | null {
    if (!size || size.width <= 0 || size.height <= 0) return null
    if (size.width <= maxWidth) return null
    const scale = maxWidth / size.width
    return { width: maxWidth, height: Math.round(size.height * scale) }
}
