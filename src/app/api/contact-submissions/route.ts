import { NextResponse } from "next/server";

/**
 * src/app/api/contact-submissions/route.ts
 * ----------------------------------------------------------------------------
 * Browser-facing endpoint that stores a Contact page form submission into
 * Strapi's `contact-form-details` collection.
 *
 * Flow:
 *   ContactForm / ContactMobile  --json-->  this route
 *   this route                   --json-->  Strapi POST /api/contact-form-details/submit
 *
 * Mirrors src/app/api/partner-inquiries/route.ts: input is validated here so
 * Strapi never receives junk, and the Strapi submit route has auth: false
 * (see cms/src/api/contact-form-detail/routes/submit.ts).
 * ----------------------------------------------------------------------------
 */

const STRAPI_URL = (
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://localhost:1338"
).replace(/\/$/, "");

const TRACKS = new Set(["sales", "developer", "media"]);

function bad(error: string, status = 422) {
  return NextResponse.json({ ok: false, error }, { status });
}

export async function POST(req: Request): Promise<Response> {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return bad("Expected a JSON body.", 400);
  }

  const track = String(body.track ?? "sales");
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim().slice(0, 5000);
  const subscribed = body.subscribed === true;

  let fields: Record<string, string> = {};
  if (body.fields && typeof body.fields === "object" && !Array.isArray(body.fields)) {
    fields = Object.fromEntries(
      Object.entries(body.fields as Record<string, unknown>)
        .slice(0, 20)
        .map(([k, v]) => [String(k).slice(0, 100), String(v ?? "").slice(0, 500)])
    );
  }

  if (!TRACKS.has(track)) {
    return bad("Invalid contact track.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return bad("Please enter a valid email address.");
  }

  const data = {
    track,
    email,
    fields,
    message,
    subscribed,
  };

  try {
    const res = await fetch(`${STRAPI_URL}/api/contact-form-details/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });

    if (res.ok) return NextResponse.json({ ok: true });

    // Strapi reachable but rejected (e.g. collection not registered yet) —
    // log the submission server-side and succeed. Hardcoded-first: the
    // contact page runs without any CMS wiring.
    console.log("[contact-submission] Strapi unavailable — logged submission:", JSON.stringify(data));
    return NextResponse.json({ ok: true });
  } catch {
    console.log("[contact-submission] Strapi unreachable — logged submission:", JSON.stringify(data));
    return NextResponse.json({ ok: true });
  }
}
