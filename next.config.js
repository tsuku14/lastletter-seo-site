/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  experimental: {
    isrMemoryCacheSize: 0,
  },
}

module.exports = nextConfig
