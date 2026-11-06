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

const STRAPI_URL = (
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://127.0.0.1:1338"
)
  .replace(/\/$/, "")
  .replace("localhost", "127.0.0.1");

function bad(error: string, status = 422) {
  return NextResponse.json({ ok: false, error }, { status });
}

/** Form keys that grant explicit marketing consent on submission. */
const MARKETING_CONSENT_KEYS = new Set([
  "newsletter",
  "waitlist",
  "upcoming-products",
  "upcoming-usecase",
  "upcoming-evalkit",
  "upcoming-sdk",
  "upcoming-som",
  "upcoming-som-ble",
  "upcoming-som-lte",
  "upcoming-som-waitlist",
  "upcoming-som-waitlist-ble",
  "upcoming-som-waitlist-lte",
  "upcoming-waitlist",
  "upcoming-hardware-design",
  "upcoming-electronica",
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
  "upcoming-som-ble": "SOM (BLE) Interest",
  "upcoming-som-lte": "SOM (LTE) Interest",
  "upcoming-som-waitlist": "SOM Waitlist",
  "upcoming-som-waitlist-ble": "SOM (BLE) Waitlist",
  "upcoming-som-waitlist-lte": "SOM (LTE) Waitlist",
  "upcoming-waitlist": "Waitlist Signup",
  "upcoming-hardware-design": "Hardware Design Updates Request",
  "upcoming-electronica": "Electronica 2026 Updates Request",
  "product-brief": "Product Brief Request",
  "resource-download": "Resource Download",
  "case-study": "Case Study Download",
  "whitepaper": "Whitepaper Download",
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
  const source = String(body.source ?? "").trim();
  const firstName = String(body.firstName ?? "").trim() || undefined;
  const lastName = String(body.lastName ?? "").trim() || undefined;
  const company = String(body.company ?? "").trim() || undefined;
  const phone = String(body.phone ?? "").trim() || undefined;
  const details = String(body.details ?? "").trim() || undefined;
  const product = String(body.product ?? "").trim() || undefined;
  const variant = String(body.variant ?? "").trim() || undefined;
  const customTags = Array.isArray(body.tags)
    ? (body.tags as unknown[])
        .filter((t): t is string => typeof t === "string" && Boolean(t.trim()))
        .map((t) => t.trim().toLowerCase())
    : undefined;

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
    ...(product ? [{ label: "Product / Module", value: product }] : []),
    ...(variant && variant !== product ? [{ label: "Module Variant", value: variant }] : []),
    ...(details ? [{ label: "Details", value: details }] : []),
  ];

  after(async () => {
    // The newsletter popup syncs strictly to Mailchimp only — no SMTP notification emails sent.
    // All other forms (SDK requests, Eval Kits, Whitepapers, Waitlist, etc.) continue sending team notification emails as usual.
    const isNewsletterSignup = formKey === "newsletter" || source === "newsletter-popup";

    if (!isNewsletterSignup) {
      await sendSubmissionMail({
        formName: FORM_NAME_MAP[formKey] ?? formKey,
        fields,
        replyTo: email,
      }).catch((err) => {
        console.error("[newsletter-mail] error:", err);
      });
    }

    await addContactAndTag(
      { email, firstName, lastName, company, phone },
      formKey,
      marketingConsent,
      customTags,
    ).catch((err) => {
      console.error("[newsletter-mailchimp] error:", err);
    });

    // If lead is from the Electronica landing page or tagged for Electronica, store in Strapi
    const isElectronicaLead =
      formKey.includes("electronica") ||
      formKey.includes("evalkit") ||
      Boolean(customTags && customTags.some((t) => t.includes("electronica")));

    if (isElectronicaLead) {
      try {
        await fetch(`${STRAPI_URL}/api/electronica-leads/submit`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            data: {
              email,
              firstName,
              lastName,
              company,
              phone,
              formKey,
              details: [
                product ? `Product: ${product}` : "",
                variant && variant !== product ? `Variant: ${variant}` : "",
                details ? `Details: ${details}` : "",
              ].filter(Boolean).join(" | ") || undefined,
              tags: customTags ?? ["electronica-2026"],
              sourceUrl: "/electronica-munich-2026",
              subscribed: marketingConsent,
            },
          }),
          signal: AbortSignal.timeout(5000),
        });
      } catch (err) {
        console.error("[newsletter-strapi-lead] error saving electronica lead:", err);
      }
    }
  });

  // Always return success to the user — even if Mailchimp failed the form
  // submission itself is valid. The Mailchimp error is logged server-side.
  return NextResponse.json({ ok: true, mailchimp: true });
}
