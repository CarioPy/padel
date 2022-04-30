/** @type {import('next').NextConfig} */

module.exports = {
  nextConfig: {
    reactStrictMode: true,
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  env: {
    MONGO_URI: process.env.MONGO_URI,
  },
};
