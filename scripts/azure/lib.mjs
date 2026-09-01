import { createHash } from "node:crypto";
import { createReadStream, readFileSync } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import { BlobServiceClient } from "@azure/storage-blob";
import { ClientSecretCredential } from "@azure/identity";

export const SKIP_FILES = new Set([".DS_Store"]);

export const CONTENT_TYPES = {
  avif: "image/avif",
  bin: "application/octet-stream",
  bmp: "image/bmp",
  css: "text/css; charset=utf-8",
  csv: "text/csv",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  eot: "application/vnd.ms-fontobject",
  gif: "image/gif",
  gz: "application/gzip",
  htm: "text/html; charset=utf-8",
  html: "text/html; charset=utf-8",
  ico: "image/x-icon",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  js: "text/javascript; charset=utf-8",
  json: "application/json; charset=utf-8",
  m4a: "audio/mp4",
  m4v: "video/mp4",
  mid: "audio/midi",
  mov: "video/quicktime",
  mp3: "audio/mpeg",
  mp4: "video/mp4",
  ogg: "audio/ogg",
  oga: "audio/ogg",
  ogv: "video/ogg",
  otf: "font/otf",
  pdf: "application/pdf",
  png: "image/png",
  ppt: "application/vnd.ms-powerpoint",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  psd: "image/vnd.adobe.photoshop",
  svg: "image/svg+xml",
  tif: "image/tiff",
  tiff: "image/tiff",
  ttf: "font/ttf",
  txt: "text/plain; charset=utf-8",
  url: "application/internet-shortcut",
  wav: "audio/wav",
  webm: "video/webm",
  webmanifest: "application/manifest+json",
  webp: "image/webp",
  woff: "font/woff",
  woff2: "font/woff2",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  xml: "application/xml",
  zip: "application/zip",
};

export function contentTypeFor(filePath) {
  const ext = path.extname(filePath).slice(1).toLowerCase();
  return CONTENT_TYPES[ext] || "application/octet-stream";
}

export function md5Base64(filePath) {
  return new Promise((resolve, reject) => {
    const hash = createHash("md5");
    const stream = createReadStream(filePath);
    stream.on("data", (chunk) => hash.update(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(hash.digest("base64")));
  });
}

export async function walkFiles(rootDir) {
  const files = [];
  const stack = ["."];
  while (stack.length > 0) {
    const current = stack.pop();
    const abs = path.join(rootDir, current);
    const entries = await fs.readdir(abs, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name.startsWith(".git")) continue;
      const rel = current === "." ? entry.name : `${current}/${entry.name}`;
      if (entry.isDirectory()) {
        stack.push(rel);
      } else if (entry.isFile()) {
        if (SKIP_FILES.has(entry.name)) continue;
        files.push(rel);
      }
    }
  }
  files.sort();
  return files;
}

export async function buildManifestEntry(rootName, sourceDir, relPath) {
  const abs = path.join(sourceDir, relPath);
  const stat = await fs.stat(abs);
  return {
    root: rootName,
    path: relPath,
    size: stat.size,
    md5: await md5Base64(abs),
    contentType: contentTypeFor(abs),
  };
}

export const ROOTS = [
  { root: "public", sourceDir: path.resolve("public"), blobPrefix: "" },
  {
    root: "strapi-uploads",
    sourceDir: path.resolve("cms/public/uploads"),
    blobPrefix: "strapi-uploads/",
  },
];

export async function buildManifest({ includeStrapi = false } = {}) {
  const roots = includeStrapi ? ROOTS : [ROOTS[0]];
  const files = [];
  const rootSummaries = {};
  for (const { root, sourceDir } of roots) {
    let stat;
    try {
      stat = await fs.stat(sourceDir);
    } catch {
      if (root === "strapi-uploads") continue;
      throw new Error(`Source directory not found: ${sourceDir}`);
    }
    if (!stat.isDirectory()) throw new Error(`Not a directory: ${sourceDir}`);
    const relPaths = await walkFiles(sourceDir);
    let totalBytes = 0;
    for (const relPath of relPaths) {
      const entry = await buildManifestEntry(root, sourceDir, relPath);
      totalBytes += entry.size;
      files.push(entry);
    }
    rootSummaries[root] = {
      sourceDir,
      fileCount: relPaths.length,
      totalBytes,
    };
  }
  return {
    version: 1,
    generatedAt: new Date().toISOString(),
    roots: rootSummaries,
    fileCount: files.length,
    totalBytes: files.reduce((sum, f) => sum + f.size, 0),
    files,
  };
}

