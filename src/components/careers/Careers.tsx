import { CareersBenefits } from "./CareersBenefits";

import { CareersBestWork } from "./CareersBestWork";

import { CareersBottomCta } from "./CareersBottomCta";

import { CareersDna } from "./CareersDna";

import { CareersFooterBackdrop } from "./CareersFooterBackdrop";

import { CareersHero } from "./CareersHero";

import { CareersOpenRoles } from "./CareersOpenRoles";



const CAREERS_PAGE_HEIGHT_PX = 5310;



export function Careers() {
  return (
    <main className="flex w-full flex-col overflow-x-clip bg-black">
      <div
        className="relative mx-auto -mt-[78px] w-full overflow-x-clip overflow-y-visible bg-black"
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
    </main>
  );
}

