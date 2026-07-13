import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next.js 16 blocks image optimization for local/private IPs by default.
    // Strapi runs on localhost:1338, so this is required for `next/image`
    // to optimize CMS images in dev (and any local-IP Strapi deployment).
    // See: node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1338",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1338",
      },
    ],
  },
};

export default nextConfig;
