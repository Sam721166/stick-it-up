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
type StickerName = "flame" | "metal" | "blob-burst" | "star-burst" | "devil-cone" | "flame-star" | "folded-paper" | "red-berry" | "blueberry" | "berries" | "badge-smiley" | "cosmic-pill" | "red-cat" | "pink-cat" | "pink-cat-stamp" | "yellow-cat" | "black-cat" | "cat" | "cat-serious" | "dog" | "face" | "black-face" | "flower" | "peace-hand" | "sparkles" | "sparkle-trio" | "cosmic-eye" | "curious-globe" | "spiral" | "eye-splat" | "japan-badge" | "cone" | "icy-fleur" | "app-badge" | "bunny" | "cat-sit" | "fish" | "luffy-hat" | "coffee" | "japan-flag" | "cat-cute" | "cherry" | "goo" | "heart" | "nazar" | "bad-cat" | "nori-coffee" | "nori-cool" | "nori-headphones" | "nori-heart" | "nori-laptop" | "nori-rocket" | "pip-coffee" | "pip-detective" | "pip-headphones" | "pip-rocket" | "pip-thinking" | "pip-wizard" | "kuro-coffee" | "kuro-cool" | "kuro-headphones" | "kuro-heart" | "kuro-laptop" | "kuro-rocket" | "mochi-coffee" | "mochi-cool" | "mochi-headphones" | "mochi-heart" | "mochi-laptop" | "mochi-rocket" | "star" | "dogsticker" | "component-66" | "vlc2" | "japan" | "curious-blue-globe" | "cosmiceye" | "sparkletrio" | "catsticker" | "red_cat" | "elon" | "elon-1" | "elon-musk" | "elon-visionary" | "elon-2" | "steve-jobs" | "steve-jobs-1" | "steve-jobs-classic" | "steve-jobs-2" | "jensen-huang" | "jensen" | "mark-zuckerberg" | "zuck" | "mark-socialnetwork" | "mark-social" | "erlich-bachman" | "erlich" | "socialnetwork-badge" | "social-network" | (string & {});

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

declare const YellowCatSticker: React.FC<StickerProps>;

declare const BlackCatSticker: React.FC<StickerProps>;

declare const CatSticker: React.FC<StickerProps>;

declare const CatSeriousSticker: React.FC<StickerProps>;

declare const DogSticker: React.FC<StickerProps>;

declare const FaceSticker: React.FC<StickerProps>;

declare const BlackFaceSticker: React.FC<StickerProps>;

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

declare const BunnySticker: React.FC<StickerProps>;

declare const CatSitSticker: React.FC<StickerProps>;

declare const FishSticker: React.FC<StickerProps>;

declare const LuffyHatSticker: React.FC<StickerProps>;

declare const CoffeeSticker: React.FC<StickerProps>;

declare const JapanFlagSticker: React.FC<StickerProps>;

declare const CatCuteSticker: React.FC<StickerProps>;

declare const CherrySticker: React.FC<StickerProps>;

declare const GooSticker: React.FC<StickerProps>;

declare const HeartSticker: React.FC<StickerProps>;

declare const NazarSticker: React.FC<StickerProps>;

declare const BadCatSticker: React.FC<StickerProps>;

declare const NoriCoffeeSticker: React.FC<StickerProps>;

declare const NoriCoolSticker: React.FC<StickerProps>;

declare const NoriHeadphonesSticker: React.FC<StickerProps>;

declare const NoriHeartSticker: React.FC<StickerProps>;

declare const NoriLaptopSticker: React.FC<StickerProps>;

declare const NoriRocketSticker: React.FC<StickerProps>;

declare const PipCoffeeSticker: React.FC<StickerProps>;

declare const PipDetectiveSticker: React.FC<StickerProps>;

declare const PipHeadphonesSticker: React.FC<StickerProps>;

declare const PipRocketSticker: React.FC<StickerProps>;

declare const PipThinkingSticker: React.FC<StickerProps>;

declare const PipWizardSticker: React.FC<StickerProps>;

declare const KuroCoffeeSticker: React.FC<StickerProps>;

declare const KuroCoolSticker: React.FC<StickerProps>;

declare const KuroHeadphonesSticker: React.FC<StickerProps>;

declare const KuroHeartSticker: React.FC<StickerProps>;

declare const KuroLaptopSticker: React.FC<StickerProps>;

declare const KuroRocketSticker: React.FC<StickerProps>;

declare const MochiCoffeeSticker: React.FC<StickerProps>;

declare const MochiCoolSticker: React.FC<StickerProps>;

declare const MochiHeadphonesSticker: React.FC<StickerProps>;

declare const MochiHeartSticker: React.FC<StickerProps>;

declare const MochiLaptopSticker: React.FC<StickerProps>;

declare const MochiRocketSticker: React.FC<StickerProps>;

declare const ElonSticker: React.FC<StickerProps>;

declare const ElonVisionarySticker: React.FC<StickerProps>;

declare const SteveJobsSticker: React.FC<StickerProps>;

declare const SteveJobsClassicSticker: React.FC<StickerProps>;

declare const JensenHuangSticker: React.FC<StickerProps>;

declare const MarkZuckerbergSticker: React.FC<StickerProps>;

declare const MarkSocialNetworkSticker: React.FC<StickerProps>;

declare const ErlichBachmanSticker: React.FC<StickerProps>;

declare const SocialNetworkBadgeSticker: React.FC<StickerProps>;

export { AppBadgeSticker, BadCatSticker, RedBerrySticker as BadgeSmileySticker, BerriesSticker, BlackCatSticker, BlackFaceSticker, BlobBurstSticker, BlueberrySticker, BunnySticker, CatCuteSticker, CatSeriousSticker, CatSitSticker, CatSticker, CherrySticker, CoffeeSticker, ConeSticker, CosmicEyeSticker, BlueberrySticker as CosmicPillSticker, CuriousGlobeSticker, DevilConeSticker, DogSticker, ElonSticker, ElonVisionarySticker, ErlichBachmanSticker, EyeSplatSticker, FaceSticker, FishSticker, FlameStarSticker, FlameSticker, FlowerSticker, FoldedPaperSticker, GooSticker, HeartSticker, IcyFleurSticker, JapanBadgeSticker, JapanFlagSticker, JensenHuangSticker, KuroCoffeeSticker, KuroCoolSticker, KuroHeadphonesSticker, KuroHeartSticker, KuroLaptopSticker, KuroRocketSticker, LuffyHatSticker, MarkSocialNetworkSticker, MarkZuckerbergSticker, MetalSticker, MochiCoffeeSticker, MochiCoolSticker, MochiHeadphonesSticker, MochiHeartSticker, MochiLaptopSticker, MochiRocketSticker, NazarSticker, NoriCoffeeSticker, NoriCoolSticker, NoriHeadphonesSticker, NoriHeartSticker, NoriLaptopSticker, NoriRocketSticker, PeaceHandSticker, PinkCatSticker as PinkCatStampSticker, PinkCatSticker, PipCoffeeSticker, PipDetectiveSticker, PipHeadphonesSticker, PipRocketSticker, PipThinkingSticker, PipWizardSticker, RedBerrySticker, RedCatSticker, STICKER_MAP, SocialNetworkBadgeSticker, SparkleTrioSticker, SparklesSticker, SpiralSticker, StarBurstSticker, SteveJobsClassicSticker, SteveJobsSticker, Sticker, YellowCatSticker, Sticker as default };
export type { DynamicStickerProps, StickerName, StickerProps };
