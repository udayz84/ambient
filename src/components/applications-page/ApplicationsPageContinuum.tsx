/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { CornerDecor } from "../contact/contact-shared";
import { Corners } from "../shared/Corners";
import { ContinuumOptionsBar } from "./ContinuumOptionsBar";

const TITLE_GRADIENT =
  "linear-gradient(119.973deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

const SUBTITLE =
  "A unified analog architecture, scaled for your exact power and performance needs.";

const FALLBACK_HEADING = "The Ambient Continuum.";

const CONNECTOR = "/applications/cont-connector.png";
const LINE_108 = "/applications/line-108.svg";
const LINE_109 = "/applications/line-109.svg";

const NAV_ARROW_LEFT = "/applications/nav-arrow-left.svg";
const NAV_ARROW_RIGHT = "/applications/nav-arrow-right.svg";

const HOVER_TRANSITION = "transition-all duration-300 ease-out";

type ContinuumCard = {
  nodeId: string;
  title: string;
  body: React.ReactNode;
  wide: boolean;
};

const CARDS: ContinuumCard[] = [
  {
    nodeId: "3974:613",
    title: "GPX10PRO",
    body: "Always-on intelliegence for wearabes, audio & battery IoT.",
    wide: false,
  },
  {
    nodeId: "3974:620",
    title: "GPX64",
    body: "Real-time perception & control for robots, drones & smart machines",
    wide: true,
  },
  {
    nodeId: "3974:627",
    title: "GPX256",
    body: "Private, local AI compute for creators, developers & businesses",
    wide: true,
  },
  {
    nodeId: "3974:634",
    title: "GPX2000",
    body: "Private, local AI compute for creators, developers & businesses",
    wide: true,
  },
  {
    nodeId: "3974:641",
    title: "GPX8000",
    body: "Always-on intelliegence for wearabes, audio & battery IoT.",
    wide: false,
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

/* Under-pedestal glow: hidden by default, fades in on hover.
   Figma ellipse: vertical gradient #81D713 → #CFF86C → #FBFCF8 + gaussian blur. */
function Glow({
  className,
  blur,
}: {
  className: string;
  blur: number;
}) {
  return (
    <div
      aria-hidden
      className={`absolute rounded-[50%] opacity-0 ${HOVER_TRANSITION} group-hover:opacity-100 ${className}`}
      style={{
        background:
          "linear-gradient(to top, #81D713 0%, #CFF86C 50%, #FBFCF8 100%)",
        filter: `blur(${blur}px)`,
      }}
    />
  );
}

/* Chip screen logo: white shape masked by the logo alpha + vectorized mark */
function ChipLogo({
  className,
  maskSrc,
  markSrc,
}: {
  className: string;
  maskSrc: string;
  markSrc: string;
}) {
  return (
    <div className={`absolute h-[30px] w-[26.053px] ${className}`}>
      <div
        aria-hidden
        className="mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[26.053px_30px] absolute left-0 top-0 h-[30px] w-[26.053px] bg-white"
        style={{ maskImage: `url("${maskSrc}")` }}
      />
      <div className="absolute left-[5.53px] top-[7.89px] h-[15px] w-[13.421px]">
        <img
          alt=""
          aria-hidden
          src={markSrc}
          className="absolute inset-0 block size-full max-w-none"
        />
      </div>
    </div>
  );
}

/* Hidden float layer revealed on hover */
function Float({
  className,
  src,
  imgClassName = "absolute inset-0 size-full max-w-none object-cover",
  clip = false,
}: {
  className: string;
  src: string;
  imgClassName?: string;
  clip?: boolean;
}) {
  const hasObjectCover = imgClassName.includes("object-cover");
  const wrapperClass = imgClassName.replace("object-cover", "").replace("max-w-none", "").trim();

  const img = (
    <div className={wrapperClass}>
      <Image 
        alt="" 
        aria-hidden 
        src={src} 
        fill 
        sizes="400px" 
        quality={100}
        className={hasObjectCover ? "object-cover max-w-none" : "max-w-none"} 
      />
    </div>
  );
  return (
    <div
      aria-hidden
      className={`absolute opacity-0 ${HOVER_TRANSITION} group-hover:opacity-100 ${className}`}
    >
      {clip ? (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {img}
        </div>
      ) : (
        img
      )}
    </div>
  );
}

function Pedestal({
  className,
  src,
  children,
}: {
  className: string;
  src: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`absolute overflow-clip ${className}`}>
      <img
        alt=""
        aria-hidden
        src={src}
        className="pointer-events-none absolute inset-0 size-full max-w-none object-contain"
      />
      {children}
    </div>
  );
}

function MicrowattVisual() {
  return (
    <div
      className="group absolute left-[-21.13px] top-[375px] h-[260px] w-[305.687px] overflow-clip"
      data-node-id="3974:650"
    >
      <div className="absolute left-[148.69px] top-[17.44px] h-[98.019px] w-[78.083px]">
        <img
          alt=""
          aria-hidden
          src="/applications/cont-mw-icon.png"
          className="pointer-events-none absolute inset-0 size-full max-w-none object-contain"
        />
      </div>
      <Glow className="left-[128.75px] top-[218.47px] h-[20.767px] w-[116.294px]" blur={8.31} />
      <Pedestal className="left-[100px] top-[89px] h-[160px] w-[177.486px]" src="/applications/cont-mw-pedestal.png">
        <ChipLogo
          className="left-[76px] top-[27px]"
          maskSrc="/applications/cont-chip-mask-a.png"
          markSrc="/applications/cont-chip-mark-a.svg"
        />
      </Pedestal>
      <Float
        className="left-[33.23px] top-[62.3px] h-[169.457px] w-[135.399px]"
        src="/applications/cont-mw-float.png"
        imgClassName="absolute left-[8.53%] top-[-5.39%] h-[114.71%] w-[81.71%] max-w-none"
        clip
      />
    </div>
  );
}

function PhysicalVisual() {
  return (
    <div
      className="group absolute left-[263px] top-[373.02px] h-[272.977px] w-[320.944px] overflow-clip"
      data-node-id="3974:651"
    >
      <Glow className="left-1/2 top-[235.27px] h-[24.153px] w-[144.92px] -translate-x-1/2" blur={8.72} />
      <div className="absolute left-1/2 top-[2.68px] h-[105.559px] w-[84.089px] -translate-x-1/2">
        <img
          alt=""
          aria-hidden
          src="/applications/cont-ph-icon.png"
          className="pointer-events-none absolute inset-0 size-full max-w-none object-contain"
        />
      </div>
      <Pedestal
        className="left-[calc(50%-1.28px)] top-[73px] h-[190px] w-[190.633px] -translate-x-1/2"
        src="/applications/cont-ph-pedestal.png"
      >
        <ChipLogo
          className="left-[82.6px] top-[40.5px]"
          maskSrc="/applications/cont-chip-mask-b.png"
          markSrc="/applications/cont-chip-mark-b.svg"
        />
      </Pedestal>
      <Float
        className="left-[29.68px] top-[39.52px] h-[71.565px] w-[102.875px]"
        src="/applications/cont-ph-float-a.png"
      />
      <Float
        className="right-[17.89px] top-[23.1px] h-[80.511px] w-[95.719px]"
        src="/applications/cont-ph-float-b.png"
      />
    </div>
  );
}

function PersonalVisual() {
  return (
    <div
      className="group absolute left-[539.94px] top-[323px] h-[330.799px] w-[333.518px] overflow-clip"
      data-node-id="3974:652"
    >
      <Glow className="left-[calc(50%+1.86px)] top-[293.42px] h-[27.014px] w-[154.63px] -translate-x-1/2" blur={9.06} />
      <div className="absolute left-1/2 top-[32.6px] h-[109.918px] w-[87.562px] -translate-x-1/2">
        <img
          alt=""
          aria-hidden
          src="/applications/cont-ps-icon.png"
          className="pointer-events-none absolute inset-0 size-full max-w-none object-contain"
        />
      </div>
      <Pedestal
        className="bottom-[20.19px] left-[calc(50%-1.04px)] h-[212.5px] w-[213.208px] -translate-x-1/2"
        src="/applications/cont-ps-pedestal.png"
      >
        <ChipLogo
          className="left-[calc(50%+0.04px)] top-[calc(50%-43.06px)] -translate-x-1/2 -translate-y-1/2"
          maskSrc="/applications/cont-chip-mask-c.png"
          markSrc="/applications/cont-chip-mark-c.svg"
        />
      </Pedestal>
      <Float
        className="left-[31.86px] top-[32.79px] h-[89.425px] w-[107.123px]"
        src="/applications/cont-ps-float-a.png"
        imgClassName="absolute left-0 top-[-7.81%] h-[119.79%] w-full max-w-none"
        clip
      />
      <Float
        className="right-[7.78px] top-[39.31px] h-[75.452px] w-[89.425px]"
        src="/applications/cont-ps-float-b.png"
        imgClassName="absolute left-[-53%] top-[-0.31%] h-[176.67%] w-[222.9%] max-w-none"
        clip
      />
    </div>
  );
}

function Personal2Visual() {
  return (
    <div
      className="group absolute left-[816.87px] top-[305px] h-[340px] w-[342.795px] overflow-clip"
      data-node-id="3974:654"
    >
      <Glow className="left-[calc(50%+1.86px)] top-[293.42px] h-[27.014px] w-[154.63px] -translate-x-1/2" blur={9.32} />
      <div className="absolute left-[calc(50%+0.65px)] top-[39px] h-[105.559px] w-[84.089px] -translate-x-1/2">
        <img
          alt=""
          aria-hidden
          src="/applications/cont-p2-icon.png"
          className="pointer-events-none absolute inset-0 size-full max-w-none object-contain"
        />
      </div>
      <Pedestal
        className="bottom-[16px] left-[calc(50%-0.03px)] h-[220px] w-[220.733px] -translate-x-1/2"
        src="/applications/cont-p2-pedestal.png"
      >
        <ChipLogo
          className="left-[calc(50%+0.06px)] top-[calc(50%-42.5px)] -translate-x-1/2 -translate-y-1/2"
          maskSrc="/applications/cont-chip-mask-a.png"
          markSrc="/applications/cont-chip-mark-a.svg"
        />
      </Pedestal>
      <Float
        className="right-[48.67px] top-[45px] h-[89.425px] w-[107.123px]"
        src="/applications/cont-p2-float.png"
      />
    </div>
  );
}

function AirCooledVisual() {
  return (
    <div
      className="group absolute left-[1090.87px] top-[245px] h-[420px] w-[359.442px] overflow-clip"
      data-node-id="3974:653"
    >
      <Float
        className="left-[calc(50%+0.12px)] top-[calc(50%-61.72px)] h-[267.628px] w-[317.442px] -translate-x-1/2 -translate-y-1/2"
        src="/applications/cont-ac-server.png"
      />
      <Glow className="left-[calc(50%+1.95px)] top-[276.42px] h-[28.326px] w-[162.14px] -translate-x-1/2" blur={9.77} />
      <div className="absolute left-1/2 top-[66.42px] h-[115.256px] w-[91.814px] -translate-x-1/2">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            alt=""
            aria-hidden
            src="/applications/cont-ac-icon.png"
            className="absolute left-[-3.97%] top-[-6.42%] h-[112.84%] w-[107.45%] max-w-none"
          />
        </div>
      </div>
      <Pedestal
        className="bottom-[37px] left-[calc(50%+0.7px)] h-[250px] w-[250.833px] -translate-x-1/2"
        src="/applications/cont-ac-pedestal.png"
      >
        <ChipLogo
          className="left-[calc(50%+2.33px)] top-[calc(50%-48px)] -translate-x-1/2 -translate-y-1/2"
          maskSrc="/applications/cont-chip-mask-a.png"
          markSrc="/applications/cont-chip-mark-a.svg"
        />
      </Pedestal>
    </div>
  );
}

export function ApplicationsPageContinuum({ data }: { data?: any }) {
  const heading = data?.heading || FALLBACK_HEADING;
  const subtitle = data?.subtitle || SUBTITLE;

  const rawCards = Array.isArray(data?.cards) ? data.cards : [];
  const cards: ContinuumCard[] =
    rawCards.length > 0
      ? rawCards.map((c: any, i: number) => ({
          nodeId: CARDS[i]?.nodeId || `continuum-card-${i}`,
          title: c?.title || "",
          body: c?.body || "",
          wide: CARDS[i]?.wide ?? true,
        }))
      : CARDS;

  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-black"
      data-node-id="3974:600"
      data-name="Desktop - 11"
      aria-label="The Ambient Continuum"
    >
      {/* DESKTOP (>=1024px) */}
      <div className="relative hidden h-[808px] w-full max-w-[1440px] min-[1024px]:block">
        {/* Connector graphics between pedestals */}
        {[192.87, 472.87, 744.87, 1014.87].map((left) => (
          <div
            key={left}
            aria-hidden
            className="absolute top-[476px] h-[60px] w-[207px]"
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
          className="absolute left-1/2 top-[32px] flex w-[607px] -translate-x-1/2 flex-col items-center"
          data-node-id="3974:605"
          data-name="Group 78"
        >
          <div className="relative h-[74px] w-full" data-name="Title">
            <h2
              className={`${gilroyMedium.className} absolute left-[33.5px] top-[7px] w-[535px] bg-clip-text text-center text-[49px] font-medium leading-[60px] tracking-[-0.98px] text-transparent not-italic`}
              style={{
                backgroundImage: TITLE_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
              data-node-id="3974:606"
            >
              {heading}
            </h2>
            <CornerDecor />
          </div>
          <p
            className={`${interRegular.className} mt-[20px] w-[600px] text-center text-[14px] font-normal leading-[1.4] text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
            data-node-id="3974:611"
          >
            {subtitle}
          </p>
        </div>

        {/* Content row */}
        <div
          className="absolute left-[41.87px] top-[646px] flex w-[1356px] items-start justify-center gap-[10px] text-center text-white not-italic"
          data-node-id="3974:612"
        >
          {cards.map((card) => (
            <div
              key={card.nodeId}
              className={`flex shrink-0 flex-col items-center justify-center gap-[10px] p-[12px] ${
                card.wide ? "w-[276px]" : "w-[244px]"
              }`}
              data-node-id={card.nodeId}
              data-name="Content"
            >
              <p
                className={`${gilroyMedium.className} w-full text-center text-[22px] font-medium leading-[28px]`}
              >
                {card.title}
              </p>
              <p
                className={`${interRegular.className} w-full text-center text-[14px] font-normal leading-[21px] opacity-65`}
              >
                {renderBody(card.body)}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom lines (clipped by the frame, as in Figma) */}
        <div
          aria-hidden
          className="absolute left-[0.17px] top-[887px] flex h-0 w-[1418.317px] items-center justify-center"
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
          className="absolute left-[1071.39px] top-[885.99px] flex h-0 w-[347.107px] items-center justify-center"
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

        {/* Pedestal visuals (hover reveals glow + floating layers) */}
        <MicrowattVisual />
        <PhysicalVisual />
        <PersonalVisual />
        <Personal2Visual />
        <AirCooledVisual />

        {/* Options bar (interactive) */}
        <ContinuumOptionsBar />
      </div>

      {/* MOBILE (<1024px) — node 4032:5788, desktop above is untouched */}
      <div
        className="relative flex w-full flex-col items-center overflow-hidden min-[1024px]:hidden"
        data-node-id="4032:5788"
        data-name="Frame 1984079474"
      >
        <style>{`.cont-m-scroll::-webkit-scrollbar{display:none}.cont-m-scroll{scrollbar-width:none;-ms-overflow-style:none}`}</style>

        {/* Header: title + subtitle (node 4032:5792) */}
        <div
          className="mt-[29px] flex w-[350px] flex-col items-center gap-[10px]"
          data-node-id="4032:5792"
        >
          {/* Title with corner brackets (node 4032:5793) */}
          <div className="relative h-[79px] w-[353px]" data-node-id="4032:5793" data-name="Group 78">
            <h2
              className={`${gilroyMedium.className} absolute inset-0 flex items-center justify-center bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
              style={{
                backgroundImage:
                  "linear-gradient(107.453deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
              data-node-id="4032:5794"
            >
              {heading}
            </h2>

            {/* Top-right bracket (Vector 55) */}
            <div className="absolute left-[351.5px] top-[4px] flex h-[4px] w-[2.346px] items-center justify-center">
              <div className="flex-none rotate-180">
                <div className="relative h-[4px] w-[2.346px]">
                  <div className="absolute inset-[0_0_-12.5%_-21.31%]">
                    { }
                    <img alt="" aria-hidden src="/hero/corner-tag-2.svg" className="block size-full max-w-none" />
                  </div>
                </div>
              </div>
            </div>
            {/* Bottom-right bracket (Vector 56) */}
            <div className="absolute left-[351.5px] top-[75px] flex h-[4px] w-[2.346px] items-center justify-center">
              <div className="-scale-y-100 flex-none rotate-180">
                <div className="relative h-[4px] w-[2.346px]">
                  <div className="absolute inset-[0_0_-12.5%_-21.31%]">
                    { }
                    <img alt="" aria-hidden src="/hero/corner-tag-2.svg" className="block size-full max-w-none" />
                  </div>
                </div>
              </div>
            </div>
            {/* Bottom-left bracket (Vector 57) */}
            <div className="absolute left-[-1.5px] top-[75px] h-[4px] w-[2.346px]">
              <div className="absolute inset-[0_0_-12.5%_-21.31%]">
                { }
                <img alt="" aria-hidden src="/hero/corner-tag-1.svg" className="block size-full max-w-none" />
              </div>
            </div>
            {/* Top-left bracket (Vector 58) */}
            <div className="absolute left-[-1.5px] top-[4px] flex h-[4px] w-[2.346px] items-center justify-center">
              <div className="-scale-y-100 flex-none">
                <div className="relative h-[4px] w-[2.346px]">
                  <div className="absolute inset-[0_0_-12.5%_-21.31%]">
                    { }
                    <img alt="" aria-hidden src="/hero/corner-tag-1.svg" className="block size-full max-w-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subtitle (node 4032:5799) */}
          <p
            className={`${interRegular.className} w-[350px] text-center text-[14px] leading-[16px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
            data-node-id="4032:5799"
          >
            {subtitle}
          </p>
        </div>

        {/* Chip visual: horizontal scroll reusing the desktop pedestal visuals (node 4032:11892).
            The inner uses the desktop 1440x808 coordinate space, offset up to crop the dead top
            space so the pedestal staircase + labels fit a mobile-height band. */}
        <div
          className="cont-m-scroll relative mt-[13px] h-[540px] w-full overflow-x-auto overflow-y-hidden"
          data-node-id="4032:11892"
        >
          <div className="relative h-[808px] w-[1440px] -mt-[200px]">
            {/* Connector graphics between pedestals */}
            {[192.87, 472.87, 744.87, 1014.87].map((left) => (
              <div
                key={left}
                aria-hidden
                className="absolute top-[476px] h-[60px] w-[207px]"
                style={{ left }}
              >
                { }
                <img
                  alt=""
                  aria-hidden
                  src={CONNECTOR}
                  className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
                />
              </div>
            ))}

            {/* Pedestal visuals (base state; hover reveals are inert on touch) */}
            <MicrowattVisual />
            <PhysicalVisual />
            <PersonalVisual />
            <Personal2Visual />
            <AirCooledVisual />

            {/* Content labels row (node 3974:612) */}
            <div
              className="absolute left-[41.87px] top-[646px] flex w-[1356px] items-start justify-center gap-[10px] text-center text-white not-italic"
              data-node-id="3974:612"
            >
              {cards.map((card) => (
                <div
                  key={card.nodeId}
                  className={`flex shrink-0 flex-col items-center justify-center gap-[10px] p-[12px] ${
                    card.wide ? "w-[276px]" : "w-[244px]"
                  }`}
                  data-node-id={card.nodeId}
                  data-name="Content"
                >
                  <p
                    className={`${gilroyMedium.className} w-full text-center text-[22px] leading-[28px] font-medium`}
                  >
                    {card.title}
                  </p>
                  <p
                    className={`${interRegular.className} w-full text-center text-[14px] leading-[16px] font-normal text-[#f0f0f0]`}
                  >
                    {renderBody(card.body)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation arrows (node 4032:5855) — static, centered */}
        <div className="mt-[20px] flex gap-[20px]" data-node-id="4032:5855">
          <div className="relative size-[44px]">
            <Corners />
            <div className="absolute inset-0 flex items-center justify-center">
              { }
              <img alt="" aria-hidden src={NAV_ARROW_LEFT} className="size-[24px] max-w-none" />
            </div>
          </div>
          <div className="relative size-[44px]">
            <Corners />
            <div className="absolute inset-0 flex items-center justify-center">
              { }
              <img alt="" aria-hidden src={NAV_ARROW_RIGHT} className="size-[24px] max-w-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
