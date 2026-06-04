import { SiteFooter } from "../site-footer/SiteFooter";

import { CompanyDna } from "./CompanyDna";

import { CompanyEcosystem } from "./CompanyEcosystem";

import { CompanyEndSection } from "./CompanyEndSection";

import { CompanyArticles } from "./CompanyArticles";

import { CompanyEngagement } from "./CompanyEngagement";

import { CompanyImage124Background } from "./CompanyImage124Background";

import { CompanyTechnologyPartners } from "./CompanyTechnologyPartners";

import { CompanyHero } from "./CompanyHero";

import { CompanyLeadership } from "./CompanyLeadership";

import { CompanyMission } from "./CompanyMission";



/** Figma 2379:2087 — engagement ends ~6737px; footer from 6572px; canvas 7824px */

const COMPANY_PAGE_HEIGHT_PX = 7824;

const COMPANY_FOOTER_TOP_PX = 6572;



export function Company() {

  return (

    <main className="flex w-full flex-col overflow-x-visible bg-black">

      <div

        className="relative -mt-[78px] mx-auto w-full max-w-[1440px] min-w-[1440px] overflow-x-visible overflow-y-visible bg-black"

        style={{ height: COMPANY_PAGE_HEIGHT_PX }}

        data-node-id="2379:2087"

        data-name="Company - 02"

      >

        <CompanyHero />

        <CompanyMission />

        <CompanyLeadership />

        <CompanyDna />

        <CompanyEcosystem />

        <CompanyTechnologyPartners />

        <CompanyArticles />

        <CompanyImage124Background />

        <CompanyEngagement />

        <CompanyEndSection />



        <div
          className={`absolute left-1/2 z-[8] w-[100vw] max-w-none -translate-x-1/2 [&_footer]:!mt-0`}
          style={{ top: COMPANY_FOOTER_TOP_PX }}
        >
          <SiteFooter />
        </div>

      </div>

    </main>

  );

}


