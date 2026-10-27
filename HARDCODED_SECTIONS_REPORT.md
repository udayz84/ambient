# Audit Report: Hard-Coded & Non-Strapi Sections

This report provides an exhaustive, page-by-page breakdown of all sections across the entire Ambient Scientific web application that are hard-coded, not managed via Strapi CMS, or suffering from populate/fetching gaps.

---

## Executive Summary & Categorization

The decoupling between the frontend and Strapi CMS falls into four distinct categories:

1. **Completely Hard-Coded Sections (Zero Strapi Integration)**:
   Sections rendered in the UI that have no schema in Strapi, or where the frontend passes no data and renders static JSX.
2. **Missing Frontend Integrations (Schema exists in Strapi, but frontend is 100% hard-coded)**:
   Pages/sections where Strapi content-types already exist in the CMS, but the Next.js page does not query them and renders static components instead (most notably the **Model Zoo Page**).
3. **Populate / Data-Fetching Gaps**:
   Strapi components are defined in the schema, but Next.js does not specify `nested: [...]` in the populate query, forcing the frontend component to fall back to hardcoded mock data.
4. **Partially Hard-Coded Elements**:
   Sections where the text/title is dynamic from Strapi, but tables, tab images, icons, steps, or graphic assets are hardcoded in code.

---

## Page-by-Page Audit

---

### Global / Layout Components (`src/app/layout.tsx`)

| Element / Section | Status | Details & What is Hard-Coded | File Reference |
| :--- | :--- | :--- | :--- |
| **Cookie Consent Banner** | **100% Hard-Coded** | Does not exist in Strapi. Heading ("We value your privacy"), disclaimer copy, and action buttons ("Accept all", "Decline non-essential") are completely hardcoded. | `src/components/cookie-consent/CookieConsent.tsx` |
| **Newsletter Popup** | **100% Hard-Coded in Layout** | Strapi has a `popup` content-type, but `layout.tsx` renders `<NewsletterPopup />` without passing the `config` prop. All copy ("Stay in the loop", "Thank you for subscribing", form labels) falls back to hardcoded defaults. | `src/components/newsletter-popup/NewsletterPopup.tsx` |
| **Navbar Mega Menu & Dropdowns** | **Partially Hard-Coded** | • **"Shop" Button**: Hardcoded label and DigiKey URL (`DEFAULT_SHOP_ITEM`).<br>• **Applications Dropdown**: Hardcodes "Coming Soon" entries: *Drones, Robotics, Automotives, Medical* (`HARDCODED_COMING_SOON_APPLICATIONS`).<br>• **Processors Mega Menu**: Injects "Model Zoo" column if missing, and forces a "Coming soon" badge on `GPX40`.<br>• **Icons**: All dropdown icons are resolved from hardcoded local SVGs. | `src/components/navbar/nav-items.ts` |
| **Footer & Newsletter Strip** | **Partially Hard-Coded** | If Strapi footer relations are null/empty, falls back to hardcoded `FALLBACK_FOOTER_NAV_SECTIONS`, `FALLBACK_FOOTER_SOCIAL_LINKS`, `FALLBACK_FOOTER_LEGAL_LINKS`, and copyright text. In `news-listing/page.tsx`, `<NewsletterSignup />` is rendered with no data, using 100% hardcoded strings. | `src/components/site-footer/SiteFooter.tsx`<br>`src/components/site-footer/footer-data.ts` |

---

### 1. Home Page (`src/app/page.tsx`)

