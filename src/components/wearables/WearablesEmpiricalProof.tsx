/* eslint-disable @next/next/no-img-element */
import { dmMono, gilroyMedium, gilroySemiBold, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";

const TITLE_GRADIENT =
  "linear-gradient(118.011deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

const FALLBACK_HEADING = "The Empirical Proof";
const FALLBACK_SUBTITLE =
  "Don't spend your first day writing sensor configuration code. The Cranium board comes ready to run out of the box, allowing you to instantly test physical AI models and validate performance on the metal with zero setup required.";

const IMG_OVERLAY_1 =
  "linear-gradient(185.768deg, rgb(0, 0, 0) 6.3744%, rgba(0, 0, 0, 0) 20.894%)";

const CARD_BORDER = "border border-solid border-[#ccd7ff]";
const CARD_BG = `bg-gradient-to-b from-[#0c160b] to-[rgba(12,22,11,0)] ${CARD_BORDER} rounded-[1px] overflow-clip`;

const GREEN_BAR_SMALL =
  "bg-gradient-to-b from-[42.377%] from-[rgba(140,230,108,0.5)] to-[150.73%] to-[rgba(27,47,20,0.5)] mix-blend-luminosity";

const RED_DUAL =
  "linear-gradient(180deg, rgb(230, 108, 108) 42.377%, rgb(58, 19, 30) 150.73%), linear-gradient(180deg, rgb(230, 108, 141) 42.377%, rgb(58, 19, 30) 150.73%)";

function CardAbstractBg() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-[-193.36px] top-[-264.21px] flex h-[545.963px] w-[464.057px] items-center justify-center"
    >
      <div className="flex-none rotate-[56.66deg]">
        <div className="relative h-[221.394px] w-[507.857px]">
          <div className="absolute inset-[-18.07%_-20.35%_-7.18%_-20.8%]">
            <img
              alt=""
              src="/applications/wearables/abstract-design-card.svg"
              className="block size-full max-w-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Badge({
  label,
  width,
}: {
  label: string;
  width: number;
}) {
  return (
    <div
      className="relative h-[26px] shrink-0 overflow-clip bg-[rgba(255,255,255,0.06)]"
      style={{ width }}
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
      <div className="absolute top-1/2 left-[6.48px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
      <div className="absolute top-1/2 right-[7.52px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
    </div>
  );
}

/* ── Top Card 1: Health Monitoring ───────────────────────────── */
function HealthCard({ data }: { data?: any }) {
  const badge = data?.badge || "The Workload";
  const title = data?.title || "Health Monitoring Solutions";
  const body =
    data?.body ||
    "Continuous, on-device assault detection and biomarker analysis for early onset predictions for PCOD/PCOS to enable 24/7 women health and safety";
  const ctaLabel = data?.cta_label || "Download Case Study";
  const footer =
    data?.footer || "Up to 2 weeks of continuous tracking with on-device AI.";
  return (
    <div
      className={`relative h-[364px] w-[575px] shrink-0 ${CARD_BG}`}
      data-node-id="2701:3885"
      data-name="Card"
    >
      <CardAbstractBg />
      <Corners
        leftSrc="/applications/wearables/vector-47.svg"
        rightSrc="/applications/wearables/vector-46.svg"
      />
      {/* Badge */}
      <div className="absolute left-[35px] top-[33.74px] flex items-center gap-[27.778px]">
        <Badge label={badge} width={137} />
      </div>
      {/* Title + body */}
      <div
        className={`${gilroyMedium.className} absolute left-[35px] top-[87px] flex w-[477px] flex-col gap-[12px] items-start tracking-[-0.4539px] not-italic`}
        data-name="NewsSection"
      >
        <p className="text-[24px] leading-[28.295px] text-white whitespace-nowrap">
          {title}
        </p>
        <p
          className={`${interRegular.className} min-w-full w-[min-content] text-[16px] leading-[24px] text-[rgba(255,255,255,0.6)] [word-break:break-word]`}
        >
          {body}
        </p>
      </div>
      {/* CTA */}
      <a
        href="#"
        className={`${gilroyMedium.className} absolute left-[35px] top-[238.74px] h-[48px] w-[251px] cursor-pointer overflow-hidden shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]`}
        data-name="Cta"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
        />
        <GreenCtaCorners />
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[16px] leading-[28px] font-medium text-white uppercase not-italic">
          {ctaLabel}
        </span>
        <img
          alt=""
          src="/applications/wearables/cta-icon.svg"
          className="absolute left-[213px] top-[14.03px] size-[20px] max-w-none"
          aria-hidden
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
        />
      </a>
      {/* Footer text */}
      <p
        className={`${interRegular.className} absolute left-[35px] top-[315.12px] w-[458.152px] text-[14px] leading-[21px] text-[#a4a4a4] not-italic [word-break:break-word]`}
      >
        {footer}
      </p>
    </div>
  );
}

