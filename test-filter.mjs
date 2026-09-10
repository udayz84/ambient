import fs from 'fs';
import path from 'path';

const env = fs.readFileSync('.env', 'utf-8');
const tokenMatch = env.match(/STRAPI_TOKEN=(.*)/);
const token = tokenMatch ? tokenMatch[1] : '';

async function run() {
  const url = 'http://localhost:1338/api/articles?filters[slug][$eq]=gp-singh-interviewed-by-semiwiki-founder-daniel-nenni&populate=*';
  console.log('Fetching', url);
  const res = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  const data = await res.json();
  console.log(data);
}
run();
