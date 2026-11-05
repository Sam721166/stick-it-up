"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/* ------------------------------------------------------------------
   tokens (same language as the rest of the landing page)
------------------------------------------------------------------- */
const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";
const EASE_OUT = "cubic-bezier(0.2, 0.8, 0.2, 1)";

const GRAIN =
  "radial-gradient(rgba(0,0,0,0.18) 0.6px, transparent 0.7px)";

function useInView({
  threshold = 0.05,
  rootMargin = "250px 0px 100px 0px",
}: {
  threshold?: number;
  rootMargin?: string;
} = {}) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView] as const;
}

function MotionBlur({
  inView,
  delay = 0,
  blur = 8,
  children,
  className = "",
}: {
  inView: boolean;
  delay?: number;
  blur?: number;
  children: ReactNode;
  className?: string;
}) {
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setSettled(true), delay + 850);
      return () => clearTimeout(t);
    }
  }, [inView, delay]);

  return (
    <div
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translate3d(0, 0, 0)" : "translate3d(0, 24px, 0)",
        filter: settled ? "none" : inView ? "blur(0px)" : `blur(${blur}px)`,
        transition: settled
          ? "none"
          : `opacity 650ms ${EASE_OUT} ${delay}ms, transform 750ms ${EASE_OUT} ${delay}ms, filter 650ms ${EASE_OUT} ${delay}ms`,
        willChange: settled ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------
   data
------------------------------------------------------------------- */
interface FooterLink {
  label: string;
  href: string;
  sticker: string;
  rot?: number;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const COLUMNS: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Sticker Pack", href: "/stickers", sticker: "/stickers/star.svg", rot: 12 },
      { label: "Documentation", href: "/stickers#docs", sticker: "/stickers/Sparkles.svg", rot: -8 },
      { label: "Components", href: "#", sticker: "/stickers/blueberry.svg", rot: 6 },
      { label: "Changelog", href: "#", sticker: "/stickers/Flame.svg", rot: -10 },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "GitHub", href: "https://github.com/Sam721166/stick-it-up", sticker: "/stickers/cat.svg", rot: 8 },
      { label: "npm Package", href: "https://www.npmjs.com/package/stick-it-up", sticker: "/stickers/flower.svg", rot: -12 },
      { label: "Showcase", href: "#", sticker: "/stickers/face.svg", rot: 10 },
      { label: "Playground", href: "#", sticker: "/stickers/SparkleTrio.svg", rot: -6 },
    ],
  },
];

/* ------------------------------------------------------------------
   small inline sticker in the tagline (click = spin, like the hero)
------------------------------------------------------------------- */
function InlineSticker({ src }: { src: string }) {
  const [turns, setTurns] = useState(0);
  const [hover, setHover] = useState(false);

  return (
    <img
      data-sticker
      src={src}
      alt=""
      draggable={false}
      onClick={() => setTurns((t) => t + 1)}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      className="mx-1 inline-block h-[0.95em] w-[0.95em] cursor-pointer select-none align-[-0.1em]"
      style={{
        rotate: `${turns * 360 + (hover ? 14 : 0)}deg`,
        scale: hover ? 1.12 : 1,
        transition: `rotate 650ms ${SPRING}, scale 300ms ${SPRING}`,
      }}
    />
  );
}

