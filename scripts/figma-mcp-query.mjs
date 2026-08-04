/**
 * Query the Figma Dev Mode MCP server (http://127.0.0.1:3845) with a proper
 * MCP handshake and dump results to files.
 *
 * Usage:
 *   node scripts/figma-mcp-query.mjs <nodeId> [outPrefix]
 * Example:
 *   node scripts/figma-mcp-query.mjs 3708:462 alwayson
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const BASE = process.env.FIGMA_MCP_BASE ?? "http://127.0.0.1:3845/mcp";
const FILE_KEY = process.env.FIGMA_FILE_KEY ?? "xwsTDujqZsHTQtJL7G8qW0";
const NODE_ID = process.argv[2];
const PREFIX = process.argv[3] ?? "figma";
const OUT_DIR = resolve("scripts/.figma-cache");

if (!NODE_ID) {
  console.error("nodeId required, e.g. 3708:462");
  process.exit(1);
}

function parseSse(text) {
  // Collect JSON payloads from SSE "data:" lines
  const payloads = [];
  for (const line of text.split("\n")) {
    if (line.startsWith("data:")) {
      const body = line.slice(5).trim();
      if (body) {
        try {
          payloads.push(JSON.parse(body));
        } catch {
          /* ignore non-JSON lines */
        }
      }
    }
  }
  return payloads;
}

async function rpc(method, params, sessionId) {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json, text/event-stream",
  };
  if (sessionId) headers["mcp-session-id"] = sessionId;
  const res = await fetch(BASE, {
    method: "POST",
    headers,
    body: JSON.stringify({ jsonrpc: "2.0", id: Date.now(), method, params }),
  });
  const text = await res.text();
  const newSession = res.headers.get("mcp-session-id") ?? sessionId;
  let parsed = null;
  try {
    parsed = JSON.parse(text);
  } catch {
    parsed = parseSse(text).at(-1) ?? null;
  }
  return { parsed, sessionId: newSession, raw: text, status: res.status };
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });

  const init = await rpc("initialize", {
    protocolVersion: "2025-03-26",
    capabilities: {},
    clientInfo: { name: "ambient-figma-query", version: "1.0.0" },
  });
  if (!init.parsed?.result) {
    console.error("initialize failed:", init.raw.slice(0, 500));
    process.exit(1);
  }
  const sessionId = init.sessionId;
  console.log("initialized; session:", sessionId ?? "(none)");

  await fetch(BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
      ...(sessionId ? { "mcp-session-id": sessionId } : {}),
    },
    body: JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" }),
  });

  const tools = await rpc("tools/list", {}, sessionId);
  const toolNames =
    tools.parsed?.result?.tools?.map((t) => t.name) ?? [];
  console.log("tools:", toolNames.join(", "));

  const call = async (name, args, outFile) => {
    const r = await rpc("tools/call", { name, arguments: args }, sessionId);
    const content = r.parsed?.result?.content ?? [];
    const text = content
      .filter((c) => c.type === "text")
      .map((c) => c.text)
      .join("\n");
    if (outFile) {
      writeFileSync(resolve(OUT_DIR, outFile), text || r.raw);
      console.log(`wrote scripts/.figma-cache/${outFile} (${(text || r.raw).length} chars)`);
    }
    return text;
  };

  if (toolNames.includes("get_design_context")) {
    await call(
      "get_design_context",
      {
        nodeId: NODE_ID,
        fileKey: FILE_KEY,
        disableCodeConnect: false,
      },
      `${PREFIX}-context.txt`,
    );
  }
  if (toolNames.includes("get_motion_context")) {
    await call(
      "get_motion_context",
      { nodeId: NODE_ID, fileKey: FILE_KEY },
      `${PREFIX}-motion.txt`,
    );
  }
  if (toolNames.includes("get_screenshot")) {
    const r = await rpc(
      "tools/call",
      { name: "get_screenshot", arguments: { nodeId: NODE_ID } },
      sessionId,
    );
    const content = r.parsed?.result?.content ?? [];
    const img = content.find((c) => c.type === "image");
    if (img?.data) {
      const ext = img.mimeType?.includes("png") ? "png" : "jpg";
      writeFileSync(
        resolve(OUT_DIR, `${PREFIX}-screenshot.${ext}`),
        Buffer.from(img.data, "base64"),
      );
      console.log(`wrote scripts/.figma-cache/${PREFIX}-screenshot.${ext}`);
    } else {
      writeFileSync(resolve(OUT_DIR, `${PREFIX}-screenshot-raw.txt`), r.raw);
      console.log("screenshot: no image content, raw saved");
    }
  }
  if (toolNames.includes("get_variable_defs")) {
    await call("get_variable_defs", { nodeId: NODE_ID }, `${PREFIX}-variables.txt`);
  }
  if (toolNames.includes("get_metadata")) {
    await call("get_metadata", { nodeId: NODE_ID }, `${PREFIX}-metadata.txt`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