/* ── Usage Bar Segment ───────────────────────────────────────── */
function SidePanel({
  title,
  segments,
  statValue,
  statLabel,
}: {
  title: string;
  segments: { h: number; variant: "green" | "red" | "redDual" }[];
  statValue: string;
  statLabel: string;
}) {
  return (
    <div
      className="absolute flex w-[115px] flex-col items-center justify-center gap-[15px]"
      data-name="Side Panel"
    >
      <p
        className={`${gilroyMedium.className} min-w-full w-[min-content] text-center text-[20.211px] leading-[28.295px] tracking-[-0.4539px] text-white whitespace-nowrap not-italic`}
      >
        {title}
      </p>
      <div className="flex w-[52.119px] flex-col gap-[6px] items-start" data-name="Usage Bar">
        {segments.map((seg, i) => {
          let cls = "rounded-[1px] w-[52px]";
          let style: React.CSSProperties | undefined;
          if (seg.variant === "green") {
            cls += ` ${GREEN_BAR_SMALL} mix-blend-luminosity`;
          } else if (seg.variant === "red") {
            cls += " bg-gradient-to-b from-[#e66c6c] from-[42.377%] to-[#3a131e] to-[150.73%]";
          } else {
            style = { backgroundImage: RED_DUAL };
          }
          return (
            <div
              key={i}
              className={`${cls} relative shrink-0`}
              style={{ height: seg.h, ...style }}
              data-name="Progress Segment"
            />
          );
        })}
      </div>
      <div
        className="flex w-full flex-col items-center justify-center gap-[8px] whitespace-nowrap not-italic"
        data-name="Energy Info"
      >
        <p className={`${gilroySemiBold.className} text-[30px] leading-[normal] text-white`}>
          {statValue}
        </p>
        <p
          className={`${interRegular.className} text-[12px] leading-[18px] text-[#f0f0f0]`}
        >
          {statLabel}
        </p>
      </div>
    </div>
  );
}

/* ── Top Card 2: Power Consumption ───────────────────────────── */
function PowerCard({ data }: { data?: any }) {
  const badge = data?.badge || "Power Consumption";
  const dataPanels: any[] = Array.isArray(data?.panels) ? data.panels : [];
  const ambient =
    dataPanels[0] || { label: "Ambient", value: "<1mW", description: "Lower energy usage" };
  const legacy =
    dataPanels[1] || { label: "Legacy", value: "10mW", description: "Higher energy usage" };
  return (
    <div
      className={`relative h-[364px] w-[341px] shrink-0 ${CARD_BG}`}
      data-node-id="2701:3923"
      data-name="Card"
    >
      <CardAbstractBg />
      <Corners
        leftSrc="/applications/wearables/vector-47.svg"
        rightSrc="/applications/wearables/vector-46.svg"
      />
      {/* Badge centered */}
      <div className="absolute left-1/2 top-[26.75px] -translate-x-1/2">
        <Badge label={badge} width={176} />
      </div>
      {/* Ambient side panel */}
      <div className="absolute left-[27.36px] top-[82.62px]">
        <SidePanel
          title={ambient.label}
          segments={[
            { h: 15, variant: "green" },
            { h: 15, variant: "green" },
            { h: 15, variant: "green" },
            { h: 15, variant: "green" },
            { h: 15, variant: "green" },
            { h: 30, variant: "green" },
          ]}
          statValue={ambient.value}
          statLabel={ambient.description}
        />
      </div>
      {/* Legacy side panel */}
      <div className="absolute left-[204.36px] top-[82.62px]">
        <SidePanel
          title={legacy.label}
          segments={[
            { h: 15, variant: "green" },
            { h: 15, variant: "red" },
            { h: 15, variant: "redDual" },
            { h: 15, variant: "redDual" },
            { h: 15, variant: "redDual" },
            { h: 30, variant: "red" },
          ]}
          statValue={legacy.value}
          statLabel={legacy.description}
        />
      </div>
    </div>
  );
}

