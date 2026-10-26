/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useState } from "react";
import { dmMono, gilroyMedium, interRegular } from "../hero/fonts";
import { getFadeInClass, useFadeIn } from "../shared/useFadeIn";
import { Corners } from "../shared/Corners";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";
import { CORNER_LEFT, CORNER_RIGHT, sectionTitleGradient } from "../model-zoo/model-zoo-data";
import { mediaUrl } from "@/lib/strapi";
import fallbackImg from "@/../public/model-zoo/phone-mockup-new.png";
import { UpcomingProductsModal } from "../hero/UpcomingProductsModal";

const TITLE_GRADIENT = sectionTitleGradient(111.766);

/** Decorative model cards for the two-row collage carousel */
const COLLAGE_ROW_1 = [
  { label: "Anomaly Detection", img: "/model-zoo/collage-r1-c1.webp" },
  { label: "Keyword Spotting", img: "/model-zoo/collage-r1-c2.webp" },
  { label: "Human Activity Recognition", img: "/model-zoo/collage-r1-c3.webp" },
  { label: "Fall Detection", img: "/model-zoo/collage-r1-c4.webp" },
  { label: "IMU Gesture Recognition", img: "/model-zoo/collage-r1-c5.webp" },
];

const COLLAGE_ROW_2 = [
  { label: "Person / No-Person", img: "/model-zoo/collage-r2-c1.webp" },
  { label: "Presence Detection", img: "/model-zoo/collage-r2-c2.webp" },
  { label: "Voice Activity Detection", img: "/model-zoo/collage-r2-c3.webp" },
];

/** 1.96px corner ticks on the collage mini cards */
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

/** Left fade over the collage rows */
const COLLAGE_LEFT_FADE =
  "linear-gradient(262.733deg, rgba(0, 0, 0, 0) 15.711%, rgb(0, 0, 0) 72.391%)";
const COLLAGE_RIGHT_FADE =
  "linear-gradient(97.267deg, rgba(0, 0, 0, 0) 15.711%, rgb(0, 0, 0) 72.391%)";

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
        className="pointer-events-none absolute top-1/2 left-0 h-[200px] w-[133px] -translate-y-1/2 z-20"
        style={{ backgroundImage: COLLAGE_LEFT_FADE }}
      />
      {/* Right fade */}
      <div
        className="pointer-events-none absolute top-1/2 right-0 h-[200px] w-[133px] -translate-y-1/2 z-20"
        style={{ backgroundImage: COLLAGE_RIGHT_FADE }}
      />
    </div>
  );
}

export function ProductsAppForge({ data }: { data?: any }) {
  const heading = data?.heading || "Your eval kit, controlled from your phone.";
  const subheading =
    data?.subheading ||
    "Download NuraSync, pair with your kit over Bluetooth, and flash live demos in seconds no laptop, no code.";
  const { fadeRef: articleRef } = useFadeIn<HTMLDivElement>();
  const { fadeRef: forgeRef, isVisible: forgeVisible } = useFadeIn<HTMLDivElement>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      data-node-id="5131:10421"
      aria-label="Your eval kit, controlled from your phone"
    >
      {/* Background glow strips */}
      <img
        alt=""
        src="/model-zoo/af-bg-1.webp"
        aria-hidden
        className="pointer-events-none absolute top-[519px] left-0 hidden h-[552px] w-full object-cover min-[1024px]:block"
        loading="lazy"
        decoding="async"
      />
      <img
        alt=""
        src="/model-zoo/af-bg-2.webp"
        aria-hidden
        className="pointer-events-none absolute top-[1071px] left-0 hidden h-[553px] w-full object-cover min-[1024px]:block"
        loading="lazy"
        decoding="async"
      />

      {/* Header Container */}
      <div className="relative mx-auto w-full max-w-[1192.5px] px-[16px] min-[1024px]:px-0">
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
      </div>

      {/* Cloned Model Zoo Carousel Strip — Whole Width Edge-to-Edge */}
      <div
        ref={forgeRef}
        className={`relative z-10 mt-[36px] min-[1024px]:mt-[48px] flex w-full flex-col gap-[16px] overflow-hidden ${getFadeInClass(forgeVisible)}`}
      >
        <CollageRow
          cards={COLLAGE_ROW_1}
          nodeId="products-af-r1"
          direction="left"
          duration={32}
        />
        <CollageRow
          cards={COLLAGE_ROW_2}
          nodeId="products-af-r2"
          direction="right"
          duration={26}
        />
      </div>

      {/* Bottom Container */}
      <div className="relative mx-auto w-full max-w-[1192.5px] px-[16px] min-[1024px]:px-0">
        {/* Wide article card — bottom (hidden in UI) */}
        <div
          ref={articleRef}
          className="hidden"
          data-node-id="5131:10513"
          data-name="Article"
        >
          {/* Phone showcase */}
          <div className="relative h-[327px] w-full min-w-px min-[1024px]:flex-1" data-node-id="5131:10537" data-name="Container">
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

          {/* NewsSection */}
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

        {/* Request CTA */}
        <div className="relative mt-[36px] min-[1024px]:mt-[48px] flex justify-center pb-[63px] z-50 pointer-events-auto">
          <a
            href={data?.cta?.href || "#"}
            onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}
            className="shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)] relative flex h-[48px] min-w-[293px] px-[24px] shrink-0 items-center justify-center cursor-pointer"
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

      <UpcomingProductsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formContext="evalkit"
      />
    </section>
  );
}
