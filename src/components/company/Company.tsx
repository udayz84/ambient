import { CompanyDna } from "./CompanyDna";

import { CompanyEcosystem } from "./CompanyEcosystem";


import { CompanyArticles } from "./CompanyArticles";

import { CompanyEngagement } from "./CompanyEngagement";

import { CompanyImage124Background } from "./CompanyImage124Background";

import { CompanyMobile } from "./CompanyMobile";

import { CompanyTechnologyPartners } from "./CompanyTechnologyPartners";

import { CompanyHero } from "./CompanyHero";
import { CompanyLeadership } from "./CompanyLeadership";
import { CompanyMission } from "./CompanyMission";
import { TabletScaleInit } from "../shared/TabletScaleInit";
import { TabletScaleCanvas } from "../shared/TabletScaleCanvas";

type CompanyProps = {
  data?: any;
};

export function Company({ data }: CompanyProps = {}) {
  return (
    <main className="flex w-full flex-col overflow-x-clip bg-black">
      <TabletScaleInit />
      {/* DESKTOP & TABLET (>=600px) */}
      <div
        className="relative mx-auto -mt-[78px] hidden w-full justify-center overflow-x-clip bg-black min-[600px]:flex"
        data-node-id="2379:2087"
        data-name="Company - 02"
      >
        <TabletScaleCanvas className="relative h-[7100px] w-[1440px] shrink-0 min-[600px]:block">
          <div className="relative mx-auto h-full w-[1440px]">
            <CompanyHero data={data?.hero} />
            <CompanyMission data={data?.mission} />
            <CompanyLeadership data={data?.leadership} />
            <CompanyDna data={data?.dna} />
            <CompanyEcosystem data={data?.ecosystem} />
            <CompanyTechnologyPartners data={data?.tech_partners} />
            <CompanyArticles data={data?.articles} />
            <CompanyImage124Background data={data?.engagement} />
            <CompanyEngagement
              data={data?.engagement}
              joinTeam={data?.engagement?.join_team}
            />
          </div>
        </TabletScaleCanvas>
      </div>

      {/* MOBILE (<600px) — dedicated stacked layout */}
      <div className="relative -mt-[78px] w-full bg-black min-[600px]:hidden">
        <CompanyMobile data={data} />
      </div>
    </main>
  );
}
