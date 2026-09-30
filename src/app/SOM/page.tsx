import type { Metadata } from "next";
import { SomHero } from "@/components/som-page/SomHero";
import { SomFeatures } from "@/components/som-page/SomFeatures";
import { SomFamily } from "@/components/som-page/SomFamily";

import { SomEcosystem } from "@/components/som-page/SomEcosystem";

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
    ]);
  } catch {
    data = null;
  }

  return (
    <main className="flex w-full flex-col overflow-x-clip bg-black">
      <SomHero data={data?.hero} />
      <SomFeatures data={data?.features} />
      <SomFamily data={data?.family} />
      <SomDeployPath data={data?.deploy_path} />
      {/* <SomEcosystem data={data?.ecosystem} /> */}

      <SomIntelligence data={data?.intelligence} />
      <SomReadyToDeploy data={data?.ready_to_deploy} />
      <SomFooterMerge data={data?.footer_merge} />
    </main>
  );
}
