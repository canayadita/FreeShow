# FreeShowPlus — Bundled Bible Translations (Phase 2A)

## Goal

Bundle 4 Bible translations (TB, BIS, KJV, NIV) langsung ke dalam FreeShowPlus sehingga tersedia otomatis tanpa import manual atau koneksi internet.

## Architecture

FreeShow menyimpan Bible sebagai file `.fsb` (JSON, format `Bible` interface) di:
`~/Library/Application Support/FreeShow/Bibles/`

Saat startup, Electron membaca semua `.fsb` di folder itu dan mengisi `scriptures` store.

**Strategi: Copy-on-first-run**

Bundled Bible disimpan di `public/bibles/` dalam repo. Saat FreeShowPlus pertama dijalankan, sebuah modul startup (`bundledBibles.ts`) memeriksa apakah keempat file sudah ada di folder Bibles milik user. Yang belum ada akan dicopy otomatis ke sana. Setelah itu, FreeShow membacanya seperti biasa.

## File Structure

```
public/bibles/
  ├── tb.fsb        # Terjemahan Baru (LAI) ~5MB
  ├── bis.fsb       # Bahasa Indonesia Sehari-hari (LAI) ~4MB
  ├── kjv.fsb       # King James Version (Public Domain) ~4MB
  └── niv.fsb       # New International Version (Biblica) ~5MB

scripts/
  └── prepare-bibles.mjs   # Download & convert Zefania XML → .fsb (run once)

src/electron/data/
  └── bundledBibles.ts     # Copy-on-first-run logic

src/electron/
  └── electron.ts (atau main entry)  # Hook bundledBibles ke startup
```

## Data Sources

| Bible | Format Sumber | Repo / URL | Copyright |
|-------|--------------|------------|-----------|
| KJV   | JSON | https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_kjv.json | Public domain |
| NIV   | Zefania XML | Verified saat implementasi script (cari di github.com/Beblia/holy-bible-xml-database atau serupa) | Biblica (personal use) |
| TB    | Zefania XML | Verified saat implementasi script (cari di github.com/alkitab berbasis Zefania format) | LAI (personal use) |
| BIS   | Zefania XML | Verified saat implementasi script (sama dengan TB, beda file) | LAI (personal use) |

## Bible Interface (.fsb format)

```typescript
// src/types/Bible.ts (existing)
interface Bible {
    id?: string
    name: string
    metadata?: { [key: string]: string }
    copyright?: string
    books: {
        number: number
        name: string
        abbreviation?: string
        chapters: {
            number: number
            verses: {
                number: number
                text: string
            }[]
        }[]
    }[]
}
```

## prepare-bibles.mjs — Script Konversi

Script Node.js dijalankan sekali oleh developer (bukan end user):

```
node scripts/prepare-bibles.mjs
```

Yang dilakukan:
1. Download sumber data (JSON/Zefania XML) via `fetch()`
2. Parse ke format `Bible` interface
3. Tulis ke `public/bibles/<name>.fsb` sebagai JSON
4. Output: `✓ tb.fsb (41.236 ayat)`, `✓ kjv.fsb (31.102 ayat)`, dst.

File `.fsb` yang dihasilkan di-commit ke repo sehingga end user tidak perlu jalankan script ini.

## bundledBibles.ts — Copy-on-first-run

```typescript
// Dipanggil saat Electron startup, sebelum window terbuka
export async function installBundledBibles(): Promise<void>
```

Logic:
1. Resolve `bibleFolder = getDataFolderPath("scriptures")`
2. Untuk setiap Bible (`tb`, `bis`, `kjv`, `niv`):
   - Cek apakah `<bibleFolder>/<name>.fsb` sudah ada
   - Jika tidak: copy dari `path.join(process.resourcesPath, "bibles", "<name>.fsb")` (production) atau `path.join(__dirname, "../../../public/bibles/", "<name>.fsb")` (development)
3. Log hasil: `[FreeShowPlus] Bible TB installed.`

## Electron Build Config

Pastikan `public/bibles/*.fsb` dikemas ke dalam app bundle. Di `electron-builder` config, tambahkan ke `extraResources`:

```json
{
  "extraResources": [
    { "from": "public/bibles", "to": "bibles", "filter": ["*.fsb"] }
  ]
}
```

## Startup Hook

Di electron main entry, tambahkan:

```typescript
import { installBundledBibles } from "./data/bundledBibles"

app.whenReady().then(async () => {
    await installBundledBibles()
    // ... existing startup code ...
})
```

## Success Criteria

- [ ] Buka FreeShowPlus fresh install → buka panel Scripture → 4 Bible tersedia
- [ ] TB: 66 kitab, ayat lengkap (Kejadian — Wahyu) dalam Bahasa Indonesia
- [ ] BIS: 66 kitab, ayat lengkap dalam Bahasa Indonesia sehari-hari
- [ ] KJV: 66 kitab, ayat lengkap King James English
- [ ] NIV: 66 kitab, ayat lengkap New International Version
- [ ] Tidak perlu internet saat pertama buka
- [ ] Tidak crash jika folder Bibles belum exist (auto-create)
- [ ] Tidak overwrite jika user sudah punya Bible dengan nama sama

## Catatan Copyright

Untuk personal/church use:
- **KJV**: Public domain — bebas tanpa syarat
- **NIV**: © Biblica — boleh dipakai untuk non-commercial/personal worship
- **TB**: © LAI — boleh dipakai untuk keperluan ibadah gereja
- **BIS**: © LAI — idem

Tampilkan `copyright` field di panel Scripture sebagai attribution.
