/* eslint-disable @next/next/no-img-element */
import { gilroyMedium, interRegular } from "../hero/fonts";
import { CornerDecor } from "../contact/contact-shared";
import { mediaUrl } from "@/lib/strapi";

const TITLE_GRADIENT =
  "linear-gradient(119.973deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

const SUBTITLE =
  "A unified analog architecture, scaled for your exact power and performance needs.";

const FALLBACK_HEADING = "The Ambient Continuum.";

const CONNECTOR = "/applications/cont-connector.png";
const LINE_108 = "/applications/line-108.svg";
const LINE_109 = "/applications/line-109.svg";

const HOVER_TRANSITION = "transition-all duration-300 ease-out";

type ContinuumCard = {
  nodeId: string;
  title: string;
  body: React.ReactNode;
};

const CARDS: ContinuumCard[] = [
  {
    nodeId: "3784:539",
    title: "Microwatt Edge AI",
    body: "Always-on intelliegence for wearabes, audio & battery IoT.",
  },
  {
    nodeId: "3784:546",
    title: "Physical AI",
    body: (
      <>
        <span className="block">Real-time perception &amp; control for</span>
        <span className="block">robots, drones &amp; smart machines</span>
      </>
    ),
  },
  {
    nodeId: "3784:553",
    title: "Personal AI Servers",
    body: (
      <>
        <span className="block">Private, local AI compute for creators,</span>
        <span className="block">developers &amp; businesses</span>
      </>
    ),
  },
  {
    nodeId: "3784:560",
    title: "Air-Cooled HPC",
    body: "Always-on intelliegence for wearabes, audio & battery IoT.",
  },
];

function renderBody(body: React.ReactNode): React.ReactNode {
  if (typeof body === "string") {
    const lines = body.split("\n");
    if (lines.length <= 1) return body;
    return lines.map((line, i) => (
      <span key={i} className="block">
        {line}
      </span>
    ));
  }
  return body;
}

/* Shared pedestal image treatment from Figma (inset crop) */
function PedestalImage({ src }: { src: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <img
        alt=""
        aria-hidden
        src={src}
        className="absolute top-[2.97%] left-[-5.32%] h-[94.06%] w-[111.96%] max-w-none"
      />
    </div>
  );
}

/* Under-pedestal glow: default ellipse swaps to a larger blurred glow on hover */
function Glow({
  className,
  style,
  defaultSrc,
  hoverSrc,
  hoverInset,
}: {
  className: string;
  style?: React.CSSProperties;
  defaultSrc: string;
  hoverSrc: string;
  hoverInset: string;
}) {
  return (
    <div aria-hidden className={`absolute ${className}`} style={style}>
      <img
        alt=""
        aria-hidden
        src={defaultSrc}
        className={`absolute inset-0 block size-full max-w-none ${HOVER_TRANSITION} group-hover:opacity-0`}
      />
      <div
        className={`absolute opacity-0 ${HOVER_TRANSITION} group-hover:opacity-100`}
        style={{ inset: hoverInset }}
      >
        <img
          alt=""
          aria-hidden
          src={hoverSrc}
          className="block size-full max-w-none"
        />
      </div>
    </div>
  );
}

function MicrowattVisual() {
  return (
    <div
      className="group absolute top-[211px] left-[13px] h-[313px] w-[368px] overflow-clip"
      data-node-id="3784:569"
    >
      <div className="absolute top-[21px] left-[179px] h-[118px] w-[94px]">
        <img
          alt=""
          aria-hidden
          src="/applications/cont-mw-icon.png"
          className="pointer-events-none absolute inset-0 size-full max-w-none object-contain"
        />
      </div>
      <Glow
        className="top-[263px] left-[155px] h-[25px] w-[140px]"
        defaultSrc="/applications/cont-mw-glow.svg"
        hoverSrc="/applications/cont-mw-glow-hover.svg"
        hoverInset="-80% -14.29%"
      />
      <div className="absolute top-[93px] left-[115px] h-[220px] w-[221px]">
        <PedestalImage src="/applications/cont-mw-pedestal.png" />
      </div>
      <div
        className={`absolute top-[75px] left-0 h-[204px] w-[163px] translate-x-[40px] opacity-0 ${HOVER_TRANSITION} group-hover:translate-x-0 group-hover:opacity-100`}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            alt=""
            aria-hidden
            src="/applications/cont-mw-float.png"
            className="absolute top-[-5.39%] left-[8.53%] h-[114.71%] w-[81.71%] max-w-none"
          />
        </div>
      </div>
    </div>
  );
}

