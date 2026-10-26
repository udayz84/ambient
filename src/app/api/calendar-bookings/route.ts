import { NextResponse } from "next/server";
import { sendSubmissionMail } from "@/lib/notify-mail";
import { verifyRecaptchaToken } from "@/lib/recaptcha-server";
import { RECAPTCHA_ACTIONS } from "@/lib/recaptcha";
import { verifyNumericCaptcha } from "@/lib/numeric-captcha";

/**
 * src/app/api/calendar-bookings/route.ts
 * ----------------------------------------------------------------------------
 * Browser-facing endpoint that stores a Contact page calendar booking into
 * Strapi's `calendar-bookings` collection and emails the details.
 *
 * Flow:
 *   ContactBookingPopup  --json-->  this route
 *   this route           --json-->  Strapi POST /api/calendar-bookings/submit
 * ----------------------------------------------------------------------------
 */

const STRAPI_URL = (
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://127.0.0.1:1338"
).replace(/\/$/, "").replace("localhost", "127.0.0.1");

function bad(error: string, status = 422) {
  return NextResponse.json({ ok: false, error }, { status });
}

export async function POST(req: Request): Promise<Response> {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return bad("Expected a JSON body.", 400);
  }

  const recaptchaToken =
    typeof body.recaptchaToken === "string" ? body.recaptchaToken : undefined;
  const recaptchaResult = await verifyRecaptchaToken(
    recaptchaToken,
    RECAPTCHA_ACTIONS.CALENDAR_BOOKING
  );
  if (!recaptchaResult.success) {
    return bad(recaptchaResult.error || "Security verification failed.", 403);
  }

  const captchaCode = typeof body.captchaCode === "string" ? body.captchaCode : undefined;
  const captchaToken = typeof body.captchaToken === "string" ? body.captchaToken : undefined;
  if (captchaCode || captchaToken) {
    if (!verifyNumericCaptcha(captchaCode, captchaToken)) {
      return bad("Security code verification failed. Please enter the correct code.", 403);
    }
  }

  const meetingTitle = String(body.meetingTitle ?? "").trim().slice(0, 200);
  const meetingDescription = String(body.meetingDescription ?? "").trim().slice(0, 2000);
  const bookingDate = String(body.bookingDate ?? "").trim();
  const timeSlot = String(body.timeSlot ?? "").trim().slice(0, 50);
  const timeZone = String(body.timeZone ?? "").trim().slice(0, 120);

  if (!meetingTitle) {
    return bad("Meeting title is required.");
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(bookingDate)) {
    return bad("A valid booking date (YYYY-MM-DD) is required.");
  }
  if (!/^\d{1,2}:\d{2}\s*-\s*\d{1,2}:\d{2}$/.test(timeSlot)) {
    return bad("A valid time slot (HH:MM - HH:MM) is required.");
  }

  const data = {
    meetingTitle,
    meetingDescription,
    bookingDate,
    timeSlot,
    timeZone,
    status: "confirmed",
  };


  const mailPayload = () => {
    const prettyDate = new Date(`${bookingDate}T00:00:00`).toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return {
      formName: "Calendar Booking",
      fields: [
        { label: "Meeting", value: meetingTitle },
        { label: "Date", value: prettyDate },
        { label: "Time slot", value: timeSlot },
        { label: "Time zone", value: timeZone },
        { label: "Description", value: meetingDescription },
      ],
    };
  };

  try {
    const res = await fetch(`${STRAPI_URL}/api/calendar-bookings/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
      signal: AbortSignal.timeout(4000),
    });

    if (!res.ok) {
      console.log("[calendar-booking] Strapi unavailable — logged booking:", JSON.stringify(data));
    }

    await sendSubmissionMail(mailPayload());
    return NextResponse.json({ ok: true });
  } catch {
    console.log("[calendar-booking] Strapi unreachable — logged booking:", JSON.stringify(data));
    await sendSubmissionMail(mailPayload());
    return NextResponse.json({ ok: true });
  }
}
