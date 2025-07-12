/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export' を完全削除（静的生成を無効化）
  images: {
    unoptimized: true,
  },
  // trailingSlash: true を削除
  
}

module.exports = nextConfig
