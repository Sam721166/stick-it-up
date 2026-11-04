"use client";

import { useState } from "react";

const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";

const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

type FooterLink = {
  label: string;
  href: string;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

const COLUMNS: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Sticker Pack", href: "#stickers" },
      { label: "Documentation", href: "#docs" },
      { label: "Components", href: "#" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "GitHub Repo", href: "https://github.com" },
      { label: "npm Package", href: "https://www.npmjs.com/package/stick-it-up" },
      { label: "Showcase", href: "#" },
      { label: "Playground", href: "#" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Twitter / X", href: "https://x.com" },
      { label: "Discord", href: "#" },
      { label: "License (MIT)", href: "#" },
      { label: "Feedback", href: "#" },
    ],
  },
];

/* Interactive sticker chip sitting on top of the letters */
function StickerChip({
  color,
  shape = "square",
  style,
  rot = 0,
}: {
  color: string;
  shape?: "circle" | "square";
  style: React.CSSProperties;
  rot?: number;
}) {
  const [hover, setHover] = useState(false);
  const [clicked, setClicked] = useState(false);

  return (
    <div
      onClick={() => {
        setClicked(true);
        setTimeout(() => setClicked(false), 300);
      }}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      className="absolute cursor-pointer transition-transform select-none"
      style={{
        ...style,
        transform: `rotate(${rot + (hover ? 8 : 0) + (clicked ? -6 : 0)}deg) scale(${
          clicked ? 0.9 : hover ? 1.18 : 1
        })`,
        transitionDuration: "250ms",
        transitionTimingFunction: SPRING,
        zIndex: 20,
      }}
    >
      <div
        className="w-full h-full shadow-[0_2px_4px_rgba(0,0,0,0.14)]"
        style={{
          background: color,
          borderRadius: shape === "circle" ? "999px" : "28%",
          border: "2px solid rgba(25, 25, 25, 0.85)",
          boxShadow: hover
            ? "0 6px 14px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.6)"
            : "0 2px 5px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.4)",
        }}
      />
    </div>
  );
}

export default function Footer() {
  return (
    <footer
      className="relative z-10 mx-4 mb-8 overflow-hidden rounded-[40px] px-6 pt-12 sm:px-12 sm:pt-16 pb-0"
      style={{
        background: "linear-gradient(180deg, #52aef9 0%, #3e9cf2 100%)",
        border: "1px solid rgba(255,255,255,0.45)",
        boxShadow:
          "inset 0 1.5px 0 rgba(255,255,255,0.7), inset 0 -2px 10px rgba(0,0,0,0.06), 0 20px 40px -15px rgba(30,120,230,0.3)",
      }}
    >
      {/* Paper grain */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: GRAIN, opacity: 0.04, mixBlendMode: "multiply" }}
      />

      {/* Top 3 Navigation Columns */}
      <div className="relative z-10 mx-auto max-w-4xl grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-12 text-center sm:text-left mb-16 sm:mb-20">
        {COLUMNS.map((col) => (
          <div key={col.title} className="flex flex-col items-center sm:items-start">
            {/* White pill header from the image */}
            <span
              className="inline-block rounded-full bg-white px-6 py-2 text-xs font-bold tracking-wider text-sky-600 shadow-[0_2px_4px_rgba(0,0,0,0.08),inset_0_1px_0_#fff] uppercase"
            >
              {col.title}
            </span>

            {/* Links underneath */}
            <ul className="mt-4 flex flex-col space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group relative inline-block text-sm font-medium text-white/90 hover:text-white transition-colors py-0.5"
                  >
                    <span>{link.label}</span>
                    {/* Hand-drawn style underline on hover */}
                    <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-white/70 transition-all duration-200 group-hover:w-full rounded-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Giant "Stick It Up" Footer Artwork */}
      <div className="relative z-10 mx-auto max-w-5xl -mb-1 w-full">
        {/* The letters image */}
        <div className="relative w-full aspect-[1024/213] select-none">
          <img
            src="/landing/stick-it-up-footer.png"
            alt="Stick It Up"
            draggable={false}
            className="w-full h-full object-contain pointer-events-none select-none"
          />

          {/* Interactive live sticker badges positioned exactly on the letters matching the mockup */}
          {/* 1. Peach circle sticker on the 'S' */}
          <StickerChip
            color="#ffd9a8"
            shape="circle"
            rot={-4}
            style={{ left: "6.2%", top: "67%", width: "5.5%", height: "26%" }}
          />

          {/* 2. Soft pink circle sticker on the dot of the 'i' */}
          <StickerChip
            color="#ffc9c9"
            shape="circle"
            rot={6}
            style={{ left: "23.5%", top: "27%", width: "6.8%", height: "32%" }}
          />

          {/* 3. Pastel yellow rounded-square sticker on 'I' in 'It' */}
          <StickerChip
            color="#ffec99"
            shape="square"
            rot={-2}
            style={{ left: "48.2%", top: "37%", width: "7.2%", height: "35%" }}
          />

          {/* 4. Soft mint green rounded-square sticker on the 'U' */}
          <StickerChip
            color="#b1f2bc"
            shape="square"
            rot={-14}
            style={{ left: "68.8%", top: "54%", width: "5.6%", height: "27%" }}
          />

          {/* 5. Soft pastel pink rounded-square sticker on the 'p' */}
          <StickerChip
            color="#fcc2d7"
            shape="square"
            rot={12}
            style={{ left: "84.2%", top: "50%", width: "5.8%", height: "28%" }}
          />
        </div>
      </div>
    </footer>
  );
}
