# Strapi Integration Status Report — Ambient Scientific Website

**Report date:** Fri Jul 10 2026
**Scope:** Home, Careers, Contact, Resources, Company pages
**Stack:** Next.js 16 (App Router) + Strapi v5 (PostgreSQL) + Tailwind v4

---

## 1. Executive Summary

The site uses a **Strapi v5 backend (PostgreSQL)**. All five pages are wired to fetch a Strapi **single type** per page (`home-page`, `careers-page`, `contact-page`, `resources-page`, `company-page`) plus a shared `global-settings` single type for the navbar/footer.

**Headline status:**

| Area | Status |
|---|---|
| PostgreSQL database | **Running** (port 5432) — database `ambient_cms`, 332 tables |
| Strapi server process | **NOT running** (port 1338 not listening at report time) |
| Strapi server boot | **Verified working** — I started it; it booted and served all endpoints with HTTP 200 |
| 5 page single types in DB | **Seeded + PUBLISHED** (each has a `published_at` timestamp, not draft) |
| `global-settings` | **Seeded** (1 row) |
| `jobs` collection | **EMPTY** (0 rows) |
| `articles` collection | **EMPTY** (0 rows) |
| Admin user | 1 account exists |

**What this means for the client demo:** When the Strapi server is **running**, all five pages receive real CMS content. When it is **stopped** (current state), every page silently falls back to **hardcoded default content** baked into the components. In both cases the pages render without crashing — but the editorial content is only live when Strapi is up.

> ⚠️ **Action required before the client demo:** Start Strapi (`npm run develop` inside `cms/`) so the published CMS content is served. Confirm `NEXT_PUBLIC_STRAPI_URL` in `.env` points to the running instance (`http://localhost:1338`).

---

## 2. How Content Works (Static vs Dynamic Model)

Every page follows the same pattern:

1. `src/app/<page>/page.tsx` is an **async Server Component** that calls `getSingleType()` from `src/lib/strapi.ts` with deep `populate` params.
2. The fetch is wrapped in `try/catch` — on failure `data` becomes `null`.
3. Each section component receives its slice of `data` and renders it **with per-field `??` / `||` fallbacks** to hardcoded defaults.
4. Desktop and mobile are **separate code paths** (a desktop component + a self-contained `<Page>Mobile.tsx`), and the **fallback constants are duplicated** between them.

### Classification legend
- **DYNAMIC** — renders from the Strapi `data` prop; no meaningful hardcoded content.
- **DYNAMIC w/ FALLBACK** — renders from `data`, but falls back to hardcoded defaults when data is missing. (This is the dominant pattern.)
- **STATIC** — content is hardcoded in code; Strapi data is ignored or doesn't exist for it.
- **BROKEN** — Strapi data is fetched but never used, or a schema/code mismatch makes the CMS value unreachable.

---

## 3. Global / Shared Chrome (all pages)

| Element | Status | Notes |
|---|---|---|
| **Navbar** | DYNAMIC w/ FALLBACK | `Navbar` reads `global_settings.header`. Fallback nav in `src/components/navbar/nav-items.ts:7` (Products, Technology, Applications, Company, News & Resources, Blog, Career). Mapped via `mapStrapiNavItems()`. |
| **Footer** | DYNAMIC w/ FALLBACK | Reads `global_settings.footer`. Fallback link sections in `src/components/site-footer/footer-data.ts:9` (links use `href="#"` placeholders). |
| **Newsletter** | DYNAMIC w/ FALLBACK | Fallbacks in `footer-data.ts:85-89`. |
| **Layout fetch** | `src/app/layout.tsx:30-35` — `getGlobalSettings()` in try/catch. |

---

## 4. Page-by-Page Status

### 4.1 HOME PAGE (`/`) — src/app/page.tsx

**Fetch:** `home-page` single type, 8 sections populated. **Strapi data: PUBLISHED.**

