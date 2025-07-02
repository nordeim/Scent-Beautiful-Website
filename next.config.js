// next.config.js
// @ts-check

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Add a redirect for the base checkout path to the first step
  async redirects() {
    return [
      {
        source: '/checkout',
        destination: '/checkout/information',
        permanent: false, // This is part of a user flow, not a permanent SEO redirect
      },
    ]
  },
};

module.exports = withBundleAnalyzer(nextConfig)
