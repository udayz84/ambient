/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import { SomHero } from "@/components/som-page/SomHero";
import { SomFeatures } from "@/components/som-page/SomFeatures";
import { SomFamily } from "@/components/som-page/SomFamily";
import { SomOneModule } from "@/components/som-page/SomOneModule";
import { TabletScaleInit } from "@/components/shared/TabletScaleInit";


import { SomReadyToDeploy } from "@/components/som-page/SomReadyToDeploy";
import { SomFooterMerge } from "@/components/som-page/SomFooterMerge";
import { SomIntelligence } from "@/components/som-page/SomIntelligence";
import { getSingleType } from "@/lib/strapi";
import { buildMetadata, type SeoData } from "@/lib/seo";

export const dynamic = "force-dynamic";

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
      { section: "family", nested: ["cards.features", "cards.image"] },
      { section: "intelligence", nested: ["cards"] },

      { section: "deploy_path", nested: ["cards", "primary_button"] },
      "ready_to_deploy",
      "footer_merge",
      "seo",
      "som_form",
      "upcoming_form",
      "brief_form",
    ]);
  } catch {
    data = null;
  }

  return (
    <main className="flex w-full flex-col overflow-x-clip bg-black">
      <TabletScaleInit />
      <div id="som-hero" className="scroll-mt-[90px]"><SomHero data={data?.hero} /></div>
      <div id="som-features" className="scroll-mt-[90px]"><SomFeatures data={data?.features} /></div>
      <div id="som-family" className="scroll-mt-[90px]"><SomFamily data={data?.family} /></div>
      <div id="som-one-module" className="scroll-mt-[90px]"><SomOneModule data={data?.one_module} /></div>
      {/* <SomEcosystem data={data?.ecosystem} /> */}

      <div id="som-intelligence" className="scroll-mt-[90px]"><SomIntelligence data={data?.intelligence} /></div>
      <SomDeployPath data={data?.deploy_path} />
      {/* <SomProvenCore /> */}
      <div id="som-ready-to-deploy" className="scroll-mt-[90px]"><SomReadyToDeploy data={data?.ready_to_deploy} /></div>
      <div id="som-footer-merge" className="scroll-mt-[90px]"><SomFooterMerge data={data?.footer_merge} /></div>
    </main>
  );
}
