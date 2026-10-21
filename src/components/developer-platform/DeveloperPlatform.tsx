import { DeveloperPlatformBackground } from "./FractalGlassBackground";
import { DeveloperPlatformBentoGrid } from "./DeveloperPlatformBentoGrid";
import { DeveloperPlatformHeader } from "./DeveloperPlatformHeader";
import { DeveloperPlatformMobile } from "./DeveloperPlatformMobile";
import { TabletScaleCanvas } from "../shared/TabletScaleCanvas";

export function DeveloperPlatform({ data }: { data?: any }) {
  return (
    <section
      className="relative isolate left-1/2 mt-[30px] w-screen max-w-none -translate-x-1/2 overflow-hidden bg-[#214c32] max-[599px]:mt-0"
      aria-label="Developer platform"
      data-node-id="2379:964"
      data-name="Desktop - 3"
    >
      <div className="hidden min-[600px]:block">
        <DeveloperPlatformBackground data={data} />
      </div>

      <TabletScaleCanvas className="relative mx-auto hidden h-[883px] w-[1440px] shrink-0 min-[600px]:block">
        <DeveloperPlatformHeader data={data} />
        <DeveloperPlatformBentoGrid data={data} />
      </TabletScaleCanvas>

      {/* MOBILE (<600px) */}
      <div className="relative w-full min-[600px]:hidden">
        <DeveloperPlatformMobile data={data} />
      </div>
    </section>
  );
}
