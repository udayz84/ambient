import { mediaUrl } from "@/lib/strapi";
import { gilroyMedium, gilroySemiBold, interRegular } from "./fonts";
import { HeroMetrics } from "./HeroMetrics";
import { HeroScrollIndicator } from "./HeroScrollIndicator";
import { HeroStat } from "./HeroStat";
import { HeroVisual } from "./HeroVisual";
import { HeroVisualMedia } from "./HeroVisualMedia";

const statValueGradient = (deg: number) =>
  `linear-gradient(${deg}deg, rgb(255, 255, 255) 29.352%, rgba(115, 115, 115, 0.5) 98.158%)`;

type HeroMetric = {
  tag?: string;
  value?: string;
  title?: string;
  description?: string;
};

function splitValue(value: string) {
  const match = value.match(/^(\S+)(\s+.+)$/);
  if (!match) return null;
  return { num: match[1], unit: match[2] };
}

export function Hero({ data }: { data?: any }) {
  const title = data?.title || "";
  const subtitle = data?.subtitle || "";
  const scrollText = data?.scroll_text || "";
  const videoSrc = mediaUrl(data?.video) || undefined;
  const mobileVideoSrc = mediaUrl(data?.mobile_video) || undefined;
  const metrics: HeroMetric[] = Array.isArray(data?.metrics)
    ? data.metrics
    : [];

  const m0 = metrics[0] || {};
  const m1 = metrics[1] || {};
  const v0 = m0.value || "";
  const v1 = m1.value || "";
  const v0Split = splitValue(v0);
  const v1Split = splitValue(v1);

  return (
    <section
      className="relative -mt-[78px] flex h-[876px] w-full justify-center overflow-hidden bg-black max-[1023px]:h-auto"
      data-node-id="2379:734"
      data-name="Hero Section"
      aria-label="Hero"
    >
      <div className="relative hidden h-full w-full max-w-[1442px] min-[1024px]:block">
        <HeroVisual videoSrc={videoSrc} />

        {/* Foreground Content Wrapper */}
        <div className="relative mt-[78px] h-[798px] w-full">

        <div className="pointer-events-none absolute top-[79px] left-[95px] flex h-[821px] w-0 items-center justify-center">
          <div className="flex-none rotate-90">
            <div className="relative h-0 w-[821px]" data-node-id="2379:738" data-name="Line 82">
              <div className="absolute inset-[-1px_0_0_0]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/hero/line-82.svg"
                  alt=""
                  className="block size-full max-w-none"
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className="pointer-events-none absolute top-[77.634765625px] left-[93px] h-[4px] w-[5px]"
          data-node-id="2379:739"
          data-name="Vector"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero/line-cap-left.svg"
            alt=""
            className="absolute inset-0 block size-full max-w-none"
            aria-hidden
          />
        </div>

        <div className="pointer-events-none absolute top-[79px] right-[95px] flex h-[597px] w-0 items-center justify-center">
          <div className="flex-none rotate-90">
            <div className="relative h-0 w-[597px]" data-node-id="2379:740" data-name="Line 83">
              <div className="absolute inset-[-0.5px_0]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/hero/line-83.svg"
                  alt=""
                  className="block size-full max-w-none"
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className="pointer-events-none absolute top-[77.634765625px] left-[1344.5px] h-[4px] w-[5px]"
          data-node-id="2379:741"
          data-name="Vector"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero/line-cap-right.svg"
            alt=""
            className="absolute inset-0 block size-full max-w-none"
            aria-hidden
          />
        </div>

        <div
          className={`${gilroyMedium.className} absolute top-[130px] left-[936px] flex w-[442px] flex-col items-start gap-[15px] [word-break:break-word] not-italic animate-hero-text-fade-in transform-gpu`}
          style={{ animationDelay: '1s', animationDuration: '1000ms' }}
          data-node-id="2379:780"
        >
          <h1
            className="min-w-full w-[min-content] shrink-0 bg-clip-text text-[46px] leading-[49px] font-medium text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(101.005deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
            data-node-id="2379:781"
          >
            {title}
          </h1>
          <p
            className={`${interRegular.className} shrink-0 text-[16px] leading-[24px] font-normal text-[#f0f0f0] opacity-80 w-[419px]`}
            data-node-id="2379:782"
          >
            {subtitle}
          </p>
        </div>

        <HeroMetrics metrics={metrics} />
        <HeroScrollIndicator scrollText={scrollText} />
        </div>
      </div>

      {/* MOBILE (<1024px) — dedicated layout, desktop is untouched above */}
      <div className="relative flex w-full flex-col min-[1024px]:hidden pt-[100px] pb-[56px]">
        {/* Background Vertical Lines connecting to Navbar */}
        {/* Background Vertical Lines connecting to Navbar */}
        {/* Left Line */}
        <div className="pointer-events-none absolute top-[78px] bottom-0 left-[26px] z-0">
          <div className="absolute top-0 left-1/2 h-full w-[1px] -translate-x-1/2 overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-[821px] origin-top-left rotate-90 opacity-60">
              <img src="/hero/line-82.svg" alt="" className="block size-full max-w-none" aria-hidden />
            </div>
          </div>
        </div>

        {/* Right Line */}
        <div className="pointer-events-none absolute top-[78px] bottom-0 right-[26px] z-0">
          <div className="absolute top-0 left-1/2 h-full w-[1px] -translate-x-1/2 overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-[821px] origin-top-left rotate-90 opacity-60">
              <img src="/hero/line-83.svg" alt="" className="block size-full max-w-none" aria-hidden />
            </div>
          </div>
        </div>

        {/* Text Area */}
        <div className="relative z-10 flex flex-col px-[24px] gap-[15px]">
          <h1
            className={`${gilroyMedium.className} w-[320px] max-w-full bg-clip-text text-[36px] leading-[36px] font-medium text-transparent [word-break:break-word] not-italic`}
            style={{
              backgroundImage:
                "linear-gradient(100.849deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            {title}
          </h1>
          <p
            className={`${interRegular.className} w-[332px] max-w-full text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-80`}
          >
            {subtitle}
          </p>
        </div>

        {/* Video Area - Absolute to overlap stats as per Figma (3174:48788) */}
        <div
          className="pointer-events-none absolute top-[242px] left-[50%] h-[398.341px] w-[716.22px] -translate-x-1/2 overflow-hidden"
          style={{
            maskImage: "url(/hero/mask-shape.svg)",
            WebkitMaskImage: "url(/hero/mask-shape.svg)",
            maskPosition: "-4.2px -1.661px",
            WebkitMaskPosition: "-4.2px -1.661px",
            maskSize: "711.098px 411.453px",
            WebkitMaskSize: "711.098px 411.453px",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          <HeroVisualMedia mobile videoSrc={mobileVideoSrc} />
        </div>

        {/* Spacer to push stats down */}
        <div className="h-[280px] w-full shrink-0" />

        {/* Stats Area */}
        <div className="relative z-10 px-[24px]">
          <div className="flex flex-col gap-[24px]">
            <HeroStat
              tag={m0.tag || ""}
              tagWidth={180}
              labelOffsetX={74.5}
              rightBarLeft={170.48}
              tagNodeId="mobile:744"
              statNodeId="mobile:743"
              width="100%"
              contentClassName="w-full"
              layout="row"
              value={
                <p
                  className={`${gilroySemiBold.className} min-w-[min-content] w-[min-content] shrink-0 bg-clip-text text-[40px] leading-[1.2] text-transparent`}
                  style={{
                    backgroundImage: statValueGradient(152.329),
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                  }}
                >
                  {v0Split ? (
                    <>
                      <span className="text-[40px] leading-[1.2]">{v0Split.num}</span>
                      <span className="text-[12px] leading-[1.2]">{v0Split.unit}</span>
                    </>
                  ) : (
                    v0
                  )}
                </p>
              }
              title={m0.title || ""}
              description={m0.description || ""}
            />

            <div className="relative h-[1px] w-[calc(100%-8px)] ml-[4px] bg-white/20">
               {/* Left Bracket */}
               <div className="absolute top-[-4px] left-0 h-[9px] w-[1px] bg-white" />
               <div className="absolute top-0 left-0 h-[1px] w-[5px] bg-white" />
               
               {/* Right Bracket */}
               <div className="absolute top-[-4px] right-0 h-[9px] w-[1px] bg-white" />
               <div className="absolute top-0 right-0 h-[1px] w-[5px] bg-white" />
            </div>

            <HeroStat
              tag={m1.tag || ""}
              tagWidth={129}
              labelOffsetX={49}
              rightBarLeft={121.48}
              tagNodeId="mobile:763"
              statNodeId="mobile:762"
              width="100%"
              contentClassName="w-full"
              layout="row"
              value={
                <p
                  className={`${gilroySemiBold.className} w-max whitespace-nowrap shrink-0 leading-[1.2] text-transparent`}
                  style={{
                    backgroundImage: statValueGradient(154.251),
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                  }}
                >
                  {v1Split ? (
                    <>
                      <span className="text-[40px] leading-[1.2]">{v1Split.num}</span>
                      <span className="text-[12px] leading-[1.2]">{v1Split.unit}</span>
                    </>
                  ) : (
                    <span className="text-[40px] leading-[1.2]">{v1}</span>
                  )}
                </p>
              }
              title={m1.title || ""}
              description={m1.description || ""}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
