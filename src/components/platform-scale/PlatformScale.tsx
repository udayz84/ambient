import { PlatformScaleBackground } from "./PlatformScaleBackground";
import { PlatformScaleCarousel } from "./PlatformScaleCarousel";
import { PlatformScaleCta } from "./PlatformScaleCta";
import { PlatformScaleHeader } from "./PlatformScaleHeader";

export function PlatformScale() {
  return (
    <section
      className="relative h-[1193px] w-full overflow-hidden bg-black"
      data-node-id="2379:617"
      data-name="Desktop - 2"
      aria-label="One platform, infinite scale"
    >
      <PlatformScaleBackground />

      <div className="relative left-1/2 h-full w-[1440px] -translate-x-1/2">
        <PlatformScaleHeader />
        <PlatformScaleCarousel />
        <PlatformScaleCta />
      </div>
    </section>
  );
}
