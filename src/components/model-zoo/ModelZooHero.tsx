/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { CtaPrimary, CtaSecondary } from "./ModelZooCtas";
import {
  COLLAGE_LEFT_FADE,
  CORNER_LEFT,
  CORNER_RIGHT,
  HERO_IMAGE_OVERLAY,
  HERO_TITLE_GRADIENT,
} from "./model-zoo-data";

const HERO_DESKTOP_HEIGHT = 743;
const NEXT_SECTION_ID = "model-zoo-content";

/**
 * Figma 5387:7822 — Model Zoo hero section (1442×743 canvas, full-bleed).
 * Background image 5422:6884 (1440×729) + two decorative collage rows of
 * model-preview cards + vertical guide lines + scroll indicator.
 */
export function ModelZooHero() {
  return (
    <div
      className="relative mx-auto -mt-[78px] w-full overflow-x-clip bg-black"
      data-node-id="5387:7822"
      data-name="Hero Section"
    >
      {/* MOBILE (<1024px) — stacked, centered layout following the site's
          mobile hero conventions (393 canvas, 36/36 title, 14/21 sub) */}
      <div className="relative flex min-[1024px]:hidden flex-col items-center gap-[15px] px-[20px] pt-[178px] pb-[48px]">
        {/* background image + fade, full-bleed under the text */}
        <div className="pointer-events-none absolute inset-0 overflow-clip" aria-hidden>
          <img alt="" src="/model-zoo/hero-bg-1.webp" className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0" style={{ backgroundImage: HERO_IMAGE_OVERLAY }} />
        </div>
        <div className="animate-hero-text-fade-in relative w-full max-w-[352px]">
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h1
            className={`${gilroyMedium.className} m-0 w-full bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
            style={{
              backgroundImage: HERO_TITLE_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            See it run. In one click.
          </h1>
        </div>
        <p
          className={`animate-hero-text-fade-in relative z-10 ${interRegular.className} w-full max-w-[336px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-75 not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
        >
          The Ambient Model Zoo is a growing library of ready-to-run AI models — plug one into your dev or eval kit and watch it work in seconds. Open-source and Ambient-built, every model is tuned to run on GPX at microwatt power.
        </p>
        {/* Mobile Collage Rows */}
        <div className="relative z-10 mt-[12px] flex w-[100vw] flex-col gap-[16px] overflow-hidden ml-[-20px] mr-[-20px]">
          <CollageRow
            cards={COLLAGE_ROW_1}
            nodeId="mobile-r1"
            direction="left"
            duration={32}
            className="relative w-full"
          />
          <CollageRow
            cards={COLLAGE_ROW_2}
            nodeId="mobile-r2"
            direction="right"
            duration={26}
            className="relative w-full"
          />
        </div>
        
        <div className="animate-hero-text-fade-in relative z-10 mt-[12px] flex w-full max-w-[352px] flex-col items-stretch gap-[12px]" style={{ animationDelay: "150ms", animationFillMode: "both" }}>
          <CtaPrimary label="Browse the Model Zoo" />
          <CtaSecondary label="Get the ApplicationForge App" />
        </div>
      </div>

      {/* DESKTOP (>=1024px) */}
      <div
        className="relative mx-auto hidden w-full overflow-x-clip min-[1024px]:block"
        style={{ height: HERO_DESKTOP_HEIGHT }}
      >
      <div className="relative mx-auto h-full w-[1442px]">
        {/* Background image stack — 5422:6884 */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[729px] w-[1440px] -translate-x-1/2"
          data-node-id="5422:6884"
          aria-hidden
        >
          <img
            alt=""
            src="/model-zoo/hero-bg-1.webp"
            className="absolute inset-0 size-full max-w-none object-cover"
          />
          <div className="absolute inset-0 overflow-hidden">
            <img
              alt=""
              src="/model-zoo/hero-bg-2.webp"
              className="absolute top-[-0.02%] left-0 h-[138.46%] w-full max-w-none"
            />
          </div>
          <div
            className="absolute inset-0"
            style={{ backgroundImage: HERO_IMAGE_OVERLAY }}
          />
        </div>

        {/* Left vertical guide line — 5387:7826 (95, 48 / h-821) */}
        <div className="pointer-events-none absolute top-[48px] left-[95px] flex h-[821px] w-0 items-center justify-center">
          <div className="flex-none rotate-90">
            <div className="relative h-0 w-[821px]" data-node-id="5387:7826" data-name="Line 82">
              <div className="absolute inset-[-1px_0_0_0]">
                <img src="/hero/line-82.svg" alt="" className="block size-full max-w-none" aria-hidden />
              </div>
            </div>
          </div>
        </div>
        {/* Left line cap — 5387:7827 (93, 46 / 5×4) */}
        <div className="pointer-events-none absolute top-[46px] left-[93px] h-[4px] w-[5px]" data-node-id="5387:7827">
          <img src="/hero/line-cap-left.svg" alt="" className="absolute inset-0 block size-full max-w-none" aria-hidden />
        </div>

        {/* Right vertical guide line — 5387:7828 (1347, 48 / h-597) */}
        <div className="pointer-events-none absolute top-[48px] right-[95px] flex h-[597px] w-0 items-center justify-center">
          <div className="flex-none rotate-90">
            <div className="relative h-0 w-[597px]" data-node-id="5387:7828" data-name="Line 83">
              <div className="absolute inset-[-0.5px_0]">
                <img src="/hero/line-83.svg" alt="" className="block size-full max-w-none" aria-hidden />
              </div>
            </div>
          </div>
        </div>
        {/* Right line cap — 5387:7829 (1344.5, 46.63 / 5×4) */}
        <div className="pointer-events-none absolute top-[46.63px] left-[1344.5px] h-[4px] w-[5px]" data-node-id="5387:7829">
          <img src="/hero/line-cap-right.svg" alt="" className="absolute inset-0 block size-full max-w-none" aria-hidden />
        </div>

        {/* Content — 5387:7833 (100, 336.87 / 585×318) */}
        <div
          className="absolute z-10 flex flex-col items-start gap-[20px]"
          style={{ left: 100, top: 336.87, width: 585 }}
          data-node-id="5387:7833"
          data-name="Content"
        >
          {/* Title — 5387:7834 (382×118, corners frame 291×116) */}
          <div className="relative h-[118px] w-[382px] shrink-0" data-node-id="5387:7834" data-name="Title">
            <div
              className="absolute top-[0.81px] left-[0.93px] h-[116px] w-[291.07px]"
              data-node-id="5387:7835"
              data-name="Frame"
            >
              <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            </div>
            <h1
              className={`${gilroyMedium.className} absolute top-[10px] left-[20.16px] m-0 bg-clip-text text-[46px] leading-[49px] font-medium text-transparent not-italic whitespace-nowrap`}
              style={{
                backgroundImage: HERO_TITLE_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
              data-node-id="5387:7840"
            >
              See it run.
              <br />
              In one click.
            </h1>
          </div>

          {/* Sub — 5387:7841 (pl-22, gap 24) */}
          <div
            className="relative flex flex-col items-start gap-[24px] pl-[22px]"
            data-node-id="5387:7841"
            data-name="Sub"
          >
            <p
              className={`${interRegular.className} animate-hero-text-fade-in w-[554px] text-[18px] leading-[27px] font-normal text-[#f0f0f0] not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
              style={{ animationDelay: "150ms", animationFillMode: "both" }}
              data-node-id="5387:7842"
            >
              The Ambient Model Zoo is a growing library of ready-to-run AI
              models - plug one into your dev or eval kit and watch it work in
              seconds. Open-source and Ambient-built, every model is tuned to
              run on GPX at microwatt power.
            </p>
            <div className="animate-hero-text-fade-in flex items-start gap-[24px]" style={{ animationDelay: "300ms", animationFillMode: "both" }} data-node-id="5387:7843" data-name="Frame 1984079464">
              <CtaPrimary label="Browse the Model Zoo" href="#model-zoo-content" width={250} />
              <CtaSecondary label="Get the ApplicationForge App" width={289} />
            </div>
          </div>
        </div>

        {/* Collage row 1 — 5422:7001 (434.5, 184 / 912×182, clipped) */}
        <CollageRow
          left={434.5}
          top={184}
          width={912}
          cards={COLLAGE_ROW_1}
          nodeId="5422:7001"
          direction="left"
          duration={32}
        />
        {/* Collage row 2 — 5422:7059 (713, 396 / 634×182, clipped) */}
        <CollageRow
          left={713}
          top={396}
          width={634}
          cards={COLLAGE_ROW_2}
          nodeId="5422:7059"
          direction="right"
          duration={26}
        />

        {/* mouse 1 — 5448:6903 (1015, 343 / 80×80), paints above the rows */}
        <div className="pointer-events-none absolute top-[343px] left-[1015px] size-[80px]" data-node-id="5448:6903" data-name="mouse 1">
          <img alt="" src="/model-zoo/hero-mouse.webp" className="absolute inset-0 size-full max-w-none object-cover" />
        </div>

        <ModelZooScrollIndicator />
      </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Collage rows — decorative preview cards clipped to their row frame.  */
/* Card illustrations are direct @2x exports of the Figma image frames  */
/* (crops + decorative accents baked in) — public/model-zoo/collage-*.  */
/* ------------------------------------------------------------------ */

/** Figma 5422:7002–7048 — row 1 cards. */
const COLLAGE_ROW_1 = [
  { label: "Anomaly Detection", img: "/model-zoo/collage-r1-c1.webp" },
  { label: "Keyword Spotting", img: "/model-zoo/collage-r1-c2.webp" },
  { label: "Human Activity Recognition", img: "/model-zoo/collage-r1-c3.webp" },
  { label: "Fall Detection", img: "/model-zoo/collage-r1-c4.webp" },
  { label: "IMU Gesture Recognition", img: "/model-zoo/collage-r1-c5.webp" },
];

/** Figma 5422:7060–7106 — row 2 cards. */
const COLLAGE_ROW_2 = [
  { label: "Person / No-Person", img: "/model-zoo/collage-r2-c1.webp" },
  { label: "Presence Detection", img: "/model-zoo/collage-r2-c2.webp" },
  { label: "Voice Activity Detection", img: "/model-zoo/collage-r2-c3.webp" },
];

function CollageRow({
  left,
  top,
  width,
  cards,
  nodeId,
  direction = "left",
  duration = 30,
  className,
}: {
  left?: number;
  top?: number;
  width?: number;
  cards: { label: string; img: string }[];
  nodeId: string;
  direction?: "left" | "right";
  duration?: number;
  className?: string;
}) {
  // marquee track: the card set duplicated so the -50% loop is seamless
  const track = [...cards, ...cards];
  return (
    <div
      className={className || "pointer-events-none absolute overflow-clip"}
      style={{ left, top, width, height: 182 }}
      data-node-id={nodeId}
      aria-hidden
    >
      <div
        className={`flex w-max items-center gap-[10px] ${direction === "left" ? "animate-dvk-marquee-left" : "animate-dvk-marquee-right"}`}
        style={{ animationDuration: `${duration}s` }}
      >
      {track.map((card, i) => (
        <div
          key={i}
          className="relative flex w-[198px] shrink-0 flex-col items-center gap-[10px] overflow-clip border-[0.245px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.95)] px-[8px] pt-[8px] pb-[14px]"
          data-node-id={`${nodeId}:${i}`}
          data-name="Article"
        >
          <div className="relative h-[126px] w-[182px] shrink-0 overflow-clip">
            <img alt="" src={card.img} className="pointer-events-none absolute inset-0 size-full object-cover" />
          </div>
          <p
            className={`${gilroyMedium.className} w-full text-[13.688px] leading-[23.954px] text-white not-italic`}
          >
            {card.label}
          </p>
          <MiniCorners />
        </div>
      ))}
      </div>
      {/* Left fade — 5428:8403 / 5428:8405 (133×200, over the moving track) */}
      <div
        className="absolute top-1/2 left-0 h-[200px] w-[133px] -translate-y-1/2"
        style={{ backgroundImage: COLLAGE_LEFT_FADE }}
      />
    </div>
  );
}

/** 1.96px corner ticks on the collage mini cards — corner-tag svgs at half scale. */
function MiniCorners() {
  return (
    <>
      {(
        [
          ["top-0 left-0", "/hero/corner-tag-1.svg", "-scale-y-100"],
          ["top-0 right-0", "/hero/corner-tag-2.svg", "rotate-180"],
          ["bottom-0 right-0", "/hero/corner-tag-2.svg", "-scale-x-100"],
          ["bottom-0 left-0", "/hero/corner-tag-1.svg", ""],
        ] as const
      ).map(([pos, src, transform], i) => (
        <div key={i} className={`pointer-events-none absolute size-[1.96px] ${pos}`}>
          <div className={`flex-none ${transform}`}>
            <Image src={src} alt="" width={4} height={4} className="block size-full max-w-none" aria-hidden />
          </div>
        </div>
      ))}
    </>
  );
}

/** Figma 5387:7830 — mouse scroll indicator (1335.5, 665 / 18×75). */
function ModelZooScrollIndicator() {
  const handleScroll = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    document.getElementById(NEXT_SECTION_ID)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <button
      type="button"
      onClick={handleScroll}
      className={`${interRegular.className} absolute flex h-[75px] w-[18px] cursor-pointer flex-col content-stretch items-center gap-[10px] border-0 bg-transparent p-0 z-50`}
      style={{ top: 665, left: 1335.5 }}
      data-node-id="5387:7830"
      data-name="Frame 1000003871"
      aria-label="Scroll to next section"
    >
      <div className="relative size-[18px] shrink-0 overflow-clip" data-node-id="5387:7831" data-name="mouse-01">
        <div className="absolute inset-[8.33%_18.75%]" data-name="elements">
          <div className="absolute inset-[-5%_-6.67%]">
            <Image
              src="/hero/mouse-scroll.svg"
              alt=""
              width={18}
              height={18}
              className="block size-full max-w-none"
            />
          </div>
        </div>
      </div>
      <div
        className="relative flex h-[47px] min-w-full w-[min-content] shrink-0 items-center justify-center"
        style={{ containerType: "size" }}
      >
        <div className="h-[100cqw] flex-none rotate-90">
          <p className="relative h-full w-[47px] text-[12px] leading-[1.4] font-normal text-[#505f4b] [word-break:break-word] not-italic" data-node-id="5387:7832">
            SCROLL
          </p>
        </div>
      </div>
    </button>
  );
}
