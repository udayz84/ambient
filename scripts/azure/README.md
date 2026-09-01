# Azure Blob Storage — asset migration toolkit

Moves every asset in `public/` (images, SVGs, PDFs, fonts, videos — 1000+ files,
~350 MB) to Azure Blob Storage and serves them from Azure at the **exact same
URLs**. Nothing is renamed, re-compressed, or re-pathed.

## How rendering stays 1:1

`src/middleware.ts` checks `AZURE_ASSETS_PUBLIC_URL`. When set, any request to a
static-asset path (by extension) is 308-redirected to the identical blob path:

```
/footer/dot-separator.svg
  → https://<account>.blob.core.windows.net/assets/footer/dot-separator.svg
```

Filenames with spaces/`@`/parentheses are encoded per segment — they map 1:1.
When the env var is unset, the app serves everything from `/public` exactly as
before. `robots.txt`, `sitemap.xml`, and API routes are never touched.

## Environment variables (in `.env`)

| Variable | Required | Purpose |
| --- | --- | --- |
| `AZURE_STORAGE_ACCOUNT_NAME` | scripts | Storage account name (`ambientwebasset`) |
| `AZURE_TENANT_ID` | scripts | Azure AD directory (tenant) ID |
| `AZURE_CLIENT_ID` | scripts | Application (client) ID of the service principal |
| `AZURE_CLIENT_SECRET` | scripts | Client secret value — NEVER commit |
| `AZURE_STORAGE_CONTAINER_NAME` | no | Container ("bucket") name. Currently: `website-assets` |
| `AZURE_STORAGE_CONNECTION_STRING` | alternative | Shared-key auth instead of the AAD values above |
| `AZURE_ASSETS_PUBLIC_URL` | app | Public base URL of the container. Set **after** upload + verify to switch rendering to Azure |

## Current account state (2026-09-01)

- All **1027 site files (350.2 MB)** + **1166 Strapi uploads (205 MB)** uploaded and
  verified (`ALL ASSETS VERIFIED`, 2193/2193 identical).
- **New Strapi uploads**: Strapi now writes uploads DIRECTLY to Azure via the
  custom provider `cms/strapi-provider-upload-azure-sp` (service-principal
  auth, configured in `cms/config/plugins.ts`, env in `cms/.env`). Uploaded
  files get absolute Azure URLs — no local copy, no sync watcher needed.
  `assets:sync-strapi -- --watch` is now only a legacy/backup tool.
- **Legacy `/uploads/...` media rows**: `mediaUrl()` in `src/lib/strapi.ts`
  rewrites them to `…/strapi-uploads/…` on Azure when `AZURE_ASSETS_PUBLIC_URL`
  is set (all 1166 mirrored + md5-verified). Unset the var to serve from
  Strapi again.
- Container `website-assets` is **private**: the storage account has
  *"Allow Blob public access"* **disabled**, so browsers get `409 PublicAccessNotPermitted`
  on direct blob URLs. Only an account owner can change this:
  *Portal → Storage account → ambientwebasset → Configuration →
  Allow Blob public access → Enabled*, then run:
  ```bash
  node -e "import('./scripts/azure/lib.mjs').then(async m => { m.loadDotEnv(); const s = m.createBlobServiceClient(); await s.client.getContainerClient('website-assets').setAccessPolicy('blob'); console.log('public read enabled'); })"
  ```
- Until that is enabled, `AZURE_ASSETS_PUBLIC_URL` stays unset and the site
  serves assets locally (zero-impact by design). Once enabled, set
  `AZURE_ASSETS_PUBLIC_URL=https://ambientwebasset.blob.core.windows.net/website-assets`
  and restart.
- Note: setting service-level CORS is not possible with a data-plane-only role —
  the upload script logs a warning and continues (harmless: the app loads assets
  via `<img>`/redirects, not client-side `fetch`).

## Commands

```bash
# 1. Inventory of every local file (path, size, md5, content-type)
npm run assets:manifest

# 2. Upload everything (idempotent — re-run resumes, identical files are skipped)
npm run assets:upload

# 3. Verify EVERY asset: missing / md5 / size — exits non-zero on any loss
npm run assets:verify

# (optional) bullet-proof mode: download every blob back and re-hash it
npm run assets:verify -- --deep

# (optional) also back up Strapi uploads (cms/public/uploads → strapi-uploads/ prefix)
npm run assets:upload -- --with-strapi

# Strapi media → Azure: one-shot mirror, or leave --watch running to auto-push
# every new picture/PDF an editor uploads through the Strapi admin
npm run assets:sync-strapi
npm run assets:sync-strapi -- --watch --interval=10

# (optional) disaster recovery — download all blobs back to disk
npm run assets:restore -- --out=./restored-assets
```

### Useful flags

- `--dry-run` — show what would upload, touch nothing
- `--force` — re-upload even if md5 matches
- `--container=name` — override container for one run
- `--cache-control="public, max-age=31536000, immutable"` — longer caching once stable
- `--concurrency=16` — parallel uploads
- `--no-cors` — skip setting the blob-service CORS rule (GET/HEAD from any origin is set by default)

## Rollout order (do not reorder)

1. Paste `AZURE_STORAGE_CONNECTION_STRING` (+ container name) into `.env`.
2. `npm run assets:upload`
3. `npm run assets:verify` → must print `ALL ASSETS VERIFIED`
4. Spot-check a URL from the upload summary, e.g.
   `https://<account>.blob.core.windows.net/assets/footer/dot-separator.svg`
5. Set `AZURE_ASSETS_PUBLIC_URL=https://<account>.blob.core.windows.net/<container>` in `.env`
6. Restart the app — assets now render from Azure, same URLs.
7. Rollback at any time: remove `AZURE_ASSETS_PUBLIC_URL` → back to local files.

## Integrity guarantees

- Every blob is uploaded with an MD5 (`Content-MD5`) computed from the local file.
- `assets:verify` compares the full container listing against a freshly hashed
  local manifest — any missing/altered asset fails the run.
- Local files in `public/` are never deleted or modified by these scripts.
- Filenames are preserved byte-for-byte, including spaces and `@2x` suffixes.
