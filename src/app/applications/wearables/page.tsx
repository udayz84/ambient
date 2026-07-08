import type { Metadata } from "next";
import { WearablesHero } from "@/components/wearables/WearablesHero";
import { WearablesParadigm } from "@/components/wearables/WearablesParadigm";
import { WearablesEmpiricalProof } from "@/components/wearables/WearablesEmpiricalProof";
import { WearablesLabToProduct } from "@/components/wearables/WearablesLabToProduct";
import { WearablesSubconscious } from "@/components/wearables/WearablesSubconscious";
import { WearablesFooterAccent } from "@/components/wearables/WearablesFooterAccent";
import { getSingleType, mediaUrl } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Wearables | Ambient Scientific",
  description:
    "Hospital-grade biometric tracking and voice processing directly to the ring, wrist, or lens. No cloud latency or battery compromise.",
};

export default async function WearablesPage() {
  let data: any = null;
  try {
    data = await getSingleType<any>("wearables-page", [
      "hero",
      "carousel",
      "paradigm",
      "subconscious",
      "empirical_proof",
      "lab_to_product",
      "footer_accent",
      "seo",
    ]);
  } catch {
    data = null;
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
