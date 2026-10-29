import type { Metadata } from "next";
import { Applications } from "@/components/applications/Applications";
import { HomeModelZooKits } from "@/components/home-model-zoo-kits/HomeModelZooKits";
import { DeveloperPlatform } from "@/components/developer-platform/DeveloperPlatform";
import { Ecosystem } from "@/components/ecosystem/Ecosystem";
import { HeroCarousel } from "@/components/hero/HeroCarousel";
import { LatestNews } from "@/components/latest-news/LatestNews";
import { MeasuredProof } from "@/components/measured-proof/MeasuredProof";
import { PlatformScale } from "@/components/platform-scale/PlatformScale";
import { Technology } from "@/components/technology/Technology";
import { ApplicationsPageWins } from "@/components/applications-page/ApplicationsPageWins";
import { TabletScaleInit } from "@/components/shared/TabletScaleInit";
import { getCollection, getSingleType } from "@/lib/strapi";
import { buildMetadata, type SeoData } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  let seo: SeoData | null = null;
  try {
    const data = await getSingleType<{ seo: SeoData | null }>("home-page", [
      "seo",
    ]);
    seo = data?.seo ?? null;
    if (seo?.meta_title) {
      seo = {
        ...seo,
        meta_title: seo.meta_title.replace(/\s*[—-]\s*Limitless AI\b/i, "").trim(),
      };
    }
  } catch {
    seo = null;
  }
  return buildMetadata(seo, {
    title: "Ambient Scientific",
    description:
      "A new class of AI chips that unlocks richer intelligence from microwatt to hyperscaler cloud once constrained by power, space and legacy design tradeoffs.",
  });
}

export default async function Home() {
  let data: any = null;
  try {
    // Fetch all sections except applications (fetched separately below to isolate failures)
    data = await getSingleType<any>("home-page", [
      {
        section: "hero",
        fields: ["video", "mobile_video"],
        nested: ["metrics", "announcements.image", "announcements.ctas"],
      },
      "hero_form",
      // NOTE: do NOT list a field in both `fields` and `nested` for the same parent —
      // Strapi v5 treats them as conflicting populate params and returns a 500.
      // If the parent is in `nested`, its children (including media) are already
      // populated via [populate]=* — no need to also list sub-fields.
      { section: "measured_proof", nested: ["tag", "stat_cards", "ctas"] },
      { section: "clients", nested: ["tag", "clients"] },
      { section: "technology", nested: ["tag", "features", "image", "cta"] },
      { section: "platform_scale", nested: ["products", "cta", "secondary_cta"] },
      { section: "model_zoo_kits", nested: ["cards"] },
      { section: "developer_platform", nested: ["cards"] },
      { section: "ecosystem", nested: ["silicon_partners", "development_partners", "cta"] },
      { section: "latest_news", nested: ["cards"] },
      "seo",
    ]);
  } catch {
    data = null;
  }

  // Fetch applications separately — build_tab component requires a DB migration
  // (components_home_build_tabs table). If it doesn't exist yet, Strapi returns
  // a 500 that would otherwise wipe all homepage data. Once Strapi is restarted
  // with the new schema, build_tab fields can be moved back into the main fetch.
  try {
    // tabs are in nested — hero_image/mobile_hero_image are included via [populate]=*
    const appsData = await getSingleType<any>("home-page", [
      { section: "applications", nested: ["tabs", "cta"] },
    ]);
    if (appsData?.applications && data) {
      data.applications = appsData.applications;
    } else if (appsData?.applications) {
      data = appsData;
    }
  } catch {
    // applications section unavailable — section will not render
  }

  // Case Studies: fetch applications-page wins so all pages share the same content and images
  let winsData: any = null;
  try {
    const appData = await getSingleType<any>("applications-page", [
      { section: "wins", nested: ["cards"] },
    ]);
    winsData = appData?.wins || null;
  } catch {
    winsData = null;
  }

  // Pull articles flagged for homepage display. These take precedence over
  // the embedded `latest_news.cards` components on the homepage — editors
  // manage article content once in the `articles` collection and toggle
  // `show_on_homepage` + `display_order` to control which surface here.
  try {
    const homepageArticles = await getCollection<any>(
      "articles",
      "filters[show_on_homepage][$eq]=true&sort[0]=display_order:asc&sort[1]=date:desc&populate[0]=featured_image&pagination[pageSize]=10",
    );
    if (homepageArticles && homepageArticles.length > 0 && data?.latest_news) {
      data.latest_news.articles = homepageArticles;
    }
  } catch {
    // Articles collection unavailable — fall back to embedded components.
  }

  return (
    <main className="flex w-full flex-col overflow-x-clip bg-black">
      <TabletScaleInit />
      {data?.hero && <HeroCarousel data={data.hero} formConfig={data.hero_form} />}
      {data?.measured_proof && <MeasuredProof data={data.measured_proof} />}
      <div id="case-studies" className="scroll-mt-[90px]">
        <ApplicationsPageWins data={winsData} />
      </div>
      {/* <EcosystemMarqueeStrip data={data?.clients} /> */}
      {data?.technology && <Technology data={data.technology} />}
      {data?.platform_scale && <PlatformScale data={data.platform_scale} />}
      {data?.applications && <Applications data={data.applications} />}
      <HomeModelZooKits data={data?.model_zoo_kits} />
      {data?.developer_platform && (
        <DeveloperPlatform data={data.developer_platform} />
      )}
      {data?.ecosystem && <Ecosystem data={data.ecosystem} />}
      {data?.latest_news && <LatestNews data={data.latest_news} />}
    </main>
  );
}
