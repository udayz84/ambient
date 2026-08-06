const STRAPI_URL = "http://localhost:1338";
const TOKEN = "378598fa927c315629295c00876d9c2ca88ba55732f6d3439390fb441ec06fea634b037615bd871ab76a8bac1bcc91736b643c107900855dcdb0e3ed890c182bd562f6bc514a252767d821252f05ee3cd333649df6f888f792fc270e6a451c84c50360bdfbffb6f2d55ed3bb5a6bfa76453689814ad8bf1f630f8ac8464f4bab";

async function run() {
  const headers = {
    "Authorization": `Bearer ${TOKEN}`,
    "Content-Type": "application/json"
  };

  const getRes = await fetch(`${STRAPI_URL}/api/products-page?populate[full_picture][populate]=callouts`, { headers });
  if (!getRes.ok) {
    console.error("GET error", await getRes.text());
    return;
  }
  const getData = await getRes.json();
  const page = getData.data;
  
  if (!page || !page.full_picture) {
    console.error("No full_picture found");
    return;
  }

  const callouts = [
    { label: "Control", items: "ARM Cortex-M4F (32-bit, FPU)" },
    { label: "Sensing & Analog", items: "16-bit ADC, 8 simultaneous analog inputs\n16-bit audio ADC\nSensor-fusion DMA up to 10 streams\nBattery-low detection" },
    { label: "Temperature", items: "0–85 °C (junction)" },
    { label: "Package", items: "ARM Cortex-M4F (32-bit, FPU)\nCSP 3.2×3.2 mm (on demand)" },
    { label: "Security", items: "AES-128" },
    { label: "Peripherals", items: "OSPI (XIP)\nI²S Master\nSPI\nI²C\nUART\nGPIO" },
    { label: "Memory", items: "120 KB L0 cache\n2048 KB unified L1 SRAM\nVideo + multi-bank sensor buffers\nBoot ROM\nExternal SRAM/Flash via QSPI/SPI" },
    { label: "Power", items: "Core 1.2 V (0.9–1.3 V)\nAnalog/IO 3.3 V\n~80 µW always-on\nTwo power domains" }
  ];

  const full_picture = {
    ...page.full_picture,
    callouts
  };

  const putRes = await fetch(`${STRAPI_URL}/api/products-page`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: { full_picture } })
  });
  
  if (!putRes.ok) {
    console.error("PUT error", await putRes.text());
    return;
  }
  
  console.log("Successfully updated Strapi content via REST!");
}

run();
