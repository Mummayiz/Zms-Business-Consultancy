import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root: a package-lock.json exists higher up in the user folder.
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    /*
     * WebP only: AVIF saved ~13KB but cost over a second of main-thread decode
     * for the 1.5MP hero on desktop (measured with Lighthouse).
     */
    formats: ["image/webp"],
    // 60 for the soft hero background, 75 (the default) for everything else.
    qualities: [60, 75],
  },
};

export default nextConfig;
