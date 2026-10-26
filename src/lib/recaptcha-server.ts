import {
  TURNSTILE_SITE_KEY,
  type TurnstileAction,
} from "./recaptcha";

export interface TurnstileVerificationResult {
  success: boolean;
  error?: string;
  reasons?: string[];
  hostname?: string;
}

export type RecaptchaVerificationResult = TurnstileVerificationResult;

/**
 * Verifies a Cloudflare Turnstile token using Cloudflare's official siteverify endpoint.
 *
 * @param token - One-time token generated from client Turnstile challenge
 * @param expectedAction - The action expected for this form submission (e.g. "contact", "newsletter")
 */
export async function verifyTurnstileToken(
  token: string | null | undefined,
  expectedAction?: TurnstileAction | string
): Promise<TurnstileVerificationResult> {
  const secretKey =
    process.env.TURNSTILE_SECRET_KEY ||
    process.env.RECAPTCHA_SECRET_KEY;
  const siteKey =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || TURNSTILE_SITE_KEY;

  const isBypass =
    process.env.TURNSTILE_BYPASS === "true" ||
    process.env.RECAPTCHA_BYPASS === "true";

  // 1. Explicit bypass
  if (isBypass) {
    console.warn(
      `[Turnstile] Verification explicitly bypassed for action "${expectedAction}".`
    );
    return { success: true };
  }

  // 2. Token presence check
  if (!token || typeof token !== "string" || !token.trim()) {
    return {
      success: false,
      error:
        "Missing security verification token. If you are using an ad blocker or privacy extension, please disable it for this site and try again.",
    };
  }

  // 3. Configuration check
  if (!secretKey || !siteKey) {
    console.error(
      "[Turnstile] Server misconfiguration: NEXT_PUBLIC_TURNSTILE_SITE_KEY and TURNSTILE_SECRET_KEY must be set in your .env file."
    );
    return {
      success: false,
      error:
        "Turnstile security verification is not configured. Please set NEXT_PUBLIC_TURNSTILE_SITE_KEY and TURNSTILE_SECRET_KEY in .env.",
    };
  }

  // 4. Verify against Cloudflare siteverify API
  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
        signal: controller.signal,
      }
    );

    clearTimeout(timeout);

    if (!res.ok) {
      throw new Error(`Cloudflare siteverify returned HTTP ${res.status}`);
    }

    const data = (await res.json()) as {
      success: boolean;
      "error-codes"?: string[];
      challenge_ts?: string;
      hostname?: string;
      action?: string;
      cdata?: string;
    };

    if (!data.success) {
      const errorCodes = data["error-codes"] || [];
      console.warn(
        `[Turnstile] Token verification failed for action "${expectedAction}". Errors:`,
        errorCodes
      );
      return {
        success: false,
        reasons: errorCodes,
        error:
          "Security verification failed or expired. Please refresh the page and try again.",
      };
    }

    // 5. Optional action check
    if (expectedAction && data.action && data.action !== expectedAction) {
      console.warn(
        `[Turnstile] Action mismatch: expected "${expectedAction}", got "${data.action}"`
      );
      return {
        success: false,
        error: "Security verification action mismatch. Please try again.",
      };
    }

    return {
      success: true,
      hostname: data.hostname,
    };
  } catch (err: unknown) {
    console.error("[Turnstile] Error during siteverify:", err);

    // Fail-open strategy: If Cloudflare's verification service is down or unreachable,
    // allow submission unless TURNSTILE_FAIL_OPEN="false".
    if (process.env.TURNSTILE_FAIL_OPEN !== "false") {
      console.warn(
        "[Turnstile] Failing open due to verification error/timeout. Proceeding with submission."
      );
      return { success: true };
    }

    return {
      success: false,
      error:
        "Unable to verify security token due to a temporary service disruption. Please try again in a few moments.",
    };
  }
}

/** Backward-compatible alias for existing API route handlers */
export const verifyRecaptchaToken = verifyTurnstileToken;
