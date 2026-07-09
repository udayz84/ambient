const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const STRAPI_URL = 'http://localhost:1338';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || '';

const headers = {
  ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {})
};

async function uploadFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return null;
  }
  const form = new FormData();
  form.append('files', fs.createReadStream(filePath));

  try {
    const res = await fetch(`${STRAPI_URL}/api/upload`, {
      method: 'POST',
      headers,
      body: form
    });
    const json = await res.json();
    return json[0]?.id;
  } catch (err) {
    console.error(`Upload failed for ${filePath}:`, err.message);
    return null;
  }
}

async function seed() {
  console.log('Uploading Hero Images...');
  
  // Replace these paths with the actual local paths to the correct images
  const desktopImgPath = path.join(__dirname, '../public/resources/image-107.png');
  const mobileImgPath = path.join(__dirname, '../public/mobile/resources/image 102.png');
  
  let desktopImgId = await uploadFile(desktopImgPath);
  let mobileImgId = await uploadFile(mobileImgPath);
  
  console.log('Seeding Resources Hero Section...');
  try {
    const res = await fetch(`${STRAPI_URL}/api/resources-page`, {
      method: 'PUT',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: {
          hero: {
            title: 'Explore whitepapers,\narchitectural deep-dives,\nand performance data',
            background_image: desktopImgId,
            mobile_background_image: mobileImgId
          }
        }
      })
    });
    const json = await res.json();
    console.log('Resources Hero Updated');
  } catch (err) {
    console.error('Failed to update Resources Hero:', err.message);
  }

  console.log('Seeding Resource Articles...');
  const categories = ['Blog', 'Case Study', 'Video', 'Whitepaper', 'Webinar'];
  
  for (const cat of categories) {
    const article = {
      title: `Sample ${cat} Article`,
      slug: `sample-${cat.toLowerCase().replace(' ', '-')}`,
      category: cat.toLowerCase().replace(' ', '_'),
      description: 'This is a sample description for the article.',
      // add other required fields based on your schema
    };

    try {
      const res = await fetch(`${STRAPI_URL}/api/articles`, {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: article })
      });
      const json = await res.json();
      if (json.data) {
        console.log(`Created article: ${article.title}`);
      }
    } catch (err) {
      console.error(`Failed to create article ${article.title}:`, err.message);
    }
  }
  
  console.log('Done!');
}

seed();
