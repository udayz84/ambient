import crypto from "crypto";

const CAPTCHA_SECRET =
  process.env.CAPTCHA_SECRET ||
  process.env.TURNSTILE_SECRET_KEY ||
  "ambient-captcha-secret-key-2026";

/** 10 minutes expiry window for captcha */
const CAPTCHA_TTL_MS = 10 * 60 * 1000;

/**
 * Generates an anti-bot SVG with slightly rotated/colored 4 digits and noise lines.
 */
function createSvg(code: string): string {
  const chars = code.split("");
  const colors = ["#6ced3f", "#ffffff", "#a3f784", "#e0e0e0"];
  let textElements = "";

  chars.forEach((c, i) => {
    const x = 18 + i * 24;
    const y = 27 + Math.sin(i) * 3;
    const rot = (i % 2 === 0 ? 1 : -1) * (6 + i * 3);
    const color = colors[i % colors.length];
    textElements += `<text x="${x}" y="${y}" fill="${color}" font-size="22" font-weight="bold" font-family="monospace, monospace" transform="rotate(${rot} ${x} ${y})">${c}</text>`;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="40" viewBox="0 0 120 40" style="background:#141414;border:1px solid #333;border-radius:4px;"><line x1="4" y1="12" x2="116" y2="28" stroke="rgba(108,237,63,0.3)" stroke-width="1.5" /><line x1="8" y1="30" x2="112" y2="10" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" /><line x1="40" y1="4" x2="80" y2="36" stroke="rgba(108,237,63,0.15)" stroke-width="1" />${textElements}</svg>`;
}

/**
 * Generates a 4-digit numeric code, returns the rendered SVG and an HMAC token.
 */
export function generateNumericCaptcha(): { svg: string; token: string } {
  // Random 4-digit code (1000 - 9999)
  const code = Math.floor(1000 + Math.random() * 9000).toString();
  const timestamp = Date.now().toString();

  const hmac = crypto
    .createHmac("sha256", CAPTCHA_SECRET)
    .update(`${code}:${timestamp}`)
    .digest("hex");

  const token = `${hmac}.${timestamp}`;
  const svg = createSvg(code);

  return { svg, token };
}

/**
 * Validates a user's submitted 4-digit numeric code against the HMAC token.
 */
export function verifyNumericCaptcha(
  userInput?: string | null,
  token?: string | null
): boolean {
  if (!userInput || !token) return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [receivedHash, timestampStr] = parts;
  const timestamp = parseInt(timestampStr, 10);

  if (isNaN(timestamp)) return false;

  // Check TTL (10 minutes)
  if (Date.now() - timestamp > CAPTCHA_TTL_MS || timestamp > Date.now() + 5000) {
    return false;
  }

  const expectedHash = crypto
    .createHmac("sha256", CAPTCHA_SECRET)
    .update(`${userInput.trim()}:${timestampStr}`)
    .digest("hex");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(receivedHash, "hex"),
      Buffer.from(expectedHash, "hex")
    );
  } catch {
    return false;
  }
}
