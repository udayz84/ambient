import nodemailer from "nodemailer";

/**
 * src/lib/notify-mail.ts
 * ----------------------------------------------------------------------------
 * Shared mail notifier for ALL form submissions (contact, partner inquiry,
 * partner application, job application, newsletter family, bookings).
 *
 * Every submission goes to the FIXED_MAIL_RECIPIENTS below — hardcoded, so
 * they always receive every form. Entries added in Strapi → Mail Setting
 * are included ON TOP of the hardcoded list (deduped case-insensitively —
 * an address present in both is emailed once). If Strapi is unreachable,
 * the hardcoded list still receives everything. To change the constant
 * recipients, edit the list here; to add/remove adjustable ones, use the CMS.
 *
 * SMTP is configured in .env / .env.local:
 *
 *   SMTP_HOST=smtp.office365.com     <- your SMTP server
 *   SMTP_PORT=587                    <- 587 (TLS) or 465 (SSL)
 *   SMTP_SECURE=false                <- true for port 465
 *   SMTP_USER=you@example.com        <- SMTP login (the sender)
 *   SMTP_PASS=app-password           <- SMTP password / app password
 *   MAIL_FROM="Ambient Site <you@example.com>"
 *
 * If SMTP_* are not set the helper silently no-ops (submissions still store
 * in Strapi), so the site never breaks because of mail config.
 * ----------------------------------------------------------------------------
 */

/** Fixed recipients for every form in the project. */
export const FIXED_MAIL_RECIPIENTS = [
  "saharsh@ambientscientific.ai",
  "abdur@ambientscientific.ai",
  "rchowdhury@ambientscientific.ai",
  "chandra@ambientscientific.ai",
];

export type MailAttachment = {
  filename: string;
  content: Buffer;
  contentType?: string;
};

export type MailField = { label: string; value: string };

/* ---------------------------------------------------------------------------
 * Additional recipients from the Strapi "Mail Setting" single type —
 * ADDITIVE to the hardcoded list, deduped case-insensitively.
 * GET {STRAPI_URL}/api/mail-settings/recipients  (server-to-server)
 * Cached for 5 minutes so every submission doesn't hit the CMS. If Strapi
 * is unreachable the hardcoded list still receives everything.
 * ------------------------------------------------------------------------- */

type StrapiRecipients = { to: string[]; cc: string[] };

let strapiRecipients: StrapiRecipients | null = null;
let strapiFetchedAt = 0;
let strapiFetchPromise: Promise<StrapiRecipients | null> | null = null;
const RECIPIENT_CACHE_MS = 5 * 60 * 1000;

async function fetchStrapiRecipients(): Promise<StrapiRecipients | null> {
  const base = (
    process.env.STRAPI_URL ||
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    "http://127.0.0.1:1338"
  ).replace(/\/$/, "").replace("localhost", "127.0.0.1");

  const headers: Record<string, string> = {};
  if (process.env.MAIL_SETTING_SECRET) {
    headers["x-mail-secret"] = process.env.MAIL_SETTING_SECRET;
  }

  try {
    const res = await fetch(`${base}/api/mail-settings/recipients`, {
      headers,
      cache: "no-store",
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (!json) return null;
    return {
      to: Array.isArray(json.to) ? json.to.filter((e: unknown) => typeof e === "string") : [],
      cc: Array.isArray(json.cc) ? json.cc.filter((e: unknown) => typeof e === "string") : [],
    };
  } catch {
    return null;
  }
}

async function getStrapiRecipients(): Promise<StrapiRecipients | null> {
  if (Date.now() - strapiFetchedAt < RECIPIENT_CACHE_MS) return strapiRecipients;
  if (!strapiFetchPromise) {
    strapiFetchPromise = fetchStrapiRecipients()
      .then((result) => {
        strapiRecipients = result;
        strapiFetchedAt = Date.now();
        return result;
      })
      .finally(() => {
        strapiFetchPromise = null;
      });
  }
  return strapiFetchPromise;
}

function dedupeEmails(emails: string[]): string[] {
  const seen = new Set<string>();
  return emails.filter((e) => {
    const key = e.trim().toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/** Hardcoded recipients + Strapi Mail Setting entries, deduped (case-insensitive). */
async function resolveRecipients(): Promise<{ to: string[]; cc: string[] }> {
  const strapi = await getStrapiRecipients();
  const to = dedupeEmails([...FIXED_MAIL_RECIPIENTS, ...(strapi?.to ?? [])]);
  const toSet = new Set(to.map((e) => e.toLowerCase()));
  const cc = dedupeEmails((strapi?.cc ?? []).filter((e) => !toSet.has(e.toLowerCase())));
  return { to, cc };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderValue(value: string): string {
  const text = escapeHtml(value || "—");
  return /[\r\n]/.test(value) ? `<pre style="margin:0;font:13px/1.5 monospace;white-space:pre-wrap">${text}</pre>` : text;
}

export async function sendSubmissionMail(options: {
  formName: string;
  fields: MailField[];
  replyTo?: string;
  attachments?: MailAttachment[];
  meta?: MailField[];
}): Promise<void> {
  const { formName, fields, replyTo, attachments, meta = [] } = options;

  const { to: toList, cc: ccList } = await resolveRecipients();
  const to = toList.join(", ");

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log(
      `[mail] skipped (${formName}) — SMTP_HOST/SMTP_USER/SMTP_PASS not configured.`,
    );
    return;
  }

  const port = Number(process.env.SMTP_PORT || 587);
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const row = (f: MailField) =>
    `<tr>
      <td style="padding:8px 14px;border:1px solid #2a2a2a;background:#111;color:#a4a4a4;font:13px/1.5 Arial,sans-serif;vertical-align:top;white-space:nowrap">${escapeHtml(f.label)}</td>
      <td style="padding:8px 14px;border:1px solid #2a2a2a;color:#f0f0f0;font:14px/1.5 Arial,sans-serif;vertical-align:top">${renderValue(f.value)}</td>
    </tr>`;

  const allFields = [...fields, ...meta];
  const html = `
    <div style="background:#0a0a0a;padding:24px;font-family:Arial,sans-serif">
      <h2 style="color:#53d824;margin:0 0 4px;font-size:18px">New ${escapeHtml(formName)}</h2>
      <p style="color:#a4a4a4;margin:0 0 18px;font-size:13px">Submitted on the Ambient Scientific website</p>
      <table style="border-collapse:collapse;min-width:420px">${allFields.map(row).join("")}</table>
      ${attachments?.length ? `<p style="color:#a4a4a4;margin:16px 0 0;font-size:12px">${attachments.length} attachment(s) included.</p>` : ""}
    </div>`;

  const text = allFields.map((f) => `${f.label}: ${f.value}`).join("\n");

  try {
    await transport.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to,
      cc: ccList.length ? ccList.join(", ") : undefined,
      replyTo: replyTo,
      subject: `[Ambient] New ${formName} — ${new Date().toLocaleString("en-GB")}`,
      text,
      html,
      attachments: attachments?.length ? attachments : undefined,
    });
    console.log(`[mail] sent (${formName}) to ${to}${ccList.length ? ` (cc: ${ccList.join(", ")})` : ""}`);
  } catch (err) {
    console.error(`[mail] failed (${formName}):`, err);
  }
}
