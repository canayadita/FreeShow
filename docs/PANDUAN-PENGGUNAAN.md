# Panduan Penggunaan FreeShow+

Panduan ini menjelaskan **fitur-fitur tambahan khusus FreeShow+** (di atas FreeShow asli). Untuk fitur dasar FreeShow (membuat show, slide, output, dll), lihat dokumentasi resmi di https://freeshow.app/docs.

> Versi: 1.6.4-plus.6 ke atas · Bahasa: Indonesia (versi Inggris: `USER-GUIDE.md`)

## Daftar Isi
1. [Animasi Teks & Preset Tipografi](#1-animasi-teks--preset-tipografi)
2. [Picture-in-Picture (PiP) / Multi-Pane](#2-picture-in-picture-pip--multi-pane)
3. [Efek 3D & Drag-Scrub pada Pane](#3-efek-3d--drag-scrub-pada-pane)
4. [Stage Slide Preview](#4-stage-slide-preview)
5. [Song Sequence (Auto-Lirik dari MP3)](#5-song-sequence-auto-lirik-dari-mp3)
6. [Streaming YouTube / RTMP](#6-streaming-youtube--rtmp)
7. [Overlay Lower-Third & Template PiP](#7-overlay-lower-third--template-pip)
8. [Blend Mode Background](#8-blend-mode-background)
9. [Import PowerPoint (PPT/PPTX)](#9-import-powerpoint-pptpptx)
10. [Alkitab Bundled & Pencarian Ayat](#10-alkitab-bundled--pencarian-ayat)
11. [Auto-Update](#11-auto-update)

---

## 1. Animasi Teks & Preset Tipografi

FreeShow+ menambahkan sistem animasi teks per-item slide dan preset tipografi siap pakai.

**Animasi teks:**
1. Buka **Edit** pada sebuah slide, pilih item teks.
2. Buka panel animasi (AnimationPicker) pada item.
3. Pilih **Entrance** (animasi masuk, mis. fade, shakeIn, comicPop, kapow, neonFlash) dan/atau **Loop** (animasi berulang, mis. pulse, heartbeat, disco, sparkle).
4. Atur durasi, easing, dan delay bila perlu.
5. Opsional: tambahkan **Dekorasi** (underline, highlight, box, circle, rays, dll) yang muncul setelah animasi masuk selesai.

**Preset tipografi:**
1. Buka tab **Typography** di panel bawah.
2. Pilih preset dari daftar (ada kategori, termasuk gaya "sketch").
3. **Drag** preset ke slide di tampilan **Show** untuk menerapkan gaya ke semua item teks slide tersebut.

---

## 2. Picture-in-Picture (PiP) / Multi-Pane

Menampilkan beberapa sumber (slide, kamera, layar, video, gambar, dll) sekaligus dalam satu output.

**Membuat layout PiP:**
1. Buka tab **Picture-in-Picture** di panel bawah.
2. Pilih template PiP yang tersedia, atau klik **Buat Manual** untuk mulai dari 1 pane slide.
3. Klik **Tambah Pane** untuk menambah pane.

**Mengatur pane:**
- **Source Type:** pilih sumber pane — Slide, Camera, Screen, NDI, Blackmagic, Video, Image, Player, atau Transparent.
- **Import gambar/video:** jika Source Type = **Image** atau **Video**, muncul tombol **Import** untuk memilih file (gambar tampil dengan preview thumbnail).
- **Posisi & ukuran:** atur **X, Y, Lebar, Tinggi** (dalam %). Bisa diketik atau **klik-seret** angkanya (lihat bagian 3).
- **Bentuk:** Radius sudut, Layer (z-index), dan tombol **Shadow**.
- **Crop / Zoom** (khusus pane Slide): `0` = slide tampil penuh (mungkin ada bar hitam), naikkan untuk zoom & memotong tepi agar mengisi pane.
- Pane bisa **digeser** dan **di-resize** langsung dari sudut kanan-bawah di editor.

**Mengaktifkan di output:** aktifkan layout PiP; saat slide ditampilkan, pane slide otomatis menampilkan slide yang aktif.

**Simpan template:** beri nama di kolom "Nama template" lalu **Simpan Template** untuk memakainya lagi nanti.

---

## 3. Efek 3D & Drag-Scrub pada Pane

**Efek 3D (miring statis):** pada tiap pane PiP tersedia dua kontrol:
- **Putar ↔ (Y):** memutar pane kiri-kanan seperti pintu terbuka.
- **Dongak ↕ (X):** memiringkan pane atas-bawah.
- Rentang −85° s/d 85°. Isi pane (slide/kamera/gambar) ikut miring.

**Drag-scrub (ubah angka cepat):** semua input angka pane (X, Y, Lebar, Tinggi, Radius, Layer, Crop, dan rotasi) bisa **diklik-tahan lalu diseret ke atas/bawah** untuk mengubah nilai dengan cepat (kursor berubah jadi ↕). Klik biasa tetap bisa untuk mengetik angka.

---

## 4. Stage Slide Preview

Item stage baru yang menampilkan **visual slide** (bukan hanya teks) di stage monitor — jalan untuk slide teks, gambar, maupun **PPT/PDF**, dan tetap tampil **saat PiP aktif** (tanpa kamera PiP).

1. Buka tab **Stage**.
2. Di panel item, tambah **"Preview slide"** (ikon layar).
   - Tambah pertama → otomatis **Slide offset 0** (slide sekarang).
   - Tambah kedua → otomatis **Slide offset 1** (slide berikutnya).
3. Atur posisi/ukuran item di layout stage.
4. **Slide offset** bisa diubah manual di panel tools item (0 = sekarang, 1 = berikutnya, dst).

---

## 5. Song Sequence (Auto-Lirik dari MP3)

Rekam timing perpindahan slide terhadap sebuah MP3 satu kali, lalu saat live tinggal **Play** dan slide berjalan otomatis (MP3 tidak diputar saat live).

**Membuka:**
1. **Klik judul lagu** untuk membuka show-nya (lirik muncul).
2. Klik tombol **⋯ (titik tiga)** di pojok kanan atas area show.
3. Pilih **Song Sequence** (ikon jam).

**Merekam (persiapan):**
1. Pilih file **MP3** (hanya untuk membuat automation).
2. Tekan **Rekam** → MP3 mulai main.
3. **Majukan slide** (spasi/next) mengikuti lirik lagu — tiap perpindahan tercatat otomatis sebagai cue.
4. Tekan **Stop Rekam**. Daftar cue muncul.
5. Tekan **Simpan** (data nempel di file show).

**Live show (tanpa MP3):**
- **Play** → slide berjalan otomatis sesuai timecode.
- **Nudge:** isi angka detik lalu tekan **+** atau **−** untuk memajukan/memundurkan beberapa detik; playback tetap lanjut dari posisi baru dan langsung sinkron ke slide yang benar.
- **Auto/Manual:** matikan **Auto** untuk mengambil alih manual (spasi/next); nyalakan lagi untuk melanjutkan otomatis.
- Cue bisa dihapus satu per satu bila ada yang meleset.

> Catatan: cue merujuk ke **nomor slide absolut**, sehingga saat di-nudge mundur, slide kembali ke posisi yang benar.

---

## 6. Streaming YouTube / RTMP

**Tombol cepat:** tombol Start/Stop **YouTube Stream** tersedia langsung di **toolbar atas** — merah saat live, redup bila belum ada konfigurasi RTMP.

**Konfigurasi:**
1. Buka **Settings → Outputs**.
2. Isi **URL RTMP** dan **Stream Key** (tersedia tombol paste di kolom URL & Stream Key).
3. Stream mengikuti output yang dipilih.

---

## 7. Overlay Lower-Third & Template PiP

- **Lower-third:** tersedia beberapa overlay lower-third bawaan pada kategori **"lower_thirds"** (mis. polos, putih, biru, warna) — gunakan seperti overlay biasa.
- **Template PiP:** ada beberapa template siap pakai (mis. PiP Kanan Bawah, PiP Kiri Bawah, PiP Kanan Atas, PiP Panel Samping) pada kategori presentasi.

---

## 8. Blend Mode Background

Menerapkan mode campur (blend) pada media background.
1. Buka **Edit** background media.
2. Di panel gaya media, pilih **Blend Mode** dan **Blend Color** sesuai kebutuhan.

---

## 9. Import PowerPoint (PPT/PPTX)

1. Di tab **Shows**, klik **Import** dan pilih file **.ppt/.pptx**.
2. Di macOS, konversi memakai **Microsoft PowerPoint** (bila terpasang) untuk hasil paling akurat; bila tidak ada, memakai **LibreOffice** sebagai cadangan.
3. Bila keduanya tidak ada, muncul pesan untuk memasang LibreOffice.
4. Hasil import menjadi slide (tiap halaman = satu slide). Slide PPT ini dapat ditampilkan juga di pane PiP dan Stage Slide Preview.

---

## 10. Alkitab Bundled & Pencarian Ayat

- **Alkitab bawaan:** tersedia terjemahan Indonesia (mis. **TB** dan **BIS**) langsung tanpa unduh.
- **Pencarian di tab Scripture:** kotak pencarian mengenali **referensi ayat** (mis. "Yohanes 3:16", termasuk singkatan, tidak sensitif huruf besar/kecil) maupun pencarian teks.
- Ayat panjang otomatis dipecah rapi lintas-slide sesuai ukuran template.

---

## 11. Auto-Update

FreeShow+ memeriksa dan mengunduh pembaruan dari repositori FreeShow+ (canayadita/FreeShow), bukan dari FreeShow asli. Saat ada versi baru, muncul notifikasi dengan tombol unduh ke halaman rilis FreeShow+.

---

*Untuk pertanyaan atau kendala, hubungi pengelola FreeShow+.*
