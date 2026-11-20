# Website Section & Unique ID Reference Guide

This document provides a complete directory of all pages across the website, their respective sections in render order, their exact HTML `id` attributes, deep-link URL anchors, and source code locations.

---

## 1. Global Layout

The global shell elements wrapping every page across the website.

| Element | HTML `id` | Anchor | Source Location | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Sticky Header / Navigation** | `site-header` | `#site-header` | [Navbar.tsx](../src/components/navbar/Navbar.tsx) | Added |
| **Site Footer** | `site-footer` | `#site-footer` | [SiteFooter.tsx](../src/components/site-footer/SiteFooter.tsx) | Added |

---

## 2. Homepage (`/`)
* **Page File**: [src/app/page.tsx](../src/app/page.tsx)

| # | Section Name | HTML `id` | Anchor | Source Location | Status |
| :- | :--- | :--- | :--- | :--- | :--- |
| 1 | **Hero Carousel & Announcements** | `home-hero` | `/#home-hero` | [HeroCarousel.tsx](../src/components/hero/HeroCarousel.tsx) | Added |
| 2 | **Measured Proof in Silicon** | `measured-proof` | `/#measured-proof` | [MeasuredProof.tsx](../src/components/measured-proof/MeasuredProof.tsx) | Pre-existing |
| 3 | **Case Studies & Customer Wins** | `case-studies`<br/>*(alias: `casestudies`)* | `/#case-studies`<br/>`/#casestudies` | [page.tsx](../src/app/page.tsx) | Pre-existing |
| 4 | **Technology Overview** | `home-technology` | `/#home-technology` | [Technology.tsx](../src/components/technology/Technology.tsx) | Added |
| 5 | **Platform Scale** | `home-platform-scale` | `/#home-platform-scale` | [PlatformScale.tsx](../src/components/platform-scale/PlatformScale.tsx) | Added |
| 6 | **Applications Showcase** | `home-applications` | `/#home-applications` | [Applications.tsx](../src/components/applications/Applications.tsx) | Added |
| 7 | **Model Zoo & Kits Preview** | `home-model-zoo-kits` | `/#home-model-zoo-kits` | [HomeModelZooKits.tsx](../src/components/home-model-zoo-kits/HomeModelZooKits.tsx) | Added |
| 8 | **Developer Platform** | `home-developer-platform` | `/#home-developer-platform` | [DeveloperPlatform.tsx](../src/components/developer-platform/DeveloperPlatform.tsx) | Added |
| 9 | **Partner Ecosystem** | `home-ecosystem` | `/#home-ecosystem` | [Ecosystem.tsx](../src/components/ecosystem/Ecosystem.tsx) | Added |
| 10 | **Latest News & Articles** | `home-latest-news` | `/#home-latest-news` | [LatestNews.tsx](../src/components/latest-news/LatestNews.tsx) | Added |

---

## 3. Products Page (`/products`)
* **Page File**: [src/app/products/page.tsx](../src/app/products/page.tsx)

