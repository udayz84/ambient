import { gilroyMedium, interLight, interMedium, interRegular } from "../hero/fonts";
import { GradientTitle } from "../contact/contact-shared";
import { MobileTitleCorners } from "./mobile-shared";

const TITLE_GRADIENT_DEG = "114.359deg";
const FALLBACK_SUBTITLE =
  "The same chip, tuned to the job — from a wrist to a factory floor.";
const FALLBACK_HEADING =
  "The efficiency gap isn’t a few\npercent. It’s a different category.";

const HEADERS = ["Rank", "Architecture", "Power", "Area", "The Trade - off"];

type RowIcon = "check" | "warning" | "heat" | "x";
type RowImage = "acube" | "flash" | "gpu" | "mcu";

type RankRow = {
  rank: string;
  name: string;
  highlighted: boolean;
  sub: string;
  power: string;
  powerBar: number;
  area: string;
  areaBar: number;
  tradeoff: string;
  icon: RowIcon;
  image: RowImage;
};

const ROWS: RankRow[] = [
  {
    rank: "1",
    name: "A cube",
    highlighted: true,
    sub: "Analog digital in memory",
    power: "~30 TOPS/W",
    powerBar: 170.951,
    area: "~5 TOPS/mm",
    areaBar: 170.951,
    tradeoff: "None",
    icon: "check",
    image: "acube",
  },
  {
    rank: "2",
    name: "Flash",
    highlighted: false,
    sub: "Compute in memeory",
    power: "~5 TOPS/W",
    powerBar: 56.883,
    area: "~1 TOPS/mm",
    areaBar: 35.014,
    tradeoff: "Model Lock In",
    icon: "warning",
    image: "flash",
  },
  {
    rank: "3",
    name: "GPU",
    highlighted: false,
    sub: "Paralle SMO",
    power: "~30 TOPS/W",
    powerBar: 35.014,
    area: "~0.5 TOPS/mm",
    areaBar: 19.654,
    tradeoff: "Too-hot",
    icon: "heat",
    image: "gpu",
  },
  {
    rank: "4",
    name: "MCU",
    highlighted: false,
    sub: "Analog digital in memory",
    power: "~30 TOPS/W",
    powerBar: 11.791,
    area: "~0.1 TOPS/mm",
    areaBar: 14.406,
    tradeoff: "Not built for AI",
    icon: "x",
    image: "mcu",
  },
];

/* Row vertical anchors inside the 1166x468 panel (Figma 3508:615). */
const ROW_TOP = [89.93, 183.15, 276.38, 369.6];
const BADGE_TOP = [93.66, 186.89, 280.11, 373.33];
const SUB_TOP = [130.93, 224.15, 317.37, 410.59];
const BAR_TOP = [124, 217.22, 310.44, 403.66];
const TRADE_TOP = [100.5, 193.15, 278.38, 375.6];
const TRADE_LEFT = [909.95, 906.95, 907.95, 906.95];
const LINE_TOP = [159.22, 252.44, 345.66];

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 0C4.5014 0 0 4.50119 0 10C0 15.4988 4.50119 20 10 20C15.4988 20 20 15.4988 20 10C20 4.50119 15.4988 0 10 0ZM13.6482 6.42593C14.2049 5.79661 15.1614 6.6421 14.6047 7.27226L9.04011 13.573C8.79889 13.8451 8.37739 13.8618 8.11699 13.6072L8.11615 13.608L5.4286 10.9797C4.82515 10.3912 5.71823 9.47646 6.32001 10.0632L8.52851 12.2232L13.6482 6.42593Z"
        fill="#53D824"
      />
    </svg>
  );
}

function WarningIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 22.3826 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M21.9168 16.557L13.1749 1.4193C12.6287 0.472353 11.9101 0 11.1893 0C10.4684 0 9.74982 0.472353 9.20359 1.4193L0.472894 16.557C-0.630755 18.4509 0.2647 20 2.45857 20H19.92C22.1138 20 23.0093 18.4509 21.9168 16.557ZM10.052 7.63152H12.3287V12.9281H10.0498V7.63152H10.052ZM11.1915 16.3622C10.9449 16.3622 10.7038 16.2891 10.4987 16.1521C10.2937 16.0151 10.1339 15.8203 10.0395 15.5925C9.94512 15.3646 9.92042 15.1139 9.96854 14.872C10.0166 14.6301 10.1354 14.408 10.3098 14.2336C10.4842 14.0592 10.7064 13.9404 10.9482 13.8923C11.1901 13.8442 11.4408 13.8689 11.6687 13.9633C11.8965 14.0577 12.0913 14.2175 12.2283 14.4225C12.3653 14.6276 12.4384 14.8687 12.4384 15.1153C12.4387 15.2794 12.4066 15.442 12.3439 15.5937C12.2813 15.7454 12.1893 15.8832 12.0732 15.9992C11.9572 16.1153 11.8193 16.2073 11.6676 16.27C11.516 16.3326 11.3534 16.3647 11.1893 16.3645L11.1915 16.3622Z"
        fill="#FFDB43"
      />
    </svg>
  );
}

function HeatWaveIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 25.8333 5.83333"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M22.6083 2.08333C21.8375 1.2 20.775 0 18.75 0C16.725 0 15.6667 1.20833 14.8917 2.08333C14.1167 2.95833 13.7708 3.33333 12.9167 3.33333C12.0625 3.33333 11.6667 2.91667 10.9417 2.08333C10.2167 1.25 9.10833 0 7.08333 0C5.05833 0 4 1.20833 3.225 2.08333C2.45 2.95833 2.08333 3.33333 1.25 3.33333H0V5.83333H1.25C3.275 5.83333 4.33333 4.625 5.10833 3.75C5.88333 2.875 6.25 2.5 7.08333 2.5C7.91667 2.5 8.33333 2.91667 9.05833 3.75C9.78333 4.58333 10.8917 5.83333 12.9167 5.83333C14.9417 5.83333 16 4.625 16.775 3.75C17.55 2.875 17.9167 2.5 18.75 2.5C19.5833 2.5 20 2.91667 20.725 3.75C21.45 4.58333 22.5583 5.83333 24.5833 5.83333H25.8333V3.33333H24.5833C23.75 3.33333 23.3333 2.91667 22.6083 2.08333Z"
        fill="#D96E06"
      />
    </svg>
  );
}

function HeatWispIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 5.83333 10.8333"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M2.5 9.58333C2.5 7.9375 3.11667 7.17083 3.89167 6.19583C4.75833 5.11667 5.83333 3.77083 5.83333 1.25V0H3.33333V1.25C3.33333 2.89583 2.71667 3.6625 1.94167 4.6375C1.075 5.71667 0 7.0625 0 9.58333V10.8333H2.5V9.58333Z"
        fill="#D96E06"
      />
    </svg>
  );
}

function XIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M10 0C4.4905 0 0 4.4905 0 10C0 15.5095 4.48954 20 10 20C15.5095 20 20 15.5105 20 10C20 4.4905 15.5095 0 10 0ZM14.7098 13.2896L13.2896 14.7098L10 11.41L6.71042 14.7098L5.29015 13.2896L8.59004 10L5.29015 6.71042L6.71042 5.29015L10 8.59004L13.2896 5.29015L14.7098 6.71042L11.41 10L14.7098 13.2896Z"
        fill="#D24924"
      />
    </svg>
  );
}

