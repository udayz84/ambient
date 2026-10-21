/* eslint-disable @typescript-eslint/no-explicit-any */
import { TagBadge } from "../hero/TagBadge";
import { TechnologyFeatures } from "./TechnologyFeatures";
import { TechnologyHeadline } from "./TechnologyHeadline";
import { TechnologyMobile } from "./TechnologyMobile";
import { TechnologyVisual, TechnologyVisualBackground } from "./TechnologyVisual";
import { TechnologyCta } from "./TechnologyCta";

import { TabletScaleCanvas } from "../shared/TabletScaleCanvas";

export function Technology({ data }: { data?: any }) {
  const tagText = data?.tag?.text || "";
  return (
    <section
      className="relative left-1/2 w-screen max-w-none -translate-x-1/2 overflow-hidden bg-black mt-[60px] min-[600px]:mt-[120px] mb-[20px] min-[600px]:mb-[40px]"
      data-node-id="2388:317"
      aria-label="Technology"
    >
      <div className="hidden min-[600px]:block">
        <TechnologyVisualBackground data={data} />
      </div>

      <TabletScaleCanvas className="relative mx-auto hidden h-[1048px] w-[1440px] shrink-0 min-[600px]:block">
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
      </TabletScaleCanvas>

      {/* MOBILE (<600px) */}
      <div className="relative w-full min-[600px]:hidden">
        <TechnologyMobile data={data} />
      </div>
    </section>
  );
}