| # | Section Name | HTML `id` | Anchor | Source Location | Status |
| :- | :--- | :--- | :--- | :--- | :--- |
| 1 | **Products Hero** | `products-hero` | `/products#products-hero` | [products/page.tsx](../src/app/products/page.tsx) | Added |
| 2 | **Power vs Intelligence (Features)** | `features` | `/products#features` | [products/page.tsx](../src/app/products/page.tsx) | Pre-existing |
| 3 | **Always On. Never Asleep** | `always-on` | `/products#always-on` | [products/page.tsx](../src/app/products/page.tsx) | Pre-existing |
| 4 | **Metrics & Data Specifications** | `metrics`<br/>*(alias: `datasheet`)* | `/products#metrics`<br/>`/products#datasheet` | [products/page.tsx](../src/app/products/page.tsx) | Pre-existing |
| 5 | **Customer Wins & Case Studies** | `case-studies` | `/products#case-studies` | [products/page.tsx](../src/app/products/page.tsx) | Pre-existing |
| 6 | **Use Cases ("Built for all")** | `use-cases` | `/products#use-cases` | [products/page.tsx](../src/app/products/page.tsx) | Pre-existing |
| 7 | **Ready to Run** | `products-ready-to-run` | `/products#products-ready-to-run` | [products/page.tsx](../src/app/products/page.tsx) | Added |
| 8 | **ModelForge SDK** | `products-modelforge` | `/products#products-modelforge` | [products/page.tsx](../src/app/products/page.tsx) | Added |
| 9 | **Bench to Volume (Hardware Scale)** | `products-bench-to-volume` | `/products#products-bench-to-volume` | [products/page.tsx](../src/app/products/page.tsx) | Added |
| 10 | **A-Cube Architecture Overview** | `architecture` | `/products#architecture` | [products/page.tsx](../src/app/products/page.tsx) | Pre-existing |
| 11 | **Full Picture** | `full-picture` | `/products#full-picture` | [products/page.tsx](../src/app/products/page.tsx) | Pre-existing |
| 12 | **Start Building & Lead Capture** | `products-start-building` | `/products#products-start-building` | [products/page.tsx](../src/app/products/page.tsx) | Added |

---

## 4. Technology Page (`/technology`)
* **Page File**: [src/app/technology/page.tsx](../src/app/technology/page.tsx)

| # | Section Name | HTML `id` | Anchor | Source Location | Status |
| :- | :--- | :--- | :--- | :--- | :--- |
| 1 | **Technology Hero** | `technology-hero` | `/technology#technology-hero` | [technology/page.tsx](../src/app/technology/page.tsx) | Added |
| 2 | **The Von Neumann Problem** | `technology-problem` | `/technology#technology-problem` | [technology/page.tsx](../src/app/technology/page.tsx) | Added |
| 3 | **3D Dual-Parallel Architecture** | `technology-architecture` | `/technology#technology-architecture` | [technology/page.tsx](../src/app/technology/page.tsx) | Added |
| 4 | **Operational Modes & Flexibility** | `technology-modes` | `/technology#technology-modes` | [technology/page.tsx](../src/app/technology/page.tsx) | Added |
| 5 | **Graph & Benchmark Comparisons** | `technology-graph` | `/technology#technology-graph` | [technology/page.tsx](../src/app/technology/page.tsx) | Added |
| 6 | **Energy Efficiency Breakdown** | `technology-efficiency` | `/technology#technology-efficiency` | [technology/page.tsx](../src/app/technology/page.tsx) | Added |
| 7 | **Silicon Implementation** | `technology-silicon` | `/technology#technology-silicon` | [technology/page.tsx](../src/app/technology/page.tsx) | Added |
| 8 | **Bottom Whitepaper CTA** | `technology-bottom-cta` | `/technology#technology-bottom-cta` | [technology/page.tsx](../src/app/technology/page.tsx) | Added |

---

## 5. System-on-Modules (`/SOM`)
* **Page File**: [src/app/SOM/page.tsx](../src/app/SOM/page.tsx)

| # | Section Name | HTML `id` | Anchor | Source Location | Status |
| :- | :--- | :--- | :--- | :--- | :--- |
| 1 | **SOM Hero** | `som-hero` | `/SOM#som-hero` | [SOM/page.tsx](../src/app/SOM/page.tsx) | Added |
| 2 | **SOM Key Features** | `som-features` | `/SOM#som-features` | [SOM/page.tsx](../src/app/SOM/page.tsx) | Added |
| 3 | **SOM Product Family** | `som-family` | `/SOM#som-family` | [SOM/page.tsx](../src/app/SOM/page.tsx) | Added |
| 4 | **One Module Specification** | `som-one-module` | `/SOM#som-one-module` | [SOM/page.tsx](../src/app/SOM/page.tsx) | Added |
| 5 | **Intelligence & Sensor Processing** | `som-intelligence` | `/SOM#som-intelligence` | [SOM/page.tsx](../src/app/SOM/page.tsx) | Added |
| 6 | **Deployment Path & Hardware Stacks** | `deploy-path` | `/SOM#deploy-path` | [SomDeployPath.tsx](../src/components/som-page/SomDeployPath.tsx) | Pre-existing |
| 7 | **Ready to Deploy** | `som-ready-to-deploy` | `/SOM#som-ready-to-deploy` | [SOM/page.tsx](../src/app/SOM/page.tsx) | Added |
| 8 | **Footer Contact & Sales CTA** | `som-footer-merge` | `/SOM#som-footer-merge` | [SOM/page.tsx](../src/app/SOM/page.tsx) | Added |

