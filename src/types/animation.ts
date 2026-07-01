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
