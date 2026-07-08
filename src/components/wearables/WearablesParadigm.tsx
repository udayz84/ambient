import { dmMono, gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";

const TITLE_GRADIENT =
  "linear-gradient(117.952deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

const IMAGE_RADIAL =
  "radial-gradient(ellipse at center, rgba(26,26,26,1) 0%, rgba(13,13,13,1) 25%, rgba(7,7,7,1) 37.5%, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 100%)";

function DevChip({ label }: { label: string }) {
  return (
    <div
      className="relative h-[26px] w-[153px] shrink-0 overflow-clip bg-[rgba(115,190,91,0.12)]"
      data-name="Menu"
    >
      <Corners
        leftSrc="/applications/wearables/vector-47.svg"
        rightSrc="/applications/wearables/vector-46.svg"
      />
      <p
        className={`${dmMono.className} absolute top-[calc(50%-4.5px)] left-1/2 -translate-x-1/2 text-[13px] leading-[19.5px] font-normal tracking-[-0.39px] text-[#ecfae5] uppercase whitespace-nowrap not-italic`}
      >
        {label}
      </p>
      <div className="absolute top-1/2 left-[7px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
      <div className="absolute top-1/2 right-[7px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
    </div>
  );
}

type ParadigmCardProps = {
  title: string;
  body: string;
  chipLabel: string;
};

function ParadigmCard({ title, body, chipLabel }: ParadigmCardProps) {
  return (
    <div
      className="relative flex w-[590px] shrink-0 flex-col items-center gap-[20px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.5)] pt-[20px] px-[20px] pb-[32px]"
      data-name="Article"
    >
      <Corners
        leftSrc="/applications/wearables/vector-42.svg"
        rightSrc="/applications/wearables/vector-43.svg"
      />
      {/* Image / visual container */}
      <div
        className="flex h-[327px] w-full shrink-0 items-center justify-center overflow-hidden rounded-[6px] border border-solid border-[rgba(0,255,0,0.3)]"
        style={{ backgroundImage: IMAGE_RADIAL }}
        data-name="Container"
      >
        <div className="h-[64px] w-[156.852px] shrink-0" data-name="Container" />
      </div>

      {/* Content */}
      <div className="flex w-full flex-col items-start">
        <div className="flex w-full flex-col gap-[10px]">
          <div className="flex w-full items-center justify-between">
            <p
              className={`${gilroyMedium.className} text-[22px] leading-[28px] font-medium text-white whitespace-nowrap not-italic`}
            >
              {title}
            </p>
            <DevChip label={chipLabel} />
          </div>
          <p
            className={`${interRegular.className} w-full text-[16px] leading-[24px] font-normal text-[rgba(240,240,240,0.6)] not-italic [word-break:break-word]`}
          >
            {body}
          </p>
        </div>
      </div>
    </div>
  );
}

const CARDS = [
  {
    title: "The Legacy Way",
    body: "Wake word triggers → transmit raw audio/vitals to cloud → process → return result.",
  },
  {
    title: "The Ambient Way",
    body: "Continuous raw data ingested → processed locally via Ambient AI → actionable insight generated instantly.",
  },
];

const FALLBACK_HEADING = "The Paradigm Shift";
const FALLBACK_SUBTITLE =
  "Bridge the lab and real world. The Sparsh module offers continuous, microwatt intelligence in a 21×21mm size, with a breakout board that snaps off for production.";
const FALLBACK_CHIP_LABEL = "Development";

export function WearablesParadigm({ data }: { data?: any }) {
  const subtitle = data?.subtitle || FALLBACK_SUBTITLE;
  const heading = data?.heading || FALLBACK_HEADING;
  const chipLabel = data?.chip_label || FALLBACK_CHIP_LABEL;
  const dataCards: any[] = Array.isArray(data?.cards) ? data.cards : [];
  const cards = CARDS.map((fb, i) => {
    const c = dataCards[i];
    if (!c) return fb;
    return {
      title: c.title || fb.title,
      body: c.body || fb.body,
    };
  });
  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-black"
      data-node-id="2509:469"
      data-name="The Paradigm Shift"
      aria-label="The Paradigm Shift"
    >
      {/* DESKTOP (>=1024px) */}
      <div className="relative hidden w-full max-w-[1440px] flex-col items-center gap-[48px] pt-[80px] pb-[100px] min-[1024px]:flex">
        {/* Headings */}
        <div className="flex flex-col items-center gap-[24px]">
          <div className="relative flex flex-col items-center px-[10px]">
            <h2
              className={`${gilroyMedium.className} bg-clip-text text-center text-[46px] leading-[49px] font-medium text-transparent whitespace-nowrap not-italic [word-break:break-word]`}
              style={{
                backgroundImage: TITLE_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
              data-node-id="2509:472"
            >
              {heading}
            </h2>
            <Corners
              leftSrc="/applications/wearables/vector-42.svg"
              rightSrc="/applications/wearables/vector-43.svg"
            />
          </div>
          <p
            className={`${interRegular.className} w-[679.389px] text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
            data-node-id="2509:477"
          >
            {subtitle}
          </p>
        </div>

        {/* Cards */}
        <div className="flex items-center gap-[24px]">
          {cards.map((card) => (
            <ParadigmCard
              key={card.title}
              title={card.title}
              body={card.body}
              chipLabel={chipLabel}
            />
          ))}
        </div>
      </div>

      {/* MOBILE (<1024px) */}
      <div className="relative flex w-full flex-col items-center gap-[40px] px-[24px] pt-[72px] pb-[72px] min-[1024px]:hidden">
        {/* Headings */}
        <div className="flex flex-col items-center gap-[20px]">
          <div className="relative flex flex-col items-center px-[10px]">
            <h2
              className={`${gilroyMedium.className} bg-clip-text text-center text-[34px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
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
            className={`${interRegular.className} max-w-[327px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-65 not-italic`}
          >
            {subtitle}
          </p>
        </div>

        {/* Cards */}
        <div className="flex w-full flex-col items-stretch gap-[20px]">
          {cards.map((card) => (
            <div
              key={card.title}
              className="relative flex w-full flex-col gap-[16px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.5)] pt-[16px] px-[16px] pb-[24px]"
            >
              <Corners
                leftSrc="/applications/wearables/vector-42.svg"
                rightSrc="/applications/wearables/vector-43.svg"
              />
              <div
                className="flex h-[200px] w-full shrink-0 items-center justify-center overflow-hidden rounded-[6px] border border-solid border-[rgba(0,255,0,0.3)]"
                style={{ backgroundImage: IMAGE_RADIAL }}
              >
                <div className="h-[44px] w-[110px] shrink-0" />
              </div>
              <div className="flex w-full flex-col gap-[8px]">
                <div className="flex w-full items-center justify-between gap-[8px]">
                  <p
                    className={`${gilroyMedium.className} text-[18px] leading-[24px] font-medium text-white not-italic`}
                  >
                    {card.title}
                  </p>
                  <DevChip label={chipLabel} />
                </div>
                <p
                  className={`${interRegular.className} w-full text-[14px] leading-[21px] font-normal text-[rgba(240,240,240,0.6)] not-italic`}
                >
                  {card.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
