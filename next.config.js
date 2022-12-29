/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'wembleypark.com'],
  },
  env: {
    stripe_public_Key: process.env.STRIPE_PUBLIC_KEY
  }
}

module.exports = nextConfig


