const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const FormDataClass = require('form-data');

const STRAPI_URL = 'http://localhost:1338';
const STRAPI_TOKEN = 'd2523cd0afdb925041266a1a5076f2b22abc4d1a6b7d709265362d32b95afbb6f612ff337073c90977b7345c822890b249d9eeb0d493a44a778e1a9775e2f45427320361b7f6769e6337ac20da91c9bb647f6b870bd00cbee5ae9bbb7da5283a83e22c66a217bced6cdb19c63b341bab4127e52d774b797a73cf16c6579dec7d';

const headers = {
  Authorization: `Bearer ${STRAPI_TOKEN}`
};

async function uploadImage(filePath) {
  // using 'form-data' package
  const form = new FormDataClass();
  form.append('files', fs.createReadStream(filePath));
  
  const formHeaders = form.getHeaders ? form.getHeaders() : {};
  const res = await fetch(`${STRAPI_URL}/api/upload`, {
    method: 'POST',
    body: form,
    headers: { ...headers, ...formHeaders }
  });
  
  const json = await res.json();
  if (json && json.length > 0) return json[0].id;
  throw new Error(`Upload failed for ${filePath}: ${JSON.stringify(json)}`);
}

async function seed() {
  console.log('Fetching home-page data...');
  const res = await fetch(`${STRAPI_URL}/api/home-page?populate[ecosystem][populate][silicon_partners][populate]=*&populate[ecosystem][populate][development_partners][populate]=*`);
  const json = await res.json();
  
  if (!json.data) {
    console.error('Failed to fetch home page', json);
    return;
  }
  
  const ecosystem = json.data.ecosystem;
  if (!ecosystem) {
    console.log('No ecosystem data found.');
    return;
  }

  const siliconPartners = ecosystem.silicon_partners || [];
  const devPartners = ecosystem.development_partners || [];
  
  let needsUpdate = false;
  
  // Upload placeholders for missing logos
  for (let i = 0; i < siliconPartners.length; i++) {
    const p = siliconPartners[i];
    if (!p.logo) {
      console.log(`Uploading placeholder for Silicon Partner: ${p.name || 'Unnamed'}`);
      const fallbackPath = path.join(__dirname, '../public/ecosystem/logo-partner-1.svg');
      try {
        const id = await uploadImage(fallbackPath);
        p.logo = id;
        needsUpdate = true;
      } catch (err) {
        console.error(err.message);
      }
    } else {
      p.logo = p.logo.id;
    }
  }

  for (let i = 0; i < devPartners.length; i++) {
    const p = devPartners[i];
    if (!p.logo) {
      console.log(`Uploading placeholder for Development Partner: ${p.name || 'Unnamed'}`);
      const fallbackPath = path.join(__dirname, '../public/ecosystem/logo-octane.svg');
      try {
        const id = await uploadImage(fallbackPath);
        p.logo = id;
        needsUpdate = true;
      } catch (err) {
        console.error(err.message);
      }
    } else {
      p.logo = p.logo.id;
    }
  }

  if (needsUpdate) {
    console.log('Updating home-page...');
    
    const payload = {
      data: {
        ecosystem: {
          silicon_partners: siliconPartners.map(p => ({
            id: p.id,
            name: p.name,
            logo: p.logo
          })),
          development_partners: devPartners.map(p => ({
            id: p.id,
            name: p.name,
            logo: p.logo
          }))
        }
      }
    };

    const updateRes = await fetch(`${STRAPI_URL}/api/home-page`, {
      method: 'PUT',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    const updateJson = await updateRes.json();
    if (updateJson.data) {
      console.log('Successfully updated partners!');
    } else {
      console.error('Failed to update home page:', updateJson);
    }
  } else {
    console.log('No missing logos found.');
  }
}

seed();
