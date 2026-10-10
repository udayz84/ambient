import { NextResponse, after } from "next/server";
import { sendSubmissionMail } from "@/lib/notify-mail";
import { addContactAndTag } from "@/lib/mailchimp";

/**
 * src/app/api/partner-inquiries/route.ts
 * ----------------------------------------------------------------------------
 * Browser-facing endpoint that stores a Partners "Get Matched" submission
 * into Strapi's `partner-inquiries` collection (customer-side ask).
 *
 * Flow:
 *   PartnersMatchForm  --json-->  this route
 *   this route         --json-->  Strapi POST /api/partner-inquiries/submit
 *
 * Mirrors src/app/api/job-applicants/route.ts: input is validated here so
 * Strapi never receives junk, and the Strapi submit route has auth: false
 * (see cms/src/api/partner-inquiry/routes/submit.ts).
 * ----------------------------------------------------------------------------
 */

const STRAPI_URL = (
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://localhost:1338"
).replace(/\/$/, "");

const CASUAL_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "ymail.com",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "msn.com",
  "icloud.com",
  "me.com",
  "aol.com",
  "protonmail.com",
  "proton.me",
  "mail.com",
  "gmx.com",
  "zoho.com",
  "yandex.com",
  "qq.com",
  "163.com",
]);

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

  const firstName = String(body.firstName ?? "").trim();
  const lastName = String(body.lastName ?? "").trim();
  const company = String(body.company ?? "").trim();
  const email = String(body.email ?? "").trim();
  const region = String(body.region ?? "").trim();
  const helpAreas = Array.isArray(body.helpAreas)
    ? body.helpAreas.map((a) => String(a).trim()).filter(Boolean).slice(0, 10)
    : [];
  const message = String(body.message ?? "").trim();

  if (!firstName || !lastName || !company) {
    return bad("First name, last name and company are required.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return bad("Please enter a valid email address.");
  }
  const domain = email.split("@")[1]?.toLowerCase() ?? "";
  if (CASUAL_EMAIL_DOMAINS.has(domain)) {
    return bad("Please use your corporate email address — personal email domains are blocked.");
  }
  if (!region) {
    return bad("Please select your region.");
  }

  const data = {
    first_name: firstName,
    last_name: lastName,
    company,
    email,
    region,
    help_areas: helpAreas,
    message,
  };

  const mailPayload = () => ({
    formName: "Partner Inquiry (Get Matched)",
    replyTo: email,
    fields: [
      { label: "First name", value: firstName },
      { label: "Last name", value: lastName },
      { label: "Company", value: company },
      { label: "Email", value: email },
      { label: "Region", value: region },
      { label: "Help areas", value: helpAreas.join(", ") },
      { label: "Message", value: message },
    ],
  });

  try {
    const res = await fetch(`${STRAPI_URL}/api/partner-inquiries/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });

    if (!res.ok) {
      console.log("[partner-inquiry] Strapi unavailable — logged submission:", JSON.stringify(data));
    }

    await sendSubmissionMail(mailPayload());

    // Sync to Mailchimp (transactional — no marketing consent)
    after(() => {
      addContactAndTag(
        { email, firstName, lastName, company },
        "partner-inquiry",
        false,
      ).catch(() => { /* logged inside addContactAndTag */ });
    });

    return NextResponse.json({ ok: true });
  } catch {
    console.log("[partner-inquiry] Strapi unreachable — logged submission:", JSON.stringify(data));
    await sendSubmissionMail(mailPayload());

    // Sync to Mailchimp (transactional — no marketing consent)
    after(() => {
      addContactAndTag(
        { email, firstName, lastName, company },
        "partner-inquiry",
        false,
      ).catch(() => { /* logged inside addContactAndTag */ });
    });

    return NextResponse.json({ ok: true });
  }
}
