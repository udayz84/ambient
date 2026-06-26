import { NewsListingHero } from "@/components/news-listing/NewsListingHero";
import { PressKit } from "@/components/news-listing/PressKit";
import { NewsGrid } from "@/components/news-listing/NewsGrid";
import { NewsBackdrop } from "@/components/news-listing/NewsBackdrop";

export default function NewsListingPage() {
  return (
    <main className="flex w-full flex-col overflow-x-clip bg-black">
      <NewsListingHero />
      <div className="relative w-full">
        <NewsBackdrop />
        <PressKit />
        <NewsGrid />
      </div>
    </main>
  );
}
