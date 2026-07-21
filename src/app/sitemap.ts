import type { MetadataRoute } from "next";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { discoverStaticRoutes } from "@/lib/sitemap-routes";

/**
 * src/app/sitemap.ts
 * ----------------------------------------------------------------------------
 * Automated sitemap. Auto-served at /sitemap.xml.
 *
 * Automation levels in this file:
 *
 *   Level 1 — Static routes are auto-discovered by walking src/app for
 *             page.tsx files. Add a new page folder → it appears in the
 *             sitemap automatically. No edits needed here.
 *
 *   Level 2 — Dynamic routes (e.g. /news/:slug) are pulled from Strapi so
 *             CMS-authored content is indexed without code changes. Each
 *             source is GUARDED on the existence of its consuming route
 *             folder (e.g. src/app/news/[slug]); URLs are only emitted when
 *             the route actually exists, so we never tell Google about a
 *             page that 404s.
 *
 *   Level 3 — On-demand revalidation: Strapi's webhook hits
 *             /api/revalidate on publish, which calls revalidatePath on this
 *             sitemap (and the relevant list page). See
 *             src/app/api/revalidate/route.ts.
 *
 * The site origin is read from NEXT_PUBLIC_SITE_URL. In production this MUST
 * be set to the canonical crawlable origin.
 * ----------------------------------------------------------------------------
 */

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000").replace(/\/$/, "");
const STRAPI_URL = (process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1338").replace(/\/$/, "");
const APP_DIR = join(process.cwd(), "src", "app");

type ChangeFrequency = MetadataRoute.Sitemap[number]["changeFrequency"];

/**
 * Per-route SEO overrides. Routes discovered from the filesystem without an
 * entry here fall back to depth-based defaults (see defaultPriority).
 *
 * Add an entry only when you want to override the default priority or
 * changeFrequency — new routes don't NEED an entry to appear in the sitemap.
 */
const ROUTE_OVERRIDES: Record<
  string,
  { priority?: number; changeFrequency?: ChangeFrequency }
> = {
  "/": { priority: 1.0, changeFrequency: "weekly" },
  "/products": { priority: 0.9, changeFrequency: "monthly" },
  "/technology": { priority: 0.9, changeFrequency: "monthly" },
  "/applications": { priority: 0.9, changeFrequency: "monthly" },
  "/applications/wearables": { priority: 0.8, changeFrequency: "monthly" },
  "/developer": { priority: 0.8, changeFrequency: "monthly" },
  "/dvk": { priority: 0.8, changeFrequency: "monthly" },
  "/news-listing": { priority: 0.8, changeFrequency: "weekly" },
  "/resources": { priority: 0.7, changeFrequency: "weekly" },
  "/company": { priority: 0.7, changeFrequency: "monthly" },
  "/careers": { priority: 0.7, changeFrequency: "weekly" },
  "/SOM": { priority: 0.6, changeFrequency: "monthly" },
  "/contact": { priority: 0.6, changeFrequency: "yearly" },
};

/** Depth-based priority for routes that don't have an explicit override. */
function defaultPriority(path: string): number {
  if (path === "/") return 1.0;
  const depth = path.split("/").filter(Boolean).length;
  if (depth === 1) return 0.8;
  if (depth === 2) return 0.6;
  return 0.5;
}

// ---- Level 2: dynamic sources --------------------------------------------

type DynamicSource = {
  /** URL prefix, e.g. "/news". URLs become `${urlPrefix}/${slug}`. */
  urlPrefix: string;
  /** Strapi collection apiId, e.g. "articles". */
  strapiCollection: string;
  /**
   * Absolute path to the consuming route folder. The source only emits URLs
   * when this path exists, so creating src/app/news/[slug]/page.tsx is the
   * switch that turns the source on.
   */
  routeFolder: string;
  priority?: number;
  changeFrequency?: ChangeFrequency;
};

/**
 * Dynamic sources. Add a new entry when you ship a new CMS-driven dynamic
 * route. Each is a no-op until the corresponding [slug] folder exists.
 */
const DYNAMIC_SOURCES: DynamicSource[] = [
  {
    urlPrefix: "/news",
    strapiCollection: "articles",
    routeFolder: join(APP_DIR, "news", "[slug]"),
    priority: 0.6,
    changeFrequency: "weekly",
  },
];

type StrapiSlugResponse = {
  data?: Array<{ slug?: string | null; updatedAt?: string | null } | null> | null;
};

/**
 * Fetch slug + updatedAt for every published entry in a Strapi collection.
 * Uses ISR (1h revalidate) so the sitemap stays cached between webhook pings.
 * Returns [] on any error so a Strapi outage never poisons the sitemap.
 */
async function fetchSlugs(collection: string): Promise<Array<{ slug: string; updatedAt?: string }>> {
  try {
    const url =
      `${STRAPI_URL}/api/${collection}` +
      `?fields[0]=slug&fields[1]=updatedAt` +
      `&pagination[pageSize]=1000&status=published`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const json = (await res.json()) as StrapiSlugResponse;
    return (json.data ?? []).filter(
      (item): item is { slug: string; updatedAt?: string } => !!item?.slug
    );
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // --- Level 1: filesystem-discovered static routes ----------------------
  const staticRoutes = discoverStaticRoutes(APP_DIR);
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(({ path }) => {
    const override = ROUTE_OVERRIDES[path];
    return {
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: override?.changeFrequency ?? "monthly",
      priority: override?.priority ?? defaultPriority(path),
    };
  });

  // --- Level 2: Strapi-driven dynamic routes (guarded) -------------------
  const dynamicEntries: MetadataRoute.Sitemap = [];
  for (const source of DYNAMIC_SOURCES) {
    if (!existsSync(source.routeFolder)) continue;
    const items = await fetchSlugs(source.strapiCollection);
    for (const item of items) {
      dynamicEntries.push({
        url: `${SITE_URL}${source.urlPrefix}/${item.slug}`,
        lastModified: item.updatedAt ? new Date(item.updatedAt) : now,
        changeFrequency: source.changeFrequency ?? "weekly",
        priority: source.priority ?? 0.6,
      });
    }
  }

  return [...staticEntries, ...dynamicEntries];
}
