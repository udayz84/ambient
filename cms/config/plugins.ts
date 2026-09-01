export default () => ({
  'users-permissions': {
    config: {
      register: {
        allowedFields: ['username', 'email'],
      },
    },
  },
  ckeditor5: { enabled: true },
  upload: {
    config: {
      // Uploads go straight to Azure Blob Storage (service principal auth —
      // no account key/connection string needed). Local provider in
      // cms/.env backup: AZURE_* values, same as repo root .env.
      provider: 'strapi-provider-upload-azure-sp',
      providerOptions: {
        accountName: process.env.AZURE_STORAGE_ACCOUNT_NAME,
        tenantId: process.env.AZURE_TENANT_ID,
        clientId: process.env.AZURE_CLIENT_ID,
        clientSecret: process.env.AZURE_CLIENT_SECRET,
        containerName: process.env.AZURE_STORAGE_CONTAINER_NAME || 'website-assets',
        publicBaseUrl:
          process.env.AZURE_ASSETS_PUBLIC_URL ||
          'https://ambientwebasset.blob.core.windows.net/website-assets',
        prefix: 'strapi-uploads',
      },
    },
  },
});
