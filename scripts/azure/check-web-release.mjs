import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

export const config = JSON.parse(
  await readFile(new URL("./deployment-config.json", import.meta.url), "utf8"),
);

export function assertRelease(marker, html, expectedCommit) {
  if (marker.commit !== expectedCommit || !marker.buildId) {
    throw new Error("The new release marker is not live yet.");
  }
  if (!html.includes(marker.buildId)) {
    throw new Error("The homepage is still rendered by another build.");
  }
}

async function request(url, { redirects = "follow" } = {}) {
  const response = await fetch(url, {
    redirect: redirects,
    headers: { "Cache-Control": "no-cache" },
    signal: AbortSignal.timeout(30_000),
  });
  if (response.status !== 200) {
    await response.body?.cancel();
    throw new Error(`HTTP ${response.status}: ${new URL(url).pathname}`);
  }
  return response;
}

async function verifyBytes(url, expected) {
  const response = await request(url, { redirects: "manual" });
  const actual = createHash("sha256").update(Buffer.from(await response.arrayBuffer())).digest("hex");
  if (actual !== expected) throw new Error(`File bytes differ: ${new URL(url).pathname}`);
}

export async function verifyAssets(manifest) {
  for (const asset of manifest.assets) {
    const path = asset.path.split("/").map(encodeURIComponent).join("/");
    await verifyBytes(`${config.assetsOrigin}${path}`, asset.sha256);
    console.log(`Blob asset verified: ${asset.path}`);
  }
}

export async function verifyLive(manifest) {
  const nonce = `${manifest.commit}-${Date.now()}`;
  const homepage = await (await request(`${config.siteOrigin}/?release_check=${nonce}`)).text();
  if (manifest.commit !== config.bootstrapCommit) {
    const marker = await (await request(`${config.siteOrigin}${config.markerPath}?release_check=${nonce}`)).json();
    assertRelease(marker, homepage, manifest.commit);
  }
  // Fetch the actual icon URLs emitted by this release, including cache keys.
  const links = [...homepage.matchAll(/<link\b[^>]*rel="(?:icon|apple-touch-icon)"[^>]*>/g)];
  const found = new Set();
  for (const [tag] of links) {
    const href = tag.match(/\bhref="([^"]+)"/)?.[1]?.replaceAll("&amp;", "&");
    if (!href) continue;
    const url = new URL(href, config.siteOrigin);
    const expected = manifest.icons.find((icon) => icon.path === url.pathname);
    if (url.origin !== config.siteOrigin || !expected) throw new Error("Unexpected icon URL in live page.");
    await verifyBytes(url, expected.sha256);
    found.add(url.pathname);
  }
  if (found.size !== manifest.icons.length) throw new Error("A required icon link is missing.");
  for (const page of config.pages.slice(1)) {
    const response = await request(`${config.siteOrigin}${page}`);
    await response.body?.cancel();
  }
  console.log(`Verified live release ${manifest.commit}: homepage build, icons, and ${config.pages.length} pages.`);
}

async function main() {
  const [mode, path] = process.argv.slice(2);
  if (!["assets", "live"].includes(mode) || !path) {
    throw new Error("Usage: node check-web-release.mjs <assets|live> <manifest.json>");
  }
  const manifest = JSON.parse(await readFile(path, "utf8"));
  if (!/^[a-f0-9]{40}$/.test(manifest.commit)) throw new Error("Invalid release commit.");
  if (mode === "assets") return verifyAssets(manifest);
  const deadline = Date.now() + 10 * 60_000;
  let previousError;
  while (true) {
    try {
      return await verifyLive(manifest);
    } catch (error) {
      if (Date.now() >= deadline) throw error;
      if (error.message !== previousError) console.log(`Waiting for release: ${error.message}`);
      previousError = error.message;
      await new Promise((resolve) => setTimeout(resolve, 20_000));
    }
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  await main();
}
