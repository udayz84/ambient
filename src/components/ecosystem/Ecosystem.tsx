import { EcosystemHeader } from "./EcosystemHeader";
import { EcosystemPartners } from "./EcosystemPartners";

export function Ecosystem() {
  return (
    <section
      className="relative mx-auto mt-[150px] w-full max-w-[1440px] overflow-hidden bg-black"
      aria-label="Supported by a growing ecosystem"
      data-node-id="2379:1026"
    >
      <div className="mx-auto flex w-full max-w-[1204px] flex-col gap-[48px]">
        <EcosystemHeader />
        <div className="relative -mx-[118px] w-[calc(100%+236px)] max-w-[1440px]">
          <EcosystemPartners />
        </div>
      </div>
    </section>
  );
}
