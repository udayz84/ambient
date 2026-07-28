/**
 * seed-developer-page-direct.mjs
 * ----------------------------------------------------------------------------
 * Direct-runtime seeder for the `developer-page` single type (no API token
 * needed — use while the REST token in .env is expired/invalid).
 *
 * Seeds ALL sections rendered by src/app/developer/page.tsx so the CMS
 * matches the current UI field-for-field:
 *
 *   hero        — heading / subtitle / primary_button / secondary_button / bg
 *   code        — heading / subtitle / code_snippet (plain text) / 3 articles
 *   pipeline    — heading / tag / 4 tabs (label + flow_image + logo)
 *   coming_soon — heading / subtitle / card_title / card_description /
 *                 cta_label / cta_href / image
 *   modules     — heading / subtitle / 2 module cards (image, title,
 *                 description, cta_label, cta_href)
 *   copilots    — heading / subtitle / 3 copilot cards (icon, title,
 *                 description, cta_label, cta_href)
 *
 * `seo` and any other keys are left untouched (partial update).
 *
 * Loads the Strapi app from cms/ programmatically (same Postgres DB; safe to
 * run while `strapi develop` is up). Uploads are SHA-1 deduped against the
 * shared scripts/.strapi-upload-cache.json.
 *
 * Usage
 *   node scripts/seed-developer-page-direct.mjs            # seed
 *   node scripts/seed-developer-page-direct.mjs --dry-run  # payload only
 * ----------------------------------------------------------------------------
 */

