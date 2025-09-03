import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Preversion branch: do not fail builds on lint errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Preversion branch: allow builds despite TS errors
    ignoreBuildErrors: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.prismic.io",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
