import { CompanyBottomCta } from "./CompanyBottomCta";
import { CompanyFooterBackdrop } from "./CompanyFooterBackdrop";

export function CompanyEndSection() {
  return (
    <div
      className="absolute top-[6572px] left-0 z-[7] h-[1252px] w-[1440px]"
      data-node-id="2379:2091"
      data-name="Footer section"
    >
      <CompanyFooterBackdrop />
      <div className="pointer-events-auto">
        <CompanyBottomCta />
      </div>
    </div>
  );
}
