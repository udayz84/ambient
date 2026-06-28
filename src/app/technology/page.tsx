import { TechnologyPageHero } from "@/components/technology-page/TechnologyPageHero";
import { TechnologyPageProblem } from "@/components/technology-page/TechnologyPageProblem";
import { TechnologyPageArchitecture } from "@/components/technology-page/TechnologyPageArchitecture";
import { TechnologyPagePillars } from "@/components/technology-page/TechnologyPagePillars";
import { TechnologyPageModes } from "@/components/technology-page/TechnologyPageModes";
import { TechnologyPageGraph } from "@/components/technology-page/TechnologyPageGraph";
import { TechnologyPageSilicon } from "@/components/technology-page/TechnologyPageSilicon";
import { TechnologyPageEfficiency } from "@/components/technology-page/TechnologyPageEfficiency";
import { TechnologyPageBottomCta } from "@/components/technology-page/TechnologyPageBottomCta";

export default function TechnologyPage() {
  return (
    <main className="flex w-full flex-col overflow-x-clip bg-black">
      <TechnologyPageHero />
      <TechnologyPageProblem />
      <TechnologyPageArchitecture />
      <TechnologyPagePillars />
      <TechnologyPageModes />
      <TechnologyPageGraph />
      <TechnologyPageSilicon />
      <TechnologyPageEfficiency />
      <TechnologyPageBottomCta />
    </main>
  );
}
