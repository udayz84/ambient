/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import { dmMono, gilroyMedium, interRegular } from "../hero/fonts";
import { getFadeInClass, useFadeIn } from "../shared/useFadeIn";
import { Corners } from "../shared/Corners";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";
import { CORNER_LEFT, CORNER_RIGHT, sectionTitleGradient } from "./model-zoo-data";
import { mediaUrl } from "@/lib/strapi";
import fallbackImg from "@/../public/model-zoo/phone-mockup-new.png";
import { UpcomingProductsModal } from "../hero/UpcomingProductsModal";

import { TabletScaleCanvas } from "../shared/TabletScaleCanvas";

const TITLE_GRADIENT = sectionTitleGradient(111.766);

/** Figma 5241:5752…5751 — dimmed preview list buttons (84px, opacity 20). */
const FORGE_STEPS = ["Pair over BLE", "Flash a demo instantly", "See results live"];

/** Figma component-set 5241:5968 variants — clicking a row swaps to that variant:
 * active row expands to its Stat content, siblings dim to 40%, the Article panel
 * shows that variant's collage, and the switch turns on. */
const STEP_KEYS = ["pair", "flash", "results"] as const;
type ForgeStep = (typeof STEP_KEYS)[number];
const STEP_ICONS: Record<ForgeStep, string> = {
  pair: "/contact/booking-icon-phone-green.svg",
  flash: "/developer/pipeline-icon-deploy.svg",
  results: "/model-zoo/icon-play-green.svg",
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

/** Reusable store badges component for App Store and Google Play */
export function StoreBadges({
  bothStoresComingSoon,
  className,
}: {
  bothStoresComingSoon?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-[12px] sm:gap-[19.667px] ${className || ""}`} data-node-id="5203:5767">
      <div className={`group relative h-[52px] w-[156px] sm:h-[59px] sm:w-[177px] shrink-0 rounded-[8px] overflow-hidden ${bothStoresComingSoon ? "cursor-not-allowed" : ""}`}>
        <img
          alt="Get it on Google Play"
          src="/model-zoo/af-badge-2.webp"
          className={`h-full w-full object-cover ${bothStoresComingSoon ? "transition-all duration-300 group-hover:blur-[2px] group-hover:brightness-50" : ""}`}
          loading="lazy"
          decoding="async"
          data-node-id="5203:5769"
        />
        {bothStoresComingSoon ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className={`${gilroyMedium.className} text-[13px] sm:text-[14px] text-white text-center font-semibold leading-tight`}>
              Coming soon<br />on Android
            </span>
          </div>
        ) : null}
      </div>
      <div className="group relative h-[52px] w-[156px] sm:h-[59px] sm:w-[177px] shrink-0 rounded-[8px] cursor-not-allowed overflow-hidden">
        <img
          alt="Download on the App Store"
          src="/model-zoo/af-badge-1.webp"
          className="h-full w-full object-cover transition-all duration-300 group-hover:blur-[2px] group-hover:brightness-50"
          loading="lazy"
          decoding="async"
          data-node-id="5203:5768"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className={`${gilroyMedium.className} text-[13px] sm:text-[14px] text-white text-center font-semibold leading-tight`}>
            {bothStoresComingSoon ? "Coming soon" : "Available soon"}<br />on iOS
          </span>
        </div>
      </div>
    </div>
  );
}

function ForgeVideo({ className }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }

    // Critical for Safari / iOS WebKit autoplay
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const tryPlay = () => {
      if (!video.paused) return;
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    };

    tryPlay();
    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", tryPlay);
    video.addEventListener("canplaythrough", tryPlay);

    // Repeated retry loop until video starts playing
    let attempts = 0;
    const interval = setInterval(() => {
      if (!video.paused || ++attempts > 25) {
        clearInterval(interval);
        return;
      }
      tryPlay();
    }, 200);

    const onUserAction = () => {
      tryPlay();
    };
    window.addEventListener("touchstart", onUserAction, { passive: true });
    window.addEventListener("scroll", onUserAction, { passive: true });
    window.addEventListener("click", onUserAction, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((en) => en.isIntersecting)) {
          tryPlay();
        }
      },
      { threshold: 0.05 }
    );
    io.observe(video);

    return () => {
      clearInterval(interval);
      io.disconnect();
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
      video.removeEventListener("canplaythrough", tryPlay);
      window.removeEventListener("touchstart", onUserAction);
      window.removeEventListener("scroll", onUserAction);
      window.removeEventListener("click", onUserAction);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className={
        className ||
        "pointer-events-none absolute inset-0 size-full object-contain [&::-webkit-media-controls-start-playback-button]:!hidden [&::-webkit-media-controls]:!hidden [&::-webkit-media-controls-play-button]:!hidden"
      }
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      controls={false}
      {...({ "webkit-playsinline": "true" } as any)}
      onLoadedData={(e) => {
        const v = e.currentTarget;
        v.muted = true;
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          v.play().catch(() => {});
        }
      }}
      onCanPlay={(e) => {
        const v = e.currentTarget;
        v.muted = true;
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          v.play().catch(() => {});
        }
      }}
    >
      <source src="/videos/electronica-tv-01-v03-alpha.mp4" type='video/mp4; codecs="hvc1"' />
      <source src="/videos/electronica-tv-01-v03.webm" type="video/webm" />
      <source src="/videos/electronica-tv-01-v03.mp4" type="video/mp4" />
    </video>
  );
}

/**
 * Figma 5131:10421 — "Your eval kit, controlled from your phone." section
 * (1440×1433 canvas; 1192.5-wide content at x=124).
 */
export function ModelZooAppForge({
  data,
  formConfig,
  steps,
  hideProcessChip,
  articleHeading,
  bothStoresComingSoon,
  ctas,
  ctasCaption,
  hideArticleCard,
  storeButtonsUnderSteps,
}: {
  data?: any;
  formConfig?: any;
  steps?: { title: string; description: string }[];
  hideProcessChip?: boolean;
  articleHeading?: string;
  bothStoresComingSoon?: boolean;
  ctas?: { label: string; variant?: "primary" | "secondary" | string }[];
  ctasCaption?: string;
  hideArticleCard?: boolean;
  storeButtonsUnderSteps?: boolean;
}) {
  const heading = data?.heading || "Your eval kit, controlled from your phone.";
  const subheading =
    data?.subheading ||
    "Download NuraSync, pair with your kit over Bluetooth, and flash live demos in seconds no laptop, no code.";
  const { fadeRef: articleRef, isVisible: articleVisible } = useFadeIn<HTMLDivElement>();
  const { fadeRef: forgeRef, isVisible: forgeVisible } = useFadeIn<HTMLDivElement>();
  const [modalContext, setModalContext] = useState<"sdk" | "evalkit" | null>(null);

  const renderCtaButtons = () => {
    if (ctas) {
      return (
        <div className="flex flex-col items-center justify-center gap-[16px] w-full">
          <div className="flex flex-wrap items-center justify-center gap-[24px]">
            {ctas.map((cta, i) =>
              cta.variant === "secondary" ? (
                <a
                  key={`cta-${i}`}
                  href="#"
                  onClick={(e) => { e.preventDefault(); setModalContext("evalkit"); }}
                  className={`${gilroyMedium.className} relative flex h-[48px] w-auto shrink-0 items-center justify-center border border-white/20 bg-[rgba(226,241,202,0.12)] px-[24px] py-[10px] cursor-pointer`}
                >
                  <span className="relative flex h-full w-auto items-center justify-center text-[16px] leading-[28px] font-medium whitespace-nowrap text-white uppercase not-italic">
                    {cta.label}
                  </span>
                </a>
              ) : (
                <a
                  key={`cta-${i}`}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setModalContext(cta.label.toLowerCase().includes("sdk") ? "sdk" : "evalkit");
                  }}
                  className="shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)] relative flex h-[48px] w-auto shrink-0 items-center justify-center px-[32px] py-[10px] cursor-pointer"
                  data-node-id="5131:10556"
                  data-name="Cta"
                >
                  <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]" />
                  <span className={`${gilroyMedium.className} relative text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic`}>
                    {cta.label}
                  </span>
                  <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]" />
                  <GreenCtaCorners />
                </a>
              ),
            )}
          </div>
          {ctasCaption ? (
            <p className={`${interRegular.className} text-center text-[16px] leading-[24px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}>
              {ctasCaption}
            </p>
          ) : null}
        </div>
      );
    }
    return (
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); setModalContext("evalkit"); }}
        className="shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)] relative flex h-[48px] w-[280px] shrink-0 items-center justify-center cursor-pointer"
        data-node-id="5131:10556"
        data-name="Cta"
      >
        <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]" />
        <span className={`${gilroyMedium.className} relative text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic`}>
          Request an Eval Kit
        </span>
        <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]" />
        <GreenCtaCorners />
      </a>
    );
  };

  return (
    <section
      id="application-forge"
      className="relative w-full bg-black scroll-mt-[80px]"
      data-node-id="5131:10421"
      aria-label="Your eval kit, controlled from your phone"
    >
      {/* Preload assets so steps load instantly without flashing */}
      <div className="hidden" aria-hidden="true">
        <img src={STEP_ARTICLE.pair} alt="" loading="eager" />
        <img src={STEP_ARTICLE.flash} alt="" loading="eager" />
        <link rel="preload" as="video" href="/videos/electronica-tv-01-v03-alpha.mp4" type='video/mp4; codecs="hvc1"' />
        <link rel="preload" as="video" href="/videos/electronica-tv-01-v03.webm" type="video/webm" />
      </div>

      {/* MOBILE (<600px) */}
      <div className={`relative mx-auto flex w-full flex-col items-center px-[16px] min-[600px]:hidden ${storeButtonsUnderSteps ? "pb-[16px]" : ""}`}>
        {/* Header */}
        <div className="flex w-full flex-col items-center gap-[24px] pt-[49px]" data-node-id="5131:10258">
          <div className="relative px-[20px] py-[12px]" data-node-id="5131:10260" data-name="Title">
            <h2
              className={`${gilroyMedium.className} w-full max-w-[605px] bg-clip-text text-center text-[34px] leading-[40px] min-[400px]:text-[36px] min-[400px]:leading-[42px] font-medium text-transparent not-italic`}
              style={{ backgroundImage: TITLE_GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text" }}
              data-node-id="5131:10261"
            >
              {heading}
            </h2>
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          </div>
          <p className={`${interRegular.className} w-full max-w-[679.389px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}>
            {subheading}
          </p>
        </div>

        {/* Application Forge showcase mobile */}
        <div className="mt-[24px] flex w-full flex-col items-stretch gap-[24px]" data-node-id="5241:5967">
          <div className="flex h-[320px] w-full shrink-0 items-stretch justify-center">
            <div className="relative h-full w-full overflow-clip rounded-[12px] bg-transparent">
              <ForgeVideo />
            </div>
          </div>

          <div className="relative flex w-full flex-col items-center justify-center gap-[25px]">
            <div className="flex w-[95%] max-w-[420px] mx-auto flex-col items-center gap-[12px]">
              {FORGE_STEPS.map((step, i) => {
                const key = STEP_KEYS[i];
                const stepTitle = steps?.[i]?.title ?? step;
                const stepDescription = steps?.[i]?.description ?? STEP_SUBTEXTS[key];
                return (
                  <div
                    key={step}
                    className="relative block w-full h-auto shrink-0 border-[0.5px] border-solid border-[rgba(255,255,255,0.1)] backdrop-blur-[12px] bg-[rgba(0,0,0,0.2)] text-left"
                    data-node-id={`5241:57${52 - i * 6}`}
                  >
                    <div className="flex flex-col items-start gap-[12px] p-[24px]">
                      <div className="relative size-[32px] flex items-center justify-center opacity-80">
                        <img 
                          src={STEP_ICONS[key]} 
                          alt="" 
                          className={`max-w-[100%] max-h-[100%] object-contain ${key === 'pair' ? 'scale-125' : key === 'results' ? 'scale-150' : ''}`} 
                        />
                      </div>
                      <div className="flex flex-col gap-[6px]">
                        <h3 className={`${gilroyMedium.className} text-[20px] leading-[24px] text-white`}>
                          {stepTitle}
                        </h3>
                        <p className={`${interRegular.className} text-[15px] leading-[22px] text-[rgba(255,255,255,0.65)]`}>
                          {stepDescription}
                        </p>
                      </div>
                    </div>
                    <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
                  </div>
                );
              })}
              {storeButtonsUnderSteps && (
                <div className="w-full pt-[4px] flex flex-col items-center justify-center gap-[16px]">
                  <StoreBadges className="justify-center" bothStoresComingSoon={bothStoresComingSoon} />
                  {renderCtaButtons()}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Wide article card mobile */}
        {!hideArticleCard && (
          <div
            className="relative mt-[24px] flex h-auto w-full flex-col items-stretch justify-center gap-[20px] px-[20px] py-[32px] border-[0.5px] border-solid border-[rgba(255,255,255,0.1)] backdrop-blur-[12px] bg-[rgba(0,0,0,0.2)]"
            data-node-id="5131:10513"
            data-name="Article"
          >
            <div className="relative h-[327px] w-full min-w-px" data-node-id="5131:10537" data-name="Container">
              <img
                alt="NuraSync phone app preview on an eval kit"
                src={(data?.phone_mockup_image && mediaUrl(data.phone_mockup_image)) || fallbackImg.src}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes(fallbackImg.src)) {
                    target.src = fallbackImg.src;
                  }
                }}
                className="pointer-events-none size-full object-contain object-center"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="relative flex w-full min-w-px flex-col items-start self-stretch gap-[40px]" data-node-id="5131:10514" data-name="NewsSection">
              {hideProcessChip ? null : (
                <div className="relative h-[26px] w-[220px] shrink-0 overflow-clip bg-[rgba(255,255,255,0.06)]" data-node-id="5131:10515" data-name="Menu">
                  <p className={`${dmMono.className} absolute top-[calc(50%-4.5px)] left-[calc(50%-0.26px)] -translate-x-1/2 text-[13px] leading-[19.5px] font-normal tracking-[-0.39px] whitespace-nowrap text-[#ecfae5] uppercase not-italic [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]`}>
                    super easy process
                  </p>
                  <div className="absolute top-1/2 left-[6.48px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
                  <div className="absolute top-1/2 right-[6.48px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
                  <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
                </div>
              )}
              <p className={`${gilroyMedium.className} w-full text-[32px] leading-[38px] text-white not-italic [word-break:break-word]`} data-node-id="5131:10523">
                {articleHeading || "Download the app and get it working with Sparsh module"}
              </p>
              <StoreBadges bothStoresComingSoon={bothStoresComingSoon} />
            </div>
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          </div>
        )}

        {/* Request CTA mobile */}
        {!storeButtonsUnderSteps && (
          <div className="relative mt-[30px] flex flex-col items-center justify-center gap-[24px] pb-[63px] z-50 pointer-events-auto">
            {renderCtaButtons()}
          </div>
        )}
      </div>

      {/* DESKTOP (>=600px) */}
      <TabletScaleCanvas className="relative mx-auto hidden w-[1440px] shrink-0 flex-col items-center min-[600px]:flex">
        {/* Glow strips */}
        <img
          alt=""
          src="/model-zoo/af-bg-1.webp"
          aria-hidden
          className="pointer-events-none absolute top-[519px] left-0 h-[552px] w-[1440px] object-cover"
          loading="lazy"
          decoding="async"
        />
        {!hideArticleCard && (
          <img
            alt=""
            src="/model-zoo/af-bg-2.webp"
            aria-hidden
            className="pointer-events-none absolute top-[1071px] left-0 h-[553px] w-[1440px] object-cover"
            loading="lazy"
            decoding="async"
          />
        )}
        <div className={`relative mx-auto w-[1192.5px] shrink-0 px-0 ${storeButtonsUnderSteps ? "pb-[64px]" : ""}`}>
          {/* Header */}
          <div className="flex w-full flex-col items-center gap-[24px] pt-[49px]" data-node-id="5131:10258">
            <div className="relative px-[10px]" data-node-id="5131:10260" data-name="Title">
              <h2
                className={`${gilroyMedium.className} w-full max-w-[605px] bg-clip-text text-center text-[46px] leading-[49px] font-medium text-transparent not-italic`}
                style={{ backgroundImage: TITLE_GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text" }}
                data-node-id="5131:10261"
              >
                {heading}
              </h2>
              <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            </div>
            <p className={`${interRegular.className} w-full max-w-[679.389px] text-center text-[16px] leading-[24px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}>
              {subheading}
            </p>
          </div>

          {/* Showcase row */}
          <div
            ref={forgeRef}
            className={`mt-[48px] flex min-h-[578px] h-auto flex-row items-center gap-[24px] ${getFadeInClass(forgeVisible)}`}
            data-node-id="5241:5967"
          >
            <div className="flex h-[578px] w-[590.509px] shrink-0 items-stretch justify-center">
              <div
                className={`relative h-full w-full overflow-clip rounded-none transition-colors duration-300 ${forgeVisible ? "motion-safe:animate-hero-text-fade-in" : "opacity-0"}`}
                style={{ animationDelay: "80ms", animationFillMode: "both" }}
                data-node-id="5241:5677"
                data-name="Article"
                aria-hidden
              >
                <ForgeVideo />
              </div>
            </div>

            <div className="relative flex min-w-px flex-1 flex-col items-end justify-center gap-[25px] pr-[20px]" data-node-id="5241:5702">
              <div className={`flex w-[520px] flex-col items-center gap-[12px] ${forgeVisible ? "motion-safe:animate-hero-text-fade-in" : "opacity-0"}`} style={{ animationDelay: "140ms", animationFillMode: "both" }} data-node-id="5241:5728" data-name="eval kit">
                {FORGE_STEPS.map((step, i) => {
                  const key = STEP_KEYS[i];
                  const stepTitle = steps?.[i]?.title ?? step;
                  const stepDescription = steps?.[i]?.description ?? STEP_SUBTEXTS[key];
                  return (
                    <div
                      key={step}
                      className="relative block w-full h-auto shrink-0 border-[0.5px] border-solid border-[rgba(255,255,255,0.1)] backdrop-blur-[12px] bg-[rgba(0,0,0,0.2)] text-left"
                      data-node-id={`5241:57${52 - i * 6}`}
                    >
                      <div className="flex flex-col items-start gap-[12px] p-[24px]">
                        <div className="relative size-[32px] flex items-center justify-center opacity-80">
                          <img 
                            src={STEP_ICONS[key]} 
                            alt="" 
                            className={`max-w-[100%] max-h-[100%] object-contain ${key === 'pair' ? 'scale-125' : key === 'results' ? 'scale-150' : ''}`} 
                          />
                        </div>
                        <div className="flex flex-col gap-[6px]">
                          <h3 className={`${gilroyMedium.className} text-[20px] leading-[24px] text-white`}>
                            {stepTitle}
                          </h3>
                          <p className={`${interRegular.className} text-[15px] leading-[22px] text-[rgba(255,255,255,0.65)]`}>
                            {stepDescription}
                          </p>
                        </div>
                      </div>
                      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
                    </div>
                  );
                })}
                {storeButtonsUnderSteps && (
                  <div className="w-full pt-[4px] flex flex-col items-center justify-center gap-[16px]">
                    <StoreBadges className="justify-center" bothStoresComingSoon={bothStoresComingSoon} />
                    {renderCtaButtons()}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Wide article card */}
          {!hideArticleCard && (
            <div
              ref={articleRef}
              className={`relative mt-[41px] flex h-[391px] flex-row items-start justify-center gap-[20px] px-[20px] py-[32px] transition-colors duration-300 ${getFadeInClass(articleVisible)}`}
              data-node-id="5131:10513"
              data-name="Article"
            >
              <div className="relative h-[327px] min-w-px flex-1" data-node-id="5131:10537" data-name="Container">
                <img
                  alt="NuraSync phone app preview on an eval kit"
                  src={(data?.phone_mockup_image && mediaUrl(data.phone_mockup_image)) || fallbackImg.src}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes(fallbackImg.src)) {
                      target.src = fallbackImg.src;
                    }
                  }}
                  className="pointer-events-none size-full object-contain object-center"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="relative flex min-w-px flex-1 flex-col items-start self-stretch gap-[40px]" data-node-id="5131:10514" data-name="NewsSection">
                {hideProcessChip ? null : (
                  <div className="relative h-[26px] w-[220px] shrink-0 overflow-clip bg-[rgba(255,255,255,0.06)]" data-node-id="5131:10515" data-name="Menu">
                    <p className={`${dmMono.className} absolute top-[calc(50%-4.5px)] left-[calc(50%-0.26px)] -translate-x-1/2 text-[16px] leading-[24px] font-normal tracking-[-0.39px] whitespace-nowrap text-[#ecfae5] uppercase not-italic [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]`}>
                      super easy process
                    </p>
                    <div className="absolute top-1/2 left-[6.48px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
                    <div className="absolute top-1/2 right-[6.48px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
                    <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
                  </div>
                )}
                <p className={`${gilroyMedium.className} w-full text-[32px] leading-[38px] text-white not-italic [word-break:break-word]`} data-node-id="5131:10523">
                  {articleHeading || "Download the app and get it working with Sparsh module"}
                </p>
                <StoreBadges bothStoresComingSoon={bothStoresComingSoon} />
              </div>

              <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            </div>
          )}

          {/* Request CTA */}
          {!storeButtonsUnderSteps && (
            <div className="relative mt-[30px] flex flex-col items-center justify-center gap-[24px] pb-[63px] z-50 pointer-events-auto">
              {renderCtaButtons()}
            </div>
          )}
        </div>
      </TabletScaleCanvas>

      <UpcomingProductsModal
        isOpen={modalContext !== null}
        onClose={() => setModalContext(null)}
        formContext={modalContext ?? "evalkit"}
        config={formConfig}
      />
    </section>
  );
}
