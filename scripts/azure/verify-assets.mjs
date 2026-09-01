import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import {
  blobNameFor,
  buildManifest,
  createBlobServiceClient,
  formatBytes,
  loadDotEnv,
  md5Base64,
  missingCredentialsHelp,
  parseArgs,
  saveManifest,
} from "./lib.mjs";

loadDotEnv();

const args = parseArgs(process.argv);
const DEEP = args.deep === true;
const INCLUDE_STRAPI = args["with-strapi"] === true;

const SERVICE = createBlobServiceClient();
if (!SERVICE) {
  console.error(missingCredentialsHelp());
  process.exit(1);
}

const CONTAINER =
  (typeof args.container === "string" && args.container) ||
  process.env.AZURE_STORAGE_CONTAINER_NAME ||
  "assets";

console.log("Rebuilding local manifest (source of truth)…");
const manifest = await buildManifest({ includeStrapi: INCLUDE_STRAPI });
await saveManifest(manifest);
console.log(`  ${manifest.fileCount} local files (${formatBytes(manifest.totalBytes)})`);

const blobServiceClient = SERVICE.client;
const containerClient = blobServiceClient.getContainerClient(CONTAINER);

console.log(`Listing every blob in container "${CONTAINER}"…`);
const remote = new Map();
for await (const blob of containerClient.listBlobsFlat()) {
  remote.set(blob.name, blob);
}
console.log(`  ${remote.size} blobs found in Azure`);

const missing = [];
const md5Mismatches = [];
const sizeMismatches = [];

function remoteMd5(blob) {
  return blob.properties.contentMD5
    ? Buffer.from(blob.properties.contentMD5).toString("base64")
    : null;
}

for (const entry of manifest.files) {
  const blobName = blobNameFor(entry);
  const blob = remote.get(blobName);
  if (!blob) {
    missing.push(blobName);
    continue;
  }
  const size = blob.properties.contentLength ?? 0;
  if (size !== entry.size) {
    sizeMismatches.push({
      path: blobName,
      local: entry.size,
      remote: size,
    });
    continue;
  }
  // Every blob uploaded by our tool carries a Content-MD5. A blob without one
  // was NOT uploaded by this pipeline (or was overwritten) → must be flagged,
  // otherwise a same-size corrupted replacement would silently pass.
  const remoteHash = remoteMd5(blob);
  if (!remoteHash) {
    md5Mismatches.push({
      path: blobName,
      local: entry.md5,
      remote: null,
      note: "blob has no Content-MD5 — re-upload it",
    });
  } else if (remoteHash !== entry.md5) {
    md5Mismatches.push({
      path: blobName,
      local: entry.md5,
      remote: remoteHash,
    });
  }
}

if (DEEP) {
  console.log("Deep verification: downloading + hashing every blob…");
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "azure-verify-"));
  const alreadyFailed = new Set([
    ...missing,
    ...sizeMismatches.map((m) => m.path),
    ...md5Mismatches.map((m) => m.path),
  ]);
  let verified = 0;
  for (const entry of manifest.files) {
    const blobName = blobNameFor(entry);
    if (alreadyFailed.has(blobName)) continue;
    const tmpFile = path.join(tmpDir, blobName.replace(/[/\\]/g, "__"));
    await containerClient.getBlobClient(blobName).downloadToFile(tmpFile);
    const downloadedMd5 = await md5Base64(tmpFile);
    if (downloadedMd5 !== entry.md5) {
      md5Mismatches.push({
        path: blobName,
        local: entry.md5,
        remote: downloadedMd5,
        note: "deep (download + re-hash)",
      });
    }
    verified += 1;
    if (verified % 50 === 0) console.log(`  deep: ${verified}/${manifest.files.length}`);
    await fs.rm(tmpFile, { force: true });
  }
  await fs.rm(tmpDir, { recursive: true, force: true });
}

const expectedNames = new Set(manifest.files.map((entry) => blobNameFor(entry)));
const extras = [...remote.keys()].filter((name) => !expectedNames.has(name));

const ok = missing.length === 0 && md5Mismatches.length === 0 && sizeMismatches.length === 0;

const report = {
  generatedAt: new Date().toISOString(),
  container: CONTAINER,
  deep: DEEP,
  localFiles: manifest.files.length,
  remoteBlobs: remote.size,
  verifiedOk: manifest.files.length - missing.length - md5Mismatches.length - sizeMismatches.length,
  missing,
  md5Mismatches,
  sizeMismatches,
  extrasInAzureOnly: extras,
};

await fs.writeFile(
  path.resolve("scripts/azure/verify-report.json"),
  JSON.stringify(report, null, 2),
);

console.log("");
console.log("──────────────────────────────────────────────");
console.log(`Local files          : ${manifest.files.length}`);
console.log(`Blobs in Azure       : ${remote.size}`);
console.log(`Verified identical   : ${report.verifiedOk}`);
console.log(`Missing in Azure     : ${missing.length}`);
console.log(`MD5 mismatches       : ${md5Mismatches.length}`);
console.log(`Size mismatches      : ${sizeMismatches.length}`);
console.log(`In Azure only (info) : ${extras.length}`);
console.log(`Report               : scripts/azure/verify-report.json`);
console.log("──────────────────────────────────────────────");

if (!ok) {
  for (const name of missing) console.error(`  MISSING    ${name}`);
  for (const m of md5Mismatches) console.error(`  MD5 DIFF   ${m.path}`);
  for (const m of sizeMismatches) console.error(`  SIZE DIFF  ${m.path} local=${m.local} remote=${m.remote}`);
  process.exit(1);
}

console.log("ALL ASSETS VERIFIED — nothing missing, nothing altered.");
