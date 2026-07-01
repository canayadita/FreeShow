# Bundled Bible Translations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bundle TB, BIS, KJV, dan NIV sebagai file `.fsb` di dalam app sehingga tersedia otomatis tanpa import manual atau internet.

**Architecture:** Script Node.js men-download JSON Bible dari GitHub (thiagobodruk/bible), mengkonversi ke format FreeShow `.fsb`, dan menyimpan ke `public/bibles/`. Saat Electron startup, `bundledBibles.ts` mengcopy file yang belum ada ke folder Bibles milik user (`~/Library/Application Support/FreeShow/Bibles/`).

**Tech Stack:** Node.js ESM script, Electron (index.ts), TypeScript, FreeShow `Bible` interface, `getDataFolderPath` util

---

## File Map

| File | Status | Tanggung Jawab |
|------|--------|----------------|
| `scripts/prepare-bibles.mjs` | Create | Download & konversi 4 Bible ke `.fsb` — dijalankan sekali oleh developer |
| `public/bibles/kjv.fsb` | Generate | King James Version JSON |
| `public/bibles/niv.fsb` | Generate | New International Version JSON |
| `public/bibles/tb.fsb` | Generate | Terjemahan Baru (LAI) JSON |
| `public/bibles/bis.fsb` | Generate | Bahasa Indonesia Sehari-hari JSON |
| `src/electron/data/bundledBibles.ts` | Create | Copy-on-first-run: install bundled bibles ke user data folder |
| `src/electron/index.ts` | Modify | Hook `installBundledBibles()` ke startup sequence |
| `config/building/electron-builder.yaml` | Modify | Pastikan `public/bibles/` masuk ke app bundle |

---

## Task 1: Buat Script Konversi `scripts/prepare-bibles.mjs`

**Files:**
- Create: `scripts/prepare-bibles.mjs`

Sumber data semua 4 Bible dari repo **thiagobodruk/bible** (format JSON, satu file per terjemahan):
- KJV: `https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_kjv.json`
- NIV: `https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_niv.json`
- TB:  `https://raw.githubusercontent.com/thiagobodruk/bible/master/json/id_tb.json`
- BIS: `https://raw.githubusercontent.com/thiagobodruk/bible/master/json/id_bis.json`

Format JSON sumber (thiagobodruk):
```json
[
  {
    "abbrev": "gn",
    "book": "Genesis",
    "chapters": [
      ["In the beginning God created..."],
      ["And the earth was without form..."]
    ]
  }
]
```

Format target FreeShow `.fsb` (JSON sesuai `Bible` interface di `src/types/Bible.ts`):
```json
{
  "name": "King James Version",
  "copyright": "Public Domain",
  "books": [
    {
      "number": 1,
      "name": "Genesis",
      "abbreviation": "Gen",
      "chapters": [
        {
          "number": 1,
          "verses": [
            { "number": 1, "text": "In the beginning God created..." }
          ]
        }
      ]
    }
  ]
}
```

- [ ] **Step 1.1: Buat folder scripts jika belum ada**

```bash
mkdir -p scripts public/bibles
```

- [ ] **Step 1.2: Buat scripts/prepare-bibles.mjs**

Buat file `scripts/prepare-bibles.mjs`:

```mjs
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

// Book abbreviations in order (1=Genesis ... 66=Revelation)
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
```

- [ ] **Step 1.3: Verifikasi script bisa dijalankan (dry-run check syntax)**

```bash
node --input-type=module --eval "import('./scripts/prepare-bibles.mjs')" 2>&1 | head -5 || node scripts/prepare-bibles.mjs --help 2>&1 | head -3
```

Expected: no syntax errors (script akan langsung jalan dan download, jadi cancel dengan Ctrl+C setelah 1-2 detik jika hanya ingin cek syntax)

---

## Task 2: Jalankan Script, Generate .fsb Files, Commit

**Files:**
- Generate: `public/bibles/kjv.fsb`
- Generate: `public/bibles/niv.fsb`
- Generate: `public/bibles/tb.fsb`
- Generate: `public/bibles/bis.fsb`

- [ ] **Step 2.1: Jalankan script**

```bash
node scripts/prepare-bibles.mjs
```

Expected output:
```
Downloading King James Version...
  ✓ kjv.fsb — 66 kitab, 31,102 ayat
Downloading New International Version...
  ✓ niv.fsb — 66 kitab, 31,102 ayat
Downloading Terjemahan Baru...
  ✓ tb.fsb — 66 kitab, 31,102 ayat
Downloading Bahasa Indonesia Sehari-hari...
  ✓ bis.fsb — 66 kitab, 31,102 ayat

Selesai! File tersimpan di public/bibles/
```

> **Jika salah satu URL gagal (404):** Cek ketersediaan file di https://github.com/thiagobodruk/bible/tree/master/json — cari file dengan nama mirip (contoh: `id_tb.json` mungkin bernama `tb.json`). Update URL di script dan jalankan ulang.

- [ ] **Step 2.2: Verifikasi isi .fsb files**

