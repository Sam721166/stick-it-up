import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse All 31+ Stickers & Badges",
  description:
    "Explore 31+ interactive React stickers and badges with 3D vinyl hover peel. Filter by categories, customize size, copy ready-to-use code, or download SVGs.",
  openGraph: {
    title: "Browse All 31+ Stickers & Badges | Stick It Up",
    description:
      "Explore 31+ interactive React stickers and badges with 3D vinyl hover peel. Filter by categories, customize size, copy code, or download SVGs.",
    url: "/stickers",
    images: [
      {
        url: "/og-image.png",
        width: 1024,
        height: 593,
        alt: "Stick It Up — Stickers & Badges Catalog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Browse All 31+ Stickers & Badges | Stick It Up",
    description:
      "Explore 31+ interactive React stickers and badges with 3D vinyl hover peel.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/stickers",
  },
};

export default function StickersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

