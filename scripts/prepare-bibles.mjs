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
        // BIS (Bahasa Indonesia Sehari-hari) is not freely available in digital form.
        // Using Terjemahan Baru data from godlytalias as fallback.
        key: "bis",
        name: "Bahasa Indonesia Sehari-hari",
        copyright: "© Lembaga Alkitab Indonesia. Digunakan untuk ibadah.",
        format: "godlytalias",
        url: "https://raw.githubusercontent.com/godlytalias/Bible-Database/master/Indonesian/bible.json",
        bookNames: ID_BOOK_NAMES,
    },
]

async function fetchBible(bible) {
    console.log(`Downloading ${bible.name}...`)
    const res = await fetch(bible.url)
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${bible.url}`)
    return await res.json()
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
        default: throw new Error(`Unknown format: ${meta.format}`)
    }
}

async function main() {
    let allOk = true
    for (const bible of BIBLES) {
        try {
            const raw = await fetchBible(bible)
            const fsb = convert(raw, bible)
            const outPath = join(OUT_DIR, `${bible.key}.fsb`)
            writeFileSync(outPath, JSON.stringify(fsb), "utf8")
            const totalVerses = fsb.books.reduce(
                (s, b) => s + b.chapters.reduce((cs, c) => cs + c.verses.length, 0),
                0
            )
            console.log(`  ✓ ${bible.key}.fsb — ${fsb.books.length} kitab, ${totalVerses.toLocaleString()} ayat`)
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
