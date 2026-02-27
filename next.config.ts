import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // prevents double-render of WebGL in dev
  experimental: {
    optimizePackageImports: ["three", "@react-three/fiber", "@react-three/drei", "framer-motion", "gsap"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
