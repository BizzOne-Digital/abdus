import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    unoptimized: true,
    localPatterns: [
      { pathname: "/api/uploads/**" },
      { pathname: "/images/**" },
    ],
  },
};

export default nextConfig;
