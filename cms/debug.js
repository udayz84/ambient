const strapi = require('@strapi/strapi');
strapi().start().catch(err => {
  console.error("Strapi failed to start:", err);
});
