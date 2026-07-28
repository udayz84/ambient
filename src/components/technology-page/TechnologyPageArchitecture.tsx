import { mediaUrl } from "@/lib/strapi";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { TagBadge } from "../hero/TagBadge";
import { GradientTitle, CornerDecor } from "../contact/contact-shared";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";

/**
 * Figma 3330:1261 ("Desktop - 17") — "One architecture that thinks,
 * senses, & speaks you language" section. 1440×1833 canvas: title block at
 * the top, three pillar cards (CubicCore / SenseMesh / ModelForge) stacked
 * on the left, the brain visual on the right, and dotted connector lines
 * between each card and the brain.
 * Supersedes the old architecture header (3060:1241) and pillars row.
 */

const BRAIN_IMG = "/technology/architecture-brain.png";
const CONNECTOR_LINE = "/technology/architecture-line.svg";

const TITLE_GRADIENT_DEG = "113.506deg";
const ICON_BG =
  "radial-gradient(80% 100% at 50% 0%, #394a36 0%, #2b3629 50%, #1d221c 100%)";
const CTA_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

const FALLBACK_HEADING =
  "One architecture that thinks\nsenses, & speaks you language";
const FALLBACK_SUBTITLE =
  "Three breakthroughs as one: a physics-based brain, a responsive nervous system, and familiar language. Server-class AI with low power.";

type Pillar = {
  nodeId: string;
  /** Card geometry on the 1440×1833 canvas. */
  left: number;
  top: number;
  cardWidth: number;
  statWidth: number;
  statGap: number;
  statPadBottom: number;
  icon: string;
  iconInnerInset?: string;
  iconImgInset?: string;
  tag: string;
  tagWidth: number;
  tagHeight: number;
  tagTop: number;
  tagRightBarLeft: number;
  tagLeftBarLeft: number;
  title: string;
  subtitle: string;
  desc: string;
  bullets: string[];
  cta?: string;
  ctaHref?: string;
};

const PILLARS: Pillar[] = [
  {
    nodeId: "3037:480",
    left: 162,
    top: 275.35,
    cardWidth: 380,
    statWidth: 340,
    statGap: 40,
    statPadBottom: 12,
    icon: "/technology/icon-cubiccore.svg",
    iconInnerInset: "8.33%",
    iconImgInset: "-3.75%",
    tag: "The Brain That think",
    tagWidth: 181,
    tagHeight: 28,
    tagTop: 17.65,
    tagRightBarLeft: 169.48,
    tagLeftBarLeft: 9.48,
    title: "CubicCore™",
    subtitle: "Server-class math. Microwatt power.",
    desc: "It runs the math on physics itself. Ohm's law multiplies, Kirchhoff's law sums - right inside the memory, almost for free. Digital keeps every result exact.",
    bullets: [
      "In-memory analog compute - no data commute",
      "~1/100th the energy per operation vs. digital",
      "Scales by replication - tile in more cores, from a smart ring to a server",
      "Fully programmable · 4–32-bit precision, tuned at runtime",
      "Built in standard CMOS - no exotic process",
    ],
  },
  {
    nodeId: "3346:600",
    left: 155,
    top: 794,
    cardWidth: 389,
    statWidth: 340,
    statGap: 40,
    statPadBottom: 12,
    icon: "/technology/icon-sensemesh.svg",
    tag: "The Nervous System",
    tagWidth: 180,
    tagHeight: 26,
    tagTop: 18,
    tagRightBarLeft: 171.48,
    tagLeftBarLeft: 6.48,
    title: "SenseMesh™",
    subtitle: "Knows when to think - and how hard.",
    desc: "Reflexes in hardware. It fuses every sensor into one clean stream, filters out the noise, and decides - in hardware - when to wake the brain and how much power it needs.",
    bullets: [
      "Hardware sensor fusion - no host polling, no firmware overhead",
      "Event-driven wake - compute fires only on real signals",
      "Multimodal by design - motion, audio, vision into one stream",
      ">80% less idle host power vs. legacy MCUs",
    ],
  },
  {
    nodeId: "3346:507",
    left: 152.5,
    top: 1305,
    cardWidth: 396,
    statWidth: 356,
    statGap: 32,
    statPadBottom: 20,
    icon: "/technology/icon-modelforge.svg",
    iconInnerInset: "16.67%",
    iconImgInset: "-4.69%",
    tag: "The Language",
    tagWidth: 160,
    tagHeight: 26,
    tagTop: 18,
    tagRightBarLeft: 151.48,
    tagLeftBarLeft: 6.48,
    title: "ModelForge™",
    subtitle: "No new language to learn.",
    desc: "Bring your own models in TensorFlow, Keras, or ONNX. A push-button compiler does the translation - no rewrites, no proprietary toolchain.",
    bullets: [
      "Drop-in support for TensorFlow, Keras, ONNX",
      "Push-button compile - concept to silicon, no rewrites",
      "Speaks matrix math natively — none of the translation tax Arm/RISC-V pay",
      "One workflow that ports across every A-Cube product",
    ],
    cta: "Explore the Developer Hub",
    ctaHref: "/developer",
  },
];

