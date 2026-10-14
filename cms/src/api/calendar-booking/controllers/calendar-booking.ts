import { factories } from '@strapi/strapi';
import { errors } from '@strapi/utils';

export default factories.createCoreController(
  'api::calendar-booking.calendar-booking',
  () => ({
    /**
     * Public endpoint (auth: false) that stores a Contact page calendar
     * booking. Accepts application/json: { data: { ... } }. The Next.js
     * proxy (src/app/api/calendar-bookings/route.ts) validates input
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
        .documents('api::calendar-booking.calendar-booking')
        .create({
          data: {
            meetingTitle: attrs.meetingTitle,
            meetingDescription: attrs.meetingDescription,
            bookingDate: attrs.bookingDate,
            timeSlot: attrs.timeSlot,
            timeZone: attrs.timeZone,
            status: attrs.status ?? 'confirmed',
          },
        });

      ctx.status = 201;
      return { data: entry };
    },
  })
);
