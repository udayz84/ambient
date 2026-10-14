/**
 * seed-products-fullpicture.js
 * ----------------------------------------------------------------------------
 * Updates the products-page `full_picture` section callouts.
 */

const { createStrapi } = require("@strapi/strapi");

async function run() {
  const strapi = createStrapi();
  await strapi.load();

  console.log("Fetching existing products-page data...");
  const page = await strapi.entityService.findMany("api::products-page.products-page", {
    populate: { full_picture: { populate: ["callouts"] } },
  });

  if (!page) {
    console.error("Products page not found.");
    process.exit(1);
  }

  console.log("Updating full_picture callouts...");
  
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

  await strapi.entityService.update("api::products-page.products-page", page.id, {
    data: {
      full_picture: {
        ...page.full_picture,
        callouts,
      }
    },
  });

  console.log("Successfully updated full_picture callouts!");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
