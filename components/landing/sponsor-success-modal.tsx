"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Sticker } from "stick-it-up";

export function SponsorSuccessModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("sponsor_success") === "true") {
        setIsOpen(true);
        // Clean up the query parameter without refreshing the page
        const url = new URL(window.location.href);
        url.searchParams.delete("sponsor_success");
        url.searchParams.delete("session_id");
        window.history.replaceState({}, "", url.pathname + (url.hash || ""));
      }
    }
  }, []);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={() => setIsOpen(false)}
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 bg-black/45 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative my-auto w-full max-w-[380px] rounded-3xl border border-zinc-200/90 bg-white p-6 sm:p-7 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.16)] animate-in zoom-in-95 duration-150 text-center"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 cursor-pointer rounded-full p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors"
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Fire sticker at the top center */}
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center select-none rotate-2 transition-transform hover:scale-105 drop-shadow-xs">
          <Sticker name="flame" size="100%" className="h-full w-full" />
        </div>

        {/* Heading */}
        <h3 className="font-sans text-xl font-semibold tracking-tight text-zinc-900">
          We received your details!
        </h3>

        {/* Subtitle Message */}
        <p className="mt-1.5 text-xs sm:text-sm text-zinc-500 leading-relaxed max-w-[280px] mx-auto">
          Thank you for supporting Stick It Up. Your sponsor card will be live shortly.
        </p>

        {/* Need support / questions minimal line */}
        <p className="mt-4 text-[11px] sm:text-xs text-zinc-400">
          Questions or need support?{" "}
          <a
            href="mailto:sam.de.721166@gmail.com?subject=Sponsor%20Support%20-%20Stick%20It%20Up"
            className="text-zinc-600 hover:text-zinc-900 font-medium underline underline-offset-2"
          >
            sam.de.721166@gmail.com
          </a>
        </p>

        {/* Action Button */}
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="mt-5 w-full cursor-pointer rounded-xl border border-zinc-800 bg-gradient-to-b from-zinc-800 to-zinc-950 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_2px_4px_rgba(0,0,0,0.15)] hover:from-zinc-700 hover:to-zinc-900 active:scale-[0.98] transition-all"
        >
          Got it
        </button>
      </div>
    </div>,
    document.body
  );
}
