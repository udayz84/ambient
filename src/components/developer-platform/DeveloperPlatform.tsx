import { DeveloperPlatformBackground } from "./FractalGlassBackground";
import { DeveloperPlatformBentoGrid } from "./DeveloperPlatformBentoGrid";
import { DeveloperPlatformHeader } from "./DeveloperPlatformHeader";

export function DeveloperPlatform() {
  return (
    <section
      className="relative isolate mx-auto mt-[150px] h-[883px] w-full max-w-[1440px] overflow-hidden bg-[#214c32]"
      aria-label="Developer platform"
      data-node-id="2379:964"
      data-name="Desktop - 3"
    >
      <DeveloperPlatformBackground />
      <DeveloperPlatformHeader />
      <DeveloperPlatformBentoGrid />
    </section>
  );
}
