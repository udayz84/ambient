import type { Metadata } from "next";
import { DeveloperHero } from "@/components/developer/DeveloperHero";
import { DeveloperCodeSection } from "@/components/developer/DeveloperCodeSection";
import { DeveloperPipeline } from "@/components/developer/DeveloperPipeline";
import { DeveloperModulesSection } from "@/components/developer/DeveloperModulesSection";
import { DeveloperCopilotsSection } from "@/components/developer/DeveloperCopilotsSection";
import { ScaledCanvas } from "@/components/developer/ScaledCanvas";
import { DeveloperMobile } from "@/components/developer/DeveloperMobile";
import { getSingleType } from "@/lib/strapi";
import { buildMetadata, type SeoData } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  let seo: SeoData | null = null;
  try {
    const data = await getSingleType<{ seo: SeoData | null }>(
      "developer-page",
      ["seo"]
    );
    seo = data?.seo ?? null;
  } catch {
    seo = null;
  }
  return buildMetadata(seo, {
    title: "Developer | Ambient Scientific",
    description:
      "ModelForge bridges training and deployment. Quantize, compile, and merge neural networks with your firmware model to deployment in 15 minutes.",
  });
}

import { DeveloperModelZoo } from "@/components/developer/DeveloperModelZoo";
import { DeveloperAppForge } from "@/components/developer/DeveloperAppForge";
import { DeveloperStartBuilding } from "@/components/developer/DeveloperStartBuilding";

// 6631 = copilots section bottom (top 6735 − 300 wrapper translate + ~588
// height incl. offset var) — sized so the canvas fully contains it and the
// StartBuilding card flows after it, not under it.
const CANVAS_HEIGHT = 6631;

import { TabletScaleInit } from "@/components/shared/TabletScaleInit";

export default async function DeveloperPage() {
  let data: any = null;
  try {
    data = await getSingleType<any>("developer-page", [
      "hero",
      { section: "code", nested: ["articles"] },
      { section: "pipeline", fields: ["tag"], nested: ["tabs.flow_image", "tabs.logo", "tabs.bullets"] },
      { section: "model_zoo", nested: ["stats"] },
      { section: "app_forge" },
      "coming_soon",
      { section: "modules", nested: ["modules"] },
      { section: "copilots", nested: ["copilots"] },
      "brief_form",
      "seo",
    ]);
  } catch {
    data = null;
  }

  return (
    <main className="flex w-full flex-col overflow-x-clip bg-black">
      <TabletScaleInit />
      {/* DESKTOP (>=600px) — ScaledCanvas with exact Figma coordinates */}
      <div className="hidden min-[600px]:block">
        <div className="-mt-[78px]">
          <ScaledCanvas width={1440} height={CANVAS_HEIGHT}>
            {data?.hero ? <DeveloperHero data={data.hero} briefForm={data?.brief_form ?? null} /> : null}
            <div style={{ transform: "translateY(100px)" }}>
              {data?.code ? <DeveloperCodeSection data={data.code} /> : null}
              {data?.pipeline ? <DeveloperPipeline data={data.pipeline} /> : null}
              <DeveloperModelZoo data={data?.model_zoo} />
              <DeveloperAppForge data={data?.app_forge} />
              <div style={{ transform: "translateY(350px)" }}>
                {/* {data?.coming_soon ? (
                  <DeveloperComingSoon data={data.coming_soon} />
                ) : null} */}
                <div style={{ transform: "translateY(-1140px)" }}>
                  {data?.modules ? (
                    <DeveloperModulesSection data={data.modules} />
                  ) : null}
                  {data?.copilots ? (
                    <DeveloperCopilotsSection data={data.copilots} />
                  ) : null}
                </div>
              </div>
            </div>
          </ScaledCanvas>
        </div>
      </div>

      {/* MOBILE (<600px) — responsive stacked layout */}
      <div className="block min-[600px]:hidden">
        <DeveloperMobile data={data} />
      </div>

      <DeveloperStartBuilding />
    </main>
  );
}
