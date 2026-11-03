/**
 * Custom public routes for Electronica Munich 2026 landing page leads.
 * - POST /api/electronica-leads/submit (public form submission)
 * - GET  /api/electronica-leads/export (downloadable CSV export)
 */
export default {
  routes: [
    {
      method: 'POST',
      path: '/electronica-leads/submit',
      handler: 'electronica-lead.submit',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/electronica-leads/export',
      handler: 'electronica-lead.exportCsv',
      config: {
        auth: false,
      },
    },
  ],
};

