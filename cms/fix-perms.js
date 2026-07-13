const { createStrapi } = require('@strapi/strapi');

async function main() {
  const app = await createStrapi({}).load();
  
  const publicRole = await app.db.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' }
  });

  if (!publicRole) {
    console.error('Public role not found');
    process.exit(1);
  }

  const actions = [
    'api::job-category.job-category.find',
    'api::job-category.job-category.findOne',
    'api::job-location.job-location.find',
    'api::job-location.job-location.findOne'
  ];

  for (const action of actions) {
    const perm = await app.db.query('plugin::users-permissions.permission').findOne({
      where: { action, role: publicRole.id }
    });
    
    if (!perm) {
      await app.db.query('plugin::users-permissions.permission').create({
        data: { action, role: publicRole.id }
      });
      console.log(`Granted ${action} to Public`);
    } else {
      console.log(`Public already has ${action}`);
    }
  }

  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
