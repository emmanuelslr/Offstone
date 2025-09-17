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
  // Configuration pour éviter les ChunkLoadError
  webpack: (config, { isServer, dev }) => {
    // Améliorer la gestion des chunks en développement
    if (dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          cacheGroups: {
            ...config.optimization.splitChunks?.cacheGroups,
            default: {
              ...config.optimization.splitChunks?.cacheGroups?.default,
              minChunks: 1,
              priority: -20,
              reuseExistingChunk: true,
            },
            vendor: {
              ...config.optimization.splitChunks?.cacheGroups?.vendor,
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: -10,
              chunks: 'all',
            },
          },
        },
      };
    }
    return config;
  },
  // Améliorer la stabilité en développement
  experimental: {
    // Optimiser le chunking
    optimizePackageImports: ['framer-motion', 'swiper'],
  },
  images: {
    dangerouslyAllowSVG: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    remotePatterns: [
      { protocol: "https", hostname: "images.prismic.io", pathname: "/**" },
      { protocol: "https", hostname: "offstone.fr", pathname: "/**" },
      { protocol: "https", hostname: "www.offstone.fr", pathname: "/**" },
    ],
  },
};

export default nextConfig;
