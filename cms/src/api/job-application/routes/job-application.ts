import { factories } from '@strapi/strapi';

/**
 * Core CRUD router for the Job Applications collection (default: protected).
 * Public submission is handled by the custom route in `routes/submit.ts`.
 */
export default factories.createCoreRouter('api::job-application.job-application');
