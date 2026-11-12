import type { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://stickitupp.vercel.app");

export const metadata: Metadata = {
  title: "Browse Free React Stickers & SVG Badges",
  description:
    "Explore interactive React sticker components and SVG decals with 3D vinyl hover peel physics. Filter by characters, mascots, components, and symbols. Free for personal & commercial use.",
  keywords: [
    "react stickers catalog",
    "free svg stickers",
    "vinyl peel stickers",
    "react badge components",
    "pixel art stickers react",
    "holographic stickers react",
    "ui stickers download",
  ],
  openGraph: {
    title: "Browse Free React Stickers & SVG Badges | Stick It Up",
    description:
      "Explore interactive React sticker components and SVG decals with 3D vinyl hover peel physics. Filter by categories, customize size, copy code, or download SVGs.",
    url: "/stickers",
    siteName: "Stick It Up",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Stick It Up — Complete Stickers & Badges Catalog",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Browse Free React Stickers & SVG Badges | Stick It Up",
    description:
      "Explore interactive React sticker components and SVG decals with 3D vinyl hover peel physics.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/stickers",
  },
};

const stickersJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Stick It Up — Complete Sticker Catalog",
  description:
    "Explore interactive React sticker components and SVG decals with 3D vinyl hover peel physics.",
  url: `${siteUrl}/stickers`,
  isPartOf: {
    "@type": "WebSite",
    name: "Stick It Up",
    url: siteUrl,
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Stickers Catalog",
        item: `${siteUrl}/stickers`,
      },
    ],
  },
};

export default function StickersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(stickersJsonLd) }}
      />
      {children}
    </>
  );
}
