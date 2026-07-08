import type { Metadata } from "next";
import { DeveloperHero } from "@/components/developer/DeveloperHero";
import { DeveloperCodeSection } from "@/components/developer/DeveloperCodeSection";
import { DeveloperPipeline } from "@/components/developer/DeveloperPipeline";
import { DeveloperComingSoon } from "@/components/developer/DeveloperComingSoon";
import { DeveloperModulesSection } from "@/components/developer/DeveloperModulesSection";
import { DeveloperCopilotsSection } from "@/components/developer/DeveloperCopilotsSection";
import { ScaledCanvas } from "@/components/developer/ScaledCanvas";
import { getSingleType } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Developer | Ambient Scientific",
  description:
    "ModelForge bridges training and deployment. Quantize, compile, and merge neural networks with your firmware — model to deployment in 15 minutes.",
};

const CANVAS_HEIGHT = 4421;

export default async function DeveloperPage() {
  let data: any = null;
  try {
    data = await getSingleType<any>("developer-page", [
      "hero",
      "code",
      "pipeline",
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
      <div className="-mt-[78px]">
        <ScaledCanvas width={1440} height={CANVAS_HEIGHT}>
          {data?.hero ? <DeveloperHero data={data.hero} /> : null}
          {data?.code ? <DeveloperCodeSection data={data.code} /> : null}
          {data?.pipeline ? <DeveloperPipeline data={data.pipeline} /> : null}
          {data?.coming_soon ? (
            <DeveloperComingSoon data={data.coming_soon} />
          ) : null}
          {data?.modules ? (
            <DeveloperModulesSection data={data.modules} />
          ) : null}
          {data?.copilots ? (
            <DeveloperCopilotsSection data={data.copilots} />
          ) : null}
        </ScaledCanvas>
      </div>
    </main>
  );
}
