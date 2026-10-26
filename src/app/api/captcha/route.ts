import { NextResponse } from "next/server";
import { generateNumericCaptcha } from "@/lib/numeric-captcha";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const { svg, token } = generateNumericCaptcha();
  return NextResponse.json(
    { ok: true, svg, token },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}
