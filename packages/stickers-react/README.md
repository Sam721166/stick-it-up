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

### 1. Named Imports (Tree-shakeable)

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
| `metal` | `<MetalSticker />` | Chrome & Metal | Specular chrome reflections with deep blue/white gradients & 3D inner shadows |
| `blob-burst` | `<BlobBurstSticker />` | Retro & Pop | Organic electric blue and black fluid burst with layered sticker shadow |
| `star-burst` | `<StarBurstSticker />` | Retro & Pop | Distressed noise texture 4-pointed retro star with white die-cut border |
| `devil-cone` | `<DevilConeSticker />` | Badge & Graphic | Geometric red & gold linear gradient cone badge with character eyes |
| `flame-star` | `<FlameStarSticker />` | Retro & Pop | Expressive cartoon flame star sticker with retro screen-print stipple |
| `folded-paper` | `<FoldedPaperSticker />` | Badge & Graphic | Folded red paper ribbon with realistic creased highlights and edges |
| `badge-smiley` | `<BadgeSmileySticker />` | Badge & Graphic | Coral pink oval badge sticker featuring a smiling star character |
| `cosmic-pill` | `<CosmicPillSticker />` | Badge & Graphic | Purple cosmic pill with glowing neon inner star outline |

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
