/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  experimental: {
    isrMemoryCacheSize: 0, // ISRキャッシュを無効化
  },
}

module.exports = nextConfig
