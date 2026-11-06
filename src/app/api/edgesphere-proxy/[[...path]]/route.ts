import { NextRequest, NextResponse } from "next/server";
import https from "node:https";
import http from "node:http";

export const dynamic = "force-dynamic";

const UPSTREAM_HOST = "180.151.197.37";
const UPSTREAM_PORT = 8444;
const PROXY_BASE_PATH = "/api/edgesphere-proxy";

// Ignore self-signed certificates for upstream proxy calls
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

interface UpstreamResponse {
  statusCode: number;
  headers: http.IncomingHttpHeaders;
  body: Buffer;
}

function forwardToUpstream(
  method: string,
  pathname: string,
  search: string,
  incomingHeaders: Headers,
  requestBody?: Buffer
): Promise<UpstreamResponse> {
  return new Promise((resolve, reject) => {
    const upstreamHeaders: Record<string, string> = {
      accept: incomingHeaders.get("accept") || "*/*",
      "user-agent": incomingHeaders.get("user-agent") || "Ambient-Proxy/1.0",
    };

    const contentType = incomingHeaders.get("content-type");
    if (contentType) upstreamHeaders["content-type"] = contentType;

    const req = https.request(
      {
        hostname: UPSTREAM_HOST,
        port: UPSTREAM_PORT,
        path: `${pathname}${search || ""}`,
        method,
        agent: httpsAgent,
        headers: upstreamHeaders,
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on("data", (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
        res.on("end", () => {
          resolve({
            statusCode: res.statusCode || 200,
            headers: res.headers,
            body: Buffer.concat(chunks),
          });
        });
      }
    );

    req.on("error", (err) => {
      reject(err);
    });

    if (requestBody && requestBody.length > 0) {
      req.write(requestBody);
    }
    req.end();
  });
}

async function handleProxy(
  req: NextRequest,
  context: { params: Promise<{ path?: string[] }> }
) {
  try {
    const { path } = await context.params;
    // URL-encode each path segment to handle filenames with spaces (e.g., 'amb_logo 1.png')
    const pathJoined = path ? path.map((seg) => encodeURIComponent(seg)).join("/") : "";
    const upstreamPath = `/${pathJoined}`;
    const search = req.nextUrl.search;

    let bodyBuffer: Buffer | undefined;
    if (req.method !== "GET" && req.method !== "HEAD") {
      const arrayBuffer = await req.arrayBuffer();
      bodyBuffer = Buffer.from(arrayBuffer);
    }

    const upstream = await forwardToUpstream(
      req.method,
      upstreamPath,
      search,
      req.headers,
      bodyBuffer
    );

    const contentType =
      (upstream.headers["content-type"] as string) || "application/octet-stream";

    let responseBody: Buffer = upstream.body;

    // If serving HTML (index page), inject base href so relative bundles resolve through proxy
    if (contentType.includes("text/html")) {
      let html = responseBody.toString("utf8");
      if (html.includes("<head>")) {
        html = html.replace(
          "<head>",
          `<head><base href="${PROXY_BASE_PATH}/" />`
        );
      }
      responseBody = Buffer.from(html, "utf8");
    }

    // If serving the main React bundle, ensure cloud API calls route through the proxy
    if (
      upstreamPath.includes("/static/js/main.") &&
      contentType.includes("javascript")
    ) {
      let js = responseBody.toString("utf8");
      js = js.replace(
        'REACT_APP_CLOUD_API:"/api"',
        `REACT_APP_CLOUD_API:"${PROXY_BASE_PATH}/api"`
      );
      js = js.replace('La="/api"', `La="${PROXY_BASE_PATH}/api"`);
      responseBody = Buffer.from(js, "utf8");
    }

    // Build clean response headers without X-Frame-Options restriction
    const outHeaders = new Headers();
    outHeaders.set("Content-Type", contentType);

    // Explicitly allow embedding inside Ambient
    outHeaders.set("X-Frame-Options", "ALLOWALL");
    outHeaders.delete("x-frame-options");

    // Cache control
    if (upstreamPath.startsWith("/static/")) {
      outHeaders.set("Cache-Control", "public, max-age=31536000, immutable");
    } else {
      outHeaders.set("Cache-Control", "no-cache, no-store, must-revalidate");
    }

    return new NextResponse(new Uint8Array(responseBody), {
      status: upstream.statusCode,
      headers: outHeaders,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "EdgeSphere upstream unreachable", details: message },
      { status: 502 }
    );
  }
}

export const GET = handleProxy;
export const POST = handleProxy;
export const PUT = handleProxy;
export const DELETE = handleProxy;
export const PATCH = handleProxy;
export const HEAD = handleProxy;
