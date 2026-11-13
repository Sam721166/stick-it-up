import { NextResponse } from "next/server";

let cachedStars = 81;
let lastFetchTime = 0;
const CACHE_TTL_MS = 15 * 60 * 1000;

export async function GET() {
  const now = Date.now();

  if (cachedStars > 1 && now - lastFetchTime < CACHE_TTL_MS) {
    return NextResponse.json(
      { stars: cachedStars },
      {
        headers: {
          "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=86400",
        },
      }
    );
  }

  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "stick-it-up-app",
    };

    const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch("https://api.github.com/repos/Sam721166/stick-it-up", {
      headers,
      next: { revalidate: 1800 },
    });

    if (res.ok) {
      const data = (await res.json()) as any;
      if (typeof data.stargazers_count === "number" && data.stargazers_count > 0) {
        cachedStars = data.stargazers_count;
        lastFetchTime = now;
        return NextResponse.json(
          { stars: cachedStars },
          {
            headers: {
              "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=86400",
            },
          }
        );
      }
    }
  } catch (err) {
    console.error("GitHub stars route error:", err);
  }

  return NextResponse.json(
    { stars: Math.max(cachedStars, 81) },
    {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=1800",
      },
    }
  );
}

