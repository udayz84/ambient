import { EcosystemHeader } from "./EcosystemHeader";
import { EcosystemPartners } from "./EcosystemPartners";

export function Ecosystem() {
  return (
    <section
      className="relative mx-auto mt-[100px] w-full overflow-hidden bg-black"
      aria-label="Supported by a growing ecosystem"
      data-node-id="2379:1026"
    >
      <div className="mx-auto flex w-full max-w-[1204px] flex-col gap-[48px]">
        <EcosystemHeader />
      </div>
      <div className="w-full mt-[24px]">
        <EcosystemPartners />
      </div>
    </section>
  );
}