---

## 6. Development & Evaluation Kits (`/dvk`)
* **Page File**: [src/app/dvk/page.tsx](../src/app/dvk/page.tsx) & [Dvk.tsx](../src/components/dvk/Dvk.tsx)

| # | Section Name | HTML `id` | Anchor | Source Location | Status |
| :- | :--- | :--- | :--- | :--- | :--- |
| 1 | **DVK Hero** | `dvk-hero` | `/dvk#dvk-hero` | [Dvk.tsx](../src/components/dvk/Dvk.tsx) | Added |
| 2 | **Inside Module / Hardware Stack** | `dvk-content` | `/dvk#dvk-content` | [Dvk.tsx](../src/components/dvk/Dvk.tsx) | Pre-existing |
| 3 | **Prototype Hardware Title** | `dvk-prototype` | `/dvk#dvk-prototype` | [Dvk.tsx](../src/components/dvk/Dvk.tsx) | Added |
| 4 | **Live Interactive Demos** | `dvk-demos` | `/dvk#dvk-demos` | [Dvk.tsx](../src/components/dvk/Dvk.tsx) | Added |
| 5 | **Application Forge Mobile Demos** | `dvk-app-forge` | `/dvk#dvk-app-forge` | [Dvk.tsx](../src/components/dvk/Dvk.tsx) | Added |
| 6 | **ModelForge Toolchain** | `dvk-modelforge` | `/dvk#dvk-modelforge` | [Dvk.tsx](../src/components/dvk/Dvk.tsx) | Added |
| 7 | **Coming Soon Hardware** | `dvk-coming-soon` | `/dvk#dvk-coming-soon` | [Dvk.tsx](../src/components/dvk/Dvk.tsx) | Added |
| 8 | **Integrated Modules Showcase** | `dvk-integrated-modules` | `/dvk#dvk-integrated-modules` | [Dvk.tsx](../src/components/dvk/Dvk.tsx) | Added |
| 9 | **DVK Newsletter Subscription** | `dvk-newsletter` | `/dvk#dvk-newsletter` | [Dvk.tsx](../src/components/dvk/Dvk.tsx) | Added |

---

## 7. Model Zoo (`/model-zoo`)
* **Page File**: [src/components/model-zoo/ModelZoo.tsx](../src/components/model-zoo/ModelZoo.tsx)

| # | Section Name | HTML `id` | Anchor | Source Location | Status |
| :- | :--- | :--- | :--- | :--- | :--- |
| 1 | **Model Zoo Hero** | `model-zoo-hero` | `/model-zoo#model-zoo-hero` | [ModelZooHero.tsx](../src/components/model-zoo/ModelZooHero.tsx) | Added |
| 2 | **Content Anchor Spacer** | `model-zoo-content` | `/model-zoo#model-zoo-content` | [ModelZoo.tsx](../src/components/model-zoo/ModelZoo.tsx) | Pre-existing |
| 3 | **Watch It Run (Proof Cards)** | `model-zoo-watch-it-run` | `/model-zoo#model-zoo-watch-it-run` | [ModelZooWatchItRun.tsx](../src/components/model-zoo/ModelZooWatchItRun.tsx) | Added |
| 4 | **Model Search & Category Library** | `model-zoo-library` | `/model-zoo#model-zoo-library` | [ModelZooLibrary.tsx](../src/components/model-zoo/ModelZooLibrary.tsx) | Added |
| 5 | **Application Forge App Preview** | `application-forge`<br/>*(sub: `video`, `nurasync`)* | `/model-zoo#application-forge` | [ModelZooAppForge.tsx](../src/components/model-zoo/ModelZooAppForge.tsx) | Pre-existing |
| 6 | **Deployment Steps** | `model-zoo-steps` | `/model-zoo#model-zoo-steps` | [ModelZooSteps.tsx](../src/components/model-zoo/ModelZooSteps.tsx) | Added |
| 7 | **Custom Model Request ("Build It")** | `model-zoo-build-it` | `/model-zoo#model-zoo-build-it` | [ModelZooBuildIt.tsx](../src/components/model-zoo/ModelZooBuildIt.tsx) | Added |
| 8 | **Hardware Kits Preview** | `model-zoo-kits` | `/model-zoo#model-zoo-kits` | [ModelZooKits.tsx](../src/components/model-zoo/ModelZooKits.tsx) | Added |

