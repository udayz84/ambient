/**
 * src/lib/recaptcha.ts
 * ---------------------------------------------------------------------------
 * Shared Cloudflare Turnstile CAPTCHA configuration.
 *
 * Cloudflare Turnstile is an invisible, privacy-first alternative to reCAPTCHA.
 * It runs without visual friction or user puzzles, preserving exact UI designs.
 *
 * Environment variables:
 *   NEXT_PUBLIC_TURNSTILE_SITE_KEY - Cloudflare Turnstile site key (browser)
 *   TURNSTILE_SECRET_KEY           - Cloudflare Turnstile secret key (server)
 *   TURNSTILE_BYPASS               - (optional) set to "true" to bypass verification
 * ---------------------------------------------------------------------------
 */

/** Cloudflare Turnstile Site Key exposed to the browser. */
export const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

/** Backward-compatibility alias for existing references */
export const RECAPTCHA_SITE_KEY = TURNSTILE_SITE_KEY;

/** Standard actions associated with form submissions for Turnstile verification. */
export const TURNSTILE_ACTIONS = {
  CONTACT: "contact",
  PARTNER_APPLICATION: "partner_application",
  PARTNER_INQUIRY: "partner_inquiry",
  JOB_APPLICATION: "job_application",
  NEWSLETTER: "newsletter",
  CALENDAR_BOOKING: "calendar_booking",
} as const;

export const RECAPTCHA_ACTIONS = TURNSTILE_ACTIONS;

export type TurnstileAction =
  (typeof TURNSTILE_ACTIONS)[keyof typeof TURNSTILE_ACTIONS];
export type RecaptchaAction = TurnstileAction;
