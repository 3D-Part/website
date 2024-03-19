/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "bucket3dparts.s3.eu-central-1.amazonaws.com",
      "bucket3dpart.s3.eu-central-1.amazonaws.com",
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
