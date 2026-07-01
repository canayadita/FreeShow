# FreeShowPlus — Text Animation System (Phase 1)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fork FreeShow dan tambahkan sistem animasi teks yang kaya (fade, slide, typewriter, zoom, dll) untuk kebutuhan ibadah gereja di Mac ARM M4.

**Architecture:** Fork lokal dari ChurchApps/FreeShow. Animasi ditambahkan sebagai CSS keyframes di `TextboxLines.svelte` dan dikonfigurasi via `animationStyle` prop yang sudah ada di `Textbox.svelte`. UI picker animasi ditambahkan di panel editor item slide.

**Tech Stack:** Electron 37+, Svelte 3, TypeScript, Vite, Node.js 22+, npm

---

## File Map

| File | Status | Tanggung Jawab |
|------|--------|----------------|
| `src/frontend/components/slide/TextboxLines.svelte` | Modify | Tambah CSS keyframes & apply animation per line/word |
| `src/frontend/components/slide/Textbox.svelte` | Modify | Terima & teruskan animationType ke TextboxLines |
| `src/types/animation.ts` | Create | Enum AnimationType + interface AnimationConfig |
| `src/frontend/components/edit/AnimationPicker.svelte` | Create | UI panel untuk pilih & preview animasi |
| `src/frontend/components/edit/EditItem.svelte` | Modify | Embed AnimationPicker di editor item |
| `src/frontend/stores/animationStore.ts` | Create | Svelte store untuk state animasi aktif |

---

## Task 1: Fork & Setup Dev Environment

**Files:**
- Clone ke: `~/Developer/FreeShowPlus/`

- [ ] **Step 1.1: Fork di GitHub**

  Buka https://github.com/ChurchApps/FreeShow → klik **Fork** → buat fork di akun Papi Mika (misal: `mikamulyanto/FreeShowPlus`)

- [ ] **Step 1.2: Clone fork ke local**

  ```bash
  cd ~/Developer
  git clone https://github.com/mikamulyanto/FreeShowPlus.git
  cd FreeShowPlus
  ```

- [ ] **Step 1.3: Install Node.js 22 via nvm (jika belum ada)**

  ```bash
  node --version
  # Harus >= v22.12.0
  # Jika belum: brew install node@22
  ```

- [ ] **Step 1.4: Install dependencies**

  ```bash
  npm install
  ```

  Expected: selesai tanpa error, `node_modules/` terbuat.

- [ ] **Step 1.5: Jalankan dev mode**

  ```bash
  npm start
  ```

  Expected: window Electron FreeShow terbuka normal dengan semua fitur default berjalan.

- [ ] **Step 1.6: Buat feature branch**

  ```bash
  git checkout -b feature/text-animations
  ```

- [ ] **Step 1.7: Tambah upstream remote (untuk sync update dari FreeShow asli)**

  ```bash
  git remote add upstream https://github.com/ChurchApps/FreeShow.git
  git remote -v
  ```

  Expected:
  ```
  origin    https://github.com/mikamulyanto/FreeShowPlus.git (fetch)
  upstream  https://github.com/ChurchApps/FreeShow.git (fetch)
  ```

- [ ] **Step 1.8: Commit initial setup**

  ```bash
  git add .
  git commit -m "chore: fork FreeShow as FreeShowPlus base"
  ```

---

## Task 2: Tambah Animation Types

**Files:**
- Create: `src/types/animation.ts`
- Modify: `src/types/index.ts` (atau file types utama)

- [ ] **Step 2.1: Buat file types animasi**

  Buat file `src/types/animation.ts`:

  ```typescript
  export type AnimationType =
    | "none"
    | "fadeIn"
    | "fadeInWords"
    | "slideUp"
    | "slideDown"
    | "slideLeft"
    | "slideRight"
    | "typewriter"
    | "zoomIn"
    | "zoomOut"
    | "bounceIn"
    | "glowPulse"
    | "wipeLeft"
    | "wipeRight"

  export interface AnimationConfig {
    type: AnimationType
    duration: number       // ms, default 600
    delay: number          // ms delay antar baris/kata, default 150
    easing: string         // CSS easing, default "ease-out"
    repeat: boolean        // loop animasi
  }

  export const DEFAULT_ANIMATION_CONFIG: AnimationConfig = {
    type: "none",
    duration: 600,
    delay: 150,
    easing: "ease-out",
    repeat: false,
  }
  ```

