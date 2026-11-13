"use client";

import { useEffect, useState } from "react";

// visitor counter connected to Neon PostgreSQL
export function VisitorCounter({ site = "stick-it-up" }: { site?: string }) {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let unmounted = false;

    // 1. Immediately display previously cached count from localStorage so UI isn't blank
    try {
      const cached = localStorage.getItem(`siu_visitors_${site}`);
      if (cached) {
        const val = parseInt(cached, 10);
        if (!isNaN(val) && val > 0) {
          setCount(val);
        }
      }
    } catch {}

    // 2. Always fetch latest count from server on mount/reload/page change
    async function recordAndFetch() {
      try {
        const hasRecordedSession = Boolean(sessionStorage.getItem(`siu_recorded_${site}`));
        // Use GET if already recorded visit in this browser session, otherwise POST to record
        const method = hasRecordedSession ? "GET" : "POST";
        const url = method === "GET"
          ? `/api/visitors?site=${encodeURIComponent(site)}&_t=${Date.now()}`
          : "/api/visitors";

        const res = await fetch(url, {
          method,
          headers: method === "POST" ? { "Content-Type": "application/json" } : undefined,
          body: method === "POST" ? JSON.stringify({ site }) : undefined,
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Visitor API response not ok");
        const data = (await res.json()) as any;
        
        if (method === "POST" && data?.success) {
          try {
            sessionStorage.setItem(`siu_recorded_${site}`, "1");
          } catch {}
        }

        const target = Number(data.unique_visitors ?? data.total_visits ?? 0);

        if (unmounted || target <= 0) return;
        try {
          localStorage.setItem(`siu_visitors_${site}`, String(target));
          localStorage.setItem(`siu_visitors_time_${site}`, String(Date.now()));
        } catch {}

        // Smooth roll-up animation to the latest target count
        setCount((current) => {
          const startCount = current > 0 ? current : 0;
          if (startCount === target) return target;

          const startTime = performance.now();
          const duration = Math.min(1000, Math.max(350, Math.abs(target - startCount) * 80));

          const tick = (now: number) => {
            if (unmounted) return;
            const progress = Math.min((now - startTime) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            const val = Math.round(startCount + (target - startCount) * ease);
            setCount(val);
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
          return current;
        });
      } catch (err) {
        console.warn("Could not connect to live visitor DB, using local fallback", err);
      }
    }

    recordAndFetch();

    return () => {
      unmounted = true;
    };
  }, [site]);

  return (
    <div
      title="Live verified unique visitors (Neon PostgreSQL)"
      className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-zinc-200/90 bg-white/85 px-2 sm:px-2.5 py-1.5 sm:py-2 text-xs font-medium text-zinc-700 shadow-xs backdrop-blur-xs transition-all hover:border-zinc-300 select-none"
    >
      <span className="relative flex h-2 w-2">
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <span className="font-mono font-semibold text-zinc-900">
        {count.toLocaleString()}
      </span>
      <span className="hidden text-[11px] text-zinc-500 sm:inline">visitors</span>
    </div>
  );
}

// total npm downloads badge
export function NpmDownloadsBadge({ pkg = "stick-it-up" }: { pkg?: string }) {
  const [downloads, setDownloads] = useState<number | null>(null);

  useEffect(() => {
    let unmounted = false;

    // Check localStorage cache (24 hour TTL)
    try {
      const cached = localStorage.getItem(`siu_npm_dl_${pkg}`);
      const cachedAt = localStorage.getItem(`siu_npm_dl_time_${pkg}`);
      if (cached !== null) {
        const val = parseInt(cached, 10);
        if (!isNaN(val)) {
          setDownloads(val);
          if (cachedAt && Date.now() - parseInt(cachedAt, 10) < 24 * 60 * 60 * 1000) {
            return;
          }
        }
      }
    } catch {}

    fetch(`/api/npm-downloads?package=${encodeURIComponent(pkg)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data: any) => {
        if (!unmounted && typeof data?.downloads === "number") {
          setDownloads(data.downloads);
          try {
            localStorage.setItem(`siu_npm_dl_${pkg}`, String(data.downloads));
            localStorage.setItem(`siu_npm_dl_time_${pkg}`, String(Date.now()));
          } catch {}
        }
      })
      .catch(() => {
        if (!unmounted) setDownloads(453);
      });

    return () => {
      unmounted = true;
    };
  }, [pkg]);

  return (
    <a
      href={`https://www.npmjs.com/package/${pkg}`}
      target="_blank"
      rel="noreferrer"
      title="Total npm downloads"
      className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-zinc-200/90 bg-white/85 px-2 sm:px-2.5 py-1.5 sm:py-2 text-xs font-medium text-zinc-700 shadow-xs backdrop-blur-xs transition-all hover:border-zinc-300 select-none"
    >
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-red-600">
        <path d="M0 7.334v9.332h24V7.334H0zm4 8h-2.666V8.667H4v6.667zm5.334 0H6.668V8.667H9.334v6.667zm8 0h-4v-4h-1.334v4H10.668V8.667h6.666v6.667zm5.332 0h-4v-4h-1.332v4H16V8.667h6.666v6.667z" />
      </svg>
      <span className="font-mono  text-zinc-800">
        {downloads !== null ? downloads.toLocaleString() : "..."}
      </span>
      <span className="hidden text-[11px] text-zinc-500 sm:inline">total npm downloads</span>
    </a>
  );
}

// github star button with live real-time fetch & roll-up animation
export function GitHubStarButton() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    let unmounted = false;

    // 1. Immediately show cached star count so there is zero layout flicker
    let initialCount = 92;
    try {
      const cached = localStorage.getItem("stickitupp_gh_stars");
      if (cached !== null) {
        const val = parseInt(cached, 10);
        if (!isNaN(val) && val >= 92) {
          initialCount = val;
          setStars(val);
        } else {
          setStars(92);
        }
      } else {
        setStars(92);
      }
    } catch {
      setStars(92);
    }

    // Helper to smoothly animate count upward
    function updateStarsWithAnimation(target: number) {
      if (unmounted || target <= 0) return;
      try {
        localStorage.setItem("stickitupp_gh_stars", String(target));
      } catch {}

      setStars((current) => {
        const start = current !== null && current > 0 ? current : initialCount;
        if (start === target) return target;

        const startTime = performance.now();
        const duration = Math.min(800, Math.max(250, Math.abs(target - start) * 100));

        const tick = (now: number) => {
          if (unmounted) return;
          const progress = Math.min((now - startTime) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          const val = Math.round(start + (target - start) * ease);
          setStars(val);
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
        return current;
      });
    }

    // 2. Fetch live real-time stargazers count (direct GitHub API first for zero-latency)
    async function fetchLiveStars() {
      try {
        const res = await fetch("https://api.github.com/repos/Sam721166/stick-it-up", {
          headers: { Accept: "application/vnd.github.v3+json" },
        });
        if (res.ok) {
          const data = (await res.json()) as any;
          if (typeof data?.stargazers_count === "number" && data.stargazers_count >= 92) {
            updateStarsWithAnimation(data.stargazers_count);
            return;
          }
        }
      } catch {}

      // Fallback: Query internal cached route if direct GitHub API was blocked/rate-limited
      try {
        const res = await fetch(`/api/github-stars?_t=${Date.now()}`);
        if (res.ok) {
          const data = (await res.json()) as any;
          if (typeof data?.stars === "number" && data.stars >= 92) {
            updateStarsWithAnimation(data.stars);
          }
        }
      } catch {}
    }

    fetchLiveStars();

    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <a
      href="https://github.com/Sam721166/stick-it-up"
      target="_blank"
      rel="noreferrer"
      aria-label="Star stick-it-up on GitHub"
      className="group inline-flex shrink-0 items-center gap-1.5 sm:gap-2 rounded-xl
        border border-zinc-800 bg-gradient-to-b from-zinc-800 to-zinc-900
        px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-white
        shadow-[inset_0_1px_0_#ffffff18,0_1px_2px_#00000015]
        transition-all duration-150
        hover:from-zinc-700 hover:to-zinc-800
        active:scale-95"
    >
      {/* GitHub Octocat Icon */}
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:scale-110"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>

      <span className="flex items-center gap-1 font-medium">
        Star
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-400 drop-shadow-xs"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </span>

      <span
        suppressHydrationWarning
        className="ml-0.5 rounded-full bg-white/10 px-1.5 py-0.5 font-mono text-[10px] sm:text-[11px] text-zinc-300"
      >
        {stars !== null ? stars : "..."}
      </span>
    </a>
  );
}