| Section | Classification | Hardcoded content location | Issues |
|---|---|---|---|
| Hero | DYNAMIC w/ FALLBACK | `Hero.tsx`, `HeroMetrics.tsx`, `HeroVisualMedia.tsx` | None significant; `HeroVisualMedia` is `"use client"` (justified for video autoplay). |
| Measured Proof | DYNAMIC w/ FALLBACK | `MeasuredProofCards.tsx` (`FALLBACK_CARDS`), `MeasuredProofMobile.tsx` (`DESKTOP_CARDS`) | Mobile loop is fixed to fallback array length → drops extra Strapi cards if >4. Fallback duplicated across 2 files. |
| Technology | DYNAMIC w/ FALLBACK | `TechnologyFeatures.tsx`, `TechnologyMobile.tsx` | Central chip image (`chip-visual.png`) is **always hardcoded** — no Strapi field for it. |
| Platform Scale | DYNAMIC w/ FALLBACK | `platform-scale-data.ts` (`GPX_PRODUCTS`) | Mobile chip images **always hardcoded**, ignore Strapi `chip_image`. |
| Applications | DYNAMIC w/ FALLBACK | `applications-data.ts`, `ApplicationsHeroVisual.tsx` (`HERO_IMAGES`) | **BUG:** `active_tab` read at top level but field is nested per-tab → always falls back. **BUG:** `feature_cards` read at wrong level (schema nests inside each tab) → per-tab feature cards from Strapi never consumed. HEARABLES watermark inconsistent. |
| Developer Platform | DYNAMIC w/ FALLBACK | `developer-platform-cards.ts`, `DeveloperPlatformMobile.tsx` | **BUG:** `background` not in schema → always fallback. **BUG:** mobile ignores Strapi `cards` entirely (renders a static image). **Copy-paste:** heading/subtitle defaults are duplicated from Applications (wrong copy). |
| **Ecosystem** | **STATIC (partners)** | `ecosystem-data.ts`, `EcosystemPartnerRow.tsx` | **BUG:** `EcosystemPartners.tsx:89` does `void data` — Strapi `silicon_partners`/`development_partners` **explicitly ignored**. Partner logos hardcoded; `mediaUrl()` never used here. |
| Latest News | DYNAMIC w/ FALLBACK (desktop) / **STATIC (mobile)** | `latest-news-data.ts` (`LATEST_NEWS_ARTICLES`) | **BUG:** mobile always renders hardcoded array, ignores `data.cards`. Desktop can only pull title/body/image from Strapi (schema lacks category/date/href). |

**Home verdict:** Mostly CMS-driven on desktop; the **Ecosystem partners section is fully static** and mobile ignores Strapi for several sections.

---

### 4.2 CAREERS PAGE (`/careers`) — src/app/careers/page.tsx

**Fetch:** `careers-page` single type. **Strapi data: PUBLISHED.**

| Section | Classification | Hardcoded content location | Issues |
|---|---|---|---|
| Hero | DYNAMIC w/ FALLBACK | `CareersHero.tsx`, `CareersMobile.tsx` | None. |
| Best Work | DYNAMIC w/ FALLBACK | `careers-data.ts` (`CAREERS_WORK_CARDS`, 3 cards) | Layout locked to 3 cards; >3 from Strapi loses per-field fallback. |
| DNA | DYNAMIC w/ FALLBACK | `CareersDna.tsx` (`DNA_PANEL_FALLBACKS`, 5 panels), `CareersMobile.tsx` | Section background **always hardcoded** (no `background_image` field in schema). Mobile reads a non-existent `background_image` field (dead code). |
| Open Roles | Desktop: DYNAMIC w/ FALLBACK / **Mobile: STATIC** | `careers-data.ts` (`CAREERS_JOBS`, 8 jobs; filter options) | **4 bugs:** (1) Mobile **ignores Strapi jobs entirely** — always renders hardcoded `CAREERS_JOBS`. (2) Strapi `apply_url` fetched but **dropped** — apply buttons hardcode `href="#"`. (3) Static-fallback job-type filter has a **case mismatch** (lowercase vs UPPERCASE) → selecting a filter on fallback data shows "No jobs found". (4) `job_type_filters`/`location_filters` fields don't exist in schema (dead code). |
| Benefits | DYNAMIC w/ FALLBACK | `careers-data.ts` (`CAREERS_BENEFITS_CARDS`, 6 cards) | `title_frame` field read but not in schema (dead code). Grid rigid (3 cols). |
| Bottom CTA | DYNAMIC w/ FALLBACK | `CareersBottomCta.tsx` | **BUG:** `button.variant` enum mismatch — Strapi allows `primary/secondary/ghost` but code checks `=== "white"` → a white "Refer a Candidate" CTA is impossible from CMS data. |

