"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Sticker, type StickerName } from "stick-it-up";
import Footer from "../../components/landing/footer";

const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";
const EASE_OUT = "cubic-bezier(0.2, 0.8, 0.2, 1)";

/* ------------------------------------------------------------------
   Sticker Catalog Data
------------------------------------------------------------------- */

type StickerFormat = "component" | "svg";
type StickerCategory = "all" | "components" | "symbols" | "characters";

interface CatalogItem {
  id: string;
  name: string;
  title: string;
  category: "components" | "symbols" | "characters";
  format: StickerFormat;
  description: string;
  tags: string[];
  componentName?: StickerName;
  svgSrc?: string;
  defaultRotation?: number;
}

const CATALOG: CatalogItem[] = [
  /* Built-in React Components (stick-it-up) */
  {
    id: "comp-flame",
    name: "flame",
    title: "Orange Flame",
    category: "components",
    format: "component",
    componentName: "flame",
    description: "Punchy dual-tone fire sticker with 3D vinyl hover peel.",
    tags: ["flame", "fire", "streak", "orange", "energy", "hot"],
    defaultRotation: -5,
  },
  {
    id: "comp-metal",
    name: "metal",
    title: "Metal Chrome",
    category: "components",
    format: "component",
    componentName: "metal",
    description: "Y2K liquid chrome metallic badge with multi-layer specular reflections.",
    tags: ["chrome", "metal", "y2k", "silver", "liquid"],
    defaultRotation: -4,
  },
  {
    id: "comp-star-burst",
    name: "star-burst",
    title: "Star Burst",
    category: "components",
    format: "component",
    componentName: "star-burst",
    description: "Retro 8-point chrome starburst with high-contrast metallic gradients.",
    tags: ["star", "burst", "retro", "chrome", "sparkle"],
    defaultRotation: 6,
  },
  {
    id: "comp-blob-burst",
    name: "blob-burst",
    title: "Blob Burst",
    category: "components",
    format: "component",
    componentName: "blob-burst",
    description: "Liquid fluid blob star with smooth bevels and glassy chrome depth.",
    tags: ["blob", "liquid", "burst", "organic", "fluid"],
    defaultRotation: -6,
  },
  {
    id: "comp-devil-cone",
    name: "devil-cone",
    title: "Devil Cone",
    category: "components",
    format: "component",
    componentName: "devil-cone",
    description: "Spiked horned cone emblem with polished metallic bevels.",
    tags: ["cone", "devil", "horns", "spikes", "metal"],
    defaultRotation: 5,
  },
  {
    id: "comp-flame-star",
    name: "flame-star",
    title: "Flame Star",
    category: "components",
    format: "component",
    componentName: "flame-star",
    description: "Fiery star emblem combining liquid flame tongues and star rays.",
    tags: ["flame", "star", "fire", "hot", "chrome"],
    defaultRotation: -8,
  },
  {
    id: "comp-folded-paper",
    name: "folded-paper",
    title: "Folded Paper",
    category: "components",
    format: "component",
    componentName: "folded-paper",
    description: "Tactile origami paper decal with multi-plane faceted geometry.",
    tags: ["paper", "folded", "origami", "badge", "minimal"],
    defaultRotation: 4,
  },
  {
    id: "comp-badge-smiley",
    name: "badge-smiley",
    title: "Badge Smiley",
    category: "components",
    format: "component",
    componentName: "badge-smiley",
    description: "Playful distorted smiley emblem with holographic edge contour.",
    tags: ["smiley", "face", "badge", "happy", "distorted"],
    defaultRotation: -5,
  },
  {
    id: "comp-cosmic-pill",
    name: "cosmic-pill",
    title: "Cosmic Pill",
    category: "components",
    format: "component",
    componentName: "cosmic-pill",
    description: "Futuristic chrome capsule badge with metallic specular refraction.",
    tags: ["pill", "capsule", "cosmic", "cyber", "chrome"],
    defaultRotation: 7,
  },

  /* Vector SVG Stickers */
  {
    id: "svg-blueberry",
    name: "blueberry",
    title: "Blueberry",
    category: "symbols",
    format: "svg",
    svgSrc: "/stickers/blueberry.svg",
    description: "Hand-drawn pastel blueberry with a soft organic highlight.",
    tags: ["fruit", "blueberry", "pastel", "food", "cute"],
    defaultRotation: -6,
  },
  {
    id: "svg-face",
    name: "face",
    title: "Smiley Face",
    category: "characters",
    format: "svg",
    svgSrc: "/stickers/face.svg",
    description: "Cheerful classic yellow smiley face with warm blushing eyes.",
    tags: ["face", "smiley", "yellow", "happy", "character"],
    defaultRotation: 8,
  },
  {
    id: "svg-star",
    name: "star",
    title: "Golden Star",
    category: "symbols",
    format: "svg",
    svgSrc: "/stickers/star.svg",
    description: "Hand-crafted five-point doodle star in sunny warm gold.",
    tags: ["star", "gold", "yellow", "doodle", "sparkle"],
    defaultRotation: -10,
  },
  {
    id: "svg-flower",
    name: "flower",
    title: "Spring Flower",
    category: "symbols",
    format: "svg",
    svgSrc: "/stickers/flower.svg",
    description: "Pastel green daisy with a looping stem and retro botanical character.",
    tags: ["flower", "plant", "green", "daisy", "nature"],
    defaultRotation: 12,
  },
  {
    id: "svg-cat",
    name: "cat",
    title: "Monochrome Cat",
    category: "characters",
    format: "svg",
    svgSrc: "/stickers/cat.svg",
    description: "Curious cat head with expressive round pupils and perked ears.",
    tags: ["cat", "pet", "animal", "black", "character"],
    defaultRotation: 0,
  },
  {
    id: "svg-catsticker",
    name: "cat",
    title: "serious Cat",
    category: "characters",
    format: "svg",
    svgSrc: "/stickers/catsticker.svg",
    description: "Curious catsticker head with expressive round pupils and perked ears.",
    tags: ["cat", "pet", "animal", "black", "character"],
    defaultRotation: 0,
  },
  {
    id: "svg-red-cat",
    name: "red-cat",
    title: "Mochi Cat",
    category: "characters",
    format: "svg",
    svgSrc: "/stickers/red_cat.svg",
    description: "Vibrant scarlet silhouette cat with a wide, alert stare.",
    tags: ["cat", "red", "mochi", "kitty", "character"],
    defaultRotation: 6,
  },
  {
    id: "svg-pink-cat",
    name: "pink-cat",
    title: "Pink Kitty",
    category: "characters",
    format: "svg",
    svgSrc: "/stickers/pink-cat.svg",
    description: "Soft pastel pink kitten head with delicate whiskers.",
    tags: ["cat", "pink", "kitten", "cute", "whiskers"],
    defaultRotation: -9,
  },
  {
    id: "svg-pink-cat2",
    name: "pink-cat-stamp",
    title: "Bubblegum Stamp",
    category: "characters",
    format: "svg",
    svgSrc: "/stickers/pink-cat2.svg",
    description: "Warm bubblegum pink feline stamp with vintage postal edges.",
    tags: ["cat", "stamp", "postal", "pink", "bubblegum"],
    defaultRotation: 5,
  },
  {
    id: "svg-yellow-cat",
    name: "yellow-cat",
    title: "Yellow Cat",
    category: "characters",
    format: "svg",
    svgSrc: "/stickers/yellow-cat.svg",
    description: "Sunlit yellow doodle cat with playful tilted ears.",
    tags: ["cat", "yellow", "doodle", "sunny", "kitten"],
    defaultRotation: -8,
  },
  {
    id: "svg-black-cat",
    name: "black-cat",
    title: "black Cat",
    category: "characters",
    format: "svg",
    svgSrc: "/stickers/black-cat.svg",
    description: "Sunlit black doodle cat with playful tilted ears.",
    tags: ["cat", "black", "doodle", "sunny", "kitten"],
    defaultRotation: -8,
  },
  {
    id: "svg-dog",
    name: "dog",
    title: "Playful Dog",
    category: "characters",
    format: "svg",
    svgSrc: "/stickers/dogsticker.svg",
    description: "Energetic pup with perked ears and friendly doodle smile.",
    tags: ["dog", "pup", "pet", "animal", "friendly"],
    defaultRotation: 8,
  },
  {
    id: "svg-flame",
    name: "flame",
    title: "Orange Flame",
    category: "symbols",
    format: "svg",
    svgSrc: "/stickers/Flame.svg",
    description: "Punchy dual-tone fire sticker for streaks, heat, and highlights.",
    tags: ["flame", "fire", "streak", "orange", "energy"],
    defaultRotation: -5,
  },
  {
    id: "svg-peace-hand",
    name: "peace-hand",
    title: "Peace Hand",
    category: "symbols",
    format: "svg",
    svgSrc: "/stickers/Peace-hand.svg",
    description: "Pastel neon peace sign hand with a bold graphic contour line.",
    tags: ["peace", "hand", "v-sign", "victory", "neon"],
    defaultRotation: 14,
  },
  {
    id: "svg-sparkles",
    name: "sparkles",
    title: "Golden Sparkles",
    category: "symbols",
    format: "svg",
    svgSrc: "/stickers/Sparkles.svg",
    description: "Crisp four-point sparkle cluster in warm metallic gold.",
    tags: ["sparkles", "twinkle", "magic", "stars", "gold"],
    defaultRotation: 10,
  },
  {
    id: "svg-sparkle-trio",
    name: "sparkle-trio",
    title: "Sparkle Trio",
    category: "symbols",
    format: "svg",
    svgSrc: "/stickers/SparkleTrio.svg",
    description: "Cascading trio of magic twinkle stars for rewards and alerts.",
    tags: ["sparkles", "trio", "three", "stars", "magic"],
    defaultRotation: -6,
  },
  {
    id: "svg-cosmic-eye",
    name: "cosmic-eye",
    title: "Cosmic Eye",
    category: "symbols",
    format: "svg",
    svgSrc: "/stickers/Cosmiceye.svg",
    description: "Explosive starburst eye badge with vivid cobalt and crimson rays.",
    tags: ["eye", "cosmic", "trippy", "starburst", "vision"],
    defaultRotation: -8,
  },
  {
    id: "svg-blue-globe",
    name: "curious-globe",
    title: "Curious Globe",
    category: "characters",
    format: "svg",
    svgSrc: "/stickers/Curious%20blue%20globe.svg",
    description: "Blue wireframe world sphere with peeking curious cartoon eyes.",
    tags: ["globe", "world", "earth", "eyes", "curious"],
    defaultRotation: 6,
  },
  {
    id: "svg-spiral",
    name: "spiral",
    title: "Hypnotic Spiral",
    category: "symbols",
    format: "svg",
    svgSrc: "/stickers/Spiral.svg",
    description: "Vortex coil sticker with tactile hand-inked line weights.",
    tags: ["spiral", "vortex", "hypnotic", "doodle", "black"],
    defaultRotation: -12,
  },
  {
    id: "svg-eye-splat",
    name: "eye-splat",
    title: "Eye Splat",
    category: "symbols",
    format: "svg",
    svgSrc: "/stickers/Eye Splat.svg",
    description: "Graffiti-inspired drip splat with an observant eye core.",
    tags: ["splat", "eye", "drip", "graffiti", "street"],
    defaultRotation: 7,
  },
  {
    id: "svg-japan",
    name: "japan-badge",
    title: "Tokyo Graphic",
    category: "symbols",
    format: "svg",
    svgSrc: "/stickers/japan.svg",
    description: "Tokyo-inspired graphic emblem stamp with stylized kanji character.",
    tags: ["japan", "tokyo", "stamp", "badge", "kanji"],
    defaultRotation: -5,
  },
  {
    id: "svg-vlc-cone",
    name: "cone",
    title: "Traffic Cone",
    category: "symbols",
    format: "svg",
    svgSrc: "/stickers/vlc2.svg",
    description: "Playful striped orange construction cone sticker for under-construction or alerts.",
    tags: ["cone", "traffic", "orange", "construction", "alert"],
    defaultRotation: 6,
  },
  {
    id: "svg-icy-fleur",
    name: "icy-fleur",
    title: "Icy Fleur-de-lis",
    category: "symbols",
    format: "svg",
    svgSrc: "/stickers/Icy chrome fleur-de-lis sticker.svg",
    description: "Liquid chrome heraldic fleur-de-lis with cold mirror reflections.",
    tags: ["fleur", "chrome", "heraldic", "metal", "silver"],
    defaultRotation: -4,
  },
  {
    id: "svg-app-icon",
    name: "app-badge",
    title: "Icon Badge",
    category: "symbols",
    format: "svg",
    svgSrc: "/stickers/Component-66.svg",
    description: "Tactile app icon badge with rounded square frame and pastel tone.",
    tags: ["app", "badge", "icon", "squircle", "pastel"],
    defaultRotation: 4,
  },
];