- [ ] **Step 2.2: Verifikasi TypeScript compile tanpa error**

  ```bash
  npx tsc --noEmit
  ```

  Expected: no errors.

- [ ] **Step 2.3: Commit**

  ```bash
  git add src/types/animation.ts
  git commit -m "feat: add AnimationType and AnimationConfig types"
  ```

---

## Task 3: Tambah CSS Keyframes & Animation Logic di TextboxLines.svelte

**Files:**
- Modify: `src/frontend/components/slide/TextboxLines.svelte`

- [ ] **Step 3.1: Buka file dan pahami struktur lines**

  Baca bagian `{#each renderedLines as line, i}` — inilah titik animasi per baris.

- [ ] **Step 3.2: Tambah prop animasi**

  Di bagian `<script>` TextboxLines.svelte, tambah:

  ```typescript
  import type { AnimationConfig } from "../../../../types/animation"

  export let animationConfig: AnimationConfig | undefined = undefined
  ```

- [ ] **Step 3.3: Tambah fungsi helper delay per baris**

  Di bagian `<script>`, tambah:

  ```typescript
  function getLineStyle(index: number): string {
    if (!animationConfig || animationConfig.type === "none") return ""
    const delayMs = index * (animationConfig.delay ?? 150)
    return `
      animation-name: anim-${animationConfig.type};
      animation-duration: ${animationConfig.duration ?? 600}ms;
      animation-delay: ${delayMs}ms;
      animation-fill-mode: both;
      animation-timing-function: ${animationConfig.easing ?? "ease-out"};
      ${animationConfig.repeat ? "animation-iteration-count: infinite;" : ""}
    `
  }
  ```

- [ ] **Step 3.4: Apply style ke setiap elemen `.break`**

  Di template, ubah:
  ```html
  <div class="break">
  ```
  menjadi:
  ```html
  <div class="break" style={getLineStyle(i)}>
  ```

- [ ] **Step 3.5: Tambah semua CSS keyframes di `<style>` section**

  Di bagian `<style>`, tambah di paling bawah:

  ```css
  /* === FreeShowPlus Animations === */

  @keyframes anim-fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  @keyframes anim-fadeInWords {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes anim-slideUp {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes anim-slideDown {
    from { opacity: 0; transform: translateY(-40px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes anim-slideLeft {
    from { opacity: 0; transform: translateX(60px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  @keyframes anim-slideRight {
    from { opacity: 0; transform: translateX(-60px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  @keyframes anim-typewriter {
    from { clip-path: inset(0 100% 0 0); opacity: 1; }
    to   { clip-path: inset(0 0% 0 0);   opacity: 1; }
  }

  @keyframes anim-zoomIn {
    from { opacity: 0; transform: scale(0.6); }
    to   { opacity: 1; transform: scale(1); }
  }

  @keyframes anim-zoomOut {
    from { opacity: 0; transform: scale(1.4); }
    to   { opacity: 1; transform: scale(1); }
  }

  @keyframes anim-bounceIn {
    0%   { opacity: 0; transform: scale(0.3); }
    50%  { opacity: 1; transform: scale(1.08); }
    70%  { transform: scale(0.95); }
    100% { transform: scale(1); }
  }

  @keyframes anim-glowPulse {
    0%, 100% { text-shadow: 0 0 8px rgba(255,255,255,0.3); opacity: 1; }
    50%       { text-shadow: 0 0 32px rgba(255,255,255,0.9), 0 0 60px rgba(255,255,255,0.4); opacity: 0.9; }
  }

  @keyframes anim-wipeLeft {
    from { clip-path: inset(0 0 0 100%); }
    to   { clip-path: inset(0 0 0 0); }
  }

  @keyframes anim-wipeRight {
    from { clip-path: inset(0 100% 0 0); }
    to   { clip-path: inset(0 0 0 0); }
  }
  ```

