// Syphon is macOS-only. This pure decision keeps the platform guard testable
// and lets non-mac builds avoid ever touching the native addon.
export function shouldSendSyphon(output: { syphon?: boolean }, platform: NodeJS.Platform): boolean {
    return platform === "darwin" && !!output?.syphon
}
