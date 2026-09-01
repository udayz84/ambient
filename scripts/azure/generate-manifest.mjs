import { buildManifest, formatBytes, parseArgs, saveManifest } from "./lib.mjs";

const args = parseArgs(process.argv);
const includeStrapi = args["with-strapi"] === true;

console.log("Scanning local assets…");
const manifest = await buildManifest({ includeStrapi });
await saveManifest(manifest);

for (const [root, summary] of Object.entries(manifest.roots)) {
  console.log(
    `  ${root}: ${summary.fileCount} files (${formatBytes(summary.totalBytes)}) from ${summary.sourceDir}`,
  );
}
console.log(
  `Manifest written: ${manifest.fileCount} files, ${formatBytes(manifest.totalBytes)} total → scripts/azure/asset-manifest.json`,
);
