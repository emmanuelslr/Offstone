import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    unoptimized: true,
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
