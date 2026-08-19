/**
 * Grants public `find` on the footer single type (api::footer.footer.find),
 * surgically — inserts/enables just that one permission row instead of
 * replacing the whole role permission set (same approach as
 * _setperms-navbar.cjs).
 *
 * Required so the Next.js frontend (src/lib/strapi.ts getFooter) can read
 * the footer single type anonymously, like it already does for navbar.
 *
 * Usage: node cms/_setperms-footer.cjs   (Strapi dev server can stay running)
 */
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const { createStrapi } = require("@strapi/core");

(async () => {
  const strapi = createStrapi({
    appDir: path.resolve(__dirname),
    distDir: path.resolve(__dirname, "dist"),
  });
  await strapi.load();

  const role = await strapi
    .db.query("plugin::users-permissions.role")
    .findOne({ where: { type: "public" } });
  if (!role) throw new Error("Public role not found");

  const query = strapi.db.query("plugin::users-permissions.permission");
  const existing = await query.findOne({
    where: { action: "api::footer.footer.find", role: role.id },
  });

  if (!existing) {
    await query.create({
      data: { action: "api::footer.footer.find", role: role.id, enabled: true },
    });
    console.log("Created api::footer.footer.find (enabled) for public role", role.id);
  } else if (!existing.enabled) {
    await query.update({ where: { id: existing.id }, data: { enabled: true } });
    console.log("Enabled api::footer.footer.find for public role", role.id);
  } else {
    console.log("api::footer.footer.find already enabled for public role", role.id);
  }

  await strapi.destroy();
  process.exit(0);
})().catch((e) => {
  console.error("ERR", e && e.stack ? e.stack : e);
  process.exit(1);
});
