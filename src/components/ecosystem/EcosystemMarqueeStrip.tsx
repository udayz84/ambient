"use client";

import Image from "next/image";
import { TagBadge } from "../hero/TagBadge";
import { Corners } from "../shared/Corners";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { type EcosystemPartner, type PartnerLogo, resolvePartners } from "./ecosystem-data";
import { useFitText } from "../shared/FitText";

// One long continuous full-bleed client-logo strip: uniform cells, 1px
// dividers and hairline top/bottom borders. Track = 2 identical halves so
// the -50% marquee loop is seamless.
const SETS_PER_HALF = 2;
const MARQUEE_DURATION_S = 18; // ~100px/s, matching the Ecosystem pan speed

// Static fallbacks — used until the Strapi `home.clients` section is populated.
const CLIENTS: readonly PartnerLogo[] = [
  { src: "/ecosystem/logo-partner-1.svg", width: 86, height: 23 },
  { src: "/ecosystem/logo-partner-2.svg", width: 120, height: 22 },
  { src: "/ecosystem/logo-partner-3.svg", width: 81, height: 19 },
  { src: "/ecosystem/logo-partner-4.svg", width: 35, height: 35 },
  { src: "/ecosystem/logo-octane.svg", width: 35, height: 35 },
];

type ClientsSection = {
  tag?: { text?: string | null } | null;
  heading?: string | null;
  subheading?: string | null;
  clients?: readonly EcosystemPartner[] | null;
};

export function EcosystemMarqueeStrip({ data }: { data?: ClientsSection | null }) {
  const logos = data?.clients?.length ? resolvePartners(data.clients) : CLIENTS;
  const sets = Array.from({ length: SETS_PER_HALF * 2 });
  const fitRef = useFitText<HTMLHeadingElement>({ maxLines: 2 });

  return (
    <section
      className="relative w-full overflow-hidden bg-black py-6 md:py-[40px]"
      aria-label="Clients"
    >
      <div className="mb-[24px] flex flex-col items-center gap-[16px] px-[24px] md:mb-[32px]">
        <TagBadge label={data?.tag?.text || "Clients"} width={140} centerLabel rightBarLeft={130.48} />
        <div className="relative px-[12px] py-[4px]">
          <Corners />
          <h2
            ref={fitRef}
            className={`${gilroyMedium.className} relative m-0 bg-clip-text p-0 text-center text-[46px] leading-[49px] font-medium text-transparent [word-break:break-word] not-italic max-[1023px]:text-[28px] max-[1023px]:leading-[34px]`}
            style={{
              backgroundImage:
                "linear-gradient(124.568deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
            }}
          >
            {data?.heading || "Built on Ambient, Deployed Everywhere"}
          </h2>
        </div>
        <p
          className={`${interRegular.className} max-w-[640px] text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 [word-break:break-word] not-italic max-[1023px]:text-[14px] max-[1023px]:leading-[21px] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
        >
          {data?.subheading ||
            "From always-on edge devices to the hyperscaler cloud, product teams trust Ambient silicon to power real-world intelligence."}
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
      </div>
    </section>
  );
}