- [ ] **Step 3.6: Test visual — buka app dan verifikasi**

  ```bash
  npm start
  ```

  Buat slide dengan teks, nanti setelah Task 5 bisa pilih animasi dan lihat hasilnya.

- [ ] **Step 3.7: Commit**

  ```bash
  git add src/frontend/components/slide/TextboxLines.svelte
  git commit -m "feat: add 13 CSS animation keyframes and per-line animation support"
  ```

---

## Task 4: Teruskan animationConfig dari Textbox ke TextboxLines

**Files:**
- Modify: `src/frontend/components/slide/Textbox.svelte`

- [ ] **Step 4.1: Tambah prop animationConfig di Textbox.svelte**

  Di bagian `<script>`:

  ```typescript
  import type { AnimationConfig } from "../../../../types/animation"

  export let animationConfig: AnimationConfig | undefined = undefined
  ```

- [ ] **Step 4.2: Teruskan ke TextboxLines**

  Di template, cari `<TextboxLines` dan tambah prop:

  ```html
  <TextboxLines
    ...props yang sudah ada...
    {animationConfig}
  />
  ```

- [ ] **Step 4.3: Commit**

  ```bash
  git add src/frontend/components/slide/Textbox.svelte
  git commit -m "feat: pass animationConfig prop through Textbox to TextboxLines"
  ```

---

## Task 5: Buat AnimationPicker.svelte (UI Panel)

**Files:**
- Create: `src/frontend/components/edit/AnimationPicker.svelte`

- [ ] **Step 5.1: Buat file komponen**

  Buat `src/frontend/components/edit/AnimationPicker.svelte`:

  ```svelte
  <script lang="ts">
    import { createEventDispatcher } from "svelte"
    import type { AnimationConfig, AnimationType } from "../../../../types/animation"
    import { DEFAULT_ANIMATION_CONFIG } from "../../../../types/animation"

    export let config: AnimationConfig = { ...DEFAULT_ANIMATION_CONFIG }

    const dispatch = createEventDispatcher<{ change: AnimationConfig }>()

    const ANIMATION_OPTIONS: { value: AnimationType; label: string; icon: string }[] = [
      { value: "none",        label: "Tidak Ada",    icon: "—" },
      { value: "fadeIn",      label: "Fade In",      icon: "✦" },
      { value: "fadeInWords", label: "Fade Per Baris", icon: "✧" },
      { value: "slideUp",     label: "Slide Atas",   icon: "↑" },
      { value: "slideDown",   label: "Slide Bawah",  icon: "↓" },
      { value: "slideLeft",   label: "Slide Kiri",   icon: "←" },
      { value: "slideRight",  label: "Slide Kanan",  icon: "→" },
      { value: "typewriter",  label: "Typewriter",   icon: "✍" },
      { value: "zoomIn",      label: "Zoom In",      icon: "⊕" },
      { value: "zoomOut",     label: "Zoom Out",     icon: "⊖" },
      { value: "bounceIn",    label: "Bounce",       icon: "◎" },
      { value: "glowPulse",   label: "Glow Pulse",   icon: "✺" },
      { value: "wipeLeft",    label: "Wipe Kiri",    icon: "▶" },
      { value: "wipeRight",   label: "Wipe Kanan",   icon: "◀" },
    ]

    function update() {
      dispatch("change", { ...config })
    }

    function selectType(type: AnimationType) {
      config = { ...config, type }
      update()
    }
  </script>

  <div class="animation-picker">
    <div class="section-title">Animasi Teks</div>

    <div class="anim-grid">
      {#each ANIMATION_OPTIONS as opt}
        <button
          class="anim-btn"
          class:active={config.type === opt.value}
          on:click={() => selectType(opt.value)}
          title={opt.label}
        >
          <span class="anim-icon">{opt.icon}</span>
          <span class="anim-label">{opt.label}</span>
        </button>
      {/each}
    </div>

    {#if config.type !== "none"}
      <div class="anim-params">
        <label>
          <span>Durasi</span>
          <input type="range" min="100" max="2000" step="50" bind:value={config.duration} on:input={update} />
          <span class="val">{config.duration}ms</span>
        </label>

        <label>
          <span>Delay antar baris</span>
          <input type="range" min="0" max="800" step="25" bind:value={config.delay} on:input={update} />
          <span class="val">{config.delay}ms</span>
        </label>

        <label class="checkbox-label">
          <input type="checkbox" bind:checked={config.repeat} on:change={update} />
          <span>Loop (ulangi terus)</span>
        </label>
      </div>
    {/if}
  </div>

  <style>
    .animation-picker {
      padding: 8px 0;
    }
    .section-title {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      opacity: 0.5;
      margin-bottom: 8px;
    }
    .anim-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 4px;
      margin-bottom: 10px;
    }
    .anim-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      padding: 6px 4px;
      border-radius: 6px;
      border: 1px solid transparent;
      background: rgba(255,255,255,0.05);
      cursor: pointer;
      color: inherit;
      transition: all 0.15s;
    }
    .anim-btn:hover {
      background: rgba(255,255,255,0.1);
    }
    .anim-btn.active {
      background: rgba(99,102,241,0.25);
      border-color: #6366f1;
    }
    .anim-icon {
      font-size: 14px;
    }
    .anim-label {
      font-size: 9px;
      text-align: center;
      opacity: 0.8;
    }
    .anim-params {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 8px;
      background: rgba(255,255,255,0.04);
      border-radius: 6px;
    }
    label {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 11px;
      opacity: 0.8;
    }
    label span:first-child {
      width: 110px;
      flex-shrink: 0;
    }
    .val {
      width: 40px;
      text-align: right;
      font-size: 10px;
      opacity: 0.6;
    }
    input[type="range"] {
      flex: 1;
    }
    .checkbox-label {
      gap: 6px;
    }
  </style>
  ```

