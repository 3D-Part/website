/** @type {import('next').NextConfig} */

// Same idea as the admin panel: keep the configured image host in sync with
// the environment so a local image server needs no edit here.
const imagesHostname = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_AMAZON_IMAGES).hostname
  } catch {
    return null
  }
})()

const nextConfig = {
  images: {
    remotePatterns: [
      "bucket3dparts.s3.eu-central-1.amazonaws.com",
      "bucket3dpart.s3.eu-central-1.amazonaws.com",
      ...(imagesHostname ? [imagesHostname] : []),
    ].map((hostname) => ({ hostname })),
    unoptimized: true,
  },
};

module.exports = nextConfig;
