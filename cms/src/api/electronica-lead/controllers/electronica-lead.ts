import { factories } from '@strapi/strapi';
import { errors } from '@strapi/utils';

function escapeCsvField(val: unknown): string {
  if (val === null || val === undefined) return '';
  const str = typeof val === 'object' ? JSON.stringify(val) : String(val);
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export default factories.createCoreController(
  'api::electronica-lead.electronica-lead',
  () => ({
    /**
     * Public endpoint (auth: false) that stores an Electronica landing page lead.
     * Accepts application/json: { data: { ... } }.
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

      if (!attrs.email || typeof attrs.email !== 'string') {
        throw new errors.ValidationError('Email is required');
      }

      const entry = await strapi
        .documents('api::electronica-lead.electronica-lead')
        .create({
          data: {
            email: attrs.email.trim().toLowerCase(),
            firstName: attrs.firstName ? String(attrs.firstName).trim() : undefined,
            lastName: attrs.lastName ? String(attrs.lastName).trim() : undefined,
            company: attrs.company ? String(attrs.company).trim() : undefined,
            phone: attrs.phone ? String(attrs.phone).trim() : undefined,
            formKey: attrs.formKey ? String(attrs.formKey).trim() : 'upcoming-electronica',
            details: attrs.details ? String(attrs.details).trim() : undefined,
            tags: attrs.tags ?? ['electronica-2026'],
            sourceUrl: attrs.sourceUrl ? String(attrs.sourceUrl).trim() : '/electronica-munich-2026',
            subscribed: attrs.subscribed !== false,
          },
        });

      ctx.status = 201;
      return { data: entry };
    },

    /**
     * Public CSV Export endpoint (auth: false) that generates a downloadable CSV of all leads.
     * Route: GET /api/electronica-leads/export
     */
    async exportCsv(ctx: any) {
      const leads = await strapi
        .documents('api::electronica-lead.electronica-lead')
        .findMany({
          sort: { createdAt: 'desc' },
          limit: 10000,
        });

      const headers = [
        'ID',
        'Submission Date',
        'Email',
        'First Name',
        'Last Name',
        'Company',
        'Phone',
        'Form Key',
        'Details',
        'Tags',
        'Source URL',
        'Subscribed',
      ];

      const rows = (leads || []).map((lead: any) => [
        escapeCsvField(lead.documentId || lead.id),
        escapeCsvField(lead.createdAt ? new Date(lead.createdAt).toISOString() : ''),
        escapeCsvField(lead.email),
        escapeCsvField(lead.firstName),
        escapeCsvField(lead.lastName),
        escapeCsvField(lead.company),
        escapeCsvField(lead.phone),
        escapeCsvField(lead.formKey),
        escapeCsvField(lead.details),
        escapeCsvField(Array.isArray(lead.tags) ? lead.tags.join(', ') : lead.tags),
        escapeCsvField(lead.sourceUrl),
        escapeCsvField(lead.subscribed ? 'Yes' : 'No'),
      ]);

      const csvContent = [
        headers.join(','),
        ...rows.map((r: string[]) => r.join(',')),
      ].join('\r\n');

      const dateStr = new Date().toISOString().split('T')[0];
      const filename = `electronica-leads-${dateStr}.csv`;

      ctx.set('Content-Type', 'text/csv; charset=utf-8');
      ctx.set('Content-Disposition', `attachment; filename="${filename}"`);
      ctx.body = csvContent;
    },
  })
);
