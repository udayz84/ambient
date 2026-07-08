import { PlatformScaleBackground } from "./PlatformScaleBackground";
import { PlatformScaleCarousel } from "./PlatformScaleCarousel";
import { PlatformScaleCta } from "./PlatformScaleCta";
import { PlatformScaleHeader } from "./PlatformScaleHeader";
import { PlatformScaleMobile } from "./PlatformScaleMobile";

export function PlatformScale({ data }: { data?: any }) {
  return (
    <section
      className="relative h-[1193px] w-full overflow-hidden bg-black max-[1023px]:h-auto"
      data-node-id="2379:617"
      data-name="Desktop - 2"
      aria-label="One platform, infinite scale"
    >
      <div className="hidden min-[1024px]:block">
        <PlatformScaleBackground />
      </div>

      <div className="relative left-1/2 hidden h-full w-[1440px] -translate-x-1/2 min-[1024px]:block">
        <PlatformScaleHeader data={data} />
        <PlatformScaleCarousel data={data} />
        <PlatformScaleCta data={data} />
      </div>

      {/* MOBILE (<1024px) — dedicated layout, desktop is untouched above */}
      <div className="relative w-full min-[1024px]:hidden">
        <PlatformScaleMobile data={data} />
      </div>
    </section>
  );
}
