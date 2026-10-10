import { NextResponse, after } from "next/server";
import { sendSubmissionMail, type MailAttachment } from "@/lib/notify-mail";
import { addContactAndTag } from "@/lib/mailchimp";

/**
 * src/app/api/job-applicants/route.ts
 * ----------------------------------------------------------------------------
 * Browser-facing endpoint that stores a careers "Apply Now" form submission
 * into Strapi's `job-applications` collection.
 *
 * Flow:
 *   CareersApplicationModal  --multipart-->  this route
 *   this route               --multipart-->  Strapi POST /api/job-applications/submit
 *
 * The Strapi `submit` route is a custom controller with `auth: false`
 * (see cms/src/api/job-application/routes/submit.ts), so no API token is
 * required. This route validates input before forwarding so Strapi never
 * receives junk, and keeps the Strapi URL/token server-side only.
 * ----------------------------------------------------------------------------
 */

const STRAPI_URL = (
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://localhost:1338"
).replace(/\/$/, "");

function bad(error: string, status = 422) {
  return NextResponse.json({ ok: false, error }, { status });
}

export async function POST(req: Request): Promise<Response> {
  let incoming: FormData;
  try {
    incoming = await req.formData();
  } catch {
    return bad("Expected multipart/form-data.", 400);
  }

  const fullName = String(incoming.get("fullName") ?? "").trim();
  const email = String(incoming.get("email") ?? "").trim();
  const phone = String(incoming.get("phone") ?? "").trim();
  const role = String(incoming.get("role") ?? "").trim();
  const otherRole = String(incoming.get("otherRole") ?? "").trim();
  const coverLetter = String(incoming.get("coverLetter") ?? "").trim();
  const consentRaw = incoming.get("consent");
  const consent = consentRaw === "true" || consentRaw === "1";
  const resume = incoming.get("resume");

  if (!fullName || !email || !phone) {
    return bad("Full name, email and phone number are required.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return bad("Please enter a valid email address.");
  }

  const data = {
    full_name: fullName,
    email,
    phone,
    role,
    other_role: otherRole,
    cover_letter: coverLetter,
    consent,
  };

  // Rebuild as multipart so the resume file (if any) is uploaded in the same
  // request as the entry — Strapi's core create handles `data` + `files.*`.
  const strapiForm = new FormData();
  strapiForm.append("data", JSON.stringify(data));

  if (resume && typeof resume !== "string") {
    const file = resume as File;
    if (file.size > 0) {
      strapiForm.append("resume", file, file.name || "resume");
    }
  }

  const init: RequestInit & { duplex?: "half" } = {
    method: "POST",
    body: strapiForm,
    // Required by undici (Node) when the body contains a streamed File.
    duplex: "half",
  };

  const mailPayload = async () => {
    let attachments: MailAttachment[] = [];
    if (resume && typeof resume !== "string") {
      const file = resume as File;
      if (file.size > 0 && file.size <= 5 * 1024 * 1024) {
        attachments = [
          {
            filename: file.name || "resume",
            content: Buffer.from(await file.arrayBuffer()),
            contentType: file.type || undefined,
          },
        ];
      }
    }
    return {
      formName: "Job Application",
      replyTo: email,
      fields: [
        { label: "Full name", value: fullName },
        { label: "Email", value: email },
        { label: "Phone", value: phone },
        { label: "Role", value: otherRole ? `${role} (${otherRole})` : role },
        { label: "Cover letter", value: coverLetter },
      ],
      meta: [
        { label: "Consent given", value: consent ? "Yes" : "No" },
        ...(attachments.length ? [{ label: "Resume", value: attachments[0].filename }] : []),
      ],
      attachments,
    };
  };

  let strapiSaved = false;
  try {
    const res = await fetch(`${STRAPI_URL}/api/job-applications/submit`, init);

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.log("[job-applicant] Strapi rejected — logged submission:", JSON.stringify(data), detail);
    } else {
      strapiSaved = true;
    }
  } catch {
    console.log("[job-applicant] Strapi unreachable — logged submission:", JSON.stringify(data));
  }

  await sendSubmissionMail(await mailPayload());

  // Sync to Mailchimp (transactional — consent is for data processing, not marketing)
  after(() => {
    addContactAndTag(
      { email, firstName: fullName, phone },
      "job-application",
      false,
    ).catch(() => { /* logged inside addContactAndTag */ });
  });

  if (!strapiSaved) {
    return NextResponse.json(
      {
        ok: false,
        error: "Could not save your application. Please try again.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
