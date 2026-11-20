/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import { NewsListingHero } from "@/components/news-listing/NewsListingHero";
import { PressKit } from "@/components/news-listing/PressKit";
import { NewsGrid } from "@/components/news-listing/NewsGrid";
import { NewsBackdrop } from "@/components/news-listing/NewsBackdrop";
import { NewsletterSignup } from "@/components/site-footer/NewsletterSignup";
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

import { TabletScaleInit } from "@/components/shared/TabletScaleInit";

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
      <TabletScaleInit />
      <div id="news-hero" className="scroll-mt-[90px]"><NewsListingHero data={data?.hero} /></div>
      <div className="relative w-full">
        <NewsBackdrop data={data?.grid} />
        <div id="news-press-kit" className="scroll-mt-[90px]"><PressKit data={data?.press_kit} /></div>
        <div id="news-grid" className="scroll-mt-[90px]"><NewsGrid data={data?.grid} articles={buildNewsArticles(articles)} /></div>
      </div>
      {/* Newsletter placed outside the NewsGrid wrapper to avoid overlap from mb-[-409px] */}
      <div id="news-newsletter" className="relative z-10 hidden min-[600px]:flex w-full justify-center pb-[20px] min-[1024px]:mb-[-500px] pt-[300px] min-[1024px]:pt-[420px] scroll-mt-[90px]">
        <NewsletterSignup />
      </div>
    </main>
  );
}
