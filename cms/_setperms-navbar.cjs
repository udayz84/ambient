/**
 * Grants public `find` on the navbar single type (api::navbar.navbar.find),
 * surgically — inserts/enables just that one permission row instead of
 * replacing the whole role permission set (unlike _setperms.cjs).
 *
 * Usage: node cms/_setperms-navbar.cjs   (Strapi dev server can stay running)
 */
const path = require("path");
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
    where: { action: "api::navbar.navbar.find", role: role.id },
  });

  if (!existing) {
    await query.create({
      data: { action: "api::navbar.navbar.find", role: role.id, enabled: true },
    });
    console.log("Created api::navbar.navbar.find (enabled) for public role", role.id);
  } else if (!existing.enabled) {
    await query.update({ where: { id: existing.id }, data: { enabled: true } });
    console.log("Enabled api::navbar.navbar.find for public role", role.id);
  } else {
    console.log("api::navbar.navbar.find already enabled for public role", role.id);
  }

  await strapi.destroy();
  process.exit(0);
})().catch((e) => {
  console.error("ERR", e && e.stack ? e.stack : e);
  process.exit(1);
});
