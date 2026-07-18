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
            const data = new Uint8ClampedArray(image.toBitmap())
            server.publishImageData(data, { x: 0, y: 0, width: size.width, height: size.height }, { width: size.width, height: size.height }, false)
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
