import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://stickitupx.com";

  const now = new Date();

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      images: [
        `${baseUrl}/og-image.png`,
        `${baseUrl}/stickers/logo.svg`,
        `${baseUrl}/stickers/Flame.svg`,
        `${baseUrl}/stickers/face.svg`,
        `${baseUrl}/stickers/Cosmiceye.svg`,
      ],
    },
    {
      url: `${baseUrl}/stickers`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
      images: [
        `${baseUrl}/og-image.png`,
        `${baseUrl}/stickers/japan.svg`,
        `${baseUrl}/stickers/nori-coffee.svg`,
        `${baseUrl}/stickers/nori-heart.svg`,
        `${baseUrl}/stickers/pink-cat.svg`,
        `${baseUrl}/stickers/blueberry.svg`,
        `${baseUrl}/stickers/SparkleTrio.svg`,
      ],
    },
    {
      url: `${baseUrl}/llms.txt`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];
}