function PhysicalVisual() {
  return (
    <div
      className="group absolute top-[211px] left-[385px] h-[313px] w-[368px] overflow-clip"
      data-node-id="3784:570"
    >
      <div className="absolute top-[3px] left-1/2 h-[118px] w-[94px] -translate-x-1/2">
        <img
          alt=""
          aria-hidden
          src="/applications/cont-ph-icon.png"
          className="pointer-events-none absolute inset-0 size-full max-w-none object-contain"
        />
      </div>
      <Glow
        className={`top-[263px] left-1/2 h-[27px] w-[162px] -translate-x-1/2 ${HOVER_TRANSITION} group-hover:translate-x-[calc(-50%+2px)]`}
        defaultSrc="/applications/cont-ph-glow.svg"
        hoverSrc="/applications/cont-ph-glow-hover.svg"
        hoverInset="-74.07% -12.35%"
      />
      <div
        className="absolute top-[63px] left-1/2 h-[250px] w-[250.833px]"
        style={{ left: "calc(50% + 0.42px)", transform: "translateX(-50%)" }}
      >
        <PedestalImage src="/applications/cont-ph-pedestal.png" />
      </div>
      <div
        className={`absolute top-[13px] left-[2px] h-[80px] w-[115px] translate-x-[20px] translate-y-[20px] opacity-0 ${HOVER_TRANSITION} group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100`}
      >
        <img
          alt=""
          aria-hidden
          src="/applications/cont-ph-float-a.png"
          className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
        />
      </div>
      <div
        className={`absolute top-[17px] right-0 h-[90px] w-[107px] translate-x-[20px] translate-y-[20px] opacity-0 ${HOVER_TRANSITION} group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100`}
      >
        <img
          alt=""
          aria-hidden
          src="/applications/cont-ph-float-b.png"
          className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
        />
      </div>
    </div>
  );
}

function PersonalVisual() {
  return (
    <div
      className="group absolute top-[191px] left-[717px] h-[333px] w-[368px] overflow-clip"
      data-node-id="3784:571"
    >
      <div className="absolute top-[3px] left-1/2 h-[118px] w-[94px] -translate-x-1/2">
        <img
          alt=""
          aria-hidden
          src="/applications/cont-ps-icon.png"
          className="pointer-events-none absolute inset-0 size-full max-w-none object-contain"
        />
      </div>
      <Glow
        className="top-[283px] left-[calc(50%+2px)] h-[29px] w-[166px] -translate-x-1/2"
        defaultSrc="/applications/cont-ps-glow.svg"
        hoverSrc="/applications/cont-ps-glow-hover.svg"
        hoverInset="-68.97% -12.05%"
      />
      <div
        className="absolute bottom-0 left-1/2 h-[270px] w-[271px]"
        style={{ left: "calc(50% + 0.5px)", transform: "translateX(-50%)" }}
      >
        <PedestalImage src="/applications/cont-ps-pedestal.png" />
      </div>
      <div
        className={`absolute top-[3px] left-[2px] h-[96px] w-[115px] translate-x-[20px] translate-y-[20px] opacity-0 ${HOVER_TRANSITION} group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100`}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            alt=""
            aria-hidden
            src="/applications/cont-ps-float-a.png"
            className="absolute top-[-7.81%] left-0 h-[119.79%] w-full max-w-none"
          />
        </div>
      </div>
      <div
        className={`absolute top-[10px] right-[3px] h-[81px] w-[96px] translate-x-[20px] translate-y-[20px] opacity-0 ${HOVER_TRANSITION} group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100`}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            alt=""
            aria-hidden
            src="/applications/cont-ps-float-b.png"
            className="absolute top-[-0.31%] left-[-53%] h-[176.67%] w-[222.9%] max-w-none"
          />
        </div>
      </div>
    </div>
  );
}

function AirCooledVisual() {
  return (
    <div
      className="group absolute top-[117px] left-[1051px] h-[430px] w-[368px] overflow-clip"
      data-node-id="3784:572"
    >
      <div
        className={`absolute top-[-12px] left-[calc(50%+0.5px)] h-[274px] w-[325px] -translate-x-1/2 translate-y-[78px] opacity-0 ${HOVER_TRANSITION} group-hover:translate-y-0 group-hover:opacity-100`}
      >
        <img
          alt=""
          aria-hidden
          src="/applications/cont-ac-server.png"
          className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
        />
      </div>
      <Glow
        className={`top-[348px] left-[calc(50%+2px)] h-[29px] w-[166px] -translate-x-1/2 -translate-y-[65px] ${HOVER_TRANSITION} group-hover:translate-y-0`}
        defaultSrc="/applications/cont-ps-glow.svg"
        hoverSrc="/applications/cont-ps-glow-hover.svg"
        hoverInset="-68.97% -12.05%"
      />
      <div className="absolute top-[68px] left-1/2 h-[118px] w-[94px] -translate-x-1/2">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            alt=""
            aria-hidden
            src="/applications/cont-ac-icon.png"
            className="absolute top-[-6.42%] left-[-3.97%] h-[112.84%] w-[107.45%] max-w-none"
          />
        </div>
      </div>
      <div
        className="absolute bottom-[20px] left-1/2 h-[282px] w-[282.94px]"
        style={{ left: "calc(50% + 0.47px)", transform: "translateX(-50%)" }}
      >
        <PedestalImage src="/applications/cont-ac-pedestal.png" />
      </div>
    </div>
  );
}