/* ------------------------------------------------------------------
   draggable sticker (sits on top of the wordmark)
------------------------------------------------------------------- */
function DraggableSticker({
  src,
  size,
  left,
  top,
  rot = 0,
  inView,
  delay = 0,
}: {
  src: string;
  size: number;
  left: string;
  top: string;
  rot?: number;
  inView: boolean;
  delay?: number;
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const [drag, setDrag] = useState(false);
  const start = useRef({ px: 0, py: 0, x: 0, y: 0 });

  return (
    // layer 1: placement + entrance pop
    <div
      className="absolute"
      style={{
        left,
        top,
        width: `clamp(36px, ${size / 10.24}vw, ${size}px)`,
        zIndex: drag ? 30 : 20,
        opacity: inView ? 1 : 0,
        transform: inView ? "scale(1) rotate(0deg)" : "scale(0) rotate(-20deg)",
        transition: `transform 650ms ${SPRING} ${delay}ms, opacity 300ms ease-out ${delay}ms`,
      }}
    >
      {/* layer 2: drag, hover, tilt */}
      <div
        data-sticker
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          start.current = { px: e.clientX, py: e.clientY, x: pos.x, y: pos.y };
          setDrag(true);
        }}
        onPointerMove={(e) => {
          if (!drag) return;
          setPos({
            x: start.current.x + e.clientX - start.current.px,
            y: start.current.y + e.clientY - start.current.py,
          });
        }}
        onPointerUp={() => setDrag(false)}
        onPointerCancel={() => setDrag(false)}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        className="touch-none select-none"
        style={{
          translate: `${pos.x}px ${pos.y}px`,
          rotate: `${rot + (drag ? -5 : hover ? 8 : 0)}deg`,
          scale: drag ? 1.14 : hover ? 1.08 : 1,
          cursor: drag ? "grabbing" : "grab",
          filter: drag ? "drop-shadow(0 14px 12px rgba(10,40,100,0.28))" : "none",
          transition: drag
            ? "scale 200ms ease-out"
            : `scale 450ms ${SPRING}, rotate 450ms ${SPRING}`,
        }}
      >
        <img src={src} alt="" draggable={false} className="block h-auto w-full" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   footer
------------------------------------------------------------------- */
export default function Footer() {
  const [ref, inView] = useInView();

  return (
    <footer
      ref={ref}
      className="relative z-10 -mx-5 overflow-hidden  px-6 pt-14 sm:px-12 sm:pt-16 "
      style={{
        background:
          "linear-gradient(180deg, #ffffff 0%, #e6f2ff 26%, #8cc7fb 62%, #52aef9 100%)",
        
      }}
    >
      {/* paper grain */}
      <div
        className="pointer-events-none absolute inset-0  mask-t-from-10% to-100%"
        style={{ backgroundImage: GRAIN, backgroundSize: "3px 3px", opacity: 0.06 }}
      />

      {/* top: tagline + links */}
      <div className="relative z-10 mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <MotionBlur inView={inView} delay={0} className="text-center lg:text-left">
          <p className="font-sans text-3xl font-normal leading-[1.1] tracking-tight text-zinc-900 sm:text-4xl">
            Stick it on.
            <br />
            Ship it fun
            <InlineSticker src="/stickers/Peace-hand.svg" />
          </p>
        </MotionBlur>

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 text-center sm:text-left">
          {COLUMNS.map((col, ci) => (
            <MotionBlur key={col.title} inView={inView} delay={140 + ci * 80}>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group relative inline-flex items-center py-0.5 text-sm font-medium text-zinc-500 transition-colors duration-200 hover:text-zinc-900"
                    >
                      <span>{link.label}</span>
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute left-full top-1/2 ml-2 -translate-y-1/2 opacity-0 scale-0 transition-all duration-200 ease-out group-hover:opacity-100 group-hover:scale-100"
                        style={{
                          transitionTimingFunction: SPRING,
                        }}
                      >
                        <img
                          src={link.sticker}
                          alt=""
                          className="h-[24px] w-[24px] max-w-none select-none object-contain drop-shadow-[0_1px_2px_rgba(0,0,0,0.12)]"
                          style={{
                            transform: `rotate(${link.rot ?? 0}deg)`,
                          }}
                        />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </MotionBlur>
          ))}
        </div>
      </div>

      {/* full-bleed wordmark + live stickers */}
      <MotionBlur
        inView={inView}
        delay={380}
        className="relative z-10 -mx-6 mt-14 sm:-mx-12 sm:mt-20"
      >
        <div className="relative select-none" style={{ containerType: "inline-size" }}>
          <div
            aria-hidden
            className="overflow-hidden whitespace-nowrap text-center font-bold leading-[0.8] tracking-[-0.055em] text-white"
            style={{
              fontSize: "21cqw",
              height: "14.5cqw",
              marginBottom: "-2cqw",
              textShadow: "0 0.02em 0 rgba(20,90,190,0.25)",
            }}
          >
            Stick it up
          </div>
          <span className="sr-only">Stick it up</span>

          <DraggableSticker inView={inView} delay={640} src="/stickers/star.svg" size={84} left="4%" top="-6%" rot={-12} />
          <DraggableSticker inView={inView} delay={720} src="/stickers/blueberry.svg" size={92} left="28%" top="52%" rot={8} />
          <DraggableSticker inView={inView} delay={800} src="/stickers/Flame.svg" size={65} left="46%" top="-10%" rot={-6} />
          <DraggableSticker inView={inView} delay={880} src="/stickers/flower.svg" size={70} left="66%" top="32%" rot={14} />
          <DraggableSticker inView={inView} delay={960} src="/stickers/cat.svg" size={86} left="84%" top="-4%" rot={-10} />
        </div>
      </MotionBlur>
    </footer>
  );
}