"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { mediaUrl } from "@/lib/strapi";
import { ProductBriefModal } from "../products-page/ProductBriefModal";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { TagBadge } from "../hero/TagBadge";
import { GradientTitle } from "../contact/contact-shared";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";
import { Corners } from "../shared/Corners";
import { TabletScaleCanvas } from "../shared/TabletScaleCanvas";

const TITLE_GRADIENT_DEG = "109.122deg";

const FALLBACK_TAG = "Architecture · A-Cube";
const FALLBACK_TITLE = "Meet A-Cube. AI-native, from the metal up.";
const FALLBACK_DESCRIPTION =
  "A new architecture for AI, energy-aware at every layer, scaling from coin cell to cloud.";
const FALLBACK_PRIMARY_LABEL = "Read the Whitepaper";
const FALLBACK_SECONDARY_LABEL = "Watch the 3-min Explainer";

const EXPLAINER_VIDEO_ID = "7lBZ3cqqvE8";

function getYouTubeId(urlOrId?: string): string {
  if (!urlOrId || urlOrId === "#") return EXPLAINER_VIDEO_ID;
  const match = urlOrId.match(
    /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/
  );
  return match ? match[1] : (urlOrId.length === 11 ? urlOrId : EXPLAINER_VIDEO_ID);
}

