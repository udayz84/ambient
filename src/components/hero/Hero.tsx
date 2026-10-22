"use client";

import { useFitText } from "../shared/FitText";
import { gilroyMedium, gilroySemiBold, interRegular } from "./fonts";
import { HeroMetrics } from "./HeroMetrics";
import { HeroScrollIndicator } from "./HeroScrollIndicator";
import { HeroStat } from "./HeroStat";
import { HeroVisual } from "./HeroVisual";
import { HeroVisualMedia } from "./HeroVisualMedia";

import { TabletScaleCanvas } from "../shared/TabletScaleCanvas";
import { mediaUrl } from "@/lib/strapi";

type HeroMediaInput = Parameters<typeof mediaUrl>[0] | string | Record<string, unknown> | null | undefined;

function resolveHeroImage(media: HeroMediaInput): string | null {
  if (!media) return null;
  if (typeof media === "string") return media;
  return mediaUrl(media as Parameters<typeof mediaUrl>[0]);
}

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Hero({ data }: { data?: any }) {
  const title = data?.title || "";
  const subtitle = data?.subtitle || "";
  const scrollText = data?.scroll_text || "";
  const rawImage =
    data?.image ||
    data?.hero_image ||
    data?.visual_media ||
    data?.video;

  const rawMobileImage =
    data?.mobile_image ||
    data?.mobile_hero_image ||
    data?.mobile_visual_media ||
    data?.mobile_video ||
    rawImage;

  const imageAlt =
    data?.image_alt ||
    data?.video_alt ||
    rawImage?.alternativeText ||
    "Ambient Scientific Hero";

  const mobileImageAlt =
    data?.mobile_image_alt ||
    data?.mobile_video_alt ||
    rawMobileImage?.alternativeText ||
    imageAlt;

  const defaultHeroImage =
    "https://ambientwebasset.blob.core.windows.net/website-assets/strapi-uploads/Frame_1984079527_4bac9f0c4b.png";

  const imageSrc = resolveHeroImage(rawImage) || defaultHeroImage;
  const mobileImageSrc = resolveHeroImage(rawMobileImage) || imageSrc;
  const metrics: HeroMetric[] = Array.isArray(data?.metrics)
    ? data.metrics
    : [];

  const m0 = metrics[0] || {};
  const m1 = metrics[1] || {};
  const v0 = m0.value || "";
  const v1 = m1.value || "";
  const v0Split = splitValue(v0);
  const v1Split = splitValue(v1);

  const fitRef = useFitText<HTMLHeadingElement>({ maxLines: 2 });
  const fitRef2 = useFitText<HTMLHeadingElement>({ maxLines: 2 });

  return (
    <section
      className="relative flex flex-col items-center h-full w-full justify-center overflow-hidden bg-black"
      data-node-id="2379:734"
      data-name="Hero Section"
      aria-label="Hero"
    >
      {/* DESKTOP (>=600px) */}
      <TabletScaleCanvas className="relative hidden h-[876px] w-[1440px] shrink-0 min-[600px]:block">
        <HeroVisual imageSrc={imageSrc} alt={imageAlt} />

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

        {/* Foreground Content Wrapper */}
        <div className="relative mt-[78px] h-[798px] w-full">
          <div
            className={`${gilroyMedium.className} absolute top-[130px] left-[936px] flex w-[442px] flex-col items-start gap-[15px] [word-break:break-word] not-italic animate-hero-text-fade-in transform-gpu`}
            style={{ animationDelay: '0.3s', animationDuration: '1000ms' }}
            data-node-id="2379:780"
          >
            <h1
              ref={fitRef}
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
              className={`${interRegular.className} shrink-0 text-[16px] leading-[24px] font-normal text-[#f0f0f0] opacity-80 w-full max-w-[419px] [word-break:break-word]`}
              data-node-id="2379:782"
            >
              {subtitle}
            </p>
          </div>

          <HeroMetrics
            metrics={metrics}
            className="absolute top-[515px] left-[120px] flex w-max content-stretch items-start justify-start gap-[24px]"
          />
          <HeroScrollIndicator
            scrollText={scrollText}
            className="absolute top-[696px] left-[1335.5px] flex h-[75px] w-[18px] flex-col content-stretch items-center gap-[10px] cursor-pointer border-0 bg-transparent p-0"
          />
        </div>
      </TabletScaleCanvas>

      {/* MOBILE (<600px) */}
      <div className="relative flex min-[600px]:hidden w-full flex-col items-center pt-[100px] pb-[56px] px-[24px] md:px-[32px] overflow-hidden">
        {/* Background Vertical Lines connecting to Navbar */}
        {/* Left Line */}
        <div className="pointer-events-none absolute top-[78px] bottom-0 left-[26px] md:left-[36px] z-0">
          <div className="absolute top-0 left-1/2 h-full w-[1px] -translate-x-1/2 overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-[821px] origin-top-left rotate-90 opacity-60">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/hero/line-82.svg" alt="" className="block size-full max-w-none" aria-hidden />
            </div>
          </div>
        </div>

        {/* Right Line */}
        <div className="pointer-events-none absolute top-[78px] bottom-0 right-[26px] md:right-[36px] z-0">
          <div className="absolute top-0 left-1/2 h-full w-[1px] -translate-x-1/2 overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-[821px] origin-top-left rotate-90 opacity-60">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/hero/line-83.svg" alt="" className="block size-full max-w-none" aria-hidden />
            </div>
          </div>
        </div>

        {/* Text Area */}
        <div className="relative z-10 flex flex-col items-start md:items-center md:text-center px-[4px] md:px-[24px] gap-[15px] w-full max-w-[680px]">
          <h1
            ref={fitRef2}
            className={`${gilroyMedium.className} w-[320px] max-w-full md:w-auto md:max-w-[640px] bg-clip-text text-[36px] leading-[36px] md:text-[44px] md:leading-[48px] font-medium text-transparent [word-break:break-word] not-italic`}
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
            className={`${interRegular.className} w-[332px] max-w-full md:w-auto md:max-w-[580px] text-[14px] leading-[21px] md:text-[16px] md:leading-[24px] font-normal text-[#f0f0f0] opacity-80 [word-break:break-word]`}
          >
            {subtitle}
          </p>
        </div>

        {/* Visual Area */}
        <div
          className="pointer-events-none absolute top-[242px] md:top-[250px] left-[50%] h-[398.341px] w-[716.22px] -translate-x-1/2 overflow-hidden scale-[0.85] md:scale-[0.98] origin-top"
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
          <HeroVisualMedia mobile imageSrc={mobileImageSrc} alt={mobileImageAlt} />
        </div>

        {/* Spacer to push stats down */}
        <div className="h-[280px] md:h-[340px] w-full shrink-0" />

        {/* Mobile Stats Area (<768px): Vertical stacked with bracket divider */}
        <div className="relative z-10 w-full px-[4px] md:hidden">
          <div className="flex flex-col gap-[24px]">
            <HeroStat
              tag={m0.tag || ""}
              tagWidth={230}
              labelOffsetX={0}
              centerLabel
              rightBarLeft={221}
              height={32}
              labelClassName="text-[15px] leading-[22px] tracking-[-0.45px]"
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
              <div className="absolute top-[-4px] left-0 h-[9px] w-[1px] bg-white" />
              <div className="absolute top-0 left-0 h-[1px] w-[5px] bg-white" />
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

        {/* Small Tablet Stats Area (768px – 1023px): Side-by-side metrics */}
        <div className="relative z-10 hidden md:flex w-full justify-center px-[10px]">
          <HeroMetrics
            metrics={metrics}
            className="relative flex items-start justify-center gap-[24px] min-[900px]:gap-[40px] flex-nowrap"
          />
        </div>

        {/* Scroll Indicator on Small Tablet */}
        <div className="relative z-10 hidden md:flex justify-center mt-[36px]">
          <HeroScrollIndicator
            scrollText={scrollText}
            className="relative flex h-[75px] w-[18px] flex-col content-stretch items-center gap-[10px] cursor-pointer border-0 bg-transparent p-0"
          />
        </div>
      </div>
    </section>
  );
}