- [ ] **Step 5.2: Commit**

  ```bash
  git add src/frontend/components/edit/AnimationPicker.svelte
  git commit -m "feat: add AnimationPicker component with 13 animation types"
  ```

---

## Task 6: Integrasikan AnimationPicker ke Editor Item

**Files:**
- Modify: `src/frontend/components/edit/EditItem.svelte` (atau file editor item aktif)

> **Catatan:** Nama file exisiting mungkin berbeda. Cari dengan: `grep -r "animationStyle" src/frontend/components/edit/` untuk menemukan file yang tepat.

- [ ] **Step 6.1: Cari file editor item yang relevan**

  ```bash
  grep -rl "animationStyle\|editItem\|item.*editor" src/frontend/components/edit/ | head -5
  ```

- [ ] **Step 6.2: Import AnimationPicker**

  Di `<script>` file editor yang ditemukan:

  ```typescript
  import AnimationPicker from "./AnimationPicker.svelte"
  import type { AnimationConfig } from "../../../../types/animation"
  import { DEFAULT_ANIMATION_CONFIG } from "../../../../types/animation"

  // Tambah reactive state untuk animasi
  let animationConfig: AnimationConfig = { ...DEFAULT_ANIMATION_CONFIG }

  function handleAnimationChange(e: CustomEvent<AnimationConfig>) {
    animationConfig = e.detail
    // Simpan ke item data — sesuaikan dengan cara FreeShow menyimpan item props
    if (activeEdit?.items?.[0]) {
      activeEdit.items[0].animationConfig = animationConfig
    }
  }
  ```

- [ ] **Step 6.3: Tambah AnimationPicker ke template**

  Di template, cari section styling/editing dan tambah:

  ```html
  <AnimationPicker
    config={animationConfig}
    on:change={handleAnimationChange}
  />
  ```

