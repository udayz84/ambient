import { DeveloperPlatformBackground } from "./FractalGlassBackground";
import { DeveloperPlatformBentoGrid } from "./DeveloperPlatformBentoGrid";
import { DeveloperPlatformHeader } from "./DeveloperPlatformHeader";
import { DeveloperPlatformMobile } from "./DeveloperPlatformMobile";

export function DeveloperPlatform({ data }: { data?: any }) {
  return (
    <section
      className="relative isolate left-1/2 mt-[30px] h-auto min-[1024px]:h-[883px] w-screen max-w-none -translate-x-1/2 overflow-hidden bg-[#214c32] max-[767px]:mt-0"
      aria-label="Developer platform"
      data-node-id="2379:964"
      data-name="Desktop - 3"
    >
      <div className="hidden min-[1024px]:block">
        <DeveloperPlatformBackground data={data} />
      </div>

      <div className="relative mx-auto hidden h-full w-full max-w-[1440px] min-[1024px]:block">
        <DeveloperPlatformHeader data={data} />
        <DeveloperPlatformBentoGrid data={data} />
      </div>

      {/* MOBILE & SMALL TABLET (<1024px) — dedicated layout, desktop is untouched above */}
      <div className="relative w-full min-[1024px]:hidden">
        <DeveloperPlatformMobile data={data} />
      </div>
    </section>
  );
}
