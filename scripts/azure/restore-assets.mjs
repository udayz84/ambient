import fs from "node:fs/promises";
import path from "node:path";
import {
  createBlobServiceClient,
  formatBytes,
  loadDotEnv,
  md5Base64,
  missingCredentialsHelp,
  parseArgs,
} from "./lib.mjs";

loadDotEnv();

const args = parseArgs(process.argv);
const CONCURRENCY = Math.max(1, Number(args.concurrency) || 8);

const SERVICE = createBlobServiceClient();
if (!SERVICE) {
  console.error(missingCredentialsHelp());
  process.exit(1);
}

const CONTAINER =
  (typeof args.container === "string" && args.container) ||
  process.env.AZURE_STORAGE_CONTAINER_NAME ||
  "assets";
const OUT_DIR = path.resolve(
  (typeof args.out === "string" && args.out) ||
    path.join("restored-assets", CONTAINER),
);

const blobServiceClient = SERVICE.client;
const containerClient = blobServiceClient.getContainerClient(CONTAINER);

console.log(`Listing blobs in container "${CONTAINER}"…`);
const blobs = [];
for await (const blob of containerClient.listBlobsFlat()) {
  blobs.push(blob);
}
console.log(`  ${blobs.length} blobs found. Restoring to ${OUT_DIR}`);

const failures = [];
let bytes = 0;
let done = 0;

// Guard against path traversal — a blob name like "../evil" or "a/../../evil"
// must never escape the output directory.
function safeTargetPath(blobName) {
  const segments = blobName.split("/");
  for (const segment of segments) {
    if (segment === "" || segment === "." || segment === ".." || segment.includes("\\")) {
      return null;
    }
  }
  return path.join(OUT_DIR, ...segments);
}

async function worker(queue) {
  while (queue.length > 0) {
    const blob = queue.shift();
    try {
      const target = safeTargetPath(blob.name);
      if (!target) {
        failures.push({ path: blob.name, error: "unsafe blob name (path traversal) — skipped" });
        continue;
      }
      await fs.mkdir(path.dirname(target), { recursive: true });
      let skip = false;
      try {
        const localMd5 = await md5Base64(target);
        const remoteMd5 = blob.properties.contentMD5
          ? Buffer.from(blob.properties.contentMD5).toString("base64")
          : null;
        if (remoteMd5 && remoteMd5 === localMd5) skip = true;
      } catch {
        // local file missing → download
      }
      if (!skip) {
        await containerClient.getBlobClient(blob.name).downloadToFile(target);
        bytes += blob.properties.contentLength ?? 0;
      }
    } catch (err) {
      failures.push({ path: blob.name, error: (err?.message || String(err)).split("\n")[0] });
    }
    done += 1;
    if (done % 25 === 0 || done === blobs.length) {
      console.log(`  progress: ${done}/${blobs.length}`);
    }
  }
}

const queue = [...blobs];
await Promise.all(
  Array.from({ length: CONCURRENCY }, () => worker(queue)),
);

console.log("");
console.log("──────────────────────────────────────────────");
console.log(`Blobs restored : ${blobs.length - failures.length}/${blobs.length}`);
console.log(`Data downloaded: ${formatBytes(bytes)}`);
console.log(`Failures       : ${failures.length}`);
console.log("──────────────────────────────────────────────");
for (const failure of failures) console.error(`  FAILED ${failure.path} — ${failure.error}`);
if (failures.length > 0) process.exit(1);
