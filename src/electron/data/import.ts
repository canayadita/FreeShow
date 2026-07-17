import Database from "better-sqlite3"
import { execFile } from "child_process"
import fs from "fs"
import path, { join } from "path"
import protobufjs from "protobufjs"
import { promisify } from "util"
import upath from "upath"
// @ts-ignore (strange Rollup TS build problem, suddenly not realizing that the decleration exists)
import MDBReader from "mdb-reader"
// @ts-ignore
import WordExtractor from "word-extractor"
import { ToMain } from "../../types/IPC/ToMain"
import { sendToMain } from "../IPC/main"
import { isWindows } from ".."
import { createFolder, doesPathExist, getDataFolderPath, getExtension, readFileAsync, readFileBufferAsync, sanitizeFileName } from "../utils/files"
import { detectFileType } from "./bibleDetecter"
import { filePathHashCode } from "./thumbnails"
import { decompressZip, decompressZipStream, isZip } from "./zip"

const execFileAsync = promisify(execFile)

type FileData = { content: Buffer | string | object; path?: string; name?: string; extension?: string }

function getMsPowerPointPath(): string | null {
    if (isWindows) {
        // Common PowerPoint executable locations on Windows
        const versions = ["Office16", "Office15", "Office14", "root\\Office16", "root\\Office15"]
        for (const ver of versions) {
            const p = path.join(process.env.PROGRAMFILES || "C:\\Program Files", "Microsoft Office", ver, "POWERPNT.EXE")
            const p86 = path.join(process.env["PROGRAMFILES(X86)"] || "C:\\Program Files (x86)", "Microsoft Office", ver, "POWERPNT.EXE")
            if (fs.existsSync(p)) return p
            if (fs.existsSync(p86)) return p86
        }
    } else {
        // macOS
        const p = "/Applications/Microsoft PowerPoint.app/Contents/MacOS/Microsoft PowerPoint"
        if (fs.existsSync(p)) return p
    }
    return null
}

function getSofficePath(): string | null {
    const paths: string[] = isWindows
        ? [
              path.join(process.env.PROGRAMFILES || "C:\\Program Files", "LibreOffice", "program", "soffice.exe"),
              path.join(process.env["PROGRAMFILES(X86)"] || "C:\\Program Files (x86)", "LibreOffice", "program", "soffice.exe"),
          ]
        : ["/Applications/LibreOffice.app/Contents/MacOS/soffice", "/usr/bin/soffice", "/usr/local/bin/soffice"]

    for (const p of paths) {
        try {
            if (fs.existsSync(p) && fs.lstatSync(p).isFile()) return p
        } catch {
            // ignore
        }
    }
    return null
}

