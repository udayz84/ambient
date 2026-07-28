import type { Metadata } from "next";
import { TechnologyPageHero } from "@/components/technology-page/TechnologyPageHero";
import { TechnologyPageProblem } from "@/components/technology-page/TechnologyPageProblem";
import { TechnologyPageArchitecture } from "@/components/technology-page/TechnologyPageArchitecture";
import { TechnologyPageModes } from "@/components/technology-page/TechnologyPageModes";
import { TechnologyPageGraph } from "@/components/technology-page/TechnologyPageGraph";
import { TechnologyPageSilicon } from "@/components/technology-page/TechnologyPageSilicon";
import { TechnologyPageEfficiency } from "@/components/technology-page/TechnologyPageEfficiency";
import { TechnologyPageBottomCta } from "@/components/technology-page/TechnologyPageBottomCta";
import { getSingleType } from "@/lib/strapi";
import { buildMetadata, type SeoData } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  let seo: SeoData | null = null;
  try {
    const data = await getSingleType<{ seo: SeoData | null }>(
      "technology-page",
      ["seo"]
    );
    seo = data?.seo ?? null;
  } catch {
    seo = null;
  }
  return buildMetadata(seo, {
    title: "Technology | Ambient Scientific",
    description:
      "The GPX architecture — energy-aware AI processing technology from Ambient Scientific.",
  });
}

export default async function TechnologyPage() {
  let data: any = null;
  try {
    data = await getSingleType<any>("technology-page", [
      "hero",
      { section: "problem", nested: ["comparison_cards"] },
      "architecture",
      { section: "pillars", nested: ["pillars"] },
      "modes",
      "graph",
      "silicon",
      "efficiency",
      "bottom_cta",
      "seo",
    ]);
  } catch {
    data = null;
  }
  return (
    <main className="flex w-full flex-col overflow-x-clip bg-black">
      {data?.hero && <TechnologyPageHero data={data.hero} />}
      {data?.problem && <TechnologyPageProblem data={data.problem} />}
      {data?.architecture && (
        <TechnologyPageArchitecture
          data={data.architecture}
          pillarsData={data.pillars}
        />
      )}
      {data?.modes && <TechnologyPageModes data={data.modes} />}
      {data?.graph && <TechnologyPageGraph data={data.graph} />}
      {data?.efficiency && <TechnologyPageEfficiency data={data.efficiency} />}
      {data?.silicon && <TechnologyPageSilicon data={data.silicon} />}
      {data?.bottom_cta && <TechnologyPageBottomCta data={data.bottom_cta} />}
    </main>
  );
}
