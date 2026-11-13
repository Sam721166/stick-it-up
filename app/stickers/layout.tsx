import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://stickitupx.com";

export const metadata: Metadata = {
  title: "Browse Stickers",
  description:
    "Explore 65+ interactive React sticker components and SVG decals with 3D vinyl hover peel physics. Handcrafted characters, mascots, chrome badges, and UI stickers. Free for personal & commercial use.",
  keywords: [
    "stick it up",
    "stickitup",
    "stickitupx",
    "ui stickers",
    "ui sticker library",
    "react stickers catalog",
    "free svg stickers",
    "vinyl peel stickers",
    "react badge components",
    "pixel art stickers react",
    "holographic stickers react",
    "ui stickers download",
  ],
  openGraph: {
    title: "Browse Stickers | Stick It Up",
    description:
      "Explore 65+ interactive React sticker components and SVG decals with 3D vinyl hover peel physics. Filter by categories, customize size, copy code, or download SVGs.",
    url: `${siteUrl}/stickers`,
    siteName: "Stick It Up",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Stick It Up — Complete Stickers & Badges Catalog",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Browse Stickers | Stick It Up",
    description:
      "Explore 65+ interactive React sticker components and SVG decals with 3D vinyl hover peel physics.",
    images: [`${siteUrl}/og-image.png`],
  },
  alternates: {
    canonical: `${siteUrl}/stickers`,
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
