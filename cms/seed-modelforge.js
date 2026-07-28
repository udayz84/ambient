const fs = require("fs");
const path = require("path");

const STRAPI_URL = "http://localhost:1338";
const PUBLIC_DIR = path.join(__dirname, "../public/dvk");

const token = process.argv[2];
if (!token) {
  console.error("Usage: node seed-modelforge.js <API_TOKEN>");
  process.exit(1);
}

async function uploadImage(filename) {
  const filePath = path.join(PUBLIC_DIR, filename);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return null;
  }

  const fileBuffer = fs.readFileSync(filePath);
  const blob = new Blob([fileBuffer], { type: "image/" + path.extname(filename).slice(1) });
  
  const formData = new FormData();
  formData.append("files", blob, filename);

  try {
    const res = await fetch(`${STRAPI_URL}/api/upload`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: formData,
    });
    
    if (!res.ok) {
      console.error(`Failed to upload ${filename}: ${res.statusText}`);
      const text = await res.text();
      console.error(text);
      return null;
    }

    const data = await res.json();
    console.log(`Successfully uploaded ${filename}, ID: ${data[0].id}`);
    return data[0].id;
  } catch (err) {
    console.error(`Error uploading ${filename}:`, err);
    return null;
  }
}

async function seedModelForge() {
  console.log("Starting ModelForge Seed...");

  const centerImageId = await uploadImage("modelforge-center.webp");
  const yourModelImageId = await uploadImage("modelforge-your-model.webp");
  const dvkBoardImageId = await uploadImage("board-blueprint.webp");

  const modelforgeData = {
    heading: "Powered by ModelForge.",
    subtitle: "Don't let software be the bottleneck. The Cranium DVK is fully supported by our unified software toolchain, designed to take you from a standard TensorFlow model to on-silicon inference in under 15 minutes.",
    center_image: centerImageId,
    your_model_title: "Your Model",
    your_model_description: "Automated TFLite conversion & quantization",
    your_model_image: yourModelImageId,
    dvk_board_title: "Cranium DVK",
    dvk_board_description: "15 minutes to on-silicon execution",
    dvk_board_image: dvkBoardImageId,
    toolchain_title: "ModelForge SDK",
    toolchain_subtitle: "Pre-integrated RTOS & Eclipse-based Unified Build",
    toolchain_labels: [{ text: "RTOS" }, { text: "DRIVERS" }, { text: "COMPILER" }],
    floating_tags: [{ text: "RTOS" }, { text: "DSP" }, { text: "Drivers" }, { text: "Build" }]
  };

  try {
    const res = await fetch(`${STRAPI_URL}/api/dvk-page`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        data: {
          modelforge: modelforgeData
        }
      })
    });

    if (!res.ok) {
      console.error("Failed to update DVK Page:", res.statusText);
      const text = await res.text();
      console.error(text);
      return;
    }

    console.log("Successfully seeded ModelForge on DVK page!");
  } catch (err) {
    console.error("Error updating DVK page:", err);
  }
}

seedModelForge();
