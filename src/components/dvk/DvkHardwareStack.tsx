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
  SPEC_CARDS,
  type SpecCardType,
} from "./dvk-data";
import { mediaUrl } from "@/lib/strapi";

const DEFAULT_HEADING =
  "The complete Edge AI hardware stack in a single footprint";
const DEFAULT_SUBTITLE =
  "An exhaustive suite of sensors, interfaces, and debug tools pre-integrated with the GPX-10 Pro AI Processor.";
const DEFAULT_LABEL = "The Hardware Blueprint";
const DEFAULT_BOARD_IMAGE = "/dvk/board-stack.png";

export function DvkHardwareStack({ data }: { data?: any }) {
  const heading = data?.heading || DEFAULT_HEADING;
  const subtitle = data?.subtitle || DEFAULT_SUBTITLE;
  const label = data?.label || DEFAULT_LABEL;
  const boardImage = mediaUrl(data?.board_image);
  // Figma 2761:2925 — fixed 7 card slots; CMS entries override per index.
  const source: any[] = Array.isArray(data?.spec_cards) ? data.spec_cards : [];
  const cards: SpecCardType[] = SPEC_CARDS.map((def, i) => {
    const c = source[i];
    if (!c) return def;
    return {
      title: c?.title || def.title,
      items:
        c?.items && c.items.length > 0
          ? c.items.split("\n").filter(Boolean)
          : def.items,
      accent: c?.is_accent === true,
    };
  });

  return (
    <div
      className="relative flex w-full flex-col items-center gap-[48px]"
      data-node-id="2761:2905"
    >
      {/* Header */}
      <div className="flex w-[800px] flex-col items-center gap-[24px]">
        <div
          className="relative px-[10px]"
          style={{ width: 729.6640625 }}
        >
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            className={`${gilroyMedium.className} m-0 bg-clip-text text-center text-[46px] leading-[49px] font-medium text-transparent not-italic`}
            style={{
              width: 709.6640625,
              backgroundImage: SECTION_TITLE_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            {heading}
          </h2>
        </div>

        <p
          className={`${interRegular.className} text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] not-italic`}
          style={{ width: 618.2734375, opacity: 0.65 }}
        >
          {subtitle}
        </p>
      </div>

      {/* Content (Figma 2761:2915) */}
      <div className="flex w-full items-center justify-center gap-[24px]">
        {/* Feature card (Board Image) */}
        <div
          className="relative flex min-w-px flex-1 flex-col items-center justify-center gap-[20px] self-stretch overflow-clip border-[0.5px] border-solid p-[16px]"
          style={{
            backgroundColor: FEATURE_CARD_BG,
            borderColor: CARD_BORDER,
          }}
        >
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <p
            className={`${gilroyMedium.className} min-w-full w-[min-content] shrink-0 text-center text-[22px] leading-[28px] text-white not-italic`}
          >
            {label}
          </p>
          {/* Figma 4049:8277 — DVK Board 1 */}
          <div className="relative h-[528.474px] w-[572.67px] shrink-0">
            {boardImage && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                alt=""
                src={boardImage}
                className="absolute inset-0 size-full max-w-none object-contain"
              />
            )}
          </div>
        </div>

        {/* Spec cards column */}
        <div className="flex w-[571px] shrink-0 flex-col gap-[8px]">
          <div className="flex w-full gap-[8px]">
            <SpecCard card={cards[0]} />
            <SpecCard card={cards[1]} />
          </div>
          <div className="flex w-full gap-[8px]">
            <SpecCard card={cards[2]} />
            <SpecCard card={cards[3]} />
          </div>
          {/* Row 3 (Figma 4022:2660) — Interfaces + stacked MCU/Booting */}
          <div className="flex w-full gap-[8px]">
            <SpecCard card={cards[4]} />
            <div className="flex min-w-px flex-1 flex-col items-start justify-center gap-[8px] self-stretch">
              <SpecCard card={cards[5]} stacked />
              <SpecCard card={cards[6]} stacked />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpecCard({
  card,
  stacked = false,
}: {
  card: SpecCardType;
  stacked?: boolean;
}) {
  if (!card) return null;
  return (
    <div
      className={`relative flex flex-col items-center gap-[20px] overflow-clip border-[0.5px] border-solid px-[16px] pt-[16px] pb-[24px] ${
        stacked ? "min-h-px w-full flex-1" : "min-w-px flex-1"
      }`}
      style={{
        backgroundColor: card.accent ? ACCENT_CARD_BG : CARD_BG,
        borderColor: card.accent ? ACCENT_CARD_BORDER : CARD_BORDER,
      }}
    >
      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
      <div className="flex w-full flex-col items-start">
        <div className="flex w-full flex-col gap-[10px]">
          <p
            className={`${gilroyMedium.className} w-full shrink-0 text-[22px] leading-[28px] text-white not-italic overflow-hidden text-ellipsis whitespace-nowrap`}
          >
            {card.title}
          </p>
          <ul
            className={`${interRegular.className} list-disc text-[16px] leading-[0] font-normal text-[rgba(240,240,240,0.6)]`}
          >
            {card.items.map((item) => (
              <li key={item} className="ms-[24px]">
                <span className="leading-[24px] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
