import { SiteFooter } from "../site-footer/SiteFooter";

import { CareersBenefits } from "./CareersBenefits";

import { CareersBestWork } from "./CareersBestWork";

import { CareersBottomCta } from "./CareersBottomCta";

import { CareersDna } from "./CareersDna";

import { CareersFooterBackdrop } from "./CareersFooterBackdrop";

import { CareersHero } from "./CareersHero";

import { CareersOpenRoles } from "./CareersOpenRoles";



/** Figma 2379:8612 — benefits end ~4893px; footer/CTA backdrop from 4977px; CTA at 5097px; height 6229px */

export function Careers() {

  return (

    <main className="flex w-full flex-col overflow-x-clip bg-black">

      <div

        className="relative -mt-[78px] mx-auto w-full max-w-[1440px] overflow-hidden bg-black"

        data-node-id="2379:8612"

        data-name="Careers - 02"

      >

        <CareersHero />

        <CareersBestWork />

        <CareersDna />

        <CareersOpenRoles />

        <CareersBenefits />

        <div className="relative mt-[40px] lg:mt-[84px]">

          <CareersFooterBackdrop />

          <div className="relative z-20">

            <CareersBottomCta />

          </div>

          <div className="relative z-10 [&_footer]:!mt-0">

            <SiteFooter />

          </div>

        </div>

      </div>

    </main>

  );

}
