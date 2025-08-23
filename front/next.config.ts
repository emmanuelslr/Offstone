import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    formats: ['image/webp', 'image/avif'],
    unoptimized: false,
  },
};

export default nextConfig;
