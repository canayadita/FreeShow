# Typography Preset Drag & Drop ke Slide + Preset Baru

**Tanggal:** 2026-07-09

## Masalah

Preset di drawer tab Typography hanya bisa di-drop ke `Editbox` (mode Edit) karena
memakai HTML5 drag native (`dataTransfer`). Area slide di tampilan Show memakai
sistem drag-drop custom FreeShow (`SelectElem` + `DropArea` + store `selected`),
yang tidak mengenali drag dari panel Typography — drop diabaikan tanpa pesan.

## Solusi

### 1. Drag preset → slide (tampilan Show)

- `Typography.svelte` `onDragStart`: set juga store `selected` dengan
  `{ id: "text_preset", data: [{ presetId }] }` supaya sistem drop custom mengenalinya.
- `types/Main.ts`: tambah `"text_preset"` ke union `SelectIds`.
- `helpers/drop.ts`: tambah `"text_preset"` ke `areas.slides` (drop area jadi aktif +
  highlight saat drag).
- `helpers/dropActions.ts`: tambah handler `slideDrop.text_preset`:
  - Target = slide pada `drop.index` (via `getLayoutRef()`).
  - Terapkan ke **semua text item** di slide itu (keputusan user).
  - Simpan `animationConfig` preset + merge `lineStyle`/`textStyle` ke `item.style`
    per item lewat history `setItems` (undo-able).
  - Toast sukses/gagal (slide terkunci, tidak ada text item, drop di luar slide).
- `edit/scripts/textStyle.ts`: tambah util `mergeStyleStrings(oldStyle, cssString)`
  (logika sama dengan yang duplikat di Typography.svelte & Editbox.svelte).

Animasi sudah mengalir ke output (`SlideContent` → `Textbox` → `TextboxLines`),
jadi setelah config tersimpan, animasi otomatis jalan saat slide diklik/ditayangkan.

### 2. Preset baru yang fresh (~10)

Tipe animasi entrance baru (`types/animation.ts` + keyframes `public/global.css` +
opsi di `AnimationPicker.svelte`):
`popIn` (spring), `flipIn` (3D), `blurIn`, `trackingIn` (letter-spacing), `glitchIn`.

Tipe background loop baru: `gradientSweep` (gradient text sweep, warna bisa
dikustom via CSS var `--grad-1/2/3`), `glitch` (burst berkala), `chromatic`
(aberasi merah/cyan).

Kategori baru `modern` di `textPresets.ts`. Preset baru: Kinetic Pop, Spring
Cascade, Flip 3D, Blur Reveal, Luxe Tracking, Aurora Flow, Sunset Glow,
Glitch Core, Chromatic VHS, Neon Trace.

## Verifikasi

- Type check / build lolos.
- Drag preset dari drawer Typography ke slide thumbnail di Show view → style +
  animationConfig tersimpan di semua text item slide, toast muncul.
- Klik slide → output menampilkan animasi.
