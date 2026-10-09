import type { Metadata } from "next";
import { DeveloperHero } from "@/components/developer/DeveloperHero";
import { DeveloperCodeSection } from "@/components/developer/DeveloperCodeSection";
import { DeveloperPipeline } from "@/components/developer/DeveloperPipeline";
import { DeveloperComingSoon } from "@/components/developer/DeveloperComingSoon";
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
      "ModelForge bridges training and deployment. Quantize, compile, and merge neural networks with your firmware — model to deployment in 15 minutes.",
  });
}

import { DeveloperModelZoo } from "@/components/developer/DeveloperModelZoo";
import { DeveloperAppForge } from "@/components/developer/DeveloperAppForge";

const CANVAS_HEIGHT = 7633;

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
      "seo",
    ]);
  } catch {
    data = null;
  }

  return (
    <main className="relative z-10 w-full overflow-x-clip bg-black">
      {/* DESKTOP (>=1024px) — ScaledCanvas with exact Figma coordinates */}
      <div className="hidden min-[1024px]:block">
        <div className="-mt-[78px]">
          <ScaledCanvas width={1440} height={CANVAS_HEIGHT}>
            {data?.hero ? <DeveloperHero data={data.hero} /> : null}
            <div style={{ transform: "translateY(100px)" }}>
              {data?.code ? <DeveloperCodeSection data={data.code} /> : null}
              {data?.pipeline ? <DeveloperPipeline data={data.pipeline} /> : null}
              <DeveloperModelZoo data={data?.model_zoo} />
              <DeveloperAppForge data={data?.app_forge} />
              <div style={{ transform: "translateY(350px)" }}>
                {data?.coming_soon ? (
                  <DeveloperComingSoon data={data.coming_soon} />
                ) : null}
                <div style={{ transform: "translateY(150px)" }}>
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

      {/* MOBILE (<1024px) — responsive stacked layout */}
      <div className="block min-[1024px]:hidden">
        <DeveloperMobile data={data} />
      </div>
    </main>
  );
}
