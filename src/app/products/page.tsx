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

export const metadata: Metadata = {
  title: "Products | Ambient Scientific",
  description:
    "The world's first energy-aware AI processor — running real neural networks, not rule-based shortcuts, at microwatt power. Built on the A-Cube architecture.",
};

export default function ProductsPage() {
  return (
    <main className="flex w-full flex-col overflow-x-clip bg-black">
      <ProductsHero />
      <ProductsFeatures />
      <ProductsAlwaysOn />
      <ProductsUseCases />
      <ProductsMeasured />
      <ProductsArchitecture />
      <ProductsModelForge />
      <ProductsBenchToVolume />
      <ProductsFullPicture />
      <ProductsStartBuilding />
    </main>
  );
}
