import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";
import {
  CORNER_LEFT,
  CORNER_RIGHT,
  PRIMARY_CTA_INSET,
  PRIMARY_CTA_SHADOW,
} from "./dvk-data";
import { mediaUrl } from "@/lib/strapi";

type DemoCard = {
  nodeId: string;
  name: string;
  img: string;
  imgOverlay?: string;
  imgRight: number;
  imgTop: number;
  titleLine1: string;
  titleLine2: string;
  desc: string;
  descWidth: number;
  decor: React.ReactNode;
};

/** Figma 2761:2799 / 2809 / 2819 — three demo cards (400 wide, gap 28). */
export const DEMO_CARDS: DemoCard[] = [
  {
    nodeId: "2761:2799",
    name: "Voice Based",
    img: "/dvk/demo-voice.webp",
    imgRight: -48.04,
    imgTop: -39.38,
    titleLine1: "Voice-Based",
    titleLine2: "Keyword Spotting",
    desc: "Utilize the onboard I2S and analog microphones to instantly test offline wake-word detection and voice commands in physically noisy environments.",
    descWidth: 324,
    decor: (
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          left: 174.552734375,
          top: 55.565185546875,
          width: 28.8935546875,
          height: 23.9327392578125,
          background: "#f0f0f0",
          borderTopLeftRadius: 900,
          borderTopRightRadius: 900,
        }}
        data-node-id="3210:1582"
      />
    ),
  },
  {
    nodeId: "2761:2809",
    name: "Fall Detection",
    img: "/dvk/demo-fall.webp",
    imgRight: -56.37,
    imgTop: -52.38,
    titleLine1: "IMU-Based",
    titleLine2: "Fall Detection",
    desc: "Leverage the integrated 3-axis digital accelerometer to run continuous, microwatt-level motion analysis and instant fall detection natively on the device.",
    descWidth: 333.99,
    decor: (
      // eslint-disable-next-line @next/next/no-img-element
      <img loading="lazy" decoding="async"
        alt=""
        src="/dvk/decor-fall.svg"
        aria-hidden
        className="pointer-events-none absolute block size-full max-w-none"
        style={{
          right: 47.11,
          top: 54,
          width: 21.771484375,
          height: 22.4573974609375,
        }}
        data-node-id="3210:2358"
      />
    ),
  },
  {
    nodeId: "2761:2819",
    name: "Vision Based",
    img: "/dvk/demo-fall.webp",
    imgOverlay: "/dvk/demo-vision.webp",
    imgRight: -56.37,
    imgTop: -40.38,
    titleLine1: "Vision-Based",
    titleLine2: "Gesture Recognition",
    desc: "Route a camera feed through the dedicated connector to validate real-time spatial awareness and gesture recognition without relying on a cloud round-trip.",
    descWidth: 333.99,
    decor: (
      // eslint-disable-next-line @next/next/no-img-element
      <img loading="lazy" decoding="async"
        alt=""
        src="/dvk/decor-vision.svg"
        aria-hidden
        className="pointer-events-none absolute block size-full max-w-none"
        style={{
          right: 29.11,
          top: 97.00120544433594,
          width: 13.765396118164062,
          height: 13.765396118164062,
        }}
        data-node-id="3211:2760"
      />
    ),
  },
];

/**
 * Figma row 4022:2671 — three demo cards + the phone/CTA card (5212:6941),
 * laid out with gap-[28px]. Each card is 400 wide; the decorative header
 * image is clipped to the card.
 */
export function DvkDemosCards({ data }: { data?: any }) {
  const cards =
    data?.demo_cards &&
    Array.isArray(data.demo_cards) &&
    data.demo_cards.length > 0
      ? data.demo_cards.slice(0, 3).map((c: any, i: number) => {
          const fallback = DEMO_CARDS[i] || DEMO_CARDS[0];
          return {
            ...fallback,
            titleLine1: c?.title_line_1 || fallback.titleLine1,
            titleLine2: c?.title_line_2 || fallback.titleLine2,
            desc: c?.description || fallback.desc,
            img: mediaUrl(c?.image) || null,
          };
        })
      : DEMO_CARDS;
  return (
    <div className="flex w-full items-stretch gap-[16px] xl:gap-[28px]">
      {cards.map((card: DemoCard) => (
        <DemoCardItem key={card.nodeId} card={card} />
      ))}
      <DvkPhoneCard data={data?.phone_card} />
    </div>
  );
}

/**
 * Figma 5212:6941 — "Control it from your phone" card (4th in the demos row).
 * Tinted surface (rgba(15,14,14,0.75) panel over black) + two stacked CTAs:
 * green primary "Get the ApplicationForge App" (arrow icon 5212:6961) and
 * translucent secondary "Browse the Model Zoo".
 */
export const PHONE_CARD_FALLBACK = {
  title: "Flash demos from your phone.",
  description:
    "Pair the Cranium kit with the ApplicationForge app over Bluetooth, push any demo to the board, and watch results live — including the gesture-controlled game.",
  primary_cta_label: "Get the ApplicationForge App",
  primary_cta_href: "#",
  secondary_cta_label: "Browse the Model Zoo",
  secondary_cta_href: "/model-zoo",
};

