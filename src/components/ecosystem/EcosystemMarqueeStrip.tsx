import Image from "next/image";
import { TagBadge } from "../hero/TagBadge";
import { gilroyMedium, interRegular } from "../hero/fonts";
import type { PartnerLogo } from "./ecosystem-data";

// One long continuous full-bleed client-logo strip: uniform cells, 1px
// dividers, hairline top/bottom borders and 4px corner tick marks at the
// strip corners. Track = 2 identical halves so the -50% marquee loop is
// seamless.
const SETS_PER_HALF = 2;
const MARQUEE_DURATION_S = 18; // ~100px/s, matching the Ecosystem pan speed

// Static client roster — not CMS-driven.
const CLIENTS: readonly PartnerLogo[] = [
  { src: "/ecosystem/logo-partner-1.svg", width: 86, height: 23 },
  { src: "/ecosystem/logo-partner-2.svg", width: 120, height: 22 },
  { src: "/ecosystem/logo-partner-3.svg", width: 81, height: 19 },
  { src: "/ecosystem/logo-partner-4.svg", width: 35, height: 35 },
  { src: "/ecosystem/logo-octane.svg", width: 35, height: 35 },
];

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

export function EcosystemMarqueeStrip() {
  const logos = CLIENTS;
  const sets = Array.from({ length: SETS_PER_HALF * 2 });

  return (
    <section
      className="relative w-full overflow-hidden bg-black py-6 md:py-[40px]"
      aria-label="Clients"
    >
      <div className="mb-[24px] flex flex-col items-center gap-[16px] px-[24px] md:mb-[32px]">
        <TagBadge label="Clients" width={140} centerLabel rightBarLeft={130.48} />
        <h2
          className={`${gilroyMedium.className} bg-clip-text text-center text-[46px] leading-[49px] font-medium text-transparent [word-break:break-word] not-italic max-[1023px]:text-[28px] max-[1023px]:leading-[34px]`}
          style={{
            backgroundImage:
              "linear-gradient(124.568deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
          }}
        >
          Built on Ambient, Deployed Everywhere
        </h2>
        <p
          className={`${interRegular.className} max-w-[640px] text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 [word-break:break-word] not-italic max-[1023px]:text-[14px] max-[1023px]:leading-[21px]`}
        >
          From always-on edge devices to the hyperscaler cloud, product teams
          trust Ambient silicon to power real-world intelligence.
        </p>
      </div>

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
