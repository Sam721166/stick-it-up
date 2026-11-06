# Contributing to Stick It Up 🎨

Thank you for your interest in contributing to **Stick It Up**! Whether you are a designer sharing playful sticker artwork or a developer adding new features, your contributions are welcome.

---

## 🌟 Ways to Contribute

1. **Submit New Stickers**: Add your vector decals, character doodles, or chrome emblems.
2. **Request Stickers**: Have a cool idea? [Open a Sticker Request issue](https://github.com/Sam721166/stick-it-up/issues/new?labels=sticker-request&title=[Sticker+Request]:+).
3. **Improve Components & Docs**: Fix bugs, enhance accessibility, add animations, or refine documentation.

---

## 🎨 How to Add a New Sticker

### 1. Prepare your SVG
- Create or export your artwork as clean SVG with a `viewBox` (e.g. `0 0 100 100` or similar square/proportional bounds).
- We recommend a die-cut sticker look: a white decal border around the illustration and transparent background.
- Save the file into `public/stickers/<your-sticker-name>.svg` using lowercase kebab-case (e.g. `cosmic-cat.svg`).

### 2. (Optional) Create a React Component
If you want to provide a dedicated lightweight React component in `@stick-it-up`:
1. Add `packages/stickers-react/src/stickers/<ComponentName>Sticker.tsx`.
2. Use `usePeel` hook for 3D vinyl hover peel animation support:
   ```tsx
   import React, { useId } from "react";
   import type { StickerProps } from "../types";
   import { usePeel } from "../utils/usePeel";

   export const CosmicCatSticker: React.FC<StickerProps> = ({
     size = 100,
     width,
     height,
     peel = false,
     className = "",
     style,
     ...props
   }) => {
     const rawId = useId();
     const id = rawId.replace(/[:]/g, "_");
     const { style: peelStyle, onMouseEnter, onMouseLeave } = usePeel(peel, style);

     return (
       <svg
         width={width ?? size}
         height={height ?? size}
         viewBox="0 0 100 100"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
         className={className}
         style={peelStyle}
         onMouseEnter={onMouseEnter}
         onMouseLeave={onMouseLeave}
         role="img"
         aria-label="Cosmic Cat Sticker"
         {...props}
       >
         {/* Your SVG paths */}
       </svg>
     );
   };

   export default CosmicCatSticker;
   ```
3. Add the sticker name to `StickerName` in `packages/stickers-react/src/types.ts`.
4. Export it in `packages/stickers-react/src/index.ts` and add it to the generic `<Sticker />` registry.

### 3. Add to the Web Catalog
In `app/stickers/page.tsx`, add your sticker entry to the `CATALOG` array:
```ts
{
  id: "svg-cosmic-cat",
  name: "cosmic-cat",
  title: "Cosmic Cat",
  category: "characters", // "characters" | "symbols" | "components"
  format: "component",
  componentName: "cosmic-cat",
  svgSrc: "/stickers/cosmic-cat.svg",
  description: "Playful astronaut cat floating through the neon cosmos.",
  tags: ["cat", "space", "cosmic", "character"],
  defaultRotation: 6,
}
```

---

## 🚀 Development & Testing

1. Clone your fork:
   ```bash
   git clone https://github.com/<your-username>/stick-it-up.git
   cd stick-it-up
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the package:
   ```bash
   npm run build:package
   ```
4. Run the local dev server:
   ```bash
   npm run dev
   ```
5. Typecheck:
   ```bash
   npx tsc --noEmit
   ```

---

## 📬 Submitting a Pull Request

1. Create a branch:
   ```bash
   git checkout -b add-sticker-cosmic-cat
   ```
2. Commit your changes:
   ```bash
   git commit -m "feat(stickers): add cosmic-cat sticker"
   ```
3. Push to your fork:
   ```bash
   git push origin add-sticker-cosmic-cat
   ```
4. Open a Pull Request on [GitHub](https://github.com/Sam721166/stick-it-up/pulls) with a quick description and screenshot preview of your sticker!

Thank you for making Stick It Up even more fun! ✌️