**Careers verdict:** Desktop is largely CMS-driven. **The jobs collection type (`api::job`) is orphaned** — seeded by `seed-jobs.js` but the frontend never reads it (`getCollection` imported but unused). The page instead reads jobs nested inside the `open_roles` component. The `jobs` table is **empty (0 rows)** in the DB. **Mobile Open Roles is entirely static.**

---

### 4.3 CONTACT PAGE (`/contact`) — src/app/contact/page.tsx

**Fetch:** `contact-page` single type. **Strapi data: PUBLISHED.**

| Section | Classification | Hardcoded content location | Issues |
|---|---|---|---|
| Hero | DYNAMIC w/ FALLBACK | `ContactHero.tsx`, `ContactMobile.tsx` | Mobile correctly prefers `mobile_background_image`. None significant. |
| Resources | DYNAMIC w/ FALLBACK | `ContactResources.tsx` (`DEFAULT_CTAS`) | **BUG:** same `button.variant` mismatch — green CTA unreachable from Strapi. |
| Map | DYNAMIC w/ FALLBACK + **STATIC structure** | `ContactMap.tsx` (`locations` array, 3 entries) | Location **count locked to 3**; positional/layout data always hardcoded. A 4th office in Strapi is dropped. |
| Schedule | DYNAMIC w/ FALLBACK + **STATIC structure** | `ContactSchedule.tsx` (`cards`, 2 entries) | Card count locked to 2. **BUG:** CTA buttons are `href="#"` — no `cta_href` field in schema, so calendar links never work. |
| Form | DYNAMIC w/ FALLBACK + **NON-FUNCTIONAL** | `ContactForm.tsx` (`tracks`, `formFields`, 6 entries) | **CRITICAL — form does not submit.** No `<form>`, no `onSubmit`, no POST. Submit button is `<a href="#">`. **`field_type` enum ignored** — desktop always renders `<input type="text">`. Track ids hardcoded. No client-side validation. |

**Contact verdict:** Text/images are CMS-driven. **The contact form is non-functional** (UI only — nothing is sent anywhere). Booking CTAs and several links point to `#`.

---

### 4.4 RESOURCES PAGE (`/resources`) — src/app/resources/page.tsx

**Fetch:** `resources-page` single type. **Strapi data: PUBLISHED.**

| Section | Classification | Hardcoded content location | Issues |
|---|---|---|---|
| Hero | DYNAMIC w/ FALLBACK | `ResourcesHero.tsx`, `ResourcesMobile.tsx` | **BUG:** mobile ignores `mobile_background_image` (field exists in Strapi) — uses hardcoded path. Search button is `href="#"` (no search behavior). Stat cards fully static. |
| Featured | DYNAMIC w/ FALLBACK | `resources-data.ts` (`FEATURED_RESOURCES`, 3 cards) | **BUG:** Strapi card **images ignored** — `card.image` never read; images always from `resources-data.ts`. |
| Building | DYNAMIC w/ FALLBACK | `ResourcesBuilding.tsx` | **BUG:** reads `data.background` but **no `background` field in schema** → always fallback. **BUG:** mobile CTA is a no-op `<button>` (no href/onClick). |
| Content | Categories DYNAMIC / **Articles STATIC** | `resources-data.ts` (`RESOURCE_ARTICLES`, 12 cards) | **CRITICAL — articles fully hardcoded.** The `article` collection type is **never fetched** by the page. **`articles` table is empty (0 rows).** **BUG:** category filter does nothing (state updates but list never filters). "Read more" links are `href="#"`. |
| News CTA | DYNAMIC w/ FALLBACK | `ResourcesNewsCta.tsx` | Cleanest section; works correctly with functional link. |

