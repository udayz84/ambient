import { NextResponse } from "next/server";

/**
 * src/app/api/job-applicants/route.ts
 * ----------------------------------------------------------------------------
 * Browser-facing endpoint that stores a careers "Apply Now" form submission
 * into Strapi's `job-applications` collection.
 *
 * Flow:
 *   CareersApplicationModal  --multipart-->  this route
 *   this route               --multipart-->  Strapi POST /api/job-applications/submit
 *
 * The Strapi `submit` route is a custom controller with `auth: false`
 * (see cms/src/api/job-application/routes/submit.ts), so no API token is
 * required. This route validates input before forwarding so Strapi never
 * receives junk, and keeps the Strapi URL/token server-side only.
 * ----------------------------------------------------------------------------
 */

const STRAPI_URL = (
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://localhost:1338"
).replace(/\/$/, "");

function bad(error: string, status = 422) {
  return NextResponse.json({ ok: false, error }, { status });
}

export async function POST(req: Request): Promise<Response> {
  let incoming: FormData;
  try {
    incoming = await req.formData();
  } catch {
    return bad("Expected multipart/form-data.", 400);
  }

  const fullName = String(incoming.get("fullName") ?? "").trim();
  const email = String(incoming.get("email") ?? "").trim();
  const phone = String(incoming.get("phone") ?? "").trim();
  const role = String(incoming.get("role") ?? "").trim();
  const otherRole = String(incoming.get("otherRole") ?? "").trim();
  const coverLetter = String(incoming.get("coverLetter") ?? "").trim();
  const consentRaw = incoming.get("consent");
  const consent = consentRaw === "true" || consentRaw === "1";
  const resume = incoming.get("resume");

  if (!fullName || !email || !phone) {
    return bad("Full name, email and phone number are required.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return bad("Please enter a valid email address.");
  }

  const data = {
    full_name: fullName,
    email,
    phone,
    role,
    other_role: otherRole,
    cover_letter: coverLetter,
    consent,
  };

  // Rebuild as multipart so the resume file (if any) is uploaded in the same
  // request as the entry — Strapi's core create handles `data` + `files.*`.
  const strapiForm = new FormData();
  strapiForm.append("data", JSON.stringify(data));

  if (resume && typeof resume !== "string") {
    const file = resume as File;
    if (file.size > 0) {
      strapiForm.append("resume", file, file.name || "resume");
    }
  }

  const init: RequestInit & { duplex?: "half" } = {
    method: "POST",
    body: strapiForm,
    // Required by undici (Node) when the body contains a streamed File.
    duplex: "half",
  };

  try {
    const res = await fetch(`${STRAPI_URL}/api/job-applications/submit`, init);

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return NextResponse.json(
        {
          ok: false,
          error: "Could not save your application. Please try again.",
          detail,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "Application service is unavailable. Please try again later.",
      },
      { status: 502 }
    );
  }
}
