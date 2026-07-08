import { CompanyDna } from "./CompanyDna";

import { CompanyEcosystem } from "./CompanyEcosystem";

import { CompanyEndSection } from "./CompanyEndSection";

import { CompanyArticles } from "./CompanyArticles";

import { CompanyEngagement } from "./CompanyEngagement";

import { CompanyImage124Background } from "./CompanyImage124Background";

import { CompanyMobile } from "./CompanyMobile";

import { CompanyTechnologyPartners } from "./CompanyTechnologyPartners";

import { CompanyHero } from "./CompanyHero";

import { CompanyLeadership } from "./CompanyLeadership";

import { CompanyMission } from "./CompanyMission";



/** Figma 2379:2087 — engagement ends ~6737px; footer from 6572px; canvas 7824px */

const COMPANY_PAGE_HEIGHT_PX = 6737;

const COMPANY_FOOTER_TOP_PX = 6737;



type CompanyProps = {
  data?: any;
};

export function Company({ data }: CompanyProps = {}) {
  return (
    <main className="flex w-full flex-col overflow-x-clip bg-black">
      {/* DESKTOP (>=1024px) — absolute canvas, untouched */}
      <div
        className="relative mx-auto -mt-[78px] hidden w-full overflow-x-clip overflow-y-visible bg-black min-[1024px]:block"
        style={{ height: COMPANY_PAGE_HEIGHT_PX }}
        data-node-id="2379:2087"
        data-name="Company - 02"
      >
        <div className="relative mx-auto h-full w-[1440px]">
          {data?.hero ? <CompanyHero data={data.hero} /> : null}
          {data?.mission ? <CompanyMission data={data.mission} /> : null}
          {data?.leadership ? (
            <CompanyLeadership data={data.leadership} />
          ) : null}
          {data?.dna ? <CompanyDna data={data.dna} /> : null}
          {data?.ecosystem ? <CompanyEcosystem data={data.ecosystem} /> : null}
          {data?.tech_partners ? (
            <CompanyTechnologyPartners data={data.tech_partners} />
          ) : null}
          {data?.articles ? <CompanyArticles data={data.articles} /> : null}
          {data?.engagement ? (
            <CompanyImage124Background data={data.engagement} />
          ) : null}
          {data?.engagement || data?.join_team ? (
            <CompanyEngagement
              data={data?.engagement}
              joinTeam={data?.join_team}
            />
          ) : null}
        </div>
      </div>

      {/* MOBILE (<1024px) — dedicated stacked layout */}
      <div className="relative -mt-[78px] w-full bg-black min-[1024px]:hidden">
        <CompanyMobile data={data} />
      </div>
    </main>
  );
}
