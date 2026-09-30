import { PartnersHero } from "./PartnersHero";
import { PartnersWhy } from "./PartnersWhy";
import { PartnersBenefits } from "./PartnersBenefits";
import { PartnersCapabilities } from "./PartnersCapabilities";
import { PartnersProof } from "./PartnersProof";
import { PartnersDirectory } from "./PartnersDirectory";
import { PartnersMatchForm } from "./PartnersMatchForm";
import { PartnersBecome } from "./PartnersBecome";
import { PartnersFooterCtas } from "./PartnersFooterCtas";
import type { PartnersContent } from "./partners-content";

export function Partners({ content }: { content: PartnersContent }) {
  return (
    <main className="relative z-10 flex w-full flex-col overflow-x-clip bg-black">
      <PartnersHero content={content.hero} />
      <PartnersWhy content={content.why} />
      <PartnersBenefits content={content.benefits} />
      <PartnersCapabilities
        ecosystem={content.ecosystem}
        capabilities={content.capabilities}
      />
      <PartnersProof content={content.proof} />
      <PartnersDirectory
        content={content.directory}
        capabilities={content.capabilities}
        regions={content.regions}
      />
      <PartnersMatchForm
        content={content.matchForm}
        capabilities={content.capabilities}
        regions={content.regions}
      />
      <PartnersBecome
        content={content.become}
        capabilities={content.capabilities}
        regions={content.regions}
      />
      <PartnersFooterCtas content={content.footerCtas} />
    </main>
  );
}
