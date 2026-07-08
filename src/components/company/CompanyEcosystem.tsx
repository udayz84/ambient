import { CompanyEcosystemContent } from "./CompanyEcosystemContent";
import { CompanyEcosystemMap } from "./CompanyEcosystemMap";

type CompanyEcosystemProps = {
  data?: any;
};

export function CompanyEcosystem({ data }: CompanyEcosystemProps = {}) {
  return (
    <section
      className="absolute top-[3647px] left-0 z-[8] h-[917px] w-[1440px] bg-black"
      data-node-id="2379:2370"
      data-name="A globally resilient ecosystem"
      aria-label="A globally resilient ecosystem"
    >
      <CompanyEcosystemContent data={data} />
      <CompanyEcosystemMap data={data} />
    </section>
  );
}
