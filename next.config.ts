import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true, // ← allows plain <img> to serve without optimization issues
  },
};

export default nextConfig;
