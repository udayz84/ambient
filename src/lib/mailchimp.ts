/**
 * src/lib/mailchimp.ts
 * ----------------------------------------------------------------------------
 * Reusable, server-side-only Mailchimp Marketing API service.
 *
 * Features:
 *   • Add or update contacts without creating duplicates.
 *   • Apply tags while preserving existing tags.
 *   • Respect subscription status — never silently resubscribe.
 *   • Handle API failures, timeouts, rate limits, and missing config
 *     gracefully without blocking the parent form submission.
 *   • Never expose API keys or log credentials.
 *
 * Environment variables (server-side only):
 *   MAILCHIMP_API_KEY          – Mailchimp API key
 *   MAILCHIMP_SERVER_PREFIX    – Mailchimp data center prefix (e.g. "us21")
 *   MAILCHIMP_AUDIENCE_ID      – Mailchimp audience / list ID
 * ----------------------------------------------------------------------------
 */

import crypto from "crypto";

/* -------------------------------------------------------------------------- */
/*  Configuration                                                             */
/* -------------------------------------------------------------------------- */

function getConfig() {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

  if (!apiKey || !serverPrefix || !audienceId) {
    return null;
  }
  return { apiKey, serverPrefix, audienceId };
}

function baseUrl(serverPrefix: string) {
  return `https://${serverPrefix}.api.mailchimp.com/3.0`;
}