async function convertPptToPdfViaMsPowerPoint(pptPath: string, pdfPath: string): Promise<boolean> {
    try {
        if (isWindows) {
            // Windows: use VBScript to automate PowerPoint COM
            const vbs = `
Set pptApp = CreateObject("PowerPoint.Application")
pptApp.Visible = False
Set pres = pptApp.Presentations.Open("${pptPath.replace(/\//g, "\\")}", True, False, False)
pres.ExportAsFixedFormat "${pdfPath.replace(/\//g, "\\")}", 2
pres.Close
pptApp.Quit
`.trim()
            const vbsPath = path.join(path.dirname(pdfPath), "_ppt2pdf.vbs")
            fs.writeFileSync(vbsPath, vbs)
            await execFileAsync("cscript", ["//NoLogo", vbsPath])
            fs.unlinkSync(vbsPath)
        } else {
            // macOS: write AppleScript to temp file then execute
            const posixPpt = pptPath.replace(/\\/g, "/").replace(/"/g, '\\"')
            const posixPdf = pdfPath.replace(/\\/g, "/").replace(/"/g, '\\"')
            const scriptPath = path.join(path.dirname(pdfPath), "_ppt2pdf.applescript")
            const script = `tell application "Microsoft PowerPoint"
    activate
    open POSIX file "${posixPpt}"
    delay 3
    set thePresentation to active presentation
    save thePresentation in POSIX file "${posixPdf}" as save as PDF
    close thePresentation saving no
end tell`
            fs.writeFileSync(scriptPath, script, "utf8")
            try {
                await execFileAsync("osascript", [scriptPath])
            } finally {
                try { fs.unlinkSync(scriptPath) } catch {}
            }
        }
        return fs.existsSync(pdfPath)
    } catch (err: any) {
        console.error("MS PowerPoint export failed:", err)
        return false
    }
}

const specialImports = {
    powerpoint: async (files: string[]) => {
        sendToMain(ToMain.ALERT, "popup.importing")

        const msPptPath = getMsPowerPointPath()
        const sofficePath = getSofficePath()
        const outputFolder = getDataFolderPath("imports", "PowerPoint")
        createFolder(outputFolder)

        // Priority 1: Microsoft PowerPoint
        if (msPptPath) {
            let anySuccess = false
            for (const filePath of files) {
                const safeName = sanitizeFileName(path.basename(filePath, path.extname(filePath)))
                const pdfPath = path.join(outputFolder, safeName + ".pdf")
                const ok = await convertPptToPdfViaMsPowerPoint(filePath, pdfPath)
                if (ok) {
                    anySuccess = true
                    sendToMain(ToMain.IMPORT2, { channel: "pdf", data: [pdfPath] })
                } else if (sofficePath) {
                    // MS PowerPoint failed — fallback to LibreOffice
                    try {
                        await execFileAsync(sofficePath, ["--headless", "--convert-to", "pdf", "--outdir", outputFolder, filePath])
                        if (fs.existsSync(pdfPath)) {
                            anySuccess = true
                            sendToMain(ToMain.IMPORT2, { channel: "pdf", data: [pdfPath] })
                        }
                    } catch (err: any) {
                        console.error("LibreOffice fallback failed:", err)
                    }
                }
            }
            if (!anySuccess) {
                sendToMain(
                    ToMain.ALERT,
                    "Import PowerPoint gagal.<br><br>" +
                    "Pastikan:<br>" +
                    "• Microsoft PowerPoint sudah terbuka & ada izin Automation (System Settings → Privacy & Security → Automation)<br>" +
                    "• Atau install <b>LibreOffice</b> sebagai alternatif — <u>libreoffice.org</u>"
                )
            }
            return []
        }

        // Priority 2: LibreOffice
        if (sofficePath) {
            for (const filePath of files) {
                try {
                    await execFileAsync(sofficePath, ["--headless", "--convert-to", "pdf", "--outdir", outputFolder, filePath])
                    const safeName = sanitizeFileName(path.basename(filePath, path.extname(filePath)))
                    const pdfPath = path.join(outputFolder, safeName + ".pdf")
                    if (fs.existsSync(pdfPath)) sendToMain(ToMain.IMPORT2, { channel: "pdf", data: [pdfPath] })
                } catch (err: any) {
                    console.error("LibreOffice PPT→PDF failed:", err)
                }
            }
            return []
        }

        // Neither available — notify user
        sendToMain(
            ToMain.ALERT,
            "Untuk import PowerPoint dengan visual lengkap, install salah satu:<br><br>" +
            "• <b>Microsoft PowerPoint</b> (Microsoft 365)<br>" +
            "• <b>LibreOffice</b> (gratis) — <u>libreoffice.org</u>"
        )
        return []
    },
    word: async (files: string[]) => {
        const data: FileData[] = []

        // https://www.npmjs.com/package/word-extractor
        const extractor = new WordExtractor()
        for await (const filePath of files) {
            const extracted = await extractor.extract(filePath)
            data.push({ name: getFileName(filePath), content: extracted.getBody() })
        }

        return data
    },
    pdf: (files: string[]) => files,
    powerkey: (files: string[]) => files,
    sqlite: async (files: string[]) => {
        const data: FileData[] = []

        for (const filePath of files) {
            try {
                const db = new Database(filePath, { readonly: true })
                const tables: { [key: string]: any[] } = {}

                // Get all table names
                const tableNames = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'").all() as { name: string }[]

                // Get all data from each table
                for (const { name } of tableNames) {
                    tables[name] = db.prepare(`SELECT * FROM \`${name}\``).all()
                }

                db.close()
                data.push({ content: tables })
            } catch (err) {
                console.error(err)
            }
        }

        return data
    },
    mdb: async (files: string[]) => {
        const data: FileData[] = []

        await Promise.all(files.map(async (filePath) => await mdbToFile(filePath)))

        async function mdbToFile(filePath: string) {
            const buffer = await readFileBufferAsync(filePath)
            const reader = new MDBReader(buffer)
            const tableNames = reader.getTableNames()

            const dbData: any = {}
            for (const tableName of tableNames) {
                dbData[tableName] = reader.getTable(tableName).getData()
            }

            data.push({ content: dbData })
        }

        return data
    }
}

// protobufjs (.pro) import can't handle close to 1000 files at once
const BATCH_SIZE = 500

export async function importShow(id: string, files: string[] | null, importSettings: any) {
    if (!files?.length) return

    let importId = id
    let data: (FileData | string)[] = []

    const sqliteFile = id === "openlp" && files.find((a) => a.endsWith(".sqlite"))
    if (sqliteFile) files = files.filter((a) => a.endsWith(".sqlite"))
    if (id === "easyworship" || id === "softprojector" || sqliteFile) importId = "sqlite"
    const mdbFile = id === "mediashout" && files.find((a) => a.endsWith(".mdb"))
    if (mdbFile) files = files.filter((a) => a.endsWith(".mdb"))
    if (mdbFile) importId = "mdb"

    if (id === "freeshow_project") {
        await importProject(files)
        return
    }
    if (id === "freeshow_template") {
        await importTemplate(files)
        return
    }

    if (id === "songbeamer") {
        const encoding = importSettings.encoding
        const fileContents = await Promise.all(files.map(async (file) => await readFile(file, encoding)))
        const custom = {
            files: fileContents,
            length: fileContents.length,
            encoding,
            category: importSettings.category.id,
            translationMethod: importSettings.translation
        }

        sendToMain(ToMain.IMPORT2, { channel: id, data: [], custom })
        return
    }

    const zip = ["zip", "probundle", "vpc", "qsp"]
    const zipFiles = files.filter((a) => zip.includes(a.slice(a.lastIndexOf(".") + 1).toLowerCase()))
    if (zipFiles.length) {
        data = await decompressZip(zipFiles)
        if (data.length) {
            for (const fileData of data) {
                const customContent = await checkSpecial(fileData as FileData)
                if (customContent) (fileData as FileData).content = customContent
            }
            sendToMain(ToMain.IMPORT2, { channel: id, data })
        }
        return
    }

    if (importId in specialImports) data = await specialImports[importId as keyof typeof specialImports](files)
    else {
        // TXT | FreeShow | ProPresenter | VidoePsalm | OpenLP | OpenSong | XML Bible | Lessons.church
        for (let i = 0; i < files.length; i += BATCH_SIZE) {
            const batch = files.slice(i, i + BATCH_SIZE)
            const batchData = await Promise.all(batch.map((file) => readFile(file, "utf8", id)))
            data.push(...batchData)
        }
    }

    if (!data.length) return

    // auto detect version
    if (id === "BIBLE") {
        data = (data as FileData[]).map((file) => ({ ...file, type: detectFileType(file.content as string) }))
    }

    sendToMain(ToMain.IMPORT2, { channel: id, data })
}

async function readFile(filePath: string, encoding: BufferEncoding = "utf8", id?: string) {
    let content = ""

    const name: string = getFileName(filePath) || ""
    const extension: string = getExtension(filePath)

    try {
        if (id === "propresenter" && extension === "pro") content = await decodeProto(filePath)
        else content = await readFileAsync(filePath, encoding)
    } catch (err) {
        console.error("Error reading file:", (err as Error).stack)
    }

    return { content, path: filePath, name, extension }
}

const getFileName = (filePath: string) => path.basename(filePath).slice(0, path.basename(filePath).lastIndexOf("."))

// PROJECT

async function importProject(files: string[]) {
    sendToMain(ToMain.ALERT, "popup.importing")

    // some .project files are plain JSON and others are zip
    const zipFiles: string[] = []
    const jsonFiles: string[] = []
    await Promise.all(
        files.map(async (file) => {
            const zip = await isZip(file)
            if (zip) zipFiles.push(file)
            else jsonFiles.push(file)
        })
    )

    const data: FileData[] = await Promise.all(jsonFiles.map(async (file) => await readFile(file)))

    const importFolder = getDataFolderPath("imports", "Projects")

    for (const zipFile of zipFiles) {
        const dataFile = await extractZipDataAndMedia(zipFile, importFolder)
        if (dataFile) data.push(dataFile)
    }

    // remove folder if no files stored
    // if (!readFolder(importFolder).length) deleteFolder(importFolder)

    sendToMain(ToMain.IMPORT2, { channel: "freeshow_project", data })
}

// TEMPLATE

async function importTemplate(files: string[]) {
    sendToMain(ToMain.ALERT, "popup.importing")

    // some .fstemplate files are plain JSON and others are zip
    const zipFiles: string[] = []
    const jsonFiles: string[] = []
    await Promise.all(
        files.map(async (file) => {
            const zip = await isZip(file)
            if (zip) zipFiles.push(file)
            else jsonFiles.push(file)
        })
    )

    const data: FileData[] = await Promise.all(jsonFiles.map(async (file) => await readFile(file)))

    const importFolder = getDataFolderPath("imports", "Templates")

    for (const zipFile of zipFiles) {
        const dataFile = await extractZipDataAndMedia(zipFile, importFolder)
        if (dataFile) data.push(dataFile)
    }

    sendToMain(ToMain.IMPORT2, { channel: "freeshow_template", data })
}

/// ZIP ///

async function extractZipDataAndMedia(filePath: string, importFolder: string) {
    const initialData = await decompressZip([filePath])
    const dataFile = initialData.find((a) => a.name === "data.json")
    if (!dataFile) return

    let content = dataFile.content as string
    const dataContent = JSON.parse(content)

    const filePathMap = new Map<string, string>()
    const replacedMedia: { [key: string]: string } = {}

    dataContent.files?.forEach((rawPath: string) => {
        // check if path already exists on the system
        if (doesPathExist(rawPath)) return

        const extension = upath.extname(rawPath)
        const fileName = upath.basename(rawPath)
        const hashedFileName = `${upath.basename(rawPath, extension)}__${filePathHashCode(rawPath)}${extension}`

        // get file path hash to prevent the same file importing multiple times
        // this also ensures files with the same name don't get overwritten
        const ext = upath.extname(fileName)
        const pathHash = `${upath.basename(rawPath, ext)}_${filePathHashCode(upath.toUnix(rawPath))}${ext}`
        const newMediaPath = upath.join(importFolder, pathHash)

        replacedMedia[rawPath] = newMediaPath

        if (doesPathExist(newMediaPath)) return

        // map input name to output path for file extraction
        filePathMap.set(hashedFileName, newMediaPath)
        filePathMap.set(fileName, newMediaPath)
    })

    // extract files directly to their final paths
    await decompressZipStream(filePath, true, {
        getOutputPath: (fileName: string) => filePathMap.get(fileName)
    })

    // replace files
    const escapeJSON = (value: string) => value.replace(/\\/g, "\\\\")
    Object.entries(replacedMedia).forEach(([oldPath, newPath]) => {
        const windowsPath = oldPath.replace(/\//g, "\\")
        const unixPath = oldPath.replace(/\\/g, "/")
        const escapedWindowsPath = escapeJSON(windowsPath)

        const pathVariants = [oldPath, windowsPath, unixPath, escapedWindowsPath]

        pathVariants.forEach((variant) => {
            // convert \ to \\
            const escapedPattern = variant.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
            const replacementPath = escapeJSON(newPath)
            const regex = new RegExp(escapedPattern, "g")
            content = content.replace(regex, replacementPath)
        })
    })

    dataFile.content = content
    return dataFile
}

// PROTO
// https://greyshirtguy.com/blog/propresenter-7-file-format-part-2/
// https://github.com/greyshirtguy/ProPresenter7-Proto
// https://www.npmjs.com/package/protobufjs

async function decodeProto(filePath: string, fileContent: Buffer | null = null) {
    const dir = join(__dirname, "..", "..", "..", "public", "proto", "presentation.proto")
    const root = await protobufjs.load(dir)

    const Presentation = root.lookupType("Presentation")

    const buffer = fileContent || (await readFileBufferAsync(filePath))
    const message = Presentation.decode(buffer)

    return JSON.stringify(message)
}

async function checkSpecial(file: FileData) {
    if (file.extension === "pro" && Buffer.isBuffer(file.content)) return await decodeProto("", file.content)
    return
}
