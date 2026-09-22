"use client";

/* eslint-disable @next/next/no-img-element */
import { mediaUrl } from "@/lib/strapi";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { useFitText } from "../shared/FitText";

const TITLE_GRADIENT =
  "linear-gradient(147.032deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

const FALLBACK_SUBTITLE =
  "We eliminate the Von Neumann bottleneck by computing AI within the analog memory array. The GPX architecture allows continuous inference without waking the host processor.";
const FALLBACK_HEADING = "Continuous AI-native operations in subconscious mode";
const FALLBACK_CARD_TITLE = "The Hardware Blueprint";
const FALLBACK_CARD_IMAGE = "/applications/wearables/hardware-blueprint.webp";
const FALLBACK_OVERLAY_TEXT = "Zzzz..";

const CARD_BORDER =
  "border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] overflow-clip";

const RIGHT_CARDS = [
  {
    title: "The Sleeping Host",
    body: "The host processor remains in deep sleep while the Ambient AI engine handles continuous real-time processing. No wake events. No interrupts. No battery drain.",
  },
  {
    title: "Continuous Sensing",
    body: "ECG, motion sensors, and audio streams flow directly into the analog compute array. Raw data is processed at the source — no buffering, no transmission overhead.",
  },
  {
    title: "Microwatt AI",
    body: "Live AI processing indicators, telemetry, and µW power consumption prove what was thought impossible: hospital-grade intelligence running on coin-cell power.",
  },
];

function InfoCard({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div
      className={`relative flex w-full flex-col items-center gap-[20px] bg-[rgba(0,0,0,0.2)] pt-[16px] pb-[24px] px-[16px] ${CARD_BORDER}`}
      data-name="Article"
    >
      <div className="flex w-full flex-col items-start" data-name="NewsSection">
        <div className="flex w-full flex-col gap-[10px] items-start not-italic">
          <p
            className={`${gilroyMedium.className} w-full shrink-0 text-[22px] leading-[28px] text-white [word-break:break-word]`}
          >
            {title}
          </p>
          <p
            className={`${interRegular.className} w-full shrink-0 text-[16px] leading-[24px] text-[rgba(240,240,240,0.6)] [word-break:break-word]`}
          >
            {body}
          </p>
        </div>
      </div>
      <Corners
        leftSrc="/applications/wearables/vector-42.svg"
        rightSrc="/applications/wearables/vector-43.svg"
      />
    </div>
  );
}

