import React from "react";
import type { StickerProps, StickerName } from "../types";
import { MetalSticker } from "../stickers/MetalSticker";
import { BlobBurstSticker } from "../stickers/BlobBurstSticker";
import { StarBurstSticker } from "../stickers/StarBurstSticker";
import { DevilConeSticker } from "../stickers/DevilConeSticker";
import { FlameStarSticker } from "../stickers/FlameStarSticker";
import { FoldedPaperSticker } from "../stickers/FoldedPaperSticker";
import { BadgeSmileySticker } from "../stickers/BadgeSmileySticker";
import { CosmicPillSticker } from "../stickers/CosmicPillSticker";

export const STICKER_MAP: Record<StickerName, React.FC<StickerProps>> = {
  metal: MetalSticker,
  "blob-burst": BlobBurstSticker,
  "star-burst": StarBurstSticker,
  "devil-cone": DevilConeSticker,
  "flame-star": FlameStarSticker,
  "folded-paper": FoldedPaperSticker,
  "badge-smiley": BadgeSmileySticker,
  "cosmic-pill": CosmicPillSticker,
};

export interface DynamicStickerProps extends StickerProps {
  name: StickerName;
}

/**
 * Dynamic Sticker component that renders any sticker by name
 *
 * @example
 * ```tsx
 * <Sticker name="metal" size={120} peel />
 * ```
 */
export const Sticker: React.FC<DynamicStickerProps> = ({ name, ...props }) => {
  const Component = STICKER_MAP[name];
  if (!Component) {
    console.warn(`[stickers-react] Unknown sticker name: "${name}". Available: ${Object.keys(STICKER_MAP).join(", ")}`);
    return null;
  }
  return <Component {...props} />;
};

export default Sticker;
