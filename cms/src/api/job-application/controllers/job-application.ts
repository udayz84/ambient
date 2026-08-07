import { factories } from '@strapi/strapi';
import { errors } from '@strapi/utils';

export default factories.createCoreController(
  'api::job-application.job-application',
  ({ strapi }) => ({
    /**
     * Public endpoint (auth: false) that stores a careers application.
     *
     * Accepts multipart/form-data:
     *   - data: JSON string of { full_name, email, phone, role, other_role,
     *           cover_letter, consent }
     *   - resume: the resume file (optional)
     *
     * Strapi v5's core create controller does not JSON-parse a multipart
     * `data` field, so this controller parses it explicitly, creates the
     * entry via the Document Service, then attaches the resume file through
     * the upload plugin service.
     */
    async submit(ctx: any) {
      const rawBody = ctx.request.body || {};
      let data = rawBody.data;

      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
        } catch {
          data = undefined;
        }
      }

      if (!data || typeof data !== 'object') {
        throw new errors.ValidationError('Missing "data" payload in the request body');
      }

      const attrs = data as Record<string, any>;

      const entry: any = await strapi
        .documents('api::job-application.job-application')
        .create({
          data: {
            full_name: attrs.full_name,
            email: attrs.email,
            phone: attrs.phone,
            role: attrs.role,
            other_role: attrs.other_role,
            cover_letter: attrs.cover_letter,
            consent: attrs.consent === true || attrs.consent === 'true',
          },
        });

      // Attach the resume file (if uploaded) via the upload plugin service,
      // linking it to the entry's `resume` media field. The upload plugin's
      // morph relation resolves `refId` against the numeric primary key, so we
      // pass `entry.id` (number) — not the string documentId.
      const files = ctx.request.files || {};
      const resume = files.resume;
      if (resume) {
        await strapi.service('plugin::upload.upload').upload({
          data: {
            ref: 'api::job-application.job-application',
            refId: entry.id,
            field: 'resume',
          },
          files: resume,
        });
      }

      ctx.status = 201;
      return { data: entry };
    },
  })
);
