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
  // Configuration pour éviter les ChunkLoadError et optimiser les performances
  webpack: (config, { isServer, dev }) => {
    // Optimisations pour la production
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 244000,
          cacheGroups: {
            ...config.optimization.splitChunks?.cacheGroups,
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: -10,
              chunks: 'all',
              enforce: true,
            },
            // Optimisations avancées par bibliothèque
            framerMotion: {
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              name: 'framer-motion',
              chunks: 'all',
              priority: 20,
              enforce: true,
            },
            swiper: {
              test: /[\\/]node_modules[\\/]swiper[\\/]/,
              name: 'swiper',
              chunks: 'all',
              priority: 20,
              enforce: true,
            },
            prismic: {
              test: /[\\/]node_modules[\\/]@prismicio[\\/]/,
              name: 'prismic',
              chunks: 'all',
              priority: 20,
              enforce: true,
            },
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: 'react',
              chunks: 'all',
              priority: 30,
              enforce: true,
            },
            next: {
              test: /[\\/]node_modules[\\/]next[\\/]/,
              name: 'next',
              chunks: 'all',
              priority: 25,
              enforce: true,
            },
            analytics: {
              test: /[\\/]node_modules[\\/](@vercel|@microsoft)[\\/]/,
              name: 'analytics',
              chunks: 'all',
              priority: 15,
              enforce: true,
            },
            utils: {
              test: /[\\/]node_modules[\\/](nanoid|libphonenumber-js)[\\/]/,
              name: 'utils',
              chunks: 'all',
              priority: 10,
              enforce: true,
            },
          },
        },
        // Optimisations avancées
        usedExports: true,
        sideEffects: false,
        providedExports: true,
      };
      
      // Optimisations de compression (utilise le minimizer par défaut de Next.js)
      // Les optimisations Terser sont déjà incluses dans Next.js
    }
    
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
    optimizePackageImports: ['framer-motion', 'swiper', '@prismicio/react', '@prismicio/next'],
    // Optimiser les imports
    optimizeServerReact: true,
    // Optimiser les images
    optimizeCss: true,
  },
  // Optimisations de performance
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
  images: {
    dangerouslyAllowSVG: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    // Optimisations de performance
    unoptimized: false,
    loader: 'default',
    remotePatterns: [
      { protocol: "https", hostname: "images.prismic.io", pathname: "/**" },
      { protocol: "https", hostname: "offstone.fr", pathname: "/**" },
      { protocol: "https", hostname: "www.offstone.fr", pathname: "/**" },
    ],
  },
};

export default nextConfig;
