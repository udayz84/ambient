/**
 * Custom public route for submitting job applications from the careers
 * "Apply Now" form. `auth: false` means no API token or public-permission
 * setup is required — the Next.js proxy (src/app/api/job-applicants/route.ts)
 * is the only caller and validates input before forwarding.
 */
export default {
  routes: [
    {
      method: 'POST',
      path: '/job-applications/submit',
      handler: 'job-application.submit',
      config: {
        auth: false,
      },
    },
  ],
};
