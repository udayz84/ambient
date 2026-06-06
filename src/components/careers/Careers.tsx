import { SiteFooter } from "../site-footer/SiteFooter";

import { CareersBenefits } from "./CareersBenefits";

import { CareersBestWork } from "./CareersBestWork";

import { CareersBottomCta } from "./CareersBottomCta";

import { CareersDna } from "./CareersDna";

import { CareersFooterBackdrop } from "./CareersFooterBackdrop";

import { CareersHero } from "./CareersHero";

import { CareersOpenRoles } from "./CareersOpenRoles";



/** Figma 2379:8612 — benefits end ~4893px; footer/CTA backdrop from 4977px; CTA at 5097px; height 6229px */

const CAREERS_PAGE_HEIGHT_PX = 6229;

const CAREERS_FOOTER_TOP_PX = 4977;



export function Careers() {

  return (

    <main className="flex w-full flex-col overflow-x-clip bg-black">

      <div

        className="relative -mt-[78px] mx-auto w-full max-w-[1440px] min-w-[1440px] overflow-x-visible overflow-y-[clip] bg-black"

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



        <div

          className="absolute left-0 z-10 w-full [&_footer]:!mt-0"

          style={{ top: CAREERS_FOOTER_TOP_PX }}

        >

          <SiteFooter />

        </div>

      </div>

    </main>

  );

}

