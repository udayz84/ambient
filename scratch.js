const fetch = require('node-fetch');

async function test() {
  try {
    const res = await fetch('http://localhost:1337/api/news-listing-page?populate=deep');
    const json = await res.json();
    console.log(JSON.stringify(json.data.attributes.hero, null, 2));
  } catch (e) {
    console.error(e);
  }
}

test();
