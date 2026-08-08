async function run() {
  const qs = 'populate[inside_module][populate][image]=true&populate[inside_module][populate][specs][populate]=*';
  const url = `http://localhost:1338/api/som-page?${qs}`;
  console.log("Fetching:", url);
  try {
    const res = await fetch(url);
    const json = await res.json();
    console.log(JSON.stringify(json.data.inside_module, null, 2));
  } catch (err) {
    console.error(err);
  }
}
run();




