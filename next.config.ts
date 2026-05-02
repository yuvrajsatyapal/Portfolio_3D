import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {},
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  webpack(config) {
    // Allow importing .glb / .gltf / .hdr files
    config.module.rules.push({
      test: /\.(glb|gltf|hdr)$/,
      use: { loader: 'file-loader', options: { publicPath: '/_next/static/files/', outputPath: 'static/files/', name: '[name].[hash].[ext]' } },
    })
    return config
  },
}

export default nextConfig