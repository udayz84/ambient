import { execFileSync } from "node:child_process";
import { createReadStream } from "node:fs";
import { appendFile, readFile, stat } from "node:fs/promises";

const config = JSON.parse(await readFile(new URL("./deployment-config.json", import.meta.url), "utf8"));
const [packagePath, manifestPath] = process.argv.slice(2);
if (!packagePath || !manifestPath) throw new Error("Usage: node deploy-web.mjs <source.zip> <manifest.json>");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
if (!/^[a-f0-9]{40}$/.test(manifest.commit)) throw new Error("Invalid deployment commit.");
const packageSize = (await stat(packagePath)).size;
let credentials;
try {
  credentials = JSON.parse(execFileSync("az", [
    "webapp", "deployment", "list-publishing-credentials",
    "--name", config.appName, "--resource-group", config.resourceGroup,
    "--subscription", config.subscriptionId, "--output", "json", "--only-show-errors",
  ], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }));
} catch {
  // Never print child-process output: it can contain publishing credentials.
  throw new Error("Azure could not obtain deployment access for asi-prod-web.");
}
if (!credentials.publishingUserName || !credentials.publishingPassword) throw new Error("Website deployment credentials are unavailable.");
const authorization = "Basic " + Buffer.from(`${credentials.publishingUserName}:${credentials.publishingPassword}`).toString("base64");
credentials = undefined;

function statusUrl(location) {
  const url = new URL(location, config.kuduOrigin);
  if (url.origin !== config.kuduOrigin || !url.pathname.startsWith("/api/deployments/")) {
    throw new Error("Unexpected deployment status endpoint; do not retry the upload blindly.");
  }
  return url;
}

async function terminalOutput(id) {
  if (process.env.GITHUB_OUTPUT) {
    await appendFile(process.env.GITHUB_OUTPUT, `terminal=true\ndeployment_id=${id}\n`);
  }
}

const uploadUrl = new URL("/api/zipdeploy", config.kuduOrigin);
uploadUrl.search = new URLSearchParams({ isAsync: "true", deployer: "GitHubActions", message: `GitHub cms ${manifest.commit}` });
const stream = createReadStream(packagePath);
let response;
try {
  response = await fetch(uploadUrl, {
    method: "POST", redirect: "manual", duplex: "half", body: stream,
    headers: { Authorization: authorization, "Content-Type": "application/zip", "Content-Length": String(packageSize) },
    signal: AbortSignal.timeout(10 * 60_000),
  });
} finally {
  stream.destroy();
}
if (![200, 202].includes(response.status)) throw new Error(`Website package upload failed: HTTP ${response.status}.`);
const location = response.headers.get("location");
await response.body?.cancel();
if (!location) throw new Error("Azure did not return a deployment status URL; inspect the app before retrying.");
const pollUrl = statusUrl(location);
console.log(`Uploaded ${manifest.commit} to ${config.appName}; waiting for the Azure production build.`);
const deadline = Date.now() + 35 * 60_000;
let previousStatus;
let completed = false;
while (Date.now() < deadline) {
  const poll = await fetch(pollUrl, { headers: { Authorization: authorization }, signal: AbortSignal.timeout(45_000) });
  if (!poll.ok) throw new Error(`Cannot read deployment status: HTTP ${poll.status}. Inspect Azure before retrying.`);
  const state = await poll.json();
  if (state.status !== previousStatus) console.log(`Azure deployment ${state.id}: status ${state.status}`);
  previousStatus = state.status;
  if (state.status === 3) {
    await terminalOutput(state.id);
    throw new Error(`Azure build failed. Deployment ${state.id}; check Deployment Center logs.`);
  }
  if (state.status === 4 && state.complete && state.active) {
    await terminalOutput(state.id);
    console.log(`Azure deployment completed: ${state.id}`);
    completed = true;
    break;
  }
  await new Promise((resolve) => setTimeout(resolve, 20_000));
}
if (!completed) {
  throw new Error("Azure deployment is still running. Automatic rollback was not started to avoid overlapping deployments; inspect Deployment Center.");
}
