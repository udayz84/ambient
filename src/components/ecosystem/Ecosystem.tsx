import { EcosystemHeader } from "./EcosystemHeader";
import { EcosystemMobile } from "./EcosystemMobile";
import { EcosystemPartners } from "./EcosystemPartners";
import { TabletScaleCanvas } from "../shared/TabletScaleCanvas";

export function Ecosystem({ data }: { data?: any }) {
  return (
    <section
      className="relative mx-auto mt-[80px] w-full overflow-hidden bg-black max-[599px]:mt-[24px]"
      aria-label="Supported by a growing ecosystem"
      data-node-id="2379:1026"
    >
      <TabletScaleCanvas className="relative hidden w-[1440px] shrink-0 flex-col items-center min-[600px]:flex mx-auto">
        <div className="mx-auto w-full max-w-[1204px] flex flex-col gap-[48px]">
          <EcosystemHeader data={data} />
        </div>
        <div className="mx-auto mt-[24px] w-full">
          <EcosystemPartners data={data} />
        </div>
      </TabletScaleCanvas>

      {/* MOBILE (<600px) */}
      <div className="relative w-full min-[600px]:hidden">
        <EcosystemMobile data={data} />
      </div>
    </section>
  );
}
