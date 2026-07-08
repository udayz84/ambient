import type { Metadata } from "next";
import { ProductsHero } from "@/components/products-page/ProductsHero";
import { ProductsFeatures } from "@/components/products-page/ProductsFeatures";
import { ProductsAlwaysOn } from "@/components/products-page/ProductsAlwaysOn";
import { ProductsUseCases } from "@/components/products-page/ProductsUseCases";
import { ProductsMeasured } from "@/components/products-page/ProductsMeasured";
import { ProductsArchitecture } from "@/components/products-page/ProductsArchitecture";
import { ProductsModelForge } from "@/components/products-page/ProductsModelForge";
import { ProductsBenchToVolume } from "@/components/products-page/ProductsBenchToVolume";
import { ProductsFullPicture } from "@/components/products-page/ProductsFullPicture";
import { ProductsStartBuilding } from "@/components/products-page/ProductsStartBuilding";
import { getSingleType } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Products | Ambient Scientific",
  description:
    "The world's first energy-aware AI processor — running real neural networks, not rule-based shortcuts, at microwatt power. Built on the A-Cube architecture.",
};

export default async function ProductsPage() {
  let data: any = null;
  try {
    data = await getSingleType<any>("products-page", [
      "hero",
      { section: "features", fields: ["card_image", "abstract_design"], nested: ["feature_cards"] },
      "always_on",
      { section: "use_cases", nested: ["tabs"] },
      "measured",
      "architecture",
      "modelforge",
      "bench_to_volume",
      { section: "full_picture", fields: ["image"], nested: ["callouts"] },
      "start_building",
      "seo",
    ]);
  } catch {
    // Strapi unavailable — render with no data; sections will fall back to defaults
  }

  return (
    <main className="flex w-full flex-col overflow-x-clip bg-black">
      <ProductsHero data={data?.hero} />
      <ProductsFeatures data={data?.features} />
      <ProductsAlwaysOn data={data?.always_on} />
      <ProductsUseCases data={data?.use_cases} />
      <ProductsMeasured data={data?.measured} />
      <ProductsArchitecture data={data?.architecture} />
      <ProductsModelForge data={data?.modelforge} />
      <ProductsBenchToVolume data={data?.bench_to_volume} />
      <ProductsFullPicture data={data?.full_picture} />
      <ProductsStartBuilding data={data?.start_building} />
    </main>
  );
}
