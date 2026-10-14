import { factories } from '@strapi/strapi';
import { errors } from '@strapi/utils';

export default factories.createCoreController(
  'api::partner-application.partner-application',
  () => ({
    /**
     * Public endpoint (auth: false) that stores a "Become a Partner"
     * application. Accepts application/json: { data: { ... } }. The
     * Next.js proxy (src/app/api/partner-applications/route.ts) validates
     * input before forwarding.
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
        .documents('api::partner-application.partner-application')
        .create({
          data: {
            name: attrs.name,
            company: attrs.company,
            website: attrs.website,
            email: attrs.email,
            region: attrs.region,
            capabilities: attrs.capabilities ?? [],
            experience: attrs.experience,
          },
        });

      ctx.status = 201;
      return { data: entry };
    },
  })
);
