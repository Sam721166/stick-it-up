import { execSync } from "node:child_process";

// Detect Cloudflare CI environment
const isCloudflare =
  Boolean(process.env.CF_PAGES) ||
  Boolean(process.env.CLOUDFLARE_WORKERS) ||
  Boolean(process.env.CLOUDFLARE) ||
  Boolean(process.env.HOME && process.env.HOME.includes("buildhome"));

// When opennextjs-cloudflare runs, it sets NEXT_PRIVATE_STANDALONE="true" before calling `npm run build`
const isInsideOpenNext = Boolean(process.env.NEXT_PRIVATE_STANDALONE);

if (isCloudflare && !isInsideOpenNext) {
  console.log("☁️ Cloudflare build environment detected: building with opennextjs-cloudflare and static assets copy...");
  execSync("node scripts/build-cf.mjs", { stdio: "inherit", env: process.env });
} else {
  execSync("npm run build:package && npx next build", { stdio: "inherit", env: process.env });
}
