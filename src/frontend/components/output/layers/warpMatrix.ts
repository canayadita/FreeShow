import type { Pane } from "../../../../types/Show"

type Corners = NonNullable<Pane["warp"]>

// ---- 3x3 matrix helpers (row-major, length 9) ----
function adj(m: number[]): number[] {
    return [
        m[4] * m[8] - m[5] * m[7], m[2] * m[7] - m[1] * m[8], m[1] * m[5] - m[2] * m[4],
        m[5] * m[6] - m[3] * m[8], m[0] * m[8] - m[2] * m[6], m[2] * m[3] - m[0] * m[5],
        m[3] * m[7] - m[4] * m[6], m[1] * m[6] - m[0] * m[7], m[0] * m[4] - m[1] * m[3]
    ]
}
function multmm(a: number[], b: number[]): number[] {
    const c: number[] = []
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let cij = 0
            for (let k = 0; k < 3; k++) cij += a[3 * i + k] * b[3 * k + j]
            c[3 * i + j] = cij
        }
    }
    return c
}
function multmv(m: number[], v: number[]): number[] {
    return [m[0] * v[0] + m[1] * v[1] + m[2] * v[2], m[3] * v[0] + m[4] * v[1] + m[5] * v[2], m[6] * v[0] + m[7] * v[1] + m[8] * v[2]]
}
function basisToPoints(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number): number[] {
    const m = [x1, x2, x3, y1, y2, y3, 1, 1, 1]
    const v = multmv(adj(m), [x4, y4, 1])
    return multmm(m, [v[0], 0, 0, 0, v[1], 0, 0, 0, v[2]])
}
function general2DProjection(
    x1s: number, y1s: number, x1d: number, y1d: number,
    x2s: number, y2s: number, x2d: number, y2d: number,
    x3s: number, y3s: number, x3d: number, y3d: number,
    x4s: number, y4s: number, x4d: number, y4d: number
): number[] {
    const s = basisToPoints(x1s, y1s, x2s, y2s, x3s, y3s, x4s, y4s)
    const d = basisToPoints(x1d, y1d, x2d, y2d, x3d, y3d, x4d, y4d)
    return multmm(d, adj(s))
}

export function hasWarp(warp: Pane["warp"]): boolean {
    if (!warp) return false
    return [warp.tl, warp.tr, warp.br, warp.bl].some((c) => c.x !== 0 || c.y !== 0)
}

// 3x3 projection mapping the element's local rect (0,0)-(w,h) to the warped corners
export function computeProjection(w: number, h: number, warp: Corners): number[] {
    const dst = {
        tl: { x: (warp.tl.x / 100) * w, y: (warp.tl.y / 100) * h },
        tr: { x: w + (warp.tr.x / 100) * w, y: (warp.tr.y / 100) * h },
        br: { x: w + (warp.br.x / 100) * w, y: h + (warp.br.y / 100) * h },
        bl: { x: (warp.bl.x / 100) * w, y: h + (warp.bl.y / 100) * h }
    }
    return general2DProjection(
        0, 0, dst.tl.x, dst.tl.y,
        w, 0, dst.tr.x, dst.tr.y,
        w, h, dst.br.x, dst.br.y,
        0, h, dst.bl.x, dst.bl.y
    )
}

export function projectPoint(t: number[], x: number, y: number): { x: number; y: number } {
    const v = multmv(t, [x, y, 1])
    return { x: v[0] / v[2], y: v[1] / v[2] }
}

export function getWarpMatrix(w: number, h: number, warp: Pane["warp"]): string {
    if (!hasWarp(warp) || w <= 0 || h <= 0) return ""
    const t = computeProjection(w, h, warp as Corners)
    if (!isFinite(t[8]) || t[8] === 0) return "" // degenerate quad guard
    for (let i = 0; i < 9; i++) t[i] = t[i] / t[8]
    const matrix = [t[0], t[3], 0, t[6], t[1], t[4], 0, t[7], 0, 0, 1, 0, t[2], t[5], 0, t[8]]
    if (matrix.some((n) => !isFinite(n))) return ""
    return "matrix3d(" + matrix.join(",") + ")"
}