/* Corner bracket used around the section title (Figma 3346:941-944). */
function TitleTick({
  className = "",
  flip = "",
}: {
  className?: string;
  flip?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute flex size-[4px] items-center justify-center ${className}`}
      aria-hidden
    >
      <div className={`flex-none ${flip}`}>
        <div className="relative size-[4px]">
          <svg
            className="absolute inset-[0_0_-12.5%_-12.5%] block size-full max-w-none"
            viewBox="0 0 4.5 4.5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path d="M0.5 0L0.5 4H4.5" stroke="white" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* Panel corner elements (Figma 3508:617) — bottom ticks clip against the
   468px panel exactly as in the source frame. */
function PanelCorners() {
  return (
    <svg
      className="absolute top-[0.51px] left-[0.39px] h-[598.994px] w-[1165.605px]"
      viewBox="0 0 1166.61 599.994"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      data-node-id="3508:617"
      aria-hidden
    >
      <path d="M1166.11 595.494L1166.11 599.494H1162.11" stroke="white" />
      <path d="M0.5 4.5L0.5 0.5H4.5" stroke="white" />
      <path d="M1166.11 4.5L1166.11 0.5H1162.11" stroke="white" />
      <path d="M778.5 595.494L778.5 599.494H782.5" stroke="white" />
    </svg>
  );
}

/* 180x12 comparison bar, reproducing Figma's rotated-gradient structure
   (3508:660-675) so the gradient direction matches the source exactly. */
function UsageBar({
  left,
  top,
  segment,
  muted,
  nodeId,
}: {
  left: number;
  top: number;
  segment: number;
  muted: boolean;
  nodeId?: string;
}) {
  return (
    <div
      className="absolute flex h-[12px] w-[180px] items-center justify-center"
      style={{ left: `${left}px`, top: `${top}px` }}
      data-node-id={nodeId}
    >
      <div className="flex-none -rotate-90 -scale-y-100">
        <div className="relative flex h-[180px] w-[12px] flex-col items-center justify-end bg-gradient-to-b from-[#535353] to-[#313131]">
          <div
            className={`relative w-full shrink-0 rounded-[0.384px] bg-gradient-to-b from-[#8ce66c] to-[#1b2f14] ${muted ? "mix-blend-luminosity" : ""}`}
            style={{ height: `${segment}px` }}
          />
        </div>
      </div>
    </div>
  );
}

/* Chip thumbnails (Figma 3508:659 / 683 / 686 / 688). */
function ChipImage({ variant }: { variant: RowImage }) {
  if (variant === "acube") {
    return (
      <div
        className="absolute top-[84.62px] left-[138px] h-[52.376px] w-[54.666px] mix-blend-lighten"
        data-node-id="3508:659"
      >
        <img loading="lazy" decoding="async"
          alt=""
          src="/technology/eff-chip-acube.png"
          className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
        />
      </div>
    );
  }
  if (variant === "gpu") {
    return (
      <div
        className="absolute top-[calc(50%+60.12px)] left-[calc(50%-417.67px)] h-[54.503px] w-[46.726px] -translate-x-1/2 -translate-y-1/2"
        data-node-id="3508:686"
      >
        <img loading="lazy" decoding="async"
          alt=""
          src="/technology/eff-chip-gpu.png"
          className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
        />
      </div>
    );
  }
  const topClass =
    variant === "flash"
      ? "top-[calc(50%-29.88px)]"
      : "top-[calc(50%+155.33px)]";
  const nodeId = variant === "flash" ? "3508:683" : "3508:688";
  return (
    <div
      className={`absolute ${topClass} left-[calc(50%-417.67px)] h-[63.765px] w-[54.666px] -translate-x-1/2 -translate-y-1/2`}
      data-node-id={nodeId}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <img loading="lazy" decoding="async"
          alt=""
          src="/technology/eff-chip-mcu.png"
          className="absolute top-[7.03%] left-[-9.63%] h-[85.93%] w-[120.67%] max-w-none"
        />
      </div>
    </div>
  );
}

/* Trade-off icons, absolutely placed per Figma (3508:676, 3523:547,
   3523:561-564, 3524:570). */
function TradeoffIcon({ icon }: { icon: RowIcon }) {
  if (icon === "check") {
    return (
      <CheckIcon
        className="absolute top-[104.5px] left-[879.48px] size-[20px]"
      />
    );
  }
  if (icon === "warning") {
    return (
      <WarningIcon className="absolute top-[197.15px] left-[876.29px] h-[20px] w-[22.383px]" />
    );
  }
  if (icon === "heat") {
    return (
      <>
        <HeatWaveIcon className="absolute top-[297.54px] left-[875.56px] h-[5.833px] w-[25.833px]" />
        <HeatWispIcon className="absolute top-[283.38px] left-[878.48px] h-[10.833px] w-[5.833px]" />
        <HeatWispIcon className="absolute top-[283.38px] left-[886.81px] h-[10.833px] w-[5.833px]" />
        <HeatWispIcon className="absolute top-[283.38px] left-[895.14px] h-[10.833px] w-[5.833px]" />
      </>
    );
  }
  return (
    <XIcon className="absolute top-[380.6px] left-[877.48px] size-[20px]" />
  );
}

/* Section background glow — same footer-bg asset the design reuses at the
   top (3346:937) and bottom (3346:936) of the frame. */
function Glow({
  top,
  height,
  flipClass,
  fromStop,
  toStop,
  nodeId,
}: {
  top: string;
  height: string;
  flipClass: string;
  fromStop: string;
  toStop: string;
  nodeId: string;
}) {
  return (
    <div
      className={`absolute left-0 flex w-full items-center justify-center ${top} ${height}`}
      data-node-id={nodeId}
      aria-hidden
    >
      <div className={`flex-none w-full ${flipClass}`}>
        <div className={`relative w-full ${height}`}>
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-black" />
            <div className="absolute inset-0 overflow-hidden">
              <img loading="lazy" decoding="async"
                alt=""
                src="/footer/footer-bg.webp"
                className="absolute top-[-26.76%] left-[-0.02%] h-[279.02%] w-full max-w-none"
              />
            </div>
            <div
              className={`absolute inset-0 bg-gradient-to-b from-black to-[rgba(0,0,0,0)] ${fromStop} ${toStop}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const MOBILE_TITLE_GRADIENT_DEG = "98.934deg";

/* ---- MOBILE (<1024px) — Figma 4533:2857 "6th Fold" ----
 * 350x840 stacked panel with four 340x190 cards (4533:2873-2993). */

type MobileRow = {
  top: number;
  offX: number;
  offY: number;
  statTop: number;
  rank: string;
  name: string;
  sub: string;
  highlighted: boolean;
  chip: string;
  blend: boolean;
  tradeLeft: number;
  tradeTop: number;
  icon: RowIcon;
  tradeLabel: string;
  tradeLabelClass: string;
  lineTop: number;
  powerValue: string;
  powerBar: number;
  areaValue: string;
  areaBar: number;
};

const M_ROWS: MobileRow[] = [
  {
    top: 61,
    offX: 10,
    offY: 20,
    statTop: 100,
    rank: "1",
    name: "A cube",
    sub: "Analog digital in memory",
    highlighted: true,
    chip: "/technology/eff-mobile-chip-acube.webp",
    blend: true,
    tradeLeft: 273,
    tradeTop: 36,
    icon: "check",
    tradeLabel: "None",
    tradeLabelClass: "whitespace-nowrap",
    lineTop: 86,
    powerValue: "~30 TOPS/W",
    powerBar: 138,
    areaValue: "~5 TOPS/mm2",
    areaBar: 141,
  },
  {
    top: 256,
    offX: 9.7,
    offY: 19.7,
    statTop: 99.7,
    rank: "2",
    name: "Flash",
    sub: "Compute in memory",
    highlighted: false,
    chip: "/technology/eff-mobile-chip-flash.webp",
    blend: false,
    tradeLeft: 249.7,
    tradeTop: 27.7,
    icon: "warning",
    tradeLabel: "Model Lock In",
    tradeLabelClass: "w-[51px] text-center",
    lineTop: 85.7,
    powerValue: "~5 TOPS/W",
    powerBar: 56.883,
    areaValue: "~1 TOPS/mm2",
    areaBar: 35.014,
  },
  {
    top: 451,
    offX: 9.7,
    offY: 19.7,
    statTop: 99.7,
    rank: "3",
    name: "GPU",
    sub: "Paralle SMO",
    highlighted: false,
    chip: "/technology/eff-mobile-chip-gpu.webp",
    blend: false,
    tradeLeft: 251.7,
    tradeTop: 35.7,
    icon: "heat",
    tradeLabel: "Too-hot",
    tradeLabelClass: "whitespace-nowrap",
    lineTop: 85.7,
    powerValue: "~30 TOPS/W",
    powerBar: 35.014,
    areaValue: "~0.5 TOPS/mm2",
    areaBar: 19.654,
  },
  {
    top: 646,
    offX: 9.7,
    offY: 19.7,
    statTop: 99.7,
    rank: "4",
    name: "MCU",
    sub: "Analog digital in memory",
    highlighted: false,
    chip: "/technology/eff-mobile-chip-flash.webp",
    blend: false,
    tradeLeft: 246.7,
    tradeTop: 27.7,
    icon: "x",
    tradeLabel: "Not built for AI",
    tradeLabelClass: "w-[57px] text-center",
    lineTop: 85.7,
    powerValue: "~30 TOPS/W",
    powerBar: 11.791,
    areaValue: "~0.1 TOPS/mm2",
    areaBar: 14.406,
  },
];

/* 150px-wide usage bar (Figma 4533:2902 etc.) — rotated-gradient structure
   kept so the gradient direction matches the source exactly. */
function MobileUsageBar({ segment, muted }: { segment: number; muted: boolean }) {
  return (
    <div className="flex h-[12px] w-full items-center justify-center">
      <div className="flex-none -rotate-90 -scale-y-100">
        <div className="relative flex h-[150px] w-[12px] flex-col items-center justify-end bg-gradient-to-b from-[#535353] to-[#313131]">
          <div
            className={`relative w-full shrink-0 rounded-[0.384px] bg-gradient-to-b from-[#8ce66c] to-[#1b2f14] ${muted ? "mix-blend-luminosity" : ""}`}
            style={{ height: `${segment}px` }}
          />
        </div>
      </div>
    </div>
  );
}

/* Panel corner brackets (Figma 4533:2876 "Cornor Elements"). */
function MobilePanelCorners() {
  return (
    <svg
      className="absolute top-[0.51px] left-1/2 h-[839.494px] w-[350px] -translate-x-1/2"
      viewBox="0 0 351 840.494"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      data-node-id="4533:2876"
      aria-hidden
    >
      <path d="M350.5 834.388L350.5 839.994H346.888" stroke="white" />
      <path d="M0.5 6.10603L0.5 0.5H4.11192" stroke="white" />
      <path d="M350.5 6.10603L350.5 0.5H346.888" stroke="white" />
      <path d="M0.5 834.388L0.5 839.994H4.11192" stroke="white" />
    </svg>
  );
}

/* Trade-off icons at mobile card scale (Figma 4533:2895 / 2924 / 2950 / 2979). */
function MobileTradeIcon({ icon }: { icon: RowIcon }) {
  if (icon === "check") {
    return <CheckIcon className="size-[20px] shrink-0" />;
  }
  if (icon === "warning") {
    return <WarningIcon className="h-[20px] w-[22.383px] shrink-0" />;
  }
  if (icon === "heat") {
    return (
      <div className="relative h-[20px] w-[25.833px] shrink-0">
        <HeatWispIcon className="absolute top-0 left-[2.92px] h-[10.833px] w-[5.833px]" />
        <HeatWispIcon className="absolute top-0 left-[11.25px] h-[10.833px] w-[5.833px]" />
        <HeatWispIcon className="absolute top-0 left-[19.58px] h-[10.833px] w-[5.833px]" />
        <HeatWaveIcon className="absolute top-[14.16px] left-0 h-[5.833px] w-[25.833px]" />
      </div>
    );
  }
  return <XIcon className="size-[20px] shrink-0" />;
}

/* POWER / AREA stat column (Figma 4533:2898 / 2904 etc.). */
function MobileStatBlock({
  left,
  top,
  label,
  value,
  segment,
  muted,
}: {
  left: number;
  top: number;
  label: string;
  value: string;
  segment: number;
  muted: boolean;
}) {
  return (
    <div
      className="absolute flex w-[150px] flex-col items-start gap-[8px]"
      style={{ left: `${left}px`, top: `${top}px` }}
    >
      <p
        className={`${interMedium.className} h-[16px] w-full text-[14px] leading-[16px] font-medium text-[#d2d2d2] uppercase not-italic`}
      >
        {label}
      </p>
      <div className="flex w-full flex-col items-start gap-[6px]">
        <p
          className={`${gilroyMedium.className} w-full text-[18px] leading-[28px] font-medium text-[#e2f9da] not-italic`}
        >
          {value}
        </p>
        <MobileUsageBar segment={segment} muted={muted} />
      </div>
    </div>
  );
}

/** 350x840 "Lower power consumption" mobile panel (Figma 4533:2873). */
function EfficiencyTableMobile() {
  return (
    <div
      className="absolute top-[249px] left-[calc(50%+1.5px)] h-[840px] w-[350px] -translate-x-1/2"
      data-node-id="4533:2873"
      data-name="Lower power consumption"
    >
      {/* background */}
      <div
        className="absolute top-0 left-0 h-[840px] w-[350px] border-[0.5px] border-solid border-[rgba(255,255,255,0.1)]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), linear-gradient(90deg, rgba(15, 14, 14, 0.75) 0%, rgba(15, 14, 14, 0.75) 100%)",
        }}
        data-node-id="4533:2874"
        data-name="background"
      />
      {/* header band */}
      <div
        className="absolute top-px left-0 h-[55px] w-[350px] bg-[rgba(51,51,51,0.1)]"
        data-node-id="4533:2875"
      />
      <MobilePanelCorners />

      {/* header row — Rank / The Trade - off */}
      <div
        className={`${interMedium.className} absolute top-0 left-0 flex h-[56px] w-[350px] items-start justify-between px-[15px] py-[20px] text-[14px] leading-[0] font-medium text-[#d2d2d2] uppercase not-italic whitespace-nowrap`}
        data-node-id="4533:2881"
      >
        <div className="relative flex shrink-0 flex-col justify-center" data-node-id="4533:2882">
          <p className="leading-[16px]">Rank</p>
        </div>
        <div className="relative flex shrink-0 flex-col justify-center" data-node-id="4533:2883">
          <p className="leading-[16px]">The Trade - off</p>
        </div>
      </div>

      {/* cards */}
      {M_ROWS.map((row) => (
        <div
          key={row.rank}
          className="absolute top-0 left-1/2 h-[190px] w-[340px] -translate-x-1/2"
          style={{ top: `${row.top}px` }}
        >
          {row.highlighted ? (
            <div
              className="absolute top-0 left-0 h-[190px] w-[340px] border-t border-b border-solid border-[#bfe9b1] opacity-60"
              style={{
                backgroundImage:
                  "linear-gradient(89.90164524435929deg, rgba(83, 216, 36, 0) 75.369%, rgba(83, 216, 36, 0.2) 99.944%), linear-gradient(90deg, rgba(83, 216, 36, 0.2) 0%, rgba(83, 216, 36, 0) 34.507%), linear-gradient(90deg, rgba(83, 216, 36, 0.1) 0%, rgba(83, 216, 36, 0.1) 100%)",
              }}
            />
          ) : (
            <div className="absolute top-0 left-0 h-[190px] w-[340px] border-[0.3px] border-solid border-[rgba(240,240,240,0.2)]" />
          )}

          {/* badge + chip + name */}
          <div
            className="absolute flex items-center gap-[10px]"
            style={{ left: `${row.offX}px`, top: `${row.offY}px` }}
          >
            <div
              className={`flex h-[32px] w-[33.143px] shrink-0 flex-col items-center justify-center rounded-[4px] px-[10px] ${
                row.highlighted ? "bg-[#3a9719]" : "bg-[rgba(83,216,36,0.1)]"
              }`}
            >
              <p
                className={`${gilroyMedium.className} w-full text-center text-[16px] leading-[28px] font-medium text-[#e2f9da] not-italic`}
              >
                {row.rank}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-[4px]">
              <div className={`relative h-[52px] w-[54px] shrink-0 ${row.blend ? "mix-blend-lighten" : ""}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" decoding="async"
                  alt=""
                  src={row.chip}
                  className="pointer-events-none absolute inset-0 size-full object-cover"
                />
              </div>
              <div className="flex shrink-0 flex-col items-start not-italic whitespace-nowrap">
                <p
                  className={`${gilroyMedium.className} text-[22px] leading-[28px] font-medium not-italic ${
                    row.highlighted ? "text-[#53d824]" : "text-[#e2f9da]"
                  }`}
                >
                  {row.name}
                </p>
                <p
                  className={`${interLight.className} text-[10px] leading-[15px] font-light text-white not-italic`}
                >
                  {row.sub}
                </p>
              </div>
            </div>
          </div>

          {/* trade-off */}
          <div
            className="absolute flex items-center gap-[6px]"
            style={{ left: `${row.tradeLeft}px`, top: `${row.tradeTop}px` }}
          >
            <MobileTradeIcon icon={row.icon} />
            <p
              className={`${interRegular.className} text-[12px] leading-[18px] font-normal text-[#e2f9da] not-italic ${row.tradeLabelClass}`}
            >
              {row.tradeLabel}
            </p>
          </div>

          {/* separator line — Line 88: white fade left-to-right at 30% */}
          <div
            className="absolute h-0 w-[151.832px]"
            style={{ left: `${row.offX}px`, top: `${row.lineTop}px` }}
          >
            <div
              className="absolute inset-[-1px_0_0_0] opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #ffffff 0%, rgba(255,255,255,0) 100%)",
              }}
            />
          </div>

          {/* POWER / AREA */}
          <MobileStatBlock
            left={row.offX}
            top={row.statTop}
            label="Power"
            value={row.powerValue}
            segment={row.powerBar}
            muted={!row.highlighted}
          />
          <MobileStatBlock
            left={row.offX + 170}
            top={row.statTop}
            label="Area"
            value={row.areaValue}
            segment={row.areaBar}
            muted={!row.highlighted}
          />
        </div>
      ))}
    </div>
  );
}

/** Shared inner content for the 1166×468 "Lower power consumption" panel.
 *  Used by both desktop (absolute-positioned) and mobile (scrollable). */
function EfficiencyTableContent() {
  return (
    <>
      {/* background */}
      <div
        className="absolute top-0 left-0 h-[468px] w-[1166px] border-[0.5px] border-solid border-[rgba(255,255,255,0.1)]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), linear-gradient(90deg, rgba(15, 14, 14, 0.75) 0%, rgba(15, 14, 14, 0.75) 100%)",
        }}
        data-node-id="3508:616"
        data-name="background"
      />
      {/* row-1 highlight band */}
      <div
        className="absolute top-[72.89px] left-[0.39px] h-[86.066px] w-[1165.605px] border-t border-b border-solid border-[#bfe9b1] opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(89.2557deg, rgba(83, 216, 36, 0) 75.369%, rgba(83, 216, 36, 0.2) 99.944%), linear-gradient(90deg, rgba(83, 216, 36, 0.2) 0%, rgba(83, 216, 36, 0) 34.507%), linear-gradient(90deg, rgba(83, 216, 36, 0.1) 0%, rgba(83, 216, 36, 0.1) 100%)",
        }}
        data-node-id="3508:681"
      />
      {/* header band */}
      <div
        className="absolute top-[0.5px] left-0 h-[72px] w-[1166px] bg-[rgba(51,51,51,0.1)]"
        data-node-id="3529:655"
      />
      <PanelCorners />

      {/* row labels */}
      {ROWS.map((row, i) => (
        <p
          key={`name-${i}`}
          className={`${gilroyMedium.className} absolute left-[201.5px] text-[26px] leading-[29px] font-medium whitespace-nowrap not-italic ${
            row.highlighted ? "text-[#53d824]" : "text-[#d2d2d2]"
          }`}
          style={{ top: `${ROW_TOP[i]}px` }}
        >
          {row.name}
        </p>
      ))}

      {/* power values */}
      {ROWS.map((row, i) => (
        <p
          key={`power-${i}`}
          className={`${gilroyMedium.className} absolute left-[395.32px] text-[22px] leading-[28px] font-medium whitespace-nowrap text-[#e2f9da] not-italic`}
          style={{ top: `${ROW_TOP[i]}px` }}
        >
          {row.power}
        </p>
      ))}

      {/* area values */}
      {ROWS.map((row, i) => (
        <p
          key={`area-${i}`}
          className={`${gilroyMedium.className} absolute left-[641.72px] text-[0px] leading-[0] font-medium whitespace-nowrap text-[#e2f9da] not-italic`}
          style={{ top: `${ROW_TOP[i]}px` }}
        >
          <span className="text-[22px] leading-[28px]">{row.area}</span>
          <span className="text-[14.19px] leading-[28px]">2</span>
        </p>
      ))}

      {/* trade-off values */}
      {ROWS.map((row, i) => (
        <p
          key={`trade-${i}`}
          className={`${gilroyMedium.className} absolute text-[22px] leading-[28px] font-medium whitespace-nowrap text-[#e2f9da] not-italic`}
          style={{ top: `${TRADE_TOP[i]}px`, left: `${TRADE_LEFT[i]}px` }}
        >
          {row.tradeoff}
        </p>
      ))}

      {/* rank badges */}
      {ROWS.map((row, i) => (
        <div
          key={`rank-${i}`}
          className={`absolute left-[31.55px] flex h-[32px] w-[33.143px] flex-col items-center justify-center rounded-[4px] px-[10px] ${
            row.highlighted
              ? "bg-[#3a9719]"
              : "bg-[rgba(83,216,36,0.1)]"
          }`}
          style={{ top: `${BADGE_TOP[i]}px` }}
        >
          <p
            className={`${gilroyMedium.className} w-full shrink-0 text-center text-[16px] leading-[28px] font-medium text-[#e2f9da] not-italic`}
          >
            {row.rank}
          </p>
        </div>
      ))}

      {/* row separators */}
      {LINE_TOP.map((top, i) => (
        <div
          key={`line-${i}`}
          className="absolute left-[49.86px] h-0 w-[1077.925px]"
          style={{ top: `${top}px` }}
        >
          <div
            className="absolute inset-[-1px_0_0_0] opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(270deg, rgba(255,255,255,0) 0%, #ffffff 50%, rgba(255,255,255,0) 100%)",
            }}
          />
        </div>
      ))}

      {/* header row */}
      <div
        className={`${interMedium.className} absolute top-[6px] left-[-0.45px] flex h-[56px] w-[1166px] flex-wrap items-start gap-0 px-[32px] py-[20px] text-[14px] leading-[0] font-medium text-[#d2d2d2] uppercase not-italic`}
        data-node-id="3508:649"
      >
        {HEADERS.map((h, i) => (
          <div
            key={`hdr-${i}`}
            className={`relative flex h-full shrink-0 flex-col justify-center ${
              i === 0 ? "w-[117.695px]" : "min-w-px flex-[1_0_0]"
            }`}
          >
            <p className="leading-[16px]">{h}</p>
          </div>
        ))}
      </div>

      {/* architecture sub-labels */}
      {ROWS.map((row, i) => (
        <div
          key={`sub-${i}`}
          className={`${interRegular.className} absolute left-[198.97px] flex -translate-y-1/2 flex-col justify-center text-[12px] leading-[0] font-normal whitespace-nowrap text-white not-italic`}
          style={{ top: `${SUB_TOP[i]}px` }}
        >
          <p className="leading-[18px]">{row.sub}</p>
        </div>
      ))}

      {/* chip thumbnails */}
      {ROWS.map((row, i) => (
        <ChipImage key={`chip-${i}`} variant={row.image} />
      ))}

      {/* power bars */}
      {ROWS.map((row, i) => (
        <UsageBar
          key={`pbar-${i}`}
          left={395}
          top={BAR_TOP[i]}
          segment={row.powerBar}
          muted={!row.highlighted}
        />
      ))}

      {/* area bars */}
      {ROWS.map((row, i) => (
        <UsageBar
          key={`abar-${i}`}
          left={641.4}
          top={BAR_TOP[i]}
          segment={row.areaBar}
          muted={!row.highlighted}
        />
      ))}

      {/* trade-off icons */}
      {ROWS.map((row, i) => (
        <TradeoffIcon key={`icon-${i}`} icon={row.icon} />
      ))}
    </>
  );
}

