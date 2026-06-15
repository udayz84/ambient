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

const COMPANY_PAGE_HEIGHT_PX = 6737;

const COMPANY_FOOTER_TOP_PX = 6737;



export function Company() {
  return (
    <main className="flex w-full flex-col overflow-x-clip bg-black">
      <div
        className="relative mx-auto -mt-[78px] w-full overflow-x-clip overflow-y-visible bg-black"
        style={{ height: COMPANY_PAGE_HEIGHT_PX }}
        data-node-id="2379:2087"
        data-name="Company - 02"
      >
        <div className="relative mx-auto h-full w-[1440px]">
          <CompanyHero />
          <CompanyMission />
          <CompanyLeadership />
          <CompanyDna />
          <CompanyEcosystem />
          <CompanyTechnologyPartners />
          <CompanyArticles />
          <CompanyImage124Background />
          <CompanyEngagement />
        </div>
      </div>
    </main>
  );
}


