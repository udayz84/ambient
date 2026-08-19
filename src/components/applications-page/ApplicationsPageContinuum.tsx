"use client";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
const CARD_BG = "/applications/cont2-card-bg.svg";
const LINE_109 = "/applications/cont2-line-109.svg";
const CORNER_55 = "/applications/cont2-corner-55.svg";
const CORNER_57 = "/applications/cont2-corner-57.svg";

/* GPX10PRO — Microwatt (4611:3377) */
const MW_ICON = "/applications/cont3-mw-icon.png";
const MW_PEDESTAL = "/applications/cont3-mw-pedestal.png";
const MW_FLOAT = "/applications/cont3-mw-float.png";
const MW_CHIP_MASK = "/applications/cont3-mw-chip-mask.png";
const MW_CHIP_MARK = "/applications/cont3-mw-chip-mark.svg";
const MW_GLOW = "/applications/cont3-mw-ellipse-glow.svg";

/* GPX64 — Physical (4611:3876) */
const PH_ICON = "/applications/cont3-ph-icon.png";
const PH_PEDESTAL = "/applications/cont3-ph-pedestal.png";
const PH_FLOAT_A = "/applications/cont3-ph-float-a.png";
const PH_FLOAT_B = "/applications/cont3-ph-float-b.png";
const PH_CHIP_MASK = "/applications/cont3-ph-chip-mask.png";
const PH_CHIP_MARK = "/applications/cont3-ph-chip-mark.svg";
const PH_GLOW = "/applications/cont3-ph-ellipse-glow.svg";

/* GPX256 — Personal (4611:4816) */
const PS_ICON = "/applications/cont3-ps-icon.png";
const PS_PEDESTAL = "/applications/cont3-ps-pedestal.png";
const PS_FLOAT_A = "/applications/cont3-ps-float-a.png";
const PS_FLOAT_B = "/applications/cont3-ps-float-b.png";
const PS_CHIP_MASK = "/applications/cont3-ps-chip-mask.png";
const PS_CHIP_MARK = "/applications/cont3-ps-chip-mark.svg";
const PS_GLOW = "/applications/cont3-ps-ellipse-glow.svg";

/* GPX2000 — Personal2 (4647:7641) */
const P2_ICON = "/applications/cont3-p2-icon.png";
const P2_PEDESTAL = "/applications/cont3-p2-pedestal.png";
const P2_FLOAT = "/applications/cont3-p2-float.png";
const P2_CHIP_MASK = "/applications/cont3-p2-chip-mask.png";
const P2_CHIP_MARK = "/applications/cont3-p2-chip-mark.svg";
const P2_GLOW = "/applications/cont3-p2-ellipse-glow.svg";

/* GPX8000 — AirCooled (4647:9021) */
const AC_SERVER = "/applications/cont3-ac-server.png";
const AC_ICON = "/applications/cont3-ac-icon.png";
const AC_PEDESTAL = "/applications/cont3-ac-pedestal.png";
const AC_PEDESTAL_OVERLAY = "/applications/cont3-ac-pedestal-overlay.png";
const AC_CHIP_MASK = "/applications/cont3-ac-chip-mask.png";
const AC_CHIP_MARK = "/applications/cont3-ac-chip-mark.svg";
const AC_GLOW = "/applications/cont3-ac-ellipse-glow.svg";

/* Mobile navigation arrows */
const NAV_ARROW_LEFT = "/applications/nav-arrow-left.svg";
const NAV_ARROW_RIGHT = "/applications/nav-arrow-right.svg";

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

