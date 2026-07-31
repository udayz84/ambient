import { mediaUrl } from "@/lib/strapi";
import { gilroyMedium, interRegular, interSemiBold } from "../hero/fonts";
import { GradientTitle, CornerDecor } from "../contact/contact-shared";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";

/**
 * Figma 3031:508 ("Graph") — "A unified architecture for seamless adoption
 * and scalability." 1440×849 canvas: left-aligned header, five products
 * (chip/device render above the label, glowing cube below) standing on a
 * shared baseline with dashed guide lines, axis footnotes, and two CTAs.
 */

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

/** Glowing cube renders standing above the baseline (3491:629/631/632/634/633). */
const CUBES = [
  { nodeId: "3491:629", left: 126, top: 510, w: 129, h: 123, src: "/technology/graph-cube-1.png" },
  { nodeId: "3491:631", left: 334, top: 472, w: 168, h: 161, src: "/technology/graph-cube-2.png" },
  { nodeId: "3491:632", left: 572, top: 439, w: 191, h: 183, src: "/technology/graph-cube-3.png" },
  { nodeId: "3491:634", left: 813, top: 424, w: 207, h: 198, src: "/technology/graph-cube-4.png", innerH: "104.37%", innerTop: "-3.78%" },
  { nodeId: "3491:633", left: 1057, top: 393, w: 240, h: 229, src: "/technology/graph-cube-5.png", innerH: "104.8%", innerTop: "-3.71%" },
];

/** Chip/device renders above each product label (3510:539 / 3515:539 / 3515:541 / 3522:530 / 3522:533). */
const TOP_IMAGES = [
  { nodeId: "3510:539", left: 126, top: 260, w: 129, h: 123, src: "/technology/graph-chip-1.png", fit: "object-contain" },
  { nodeId: "3515:539", left: 353, top: 223, w: 129, h: 123, src: "/technology/graph-chip-2.png", fit: "object-contain" },
  { nodeId: "3515:541", left: 602, top: 193, w: 129, h: 123, src: "/technology/graph-chip-3.png", fit: "object-contain" },
  { nodeId: "3522:530", left: 847.17, top: 185, w: 158.119, h: 90.354, src: "/technology/graph-device-1.png", fit: "object-cover" },
  { nodeId: "3522:533", left: 1106.6, top: 171.82, w: 141.252, h: 70.626, src: "/technology/graph-device-2.png", fit: "object-cover" },
];

/** Dashed vertical guide lines — horizontal svgs rotated 90° (3031:525/571/581/591/610). */
const VLINES = [
  { left: 190.14, top: 476, h: 196, w: 0.37, deg: "rotate-[90.11deg]", src: "/technology/graph-vline-new-1.svg", inset: "-1.73px -0.17% -1.73px -0.88%" },
  { left: 418, top: 440, h: 232.06, w: 0, deg: "rotate-90", src: "/technology/graph-vline-new-2.svg", inset: "-1.73px -0.14% -1.73px -0.75%" },
  { left: 668.02, top: 408, h: 264.559, w: 0, deg: "rotate-90", src: "/technology/graph-vline-new-3.svg", inset: "-1.73px -0.12% -1.73px -0.66%" },
  { left: 916, top: 378, h: 294, w: 0, deg: "rotate-90", src: "/technology/graph-vline-new-4.svg", inset: "-1.73px -0.11% -1.73px -0.59%" },
  { left: 1177.15, top: 348, h: 324, w: 0, deg: "rotate-90", src: "/technology/graph-vline-new-5.svg", inset: "-1.73px -0.1% -1.73px -0.53%" },
];

type LabelConfig = {
  left: number;
  top: number;
  name: string;
  cat: string;
  topImageSrc?: string;
  bottomImageSrc?: string;
};

