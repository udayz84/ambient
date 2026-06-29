import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import {
  ACCENT_CARD_BG,
  ACCENT_CARD_BORDER,
  CARD_BG,
  CARD_BORDER,
  CORNER_LEFT,
  CORNER_RIGHT,
  FEATURE_CARD_BG,
  SECTION_TITLE_GRADIENT,
} from "./dvk-data";

type SpecCard = {
  title: string;
  items: string[];
  accent?: boolean;
};

/** Figma 2761:2925 — five spec cards (Memory, Wireless, Sensors, Debug, Interfaces). */
export const SPEC_CARDS: SpecCard[] = [
  {
    title: "Memory",
    items: ["512KB SRAM", "8MB Flash", "External SPI Support"],
  },
  {
    title: "Wireless",
    items: ["Bluetooth 5.0 LE", "802.15.4 Ready", "Onboard Antenna"],
  },
  {
    title: "Sensors",
    accent: true,
    items: [
      "I2S Digital Mic",
      "Analog Mic",
      "3-Axis Accelerometer",
      "Ambient Light Sensor",
    ],
  },
  {
    title: "Debug Ports",
    items: ["USB-C Programming", "10-Pin JTAG", "UART Console", "GPIO Breakout"],
  },
  {
    title: "Interfaces",
    items: [
      "SPI, I2C, UART",
      "Camera Connector",
      "Programmable LEDs",
      "Button Inputs",
    ],
  },
];

/**
 * Figma 2761:2905 — "The complete Edge AI hardware stack" section.
 * Root frame is 1232 wide; rendered as a flex column, items centered.
 */
export function DvkHardwareStack() {
  return (
    <div
      className="relative flex w-full flex-col items-center gap-[48px]"
      data-node-id="2761:2905"
      data-name="Frame 1984079436"
    >
      {/* Header — 2761:2906 (800 wide) */}
      <div
        className="flex w-[800px] flex-col items-center gap-[24px]"
        data-node-id="2761:2906"
      >
        {/* Section Title — 2761:2907 (729.664×98, px-10 corners frame) */}
        <div
          className="relative px-[10px]"
          style={{ width: 729.6640625 }}
          data-node-id="2761:2908"
          data-name="Title"
        >
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            className={`${gilroyMedium.className} m-0 bg-clip-text text-center text-[46px] leading-[49px] font-medium text-transparent not-italic [word-break:break-word]`}
            style={{
              width: 709.6640625,
              backgroundImage: SECTION_TITLE_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
            data-node-id="2761:2909"
          >
            The complete Edge AI hardware stack in a single footprint
          </h2>
        </div>

        {/* Description — 2761:2914 */}
        <p
          className={`${interRegular.className} text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
          style={{ width: 618.2734375, opacity: 0.65 }}
          data-node-id="2761:2914"
        >
          An exhaustive suite of sensors, interfaces, and debug tools
          pre-integrated with the GPX-10 Pro AI Processor.
        </p>
      </div>

      {/* Content — 2761:2915 (1232 wide) */}
      <div
        className="flex w-full flex-col items-center justify-center gap-[24px]"
        data-node-id="2761:2915"
      >
        {/* Feature card — 2761:2916 (1232×380) */}
        <div
          className="relative flex w-full flex-col items-center justify-center gap-[20px] overflow-clip border-[0.5px] border-solid p-[16px]"
          style={{
            backgroundColor: FEATURE_CARD_BG,
            borderColor: CARD_BORDER,
          }}
          data-node-id="2761:2916"
          data-name="Article"
        >
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <p
            className={`${gilroyMedium.className} min-w-full w-[min-content] shrink-0 text-center text-[22px] leading-[28px] text-white not-italic`}
            data-node-id="2761:2917"
          >
            The Hardware Blueprint
          </p>

          {/* Circuit board — 2761:2918 (739.724×300) */}
          <div
            className="relative h-[300px] w-[739.724px] shrink-0"
            data-node-id="2761:2918"
            data-name="Circuit board"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src="/dvk/board-main.png"
              className="pointer-events-none absolute inset-0 size-full max-w-none rounded-[7.572px] object-bottom"
              data-node-id="2761:2919"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src="/dvk/board-chip.png"
              className="pointer-events-none absolute max-w-none rounded-[7.572px] object-bottom"
              style={{
                left: 263.37890625,
                top: 55.32421875,
                width: 221.3364715576172,
                height: 197.49679565429688,
              }}
              data-node-id="2761:2920"
            />
          </div>
        </div>

        {/* Spec cards row — 2761:2925 (1232×auto, gap-8) */}
        <div
          className="flex w-full items-stretch gap-[8px]"
          data-node-id="2761:2925"
        >
          {SPEC_CARDS.map((card) => (
            <SpecCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SpecCard({ card }: { card: SpecCard }) {
  const isAccent = card.accent === true;
  return (
    <div
      className="relative flex min-w-px flex-1 flex-col items-center gap-[20px] self-stretch overflow-clip border-[0.5px] border-solid px-[16px] pt-[16px] pb-[24px]"
      style={{
        backgroundColor: isAccent ? ACCENT_CARD_BG : CARD_BG,
        borderColor: isAccent ? ACCENT_CARD_BORDER : CARD_BORDER,
      }}
      data-name="Article"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className="absolute max-w-none"
          style={{ width: "196.33%", height: "195.4%", left: "-49.07%", top: "-46.07%" }}
          src="/dvk/card-glow.png"
        />
      </div>
      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
      <div
        className="flex w-full flex-col items-start"
        data-name="NewsSection"
      >
        <div className="flex w-full flex-col gap-[10px]">
          <p
            className={`${gilroyMedium.className} w-full shrink-0 text-[22px] leading-[28px] text-white not-italic`}
          >
            {card.title}
          </p>
          <ul
            className={`${interRegular.className} list-disc text-[16px] leading-[0] font-normal text-[rgba(240,240,240,0.6)]`}
          >
            {card.items.map((item) => (
              <li key={item} className="ms-[24px]">
                <span className="leading-[24px]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
