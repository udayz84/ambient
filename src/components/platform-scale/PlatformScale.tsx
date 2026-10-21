import { PlatformScaleBackground } from "./PlatformScaleBackground";
import { PlatformScaleCarousel } from "./PlatformScaleCarousel";
import { PlatformScaleCta } from "./PlatformScaleCta";
import { PlatformScaleHeader } from "./PlatformScaleHeader";
import { PlatformScaleMobile } from "./PlatformScaleMobile";
import { TabletScaleCanvas } from "../shared/TabletScaleCanvas";

export function PlatformScale({ data }: { data?: any }) {
  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      data-node-id="2379:617"
      data-name="Desktop - 2"
      aria-label="One platform, infinite scale"
    >
      <div className="hidden min-[600px]:block">
        <PlatformScaleBackground />
      </div>

      <TabletScaleCanvas className="relative left-1/2 hidden h-[1193px] w-[1440px] -translate-x-1/2 min-[600px]:block shrink-0">
        <PlatformScaleHeader data={data} />
        <PlatformScaleCarousel data={data} />
        <PlatformScaleCta data={data} />
      </TabletScaleCanvas>

      {/* MOBILE (<600px) */}
      <div className="relative w-full min-[600px]:hidden">
        <PlatformScaleMobile data={data} />
      </div>
    </section>
  );
}