**Resources verdict:** Headings/labels are CMS-driven. **The core "content/articles" section is a static mock** — not backed by the `article` collection at all. Category filtering is non-functional.

---

### 4.5 COMPANY PAGE (`/company`) — src/app/company/page.tsx

**Fetch:** `company-page` single type. **Strapi data: PUBLISHED.**

| Section | Classification | Hardcoded content location | Issues |
|---|---|---|---|
| Hero | DYNAMIC w/ FALLBACK (text) / **STATIC bg** | `CompanyHero.tsx` | Background **always hardcoded** (no `background_image` field in schema). Desktop/mobile inconsistency on field read. |
| Mission | DYNAMIC w/ FALLBACK | `CompanyMission.tsx` (`STATS`, 3 stats) | Layout metadata always fallback. |
| Leadership (team) | DYNAMIC w/ FALLBACK | `company-leadership-data.ts` (`LEADERSHIP_TEAM`, 3 members) | Layout has only **3 card positions** (`CARD_LEFT`) → >3 members breaks layout. Prev/next arrow buttons **non-functional** (no onClick). |
| Leadership (advisory) | **STATIC** | `company-leadership-data.ts` (`ADVISORY_BOARD`) | **No schema field exists.** 4 advisory slots are **placeholder clones of GP Singh** (same name/photo). |
| DNA | DYNAMIC w/ FALLBACK | `CompanyDna.tsx` (`VALUE_CARDS`, 4 cards) | Mobile ignores Strapi `background_image` (desktop uses it). Path inconsistency on map. |
| Ecosystem | DYNAMIC w/ FALLBACK | `CompanyEcosystemContent.tsx` | Only **2 columns rendered**; extras dropped. Mobile map path mismatch (`/Map.png` vs `/company/Map.png`). |
| **Tech Partners** | **STATIC** (logos); title dynamic | `company-technology-partners-data.ts`, `ecosystem-data.ts` | **BUG:** `partners` is fetched by `page.tsx` but **never used** — dead Strapi data. All partner logos hardcoded (incl. "Tezos"/"Octane"). |
| Articles | DYNAMIC w/ FALLBACK (partial) | `company-articles-data.ts` | Featured article `totalFunding`/`fundingRounds` always fallback (schema mismatch). Compact articles only pull title+image from Strapi. |
| Engagement | DYNAMIC w/ FALLBACK | `company-engagement-data.ts` | Only 2 card slots. Minor dead code on mobile gate. |

**Company verdict:** Mostly CMS-driven except **Tech Partners (fully static, fetched-but-ignored data)** and the **Advisory Board (no CMS backing, placeholder clones)**.

---

## 5. Cross-Cutting Issues (affect multiple pages)

1. **`button.variant` enum mismatch (global).** Strapi `shared.button` defines `primary/secondary/ghost`, but Careers and Contact code check for `white` / `green`. CMS editors cannot produce the secondary (white/green) button variants through Strapi.
2. **Desktop ↔ mobile fallback duplication.** Nearly every section hardcodes the same fallback content in two places (the desktop component and the `<Page>Mobile.tsx`), risking drift. Several mobile paths **ignore Strapi data** that desktop reads (Home Ecosystem/Latest News, Careers Open Roles, Company DNA bg, Resources hero bg).
3. **Merge-by-index coupling.** Map (3), Schedule (2), Form tracks (3), Benefits (6), DNA (4-5), Engagement (2) lock the rendered count to the hardcoded fallback array length. Adding/removing items in Strapi doesn't change the rendered count — extras are dropped, deletions fall back to hardcoded content.
4. **Schema/code mismatches (dead fetches).** Code reads Strapi fields that don't exist in the schema: `home.applications.active_tab`, `home.developer-platform.background`, `resources.building.background`, `resources.content.background_image`, `careers.dna.background_image`, `careers.benefits.title_frame`, `careers.open_roles.job_type_filters`. These always evaluate to fallback.
5. **Dead collection data.** `api::job.job`, `api::job-category.job-category`, and `api::article.article` are seeded (jobs/articles tables currently **empty**) but the frontend **never queries** the collection endpoints. Jobs are read via nested components instead; articles not at all.
6. **Non-functional CTAs/links.** Many CTAs point to `href="#"`: Careers apply buttons, Contact form submit + schedule calendar links, Resources "read more" + search button.
7. **Full-page blank on Strapi failure (Company, and partially others).** Section-level `data?.section ?` gating means that if a section key is entirely absent, that section renders nothing (no error, no fallback UI) — even though rich fallback constants exist. An empty object `{}` is truthy and renders fine; a missing key does not.
8. **TypeScript errors (5).** `tsc --noEmit` reports implicit-`any` params in `CareersOpenRoles.tsx:190`, `ContactForm.tsx:192`, `ContactMobile.tsx:696`. These will fail `next build` strict checks.

