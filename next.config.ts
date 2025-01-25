import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dragonra.bsite.net',
        pathname: '/api/img/**',
      },
    ],
  },
};

export default nextConfig;
