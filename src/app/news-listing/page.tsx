import type { Metadata } from "next";
import { NewsListingHero } from "@/components/news-listing/NewsListingHero";
import { PressKit } from "@/components/news-listing/PressKit";
import { NewsGrid } from "@/components/news-listing/NewsGrid";
import { NewsBackdrop } from "@/components/news-listing/NewsBackdrop";
import { getSingleType } from "@/lib/strapi";
import { buildMetadata, type SeoData } from "@/lib/seo";

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

  return (
    <main className="flex w-full flex-col overflow-x-clip bg-black">
      <NewsListingHero data={data?.hero} />
      <div className="relative w-full">
        <NewsBackdrop data={data?.grid} />
        {/* Dotted grid spans Press Kit + bleeds into News Grid (not clipped to fold 2) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.15)_1.5px,_transparent_1.5px)] bg-[length:16px_16px] min-[1024px]:-bottom-[409px]"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 0%, #000 42%, transparent 78%)",
            maskImage:
              "linear-gradient(to bottom, #000 0%, #000 42%, transparent 78%)",
          }}
        />
        <PressKit data={data?.press_kit} />
        <NewsGrid data={data?.grid} />
      </div>
    </main>
  );
}
