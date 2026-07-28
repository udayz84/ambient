/**
 * seed-technology-page.mjs
 * Targeted full seed for the technology-page single type.
 * Seeds all section content + content images (backgrounds/vectors/decorative
 * assets stay static in the components and are intentionally ignored).
 */

import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { basename, extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = normalize(join(__dirname, ".."));
const PUBLIC_DIR = join(REPO_ROOT, "public");

try { process.loadEnvFile(join(REPO_ROOT, ".env")); } catch {}

const STRAPI_URL = (process.env.STRAPI_URL || "http://localhost:1337").replace(/\/$/, "");
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || "";
const CACHE_FILE = join(__dirname, ".strapi-upload-cache.json");
const argv = new Set(process.argv.slice(2));
const SKIP_UPLOAD = argv.has("--skip-upload");
const DRY_RUN = argv.has("--dry-run");

if (!STRAPI_TOKEN && !DRY_RUN) { console.error("[fatal] STRAPI_TOKEN env var is required."); process.exit(1); }

const MIME = { ".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",".svg":"image/svg+xml",".webp":"image/webp" };

async function sha1(p){const b=await readFile(p);return createHash("sha1").update(b).digest("hex");}
const delay=(ms)=>new Promise(r=>setTimeout(r,ms));
async function sf(path,init={}){const u=path.startsWith("http")?path:`${STRAPI_URL}${path}`;const h={Authorization:`Bearer ${STRAPI_TOKEN}`,...(init.headers||{})};const r=await fetch(u,{...init,headers:h});const t=await r.text();let b=null;try{b=t?JSON.parse(t):null}catch{b=t}return{ok:r.ok,status:r.status,body:b};}
async function upload(p){const buf=await readFile(p);const ext=extname(p).toLowerCase();const mime=MIME[ext]||"application/octet-stream";const f=new FormData();f.append("files",new Blob([buf],{type:mime}),basename(p));const r=await sf("/api/upload",{method:"POST",body:f});if(!r.ok)throw new Error(`upload ${p} ${r.status}: ${JSON.stringify(r.body)}`);const a=Array.isArray(r.body)?r.body:[r.body];return a[0];}
async function loadCache(){try{return JSON.parse(await readFile(CACHE_FILE,"utf8"))}catch{return{}}}
async function saveCache(c){await writeFile(CACHE_FILE,JSON.stringify(c,null,2),"utf8");}
async function resolve(rel,c){const abs=join(PUBLIC_DIR,rel);if(!existsSync(abs))throw new Error(`missing: ${rel}`);const h=await sha1(abs);if(c[h])return c[h].id;if(SKIP_UPLOAD)throw new Error(`no cache for ${rel}`);console.log(`  [upload] ${rel}`);const f=await upload(abs);c[h]={id:f.id,documentId:f.documentId,url:f.url,name:f.name,sourcePath:rel};await saveCache(c);await delay(20);return f.id;}
function media(rel){return {__media:rel};}
async function hydrate(node,c){if(node==null)return node;if(Array.isArray(node)){const o=[];for(const v of node){const r=await hydrate(v,c);if(r!==null)o.push(r);}return o;}if(typeof node==="object"){if(Object.prototype.hasOwnProperty.call(node,"__media"))return await resolve(node.__media,c);const o={};for(const [k,v] of Object.entries(node))o[k]=await hydrate(v,c);return o;}return node;}

const P = (m) => media(`technology/${m}`);

const PAYLOAD = {
  hero: {
    tag: { text: "Architecture · A-Cube" },
    title: "Meet A-Cube. AI-native, from the metal up.",
    subtitle: "A new architecture for AI, energy-aware at every layer, scaling from coin cell to cloud.",
    primary_button: { label: "Read the Whitepaper", href: "#", variant: "primary" },
    secondary_button: { label: "Watch the 3-min Explainer", href: "#", variant: "secondary" },
    hero_object: P("hero-object.png"),
  },
  problem: {
    tag: { text: "The PROBLEM" },
    heading: "AI isn't a math problem.\nIt's a memory problem.",
    subtitle: "The multiply was never the expensive part. Moving the data was.",
    stat_value: "95%",
    stat_description: "of a neural net is matrix math. ~75% of the effort is moving it around.",
    comparison_cards: [
      { label: "Legacy", description: "Compute and memory sit apart. The chip spends its life shuttling numbers, not crunching them. ~75% of operations are just memory traffic.", image: P("legacy-compute-new.png") },
      { label: "A-Cube", description: "We put the compute inside the memory. The commute disappears. Compute where the data lives.", image: P("acube-cube.png") },
    ],
    legacy_stats: [
      { label: "Where compute happens", value: "Outside Memory", valueColor: "#ffffff" },
      { label: "Data Movement", value: "High", valueColor: "#ffffff" },
      { label: "Efforts spent on moving data", value: "High", valueColor: "#fb3748" },
      { label: "Efficiency", value: "Low", valueColor: "#fb3748" },
    ],
    acube_stats: [
      { label: "Where compute happens", value: "Inside Memory", valueColor: "#ffffff" },
      { label: "Data Movement", value: "Minimal", valueColor: "#ffffff" },
      { label: "Efforts spent on moving data", value: "Low", valueColor: "#1fc16b" },
      { label: "Efficiency", value: "High", valueColor: "#1fc16b" },
    ],
  },
  architecture: {
    heading: "One architecture that thinks\nsenses, & speaks you language",
    subtitle: "Three breakthroughs as one: a physics-based brain, a responsive nervous system, and familiar language. Server-class AI with low power.",
  },
  pillars: {
    pillars: [
      { tag: "The Brain That think", title: "CubicCore™", subtitle: "Server-class math. Microwatt power.", description: "It runs the math on physics itself. Ohm's law multiplies, Kirchhoff's law sums - right inside the memory, almost for free. Digital keeps every result exact.", bullets: "In-memory analog compute - no data commute\n~1/100th the energy per operation vs. digital\nScales by replication - tile in more cores, from a smart ring to a server\nFully programmable · 4–32-bit precision, tuned at runtime\nBuilt in standard CMOS - no exotic process" },
      { tag: "The Nervous System", title: "SenseMesh™", subtitle: "Knows when to think - and how hard.", description: "Reflexes in hardware. It fuses every sensor into one clean stream, filters out the noise, and decides - in hardware - when to wake the brain and how much power it needs.", bullets: "Hardware sensor fusion - no host polling, no firmware overhead\nEvent-driven wake - compute fires only on real signals\nMultimodal by design - motion, audio, vision into one stream\n>80% less idle host power vs. legacy MCUs" },
      { tag: "The Language", title: "ModelForge™", subtitle: "No new language to learn.", description: "Bring your own models in TensorFlow, Keras, or ONNX. A push-button compiler does the translation - no rewrites, no proprietary toolchain.", bullets: "Drop-in support for TensorFlow, Keras, ONNX\nPush-button compile - concept to silicon, no rewrites\nSpeaks matrix math natively — none of the translation tax Arm/RISC-V pay\nOne workflow that ports across every A-Cube product", cta: { label: "Explore the Developer Hub", href: "/developer", variant: "primary" } },
    ],
  },
  modes: {
    tag: { text: "Inside Sensemesh" },
    heading: "Two named modes.\nOne continuous loop.",
    subtitle: "Bridge the lab and real world. The Sparsh module offers continuous, microwatt intelligence in a 21×21mm size,",
    top_image: P("modes-top.png"),
    bottom_image: P("modes-bottom.png"),
    mode_cards: [
      { title: "Subconscious AI", bullets: "Legacy chips switch off. A-Cube sleeps like you: the brain stays aware. Our island runs AI at microwatts while the ARM core is powered down. Always processing, never draining.", caption: "Always processing, never draining." },
      { title: "Turboboost mode", bullets: "When something matters, the brain wakes instantly. The moment SenseMesh flags a real event, runtime DVFS ramps the chip from subconscious idle to full performance", caption: "live, no reset — settles back down." },
      { title: "SETTLES", bullets: "Once the task is completed, the chip settles back into subconscious mode." },
    ],
    mode_labels: [
      { label: "SUBCONSCIOUS MODE", sublabel: "Always on. Ultra low power" },
      { label: "Turboboost mode", sublabel: "on-demand. high performance" },
    ],
  },
  graph: {
    heading: "A unified architecture for seamless adoption and scalability.",
    subtitle: "The same chip, tuned to the job — from a wrist to a factory floor.",
    labels: [
      { label: "GPX10", sub_label: "EDGE SENSOR" },
      { label: "GPX10 Pro", sub_label: "EDGE AI SOC" },
      { label: "GPX Vision", sub_label: "ON - DEVICE VISION" },
      { label: "GPX Compute", sub_label: "ON - DEVICE VISION" },
      { label: "GPX Compute", sub_label: "ON - DEVICE VISION" },
    ],
    axis_label_left: "MICROWATT EDGE",
    axis_label_right: "HYPERSCALE CLOUD",
    center_text: "ONE CORE. ONE SOFTWARE STACK. \nFrom the smallest sensor to largest serve",
    primary_button: { label: "Read the Whitepaper", href: "#", variant: "primary" },
    secondary_button: { label: "Watch the 3-min Explainer", href: "#", variant: "secondary" },
  },
  silicon: {
    tag: { text: "Inside Sensemesh" },
    heading: "Proven in silicon,\nshipping today.",
    subtitle: "Bridge the lab and real world. The Sparsh module offers continuous, microwatt intelligence in a 21×21mm size,",
    chip_background: P("chip-bg.png"),
    stat_cards: [
      { value: "512", unit: "GOPS", label: "LOWER POWER CONSUMPTION", description: "Extend battery life and reduce energy costs in compute-intensive settings." },
      { value: "~80", unit: "uW", label: "LOWER POWER CONSUMPTION", description: "Extend battery life and reduce energy costs in compute-intensive settings." },
    ],
    cta: { label: "Explore GPX10", href: "#", variant: "primary" },
  },
  efficiency: {
    heading: "The efficiency gap isn't a few\npercent. It's a different category.",
    subtitle: "The same chip, tuned to the job — from a wrist to a factory floor.",
  },
  bottom_cta: {
    heading: "Put A-Cube to Work",
    subtitle: "A complete edge-AI SoC — AI engine, control, sensing, memory, and security — integrated so your board doesn't have to be.",
    cards: [
      { title_lines: "Get an\nEvaluation Kit.", description: "Explore how Ambient AI can unlock new capabilities in your wearable product. Strategic planning session with our applications team.", cta_label: "Request Eval Kit", cta_href: "/contact" },
      { title_lines: "Scale to increase\nthe volume.", description: "Be the first to access our upcoming Vision, Sound, and Industrial modules.", cta_label: "Talk to Sales", cta_href: "/contact" },
    ],
  },
};

async function main() {
  console.log(`Strapi : ${STRAPI_URL}`);
  console.log(`Token  : ${STRAPI_TOKEN ? "****"+STRAPI_TOKEN.slice(-4) : "(none)"}`);
  console.log(`Mode   : ${DRY_RUN?"DRY-RUN":SKIP_UPLOAD?"SKIP-UPLOAD":"live"}`);
  const cache = await loadCache();
  let data;
  try { data = await hydrate(PAYLOAD, cache); }
  catch (e) { console.error("[hydrate error]", e.message); process.exit(1); }

  if (DRY_RUN) { console.log(JSON.stringify(data, null, 2).slice(0, 800)); return; }

  for (const draft of [false, true]) {
    const path = `/api/technology-page${draft ? "?status=published" : ""}`;
    console.log(`\nPUT ${path}`);
    const r = await sf(path, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ data }) });
    if (!r.ok) { console.error(`PUT failed (${r.status}): ${JSON.stringify(r.body)}`); process.exit(1); }
    console.log(`  [ok] ${draft ? "published" : "draft"}`);
  }
  console.log("\nDone.");
}
main().catch(e=>{console.error(e.message);process.exit(1);});
