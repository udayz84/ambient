# SEO Automation

Automated `sitemap.xml`, `robots.txt`, and on-demand revalidation for Google Search.

## What's automated

| Event | Result | Action needed |
|---|---|---|
| New `page.tsx` added under `src/app` | Route appears in sitemap on next build | None |
| New `src/app/<x>/[slug]/page.tsx` shipped | Strapi collection URLs auto-added to sitemap | None (guard detects the folder) |
| Editor publishes/unpublishes in Strapi | Sitemap + list page refresh in seconds | Add 2 env vars + restart Strapi (once) |

## Is a domain required?

**No.** The webhook just needs an HTTP URL that Strapi can reach.

| Setup | Webhook URL | When |
|---|---|---|
| Local dev (both on same machine) | `http://localhost:3000/api/revalidate` | Now — no domain needed |
| Same network | `http://192.168.x.x:3000/api/revalidate` | Strapi in Docker, Next.js on host |
| Production | `https://app.vercel.app/api/revalidate` or any public URL | Even free hosting URLs work |

**And:** with no webhook at all, the sitemap still regenerates on its ISR schedule (every 1 hour) and on every deploy. The webhook only makes it instant.

## File structure

```
src/                                # Next.js app
  app/
    sitemap.ts                      # /sitemap.xml — auto-discovery + Strapi dynamic sources
    robots.ts                       # /robots.txt — allows all crawlers, points at sitemap
    api/revalidate/route.ts         # Strapi webhook receiver (secret-authenticated)
  lib/
    sitemap-routes.ts               # Filesystem walker (Level 1 engine)
.env.example                        # NEXT_PUBLIC_SITE_URL + REVALIDATE_SECRET

cms/                                # Strapi
  src/index.ts                      # bootstrap() auto-registers the webhook if env vars set
  .env.example                      # NEXT_SITE_URL + REVALIDATE_SECRET
```

## Webhook setup (one-time)

The webhook is **auto-registered** by `cms/src/index.ts` on every Strapi startup. You only need to set the env vars.

1. Generate a shared secret (run once):
   ```
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
2. Add the **same** two vars to BOTH `.env` files:
   ```
   # cms/.env (Strapi side — where the webhook is sent FROM)
   NEXT_SITE_URL=http://localhost:3000
   REVALIDATE_SECRET=<paste-the-secret>

   # .env (Next.js side — where the webhook is received)
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   REVALIDATE_SECRET=<paste-the-same-secret>
   ```
3. Restart Strapi. Look for one of these in the console:
   - `[webhook] registered http://localhost:3000/api/revalidate for events: entry.publish, entry.unpublish (id=...)` — first time
   - `[webhook] already registered (id=...) — events + headers re-synced.` — subsequent restarts
4. (Optional) Verify in **Strapi admin → Settings → Webhooks** — you'll see "Next.js revalidation".

For production, just change `NEXT_SITE_URL` / `NEXT_PUBLIC_SITE_URL` to the real URL before deploy. The bootstrap re-syncs automatically.

## How to extend

**New static page:** drop a `page.tsx` in `src/app/<route>/`. Done — sitemap picks it up. Optionally add an entry in `ROUTE_OVERRIDES` (in `sitemap.ts`) to customise priority/changeFrequency.

**New CMS-driven dynamic route** (e.g. `/news/:slug`):
1. Create `src/app/news/[slug]/page.tsx`.
2. Confirm a matching entry in `DYNAMIC_SOURCES` (in `sitemap.ts`).
3. Confirm the model is mapped in `MODEL_TO_LIST_PATH` (in `api/revalidate/route.ts`).

The sitemap automatically starts emitting `/news/<slug>` URLs once the `[slug]` folder exists.

## Fail-safes

- Missing `NEXT_SITE_URL` or `REVALIDATE_SECRET` in Strapi → bootstrap skips webhook registration silently (safe in early dev).
- Missing `NEXT_PUBLIC_SITE_URL` in Next.js → falls back to `https://localhost:3000` (dev only).
- Mismatched `REVALIDATE_SECRET` between Strapi and Next.js → webhook receiver returns 401.
- Missing `REVALIDATE_SECRET` on Next.js server → webhook receiver returns 500 fail-closed.
- Missing `[slug]` route folder → no dynamic URLs emitted (no 404s sent to Google).
- Strapi down → sitemap still serves last good cached copy; dynamic fetches return `[]`.

## Optional next steps

- Wire Strapi's per-page `seo` component into `generateMetadata` per route (real SEO win for OG/canonical).
- Submit sitemap to Bing Webmaster Tools alongside Google Search Console.
- Add a `<link rel="sitemap">` to the root layout for crawler hint.
