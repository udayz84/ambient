import type { Metadata } from "next";
import { Applications } from "@/components/applications/Applications";
import { DeveloperPlatform } from "@/components/developer-platform/DeveloperPlatform";
import { Ecosystem } from "@/components/ecosystem/Ecosystem";
import { Hero } from "@/components/hero/Hero";
import { LatestNews } from "@/components/latest-news/LatestNews";
import { MeasuredProof } from "@/components/measured-proof/MeasuredProof";
import { PlatformScale } from "@/components/platform-scale/PlatformScale";
import { Technology } from "@/components/technology/Technology";
import { getCollection, getSingleType } from "@/lib/strapi";
import { buildMetadata, type SeoData } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  let seo: SeoData | null = null;
  try {
    const data = await getSingleType<{ seo: SeoData | null }>("home-page", [
      "seo",
    ]);
    seo = data?.seo ?? null;
  } catch {
    seo = null;
  }
  return buildMetadata(seo, {
    title: "Ambient Scientific",
    description:
      "A new class of AI chips that unlocks richer intelligence from microwatt to hyperscaler cloud — once constrained by power, space and legacy design tradeoffs.",
  });
}

export default async function Home() {
  let data: any = null;
  try {
    data = await getSingleType<any>("home-page", [
      "hero",
      { section: "measured_proof", nested: ["tag", "stat_cards", "ctas"] },
      { section: "technology", nested: ["tag", "features", "image"] },
      { section: "platform_scale", nested: ["products", "cta"] },
      { section: "applications", nested: ["tabs", "cta"] },
      { section: "developer_platform", nested: ["cards"] },
      { section: "ecosystem", nested: ["silicon_partners", "development_partners", "cta"] },
      { section: "latest_news", nested: ["cards"] },
      "seo",
    ]);
  } catch {
    data = null;
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
      {data?.hero && <Hero data={data.hero} />}
      {data?.measured_proof && <MeasuredProof data={data.measured_proof} />}
      {data?.technology && <Technology data={data.technology} />}
      {data?.platform_scale && <PlatformScale data={data.platform_scale} />}
      {data?.applications && <Applications data={data.applications} />}
      {data?.developer_platform && (
        <DeveloperPlatform data={data.developer_platform} />
      )}
      {data?.ecosystem && <Ecosystem data={data.ecosystem} />}
      {data?.latest_news && <LatestNews data={data.latest_news} />}
    </main>
  );
}
