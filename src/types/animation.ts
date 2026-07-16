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
  | "popIn"
  | "flipIn"
  | "blurIn"
  | "trackingIn"
  | "glitchIn"
  | "shakeIn"
  | "dropBounce"
  | "elastic"
  | "rollIn"
  | "tada"
  | "comicPop"
  | "kapow"
  | "rubberBand"
  | "slingshot"
  | "lightSpeed"
  | "jackInBox"
  | "hinge"
  | "neonFlash"

// Background / loop animations — designed to run continuously
// and blend together with the primary entrance animation.
export type BackgroundAnimationType =
  | "none"
  | "breathe"
  | "shimmer"
  | "float"
  | "sway"
  | "rainbow"
  | "blurPulse"
  | "shadowGrow"
  | "letterDance"
  | "neon"
  | "flicker"
  | "wave"
  | "colorCycle"
  | "gradientSweep"
  | "glitch"
  | "chromatic"
  | "shake"
  | "bounce"
  | "pulse"
  | "swing"
  | "heartbeat"
  | "jello"
  | "spin"
  | "electric"
  | "disco"
  | "earthquake"
  | "pendulum"
  | "rubbery"
  | "sparkle"
  | "comicVibrate"

// CSS mix-blend-mode values for compositing the animated text
// with whatever is rendered behind it.
export type BlendMode =
  | "normal"
  | "multiply"
  | "screen"
  | "overlay"
  | "darken"
  | "lighten"
  | "color-dodge"
  | "color-burn"
  | "hard-light"
  | "soft-light"
  | "difference"
  | "exclusion"
  | "hue"
  | "saturation"
  | "color"
  | "luminosity"

export interface BackgroundAnimation {
  enabled: boolean
  type: BackgroundAnimationType
  // 0-100, base opacity of the secondary animated layer (default 100)
  opacity: number
  // 0-100, additional transparency of the secondary layer — applied
  // through filter:opacity() so it composes with `opacity` and the
  // primary entrance fade. Higher value = more see-through.
  transparency: number
  blendMode: BlendMode
  duration: number // ms, default 2000
  delay: number // ms delay between lines, default 100
  loop: boolean // default true
  startDelay: number // ms wait AFTER primary animation finishes, default 0
}

// Hand-drawn style decorations (underline swoosh, splash, rays etc.)
// that animate in AFTER the text entrance animation finishes.
export type DecorationType =
  | "none"
  | "underline"
  | "underlineWavy"
  | "highlight"
  | "box"
  | "circle"
  | "rays"
  | "splash"
  | "speedLines"

export interface TextDecoration {
  type: DecorationType
  color?: string // default #FFD54F
}

export interface AnimationConfig {
  type: AnimationType
  duration: number // ms, default 600
  delay: number // ms delay antar baris/kata, default 150
  repeat: boolean // loop animasi
  // Optional secondary (background/loop) animation that blends with the primary
  background?: BackgroundAnimation
  // Optional hand-drawn decoration that pops in after the entrance animation
  decoration?: TextDecoration
}

export const DEFAULT_BACKGROUND_ANIMATION: BackgroundAnimation = {
  enabled: false,
  type: "breathe",
  opacity: 100,
  transparency: 0,
  blendMode: "normal",
  duration: 2000,
  delay: 100,
  loop: true,
  startDelay: 0,
}

export const DEFAULT_ANIMATION_CONFIG: AnimationConfig = {
  type: "none",
  duration: 600,
  delay: 150,
  repeat: false,
}
