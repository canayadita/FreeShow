// Pure geometry math for the scripture "smart split" feature.
// Extracted from scripture.ts so it can be unit-tested without stores / TemplateHelper.
//
// Given a textbox's CSS-like style string, its text style, and whether the template
// auto-fits (shrinkToFit / growToFit), estimate how many characters fit per line and
// how many lines fit in the box. These numbers drive how a long verse is chunked
// across multiple slides so it never overflows a small box (e.g. a lower third).

const SCREEN_WIDTH = 1920
const SCREEN_HEIGHT = 1080

export function parseStyleDimension(style: string, regex: RegExp, defaultValue: number, viewportValue: number): number {
    const match = style.match(regex)
    if (!match) return defaultValue
    const val = parseFloat(match[1])
    const unit = match[2]
    if (unit === "%") {
        return (val / 100) * viewportValue
    }
    return val
}

export function computeSplitDimensions(itemStyle: string, textStyle: string, hasAutoFit: boolean): { charsPerLine: number; linesCount: number } {
    const width = parseStyleDimension(itemStyle, /width:\s*([\d.]+)(px|%)?/, 1820, SCREEN_WIDTH)
    const height = parseStyleDimension(itemStyle, /height:\s*([\d.]+)(px|%)?/, 780, SCREEN_HEIGHT)

    const paddingMatch = itemStyle.match(/padding:\s*([\d.]+)px/)
    const padding = paddingMatch ? parseFloat(paddingMatch[1]) * 2 : 0
    const usableWidth = Math.max(100, width - padding)
    const usableHeight = Math.max(50, height - padding)

    let fontSize = 80
    const fontSizeMatch = textStyle.match(/font-size:\s*([\d.]+)(px)?/) || itemStyle.match(/font-size:\s*([\d.]+)(px)?/)
    if (fontSizeMatch) fontSize = parseFloat(fontSizeMatch[1])

    const lineHeightMatch = textStyle.match(/line-height:\s*([\d.]+)/) || itemStyle.match(/line-height:\s*([\d.]+)/)
    const lineHeightRatio = lineHeightMatch ? parseFloat(lineHeightMatch[1]) : 1.35

    const charWidth = fontSize * 0.5
    const lineHeight = fontSize * lineHeightRatio

    const charsPerLine = Math.floor(usableWidth / charWidth)
    let linesCount = Math.floor(usableHeight / lineHeight)

    // If the template auto-fits (shrinkToFit / growToFit), the renderer downsizes the font so the
    // text wraps to more lines than the native font would fit. Without this, a small box (a lower
    // third) computes linesCount 0 or 1, the splitter thinks a long verse "fits", and the verse
    // overflows / overlaps instead of chunking. Assume a minimum of 2 wrapped lines for chunking.
    if (hasAutoFit) linesCount = Math.max(2, linesCount)

    return {
        charsPerLine: charsPerLine > 0 ? charsPerLine : 40,
        linesCount: linesCount > 0 ? linesCount : 10
    }
}
