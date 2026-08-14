import { PartnersHero } from "./PartnersHero";
import { PartnersWhy } from "./PartnersWhy";
import { PartnersBenefits } from "./PartnersBenefits";
import { PartnersCapabilities } from "./PartnersCapabilities";
import { PartnersProof } from "./PartnersProof";
import { PartnersDirectory } from "./PartnersDirectory";
import { PartnersMatchForm } from "./PartnersMatchForm";
import { PartnersBecome } from "./PartnersBecome";
import { PartnersFooterCtas } from "./PartnersFooterCtas";

export function Partners() {
  return (
    <main className="relative z-10 flex w-full flex-col overflow-x-clip bg-black">
      <PartnersHero />
      <PartnersWhy />
      <PartnersBenefits />
      <PartnersCapabilities />
      <PartnersProof />
      <PartnersDirectory />
      <PartnersMatchForm />
      <PartnersBecome />
      <PartnersFooterCtas />
    </main>
  );
}