export function TechnologyPageEfficiency({ data }: { data?: any } = {}) {
  const heading = data?.heading || FALLBACK_HEADING;
  // The design mandates a two-line title. Strapi stores the same copy as a
  // single line, so when the text matches (apostrophe/whitespace-insensitive)
  // fall back to the design's canonical line break.
  const rawLines: string[] = heading.split("\n");
  const normalize = (s: string) =>
    s.replace(/[’']/g, "'").replace(/\s+/g, " ").trim();
  const headingLines =
    rawLines.length === 1 &&
    normalize(rawLines[0]) === normalize(FALLBACK_HEADING.replace("\n", " "))
      ? FALLBACK_HEADING.split("\n")
      : rawLines;
  const subtitle = data?.subtitle || FALLBACK_SUBTITLE;

  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-black"
      data-node-id="3346:935"
      data-name="Desktop - 15"
      aria-label="The efficiency gap is a different category"
    >
      {/* Full-bleed Glows for DESKTOP (>=1024px) */}
      <div className="absolute inset-0 z-0 hidden w-full min-[1024px]:block">
        <Glow
          top="top-[350px]"
          height="h-[591px]"
          flipClass="rotate-180"
          fromStop="from-[29.711%]"
          toStop="to-[42.418%]"
          nodeId="3346:936"
        />
        <Glow
          top="top-[-74px]"
          height="h-[424px]"
          flipClass="-scale-y-100 rotate-180"
          fromStop="from-[15.366%]"
          toStop="to-[63.608%]"
          nodeId="3346:937"
        />
      </div>

      {/* DESKTOP (>=1024px) */}
      <div className="relative z-10 hidden h-[770px] w-full max-w-[1440px] min-[1024px]:block">

        {/* 3346:938 — Section Title */}
        <div
          className="absolute top-[38.5px] left-1/2 flex -translate-x-1/2 flex-col items-center justify-center gap-[24px]"
          data-node-id="3346:938"
          data-name="Section Title"
        >
          <GradientTitle
            gradientDeg={TITLE_GRADIENT_DEG}
            nodeId="3346:940"
            className="text-center"
          >
            {headingLines.map((line: string, i: number) => (
              <p key={`title-${i}`} className="leading-[49px] [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1] overflow-hidden">
                {line}
              </p>
            ))}
          </GradientTitle>
          <TitleTick className="top-0 left-0" flip="-scale-y-100" />
          <TitleTick className="top-0 right-0" flip="rotate-180" />
          <TitleTick className="bottom-[45px] left-0" />
          <TitleTick
            className="right-0 bottom-[45px]"
            flip="-scale-y-100 rotate-180"
          />
          <p
            className={`${interRegular.className} text-[14px] leading-[21px] font-normal whitespace-nowrap text-[#f0f0f0] not-italic`}
            data-node-id="3346:945"
          >
            {subtitle}
          </p>
        </div>

        {/* 3508:615 — Lower power consumption panel */}
        <div
          className="absolute top-[210.5px] left-1/2 h-[468px] w-[1166px] -translate-x-1/2 overflow-clip"
          data-node-id="3508:615"
          data-name="Lower power consumption"
        >
          <EfficiencyTableContent />
        </div>
      </div>

      {/* MOBILE (<1024px) — Figma 4533:2857 "6th Fold" (393x1119) */}
      <div className="relative h-[1119px] w-full overflow-hidden min-[1024px]:hidden">
        {/* Background glows — 4533:2859 / 4533:2860 */}
        <Glow
          top="top-[-104px]"
          height="h-[539px]"
          flipClass="-scale-y-100 rotate-180"
          fromStop="from-[15.366%]"
          toStop="to-[63.608%]"
          nodeId="4533:2860"
        />
        <Glow
          top="top-[434.99px]"
          height="h-[540.013px]"
          flipClass="rotate-180"
          fromStop="from-[29.711%]"
          toStop="to-[42.418%]"
          nodeId="4533:2859"
        />

        {/* Top glow strip — 4533:2862 */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 left-1/2 h-[260px] w-[1441px] -translate-x-1/2"
          data-node-id="4533:2862"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async"
            alt=""
            src="/technology/eff-mobile-glow-top.png"
            className="pointer-events-none absolute inset-0 size-full object-cover"
          />
        </div>

        {/* Bottom glow strip (flipped, +30px off-center, clipped by frame) — 4533:2863 */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[-92px] left-[calc(50%+30px)] h-[341px] w-[1441px] -translate-x-1/2 -scale-y-100"
          data-node-id="4533:2863"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async"
            alt=""
            src="/technology/eff-mobile-glow-bottom.png"
            className="pointer-events-none absolute inset-0 size-full object-cover"
          />
        </div>

        {/* Header — 4533:2865 */}
        <div className="absolute top-[30px] left-[calc(50%+1.5px)] flex w-[350px] -translate-x-1/2 flex-col items-center justify-center gap-[10px]">
          <div className="relative w-full">
            <p
              className={`${gilroyMedium.className} w-full bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
              style={{
                backgroundImage: `linear-gradient(${MOBILE_TITLE_GRADIENT_DEG}, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              {headingLines.join(" ")}
            </p>
            <MobileTitleCorners />
          </div>
          <p
            className={`${interRegular.className} w-full text-center text-[14px] leading-[16px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
          >
            {subtitle}
          </p>
        </div>

        {/* Stacked comparison panel — 4533:2873 */}
        <div className="relative z-10">
          <EfficiencyTableMobile />
        </div>
      </div>
    </section>
  );
}
