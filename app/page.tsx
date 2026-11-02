"use client";

import React, { useState } from "react";
import {
  Sticker,
  MetalSticker,
  BlobBurstSticker,
  StarBurstSticker,
  DevilConeSticker,
  FlameStarSticker,
  FoldedPaperSticker,
  BadgeSmileySticker,
  CosmicPillSticker,
  StickerName,
} from "stick-it-up";
import { Copy, Check, Sparkles, Terminal, Sliders, Layers } from "lucide-react";

interface StickerItem {
  id: StickerName;
  name: string;
  componentName: string;
  category: "Chrome & Metal" | "Retro & Pop" | "Badge & Graphic";
  description: string;
  Component: React.ComponentType<{ size?: number | string; peel?: boolean }>;
}

const STICKERS: StickerItem[] = [
  {
    id: "metal",
    name: "Chrome Shuriken",
    componentName: "MetalSticker",
    category: "Chrome & Metal",
    description: "Specular chrome reflections with deep blue/white gradients and 3D inner shadows",
    Component: MetalSticker,
  },
  {
    id: "blob-burst",
    name: "Blob Burst",
    componentName: "BlobBurstSticker",
    category: "Retro & Pop",
    description: "Organic electric blue and black fluid burst with layered sticker shadow",
    Component: BlobBurstSticker,
  },
  {
    id: "star-burst",
    name: "Distressed Star",
    componentName: "StarBurstSticker",
    category: "Retro & Pop",
    description: "Distressed noise texture 4-pointed retro star with white die-cut border",
    Component: StarBurstSticker,
  },
  {
    id: "devil-cone",
    name: "Devil Horns",
    componentName: "DevilConeSticker",
    category: "Badge & Graphic",
    description: "Geometric red & gold linear gradient cone badge with character eyes",
    Component: DevilConeSticker,
  },
  {
    id: "flame-star",
    name: "Flame Creature",
    componentName: "FlameStarSticker",
    category: "Retro & Pop",
    description: "Expressive cartoon flame star sticker with retro screen-print stipple",
    Component: FlameStarSticker,
  },
  {
    id: "folded-paper",
    name: "Origami Ribbon",
    componentName: "FoldedPaperSticker",
    category: "Badge & Graphic",
    description: "Folded red paper ribbon with realistic creased highlights and edges",
    Component: FoldedPaperSticker,
  },
  {
    id: "badge-smiley",
    name: "Smile Badge",
    componentName: "BadgeSmileySticker",
    category: "Badge & Graphic",
    description: "Coral pink oval badge sticker featuring a smiling star character",
    Component: BadgeSmileySticker,
  },
  {
    id: "cosmic-pill",
    name: "Cosmic Pill",
    componentName: "CosmicPillSticker",
    category: "Badge & Graphic",
    description: "Purple cosmic pill with glowing neon inner star outline",
    Component: CosmicPillSticker,
  },
];

