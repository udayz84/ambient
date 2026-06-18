import { CareersBenefits } from "./CareersBenefits";

import { CareersBestWork } from "./CareersBestWork";

import { CareersBottomCta } from "./CareersBottomCta";

import { CareersDna } from "./CareersDna";

import { CareersFooterBackdrop } from "./CareersFooterBackdrop";

import { CareersHero } from "./CareersHero";

import { CareersMobile } from "./CareersMobile";

import { CareersOpenRoles } from "./CareersOpenRoles";



const CAREERS_PAGE_HEIGHT_PX = 4977;



export function Careers() {
  return (
    <main className="flex w-full flex-col overflow-x-clip bg-black">
      {/* DESKTOP (>=1024px) — absolute canvas, untouched */}
      <div
        className="relative mx-auto -mt-[78px] hidden w-full overflow-x-clip overflow-y-visible bg-black min-[1024px]:block"
        style={{ height: CAREERS_PAGE_HEIGHT_PX }}
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
      </div>

      {/* MOBILE (<1024px) — dedicated stacked layout */}
      <div className="relative -mt-[78px] w-full bg-black min-[1024px]:hidden">
        <CareersMobile />
      </div>
    </main>
  );
}

