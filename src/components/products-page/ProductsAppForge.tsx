/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import { dmMono, gilroyMedium, interRegular } from "../hero/fonts";
import { getFadeInClass, useFadeIn } from "../shared/useFadeIn";
import { Corners } from "../shared/Corners";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";
import { CORNER_LEFT, CORNER_RIGHT, sectionTitleGradient } from "../model-zoo/model-zoo-data";
import { mediaUrl } from "@/lib/strapi";

const TITLE_GRADIENT = sectionTitleGradient(111.766);

/** Figma 5241:5752…5751 — dimmed preview list buttons (84px, opacity 20). */
const FORGE_STEPS = ["Pair over BLE", "Flash a demo instantly", "See results live"];

/** Figma component-set 5241:5968 variants — clicking a row swaps to that variant:
 * active row expands to its Stat content, siblings dim to 40%, the Article panel
 * shows that variant's collage, and the switch turns on. */
const STEP_KEYS = ["pair", "flash", "results"] as const;
type ForgeStep = (typeof STEP_KEYS)[number];
const STEP_STAT: Record<ForgeStep, string> = {
  pair: "/model-zoo/af-stat-pair.webp",
  flash: "/model-zoo/af-stat-flash.webp",
  results: "/model-zoo/af-stat-results.webp",
};
const STEP_ICONS: Record<ForgeStep, string> = {
  pair: "/contact/booking-icon-phone.svg",
  flash: "/developer/pipeline-icon-deploy.svg",
  results: "/model-zoo/icon-play.svg",
};
const STEP_SUBTEXTS: Record<ForgeStep, string> = {
  pair: "Connect the app to your eval board in a tap.",
  flash: "Push VAD, gesture recognition, fall detection, and more to the board.",
  results: "Watch AI inference results stream to your phone in real time.",
};
const STEP_ARTICLE: Record<ForgeStep, string> = {
  pair: "/model-zoo/af-article-pair.webp",
  flash: "/model-zoo/af-article-flash.webp",
  results: "/model-zoo/af-article-results.webp",
};
/** Active-row heights per variant (578×185.5 / 578×212.5). */
const STEP_ACTIVE_HEIGHT: Record<ForgeStep, string> = {
  pair: "h-[320px] min-[1024px]:h-[185.5px]",
  flash: "h-[320px] min-[1024px]:h-[212.5px]",
  results: "h-[320px] min-[1024px]:h-[185.5px]",
};

/**
 * Figma 5131:10421 — "Your eval kit, controlled from your phone." section
 * (1440×1433 canvas; 1192.5-wide content at x=124). The two off-canvas
 * "footer" frames at x≈1477 in Figma are ignored (invisible).
 */