---

## 8. Developer Platform (`/developer`)
* **Page File**: [src/app/developer/page.tsx](../src/app/developer/page.tsx)

| # | Section Name | HTML `id` | Anchor | Source Location | Status |
| :- | :--- | :--- | :--- | :--- | :--- |
| 1 | **Developer Hero** | `developer-hero` | `/developer#developer-hero` | [DeveloperHero.tsx](../src/components/developer/DeveloperHero.tsx) | Added |
| 2 | **Interactive Code & Architecture** | `developer-code` | `/developer#developer-code` | [DeveloperCodeSection.tsx](../src/components/developer/DeveloperCodeSection.tsx) | Added |
| 3 | **Model Forge Pipeline** | `developer-pipeline` | `/developer#developer-pipeline` | [DeveloperPipeline.tsx](../src/components/developer/DeveloperPipeline.tsx) | Added |
| 4 | **Embedded Model Zoo Showcase** | `developer-model-zoo` | `/developer#developer-model-zoo` | [DeveloperModelZoo.tsx](../src/components/developer/DeveloperModelZoo.tsx) | Added |
| 5 | **Application Forge Section** | `application-forge` | `/developer#application-forge` | [ModelZooAppForge.tsx](../src/components/model-zoo/ModelZooAppForge.tsx) | Pre-existing |
| 6 | **Developer Hardware Modules** | `developer-modules` | `/developer#developer-modules` | [DeveloperModulesSection.tsx](../src/components/developer/DeveloperModulesSection.tsx) | Added |
| 7 | **Developer Copilots** | `developer-copilots` | `/developer#developer-copilots` | [DeveloperCopilotsSection.tsx](../src/components/developer/DeveloperCopilotsSection.tsx) | Added |
| 8 | **Start Building Call-to-Action** | `developer-start-building` | `/developer#developer-start-building` | [DeveloperStartBuilding.tsx](../src/components/developer/DeveloperStartBuilding.tsx) | Added |

---

## 9. Applications Overview (`/applications`)
* **Page File**: [src/app/applications/page.tsx](../src/app/applications/page.tsx)

| # | Section Name | HTML `id` | Anchor | Source Location | Status |
| :- | :--- | :--- | :--- | :--- | :--- |
| 1 | **Applications Hero** | `applications-hero` | `/applications#applications-hero` | [applications/page.tsx](../src/app/applications/page.tsx) | Added |
| 2 | **Death of Hardware Tradeoffs** | `applications-dvk` | `/applications#applications-dvk` | [applications/page.tsx](../src/app/applications/page.tsx) | Added |
| 3 | **Intelligence Continuum** | `applications-continuum` | `/applications#applications-continuum` | [applications/page.tsx](../src/app/applications/page.tsx) | Added |
| 4 | **Featured Applications Articles** | `applications-articles` | `/applications#applications-articles` | [applications/page.tsx](../src/app/applications/page.tsx) | Added |
| 5 | **Customer Wins** | `applications-wins` | `/applications#applications-wins` | [applications/page.tsx](../src/app/applications/page.tsx) | Added |
| 6 | **Model Zoo Strip** | `applications-model-zoo` | `/applications#applications-model-zoo` | [applications/page.tsx](../src/app/applications/page.tsx) | Added |
| 7 | **System-on-Modules Preview** | `applications-som` | `/applications#applications-som` | [applications/page.tsx](../src/app/applications/page.tsx) | Added |

