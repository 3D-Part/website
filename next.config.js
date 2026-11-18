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
  // a broken link to "/&" was found by Google; it leads home
  async redirects() {
    return [{ source: "/&", destination: "/", permanent: true }];
  },
  async headers() {
    return [
      {
        // the ready-made profile avatars never change under the same address
        // (the address carries a version, see src/shared/avatars.ts), so the
        // browser and any CDN in front can keep them for a year
        source: "/assets/avatars/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
