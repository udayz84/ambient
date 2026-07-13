export default {
  register() {},
  async bootstrap({ strapi }) {
    try {
      const homePage = await strapi.documents('api::home-page.home-page').findFirst({
        populate: {
          latest_news: { populate: ['cards'] },
          platform_scale: { populate: { products: { populate: ['chip_image'] } } },
          ecosystem: { populate: ['silicon_partners', 'development_partners'] }
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

      if (homePage && homePage.ecosystem) {
        let updated = false;
        let siliconPartners = homePage.ecosystem.silicon_partners || [];
        let devPartners = homePage.ecosystem.development_partners || [];

        if (siliconPartners.length < 5) {
          while (siliconPartners.length < 5) {
            siliconPartners.push({ name: `Partner ${siliconPartners.length + 1}` });
          }
          updated = true;
        }

        if (devPartners.length < 5) {
          while (devPartners.length < 5) {
            devPartners.push({ name: `Dev Partner ${devPartners.length + 1}` });
          }
          updated = true;
        }

        if (updated) {
          console.log('Seeding missing ecosystem partners...');
          await strapi.documents('api::home-page.home-page').update({
            documentId: homePage.documentId,
            data: {
              ecosystem: {
                ...homePage.ecosystem,
                silicon_partners: siliconPartners,
                development_partners: devPartners
              }
            }
          });
          console.log('Successfully seeded ecosystem partners!');
        }
      }
      // Seeding Open Roles in Careers Page is no longer needed since Jobs are a Collection Type.

      // Seeding Contact Form Fields
      try {
        const contactPage = await strapi.documents('api::contact-page.contact-page').findFirst({
          populate: { form: { populate: ['tracks.form'] } }
        });

        if (contactPage && contactPage.form && contactPage.form.tracks) {
          let updated = false;
          const defaultFields = [
            { label: "First Name", placeholder: "Enter Your First Name", type: "text" },
            { label: "Last Name", placeholder: "Enter Your Last Name", type: "text" },
            { label: "Company Name", placeholder: "Enter Your Company Name", type: "text" },
            { label: "Job Title", placeholder: "Enter Your Job Title", type: "text" },
            { label: "Corporate Email", placeholder: "Enter Your Corporate Email", type: "email" },
            { label: "Phone Number", placeholder: "Enter Your Phone Number", type: "tel" },
          ];

          const tracks = contactPage.form.tracks.map((track: any) => {
            if (!track.form || track.form.length === 0) {
              updated = true;
              return { ...track, form: defaultFields };
            }
            return track;
          });

          if (updated) {
            console.log('Seeding form fields for Contact page tracks...');
            await strapi.documents('api::contact-page.contact-page').update({
              documentId: contactPage.documentId,
              data: {
                form: {
                  ...contactPage.form,
                  tracks
                }
              }
            });
            console.log('Successfully seeded form fields!');
          }
        }
      } catch (err) {
        console.error('Error seeding contact form fields:', err);
      }
    } catch (e) {
      console.error('Seed error:', e);
    }
  },
};
