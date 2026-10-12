import { NextResponse, after } from "next/server";
import { addContactAndTag } from "@/lib/mailchimp";
import { sendSubmissionMail, type MailField } from "@/lib/notify-mail";

/**
 * src/app/api/newsletter/route.ts
 * ----------------------------------------------------------------------------
 * Browser-facing endpoint for newsletter, waitlist, upcoming-product,
 * product-brief, and resource-download form submissions.
 *
 * These forms previously had no backend — they now sync to Mailchimp.
 *
 * Payload:
 *   {
 *     email: string;           // required
 *     formKey: string;         // tag key — e.g. "newsletter", "waitlist"
 *     firstName?: string;
 *     lastName?: string;
 *     company?: string;
 *     phone?: string;
 *   }
 * ----------------------------------------------------------------------------
 */

function bad(error: string, status = 422) {
  return NextResponse.json({ ok: false, error }, { status });
}

/** Form keys that grant explicit marketing consent on submission. */
const MARKETING_CONSENT_KEYS = new Set([
  "newsletter",
]);

/** Display names for the team notification email, per form key. */
const FORM_NAME_MAP: Record<string, string> = {
  newsletter: "Newsletter Signup",
  waitlist: "Waitlist Signup",
  "upcoming-products": "Upcoming Products Signup",
  "upcoming-usecase": "Use Case Inquiry",
  "upcoming-evalkit": "Eval Kit Request",
  "upcoming-sdk": "SDK Request",
  "upcoming-som": "SOM Interest",
  "upcoming-waitlist": "Waitlist Signup",
  "product-brief": "Product Brief Request",
  "resource-download": "Resource Download",
};

export async function POST(req: Request): Promise<Response> {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return bad("Expected a JSON body.", 400);
  }

  const email = String(body.email ?? "").trim();
  const formKey = String(body.formKey ?? "newsletter").trim();
  const firstName = String(body.firstName ?? "").trim() || undefined;
  const lastName = String(body.lastName ?? "").trim() || undefined;
  const company = String(body.company ?? "").trim() || undefined;
  const phone = String(body.phone ?? "").trim() || undefined;
  const details = String(body.details ?? "").trim() || undefined;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return bad("Please enter a valid email address.");
  }

  // Marketing consent is implicit for newsletter / waitlist / product signup
  // forms (the user actively submits their email for updates). Resource
  // downloads are transactional (gated content).
  const marketingConsent = MARKETING_CONSENT_KEYS.has(formKey);

  // Team notification with everything the visitor submitted (goes to the
  // addresses in Strapi → Mail Setting, or MAIL_TO as fallback).
  const fields: MailField[] = [
    { label: "Email", value: email },
    ...(firstName ? [{ label: "First Name", value: firstName }] : []),
    ...(lastName ? [{ label: "Last Name", value: lastName }] : []),
    ...(company ? [{ label: "Company", value: company }] : []),
    ...(phone ? [{ label: "Phone", value: phone }] : []),
    ...(details ? [{ label: "Details", value: details }] : []),
  ];

  after(() => {
    sendSubmissionMail({
      formName: FORM_NAME_MAP[formKey] ?? formKey,
      fields,
      replyTo: email,
    }).catch(() => { /* logged inside sendSubmissionMail */ });
    addContactAndTag(
      { email, firstName, lastName, company, phone },
      formKey,
      marketingConsent,
    ).catch(() => { /* logged inside addContactAndTag */ });
  });

  // Always return success to the user — even if Mailchimp failed the form
  // submission itself is valid. The Mailchimp error is logged server-side.
  return NextResponse.json({ ok: true, mailchimp: true });
}
