import type { Metadata } from "next";
import { ProductsHero } from "@/components/products-page/ProductsHero";
import { ProductsFeatures } from "@/components/products-page/ProductsFeatures";
import { ProductsAlwaysOn } from "@/components/products-page/ProductsAlwaysOn";
import { ProductsUseCases } from "@/components/products-page/ProductsUseCases";
import { ProductsMeasured } from "@/components/products-page/ProductsMeasured";
export const dynamic = "force-dynamic";

import { ProductsArchitecture } from "@/components/products-page/ProductsArchitecture";
import { ProductsModelForge } from "@/components/products-page/ProductsModelForge";
import { ProductsBenchToVolume } from "@/components/products-page/ProductsBenchToVolume";
import { ProductsFullPicture } from "@/components/products-page/ProductsFullPicture";
import { ProductsStartBuilding } from "@/components/products-page/ProductsStartBuilding";
import { ProductsStickyNav } from "@/components/products-page/ProductsStickyNav";
import { getSingleType } from "@/lib/strapi";
import { buildMetadata, type SeoData } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  let seo: SeoData | null = null;
  try {
    const data = await getSingleType<{ seo: SeoData | null }>(
      "products-page",
      ["seo"]
    );
    seo = data?.seo ?? null;
  } catch {
    seo = null;
  }
  return buildMetadata(seo, {
    title: "Products | Ambient Scientific",
    description:
      "The world's first energy-aware AI processor — running real neural networks, not rule-based shortcuts, at microwatt power. Built on the A-Cube architecture.",
  });
}

/**
 * Section anchors for the sticky nav toggle, in page order. Keep in sync with
 * the wrapper divs below — the nth Strapi label targets the nth id here.
 */
const STICKY_SECTION_IDS = [
  "features",
  "always-on",
  "use-cases",
  "metrics",
  "architecture",
  "full-picture",
];

export default async function ProductsPage() {
  let data: any = null;
  try {
    data = await getSingleType<any>("products-page", [
      { section: "hero", fields: ["chipset_image", "chipset_image_mobile"], nested: ["tags"] },
      { section: "features", nested: ["feature_cards"] },
      { section: "always_on", nested: ["stats"] },
      { section: "use_cases", nested: ["tabs"] },
      {
        section: "measured",
        fields: ["tag", "primary_button", "secondary_button"],
        nested: ["cards"],
      },
      { section: "architecture", fields: ["image"], nested: ["stats"] },
      { section: "modelforge", nested: ["steps", "subfeatures"] },
      "bench_to_volume",
      { section: "full_picture", nested: ["callouts"] },
      "start_building",
      "sticky_nav",
      "seo",
    ]);
  } catch (error) {
    // Strapi unavailable — render with no data; sections will fall back to defaults
    console.error("Failed to fetch products page data:", error);
  }

  // Labels come from Strapi (label only); targets are auto-assigned by order.
  const stickyLabels: string[] = Array.isArray(data?.sticky_nav)
    ? data.sticky_nav
        .map((i: any) => (typeof i?.label === "string" ? i.label.trim() : ""))
        .filter(Boolean)
    : [];
  const stickyItems =
    stickyLabels.length > 0
      ? stickyLabels
          .slice(0, STICKY_SECTION_IDS.length)
          .map((label: string, idx: number) => ({
            label,
            id: STICKY_SECTION_IDS[idx],
          }))
      : undefined;

  return (
    <main className="flex w-full flex-col overflow-x-clip bg-black">
      <ProductsHero data={data?.hero} />
      <ProductsStickyNav items={stickyItems} />
      <div id="features"><ProductsFeatures data={data?.features} /></div>
      <div id="always-on"><ProductsAlwaysOn data={data?.always_on} /></div>
      <div id="use-cases"><ProductsUseCases data={data?.use_cases} /></div>
      <div id="metrics"><ProductsMeasured data={data?.measured} /></div>
      <div id="architecture"><ProductsArchitecture data={data?.architecture} /></div>
      <ProductsModelForge data={data?.modelforge} />
      <ProductsBenchToVolume data={data?.bench_to_volume} />
      <div id="full-picture"><ProductsFullPicture data={data?.full_picture} /></div>
      <ProductsStartBuilding data={data?.start_building} />
    </main>
  );
}
