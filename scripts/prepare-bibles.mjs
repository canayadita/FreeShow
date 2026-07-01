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

const BIBLES = [
    {
        key: "kjv",
        name: "King James Version",
        copyright: "Public Domain",
        url: "https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_kjv.json",
    },
    {
        key: "niv",
        name: "New International Version",
        copyright: "© 2011 Biblica, Inc. Used for personal worship.",
        url: "https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_niv.json",
    },
    {
        key: "tb",
        name: "Terjemahan Baru",
        copyright: "© Lembaga Alkitab Indonesia. Digunakan untuk ibadah.",
        url: "https://raw.githubusercontent.com/thiagobodruk/bible/master/json/id_tb.json",
    },
    {
        key: "bis",
        name: "Bahasa Indonesia Sehari-hari",
        copyright: "© Lembaga Alkitab Indonesia. Digunakan untuk ibadah.",
        url: "https://raw.githubusercontent.com/thiagobodruk/bible/master/json/id_bis.json",
    },
]

const ABBREVS = [
    "Gen","Exo","Lev","Num","Deu","Jos","Jdg","Rut","1Sa","2Sa",
    "1Ki","2Ki","1Ch","2Ch","Ezr","Neh","Est","Job","Psa","Pro",
    "Ecc","Sng","Isa","Jer","Lam","Eze","Dan","Hos","Joe","Amo",
    "Oba","Jon","Mic","Nah","Hab","Zep","Hag","Zec","Mal",
    "Mat","Mar","Luk","Joh","Act","Rom","1Co","2Co","Gal","Eph",
    "Php","Col","1Th","2Th","1Ti","2Ti","Tit","Phm","Heb","Jam",
    "1Pe","2Pe","1Jo","2Jo","3Jo","Jud","Rev"
]

async function fetchBible(bible) {
    console.log(`Downloading ${bible.name}...`)
    const res = await fetch(bible.url)
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${bible.url}`)
    return await res.json()
}

function convert(rawBooks, meta) {
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

    return {
        name: meta.name,
        copyright: meta.copyright,
        books,
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
