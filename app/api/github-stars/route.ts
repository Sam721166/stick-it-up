import { NextResponse } from "next/server";

const MINIMUM_STARS_BASELINE = 130;
let cachedStars = MINIMUM_STARS_BASELINE;
let lastFetchTime = 0;
const CACHE_TTL_MS = 2 * 60 * 1000;

export async function GET() {
  const now = Date.now();

  // Return fresh in-memory cache if valid
  if (cachedStars > MINIMUM_STARS_BASELINE && now - lastFetchTime < CACHE_TTL_MS) {
    return NextResponse.json(
      { stars: cachedStars },
      {
        headers: {
          "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600",
        },
      }
    );
  }

  // Strategy 1: GitHub REST API (works best when token is available)
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "stick-it-up-app/1.0 (+https://stickitupx.com)",
    };

    const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch("https://api.github.com/repos/Sam721166/stick-it-up", {
      headers,
      next: { revalidate: 120 },
    });

    if (res.ok) {
      const data = (await res.json()) as any;
      if (typeof data.stargazers_count === "number" && data.stargazers_count > 0) {
        cachedStars = Math.max(data.stargazers_count, MINIMUM_STARS_BASELINE);
        lastFetchTime = now;
        return NextResponse.json(
          { stars: cachedStars },
          {
            headers: {
              "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600",
            },
          }
        );
      }
    }
  } catch (err) {
    console.warn("GitHub API fetch error:", err);
  }

  // Strategy 2: Web scrape public repo page (bypasses GitHub 60 req/hr unauthenticated API rate limit)
  try {
    const htmlRes = await fetch("https://github.com/Sam721166/stick-it-up", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      next: { revalidate: 120 },
    });

    if (htmlRes.ok) {
      const html = await htmlRes.text();
      const match =
        html.match(/"stargazerCount":\s*(\d+)/) ||
        html.match(/id="repo-stars-counter-star"[^>]*title="([\d,]+)"/) ||
        html.match(/id="repo-stars-counter-star"[^>]*>([\d,]+)</);

      if (match && match[1]) {
        const count = parseInt(match[1].replace(/,/g, ""), 10);
        if (!isNaN(count) && count > 0) {
          cachedStars = Math.max(count, MINIMUM_STARS_BASELINE);
          lastFetchTime = now;
          return NextResponse.json(
            { stars: cachedStars },
            {
              headers: {
                "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600",
              },
            }
          );
        }
      }
    }
  } catch (err) {
    console.warn("GitHub web scrape fallback error:", err);
  }

  // Fallback to latest verified count
  return NextResponse.json(
    { stars: Math.max(cachedStars, MINIMUM_STARS_BASELINE) },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    }
  );
}