```bash
# Check KJV has 66 books and Genesis chapter 1 verse 1
node -e "const b=JSON.parse(require('fs').readFileSync('public/bibles/kjv.fsb','utf8')); console.log('Books:', b.books.length, '| Gen 1:1:', b.books[0].chapters[0].verses[0].text.slice(0,40))"

# Check TB has Indonesian text
node -e "const b=JSON.parse(require('fs').readFileSync('public/bibles/tb.fsb','utf8')); console.log('TB name:', b.name, '| Kej 1:1:', b.books[0].chapters[0].verses[0].text.slice(0,40))"
```

Expected:
```
Books: 66 | Gen 1:1: In the beginning God created the heaven
TB name: Terjemahan Baru | Kej 1:1: Pada mulanya Allah menciptakan langit
```

- [ ] **Step 2.3: Check ukuran file wajar**

```bash
ls -lh public/bibles/
```

Expected: setiap file antara 3MB–7MB.

- [ ] **Step 2.4: Commit**

```bash
git add scripts/prepare-bibles.mjs public/bibles/
git commit -m "feat: add Bible preparation script and bundled TB/BIS/KJV/NIV .fsb files"
```

---

## Task 3: Buat `bundledBibles.ts` — Copy-on-first-run

**Files:**
- Create: `src/electron/data/bundledBibles.ts`

- [ ] **Step 3.1: Cek getDataFolderPath signature**

```bash
grep -n "export function getDataFolderPath\|dataFolderNames" src/electron/utils/files.ts | head -5
```

Expected: `export function getDataFolderPath(id: keyof typeof dataFolderNames, subfolder?: string)`

- [ ] **Step 3.2: Buat src/electron/data/bundledBibles.ts**

```typescript
import { existsSync, mkdirSync, copyFileSync, readdirSync } from "fs"
import path from "path"
import { getDataFolderPath } from "../utils/files"

const BUNDLED_BIBLES = [
    { file: "kjv.fsb", label: "KJV" },
    { file: "niv.fsb", label: "NIV" },
    { file: "tb.fsb",  label: "Terjemahan Baru" },
    { file: "bis.fsb", label: "BIS" },
]

function getBiblesSourceDir(): string {
    // In both dev and production, compiled electron files are at build/electron/
    // public/bibles/ is two levels up from build/electron/
    return path.join(__dirname, "../../public/bibles")
}

export function installBundledBibles(): void {
    const bibleFolder = getDataFolderPath("scriptures")
    const sourceDir = getBiblesSourceDir()

    if (!existsSync(sourceDir)) {
        console.warn("[FreeShowPlus] Bundled bibles source dir not found:", sourceDir)
        return
    }

    if (!existsSync(bibleFolder)) {
        mkdirSync(bibleFolder, { recursive: true })
    }

    // Collect existing bible names to avoid overwriting user-imported bibles with same name
    const existing = new Set(
        existsSync(bibleFolder)
            ? readdirSync(bibleFolder).map((f) => f.toLowerCase())
            : []
    )

    for (const bible of BUNDLED_BIBLES) {
        const dest = path.join(bibleFolder, bible.file)
        if (existing.has(bible.file.toLowerCase())) {
            console.info(`[FreeShowPlus] Bible already installed: ${bible.label}`)
            continue
        }
        const src = path.join(sourceDir, bible.file)
        if (!existsSync(src)) {
            console.warn(`[FreeShowPlus] Bundled Bible source not found: ${src}`)
            continue
        }
        try {
            copyFileSync(src, dest)
            console.info(`[FreeShowPlus] Bible installed: ${bible.label}`)
        } catch (err) {
            console.error(`[FreeShowPlus] Failed to install ${bible.label}:`, err)
        }
    }
}
```

- [ ] **Step 3.3: Verifikasi TypeScript compile**

```bash
npx tsc --noEmit --project config/typescript/tsconfig.electron.json 2>&1 | grep "bundledBibles\|getDataFolderPath" | head -10
```

Expected: no errors terkait file baru.

- [ ] **Step 3.4: Commit**

```bash
git add src/electron/data/bundledBibles.ts
git commit -m "feat: add installBundledBibles copy-on-first-run function"
```

---

## Task 4: Hook ke Electron Startup

**Files:**
- Modify: `src/electron/index.ts`

- [ ] **Step 4.1: Cek lokasi hook yang tepat di index.ts**

```bash
grep -n "setupStores\|createMain\|cleanupProtected\|installBundled" src/electron/index.ts | head -10
```

Lokasi ideal: setelah `await setupStores()` (line ~110) dan sebelum `createMain()`.

- [ ] **Step 4.2: Tambah import di atas file**

Di `src/electron/index.ts`, tambahkan import setelah import-import yang sudah ada:

```typescript
import { installBundledBibles } from "./data/bundledBibles"
```

- [ ] **Step 4.3: Tambah call di startApp()**

Di dalam `async function startApp()`, setelah baris `await setupStores()`, tambahkan:

```typescript
await setupStores()

// FreeShowPlus: install bundled Bible translations on first run
installBundledBibles()
```

