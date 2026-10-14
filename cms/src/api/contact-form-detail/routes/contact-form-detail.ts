import { factories } from '@strapi/strapi';

/**
 * Core CRUD router for the Contact Form Details collection (default: protected).
 * Public submission is handled by the custom route in `routes/submit.ts`.
 */
export default factories.createCoreRouter('api::contact-form-detail.contact-form-detail');
