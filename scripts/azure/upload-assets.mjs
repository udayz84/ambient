import fs from "node:fs/promises";
import path from "node:path";
import {
  blobNameFor,
  buildManifest,
  createBlobServiceClient,
  formatBytes,
  loadDotEnv,
  missingCredentialsHelp,
  parseArgs,
  ROOTS,
  saveManifest,
} from "./lib.mjs";

loadDotEnv();

const args = parseArgs(process.argv);
const FORCE = args.force === true;
const DRY_RUN = args["dry-run"] === true;
const INCLUDE_STRAPI = args["with-strapi"] === true;
const CONCURRENCY = Math.max(1, Number(args.concurrency) || 8);
const CACHE_CONTROL =
  typeof args["cache-control"] === "string"
    ? args["cache-control"]
    : "public, max-age=86400";
const SET_CORS = args["no-cors"] !== true;

const SERVICE = createBlobServiceClient();
if (!SERVICE) {
  console.error(missingCredentialsHelp());
  process.exit(1);
}
const blobServiceClient = SERVICE.client;
const accountName = SERVICE.accountName;

const CONTAINER =
  (typeof args.container === "string" && args.container) ||
  process.env.AZURE_STORAGE_CONTAINER_NAME ||
  "assets";

console.log("Building local asset manifest (walk + md5)…");
const manifest = await buildManifest({ includeStrapi: INCLUDE_STRAPI });
await saveManifest(manifest);
for (const [root, summary] of Object.entries(manifest.roots)) {
  console.log(
    `  ${root}: ${summary.fileCount} files (${formatBytes(summary.totalBytes)})`,
  );
}

async function ensureContainer() {
  const containerClient = blobServiceClient.getContainerClient(CONTAINER);
  const exists = await containerClient.exists();
  if (!exists) {
    try {
      await containerClient.create({ access: "blob" });
      console.log(`Created container "${CONTAINER}" with public blob read access.`);
    } catch (err) {
      if (err?.statusCode === 409) {
        console.log(`Container "${CONTAINER}" was created concurrently — using it.`);
      } else {
        // The account may disallow public container access — retry private.
        try {
          await containerClient.create();
        } catch (retryErr) {
          if (retryErr?.statusCode === 409) {
            console.log(`Container "${CONTAINER}" was created concurrently — using it.`);
          } else {
            throw retryErr;
          }
        }
        console.warn(
          [
            `Container "${CONTAINER}" created WITHOUT public access (${err.message.split("\n")[0]}).`,
            "Blobs will not be readable via public URLs until you either:",
            "  1. Enable public access on the storage account, or",
            "  2. Set a per-blob/public-container access policy, or",
            "  3. Front the container with Azure CDN.",
          ].join("\n"),
        );
      }
    }
  } else {
    console.log(`Using existing container "${CONTAINER}".`);
  }
  return containerClient;
}

const CORS_RULE = {
  allowedOrigins: "*",
  allowedMethods: "GET,HEAD,OPTIONS",
  allowedHeaders: "*",
  exposedHeaders: "*",
  maxAgeInSeconds: 86400,
};

function sameCorsRule(a, b) {
  return (
    String(a.allowedOrigins ?? "") === String(b.allowedOrigins ?? "") &&
    String(a.allowedMethods ?? "").toUpperCase().split(",").sort().join(",") ===
      String(b.allowedMethods ?? "").toUpperCase().split(",").sort().join(",") &&
    String(a.allowedHeaders ?? "") === String(b.allowedHeaders ?? "") &&
    String(a.exposedHeaders ?? "") === String(b.exposedHeaders ?? "")
  );
}

async function ensureCors() {
  if (!SET_CORS) return;
  try {
    // Set Blob Service Properties REPLACES the whole CORS rule set —
    // fetch the current rules first and merge so nothing existing is lost.
    // Note: with an Azure AD service principal this control-plane call usually
    // requires extra permissions — a failure here is non-fatal by design.
    const props = await blobServiceClient.getProperties();
    const existing = props.cors ?? [];
    if (existing.some((rule) => sameCorsRule(rule, CORS_RULE))) {
      console.log("Blob service CORS rule already present — leaving CORS untouched.");
      return;
    }
    const merged = [...existing, CORS_RULE];
    if (merged.length > 5) {
      console.warn(
        `Blob service already has ${existing.length} CORS rules (Azure max is 5) — not adding ours. Add a GET/HEAD rule manually if needed.`,
      );
      return;
    }
    // Round-trip only the serializable service properties — never touch the rest.
    await blobServiceClient.setProperties({
      blobAnalyticsLogging: props.blobAnalyticsLogging,
      hourMetrics: props.hourMetrics,
      minuteMetrics: props.minuteMetrics,
      deleteRetentionPolicy: props.deleteRetentionPolicy,
      staticWebsite: props.staticWebsite,
      defaultServiceVersion: props.defaultServiceVersion,
      cors: merged,
    });
    console.log(`Blob service CORS rule added (${merged.length} rule(s), existing rules preserved).`);
  } catch (err) {
    console.warn(
      `Could not set CORS on the blob service (skipping): ${err.message.split("\n")[0]}`,
    );
  }
}

