# stick-it-up

> Premium vector, holographic & chrome aesthetic sticker components for React.

A curated collection of vector graphic stickers featuring metallic chrome finishes, organic blobs, distressed textures, retro stars, and badges. Built with scoped SVG filters, responsive sizing, and physical vinyl peel effects.

---

## 📦 Installation

```bash
npm install stick-it-up
# or
pnpm add stick-it-up
# or
yarn add stick-it-up
```

---

## 🚀 Quick Start

### 1. Direct Imports (Named & Lightweight)

```tsx
import {
  MetalSticker,
  BlobBurstSticker,
  StarBurstSticker,
  DevilConeSticker,
  FlameStarSticker,
  FoldedPaperSticker,
  BadgeSmileySticker,
  CosmicPillSticker,
} from "stick-it-up";

export function App() {
  return (
    <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
      {/* Basic usage with size */}
      <MetalSticker size={120} />

      {/* Interactive vinyl peel hover effect */}
      <BlobBurstSticker size={100} peel />

      {/* Custom dimensions and classes */}
      <StarBurstSticker width={140} height={120} className="my-sticker" />
    </div>
  );
}
```

### 2. Dynamic Component (`<Sticker name="..." />`)

```tsx
import { Sticker } from "stick-it-up";

export function StickerGallery() {
  const stickers = [
    "metal",
    "blob-burst",
    "star-burst",
    "devil-cone",
    "flame-star",
    "folded-paper",
    "badge-smiley",
    "cosmic-pill",
  ] as const;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
      {stickers.map((name) => (
        <Sticker key={name} name={name} size={90} peel />
      ))}
    </div>
  );
}
```

---

## 🎨 Available Stickers

| Name | Component | Category | Description |
| :--- | :--- | :--- | :--- |
| `flame` | `<FlameSticker />` | Pop & Energy | Punchy dual-tone fire sticker with 3D vinyl hover peel |
| `metal` | `<MetalSticker />` | Chrome & Metal | Specular chrome reflections with deep blue/white gradients & 3D inner shadows |
| `blob-burst` | `<BlobBurstSticker />` | Retro & Pop | Organic electric blue and black fluid burst with layered sticker shadow |
| `star-burst` | `<StarBurstSticker />` | Retro & Pop | Distressed noise texture 4-pointed retro star with white die-cut border |
| `devil-cone` | `<DevilConeSticker />` | Badge & Graphic | Geometric red & gold linear gradient cone badge with character eyes |
| `flame-star` | `<FlameStarSticker />` | Retro & Pop | Expressive cartoon flame star sticker with retro screen-print stipple |
| `folded-paper` | `<FoldedPaperSticker />` | Badge & Graphic | Folded red paper ribbon with realistic creased highlights and edges |
| `badge-smiley` | `<BadgeSmileySticker />` | Badge & Graphic | Coral pink oval badge sticker featuring a smiling star character |
| `cosmic-pill` | `<CosmicPillSticker />` | Badge & Graphic | Purple cosmic pill with glowing neon inner star outline |
| `red-cat` | `<RedCatSticker />` | Characters | Vibrant scarlet silhouette mochi cat with a wide alert stare |
| `pink-cat` | `<PinkCatSticker />` | Characters | Soft pastel pink kitten head with delicate whiskers |
| `pink-cat-stamp` | `<PinkCatStampSticker />` | Characters | Warm bubblegum pink feline stamp with vintage postal edges |
| `yellow-cat` | `<YellowCatSticker />` | Characters | Sunlit yellow doodle cat with playful tilted ears |
| `black-cat` | `<BlackCatSticker />` | Characters | Jet black doodle cat with clean contour lines |
| `cat` | `<CatSticker />` | Characters | Curious cat head with expressive round pupils |
| `cat-serious` | `<CatSeriousSticker />` | Characters | Sharp observant cat sticker |
| `dog` | `<DogSticker />` | Characters | Energetic pup with perked ears and friendly doodle smile |
| `blueberry` | `<BlueberrySticker />` | Symbols | Hand-drawn pastel blueberry with a soft organic highlight |
| `face` | `<FaceSticker />` | Characters | Cheerful classic yellow smiley face with warm blushing eyes |
| `flower` | `<FlowerSticker />` | Symbols | Pastel green daisy with a looping stem and retro botanical feel |
| `peace-hand` | `<PeaceHandSticker />` | Symbols | Pastel neon peace sign hand with a bold graphic contour |
| `sparkles` | `<SparklesSticker />` | Symbols | Crisp four-point sparkle cluster in warm metallic gold |
| `sparkle-trio` | `<SparkleTrioSticker />` | Symbols | Cascading trio of magic twinkle stars |
| `cosmic-eye` | `<CosmicEyeSticker />` | Symbols | Explosive starburst eye badge with vivid cobalt and crimson rays |
| `curious-globe` | `<CuriousGlobeSticker />` | Characters | Blue wireframe world sphere with peeking cartoon eyes |
| `spiral` | `<SpiralSticker />` | Symbols | Vortex coil sticker with tactile hand-inked line weights |
| `eye-splat` | `<EyeSplatSticker />` | Symbols | Graffiti-inspired drip splat with an observant eye core |
| `japan-badge` | `<JapanBadgeSticker />` | Symbols | Tokyo-inspired graphic emblem stamp with stylized kanji character |
| `cone` | `<ConeSticker />` | Symbols | Playful striped orange construction cone sticker |
| `icy-fleur` | `<IcyFleurSticker />` | Chrome & Metal | Liquid chrome heraldic fleur-de-lis with cold mirror reflections |
| `app-badge` | `<AppBadgeSticker />` | Symbols | Tactile app icon badge with rounded square frame and pastel tone |

---

## ⚙️ Props Reference

All sticker components support the following props:

```ts
interface StickerProps extends React.SVGProps<SVGSVGElement> {
  /** Size in pixels (sets both width and height equally). Default: 100 */
  size?: number | string;
  /** Explicit width overriding `size` */
  width?: number | string;
  /** Explicit height overriding `size` */
  height?: number | string;
  /** Adds a dynamic vinyl peel animation and shadow on hover */
  peel?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}
```

---

## 🛠️ Features

- ⚡ **Zero external runtime CSS dependencies** (Pure SVG and inline styles)
- 🔒 **Unique SVG filter IDs** using `useId()` so multiple stickers can render simultaneously without gradient/filter ID collisions
- 🌲 **Tree-shakeable ESM & CommonJS** dual output with complete TypeScript types (`.d.ts`)
- 🪶 **Ultra lightweight** bundle footprint

---

## 📄 License

MIT © [Samiran De](https://github.com/Sam721166)
