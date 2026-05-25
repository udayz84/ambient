import { SiteFooter } from "../site-footer/SiteFooter";
import { CareersBenefits } from "./CareersBenefits";
import { CareersBestWork } from "./CareersBestWork";
import { CareersBottomCta } from "./CareersBottomCta";
import { CareersDna } from "./CareersDna";
import { CareersFooterBackdrop } from "./CareersFooterBackdrop";
import { CareersHero } from "./CareersHero";
import { CareersOpenRoles } from "./CareersOpenRoles";

export function Careers() {
  return (
    <main className="flex w-full flex-col overflow-x-clip bg-black">
      <div
        className="relative -mt-[78px] mx-auto h-[6229px] w-full max-w-[1440px] min-w-[1440px] overflow-hidden bg-black"
        data-node-id="2379:8612"
        data-name="Careers - 02"
      >
        <CareersHero />
        <CareersBestWork />
        <CareersDna />
        <CareersOpenRoles />
        <CareersBenefits />
        <CareersFooterBackdrop />
        <CareersBottomCta />

        <div className="absolute top-[4977px] left-0 z-10 w-full [&_footer]:mt-0">
          <SiteFooter />
        </div>
      </div>
    </main>
  );
}