---

## 10. Application Details (`/applications/[slug]`)
* **Page File**: [src/app/applications/[slug]/page.tsx](../src/app/applications/[slug]/page.tsx)
* Covers dynamic application pages (`wearables`, `smarthomes`, `industrial-iot`).

| # | Section Name | HTML `id` | Anchor | Source Location | Status |
| :- | :--- | :--- | :--- | :--- | :--- |
| 1 | **Application Hero** | `application-hero` | `/applications/[slug]#application-hero` | [applications/[slug]/page.tsx](../src/app/applications/[slug]/page.tsx) | Added |
| 2 | **Paradigm Shift** | `application-paradigm` | `/applications/[slug]#application-paradigm` | [applications/[slug]/page.tsx](../src/app/applications/[slug]/page.tsx) | Added |
| 3 | **Case Studies / Wins** | `application-wins` | `/applications/[slug]#application-wins` | [applications/[slug]/page.tsx](../src/app/applications/[slug]/page.tsx) | Added |
| 4 | **Model Zoo Category Cards** | `application-model-zoo` | `/applications/[slug]#application-model-zoo` | [applications/[slug]/page.tsx](../src/app/applications/[slug]/page.tsx) | Added |
| 5 | **Empirical Proof** | `application-empirical-proof` | `/applications/[slug]#application-empirical-proof` | [applications/[slug]/page.tsx](../src/app/applications/[slug]/page.tsx) | Added |
| 6 | **Subconscious Processing** | `application-subconscious` | `/applications/[slug]#application-subconscious` | [applications/[slug]/page.tsx](../src/app/applications/[slug]/page.tsx) | Added |
| 7 | **Lab to Product Workflow** | `application-lab-to-product` | `/applications/[slug]#application-lab-to-product` | [applications/[slug]/page.tsx](../src/app/applications/[slug]/page.tsx) | Added |
| 8 | **Footer Accent & Consultation CTA** | `application-footer-accent` | `/applications/[slug]#application-footer-accent` | [applications/[slug]/page.tsx](../src/app/applications/[slug]/page.tsx) | Added |

---

## 11. Company Page (`/company`)
* **Page File**: [src/components/company/Company.tsx](../src/components/company/Company.tsx)

| # | Section Name | HTML `id` | Anchor | Source Location | Status |
| :- | :--- | :--- | :--- | :--- | :--- |
| 1 | **Company Hero** | `company-hero` | `/company#company-hero` | [CompanyHero.tsx](../src/components/company/CompanyHero.tsx) | Added |
| 2 | **Mission & Physics** | `company-mission` | `/company#company-mission` | [CompanyMission.tsx](../src/components/company/CompanyMission.tsx) | Added |
| 3 | **Leadership & Advisory Board** | `company-leadership` | `/company#company-leadership` | [CompanyLeadership.tsx](../src/components/company/CompanyLeadership.tsx) | Added |
| 4 | **Ambient DNA** | `company-dna` | `/company#company-dna` | [CompanyDna.tsx](../src/components/company/CompanyDna.tsx) | Added |
| 5 | **Resilient Ecosystem Map** | `company-ecosystem` | `/company#company-ecosystem` | [CompanyEcosystem.tsx](../src/components/company/CompanyEcosystem.tsx) | Added |
| 6 | **Technology Partners** | `company-tech-partners` | `/company#company-tech-partners` | [CompanyTechnologyPartners.tsx](../src/components/company/CompanyTechnologyPartners.tsx) | Added |
| 7 | **Featured Company News** | `company-articles` | `/company#company-articles` | [CompanyArticles.tsx](../src/components/company/CompanyArticles.tsx) | Added |
| 8 | **Get Involved & Engagement** | `company-engagement` | `/company#company-engagement` | [CompanyEngagement.tsx](../src/components/company/CompanyEngagement.tsx) | Added |

