import { TechnologyPageHero } from "@/components/technology-page/TechnologyPageHero";
import { TechnologyPageProblem } from "@/components/technology-page/TechnologyPageProblem";
import { TechnologyPageArchitecture } from "@/components/technology-page/TechnologyPageArchitecture";
import { TechnologyPageModes } from "@/components/technology-page/TechnologyPageModes";
import { TechnologyPageGraph } from "@/components/technology-page/TechnologyPageGraph";
import { TechnologyPageSilicon } from "@/components/technology-page/TechnologyPageSilicon";
import { TechnologyPageEfficiency } from "@/components/technology-page/TechnologyPageEfficiency";
import { TechnologyPageBottomCta } from "@/components/technology-page/TechnologyPageBottomCta";
import { getSingleType } from "@/lib/strapi";

export default async function TechnologyPage() {
  let data: any = null;
  try {
    data = await getSingleType<any>("technology-page", [
      "hero",
      { section: "problem", fields: ["background_image"], nested: ["comparison_cards"] },
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
      {data?.silicon && <TechnologyPageSilicon data={data.silicon} />}
      {data?.efficiency && <TechnologyPageEfficiency data={data.efficiency} />}
      {data?.bottom_cta && <TechnologyPageBottomCta data={data.bottom_cta} />}
    </main>
  );
}
