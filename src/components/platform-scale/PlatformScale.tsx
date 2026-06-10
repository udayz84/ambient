import { PlatformScaleBackground } from "./PlatformScaleBackground";
import { PlatformScaleCarousel } from "./PlatformScaleCarousel";
import { PlatformScaleCta } from "./PlatformScaleCta";
import { PlatformScaleHeader } from "./PlatformScaleHeader";

export function PlatformScale() {
  return (
    <section
      className="relative left-1/2 h-[1193px] w-screen max-w-none -translate-x-1/2 overflow-hidden bg-black"
      data-node-id="2379:617"
      data-name="Desktop - 2"
      aria-label="One platform, infinite scale"
    >
      <PlatformScaleBackground />

      <div className="relative mx-auto h-full w-full">
        <PlatformScaleHeader />
        <PlatformScaleCarousel />
        <PlatformScaleCta />
      </div>
    </section>
  );
}
