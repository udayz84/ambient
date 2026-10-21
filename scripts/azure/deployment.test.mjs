import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { assertRelease, config, verifyAssets, verifyLive } from "./check-web-release.mjs";

const commit = "a".repeat(40);
const buildId = "verified-build-id";
const bytes = Buffer.from("expected icon or asset");
const sha256 = createHash("sha256").update(bytes).digest("hex");
const manifest = {
  commit,
  assets: [{ path: "/changed image.webp", sha256 }],
  icons: config.icons.map((name) => ({ path: `/${name}`, sha256 })),
};
const html = `${buildId}${manifest.icons.map(({ path }) => `<link rel="${path.includes("apple") ? "apple-touch-icon" : "icon"}" href="${path}?v=current">`).join("")}`;

test("release identity requires the expected commit and running homepage build", () => {
  assert.doesNotThrow(() => assertRelease({ commit, buildId }, html, commit));
  assert.throws(() => assertRelease({ commit: "b".repeat(40), buildId }, html, commit));
  assert.throws(() => assertRelease({ commit, buildId }, "old application instance", commit));
});

test("production checks reject missing, redirected, and corrupted assets", async (t) => {
  let failure;
  const requests = [];
  t.mock.method(globalThis, "fetch", async (input, options) => {
    const url = new URL(input);
    requests.push({ url, options });
    if (url.pathname === "/") return new Response(failure === "missing" ? buildId : html);
    if (url.pathname === config.markerPath) return Response.json({ commit, buildId: failure === "old" ? "old-build" : buildId });
    if (manifest.icons.some(({ path }) => path === url.pathname) || url.origin === new URL(config.assetsOrigin).origin) {
      if (failure === "redirect") return new Response(null, { status: 302 });
      return new Response(failure === "corrupt" ? "wrong bytes" : bytes);
    }
    return new Response("page");
  });
  await verifyAssets(manifest);
  await verifyLive(manifest);
  assert.ok(requests.some(({ url }) => url.pathname.endsWith("/changed%20image.webp")));
  assert.ok(requests.some(({ url }) => url.pathname === "/developer"));
  assert.ok(requests.some(({ url, options }) => url.pathname === "/icon.png" && options.redirect === "manual"));
  for (failure of ["missing", "redirect", "corrupt", "old"]) await assert.rejects(verifyLive(manifest));
  failure = "corrupt";
  await assert.rejects(verifyAssets(manifest));
});