const LABEL_CONFIG: LabelConfig[] = [
  { left: 142.15, top: 385, name: "GPX10", cat: "EDGE SENSOR" },
  { left: 357.18, top: 349, name: "GPX10 Pro", cat: "EDGE AI SOC" },
  { left: 608.2, top: 317, name: "GPX Vision", cat: "ON - DEVICE VISION" },
  { left: 841.22, top: 287, name: "GPX Compute", cat: "ON - DEVICE VISION" },
  { left: 1101.22, top: 257, name: "GPX Compute", cat: "ON - DEVICE VISION" },
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
    <div className="absolute top-[754.55px] left-1/2 flex -translate-x-1/2 items-start gap-[24px]" data-node-id="3035:713">
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
        className={`${gilroyMedium.className} relative block h-[48px] w-[263px] shrink-0 bg-[rgba(226,241,202,0.12)] px-[20px] py-[10px]`}
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
      topImageSrc: mediaUrl(l?.top_image) || undefined,
      bottomImageSrc: mediaUrl(l?.bottom_image) || undefined,
    };
  });

  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-black"
      data-node-id="3031:508"
      data-name="Graph"
      aria-label="A unified architecture for seamless adoption and scalability"
    >
      {/* DESKTOP (>=1024px) — 1440×849 canvas */}
      <div className="relative hidden h-[849px] w-full max-w-[1440px] min-[1024px]:block">
        {/* 3031:512 — header (left-aligned) */}
        <div
          className="absolute top-[42px] left-[80px] z-10 flex flex-col items-start gap-[24px]"
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

        {/* chip/device renders above the labels */}
        {TOP_IMAGES.map((img, i) => {
          const src = labels[i]?.topImageSrc;
          if (!src) return null;
          return (
            <div
              key={img.nodeId}
              className="absolute"
              style={{ left: img.left, top: img.top, width: img.w, height: img.h }}
              data-node-id={img.nodeId}
              data-name="Product Image"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                aria-hidden
                className={`pointer-events-none absolute inset-0 size-full max-w-none ${img.fit}`}
              />
            </div>
          );
        })}

        {/* product labels (Product Details) */}
        {labels.map((l, i) => (
          <div
            key={`label-${i}`}
            className="absolute flex flex-col items-start gap-[12px]"
            style={{ left: l.left, top: l.top }}
            data-name="Product Details"
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

        {/* dashed vertical guide lines (horizontal svg rotated 90°) */}
        {VLINES.map((v, i) => (
          <div
            key={`vline-${i}`}
            className="absolute flex items-center justify-center"
            style={{ left: v.left, top: v.top, height: v.h, width: v.w }}
            aria-hidden
          >
            <div className={`flex-none ${v.deg}`}>
              <div className="relative h-0" style={{ width: v.h }}>
                <div className="absolute" style={{ inset: v.inset }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={v.src}
                    alt=""
                    className="block size-full max-w-none"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* glowing cubes above the baseline */}
        {CUBES.map((img, i) => {
          const src = labels[i]?.bottomImageSrc;
          if (!src) return null;
          return (
            <div
              key={img.nodeId}
              className="absolute"
              style={{ left: img.left, top: img.top, width: img.w, height: img.h }}
              data-node-id={img.nodeId}
              data-name="Product Image"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                aria-hidden
                className="pointer-events-none absolute inset-0 size-full max-w-none object-contain"
              />
            </div>
          );
        })}

        {/* baseline (line 118) */}
        <div
          className="absolute top-[673.05px] left-1/2 h-px w-[1260px] -translate-x-1/2"
          data-node-id="3031:521"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={BASELINE}
            alt=""
            aria-hidden
            className="block size-full max-w-none"
          />
        </div>

        {/* axis footnotes */}
        <p
          className={`${interRegular.className} absolute top-[686.55px] left-[90px] text-[14px] leading-[22.75px] font-normal tracking-[-0.1504px] whitespace-nowrap text-[rgba(255,255,255,0.4)] not-italic`}
          data-node-id="3031:522"
        >
          {axisLeft}
        </p>
        <p
          className={`${interRegular.className} absolute top-[686.55px] left-[1350px] -translate-x-full text-right text-[14px] leading-[22.75px] font-normal tracking-[-0.1504px] whitespace-nowrap text-[rgba(255,255,255,0.4)] not-italic`}
          data-node-id="3031:524"
        >
          {axisRight}
        </p>

        {/* center footnote */}
        <p
          className={`${interSemiBold.className} absolute top-[686.55px] text-[14px] tracking-[-0.1504px] whitespace-nowrap not-italic`}
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

        {/* scaled cube row — positioned by % so they always fit the container */}
        <div className="relative mx-auto h-[220px] w-full max-w-[380px] overflow-hidden">
          {CUBES.map((img, i) => {
            const scale = 380 / 1440;
            return (
              <div
                key={`m-cube-${i}`}
                className="absolute origin-bottom-left"
                style={{
                  left: `${(img.left / 1440) * 100}%`,
                  bottom: 0,
                  width: img.w * scale,
                  height: img.h * scale,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt="" aria-hidden className="block size-full max-w-none object-cover" />
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
            className={`${gilroyMedium.className} relative block h-[48px] w-full bg-[rgba(226,241,202,0.12)] px-[20px] py-[10px]`}
          >
            <span className="relative flex h-full items-center justify-center text-[12px] min-[290px]:text-[15px] leading-[28px] font-medium whitespace-nowrap text-white uppercase not-italic">
              {secondaryLabel}
            </span>
            <GreenCtaCorners />
          </a>
        </div>
      </div>
    </section>
  );
}