function DvkPhoneCard({ data }: { data?: any }) {
  const card = {
    ...PHONE_CARD_FALLBACK,
    ...(data || {}),
  };
  return (
    <div
      className="relative flex w-full max-w-[400px] flex-1 flex-col items-center gap-[20px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-black px-[24px] xl:px-[32px] pt-[16px] pb-[24px]"
      data-node-id="5212:6941"
      data-name="Control it from your phone"
    >
      {/* Tinted inner panel — 5212:6942 (400×600, centered, clipped to card) */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[calc(50%+0.5px)] left-1/2 h-[600px] w-[400px] -translate-x-1/2 -translate-y-1/2 border-[0.5px] border-solid border-[rgba(255,255,255,0.1)] bg-[rgba(15,14,14,0.75)]"
        data-node-id="5212:6942"
      />

      <div className="relative flex h-[367px] w-full flex-col items-start justify-end gap-[20px]">
        <div className="flex w-full flex-col gap-[12px]">
          <h3
            className={`${gilroyMedium.className} m-0 w-full max-w-[334px] text-[24px] leading-[38px] font-medium text-white not-italic [word-break:break-word] xl:text-[32px]`}
            data-node-id="5212:6946"
          >
            {card.title}
          </h3>
          <p
            className={`${interRegular.className} m-0 w-full max-w-[334px] shrink-0 text-[14px] leading-[24px] font-normal text-[#99a1af] not-italic [word-break:break-word] xl:text-[16px] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
            data-node-id="5212:6947"
          >
            {card.description}
          </p>
        </div>

        <div className="flex w-full flex-col gap-[12px]">
          {/* Cta — 5212:6949 (48 tall, label + arrow 5212:6961, gap 11) */}
          <a
            href={card.primary_cta_href}
            className={`${PRIMARY_CTA_SHADOW} ${gilroyMedium.className} relative flex min-h-[48px] py-[8px] px-[16px] w-full shrink-0 items-center justify-center gap-[11px]`}
            data-node-id="5212:6949"
            data-name="Cta"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
            />
            <span className="relative text-[13px] sm:text-[14px] xl:text-[15px] leading-[1.3] font-medium text-white uppercase not-italic text-center">
              {card.primary_cta_label}
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async"
              alt=""
              src="/dvk/phone-cta-arrow.svg"
              aria-hidden
              className="relative block size-[18px] max-w-none shrink-0"
              data-node-id="5212:6961"
              data-name="Frame"
            />
            <span
              aria-hidden
              className={`pointer-events-none absolute inset-0 rounded-[inherit] ${PRIMARY_CTA_INSET}`}
            />
            <GreenCtaCorners disableDots />
          </a>

          {/* CTA - Secondary — 5212:6964 */}
          <a
            href={card.secondary_cta_href}
            className={`${gilroyMedium.className} relative flex h-[48px] w-full shrink-0 items-center justify-center overflow-clip bg-[rgba(226,241,202,0.12)] px-[20px] py-[10px]`}
            data-node-id="5212:6964"
            data-name="CTA - Primary"
          >
            <p className="relative text-[16px] leading-[28px] font-medium whitespace-nowrap text-white uppercase not-italic [word-break:break-word]">
              {card.secondary_cta_label}
            </p>
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          </a>
        </div>
      </div>

      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
    </div>
  );
}

function DemoCardItem({ card }: { card: DemoCard }) {
  return (
    <div
      className="relative flex w-full max-w-[400px] flex-1 flex-col items-center gap-[20px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-black px-[24px] xl:px-[32px] pt-[16px] pb-[24px]"
      data-node-id={card.nodeId}
      data-name={card.name}
    >
      {/* Decorative header image (clipped to card bounds) */}
      <div
        className="pointer-events-none absolute overflow-hidden"
        style={{
          right: card.imgRight,
          top: card.imgTop,
          width: 290,
          height: 268,
        }}
      >
        {card.img && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img loading="lazy" decoding="async"
            alt=""
            src={card.img}
            className="absolute inset-0 size-full max-w-none object-cover"
          />
        )}
        {card.imgOverlay && (
          // eslint-disable-next-line @next/next/no-img-element
          <img loading="lazy" decoding="async"
            alt=""
            src={card.imgOverlay}
            className="absolute inset-0 size-full max-w-none object-cover"
          />
        )}
      </div>

      {/* NewsSection — relative so it paints above the absolute image */}
      <div className="relative flex h-[367px] w-full flex-col items-start justify-end">
        <div className="flex flex-col gap-[12px]">
          <div
            className={`${gilroyMedium.className} w-full shrink-0 text-[24px] xl:text-[32px] leading-[1.2] text-white not-italic whitespace-pre-wrap`}
          >
            <p className="mb-0 leading-[38px] [word-break:break-word]">{`${card.titleLine1} `}</p>
            <p className="leading-[38px] [word-break:break-word]">{card.titleLine2}</p>
          </div>
          <p
            className={`${interRegular.className} w-full max-w-[334px] shrink-0 text-[14px] xl:text-[16px] leading-[24px] font-normal text-[#99a1af] not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
          >
            {card.desc}
          </p>
        </div>
      </div>

      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
      {card.decor}
    </div>
  );
}
