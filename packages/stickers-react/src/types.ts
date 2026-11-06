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
  | "japan-flag";
