import { getSingleType } from "./src/lib/strapi.ts";

async function run() {
  const data = await getSingleType<any>("som-page", [
    { section: "hero", fields: ["image"], nested: ["primary_button", "secondary_button"] },
  ]);
  console.log(JSON.stringify(data?.hero, null, 2));
}

run();