/* ------------------------------------------------------------------
   Sticker Visual Renderer
------------------------------------------------------------------- */

function StickerVisual({
  item,
  size = 80,
  peel = false,
  className = "",
}: {
  item: CatalogItem;
  size?: number;
  peel?: boolean;
  className?: string;
}) {
  if (item.format === "component" && item.componentName) {
    return (
      <Sticker
        name={item.componentName}
        size={size}
        peel={peel}
        className={className}
      />
    );
  }

  if (item.svgSrc) {
    return (
      <img
        src={item.svgSrc}
        alt={item.title}
        width={size}
        height={size}
        draggable={false}
        className={`select-none object-contain ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  return null;
}

/* ------------------------------------------------------------------
   Catalog Page
------------------------------------------------------------------- */

export default function StickersCatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState<StickerCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeItem, setActiveItem] = useState<CatalogItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [installCopied, setInstallCopied] = useState(false);

  // Inspector modal states
  const [inspectorSize, setInspectorSize] = useState(130);
  const [inspectorPeel, setInspectorPeel] = useState(true);
  const [inspectorBg, setInspectorBg] = useState<"white" | "zinc" | "warm" | "blue">("white");

  // Quickstart guide interactive state
  const [guideTab, setGuideTab] = useState<"react" | "svg">("react");
  const [guidePm, setGuidePm] = useState<"npm" | "pnpm" | "bun" | "yarn">("npm");
  const [guideSticker, setGuideSticker] = useState<StickerName>("flame");
  const [guidePeel, setGuidePeel] = useState(true);
  const [guideSize, setGuideSize] = useState(96);
  const [guideCopied, setGuideCopied] = useState<"install" | "code" | null>(null);

  useEffect(() => {
    if (!guideCopied) return;
    const t = setTimeout(() => setGuideCopied(null), 1800);
    return () => clearTimeout(t);
  }, [guideCopied]);

  const pmCommands = {
    npm: "npm i stick-it-up",
    pnpm: "pnpm add stick-it-up",
    bun: "bun add stick-it-up",
    yarn: "yarn add stick-it-up",
  };

  async function copyGuideInstall() {
    try {
      await navigator.clipboard.writeText(pmCommands[guidePm]);
      setGuideCopied("install");
    } catch (err) {
      console.error(err);
    }
  }

  async function copyGuideCode() {
    const code =
      guideTab === "react"
        ? `import { Sticker } from "stick-it-up";\n\nexport default function Hero() {\n  return (\n    <Sticker \n      name="${guideSticker}" \n      size={${guideSize}}${
            guidePeel ? " \n      peel" : ""
          } \n    />\n  );\n}`
        : `<img src="/stickers/star.svg" alt="Star sticker" width={${guideSize}} height={${guideSize}} />`;

    try {
      await navigator.clipboard.writeText(code);
      setGuideCopied("code");
    } catch (err) {
      console.error(err);
    }
  }

  // Copy feedback reset
  useEffect(() => {
    if (!copiedId) return;
    const t = setTimeout(() => setCopiedId(null), 1800);
    return () => clearTimeout(t);
  }, [copiedId]);

  useEffect(() => {
    if (!installCopied) return;
    const t = setTimeout(() => setInstallCopied(false), 1800);
    return () => clearTimeout(t);
  }, [installCopied]);

  // Escape key closes modal
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setActiveItem(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Filtered stickers
  const filteredStickers = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return CATALOG.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;

      if (!matchesCategory) return false;
      if (!q) return true;

      return (
        item.name.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    });
  }, [selectedCategory, searchQuery]);

  async function copyInstall() {
    try {
      await navigator.clipboard.writeText("npm i stick-it-up");
      setInstallCopied(true);
    } catch (err) {
      console.error(err);
    }
  }

  async function copyCode(item: CatalogItem, e?: React.MouseEvent) {
    if (e) e.stopPropagation();
    const code =
      item.format === "component"
        ? `<Sticker name="${item.componentName}" size={96} peel />`
        : `<img src="${item.svgSrc}" alt="${item.title}" width={80} height={80} />`;

    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(item.id);
    } catch (err) {
      console.error(err);
    }
  }

  const categoryCounts = useMemo(() => {
    return {
      all: CATALOG.length,
      components: CATALOG.filter((c) => c.category === "components").length,
      symbols: CATALOG.filter((c) => c.category === "symbols").length,
      characters: CATALOG.filter((c) => c.category === "characters").length,
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden w-full bg-white text-zinc-900 antialiased selection:bg-amber-100 selection:text-amber-900">
      <style>{`
        @keyframes headerRise {
          from { opacity: 0; transform: translateY(-10px); filter: blur(6px); }
          to { opacity: 1; transform: translateY(0); filter: none; }
        }
        @keyframes rise {
          from { opacity: 0; transform: translateY(16px); filter: blur(6px); }
          to { opacity: 1; transform: translateY(0); filter: none; }
        }
        @keyframes pop {
          0% { transform: scale(0) rotate(-20deg); opacity: 0; }
          100% { transform: scale(1) rotate(0); opacity: 1; }
        }
      `}</style>

      {/* ------------------------------------------------------------------
          STICKY NAVBAR (consistent with landing page)
      ------------------------------------------------------------------- */}
      <header
        className="sticky top-0 z-50 w-full px-4 py-2 backdrop-blur-md bg-white/80 border-b border-zinc-100"
        style={{ animation: "headerRise 700ms cubic-bezier(0.2, 0.8, 0.2, 1) both" }}
      >
        <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between">
          {/* brand */}
          <Link href="/" className="group flex items-center gap-2.5">
            <img
              src="/stickers/logo.svg"
              alt="Stick it up logo"
              className="h-9 w-9 rounded-lg transition-transform duration-200 group-hover:-rotate-6 group-hover:scale-110"
            />
            <span className="text-lg font-semibold tracking-tight text-zinc-900">
              Stick it up
            </span>
          </Link>

          {/* links */}
          <ul className="hidden items-center gap-1 md:flex">
            <li>
              <Link
                href="/"
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-zinc-600 transition-colors duration-150 hover:bg-zinc-100 hover:text-zinc-900"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/stickers"
                className="rounded-lg bg-zinc-100 px-3.5 py-2 text-sm font-medium text-zinc-900 transition-colors duration-150"
              >
                Stickers
                <span className="ml-1.5 rounded-full bg-zinc-900 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                  {CATALOG.length}
                </span>
              </Link>
            </li>
            <li>
              <a
                href="/#docs"
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-zinc-600 transition-colors duration-150 hover:bg-zinc-100 hover:text-zinc-900"
              >
                Docs
              </a>
            </li>
            <li>
              <a
                href="https://www.npmjs.com/package/stick-it-up"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-zinc-600 transition-colors duration-150 hover:bg-zinc-100 hover:text-zinc-900"
              >
                npm
              </a>
            </li>
          </ul>

          {/* CTA / copy command */}
             <a
            href="#docs"
            className="group inline-flex items-center gap-2 rounded-xl
              border border-zinc-800 bg-gradient-to-b from-zinc-800 to-zinc-900
              px-4 py-2 text-sm font-medium text-white
              shadow-[inset_0_1px_0_#ffffff18,0_1px_2px_#00000015]
              transition-all duration-150
              hover:from-zinc-700 hover:to-zinc-800
              active:translate-y-px active:shadow-inner"
          >
            <span>Log in</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            >
              <path d="M7 17 17 7M7 7h10v10" />
            </svg>
          </a>
        </nav>
      </header>

      {/* ------------------------------------------------------------------
          HERO / INTRO SECTION
      ------------------------------------------------------------------- */}
      <section className="relative mx-auto max-w-6xl px-6 pt-16 pb-12 sm:pt-20 sm:pb-16 text-center">
        

        {/* Title */}
        <h1
          className=" font-sans text-4xl font-normal leading-[1.08] tracking-tight text-zinc-900 sm:text-6xl"
          style={{ animation: "rise 700ms cubic-bezier(0.2, 0.8, 0.2, 1) 80ms both" }}
        >
          Stick it on.
          <br />
          <span className="text-zinc-500">Pick any sticker, drop it in.</span>
        </h1>

        
        {/* Quick Install Bar (Minimal) */}
        <div
          className="mt-8 flex items-center justify-center gap-2"
          style={{ animation: "rise 700ms cubic-bezier(0.2, 0.8, 0.2, 1) 240ms both" }}
        >
          <button
            onClick={copyInstall}
            type="button"
            className="group inline-flex items-center gap-3 rounded-full border border-zinc-200/90 bg-white px-3.5 py-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:border-zinc-300 hover:bg-zinc-50/60 active:scale-[0.98]"
          >
            <span className="font-mono text-xs text-zinc-500 group-hover:text-zinc-700">
              <span className="mr-1.5 select-none text-zinc-400">$</span>npm i stick-it-up
            </span>
            <span className="flex items-center text-[11px] font-medium text-zinc-500 transition-colors group-hover:text-zinc-900">
              {installCopied ? (
                <span className="flex items-center gap-1 text-emerald-600">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3 w-3">
                    <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  copied
                </span>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5 text-zinc-400 group-hover:text-zinc-600">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              )}
            </span>
          </button>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Repository"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200/90 bg-white text-zinc-600 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:border-zinc-300 hover:bg-zinc-50/60 hover:text-zinc-950 active:scale-95"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          CONTROLS: SEARCH & CATEGORY FILTER TABS
      ------------------------------------------------------------------- */}
      <section className="sticky top-[65px] z-30 mx-auto max-w-6xl px-6 pb-6">
        <div className="flex flex-col gap-3 rounded-2xl border border-zinc-200/90 bg-white/95 p-2 shadow-sm backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
          {/* Filter tabs */}
          <div className="flex flex-wrap items-center gap-1">
            {(
              [
                { id: "all", label: "All Stickers", count: categoryCounts.all },
                { id: "components", label: "React Components", count: categoryCounts.components },
                { id: "symbols", label: "Symbols & Badges", count: categoryCounts.symbols },
                { id: "characters", label: "Characters", count: categoryCounts.characters },
              ] as const
            ).map((tab) => {
              const active = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`cursor-pointer rounded-xl px-3.5 py-2 text-xs font-medium transition-all duration-150 ${
                    active
                      ? "bg-zinc-900 text-white shadow-sm"
                      : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] ${
                      active ? "bg-zinc-700 text-zinc-200" : "bg-zinc-100 text-zinc-500"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search bar */}
          <div className="relative min-w-[220px]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stickers..."
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50/70 py-1.5 pl-8 pr-8 text-xs text-zinc-900 placeholder-zinc-400 outline-none transition-all focus:border-zinc-400 focus:bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-700"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          STICKER GRID
      ------------------------------------------------------------------- */}
      <main className="mx-auto max-w-6xl px-6 pb-24">
        {filteredStickers.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-200 py-20 text-center">
            <p className="font-sans text-xl font-medium text-zinc-700">No stickers found</p>
            <p className="mt-1 text-sm text-zinc-400">
              Try searching for &ldquo;cat&rdquo;, &ldquo;star&rdquo;, &ldquo;flame&rdquo;, or &ldquo;chrome&rdquo;.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="mt-4 cursor-pointer rounded-xl bg-zinc-900 px-4 py-2 text-xs font-medium text-white transition-all hover:bg-zinc-800"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 sm:gap-4">
            {filteredStickers.map((item) => {
              const isCopied = copiedId === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveItem(item)}
                  className="group relative flex min-h-[168px] flex-col items-center justify-between rounded-2xl border border-zinc-200/80 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-[0_6px_20px_rgba(0,0,0,0.04)] cursor-pointer"
                >
                  {/* Subtle top-right copy button on hover */}
                  <button
                    type="button"
                    onClick={(e) => copyCode(item, e)}
                    title="Copy JSX code"
                    className={`absolute right-2.5 top-2.5 rounded-lg p-1.5 transition-all ${
                      isCopied
                        ? "opacity-100 bg-emerald-50 text-emerald-600"
                        : "opacity-0 group-hover:opacity-100 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
                    }`}
                  >
                    {isCopied ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3.5 w-3.5">
                        <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                    )}
                  </button>

                  {/* Sticker visual */}
                  <div className="flex flex-1 items-center justify-center py-2">
                    <div
                      className="transition-transform duration-200 group-hover:scale-110"
                      style={{
                        transform: `rotate(${item.defaultRotation || 0}deg)`,
                      }}
                    >
                      <StickerVisual item={item} size={74} peel={false} />
                    </div>
                  </div>

                  {/* Name in Geist font */}
                  <span className="w-full truncate text-center font-sans text-xs font-medium text-zinc-600 transition-colors duration-150 group-hover:text-zinc-950">
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </main>

   {/* ------------------------------------------------------------------
    DEVELOPER GUIDE (minimal)
    Drop-in replacement. Uses the state/handlers already in the page:
    guideTab, guidePm, guideSticker, guidePeel, guideSize, guideCopied,
    pmCommands, copyGuideInstall, copyGuideCode
------------------------------------------------------------------- */}
        <section
        id="docs"
        className="scroll-mt-24 border-t border-zinc-200 bg-white px-6 py-20"
        >
        <div className="mx-auto max-w-3xl">
            {/* Header */}
            <header>
            <h2 className="font-sans text-2xl font-semibold tracking-tight text-zinc-900">
                Usage
            </h2>
            <p className="mt-1.5 text-sm text-zinc-500">
                Add stickers to a React or Next.js app.
            </p>
            </header>

            {/* Tabs */}
            <div role="tablist" className="mt-8 flex gap-6 border-b border-zinc-200 text-sm">
            {(
                [
                { id: "react", label: "React" },
                { id: "svg", label: "SVG" },
                ] as const
            ).map((t) => (
                <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={guideTab === t.id}
                onClick={() => setGuideTab(t.id)}
                className={`-mb-px cursor-pointer border-b-2 pb-2.5 font-medium transition-colors ${
                    guideTab === t.id
                    ? "border-zinc-900 text-zinc-900"
                    : "border-transparent text-zinc-400 hover:text-zinc-700"
                }`}
                >
                {t.label}
                </button>
            ))}
            </div>

            {guideTab === "react" ? (
            <div className="mt-10 space-y-12">
                {/* 1. Install */}
                <div>
                <h3 className="text-sm font-medium text-zinc-900">
                    <span className="mr-2 font-mono text-zinc-400">01</span>Install
                </h3>

                <div className="mt-4 overflow-hidden rounded-xl border border-zinc-200">
                    <div className="flex gap-4 border-b border-zinc-200 bg-zinc-50 px-4 py-2 font-mono text-[11px]">
                    {(["npm", "pnpm", "bun", "yarn"] as const).map((pm) => (
                        <button
                        key={pm}
                        type="button"
                        onClick={() => setGuidePm(pm)}
                        className={`cursor-pointer transition-colors ${
                            guidePm === pm
                            ? "font-semibold text-zinc-900"
                            : "text-zinc-400 hover:text-zinc-700"
                        }`}
                        >
                        {pm}
                        </button>
                    ))}
                    </div>
                    <div className="flex items-center justify-between bg-white px-4 py-3 font-mono text-xs text-zinc-800">
                    <span>
                        <span className="mr-2 select-none text-zinc-400">$</span>
                        {pmCommands[guidePm]}
                    </span>
                    <button
                        type="button"
                        onClick={copyGuideInstall}
                        className={`cursor-pointer font-sans text-[11px] font-medium transition-colors  px-2 py-1 ${
                        guideCopied === "install"
                            ? "text-emerald-500"
                            : "text-zinc-400 hover:text-zinc-600"
                        }`}
                    >
                        {guideCopied === "install" ? "Copied" : "Copy"}
                    </button>
                    </div>
                </div>
                </div>

                {/* 2. Use */}
                <div>
                <h3 className="text-sm font-medium text-zinc-900">
                    <span className="mr-2 font-mono text-zinc-400">02</span>Use
                </h3>

                <div className="mt-4 grid gap-4 md:grid-cols-5">
                    {/* Code */}
                    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white md:col-span-3">
                    <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-4 py-2">
                        <span className="font-mono text-[11px] text-zinc-500">Hero.tsx</span>
                        <button
                        type="button"
                        onClick={copyGuideCode}
                        className={`cursor-pointer text-[11px] font-medium transition-colors ${
                            guideCopied === "code"
                            ? "text-emerald-600 font-semibold"
                            : "text-zinc-400 hover:text-zinc-600"
                        }`}
                        >
                        {guideCopied === "code" ? "Copied" : "Copy"}
                        </button>
                    </div>
                    <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-zinc-950">
                        <code>{`import { Sticker } from "stick-it-up";

export default function Hero() {
  return (
    <Sticker
      name="${guideSticker}"
      size={${guideSize}}${guidePeel ? "\n      peel" : ""}
    />
  );
}`}</code>
                    </pre>
                    </div>

                    {/* Preview + controls */}
                    <div className="flex flex-col overflow-hidden rounded-xl border border-zinc-200 md:col-span-2">
                    <div className="flex min-h-[160px] flex-1 items-center justify-center bg-zinc-50 p-6">
                        <Sticker name={guideSticker} size={guideSize} peel={guidePeel} />
                    </div>

                    <dl className="divide-y divide-zinc-200 border-t border-zinc-200 bg-white text-[11px]">
                        <div className="flex items-center justify-between gap-2 px-3 py-2">
                        <dt className="text-zinc-500">Sticker</dt>
                        <dd className="flex flex-wrap justify-end gap-1">
                            {(
                            [
                                { id: "flame", label: "flame" },
                                { id: "star-burst", label: "star" },
                                { id: "metal", label: "metal" },
                                { id: "devil-cone", label: "devil" },
                            ] as const
                            ).map((s) => (
                            <button
                                key={s.id}
                                type="button"
                                onClick={() => setGuideSticker(s.id)}
                                className={`cursor-pointer rounded-md px-1.5 py-0.5 transition-colors ${
                                guideSticker === s.id
                                    ? "bg-zinc-900 text-white"
                                    : "text-zinc-500 hover:text-zinc-900"
                                }`}
                            >
                                {s.label}
                            </button>
                            ))}
                        </dd>
                        </div>

                        <div className="flex items-center justify-between px-3 py-2">
                        <dt className="text-zinc-500">Size</dt>
                        <dd className="flex gap-1 font-mono">
                            {[64, 96, 120].map((sz) => (
                            <button
                                key={sz}
                                type="button"
                                onClick={() => setGuideSize(sz)}
                                className={`cursor-pointer rounded-md px-1.5 py-0.5 transition-colors ${
                                guideSize === sz
                                    ? "bg-zinc-900 text-white"
                                    : "text-zinc-500 hover:text-zinc-900"
                                }`}
                            >
                                {sz}
                            </button>
                            ))}
                        </dd>
                        </div>

                        <div className="flex items-center justify-between px-3 py-2">
                        <dt className="text-zinc-500">Peel on hover</dt>
                        <dd>
                            <button
                            type="button"
                            role="switch"
                            aria-checked={guidePeel}
                            aria-label="Peel on hover"
                            onClick={() => setGuidePeel(!guidePeel)}
                            className={`relative inline-flex h-4 w-7 cursor-pointer items-center rounded-full transition-colors ${
                                guidePeel ? "bg-zinc-900" : "bg-zinc-300"
                            }`}
                            >
                            <span
                                className={`inline-block h-3 w-3 rounded-full bg-white transition-transform ${
                                guidePeel ? "translate-x-3.5" : "translate-x-0.5"
                                }`}
                            />
                            </button>
                        </dd>
                        </div>
                    </dl>
                    </div>
                </div>
                </div>

                {/* 3. Props */}
                <div>
                <h3 className="text-sm font-medium text-zinc-900">
                    <span className="mr-2 font-mono text-zinc-400">03</span>Props
                </h3>

                <dl className="mt-4 divide-y divide-zinc-200 border-y border-zinc-200">
                    {[
                    { name: "name", type: "string", desc: 'Sticker ID, e.g. "star-burst". Required.' },
                    { name: "size", type: "number | string", desc: "Width and height in pixels. Default 96." },
                    { name: "peel", type: "boolean", desc: "3D tilt and shadow on hover." },
                    { name: "className", type: "string", desc: "Extra classes for rotation, margin, etc." },
                    ].map((p) => (
                    <div
                        key={p.name}
                        className="grid items-baseline gap-x-4 gap-y-1 py-3 text-xs sm:grid-cols-[7rem_9rem_1fr]"
                    >
                        <dt className="font-mono font-semibold text-zinc-900">{p.name}</dt>
                        <dd className="font-mono text-zinc-400">{p.type}</dd>
                        <dd className="text-zinc-600">{p.desc}</dd>
                    </div>
                    ))}
                </dl>
                </div>
            </div>
            ) : (
            <div className="mt-10 space-y-4">
                <p className="text-sm text-zinc-500">
                Static vector files live in{" "}
                <code className="font-mono text-xs text-zinc-800">/public/stickers/</code>. No
                dependencies needed.
                </p>

                <div className="overflow-hidden rounded-xl border border-zinc-800 bg-[#0c0d0e]">
                <div className="flex items-center justify-between border-b border-zinc-800/80 bg-[#141517] px-4 py-2">
                    <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-red-500/80" />
                        <span className="h-2 w-2 rounded-full bg-amber-500/80" />
                        <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="ml-1.5 font-mono text-[11px] text-zinc-400">index.html</span>
                    </div>
                    <button
                    type="button"
                    onClick={copyGuideCode}
                    className={`cursor-pointer text-[11px] font-medium transition-colors ${
                        guideCopied === "code"
                        ? "text-emerald-400 font-semibold"
                        : "text-zinc-400 hover:text-white"
                    }`}
                    >
                    {guideCopied === "code" ? "Copied ✓" : "Copy"}
                    </button>
                </div>
                <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-zinc-300">
                    <code>{`<img
  src="/stickers/Flame.svg"
  alt="Flame sticker"
  width={${guideSize}}
  height={${guideSize}}
/>`}</code>
                </pre>
                </div>
            </div>
            )}
        </div>
        </section>

      {/* ------------------------------------------------------------------
          INSPECTOR / PREVIEW MODAL
      ------------------------------------------------------------------- */}
        {/* ------------------------------------------------------------------
    INSPECTOR MODAL (drop-in replacement)
    Uses existing page state: activeItem, setActiveItem, inspectorBg,
    setInspectorBg, inspectorSize, setInspectorSize, inspectorPeel,
    setInspectorPeel, copiedId, setCopiedId, StickerVisual
------------------------------------------------------------------- */}
{activeItem &&
  (() => {
    const isComponent = activeItem.format === "component";

    // The snippet shown below is exactly what gets copied.
    const code = isComponent
      ? `import { Sticker } from "stick-it-up";\n\n<Sticker\n  name="${activeItem.componentName}"\n  size={${inspectorSize}}${
          inspectorPeel ? "\n  peel" : ""
        }\n/>`
      : `<img\n  src="${activeItem.svgSrc}"\n  alt="${activeItem.title}"\n  width={${inspectorSize}}\n  height={${inspectorSize}}${
          inspectorPeel ? "\n  peel" : ""
        }\n/>`;

    const copied = copiedId === activeItem.id;

    async function copySnippet() {
      try {
        await navigator.clipboard.writeText(code);
        setCopiedId(activeItem!.id);
      } catch (err) {
        console.error(err);
      }
    }

    function downloadSvg() {
      if (activeItem?.svgSrc) {
        const a = document.createElement("a");
        a.href = activeItem.svgSrc;
        a.download = `${activeItem.name}.svg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        return;
      }
      const stage = document.getElementById("inspector-sticker-stage");
      const svgEl = stage?.querySelector("svg");
      if (svgEl) {
        const svgClone = svgEl.cloneNode(true) as SVGSVGElement;
        svgClone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        const svgData = new XMLSerializer().serializeToString(svgClone);
        const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${activeItem?.name || "sticker"}.svg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    }

    const backgrounds = [
      { id: "white", label: "White", swatch: "bg-white border-zinc-300", stage: "bg-white" },
      { id: "zinc", label: "Dark", swatch: "bg-zinc-900 border-zinc-700", stage: "bg-zinc-950" },
      { id: "warm", label: "Warm", swatch: "bg-amber-100 border-amber-300", stage: "bg-[#fff7ed]" },
      { id: "blue", label: "Cool", swatch: "bg-blue-100 border-blue-300", stage: "bg-[#eff6ff]" },
    ] as const;

    const stage = backgrounds.find((b) => b.id === inspectorBg) ?? backgrounds[0];
    const dark = inspectorBg === "zinc";

    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${activeItem.title} sticker`}
        onClick={() => setActiveItem(null)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative flex max-h-[92vh] w-full max-w-md flex-col overflow-y-auto rounded-3xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.08),0_24px_60px_rgba(0,0,0,0.18)] animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 px-6 pt-6">
            <div>
              <h3 className="font-sans text-xl font-semibold tracking-tight text-zinc-900">
                {activeItem.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setActiveItem(null)}
              aria-label="Close"
              className="-mr-2 -mt-1 shrink-0 cursor-pointer rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Preview */}
          <div className="px-6 pt-5">
            <div
              className={`relative flex h-48 items-center justify-center overflow-hidden rounded-2xl border border-zinc-200 transition-colors duration-300 ${stage.stage}`}
            >
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(${
                    dark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.07)"
                  } 1px, transparent 1px)`,
                  backgroundSize: "14px 14px",
                }}
              />
              <div id="inspector-sticker-stage" className="relative">
                <StickerVisual
                  item={activeItem}
                  size={inspectorSize}
                  peel={isComponent ? inspectorPeel : false}
                  className={
                    !isComponent && inspectorPeel
                      ? "transition-all duration-300 hover:scale-105 hover:-rotate-2 hover:drop-shadow-[0_20px_25px_rgba(0,0,0,0.25)] cursor-pointer"
                      : ""
                  }
                />
              </div>
              
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-3.5 px-6 pt-5 text-xs">
            <div className="flex items-center gap-4">
              <span className="w-20 shrink-0 font-medium text-zinc-500">Size</span>
              <input
                type="range"
                min="48"
                max="180"
                value={inspectorSize}
                onChange={(e) => setInspectorSize(Number(e.target.value))}
                aria-label="Sticker size"
                className="h-1 flex-1 cursor-pointer accent-zinc-900"
              />
              <span className="w-11 text-right font-mono text-[11px] text-zinc-500">
                {inspectorSize}px
              </span>
            </div>

            {/* Background + Peel effect (same flex row, justify-between) */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-medium text-zinc-500">Background</span>
                <div className="flex items-center gap-2">
                  {backgrounds.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      title={b.label}
                      aria-label={`${b.label} background`}
                      aria-pressed={inspectorBg === b.id}
                      onClick={() => setInspectorBg(b.id)}
                      className={`h-5 w-5 cursor-pointer rounded-full border transition-transform ${b.swatch} ${
                        inspectorBg === b.id
                          ? "scale-110 ring-2 ring-zinc-900 ring-offset-2"
                          : "hover:scale-110"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-medium text-zinc-500">Peel effect</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={inspectorPeel}
                  aria-label="Peel effect on hover"
                  onClick={() => setInspectorPeel(!inspectorPeel)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ${
                    inspectorPeel ? "bg-zinc-900" : "bg-zinc-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${
                      inspectorPeel ? "translate-x-[18px]" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Usage */}
          <div className="px-6 pb-6 pt-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-900">Usage</span>
              <button
                type="button"
                onClick={downloadSvg}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-zinc-100 px-2.5 py-1 text-[11px] font-medium text-zinc-700 transition-colors hover:bg-zinc-200 hover:text-zinc-900 active:scale-95"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                Download SVG
              </button>
            </div>

            <div className="mt-2.5 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50">
              <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-2">
                <span className="font-mono text-[11px] text-zinc-400">
                  {isComponent ? "Component.tsx" : "index.html"}
                </span>
                <button
                  type="button"
                  onClick={copySnippet}
                  className={`cursor-pointer rounded-md px-2.5 py-1 text-[11px] font-medium transition-all active:scale-95 ${
                    copied
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-white text-zinc-700 shadow-[0_0_0_1px_rgba(0,0,0,0.08)] hover:bg-zinc-100"
                  }`}
                >
                  {copied ? "Copied ✓" : "Copy code"}
                </button>
              </div>
              <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-zinc-800">
                <code>{code}</code>
              </pre>
            </div>

            
          </div>
        </div>
      </div>
    );
  })()}


      {/* ------------------------------------------------------------------
          FOOTER (shared from landing page)
      ------------------------------------------------------------------- */}
      <Footer />
    </div>
  );
}
