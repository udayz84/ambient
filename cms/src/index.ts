import fs from 'fs';
import path from 'path';

function copyJSONSync(srcDir: string, destDir: string) {
  if (!fs.existsSync(srcDir)) return;
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyJSONSync(srcPath, destPath);
    } else if (entry.isFile() && entry.name.endsWith('.json')) {
      if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

export default {
  register() {
    try {
      const SRC = path.join(__dirname, '../../src');
      const DEST = path.join(__dirname, '../../dist/src');
      console.log("Auto-copying schemas to dist/ during register...");
      copyJSONSync(SRC, DEST);
    } catch (err) {
      console.error("Failed to copy schemas:", err);
    }
  },
  async bootstrap({ strapi }) {
    try {
      const homePage = await strapi.documents('api::home-page.home-page').findFirst({
        populate: {
          latest_news: { populate: { cards: { populate: ['image'] } } },
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

      // Seeding Products Page ModelForge Subfeatures
      try {
        const productsPage = await strapi.documents('api::products-page.products-page').findFirst({
          populate: { modelforge: { populate: '*' } }
        });

        if (productsPage && productsPage.modelforge) {
          const subfeatures = productsPage.modelforge.subfeatures || [];
          if (subfeatures.length === 0) {
            console.log('Seeding ModelForge subfeatures...');
            await strapi.documents('api::products-page.products-page').update({
              documentId: productsPage.documentId,
              data: {
                modelforge: {
                  ...productsPage.modelforge,
                  subfeatures: [
                    { text: "Speaks matrix math natively — none of the translation tax Arm/RISC-V pay" },
                    { text: "Pre-integrated RTOS, drivers, DSP libraries" },
                    { text: "Simulator + profiler — validate power and accuracy before the board arrives" }
                  ]
                }
              }
            });
            console.log('Successfully seeded ModelForge subfeatures!');
          }
        }
      } catch (err) {
        console.error('Error seeding ModelForge subfeatures:', err);
      }

      // Seeding Products Page Full Picture Callouts
      try {
        const productsPage = await strapi.documents('api::products-page.products-page').findFirst({
          populate: { full_picture: { populate: '*' } }
        });

        if (productsPage && productsPage.full_picture) {
          const callouts = productsPage.full_picture.callouts || [];
          if (callouts.length === 0) {
            console.log('Seeding Full Picture callouts...');
            const defaultCallouts = [
              { label: "Control", items: "ARM Cortex-M4F (32-bit, FPU)" },
              { label: "Sensing & Analog", items: "16-bit ADC, 8 simultaneous analog inputs\n16-bit audio ADC\nSensor-fusion DMA up to 10 streams\nBattery-low detection" },
              { label: "Power", items: "Core 1.2 V (0.9–1.3 V)\nAnalog/IO 3.3 V\n~80 µW always-on\nTwo power domains" },
              { label: "Peripherals", items: "OSPI (XIP)\nI²S Master\nSPI\nI²C\nUART\nGPIO\nGPIO" },
              { label: "Temperature", items: "0–85 °C (junction)" },
              { label: "Memory", items: "120 KB L0 cache\n2048 KB unified L1 SRAM\nVideo + multi-bank sensor buffers\nBoot ROM\nExternal SRAM/Flash via QSPI/SPI" },
              { label: "Package", items: "ARM Cortex-M4F (32-bit, FPU)\nCSP 3.2×3.2 mm (on demand)" },
              { label: "Security", items: "AES-128" }
            ];
            await strapi.documents('api::products-page.products-page').update({
              documentId: productsPage.documentId,
              data: {
                full_picture: {
                  ...productsPage.full_picture,
                  callouts: defaultCallouts
                }
              }
            });
            console.log('Successfully seeded Full Picture callouts!');
          }
        }
      } catch (err) {
        console.error('Error seeding Full Picture callouts:', err);
      }

      // Seeding Applications Page Articles
      try {
        const appsPage = await strapi.documents('api::applications-page.applications-page').findFirst({
          populate: { articles: { populate: ['articles'] } }
        });

        const fallbackArticles = [
          { title: "Wearables", body: "Always-on biometric tracking and complex activity recognition running continuously on standard wearable batteries.", cta_label: "Learn More", cta_href: "#" },
          { title: "Hearables", body: "Always-on wake-word detection and real-time audio enhancement running continuously on microscopic power budgets.", cta_label: "Learn More", cta_href: "#" },
          { title: "Smart Home", body: "True on-device voice processing and presence detection without sacrificing consumer privacy to the cloud.", cta_label: "Learn More", cta_href: "#" },
          { title: "Industry 4.0", body: "High-frequency predictive maintenance and visual defect detection directly on the factory floor.", cta_label: "Learn More", cta_href: "#" },
          { title: "Medical Devices", body: "Clinical-grade monitoring and real-time anomaly detection deployed in miniaturized form factors.", cta_label: "Learn More", cta_href: "#" },
          { title: "Agriculture & Livestock", body: "Complex visual monitoring and behavioral tracking deployed in remote environments where cloud connectivity is impossible.", cta_label: "Learn More", cta_href: "#" },
          { title: "Drones", body: "High-speed object detection and autonomous navigation processed natively without sacrificing critical flight time.", cta_label: "Learn More", cta_href: "#" },
          { title: "Robotics", body: "Instantaneous multi-sensor fusion and complex kinematic control operating completely untethered from the cloud.", cta_label: "Learn More", cta_href: "#" },
          { title: "Automotive", body: "Ultra-low latency sensor fusion and continuous in-cabin monitoring executing natively for next-generation safety.", cta_label: "Learn More", cta_href: "#" }
        ];

        if (!appsPage) {
          console.log('Seeding initial Applications Page with articles...');
          await strapi.documents('api::applications-page.applications-page').create({
            data: {
              articles: {
                heading: "Intelligence without boundaries.",
                articles: fallbackArticles
              }
            }
          });
          console.log('Successfully created and seeded Applications Page!');
        } else {
          let hasArticles = appsPage.articles?.articles?.length > 0;
          
          if (!hasArticles) {
            console.log('Seeding Applications Page articles...');
            await strapi.documents('api::applications-page.applications-page').update({
              documentId: appsPage.documentId,
              data: {
                articles: {
                  ...appsPage.articles,
                  heading: appsPage.articles?.heading || "Intelligence without boundaries.",
                  articles: fallbackArticles
                }
              }
            });
            console.log('Successfully seeded Applications Page articles!');
          }
        }
      } catch (err) {
        console.error('Error seeding Applications Page articles:', err);
      }

      // -------------------------------------------------------------------------
      // Next.js revalidation webhook (auto-registers on every Strapi startup).
      // Triggered when an editor publishes/unpublishes any entry. Receiver is
      // the Next.js route handler at /api/revalidate.
      //
      // Requires in cms/.env:
      //   NEXT_SITE_URL       — origin of the Next.js app (http://localhost:3000
      //                         in dev, https://your-domain.com in prod)
      //   REVALIDATE_SECRET   — shared secret, MUST match Next.js's .env
      //
      // Skipped silently if either env var is missing. Safe to leave unset
      // while the site is in early dev.
      // -------------------------------------------------------------------------
      try {
        const siteUrl = process.env.NEXT_SITE_URL;
        const secret = process.env.REVALIDATE_SECRET;
        if (siteUrl && secret) {
          const webhookUrl = `${siteUrl.replace(/\/$/, "")}/api/revalidate`;
          const events = ['entry.publish', 'entry.unpublish'];
          const headers: Record<string, string> = { 'x-revalidate-secret': secret };

          // Strapi v5 internal API. Cast because `webhookStore` is not in the
          // public TypeScript types but is stable across v5 releases.
          const store = (strapi as any).get('webhookStore');
          const existing: Array<{ id: string | number; url: string }> = await store.findWebhooks();
          const match = existing.find((w) => w.url === webhookUrl);

          if (!match) {
            const created = await store.createWebhook({
              name: 'Next.js revalidation',
              url: webhookUrl,
              events,
              headers,
              isEnabled: true,
            });
            console.log(`[webhook] registered ${webhookUrl} for events: ${events.join(', ')} (id=${created.id})`);
          } else {
            // Re-sync events + secret in case the env var changed.
            await store.updateWebhook(match.id, { ...match, events, headers, isEnabled: true });
            console.log(`[webhook] already registered (id=${match.id}) — events + headers re-synced.`);
          }
        } else {
          console.log('[webhook] NEXT_SITE_URL or REVALIDATE_SECRET not set in cms/.env — skipping auto-registration.');
        }
      } catch (err) {
        console.error('[webhook] registration failed:', err);
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

      // Grant Public read permissions to popup
      try {
        const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
          where: { type: 'public' },
        });

        if (publicRole) {
          const permissionExists = await strapi.db.query('plugin::users-permissions.permission').findOne({
            where: {
              role: publicRole.id,
              action: 'api::popup.popup.find',
            }
          });

          if (!permissionExists) {
            console.log('Granting Public access to api::popup.popup.find');
            await strapi.db.query('plugin::users-permissions.permission').create({
              data: {
                action: 'api::popup.popup.find',
                role: publicRole.id,
              }
            });
          }
        }
      } catch (err) {
        console.error('Error setting popup permissions:', err);
      }

      // Seeding Mail Setting single type (recipient emails for form notifications)
      try {
        const mailSetting = await strapi
          .documents('api::mail-setting.mail-setting')
          .findFirst();

        if (!mailSetting) {
          await strapi.documents('api::mail-setting.mail-setting').create({
            data: {
              recipients: '',
              ccRecipients: '',
              enabled: true,
            },
          });
          console.log('Created default Mail Setting entry — set recipients in Strapi admin.');
        }
      } catch (err) {
        console.error('Error seeding mail setting:', err);
      }

    } catch (e) {
      console.error('Seed error:', e);
    }
  },
};