/* ── Top Card 3: Workload Diagram ────────────────────────────── */
function WorkloadDiagram() {
  return (
    <div
      className="absolute left-1/2 top-[calc(50%-28.72px)] h-[146.551px] w-[266.798px] -translate-x-1/2 -translate-y-1/2 overflow-clip"
      data-name="Abstract Design"
    >
      <div className="absolute inset-[48.41%_27.95%_0_27.68%]">
        <img alt="" src="/applications/wearables/diagram-group.svg" className="absolute inset-0 block size-full max-w-none" />
      </div>
      <div className="absolute inset-[0_0.01%_16.83%_0]">
        <img alt="" src="/applications/wearables/diagram-group1.svg" className="absolute inset-0 block size-full max-w-none" />
      </div>
      <div className="absolute inset-[63.08%_11.92%_33.22%_87.28%]">
        <img alt="" src="/applications/wearables/diagram-group2.svg" className="absolute inset-0 block size-full max-w-none" />
      </div>
      <div className="absolute left-[26.51px] top-[26.52px] h-[92.489px] w-[213.78px]">
        <div className="absolute inset-[0.02%_0.01%_0_0]">
          <img alt="" src="/applications/wearables/diagram-vector.svg" className="absolute inset-0 block size-full max-w-none" />
        </div>
        <div className="absolute inset-[0_14.25%_35.2%_37.77%]">
          <img alt="" src="/applications/wearables/diagram-vector1.svg" className="absolute inset-0 block size-full max-w-none" />
        </div>
        <div className="absolute inset-[78.59%_83.09%_0.02%_0]">
          <img alt="" src="/applications/wearables/diagram-vector2.svg" className="absolute inset-0 block size-full max-w-none" />
        </div>
        <div className="absolute inset-[0.04%_50.51%_48.39%_20.63%]">
          <img alt="" src="/applications/wearables/diagram-vector3.svg" className="absolute inset-0 block size-full max-w-none" />
        </div>
        <div className="absolute inset-[22.38%_2.23%_9.18%_70.27%]">
          <img alt="" src="/applications/wearables/diagram-vector4.svg" className="absolute inset-0 block size-full max-w-none" />
        </div>
        <div className="absolute inset-[78.65%_0_0_83.23%]">
          <img alt="" src="/applications/wearables/diagram-vector5.svg" className="absolute inset-0 block size-full max-w-none" />
        </div>
        <div className="absolute inset-[0.02%_0.01%_0_0] mix-blend-multiply">
          <img alt="" src="/applications/wearables/diagram-vector6.svg" className="absolute inset-0 block size-full max-w-none" />
        </div>
      </div>
      <div className="absolute inset-[41.01%_21.89%_21.49%_21.77%]">
        <img alt="" src="/applications/wearables/diagram-vector7.svg" className="absolute inset-0 block size-full max-w-none" />
      </div>
      <div
        className="absolute inset-[46.63%_26.1%_-5.24%_44.37%] flex items-center justify-center"
        style={{ containerType: "size" }}
      >
        <div className="flex-none rotate-[24.05deg]" style={{ height: "hypot(-35.8988cqw,73.7653cqh)", width: "hypot(64.1012cqw,26.2347cqh)" }}>
          <div className="relative size-full">
            <img alt="" src="/applications/wearables/diagram-group3.svg" className="absolute inset-0 block size-full max-w-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkloadCard({ data }: { data?: any }) {
  const badge = data?.badge || "The Workload";
  const stat = data?.stat || "100%";
  const label = data?.label || "On-device";
  const description = data?.description || "No cloud dependency";
  return (
    <div
      className={`relative h-[364px] w-[311px] shrink-0 ${CARD_BG}`}
      data-node-id="2701:3961"
      data-name="Card"
    >
      <CardAbstractBg />
      <Corners
        leftSrc="/applications/wearables/vector-47.svg"
        rightSrc="/applications/wearables/vector-46.svg"
      />
      {/* Badge centered */}
      <div className="absolute left-1/2 top-[26.75px] -translate-x-1/2">
        <Badge label={badge} width={137} />
      </div>
      {/* Diagram */}
      <WorkloadDiagram />
      {/* Stats */}
      <p
        className={`${gilroySemiBold.className} absolute left-1/2 top-[240.34px] -translate-x-1/2 text-[40px] leading-[normal] text-white whitespace-nowrap not-italic`}
      >
        {stat}
      </p>
      <p
        className={`${interRegular.className} absolute left-1/2 top-[295.69px] -translate-x-1/2 text-[14px] leading-[21px] text-[#f0f0f0] whitespace-nowrap not-italic`}
      >
        {label}
      </p>
      <p
        className={`${interRegular.className} absolute left-1/2 top-[317.69px] -translate-x-1/2 text-[12px] leading-[18px] text-white whitespace-nowrap not-italic`}
      >
        {description}
      </p>
    </div>
  );
}

/* ── Bottom Row: ECG Cards ───────────────────────────────────── */
function EcgCard({
  imageSrc,
  stat,
  label,
}: {
  imageSrc: string;
  stat: string;
  label: string;
}) {
  return (
    <div
      className={`relative h-[292px] w-[301px] shrink-0 ${CARD_BG}`}
      data-name="Card"
    >
      <CardAbstractBg />
      <Corners
        leftSrc="/applications/wearables/vector-47.svg"
        rightSrc="/applications/wearables/vector-46.svg"
      />
      {/* Image */}
      <div
        className="pointer-events-none absolute left-[51.16px] top-[-8.26px] flex size-[283.436px] items-center justify-center mix-blend-lighten"
        aria-hidden
      >
        <div className="-scale-y-100 flex-none rotate-180">
          <div className="relative size-[283.436px] scale-85" data-name="image">
            <img alt="" src={imageSrc} className="absolute size-full max-w-none object-cover" />
            <div className="absolute inset-0" style={{ backgroundImage: IMG_OVERLAY_1 }} />
          </div>
        </div>
      </div>
      {/* Badge */}
      <div className="absolute left-[14px] top-[16px] flex items-center">
        <Badge label="ECG Accuracy" width={133} />
      </div>
      {/* Circular progress */}
      <div className="absolute left-[16px] top-[148.15px] flex size-[40px] items-center justify-center">
        <div className="-rotate-90 flex-none">
          <div className="relative size-[40px]">
            <img alt="" src="/applications/wearables/ellipse-1.svg" className="absolute inset-0 block size-full max-w-none" />
          </div>
        </div>
      </div>
      <div className="absolute left-[16px] top-[148.15px] flex size-[40px] items-center justify-center">
        <div className="-rotate-90 flex-none">
          <div className="relative size-[40px]">
            <img alt="" src="/applications/wearables/ellipse-2.svg" className="absolute inset-0 block size-full max-w-none" />
          </div>
        </div>
      </div>
      {/* Stat */}
      <p
        className={`${gilroySemiBold.className} absolute top-[200.31px] text-[40px] leading-[normal] text-white whitespace-nowrap not-italic`}
        style={{ left: "calc(50% - 124.5px)" }}
      >
        {stat}
      </p>
      <p
        className={`${interRegular.className} absolute left-[17.89px] top-[252.59px] text-[14px] leading-[21px] text-[#f0f0f0] whitespace-nowrap not-italic`}
      >
        {label}
      </p>
    </div>
  );
}

const IMG_187 = "/applications/wearables/img-187.png";
const IMG_188 = "/applications/wearables/img-188.png";
const ECG_FALLBACK_STAT = "99.7%";
const ECG_FALLBACK_LABEL = "clinical graded";
const ECG_IMAGES = [IMG_187, IMG_188, IMG_187, IMG_188];

/* ── Mobile variants ─────────────────────────────────────────── */
function EcgCardMobile({
  imageSrc,
  stat,
  label,
}: {
  imageSrc: string;
  stat: string;
  label: string;
}) {
  return (
    <div className={`relative h-[240px] w-full shrink-0 ${CARD_BG}`}>
      <CardAbstractBg />
      <Corners
        leftSrc="/applications/wearables/vector-47.svg"
        rightSrc="/applications/wearables/vector-46.svg"
      />
      <div
        className="pointer-events-none absolute left-1/2 top-[-12px] flex w-[220px] -translate-x-1/2 items-center justify-center mix-blend-lighten"
        aria-hidden
      >
        <div className="-scale-y-100 flex-none rotate-180">
          <div className="relative h-[220px] w-full scale-85">
            <img alt="" src={imageSrc} className="absolute size-full max-w-none object-cover" />
            <div className="absolute inset-0" style={{ backgroundImage: IMG_OVERLAY_1 }} />
          </div>
        </div>
      </div>
      <div className="absolute left-[14px] top-[14px]">
        <Badge label="ECG Accuracy" width={133} />
      </div>
      <div className="absolute left-[14px] top-[120px] flex size-[32px] items-center justify-center">
        <div className="-rotate-90 flex-none">
          <div className="relative size-[32px]">
            <img alt="" src="/applications/wearables/ellipse-1.svg" className="absolute inset-0 block size-full max-w-none" />
          </div>
        </div>
      </div>
      <div className="absolute left-[14px] top-[120px] flex size-[32px] items-center justify-center">
        <div className="-rotate-90 flex-none">
          <div className="relative size-[32px]">
            <img alt="" src="/applications/wearables/ellipse-2.svg" className="absolute inset-0 block size-full max-w-none" />
          </div>
        </div>
      </div>
      <p
        className={`${gilroySemiBold.className} absolute left-1/2 top-[168px] -translate-x-1/2 text-[32px] leading-[normal] text-white whitespace-nowrap not-italic`}
      >
        {stat}
      </p>
      <p
        className={`${interRegular.className} absolute left-[14px] bottom-[12px] text-[12px] leading-[18px] text-[#f0f0f0] whitespace-nowrap not-italic`}
      >
        {label}
      </p>
    </div>
  );
}

export function WearablesEmpiricalProof({ data }: { data?: any }) {
  const subtitle = data?.subtitle || FALLBACK_SUBTITLE;
  const heading = data?.heading || FALLBACK_HEADING;
  const healthData = data?.health_card;
  const powerData = data?.power_card;
  const workloadData = data?.workload_card;
  const dataEcgCards: any[] = Array.isArray(data?.ecg_cards) ? data.ecg_cards : [];
  const ecgCards = Array.from({ length: 4 }).map((_, i) => {
    const c = dataEcgCards[i];
    return {
      imageSrc: ECG_IMAGES[i] ?? IMG_187,
      stat: c?.stat || ECG_FALLBACK_STAT,
      label: c?.label || ECG_FALLBACK_LABEL,
    };
  });

  const healthBadge = healthData?.badge || "The Workload";
  const healthTitle = healthData?.title || "Health Monitoring Solutions";
  const healthBody =
    healthData?.body ||
    "Continuous, on-device assault detection and biomarker analysis for early onset predictions for PCOD/PCOS to enable 24/7 women health and safety";
  const healthCta = healthData?.cta_label || "Download Case Study";
  const healthFooter =
    healthData?.footer || "Up to 2 weeks of continuous tracking with on-device AI.";

  const powerBadge = powerData?.badge || "Power Consumption";
  const powerPanels: any[] = Array.isArray(powerData?.panels) ? powerData.panels : [];
  const ambientPanel =
    powerPanels[0] || { label: "Ambient", value: "<1mW", description: "Lower energy usage" };
  const legacyPanel =
    powerPanels[1] || { label: "Legacy", value: "10mW", description: "Higher energy usage" };

  const workloadBadge = workloadData?.badge || "The Workload";
  const workloadStat = workloadData?.stat || "100%";
  const workloadLabel = workloadData?.label || "On-device";
  const workloadDescription = workloadData?.description || "No cloud dependency";

  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-black"
      data-node-id="2701:3790"
      data-name="The Empirical Proof"
      aria-label="The Empirical Proof"
    >
      {/* DESKTOP (>=1024px) */}
      <div className="relative hidden w-full max-w-[1440px] min-[1024px]:block h-[1000px]">
        {/* Top decorative SVG */}
        <div
          className="pointer-events-none absolute top-[-26.9px] left-1/2 h-[320px] w-[881.616px] -translate-x-1/2"
          data-name="Abstract Design"
        >
          <img
            alt=""
            src="/applications/wearables/abstract-design-top.svg"
            className="absolute inset-0 block size-full max-w-none"
            aria-hidden
          />
        </div>

        {/* Section title */}
        <div className="absolute left-1/2 top-[103.1px] -translate-x-1/2 flex flex-col items-center justify-center gap-[24px]">
          <div className="relative flex flex-col items-center px-[10px]" data-name="Title">
            <h2
              className={`${gilroyMedium.className} bg-clip-text text-center text-[46px] leading-[49px] font-medium text-transparent whitespace-nowrap not-italic [word-break:break-word]`}
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
            className={`${interRegular.className} w-[650px] text-center text-[14px] leading-[21px] text-[#f0f0f0] not-italic [word-break:break-word]`}
          >
            {subtitle}
          </p>
        </div>

        {/* Top row — 3 cards */}
        <div className="absolute left-1/2 top-[288.75px] flex -translate-x-1/2 items-center gap-[20px]">
          <HealthCard data={healthData} />
          <PowerCard data={powerData} />
          <WorkloadCard data={workloadData} />
        </div>

        {/* Bottom row — 4 ECG cards */}
        <div className="absolute left-1/2 top-[676.1px] flex -translate-x-1/2 gap-[20px]">
          {ecgCards.map((card, i) => (
            <EcgCard
              key={i}
              imageSrc={card.imageSrc}
              stat={card.stat}
              label={card.label}
            />
          ))}
        </div>
      </div>

      {/* MOBILE (<1024px) */}
      <div className="relative flex w-full flex-col items-center gap-[40px] px-[24px] pt-[72px] pb-[72px] min-[1024px]:hidden">
        {/* Title */}
        <div className="flex flex-col items-center gap-[20px]">
          <div className="relative flex flex-col items-center px-[10px]">
            <h2
              className={`${gilroyMedium.className} bg-clip-text text-center text-[32px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
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
            className={`${interRegular.className} max-w-[327px] text-center text-[13px] leading-[20px] text-[#f0f0f0] not-italic`}
          >
            {subtitle}
          </p>
        </div>

        {/* Health card (mobile) */}
        <div className={`relative w-full shrink-0 ${CARD_BG} p-[20px]`}>
          <CardAbstractBg />
          <Corners
            leftSrc="/applications/wearables/vector-47.svg"
            rightSrc="/applications/wearables/vector-46.svg"
          />
          <div className="relative flex flex-col gap-[12px]">
            <Badge label={healthBadge} width={137} />
            <p className={`${gilroyMedium.className} text-[20px] leading-[26px] text-white not-italic`}>
              {healthTitle}
            </p>
            <p className={`${interRegular.className} text-[14px] leading-[21px] text-[rgba(255,255,255,0.6)] not-italic`}>
              {healthBody}
            </p>
            <p className={`${interRegular.className} text-[13px] leading-[20px] text-[#a4a4a4] not-italic`}>
              {healthFooter}
            </p>
            <a
              href="#"
              className={`${gilroyMedium.className} relative mt-[4px] flex h-[48px] w-full items-center justify-center overflow-hidden shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]`}
            >
              <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]" />
              <GreenCtaCorners />
              <span className="relative whitespace-nowrap text-[14px] leading-[28px] font-medium text-white uppercase not-italic">
                {healthCta}
              </span>
              <span aria-hidden className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]" />
            </a>
          </div>
        </div>

        {/* Power card (mobile) */}
        <div className={`relative w-full shrink-0 ${CARD_BG} pt-[24px] pb-[20px]`}>
          <CardAbstractBg />
          <Corners
            leftSrc="/applications/wearables/vector-47.svg"
            rightSrc="/applications/wearables/vector-46.svg"
          />
          <div className="relative flex flex-col items-center gap-[16px]">
            <Badge label={powerBadge} width={176} />
            <div className="flex w-full justify-around">
              <div className="flex flex-col items-center gap-[10px]">
                <p className={`${gilroyMedium.className} text-[16px] leading-[20px] text-white not-italic`}>{ambientPanel.label}</p>
                <div className="flex w-[40px] flex-col gap-[4px]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-[12px] w-[40px] rounded-[1px] bg-gradient-to-b from-[rgba(140,230,108,0.5)] to-[rgba(27,47,20,0.5)] mix-blend-luminosity" />
                  ))}
                  <div className="h-[24px] w-[40px] rounded-[1px] bg-gradient-to-b from-[#a8ed90] to-[#357120]" />
                </div>
                <p className={`${gilroySemiBold.className} text-[24px] text-white`}>{ambientPanel.value}</p>
                <p className={`${interRegular.className} text-[11px] leading-[16px] text-[#f0f0f0]`}>{ambientPanel.description}</p>
              </div>
              <div className="flex flex-col items-center gap-[10px]">
                <p className={`${gilroyMedium.className} text-[16px] leading-[20px] text-white not-italic`}>{legacyPanel.label}</p>
                <div className="flex w-[40px] flex-col gap-[4px]">
                  <div className="h-[12px] w-[40px] rounded-[1px] bg-gradient-to-b from-[rgba(140,230,108,0.5)] to-[rgba(27,47,20,0.5)] mix-blend-luminosity" />
                  <div className="h-[12px] w-[40px] rounded-[1px] bg-gradient-to-b from-[#e66c6c] from-[42.377%] to-[#3a131e] to-[150.73%]" />
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-[12px] w-[40px] rounded-[1px]" style={{ backgroundImage: RED_DUAL }} />
                  ))}
                  <div className="h-[24px] w-[40px] rounded-[1px] bg-gradient-to-b from-[#e66c6c] from-[42.377%] to-[#3a131e] to-[150.73%]" />
                </div>
                <p className={`${gilroySemiBold.className} text-[24px] text-white`}>{legacyPanel.value}</p>
                <p className={`${interRegular.className} text-[11px] leading-[16px] text-[#f0f0f0]`}>{legacyPanel.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Workload card (mobile) */}
        <div className={`relative h-[280px] w-full shrink-0 ${CARD_BG}`}>
          <CardAbstractBg />
          <Corners
            leftSrc="/applications/wearables/vector-47.svg"
            rightSrc="/applications/wearables/vector-46.svg"
          />
          <div className="absolute left-1/2 top-[18px] -translate-x-1/2">
            <Badge label={workloadBadge} width={137} />
          </div>
          <WorkloadDiagram />
          <p className={`${gilroySemiBold.className} absolute left-1/2 top-[170px] -translate-x-1/2 text-[36px] leading-[normal] text-white whitespace-nowrap not-italic`}>
            {workloadStat}
          </p>
          <p className={`${interRegular.className} absolute left-1/2 top-[216px] -translate-x-1/2 text-[13px] leading-[20px] text-[#f0f0f0] whitespace-nowrap not-italic`}>
            {workloadLabel}
          </p>
          <p className={`${interRegular.className} absolute left-1/2 top-[238px] -translate-x-1/2 text-[11px] leading-[16px] text-white whitespace-nowrap not-italic`}>
            {workloadDescription}
          </p>
        </div>

        {/* ECG cards (mobile) — 2x2 grid on standard phones, single column on narrow viewports to prevent badge clipping */}
        <div className="grid w-full grid-cols-1 gap-[12px] min-[360px]:grid-cols-2">
          {ecgCards.map((card, i) => (
            <EcgCardMobile
              key={i}
              imageSrc={card.imageSrc}
              stat={card.stat}
              label={card.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
