async function run() {
  const qs = 'populate[intelligence][populate][cards][populate]=*';
  const url = `http://localhost:1338/api/som-page?${qs}`;
  console.log("Fetching:", url);
  try {
    const res = await fetch(url);
    const json = await res.json();
    console.log(JSON.stringify(json.data.intelligence, null, 2));
  } catch (err) {
    console.error(err);
  }
}
run();
