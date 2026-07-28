/**
 * sync-products-strapi.js
 * ----------------------------------------------------------------------------
 * Syncs the Strapi "products-page" single type so its content matches exactly
 * what the /products UI renders from its fallback constants.
 *
 * Usage:
 *   node scripts/sync-products-strapi.js          # dry-run (prints diff)
 *   node scripts/sync-products-strapi.js --apply   # actually write to Strapi
 *
 * Env:
 *   STRAPI_API_TOKEN  — Bearer token with write access to products-page
 *   STRAPI_URL        — defaults to http://localhost:1338
 * ----------------------------------------------------------------------------
 */

const STRAPI_URL = (
  process.env.STRAPI_URL || "http://127.0.0.1:1338"
).replace(/\/$/, "");

const TOKEN = process.env.STRAPI_API_TOKEN || "";
const APPLY = process.argv.includes("--apply");

// ── UI fallback values (copied from products-data.ts + component files) ────

const PAYLOAD = {
  hero: {
    title: "Full AI inference. \nOn a coin cell.",
    subtitle:
      "The world's first energy-aware AI processor — running real neural networks, not rule-based shortcuts, at microwatt power. Built on the A-Cube architecture.",
    primary_button: { label: "Request Evaluation Kit", href: "#", variant: "primary" },
    secondary_button: { label: "Download Product Brief", href: "#", variant: "secondary" },
    chipset_image_1_alt: "GPX10 Pro chipset foreground render",
    chipset_image_2_alt: "GPX10 Pro coin cell background render",
  },

  features: {
    heading: "The chip that ends the \npower-vs-intelligence tradeoff.",
    subtitle:
      "For a decade, product makers chose: a dumb MCU that lasts months, or a smart NPU that dies by lunch. GPX10 Pro is the first that refuses to choose.",
    feature_cards: [
      {
        title: "Premium AI features in a new form.",
        description:
          "Run complex models in a hearing aid, a ring, a patch — no bulky battery, no redesign.",
      },
      {
        title: "Months on a coin cell.",
        description:
          "Always-on AI at ~80 µW. Ship the battery life your reviews live or die on.",
      },
      {
        title: "Private by default.",
        description:
          "Data never leaves the device. No cloud round-trip, no latency, no privacy liability.",
      },
      {
        title: "One chip replaces the stack.",
        description:
          "MCU + AI accelerator + sensor hub + memory you're juggling today — and it stays aware while it sleeps.",
      },
    ],
  },

  always_on: {
    heading: "Always on. Never asleep.",
    subtitle:
      "GPX10 Pro runs AI around the clock at microwatts — and the instant something matters, it surges to full power. No reset. No waking up. It was never off.",
    alt: "GPX10 Pro chip in subconscious mode",
    stats: [
      { title_lines: "ReflexSurge\nMode", badge: "Mode" },
      { title_lines: "512 GOPS ·\ninstant", badge: "Performance" },
      { title_lines: "Full power.\nNo reset.", badge: "Status" },
    ],
  },

  use_cases: {
    heading: "Built for always-on. \n Proven across markets.",
    subtitle: "The same chip, tuned to the job — from a wrist to a factory floor.",
    primary_button: { label: "Explore Applications", href: "#", variant: "primary" },
    secondary_button: { label: "Discuss Your Use Case", href: "#", variant: "secondary" },
    tabs: [
      { label: "HEARABLES", watermark_text: "Hearables" },
      { label: "SMART HOMES", watermark_text: "Smart Homes" },
      { label: "INDUSTRIAL", watermark_text: "Industrial" },
      { label: "AUTOMOTIVE", watermark_text: "Automotive" },
      { label: "MEDICAL", watermark_text: "Medical" },
      { label: "AGRICULTURE", watermark_text: "Agriculture" },
    ],
  },

  measured: {
    heading: "Not projected. \nMeasured in silicon.",
    subtitle:
      "Here's GPX10 Pro against the alternatives a design team actually weighs.",
    tag: { text: "Measured proof" },
    primary_button: { label: " Download the Full Datasheet", href: "#", variant: "primary" },
    secondary_button: { label: " Read the Architecture Whitepaper", href: "#", variant: "secondary" },
    cards: [
      {
        name: "GPX10 Pro",
        variant: "gpx10",
        stats: [
          { icon: "speed", label: "Peak Compute (GOPS)", value: "512", is_green: true, is_medium: false },
          { icon: "energy", label: "Active Power", value: "40 - 120 µW", is_green: true, is_medium: false },
          { icon: "eco", label: "Efficiency (TOPS/W)", value: "7.3", is_green: true, is_medium: false },
        ],
      },
      {
        name: "RISC MCU",
        variant: "risc_mcu",
        stats: [
          { icon: "speed", label: "Peak Compute (GOPS)", value: "0.02", is_green: false, is_medium: false },
          { icon: "energy", label: "Active Power", value: "600 mW", is_green: false, is_medium: false },
          { icon: "eco", label: "Efficiency (TOPS/W)", value: "0.02", is_green: false, is_medium: false },
        ],
      },
      {
        name: "MCU + NPU",
        variant: "mcu_npu",
        stats: [
          { icon: "speed", label: "Peak Compute (GOPS)", value: "100", is_green: false, is_medium: true },
          { icon: "energy", label: "Active Power", value: "200 mW", is_green: false, is_medium: false },
          { icon: "eco", label: "Efficiency (TOPS/W)", value: "1.2", is_green: false, is_medium: false },
        ],
      },
    ],
  },

  architecture: {
    label: "Architecture",
    heading: "Everything in one chip. \nNothing wasted.",
    subtitle:
      "A complete edge-AI SoC — AI engine, control, sensing, memory, and security — integrated so your board doesn't have to be.",
    caption: "The Hardware Blueprint",
    alt: "GPX10 Pro hardware blueprint",
    stats: [
      {
        label: "A-Cube compute",
        description: "10 MX8 cores, 2,560 MACs/cycle, replaces a separate AI accelerator.",
      },
      {
        label: "Two power domains",
        description: "A 5-core island sips microwatts; the rest powers down.",
      },
      {
        label: "Integrated sensing",
        description: "Up to 10 sensor streams fused on-chip; no external sensor hub.",
      },
    ],
  },

  modelforge: {
    heading: "Your models. Your IDE. No rewrites.",
    subtitle:
      "A new architecture shouldn't mean a new way of working. With ModelForge, it doesn't.",
    alt: "ModelForge compile pipeline",
    primary_button: { label: "Explore the Developer Hub", href: "#", variant: "primary" },
    secondary_button: { label: "Request the SDK", href: "#", variant: "secondary" },
    steps: [
      {
        step: "01 TRAIN",
        description:
          "Bring your TensorFlow, Keras, or ONNX model. Or start from our pre-trained library.",
      },
      {
        step: "02 COMPILE",
        description:
          "Push-button: ModelForge quantizes and maps it onto A-Cube. No manual translation.",
      },
      {
        step: "03 DEPLOY",
        description:
          "One unified build in standard Eclipse. Up to 90% of your existing C code ports over.",
      },
    ],
  },

  bench_to_volume: {
    chip_label: "Development",
    heading: "From bench to volume\n without rewriting a thing.",
    subtitle:
      "The C code, the build, the AI you validate on the kit ports straight to production silicon. This is the part competitors can't offer.",
    cards: [
      {
        title: "Cranium DVK",
        description:
          "A complete dev kit with onboard sensors, camera, mics, and pre-loaded demos. Measure the power yourself, day one.",
        cta_label: "View Dev Kit",
        cta_href: "#",
      },
      {
        title: "Sparsh SOM",
        description:
          "Drop our pre-engineered System-on-Module into your carrier board. Skip the RF, power, and sensor-routing nightmare.",
        cta_label: "View SOMs",
        cta_href: "#",
      },
      {
        title: "GPX10 Pro Silicon",
        description: "The raw SoC for high-volume production.",
        cta_label: "Talk to Sales",
        cta_href: "#",
      },
    ],
  },

  full_picture: {
    heading: "The full picture.",
    subtitle:
      "Bridge the lab and real world. The Sparsh module offers continuous, microwolt intelligence in a 21x21mm size, with a breakout board that snaps off for production.",
    alt: "GPX10 Pro full architecture diagram",
    memory_items:
      "120 KB L0 cache\n2048 KB unified L1 SRAM\nVideo + multi-bank sensor buffers\nBoot ROM\nExternal SRAM/Flash via QSPI/SPI",
    security_items:
      "Secure boot with signed firmware\nAES-256 hardware acceleration\nTrue random number generator\nTamper-resistant key storage\nActive tamper detection",
    connectivity_items:
      "Quad-SPI / SPI\nI2C x 4\nUART x 4\nUSB 2.0 OTG\n84 programmable GPIO",
    callouts: [
      { label: "Memory" },
      { label: "Compute" },
      { label: "Power" },
      { label: "Sensing" },
      { label: "Security" },
      { label: "Connectivity" },
      { label: "Package" },
    ],
  },

  start_building: {
    heading: "Start building with GPX10 Pro.",
    subtitle:
      "A complete edge-AI SoC — AI engine, control, sensing, memory, and security — integrated so your board doesn't have to be.",
    alt: "Start building CTA card background",
    cards: [
      {
        title_lines: "Get an\nEvaluation Kit.",
        description:
          "Explore how Ambient AI can unlock new capabilities in your wearable product. Strategic planning session with our applications team.",
        cta_label: "Request Eval Kit",
        cta_href: "#",
      },
      {
        title_lines: "Scale to increase\nthe volume.",
        description:
          "Be the first to access our upcoming Vision, Sound, and Industrial modules.",
        cta_label: "Talk to Sales",
        cta_href: "#",
      },
    ],
  },
};

