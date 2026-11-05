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
type StickerName = "flame" | "metal" | "blob-burst" | "star-burst" | "devil-cone" | "flame-star" | "folded-paper" | "badge-smiley" | "cosmic-pill";

declare const STICKER_MAP: Record<StickerName, React.FC<StickerProps>>;
interface DynamicStickerProps extends StickerProps {
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
declare const Sticker: React.FC<DynamicStickerProps>;

declare const FlameSticker: React.FC<StickerProps>;

declare const MetalSticker: React.FC<StickerProps>;

declare const BlobBurstSticker: React.FC<StickerProps>;

declare const StarBurstSticker: React.FC<StickerProps>;

declare const DevilConeSticker: React.FC<StickerProps>;

declare const FlameStarSticker: React.FC<StickerProps>;

declare const FoldedPaperSticker: React.FC<StickerProps>;

declare const BadgeSmileySticker: React.FC<StickerProps>;

declare const CosmicPillSticker: React.FC<StickerProps>;

export { BadgeSmileySticker, BlobBurstSticker, CosmicPillSticker, DevilConeSticker, FlameStarSticker, FlameSticker, FoldedPaperSticker, MetalSticker, STICKER_MAP, StarBurstSticker, Sticker, Sticker as default };
export type { DynamicStickerProps, StickerName, StickerProps };
