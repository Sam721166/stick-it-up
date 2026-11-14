"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Sticker } from "stick-it-up";
import { SponsorModal } from "./sponsor-modal";

/* ------------------------------------------------------------------
   tokens & constants
------------------------------------------------------------------- */
const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";
const EASE_OUT = "cubic-bezier(0.2, 0.8, 0.2, 1)";

interface SponsorItem {
  name: string;
  url: string;
  logo: string;
  sublabel?: string;
  bg?: string;
  border?: string;
}

const SPONSORS: SponsorItem[] = [
  {
    name: "PureCanvas",
    url: "https://www.purecanvas.app/",
    logo: "https://www.purecanvas.app/favicon.svg",
    sublabel: "Local-first vector design app",
    bg: "#ffffff",
    border: "#e4e4e7",
  },
  {
    name: "Clonvo",
    url: "https://clonvo.com/",
    logo: "/sponsors/clonvo-favicon.svg",
    sublabel: "The AI gateway for Agents",
    bg: "#12110f",
    border: "#27272a",
  },
  {
    name: "React Bits",
    url: "https://reactbits.dev/",
    logo: "/sponsors/react-bits-favicon.svg",
    sublabel: "Animated React components",
    bg: "#09090b",
    border: "#27272a",
  },
  {
    name: "Brickyard",
    url: "https://brickyard.ch/",
    logo: "/sponsors/brickyard-favicon.svg",
    sublabel: "Build Roblox games with AI",
    bg: "#09090b",
    border: "#27272a",
  },
];

const TOTAL_SPONSOR_SLOTS = 5;

function useInView({
  threshold = 0.08,
  rootMargin = "150px 0px 50px 0px",
}: { threshold?: number; rootMargin?: string } = {}) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      queueMicrotask(() => setInView(true));
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
        transform: inView ? "translate3d(0, 0, 0)" : "translate3d(0, 20px, 0)",
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
   Tooltips
------------------------------------------------------------------- */
function Tip({
  label,
  sublabel,
}: {
  label: string;
  sublabel?: string;
}) {
  return (
    <span
      role="tooltip"
      className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2.5 -translate-x-1/2
        scale-75 whitespace-nowrap rounded-2xl bg-zinc-950 px-3.5 py-1.5 text-center
        text-xs font-medium text-white opacity-0 shadow-[0_8px_20px_rgba(0,0,0,0.28)]
        group-hover:scale-100 group-hover:opacity-100
        group-focus-visible:scale-100 group-focus-visible:opacity-100"
      style={{
        transformOrigin: "50% 100%",
        transition: `transform 260ms ${SPRING}, opacity 160ms ease-out`,
      }}
    >
      <span className="block font-semibold leading-tight text-white">{label}</span>
      {sublabel && (
        <span className="mt-0.5 block text-[10px] font-normal text-zinc-400">
          {sublabel}
        </span>
      )}
      <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 rounded-[2px] bg-zinc-950" />
    </span>
  );
}



/* ------------------------------------------------------------------
   sponsor box: active sponsor showcase
------------------------------------------------------------------- */
function SponsorTile({
  sponsor,
  index,
  inView,
}: {
  sponsor: SponsorItem;
  index: number;
  inView: boolean;
}) {
  const [hover, setHover] = useState(false);

  return (
    <li
      className="relative list-none flex flex-col items-center"
      style={{
        opacity: 0,
        animation: inView ? `sponsorPop 600ms ${SPRING} ${420 + index * 60}ms both` : "none",
      }}
    >
      <a
        href={sponsor.url}
        target="_blank"
        rel="noreferrer"
        aria-label={`${sponsor.name} — Sponsor`}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        className="group relative flex flex-col items-center cursor-pointer outline-none"
      >
        <div
          className="relative flex h-[76px] w-[76px] sm:h-24 sm:w-24 items-center justify-center rounded-[24px] active:scale-95"
          style={{
            background: sponsor.bg ?? "#ffffff",
            boxShadow:
              "inset 0 1px 0 #fff, 0 1px 3px rgba(0,0,0,0.06), 0 4px 12px -2px rgba(0,0,0,0.04)",
            transition: `transform 350ms ${SPRING}, box-shadow 250ms ease`,
          }}
        >
          <img
            src={sponsor.logo}
            alt={sponsor.name}
            draggable={false}
            className="h-full w-full select-none rounded-[24px] transition-[rotate,scale] duration-300 group-hover:scale-105"
            style={{
              rotate: hover ? "-8deg" : "0deg",
              transitionTimingFunction: SPRING,
            }}
          />
        </div>

        <span className="mt-2 text-center text-xs sm:text-[13px] font-medium text-zinc-600 group-hover:text-zinc-900 transition-colors truncate max-w-[76px] sm:max-w-[96px]">
          {sponsor.name}
        </span>

        <Tip label={sponsor.name} sublabel={sponsor.sublabel ?? "Sponsor"} />
      </a>
    </li>
  );
}

