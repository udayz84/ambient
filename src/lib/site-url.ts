/**
 * src/lib/site-url.ts
 * ----------------------------------------------------------------------------
 * Canonical site origin resolver.
 *
 * Guarantees that the site URL:
 *   1. Never emits internal Azure default domains (*.azurewebsites.net)
 *      to sitemaps, robots.txt, or canonical tags, which causes Search Console
 *      cross-domain errors.
 *   2. Always defaults to the canonical production domain (https://www.ambientscientific.ai)
 *      so that sitemaps and SEO tags reflect real production URLs even when
 *      tested locally.
 *   3. Allows explicit override via NEXT_PUBLIC_SITE_URL when testing a custom origin.
 * ----------------------------------------------------------------------------
 */

export const PRODUCTION_SITE_URL = "https://www.ambientscientific.ai";

export function getSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  // If explicitly set to a custom origin (and not an Azure internal hostname):
  if (envUrl && !envUrl.includes("azurewebsites.net")) {
    return envUrl.replace(/\/+$/, "");
  }

  // Default to the canonical production URL across all environments
  return PRODUCTION_SITE_URL;
}
