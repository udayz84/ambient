import { rm } from "node:fs/promises";
import { resolve } from "node:path";

// In-place deployments can retain runtime responses ahead of the new build's
// metadata routes (icons, sitemaps, robots). Clear stale runtime route caches before Next.js starts.
const routeCache = resolve(".next/server/route-cache");
await rm(routeCache, { recursive: true, force: true });

