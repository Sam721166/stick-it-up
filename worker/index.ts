// Cloudflare Worker for stickitupx.com.
//
// The pages are static files in ./out, served by Cloudflare without running
// this code. wrangler.json sends /api/* here (run_worker_first); a missing
// file gets out/404.html. Any other request that does reach this worker is
// handed back to the static files. This file does one job: the visitor counter.
//
//   GET  /api/visitors?site=<name>   -> { site, unique_visitors, total_visits }
//   POST /api/visitors {"site":...}  -> records a visit, returns the new counts
//
// Needs the DATABASE_URL secret (Neon Postgres). Database waits are I/O, not
// CPU, so a request stays far below the free plan's 10 ms CPU limit.
// Limits: on the free plan the account gets 100,000 Worker requests a day.
// Past that, /api/visitors fails (the page keeps its cached count) while the
// static pages keep serving. A database error returns zeros with
// "fallback": true, never a 5xx, which is what the front end expects; a
// missing secret shows up in the logs as "DATABASE_URL is not configured".

import { neon } from "@neondatabase/serverless";

const DEFAULT_SITE = "stick-it-up";
const SITE_REGEX = /^[a-zA-Z0-9_\-\.]{1,64}$/;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, x-visitor-id",
};

// public/_headers covers static files only, so Worker responses set these here.
const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

const NO_STORE = { "Cache-Control": "no-store, max-age=0" };

function json(body: unknown, headers: Record<string, string> = {}): Response {
  return Response.json(body, { headers: { ...SECURITY_HEADERS, ...CORS_HEADERS, ...headers } });
}

function sanitizeSite(input: string | null): string {
  if (!input) return DEFAULT_SITE;
  const clean = input.trim();
  return SITE_REGEX.test(clean) ? clean : DEFAULT_SITE;
}

