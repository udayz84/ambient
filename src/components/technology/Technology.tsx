import { TagBadge } from "../hero/TagBadge";
import { TechnologyFeatures } from "./TechnologyFeatures";
import { TechnologyHeadline } from "./TechnologyHeadline";
import { TechnologyMobile } from "./TechnologyMobile";
import { TechnologyVisual, TechnologyVisualBackground } from "./TechnologyVisual";

const cornerLeft = "/hero/corner-tag-1.svg";
const cornerRight = "/hero/corner-tag-2.svg";

function ChipVisualCorners() {
  return (
    <>
      <div className="absolute top-[305.5px] right-[480.11px] flex size-[4px] items-center justify-center">
        <div className="rotate-180 flex-none">
          <div className="relative size-[4px]" data-node-id="2379:1425">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async"
                src={cornerRight}
                alt=""
                className="block size-full max-w-none"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-[305.5px] right-[968.11px] flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 flex-none">
          <div className="relative size-[4px]" data-node-id="2379:1426">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async"
                src={cornerLeft}
                alt=""
                className="block size-full max-w-none"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-[429.5px] right-[480.11px] flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 rotate-180 flex-none">
          <div className="relative size-[4px]" data-node-id="2379:1427">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async"
                src={cornerRight}
                alt=""
                className="block size-full max-w-none"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-[429.5px] right-[968.11px] flex size-[4px] items-center justify-center">
        <div className="flex-none">
          <div className="relative size-[4px]" data-node-id="2379:1428">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async"
                src={cornerLeft}
                alt=""
                className="block size-full max-w-none"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function Technology({ data }: { data?: any }) {
  const tagText = data?.tag?.text || "";
  return (
    <section
      className="relative left-1/2 h-[930px] w-screen max-w-none -translate-x-1/2 overflow-hidden bg-black max-[1023px]:h-auto"
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

        <ChipVisualCorners />
        <TechnologyFeatures data={data} />
      </div>

      {/* MOBILE (<1024px) — dedicated layout, desktop is untouched above */}
      <div className="relative w-full min-[1024px]:hidden">
        <TechnologyMobile data={data} />
      </div>
    </section>
  );
}
