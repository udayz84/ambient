'use strict';

const strapi = require('@strapi/strapi');

async function replaceTextInStrapi() {
  // Initialize Strapi application
  const app = await strapi().load();
  console.log('✅ Strapi application loaded successfully.');

  const targetString = 'Development Kit';
  const replacementString = 'Evaluation Kit';
  const targetLower = 'evaluation kit';
  const replacementLower = 'evaluation kit';

  const replaceDeep = (obj) => {
    if (typeof obj === 'string') {
      return obj
        .replace(new RegExp(targetString, 'g'), replacementString)
        .replace(new RegExp(targetLower, 'g'), replacementLower);
    }
    if (Array.isArray(obj)) {
      return obj.map(replaceDeep);
    }
    if (obj !== null && typeof obj === 'object') {
      const out = {};
      for (const [k, v] of Object.entries(obj)) {
        if (k === 'id' || k === 'documentId') {
          out[k] = v;
        } else {
          out[k] = replaceDeep(v);
        }
      }
      return out;
    }
    return obj;
  };

  try {
    // 1. Update DVK Page
    console.log('Fetching DVK Page...');
    const dvkPage = await app.documents('api::dvk-page.dvk-page').findFirst({
      populate: '*',
    });
    
    if (dvkPage) {
      const updatedDvkPage = replaceDeep(dvkPage);
      await app.documents('api::dvk-page.dvk-page').update({
        documentId: dvkPage.documentId,
        data: updatedDvkPage,
      });
      console.log('✅ Updated DVK Page successfully.');
    }

    // 2. Update Developer Platform Page
    console.log('Fetching Developer Platform...');
    const devPlatform = await app.documents('api::developer-page.developer-page').findFirst({
      populate: '*',
    });

    if (devPlatform) {
      const updatedDevPlatform = replaceDeep(devPlatform);
      await app.documents('api::developer-page.developer-page').update({
        documentId: devPlatform.documentId,
        data: updatedDevPlatform,
      });
      console.log('✅ Updated Developer Platform successfully.');
    }

    // 3. Update Global Settings (Navbar, Footer, SEO)
    console.log('Fetching Global Settings...');
    const globalSettings = await app.documents('api::global-settings.global-settings').findFirst({
      populate: '*',
    });

    if (globalSettings) {
      const updatedSettings = replaceDeep(globalSettings);
      await app.documents('api::global-settings.global-settings').update({
        documentId: globalSettings.documentId,
        data: updatedSettings,
      });
      console.log('✅ Updated Global Settings successfully.');
    }

    console.log('🎉 All Strapi replacements complete!');
  } catch (error) {
    console.error('❌ Error replacing text in Strapi:', error);
  }

  process.exit(0);
}

replaceTextInStrapi();
