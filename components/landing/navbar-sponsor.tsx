"use client";

import { useState } from "react";
import { SPONSOR_APPS } from "./sponsors-data";
import { SponsorModal } from "./sponsor-modal";

export function NavbarSponsorDock() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sponsorAppsOnly = SPONSOR_APPS.filter((a) => !a.isOpenSlot);

  return (
    <div className="relative hidden md:inline-flex items-center">
      {/* Seamless Dock (No outer border or shadow) */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Active sponsor app logos (direct link to site on click) */}
        {sponsorAppsOnly.map((app) => (
          <div key={app.id} className="group relative">
            <a
              href={app.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`${app.name} — Sponsored`}
              className="relative flex h-7.5 w-7.5 cursor-pointer items-center justify-center rounded-[9px] opacity-85 transition-all duration-200 hover:opacity-100 hover:scale-105 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
            >
              <div
                className="h-full w-full overflow-hidden rounded-[9px]"
                style={{ background: app.bg || "#ffffff" }}
              >
                <img
                  src={app.logo}
                  alt={app.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </a>

            {/* Tooltip on hover (positioned below to avoid clipping at viewport top) */}
            <span className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 hidden group-hover:flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-zinc-500/90 px-2.5 py-1 text-[11px] font-medium text-zinc-200 shadow-sm backdrop-blur-md animate-in fade-in zoom-in-95 duration-150">
              <span>{app.name}</span>
              <span className="text-[10px] text-zinc-300">· Sponsored</span>
            </span>
          </div>
        ))}

        {/* Empty Box (+) on the RIGHT (directly opens form on click) */}
        <div className="group relative">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="relative flex h-7.5 w-7.5 cursor-pointer items-center justify-center rounded-[9px] border border-dashed border-zinc-300 bg-zinc-50/90 text-zinc-400 transition-all duration-200 hover:border-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 hover:scale-105 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
            aria-label="Become a sponsor — Your brand here"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-90"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>

          {/* Minimal grey tooltip on hover */}
          <span className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 hidden group-hover:flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-zinc-500/90 px-2.5 py-1 text-[11px] font-medium text-zinc-200 shadow-sm backdrop-blur-md animate-in fade-in zoom-in-95 duration-150">
            <span>Your brand here</span>
          </span>
        </div>
      </div>

      {/* Sponsor Submission & Checkout Modal */}
      <SponsorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
