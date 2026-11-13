import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://stickitupx.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/stickers", "/llms.txt"],
        disallow: ["/api/"],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "Google-Extended",
          "ClaudeBot",
          "PerplexityBot",
          "Applebot-Extended",
          "Amazonbot",
        ],
        allow: ["/", "/stickers", "/llms.txt"],
        disallow: ["/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}

