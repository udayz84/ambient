export type CookieConsentChoice = "accepted" | "rejected";

export type CookieConsentRecord = {
  choice: CookieConsentChoice;
  version: number;
  ts: number;
};

export const COOKIE_CONSENT_KEY = "cookie-consent";
export const COOKIE_CONSENT_COOKIE = "cookie_consent";
export const COOKIE_CONSENT_VERSION = 1;
export const COOKIE_CONSENT_OPEN_EVENT = "open-cookie-consent";
export const COOKIE_CONSENT_CHANGE_EVENT = "cookie-consent-change";

function isChoice(value: unknown): value is CookieConsentChoice {
  return value === "accepted" || value === "rejected";
}

export function readCookieConsent(): CookieConsentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CookieConsentRecord;
    if (parsed?.version !== COOKIE_CONSENT_VERSION) return null;
    if (!isChoice(parsed.choice)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeCookieConsent(choice: CookieConsentChoice): CookieConsentRecord {
  const record: CookieConsentRecord = {
    choice,
    version: COOKIE_CONSENT_VERSION,
    ts: Date.now(),
  };
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(record));
    } catch {}
    const maxAge = 60 * 60 * 24 * 365;
    document.cookie = `${COOKIE_CONSENT_COOKIE}=${choice}; path=/; max-age=${maxAge}; samesite=lax`;
    window.dispatchEvent(
      new CustomEvent(COOKIE_CONSENT_CHANGE_EVENT, { detail: record })
    );
  }
  return record;
}

export function subscribeCookieConsent(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(COOKIE_CONSENT_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(COOKIE_CONSENT_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function getHasCookieConsentSnapshot(): boolean {
  return readCookieConsent() !== null;
}

export function clearCookieConsent(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(COOKIE_CONSENT_KEY);
  } catch {}
  document.cookie = `${COOKIE_CONSENT_COOKIE}=; path=/; max-age=0; samesite=lax`;
}
