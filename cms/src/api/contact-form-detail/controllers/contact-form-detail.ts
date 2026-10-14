import { factories } from '@strapi/strapi';
import { errors } from '@strapi/utils';

export default factories.createCoreController(
  'api::contact-form-detail.contact-form-detail',
  () => ({
    /**
     * Public endpoint (auth: false) that stores a Contact page form
     * submission. Accepts application/json: { data: { ... } }. The Next.js
     * proxy (src/app/api/contact-submissions/route.ts) validates input
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
        .documents('api::contact-form-detail.contact-form-detail')
        .create({
          data: {
            track: attrs.track,
            email: attrs.email,
            fields: attrs.fields ?? {},
            message: attrs.message,
            subscribed: attrs.subscribed === true,
          },
        });

      ctx.status = 201;
      return { data: entry };
    },
  })
);
