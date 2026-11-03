import { factories } from '@strapi/strapi';

/**
 * Core CRUD router for Electronica Leads (protected by default in Strapi Admin).
 * Public submission and CSV export are handled by `routes/custom.ts`.
 */
export default factories.createCoreRouter('api::electronica-lead.electronica-lead');

