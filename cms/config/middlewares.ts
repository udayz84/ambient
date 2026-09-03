// Media is stored in Azure Blob Storage (strapi-provider-upload-azure-sp) and
// served from AZURE_ASSETS_PUBLIC_URL with absolute URLs. The admin panel
// browser blocks those images unless the origin is allowed in the CSP.
const AZURE_ASSETS_PUBLIC_URL =
  process.env.AZURE_ASSETS_PUBLIC_URL ||
  'https://ambientwebasset.blob.core.windows.net/website-assets';

const azureAssetsOrigin = new URL(AZURE_ASSETS_PUBLIC_URL).origin;

export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:', 'https://proxy-event.ckeditor.com'],
          'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https://cdn.ckeditor.com'],
          'img-src': ["'self'", 'data:', 'blob:', 'market-assets.strapi.io', azureAssetsOrigin],
          'media-src': ["'self'", 'data:', 'blob:', azureAssetsOrigin],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:1337', 'http://localhost:1338', 'http://127.0.0.1:1338'],
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
