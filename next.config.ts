import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/tayroPharma',
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true, // 👈 ignorar errores de ESLint al compilar
  },
};

export default nextConfig;