export const MANIFEST_PATH = path.resolve("scripts/azure/asset-manifest.json");

export async function saveManifest(manifest) {
  await fs.mkdir(path.dirname(MANIFEST_PATH), { recursive: true });
  await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
}

export function blobNameFor(entry) {
  const root = ROOTS.find((r) => r.root === entry.root);
  return `${root.blobPrefix}${entry.path}`;
}

export function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

export function accountNameFromConnectionString(connectionString) {
  const match = connectionString.match(/AccountName=([^;]+)/);
  return match ? match[1] : null;
}

/**
 * Two supported auth modes:
 *  1. AZURE_STORAGE_CONNECTION_STRING          — shared-key auth
 *  2. Azure AD service principal (recommended):
 *       AZURE_STORAGE_ACCOUNT_NAME, AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET
 */
export function resolveStorageAuth() {
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
  if (connectionString) {
    return {
      kind: "connection-string",
      accountName: accountNameFromConnectionString(connectionString),
      connectionString,
    };
  }
  const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
  const tenantId = process.env.AZURE_TENANT_ID;
  const clientId = process.env.AZURE_CLIENT_ID;
  const clientSecret = process.env.AZURE_CLIENT_SECRET;
  if (accountName && tenantId && clientId && clientSecret) {
    return { kind: "aad", accountName, tenantId, clientId, clientSecret };
  }
  return null;
}

export function missingCredentialsHelp() {
  return [
    "",
    "Missing Azure credentials. Set ONE of these in .env:",
    "",
    "  Option A — service principal (what the team provisioned):",
    "    AZURE_STORAGE_ACCOUNT_NAME=ambientwebasset",
    "    AZURE_TENANT_ID=<directory (tenant) id>",
    "    AZURE_CLIENT_ID=<application (client) id>",
    "    AZURE_CLIENT_SECRET=<client secret value>",
    "",
    "  Option B — connection string:",
    "    AZURE_STORAGE_CONNECTION_STRING=DefaultEndpointsProtocol=https;AccountName=...;AccountKey=...;EndpointSuffix=core.windows.net",
    "",
    "  Also optional:",
    "    AZURE_STORAGE_CONTAINER_NAME  (default: assets)",
    "    AZURE_ASSETS_PUBLIC_URL       (public base URL used by the app)",
    "",
  ].join("\n");
}

export function createBlobServiceClient() {
  const auth = resolveStorageAuth();
  if (!auth) return null;
  if (auth.kind === "connection-string") {
    return {
      client: BlobServiceClient.fromConnectionString(auth.connectionString),
      accountName: auth.accountName,
      authKind: auth.kind,
    };
  }
  const credential = new ClientSecretCredential(
    auth.tenantId,
    auth.clientId,
    auth.clientSecret,
  );
  const endpoint = `https://${auth.accountName}.blob.core.windows.net`;
  return {
    client: new BlobServiceClient(endpoint, credential),
    accountName: auth.accountName,
    authKind: auth.kind,
  };
}

export function parseArgs(argv) {
  const args = { _: [] };
  for (const arg of argv.slice(2)) {
    if (arg.startsWith("--")) {
      const body = arg.slice(2);
      const eq = body.indexOf("=");
      if (eq === -1) {
        args[body] = true;
      } else {
        args[body.slice(0, eq)] = body.slice(eq + 1);
      }
    } else {
      args._.push(arg);
    }
  }
  return args;
}

export function loadDotEnv(filePath = ".env") {
  try {
    const raw = readFileSync(filePath, "utf8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!(key in process.env)) process.env[key] = value;
    }
  } catch {
    // no .env file — rely on real environment variables
  }
}
