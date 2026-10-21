import { mkdir, readFile, writeFile } from "node:fs/promises";

// The package manifest is created from a committed Git tree by the CI packager.
// Ordinary local builds do not need a deployment marker.
let manifest;
try {
  manifest = JSON.parse(await readFile(".ambient-release.json", "utf8"));
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

if (manifest) {
  if (!/^[a-f0-9]{40}$/.test(manifest.commit)) {
    throw new Error("Invalid deployment commit in release manifest.");
  }
  const buildId = (await readFile(".next/BUILD_ID", "utf8")).trim();
  await mkdir(".next/static", { recursive: true });
  await writeFile(
    ".next/static/ambient-release.json",
    JSON.stringify({ schema: 1, commit: manifest.commit, buildId }),
  );
  console.log(`Release marker: ${manifest.commit}, build ${buildId}`);
}
