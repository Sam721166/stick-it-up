import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build plain HTML/CSS/JS into ./out. Cloudflare serves those files without
  // running any code; worker/index.ts handles /api/visitors. Static export
  // ignores headers(), so response headers live in public/_headers.
  output: "export",
  transpilePackages: ["stick-it-up"],
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