---

## 12. Careers Page (`/careers`)
* **Page File**: [src/components/careers/Careers.tsx](../src/components/careers/Careers.tsx)

| # | Section Name | HTML `id` | Anchor | Source Location | Status |
| :- | :--- | :--- | :--- | :--- | :--- |
| 1 | **Careers Hero** | `careers-hero` | `/careers#careers-hero` | [CareersHero.tsx](../src/components/careers/CareersHero.tsx) | Pre-existing |
| 2 | **Do the Best Work of Your Life** | `careers-best-work` | `/careers#careers-best-work` | [CareersBestWork.tsx](../src/components/careers/CareersBestWork.tsx) | Added |
| 3 | **Team DNA & Philosophy** | `careers-dna` | `/careers#careers-dna` | [CareersDna.tsx](../src/components/careers/CareersDna.tsx) | Added |
| 4 | **Open Roles & Positions List** | `open-roles` | `/careers#open-roles` | [CareersOpenRoles.tsx](../src/components/careers/CareersOpenRoles.tsx) | Pre-existing |
| 5 | **Benefits & Perks** | `careers-benefits` | `/careers#careers-benefits` | [CareersBenefits.tsx](../src/components/careers/CareersBenefits.tsx) | Added |
| 6 | **Careers Bottom CTA** | `careers-bottom-cta` | `/careers#careers-bottom-cta` | [CareersBottomCta.tsx](../src/components/careers/CareersBottomCta.tsx) | Added |

---

## 13. Contact Page (`/contact`)
* **Page File**: [src/components/contact/Contact.tsx](../src/components/contact/Contact.tsx)

| # | Section Name | HTML `id` | Anchor | Source Location | Status |
| :- | :--- | :--- | :--- | :--- | :--- |
| 1 | **Contact Hero** | `contact-hero` | `/contact#contact-hero` | [ContactHero.tsx](../src/components/contact/ContactHero.tsx) | Added |
| 2 | **Immediate Resources Glass Card** | `contact-resources` | `/contact#contact-resources` | [ContactResources.tsx](../src/components/contact/ContactResources.tsx) | Added |
| 3 | **Global Offices Map** | `contact-map` | `/contact#contact-map` | [ContactMap.tsx](../src/components/contact/ContactMap.tsx) | Added |
| 4 | **Schedule Consultation** | `calendar`<br/>*(alias: `schedule`)* | `/contact#calendar`<br/>`/contact#schedule` | [ContactSchedule.tsx](../src/components/contact/ContactSchedule.tsx) | Pre-existing |
| 5 | **Send a Message Form** | `sales-form` | `/contact#sales-form` | [ContactForm.tsx](../src/components/contact/ContactForm.tsx) | Pre-existing |

---

## 14. Partners Page (`/partners`)
* **Page File**: [src/components/partners/Partners.tsx](../src/components/partners/Partners.tsx)