| Section | Status | Details & What is Hard-Coded | File Reference |
| :--- | :--- | :--- | :--- |
| **Ecosystem Partners Strip** | **100% Hard-Coded (Ignored in Code)** | `EcosystemPartners` explicitly discards CMS data: `resolveSlots` intentionally ignores `data` and always returns hardcoded partner logos (`CAROUSEL_ALL_SLOTS`). | `src/components/ecosystem/EcosystemPartners.tsx` |
| **Applications: "BUILD" Tab** | **100% Hard-Coded** | The final tab `"BUILD"` ("BUILD YOUR OWN APPLICATION") is injected manually into the tabs list as static code with no Strapi backing. | `src/components/applications/Applications.tsx` |
| **Applications: Feature Cards** | **Populate Gap → Fallback** | In `src/app/page.tsx`, `applications` is queried with `nested: ["tabs", "cta"]`. However, `tabs.feature_cards` and `tabs.hero_image` are sub-components and are not populated. They fall back to hardcoded `FEATURE_CARDS` ("Tire Pressure Monitoring" & "Battery Management"). | `src/components/applications/Applications.tsx` |
| **Home Model Zoo Kits** | **Partially Hard-Coded** | Card #1 image is strictly forced to `/model-zoo/ModelF.png` in code (`img: i === 0 ? "/model-zoo/ModelF.png" : ...`), ignoring whatever image is uploaded in Strapi. Background arcs (`arc-78.svg` to `arc-80.svg`) are static SVGs. | `src/components/home-model-zoo-kits/HomeModelZooKits.tsx` |
| **Platform Scale Carousel** | **Partially Hard-Coded** | Falls back to hardcoded `GPX_PRODUCTS` (GPX 1, GPX 5, GPX 10, GPX 32, GPX 64) if not populated from CMS. | `src/components/platform-scale/PlatformScaleCarousel.tsx` |
| **Case Studies** | **Schema Bypass** | Homepage bypasses its own Strapi `home.case_studies` schema and fetches wins from `applications-page` instead. | `src/app/page.tsx` |

---

### 2. Products Page (`src/app/products/page.tsx`)

| Section | Status | Details & What is Hard-Coded | File Reference |
| :--- | :--- | :--- | :--- |
| **"Ready to Run" Model Zoo Strip** | **100% Hard-Coded** | **Does not exist in Strapi schema**. Component takes zero props. Eyebrow ("Ready to Run"), Title ("GPX10 Pro already speaks your application."), description, and two marquee rows of cards (`COLLAGE_ROW_1`, `COLLAGE_ROW_2`) are completely hardcoded. | `src/components/products-page/ProductsReadyToRun.tsx` |
| **Always-On Interactive State** | **Partially Hard-Coded** | All visual states, chip artwork, icons, lines, brackets, swooshes, and corner graphics (`bg-surge-new.webp`, `bg-subconscious-new.webp`, `ai-core-icon.webp`, `host-cpu.webp`, `glow-swoosh.svg`) are hardcoded local files. | `src/components/products-page/ProductsAlwaysOn.tsx` |
| **Use Cases Showcase** | **Partially Hard-Coded** | All tab images (`USE_CASE_IMAGES`: Hearables, Smart Homes, Industrial, Automotive, Medical, Agriculture, Drones, Wearables, Robotics) are hardcoded local image paths. | `src/components/products-page/ProductsUseCases.tsx` |
| **ModelForge Sub-Features** | **Partially Hard-Coded** | `SUB_FEATURES` ("Speaks matrix math natively...", and technical SVGs) are completely hardcoded in code. | `src/components/products-page/ProductsModelForge.tsx` |
| **Architecture Blueprint Highlights** | **Partially Hard-Coded** | Interactive block highlight coordinates, line connectors, and SVGs (`ARCH_BLOCKS`, `ARCH_HIGHLIGHTS`, `ARCH_LINES`) are hardcoded. | `src/components/products-page/ProductsArchitecture.tsx` |
| **The Full Picture (Specs)** | **Partially Hard-Coded** | 9 spec cards with icons (`ICON_CONTROL`, `ICON_SENSING`, etc.) and callout connector lines are defined statically in code. | `src/components/products-page/ProductsFullPicture.tsx` |
| **Start Building Section** | **Partially Hard-Coded** | Background card texture (`/Rectangle 1618873545.png`) and fallback cards (`START_CARDS`) are hardcoded. | `src/components/products-page/ProductsStartBuilding.tsx` |

