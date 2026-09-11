import type { Metadata } from "next";
import { NewsListingHero } from "@/components/news-listing/NewsListingHero";
import { PressKit } from "@/components/news-listing/PressKit";
import { NewsGrid } from "@/components/news-listing/NewsGrid";
import { NewsBackdrop } from "@/components/news-listing/NewsBackdrop";
import { getCollection, getSingleType } from "@/lib/strapi";
import { buildMetadata, type SeoData } from "@/lib/seo";
import { buildNewsArticles } from "@/components/news-listing/news-data";

export async function generateMetadata(): Promise<Metadata> {
  let seo: SeoData | null = null;
  try {
    const data = await getSingleType<{ seo: SeoData | null }>(
      "news-listing-page",
      ["seo"]
    );
    seo = data?.seo ?? null;
  } catch {
    seo = null;
  }
  return buildMetadata(seo, {
    title: "News | Ambient Scientific",
    description:
      "Press releases, news, and media resources from Ambient Scientific.",
  });
}

export default async function NewsListingPage() {
  let data: any = null;
  let articles: any[] = [];
  try {
    data = await getSingleType<any>("news-listing-page", [
      "hero",
      "press_kit",
      {
        section: "grid",
        fields: ["backdrop_image"],
        nested: ["filter_pills.cards"],
      },
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

  return (
    <main className="flex w-full flex-col overflow-x-clip bg-black">
      <NewsListingHero data={data?.hero} />
      <div className="relative w-full">
        <NewsBackdrop data={data?.grid} />
        <PressKit data={data?.press_kit} />
        <NewsGrid data={data?.grid} articles={buildNewsArticles(articles)} />
      </div>
    </main>
  );
}
