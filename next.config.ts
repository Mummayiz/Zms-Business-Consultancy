import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root: a package-lock.json exists higher up in the user folder.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
