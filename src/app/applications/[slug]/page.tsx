import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WearablesHero } from "@/components/wearables/WearablesHero";
import { WearablesCarousel } from "@/components/wearables/WearablesCarousel";
import { WearablesParadigm } from "@/components/wearables/WearablesParadigm";
import { WearablesEmpiricalProof } from "@/components/wearables/WearablesEmpiricalProof";
import { WearablesLabToProduct } from "@/components/wearables/WearablesLabToProduct";
import { WearablesSubconscious } from "@/components/wearables/WearablesSubconscious";
import { WearablesFooterAccent } from "@/components/wearables/WearablesFooterAccent";
import { ApplicationsPageModelZoo } from "@/components/applications-page/ApplicationsPageModelZoo";
import { ApplicationsPageWins } from "@/components/applications-page/ApplicationsPageWins";
import { getCollection, buildPopulate } from "@/lib/strapi";
import { buildMetadata, type SeoData } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  let seo: SeoData | null = null;
  try {
    const query = `filters[slug][$eq]=${resolvedParams.slug}&${buildPopulate(["seo"])}`;
    const results = await getCollection<{ seo: SeoData | null }>(
      "application-pages",
      query
    );
    seo = results[0]?.seo ?? null;
  } catch {
    seo = null;
  }
  return buildMetadata(seo, {
    title: "Applications | Ambient Scientific",
    description: "Ambient Scientific Applications",
  });
}

export default async function ApplicationPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  let data: any = null;
  try {
    const query = `filters[slug][$eq]=${resolvedParams.slug}&${buildPopulate([
      "hero",
      "carousel",
      "paradigm",
      "subconscious",
      { section: "empirical_proof", nested: ["ecg_cards"] },
      { section: "lab_to_product", nested: ["cards"] },
      "footer_accent",
      "seo",
      { section: "wins", nested: ["cards.buttons"] },
      { section: "model_zoo", nested: ["primary_cta", "secondary_cta", "collage_row_1", "collage_row_2"] },
    ])}`;
    
    const results = await getCollection<any>("application-pages", query);
    data = results.length > 0 ? results[0] : null;
  } catch (error) {
    console.error("Failed to fetch application page:", error);
    data = null;
  }

  if (!data) {
    notFound();
  }

  return (
    <main className="flex w-full flex-col overflow-x-clip bg-black">
      {data?.hero && (
        <WearablesHero data={data.hero} />
      )}
      {data?.carousel && (
        <WearablesCarousel data={data.carousel} />
      )}
      {data?.paradigm && <WearablesParadigm data={data.paradigm} />}
      <ApplicationsPageWins data={data?.wins} />
      <ApplicationsPageModelZoo data={data?.model_zoo} />
      {data?.empirical_proof && (
        <WearablesEmpiricalProof data={data.empirical_proof} />
      )}
      {data?.subconscious && <WearablesSubconscious data={data.subconscious} />}
      {data?.lab_to_product && (
        <WearablesLabToProduct data={data.lab_to_product} />
      )}
      {data?.footer_accent && (
        <WearablesFooterAccent data={data.footer_accent} />
      )}
    </main>
  );
}
