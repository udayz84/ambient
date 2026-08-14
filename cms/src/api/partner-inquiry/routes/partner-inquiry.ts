import { factories } from '@strapi/strapi';

/**
 * Core CRUD router for the Partner Inquiries collection (default: protected).
 * Public submission is handled by the custom route in `routes/submit.ts`.
 */
export default factories.createCoreRouter('api::partner-inquiry.partner-inquiry');
