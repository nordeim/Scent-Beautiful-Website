// next.config.js
// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  // The 'reactStrictMode' is true by default in Next.js 14+
  // and does not need to be explicitly set.

  // As per the project architecture, we will need to load images
  // from external domains like Cloudinary and Unsplash. This configuration block
  // prepares our application for that.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        // You can add port and pathname if needed, for example:
        // port: '',
        // pathname: '/your-cloudinary-account/**',
      },
      // New pattern added to whitelist images from Unsplash
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

module.exports = nextConfig;