| # | Section Name | HTML `id` | Anchor | Source Location | Status |
| :- | :--- | :--- | :--- | :--- | :--- |
| 1 | **Partners Hero** | `partners-hero` | `/partners#partners-hero` | [PartnersHero.tsx](../src/components/partners/PartnersHero.tsx) | Added |
| 2 | **Why Build With A Partner** | `partners-why` | `/partners#partners-why` | [PartnersWhy.tsx](../src/components/partners/PartnersWhy.tsx) | Added |
| 3 | **Partner Benefits** | `partners-benefits` | `/partners#partners-benefits` | [PartnersBenefits.tsx](../src/components/partners/PartnersBenefits.tsx) | Added |
| 4 | **Capabilities Matrix** | `partners-capabilities` | `/partners#partners-capabilities` | [PartnersCapabilities.tsx](../src/components/partners/PartnersCapabilities.tsx) | Added |
| 5 | **GPX-Native Proof** | `partners-proof` | `/partners#partners-proof` | [PartnersProof.tsx](../src/components/partners/PartnersProof.tsx) | Added |
| 6 | **Partner Directory** | `directory`<br/>*(grids: `partner-grid`, `partner-grid-mobile`)* | `/partners#directory` | [PartnersDirectory.tsx](../src/components/partners/PartnersDirectory.tsx) | Pre-existing |
| 7 | **Get Matched Inquiry Form** | `get-matched` | `/partners#get-matched` | [PartnersMatchForm.tsx](../src/components/partners/PartnersMatchForm.tsx) | Pre-existing |
| 8 | **Become a Partner Application** | `become-a-partner` | `/partners#become-a-partner` | [PartnersBecome.tsx](../src/components/partners/PartnersBecome.tsx) | Pre-existing |
| 9 | **Footer Action CTAs** | `partners-footer-ctas` | `/partners#partners-footer-ctas` | [PartnersFooterCtas.tsx](../src/components/partners/PartnersFooterCtas.tsx) | Added |

---

## 15. Resources Hub (`/resources`)
* **Page File**: [src/components/resources/ResourcesPageClient.tsx](../src/components/resources/ResourcesPageClient.tsx)

| # | Section Name | HTML `id` | Anchor | Source Location | Status |
| :- | :--- | :--- | :--- | :--- | :--- |
| 1 | **Resources Hero** | `resources-hero`<br/>*(search: `resources-hero-search`)* | `/resources#resources-hero` | [ResourcesHero.tsx](../src/components/resources/ResourcesHero.tsx) | Added |
| 2 | **Featured Whitepapers & Case Studies** | `whitepapers` | `/resources#whitepapers` | [ResourcesFeatured.tsx](../src/components/resources/ResourcesFeatured.tsx) | Pre-existing |
| 3 | **Building With Ambient** | `resources-building` | `/resources#resources-building` | [ResourcesBuilding.tsx](../src/components/resources/ResourcesBuilding.tsx) | Added |
| 4 | **Filterable Resource Content Library** | `resources-content` | `/resources#resources-content` | [ResourcesContent.tsx](../src/components/resources/ResourcesContent.tsx) | Added |
| 5 | **Latest News Banner & Newsletter** | `resources-news-cta` | `/resources#resources-news-cta` | [ResourcesNewsCta.tsx](../src/components/resources/ResourcesNewsCta.tsx) | Added |

---

## 16. News Listing (`/news-listing`)
* **Page File**: [src/app/news-listing/page.tsx](../src/app/news-listing/page.tsx)

| # | Section Name | HTML `id` | Anchor | Source Location | Status |
| :- | :--- | :--- | :--- | :--- | :--- |
| 1 | **News Hero** | `news-hero` | `/news-listing#news-hero` | [news-listing/page.tsx](../src/app/news-listing/page.tsx) | Added |
| 2 | **Press Kit Download** | `news-press-kit` | `/news-listing#news-press-kit` | [news-listing/page.tsx](../src/app/news-listing/page.tsx) | Added |
| 3 | **News Grid & Articles** | `news-grid` | `/news-listing#news-grid` | [news-listing/page.tsx](../src/app/news-listing/page.tsx) | Added |
| 4 | **Newsletter Signup** | `news-newsletter` | `/news-listing#news-newsletter` | [news-listing/page.tsx](../src/app/news-listing/page.tsx) | Added |

---

## 17. Article Detail (`/article/[slug]`)
* **Page File**: [src/components/article/ArticleDetail.tsx](../src/components/article/ArticleDetail.tsx)