---

### 3. Technology Page (`src/app/technology/page.tsx`)

| Section | Status | Details & What is Hard-Coded | File Reference |
| :--- | :--- | :--- | :--- |
| **Efficiency Comparison Table** | **100% Hard-Coded** | **The entire comparison table is hardcoded**. Strapi `tech.efficiency` schema ONLY defines `heading` and `subtitle`. The architecture rankings (A-Cube, Flash, GPU, MCU), TOPS/W values, power bars, compute density area bars, and trade-off badges are 100% hardcoded in `ROWS`. | `src/components/technology-page/TechnologyPageEfficiency.tsx` |
| **Modes Section Cards & Labels** | **Populate Gap → Fallback** | Strapi schema has `mode_cards` and `mode_labels`, but `technology/page.tsx` queries `"modes"` without `nested: ["mode_cards", "mode_labels"]`. All 3 cards (*Subconscious AI*, *ReflexSurge mode*, *settling back down*) and all 4 labels fall back to hardcoded `MODE_CARD_CONFIG` and `MODE_LABEL_CONFIG`. | `src/components/technology-page/TechnologyPageModes.tsx` |
| **Silicon Stat Cards** | **Populate Gap → Fallback** | Strapi schema has `stat_cards`, but `technology/page.tsx` queries `"silicon"` without `nested: ["stat_cards"]`. The 512 GOPS and ~80 uW cards fall back to `FALLBACK_STATS`. Background image is also hardcoded (`/technology/silicon-bg.png`). | `src/components/technology-page/TechnologyPageSilicon.tsx` |

---

### 4. Applications Listing Page (`src/app/applications/page.tsx`)

| Section | Status | Details & What is Hard-Coded | File Reference |
| :--- | :--- | :--- | :--- |
| **"Ready to Run" / Model Zoo Strip** | **100% Hard-Coded** | Rendered with zero props (`<ApplicationsPageModelZoo variant="strip" />`). Eyebrow ("READY TO RUN"), Title ("Every application here runs on real, ready models."), Subtitle, and all marquee cards (`COLLAGE_ROW_1`, `COLLAGE_ROW_2`) are 100% hard-coded. | `src/components/applications-page/ApplicationsPageModelZoo.tsx` |
| **The Ambient Continuum** | **Partially Hard-Coded** | The 5 tier visual scenes (Microwatt, Physical, Personal, Enterprise, Sovereign) with pedestals, floating chips, masks, and badges (`cont3-mw-pedestal.webp`, `cont3-ph-float-a.webp`, etc.) are hardcoded local assets. | `src/components/applications-page/ApplicationsPageContinuum.tsx` |

---

### 5. Application Detail Page (`src/app/applications/[slug]/page.tsx`)

| Section | Status | Details & What is Hard-Coded | File Reference |
| :--- | :--- | :--- | :--- |
| **Model Zoo / Journey Cards** | **Partially Hard-Coded** | Slug-specific card images (`HEARABLES_CARD_IMAGES` for hearables, `IIOT_CARD_IMAGES` for industrial IoT) are hardcoded local image paths. Falls back to static `PARTNERS_WHY` journey step cards if Strapi data is missing. | `src/components/applications-page/ApplicationsPageModelZoo.tsx` |
| **Static Slug Fallbacks** | **Hardcoded Fallbacks** | If Strapi returns null, hardcodes mock empty section schemas for `wearables`, `smarthomes`, and `industrial_iot`. | `src/app/applications/[slug]/page.tsx` |

---

### 6. Developer Page (`src/app/developer/page.tsx`)

