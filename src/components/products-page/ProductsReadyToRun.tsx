"use client";

import { gilroyMedium, interRegular } from "../hero/fonts";
import { TagBadge } from "../hero/TagBadge";
import { Corners } from "../shared/Corners";
import {
  CollageRow,
  COLLAGE_ROW_1,
  COLLAGE_ROW_2,
} from "../applications-page/ApplicationsPageModelZoo";

/**
 * "Ready to Run" — Model Zoo strip under the use-cases tabs.
 * Copy: eyebrow + heading + sub + two-row model-card marquee (shared with
 * the /applications strip).
 */
export function ProductsReadyToRun() {
  return (
    <section
      aria-label="Ready to run"
      className="relative w-full overflow-hidden bg-black pt-[64px] pb-[48px]"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-[1024px] flex-col items-center gap-[20px] px-[24px] text-center">
        <TagBadge label="Ready to Run" />
        <div className="relative px-[14px]">
          <Corners leftSrc="/products/fp-title-corner-left.svg" rightSrc="/products/fp-title-corner-right.svg" />
          <h2
            className={`${gilroyMedium.className} bg-clip-text text-center text-[36px] leading-[42px] font-medium text-transparent not-italic min-[1024px]:text-[46px] min-[1024px]:leading-[49px]`}
            style={{
              backgroundImage:
                "linear-gradient(to bottom, #ffffff 40%, rgba(255, 255, 255, 0.2) 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            GPX10 Pro already speaks your application.
          </h2>
        </div>
        <p className={`${interRegular.className} max-w-[800px] text-[16px] leading-[24px] font-normal text-[rgba(240,240,240,0.6)] not-italic`}>
          Every application above runs on a real, GPX-tuned model from the Model Zoo, open-source and Ambient-built, deployable in one click. Flash one to your kit and watch it run in seconds.
        </p>
      </div>

      {/* Model strip */}
      <div className="relative z-10 mt-[48px] flex w-full flex-col gap-[16px] overflow-hidden">
        <CollageRow
          cards={COLLAGE_ROW_1}
          nodeId="products-rtr-r1"
          direction="left"
          duration={32}
        />
        <CollageRow
          cards={COLLAGE_ROW_2}
          nodeId="products-rtr-r2"
          direction="right"
          duration={26}
        />
      </div>
    </section>
  );
}
