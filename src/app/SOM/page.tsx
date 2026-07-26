import type { Metadata } from "next";
import { SomHero } from "@/components/som-page/SomHero";
import { SomFeatures } from "@/components/som-page/SomFeatures";
import { SomInsideModule } from "@/components/som-page/SomInsideModule";
import { SomEcosystem } from "@/components/som-page/SomEcosystem";
import { SomPrototypeTitle } from "@/components/som-page/SomPrototypeTitle";
import { SomIntelligence } from "@/components/som-page/SomIntelligence";
import { SomReadyToDeploy } from "@/components/som-page/SomReadyToDeploy";
import { SomFooterMerge } from "@/components/som-page/SomFooterMerge";
import { getSingleType } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "SOM | Ambient Scientific",
  description:
    "Avoid custom RF and power management. Use our pre-engineered System-on-Modules (SOMs) for your edge AI deployments.",
};

export default async function SomPage() {
  let data: any = null;
  try {
    data = await getSingleType<any>("som-page", [
      "hero",
      { section: "features", fields: ["icon_background"], nested: ["cards"] },
      { section: "ecosystem", fields: ["background_image", "chip_image"], nested: ["cards"] },
      { section: "inside_module", fields: ["image"], nested: ["specs"] },
      { section: "prototype", nested: ["cards"] },
      { section: "intelligence", nested: ["cards"] },
      "ready_to_deploy",
      "footer_merge",
      "seo",
    ]);
  } catch {
    data = null;
  }

  return (
    <main className="flex w-full flex-col overflow-x-clip bg-black">
      {data?.hero && <SomHero data={data.hero} />}
      {data?.features && <SomFeatures data={data.features} />}
      {data?.ecosystem && <SomEcosystem data={data.ecosystem} />}
      {data?.inside_module && <SomInsideModule data={data.inside_module} />}
      {data?.prototype && <SomPrototypeTitle data={data.prototype} />}
      {data?.intelligence && <SomIntelligence data={data.intelligence} />}
      {data?.ready_to_deploy && <SomReadyToDeploy data={data.ready_to_deploy} />}
      {data?.footer_merge && <SomFooterMerge data={data.footer_merge} />}
    </main>
  );
}
