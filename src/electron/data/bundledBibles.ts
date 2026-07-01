import { app } from "electron"
import { existsSync, copyFileSync, readFileSync } from "fs"
import path from "path"
import { getDataFolderPath } from "../utils/files"

const BUNDLED_BIBLES = ["Terjemahan Baru.fsb", "Bahasa Indonesia Sehari-hari.fsb", "King James Version.fsb", "World English Bible.fsb"]

function getBiblesSourceDir(): string {
    if (app.isPackaged) return path.join(process.resourcesPath, "bibles")
    return path.join(__dirname, "../../../public/bibles")
}

function isValidFsbFormat(filePath: string): boolean {
    try {
        const raw = readFileSync(filePath, "utf8")
        const data = JSON.parse(raw)
        // FreeShow format: [id, { name, books: [...] }]
        return Array.isArray(data) && data.length >= 2 && Array.isArray(data[1]?.books)
    } catch {
        return false
    }
}

export function installBundledBibles(): void {
    const targetDir = getDataFolderPath("scriptures")
    const sourceDir = getBiblesSourceDir()

    for (const file of BUNDLED_BIBLES) {
        const target = path.join(targetDir, file)
        // Skip only if file exists AND is already valid FreeShow format
        if (existsSync(target) && isValidFsbFormat(target)) continue

        const source = path.join(sourceDir, file)
        if (!existsSync(source)) {
            console.warn(`[FreeShowPlus] Bible source not found: ${source}`)
            continue
        }

        try {
            copyFileSync(source, target)
            console.info(`[FreeShowPlus] Bible installed: ${file}`)
        } catch (err) {
            console.error(`[FreeShowPlus] Failed to install Bible ${file}:`, err)
        }
    }
}
