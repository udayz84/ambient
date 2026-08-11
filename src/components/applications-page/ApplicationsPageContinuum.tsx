"use client";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from "react";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { ContinuumOptionsBar } from "./ContinuumOptionsBar";

const TITLE_GRADIENT =
  "linear-gradient(119.973deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

const SUBTITLE =
  "A unified analog architecture, scaled for your exact power and performance needs.";

const FALLBACK_HEADING = "The Ambient Continuum.";

/* --- New assets (downloaded from Figma 4574:7538) --- */
const BG_IMAGE = "/applications/cont2-bg.png";
const POLY_OVERLAY = "/applications/cont2-poly.svg";
const ELLIPSE_BIG = "/applications/cont2-ellipse-big.svg";
const ELLIPSE_GLOW = "/applications/cont2-ellipse-glow.svg";
const CARD_BG = "/applications/cont2-card-bg.svg";
const LINE_109 = "/applications/cont2-line-109.svg";
const CORNER_55 = "/applications/cont2-corner-55.svg";
const CORNER_57 = "/applications/cont2-corner-57.svg";

/* Microwatt (GPX10PRO) assets */
const MW_ICON = "/applications/cont2-mw-icon.png";
const MW_PEDESTAL = "/applications/cont2-mw-pedestal.png";
const MW_FLOAT = "/applications/cont2-mw-float.png";
const MW_CHIP_MASK = "/applications/cont2-chip-mask.png";
const MW_CHIP_MARK = "/applications/cont2-chip-mark.svg";

/* Legacy pedestal assets for other products */
const NAV_ARROW_LEFT = "/applications/nav-arrow-left.svg";
const NAV_ARROW_RIGHT = "/applications/nav-arrow-right.svg";

/* Center anchor for all product visuals (matches Microwatt centre in Figma) */
const VISUAL_CENTER_X = 655.5;
const VISUAL_CENTER_Y = 418;

type ProductCard = {
  title: string;
  body: string;
};

