import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/tayroPharma',
  assetPrefix: '/tayroPharma', // 👉 Esto es CRUCIAL para GitHub Pages
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
