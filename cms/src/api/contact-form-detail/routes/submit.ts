/**
 * Custom public route for submitting the Contact page form. `auth: false`
 * means no API token or public-permission setup is required — the Next.js
 * proxy (src/app/api/contact-submissions/route.ts) is the only caller and
 * validates input before forwarding.
 */
export default {
  routes: [
    {
      method: 'POST',
      path: '/contact-form-details/submit',
      handler: 'contact-form-detail.submit',
      config: {
        auth: false,
      },
    },
  ],
};
