import { NewsListingHero } from "@/components/news-listing/NewsListingHero";
import { PressKit } from "@/components/news-listing/PressKit";
import { NewsGrid } from "@/components/news-listing/NewsGrid";
import { NewsBackdrop } from "@/components/news-listing/NewsBackdrop";
import { getSingleType } from "@/lib/strapi";

export default async function NewsListingPage() {
  let data: any = null;
  try {
    data = await getSingleType<any>("news-listing-page", [
      "hero",
      "press_kit",
      "grid",
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
        <PressKit data={data?.press_kit} />
        <NewsGrid data={data?.grid} />
      </div>
    </main>
  );
}
