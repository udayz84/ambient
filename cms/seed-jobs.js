const fetch = require('node-fetch');

// Adjust if you use a different port or URL
const STRAPI_URL = 'http://localhost:1338';
// If you have a token, add it here. If public create is enabled, leave empty.
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || '';

const headers = {
  'Content-Type': 'application/json',
  ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {})
};

async function seed() {
  console.log('Seeding job categories...');
  const categories = ['Software', 'Hardware', 'Research'];
  const categoryIds = {};

  for (const name of categories) {
    try {
      const res = await fetch(`${STRAPI_URL}/api/job-categories`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ data: { name } })
      });
      const json = await res.json();
      if (json.data) {
        categoryIds[name] = json.data.id;
        console.log(`Created category ${name} (ID: ${json.data.id})`);
      } else {
        console.error(`Failed to create category ${name}:`, json);
      }
    } catch (err) {
      console.error(`Error creating category ${name}:`, err.message);
    }
  }

  console.log('Seeding jobs...');
  const jobs = [
    {
      title: 'Senior Software Engineer',
      slug: 'senior-software-engineer',
      category: categoryIds['Software'],
      location: 'san_francisco',
      employment_type: 'full_time',
      description: 'We are looking for a Senior Software Engineer...',
      apply_url: 'https://ambient.ai/careers',
      is_active: true,
      posted_date: '2026-07-01'
    },
    {
      title: 'Hardware Architect',
      slug: 'hardware-architect',
      category: categoryIds['Hardware'],
      location: 'remote',
      employment_type: 'full_time',
      description: 'Join our hardware team to build...',
      apply_url: 'https://ambient.ai/careers',
      is_active: true,
      posted_date: '2026-07-02'
    },
    {
      title: 'AI Research Scientist',
      slug: 'ai-research-scientist',
      category: categoryIds['Research'],
      location: 'san_francisco',
      employment_type: 'full_time',
      description: 'Researching the next generation of AI...',
      apply_url: 'https://ambient.ai/careers',
      is_active: true,
      posted_date: '2026-07-05'
    }
  ];

  for (const job of jobs) {
    if (!job.category) {
      console.log(`Skipping job ${job.title} because category was not created.`);
      continue;
    }
    
    try {
      const res = await fetch(`${STRAPI_URL}/api/jobs`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ data: job })
      });
      const json = await res.json();
      if (json.data) {
        console.log(`Created job ${job.title} (ID: ${json.data.id})`);
      } else {
        console.error(`Failed to create job ${job.title}:`, json);
      }
    } catch (err) {
      console.error(`Error creating job ${job.title}:`, err.message);
    }
  }
  
  console.log('Done!');
}

seed();
