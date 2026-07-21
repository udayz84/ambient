import { readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, sep } from "node:path";

/**
 * src/lib/sitemap-routes.ts
 * ----------------------------------------------------------------------------
 * Level 1 automation: filesystem-based discovery of all static App Router
 * routes under src/app, so the sitemap auto-includes new pages with zero
 * manual registration.
 *
 * Handling rules (matching Next.js App Router semantics):
 *   - route groups   `(name)`   — valid folder, NOT part of the URL
 *   - private        `_name`    — skipped entirely
 *   - parallel       `@name`    — skipped entirely
 *   - hidden         `.name`    — skipped entirely
 *   - dynamic        `[name]`   — skipped here (cannot enumerate statically;
 *                                 Level 2 fetches these from Strapi instead)
 *   - catch-all      `[...name]`/`[[...name]]` — skipped (same reason)
 *
 * A folder counts as a route only if it contains a `page.{tsx,ts,jsx,js}`.
 * Other special files (layout, loading, error, not-found, template, default)
 * do NOT create routes.
 * ----------------------------------------------------------------------------
 */

const PAGE_FILENAMES = ["page.tsx", "page.ts", "page.jsx", "page.js"];

export type DiscoveredRoute = {
  /** URL path, e.g. "/products" or "/applications/wearables". Root is "/". */
  path: string;
  /** URL segments without route groups, e.g. ["applications", "wearables"]. */
  segments: string[];
  /** Absolute path to the page.{tsx,ts,jsx,js} file. */
  filePath: string;
};

/**
 * True for folders that must NOT appear in the URL but DO enclose routes,
 * i.e. route groups like `(marketing)`.
 */
function isRouteGroup(name: string): boolean {
  return name.startsWith("(") && name.endsWith(")");
}

/** True for folders/files that Next.js ignores or that we don't auto-include. */
function isSkippable(name: string): boolean {
  return (
    name.startsWith("_") || // private folder
    name.startsWith(".") || // hidden
    name.startsWith("@")    // parallel route
  );
}

/** True for dynamic segment folders ([slug], [...slug], [[...slug]]). */
function isDynamicSegment(name: string): boolean {
  return name.startsWith("[") && name.endsWith("]");
}

/**
 * Walk an App Router root (typically `<cwd>/src/app`) and return every static
 * route discovered. Routes are returned deduplicated by URL path.
 */
export function discoverStaticRoutes(appDir: string): DiscoveredRoute[] {
  if (!existsSync(appDir)) return [];

  const found = new Map<string, DiscoveredRoute>();

  function walk(dir: string): void {
    let entries: string[];
    try {
      entries = readdirSync(dir);
    } catch {
      return;
    }

    for (const entry of entries) {
      if (isSkippable(entry)) continue;

      const full = join(dir, entry);
      let st;
      try {
        st = statSync(full);
      } catch {
        continue;
      }

      if (st.isDirectory()) {
        if (isDynamicSegment(entry)) {
          // Dynamic routes are enumerated by Level 2 (Strapi fetch), not here.
          continue;
        }
        walk(full);
        continue;
      }

      if (!PAGE_FILENAMES.includes(entry)) continue;

      // This is a page.{tsx,...} file. Build the URL from the parent dir.
      const rel = relative(appDir, dir);
      const segmentsRaw = rel === "" ? [] : rel.split(sep).filter(Boolean);

      // Drop route groups from the URL path.
      const urlSegments = segmentsRaw.filter((s) => !isRouteGroup(s));
      const urlPath = urlSegments.length === 0 ? "/" : "/" + urlSegments.join("/");

      if (!found.has(urlPath)) {
        found.set(urlPath, { path: urlPath, segments: urlSegments, filePath: full });
      }
    }
  }

  walk(appDir);
  return Array.from(found.values());
}
