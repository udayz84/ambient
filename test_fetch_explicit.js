async function run() {
  const qs = 'populate[intelligence][populate][cards][populate][image]=true';
  const url = `http://127.0.0.1:1338/api/som-page?${qs}`;
  try {
    const res = await fetch(url);
    const json = await res.json();
    console.log(JSON.stringify(json.data?.intelligence || json, null, 2));
  } catch (err) {
    console.error(err.message);
  }
}
run();
