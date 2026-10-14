/**
 * Custom public route for submitting partner inquiries from the Partners
 * page "Get Matched" form. `auth: false` means no API token or
 * public-permission setup is required — the Next.js proxy
 * (src/app/api/partner-inquiries/route.ts) is the only caller and
 * validates input before forwarding.
 */
export default {
  routes: [
    {
      method: 'POST',
      path: '/partner-inquiries/submit',
      handler: 'partner-inquiry.submit',
      config: {
        auth: false,
      },
    },
  ],
};
