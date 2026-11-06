import { POST as newsletterPost } from "../newsletter/route";

/**
 * src/app/api/form-submissions/route.ts
 * ----------------------------------------------------------------------------
 * Dedicated endpoint for structured lead, document access, and inquiry forms
 * (e.g. Developer Docs, SDK requests, Eval Kits, SOMs, Case Studies).
 * Reuses the validated, honeypot-protected and deduplicated handler.
 * ----------------------------------------------------------------------------
 */
export async function POST(req: Request): Promise<Response> {
  return newsletterPost(req);
}

