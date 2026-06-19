import { EcosystemHeader } from "./EcosystemHeader";
import { EcosystemMobile } from "./EcosystemMobile";
import { EcosystemPartners } from "./EcosystemPartners";

export function Ecosystem() {
  return (
    <section
      className="relative mx-auto mt-[200px] w-full overflow-hidden bg-black max-[1023px]:mt-[120px]"
      aria-label="Supported by a growing ecosystem"
      data-node-id="2379:1026"
    >
      <div className="mx-auto hidden w-full max-w-[1204px] flex-col gap-[48px] min-[1024px]:flex">
        <EcosystemHeader />
      </div>
      <div className="mt-[24px] hidden w-full min-[1024px]:block">
        <EcosystemPartners />
      </div>

      {/* MOBILE (<1024px) — dedicated layout, desktop is untouched above */}
      <div className="relative w-full min-[1024px]:hidden">
        <EcosystemMobile />
      </div>
    </section>
  );
}
