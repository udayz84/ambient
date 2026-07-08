import { gilroySemiBold } from "../hero/fonts";
import { EcosystemPartnerRow } from "../ecosystem/EcosystemPartnerRow";
import {
  COMPANY_TECHNOLOGY_PARTNER_LOGO_NODES,
  COMPANY_TECHNOLOGY_PARTNER_ROW,
  TECHNOLOGY_PARTNERS_TITLE_GRADIENT,
} from "./company-technology-partners-data";

const FALLBACK_TITLE = "TECHNOLOGY PARTNERS";

type CompanyTechnologyPartnersProps = {
  data?: any;
};

export function CompanyTechnologyPartners({ data }: CompanyTechnologyPartnersProps = {}) {
  const title = (data?.title as string) || FALLBACK_TITLE;
  return (
    <section
      className="absolute top-[4584px] left-[118px] z-[8] h-[285px] w-[1204px] bg-black"
      data-node-id="2379:4669"
      data-name="Frame 1618875819"
      aria-label="Technology partners"
    >
      <p
        className={`${gilroySemiBold.className} absolute top-0 left-0 bg-clip-text text-[56px] leading-[60px] font-semibold tracking-[-1.12px] whitespace-nowrap text-transparent opacity-90 not-italic [word-break:break-word]`}
        style={{ backgroundImage: TECHNOLOGY_PARTNERS_TITLE_GRADIENT }}
        data-node-id="2379:4670"
      >
        {title}
      </p>

      <div
        className="absolute top-[60px] left-0 h-[225px] w-[1204px]"
        data-node-id="2379:4671"
      >
        <EcosystemPartnerRow
          config={COMPANY_TECHNOLOGY_PARTNER_ROW}
          logoStatNodeIds={COMPANY_TECHNOLOGY_PARTNER_LOGO_NODES}
        />
      </div>
    </section>
  );
}
