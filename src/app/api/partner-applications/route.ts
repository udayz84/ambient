import { NextResponse, after } from "next/server";
import { sendSubmissionMail } from "@/lib/notify-mail";
import { addContactAndTag } from "@/lib/mailchimp";

/**
 * src/app/api/partner-applications/route.ts
 * ----------------------------------------------------------------------------
 * Browser-facing endpoint that stores a Partners "Become a Partner"
 * application into Strapi's `partner-applications` collection
 * (partner-side ask — deliberately distinct from partner-inquiries).
 *
 * Flow:
 *   PartnersBecome  --json-->  this route
 *   this route      --json-->  Strapi POST /api/partner-applications/submit
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

  const name = String(body.name ?? "").trim();
  const company = String(body.company ?? "").trim();
  const website = String(body.website ?? "").trim();
  const email = String(body.email ?? "").trim();
  const region = String(body.region ?? "").trim();
  const capabilities = Array.isArray(body.capabilities)
    ? body.capabilities.map((c) => String(c).trim()).filter(Boolean).slice(0, 10)
    : [];
  const experience = String(body.experience ?? "").trim();

  if (!name || !company) {
    return bad("Name and company are required.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return bad("Please enter a valid work email address.");
  }
  const domain = email.split("@")[1]?.toLowerCase() ?? "";
  if (CASUAL_EMAIL_DOMAINS.has(domain)) {
    return bad("Please use your work email address — personal email domains are blocked.");
  }
  if (!region) {
    return bad("Please select your region.");
  }
  if (capabilities.length === 0) {
    return bad("Please select at least one capability area.");
  }

  const data = {
    name,
    company,
    website,
    email,
    region,
    capabilities,
    experience,
  };

  const mailPayload = () => ({
    formName: "Partner Application (Become a Partner)",
    replyTo: email,
    fields: [
      { label: "Name", value: name },
      { label: "Company", value: company },
      { label: "Website", value: website },
      { label: "Email", value: email },
      { label: "Region", value: region },
      { label: "Capability areas", value: capabilities.join(", ") },
      { label: "Experience", value: experience },
    ],
  });

  try {
    const res = await fetch(`${STRAPI_URL}/api/partner-applications/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });

    if (!res.ok) {
      console.log("[partner-application] Strapi unavailable — logged submission:", JSON.stringify(data));
    }

    await sendSubmissionMail(mailPayload());

    // Sync to Mailchimp (transactional — no marketing consent)
    after(() => {
      addContactAndTag(
        { email, firstName: name, company },
        "partner-application",
        false,
      ).catch(() => { /* logged inside addContactAndTag */ });
    });

    return NextResponse.json({ ok: true });
  } catch {
    console.log("[partner-application] Strapi unreachable — logged submission:", JSON.stringify(data));
    await sendSubmissionMail(mailPayload());

    // Sync to Mailchimp (transactional — no marketing consent)
    after(() => {
      addContactAndTag(
        { email, firstName: name, company },
        "partner-application",
        false,
      ).catch(() => { /* logged inside addContactAndTag */ });
    });

    return NextResponse.json({ ok: true });
  }
}