// One-way SHA-256 of site + IP + user agent + optional visitor id. The inputs
// and their order match the old Next.js route, so existing visitors keep
// their hash and are not counted again. That route never saw a missing
// x-forwarded-for: the framework filled it with "::1" first, so we do too.
async function visitorHash(request: Request, site: string): Promise<string> {
  const forwarded = request.headers.get("x-forwarded-for") ?? "::1";
  const ip = forwarded
    ? forwarded.split(",")[0].trim()
    : request.headers.get("x-real-ip") || "127.0.0.1";
  const userAgent = request.headers.get("user-agent") || "unknown";
  const visitorId = request.headers.get("x-visitor-id") || "";
  const bytes = new TextEncoder().encode(`${site}:${ip}:${userAgent}:${visitorId}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Same message the old lib/db.ts threw, so a missing secret is obvious in the logs.
function db(env: Env) {
  if (!env.DATABASE_URL) throw new Error("DATABASE_URL is not configured in environment variables");
  return neon(env.DATABASE_URL);
}

async function getVisitors(url: URL, env: Env): Promise<Response> {
  const site = sanitizeSite(url.searchParams.get("site"));
  try {
    const sql = db(env);
    const rows = await sql`
      SELECT site_name, total_visits, unique_visitors
      FROM sites
      WHERE site_name = ${site}
      LIMIT 1;
    `;

    if (rows.length === 0) {
      await sql`
        INSERT INTO sites (site_name, total_visits, unique_visitors)
        VALUES (${site}, 0, 0)
        ON CONFLICT (site_name) DO NOTHING;
      `;
      return json({ site, unique_visitors: 0, total_visits: 0 });
    }

    const row = rows[0];
    return json(
      {
        site: row.site_name,
        unique_visitors: Number(row.unique_visitors),
        total_visits: Number(row.total_visits),
      },
      NO_STORE
    );
  } catch (error) {
    console.error("Visitors GET error:", error);
    return json({ site, unique_visitors: 0, total_visits: 0, fallback: true });
  }
}

// A real body is about 25 bytes. Parsing a 10 MB one costs ~20 ms of CPU, over
// the free plan's 10 ms, so reading stops at 1 KB, with or without a
// Content-Length header. A larger or non-JSON body counts as no body, and the
// site comes from ?site= or the default instead.
const MAX_BODY_BYTES = 1024;

async function readSmallJson(request: Request): Promise<unknown> {
  if (!request.body || Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) return null;
  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let size = 0;
  let text = "";
  for (let part = await reader.read(); !part.done; part = await reader.read()) {
    size += part.value.byteLength;
    if (size > MAX_BODY_BYTES) {
      await reader.cancel();
      return null;
    }
    text += decoder.decode(part.value, { stream: true });
  }
  try {
    return JSON.parse(text + decoder.decode());
  } catch {
    return null;
  }
}

async function recordVisit(request: Request, url: URL, env: Env): Promise<Response> {
  const body = (await readSmallJson(request)) as { site?: unknown } | null;
  const site = sanitizeSite(typeof body?.site === "string" ? body.site : url.searchParams.get("site"));
  const hash = await visitorHash(request, site);

  try {
    const sql = db(env);

    await sql`
      INSERT INTO sites (site_name, total_visits, unique_visitors)
      VALUES (${site}, 0, 0)
      ON CONFLICT (site_name) DO NOTHING;
    `;

    // (xmax = 0) is true when the row was just inserted: a new unique visitor.
    const visitorRows = await sql`
      INSERT INTO site_visitors (site_name, visitor_hash, first_visited_at, last_visited_at, visit_count)
      VALUES (${site}, ${hash}, NOW(), NOW(), 1)
      ON CONFLICT (site_name, visitor_hash)
      DO UPDATE SET
        last_visited_at = NOW(),
        visit_count = site_visitors.visit_count + 1
      RETURNING (xmax = 0) AS is_new_unique, first_visited_at, (NOW() - site_visitors.last_visited_at) > INTERVAL '15 minutes' AS cooled_down;
    `;

    const isNewUnique = Boolean(visitorRows[0]?.is_new_unique);
    const cooledDown = Boolean(visitorRows[0]?.cooled_down);

    let updatedStats;
    if (isNewUnique) {
      updatedStats = await sql`
        UPDATE sites
        SET
          unique_visitors = unique_visitors + 1,
          total_visits = total_visits + 1,
          updated_at = NOW()
        WHERE site_name = ${site}
        RETURNING unique_visitors, total_visits;
      `;
    } else if (cooledDown) {
      // Meant to count a return after 15+ minutes. Known issue, kept from the
      // old route: RETURNING reads last_visited_at after the update, so
      // cooled_down is always false and this branch never runs.
      updatedStats = await sql`
        UPDATE sites
        SET
          total_visits = total_visits + 1,
          updated_at = NOW()
        WHERE site_name = ${site}
        RETURNING unique_visitors, total_visits;
      `;
    } else {
      // Any repeat visit by a known visitor: count nothing.
      updatedStats = await sql`
        SELECT unique_visitors, total_visits
        FROM sites
        WHERE site_name = ${site}
        LIMIT 1;
      `;
    }

    const row = updatedStats[0];
    return json(
      {
        success: true,
        site,
        unique_visitors: Number(row?.unique_visitors ?? 0),
        total_visits: Number(row?.total_visits ?? 0),
        is_new_unique: isNewUnique,
      },
      NO_STORE
    );
  } catch (error) {
    console.error("Visitors POST error:", error);
    return json({ success: false, site, unique_visitors: 0, total_visits: 0, fallback: true });
  }
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname !== "/api/visitors") return env.ASSETS.fetch(request);

    switch (request.method) {
      case "GET":
        return getVisitors(url, env);
      case "POST":
        return recordVisit(request, url, env);
      case "OPTIONS":
        return new Response(null, { status: 204, headers: { ...SECURITY_HEADERS, ...CORS_HEADERS } });
      default:
        return new Response(null, {
          status: 405,
          headers: { ...SECURITY_HEADERS, ...CORS_HEADERS, Allow: "GET, POST, OPTIONS" },
        });
    }
  },
} satisfies ExportedHandler<Env>;
