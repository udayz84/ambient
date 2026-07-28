/**
 * src/lib/seo.ts
 * ----------------------------------------------------------------------------
 * Bridge between the Strapi `shared.seo` component and Next.js App Router
 * `Metadata`. Each page exports a `generateMetadata` that fetches its own
 * `seo` section from Strapi and calls `buildMetadata()` with hardcoded
 * fallbacks so the page still has sensible title/description when Strapi is
 * unavailable or a field is empty.
 *
 * Note: Next.js automatically memoizes `fetch` requests with the same URL
 * across `generateMetadata`, `generateStaticParams`, layouts, and pages, so
 * the dedicated SEO fetch here is deduplicated with any identical call.
 * ----------------------------------------------------------------------------
 */
import type { Metadata } from "next";

/**
 * Canonical site origin. Mirrors the convention used in `src/app/sitemap.ts`:
 * read from NEXT_PUBLIC_SITE_URL (which MUST be set to the crawlable origin in
 * production), falling back to localhost for dev. Trailing slash stripped so
 * relative canonical paths join cleanly.
 */
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000"
).replace(/\/$/, "");

/**
 * Resolve a canonical URL value from Strapi into an absolute URL. Already
 * absolute URLs (http/https or protocol-relative `//`) are passed through;
 * relative paths (e.g. "/applications") are joined against the site origin.
 * Returns an empty string for empty input.
 */
function resolveCanonical(raw: string | null | undefined): string {
  const value = (raw ?? "").trim();
  if (!value) return "";
  if (/^https?:\/\//i.test(value) || value.startsWith("//")) return value;
  const path = value.startsWith("/") ? value : `/${value}`;
  return `${SITE_URL}${path}`;
}

/** Shape of the Strapi `shared.seo` component (see cms/src/components/shared/seo.json). */
export type SeoData = {
  meta_title?: string | null;
  meta_description?: string | null;
  keywords?: string | null;
  noindex?: boolean | null;
  canonical_url?: string | null;
};

type Fallback = {
  title: string;
  description: string;
};

/**
 * Build a Next.js `Metadata` object from a Strapi SEO component, falling back
 * to the provided defaults for any missing/empty field.
 */
export function buildMetadata(
  seo: SeoData | null | undefined,
  fallback: Fallback
): Metadata {
  const title = seo?.meta_title?.trim() || fallback.title;
  const description = seo?.meta_description?.trim() || fallback.description;

  const metadata: Metadata = { title, description };

  const keywords = seo?.keywords
    ? seo.keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean)
    : [];
  if (keywords.length) metadata.keywords = keywords;

  if (seo?.noindex) {
    metadata.robots = { index: false, follow: false };
  }

  const canonical = resolveCanonical(seo?.canonical_url);
  if (canonical) {
    metadata.alternates = { canonical };
  }

  return metadata;
}
