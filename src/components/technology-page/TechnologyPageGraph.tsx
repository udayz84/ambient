import { gilroyMedium, interRegular, interSemiBold } from "../hero/fonts";
import { GradientTitle, CornerDecor } from "../contact/contact-shared";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";

const BASELINE = "/technology/graph-baseline.svg";
const LABEL_LINE = "/technology/graph-label-line.svg";
const FALLBACK_SUBTITLE =
  "The same chip, tuned to the job — from a wrist to a factory floor.";

const TITLE_GRADIENT_DEG = "115.765deg";

const FALLBACK_HEADING =
  "A unified architecture for seamless adoption and scalability.";
const FALLBACK_AXIS_LEFT = "MICROWATT EDGE";
const FALLBACK_AXIS_RIGHT = "HYPERSCALE CLOUD";
const FALLBACK_CENTER_TEXT =
  "ONE CORE. ONE SOFTWARE STACK. \nFrom the smallest sensor to largest serve";
const FALLBACK_PRIMARY_LABEL = "Read the Whitepaper";
const FALLBACK_SECONDARY_LABEL = "Watch the 3-min Explainer";

const BARS = [
  { left: 182.51, top: 497.32, w: 101.436, h: 155.592, src: "/technology/graph-bar-1.svg" },
  { left: 415.36, top: 454.59, w: 101.535, h: 198.315, src: "/technology/graph-bar-2.svg" },
  { left: 648.38, top: 413.78, w: 101.439, h: 239.127, src: "/technology/graph-bar-3.svg" },
  { left: 881.4, top: 359.0, w: 101.483, h: 293.907, src: "/technology/graph-bar-4.svg" },
  { left: 1131.4, top: 292.0, w: 101.488, h: 360.907, src: "/technology/graph-bar-5.svg" },
];

const VLINES = [
  { left: 182.15, top: 464.16, h: 189.395, src: "/technology/graph-vline-1.svg" },
  { left: 415.0, top: 425.5, h: 228.064, src: "/technology/graph-vline-2.svg" },
  { left: 648.02, top: 389.0, h: 264.559, src: "/technology/graph-vline-3.svg" },
  { left: 881.14, top: 333.5, h: 320.059, src: "/technology/graph-vline-4.svg" },
  { left: 1131.14, top: 267.0, h: 386.559, src: "/technology/graph-vline-5.svg" },
];

type LabelConfig = {
  left: number;
  top: number;
  name: string;
  cat: string;
};

const LABEL_CONFIG: LabelConfig[] = [
  { left: 182.15, top: 366, name: "GPX10", cat: "EDGE SENSOR" },
  { left: 415.18, top: 330, name: "GPX10 Pro", cat: "EDGE AI SOC" },
  { left: 648.2, top: 298, name: "GPX Vision", cat: "ON - DEVICE VISION" },
  { left: 881.22, top: 238, name: "GPX Compute", cat: "ON - DEVICE VISION" },
  { left: 1131.22, top: 158, name: "GPX Compute", cat: "ON - DEVICE VISION" },
];

const GREEN_CTA_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

function GraphCtas({
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: {
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}) {
  return (
    <div className="absolute top-[735.55px] left-1/2 flex -translate-x-1/2 items-start gap-[24px]" data-node-id="3035:713">
      <a
        href={primaryHref}
        className={`${gilroyMedium.className} ${GREEN_CTA_SHADOW} relative block h-[48px] w-[223px] shrink-0`}
        data-node-id="3035:714"
        data-name="Cta"
      >
        <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]" />
        <span aria-hidden className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]" />
        <span className="absolute top-[calc(50%-14px)] left-1/2 -translate-x-1/2 text-[16px] leading-[28px] font-medium whitespace-nowrap text-white uppercase not-italic">
          {primaryLabel}
        </span>
        <GreenCtaCorners />
      </a>
      <a
        href={secondaryHref}
        className={`${gilroyMedium.className} relative block h-[48px] w-[263px] shrink-0 overflow-clip bg-[rgba(226,241,202,0.12)] px-[20px] py-[10px]`}
        data-node-id="3035:725"
        data-name="CTA - Secondary"
      >
        <span className="relative flex h-full items-center text-[16px] leading-[28px] font-medium whitespace-nowrap text-white uppercase not-italic">
          {secondaryLabel}
        </span>
        <GreenCtaCorners />
      </a>
    </div>
  );
}