// ── Helpers ────────────────────────────────────────────────────────────────

async function fetchJson(url, opts = {}) {
  const headers = { "Content-Type": "application/json", ...opts.headers };
  // Only attach the token for write operations (reads work via public access)
  if (TOKEN && (opts.method === "PUT" || opts.method === "POST"))
    headers.Authorization = `Bearer ${TOKEN}`;
  const res = await fetch(url, { ...opts, headers });
  const body = await res.text();
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${body.slice(0, 500)}`);
  }
  return body ? JSON.parse(body) : null;
}

function summarize(obj, depth = 0) {
  const indent = "  ".repeat(depth + 1);
  if (typeof obj !== "object" || obj === null) return String(obj);
  if (Array.isArray(obj)) {
    return obj.length === 0
      ? "[]"
      : `\n${obj.map((v, i) => `${indent}[${i}] ${summarize(v, depth + 1)}`).join("\n")}`;
  }
  const entries = Object.entries(obj);
  return entries
    .map(([k, v]) => {
      const val = typeof v === "object" && v !== null
        ? summarize(v, depth + 1)
        : String(v).slice(0, 80);
      return `${indent}${k}: ${val}`;
    })
    .join("\n");
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log(`Strapi URL:  ${STRAPI_URL}`);
  console.log(`Token:       ${TOKEN ? "✓ provided" : "✗ none (read-only)"}`);
  console.log(`Mode:        ${APPLY ? "APPLY (write)" : "DRY-RUN (read-only)"}`);
  console.log("");

  // 1. Fetch current documentId
  console.log("Fetching current products-page…");
  const current = await fetchJson(
    `${STRAPI_URL}/api/products-page?populate[hero][populate]=*&populate[features][populate]=*&populate[always_on][populate]=*&populate[use_cases][populate]=*&populate[measured][populate]=*&populate[architecture][populate]=*&populate[modelforge][populate]=*&populate[bench_to_volume][populate]=*&populate[full_picture][populate]=*&populate[start_building][populate]=*`
  );

  const docId = current.data.documentId;
  console.log(`  documentId: ${docId}`);
  console.log(`  updatedAt:  ${current.data.updatedAt}`);
  console.log("");

  // 2. Show what will change
  console.log("═".repeat(70));
  console.log("PAYLOAD (data that will be written):");
  console.log("═".repeat(70));
  console.log(summarize(PAYLOAD));
  console.log("");

  if (!APPLY) {
    console.log("─".repeat(70));
    console.log("DRY RUN — no changes written.");
    console.log("Run with --apply to update Strapi:");
    console.log("  node scripts/sync-products-strapi.js --apply");
    return;
  }

  // 3. Write to Strapi
  if (!TOKEN) {
    console.error("✗ STRAPI_API_TOKEN is required for --apply mode.");
    process.exit(1);
  }

  console.log("Writing to Strapi…");
  const updated = await fetchJson(`${STRAPI_URL}/api/products-page`, {
    method: "PUT",
    body: JSON.stringify({ data: PAYLOAD }),
  });

  console.log("✓ Updated successfully!");
  console.log(`  documentId: ${updated.data.documentId}`);
  console.log(`  updatedAt:  ${updated.data.updatedAt}`);
}

main().catch((err) => {
  console.error("✗ Error:", err.message);
  process.exit(1);
});