| # | Section Name | HTML `id` | Anchor | Source Location | Status |
| :- | :--- | :--- | :--- | :--- | :--- |
| 1 | **Breadcrumb Navigation** | `article-nav` | `/article/[slug]#article-nav` | [ArticleDetail.tsx](../src/components/article/ArticleDetail.tsx) | Added |
| 2 | **Featured Article Media** | `article-media` | `/article/[slug]#article-media` | [ArticleDetail.tsx](../src/components/article/ArticleDetail.tsx) | Added |
| 3 | **Article Title & Metadata Header** | `article-header` | `/article/[slug]#article-header` | [ArticleDetail.tsx](../src/components/article/ArticleDetail.tsx) | Added |
| 4 | **Article Body Content** | `article-body` | `/article/[slug]#article-body` | [ArticleDetail.tsx](../src/components/article/ArticleDetail.tsx) | Added |
| 5 | **Related Articles** | `article-related` | `/article/[slug]#article-related` | [ArticleDetail.tsx](../src/components/article/ArticleDetail.tsx) | Added |

---

## 18. Legal Pages

* **Privacy Policy (`/privacy-policy`)**:
  * [PrivacyPolicy.tsx](../src/components/privacy-policy/PrivacyPolicy.tsx): `privacy-policy` (`/privacy-policy#privacy-policy`)
* **Terms & Conditions (`/terms-conditions`)**:
  * [TermsConditions.tsx](../src/components/terms-conditions/TermsConditions.tsx): `terms-conditions` (`/terms-conditions#terms-conditions`)

---

## 19. Electronica Munich Event Page (`/electronica-munich-2026`)
* **Page File**: [src/components/electronica-munich-2026/ElectronicaMunich2026.tsx](../src/components/electronica-munich-2026/ElectronicaMunich2026.tsx)

| # | Section Name | HTML `id` | Anchor | Source Location | Status |
| :- | :--- | :--- | :--- | :--- | :--- |
| 1 | **Event Hero** | `electronica-hero` | `/electronica-munich-2026#electronica-hero` | [ElectronicaMunich2026.tsx](../src/components/electronica-munich-2026/ElectronicaMunich2026.tsx) | Added |
| 2 | **Evaluation Kit Giveaway Form** | `eval-kit-form` | `/electronica-munich-2026#eval-kit-form` | [ElectronicaMunich2026.tsx](../src/components/electronica-munich-2026/ElectronicaMunich2026.tsx) | Pre-existing |
| 3 | **Why Ambient / What GPX Changes** | `why-ambient` | `/electronica-munich-2026#why-ambient` | [ElectronicaWhatChanges.tsx](../src/components/electronica-munich-2026/ElectronicaWhatChanges.tsx) | Pre-existing |
| 4 | **Case Studies & Proof** | `proof` | `/electronica-munich-2026#proof` | [ElectronicaProof.tsx](../src/components/electronica-munich-2026/ElectronicaProof.tsx) | Pre-existing |
| 5 | **What Could You Build (Applications)** | `applications` | `/electronica-munich-2026#applications` | [ElectronicaWhatCouldYouBuild.tsx](../src/components/electronica-munich-2026/ElectronicaWhatCouldYouBuild.tsx) | Pre-existing |
| 6 | **Ways to Build** | `electronica-ways-to-build` | `/electronica-munich-2026#electronica-ways-to-build` | [ElectronicaMunich2026.tsx](../src/components/electronica-munich-2026/ElectronicaMunich2026.tsx) | Added |
| 7 | **Ecosystem Pipeline** | `ecosystem-pipeline` | `/electronica-munich-2026#ecosystem-pipeline` | [ElectronicaCenterEcosystem.tsx](../src/components/electronica-munich-2026/ElectronicaCenterEcosystem.tsx) | Pre-existing |
| 8 | **Meet in Person** | `electronica-meet-in-person` | `/electronica-munich-2026#electronica-meet-in-person` | [ElectronicaMunich2026.tsx](../src/components/electronica-munich-2026/ElectronicaMunich2026.tsx) | Added |
| 9 | **Stay Updated** | `electronica-stay-updated` | `/electronica-munich-2026#electronica-stay-updated` | [ElectronicaMunich2026.tsx](../src/components/electronica-munich-2026/ElectronicaMunich2026.tsx) | Added |
