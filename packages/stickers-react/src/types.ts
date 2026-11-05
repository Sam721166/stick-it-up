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
  | "badge-smiley"
  | "cosmic-pill";
