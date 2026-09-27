/**
 * Seeds the Developer page "model zoo" section (developer.model-zoo) with the
 * current hardcoded frontend content, uploading the three stat icons.
 *
 * Usage: node seed-developer-model-zoo.js <API_TOKEN>
 */

const fs = require("fs");
const path = require("path");

const STRAPI_URL = "http://localhost:1338";
const PUBLIC_DIR = path.join(__dirname, "../public/developer");

const token = process.argv[2];
if (!token) {
  console.error("Usage: node seed-developer-model-zoo.js <API_TOKEN>");
  process.exit(1);
}

const MIME = { ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".jpg": "image/jpeg" };

async function uploadImage(filename) {
  const filePath = path.join(PUBLIC_DIR, filename);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return null;
  }

  const ext = path.extname(filename).toLowerCase();
  const fileBuffer = fs.readFileSync(filePath);
  const blob = new Blob([fileBuffer], { type: MIME[ext] || "application/octet-stream" });

  const formData = new FormData();
  formData.append("files", blob, filename);

  const res = await fetch(`${STRAPI_URL}/api/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (!res.ok) {
    console.error(`Failed to upload ${filename}: ${res.statusText}`);
    console.error(await res.text());
    return null;
  }

  const data = await res.json();
  console.log(`Uploaded ${filename}, ID: ${data[0].id}`);
  return data[0].id;
}

async function seedModelZoo() {
  console.log("Seeding Developer Model Zoo...");

  const icon1 = await uploadImage("model-zoo-icon-1.svg");
  const icon2 = await uploadImage("model-zoo-icon-2.svg");
  const icon3 = await uploadImage("model-zoo-icon-3.svg");

  const modelZooData = {
    heading: "Start from a model that works.",
    subtitle:
      "Don’t start from a blank file. Begin with a pre-trained model from the Ambient Model Zoo and adapt it to your data.",
    stats: [
      {
        icon: icon1,
        text: "A growing library of open-source and Ambient-built models, all tuned for GPX.",
      },
      { icon: icon2, text: "One-click deploy to your dev or eval kit." },
      { icon: icon3, text: "Retrain or transfer-learn on your own data when you’re ready." },
    ],
    cta_label: "Browse the Model Zoo",
    cta_href: "/model-zoo",
  };

  const res = await fetch(`${STRAPI_URL}/api/developer-page`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ data: { model_zoo: modelZooData } }),
  });

  if (!res.ok) {
    console.error("Failed to update developer-page:", res.statusText);
    console.error(await res.text());
    process.exit(1);
  }
  // No explicit publish needed: PUT updates the published entry on this instance
  // (verified via public GET returning the new data).
  console.log("Developer page model zoo seeded!");
}

seedModelZoo().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
