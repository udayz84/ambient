import type { Metadata } from "next";
import { ApplicationsPageHero } from "@/components/applications-page/ApplicationsPageHero";
import { ApplicationsPageDvk } from "@/components/applications-page/ApplicationsPageDvk";
import { ApplicationsPageContinuum } from "@/components/applications-page/ApplicationsPageContinuum";
import { ApplicationsPageArticles } from "@/components/applications-page/ApplicationsPageArticles";
import { ApplicationsPageWins } from "@/components/applications-page/ApplicationsPageWins";
import { ApplicationsPageSom } from "@/components/applications-page/ApplicationsPageSom";
import { getSingleType } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Applications | Ambient Scientific",
  description:
    "From microwatt edge sensors running on coin cells to air-cooled high-performance compute arrays, the GPX architecture scales seamlessly across the physical world.",
};

export default async function ApplicationsPage() {
  let data: any = null;
  try {
    data = await getSingleType<any>("applications-page", [
      "hero",
      { section: "death_of_hardware_tradeoffs", fields: ["carousel_images"], nested: ["features"] },
      "continuum",
      { section: "articles", nested: ["articles"] },
      { section: "wins", nested: ["cards"] },
      "som",
      "seo",
    ]);
  } catch {
    data = null;
  }

  return (
    <main className="flex w-full flex-col overflow-x-clip bg-black">
      {data?.hero && <ApplicationsPageHero data={data.hero} />}
      {data?.death_of_hardware_tradeoffs && (
        <ApplicationsPageDvk data={data.death_of_hardware_tradeoffs} />
      )}
      {data?.continuum && <ApplicationsPageContinuum data={data.continuum} />}
      {data?.articles && <ApplicationsPageArticles data={data.articles} />}
      {data?.wins && <ApplicationsPageWins data={data.wins} />}
      {data?.som && <ApplicationsPageSom data={data.som} />}
    </main>
  );
}