export function TechnologyPageGraph({ data }: { data?: any } = {}) {
  const heading = data?.heading || FALLBACK_HEADING;
  const subtitle = data?.subtitle || FALLBACK_SUBTITLE;
  const axisLeft = data?.axis_label_left || FALLBACK_AXIS_LEFT;
  const axisRight = data?.axis_label_right || FALLBACK_AXIS_RIGHT;
  const centerText = data?.center_text || FALLBACK_CENTER_TEXT;
  const centerLines = centerText.split("\n");
  const primaryLabel = data?.primary_button?.label || FALLBACK_PRIMARY_LABEL;
  const primaryHref = data?.primary_button?.href || "#";
  const secondaryLabel =
    data?.secondary_button?.label || FALLBACK_SECONDARY_LABEL;
  const secondaryHref = data?.secondary_button?.href || "#";

  const strapiLabels = Array.isArray(data?.labels) ? data.labels : [];
  const labels: LabelConfig[] = LABEL_CONFIG.map((cfg, i) => {
    const l = strapiLabels[i];
    return {
      ...cfg,
      name: (l?.label as string) || cfg.name,
      cat: (l?.sub_label as string) || cfg.cat,
    };
  });

  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-black"
      data-node-id="3031:508"
      data-name="Graph"
      aria-label="A unified architecture for seamless adoption and scalability"
    >
      {/* DESKTOP (>=1024px) */}
      <div className="relative hidden h-[799px] w-full max-w-[1440px] min-[1024px]:block">
        {/* 3031:512 — header (left-aligned) */}
        <div
          className="absolute top-[32px] left-[80px] z-10 flex flex-col items-start gap-[24px]"
          data-node-id="3031:512"
          data-name="Section Title"
        >
          <div
            className="relative flex flex-col items-center px-[10px]"
            data-node-id="3031:513"
            data-name="Title"
          >
            <GradientTitle
              gradientDeg={TITLE_GRADIENT_DEG}
              nodeId="3031:514"
              className="w-[731.336px]"
            >
              {heading}
            </GradientTitle>
            <CornerDecor />
          </div>
          <p
            className={`${interRegular.className} text-[14px] leading-[21px] font-normal whitespace-nowrap text-[#f0f0f0] not-italic`}
            data-node-id="3031:519"
          >
            {subtitle}
          </p>
        </div>

        {/* bars */}
        {BARS.map((b, i) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={`bar-${i}`}
            src={b.src}
            alt=""
            aria-hidden
            className="absolute block max-w-none"
            style={{ left: b.left, top: b.top, width: b.w, height: b.h }}
          />
        ))}

        {/* vertical guide lines (horizontal svg rotated 90°) */}
        {VLINES.map((v, i) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={`vline-${i}`}
            src={v.src}
            alt=""
            aria-hidden
            className="absolute block max-w-none rotate-90 origin-top-left"
            style={{ left: v.left, top: v.top, width: v.h, height: 3.467 }}
          />
        ))}

        {/* baseline (line 118) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={BASELINE}
          alt=""
          aria-hidden
          className="absolute top-[654.05px] left-1/2 block max-w-none -translate-x-1/2"
          style={{ width: 1260, height: 1 }}
          data-node-id="3031:521"
        />

        {/* bar labels */}
        {labels.map((l, i) => (
          <div
            key={`label-${i}`}
            className="absolute flex flex-col items-start gap-[12px]"
            style={{ left: l.left, top: l.top }}
          >
            <p
              className={`${gilroyMedium.className} text-[26px] leading-[29px] font-medium whitespace-nowrap text-white not-italic`}
            >
              {l.name}
            </p>
            <p
              className={`${interRegular.className} text-[12px] leading-[18px] font-normal whitespace-nowrap text-[#f0f0f0] not-italic`}
            >
              {l.cat}
            </p>
            {/* label underline (line 88) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={LABEL_LINE}
              alt=""
              aria-hidden
              className="block max-w-none"
              style={{ width: 151.832, height: 1 }}
            />
          </div>
        ))}

        {/* axis footnotes */}
        <p
          className={`${interRegular.className} absolute top-[667.55px] left-[90px] text-[14px] leading-[22.75px] font-normal tracking-[-0.1504px] whitespace-nowrap text-[rgba(255,255,255,0.4)] not-italic`}
          data-node-id="3031:522"
        >
          {axisLeft}
        </p>
        <p
          className={`${interRegular.className} absolute top-[667.55px] left-[1350px] -translate-x-full text-right text-[14px] leading-[22.75px] font-normal tracking-[-0.1504px] whitespace-nowrap text-[rgba(255,255,255,0.4)] not-italic`}
          data-node-id="3031:524"
        >
          {axisRight}
        </p>

        {/* center footnote */}
        <p
          className={`${interSemiBold.className} absolute top-[667.55px] text-[14px] tracking-[-0.1504px] whitespace-nowrap not-italic`}
          style={{ left: "calc(50% - 270px)" }}
          data-node-id="3035:711"
        >
          {centerLines[0] ? (
            <span className="font-semibold leading-[22.75px] text-white">
              {centerLines[0]}
            </span>
          ) : null}
          {centerLines[1] ? (
            <span className={`${interRegular.className} font-normal leading-[22.75px] text-[rgba(255,255,255,0.7)]`}>
              {centerLines[1]}
            </span>
          ) : null}
        </p>

        <GraphCtas
          primaryLabel={primaryLabel}
          primaryHref={primaryHref}
          secondaryLabel={secondaryLabel}
          secondaryHref={secondaryHref}
        />
      </div>

      {/* MOBILE (<1024px) — basic responsive version */}
      <div className="flex w-full flex-col items-start gap-[28px] px-[24px] py-[56px] min-[1024px]:hidden">
        <div
          className={`${gilroyMedium.className} bg-clip-text text-[30px] leading-[35px] font-medium text-transparent not-italic`}
          style={{
            backgroundImage: `linear-gradient(${TITLE_GRADIENT_DEG}, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          {heading}
        </div>
        <p
          className={`${interRegular.className} max-w-[327px] text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic`}
        >
          {subtitle}
        </p>

        {/* scaled chart — bars positioned by % so they always fit the container */}
        <div className="relative mx-auto h-[300px] w-full max-w-[380px] overflow-hidden">
          {BARS.map((b, i) => {
            const scale = 380 / 1440;
            return (
              <div
                key={`m-bar-${i}`}
                className="absolute origin-bottom-left"
                style={{
                  left: `${(b.left / 1440) * 100}%`,
                  bottom: 0,
                  width: b.w * scale,
                  height: b.h * scale,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.src} alt="" aria-hidden className="block size-full max-w-none" />
              </div>
            );
          })}
          <div className="absolute bottom-0 left-0 h-px w-full bg-[#4a4a4a]" />
        </div>

        <div className="grid w-full grid-cols-2 gap-x-[16px] gap-y-[16px]">
          {labels.map((l, i) => (
            <div key={`m-label-${i}`} className="flex flex-col gap-[4px]">
              <p className={`${gilroyMedium.className} text-[18px] leading-[22px] font-medium text-white not-italic`}>
                {l.name}
              </p>
              <p className={`${interRegular.className} text-[10px] leading-[14px] font-normal tracking-[0.2px] whitespace-nowrap text-[#f0f0f0] uppercase not-italic`}>
                {l.cat}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-[8px] flex w-full flex-col items-stretch gap-[12px]">
          <a
            href={primaryHref}
            className={`${gilroyMedium.className} ${GREEN_CTA_SHADOW} relative block h-[48px] w-full`}
          >
            <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]" />
            <span className="absolute top-[calc(50%-14px)] left-1/2 -translate-x-1/2 text-[15px] leading-[28px] font-medium whitespace-nowrap text-white uppercase not-italic">
              {primaryLabel}
            </span>
            <GreenCtaCorners />
          </a>
          <a
            href={secondaryHref}
            className={`${gilroyMedium.className} relative block h-[48px] w-full overflow-clip bg-[rgba(226,241,202,0.12)] px-[20px] py-[10px]`}
          >
            <span className="relative flex h-full items-center justify-center text-[15px] leading-[28px] font-medium whitespace-nowrap text-white uppercase not-italic">
              {secondaryLabel}
            </span>
            <GreenCtaCorners />
          </a>
        </div>
      </div>
    </section>
  );
}
