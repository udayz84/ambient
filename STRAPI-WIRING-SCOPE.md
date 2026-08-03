# Strapi Wiring Scope

**Goal:** Wire all textual content to Strapi CMS.
**Date:** Aug 02 2026

> **Note on the existing `STRAPI-STATUS-REPORT.md`:** It is dated Jul 10 and substantially out of date. Several "BROKEN" items it flags are now wired (article/job collections, Tech Partners, Advisory Board, Ecosystem, Resources filtering, mobile LatestNews/OpenRoles). Re-verify before relying on it.

## Cross-cutting risks (apply everywhere)

- **No `line-clamp` / `truncate` anywhere in `src/components/**`** — long CMS strings overflow raw (only `[word-break:break-word]` and frequent `whitespace-nowrap`, which overflows horizontally instead of wrapping).
- **Merge-by-index is the dominant pattern.** Almost every list section does `strapiItems.map((c, i) => ({ ...FALLBACK[i], ...c }))`. Extras past the fallback length either drop or clone the last fallback; missing ones fall back. This locks rendered counts.

---

## A. Orphaned collections

### A.1 `article` collection

Schema (`cms/src/api/article/schema.json`) is **rich and complete** — `title, slug, type, category (enum), excerpt, body (CKEditor), featured_image, alt, date, external_url, is_featured, show_on_homepage, display_order, seo`.

**Only ONE consumer reads it (Resources). The other three read embedded components instead.**

| Section | Files | Reads `article` collection? | Break risk | Effort |
|---|---|---|---|---|
| Latest News (home) | `LatestNews.tsx`, `LatestNewsMobile.tsx`, `latest-news-data.ts` | **NO** — reads `home-page.latest_news.cards` (`apps.article-card`) | `w-[1204px] gap-[20px]` fits exactly 3 cards (`w-[388px]`); 4th overflows. Map-by-index `% LATEST_NEWS_ARTICLES.length` — `category/date/href` always fallback. Card `h-[530px] w-[388px]`, image `h-[229.263px]` fixed. | medium |
| News Listing | `NewsGrid.tsx`, `news-data.ts` | **NO** — reads `news-listing-page.grid.filter_pills[].cards` (`news.card`) | Explicit `.slice(0,3)` and `.slice(3,6)` in `grid-cols-3` → hard 6-card cap. `cardsToArticles` map-by-index. | medium |
| Resources articles | `ResourcesContent.tsx`, `resources-data.ts` (`buildArticles`) | **YES** — `src/app/resources/page.tsx:28` calls `getCollection("articles", ...)` | `Math.ceil(n/3)` rows of 3; section `absolute top-[2026px]` with `top-[477px]` bg — adding articles lengthens the section, risks overlap with `ResourcesFeatured` at `absolute top-[716px]`. `initialVisible=6` + `load_more_count=3` are schema-backed. | small |
| Company articles | `CompanyArticles.tsx`, `company-articles-data.ts` | **NO** — reads embedded `company.articles.featured_article` + `compact_articles` | Compact column `w-[590px]` in `absolute top-[5069px] h-[692px]` holds 2 cards — a 3rd overflows. `compact-article` schema has only `title, image, alt` (no `excerpt`/`category`) → always fallback. | medium |

### A.2 `job` collection → Careers Open Roles

**Schema exists** (`cms/src/api/job/schema.json`): `title, slug, category (relation→job-category), location (relation→job-location), employment_type (enum), description (richtext), apply_url, is_active`. Relations `job-category` / `job-location` also exist.

**State:** Wired. `src/app/careers/page.tsx:24` calls `getCollection("jobs", "populate=*")`, resolves relations (`:27-32`), injects as `data.open_roles.fetchedJobs` / `fetchedCategories`. `CareersOpenRoles.tsx:61` falls back to `CAREERS_JOBS` only when empty.

**Break risks:**
- `JOB_ROW_NODE_IDS` hardcoded array of 8 (`CareersOpenRoles.tsx:29-38`) — extras reuse `JOB_ROW_NODE_IDS[0]` (cosmetic dup, not a crash).
- React key is `job.title` (`:193`) — duplicate titles will crash.
- `JobRow` (`:470`): `h-[153px] w-[1204px]`, title `whitespace-nowrap` (`:476`) → long titles overflow horizontally.
- Height-diff effect (`:107-119`, `MAX_HEIGHT=1294`) self-heals for count changes via `onHeightDiffChange`.
- `apply_url` IS now passed through (`:198, :485`) — old "dropped" bug is fixed.

