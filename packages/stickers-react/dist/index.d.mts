import React, { SVGProps, CSSProperties } from 'react';

interface StickerProps extends SVGProps<SVGSVGElement> {
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
type StickerName = "flame" | "metal" | "blob-burst" | "star-burst" | "devil-cone" | "flame-star" | "folded-paper" | "red-berry" | "blueberry" | "berries" | "badge-smiley" | "cosmic-pill" | "red-cat" | "pink-cat" | "pink-cat-stamp" | "yellow-cat" | "black-cat" | "cat" | "cat-serious" | "dog" | "blueberry" | "face" | "flower" | "peace-hand" | "sparkles" | "sparkle-trio" | "cosmic-eye" | "curious-globe" | "spiral" | "eye-splat" | "japan-badge" | "cone" | "icy-fleur" | "app-badge";

declare const STICKER_MAP: Record<StickerName, React.FC<StickerProps>>;
interface DynamicStickerProps extends StickerProps {
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
declare const Sticker: React.FC<DynamicStickerProps>;

declare const FlameSticker: React.FC<StickerProps>;

declare const MetalSticker: React.FC<StickerProps>;

declare const BlobBurstSticker: React.FC<StickerProps>;

declare const StarBurstSticker: React.FC<StickerProps>;

declare const DevilConeSticker: React.FC<StickerProps>;

declare const FlameStarSticker: React.FC<StickerProps>;

declare const FoldedPaperSticker: React.FC<StickerProps>;

declare const RedBerrySticker: React.FC<StickerProps>;

declare const BlueberrySticker: React.FC<StickerProps>;

declare const BerriesSticker: React.FC<StickerProps>;

declare const RedCatSticker: React.FC<StickerProps>;

declare const PinkCatSticker: React.FC<StickerProps>;

declare const PinkCatStampSticker: React.FC<StickerProps>;

declare const YellowCatSticker: React.FC<StickerProps>;

declare const BlackCatSticker: React.FC<StickerProps>;

declare const CatSticker: React.FC<StickerProps>;

declare const CatSeriousSticker: React.FC<StickerProps>;

declare const DogSticker: React.FC<StickerProps>;

declare const FaceSticker: React.FC<StickerProps>;

declare const FlowerSticker: React.FC<StickerProps>;

declare const PeaceHandSticker: React.FC<StickerProps>;

declare const SparklesSticker: React.FC<StickerProps>;

declare const SparkleTrioSticker: React.FC<StickerProps>;

declare const CosmicEyeSticker: React.FC<StickerProps>;

declare const CuriousGlobeSticker: React.FC<StickerProps>;

declare const SpiralSticker: React.FC<StickerProps>;

declare const EyeSplatSticker: React.FC<StickerProps>;

declare const JapanBadgeSticker: React.FC<StickerProps>;

declare const ConeSticker: React.FC<StickerProps>;

declare const IcyFleurSticker: React.FC<StickerProps>;

declare const AppBadgeSticker: React.FC<StickerProps>;

export { AppBadgeSticker, RedBerrySticker as BadgeSmileySticker, BerriesSticker, BlackCatSticker, BlobBurstSticker, BlueberrySticker, CatSeriousSticker, CatSticker, ConeSticker, CosmicEyeSticker, BlueberrySticker as CosmicPillSticker, CuriousGlobeSticker, DevilConeSticker, DogSticker, EyeSplatSticker, FaceSticker, FlameStarSticker, FlameSticker, FlowerSticker, FoldedPaperSticker, IcyFleurSticker, JapanBadgeSticker, MetalSticker, PeaceHandSticker, PinkCatStampSticker, PinkCatSticker, RedBerrySticker, RedCatSticker, STICKER_MAP, SparkleTrioSticker, SparklesSticker, SpiralSticker, StarBurstSticker, Sticker, YellowCatSticker, Sticker as default };
export type { DynamicStickerProps, StickerName, StickerProps };