export default function StickerShowcase() {
  const [size, setSize] = useState(130);
  const [peel, setPeel] = useState(true);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [search, setSearch] = useState("");

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const filteredStickers = STICKERS.filter((s) => {
    const matchesCategory = filterCategory === "All" || s.category === filterCategory;
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.componentName.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col items-center px-4 py-12 selection:bg-rose-500/30 selection:text-white">
      {/* Background Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-rose-500/10 via-amber-500/5 to-transparent blur-[160px] opacity-70" />
      </div>

      {/* Hero Header */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-medium text-rose-300 mb-5 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          <span>NPM Package Initialized: stick-it-up v0.1.0</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-4">
          Stickers for React
        </h1>

        <p className="max-w-2xl text-base sm:text-lg text-zinc-400 leading-relaxed mb-8">
          Import premium vector stickers, chrome finishes, and pop-art decals into any React or Next.js app with responsive sizing, peel hover effects, and scoped SVG filters.
        </p>

        {/* Quick Install Bar */}
        <div className="flex items-center gap-2 p-1.5 pl-4 pr-2 rounded-2xl bg-zinc-900/90 border border-white/10 shadow-2xl backdrop-blur-xl">
          <Terminal className="w-4 h-4 text-zinc-500" />
          <code className="text-sm font-mono text-zinc-200">npm install stick-it-up</code>
          <button
            onClick={() => copyToClipboard("npm install stick-it-up", "npm-install")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-white transition-all cursor-pointer"
          >
            {copiedKey === "npm-install" ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-zinc-400" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="relative z-10 w-full max-w-5xl mb-8 p-4 rounded-2xl bg-zinc-900/80 border border-white/10 backdrop-blur-xl flex flex-wrap items-center justify-between gap-4">
        {/* Category Filters */}
        <div className="flex items-center gap-1.5">
          {["All", "Chrome & Metal", "Retro & Pop", "Badge & Graphic"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                filterCategory === cat
                  ? "bg-white text-black shadow-md font-semibold"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sliders & Toggles */}
        <div className="flex items-center gap-6">
          {/* Size Slider */}
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Sliders className="w-3.5 h-3.5" />
            <span>Size:</span>
            <input
              type="range"
              min="70"
              max="200"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-24 accent-rose-500 cursor-pointer"
            />
            <span className="w-10 font-mono text-zinc-200">{size}px</span>
          </div>

          {/* Peel Toggle */}
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Layers className="w-3.5 h-3.5" />
            <span>Peel Effect:</span>
            <button
              onClick={() => setPeel(!peel)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                peel ? "bg-rose-500/20 text-rose-300 border border-rose-500/30" : "bg-white/5 text-zinc-500 border border-white/5"
              }`}
            >
              {peel ? "ON" : "OFF"}
            </button>
          </div>
        </div>
      </div>

      {/* Sticker Grid */}
      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        {filteredStickers.map((sticker) => {
          const importCode = `import { ${sticker.componentName} } from "stick-it-up";`;
          const usageCode = `<${sticker.componentName} size={${size}}${peel ? " peel" : ""} />`;

          return (
            <div
              key={sticker.id}
              className="group relative rounded-2xl bg-zinc-900/60 hover:bg-zinc-900/90 border border-white/[0.08] hover:border-white/20 p-5 flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              {/* Sticker Preview Box */}
              <div className="relative w-full h-44 rounded-xl bg-black/40 border border-white/5 flex items-center justify-center overflow-hidden mb-4 p-2">
                {/* Subtle checkered sticker artboard background */}
                <div
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)`,
                    backgroundSize: "14px 14px",
                  }}
                />

                <div className="relative z-10 flex items-center justify-center">
                  <sticker.Component size={size} peel={peel} />
                </div>
              </div>

              {/* Info */}
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <h3 className="font-semibold text-white text-sm">{sticker.name}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-zinc-400 border border-white/5">
                  {sticker.category}
                </span>
              </div>

              <code className="text-xs font-mono text-rose-300/80 mb-2">{`<${sticker.componentName} />`}</code>

              <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2 mb-4 flex-1">
                {sticker.description}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                <button
                  onClick={() => copyToClipboard(importCode, `imp-${sticker.id}`)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  title="Copy import syntax"
                >
                  {copiedKey === `imp-${sticker.id}` ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Import</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-zinc-400" />
                      <span>Import</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => copyToClipboard(usageCode, `use-${sticker.id}`)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-[11px] text-rose-300 hover:text-rose-200 transition-colors cursor-pointer"
                  title="Copy JSX code"
                >
                  {copiedKey === `use-${sticker.id}` ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">JSX</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-rose-400" />
                      <span>JSX</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Code Examples Section */}
      <div className="relative z-10 w-full max-w-5xl rounded-3xl bg-zinc-900/70 border border-white/10 p-6 sm:p-8 backdrop-blur-xl">
        <h2 className="text-xl font-bold text-white mb-2">How to Use in Your Project</h2>
        <p className="text-sm text-zinc-400 mb-6">
          Both tree-shakeable named imports and polymorphic dynamic components are supported.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Method 1: Named Imports */}
          <div className="rounded-2xl bg-black/60 border border-white/5 p-5">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-2">
              Method 1: Direct Component Import
            </span>
            <pre className="text-xs font-mono text-zinc-300 leading-relaxed overflow-x-auto">
              <code>{`import { MetalSticker, BlobBurstSticker } from "stick-it-up";

export function Header() {
  return (
    <div className="flex gap-4">
      {/* Standalone metallic chrome sticker */}
      <MetalSticker size={120} />

      {/* Interactive hover vinyl peel */}
      <BlobBurstSticker size={100} peel />
    </div>
  );
}`}</code>
            </pre>
          </div>

          {/* Method 2: Dynamic <Sticker name="..." /> */}
          <div className="rounded-2xl bg-black/60 border border-white/5 p-5">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-2">
              Method 2: Dynamic Sticker Component
            </span>
            <pre className="text-xs font-mono text-zinc-300 leading-relaxed overflow-x-auto">
              <code>{`import { Sticker } from "stick-it-up";

export function StickerList() {
  return (
    <div>
      <Sticker name="metal" size={100} peel />
      <Sticker name="star-burst" size={80} />
      <Sticker name="devil-cone" size={90} />
    </div>
  );
}`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
