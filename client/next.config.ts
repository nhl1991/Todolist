import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: path.resolve(__dirname),
  },
  experimental: {
    authInterrupts: true,
  },
};

export default nextConfig;