function buildPillars(data: any): Pillar[] {
  const strapiPillars = Array.isArray(data?.pillars) ? data.pillars : null;
  if (!strapiPillars || strapiPillars.length === 0) return PILLARS;
  return strapiPillars.map((p: any, i: number) => {
    const fb = PILLARS[i] ?? PILLARS[PILLARS.length - 1];
    const bulletsText = (p?.bullets as string) || fb.bullets.join("\n");
    const bullets = bulletsText
      .split("\n")
      .map((b) => b.trim())
      .filter((b) => b.length > 0);
    return {
      ...fb,
      icon: mediaUrl(p?.icon) || fb.icon,
      tag: (p?.tag as string) || fb.tag,
      title: (p?.title as string) || fb.title,
      subtitle: (p?.subtitle as string) || fb.subtitle,
      desc: (p?.description as string) || fb.desc,
      bullets: bullets.length > 0 ? bullets : fb.bullets,
      cta: (p?.cta?.label as string) || fb.cta,
      ctaHref: (p?.cta?.href as string) || fb.ctaHref || "/developer",
    };
  });
}

function IconBox({ pillar }: { pillar: Pillar }) {
  return (
    <div
      className="relative size-[40px] shrink-0 rounded-[6.667px]"
      style={{ background: ICON_BG }}
      data-name="Icon"
    >
      <div className="absolute left-1/2 top-[calc(50%-0.39px)] size-[24px] -translate-x-1/2 -translate-y-1/2 overflow-clip">
        {pillar.iconInnerInset ? (
          <div className="absolute" style={{ inset: pillar.iconInnerInset }}>
            <div className="absolute" style={{ inset: pillar.iconImgInset }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={pillar.icon}
                alt=""
                className="block size-full max-w-none"
              />
            </div>
          </div>
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={pillar.icon}
            alt=""
            className="absolute inset-0 block size-full max-w-none"
          />
        )}
      </div>
    </div>
  );
}

function PillarCta({ pillar }: { pillar: Pillar }) {
  return (
    <a
      href={pillar.ctaHref || "/developer"}
      className={`${gilroyMedium.className} relative block h-[48px] w-[250px] max-[1023px]:w-full shrink-0 overflow-clip ${CTA_SHADOW}`}
      data-node-id="3919:515"
      data-name="Cta"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
      />
      <span className="absolute left-[16.5px] top-[calc(50%-14px)] text-[16px] leading-[28px] font-medium whitespace-nowrap text-white uppercase not-italic [word-break:break-word]">
        {pillar.cta}
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
      />
      <GreenCtaCorners />
    </a>
  );
}

/** Card inner content ("Stat" frame) — shared by desktop and mobile. */
function PillarStat({
  pillar,
  fullWidth = false,
}: {
  pillar: Pillar;
  fullWidth?: boolean;
}) {
  return (
    <div
      className={`relative flex shrink-0 flex-col items-start pt-[12px] ${fullWidth ? "w-full" : ""}`}
      style={{
        width: fullWidth ? undefined : pillar.statWidth,
        gap: pillar.statGap,
        paddingBottom: pillar.statPadBottom,
      }}
      data-name="Stat"
    >
      <IconBox pillar={pillar} />

      {/* tag — absolutely placed beside the icon */}
      <div
        className="absolute left-[56px]"
        style={{ top: pillar.tagTop }}
        data-name="Logo and Menu"
      >
        <TagBadge
          label={pillar.tag}
          width={pillar.tagWidth}
          height={pillar.tagHeight}
          labelOffsetX={0}
          rightBarLeft={pillar.tagRightBarLeft}
          leftBarLeft={pillar.tagLeftBarLeft}
          centerLabel
        />
      </div>

      <div
        className="flex w-full flex-col items-start gap-[12px]"
        data-name="Frame 1984079533"
      >
        <p
          className={`${gilroyMedium.className} w-[279px] max-[1023px]:w-full text-[32px] leading-[38px] font-medium text-white not-italic`}
        >
          {pillar.title}
        </p>
        <p
          className={`${interRegular.className} text-[13px] leading-[normal] font-normal text-[#6fe047] not-italic`}
        >
          {pillar.subtitle}
        </p>
        <p
          className={`${interRegular.className} w-full text-[13px] leading-[normal] font-normal text-[#8e8e8e] not-italic [word-break:break-word]`}
        >
          {pillar.desc}
        </p>
      </div>

      <div
        className={`${interRegular.className} flex w-full flex-col items-start gap-[12px] font-normal leading-[normal] not-italic`}
        data-name="Frame 1984079535"
      >
        {pillar.bullets.map((b, i) => (
          <div key={i} className="flex w-full items-start gap-[5px]">
            <p className="text-[14px] tracking-[-0.1504px] whitespace-nowrap text-[#3a9719] not-italic [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
              +
            </p>
            <p className="min-w-px flex-1 whitespace-pre-line text-[13px] text-[rgba(255,255,255,0.9)] not-italic [word-break:break-word]">
              {b}
            </p>
          </div>
        ))}
      </div>

      {pillar.cta ? <PillarCta pillar={pillar} /> : null}
    </div>
  );
}

/** Brain visual — three stacked crops of the same sprite (3342:1559 / 3529:528 / 3529:527). */
function BrainVisual() {
  return (
    <>
      <div
        className="absolute top-[158px] right-[90px] h-[589px] w-[784px]"
        data-node-id="3529:528"
        data-name="brsain 3"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={BRAIN_IMG}
            alt=""
            className="absolute top-[0.66%] left-[-0.01%] h-[235.48%] w-[99.97%] max-w-none"
          />
        </div>
      </div>
      <div
        className="absolute top-[747px] right-[90px] h-[264px] w-[784px]"
        data-node-id="3342:1559"
        data-name="brsain 1"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={BRAIN_IMG}
            alt=""
            className="absolute top-[-2659.54%] left-[-0.01%] h-[6304.38%] w-[99.97%] max-w-none"
          />
        </div>
      </div>
      <div
        className="absolute top-[1011px] right-[90px] h-[800px] w-[784px]"
        data-node-id="3529:527"
        data-name="brsain 2"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={BRAIN_IMG}
            alt=""
            className="absolute top-[-78.64%] left-[-0.01%] h-[179.66%] w-[99.97%] max-w-none"
          />
        </div>
      </div>
    </>
  );
}

/** Dotted connector line between a card and the brain (3529:525 / 529 / 530). */
function Connector({ left, top }: { left: number; top: number }) {
  return (
    <div
      className="absolute flex h-0 w-[85px] items-center justify-center"
      style={{ left, top }}
      aria-hidden
    >
      <div className="flex-none rotate-180">
        <div className="relative h-0 w-[85px]">
          <div className="absolute inset-[-2.89px_0_-2.89px_-3.4%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={CONNECTOR_LINE}
              alt=""
              className="block size-full max-w-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function TechnologyPageArchitecture({
  data,
  pillarsData,
}: {
  data?: any;
  pillarsData?: any;
} = {}) {
  const heading = data?.heading || FALLBACK_HEADING;
  const headingLines = heading.split("\n");
  const subtitle = data?.subtitle || FALLBACK_SUBTITLE;
  const pillars = buildPillars(pillarsData);

  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-black"
      data-node-id="3330:1261"
      data-name="Desktop - 17"
      aria-label="One architecture that thinks, senses, & speaks you language"
    >
      {/* DESKTOP (>=1024px) — 1440×1833 canvas */}
      <div className="relative hidden h-[1833px] w-[1440px] shrink-0 min-[1024px]:block">
        <BrainVisual />

        {/* Header — 3330:1262 (800 wide, x=352 y=71) */}
        <div
          className="absolute top-[71px] left-[352px] flex w-[800px] flex-col items-center gap-[24px]"
          data-node-id="3330:1262"
        >
          <div
            className="relative flex flex-col items-center px-[10px]"
            data-node-id="3330:1273"
            data-name="Title"
          >
            <GradientTitle
              gradientDeg={TITLE_GRADIENT_DEG}
              className="text-center"
              nodeId="3330:1274"
            >
              <span className="block h-[49px] leading-[49px] whitespace-nowrap">
                {headingLines[0] ?? ""}
              </span>
              <span className="block h-[49px] leading-[49px] whitespace-nowrap">
                {headingLines[1] ?? ""}
              </span>
            </GradientTitle>
            <CornerDecor />
          </div>
          <p
            className={`${interRegular.className} w-[679.39px] text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] not-italic opacity-65 [word-break:break-word]`}
            data-node-id="3330:1279"
          >
            {subtitle}
          </p>
        </div>

        {/* Pillar cards */}
        {pillars.map((pillar) => (
          <div
            key={pillar.nodeId}
            className="absolute flex flex-col items-center bg-[rgba(0,0,0,0.1)] px-[20px]"
            style={{
              left: pillar.left,
              top: pillar.top,
              width: pillar.cardWidth,
            }}
            data-node-id={pillar.nodeId}
          >
            <PillarStat pillar={pillar} />
            <CornerDecor />
          </div>
        ))}

        {/* Connectors — card → brain */}
        <Connector left={627} top={493} />
        <Connector left={627} top={933} />
        <Connector left={629} top={1493} />
      </div>

      {/* MOBILE (<1024px) — basic responsive version */}
      <div className="flex w-full flex-col items-center gap-[40px] px-[24px] py-[56px] min-[1024px]:hidden">
        <div className="flex flex-col items-center gap-[16px]">
          <div
            className={`${gilroyMedium.className} bg-clip-text text-center text-[32px] leading-[37px] font-medium text-transparent not-italic`}
            style={{
              backgroundImage: `linear-gradient(${TITLE_GRADIENT_DEG}, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            <span className="block">{headingLines[0] ?? ""}</span>
            <span className="block">{headingLines[1] ?? ""}</span>
          </div>
          <p
            className={`${interRegular.className} max-w-[327px] text-center text-[15px] leading-[22px] font-normal text-[#f0f0f0] not-italic opacity-65`}
          >
            {subtitle}
          </p>
        </div>

        {pillars.map((pillar) => (
          <div
            key={pillar.nodeId}
            className="relative flex w-full flex-col bg-[rgba(0,0,0,0.1)] px-[20px]"
          >
            <PillarStat pillar={pillar} fullWidth />
            <CornerDecor />
          </div>
        ))}
      </div>
    </section>
  );
}