| Section | Status | Details & What is Hard-Coded | File Reference |
| :--- | :--- | :--- | :--- |
| **Start Building Section** | **100% Hard-Coded** | **Does not exist in Strapi schema**. Component takes zero props. Heading ("Start building with Ambient."), subtitle ("Everything from model to silicon, in one place free to start."), background (`/Rectangle 1618873545.png`), and buttons are entirely static in code. | `src/components/developer/DeveloperStartBuilding.tsx` |
| **AppForge Steps** | **Partially Hard-Coded** | `DEV_STEPS` ("Pair over BLE", "Flash a model instantly", "See results live"), `articleHeading`, and `ctas` are hardcoded and override the component. | `src/components/developer/DeveloperAppForge.tsx` |
| **Model Zoo Section** | **Partially Hard-Coded** | Stats (`STATS` with 3 icons and copy), title, subtitle, and CTA text fall back to hardcoded code. | `src/components/developer/DeveloperModelZoo.tsx` |
| **Coming Soon** | **Disabled in Code** | Exists in Strapi `developer-page` schema (`developer.coming-soon`), but is commented out in `developer/page.tsx`. | `src/app/developer/page.tsx` |

---

### 7. Cranium Evaluation Kit / DVK Page (`src/app/dvk/page.tsx`)

| Section | Status | Details & What is Hard-Coded | File Reference |
| :--- | :--- | :--- | :--- |
| **AppForge Step Boxes** | **Partially Hard-Coded** | `DVK_APP_FORGE_STEPS` ("Pair over BLE", "Flash a demo instantly", "See it live") are hardcoded in `Dvk.tsx` and override whatever is in Strapi. | `src/components/dvk/Dvk.tsx` |
| **Demos Section Fallbacks** | **Partially Hard-Coded** | Falls back to hardcoded `DEMO_CARDS` and `PHONE_CARD_FALLBACK` if Strapi demo cards are unseeded. | `src/components/dvk/DvkDemosCards.tsx` |
| **Coming Soon** | **Hard-Coded Null** | `DvkComingSoon` returns `null` and is not defined in Strapi `dvk-page` schema. | `src/components/dvk/DvkComingSoon.tsx` |

---

### 8. System-on-Module / SOM Page (`src/app/SOM/page.tsx`)

| Section | Status | Details & What is Hard-Coded | File Reference |
| :--- | :--- | :--- | :--- |
| **One Module, Many Products** | **100% Hard-Coded** | **Does not exist in Strapi schema**. Title ("Buy it once. Build your whole line on it."), subtitle, description, and the 4 product applications (`APPLICATIONS`: Smart-Home Sensor `/som/first.png`, Hearable `/som/second.png`, Wearable `/som/third.png`, Industrial Node `/som/fourth.png`) are completely static in code. | `src/components/som-page/SomOneModule.tsx` |
| **Footer Merge Background** | **100% Hard-Coded Asset** | `const image = FALLBACK_IMAGE;` (`/som/footer-merge.webp`) is hardcoded; the component does not even check `data?.image`. | `src/components/som-page/SomFooterMerge.tsx` |
| **Ready to Deploy** | **Partially Hard-Coded** | Fallback chip image (`/som/sparsh-chip.webp`), fallback titles, and connector SVGs are hardcoded. | `src/components/som-page/SomReadyToDeploy.tsx` |

---

### 9. Company Page (`src/app/company/page.tsx`)

| Section | Status | Details & What is Hard-Coded | File Reference |
| :--- | :--- | :--- | :--- |
| **Company DNA Value Cards** | **Populate Gap → Fallback** | In `src/app/company/page.tsx`, `"dna"` is queried without `nested: ["value_cards"]`. Because `value_cards` is not populated, the component falls back to the 4 hardcoded `VALUE_CARDS` (*Grounded in Science*, *Stay Curious. Stay Skeptical.*, *Chase the Impossible*, *Protect What Powers Us*). | `src/components/company/CompanyDna.tsx` |
| **Technology Partners** | **Partially Hard-Coded** | Falls back to hardcoded `FALLBACK_TECH_PARTNERS` (TSMC, Celus, EdgeAI, etc.). | `src/components/company/CompanyTechnologyPartners.tsx` |
| **Ecosystem Map & Columns** | **Partially Hard-Coded** | Map image falls back to `/company/Map.webp` and columns fall back to `FALLBACK_COLUMNS` (*Global Footprint*, *Distribution & Supply Chain*). | `src/components/company/CompanyEcosystemContent.tsx` |