export function ApplicationsPageContinuum({ data }: { data?: any }) {
  const heading = data?.heading || FALLBACK_HEADING;
  const subtitle = data?.subtitle || SUBTITLE;
  const image = mediaUrl(data?.image) || "/applications/continuum.png";

  const rawCards = Array.isArray(data?.cards) ? data.cards : [];
  const cards: ContinuumCard[] =
    rawCards.length > 0
      ? rawCards.map((c: any, i: number) => ({
          nodeId: CARDS[i]?.nodeId || `continuum-card-${i}`,
          title: c?.title || "",
          body: c?.body || "",
        }))
      : CARDS;

  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-black"
      data-node-id="3784:527"
      data-name="Desktop - 10"
      aria-label="The Ambient Continuum"
    >
      {/* DESKTOP (>=1024px) */}
      <div className="relative hidden h-[706px] w-full max-w-[1440px] min-[1024px]:block">
        {/* Connector graphics between cards */}
        {[293, 623, 945].map((left) => (
          <div
            key={left}
            aria-hidden
            className="absolute top-[354px] h-[60px] w-[207px]"
            style={{ left }}
          >
            <img
              alt=""
              aria-hidden
              src={CONNECTOR}
              className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
            />
          </div>
        ))}

        {/* Header: title + subtitle */}
        <div
          className="absolute top-[40px] left-1/2 flex w-[607px] -translate-x-1/2 flex-col items-center"
          data-node-id="3784:531"
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
              data-node-id="3784:532"
            >
              {heading}
            </h2>
            <CornerDecor />
          </div>
          <p
            className={`${interRegular.className} mt-[20px] w-[600px] text-center text-[14px] leading-[1.4] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
            data-node-id="3784:537"
          >
            {subtitle}
          </p>
        </div>

        {/* Content row */}
        <div
          className="absolute top-[544px] left-1/2 flex -translate-x-1/2 items-start justify-center gap-[42px] text-center not-italic text-white"
          data-node-id="3784:538"
        >
          {cards.map((card) => (
            <div
              key={card.nodeId}
              className="flex w-[276px] shrink-0 flex-col items-center justify-center gap-[10px] p-[12px]"
              data-node-id={card.nodeId}
              data-name="Content"
            >
              <p
                className={`${gilroyMedium.className} w-full text-[22px] leading-[28px] font-medium`}
              >
                {card.title}
              </p>
              <p
                className={`${interRegular.className} w-full text-[14px] leading-[21px] font-normal opacity-65`}
              >
                {renderBody(card.body)}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom lines (clipped by the frame, as in Figma) */}
        <div
          aria-hidden
          className="absolute top-[784px] left-[0.3px] flex h-0 w-[1418.317px] items-center justify-center"
        >
          <div className="flex-none skew-x-[0.75deg]">
            <div className="relative h-0 w-[1418.318px]">
              <div className="absolute inset-[-2.67px_-0.19%_-2.67px_0]">
                <img
                  alt=""
                  aria-hidden
                  src={LINE_108}
                  className="block size-full max-w-none"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          aria-hidden
          className="absolute top-[783.99px] left-[1071.52px] flex h-0 w-[347.107px] items-center justify-center"
        >
          <div className="flex-none skew-x-[-0.76deg]">
            <div className="relative h-0 w-[347.107px]">
              <div className="absolute inset-[-4.67px_-1.34%_-4.67px_-0.58%]">
                <img
                  alt=""
                  aria-hidden
                  src={LINE_109}
                  className="block size-full max-w-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Card visuals (hover reveals floating layers) */}
        <MicrowattVisual />
        <PhysicalVisual />
        <PersonalVisual />
        <AirCooledVisual />
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
              {heading}
            </h2>
            <CornerDecor />
          </div>
          <p
            className={`${interRegular.className} w-full max-w-[332px] text-center text-[14px] leading-[1.4] font-normal text-[#f0f0f0] opacity-65 not-italic`}
          >
            {subtitle}
          </p>
        </div>

        {/* Continuum image */}
        <div className="mt-[40px] w-full px-[16px]">
          <div className="aspect-[1390/544] w-full overflow-hidden">
            <img
              alt=""
              aria-hidden
              src={image}
              className="pointer-events-none size-full max-w-none object-cover"
            />
          </div>
        </div>

        {/* Cards */}
        <div className="flex w-full flex-col items-center gap-[32px] px-[24px] pt-[40px] pb-[64px]">
          {cards.map((card) => (
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
                {renderBody(card.body)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
