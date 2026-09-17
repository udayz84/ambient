import Image from "next/image";
import {
  type EcosystemPartner,
  resolvePartners,
} from "./ecosystem-data";

// One long continuous full-bleed partner-logo strip: uniform cells, 1px
// dividers, hairline top/bottom borders and 4px corner tick marks at the
// strip corners. Track = 2 identical halves so the -50% marquee loop is
// seamless.
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
      className="relative w-full overflow-hidden bg-black py-6 md:py-[40px]"
      aria-label="Partners"
    >
      <div className="relative w-full overflow-hidden border-y border-white/20 bg-[rgba(255,255,255,0.04)]">
        <div
          className="flex w-max animate-dvk-marquee-left items-center"
          style={{ animationDuration: `${MARQUEE_DURATION_S}s` }}
        >
          {sets.map((_, s) =>
            logos.map((logo, i) => (
              <div key={`${s}-${i}`} className="flex shrink-0 items-center">
                <div className="flex h-[120px] w-[120px] shrink-0 items-center justify-center md:h-[225px] md:w-[225px]">
                  {logo.src ? (
                    <Image
                      src={logo.src}
                      alt=""
                      width={logo.width}
                      height={logo.height}
                      className="block max-h-full max-w-full object-contain"
                      style={{ width: logo.width, height: logo.height }}
                    />
                  ) : null}
                </div>
                <div
                  aria-hidden
                  className="h-[112px] w-px shrink-0 bg-white/10 md:h-[217px]"
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