---

### 10. Careers Page (`src/app/careers/page.tsx`)

| Section | Status | Details & What is Hard-Coded | File Reference |
| :--- | :--- | :--- | :--- |
| **Careers DNA Section** | **Populate Gap & Asset** | • Section background image is hardcoded: `const bgImg = "/careers/dna-section-bg.png";`.<br>• In `src/app/careers/page.tsx`, `"dna"` is queried without `nested: ["panels"]`. As a result, `data?.panels` is unpopulated and padded with empty cards. | `src/components/careers/CareersDna.tsx` |
| **Benefits & Perks** | **Partially Hard-Coded** | Falls back to `CAREERS_BENEFITS_CARDS` (6 benefit cards) if unseeded. | `src/components/careers/CareersBenefits.tsx` |

---

### 11. Partners Page (`src/app/partners/page.tsx`)

| Section | Status | Details & What is Hard-Coded | File Reference |
| :--- | :--- | :--- | :--- |
| **All Visual Assets & Icons** | **100% Hard-Coded by Design** | As documented in the file header: *"Icons, small images and background images are deliberately NOT in Strapi"*. All 5 journey images, 4 benefit icons, 5 capability icons, 4 proof icons, 6 partner icons, and 3 become-benefit icons are hardcoded local files. | `src/components/partners/partners-content.ts` |
| **Full Page Copy Fallbacks** | **Hardcoded Fallbacks** | If Strapi data is missing, the entire page falls back to full hardcoded objects: `PARTNERS_HERO`, `PARTNERS_WHY`, `PARTNERS_BENEFITS`, `PARTNERS_ECOSYSTEM`, `PARTNERS_PROOF`, `PARTNERS_DIRECTORY`, `PARTNERS_MATCH`, `PARTNERS_BECOME`, `PARTNERS_FOOTER_CTAS`. | `src/components/partners/partners-data.ts` |

---

### 12. News Listing Page (`src/app/news-listing/page.tsx`)

| Section | Status | Details & What is Hard-Coded | File Reference |
| :--- | :--- | :--- | :--- |
| **Newsletter Strip** | **100% Hard-Coded** | `<NewsletterSignup />` is rendered with **no props**. All text strings (*"Want to stay in the forefront of AI tech."*, button label, placeholder) are completely hardcoded in code. | `src/app/news-listing/page.tsx` |
| **Press Kit** | **Partially Hard-Coded** | Decorative title frame (`/news-listing/press-title-frame.svg`) and button styles are static. | `src/components/news-listing/PressKit.tsx` |

---

### 13. Article Detail Page (`src/app/article/[slug]/page.tsx`)

| Section | Status | Details & What is Hard-Coded | File Reference |
| :--- | :--- | :--- | :--- |
| **Related Articles Section** | **100% Hard-Coded** | The "Related Articles" section at the bottom of every article is hardcoded to render `LATEST_NEWS_ARTICLES.slice(0, 3)`. It does not query Strapi for related articles or articles in the same category. | `src/components/article/ArticleDetail.tsx` |

---

### 14. Resources Page (`src/app/resources/page.tsx`)

| Section | Status | Details & What is Hard-Coded | File Reference |
| :--- | :--- | :--- | :--- |
| **Building with Ambient** | **Partially Hard-Coded** | Circuit background graphic (`/resources/building-circuit-bg.png`) and title frame SVG are hardcoded local files. | `src/components/resources/ResourcesBuilding.tsx` |
| **Resource Articles** | **Partially Hard-Coded** | Falls back to static articles if the Strapi collection returns empty. | `src/components/resources/resources-data.ts` |

---

### 15. Model Zoo Page (`src/app/model-zoo/page.tsx`)

