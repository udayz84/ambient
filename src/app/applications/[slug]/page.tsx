import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WearablesHero } from "@/components/wearables/WearablesHero";
import { WearablesParadigm } from "@/components/wearables/WearablesParadigm";
import { WearablesEmpiricalProof } from "@/components/wearables/WearablesEmpiricalProof";
import { WearablesLabToProduct } from "@/components/wearables/WearablesLabToProduct";
import { WearablesSubconscious } from "@/components/wearables/WearablesSubconscious";
import { WearablesFooterAccent } from "@/components/wearables/WearablesFooterAccent";
import { getCollection, mediaUrl, buildPopulate } from "@/lib/strapi";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: "Applications | Ambient Scientific",
    description: "Ambient Scientific Applications",
  };
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
      "empirical_proof",
      "lab_to_product",
      "footer_accent",
      "seo",
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

  const carouselImages = Array.isArray(data?.carousel?.images)
    ? data.carousel.images
        .map((m: any) => mediaUrl(m))
        .filter((url: string | null): url is string => Boolean(url))
    : undefined;

  return (
    <main className="flex w-full flex-col overflow-x-clip bg-black">
      {data?.hero && (
        <WearablesHero data={data.hero} carouselImages={carouselImages} />
      )}
      {data?.paradigm && <WearablesParadigm data={data.paradigm} />}
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
