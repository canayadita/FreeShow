#!/usr/bin/env node
// FreeShowPlus Bible Preparation Script
// Run: node scripts/prepare-bibles.mjs
// Output: public/bibles/{kjv,niv,tb,bis}.fsb

import { writeFileSync, mkdirSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, "../public/bibles")
mkdirSync(OUT_DIR, { recursive: true })

const ABBREVS = [
    "Gen","Exo","Lev","Num","Deu","Jos","Jdg","Rut","1Sa","2Sa",
    "1Ki","2Ki","1Ch","2Ch","Ezr","Neh","Est","Job","Psa","Pro",
    "Ecc","Sng","Isa","Jer","Lam","Eze","Dan","Hos","Joe","Amo",
    "Oba","Jon","Mic","Nah","Hab","Zep","Hag","Zec","Mal",
    "Mat","Mar","Luk","Joh","Act","Rom","1Co","2Co","Gal","Eph",
    "Php","Col","1Th","2Th","1Ti","2Ti","Tit","Phm","Heb","Jam",
    "1Pe","2Pe","1Jo","2Jo","3Jo","Jud","Rev"
]

// Indonesian book names in canonical Bible order (OT then NT)
const ID_BOOK_NAMES = [
    "Kejadian","Keluaran","Imamat","Bilangan","Ulangan",
    "Yosua","Hakim-hakim","Rut","1 Samuel","2 Samuel",
    "1 Raja-raja","2 Raja-raja","1 Tawarikh","2 Tawarikh","Ezra",
    "Nehemia","Ester","Ayub","Mazmur","Amsal",
    "Pengkhotbah","Kidung Agung","Yesaya","Yeremia","Ratapan",
    "Yehezkiel","Daniel","Hosea","Yoel","Amos",
    "Obaja","Yunus","Mikha","Nahum","Habakuk",
    "Zefanya","Hagai","Zakharia","Maleakhi",
    "Matius","Markus","Lukas","Yohanes","Kisah Para Rasul",
    "Roma","1 Korintus","2 Korintus","Galatia","Efesus",
    "Filipi","Kolose","1 Tesalonika","2 Tesalonika","1 Timotius",
    "2 Timotius","Titus","Filemon","Ibrani","Yakobus",
    "1 Petrus","2 Petrus","1 Yohanes","2 Yohanes","3 Yohanes",
    "Yudas","Wahyu"
]

const BIBLES = [
    {
        key: "kjv",
        name: "King James Version",
        copyright: "Public Domain",
        format: "thiagobodruk",
        url: "https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_kjv.json",
    },
    {
        // NIV is copyrighted and not available in public repos.
        // Using World English Bible (public domain modern English) as substitute.
        key: "niv",
        name: "World English Bible",
        copyright: "Public Domain",
        format: "getbible",
        url: "https://api.getbible.net/v2/web.json",
    },
    {
        key: "tb",
        name: "Terjemahan Baru",
        copyright: "© Lembaga Alkitab Indonesia. Digunakan untuk ibadah.",
        format: "godlytalias",
        url: "https://raw.githubusercontent.com/godlytalias/Bible-Database/master/Indonesian/bible.json",
        bookNames: ID_BOOK_NAMES,
    },
    {
        // Real BIS text fetched chapter-by-chapter from the public SABDA API.
        key: "bis",
        name: "Bahasa Indonesia Sehari-hari",
        fileName: "Bahasa Indonesia Sehari-hari.fsb",
        copyright: "© Lembaga Alkitab Indonesia. Digunakan untuk ibadah.",
        format: "sabda",
        version: "bis",
        bookNames: ID_BOOK_NAMES,
        bundledRevision: 3,
    },
]