> **CRITICAL**: The **entire Model Zoo Page is hardcoded in the frontend**, even though Strapi already has a complete `model-zoo-page` schema with components for every section!

In `src/app/model-zoo/page.tsx`, the code only queries 3 popup form relations (`sdk_form`, `evalkit_form`, `request_form`). It does not fetch any section content:

| Section in `ModelZoo.tsx` | Status in Frontend | Matching Schema in Strapi CMS |
| :--- | :--- | :--- |
| **`<ModelZooHero />`** | **100% Hard-Coded** (takes zero data props) | `model-zoo.hero` |
| **`<ModelZooWatchItRun />`** | **100% Hard-Coded** (takes zero data props) | `model-zoo.watch-it-run` |
| **`<ModelZooLibrary />`** | **100% Hard-Coded** (all model cards & filters) | `model-zoo.library` |
| **`<ModelZooAppForge />`** | **Partially Hard-Coded** (steps hardcoded via `MODEL_ZOO_APP_FORGE_STEPS`) | `model-zoo.app-forge` |
| **`<ModelZooSteps />`** | **100% Hard-Coded** (all 3 deployment steps) | `model-zoo.steps` |
| **`<ModelZooBuildIt />`** | **100% Hard-Coded** (takes zero data props) | `model-zoo.build-it` |
| **`<ModelZooKits />`** | **100% Hard-Coded** (all kit cards) | `model-zoo.kits` |

---

### 16. Contact Page (`src/app/contact/page.tsx`)

| Section | Status | Details & What is Hard-Coded | File Reference |
| :--- | :--- | :--- | :--- |
| **Contact Map Pins** | **Partially Hard-Coded** | Map pin positioning, indicator SVG lines, and coordinate offsets (`locations` array) are hardcoded pixel coordinates for the 3 map slots. | `src/components/contact/ContactMap.tsx` |
| **Contact Form Tracks** | **Partially Hard-Coded** | Layout geometry, checkbox connector lines, and top offsets for Sales / Developer / Media tracks are hardcoded. | `src/components/contact/ContactForm.tsx` |

---

### 17 & 18. Privacy Policy & Terms & Conditions (`/privacy-policy`, `/terms-conditions`)

- **Status**: **Fully dynamic from Strapi**.
- Both pages query the `legal-page` single-type and render the rich text HTML content (`privacy_policy_content` and `terms_conditions_content`). No sections are hard-coded here.

---

## Action Checklist for Implementation

1. **Connect Model Zoo Page (`/model-zoo`)**:
   - Update `src/app/model-zoo/page.tsx` to populate and pass `hero`, `watch_it_run`, `library`, `app_forge`, `steps`, `build_it`, and `kits`.
   - Update the 7 sub-components in `src/components/model-zoo/` to accept and render `data`.
2. **Missing Strapi Schemas to Add**:
   - **Products Page**: Add `ready_to_run` component for `<ProductsReadyToRun />`.
   - **Developer Page**: Add `start_building` component for `<DeveloperStartBuilding />`.
   - **SOM Page**: Add `one_module` component for `<SomOneModule />`.
   - **Technology Page**: Add a repeatable table component for `<TechnologyPageEfficiency />` (Architecture comparison table).
   - **Applications Page**: Add `ready_to_run` component for `<ApplicationsPageModelZoo variant="strip" />`.
   - **Article Detail Page**: Add a relation or query for `related_articles`.
3. **Populate Query Fixes**:
   - **Technology Page**: Add `nested: ["mode_cards", "mode_labels"]` to `"modes"` and `nested: ["stat_cards"]` to `"silicon"`.
   - **Company Page**: Add `nested: ["value_cards"]` to `"dna"`.
   - **Careers Page**: Add `nested: ["panels"]` to `"dna"`.
   - **Home Page**: Add `nested: ["tabs.feature_cards"]` and `fields: ["tabs.hero_image"]` to `"applications"`.
   - **Root Layout**: Connect `popup` relation to `<NewsletterPopup config={...} />`.