function propsMatchExisting(entry, properties) {
  const remoteMd5 = properties.contentMD5
    ? Buffer.from(properties.contentMD5).toString("base64")
    : null;
  return remoteMd5 === entry.md5 && properties.contentType === entry.contentType;
}

async function uploadEntry(containerClient, entry) {
  const blobName = blobNameFor(entry);
  const blobClient = containerClient.getBlockBlobClient(blobName);
  const rootDef = ROOTS.find((r) => r.root === entry.root);
  const localPath = path.join(rootDef.sourceDir, entry.path);

  if (!FORCE && !DRY_RUN) {
    try {
      const props = await blobClient.getProperties();
      if (propsMatchExisting(entry, props)) return "skipped";
    } catch (err) {
      if (err?.statusCode !== 404) throw err;
    }
  }

  if (DRY_RUN) return "would-upload";

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

const containerClient = await ensureContainer();
await ensureCors();

console.log(
  `Uploading to container "${CONTAINER}"${DRY_RUN ? " (dry run)" : ""} — concurrency ${CONCURRENCY}, cache-control "${CACHE_CONTROL}"`,
);

const results = { uploaded: [], skipped: [], wouldUpload: [], failed: [] };
let done = 0;

async function worker(queue) {
  while (queue.length > 0) {
    const entry = queue.shift();
    const blobName = blobNameFor(entry);
    let outcome;
    try {
      outcome = await uploadEntry(containerClient, entry);
    } catch {
      try {
        outcome = await uploadEntry(containerClient, entry);
      } catch (retryErr) {
        results.failed.push({
          path: blobName,
          error: (retryErr?.message || String(retryErr)).split("\n")[0],
        });
        outcome = "failed";
      }
    }
    if (outcome === "uploaded") results.uploaded.push(blobName);
    if (outcome === "skipped") results.skipped.push(blobName);
    if (outcome === "would-upload") results.wouldUpload.push(blobName);
    done += 1;
    if (done % 25 === 0 || done === manifest.files.length) {
      console.log(`  progress: ${done}/${manifest.files.length}`);
    }
  }
}

const queue = [...manifest.files];
await Promise.all(
  Array.from({ length: CONCURRENCY }, () => worker(queue)),
);

const reportPath = path.resolve("scripts/azure/upload-report.json");
await fs.writeFile(
  reportPath,
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      container: CONTAINER,
      dryRun: DRY_RUN,
      cacheControl: CACHE_CONTROL,
      total: manifest.files.length,
      uploaded: results.uploaded.length,
      skipped: results.skipped.length,
      wouldUpload: results.wouldUpload.length,
      failed: results.failed,
    },
    null,
    2,
  ),
);

const publicBase =
  process.env.AZURE_ASSETS_PUBLIC_URL?.replace(/\/+$/, "") ||
  (accountName ? `https://${accountName}.blob.core.windows.net/${CONTAINER}` : null);

console.log("");
console.log("──────────────────────────────────────────────");
console.log(`Total files : ${manifest.files.length}`);
console.log(`Uploaded    : ${results.uploaded.length}`);
console.log(`Skipped     : ${results.skipped.length} (identical md5 already in Azure)`);
if (DRY_RUN) console.log(`Would upload: ${results.wouldUpload.length}`);
console.log(`Failed      : ${results.failed.length}`);
console.log(`Report      : scripts/azure/upload-report.json`);
if (publicBase) console.log(`Public base : ${publicBase}`);
console.log("──────────────────────────────────────────────");

if (results.failed.length > 0) {
  for (const failure of results.failed) {
    console.error(`  FAILED ${failure.path} — ${failure.error}`);
  }
  console.error(
    "\nRe-run the same command to retry — already-uploaded files are skipped automatically.",
  );
  process.exit(1);
}