async function fetchBible(bible) {
    console.log(`Downloading ${bible.name}...`)
    if (bible.format === "sabda") return await fetchSabda(bible)
    const res = await fetch(bible.url)
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${bible.url}`)
    return await res.json()
}

// SABDA public API (alkitab.sabda.org) - fetches one chapter at a time
const SABDA_CHAPTER_URL = "https://alkitab.sabda.org/api/chapter.php"
const SABDA_DELAY_MS = 100

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

function decodeEntities(text) {
    return text
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#0?39;/g, "'")
        .replace(/&apos;/g, "'")
        .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
        .replace(/&amp;/g, "&")
}

function parseSabdaChapter(xml) {
    const chapterCount = Number(xml.match(/<chapter_count>(\d+)<\/chapter_count>/)?.[1] || 0)
    const verses = []
    for (const verseXml of xml.matchAll(/<verse>([\s\S]*?)<\/verse>/g)) {
        const number = Number(verseXml[1].match(/<number>(\d+)<\/number>/)?.[1] || 0)
        const rawText = verseXml[1].match(/<text>([\s\S]*?)<\/text>/)?.[1] || ""
        // strip nested tags (e.g. pericope titles are separate <title> elements, but be safe)
        const text = decodeEntities(rawText.replace(/<[^>]*>/g, "")).trim()
        if (number > 0 && text) verses.push({ number, text })
    }
    return { chapterCount, verses }
}

async function fetchSabdaChapter(bookNumber, chapterNumber, version, attempt = 1) {
    const url = `${SABDA_CHAPTER_URL}?book=${bookNumber}&chapter=${chapterNumber}&version=${version}`
    try {
        const res = await fetch(url)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return parseSabdaChapter(await res.text())
    } catch (err) {
        if (attempt >= 3) throw new Error(`${url} -> ${err.message}`)
        await sleep(1000 * attempt)
        return fetchSabdaChapter(bookNumber, chapterNumber, version, attempt + 1)
    }
}

async function fetchSabda(bible) {
    const books = []
    for (let bookNumber = 1; bookNumber <= 66; bookNumber++) {
        const first = await fetchSabdaChapter(bookNumber, 1, bible.version)
        if (!first.verses.length) throw new Error(`Book ${bookNumber}: no verses returned`)

        const chapters = [{ number: 1, verses: first.verses }]
        for (let c = 2; c <= first.chapterCount; c++) {
            await sleep(SABDA_DELAY_MS)
            const chapter = await fetchSabdaChapter(bookNumber, c, bible.version)
            if (!chapter.verses.length) throw new Error(`Book ${bookNumber} chapter ${c}: no verses returned`)
            chapters.push({ number: c, verses: chapter.verses })
        }

        books.push({
            number: bookNumber,
            name: bible.bookNames[bookNumber - 1] ?? `Book ${bookNumber}`,
            abbreviation: ABBREVS[bookNumber - 1] ?? "",
            chapters,
        })
        console.log(`  ${bible.bookNames[bookNumber - 1]} (${chapters.length} pasal) ✓`)
        await sleep(SABDA_DELAY_MS)
    }
    return { name: bible.name, copyright: bible.copyright, books }
}

// BIS (like the printed edition) merges verse ranges into one block; SABDA returns
// "(c:v)" placeholders for the merged continuation verses. Collapse them into the
// anchor verse with endNumber, so it renders as e.g. "5-16" with the combined text.
function mergeContinuationVerses(books) {
    for (const book of books) {
        for (const chapter of book.chapters) {
            const continuations = new Map() // anchor verse number -> highest continuation number
            const kept = []

            for (const verse of chapter.verses) {
                const marker = verse.text.trim().match(/^\((\d+):(\d+)(?:-\d+)?\)$/)
                if (marker && Number(marker[1]) === Number(chapter.number)) {
                    const anchor = Number(marker[2])
                    continuations.set(anchor, Math.max(continuations.get(anchor) || 0, verse.number))
                    continue
                }
                kept.push(verse)
            }

            for (const [anchor, end] of continuations) {
                const anchorVerse = kept.find((v) => v.number === anchor)
                if (anchorVerse && end > anchorVerse.number) anchorVerse.endNumber = end
            }
            chapter.verses = kept
        }
    }
    return books
}

function convertSabda(raw) {
    return { ...raw, books: mergeContinuationVerses(raw.books) }
}

// Converter for thiagobodruk format: [{book, chapters: string[][]}]
function convertThiagobodruk(rawBooks, meta) {
    const books = rawBooks.map((rawBook, idx) => ({
        number: idx + 1,
        name: rawBook.book,
        abbreviation: ABBREVS[idx] ?? "",
        chapters: rawBook.chapters.map((rawChapter, cIdx) => ({
            number: cIdx + 1,
            verses: rawChapter.map((text, vIdx) => ({
                number: vIdx + 1,
                text: String(text).trim(),
            })),
        })),
    }))
    return { name: meta.name, copyright: meta.copyright, books }
}

// Converter for getbible.net format: {books: [{name, chapters: [{verses: [{text}]}]}]}
function convertGetbible(raw, meta) {
    const books = raw.books.map((rawBook, idx) => ({
        number: idx + 1,
        name: rawBook.name,
        abbreviation: ABBREVS[idx] ?? "",
        chapters: rawBook.chapters.map((rawChapter, cIdx) => ({
            number: cIdx + 1,
            verses: rawChapter.verses.map((v, vIdx) => ({
                number: vIdx + 1,
                text: String(v.text).trim(),
            })),
        })),
    }))
    return { name: meta.name, copyright: meta.copyright, books }
}

// Converter for godlytalias format: {Book: [{Chapter: [{Verse: [{Verseid, Verse}]}]}]}
// Book names must be supplied via meta.bookNames (not embedded in this source format).
function convertGodlytalias(raw, meta) {
    const books = raw.Book.map((rawBook, idx) => ({
        number: idx + 1,
        name: meta.bookNames[idx] ?? `Book ${idx + 1}`,
        abbreviation: ABBREVS[idx] ?? "",
        chapters: rawBook.Chapter.map((rawChapter, cIdx) => ({
            number: cIdx + 1,
            verses: rawChapter.Verse.map((v, vIdx) => ({
                number: vIdx + 1,
                // Remove stray leading/trailing quote characters from source data
                text: String(v.Verse).trim().replace(/^"|"$/g, "").trim(),
            })),
        })),
    }))
    return { name: meta.name, copyright: meta.copyright, books }
}

function convert(raw, meta) {
    switch (meta.format) {
        case "thiagobodruk": return convertThiagobodruk(raw, meta)
        case "getbible":     return convertGetbible(raw, meta)
        case "godlytalias":  return convertGodlytalias(raw, meta)
        case "sabda":        return convertSabda(raw)
        default: throw new Error(`Unknown format: ${meta.format}`)
    }
}

async function main() {
    // optional filter: node scripts/prepare-bibles.mjs bis
    const onlyKeys = process.argv.slice(2)
    const biblesToProcess = onlyKeys.length ? BIBLES.filter((b) => onlyKeys.includes(b.key)) : BIBLES

    let allOk = true
    for (const bible of biblesToProcess) {
        try {
            const raw = await fetchBible(bible)
            const fsb = convert(raw, bible)
            if (bible.bundledRevision) fsb.bundledRevision = bible.bundledRevision

            // FreeShow bundle format: [id, { name, copyright, books }]
            const fileName = bible.fileName || `${bible.key}.fsb`
            const outPath = join(OUT_DIR, fileName)
            writeFileSync(outPath, JSON.stringify([bible.key, fsb]), "utf8")

            const totalVerses = fsb.books.reduce(
                (s, b) => s + b.chapters.reduce((cs, c) => cs + c.verses.length, 0),
                0
            )
            console.log(`  ✓ ${fileName} — ${fsb.books.length} kitab, ${totalVerses.toLocaleString()} ayat`)
        } catch (err) {
            console.error(`  ✗ ${bible.key}: ${err.message}`)
            allOk = false
        }
    }
    if (!allOk) {
        console.error("\nBeberapa Bible gagal didownload. Cek URL di atas.")
        process.exit(1)
    }
    console.log("\nSelesai! File tersimpan di public/bibles/")
}

main()