import { createRequire } from "node:module";
import { createHash } from "node:crypto";
import { existsSync, statSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { basename, extname, join, normalize, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = normalize(join(__dirname, ".."));
const CMS_DIR = join(REPO_ROOT, "cms");
const PUBLIC_DIR = join(REPO_ROOT, "public");
const CACHE_FILE = join(__dirname, ".strapi-upload-cache.json");

const DRY_RUN = process.argv.includes("--dry-run");

const MIME = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

const media = (relPath) => ({ __media: relPath });

// ---------------------------------------------------------------------------
// Content — mirrors DEVELOPER_PAYLOAD in scripts/seed-strapi-pages-3.mjs
// (same copy the UI falls back to, straight from Figma).
// ---------------------------------------------------------------------------

const CODE_SNIPPET = `main.c

#include "sys_clk.h"
#include "FreeRTOS.h"

void main()

{
APP_Start();
}

static void APP_Start()
{

	xTaskCreate(application_read_task_entry,
				"DataTask",
				1024,
				(void *)0,
				tskIDLE_PRIORITY + 4,
				NULL );

	xTaskCreate(application_process_task_entry,
				"ProcessTask",
				1024,
				(void *)0,
				tskIDLE_PRIORITY + 3,
				NULL );


	xTaskCreate(application_LCD_DISPLAY_task_entry,
				"PrintTask",
				1024,
				(void *)0,
				tskIDLE_PRIORITY + 2,
				NULL );

}`;

const DEVELOPER = {
  hero: {
    heading: "Model to deployment in 15 Minutes",
    subtitle:
      "ModelForge bridges training and deployment. Quantize, compile, and merge neural networks with your firmware.",
    primary_button: { label: "Download ModelForge SDK", href: "#", variant: "primary" },
    secondary_button: { label: "Read the Documentation", href: "#", variant: "secondary" },
    background_image: media("developer/hero-bg-3.png"),
  },

  code: {
    heading: "Hello world in three lines",
    subtitle:
      "We invisibly map AI cores to your host drop your model straight into your existing application.",
    code_snippet: CODE_SNIPPET,
    articles: [
      {
        icon: media("developer/article-icon-1.svg"),
        title: "No Proprietary IDEs",
        description:
          "Everything happens within the standard Eclipse IDE you already know with easy-to-use APIs.",
      },
      {
        icon: media("developer/article-icon-2.svg"),
        title: "A Single Line of Inference",
        description:
          "Your heavy, quantized neural network is distilled into a highly optimized object file. You call it just like any other standard C function.",
      },
      {
        icon: media("developer/article-icon-3.svg"),
        title: "The End of Glue Code",
        description:
          "ModelForge's dual-compiler architecture natively links your embedded DSP/sensor code with the AI execution in one seamless build.",
      },
    ],
  },

  pipeline: {
    heading: "The ModelForge Pipeline",
    tag: { text: "Real-time AI at edge" },
    tabs: [
      {
        label: "Train",
        flow_image: media("developer/train-flow-1.png"),
        logo: media("developer/pipeline-logo-1.png"),
      },
      {
        label: "Optimize",
        flow_image: media("developer/train-flow-2.png"),
        logo: media("developer/pipeline-logo-2.png"),
      },
      {
        label: "Integrate",
        flow_image: media("developer/train-flow-3.png"),
        logo: media("developer/pipeline-logo-3.png"),
      },
      {
        label: "Deploy",
        flow_image: media("developer/train-flow-4.png"),
        logo: media("developer/pipeline-logo-1.png"),
      },
    ],
  },

  coming_soon: {
    heading: "Test on the metal, without the metal.",
    subtitle:
      "Validate your build in a virtual sandbox,\nno need to wait for hardware.",
    card_title: "Virtual Sandbox Coming Soon",
    card_description:
      "Complete virtual validation environment for testing your builds before hardware arrives.",
    cta_label: "Join the Virtual Sandbox Waitlist",
    cta_href: "#",
    image: media("developer/sandbox-image.png"),
    background: null,
  },

  modules: {
    heading: "From bench validation to volume production.",
    subtitle:
      "A seamless toolchain is useless if hardware can't integrate. Move from software validation to deployment instantly with our modular edge ecosystem.",
    modules: [
      {
        image: media("developer/module-dvk.png"),
        title: "GPX Evaluation Kits (DVKs)",
        description:
          "Stop fighting with breakout boards. Our fully integrated Evaluation Kits come equipped with standard interfaces, allowing you to plug in your cameras, microphones, and industrial sensors out-of-the-box for immediate physical validation.",
        cta_label: "View Evaluation Kits",
        cta_href: "#",
      },
      {
        image: media("developer/module-som.png"),
        title: "Production-Ready SOMs",
        description:
          "Skip the nightmare of custom RF and power routing. Drop our high-density System-on-Modules (SOMs) directly into your custom carrier boards. They're engineered for extreme space-constrained environments, radically accelerating your time-to-market.",
        cta_label: "View System-on-Modules",
        cta_href: "#",
      },
    ],
  },

  copilots: {
    heading: "Your deployment co-pilots.",
    subtitle:
      "A seamless toolchain is useless if hardware can't integrate. Move from software validation to deployment instantly with our modular edge ecosystem.",
    copilots: [
      {
        icon: media("developer/copilot-icon-1.svg"),
        title: "Exhaustive Documentation",
        description:
          "No disorganized wikis. Access the fully searchable ModelForge deployment guide, comprehensive DSP/Pre-processing C-libraries, and lower-level hardware API references.",
        cta_label: "Browse Developer Docs",
        cta_href: "#",
      },
      {
        icon: media("developer/copilot-icon-2.svg"),
        title: "10 Minutes to Mastery",
        description:
          "Get up and running visually. Access our self-serve library of YouTube masterclasses walking you step-by-step through everything from model porting to integrated compilation.",
        cta_label: "View Training Playlist",
        cta_href: "#",
      },
      {
        icon: media("developer/copilot-icon-3.svg"),
        title: "Your Technical Copilots",
        description:
          "Skip the generic help desk. Get direct, architectural-level support from our Field Application Engineers. We will handhold your team to help optimize your specific neural network and heterogeneous build.",
        cta_label: "Schedule Technical Consultation",
        cta_href: "#",
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Helpers (same mechanics as seed-products-architecture-direct.mjs)
// ---------------------------------------------------------------------------

async function sha1OfFile(absolutePath) {
  const buf = await readFile(absolutePath);
  return createHash("sha1").update(buf).digest("hex");
}

async function loadCache() {
  try {
    return JSON.parse(await readFile(CACHE_FILE, "utf8"));
  } catch {
    return {};
  }
}
async function saveCache(cache) {
  await writeFile(CACHE_FILE, JSON.stringify(cache, null, 2), "utf8");
}

async function resolveAsset(strapi, relPath, ctx, { alt = null } = {}) {
  if (!relPath) return null;
  const abs = join(PUBLIC_DIR, relPath);
  if (!existsSync(abs)) {
    console.warn(`  [warn] asset not found, skipping: ${relPath}`);
    return null;
  }

  const hash = await sha1OfFile(abs);
  if (ctx.cache[hash]) {
    const cached = ctx.cache[hash];
    const exists = await strapi.db
      .query("plugin::upload.file")
      .findOne({ where: { id: cached.id } });
    if (exists) {
      ctx.cacheHits += 1;
      return cached.id;
    }
    console.warn(`  [warn] cached id ${cached.id} no longer in DB, re-uploading`);
    delete ctx.cache[hash];
  }

  console.log(`  [upload] ${relPath}`);
  const name = basename(abs);
  const mime = MIME[extname(abs).toLowerCase()] || "application/octet-stream";
  const uploaded = await strapi
    .plugin("upload")
    .service("upload")
    .upload({
      data: { fileInfo: { name, alternativeText: alt ?? name } },
      files: {
        filepath: abs,
        originalFilename: name,
        mimetype: mime,
        size: statSync(abs).size,
      },
    });
  const file = Array.isArray(uploaded) ? uploaded[0] : uploaded;
  if (!file?.id) throw new Error(`Upload returned no file for ${relPath}`);

  ctx.cache[hash] = {
    id: file.id,
    documentId: file.documentId,
    url: file.url,
    name: file.name,
    sourcePath: relPath,
  };
  await saveCache(ctx.cache);
  return file.id;
}

async function hydrate(strapi, node, ctx) {
  if (node == null) return node;
  if (Array.isArray(node)) {
    const out = [];
    for (const v of node) {
      const r = await hydrate(strapi, v, ctx);
      if (r !== null) out.push(r);
    }
    return out;
  }
  if (typeof node === "object") {
    if (Object.prototype.hasOwnProperty.call(node, "__media")) {
      return await resolveAsset(strapi, node.__media, ctx, { alt: node.__alt });
    }
    const out = {};
    for (const [k, v] of Object.entries(node)) {
      if (k === "__alt") continue;
      out[k] = await hydrate(strapi, v, ctx);
    }
    return out;
  }
  return node;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  if (DRY_RUN) {
    console.log("[dry-run] developer-page payload (media paths unresolved):");
    console.log(JSON.stringify(DEVELOPER, null, 2));
    return;
  }

  const require = createRequire(join(CMS_DIR, "package.json"));
  const { createStrapi } = require("@strapi/strapi");

  // The `strapi develop` CLI loads cms/.env for us; a programmatic load does
  // not — pull it in so DATABASE_URL / credentials resolve.
  try {
    process.loadEnvFile(join(CMS_DIR, ".env"));
  } catch {
    // no cms/.env — rely on shell env
  }
  process.env.NODE_ENV ??= "development";

  console.log("Loading Strapi runtime (appDir: cms/) ...");
  const strapi = await createStrapi({
    appDir: CMS_DIR,
    distDir: join(CMS_DIR, "dist"),
  }).load();

  try {
    const ctx = { cache: await loadCache(), cacheHits: 0 };
    const payload = await hydrate(strapi, DEVELOPER, ctx);

    const docService = strapi.documents("api::developer-page.developer-page");
    const existing = await docService.findFirst({});
    if (!existing) {
      throw new Error("developer-page single type has no document — seed the page first.");
    }

    await docService.update({
      documentId: existing.documentId,
      data: payload,
    });
    console.log("  [update] developer-page written (draft)");

    await docService.publish({ documentId: existing.documentId });
    console.log("  [publish] developer-page published");

    // Verify: read back with populated media.
    const check = await docService.findFirst({
      status: "published",
      populate: {
        hero: { populate: "*" },
        code: { populate: { articles: { populate: "*" } } },
        pipeline: { populate: { tag: true, tabs: { populate: "*" } } },
        coming_soon: { populate: "*" },
        modules: { populate: { modules: { populate: "*" } } },
        copilots: { populate: { copilots: { populate: "*" } } },
      },
    });
    console.log("  [verify] hero.heading:", check?.hero?.heading);
    console.log(
      "  [verify] code: snippet",
      typeof check?.code?.code_snippet === "string"
        ? `string (${check.code.code_snippet.length} chars)`
        : typeof check?.code?.code_snippet,
      "| articles:",
      (check?.code?.articles ?? []).map((a) => a.title).join(" | ")
    );
    console.log(
      "  [verify] pipeline tabs:",
      (check?.pipeline?.tabs ?? [])
        .map((t) => `${t.label}${t.flow_image ? " [img]" : "[NO IMG]"}`)
        .join(" | ")
    );
    console.log(
      "  [verify] coming_soon:",
      check?.coming_soon?.card_title,
      "| desc:",
      check?.coming_soon?.card_description ? "yes" : "NO",
      "| cta_href:",
      check?.coming_soon?.cta_href
    );
    console.log(
      "  [verify] modules:",
      (check?.modules?.modules ?? [])
        .map((m) => `${m.title}${m.description ? " [desc]" : " [NO DESC]"}`)
        .join(" | ")
    );
    console.log(
      "  [verify] copilots:",
      (check?.copilots?.copilots ?? [])
        .map((c) => `${c.title}${c.description ? " [desc]" : " [NO DESC]"}`)
        .join(" | ")
    );
    console.log(`done. (${ctx.cacheHits} cached asset(s) reused)`);
  } finally {
    await strapi.destroy();
  }
}

main().catch((err) => {
  console.error(err?.message ?? err);
  process.exit(1);
});
