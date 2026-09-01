import fs from "node:fs/promises";
import path from "node:path";
import {
  blobNameFor,
  buildManifestEntry,
  createBlobServiceClient,
  formatBytes,
  loadDotEnv,
  missingCredentialsHelp,
  parseArgs,
  ROOTS,
  walkFiles,
} from "./lib.mjs";

loadDotEnv();

// Mirrors every picture/PDF Strapi saves in cms/public/uploads into the Azure
// container under the "strapi-uploads/" prefix, using the same MD5-verified,
// idempotent upload logic as upload-assets.mjs. Strapi keeps serving URLs from
// its own host — nothing about the CMS changes. Run once, or leave --watch
// running to auto-push new uploads as editors publish them.

const args = parseArgs(process.argv);
const WATCH = args.watch === true;
const INTERVAL_SEC = Math.max(3, Number(args.interval) || 10);
const FORCE = args.force === true;
const CONCURRENCY = Math.max(1, Number(args.concurrency) || 8);
const CACHE_CONTROL = "public, max-age=86400";

const STRAPI_ROOT = ROOTS.find((r) => r.root === "strapi-uploads");
const CONTAINER =
  (typeof args.container === "string" && args.container) ||
  process.env.AZURE_STORAGE_CONTAINER_NAME ||
  "assets";

const SERVICE = createBlobServiceClient();
if (!SERVICE) {
  console.error(missingCredentialsHelp());
  process.exit(1);
}
const containerClient = SERVICE.client.getContainerClient(CONTAINER);

// size+mtime cache so --watch only re-hashes files that actually changed
const fileCache = new Map();

async function collectEntries() {
  const relPaths = await walkFiles(STRAPI_ROOT.sourceDir);
  const entries = [];
  const pending = [];
  for (const relPath of relPaths) {
    const abs = path.join(STRAPI_ROOT.sourceDir, relPath);
    const stat = await fs.stat(abs);
    const cached = fileCache.get(relPath);
    if (cached && cached.size === stat.size && cached.mtimeMs === stat.mtimeMs) {
      continue;
    }
    // In watch mode skip files Strapi may still be writing (mtime too fresh).
    if (WATCH && Date.now() - stat.mtimeMs < INTERVAL_SEC * 1000) {
      continue;
    }
    pending.push({ relPath, stat });
  }
  for (const { relPath, stat } of pending) {
    const entry = await buildManifestEntry(
      STRAPI_ROOT.root,
      STRAPI_ROOT.sourceDir,
      relPath,
    );
    fileCache.set(relPath, { size: stat.size, mtimeMs: stat.mtimeMs });
    entries.push(entry);
  }
  return entries;
}

// Same skip/upload contract as upload-assets.mjs — keep the two in sync.
async function syncEntry(entry) {
  const blobName = blobNameFor(entry);
  const blobClient = containerClient.getBlockBlobClient(blobName);
  const localPath = path.join(STRAPI_ROOT.sourceDir, entry.path);

  if (!FORCE) {
    try {
      const props = await blobClient.getProperties();
      const remoteMd5 = props.contentMD5
        ? Buffer.from(props.contentMD5).toString("base64")
        : null;
      if (remoteMd5 === entry.md5 && props.contentType === entry.contentType) {
        return "skipped";
      }
    } catch (err) {
      if (err?.statusCode !== 404) throw err;
    }
  }

  await blobClient.uploadFile(localPath, {
    blobHTTPHeaders: {
      blobContentType: entry.contentType,
      blobCacheControl: CACHE_CONTROL,
      blobContentMD5: Buffer.from(entry.md5, "base64"),
    },
    concurrency: 16,
  });
  return "uploaded";
}

let uploadedCount = 0;
let bytesPushed = 0;
let failedCount = 0;

async function syncOnce({ quiet = false } = {}) {
  const entries = await collectEntries();
  if (!quiet && !WATCH) console.log(`Checking ${entries.length} new/changed file(s)…`);
  const queue = [...entries];

  async function worker() {
    while (queue.length > 0) {
      const entry = queue.shift();
      try {
        const outcome = await syncEntry(entry);
        if (outcome === "uploaded") {
          uploadedCount += 1;
          bytesPushed += entry.size;
          console.log(`  uploaded ${blobNameFor(entry)} (${formatBytes(entry.size)})`);
        }
      } catch (err) {
        failedCount += 1;
        console.error(`  FAILED ${blobNameFor(entry)} — ${(err?.message || String(err)).split("\n")[0]}`);
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
  return entries.length;
}

if (!WATCH) {
  const checked = await syncOnce();
  console.log("");
  console.log("──────────────────────────────────────────────");
  console.log(`Strapi uploads checked : ${checked}`);
  console.log(`Uploaded to Azure      : ${uploadedCount} (${formatBytes(bytesPushed)})`);
  console.log(`Failed                 : ${failedCount}`);
  console.log(`Container / prefix     : ${CONTAINER} / ${STRAPI_ROOT.blobPrefix}`);
  console.log("──────────────────────────────────────────────");
  process.exit(failedCount > 0 ? 1 : 0);
}

console.log(
  `Watching ${STRAPI_ROOT.sourceDir} every ${INTERVAL_SEC}s — new Strapi uploads will be pushed to ${CONTAINER}/${STRAPI_ROOT.blobPrefix} automatically. Ctrl-C to stop.`,
);
await syncOnce({ quiet: true });
console.log(`Initial pass complete (${uploadedCount} uploaded). Watching for changes…`);

setInterval(async () => {
  try {
    await syncOnce({ quiet: true });
  } catch (err) {
    console.error(`watch pass failed: ${(err?.message || String(err)).split("\n")[0]}`);
  }
}, INTERVAL_SEC * 1000);
