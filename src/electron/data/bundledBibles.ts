import { app } from "electron"
import { existsSync, copyFileSync, readFileSync } from "fs"
import path from "path"
import { getDataFolderPath } from "../utils/files"

const BUNDLED_BIBLES = ["Terjemahan Baru.fsb", "Bahasa Indonesia Sehari-hari.fsb", "King James Version.fsb", "World English Bible.fsb"]

function getBiblesSourceDir(): string {
    if (app.isPackaged) return path.join(process.resourcesPath, "bibles")
    return path.join(__dirname, "../../../public/bibles")
}

function readFsb(filePath: string): any | null {
    try {
        const data = JSON.parse(readFileSync(filePath, "utf8"))
        // FreeShow format: [id, { name, books: [...] }]
        if (Array.isArray(data) && data.length >= 2 && Array.isArray(data[1]?.books)) return data
        return null
    } catch {
        return null
    }
}

// Bundled bibles carry a bundledRevision number - when the bundled copy is newer
// than the installed one (e.g. corrected BIS text), the installed file is replaced.
function isUpToDate(target: string, source: string): boolean {
    const installed = readFsb(target)
    if (!installed) return false

    const bundled = readFsb(source)
    if (!bundled) return true // no valid source to compare against - keep installed

    const installedRevision = Number(installed[1]?.bundledRevision) || 0
    const bundledRevision = Number(bundled[1]?.bundledRevision) || 0
    return installedRevision >= bundledRevision
}

export function installBundledBibles(): void {
    const targetDir = getDataFolderPath("scriptures")
    const sourceDir = getBiblesSourceDir()

    for (const file of BUNDLED_BIBLES) {
        const target = path.join(targetDir, file)
        // Skip only if installed file is valid AND at least as new as the bundled copy
        if (existsSync(target) && isUpToDate(target, path.join(sourceDir, file))) continue

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