- [ ] **Step 4.4: Verifikasi TypeScript compile**

```bash
npx tsc --noEmit --project config/typescript/tsconfig.electron.json 2>&1 | grep -E "error|bundledBibles" | head -10
```

Expected: no new errors.

- [ ] **Step 4.5: Commit**

```bash
git add src/electron/index.ts
git commit -m "feat: auto-install bundled Bibles on FreeShowPlus startup"
```

---

## Task 5: Verifikasi Electron-Builder Bundle Config

**Files:**
- Modify: `config/building/electron-builder.yaml` (jika diperlukan)

- [ ] **Step 5.1: Cek apakah public/bibles sudah dicakup**

```bash
grep -A5 "^files:" config/building/electron-builder.yaml | head -10
```

Expected: `- public/**` sudah ada. Jika ya, `public/bibles/*.fsb` akan otomatis masuk bundle — **skip Step 5.2**.

- [ ] **Step 5.2: (Hanya jika public/** tidak ada) Tambah ke files**

Jika `public/**` tidak ada di `files:` section, tambahkan:

```yaml
files:
    - build/electron/**
    - build/types/**
    - public/**          # ← tambahkan ini jika belum ada
    - node_modules/...
```

- [ ] **Step 5.3: Verifikasi dengan build development**

```bash
npm run build 2>&1 | tail -10
```

Expected: build selesai tanpa error.

- [ ] **Step 5.4: Commit jika ada perubahan**

```bash
# Hanya jika Step 5.2 dilakukan:
git add config/building/electron-builder.yaml
git commit -m "chore: ensure public/bibles included in electron bundle"
```

---

## Task 6: End-to-End Test

- [ ] **Step 6.1: Jalankan app**

```bash
npm start
```

Tunggu app terbuka sepenuhnya (~30 detik pertama kali).

- [ ] **Step 6.2: Verifikasi Bible terinstall di filesystem**

```bash
ls -la ~/Library/"Application Support"/FreeShow/Bibles/
```

Expected:
```
kjv.fsb
niv.fsb
tb.fsb
bis.fsb
```

- [ ] **Step 6.3: Verifikasi isi file yang tercopy**

```bash
node -e "const b=JSON.parse(require('fs').readFileSync(process.env.HOME+'/Library/Application Support/FreeShow/Bibles/tb.fsb','utf8')); console.log(b.name,'|',b.books.length,'kitab | Kej 1:1:',b.books[0].chapters[0].verses[0].text.slice(0,50))"
```

Expected: `Terjemahan Baru | 66 kitab | Kej 1:1: Pada mulanya Allah menciptakan langit dan bumi.`

- [ ] **Step 6.4: Cek terminal console untuk log instalasi**

Di terminal `npm start`, cari:
```
[FreeShowPlus] Bible installed: KJV
[FreeShowPlus] Bible installed: NIV
[FreeShowPlus] Bible installed: Terjemahan Baru
[FreeShowPlus] Bible installed: BIS
```

- [ ] **Step 6.5: Cek di panel Scripture FreeShow**

Di dalam app:
1. Klik ikon Alkitab/Scripture di sidebar kiri
2. Pastikan ada dropdown/pilihan: King James Version, New International Version, Terjemahan Baru, Bahasa Indonesia Sehari-hari
3. Cari ayat (contoh: Yohanes 3:16) dalam TB — verifikasi teks Indonesia muncul

- [ ] **Step 6.6: Test idempotency (restart tidak duplikat)**

Tutup dan buka kembali app. Cek terminal:
```
[FreeShowPlus] Bible already installed: KJV
[FreeShowPlus] Bible already installed: NIV
...
```

Pastikan tidak ada duplikasi di `~/Library/Application Support/FreeShow/Bibles/`.

- [ ] **Step 6.7: Commit final & push**

```bash
git push origin main
```

---

## Troubleshooting

### URL 404 saat prepare-bibles.mjs

Jika `id_tb.json` atau `id_bis.json` tidak ditemukan di thiagobodruk/bible:

1. Cek daftar file: `curl -s https://api.github.com/repos/thiagobodruk/bible/contents/json | python3 -c "import sys,json; [print(f['name']) for f in json.load(sys.stdin)]"`
2. Gunakan nama file yang sesuai
3. Fallback TB: https://raw.githubusercontent.com/rwibawa/alkitab/master/android/assets/tb.json
4. Fallback BIS: cari di github.com dengan query "alkitab bis zefania json"

### Bible tidak muncul di panel FreeShow setelah install

FreeShow membaca Bibles dari disk saat startup, bukan real-time. Pastikan:
1. Log `[FreeShowPlus] Bible installed: ...` muncul
2. File ada di `~/Library/Application Support/FreeShow/Bibles/`
3. Restart app

### getDataFolderPath tidak bisa diimport

Jika ada circular import error, gunakan:
```typescript
import { app } from "electron"
import path from "path"
const bibleFolder = path.join(app.getPath("userData"), "Bibles")
```
