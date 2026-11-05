"use client";

import React from "react";
import type { StickerProps, StickerName } from "../types";
import { FlameSticker } from "../stickers/FlameSticker";
import { MetalSticker } from "../stickers/MetalSticker";
import { BlobBurstSticker } from "../stickers/BlobBurstSticker";
import { StarBurstSticker } from "../stickers/StarBurstSticker";
import { DevilConeSticker } from "../stickers/DevilConeSticker";
import { FlameStarSticker } from "../stickers/FlameStarSticker";
import { FoldedPaperSticker } from "../stickers/FoldedPaperSticker";
import { BadgeSmileySticker } from "../stickers/BadgeSmileySticker";
import { CosmicPillSticker } from "../stickers/CosmicPillSticker";

// Characters & Symbols
import { RedCatSticker } from "../stickers/RedCatSticker";
import { PinkCatSticker } from "../stickers/PinkCatSticker";
import { PinkCatStampSticker } from "../stickers/PinkCatStampSticker";
import { YellowCatSticker } from "../stickers/YellowCatSticker";
import { BlackCatSticker } from "../stickers/BlackCatSticker";
import { CatSticker } from "../stickers/CatSticker";
import { CatSeriousSticker } from "../stickers/CatSeriousSticker";
import { DogSticker } from "../stickers/DogSticker";
import { BlueberrySticker } from "../stickers/BlueberrySticker";
import { FaceSticker } from "../stickers/FaceSticker";
import { FlowerSticker } from "../stickers/FlowerSticker";
import { PeaceHandSticker } from "../stickers/PeaceHandSticker";
import { SparklesSticker } from "../stickers/SparklesSticker";
import { SparkleTrioSticker } from "../stickers/SparkleTrioSticker";
import { CosmicEyeSticker } from "../stickers/CosmicEyeSticker";
import { CuriousGlobeSticker } from "../stickers/CuriousGlobeSticker";
import { SpiralSticker } from "../stickers/SpiralSticker";
import { EyeSplatSticker } from "../stickers/EyeSplatSticker";
import { JapanBadgeSticker } from "../stickers/JapanBadgeSticker";
import { ConeSticker } from "../stickers/ConeSticker";
import { IcyFleurSticker } from "../stickers/IcyFleurSticker";
import { AppBadgeSticker } from "../stickers/AppBadgeSticker";

export const STICKER_MAP: Record<StickerName, React.FC<StickerProps>> = {
  flame: FlameSticker,
  metal: MetalSticker,
  "blob-burst": BlobBurstSticker,
  "star-burst": StarBurstSticker,
  star: StarBurstSticker,
  "devil-cone": DevilConeSticker,
  "flame-star": FlameStarSticker,
  "folded-paper": FoldedPaperSticker,
  "badge-smiley": BadgeSmileySticker,
  "cosmic-pill": CosmicPillSticker,

  // Characters & Symbols
  "red-cat": RedCatSticker,
  "pink-cat": PinkCatSticker,
  "pink-cat-stamp": PinkCatStampSticker,
  "yellow-cat": YellowCatSticker,
  "black-cat": BlackCatSticker,
  cat: CatSticker,
  "cat-serious": CatSeriousSticker,
  dog: DogSticker,
  blueberry: BlueberrySticker,
  face: FaceSticker,
  flower: FlowerSticker,
  "peace-hand": PeaceHandSticker,
  sparkles: SparklesSticker,
  "sparkle-trio": SparkleTrioSticker,
  "cosmic-eye": CosmicEyeSticker,
  "curious-globe": CuriousGlobeSticker,
  spiral: SpiralSticker,
  "eye-splat": EyeSplatSticker,
  "japan-badge": JapanBadgeSticker,
  cone: ConeSticker,
  "icy-fleur": IcyFleurSticker,
  "app-badge": AppBadgeSticker,
};

export interface DynamicStickerProps extends StickerProps {
  name: StickerName;
}

/**
 * Dynamic Sticker component that renders any sticker by name
 *
 * @example
 * ```tsx
 * import { Sticker } from "stick-it-up";
 *
 * <Sticker name="devil-cone" size={130} peel />
 * <Sticker name="red-cat" size={130} peel />
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
