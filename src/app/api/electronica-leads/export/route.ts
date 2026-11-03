import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const STRAPI_URL = (
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://127.0.0.1:1338"
)
  .replace(/\/$/, "")
  .replace("localhost", "127.0.0.1");

/**
 * GET /api/electronica-leads/export
 * Proxies to Strapi's CSV export endpoint so leads can be downloaded
 * and shared easily with team members directly from the website.
 */
export async function GET(): Promise<Response> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/electronica-leads/export`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: "Failed to export leads from Strapi." },
        { status: res.status }
      );
    }

    const csvText = await res.text();
    const dateStr = new Date().toISOString().split("T")[0];
    const filename = `electronica-leads-${dateStr}.csv`;

    return new Response(csvText, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (error) {
    console.error("[electronica-leads-export] error:", error);
    return NextResponse.json(
      { ok: false, error: "Strapi service unavailable." },
      { status: 503 }
    );
  }
}

