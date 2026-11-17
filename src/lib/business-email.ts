/**
 * src/lib/business-email.ts
 * ----------------------------------------------------------------------------
 * Central source of truth for business email validation across all lead forms.
 * Blocks common personal email providers while permitting lookalike domains
 * (e.g. gmail.example.com, notgmail.com) and business domains.
 * ----------------------------------------------------------------------------
 */

/**
 * Common personal email providers blocked across all lead forms.
 * Must match the domain exactly (case-insensitive after trimming).
 */
export const BLOCKED_EMAIL_DOMAINS: ReadonlySet<string> = new Set([
  "gmail.com",
  "googlemail.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "msn.com",
  "yahoo.com",
  "ymail.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
  "mail.com",
  "gmx.com",
  "gmx.net",
  "fastmail.com",
  "hey.com",
  "tutanota.com",
  "tuta.com",
]);

/**
 * Standard user-facing message displayed beside/below email fields
 * and on submission of a blocked domain.
 */
export const WORK_EMAIL_HELP_TEXT =
  "Please use your work email address. Personal email providers such as Gmail, Outlook, and Yahoo aren’t accepted.";

/** Standard email format regex matching existing form validation in project. */
export const EMAIL_FORMAT_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Normalizes an email address by trimming whitespace and lowercasing it.
 */
export function normalizeEmail(email: string): string {
  return String(email ?? "").trim().toLowerCase();
}

/**
 * Extracts the exact domain following the '@' character from an email address.
 * If multiple '@' characters exist or none exist, extracts the portion after the last '@'.
 */
export function getEmailDomain(email: string): string {
  const normalized = normalizeEmail(email);
  const atIndex = normalized.lastIndexOf("@");
  if (atIndex === -1) return "";
  return normalized.slice(atIndex + 1);
}

/**
 * Returns true only when the domain exactly matches a blocked personal email provider.
 * Does NOT reject lookalike domains such as `gmail.example.com` or `notgmail.com`.
 */
export function isBlockedEmailDomain(emailOrDomain: string): boolean {
  const normalized = normalizeEmail(emailOrDomain);
  const domain = normalized.includes("@") ? getEmailDomain(normalized) : normalized;
  if (!domain) return false;
  return BLOCKED_EMAIL_DOMAINS.has(domain);
}

/**
 * Validates the email format against standard email pattern.
 */
export function isValidEmailFormat(email: string): boolean {
  return EMAIL_FORMAT_REGEX.test(normalizeEmail(email));
}

export type BusinessEmailValidationResult = {
  valid: boolean;
  error?: string;
  normalized: string;
  domain: string;
};

/**
 * Validates an email address for lead forms:
 * 1. Normalizes by trimming whitespace and lowercasing
 * 2. Validates format
 * 3. Checks domain against blocked personal email providers
 */
export function validateBusinessEmail(email: string): BusinessEmailValidationResult {
  const normalized = normalizeEmail(email);
  const domain = getEmailDomain(normalized);

  if (!isValidEmailFormat(normalized)) {
    return {
      valid: false,
      error: "Please enter a valid email address.",
      normalized,
      domain,
    };
  }

  if (BLOCKED_EMAIL_DOMAINS.has(domain)) {
    return {
      valid: false,
      error: WORK_EMAIL_HELP_TEXT,
      normalized,
      domain,
    };
  }

  return {
    valid: true,
    normalized,
    domain,
  };
}