export function ProductsAppForge({ data }: { data?: any }) {
  const heading = data?.heading || "Your eval kit, controlled from your phone.";
  const subheading =
    data?.subheading ||
    "Download ApplicationForge, pair with your kit over Bluetooth, and flash live demos in seconds — no laptop, no code.";
  const { fadeRef: articleRef, isVisible: articleVisible } = useFadeIn<HTMLDivElement>();
  const { fadeRef: forgeRef, isVisible: forgeVisible } = useFadeIn<HTMLDivElement>();
  const [activeStep, setActiveStep] = useState<ForgeStep | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    // prefers-reduced-motion: keep the Article panel's ambient video paused
    if (videoRef.current) {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
    }
  }, []);
  return (
    <section
      className="relative w-full bg-black"
      data-node-id="5131:10421"
      aria-label="Your eval kit, controlled from your phone"
    >
      {/* Preload assets so steps load instantly without flashing */}
      <div className="hidden" aria-hidden="true">
        <img src={STEP_ARTICLE.pair} alt="" loading="eager" />
        <img src={STEP_ARTICLE.flash} alt="" loading="eager" />
        <link rel="preload prefetch" as="video" href="/model-zoo/af-results.mp4" />
        <link rel="preload" as="image" href="/videos/electronica-tv-01-v03-poster.jpg" />
        </div>
      {/* Figma 5131:10576 — full-bleed ambient glow strip behind the showcase
          and the wide article card (top 519, h 552 in the 1440 canvas). */}
      <img
        alt=""
        src="/model-zoo/af-bg-1.webp"
        aria-hidden
        className="pointer-events-none absolute top-[519px] left-0 hidden h-[552px] w-full object-cover min-[1024px]:block"
        loading="lazy"
        decoding="async"
      />
      {/* Figma 5131:10575 — second glow strip, butted against the first
          (top 1071 = 519 + 552) so the light runs continuously down through
          the article card, CTA and into the next section (Steps paints no
          background of its own there, so this shows through). */}
      <img
        alt=""
        src="/model-zoo/af-bg-2.webp"
        aria-hidden
        className="pointer-events-none absolute top-[1071px] left-0 hidden h-[553px] w-full object-cover min-[1024px]:block"
        loading="lazy"
        decoding="async"
      />
      <div className="relative mx-auto w-full max-w-[1192.5px] px-[16px] min-[1024px]:px-0">
        {/* Header — 5131:10258 (title + sub, gap 24) */}
        <div className="flex w-full flex-col items-center gap-[24px] pt-[49px]" data-node-id="5131:10258">
          <div className="relative px-[10px]" data-node-id="5131:10260" data-name="Title">
            <h2
              className={`${gilroyMedium.className} w-full max-w-[605px] bg-clip-text text-center text-[36px] leading-[36px] min-[1024px]:text-[46px] min-[1024px]:leading-[49px] font-medium text-transparent not-italic`}
              style={{ backgroundImage: TITLE_GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text" }}
              data-node-id="5131:10261"
            >
              {heading}
            </h2>
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          </div>
          <p className={`${interRegular.className} w-full max-w-[679.389px] text-center text-[14px] leading-[21px] min-[1024px]:text-[16px] min-[1024px]:leading-[24px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}>
            {subheading}
          </p>
        </div>

        {/* Application Forge showcase — 5241:5967 (gap 24, h 578).
            Entrance: the row fades in on scroll, inner elements stagger. */}
        <div
          ref={forgeRef}
          className={`mt-[24px] flex flex-col items-stretch gap-[24px] min-[1024px]:mt-[48px] min-[1024px]:h-[578px] min-[1024px]:flex-row min-[1024px]:items-center ${getFadeInClass(forgeVisible)}`}
          data-node-id="5241:5967"
        >
          {/* Left canvas card — 5241:5677 */}
          <div className="flex h-[320px] w-full shrink-0 items-stretch justify-center min-[1024px]:h-full min-[1024px]:w-[590.509px]">
            <div
              className={`relative h-full w-full overflow-clip rounded-[12px] min-[1024px]:rounded-none transition-colors duration-300 ${forgeVisible ? "motion-safe:animate-hero-text-fade-in" : "opacity-0"}`}
              style={{ animationDelay: "80ms", animationFillMode: "both" }}
              data-node-id="5241:5677"
              data-name="Article"
              aria-hidden
            >
              <video
                ref={videoRef}
                className="pointer-events-none absolute inset-0 size-full object-contain"
                poster="/videos/electronica-tv-01-v03-poster.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                onLoadedMetadata={(e) => {
                  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                    e.currentTarget.play().catch(() => {});
                  }
                }}
              >
                <source src="/videos/electronica-tv-01-v03.webm" type="video/webm" />
                <source src="https://ambientwebasset.blob.core.windows.net/website-assets/model-zoo/af-video.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          {/* Right column — 5241:5702 */}
          <div className="relative flex min-w-px flex-1 flex-col items-center justify-center gap-[25px] min-[1024px]:items-end min-[1024px]:pr-[20px]" data-node-id="5241:5702">
            <div className={`flex w-[95%] max-w-[420px] mx-auto flex-col items-center gap-[12px] min-[1024px]:w-[520px] min-[1024px]:max-w-none min-[1024px]:mx-0 ${forgeVisible ? "motion-safe:animate-hero-text-fade-in" : "min-[1024px]:opacity-0"}`} style={{ animationDelay: "140ms", animationFillMode: "both" }} data-node-id="5241:5728" data-name="eval kit">
              {(Array.isArray(data?.steps) && data.steps.length === 3 ? data.steps.map((s: any) => s.title || "") : FORGE_STEPS).map((step: string, i: number) => {
                const key = STEP_KEYS[i];
                return (
                  <div
                    key={step}
                    className="relative block w-full h-auto shrink-0 border-[0.5px] border-solid border-[rgba(255,255,255,0.1)] backdrop-blur-[12px] bg-[rgba(0,0,0,0.2)] text-left"
                    data-node-id={`5241:57${52 - i * 6}`}
                  >
                    <div className="flex flex-col items-start gap-[12px] p-[24px]">
                      <div className="relative size-[32px] flex items-center justify-center opacity-80">
                        <img src={STEP_ICONS[key]} alt="" className="max-w-[100%] max-h-[100%] object-contain" />
                      </div>
                      <div className="flex flex-col gap-[6px]">
                        <h3 className={`${gilroyMedium.className} text-[20px] leading-[24px] text-white`}>
                          {step}
                        </h3>
                        <p className={`${interRegular.className} text-[15px] leading-[22px] text-[rgba(255,255,255,0.65)]`}>
                          {STEP_SUBTEXTS[key]}
                        </p>
                      </div>
                    </div>
                    <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Wide article card — 5131:10513 (1192.5×391) */}
        <div
          ref={articleRef}
          className={`relative mt-[24px] flex h-auto flex-col items-stretch justify-center gap-[20px] px-[20px] py-[32px] transition-colors duration-300 min-[1024px]:mt-[41px] min-[1024px]:h-[391px] min-[1024px]:flex-row min-[1024px]:items-start ${getFadeInClass(articleVisible)}`}
          data-node-id="5131:10513"
          data-name="Article"
        >


          {/* Phone showcase — 5131:10537 */}
          <div className="relative h-[327px] w-full min-w-px min-[1024px]:flex-1" data-node-id="5131:10537" data-name="Container">
            <img
              alt="ApplicationForge phone app preview on an eval kit"
              src={(data?.phone_mockup_image ? mediaUrl(data.phone_mockup_image) : "/model-zoo/phone-mockup-new.png") || undefined}
              className="pointer-events-none size-full object-contain object-center"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* NewsSection — 5131:10514 */}
          <div className="relative flex w-full min-w-px flex-1 flex-col items-start self-stretch gap-[40px]" data-node-id="5131:10514" data-name="NewsSection">
            <div className="relative h-[26px] w-[220px] shrink-0 overflow-clip bg-[rgba(255,255,255,0.06)]" data-node-id="5131:10515" data-name="Menu">
              <p className={`${dmMono.className} absolute top-[calc(50%-4.5px)] left-[calc(50%-0.26px)] -translate-x-1/2 text-[13px] leading-[19.5px] font-normal tracking-[-0.39px] whitespace-nowrap text-[#ecfae5] uppercase not-italic [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}>
                {data?.card_badge || "super easy process"}
              </p>
              <div className="absolute top-1/2 left-[6.48px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
              <div className="absolute top-1/2 right-[6.48px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
              <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            </div>
            <p className={`${gilroyMedium.className} w-full text-[32px] leading-[38px] text-white not-italic [word-break:break-word]`} data-node-id="5131:10523">
              {data?.card_title || "Download the app and get it working with Sparsh module"}
            </p>
            <div className="flex flex-wrap items-center gap-[19.667px]" data-node-id="5203:5767">
              <img alt="Get it on Google Play" src="/model-zoo/af-badge-2.webp" className="h-[59px] w-[177px] shrink-0 rounded-[8px]" loading="lazy" decoding="async" data-node-id="5203:5769" />
              <div className="group relative h-[59px] w-[177px] shrink-0 rounded-[8px] cursor-not-allowed overflow-hidden">
                <img alt="Download on the App Store" src="/model-zoo/af-badge-1.webp" className="h-full w-full object-cover transition-all duration-300 group-hover:blur-[2px] group-hover:brightness-50" loading="lazy" decoding="async" data-node-id="5203:5768" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className={`${gilroyMedium.className} text-[14px] text-white text-center font-semibold leading-tight`}>Available soon<br/>on iOS</span>
                </div>
              </div>
            </div>
          </div>

          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
        </div>

        {/* Request CTA — 5131:10555 (293×48, centered). */}
        <div className="relative mt-[30px] flex justify-center pb-[63px]">
          <a
            href={data?.cta?.href || "#"}
            className="shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)] relative flex h-[48px] min-w-[293px] px-[24px] shrink-0 items-center justify-center"
            data-node-id="5131:10556"
            data-name="Cta"
          >
            <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]" />
            <span className={`${gilroyMedium.className} relative text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic`}>
              {data?.cta?.label || "Request an Eval Kit"}
            </span>
            <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]" />
            <GreenCtaCorners />
          </a>
        </div>
      </div>
    </section>
  );
}
