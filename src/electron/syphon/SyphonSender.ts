import type { NativeImage } from "electron"

// Wraps the node-syphon native addon (macOS Metal). Lazy-loaded only on darwin
// so Windows/Linux builds never require the native binary.
type MetalServer = {
    publishImageData: (data: Uint8ClampedArray, region: { x: number; y: number; width: number; height: number }, textureDimension: { width: number; height: number }, flipped: boolean) => void
    dispose: () => void
    readonly hasClients: boolean
}

export class SyphonSender {
    private static servers: { [id: string]: MetalServer } = {}
    private static syphon: any = null
    private static loadFailed = false

    private static load(): any {
        if (process.platform !== "darwin" || this.loadFailed) return null
        if (!this.syphon) {
            try {
                // eslint-disable-next-line @typescript-eslint/no-require-imports
                this.syphon = require("node-syphon")
            } catch (err) {
                console.error("Syphon: failed to load node-syphon", err)
                this.loadFailed = true
                return null
            }
        }
        return this.syphon
    }

    static sendFrame(id: string, name: string, image: NativeImage) {
        const syphon = this.load()
        if (!syphon || !image) return
        const size = image.getSize()
        if (!size.width || !size.height) return

        let server = this.servers[id]
        if (!server) {
            try {
                server = new syphon.SyphonMetalServer(name || "FreeShow")
                this.servers[id] = server
            } catch (err) {
                console.error("Syphon: failed to create server", err)
                return
            }
        }

        try {
            // toBitmap() is BGRA (Electron/Chromium capture); Syphon publishes raw pixels.
            // flipped=true because Syphon/Metal textures are bottom-left origin while the
            // Electron bitmap is top-left origin (otherwise the output is upside-down).
            // Wrap the bitmap as a VIEW (no extra 8MB copy per frame) — publishImageData
            // reads it synchronously, so the view stays valid; avoids per-frame GC jank
            // that made captured text animations lag in the Syphon client.
            const bitmap = image.toBitmap()
            const data = new Uint8ClampedArray(bitmap.buffer, bitmap.byteOffset, bitmap.byteLength)
            server.publishImageData(data, { x: 0, y: 0, width: size.width, height: size.height }, { width: size.width, height: size.height }, true)
        } catch (err) {
            console.error("Syphon: publish failed", err)
        }
    }

    static stop(id: string) {
        const server = this.servers[id]
        if (!server) return
        try {
            server.dispose()
        } catch {
            // ignore
        }
        delete this.servers[id]
    }
}
