/**
 * src/lib/form-recipients.ts
 * ----------------------------------------------------------------------------
 * Per-form SMTP recipients, read from the Strapi "popup" collection type
 * (recipient_emails field, comma-separated). Every form on the site has a
 * popup entry keyed by its form key — see src/lib/mailchimp.ts FORM_TAG_MAP
 * for the full list.
 *
 * Resolution order in notify-mail: per-form recipients → global Mail Setting
 * single type → MAIL_TO env.
 * ----------------------------------------------------------------------------
 */

/** Map a form key to its Strapi popup entry key (recipient_emails lives there). */
export function popupKey(formKey: string): string {
  if (formKey.startsWith("upcoming-")) return formKey.slice("upcoming-".length);
  if (formKey === "newsletter") return "newsletter-popup";
  return formKey;
}

/* Per-form recipients (popup.recipient_emails), cached 60s per form key. */
const recipientCache = new Map<string, { emails: string[]; at: number }>();

export async function getFormRecipients(formKey: string): Promise<string[]> {
  const hit = recipientCache.get(formKey);
  if (hit && Date.now() - hit.at < 60_000) return hit.emails;

  const base = (
    process.env.STRAPI_URL ||
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    "http://localhost:1338"
  ).replace(/\/$/, "");

  let emails: string[] = [];
  try {
    const res = await fetch(
      `${base}/api/popups?filters[key][$eq]=${encodeURIComponent(popupKey(formKey))}`,
      {
        headers: process.env.STRAPI_TOKEN
          ? { Authorization: `Bearer ${process.env.STRAPI_TOKEN}` }
          : {},
        signal: AbortSignal.timeout(3_000),
      },
    );
    if (res.ok) {
      const json = (await res.json()) as { data?: { recipient_emails?: string | null }[] };
      const raw = json.data?.[0]?.recipient_emails ?? "";
      emails = raw.split(",").map((e) => e.trim()).filter(Boolean);
    }
  } catch {
    /* Strapi unreachable — fall back to global Mail Setting / MAIL_TO */
  }
  recipientCache.set(formKey, { emails, at: Date.now() });
  return emails;
}
