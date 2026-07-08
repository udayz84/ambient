const path = require('path');
const { createStrapi } = require('@strapi/core');

(async () => {
  const strapi = createStrapi({
    appDir: path.resolve(__dirname),
    distDir: path.resolve(__dirname, 'dist'),
  });
  await strapi.load();

  const role = await strapi
    .db.query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!role) throw new Error('Public role not found');

  const permissions = {
    'api::home-page': { controllers: { 'home-page': { find: { enabled: true } } } },
    'api::article': { controllers: { article: { find: { enabled: true }, findOne: { enabled: true } } } },
    'api::global-settings': { controllers: { 'global-settings': { find: { enabled: true } } } },
  };

  await strapi.plugin('users-permissions').service('role').updateRole(role.id, {
    name: role.name,
    description: role.description,
    permissions,
  });

  console.log('Public permissions set for role id', role.id);
  await strapi.destroy();
  process.exit(0);
})().catch((e) => {
  console.error('ERR', e && e.stack ? e.stack : e);
  process.exit(1);
});
