import type { NextConfig } from "next";

const strapiUrlStr = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1338";
let strapiUrl: URL;
try {
  strapiUrl = new URL(strapiUrlStr);
} catch (e) {
  strapiUrl = new URL("http://localhost:1338");
}

const nextConfig: NextConfig = {
  env: {
    AZURE_ASSETS_PUBLIC_URL: process.env.AZURE_ASSETS_PUBLIC_URL || "",
  },
  // Strapi redirects are now handled dynamically by src/middleware.ts
  // so they take effect immediately without needing a rebuild/restart.
  images: {
    // Next.js 16 blocks image optimization for local/private IPs by default.
    // Strapi runs on localhost:1338, so this is required for `next/image`
    // to optimize CMS images in dev (and any local-IP Strapi deployment).
    // See: node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: strapiUrl.protocol.replace(":", "") as "http" | "https",
        hostname: strapiUrl.hostname,
        port: strapiUrl.port,
      },
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
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
