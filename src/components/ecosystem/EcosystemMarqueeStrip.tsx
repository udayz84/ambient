import Image from "next/image";
import {
  type EcosystemPartner,
  resolvePartners,
} from "./ecosystem-data";

// One long continuous partner-logo strip in the same 1204px centered frame
// as the Ecosystem partner rows: uniform cells, 1px dividers, hairline
// top/bottom borders and 4px corner tick marks at the frame corners.
// Track = 2 identical halves so the -50% marquee loop is seamless.
const STRIP_WIDTH_PX = 1204;
const CELL_WIDTH_PX = 225;
const CELL_HEIGHT_PX = 225;
const SETS_PER_HALF = 2;
const MARQUEE_DURATION_S = 18; // ~100px/s, matching the Ecosystem pan speed

function CornerMark({
  src,
  rotate,
  position,
}: {
  src: string;
  rotate: number;
  position: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute flex size-[4px] items-center justify-center ${position}`}
    >
      <div className="flex-none" style={{ transform: `rotate(${rotate}deg)` }}>
        <div className="relative size-[4px]">
          <Image
            src={src}
            alt=""
            width={4}
            height={4}
            className="block size-full max-w-none"
          />
        </div>
      </div>
    </div>
  );
}

export function EcosystemMarqueeStrip({
  partners,
}: {
  partners?: readonly EcosystemPartner[];
}) {
  const logos = resolvePartners(partners);
  const sets = Array.from({ length: SETS_PER_HALF * 2 });

  return (
    <section
      className="relative w-full overflow-hidden bg-black py-[40px]"
      aria-label="Partners"
    >
      <div
        className="relative mx-auto overflow-hidden border-y border-white/20 bg-[rgba(255,255,255,0.04)]"
        style={{ maxWidth: STRIP_WIDTH_PX }}
      >
        <div
          className="flex w-max animate-dvk-marquee-left items-center"
          style={{ animationDuration: `${MARQUEE_DURATION_S}s` }}
        >
          {sets.map((_, s) =>
            logos.map((logo, i) => (
              <div key={`${s}-${i}`} className="flex shrink-0 items-center">
                <div
                  className="flex shrink-0 items-center justify-center"
                  style={{ width: CELL_WIDTH_PX, height: CELL_HEIGHT_PX }}
                >
                  {logo.src ? (
                    <Image
                      src={logo.src}
                      alt=""
                      width={logo.width}
                      height={logo.height}
                      className="block max-w-none object-contain"
                      style={{ width: logo.width, height: logo.height }}
                    />
                  ) : null}
                </div>
                <div
                  aria-hidden
                  className="h-[217px] w-px shrink-0 bg-white/10"
                />
              </div>
            )),
          )}
        </div>

        {/* Frame corner tick marks (same assets/rotations as the Ecosystem rows) */}
        <CornerMark
          src="/ecosystem/corner-tl.svg"
          rotate={0}
          position="top-0 left-0"
        />
        <CornerMark
          src="/ecosystem/corner-tr.svg"
          rotate={180}
          position="top-0 right-0"
        />
        <CornerMark
          src="/ecosystem/corner-tr.svg"
          rotate={0}
          position="bottom-0 left-0"
        />
        <CornerMark
          src="/ecosystem/corner-tl.svg"
          rotate={180}
          position="bottom-0 right-0"
        />
      </div>
    </section>
  );
}
