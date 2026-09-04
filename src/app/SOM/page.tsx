import type { Metadata } from "next";
import { SomHero } from "@/components/som-page/SomHero";
import { SomFeatures } from "@/components/som-page/SomFeatures";

import { SomEcosystem } from "@/components/som-page/SomEcosystem";
import { SomPrototypeTitle } from "@/components/som-page/SomPrototypeTitle";
import { SomIntelligence } from "@/components/som-page/SomIntelligence";
import { SomReadyToDeploy } from "@/components/som-page/SomReadyToDeploy";
import { SomFooterMerge } from "@/components/som-page/SomFooterMerge";
import { getSingleType } from "@/lib/strapi";
import { buildMetadata, type SeoData } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  let seo: SeoData | null = null;
  try {
    const data = await getSingleType<{ seo: SeoData | null }>(
      "som-page",
      ["seo"]
    );
    seo = data?.seo ?? null;
  } catch {
    seo = null;
  }
  return buildMetadata(seo, {
    title: "SOM | Ambient Scientific",
    description:
      "Avoid custom RF and power management. Use our pre-engineered System-on-Modules (SOMs) for your edge AI deployments.",
  });
}

import { SomDeployPath } from "@/components/som-page/SomDeployPath";

export default async function SomPage() {
  let data: any = null;
  try {
    data = await getSingleType<any>("som-page", [
      { section: "hero", fields: ["image"], nested: ["primary_button", "secondary_button"] },
      { section: "features", nested: ["cards"] },
      { section: "ecosystem", nested: ["cards"] },
      { section: "inside_module", fields: ["image"], nested: ["specs"] },
      { section: "prototype", nested: ["cards"] },
      { section: "intelligence", nested: ["cards"] },
      { section: "deploy_path", nested: ["cards", "primary_button", "cards.image"] },
      "ready_to_deploy",
      "footer_merge",
      "seo",
    ]);
  } catch {
    data = null;
  }

  return (
    <main className="flex w-full flex-col overflow-x-clip bg-black">
      <SomHero data={data?.hero} />
      <SomDeployPath data={data?.deploy_path} />
      <SomFeatures data={data?.features} />
      {/* <SomEcosystem data={data?.ecosystem} /> */}

      <SomPrototypeTitle data={data?.prototype} />
      <SomIntelligence data={data?.intelligence} />
      <SomReadyToDeploy data={data?.ready_to_deploy} />
      <SomFooterMerge data={data?.footer_merge} />
    </main>
  );
}
