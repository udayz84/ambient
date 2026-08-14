/**
 * Custom public route for submitting partner applications from the Partners
 * page "Become a Partner" form. `auth: false` means no API token or
 * public-permission setup is required — the Next.js proxy
 * (src/app/api/partner-applications/route.ts) is the only caller and
 * validates input before forwarding.
 */
export default {
  routes: [
    {
      method: 'POST',
      path: '/partner-applications/submit',
      handler: 'partner-application.submit',
      config: {
        auth: false,
      },
    },
  ],
};
