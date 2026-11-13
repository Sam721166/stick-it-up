import type { SVGProps, CSSProperties } from "react";

export interface StickerProps extends SVGProps<SVGSVGElement> {
  /**
   * Shortcut for width and height (e.g. 120, "100px", "5rem")
   */
  size?: number | string;
  /**
   * If true, adds a physical vinyl sticker hover peel / tilt effect
   * @default false
   */
  peel?: boolean;
  /**
   * Additional CSS class names
   */
  className?: string;
  /**
   * Custom inline styles
   */
  style?: CSSProperties;
}

export type StickerName =
  | "flame"
  | "metal"
  | "blob-burst"
  | "star-burst"
  | "devil-cone"
  | "flame-star"
  | "folded-paper"
  | "red-berry"
  | "blueberry"
  | "berries"
  | "badge-smiley"
  | "cosmic-pill"
  | "red-cat"
  | "pink-cat"
  | "pink-cat-stamp"
  | "yellow-cat"
  | "black-cat"
  | "cat"
  | "cat-serious"
  | "dog"
  | "face"
  | "black-face"
  | "flower"
  | "peace-hand"
  | "sparkles"
  | "sparkle-trio"
  | "cosmic-eye"
  | "curious-globe"
  | "spiral"
  | "eye-splat"
  | "japan-badge"
  | "cone"
  | "icy-fleur"
  | "app-badge"
  | "bunny"
  | "cat-sit"
  | "fish"
  | "luffy-hat"
  | "coffee"
  | "japan-flag"
  | "cat-cute"
  | "cherry"
  | "goo"
  | "heart"
  | "nazar"
  | "bad-cat"
  | "nori-coffee"
  | "nori-cool"
  | "nori-headphones"
  | "nori-heart"
  | "nori-laptop"
  | "nori-rocket"
  | "pip-coffee"
  | "pip-detective"
  | "pip-headphones"
  | "pip-rocket"
  | "pip-thinking"
  | "pip-wizard"
  | "kuro-coffee"
  | "kuro-cool"
  | "kuro-headphones"
  | "kuro-heart"
  | "kuro-laptop"
  | "kuro-rocket"
  | "mochi-coffee"
  | "mochi-cool"
  | "mochi-headphones"
  | "mochi-heart"
  | "mochi-laptop"
  | "mochi-rocket"
  | "star"
  | "dogsticker"
  | "component-66"
  | "vlc2"
  | "japan"
  | "curious-blue-globe"
  | "cosmiceye"
  | "sparkletrio"
  | "catsticker"
  | "red_cat"
  | "elon"
  | "elon-1"
  | "elon-musk"
  | "elon-visionary"
  | "elon-2"
  | "steve-jobs"
  | "steve-jobs-1"
  | "steve-jobs-classic"
  | "steve-jobs-2"
  | "jensen-huang"
  | "jensen"
  | "mark-zuckerberg"
  | "zuck"
  | "mark-socialnetwork"
  | "mark-social"
  | "erlich-bachman"
  | "erlich"
  | "socialnetwork-badge"
  | "social-network"
  | (string & {});
