/**
 * Custom public route for submitting Contact page calendar bookings.
 * `auth: false` means no API token or public-permission setup is
 * required — the Next.js proxy
 * (src/app/api/calendar-bookings/route.ts) is the only caller and
 * validates input before forwarding.
 */
export default {
  routes: [
    {
      method: 'POST',
      path: '/calendar-bookings/submit',
      handler: 'calendar-booking.submit',
      config: {
        auth: false,
      },
    },
  ],
};
