import { PlatformScaleBackground } from "./PlatformScaleBackground";
import { PlatformScaleChipVisual } from "./PlatformScaleChipVisual";
import { PlatformScaleCta } from "./PlatformScaleCta";
import { PlatformScaleHeader } from "./PlatformScaleHeader";
import { PlatformScaleNav } from "./PlatformScaleNav";
import { PlatformScaleStat } from "./PlatformScaleStat";

export function PlatformScale() {
  return (
    <section
      className="relative mx-auto h-[1193px] w-full max-w-[1440px] overflow-hidden bg-black"
      data-node-id="2379:617"
      data-name="Desktop - 2"
      aria-label="One platform, infinite scale"
    >
      <PlatformScaleBackground />
      <PlatformScaleHeader />
      <PlatformScaleChipVisual />
      <PlatformScaleStat />
      <PlatformScaleNav />
      <PlatformScaleCta />
    </section>
  );
}
