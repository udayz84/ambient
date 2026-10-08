/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { gilroyMedium, interRegular, dmMono } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";
import { mediaUrl } from "@/lib/strapi";

const TITLE_GRADIENT =
  "linear-gradient(123.792deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

const EYEBROW = "READY TO RUN";
const HEADING = "Every application here runs on real, ready models.";
const SUBTITLE =
  "Browse a growing library of open-source and Ambient-built models — tuned for GPX, deployable in one click. Don't build from scratch; start from something that works.";

const PRIMARY_CTA = { label: "Explore the Model Zoo", href: "/model-zoo" };
const SECONDARY_CTA = { label: "See it live in ApplicationForge", href: "/application-forge" };

/** Left fade over the collage rows. */
const COLLAGE_LEFT_FADE =
  "linear-gradient(262.733deg, rgba(0, 0, 0, 0) 15.711%, rgb(0, 0, 0) 72.391%)";

/** Row 1 cards — duplicated from ModelZooHero. */
const COLLAGE_ROW_1 = [
  { label: "Anomaly Detection", img: "/model-zoo/collage-r1-c1.webp" },
  { label: "Keyword Spotting", img: "/model-zoo/collage-r1-c2.webp" },
  { label: "Human Activity Recognition", img: "/model-zoo/collage-r1-c3.webp" },
  { label: "Fall Detection", img: "/model-zoo/collage-r1-c4.webp" },
  { label: "IMU Gesture Recognition", img: "/model-zoo/collage-r1-c5.webp" },
];

/** Row 2 cards — duplicated from ModelZooHero. */
const COLLAGE_ROW_2 = [
  { label: "Person / No-Person", img: "/model-zoo/collage-r2-c1.webp" },
  { label: "Presence Detection", img: "/model-zoo/collage-r2-c2.webp" },
  { label: "Voice Activity Detection", img: "/model-zoo/collage-r2-c3.webp" },
];

function PrimaryCta({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="relative flex h-[48px] w-full min-[1024px]:w-auto shrink-0 items-center justify-center gap-[10px] px-[24px] py-[10px] drop-shadow-[0px_42px_53.5px_rgba(69,196,24,0.2)]"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
      />
      <span className="relative flex items-center gap-[10px]">
        <p
          className={`${gilroyMedium.className} text-[14px] min-[1024px]:text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic`}
        >
          {label}
        </p>
      </span>
      <GreenCtaCorners />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
      />
    </a>
  );
}

function SecondaryCta({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="relative flex h-[48px] w-full min-[1024px]:w-auto shrink-0 items-center justify-center bg-[rgba(226,241,202,0.12)] px-[24px] py-[10px]"
    >
      <p
        className={`${gilroyMedium.className} text-[14px] min-[1024px]:text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic`}
      >
        {label}
      </p>
      <GreenCtaCorners />
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Collage rows — duplicated from ModelZooHero                         */
/* ------------------------------------------------------------------ */

function CollageRow({
  cards,
  nodeId,
  direction = "left",
  duration = 30,
}: {
  cards: { label: string; img: string }[];
  nodeId: string;
  direction?: "left" | "right";
  duration?: number;
}) {
  // Quadruple the cards so the -50% translateX loop is seamless at any viewport width
  const track = [...cards, ...cards, ...cards, ...cards];
  return (
    <div
      className="relative w-full overflow-clip"
      style={{ height: 182 }}
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
      {/* Left fade */}
      <div
        className="absolute top-1/2 left-0 h-[200px] w-[133px] -translate-y-1/2"
        style={{ backgroundImage: COLLAGE_LEFT_FADE }}
      />
      {/* Right fade */}
      <div
        className="absolute top-1/2 right-0 h-[200px] w-[133px] -translate-y-1/2"
        style={{ backgroundImage: "linear-gradient(97.267deg, rgba(0, 0, 0, 0) 15.711%, rgb(0, 0, 0) 72.391%)" }}
      />
    </div>
  );
}

/** 1.96px corner ticks on the collage mini cards. */
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

export function ApplicationsPageModelZoo({ data }: { data?: any }) {
  return (
    <section className="relative flex w-full flex-col items-center overflow-hidden bg-black pt-[100px] pb-[80px]">
      
      {/* Header Info */}
      <div className="flex w-full max-w-[1024px] flex-col items-center gap-[24px] px-[24px] z-10 text-center">
        
        <div
          className="relative overflow-clip bg-[rgba(255,255,255,0.06)] px-[24px] flex items-center justify-center inline-flex"
          style={{ height: 26 }}
        >
          <Corners leftSrc="/developer/pipeline-corner-42.svg" rightSrc="/developer/pipeline-corner-43.svg" />
          <p
            className={`${dmMono.className} relative text-[16px] leading-[24px] uppercase tracking-[-0.39px] whitespace-nowrap text-[#ecfae5] not-italic`}
          >
            {EYEBROW}
          </p>
          <div className="absolute left-[6.48px] top-1/2 h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
          <div className="absolute right-[6.48px] top-1/2 h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
        </div>

        <div className="relative inline-block px-[14px]">
          <h2
            className={`${gilroyMedium.className} bg-clip-text text-center text-[36px] min-[1024px]:text-[46px] leading-[1.2] font-medium text-transparent not-italic`}
            style={{ backgroundImage: TITLE_GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text" }}
          >
            {HEADING}
          </h2>
          <Corners />
        </div>

        <p className={`${interRegular.className} max-w-[800px] text-[16px] min-[1024px]:text-[16px] leading-[24px] min-[1024px]:leading-[24px] font-normal text-[#f0f0f0] opacity-65 not-italic`}>
          {SUBTITLE}
        </p>

        {/* CTA Row */}
        <div className="mt-[16px] flex w-full min-[1024px]:w-auto flex-col min-[1024px]:flex-row items-center justify-center gap-[16px]">
          <PrimaryCta label={PRIMARY_CTA.label} href={PRIMARY_CTA.href} />
          <SecondaryCta label={SECONDARY_CTA.label} href={SECONDARY_CTA.href} />
        </div>
      </div>

      {/* Two-row collage carousel — identical to Model Zoo hero */}
      <div className="relative z-10 mt-[60px] flex w-full flex-col gap-[16px] overflow-hidden">
        <CollageRow
          cards={COLLAGE_ROW_1}
          nodeId="app-mz-r1"
          direction="left"
          duration={32}
        />
        <CollageRow
          cards={COLLAGE_ROW_2}
          nodeId="app-mz-r2"
          direction="right"
          duration={26}
        />
      </div>
    </section>
  );
}
