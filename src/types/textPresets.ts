import type { AnimationConfig } from "./animation"

// Inline CSS styles applied to each text line on top of the
// user's template/theme. The animation system reads these via
// the regular item style pipeline.
export interface TextStylePreset {
    // Per-line style overrides (font-size, color, letter-spacing, etc.)
    lineStyle?: string
    // Optional per-letter (textContainer) style overrides
    textStyle?: string
}

export interface TextPreset {
    id: string
    name: string
    description: string
    icon: string
    category: "minimal" | "bold" | "elegant" | "energetic" | "cinematic" | "stage" | "modern" | "sketch"
    style: TextStylePreset
    animation: AnimationConfig
}

export const TEXT_PRESETS: TextPreset[] = [
    // ===== Minimal =====
    {
        id: "minimal-clean",
        name: "Clean",
        description: "Simpel, fade halus, cocok untuk ayat",
        icon: "○",
        category: "minimal",
        style: {
            lineStyle: "font-weight: 500; letter-spacing: 0.02em;",
            textStyle: "",
        },
        animation: {
            type: "fadeIn",
            duration: 500,
            delay: 100,
            repeat: false,
        },
    },
    {
        id: "minimal-soft-wipe",
        name: "Soft Wipe",
        description: "Muncul dari kiri, lembut",
        icon: "▰",
        category: "minimal",
        style: {
            lineStyle: "font-weight: 400;",
            textStyle: "",
        },
        animation: {
            type: "wipeRight",
            duration: 700,
            delay: 120,
            repeat: false,
        },
    },

    // ===== Bold =====
    {
        id: "bold-typewriter",
        name: "Typewriter",
        description: "Huruf muncul satu per satu seperti mengetik",
        icon: "✍",
        category: "bold",
        style: {
            lineStyle: "font-weight: 800; letter-spacing: 0.01em;",
            textStyle: "font-family: 'Courier New', monospace;",
        },
        animation: {
            type: "typewriter",
            duration: 800,
            delay: 0,
            repeat: false,
        },
    },
    {
        id: "bold-bounce",
        name: "Bounce Pop",
        description: "Mantul dinamis, energik",
        icon: "◎",
        category: "bold",
        style: {
            lineStyle: "font-weight: 900; text-transform: uppercase; letter-spacing: -0.01em;",
            textStyle: "",
        },
        animation: {
            type: "bounceIn",
            duration: 700,
            delay: 80,
            repeat: false,
        },
    },
    {
        id: "bold-zoom",
        name: "Power Zoom",
        description: "Zoom in tegas, untuk chorus",
        icon: "⊕",
        category: "bold",
        style: {
            lineStyle: "font-weight: 800;",
            textStyle: "",
        },
        animation: {
            type: "zoomIn",
            duration: 500,
            delay: 100,
            repeat: false,
        },
    },

    // ===== Elegant =====
    {
        id: "elegant-fade-up",
        name: "Elegant Rise",
        description: "Naik lembut, classy",
        icon: "↑",
        category: "elegant",
        style: {
            lineStyle: "font-weight: 300; letter-spacing: 0.08em;",
            textStyle: "font-style: italic;",
        },
        animation: {
            type: "fadeInWords",
            duration: 900,
            delay: 180,
            repeat: false,
        },
    },
    {
        id: "elegant-slide-up",
        name: "Smooth Slide",
        description: "Slide up halus",
        icon: "⤴",
        category: "elegant",
        style: {
            lineStyle: "font-weight: 300;",
            textStyle: "",
        },
        animation: {
            type: "slideUp",
            duration: 800,
            delay: 150,
            repeat: false,
        },
    },

    // ===== Energetic =====
    {
        id: "energetic-bounce-glow",
        name: "Bounce + Glow",
        description: "Mantul + glow pulse terus",
        icon: "✺",
        category: "energetic",
        style: {
            lineStyle: "font-weight: 800;",
            textStyle: "",
        },
        animation: {
            type: "bounceIn",
            duration: 600,
            delay: 80,
            repeat: false,
            background: {
                enabled: true,
                type: "glowPulse",
                opacity: 100,
                transparency: 0,
                blendMode: "normal",
                duration: 2200,
                delay: 0,
                loop: true,
                startDelay: 600,
            },
        },
    },
    {
        id: "energetic-rainbow",
        name: "Rainbow Wave",
        description: "Hue shift warna-warni + float",
        icon: "🌈",
        category: "energetic",
        style: {
            lineStyle: "font-weight: 700;",
            textStyle: "",
        },
        animation: {
            type: "slideUp",
            duration: 600,
            delay: 100,
            repeat: false,
            background: {
                enabled: true,
                type: "rainbow",
                opacity: 100,
                transparency: 0,
                blendMode: "normal",
                duration: 4000,
                delay: 0,
                loop: true,
                startDelay: 600,
            },
        },
    },
    {
        id: "energetic-neon",
        name: "Neon Sign",
        description: "Neon flicker seperti lampu kota",
        icon: "⚡",
        category: "energetic",
        style: {
            lineStyle: "font-weight: 700;",
            textStyle: "",
        },
        animation: {
            type: "fadeIn",
            duration: 400,
            delay: 50,
            repeat: false,
            background: {
                enabled: true,
                type: "neon",
                opacity: 100,
                transparency: 0,
                blendMode: "normal",
                duration: 1800,
                delay: 0,
                loop: true,
                startDelay: 400,
            },
        },
    },

    // ===== Cinematic =====
    {
        id: "cinematic-fade-blur",
        name: "Cinematic Blur",
        description: "Fade in dengan blur dreamy",
        icon: "▒",
        category: "cinematic",
        style: {
            lineStyle: "font-weight: 400; letter-spacing: 0.04em;",
            textStyle: "",
        },
        animation: {
            type: "fadeIn",
            duration: 1200,
            delay: 150,
            repeat: false,
            background: {
                enabled: true,
                type: "blurPulse",
                opacity: 100,
                transparency: 30,
                blendMode: "screen",
                duration: 3000,
                delay: 0,
                loop: true,
                startDelay: 1200,
            },
        },
    },
    {
        id: "cinematic-shadow",
        name: "Dramatic Shadow",
        description: "Slide + shadow grow dramatis",
        icon: "◉",
        category: "cinematic",
        style: {
            lineStyle: "font-weight: 600; text-shadow: 0 4px 24px rgba(0,0,0,0.6);",
            textStyle: "",
        },
        animation: {
            type: "slideUp",
            duration: 900,
            delay: 150,
            repeat: false,
            background: {
                enabled: true,
                type: "shadowGrow",
                opacity: 100,
                transparency: 0,
                blendMode: "multiply",
                duration: 2500,
                delay: 0,
                loop: true,
                startDelay: 900,
            },
        },
    },

    // ===== Stage =====
    {
        id: "stage-wipe-glow",
        name: "Stage Reveal",
        description: "Wipe masuk + glow loop konstan",
        icon: "▶",
        category: "stage",
        style: {
            lineStyle: "font-weight: 700;",
            textStyle: "",
        },
        animation: {
            type: "wipeRight",
            duration: 800,
            delay: 150,
            repeat: false,
            background: {
                enabled: true,
                type: "glowPulse",
                opacity: 100,
                transparency: 0,
                blendMode: "normal",
                duration: 2500,
                delay: 0,
                loop: true,
                startDelay: 800,
            },
        },
    },
    {
        id: "stage-float",
        name: "Floating",
        description: "Slide up lalu melayang",
        icon: "↕",
        category: "stage",
        style: {
            lineStyle: "font-weight: 500;",
            textStyle: "",
        },
        animation: {
            type: "slideUp",
            duration: 600,
            delay: 120,
            repeat: false,
            background: {
                enabled: true,
                type: "float",
                opacity: 100,
                transparency: 0,
                blendMode: "normal",
                duration: 3000,
                delay: 0,
                loop: true,
                startDelay: 600,
            },
        },
    },
    // ===== Sketch (hand-lettering + dekorasi pemanis) =====
    {
        id: "sketch-marker-underline",
        name: "Marker Underline",
        description: "Font marker + coret bawah menyusul",
        icon: "▁",
        category: "sketch",
        style: {
            lineStyle: "font-family: 'Marker Felt', 'Comic Sans MS', cursive; font-weight: 700;",
            textStyle: "",
        },
        animation: {
            type: "popIn",
            duration: 500,
            delay: 120,
            repeat: false,
            decoration: { type: "underline", color: "#FFD54F" },
        },
    },
    {
        id: "sketch-wavy",
        name: "Wavy Sketch",
        description: "Tulisan kapur + garis bawah bergelombang",
        icon: "﹏",
        category: "sketch",
        style: {
            lineStyle: "font-family: 'Chalkboard SE', 'Comic Sans MS', cursive; font-weight: 600;",
            textStyle: "",
        },
        animation: {
            type: "fadeIn",
            duration: 500,
            delay: 130,
            repeat: false,
            decoration: { type: "underlineWavy", color: "#7dd3fc" },
        },
    },
    {
        id: "sketch-highlighter",
        name: "Highlighter",
        description: "Blok stabilo menyapu di belakang teks",
        icon: "▮",
        category: "sketch",
        style: {
            lineStyle: "font-weight: 900; text-transform: uppercase; letter-spacing: 0.01em;",
            textStyle: "",
        },
        animation: {
            type: "slideUp",
            duration: 500,
            delay: 120,
            repeat: false,
            decoration: { type: "highlight", color: "#f59e0b" },
        },
    },
    {
        id: "sketch-ray-burst",
        name: "Ray Burst",
        description: "Sinar burst meledak di sekeliling (WOW!)",
        icon: "✳",
        category: "sketch",
        style: {
            lineStyle: "font-family: 'Arial Black', Arial; font-weight: 900; text-transform: uppercase;",
            textStyle: "",
        },
        animation: {
            type: "bounceIn",
            duration: 550,
            delay: 120,
            repeat: false,
            decoration: { type: "rays", color: "#FFD54F" },
        },
    },
    {
        id: "sketch-splash",
        name: "Splash Pop",
        description: "Percikan titik-titik tinta muncrat",
        icon: "⁘",
        category: "sketch",
        style: {
            lineStyle: "font-family: 'Marker Felt', 'Comic Sans MS', cursive; font-weight: 700;",
            textStyle: "",
        },
        animation: {
            type: "popIn",
            duration: 500,
            delay: 120,
            repeat: false,
            decoration: { type: "splash", color: "#f472b6" },
        },
    },
    {
        id: "sketch-circle-note",
        name: "Circle Note",
        description: "Dilingkari seperti catatan tangan (RATE)",
        icon: "◯",
        category: "sketch",
        style: {
            lineStyle: "font-family: 'Chalkboard SE', 'Comic Sans MS', cursive; font-weight: 700;",
            textStyle: "",
        },
        animation: {
            type: "zoomIn",
            duration: 450,
            delay: 120,
            repeat: false,
            decoration: { type: "circle", color: "#ffffff" },
        },
    },
    {
        id: "sketch-boxed-tag",
        name: "Boxed Tag",
        description: "Dikotakin seperti stempel (TAGGED)",
        icon: "▭",
        category: "sketch",
        style: {
            lineStyle: "font-weight: 800; text-transform: uppercase; letter-spacing: 0.15em;",
            textStyle: "",
        },
        animation: {
            type: "flipIn",
            duration: 550,
            delay: 130,
            repeat: false,
            decoration: { type: "box", color: "#ffffff" },
        },
    },
    {
        id: "sketch-speed",
        name: "Speed Lines",
        description: "Garis kecepatan menyusul dari kiri (DRIVE)",
        icon: "≡",
        category: "sketch",
        style: {
            lineStyle: "font-style: italic; font-weight: 900; text-transform: uppercase; letter-spacing: -0.01em;",
            textStyle: "",
        },
        animation: {
            type: "slideRight",
            duration: 450,
            delay: 100,
            repeat: false,
            decoration: { type: "speedLines", color: "#ffffff" },
        },
    },
    {
        id: "sketch-script",
        name: "Handwritten Script",
        description: "Tulisan tangan elegan + coret bawah",
        icon: "✎",
        category: "sketch",
        style: {
            lineStyle: "font-family: 'Snell Roundhand', 'Brush Script MT', cursive; font-weight: 600;",
            textStyle: "",
        },
        animation: {
            type: "blurIn",
            duration: 700,
            delay: 150,
            repeat: false,
            decoration: { type: "underline", color: "#c084fc" },
        },
    },

    // ===== Modern (fresh 2026) =====
    {
        id: "modern-kinetic-pop",
        name: "Kinetic Pop",
        description: "Spring pop energik, gaya motion graphics",
        icon: "✹",
        category: "modern",
        style: {
            lineStyle: "font-weight: 900; text-transform: uppercase; letter-spacing: -0.02em;",
            textStyle: "",
        },
        animation: {
            type: "popIn",
            duration: 550,
            delay: 90,
            repeat: false,
        },
    },
    {
        id: "modern-spring-cascade",
        name: "Spring Cascade",
        description: "Pop berurutan per baris, ritme cepat",
        icon: "⋱",
        category: "modern",
        style: {
            lineStyle: "font-weight: 700;",
            textStyle: "",
        },
        animation: {
            type: "popIn",
            duration: 650,
            delay: 170,
            repeat: false,
        },
    },
    {
        id: "modern-flip-3d",
        name: "Flip 3D",
        description: "Baris berdiri dari bawah dengan efek 3D",
        icon: "▱",
        category: "modern",
        style: {
            lineStyle: "font-weight: 800;",
            textStyle: "",
        },
        animation: {
            type: "flipIn",
            duration: 700,
            delay: 140,
            repeat: false,
        },
    },
    {
        id: "modern-aurora",
        name: "Aurora Flow",
        description: "Gradient biru-ungu-hijau mengalir di teks",
        icon: "◧",
        category: "modern",
        style: {
            lineStyle: "font-weight: 800; --grad-1: #7dd3fc; --grad-2: #c084fc; --grad-3: #34d399;",
            textStyle: "",
        },
        animation: {
            type: "fadeIn",
            duration: 700,
            delay: 120,
            repeat: false,
            background: {
                enabled: true,
                type: "gradientSweep",
                opacity: 100,
                transparency: 0,
                blendMode: "normal",
                duration: 4000,
                delay: 150,
                loop: true,
                startDelay: 0,
            },
        },
    },
    {
        id: "modern-sunset",
        name: "Sunset Glow",
        description: "Gradient oranye-pink hangat, naik lembut",
        icon: "◐",
        category: "modern",
        style: {
            lineStyle: "font-weight: 800; --grad-1: #f97316; --grad-2: #ec4899; --grad-3: #facc15;",
            textStyle: "",
        },
        animation: {
            type: "slideUp",
            duration: 700,
            delay: 130,
            repeat: false,
            background: {
                enabled: true,
                type: "gradientSweep",
                opacity: 100,
                transparency: 0,
                blendMode: "normal",
                duration: 5000,
                delay: 150,
                loop: true,
                startDelay: 0,
            },
        },
    },
    {
        id: "cinematic-blur-reveal",
        name: "Blur Reveal",
        description: "Muncul dari blur pekat, dreamy & sinematik",
        icon: "◌",
        category: "cinematic",
        style: {
            lineStyle: "font-weight: 300; letter-spacing: 0.08em;",
            textStyle: "",
        },
        animation: {
            type: "blurIn",
            duration: 1300,
            delay: 200,
            repeat: false,
        },
    },
    {
        id: "elegant-tracking-luxe",
        name: "Luxe Tracking",
        description: "Huruf merapat dari renggang, mewah & classy",
        icon: "⟷",
        category: "elegant",
        style: {
            lineStyle: "font-weight: 200; text-transform: uppercase; letter-spacing: 0.12em;",
            textStyle: "",
        },
        animation: {
            type: "trackingIn",
            duration: 1000,
            delay: 180,
            repeat: false,
        },
    },
    {
        id: "energetic-glitch-core",
        name: "Glitch Core",
        description: "Masuk glitch digital + burst glitch berkala",
        icon: "▓",
        category: "energetic",
        style: {
            lineStyle: "font-weight: 800; text-transform: uppercase;",
            textStyle: "",
        },
        animation: {
            type: "glitchIn",
            duration: 600,
            delay: 80,
            repeat: false,
            background: {
                enabled: true,
                type: "glitch",
                opacity: 100,
                transparency: 0,
                blendMode: "normal",
                duration: 3000,
                delay: 60,
                loop: true,
                startDelay: 600,
            },
        },
    },
    {
        id: "energetic-chromatic-vhs",
        name: "Chromatic VHS",
        description: "Aberasi merah-cyan retro, vibe VHS",
        icon: "◑",
        category: "energetic",
        style: {
            lineStyle: "font-weight: 700;",
            textStyle: "",
        },
        animation: {
            type: "fadeIn",
            duration: 300,
            delay: 60,
            repeat: false,
            background: {
                enabled: true,
                type: "chromatic",
                opacity: 100,
                transparency: 0,
                blendMode: "normal",
                duration: 2000,
                delay: 80,
                loop: true,
                startDelay: 300,
            },
        },
    },
    {
        id: "stage-neon-tracking",
        name: "Neon Trace",
        description: "Tracking masuk + neon glow konstan",
        icon: "⚡",
        category: "stage",
        style: {
            lineStyle: "font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em;",
            textStyle: "",
        },
        animation: {
            type: "trackingIn",
            duration: 900,
            delay: 150,
            repeat: false,
            background: {
                enabled: true,
                type: "neon",
                opacity: 100,
                transparency: 0,
                blendMode: "normal",
                duration: 2200,
                delay: 100,
                loop: true,
                startDelay: 900,
            },
        },
    },
    {
        id: "stage-color-cycle",
        name: "Color Cycle",
        description: "Warna text cycle + bounce in",
        icon: "●",
        category: "stage",
        style: {
            lineStyle: "font-weight: 700;",
            textStyle: "",
        },
        animation: {
            type: "bounceIn",
            duration: 600,
            delay: 100,
            repeat: false,
            background: {
                enabled: true,
                type: "colorCycle",
                opacity: 100,
                transparency: 0,
                blendMode: "normal",
                duration: 5000,
                delay: 0,
                loop: true,
                startDelay: 600,
            },
        },
    },
]

export const PRESET_CATEGORIES: { value: TextPreset["category"]; label: string; icon: string }[] = [
    { value: "sketch", label: "Sketch", icon: "✎" },
    { value: "modern", label: "Modern", icon: "✹" },
    { value: "minimal", label: "Minimal", icon: "○" },
    { value: "bold", label: "Bold", icon: "▰" },
    { value: "elegant", label: "Elegant", icon: "◇" },
    { value: "energetic", label: "Energetic", icon: "✺" },
    { value: "cinematic", label: "Cinematic", icon: "◉" },
    { value: "stage", label: "Stage", icon: "▶" },
]