function authHeader(apiKey: string): Record<string, string> {
  return {
    Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`,
    "Content-Type": "application/json",
  };
}

/** MD5 hash of the lowercased email — Mailchimp's subscriber hash. */
function subscriberHash(email: string): string {
  return crypto.createHash("md5").update(email.toLowerCase().trim()).digest("hex");
}

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

export type MailchimpContactFields = {
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  phone?: string;
};

export type MailchimpResult = {
  success: boolean;
  /** Human-readable message for logging (never contains secrets). */
  message: string;
  /** True when the contact was already unsubscribed and we respected that. */
  wasUnsubscribed?: boolean;
};

/* -------------------------------------------------------------------------- */
/*  Tag mapping                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Canonical form-to-tag mapping. Every form in the project that should sync
 * with Mailchimp is listed here. Tags use lowercase, hyphen-separated names.
 *
 * Form Name                   | API Endpoint / Handler               | Tag(s)                        | Fields Collected                                         | Marketing Consent
 * ----------------------------|--------------------------------------|-------------------------------|----------------------------------------------------------|-----------------------
 * Contact Form (Sales)        | /api/contact-submissions             | contact-form, contact-sales   | email, track, fields (dynamic), message                  | Explicit checkbox ("subscribed")
 * Contact Form (Developer)    | /api/contact-submissions             | contact-form, contact-dev     | email, track, fields (dynamic), message                  | Explicit checkbox ("subscribed")
 * Contact Form (Media)        | /api/contact-submissions             | contact-form, contact-media   | email, track, fields (dynamic), message                  | Explicit checkbox ("subscribed")
 * Partner Application         | /api/partner-applications            | partner-application           | name, company, website, email, region, capabilities      | No (transactional)
 * Partner Inquiry             | /api/partner-inquiries               | partner-inquiry               | firstName, lastName, company, email, region, helpAreas   | No (transactional)
 * Job Application             | /api/job-applicants                  | job-application               | fullName, email, phone, role, coverLetter, resume        | Consent checkbox (data processing, not marketing)
 * Calendar Booking            | /api/calendar-bookings               | calendar-booking              | meetingTitle, bookingDate, timeSlot, timeZone             | No email collected — excluded
 * Newsletter Popup            | /api/newsletter                      | newsletter                    | email                                                    | Yes (explicit consent by submission)
 * Waitlist Popup              | /api/newsletter                      | waitlist                      | email                                                    | Yes (explicit consent by submission)
 * Footer Newsletter           | /api/newsletter                      | newsletter                    | email                                                    | Yes (explicit consent by submission)
 * Upcoming Products Modal     | /api/newsletter                      | upcoming-products             | email, firstName, lastName, company, chip                | Yes (explicit signup)
 * Product Brief Modal         | /api/newsletter                      | product-brief                 | email                                                    | Yes (explicit signup)
 * Resource Download Modal     | /api/newsletter                      | resource-download             | email (+ dynamic fields from Strapi)                     | No (transactional gated content)
 * Model Zoo Request           | /api/contact-submissions             | model-zoo-request             | fullName, email, phone, purpose, notes                   | Explicit checkbox ("subscribed")
 */

export const FORM_TAG_MAP: Record<string, string[]> = {
  // Contact form track-based tags
  "contact-sales": ["contact-form", "contact-sales"],
  "contact-developer": ["contact-form", "contact-dev"],
  "contact-media": ["contact-form", "contact-media"],

  // Partner forms
  "partner-application": ["partner-application"],
  "partner-inquiry": ["partner-inquiry"],

  // Careers
  "job-application": ["job-application"],

  // Newsletter & marketing
  newsletter: ["newsletter"],
  waitlist: ["waitlist"],

  // Product interest
  "upcoming-products": ["upcoming-products"],
  "product-brief": ["product-brief"],
  "resource-download": ["resource-download"],

  // Model zoo
  "model-zoo-request": ["model-zoo-request"],

  // UpcomingProductsModal context variants
  "upcoming-usecase": ["upcoming-products", "use-case-inquiry"],
  "upcoming-evalkit": ["upcoming-products", "eval-kit-request"],
  "upcoming-sdk": ["upcoming-products", "sdk-request"],
  "upcoming-som": ["upcoming-products", "som-interest"],
  "upcoming-waitlist": ["waitlist"],
};

/* -------------------------------------------------------------------------- */
/*  Core API methods                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Add or update a contact in Mailchimp and apply tags.
 *
 * Behaviour:
 *   • Uses PUT to /lists/{id}/members/{hash} which creates-or-updates.
 *   • If `marketingConsent` is true the contact is set to "subscribed".
 *   • If `marketingConsent` is false the contact is added as "transactional"
 *     (non-subscribed) so they appear in the audience for tagging/CRM but
 *     do NOT receive marketing emails.
 *   • If the contact is already "unsubscribed" in Mailchimp we do NOT
 *     resubscribe them, even if `marketingConsent` is true. We still apply
 *     tags (Mailchimp allows tagging unsubscribed contacts).
 *   • Existing tags are preserved — we only add, never remove.
 */
export async function addContactAndTag(
  contact: MailchimpContactFields,
  formKey: string,
  marketingConsent: boolean,
): Promise<MailchimpResult> {
  const config = getConfig();
  if (!config) {
    console.log(
      "[mailchimp] skipped — MAILCHIMP_API_KEY, MAILCHIMP_SERVER_PREFIX, " +
        "or MAILCHIMP_AUDIENCE_ID not configured.",
    );
    return { success: false, message: "Mailchimp not configured." };
  }

  const email = contact.email.toLowerCase().trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: "Invalid email address." };
  }

  const tags = FORM_TAG_MAP[formKey];
  if (!tags || tags.length === 0) {
    console.log(`[mailchimp] no tags defined for form key "${formKey}".`);
    return { success: false, message: `No tags for form "${formKey}".` };
  }

  const hash = subscriberHash(email);
  const url = `${baseUrl(config.serverPrefix)}/lists/${config.audienceId}/members/${hash}`;
  const headers = authHeader(config.apiKey);

  try {
    // ------------------------------------------------------------------
    // 1. Check if the contact already exists and their subscription status.
    // ------------------------------------------------------------------
    let existingStatus: string | null = null;
    try {
      const getRes = await fetch(url, { method: "GET", headers, signal: AbortSignal.timeout(10_000) });
      if (getRes.ok) {
        const member = (await getRes.json()) as { status?: string };
        existingStatus = member.status ?? null;
      }
      // 404 = new contact, which is fine.
    } catch {
      // Network error checking existing contact — proceed with upsert.
    }

    // Decide the status to set:
    // • If already unsubscribed → keep "unsubscribed" (respect opt-out).
    // • If marketing consent given → "subscribed".
    // • Otherwise → "transactional" (appears in audience, no marketing).
    let status: string;
    let wasUnsubscribed = false;
    if (existingStatus === "unsubscribed") {
      status = "unsubscribed";
      wasUnsubscribed = true;
    } else if (existingStatus === "cleaned") {
      // "cleaned" = bounced email, Mailchimp won't accept "subscribed".
      status = "cleaned";
    } else if (marketingConsent) {
      status = "subscribed";
    } else if (existingStatus === "subscribed") {
      // Already subscribed — don't downgrade to transactional.
      status = "subscribed";
    } else {
      status = "transactional";
    }

    // ------------------------------------------------------------------
    // 2. Upsert the contact (PUT = create-or-update).
    // ------------------------------------------------------------------
    const mergeFields: Record<string, string> = {};
    if (contact.firstName) mergeFields.FNAME = contact.firstName;
    if (contact.lastName) mergeFields.LNAME = contact.lastName;
    if (contact.company) mergeFields.COMPANY = contact.company;
    if (contact.phone) mergeFields.PHONE = contact.phone;

    const body: Record<string, unknown> = {
      email_address: email,
      status_if_new: marketingConsent ? "subscribed" : "transactional",
      ...(status !== "cleaned" ? { status } : {}),
    };
    if (Object.keys(mergeFields).length > 0) {
      body.merge_fields = mergeFields;
    }

    const putRes = await fetch(url, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(15_000),
    });

    if (!putRes.ok) {
      const errBody = await putRes.text().catch(() => "");
      // Handle "Forgotten" / GDPR-deleted contacts
      if (putRes.status === 400 && errBody.includes("forgotten")) {
        console.log(`[mailchimp] contact was GDPR-deleted (forgotten) — cannot re-add.`);
        return { success: false, message: "Contact was previously deleted (GDPR)." };
      }
      console.log(`[mailchimp] PUT failed (${putRes.status}): ${errBody.slice(0, 300)}`);
      return { success: false, message: `Mailchimp API error (${putRes.status}).` };
    }

    // ------------------------------------------------------------------
    // 3. Apply tags (POST to /members/{hash}/tags).
    // ------------------------------------------------------------------
    const tagUrl = `${baseUrl(config.serverPrefix)}/lists/${config.audienceId}/members/${hash}/tags`;
    const tagBody = {
      tags: tags.map((t) => ({ name: t, status: "active" })),
    };

    const tagRes = await fetch(tagUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(tagBody),
      signal: AbortSignal.timeout(10_000),
    });

    if (!tagRes.ok) {
      const tagErr = await tagRes.text().catch(() => "");
      console.log(`[mailchimp] tagging failed (${tagRes.status}): ${tagErr.slice(0, 300)}`);
      // Contact was added but tagging failed — partial success.
      return {
        success: true,
        message: `Contact added but tagging failed (${tagRes.status}).`,
        wasUnsubscribed,
      };
    }

    console.log(
      `[mailchimp] success — ${email} added/updated with tags [${tags.join(", ")}]` +
        (wasUnsubscribed ? " (kept unsubscribed)" : ""),
    );
    return {
      success: true,
      message: "Contact synced to Mailchimp.",
      wasUnsubscribed,
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.log(`[mailchimp] error: ${msg}`);
    return { success: false, message: `Mailchimp error: ${msg}` };
  }
}