**Effort: small** (React-key stability + title overflow handling).

---

## B. Fully static components (no `data` prop)

| Component | Hardcoded text | Schema exists? | Break risk | Effort |
|---|---|---|---|---|
| `ProductsStickyNav.tsx:6-13` | 6 nav labels (Power VS Intelligences, Always On. Never asleep, Built for all, Metrics & Data, Architecture, Full Picture) + section IDs | No | None — labels scroll horizontally (`overflow-x-auto no-scrollbar`); but couples to `getElementById(id)` so label↔section-ID must match | small |
| `ContinuumOptionsBar.tsx:10-16` | 5 GPX labels (GPX10PRO/64/256/2000/8000) + fixed widths + `TICKS` 4×5 matrix | No | **High** — fixed widths sum + tick ruler pattern assumes exactly 5 items; `absolute left-[98px] top-[177px] w-[1244px]` | medium |
| `not-found.tsx:6-8,33,37-50` | "404", "You've wandered off the circuit", "Let's get you back...", "BACK TO HOMEPAGE" | No | None — flexible layout | small |
| `DvkScrollIndicator.tsx:60` | "SCROLL" | No | None — decorative | small |
| `PlatformScaleNav.tsx` | No text (just arrow imgs) | n/a | None | small |
| `PlatformScaleChipVisual.tsx:161-195` | "GPX 1", "GPX 5", "GPX 32", "GPX 64" labels + 6 hardcoded chip image paths | No (the `platform_scale` schema exists but this visual is not part of it — labels are decorative overlays at exact pixel coords) | **High** — labels positioned at specific `left/top` per Figma; tied to `chip-glass.png`/`chip-hero.png` crops | medium |
| `CompanyBottomCta.tsx:21,33,36` | "Ready to build the future of compute?", "APPLY NOW", "REFER A CANDIDATE" | No (no `bottom_cta` on `company-page`; careers has one but company doesn't) | Low — `w-[728px]` heading wraps via `[word-break:break-word]` | small |
| `CompanyEndSection.tsx` | None (wrapper) | n/a | None | small |
| `CompanyFooterBackdrop.tsx` | None (visual) | n/a | None | small |

---

## C. Hardcoded fallback data files (`*-data.ts`)

| Data file | Consumes Strapi? | Schema exists? | Break risk on wiring | Effort |
|---|---|---|---|---|
| `site-footer/footer-data.ts` | YES (`SiteFooter.tsx:34-83`) — nav/social/legal/copyright/crafted-by all merge by index | YES (`shared.footer`, `footer-section`, `social-link`) | Map-by-index `FALLBACK_FOOTER_NAV_SECTIONS[index]` (`SiteFooter.tsx:37`) — extras get `width: 158` default; desktop footer absolute-positioned `top-[626px]` with 4 columns. Adding a 5th column breaks the `max-w-[897px]` row. | small–medium |
| `ecosystem/ecosystem-data.ts` | YES (`EcosystemPartners.tsx:89-90` passes `silicon_partners`/`development_partners`) | YES (`home.ecosystem` → `partner`) | **High** — `resolvePartners` (`ecosystem-data.ts:93`) hardcodes `for (let i=0; i<5; i++)`, and `EcosystemPartnerRow.tsx:72` destructures exactly `[logo1..logo5]` with 4 hardcoded grid lines + Tezos/Octane slots. Layout is structurally 5 logos. | medium |
| `latest-news/latest-news-data.ts` | YES (both desktop + mobile) | YES (`home.latest-news` → `apps.article-card`) | See A.1 — 3-card cap, map-by-index `%` | medium |
| `news-listing/news-data.ts` | YES (`NewsGrid.tsx:48-80`) | YES (`news.grid` → `filter-pill` → `news.card`) | See A.1 — `slice(0,3)` / `slice(3,6)`, `grid-cols-3` | medium |
| `resources/resources-data.ts` | YES for articles (`buildArticles`), partial for featured | YES (`resources.featured-card`, `resources.content`, and the `article` collection) | `ResourcesFeatured.tsx:34-60` uses `Math.max(layoutCount, strapiCards.length)` — adapts up but layout dims (`imageWidth`, `imageClassName`) fall back to index 0 for extras. Section `absolute top-[716px] w-[1432px]` with `flex gap-[20px]` — 3 featured cards by width. | medium |
| `careers/careers-data.ts` | YES for jobs (via page); `CAREERS_WORK_CARDS` (3), `CAREERS_BENEFITS_CARDS` (6), filter options | YES (`careers.best-work`, `careers.benefits`) | `CareersBestWork` locked to 3 cards; benefits grid `grid-cols-3 × 2` = 6 fixed. Filter options now built dynamically from data when present. | medium |
| `company/company-leadership-data.ts` | YES — `LEADERSHIP_TEAM` + `ADVISORY_BOARD` | YES for both (`leadership.team` + `leadership.advisory_board`, both `shared.leader`) | `CompanyAdvisoryBoard.tsx:34-43` map-by-index `?? last`. Container `flex gap-[12px] w-[1204px]` renders 4 advisor slots — extras overflow. Field-name mismatch: schema uses `title`/`bio_paragraphs` (single text)/`photo`; frontend type uses `role`/`bioParagraphs[]`/`imageSrc` — `CompanyAdvisoryBoard.tsx:9-26` already translates. **ADVISORY_BOARD placeholders are GP-Singh clones** — schema supports real data, just needs seeding. | small (de-pin from fallback) |
| `company/company-engagement-data.ts` | YES (`CompanyEngagement.tsx:11-28`) | YES (`company.engagement` → `engagement-card`, `join-team`) | `CompanyEngagement.tsx:32` section `absolute top-[5991px] h-[746px] w-[1200px]`; inner `flex h-[386px] gap-[20px]` = 2 cards. Map-by-index `?? last`. `engagement-card` schema lacks `ctaHref`/image position fields — those stay from fallback. | medium |
| `company/company-articles-data.ts` | YES (`CompanyArticles.tsx`) | YES (`company.featured-article`, `compact-article`) | See A.1 — `featured.metadata.totalFunding`/`fundingRounds` always fallback (not in schema). Compact schema lacks `excerpt`/`category`. | medium |
| `company/company-technology-partners-data.ts` | YES (`CompanyTechnologyPartners.tsx:38-44`) | YES (`company.tech-partners` → `partner`) | `buildPartnerLogo` caps each logo to `maxW=120 maxH=40` and renders in `flex justify-between` — adapts to count; `COMPANY_TECHNOLOGY_PARTNER_LOGO_NODES` has 3 entries (extras get generated id). Old "void data" bug is **fixed**. | small |
| `platform-scale/platform-scale-data.ts` | Partially — `GPX_PRODUCTS` (5) consumed by `PlatformScaleCarousel`; `chip_image` field on `gpx-product` exists but `PlatformScaleChipVisual` (section B) ignores it | YES (`home.platform-scale` → `gpx-product`) | Carousel likely locks to 5 (verify `PlatformScaleCarousel.tsx`). Chip visual labels are hardcoded (B). | medium |
| `dvk/dvk-data.ts` | Mostly constants/gradients (no prose except `SPEC_CARDS` titles + items at `:50-99`: Memory / Wireless / Sensors / Debug Ports / Interfaces / MCU / Booting) | YES (`dvk-page` → `hardware-stack` likely; verify) | `SPEC_CARDS` is 7 cards in 3 rows; if `dvk.hardware-stack` schema has spec-card repeatable, map-by-index needed. | medium (verify schema) |
| `developer/developer-data.ts` | `DEVELOPER_ARTICLES` (3), `DEVELOPER_MODULES` (2), `DEVELOPER_COPILOTS` (3) — consumed by `DeveloperCodeSection` (reads `data.articles`), others verify | YES (`developer-page.code` → `code-article`; `modules`, `copilots`) | `DeveloperCodeSection.tsx:62-71` map-by-index — extras past 3 fall back to `DEVELOPER_ARTICLES[i]` (undefined → `""`). `ArticleColumn` is `w-[578px]` self-stretch in fixed `h-[646px]` CodeEditorCard sibling. | small–medium |
| `applications/applications-data.ts` | `APPLICATION_TABS` (8) + `FEATURE_CARDS` pair + `ACTIVE_TAB` | YES (`home.applications` → `app-tab` → `app-feature-card`) | `Applications.tsx:48-56` reads `tabs[activeIndex].feature_cards` (correct level — old bug fixed). Only renders `leftCard` + `rightCard` (2) — hardcoded pair, extras dropped. Tab labels rendered by `ApplicationsCategoryNav` — count-flexible. | small |
| `products-page/products-data.ts` | Huge file of layout constants + `FEATURE_CARDS` (4), `PRODUCTS_FEATURE_CARDS` (4), `ALWAYSON_STATS_DATA` (3), `USECASE_TABS` (6), `USECASE_CARDS` (2), `COMPARISON_COLUMNS` (4), `ARCH_STATS` (3), `MODELFORGE_STEPS` (3), `BENCH_CARDS` (3), `START_CARDS` (2) | YES (`products-page` and nested components exist) | `ProductsFeatures.tsx:66-79` map-by-index over `PRODUCTS_FEATURE_CARDS` — locks to 4, and the 4 visual variants (brain/coin/bubble/stack) have **no Strapi field** → always fallback. `COMPARISON_COLUMNS` is 4 fixed columns (table layout). | **large** (many sub-sections) |

---

## D. Inline hardcoded fallbacks inside components

| Component | What's hardcoded | Schema exists? | Break risk | Effort |
|---|---|---|---|---|
| `hero/Hero.tsx:26-43` | title, subtitle, scrollText, m0/m1 values (`100%`, `512 GOPs`), m0/m1 tag/title/description | YES (`home.hero` + `home.hero-metric`) | Desktop hero `h-[876px]`; title at `top-[130px] left-[936px] w-[442px]`, subtitle `w-[419px]`. Mobile splits value via `splitValue` regex. Text uses `[word-break:break-word]` — wraps vertically (could collide with `HeroMetrics`). Only renders `metrics[0]` and `metrics[1]` — hardcoded 2. | small |
| `contact/ContactForm.tsx:19-26,28-74` | heading/subtitle/messageHeading/checkboxLabel/submitLabel, `tracks` (3, with absolute `top`/`height`/`checkboxTop`/`connectorTop`), `formFields` (6, with absolute `left`/`top`) | YES (`contact.form` → `form-track` → `form-field`) | **High** — `tracks.map((track, index) => strapiTracks[index] ?? track)` (`:101-111`) locks to 3; each track has absolute coords. `formFields.map` (`:126-136`) locks to 6 grid fields. Section `absolute top-[2376px] h-[744px]`. **Form is still non-functional** — `<GreenCtaButton href={submitHref}>` (`:277`), no `<form>`/`onSubmit`. `mapInputType` now respects `email`/`phone` enums (old bug fixed). | medium (wiring) + large (make functional) |
| `developer/DeveloperCodeSection.tsx:12-51` | heading, subtitle, `DEFAULT_CODE_SNIPPET` (hardcoded C code) | YES (`developer.code` has `heading`, `subtitle`, `code_snippet`, `articles`) | `CodeEditorCard` is `h-[646px] w-[602px]` with `<pre>` body — long snippets overflow the card (no scroll). Code comes from single string field. | small |
| `products-page/ProductsFeatures.tsx:14-20` | FALLBACK_HEADING (with forced 2-line break logic at `:50-56`), FALLBACK_SUBTITLE, `BADGE_TEXT`, `CAPTION` (caption has NO Strapi field — always hardcoded) | YES (`products.features`) | `BADGE_TEXT`/`CAPTION` not wired. Cards map-by-index locked to 4 (see C). | small for text; medium for cards |
| `wearables/WearablesHero.tsx:16-23` | subtitle, watermark, title (2-line), 2 bg paths, primary/secondary CTA labels | YES (`application-page.hero` — `subtitle`, `watermark`, `title`, `background_image_1/2`, `primary_button`, `secondary_button`) | Desktop `h-[878px]`; title at `bottom-[158px] left-[98px] w-[411px]` with `title-frame.svg` — long titles overflow the frame. Watermark is `text-[200px] whitespace-nowrap`. | small |
| `wearables/WearablesParadigm.tsx:31-48,463-465` | statValue, statDesc, FALLBACK_CARDS (2: Legacy / A-Cube), heading, subtitle | YES (`application-page.paradigm` → cards) | **High** — `data?.cards?.[0]` and `?.[1]` hardcode exactly 2 cards (`:471-478`). Layout is two absolutely-positioned cards (`left-[134px]` / `left-[754px]`) + two stats panels at fixed coords. 3rd card dropped. `statValue`/`statDesc` only read from `cards[1]`. Mobile uses `LEGACY_ROWS`/`ACUBE_ROWS` hardcoded stat rows. | medium |
| `navbar/MobileMenu.tsx` | Only static icons; all labels come from `mapStrapiNavItems(data?.nav_items)` (`:78`) | YES (`navbar.header`) | `max-h-[400px]` on submenu (`:231`) — many children could overflow (no scroll). Logo `w-[135px] h-[38px]`. | small |
| `site-footer/SiteFooter.tsx` (uses `footer-data.ts`) | All fallbacks in footer-data; `siteName = brandData?.site_name || "ambient"` (`:85`) | YES | See C (footer-data). | small |

---

## E. SEO metadata

**Three distinct patterns — and one gap:**

| Page | Pattern | Source | Effort |
|---|---|---|---|
| `technology`, `SOM`, `news-listing`, `applications`, `applications/[slug]`, `products`, `developer`, `dvk` | ✅ `generateMetadata()` → `buildMetadata(seo, fallback)` | Strapi `shared.seo` (8 pages) | **small** — fully wired, fallback strings are the only hardcoded part |
| `resources`, `contact`, `company`, `careers` | ⚠️ Static `export const metadata` | Hardcoded only (4 pages) | **small** — convert to `generateMetadata`; schema (`shared.seo`) already attached on each single-type |
| **`page.tsx` (HOME)** | ❌ **NEITHER** — no `metadata` export, no `generateMetadata` | Falls through to `layout.tsx:20-23` → `title: "Ambient"`, `description: "Generated by Ambient"` (clearly placeholder) | **small** — add `generateMetadata` reading `home-page.seo` (schema exists at `home-page.schema.json:21`) |

`buildMetadata` (`src/lib/seo.ts`) handles `meta_title`, `meta_description`, `keywords`, `noindex`, `canonical_url`. The home gap is the most important SEO fix.

---

## Suggested order

### 1. Quick wins (small effort, real impact)
- **Home page SEO** — add `generateMetadata` to `src/app/page.tsx` reading `home-page.seo`. Also fix `layout.tsx` placeholder description.
- **Convert 4 static-metadata pages** (`resources` / `contact` / `company` / `careers`) to `generateMetadata`.
- **De-pin Advisory Board** from `ADVISORY_BOARD` placeholders — schema and translation layer already exist (`CompanyAdvisoryBoard.tsx:9-26`); just needs Strapi seeding + drop the GP-Singh clone fallbacks.

### 2. Medium-risk wiring (map-by-index locks)
- **Latest News / News Listing / Company articles** — decide whether to point at the `article` collection (currently orphaned in 3 of 4 consumers) or keep embedded components. Either way, remove the slice/index caps if editors should control count.
- **Ecosystem + Tech Partners partner rows** — structurally locked to 5 / 3 logos; if count must be editable, the row layout needs refactor.
- **ContactForm tracks/fields** — locked to 3 tracks + 6 grid fields with absolute coords; making counts dynamic requires layout rework. Form is still non-functional regardless.

### 3. Large effort
- **`products-page`** — many sub-sections each with hardcoded arrays (`products-data.ts` is 639 lines); `ProductsFeatures` visual variants have no Strapi field.
- **`wearables/WearablesParadigm`** — 2-card absolute layout + stats panels hardcode the entire visual structure.

### Verify before acting (schema not fully read)
- `platform-scale.gpx-product` field list
- `dvk.hardware-stack` spec-card schema
- `careers.best-work` / `benefits` card schemas

To confirm whether card-title/description fields exist or whether layout-only fallback is intentional.
