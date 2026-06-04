import { DeveloperPlatformBackground } from "./FractalGlassBackground";
import { DeveloperPlatformBentoGrid } from "./DeveloperPlatformBentoGrid";
import { DeveloperPlatformHeader } from "./DeveloperPlatformHeader";

export function DeveloperPlatform() {
  return (
    <section
      className="relative isolate left-1/2 mt-[150px] h-[883px] w-screen max-w-none -translate-x-1/2 overflow-hidden bg-[#214c32]"
      aria-label="Developer platform"
      data-node-id="2379:964"
      data-name="Desktop - 3"
    >
      <DeveloperPlatformBackground />

      <div className="relative mx-auto h-full w-full max-w-[1440px]">
        <DeveloperPlatformHeader />
        <DeveloperPlatformBentoGrid />
      </div>
    </section>
  );
}
