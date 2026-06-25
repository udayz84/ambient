/* eslint-disable @next/next/no-img-element */
import { gilroyMedium, interRegular } from "../hero/fonts";
import { CornerDecor } from "../contact/contact-shared";

const TITLE_GRADIENT =
  "linear-gradient(119.973deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

const SUBTITLE =
  "A unified analog architecture, scaled for your exact power and performance needs.";

type ContinuumCard = {
  nodeId: string;
  left: number;
  top: number;
  title: string;
  body: React.ReactNode;
};

const CARDS: ContinuumCard[] = [
  {
    nodeId: "2660:1156",
    left: 127.87,
    top: 544,
    title: "Microwatt Edge AI",
    body: "Always-on intelliegence for wearabes, audio & battery IoT.",
  },
  {
    nodeId: "2660:1163",
    left: 434.87,
    top: 546.15,
    title: "Physical AI",
    body: (
      <>
        <span className="block">Real-time perception &amp; control for</span>
        <span className="block">robots, drones &amp; smart machines</span>
      </>
    ),
  },
  {
    nodeId: "2660:1170",
    left: 757.37,
    top: 544,
    title: "Personal AI Servers",
    body: (
      <>
        <span className="block">Private, local AI compute for creators,</span>
        <span className="block">developers &amp; businesses</span>
      </>
    ),
  },
  {
    nodeId: "2660:1177",
    left: 1071.37,
    top: 544.16,
    title: "Air-Cooled HPC",
    body: "Always-on intelliegence for wearabes, audio & battery IoT.",
  },
];

function Line108() {
  return (
    <div className="absolute top-[784px] left-[0.3px] flex h-0 w-[1418.317px] items-center justify-center">
      <div className="flex-none skew-x-[0.75deg]">
        <div className="relative h-0 w-[1418.318px]" data-node-id="2660:1184">
          <div className="absolute inset-[-2.67px_-0.19%_-2.67px_0]">
            <img
              alt=""
              aria-hidden
              src="/applications/line-108.svg"
              className="block size-full max-w-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Line109() {
  return (
    <div className="absolute top-[783.99px] left-[1071.52px] flex h-0 w-[347.107px] items-center justify-center">
      <div className="flex-none skew-x-[-0.76deg]">
        <div className="relative h-0 w-[347.107px]" data-node-id="2660:1185">
          <div className="absolute inset-[-4.67px_-1.34%_-4.67px_-0.58%]">
            <img
              alt=""
              aria-hidden
              src="/applications/line-109.svg"
              className="block size-full max-w-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ApplicationsPageContinuum() {
  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-[#040404]"
      data-node-id="2660:1147"
      data-name="Desktop - 8"
      aria-label="The Ambient Continuum"
    >
      {/* DESKTOP (>=1024px) */}
      <div className="relative hidden h-[790px] w-full max-w-[1440px] min-[1024px]:block">
        {/* Continuum image */}
        <div
          className="absolute top-[7px] left-[24.49px] h-[544px] w-[1390px]"
          data-node-id="2660:1148"
          data-name="ChatGPT Image May 19, 2026, 02_04_21 PM 1"
        >
          <img
            alt=""
            aria-hidden
            src="/applications/continuum.png"
            className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
          />
        </div>

        {/* Header: title + subtitle */}
        <div
          className="absolute top-[40px] left-1/2 flex w-[607px] -translate-x-1/2 flex-col items-center"
          data-node-id="2660:1149"
          data-name="Group 78"
        >
          <div className="relative h-[74px] w-full" data-name="Title">
            <h2
              className={`${gilroyMedium.className} absolute top-[7px] left-0 w-full bg-clip-text text-center text-[49px] leading-[60px] font-medium tracking-[-0.98px] whitespace-nowrap text-transparent not-italic`}
              style={{
                backgroundImage: TITLE_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
              data-node-id="2660:1150"
            >
              The Ambient Continuum.
            </h2>
            <CornerDecor />
          </div>
          <p
            className={`${interRegular.className} mt-[20px] w-[600px] text-center text-[14px] leading-[1.4] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
            data-node-id="2660:1155"
          >
            {SUBTITLE}
          </p>
        </div>

        {/* Content cards */}
        {CARDS.map((card) => (
          <div
            key={card.nodeId}
            className="absolute flex w-[276px] flex-col items-center justify-center gap-[10px] p-[12px] text-center not-italic text-white"
            style={{ left: `${card.left}px`, top: `${card.top}px` }}
            data-node-id={card.nodeId}
            data-name="Content"
          >
            <p
              className={`${gilroyMedium.className} w-full text-[22px] leading-[28px] font-medium`}
              data-node-id={`${card.nodeId}-title`}
            >
              {card.title}
            </p>
            <p
              className={`${interRegular.className} w-full text-[14px] leading-[21px] font-normal opacity-65`}
              data-node-id={`${card.nodeId}-body`}
            >
              {card.body}
            </p>
          </div>
        ))}

        {/* Continuum lines */}
        <Line108 />
        <Line109 />
      </div>

      {/* MOBILE (<1024px) */}
      <div className="relative flex w-full flex-col items-center min-[1024px]:hidden">
        {/* Header */}
        <div className="flex w-full flex-col items-center gap-[24px] px-[24px] pt-[64px]">
          <div className="relative w-full px-[24px]">
            <h2
              className={`${gilroyMedium.className} bg-clip-text text-center text-[32px] leading-[40px] font-medium tracking-[-0.64px] text-transparent not-italic [word-break:break-word]`}
              style={{
                backgroundImage: TITLE_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              The Ambient Continuum.
            </h2>
            <CornerDecor />
          </div>
          <p
            className={`${interRegular.className} max-w-[332px] text-center text-[14px] leading-[1.4] font-normal text-[#f0f0f0] opacity-65 not-italic`}
          >
            {SUBTITLE}
          </p>
        </div>

        {/* Continuum image */}
        <div className="mt-[40px] w-full px-[16px]">
          <div className="aspect-[1390/544] w-full overflow-hidden">
            <img
              alt=""
              aria-hidden
              src="/applications/continuum.png"
              className="pointer-events-none size-full max-w-none object-cover"
            />
          </div>
        </div>

        {/* Cards */}
        <div className="flex w-full flex-col items-center gap-[32px] px-[24px] pt-[40px] pb-[64px]">
          {CARDS.map((card) => (
            <div
              key={card.nodeId}
              className="flex w-full max-w-[300px] flex-col items-center justify-center gap-[10px] p-[12px] text-center not-italic text-white"
            >
              <p
                className={`${gilroyMedium.className} text-[20px] leading-[26px] font-medium`}
              >
                {card.title}
              </p>
              <p
                className={`${interRegular.className} text-[14px] leading-[21px] font-normal opacity-65`}
              >
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
