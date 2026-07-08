/* eslint-disable @next/next/no-img-element */
import { mediaUrl } from "@/lib/strapi";
import { dmMono, gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { GradientTitle } from "../contact/contact-shared";

const TITLE_GRADIENT_DEG = "101.672deg";
const FALLBACK_SUBTITLE =
  "Spinning a custom PCB with extreme space and power constraints takes months of trial and error. We solved the hardware physics so you can focus entirely on your application logic.";
const FALLBACK_HEADING = "Stop Routing.\nStart Shipping.";
const ICON_BACKGROUND = "/som/icon-bg.svg";



type FeatureCardProps = {
  iconSrc: string;
  iconSize: number;
  tag: string;
  title: string;
  body: string;
};

function CardTag({ label }: { label: string }) {
  return (
    <div
      className="relative h-[26px] w-full min-[1024px]:w-[255px] shrink-0 overflow-clip bg-[rgba(255,255,255,0.06)]"
      data-name="Menu"
    >
      <Corners />
      <p
        className={`${dmMono.className} absolute left-1/2 top-[calc(50%-4.5px)] -translate-x-1/2 text-[13px] leading-[19.5px] font-normal tracking-[-0.39px] whitespace-nowrap text-[#ecfae5] uppercase not-italic [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word]`}
      >
        {label}
      </p>
      <div className="absolute top-1/2 left-[6.48px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
      <div className="absolute top-1/2 right-[7.52px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
    </div>
  );
}

function FeatureCard({
  iconSrc,
  iconSize,
  tag,
  title,
  body,
}: FeatureCardProps) {
  return (
    <div
      className="relative flex w-full flex-col items-start gap-[24px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.5)] px-[16px] pt-[16px] pb-[24px] min-[1024px]:h-[400px] min-[1024px]:w-[377px] min-[1024px]:gap-[36px] transition-all duration-300 hover:-translate-y-[10px] hover:shadow-[0px_94px_94px_-80px_#6fe047] min-[1024px]:hover:-translate-y-[30px]"
      data-name="Article"
    >
      {/* Icon */}
      <div
        className="relative h-[65px] w-[66.14px] shrink-0 overflow-clip rounded-[13.684px]"
        style={{ backgroundImage: `url(${ICON_BACKGROUND})` }}
        data-name="Icon"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            alt=""
            aria-hidden
            src={iconSrc}
            className="block max-w-none"
            style={{ width: iconSize, height: iconSize }}
          />
        </div>
      </div>

      {/* News section */}
      <div className="flex w-full flex-col gap-[20px] min-[1024px]:flex-1 min-[1024px]:justify-end">
        <CardTag label={tag} />
        <div className="flex flex-col gap-[10px]">
          <h3
            className={`${gilroyMedium.className} text-[18px] leading-[24px] font-medium text-white not-italic min-[1024px]:text-[20.211px] min-[1024px]:leading-[28.295px] min-[1024px]:tracking-[-0.4539px]`}
          >
            {title}
          </h3>
          <p
            className={`${interRegular.className} text-[14px] leading-[21px] font-normal tracking-[-0.3158px] text-[rgba(240,240,240,0.6)] not-italic min-[1024px]:text-[16.168px] min-[1024px]:leading-[26.274px]`}
          >
            {body}
          </p>
        </div>
      </div>

      <Corners />
    </div>
  );
}

const CARDS: FeatureCardProps[] = [
  {
    iconSrc: "/som/icon-card-1.svg",
    iconSize: 45.614,
    tag: "PRE-ENGINEERED HARDWARE",
    title: "Microwatt AI in a Micro Footprint",
    body: "We pre-routed the GPX10 AI processor and wireless stacks into high-density footprints. Skip RF certification nightmares and achieve scale.",
  },
  {
    iconSrc: "/som/icon-card-2.svg",
    iconSize: 40,
    tag: "Vertical-Specific Integration",
    title: "Purpose-Built Peripherals",
    body: "Simplify sourcing and driver integration. Each SOM is pre-integrated with the sensors and interfaces your vertical needs—vision, telemetry, or acoustics.",
  },
  {
    iconSrc: "/som/icon-card-3.svg",
    iconSize: 40,
    tag: "Ecosystem Portability",
    title: "1:1 Code Portability",
    body: "The exact C-code, AI object files, and unified Eclipse build you validated on the Cranium Evaluation Kit ports directly to any of our production SOMs with zero rewrites.",
  },
];

export function SomFeatures({ data }: { data?: any }) {
  const subtitle = data?.subtitle || FALLBACK_SUBTITLE;
  const headingLines = (data?.heading || FALLBACK_HEADING).split("\n");
  const cards: FeatureCardProps[] = Array.isArray(data?.cards) && data.cards.length > 0
    ? data.cards.map((c: any, i: number) => {
        const fb = CARDS[i] || CARDS[0];
        return {
          iconSrc: mediaUrl(c?.icon) || fb.iconSrc,
          iconSize: fb.iconSize,
          tag: c?.tag || fb.tag,
          title: c?.title || fb.title,
          body: c?.description || fb.body,
        };
      })
    : CARDS;
  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-black"
      data-node-id="2438:4878"
      data-name="Stop Routing. Start Shipping."
      aria-label="Stop Routing. Start Shipping."
    >
      {/* DESKTOP (>=1024px) */}
      <div className="relative hidden w-[1203px] flex-col items-center gap-[48px] pt-[80px] pb-[80px] min-[1024px]:flex">
        {/* Section title */}
        <div
          className="flex w-[650px] flex-col items-center gap-[24px]"
          data-node-id="2438:4879"
          data-name="Section Title"
        >
          <div
            className="relative px-[10px]"
            data-node-id="2438:4880"
            data-name="Title"
          >
            <GradientTitle gradientDeg={TITLE_GRADIENT_DEG} className="text-center">
              {headingLines.map((line: string, i: number) => (
                <span
                  key={i}
                  className="block h-[49px] leading-[49px] whitespace-nowrap"
                >
                  {line}
                </span>
              ))}
            </GradientTitle>
            <Corners />
          </div>
          <p
            className={`${interRegular.className} w-[650px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
            data-node-id="2438:4886"
          >
            {subtitle}
          </p>
        </div>

        {/* Cards row */}
        <div
          className="flex w-full items-center gap-[36px] pt-[30px]"
          data-node-id="2438:4887"
        >
          {CARDS.map((card, i) => (
            <FeatureCard key={i} {...card} />
          ))}
        </div>
      </div>

      {/* MOBILE (<1024px) */}
      <div className="relative flex w-full flex-col items-center gap-[40px] px-[24px] pt-[64px] pb-[64px] min-[1024px]:hidden">
        {/* Section title */}
        <div className="flex w-full flex-col items-center gap-[20px]">
          <div className="relative px-[10px]">
            <div
              className={`${gilroyMedium.className} bg-clip-text text-center text-[34px] leading-[37px] font-medium text-transparent not-italic [word-break:break-word]`}
              style={{
                backgroundImage: `linear-gradient(${TITLE_GRADIENT_DEG}, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              {headingLines.map((line: string, i: number) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </div>
            <Corners />
          </div>
          <p
            className={`${interRegular.className} max-w-[332px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0]/80 not-italic`}
          >
            {subtitle}
          </p>
        </div>

        {/* Stacked cards */}
        <div className="flex w-full flex-col gap-[24px]">
          {CARDS.map((card) => (
            <FeatureCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
