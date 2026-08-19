/**
 * src/lib/strapi.ts
 * ----------------------------------------------------------------------------
 * Strapi v5 data client for Next.js (App Router). All page components use this
 * to fetch single types and resolve media URLs.
 *
 * Behavior:
 *   - GET via fetch with ISR (revalidate every 60s in production; on-demand
 *     revalidation via Strapi webhook is a future enhancement).
 *   - Reads the Strapi URL from NEXT_PUBLIC_STRAPI_URL (defaults to the local
 *     dev port 1338).
 *   - Reads an optional bearer token from STRAPI_TOKEN (server-side only).
 *     Public read works without it on this Strapi instance, but the env var is
 *     used if present.
 *   - Populates nested components + media via per-section populate params
 *     (the populate-deep plugin is NOT installed).
 * ----------------------------------------------------------------------------
 */

const STRAPI_URL = (
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1338"
).replace(/\/$/, "");

// NOTE: public role has read access on this Strapi, so no Authorization header
// is sent. The STRAPI_TOKEN in .env is reserved for the seed scripts.
// If you later lock down public read, set NEXT_PUBLIC_STRAPI_READ_TOKEN and
// uncomment the auth line in fetchStrapi.

/** Raw fetch to Strapi. Returns parsed JSON or throws. */
export async function fetchStrapi<T = unknown>(path: string): Promise<T> {
  const url = path.startsWith("http") ? path : `${STRAPI_URL}${path}`;
  const headers: Record<string, string> = {};

  const res = await fetch(url, {
    headers,
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(
      `Strapi fetch failed: ${res.status} ${res.statusText} — ${url}`
    );
  }

  return res.json() as Promise<T>;
}

/**
 * A section to populate. Plain strings populate the section + its direct
 * media one level deep. Objects allow specifying `nested` (repeatable/
 * sub-component field names whose internal media needs depth-2 populate)
 * and `fields` (direct media/relation field names — required when `nested`
 * is present because `*` conflicts with explicit field keys in qs).
 */
export type PopulateSection = string | {
  section: string;
  nested?: string[];
  fields?: string[];
};

/**
 * Build a populate query string for Strapi v5 (without populate-deep plugin).
 *
 * For sections WITHOUT nested components we emit
 *   `populate[section][populate]=*`
 * which populates the section and all its direct media/relations.
 *
 * For sections WITH nested components we CANNOT use `*` (it conflicts with
 * explicit bracket keys in qs, producing "Invalid populate parameter").
 * Instead we list direct media fields with `=true` and each nested component
 * with `[populate]=*` so media inside repeatable components (team photos,
 * article images, feature-card icons, …) is populated.
 */
export function buildPopulate(sections: PopulateSection[]): string {
  const parts: string[] = [];
  for (const entry of sections) {
    const section = typeof entry === "string" ? entry : entry.section;
    const nested = typeof entry === "string" ? [] : entry.nested ?? [];
    const fields = typeof entry === "string" ? [] : entry.fields ?? [];

    if (nested.length === 0) {
      parts.push(`populate[${section}][populate]=*`);
    } else {
      for (const field of fields) {
        if (field.includes('.')) {
          const split = field.split('.');
          let queryStr = `populate[${section}]`;
          for (const s of split) {
            queryStr += `[populate][${s}]`;
          }
          queryStr += `=true`;
          parts.push(queryStr);
        } else {
          parts.push(`populate[${section}][populate][${field}]=true`);
        }
      }
      for (const n of nested) {
        if (n.includes('.')) {
          const split = n.split('.');
          let queryStr = `populate[${section}]`;
          for (const s of split) {
            queryStr += `[populate][${s}]`;
          }
          queryStr += `[populate]=*`;
          parts.push(queryStr);
        } else {
          parts.push(`populate[${section}][populate][${n}][populate]=*`);
        }
      }
    }
  }
  return parts.join("&");
}

/** Shape of a Strapi v5 single-type response. */
export type StrapiResponse<T> = { data: T | null; meta: Record<string, unknown> };

/** Shape of a Strapi media field. */
export type StrapiMedia = {
  id: number;
  documentId: string;
  url: string; // relative to STRAPI_URL, e.g. "/uploads/foo.png"
  alternativeText: string | null;
  name: string;
  mime: string;
  width?: number;
  height?: number;
} | null;

/**
 * Resolve a Strapi media object to an absolute URL safe for <img src> /
 * next/image. Returns null for missing media so callers can fall back to a
 * hardcoded decorative asset.
 */
export function mediaUrl(media: StrapiMedia | undefined | null): string | null {
  if (!media?.url) return null;
  const url = media.url;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return `${STRAPI_URL}${url}`;
}

/**
 * Fetch a single type with all sections deeply populated.
 * Pass the apiId (e.g. "home-page") and the list of top-level section names
 * from the schema (e.g. ["hero", "measured_proof", ...]).
 */
export async function getSingleType<T = unknown>(
  apiId: string,
  sections: PopulateSection[] = []
): Promise<T | null> {
  const query = sections.length ? `?${buildPopulate(sections)}` : "";
  const res = await fetchStrapi<StrapiResponse<T>>(`/api/${apiId}${query}`);
  return res.data;
}

/**
 * Fetch a collection type (e.g. "jobs") with deep population if specified.
 */
export async function getCollection<T = unknown>(
  apiId: string,
  queryParamString = ""
): Promise<T[]> {
  const res = await fetchStrapi<StrapiResponse<T[]>>(`/api/${apiId}?${queryParamString}`);
  return res.data || [];
}

/** Fetch the navbar single type (brand + header with nested nav sub-items). */
export async function getNavbar<T = unknown>(): Promise<T | null> {
  const sections: PopulateSection[] = [
    "brand",
    { section: "header", fields: ["cta_dot_icon"], nested: ["nav_items.children"] },
  ];
  const res = await fetchStrapi<StrapiResponse<T>>(
    `/api/navbar?${buildPopulate(sections)}`
  );
  return res.data;
}

/** Fetch the footer single type (footer + newsletter + contact_details + default_seo). */
export async function getFooter<T = unknown>(): Promise<T | null> {
  const sections: PopulateSection[] = [
    {
      section: "footer",
      fields: ["crafted_by_logo", "background_image"],
      nested: ["social_links", "nav_sections.links", "legal_links"],
    },
    "newsletter",
    "contact_details",
    "default_seo",
  ];
  const res = await fetchStrapi<StrapiResponse<T>>(
    `/api/footer?${buildPopulate(sections)}`
  );
  return res.data;
}

export { STRAPI_URL };
