import { SiteFooter } from "../site-footer/SiteFooter";
import { CompanyDna } from "./CompanyDna";
import { CompanyEcosystem } from "./CompanyEcosystem";
import { CompanyEndSection } from "./CompanyEndSection";
import { CompanyArticles } from "./CompanyArticles";
import { CompanyEngagement } from "./CompanyEngagement";
import { CompanyEngagementBackground } from "./CompanyEngagementBackground";
import { CompanyTechnologyPartners } from "./CompanyTechnologyPartners";
import { CompanyHero } from "./CompanyHero";
import { CompanyLeadership } from "./CompanyLeadership";
import { CompanyMission } from "./CompanyMission";

export function Company() {
  return (
    <main className="flex w-full flex-col overflow-x-clip bg-black">
      <div
        className="relative -mt-[78px] mx-auto h-[7824px] w-full max-w-[1440px] min-w-[1440px] overflow-hidden bg-black"
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
        <CompanyEngagementBackground />
        <CompanyEngagement />
        <CompanyEndSection />

        <div className="absolute top-[6572px] left-0 z-[8] w-full [&_footer]:mt-0">
          <SiteFooter />
        </div>
      </div>
    </main>
  );
}
