import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Stick It Up — Free Interactive React Stickers & Vinyl Decals",
    short_name: "Stick It Up",
    description:
      "Open-source library of animated, interactive vector & pixel art sticker components for React and Next.js with realistic 3D vinyl peel physics.",
    start_url: "/",
    display: "standalone",
    background_color: "#fafaf9",
    theme_color: "#18181b",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/stickers/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}

