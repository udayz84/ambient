import { TagBadge } from "../hero/TagBadge";
import { TechnologyFeatures } from "./TechnologyFeatures";
import { TechnologyHeadline } from "./TechnologyHeadline";
import { TechnologyMobile } from "./TechnologyMobile";
import { TechnologyVisual, TechnologyVisualBackground } from "./TechnologyVisual";
import { TechnologyCta } from "./TechnologyCta";

export function Technology({ data }: { data?: any }) {
  const tagText = data?.tag?.text || "";
  return (
    <section
      className="relative left-1/2 h-[1048px] w-screen max-w-none -translate-x-1/2 overflow-hidden bg-black max-[1023px]:h-auto min-[1024px]:mt-[120px] mt-[60px] min-[1024px]:mb-[40px] mb-[20px]"
      data-node-id="2388:317"
      aria-label="Technology"
    >
      <div className="hidden min-[1024px]:block">
        <TechnologyVisualBackground data={data} />
      </div>

      <div className="relative mx-auto hidden h-full w-full max-w-[1441px] min-[1024px]:block">
        <TechnologyVisual data={data} />

        <div
          className="absolute top-0 left-1/2 z-20 w-[180px] -translate-x-1/2"
          style={{ left: "calc(50% - 0.61px)" }}
          data-node-id="2379:1414"
        >
          <TagBadge
            label={tagText}
            width={180}
            labelOffsetX={74.5}
            rightBarLeft={170.48046875}
          />
        </div>

        <TechnologyHeadline data={data} />

        <TechnologyFeatures data={data} />

        <TechnologyCta data={data} />
      </div>

      {/* MOBILE (<1024px) — dedicated layout, desktop is untouched above */}
      <div className="relative w-full min-[1024px]:hidden">
        <TechnologyMobile data={data} />
      </div>
    </section>
  );
}
