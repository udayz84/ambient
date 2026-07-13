import strapi from '@strapi/strapi';

const app = await strapi().load();

async function run() {
  const homePage = await app.db.query('api::home-page.home-page').findOne({
    populate: { ecosystem: { populate: ['silicon_partners', 'development_partners'] } }
  });

  const ecosystem = homePage.ecosystem || {};

  const siliconPartners = ecosystem.silicon_partners || [];
  while (siliconPartners.length < 5) {
    siliconPartners.push({ name: `Silicon Partner ${siliconPartners.length + 1}` });
  }

  const devPartners = ecosystem.development_partners || [];
  while (devPartners.length < 5) {
    devPartners.push({ name: `Dev Partner ${devPartners.length + 1}` });
  }

  await app.db.query('api::home-page.home-page').update({
    where: { id: homePage.id },
    data: {
      ecosystem: {
        ...ecosystem,
        silicon_partners: siliconPartners.slice(0, 5),
        development_partners: devPartners.slice(0, 5)
      }
    }
  });

  console.log("Updated partners!");
}

run()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
