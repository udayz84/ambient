import nodemailer from "nodemailer";

/**
 * src/lib/notify-mail.ts
 * ----------------------------------------------------------------------------
 * Shared mail notifier for ALL form submissions (contact, partner inquiry,
 * partner application, job application).
 *
 * Configure once in .env / .env.local:
 *
 *   MAIL_TO=you@example.com          <- where every submission is sent
 *   SMTP_HOST=smtp.gmail.com         <- your SMTP server
 *   SMTP_PORT=587                    <- 587 (TLS) or 465 (SSL)
 *   SMTP_SECURE=false                <- true for port 465
 *   SMTP_USER=you@example.com        <- SMTP login (the sender)
 *   SMTP_PASS=app-password           <- SMTP password / app password
 *   MAIL_FROM="Ambient Site <you@example.com>"
 *
 * If MAIL_TO / SMTP_* are not set the helper silently no-ops (submissions
 * still store in Strapi), so the site never breaks because of mail config.
 * ----------------------------------------------------------------------------
 */

export type MailAttachment = {
  filename: string;
  content: Buffer;
  contentType?: string;
};

export type MailField = { label: string; value: string };

/* ---------------------------------------------------------------------------
 * Recipient resolution — Strapi "Mail Setting" single type wins over MAIL_TO.
 * GET {STRAPI_URL}/api/mail-settings/recipients  (server-to-server)
 * Cached for 5 minutes so every submission doesn't hit the CMS.
 * ------------------------------------------------------------------------- */

type StrapiRecipients = { to: string[]; cc: string[]; enabled: boolean };

let strapiRecipients: StrapiRecipients | null = null;
let strapiFetchedAt = 0;
let strapiFetchPromise: Promise<StrapiRecipients | null> | null = null;
const RECIPIENT_CACHE_MS = 5 * 60 * 1000;

async function fetchStrapiRecipients(): Promise<StrapiRecipients | null> {
  const base = (
    process.env.STRAPI_URL ||
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    "http://localhost:1338"
  ).replace(/\/$/, "");

  const headers: Record<string, string> = {};
  if (process.env.MAIL_SETTING_SECRET) {
    headers["x-mail-secret"] = process.env.MAIL_SETTING_SECRET;
  }

  try {
    const res = await fetch(`${base}/api/mail-settings/recipients`, {
      headers,
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (!json || !Array.isArray(json.to)) return null;
    return {
      to: json.to.filter((e: unknown) => typeof e === "string"),
      cc: Array.isArray(json.cc) ? json.cc.filter((e: unknown) => typeof e === "string") : [],
      enabled: json.enabled !== false && json.to.length > 0,
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

  const recipients = await getStrapiRecipients();

  // Strapi Mail Setting takes priority; MAIL_TO env is the fallback.
  const to = recipients?.enabled && recipients.to.length
    ? recipients.to.join(", ")
    : process.env.MAIL_TO;

  if (!to) {
    console.log(
      `[mail] skipped (${formName}) — no recipients. ` +
        "Set them in Strapi → Mail Setting, or MAIL_TO in .env.local.",
    );
    return;
  }
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
      cc: recipients?.cc?.length ? recipients.cc.join(", ") : undefined,
      replyTo: replyTo,
      subject: `[Ambient] New ${formName} — ${new Date().toLocaleString("en-GB")}`,
      text,
      html,
      attachments: attachments?.length ? attachments : undefined,
    });
    console.log(`[mail] sent (${formName}) to ${to}`);
  } catch (err) {
    console.error(`[mail] failed (${formName}):`, err);
  }
}
