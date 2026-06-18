import Image from "next/image";
import { TagBadge } from "../hero/TagBadge";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";

const GREEN_CTA_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

const MOBILE_CARDS = [
  {
    metric: "100x",
    label: "LOWER POWER CONSUMPTION",
    description:
      "Extend battery life at the edge and lower energy Opex in more compute-intensive environments",
    imageSrc: "/measured-proof/card-power.png",
  },
  {
    metric: "25x",
    label: "AI PERFORMANCE",
    description:
      "Unlock richer models, faster local inference, and more capable intelligence in constrained systems",
    imageSrc: "/measured-proof/card-ai.png",
  },
  {
    metric: "10x",
    label: "COMPUTE DENSITY",
    description:
      "Pack more intelligence into the same footprint without scaling power and system complexity the old way",
    imageSrc: "/measured-proof/card-density.png",
  },
  {
    metric: "100%",
    label: "PROGRAMMABLE DESIGN",
    description:
      "Preserve the freedom to build differentiated AI systems without locking into rigid fixed-function tradeoffs",
    imageSrc: "/measured-proof/card-programmable.png",
  },
] as const;

export function MeasuredProofMobile() {
  return (
    <div className="relative flex flex-col items-center px-[24px] py-[40px]">
      <div className="flex flex-col items-center gap-[16px]">
        <TagBadge
          label="Real-time AI at edge"
          width={180}
          labelOffsetX={74.5}
          rightBarLeft={170.48046875}
        />
        <h2
          className={`${gilroyMedium.className} max-w-[327px] bg-clip-text text-center text-[26px] leading-[32px] font-medium text-transparent [word-break:break-word] not-italic`}
          style={{
            backgroundImage:
              "linear-gradient(124.568deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
          }}
        >
          Measured proof in silicon
        </h2>
      </div>

      <div className="mt-[28px] flex w-full snap-x snap-mandatory gap-[14px] overflow-x-auto pb-[8px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {MOBILE_CARDS.map((card, index) => (
          <article
            key={card.metric}
            className="animate-hero-text-fade-in relative flex h-[460px] w-[268px] shrink-0 snap-start flex-col overflow-clip border-[0.5px] border-solid border-white/10 bg-[rgba(15,14,14,0.85)]"
            style={{ animationDelay: `${index * 100}ms`, animationDuration: "800ms" }}
          >
            <div className="relative h-[150px] w-full shrink-0 overflow-hidden">
              <Image
                src={card.imageSrc}
                alt=""
                fill
                className="object-contain object-center"
                sizes="268px"
              />
            </div>
            <div className="flex flex-1 flex-col gap-[10px] p-[22px]">
              <p
                className={`${gilroyMedium.className} text-[44px] leading-[48px] font-medium whitespace-nowrap text-white not-italic`}
              >
                {card.metric}
              </p>
              <p
                className={`${interRegular.className} text-[13px] leading-[18px] font-normal tracking-[0.04em] text-[#f0f0f0] opacity-90 not-italic`}
              >
                {card.label}
              </p>
              <div className="relative h-0 w-[80px] shrink-0">
                <div className="absolute inset-[-1px_0_0_0]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/measured-proof/line-88.svg"
                    alt=""
                    className="block size-full max-w-none"
                    aria-hidden
                  />
                </div>
              </div>
              <p
                className={`${interRegular.className} mt-auto text-[12px] leading-[18px] font-normal text-[#f0f0f0] opacity-80 not-italic`}
              >
                {card.description}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-[28px] flex w-full flex-col gap-[12px]">
        <a
          href="#"
          className={`${gilroyMedium.className} relative flex h-[48px] w-full items-center justify-center overflow-hidden ${GREEN_CTA_SHADOW}`}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
          />
          <p className="relative text-[13px] leading-[24px] font-medium whitespace-nowrap text-white uppercase not-italic [word-break:break-word]">
            See what we can do
          </p>
          <Corners />
        </a>
        <a
          href="#"
          className={`${gilroyMedium.className} relative flex h-[48px] w-full items-center justify-center overflow-clip bg-[rgba(226,241,202,0.12)]`}
        >
          <p className="relative text-[13px] leading-[24px] font-medium whitespace-nowrap text-white uppercase not-italic [word-break:break-word]">
            Explore ambient store
          </p>
          <Corners />
        </a>
      </div>
    </div>
  );
}
