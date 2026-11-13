import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

console.log("🚀 Step 1: Running opennextjs-cloudflare build...");
execSync("npx opennextjs-cloudflare build", { stdio: "inherit", env: process.env });

console.log("📦 Step 2: Copying pre-rendered static HTML and assets to .open-next/assets...");

const projectRoot = process.cwd();
const appOutputDir = path.join(projectRoot, ".next", "server", "app");
const assetsDir = path.join(projectRoot, ".open-next", "assets");

if (fs.existsSync(appOutputDir)) {
  // Ensure target directories exist
  fs.mkdirSync(assetsDir, { recursive: true });
  fs.mkdirSync(path.join(assetsDir, "stickers"), { recursive: true });

  const copyIfSrcExists = (src, dest) => {
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      console.log(`  ✓ Copied: ${path.relative(projectRoot, src)} -> ${path.relative(projectRoot, dest)}`);
    }
  };

  // 1. Homepage HTML & RSC
  copyIfSrcExists(path.join(appOutputDir, "index.html"), path.join(assetsDir, "index.html"));
  copyIfSrcExists(path.join(appOutputDir, "index.rsc"), path.join(assetsDir, "index.rsc"));

  // 2. Stickers page HTML & RSC (both as stickers.html and stickers/index.html for clean routing)
  copyIfSrcExists(path.join(appOutputDir, "stickers.html"), path.join(assetsDir, "stickers.html"));
  copyIfSrcExists(path.join(appOutputDir, "stickers.html"), path.join(assetsDir, "stickers", "index.html"));
  copyIfSrcExists(path.join(appOutputDir, "stickers.rsc"), path.join(assetsDir, "stickers.rsc"));
  copyIfSrcExists(path.join(appOutputDir, "stickers.rsc"), path.join(assetsDir, "stickers", "index.rsc"));

  // 3. 404 error page
  copyIfSrcExists(path.join(appOutputDir, "_not-found.html"), path.join(assetsDir, "404.html"));

  // 4. SEO & metadata files
  copyIfSrcExists(path.join(appOutputDir, "robots.txt.body"), path.join(assetsDir, "robots.txt"));
  copyIfSrcExists(path.join(appOutputDir, "sitemap.xml.body"), path.join(assetsDir, "sitemap.xml"));
  copyIfSrcExists(path.join(appOutputDir, "manifest.webmanifest.body"), path.join(assetsDir, "manifest.webmanifest"));

  console.log("✨ Pre-rendered static pages successfully placed into .open-next/assets!");
  console.log("   Now Cloudflare Edge will serve all page visits directly with 0.0ms CPU!");
} else {
  console.warn("⚠️ Warning: .next/server/app directory not found. Skipping static asset copying.");
}

