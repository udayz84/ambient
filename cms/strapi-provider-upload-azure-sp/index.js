'use strict';

const { createHash } = require('node:crypto');
const { BlobServiceClient } = require('@azure/storage-blob');
const { ClientSecretCredential } = require('@azure/identity');

/**
 * Strapi 5 upload provider — Azure Blob Storage with service-principal auth.
 *
 * Files are stored as:  <container>/<prefix>/<hash><ext>
 * file.url is set to:   <publicBaseUrl>/<prefix>/<hash><ext>   (absolute)
 *
 * The <prefix>/ naming matches the strapi-uploads/ mirror that was bulk-migrated,
 * so old and new files share one namespace.
 */

const DEFAULT_PREFIX = 'strapi-uploads';

function required(options, key) {
  const value = options[key];
  if (!value || typeof value !== 'string') {
    throw new Error(
      `[strapi-provider-upload-azure-sp] Missing required option "${key}". ` +
        'Set it under upload.config.providerOptions in config/plugins.ts.',
    );
  }
  return value;
}

var index = {
  init(options = {}) {
    const prefix = (options.prefix || DEFAULT_PREFIX).replace(/^\/+|\/+$/g, '');
    const baseTrimmed = (options.publicBaseUrl || '').replace(/\/+$/, '');

    let containerClient = null;

    function client() {
      if (containerClient) return containerClient;
      const accountName = required(options, 'accountName');
      const containerName = options.containerName || 'website-assets';
      const credential = new ClientSecretCredential(
        required(options, 'tenantId'),
        required(options, 'clientId'),
        required(options, 'clientSecret'),
      );
      const service = new BlobServiceClient(
        `https://${accountName}.blob.core.windows.net`,
        credential,
      );
      containerClient = service.getContainerClient(containerName);
      return containerClient;
    }

    function blobNameFor(file) {
      return `${prefix}/${file.hash}${file.ext}`;
    }

    function urlFor(file) {
      return `${baseTrimmed}/${prefix}/${encodeURIComponent(`${file.hash}${file.ext}`)}`;
    }

    function httpHeadersFor(file, md5Base64) {
      const headers = {
        blobContentType: file.mime || 'application/octet-stream',
        blobCacheControl: options.cacheControl || 'public, max-age=86400',
      };
      if (md5Base64) headers.blobContentMD5 = Buffer.from(md5Base64, 'base64');
      return headers;
    }

    async function putBlob(file) {
      const blob = client().getBlockBlobClient(blobNameFor(file));
      if (Buffer.isBuffer(file.buffer) || file.buffer instanceof Uint8Array) {
        const buffer = Buffer.from(file.buffer);
        const md5 = createHash('md5').update(buffer).digest('base64');
        await blob.uploadData(buffer, {
          blobHTTPHeaders: httpHeadersFor(file, md5),
          concurrency: 8,
        });
      } else if (file.stream) {
        await blob.uploadStream(file.stream, 4 * 1024 * 1024, 5, {
          blobHTTPHeaders: httpHeadersFor(file),
        });
      } else {
        throw new Error('Missing file buffer or stream');
      }
      file.url = urlFor(file);
    }

    async function removeBlob(file) {
      const blob = client().getBlockBlobClient(blobNameFor(file));
      await blob.deleteIfExists({ deleteSnapshots: 'include' });
    }

    if (!options.accountName || !options.tenantId || !options.clientId || !options.clientSecret) {
      console.warn(
        '[strapi-provider-upload-azure-sp] Azure options incomplete — uploads will fail ' +
          'until AZURE_* env values are set in cms/.env.',
      );
    }

    return {
      async upload(file) {
        await putBlob(file);
      },
      async uploadStream(file) {
        await putBlob(file);
      },
      async replace(newFile, oldFile) {
        await putBlob(newFile);
        if (`${newFile.hash}${newFile.ext}` !== `${oldFile.hash}${oldFile.ext}`) {
          await removeBlob(oldFile);
        }
      },
      async replaceStream(newFile, oldFile) {
        await putBlob(newFile);
        if (`${newFile.hash}${newFile.ext}` !== `${oldFile.hash}${oldFile.ext}`) {
          await removeBlob(oldFile);
        }
      },
      async delete(file) {
        await removeBlob(file);
      },
    };
  },
};

module.exports = index;
