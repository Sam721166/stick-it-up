import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://stickitupp.vercel.app");

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
  ];
}