---

## 6. Functionality Verification

| Check | Result |
|---|---|
| Strapi API responds (all 5 single types + global-settings) | **PASS** (HTTP 200, real content, when server running) |
| `mediaUrl()` used for all Strapi images | PASS (except Ecosystem/Tech-Partners which hardcode logos) |
| Pages render without Strapi (graceful degradation) | PASS — all fetches in try/catch; components fall back to hardcoded defaults |
| Contact form submission | **FAIL** — no submission logic, button is `<a href="#">` |
| Resources category filtering | **FAIL** — UI updates state but list never filters |
| Resources/Careers article/job collections wired | **FAIL** — collections never fetched by frontend; tables empty |
| `npm run build` / typecheck | **FAIL** — 5 implicit-`any` TS errors (see §5.8) |
| Navbar/footer (global-settings) | PASS — dynamic with fallback |
| Metadata (per-page `title`/`description`) | PASS — statically defined in each `page.tsx` |

---

## 7. Pre-Demo Readiness Checklist

- [ ] **Start Strapi** (`cd cms && npm run develop`) — Postgres is already up; server is currently stopped.
- [ ] Confirm `.env` `NEXT_PUBLIC_STRAPI_URL=http://localhost:1338` resolves from the Next.js process.
- [ ] Fix the 5 TypeScript errors so `npm run build` passes.
- [ ] Decide stance on non-functional items for the demo: contact form (no submit), resources article filter (no-op), resources search (dead link), careers apply buttons (`#`).
- [ ] (Optional) Seed `jobs` and `articles` collections, OR present those sections as "static by design".
- [ ] (Optional) Reconcile `button.variant` enum so CMS-controlled button styles match the code.

---

## 8. Summary Scorecard

| Page | CMS Content in DB | Desktop CMS-driven | Mobile CMS-driven | Critical bugs |
|---|---|---|---|---|
| **Home** | Published | Mostly (Ecosystem static) | Partial (Ecosystem, Latest News static) | Ecosystem ignores data; Applications feature_cards wrong level |
| **Careers** | Published | Mostly (Open Roles dynamic) | **Open Roles fully static** | Apply URL dropped; filter case mismatch; mobile ignores jobs; variant enum |
| **Contact** | Published | Mostly | Mostly | **Form non-functional**; calendar links `#`; variant enum |
| **Resources** | Published | Partial | Partial | **Articles fully static & non-filtering**; card images ignored; schema mismatches |
| **Company** | Published | Mostly (Tech Partners static) | Mostly | Tech Partners fetched-but-ignored; Advisory Board is placeholder clones |

**Bottom line:** The CMS is healthy, seeded, and published for all five pages, and the server boots cleanly. The frontend integrates it for the majority of text/labels/images. The gaps are: a handful of sections that are static or ignore Strapi data (notably partners, news/articles, careers jobs on mobile, advisory board), and several non-functional interactions (contact form, resources filter/search, several `#` CTAs). These should be framed appropriately for the client.