const FALLBACK_CARDS: ProductCard[] = [
  { title: "GPX10PRO", body: "Always-on intelliegence for wearabes, audio & battery IoT." },
  { title: "GPX64", body: "Real-time perception & control for robots, drones & smart machines" },
  { title: "GPX256", body: "Private, local AI compute for creators, developers & businesses" },
  { title: "GPX2000", body: "Private, local AI compute for creators, developers & businesses" },
  { title: "GPX8000", body: "Always-on intelliegence for wearabes, audio & battery IoT." },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

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

/* Always-visible glow under pedestal */
function StaticGlow({
  className,
  blur,
}: {
  className: string;
  blur: number;
}) {
  return (
    <div
      aria-hidden
      className={`absolute rounded-[50%] ${className}`}
      style={{
        background:
          "linear-gradient(to top, #81D713 0%, #CFF86C 50%, #FBFCF8 100%)",
        filter: `blur(${blur}px)`,
      }}
    />
  );
}

/* Pedestal wrapper */
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

/* Chip logo at original (small) size — used inside scaled legacy visuals */
function ChipLogoSmall({
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

/* ------------------------------------------------------------------ */
/* GPX10PRO — Microwatt visual (EXACT Figma 4574:7588)                */
/* ------------------------------------------------------------------ */
function MicrowattVisual() {
  return (
    <div
      className="absolute left-[350.26px] top-[158px] h-[520px] w-[610.48px] overflow-clip"
      data-node-id="4574:7588"
      data-name="Microwatt"
    >
      {/* Icon (Frame2147240770) */}
      <div className="pointer-events-none absolute left-[297.38px] top-[34.89px] h-[196.038px] w-[156.166px]">
        <img
          alt=""
          aria-hidden
          src={MW_ICON}
          className="absolute inset-0 size-full max-w-none object-contain"
        />
      </div>

      {/* Glow ellipse (Ellipse16210) */}
      <div className="absolute left-[257.51px] top-[440.93px] h-[41.534px] w-[232.588px]">
        <div className="absolute inset-[-80%_-14.29%]">
          <img
            alt=""
            aria-hidden
            src={ELLIPSE_GLOW}
            className="block size-full max-w-none"
          />
        </div>
      </div>

      {/* Pedestal (Frame2147240764) */}
      <Pedestal
        className="left-[200px] top-[178px] h-[320px] w-[354.973px]"
        src={MW_PEDESTAL}
      >
        {/* Chip logo (Rectangle1618873643 mask + Image3Vectorized mark) */}
        <div className="absolute left-[152px] top-[54px] h-[60px] w-[52.105px]">
          <div
            aria-hidden
            className="mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[26.053px_30px] absolute left-0 top-0 h-[60px] w-[52.105px] bg-white"
            style={{ maskImage: `url("${MW_CHIP_MASK}")` }}
          />
          <div className="absolute left-[11.05px] top-[15.79px] h-[30px] w-[26.842px]">
            <img
              alt=""
              aria-hidden
              src={MW_CHIP_MARK}
              className="absolute inset-0 block size-full max-w-none"
            />
          </div>
        </div>
      </Pedestal>

      {/* Float (Frame2147240769) */}
      <div className="absolute left-0 top-[124.6px] h-[338.914px] w-[270.799px]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            alt=""
            aria-hidden
            src={MW_FLOAT}
            className="absolute left-[8.53%] top-[-5.39%] h-[114.71%] w-[81.71%] max-w-none"
          />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Legacy product visuals — centered & scaled to match Microwatt      */
/* ------------------------------------------------------------------ */

function CenteredVisual({
  w,
  h,
  scale,
  children,
}: {
  w: number;
  h: number;
  scale: number;
  children: React.ReactNode;
}) {
  const left = VISUAL_CENTER_X - w / 2;
  const top = VISUAL_CENTER_Y - h / 2;
  return (
    <div
      className="absolute overflow-clip"
      style={{
        left: `${left}px`,
        top: `${top}px`,
        width: `${w}px`,
        height: `${h}px`,
        transform: `scale(${scale})`,
        transformOrigin: "center center",
      }}
    >
      {children}
    </div>
  );
}

/* GPX64 — Physical (old 320.944×272.977, scale 1.684) */
function PhysicalVisual() {
  return (
    <CenteredVisual w={320.944} h={272.977} scale={1.684}>
      <StaticGlow className="left-1/2 top-[235.27px] h-[24.153px] w-[144.92px] -translate-x-1/2" blur={8.72} />
      <div className="pointer-events-none absolute left-1/2 top-[2.68px] h-[105.559px] w-[84.089px] -translate-x-1/2">
        <img alt="" aria-hidden src="/applications/cont-ph-icon.png" className="absolute inset-0 size-full max-w-none object-contain" />
      </div>
      <Pedestal className="left-[calc(50%-1.28px)] top-[73px] h-[190px] w-[190.633px] -translate-x-1/2" src="/applications/cont-ph-pedestal.png">
        <ChipLogoSmall className="left-[82.6px] top-[40.5px]" maskSrc="/applications/cont-chip-mask-b.png" markSrc="/applications/cont-chip-mark-b.svg" />
      </Pedestal>
      <div aria-hidden className="absolute left-[29.68px] top-[39.52px] h-[71.565px] w-[102.875px]">
        <img alt="" aria-hidden src="/applications/cont-ph-float-a.png" className="absolute inset-0 size-full max-w-none" />
      </div>
      <div aria-hidden className="absolute right-[17.89px] top-[23.1px] h-[80.511px] w-[95.719px]">
        <img alt="" aria-hidden src="/applications/cont-ph-float-b.png" className="absolute inset-0 size-full max-w-none" />
      </div>
    </CenteredVisual>
  );
}

/* GPX256 — Personal (old 333.518×330.799, scale 1.506) */
function PersonalVisual() {
  return (
    <CenteredVisual w={333.518} h={330.799} scale={1.506}>
      <StaticGlow className="left-[calc(50%+1.86px)] top-[293.42px] h-[27.014px] w-[154.63px] -translate-x-1/2" blur={9.06} />
      <div className="pointer-events-none absolute left-1/2 top-[32.6px] h-[109.918px] w-[87.562px] -translate-x-1/2">
        <img alt="" aria-hidden src="/applications/cont-ps-icon.png" className="absolute inset-0 size-full max-w-none object-contain" />
      </div>
      <Pedestal className="bottom-[20.19px] left-[calc(50%-1.04px)] h-[212.5px] w-[213.208px] -translate-x-1/2" src="/applications/cont-ps-pedestal.png">
        <ChipLogoSmall className="left-[calc(50%+0.04px)] top-[calc(50%-43.06px)] -translate-x-1/2 -translate-y-1/2" maskSrc="/applications/cont-chip-mask-c.png" markSrc="/applications/cont-chip-mark-c.svg" />
      </Pedestal>
      <div aria-hidden className="absolute left-[31.86px] top-[32.79px] h-[89.425px] w-[107.123px]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img alt="" aria-hidden src="/applications/cont-ps-float-a.png" className="absolute left-0 top-[-7.81%] h-[119.79%] w-full max-w-none" />
        </div>
      </div>
      <div aria-hidden className="absolute right-[7.78px] top-[39.31px] h-[75.452px] w-[89.425px]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img alt="" aria-hidden src="/applications/cont-ps-float-b.png" className="absolute left-[-53%] top-[-0.31%] h-[176.67%] w-[222.9%] max-w-none" />
        </div>
      </div>
    </CenteredVisual>
  );
}

/* GPX2000 — Personal2 (old 342.795×340, scale 1.455) */
function Personal2Visual() {
  return (
    <CenteredVisual w={342.795} h={340} scale={1.455}>
      <StaticGlow className="left-[calc(50%+1.86px)] top-[293.42px] h-[27.014px] w-[154.63px] -translate-x-1/2" blur={9.32} />
      <div className="pointer-events-none absolute left-[calc(50%+0.65px)] top-[39px] h-[105.559px] w-[84.089px] -translate-x-1/2">
        <img alt="" aria-hidden src="/applications/cont-p2-icon.png" className="absolute inset-0 size-full max-w-none object-contain" />
      </div>
      <Pedestal className="bottom-[16px] left-[calc(50%-0.03px)] h-[220px] w-[220.733px] -translate-x-1/2" src="/applications/cont-p2-pedestal.png">
        <ChipLogoSmall className="left-[calc(50%+0.06px)] top-[calc(50%-42.5px)] -translate-x-1/2 -translate-y-1/2" maskSrc="/applications/cont-chip-mask-a.png" markSrc="/applications/cont-chip-mark-a.svg" />
      </Pedestal>
      <div aria-hidden className="absolute right-[48.67px] top-[45px] h-[89.425px] w-[107.123px]">
        <img alt="" aria-hidden src="/applications/cont-p2-float.png" className="absolute inset-0 size-full max-w-none" />
      </div>
    </CenteredVisual>
  );
}

/* GPX8000 — AirCooled (old 359.442×420, scale 1.28) */
function AirCooledVisual() {
  return (
    <CenteredVisual w={359.442} h={420} scale={1.28}>
      <div aria-hidden className="absolute left-[calc(50%+0.12px)] top-[calc(50%-61.72px)] h-[267.628px] w-[317.442px] -translate-x-1/2 -translate-y-1/2">
        <img alt="" aria-hidden src="/applications/cont-ac-server.png" className="absolute inset-0 size-full max-w-none" />
      </div>
      <StaticGlow className="left-[calc(50%+1.95px)] top-[276.42px] h-[28.326px] w-[162.14px] -translate-x-1/2" blur={9.77} />
      <div className="pointer-events-none absolute left-1/2 top-[66.42px] h-[115.256px] w-[91.814px] -translate-x-1/2">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img alt="" aria-hidden src="/applications/cont-ac-icon.png" className="absolute left-[-3.97%] top-[-6.42%] h-[112.84%] w-[107.45%] max-w-none" />
        </div>
      </div>
      <Pedestal className="bottom-[37px] left-[calc(50%+0.7px)] h-[250px] w-[250.833px] -translate-x-1/2" src="/applications/cont-ac-pedestal.png">
        <ChipLogoSmall className="left-[calc(50%+2.33px)] top-[calc(50%-48px)] -translate-x-1/2 -translate-y-1/2" maskSrc="/applications/cont-chip-mask-a.png" markSrc="/applications/cont-chip-mark-a.svg" />
      </Pedestal>
    </CenteredVisual>
  );
}

const VISUALS = [
  MicrowattVisual,
  PhysicalVisual,
  PersonalVisual,
  Personal2Visual,
  AirCooledVisual,
];

/* ------------------------------------------------------------------ */
/* Main component                                                     */
/* ------------------------------------------------------------------ */
export function ApplicationsPageContinuum({ data }: { data?: any }) {
  const [selected, setSelected] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -340, behavior: "smooth" });
  };
  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 340, behavior: "smooth" });
  };

  const heading = data?.heading || FALLBACK_HEADING;
  const subtitle = data?.subtitle || SUBTITLE;

  const rawCards = Array.isArray(data?.cards) ? data.cards : [];
  const cards: ProductCard[] =
    rawCards.length > 0
      ? rawCards.map((c: any) => ({ title: c?.title || "", body: c?.body || "" }))
      : FALLBACK_CARDS;

  const activeCard = cards[selected] || FALLBACK_CARDS[selected];
  const Visual = VISUALS[selected] || MicrowattVisual;

  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-black"
      data-node-id="4574:7538"
      data-name="Desktop - 12"
      aria-label="The Ambient Continuum"
    >
      {/* ============= DESKTOP (>=1024px) ============= */}
      <div className="relative hidden h-[808px] w-full max-w-[1440px] min-[1024px]:block">
        {/* --- Background image + radial gradient (image 29) --- */}
        <div
          aria-hidden
          className="absolute h-[646.545px] w-[1450.195px]"
          style={{ left: "50%", top: "179.73px", transform: "translateX(-50%)" }}
        >
          <img
            alt=""
            src={BG_IMAGE}
            className="absolute inset-0 size-full max-w-none object-bottom"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 50% 50% at 50% 44.3%, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
            }}
          />
        </div>

        {/* --- Polygon overlay (Group 47) --- */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-[-76px] top-[236px] h-[588px] w-[1560px]"
        >
          <div className="absolute inset-[-17.01%_-6.41%]">
            <img
              alt=""
              src={POLY_OVERLAY}
              className="block size-full max-w-none"
            />
          </div>
        </div>

        {/* --- Large ellipse (Ellipse16209) --- */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[calc(50%+96px)] h-[528px] w-[1007px] -translate-x-1/2 -translate-y-1/2"
        >
          <div className="absolute inset-[-23.6%_-12.37%]">
            <img
              alt=""
              src={ELLIPSE_BIG}
              className="block size-full max-w-none"
            />
          </div>
        </div>

        {/* --- Title section (Group 78) --- */}
        <div
          className="absolute left-1/2 top-[27px] flex w-[607px] -translate-x-1/2 flex-col items-center"
          data-node-id="4574:7544"
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
              data-node-id="4574:7545"
            >
              {heading}
            </h2>
            <Corners leftSrc={CORNER_57} rightSrc={CORNER_55} />
          </div>
          <p
            className={`${interRegular.className} mt-[20px] w-[600px] text-center text-[14px] font-normal leading-[1.4] text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
            data-node-id="4574:7550"
          >
            {subtitle}
          </p>
        </div>

        {/* --- Options bar (interactive) --- */}
        <ContinuumOptionsBar selected={selected} onSelect={setSelected} />

        {/* --- Product visual (switches with selection) --- */}
        <Visual />

        {/* --- Card (content switches with selection) --- */}
        <div
          className="absolute left-1/2 top-[642px] h-[147px] w-[325px] -translate-x-1/2"
          data-node-id="4574:7589"
          data-name="cARD"
        >
          <div className="absolute left-[0.79px] top-[0.89px] h-[146.11px] w-[323.807px]">
            <img
              alt=""
              aria-hidden
              src={CARD_BG}
              className="absolute inset-0 block size-full max-w-none"
            />
          </div>
          <div className="absolute left-1/2 top-[calc(50%+1px)] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-[10px] p-[12px] text-center text-white not-italic">
            <p
              className={`${gilroyMedium.className} min-w-full w-[min-content] text-[26px] font-medium leading-[29px]`}
              data-node-id="4574:7592"
            >
              {activeCard.title}
            </p>
            <p
              className={`${interRegular.className} w-[244px] text-[16px] font-normal leading-[24px] opacity-65`}
              data-node-id="4574:7593"
            >
              {renderBody(activeCard.body)}
            </p>
          </div>
        </div>

        {/* --- Line 109 (bottom-right angled line) --- */}
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
      </div>

      {/* ============= MOBILE (<1024px) ============= */}
      <div
        className="relative flex w-full flex-col items-center overflow-hidden min-[1024px]:hidden"
        data-node-id="4032:5788"
        data-name="Frame 1984079474"
      >
        <style>{`.cont-m-scroll::-webkit-scrollbar{display:none}.cont-m-scroll{scrollbar-width:none;-ms-overflow-style:none}`}</style>

        {/* Bottom background strip */}
        <div
          className="pointer-events-none absolute bottom-0 left-[calc(50%+30px)] flex h-[341px] w-[1441px] -translate-x-1/2 items-center justify-center overflow-hidden"
          aria-hidden
        >
          <div className="-scale-y-100">
            <img src="/applications/dvk-bottom.png" alt="" className="h-[341px] w-[1441px] object-cover" />
          </div>
        </div>

        {/* Header: title + subtitle */}
        <div
          className="relative z-10 mt-[29px] flex w-[350px] flex-col items-center gap-[10px]"
          data-node-id="4032:5792"
        >
          <div className="relative h-[79px] w-[353px]" data-node-id="4032:5793" data-name="Group 78">
            <h2
              className={`${gilroyMedium.className} absolute inset-0 flex items-center justify-center bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
              style={{
                backgroundImage: TITLE_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
              data-node-id="4032:5794"
            >
              {heading}
            </h2>
            <Corners leftSrc={CORNER_57} rightSrc={CORNER_55} />
          </div>
          <p
            className={`${interRegular.className} w-[350px] text-center text-[14px] leading-[16px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
            data-node-id="4032:5799"
          >
            {subtitle}
          </p>
        </div>

        {/* Horizontal scroll for desktop visual */}
        <div
          ref={scrollRef}
          className="cont-m-scroll relative h-[490px] w-full overflow-x-auto overflow-y-hidden"
          data-node-id="4032:11892"
        >
          <div className="relative h-[808px] w-[1440px]">
            <Visual />
            {/* Card on mobile */}
            <div
              className="absolute left-1/2 top-[642px] h-[147px] w-[325px] -translate-x-1/2"
              data-node-id="4574:7589"
              data-name="cARD"
            >
              <div className="absolute left-[0.79px] top-[0.89px] h-[146.11px] w-[323.807px]">
                <img alt="" aria-hidden src={CARD_BG} className="absolute inset-0 block size-full max-w-none" />
              </div>
              <div className="absolute left-1/2 top-[calc(50%+1px)] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-[10px] p-[12px] text-center text-white not-italic">
                <p className={`${gilroyMedium.className} min-w-full w-[min-content] text-[26px] font-medium leading-[29px]`}>
                  {activeCard.title}
                </p>
                <p className={`${interRegular.className} w-[244px] text-[16px] font-normal leading-[24px] opacity-65`}>
                  {renderBody(activeCard.body)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation arrows */}
        <div className="mt-[20px] flex gap-[20px]" data-node-id="4032:5855">
          <button type="button" onClick={scrollLeft} className="relative size-[44px] shrink-0 cursor-pointer" aria-label="Previous">
            <img src={NAV_ARROW_LEFT} alt="" className="block size-full max-w-none" aria-hidden />
          </button>
          <button type="button" onClick={scrollRight} className="relative size-[44px] shrink-0 cursor-pointer" aria-label="Next">
            <img src={NAV_ARROW_RIGHT} alt="" className="block size-full max-w-none" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}