/* ------------------------------------------------------------------ */
/* GPX10PRO — Microwatt visual (Figma 4611:3377)                      */
/* ------------------------------------------------------------------ */
function MicrowattVisual() {
  return (
    <div
      className="pointer-events-none absolute left-[calc(50%-64.5px)] top-[166px] h-[520px] w-[610.48px] -translate-x-1/2 overflow-clip"
      data-node-id="4611:3427"
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
            src={MW_GLOW}
            className="block size-full max-w-none"
          />
        </div>
      </div>

      {/* Pedestal (Frame2147240764) */}
      <div className="pointer-events-none absolute left-[200px] top-[178px] h-[320px] w-[354.973px] overflow-clip">
        <img
          alt=""
          aria-hidden
          src={MW_PEDESTAL}
          className="absolute inset-0 size-full max-w-none object-contain"
        />
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
      </div>

      {/* Float (Frame2147240769) */}
      <div className="pointer-events-none absolute left-0 top-[124.6px] h-[338.914px] w-[270.799px]">
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
/* GPX64 — Physical visual (Figma 4611:3876)                          */
/* ------------------------------------------------------------------ */
function PhysicalVisual() {
  return (
    <div
      className="pointer-events-none absolute left-[calc(50%-0.31px)] top-[209px] h-[500px] w-[587.859px] -translate-x-1/2 overflow-clip"
      data-node-id="4611:4374"
      data-name="Physical"
    >
      {/* Glow ellipse (Ellipse16210) */}
      <div className="absolute left-[calc(50%+3.19px)] top-[400.48px] h-[43.131px] w-[258.786px] -translate-x-1/2">
        <div className="absolute inset-[-74.07%_-12.35%]">
          <img alt="" aria-hidden src={PH_GLOW} className="block size-full max-w-none" />
        </div>
      </div>

      {/* Icon (Frame2147240771) */}
      <div className="pointer-events-none absolute left-1/2 top-[4.79px] h-[188.498px] w-[150.16px] -translate-x-1/2">
        <img alt="" aria-hidden src={PH_ICON} className="absolute inset-0 size-full max-w-none object-contain" />
      </div>

      {/* Pedestal (Frame2147240773) */}
      <div className="pointer-events-none absolute left-[calc(50%-2.29px)] top-[130.36px] h-[339.286px] w-[340.417px] -translate-x-1/2 overflow-clip">
        <img alt="" aria-hidden src={PH_PEDESTAL} className="absolute inset-0 size-full max-w-none object-contain" />
        {/* Chip logo */}
        <div className="absolute left-[147.5px] top-[72.32px] h-[53.571px] w-[46.523px]">
          <div
            aria-hidden
            className="mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[26.053px_30px] absolute left-0 top-0 h-[53.571px] w-[46.523px] bg-white"
            style={{ maskImage: `url("${PH_CHIP_MASK}")` }}
          />
          <div className="absolute left-[9.87px] top-[14.1px] h-[26.786px] w-[23.966px]">
            <img alt="" aria-hidden src={PH_CHIP_MARK} className="absolute inset-0 block size-full max-w-none" />
          </div>
        </div>
      </div>

      {/* Float A (Frame2147240770) */}
      <div className="pointer-events-none absolute left-[3.19px] top-[20.77px] h-[127.796px] w-[183.706px]">
        <img alt="" aria-hidden src={PH_FLOAT_A} className="absolute inset-0 size-full max-w-none object-cover" />
      </div>

      {/* Float B (Frame2147240772) */}
      <div className="pointer-events-none absolute right-0 top-[27.16px] h-[143.77px] w-[170.927px]">
        <img alt="" aria-hidden src={PH_FLOAT_B} className="absolute inset-0 size-full max-w-none object-cover" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* GPX256 — Personal visual (Figma 4611:4816)                         */
/* ------------------------------------------------------------------ */
function PersonalVisual() {
  return (
    <div
      className="pointer-events-none absolute left-[calc(50%+2.14px)] top-[204px] h-[520px] w-[524.274px] -translate-x-1/2 overflow-clip"
      data-node-id="4611:5757"
      data-name="Personal"
    >
      {/* Glow ellipse (Ellipse16210) */}
      <div className="absolute left-[calc(50%+0.11px)] top-[405.93px] h-[41.315px] w-[236.493px] -translate-x-1/2">
        <div className="absolute inset-[-68.97%_-12.05%]">
          <img alt="" aria-hidden src={PS_GLOW} className="block size-full max-w-none" />
        </div>
      </div>

      {/* Icon (Frame2147240771) */}
      <div className="pointer-events-none absolute left-[calc(50%+0.47px)] top-[33.86px] h-[168.11px] w-[133.918px] -translate-x-1/2">
        <img alt="" aria-hidden src={PS_ICON} className="absolute inset-0 size-full max-w-none object-contain" />
      </div>

      {/* Pedestal (Frame2147240773) */}
      <div className="pointer-events-none absolute left-[calc(50%-1.12px)] top-[148.13px] h-[325px] w-[326.083px] -translate-x-1/2 overflow-clip">
        <img alt="" aria-hidden src={PS_PEDESTAL} className="absolute inset-0 size-full max-w-none object-contain" />
        {/* Chip logo */}
        <div className="absolute left-[calc(50%-0.58px)] top-[calc(50%-64.98px)] h-[45.882px] w-[39.845px] -translate-x-1/2 -translate-y-1/2">
          <div
            aria-hidden
            className="mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[39.845px_45.883px] mask-position-[0.118px_0.059px] absolute left-0 top-0 h-[45.882px] w-[39.845px] bg-white"
            style={{ maskImage: `url("${PS_CHIP_MASK}")` }}
          />
          <div className="absolute left-[8.45px] top-[12.07px] h-[22.941px] w-[20.526px]">
            <img alt="" aria-hidden src={PS_CHIP_MARK} className="absolute inset-0 block size-full max-w-none" />
          </div>
        </div>
      </div>

      {/* Float A (Frame2147240770) */}
      <div className="pointer-events-none absolute left-[2.85px] top-[34.27px] h-[136.767px] w-[163.836px]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img alt="" aria-hidden src={PS_FLOAT_A} className="absolute left-0 top-[-7.81%] h-[119.79%] w-full max-w-none" />
        </div>
      </div>

      {/* Float B (Frame2147240772) */}
      <div className="pointer-events-none absolute right-[4.86px] top-[44.25px] h-[115.397px] w-[136.553px]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img alt="" aria-hidden src={PS_FLOAT_B} className="absolute left-[-53%] top-[-0.31%] h-[176.67%] w-[222.9%] max-w-none" />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* GPX2000 — Personal2 visual (Figma 4647:7641)                       */
/* ------------------------------------------------------------------ */
function Personal2Visual() {
  return (
    <div
      className="pointer-events-none absolute left-[calc(50%+2.21px)] top-[185px] h-[520px] w-[524.274px] -translate-x-1/2 overflow-clip"
      data-node-id="4647:8581"
      data-name="Personal 2"
    >
      {/* Glow ellipse (Ellipse16210) */}
      <div className="absolute left-[calc(50%+3.32px)] top-[436.82px] h-[41.315px] w-[236.493px] -translate-x-1/2">
        <div className="absolute inset-[-68.97%_-12.05%]">
          <img alt="" aria-hidden src={P2_GLOW} className="block size-full max-w-none" />
        </div>
      </div>

      {/* Icon (Frame2147240775) */}
      <div className="pointer-events-none absolute left-[calc(50%+1.46px)] top-[59.65px] h-[161.443px] w-[128.607px] -translate-x-1/2">
        <img alt="" aria-hidden src={P2_ICON} className="absolute inset-0 size-full max-w-none object-contain" />
      </div>

      {/* Pedestal (Frame2147240766) */}
      <div className="pointer-events-none absolute left-[calc(50%+0.42px)] top-[159.06px] h-[336.471px] w-[337.592px] -translate-x-1/2 overflow-clip">
        <img alt="" aria-hidden src={P2_PEDESTAL} className="absolute inset-0 size-full max-w-none object-contain" />
        {/* Chip logo */}
        <div className="absolute left-[calc(50%+0.85px)] top-[calc(50%-65.24px)] h-[45.882px] w-[39.845px] -translate-x-1/2 -translate-y-1/2">
          <div
            aria-hidden
            className="mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[39.845px_45.883px] mask-position-[0.118px_0.059px] absolute left-0 top-0 h-[45.882px] w-[39.845px] bg-white"
            style={{ maskImage: `url("${P2_CHIP_MASK}")` }}
          />
          <div className="absolute left-[8.45px] top-[12.07px] h-[22.941px] w-[20.526px]">
            <img alt="" aria-hidden src={P2_CHIP_MARK} className="absolute inset-0 block size-full max-w-none" />
          </div>
        </div>
      </div>

      {/* Float (Frame2147240770) */}
      <div className="pointer-events-none absolute right-[9.22px] top-[45.33px] h-[150px] w-[179.687px]">
        <img alt="" aria-hidden src={P2_FLOAT} className="absolute inset-0 size-full max-w-none object-cover" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* GPX8000 — AirCooled visual (Figma 4647:9021)                       */
/* ------------------------------------------------------------------ */
function AirCooledVisual() {
  return (
    <div
      className="pointer-events-none absolute left-[calc(50%+2.21px)] top-[185px] h-[520px] w-[524.274px] -translate-x-1/2"
      data-node-id="4647:9070"
      data-name="Personal 2"
    >
      {/* Server image (Frame2147240772) */}
      <div className="pointer-events-none absolute right-[-65.8px] top-[45px] h-[267.628px] w-[317.442px]">
        <img alt="" aria-hidden src={AC_SERVER} className="absolute inset-0 size-full max-w-none object-cover" />
      </div>

      {/* Glow ellipse (Ellipse16210) */}
      <div className="absolute left-[calc(50%+3.32px)] top-[436.82px] h-[41.315px] w-[236.493px] -translate-x-1/2">
        <div className="absolute inset-[-68.97%_-12.05%]">
          <img alt="" aria-hidden src={AC_GLOW} className="block size-full max-w-none" />
        </div>
      </div>

      {/* Icon (Frame2147240775) */}
      <div className="pointer-events-none absolute left-[calc(50%+1.46px)] top-[59.65px] h-[161.443px] w-[128.607px] -translate-x-1/2">
        <img alt="" aria-hidden src={AC_ICON} className="absolute inset-0 size-full max-w-none object-contain" />
      </div>

      {/* Pedestal (Frame2147240766 + Frame2147240767 overlay) */}
      <div className="pointer-events-none absolute left-[calc(50%+0.42px)] top-[159.06px] h-[336.471px] w-[337.592px] -translate-x-1/2 overflow-clip">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <img alt="" aria-hidden src={AC_PEDESTAL} className="absolute inset-0 size-full max-w-none object-contain" />
          <img alt="" aria-hidden src={AC_PEDESTAL_OVERLAY} className="absolute inset-0 size-full max-w-none object-contain" />
        </div>
        {/* Chip logo */}
        <div className="absolute left-[calc(50%+0.85px)] top-[calc(50%-65.24px)] h-[45.882px] w-[39.845px] -translate-x-1/2 -translate-y-1/2">
          <div
            aria-hidden
            className="mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[39.845px_45.883px] mask-position-[0.118px_0.059px] absolute left-0 top-0 h-[45.882px] w-[39.845px] bg-white"
            style={{ maskImage: `url("${AC_CHIP_MASK}")` }}
          />
          <div className="absolute left-[8.45px] top-[12.07px] h-[22.941px] w-[20.526px]">
            <img alt="" aria-hidden src={AC_CHIP_MARK} className="absolute inset-0 block size-full max-w-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

const VISUALS = [
  MicrowattVisual,
  PhysicalVisual,
  PersonalVisual,
  Personal2Visual,
  AirCooledVisual,
];

/* Preload every product image so switching is instant (no flash) */
const ALL_VISUAL_IMAGES = [
  MW_ICON, MW_PEDESTAL, MW_FLOAT, MW_CHIP_MARK, MW_GLOW,
  PH_ICON, PH_PEDESTAL, PH_FLOAT_A, PH_FLOAT_B, PH_CHIP_MARK, PH_GLOW,
  PS_ICON, PS_PEDESTAL, PS_FLOAT_A, PS_FLOAT_B, PS_CHIP_MARK, PS_GLOW,
  P2_ICON, P2_PEDESTAL, P2_FLOAT, P2_CHIP_MARK, P2_GLOW,
  AC_SERVER, AC_ICON, AC_PEDESTAL, AC_PEDESTAL_OVERLAY, AC_CHIP_MARK, AC_GLOW,
];

/* ------------------------------------------------------------------ */
/* Main component                                                     */
/* ------------------------------------------------------------------ */
export function ApplicationsPageContinuum({ data }: { data?: any }) {
  const [selected, setSelected] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  /* Mobile: start the 1440px canvas centered so the product (canvas x≈720)
     is in view — the visual is authored in desktop coordinates. */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const center = () => {
      el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
    };
    center();
    window.addEventListener("resize", center);
    return () => window.removeEventListener("resize", center);
  }, []);

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

        {/* --- Options bar (interactive) — 1244px centered = left 98 on 1440 --- */}
        <div className="absolute left-1/2 top-[166px] -translate-x-1/2">
          <ContinuumOptionsBar selected={selected} onSelect={setSelected} />
        </div>

        {/* --- Product visual (crossfade on switch) --- */}
        <AnimatePresence initial={false}>
          <motion.div
            key={selected}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-0"
          >
            <Visual />
          </motion.div>
        </AnimatePresence>

        {/* --- Card (content crossfades with selection) --- */}
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
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="absolute left-1/2 top-[calc(50%+1px)] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-[10px] p-[12px] text-center text-white not-italic"
            >
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
            </motion.div>
          </AnimatePresence>
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

        {/* Options bar — horizontally scrollable (1244px content) */}
        <div
          className="cont-m-scroll relative z-10 mt-[24px] w-full overflow-x-auto"
          data-node-id="4032:5790"
        >
          <div className="w-[1244px]">
            <ContinuumOptionsBar selected={selected} onSelect={setSelected} />
          </div>
        </div>

        {/* Product visual — window into the 1440×808 canvas (y 166→710) */}
        <div
          ref={scrollRef}
          className="cont-m-scroll relative h-[544px] w-full overflow-x-auto overflow-y-hidden"
          data-node-id="4032:11892"
        >
          <div
            className="absolute left-0 top-0 h-[808px] w-[1440px]"
            style={{ transform: "translateY(-166px)" }}
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={selected}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="pointer-events-none absolute inset-0"
              >
                <Visual />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Card (below the visual — always fully visible) */}
        <div className="relative z-10 mt-[8px] flex w-full justify-center px-[21px]">
          <div
            className="relative h-[147px] w-[325px] shrink-0"
            data-node-id="4574:7589"
            data-name="cARD"
          >
            <div className="absolute left-[0.79px] top-[0.89px] h-[146.11px] w-[323.807px]">
              <img alt="" aria-hidden src={CARD_BG} className="absolute inset-0 block size-full max-w-none" />
            </div>
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="absolute left-1/2 top-[calc(50%+1px)] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-[10px] p-[12px] text-center text-white not-italic"
              >
                <p className={`${gilroyMedium.className} min-w-full w-[min-content] text-[26px] font-medium leading-[29px]`}>
                  {activeCard.title}
                </p>
                <p className={`${interRegular.className} w-[244px] text-[16px] font-normal leading-[24px] opacity-65`}>
                  {renderBody(activeCard.body)}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation arrows */}
        <div className="relative z-10 mt-[20px] flex gap-[20px] pb-[40px]" data-node-id="4032:5855">
          <button type="button" onClick={scrollLeft} className="relative size-[44px] shrink-0 cursor-pointer" aria-label="Previous">
            <img src={NAV_ARROW_LEFT} alt="" className="block size-full max-w-none" aria-hidden />
          </button>
          <button type="button" onClick={scrollRight} className="relative size-[44px] shrink-0 cursor-pointer" aria-label="Next">
            <img src={NAV_ARROW_RIGHT} alt="" className="block size-full max-w-none" aria-hidden />
          </button>
        </div>
      </div>

      {/* Preload all product images so switching is instant */}
      <div className="hidden" aria-hidden="true">
        {ALL_VISUAL_IMAGES.map((src, i) => (
          <img key={i} src={src} alt="" />
        ))}
      </div>
    </section>
  );
}
