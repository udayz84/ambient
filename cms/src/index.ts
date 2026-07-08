export default {
  register() {},
  async bootstrap({ strapi }) {
    try {
      const homePage = await strapi.documents('api::home-page.home-page').findFirst({
        populate: {
          latest_news: { populate: ['cards'] },
          platform_scale: { populate: { products: { populate: ['chip_image'] } } }
        }
      });

      if (homePage && homePage.latest_news) {
        const cards = homePage.latest_news.cards || [];
        const file = await strapi.db.query('plugin::upload.file').findOne();
        
        if (cards.length === 0) {
          console.log('Seeding 3 article cards for latest_news...');
          await strapi.documents('api::home-page.home-page').update({
            documentId: homePage.documentId,
            data: {
              latest_news: {
                ...homePage.latest_news,
                cards: [
                  { title: "First News Article", body: "This is a seeded article description.", cta_label: "Read More", image: file?.id },
                  { title: "Second News Article", body: "This is a seeded article description.", cta_label: "Read More", image: file?.id },
                  { title: "Third News Article", body: "This is a seeded article description.", cta_label: "Read More", image: file?.id },
                ]
              }
            }
          });
          console.log('Seeded latest_news successfully!');
        } else if (cards.some((c: any) => !c.image) && file) {
          console.log('Adding missing images to existing latest_news cards...');
          await strapi.documents('api::home-page.home-page').update({
            documentId: homePage.documentId,
            data: {
              latest_news: {
                ...homePage.latest_news,
                cards: cards.map((c: any) => ({ ...c, image: c.image || file.id }))
              }
            }
          });
          console.log('Seeded missing images in latest_news successfully!');
        }
      }

      if (homePage && homePage.platform_scale) {
        const products = homePage.platform_scale.products || [];
        const needsImage = products.some(p => !p.chip_image);
        if (needsImage) {
          const file = await strapi.db.query('plugin::upload.file').findOne();
          if (file) {
            console.log('Seeding identical images for platform_scale products...');
            await strapi.documents('api::home-page.home-page').update({
              documentId: homePage.documentId,
              data: {
                platform_scale: {
                  ...homePage.platform_scale,
                  products: products.map(p => ({
                    ...p,
                    chip_image: p.chip_image || file.id
                  }))
                }
              }
            });
            console.log('Seeded platform_scale successfully!');
          } else {
            console.log('No uploaded files found in media library to use as placeholder image.');
          }
        }
      }
    } catch (e) {
      console.error('Seed error:', e);
    }
  },
};