export function WearablesSubconscious({ data }: { data?: any }) {
  const fitRef = useFitText<HTMLHeadingElement>({ maxLines: 1 });
  const fitRef2 = useFitText<HTMLHeadingElement>({ maxLines: 2 });

  const subtitle = data?.subtitle || FALLBACK_SUBTITLE;
  const heading = data?.heading || FALLBACK_HEADING;
  const cardTitle = data?.card_title || FALLBACK_CARD_TITLE;
  const cardImage = mediaUrl(data?.card_image) || FALLBACK_CARD_IMAGE;
  const overlayText = data?.overlay_text || FALLBACK_OVERLAY_TEXT;
  const dataCards: any[] = Array.isArray(data?.right_cards) ? data.right_cards : [];
  const rightCards = RIGHT_CARDS.map((fb, i) => {
    const c = dataCards[i];
    if (!c) return fb;
    return {
      title: c.title || fb.title,
      body: c.description || fb.body,
    };
  });
  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-black"
      data-node-id="2522:1677"
      data-name="Continuous AI-native operations"
      aria-label="Continuous AI-native operations in subconscious mode"
    >
      {/* DESKTOP (>=1024px) */}
      <div className="relative hidden w-full max-w-[1440px] flex-col items-center gap-[48px] pt-[80px] pb-[40px] px-[24px] min-[1024px]:flex">
        {/* Title */}
        <div className="flex flex-col items-center gap-[24px]">
          <div className="relative flex flex-col items-center px-[10px]">
            <h2
              ref={fitRef}
              className={`${gilroyMedium.className} bg-clip-text text-center text-[46px] leading-[49px] font-medium text-transparent whitespace-nowrap not-italic [word-break:break-word]`}
              style={{
                backgroundImage: TITLE_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              {heading}
            </h2>
            <Corners
              leftSrc="/applications/wearables/vector-42.svg"
              rightSrc="/applications/wearables/vector-43.svg"
            />
          </div>
          <p
            className={`${interRegular.className} w-[650px] text-center text-[14px] leading-[21px] text-[#f0f0f0] not-italic [word-break:break-word]`}
          >
            {subtitle}
          </p>
        </div>

        {/* Content: left image card + right text cards */}
        <div className="flex items-stretch justify-center gap-[24px]">
          {/* Left: Hardware Blueprint image card */}
          <div
            className={`relative flex w-[567.58px] shrink-0 flex-col items-center gap-[20px] bg-[rgba(0,0,0,0.5)] pt-[10px] pb-[20px] px-[16px] ${CARD_BORDER}`}
            data-name="Article"
          >
            {/* Image */}
            <div className="relative h-[428.617px] w-[535.58px] shrink-0" data-name="image">
              <img loading="lazy" decoding="async"
                alt=""
                src={cardImage}
                className="pointer-events-none absolute inset-0 size-full max-w-none object-contain"
                aria-hidden
              />
            </div>
            {/* "Zzzz.." overlay on image */}
            <p
              className={`${interRegular.className} absolute left-[143.79px] top-[161.5px] -translate-x-1/2 whitespace-nowrap text-center text-[14px] leading-[20px] tracking-[-0.1504px] text-white not-italic`}
            >
              {overlayText}
            </p>
            {/* Title */}
            <p
              className={`${gilroyMedium.className} min-w-full w-[min-content] shrink-0 text-[22px] leading-[28px] text-white not-italic`}
            >
              {cardTitle}
            </p>
            <Corners
              leftSrc="/applications/wearables/vector-42.svg"
              rightSrc="/applications/wearables/vector-43.svg"
            />
          </div>

          {/* Right: 3 stacked text cards */}
          <div className="flex w-[578px] shrink-0 flex-col justify-between self-stretch">
            {rightCards.map((card) => (
              <InfoCard key={card.title} title={card.title} body={card.body} />
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE (<1024px) */}
      <div className="relative flex w-full flex-col items-center gap-[24px] px-[24px] pt-[72px] pb-[72px] min-[1024px]:hidden">
        {/* Title */}
        <div className="flex flex-col items-center gap-[20px]">
          <div className="relative flex flex-col items-center px-[10px]">
            <h2
              ref={fitRef2}
              className={`${gilroyMedium.className} bg-clip-text text-center text-[28px] leading-[32px] font-medium text-transparent not-italic [word-break:break-word]`}
              style={{
                backgroundImage: TITLE_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              {heading}
            </h2>
            <Corners
              leftSrc="/applications/wearables/vector-42.svg"
              rightSrc="/applications/wearables/vector-43.svg"
            />
          </div>
          <p
            className={`${interRegular.className} max-w-[327px] text-center text-[13px] leading-[20px] text-[#f0f0f0] not-italic`}
          >
            {subtitle}
          </p>
        </div>

        {/* Image card */}
        <div
          className={`relative flex w-full flex-col items-center gap-[16px] bg-[rgba(0,0,0,0.5)] pt-[10px] pb-[20px] px-[12px] ${CARD_BORDER}`}
        >
          <div className="relative h-[240px] w-full shrink-0 overflow-hidden">
            <img loading="lazy" decoding="async"
              alt=""
              src={cardImage}
              className="pointer-events-none absolute inset-0 size-full object-contain"
              aria-hidden
            />
          </div>
          <p
            className={`${gilroyMedium.className} w-full shrink-0 text-[20px] leading-[26px] text-white not-italic`}
          >
            {cardTitle}
          </p>
          <Corners
            leftSrc="/applications/wearables/vector-42.svg"
            rightSrc="/applications/wearables/vector-43.svg"
          />
        </div>

        {/* Text cards */}
        <div className="flex w-full flex-col gap-[16px]">
          {rightCards.map((card) => (
            <InfoCard key={card.title} title={card.title} body={card.body} />
          ))}
        </div>
      </div>
    </section>
  );
}