/** YouTube explainer popup — same overlay pattern as model-zoo page. */
function VideoModal({
  title,
  videoId = EXPLAINER_VIDEO_ID,
  onClose,
}: {
  title: string;
  videoId?: string;
  onClose: () => void;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    // Lock <html> as well: iOS Safari ignores body-level overflow:hidden for touch panning.
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [onClose]);

  useEffect(() => {
    // Safari doesn't propagate the modal-opening click into the cross-origin
    // YouTube iframe, so autoplay=1 alone leaves the player paused with a
    // play button. Command the player (muted, so autoplay policy allows it)
    // until it starts. Viewer unmutes via the player controls.
    let tries = 0;
    const timer = setInterval(() => {
      const win = iframeRef.current?.contentWindow;
      if (win) {
        win.postMessage(
          JSON.stringify({ event: "command", func: "playVideo", args: [] }),
          "*"
        );
      }
      if (++tries > 10) clearInterval(timer);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  const origin = typeof window !== "undefined" ? window.location.origin : "";

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex animate-popup-backdrop-in items-center justify-center overflow-y-auto bg-black/80 p-[12px] sm:p-[16px]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} video`}
    >
      <div
        className="relative my-auto flex max-h-full w-full max-w-[960px] flex-col gap-[12px] sm:gap-[16px] border-[0.5px] border-solid border-[rgba(240,240,240,0.25)] bg-[#141414] p-[12px] sm:p-[16px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start sm:items-center justify-between gap-[12px] sm:gap-[16px]">
          <h3 className={`${gilroyMedium.className} m-0 text-[15px] sm:text-[20px] md:text-[22px] leading-[20px] sm:leading-[26px] md:leading-[28px] text-white not-italic`}>
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className={`${interRegular.className} relative flex h-[32px] sm:h-[36px] shrink-0 items-center border-[0.5px] border-solid border-[rgba(240,240,240,0.25)] bg-[rgba(226,241,202,0.12)] px-[12px] sm:px-[16px] text-[12px] sm:text-[13px] uppercase text-white hover:bg-[rgba(226,241,202,0.2)]`}
          >
            Close
          </button>
        </div>
        <div className="relative aspect-video w-full overflow-clip">
          <iframe
            ref={iframeRef}
            className="absolute inset-0 size-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId || EXPLAINER_VIDEO_ID}?autoplay=1&mute=1&playsinline=1&enablejsapi=1&origin=${encodeURIComponent(origin)}&rel=0`}
            title={`${title} video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <Corners leftSrc="/hero/corner-tag-1.svg" rightSrc="/hero/corner-tag-2.svg" />
      </div>
    </div>,
    document.body
  );
}

const GREEN_CTA_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

function ReadWhitepaperCta({
  fullWidth = false,
  label,
  href = "#",
  onClick,
}: {
  fullWidth?: boolean;
  label: string;
  href?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`${gilroyMedium.className} ${GREEN_CTA_SHADOW} relative block h-[48px] ${fullWidth ? "w-full" : "w-[223px]"} shrink-0`}
      data-node-id="2931:1448"
      data-name="Cta"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
      />
      <span className="absolute top-[calc(50%-14px)] left-1/2 flex max-w-full -translate-x-1/2 items-center overflow-hidden text-ellipsis text-[16px] leading-[28px] font-medium whitespace-nowrap text-white uppercase not-italic">
        {label}
      </span>
      <GreenCtaCorners />
    </a>
  );
}

function WatchExplainerCta({
  fullWidth = false,
  label,
  href = "#",
  onClick,
}: {
  fullWidth?: boolean;
  label: string;
  href?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`${gilroyMedium.className} relative block h-[48px] ${fullWidth ? "w-full" : "w-[263px]"} shrink-0 cursor-pointer border border-white/20 bg-[rgba(226,241,202,0.12)] px-[20px] py-[10px]`}
      data-node-id="2931:1459"
      data-name="CTA - Secondary"
    >
      <span className="relative flex h-full max-w-full items-center justify-center overflow-hidden text-ellipsis text-center text-[12px] min-[310px]:text-[16px] leading-[28px] font-medium whitespace-nowrap text-white uppercase not-italic">
        {label}
      </span>
      <GreenCtaCorners />
    </a>
  );
}

export function TechnologyPageHero({
  data,
  config,
}: {
  data?: any;
  config?: any;
} = {}) {
  const [isWhitepaperOpen, setIsWhitepaperOpen] = useState(false);
  const [isExplainerOpen, setIsExplainerOpen] = useState(false);
  const tagText = data?.tag?.text || FALLBACK_TAG;
  const titleText = data?.title || FALLBACK_TITLE;
  const descText = data?.subtitle || FALLBACK_DESCRIPTION;
  const primaryLabel = data?.primary_button?.label || FALLBACK_PRIMARY_LABEL;
  const primaryHref = data?.primary_button?.href || "#";
  const secondaryLabel =
    data?.secondary_button?.label || FALLBACK_SECONDARY_LABEL;
  const secondaryHref = data?.secondary_button?.href || "#";
  const bgSrc = mediaUrl(data?.background_image) || "/technology/hero-bg.webp";
  const objectSrc = mediaUrl(data?.hero_object);

  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-black"
      data-node-id="2921:2682"
      aria-label="Technology hero"
    >
      {/* Full-bleed desktop background */}
      <div className="pointer-events-none absolute inset-0 hidden min-[600px]:block" aria-hidden>
        {(bgSrc || objectSrc) && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={bgSrc || objectSrc || undefined}
            alt=""
            className="size-full object-cover opacity-80"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[43.649%] from-[rgba(0,0,0,0)] to-black" />
        
        {/* Fade left/right edges into the black background on ultrawide screens */}
        <div className="absolute inset-y-0 left-0 hidden w-[300px] bg-gradient-to-r from-black to-transparent min-[1441px]:block" />
        <div className="absolute inset-y-0 right-0 hidden w-[300px] bg-gradient-to-l from-black to-transparent min-[1441px]:block" />
      </div>

      {/* DESKTOP (>=600px) — pixel-perfect from Figma node 2921:2682 (hero region) */}
      <TabletScaleCanvas className="relative hidden h-[765px] w-[1440px] shrink-0 min-[600px]:block">
        {/* Foreground Content Wrapper */}
        <div className="relative mt-[78px] h-[687px] w-full">

        {/* 2931:1430 — eyebrow tag */}
        <div
          className="absolute top-[463.87px] left-[115.78px] h-[27px] w-[192px]"
          data-node-id="2931:1430"
          data-name="Menu Container"
        >
          <TagBadge
            label={tagText}
            width={192}
            labelOffsetX={0}
            rightBarLeft={182.15}
            centerLabel
            nodeId="2931:1431"
          />
        </div>

        {/* 2931:1428 — title */}
        <div
          className="absolute top-[518.46px] left-[115.78px] h-[98px] w-[525.32px]"
          data-node-id="2931:1428"
          data-name="Title"
        >
          <GradientTitle
            gradientDeg={TITLE_GRADIENT_DEG}
            nodeId="2931:1428"
            className="h-[98px] w-[525.32px]"
          >
            {titleText}
          </GradientTitle>
        </div>

        <div className="absolute top-[500.46px] right-[71.36px] flex w-[510px] flex-col items-end gap-[20px]">
          {/* 2931:1429 — description (right-aligned) */}
          <p
            className={`${interRegular.className} w-[486px] text-right text-[16px] leading-[24px] font-normal text-[#f0f0f0] opacity-80 not-italic [word-break:break-word]`}
            data-node-id="2931:1429"
            data-name="Description"
          >
            {descText}
          </p>
  
          {/* 2931:1447 — CTAs */}
          <div
            className="flex h-[48px] w-full items-start justify-end gap-[24px]"
            data-node-id="2931:1447"
            data-name="Frame 1984079464"
          >
            <ReadWhitepaperCta label={primaryLabel} href={primaryHref} onClick={() => setIsWhitepaperOpen(true)} />
            <WatchExplainerCta
              label={secondaryLabel}
              href={secondaryHref}
              onClick={() => setIsExplainerOpen(true)}
            />
          </div>
        </div>
        </div>
      </TabletScaleCanvas>

      {/* MOBILE (<600px) — pixel-perfect from Figma node 3572:6456 (Banner, 393x676) */}
      <div className="relative w-full overflow-hidden min-[600px]:hidden pt-[78px]">
        <div className="relative mx-auto h-[676px] w-full max-w-[393px]">
          {/* 3572:7530 — hero object image */}
          <div
            className="absolute top-[228px] left-[calc(50%-13px)] h-[328px] w-[607px] -translate-x-1/2"
            data-node-id="3572:7530"
            data-name="ChatGPT Image Jun 12, 2026, 03_31_59 PM 1"
          >
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={mediaUrl(data?.hero_object) || "/technology/hero-object-mobile.webp"}
                  alt=""
                  className="size-full object-cover"
                />
              </div>
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(0.213527deg, rgba(0, 0, 0, 0) 56.307%, rgb(0, 0, 0) 96.933%), linear-gradient(180deg, rgba(0, 0, 0, 0) 43.649%, rgb(0, 0, 0) 100%)",
                }}
              />
            </div>
          </div>

          {/* 3572:6458 — eyebrow tag */}
          <div
            className="absolute top-0 left-[calc(50%-0.5px)] -translate-x-1/2"
            data-node-id="3572:6458"
            data-name="Menu Container"
          >
            <TagBadge
              label={tagText}
              width={163}
              height={27}
              labelOffsetX={68.5}
              leftBarLeft={6.7}
              rightBarLeft={156.16}
              labelClassName="text-[12px] leading-[20.149px] tracking-[-0.36px]"
              nodeId="3572:6459"
            />
          </div>

          {/* 3572:6475 — title + description */}
          <div
            className="absolute top-[45px] left-[calc(50%+0.5px)] flex w-[308px] -translate-x-1/2 flex-col items-center gap-[15px] text-center"
            data-node-id="3572:6475"
            data-name="Frame 2147240742"
          >
            <div
              className={`${gilroyMedium.className} w-[273px] shrink-0 bg-clip-text text-[36px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
              style={{
                backgroundImage: `linear-gradient(99.285351deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
              data-node-id="3572:6476"
            >
              {titleText}
            </div>
            <p
              className={`${interRegular.className} min-w-full shrink-0 text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-80 not-italic [word-break:break-word]`}
              data-node-id="3572:6477"
            >
              {descText}
            </p>
          </div>

          {/* 3572:7535 — CTAs */}
          <div
            className="absolute top-[542px] left-1/2 flex w-[263px] -translate-x-1/2 flex-col gap-[24px]"
            data-node-id="3572:7535"
            data-name="Frame 2147240743"
          >
            <ReadWhitepaperCta
              fullWidth
              label={primaryLabel}
              href={primaryHref}
              onClick={() => setIsWhitepaperOpen(true)}
            />
            <WatchExplainerCta
              fullWidth
              label={secondaryLabel}
              href={secondaryHref}
              onClick={() => setIsExplainerOpen(true)}
            />
          </div>
        </div>
      </div>

      <ProductBriefModal
        isOpen={isWhitepaperOpen}
        onClose={() => setIsWhitepaperOpen(false)}
        title="Read the Whitepaper"
        config={config}
        pdfUrl="/whitepapers/Ambient-UniqueArchitecture-Whitepaper.pdf"
        pdfName="Ambient-UniqueArchitecture-Whitepaper.pdf"
      />
      {isExplainerOpen && (
        <VideoModal
          title={data?.explainer_video_title || "Why AI Uses So Much Power | A-Cube Architecture Explained"}
          videoId={getYouTubeId(secondaryHref)}
          onClose={() => setIsExplainerOpen(false)}
        />
      )}
    </section>
  );
}
