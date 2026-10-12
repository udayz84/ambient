/**
 * src/lib/form-recipients.ts
 * ----------------------------------------------------------------------------
 * Per-form SMTP recipients, read from the Strapi "popup" entry that the
 * submitted form was configured from. Clients send the entry's documentId
 * as `popupId` with each submission (forms receive their entry from the
 * page's relation field).
 *
 * Resolution order in notify-mail: per-form recipients → global Mail Setting
 * single type → MAIL_TO env.
 * ----------------------------------------------------------------------------
 */

/* Per-form recipients (popup.recipient_emails), cached 60s per popupId. */
const recipientCache = new Map<string, { emails: string[]; at: number }>();

export async function getFormRecipients(popupId: string | undefined): Promise<string[]> {
  if (!popupId) return [];
  const hit = recipientCache.get(popupId);
  if (hit && Date.now() - hit.at < 60_000) return hit.emails;

  const base = (
    process.env.STRAPI_URL ||
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    "http://localhost:1338"
  ).replace(/\/$/, "");

  let emails: string[] = [];
  try {
    const res = await fetch(`${base}/api/popups/${encodeURIComponent(popupId)}`, {
      headers: process.env.STRAPI_TOKEN
        ? { Authorization: `Bearer ${process.env.STRAPI_TOKEN}` }
        : {},
      signal: AbortSignal.timeout(3_000),
    });
    if (res.ok) {
      const json = (await res.json()) as { data?: { recipient_emails?: string | null } };
      const raw = json.data?.recipient_emails ?? "";
      emails = raw.split(",").map((e) => e.trim()).filter(Boolean);
    }
  } catch {
    /* Strapi unreachable — fall back to global Mail Setting / MAIL_TO */
  }
  recipientCache.set(popupId, { emails, at: Date.now() });
  return emails;
}
