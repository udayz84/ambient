import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { CORNER_LEFT, CORNER_RIGHT } from "./dvk-data";
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
    img: "/dvk/demo-voice.png",
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
    img: "/dvk/demo-fall.png",
    imgRight: -56.37,
    imgTop: -52.38,
    titleLine1: "IMU-Based",
    titleLine2: "Fall Detection",
    desc: "Leverage the integrated 3-axis digital accelerometer to run continuous, microwatt-level motion analysis and instant fall detection natively on the device.",
    descWidth: 333.99,
    decor: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        alt=""
        src="/dvk/decor-fall.svg"
        aria-hidden
        className="pointer-events-none absolute block size-full max-w-none"
        style={{
          left: 331.1142578125,
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
    img: "/dvk/demo-fall.png",
    imgOverlay: "/dvk/demo-vision.png",
    imgRight: -56.37,
    imgTop: -40.38,
    titleLine1: "Vision-Based",
    titleLine2: "Gesture Recognition",
    desc: "Route a camera feed through the dedicated connector to validate real-time spatial awareness and gesture recognition without relying on a cloud round-trip.",
    descWidth: 333.99,
    decor: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        alt=""
        src="/dvk/decor-vision.svg"
        aria-hidden
        className="pointer-events-none absolute block size-full max-w-none"
        style={{
          left: 357.1171875,
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
 * Figma row — three demo cards laid out with gap-[28px].
 * Each card is 400 wide; the decorative header image is clipped to the card.
 */
export function DvkDemosCards({ data }: { data?: any }) {
  const cards =
    data?.demo_cards &&
    Array.isArray(data.demo_cards) &&
    data.demo_cards.length > 0
      ? data.demo_cards.map((c: any, i: number) => {
          const fallback = DEMO_CARDS[i] || DEMO_CARDS[0];
          return {
            ...fallback,
            titleLine1: c?.title_line_1 || fallback.titleLine1,
            titleLine2: c?.title_line_2 || fallback.titleLine2,
            desc: c?.description || fallback.desc,
            img: mediaUrl(c?.image) || fallback.img,
          };
        })
      : DEMO_CARDS;
  return (
    <div className="flex items-stretch gap-[28px]">
      {cards.map((card: DemoCard) => (
        <DemoCardItem key={card.nodeId} card={card} />
      ))}
    </div>
  );
}

function DemoCardItem({ card }: { card: DemoCard }) {
  return (
    <div
      className="relative flex w-[400px] flex-col items-center gap-[20px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-black px-[32px] pt-[16px] pb-[24px]"
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src={card.img}
          className="absolute inset-0 size-full max-w-none object-cover"
        />
        {card.imgOverlay && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
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
            className={`${gilroyMedium.className} w-[333.991px] shrink-0 text-[32px] leading-[0] text-white not-italic whitespace-pre-wrap`}
          >
            <p className="mb-0 leading-[38px]">{`${card.titleLine1} `}</p>
            <p className="leading-[38px]">{card.titleLine2}</p>
          </div>
          <p
            className={`${interRegular.className} shrink-0 text-[16px] leading-[24px] font-normal text-[#99a1af] not-italic [word-break:break-word]`}
            style={{ width: card.descWidth }}
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