- [ ] **Step 6.4: Test — buka editor, pilih item teks, pastikan panel animasi muncul**

  ```bash
  npm start
  ```

  - Buka FreeShow
  - Buat slide baru dengan teks
  - Double-click item teks untuk masuk edit mode
  - Pastikan panel "Animasi Teks" muncul
  - Pilih animasi, cek apakah output display beranimasi

- [ ] **Step 6.5: Commit**

  ```bash
  git add src/frontend/components/edit/
  git commit -m "feat: integrate AnimationPicker into slide item editor"
  ```

---

## Task 7: Simpan & Load AnimationConfig ke/dari Data Slide

**Files:**
- Modify: tipe data slide/item di `src/types/` (cari file yang define `Item` atau `SlideItem`)
- Modify: serialization/deserialization slide data

- [ ] **Step 7.1: Cari definisi type Item**

  ```bash
  grep -r "export.*interface.*Item\|export.*type.*Item" src/types/ | head -10
  ```

- [ ] **Step 7.2: Tambah animationConfig ke tipe Item**

  Di file definisi Item (misal `src/types/show.ts`):

  ```typescript
  import type { AnimationConfig } from "./animation"

  export interface Item {
    // ... field yang sudah ada ...
    animationConfig?: AnimationConfig
  }
  ```

- [ ] **Step 7.3: Pastikan animationConfig ikut tersimpan ke file show**

  FreeShow menyimpan data ke JSON. Karena TypeScript interface hanya tipe, data otomatis tersimpan. Verifikasi dengan:
  - Buat slide, set animasi, tutup app, buka lagi
  - Pastikan animasi masih tersimpan

- [ ] **Step 7.4: Teruskan animationConfig dari store ke Textbox saat output**

  Cari file yang me-render output (`src/frontend/components/output/` atau similar):

  ```bash
  grep -rl "Textbox\|textbox" src/frontend/components/output/ | head -5
  ```

  Tambah prop `animationConfig={item.animationConfig}` ke komponen `<Textbox>` di output renderer.

- [ ] **Step 7.5: End-to-end test**

  - Buat show baru
  - Buat slide dengan lirik ibadah 4 baris
  - Set animasi "Slide Up" dengan delay 200ms
  - Buka output window (`Window > Output`)
  - Navigasi ke slide — verifikasi setiap baris masuk dengan animasi slide up berurutan

- [ ] **Step 7.6: Commit**

  ```bash
  git add src/types/ src/frontend/
  git commit -m "feat: persist animationConfig in slide data and apply to output renderer"
  ```

---

## Task 8: Push ke GitHub & Tagging

- [ ] **Step 8.1: Push feature branch**

  ```bash
  git push -u origin feature/text-animations
  ```

- [ ] **Step 8.2: Merge ke main**

  ```bash
  git checkout main
  git merge feature/text-animations
  git push origin main
  ```

- [ ] **Step 8.3: Tag versi pertama**

  ```bash
  git tag -a v1.0.0-plus -m "FreeShowPlus v1.0.0 - Text Animation System"
  git push origin v1.0.0-plus
  ```

---

## Fitur Lanjutan (Phase 2 — Nanti)

Setelah Phase 1 selesai dan stabil, fitur ini bisa ditambahkan:

- [ ] **Karaoke highlight** — highlight per kata sinkron dengan waktu
- [ ] **Word-level animation** — tiap kata masuk sendiri (bukan per baris)
- [ ] **Custom easing curves** — UI bezier curve picker
- [ ] **Animasi background** — Ken Burns effect untuk foto background
- [ ] **Preset animasi** — simpan kombinasi animasi favorit sebagai preset
- [ ] **Transition antar slide** — morph / cross-dissolve custom
- [ ] **Template ibadah** — starter template dengan animasi siap pakai untuk pujian, doa, khotbah

---

## Sync Update dari FreeShow Upstream

Jalankan secara berkala untuk dapat update bug fix dari FreeShow asli:

```bash
git fetch upstream
git checkout main
git merge upstream/main
# Resolve conflict jika ada (biasanya di TextboxLines.svelte & types)
git push origin main
```
