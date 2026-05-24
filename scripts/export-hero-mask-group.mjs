import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

// WARNING: Figma screenshots of 2379:735/737 currently bake in nav/headline/metrics text.
// Do not overwrite hero-visual-fill.png — use a chip+trails-only raster from Dev Mode export.
const OUT = resolve("public/hero/hero-visual-screenshot.png");

const transport = new StreamableHTTPClientTransport(
  new URL("http://127.0.0.1:3845/mcp"),
);
const client = new Client({ name: "ambient-export", version: "1.0.0" });

await client.connect(transport);

const result = await client.callTool({
  name: "get_screenshot",
  arguments: { nodeId: "2379:735", contentsOnly: true },
});

const content = result.content ?? [];
let saved = false;

for (const part of content) {
  if (part.type === "image" && part.data) {
    const buf = Buffer.from(part.data, part.mimeType?.includes("png") ? "base64" : "base64");
    writeFileSync(OUT, buf);
    saved = true;
    console.log(`Wrote ${OUT} (${buf.length} bytes, ${part.mimeType ?? "image"})`);
    break;
  }
}

if (!saved) {
  console.error("No image in MCP response. Parts:", JSON.stringify(content.map((p) => p.type)));
  process.exit(1);
}

await client.close();
