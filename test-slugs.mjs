import fs from 'fs';
import path from 'path';

// Read .env to get the token if needed
const env = fs.readFileSync('.env', 'utf-8');
const tokenMatch = env.match(/STRAPI_TOKEN=(.*)/);
const token = tokenMatch ? tokenMatch[1] : '';

async function run() {
  const res = await fetch('http://localhost:1338/api/articles', {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  const data = await res.json();
  console.log(JSON.stringify(data.data.map(a => ({ title: a.title, slug: a.slug, external_url: a.external_url })), null, 2));
}
run();
