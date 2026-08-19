/**
 * Mints a full-access content-api Strapi token for the repo /scripts seeders
 * and prints the plaintext access key on the last line.
 *
 * Needed because .env STRAPI_TOKEN is empty (the previous token was rotated
 * out) and every scripts/seed-*.mjs authenticates with it.
 *
 * Idempotent: if a token named "seed-scripts" already exists the script exits
 * without creating a duplicate (the plaintext key can only be shown once).
 *
 * Usage: node cms/_mktoken.cjs
 *   -> copy the last line into .env as STRAPI_TOKEN=<key>
 */
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const { createStrapi } = require("@strapi/core");

const TOKEN_NAME = "seed-scripts";

(async () => {
  const strapi = createStrapi({
    appDir: path.resolve(__dirname),
    distDir: path.resolve(__dirname, "dist"),
  });
  await strapi.load();

  const existing = await strapi.db
    .query("admin::api-token")
    .findOne({ where: { name: TOKEN_NAME } });

  if (existing) {
    console.error(
      `[skip] token "${TOKEN_NAME}" already exists (id ${existing.id}) — no new token created.`
    );
    await strapi.destroy();
    process.exit(0);
  }

  const token = await strapi.service("admin::api-token").create({
    name: TOKEN_NAME,
    description: "Full access token for repo-root /scripts seeders",
    type: "full-access",
    kind: "content-api",
    lifespan: null,
  });

  console.error(`[ok] created token "${TOKEN_NAME}" (id ${token.id})`);
  console.log(token.accessKey);

  await strapi.destroy();
  process.exit(0);
})().catch((e) => {
  console.error("ERR", e && e.stack ? e.stack : e);
  process.exit(1);
});
