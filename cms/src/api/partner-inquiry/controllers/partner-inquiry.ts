import { factories } from '@strapi/strapi';
import { errors } from '@strapi/utils';

export default factories.createCoreController(
  'api::partner-inquiry.partner-inquiry',
  () => ({
    /**
     * Public endpoint (auth: false) that stores a Partners "Get Matched"
     * inquiry. Accepts application/json: { data: { ... } }. The Next.js
     * proxy (src/app/api/partner-inquiries/route.ts) validates input
     * before forwarding.
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

      const entry = await strapi
        .documents('api::partner-inquiry.partner-inquiry')
        .create({
          data: {
            first_name: attrs.first_name,
            last_name: attrs.last_name,
            company: attrs.company,
            email: attrs.email,
            region: attrs.region,
            help_areas: attrs.help_areas ?? [],
            message: attrs.message,
          },
        });

      ctx.status = 201;
      return { data: entry };
    },
  })
);
