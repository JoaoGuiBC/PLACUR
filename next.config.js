/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['github.com', 'storage.googleapis.com'],
  },
  pageExtensions: ['page.tsx', 'api.ts', 'api.tsx'],
}

module.exports = nextConfig
