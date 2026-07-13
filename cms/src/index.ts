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

      // Seeding Navbar
      try {
        const navbarCount = await strapi.documents('api::navbar.navbar').count();
        if (navbarCount === 0) {
          console.log('Seeding initial Navbar settings...');
          const logoFile = await strapi.db.query('plugin::upload.file').findOne({ where: { name: 'logo.png' } });
          await strapi.documents('api::navbar.navbar').create({
            data: {
              brand: {
                site_name: 'Ambient Scientific',
                logo: logoFile?.id ?? null,
                logo_mobile: logoFile?.id ?? null,
                favicon: logoFile?.id ?? null,
              },
              header: {
                nav_items: [
                  { label: 'Products', href: '/products', has_dropdown: true },
                  { label: 'Technology', href: '/technology', has_dropdown: true },
                  { label: 'Applications', href: '/applications', has_dropdown: true },
                  { label: 'Company', href: '/company', has_dropdown: true },
                  { label: 'News & Resources', href: '/news-listing', has_dropdown: true },
                  { label: 'Blog', href: '/resources', has_dropdown: true },
                  { label: 'Career', href: '/careers', has_dropdown: false },
                ],
                cta_label: 'GET IN TOUCH',
                cta_href: '/contact',
              },
            },
          });
          console.log('Successfully seeded Navbar!');
        }
      } catch (err) {
        console.error('Error seeding Navbar:', err);
      }

      // Seeding Footer
      try {
        const footerCount = await strapi.documents('api::footer.footer').count();
        if (footerCount === 0) {
          console.log('Seeding initial Footer settings...');
          const findMedia = async (name: string) =>
            (await strapi.db.query('plugin::upload.file').findOne({ where: { name } }))?.id ?? null;
          const socialLinks = [
            { platform: 'linkedin', href: '#', icon: await findMedia('social-linkedin.svg') },
            { platform: 'x', href: '#', icon: await findMedia('social-x.svg') },
            { platform: 'youtube', href: '#', icon: await findMedia('social-youtube.svg') },
          ].filter((s) => s.icon);

          await strapi.documents('api::footer.footer').create({
            data: {
              footer: {
                nav_sections: [
                  {
                    title: 'PRODUCTS',
                    links: [
                      { label: 'GPX10', href: '#' },
                      { label: 'GPX64', href: '#' },
                      { label: 'Development Kits', href: '#' },
                      { label: 'ModelForge', href: '#' },
                    ],
                  },
                  {
                    title: 'SOLUTIONS',
                    links: [
                      { label: 'Medical & Wearables', href: '#' },
                      { label: 'Smart Home', href: '#' },
                      { label: 'Industrial IoT', href: '#' },
                      { label: 'Robotics', href: '#' },
                    ],
                  },
                  {
                    title: 'Resources',
                    links: [
                      { label: 'Documentation', href: '#' },
                      { label: 'Case Studies', href: '#' },
                      { label: 'Technical Papers', href: '#' },
                      { label: 'Blog', href: '#' },
                    ],
                  },
                  {
                    title: 'Company',
                    links: [
                      { label: 'About', href: '#' },
                      { label: 'Careers', href: '#' },
                      { label: 'Industrial IoT', href: '#' },
                      { label: 'Contact', href: '#' },
                    ],
                  },
                ],
                social_links: socialLinks,
                legal_links: [
                  { label: 'Privacy Policy', href: '#' },
                  { label: 'Terms of Service', href: '#' },
                  { label: 'Cookie Policy', href: '#' },
                ],
                copyright_text: '© 2026 Ambient AI. All rights reserved.',
              },
              newsletter: {
                heading: 'Want to stay in the forefront of AI tech.',
                subtitle: 'Sign up to receive regular updates.',
                input_placeholder: 'Your Email ID',
                button_label: 'SUBSCRIBE',
              },
              contact_details: {
                email: 'contact@ambientscientific.com',
              },
              default_seo: {
                meta_title: 'Ambient Scientific',
                meta_description: 'Ambient Scientific default SEO configuration',
              },
            },
          });
          console.log('Successfully seeded Footer!');
        }
      } catch (err) {
        console.error('Error seeding Footer:', err);
      }
    } catch (e) {
      console.error('Seed error:', e);
    }
  },
};
