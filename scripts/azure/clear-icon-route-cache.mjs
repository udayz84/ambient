import { createHash } from "node:crypto";
import { rm } from "node:fs/promises";
import { resolve } from "node:path";

// In-place deployments can retain runtime responses ahead of the new build's
// metadata image files. Clear only those responses before Next.js starts.
const cacheRoot = resolve(".next/server/route-cache/APP_ROUTE");
const icons = ["favicon.ico", "icon.png", "apple-icon.png"];

for (const icon of icons) {
  const owner = createHash("sha256").update(`/${icon}/route`).digest("hex");
  const cacheFile = resolve(cacheRoot, owner, "$", icon);
  await rm(`${cacheFile}.body`, { force: true });
  await rm(`${cacheFile}.meta`, { force: true });
}
