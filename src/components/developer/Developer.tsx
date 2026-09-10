import { DeveloperHero } from "./DeveloperHero";
import { DeveloperCodeSection } from "./DeveloperCodeSection";
import { DeveloperPipeline } from "./DeveloperPipeline";
import { DeveloperComingSoon } from "./DeveloperComingSoon";
import { DeveloperMobile } from "./DeveloperMobile";

/**
 * Figma 2438:4365 — Developer page (1440 wide).
 * Hero + code section + pipeline + coming-soon = 3077 tall.
 */
const DEV_DESKTOP_HEIGHT = 3077;

export function Developer() {
  return (
    <main className="flex w-full flex-col overflow-x-clip bg-black">
      {/* DESKTOP (>=1024px) — absolute canvas */}
      <div
        className="relative mx-auto -mt-[78px] hidden w-full overflow-x-clip overflow-y-visible min-[1024px]:block"
        style={{
          height: DEV_DESKTOP_HEIGHT,
          backgroundColor: "#000",
          backgroundImage: "url('/developer/section-bg-2.webp')",
          backgroundPosition: "center 626px",
          backgroundSize: "100% 1435px",
          backgroundRepeat: "no-repeat",
        }}
        data-node-id="2438:4365"
        data-name="Developer"
      >

        <div className="relative mx-auto h-full w-[1440px]">
          <DeveloperHero />
          <DeveloperCodeSection />
          <DeveloperPipeline />
          <DeveloperComingSoon />
        </div>
      </div>

      {/* MOBILE (<1024px) — stacked layout */}
      <div className="relative -mt-[78px] w-full bg-black min-[1024px]:hidden">
        <DeveloperMobile />
      </div>
    </main>
  );
}
