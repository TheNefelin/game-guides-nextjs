import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/a/**',
      },
      {
        protocol: 'https',
        hostname: 'dragonra.bsite.net',
        port: '',
        pathname: '/api/**',
      },
      {
        protocol: 'https',
        hostname: 'localhost:7082',
        port: '',
        pathname: '/api/**',
      },      
    ],
  },
};

export default nextConfig;
