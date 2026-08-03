import type { Metadata } from "next";
import { Resources } from "@/components/resources/Resources";
import { buildArticles } from "@/components/resources/resources-data";
import { getCollection, getSingleType } from "@/lib/strapi";
import { buildMetadata, type SeoData } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  let seo: SeoData | null = null;
  try {
    const data = await getSingleType<{ seo: SeoData | null }>(
      "resources-page",
      ["seo"]
    );
    seo = data?.seo ?? null;
  } catch {
    seo = null;
  }
  return buildMetadata(seo, {
    title: "Resources",
    description:
      "Explore whitepapers, architectural deep-dives, case studies, and performance data from Ambient Scientific.",
  });
}

export default async function ResourcesPage() {
  let data: any = null;
  let articles: any[] = [];
  try {
    data = await getSingleType<any>("resources-page", [
      "hero",
      { section: "featured", nested: ["cards"] },
      "building",
      "content",
      "news_cta",
      "seo",
    ]);
  } catch {
    data = null;
  }
  try {
    articles = await getCollection<any>(
      "articles",
      "populate=*&sort[0]=display_order:asc&sort[1]=date:desc&pagination[pageSize]=100"
    );
  } catch {
    articles = [];
  }
  return <Resources data={data} articles={buildArticles(articles)} />;
}