/* ------------------------------------------------------------------
   empty grey box with plus: available sponsor slot (opens modal)
------------------------------------------------------------------- */
function EmptySlotTile({
  index,
  inView,
  onOpenModal,
}: {
  index: number;
  inView: boolean;
  onOpenModal?: () => void;
}) {
  const [hover, setHover] = useState(false);

  return (
    <li
      className="relative list-none flex flex-col items-center"
      style={{
        opacity: 0,
        animation: inView ? `sponsorPop 600ms ${SPRING} ${420 + index * 60}ms both` : "none",
      }}
    >
      <button
        type="button"
        onClick={onOpenModal}
        aria-label="Empty sponsor slot — Click to sponsor"
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        className="group relative flex flex-col items-center cursor-pointer outline-none"
      >
        <div
          className="relative flex h-[76px] w-[76px] sm:h-24 sm:w-24 items-center justify-center rounded-[24px] border-2 border-dashed border-zinc-300 bg-zinc-50/70 group-hover:border-zinc-500 group-hover:bg-zinc-100/80 active:scale-95"
          style={{
            boxShadow: "inset 0 1px 0 #fff, 0 1px 2px rgba(0,0,0,0.03)",
            transition: `box-shadow 250ms ease, border-color 200ms ease, background-color 200ms ease`,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="h-7 w-7 sm:h-8 sm:w-8 text-zinc-400 group-hover:text-zinc-900 origin-center transition-colors"
            style={{
              transform: hover ? "rotate(90deg)" : "rotate(0deg)",
              transformOrigin: "center",
              transition: `transform 350ms ${SPRING}, color 200ms ease`,
            }}
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>

        <span className="mt-2 text-center text-xs sm:text-[13px] font-medium text-zinc-400 group-hover:text-zinc-800 transition-colors truncate max-w-[76px] sm:max-w-[96px]">
          Add yours
        </span>

        <Tip label="Your brand here" sublabel="$49.99" />
      </button>
    </li>
  );
}

/* ------------------------------------------------------------------
   Landing Page Sponsor Section (Centered Middle Layout)
------------------------------------------------------------------- */
export default function Sponsor() {
  const [sectionRef, inView] = useInView();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [starTurns, setStarTurns] = useState(0);

  return (
    <>
      <section
        ref={sectionRef}
        id="sponsor"
        className="relative z-10 mx-auto max-w-6xl px-4 pt-12 pb-24 overflow-visible"
      >
        <style>{`
          @keyframes sponsorPop {
            0% { opacity: 0; transform: translateY(14px) scale(0.6) rotate(-6deg); }
            100% { opacity: 1; transform: translateY(0) scale(1) rotate(0deg); }
          }
          @media (prefers-reduced-motion: reduce) {
            #sponsor * { animation-duration: 0.01ms !important; }
          }
        `}</style>

        {/* Centered Middle Container (max-w-3xl sm:max-w-4xl mx-auto) */}
        <div className="relative mx-auto max-w-3xl sm:max-w-4xl px-2 sm:px-4">
          {/* Section Header: Exact text, font, size & color */}
          <MotionBlur inView={inView} delay={0}>
            <h2 className="flex items-center gap-3 font-sans text-4xl sm:text-4xl md:text-6xl font-normal tracking-tight text-zinc-900">
              <span>Sponsors.</span>
              <span
                onClick={() => setStarTurns((t) => t + 1)}
                className="h-10 w-10 sm:h-15 sm:w-15 cursor-pointer select-none transition-transform duration-500 hover:rotate-[24deg] hover:scale-120 inline-block align-middle"
                style={{
                  transitionTimingFunction: SPRING,
                  rotate: `${starTurns * 360 - 8}deg`,
                }}
              >
                <Sticker name="bad-cat" size="100%" className="h-full w-full" />
              </span>
            </h2>
          </MotionBlur>

          {/* Exact narrative paragraph */}
          <MotionBlur inView={inView} delay={100}>
            <p className="mt-5 text-lg sm:text-xl md:text-[22px] leading-relaxed text-zinc-600 max-w-3xl">
              Get lifetime brand exposure for just
              <span className="font-medium text-zinc-700"> $49.99</span> <br />
              Showcase your product on Stick It Up and get a dedicated
              <span className="font-medium text-zinc-700">
                <a href="https://x.com/samirande_"> shoutout on X</a>
              </span>.
            </p>
          </MotionBlur>

          {/* Exact "Slots are empty" text note */}
          <MotionBlur inView={inView} delay={160}>
            <div className="mt-7 sm:mt-8 flex items-center gap-2 text-sm sm:text-base font-normal text-zinc-500">
              <span>Slots are empty, click any slot to add your logo</span>
            </div>
          </MotionBlur>

          {/* Sponsor squircle boxes with names under each */}
          <div className="mt-6 sm:mt-7">
            <ul className="flex flex-wrap items-center gap-4 sm:gap-6 p-0 m-0">
              {/* Active sponsors */}
              {SPONSORS.map((sponsor, i) => (
                <SponsorTile
                  key={sponsor.name}
                  sponsor={sponsor}
                  index={i}
                  inView={inView}
                />
              ))}

              {/* Empty grey box with plus (opens sponsor modal) */}
              {Array.from({
                length: Math.max(1, TOTAL_SPONSOR_SLOTS - SPONSORS.length),
              }).map((_, i) => (
                <EmptySlotTile
                  key={i}
                  index={SPONSORS.length + i}
                  inView={inView}
                  onOpenModal={() => setIsModalOpen(true)}
                />
              ))}
            </ul>
          </div>

          {/* Questions Contact Block (Have questions? + Email & X underneath) */}
          <MotionBlur inView={inView} delay={240}>
            <div className="mt-10 sm:mt-12">
              <p className="text-base sm:text-[22px] font-normal leading-snug text-zinc-700">
                Have questions?
              </p>
              <div className="mt-2 flex items-center gap-1.5 -ml-2.5">
                <a
                  href="mailto:sam.de.721166@gmail.com?subject=Sponsorship%20Inquiry%20-%20Stick%20It%20Up"
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs sm:text-sm font-medium text-zinc-600  hover:text-zinc-950 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 text-zinc-400 ">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span>Email</span>
                </a>

                <a
                  href="https://x.com/samirande_"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs sm:text-sm font-medium text-zinc-600 hover:text-zinc-950 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3 text-zinc-400">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span>X / Twitter</span>
                </a>
              </div>
            </div>
          </MotionBlur>
        </div>
      </section>

      {/* Sponsor Submission Modal */}
      <SponsorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
