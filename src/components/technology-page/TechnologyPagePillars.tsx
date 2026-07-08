import { mediaUrl } from "@/lib/strapi";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { TagBadge } from "../hero/TagBadge";
import { CornerDecor } from "../contact/contact-shared";

const GRID_CAP = "/technology/grid-cap.svg";

const ICON_BG =
  "radial-gradient(80% 100% at 50% 0%, #394a36 0%, #2b3629 50%, #1d221c 100%)";

type Pillar = {
  nodeId: string;
  icon: string;
  iconInnerInset?: string;
  iconImgInset?: string;
  tag: string;
  tagWidth: number;
  tagRightBarLeft: number;
  title: string;
  subtitle: string;
  desc: string;
  bullets: string[];
  cta?: string;
  ctaHref?: string;
};

const PILLARS: Pillar[] = [
  {
    nodeId: "3037:481",
    icon: "/technology/icon-cubiccore.svg",
    iconInnerInset: "8.33%",
    iconImgInset: "-3.75%",
    tag: "The Brain",
    tagWidth: 107,
    tagRightBarLeft: 98.48,
    title: "CubicCore\u2122",
    subtitle: "Server-class math. Microwatt power.",
    desc: "It runs the math on physics itself. Ohm's law multiplies, Kirchhoff's law sums - right inside the memory, almost for free. Digital keeps every result exact.",
    bullets: [
      "In-memory analog compute - no data commute",
      "~1/100th the energy per operation vs. digital",
      "Scales by replication - tile in more cores, from a smart ring to a server",
      "Fully programmable \u00b7 4\u201332-bit precision, tuned at runtime",
      "Built in standard CMOS - no exotic process",
    ],
  },
  {
    nodeId: "3037:590",
    icon: "/technology/icon-sensemesh.svg",
    tag: "The Nervous System",
    tagWidth: 180,
    tagRightBarLeft: 171.48,
    title: "SenseMesh\u2122",
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
    nodeId: "3037:632",
    icon: "/technology/icon-modelforge.svg",
    iconInnerInset: "16.67%",
    iconImgInset: "-4.69%",
    tag: "The Language",
    tagWidth: 160,
    tagRightBarLeft: 151.48,
    title: "ModelForge\u2122",
    subtitle: "No new language to learn.",
    desc: "Bring your own models in TensorFlow, Keras, or ONNX. A push-button compiler does the translation - no rewrites, no proprietary toolchain.",
    bullets: [
      "Drop-in support for TensorFlow, Keras, ONNX",
      "Push-button compile - concept to silicon, no rewrites",
      "Speaks matrix math natively \u2014 none of the translation tax Arm/RISC-V pay",
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
    const bulletsText =
      (p?.bullets as string) || fb.bullets.join("\n");
    const bullets = bulletsText
      .split("\n")
      .map((b) => b.trim())
      .filter((b) => b.length > 0);
    const ctaLabel = p?.cta?.label || fb.cta;
    return {
      nodeId: fb.nodeId,
      icon: mediaUrl(p?.icon) || fb.icon,
      iconInnerInset: fb.iconInnerInset,
      iconImgInset: fb.iconImgInset,
      tag: (p?.tag as string) || fb.tag,
      tagWidth: fb.tagWidth,
      tagRightBarLeft: fb.tagRightBarLeft,
      title: (p?.title as string) || fb.title,
      subtitle: (p?.subtitle as string) || fb.subtitle,
      desc: (p?.description as string) || fb.desc,
      bullets: bullets.length > 0 ? bullets : fb.bullets,
      cta: ctaLabel,
      ctaHref: (p?.cta?.href as string) || fb.ctaHref || "/developer",
    };
  });
}

function IconBox({ pillar }: { pillar: Pillar }) {
  return (
    <div
      className="relative size-[40px] shrink-0 rounded-[6.667px]"
      style={{ background: ICON_BG }}
      data-node-id={pillar.nodeId}
      data-name="Icon"
    >
      <div className="absolute left-1/2 top-1/2 size-[24px] -translate-x-1/2 -translate-y-1/2 overflow-clip">
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

function PillarStat({ pillar }: { pillar: Pillar }) {
  return (
    <div
      className="relative flex w-[340px] shrink-0 flex-col items-start gap-[40px] py-[12px]"
      data-node-id={pillar.nodeId}
      data-name="Stat"
    >
      <IconBox pillar={pillar} />

      {/* tag — absolutely placed beside the icon */}
      <div
        className="absolute top-[18px] left-[56px]"
        data-name="Logo and Menu"
      >
        <TagBadge
          label={pillar.tag}
          width={pillar.tagWidth}
          labelOffsetX={0}
          rightBarLeft={pillar.tagRightBarLeft}
          centerLabel
        />
      </div>

      <div
        className="flex w-full flex-col items-start gap-[12px]"
        data-name="Frame 1984079533"
      >
        <p
          className={`${gilroyMedium.className} w-[279px] text-[32px] leading-[38px] font-medium text-white not-italic`}
        >
          {pillar.title}
        </p>
        <p
          className={`${interRegular.className} text-[13px] leading-[normal] font-normal whitespace-nowrap text-[#6fe047] not-italic`}
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
        data-name="bullets"
      >
        {pillar.bullets.map((b, i) => (
          <div
            key={i}
            className="flex w-full items-start gap-[5px]"
            data-name="Frame 1984079529"
          >
            <p className="text-[14px] tracking-[-0.1504px] whitespace-nowrap text-[#3a9719] not-italic [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
              +
            </p>
            <p className="min-w-px flex-1 whitespace-pre-line text-[13px] text-[rgba(255,255,255,0.9)] not-italic [word-break:break-word]">
              {b}
            </p>
          </div>
        ))}
      </div>

      {pillar.cta ? (
        <a
          href={pillar.ctaHref || "/developer"}
          className={`${gilroyMedium.className} relative block overflow-clip bg-[rgba(226,241,202,0.12)] px-[20px] py-[10px]`}
          data-node-id="3037:696"
          data-name="CTA - Secondary"
        >
          <span className="relative flex items-center text-[16px] leading-[28px] font-medium whitespace-nowrap text-white uppercase not-italic">
            {pillar.cta}
          </span>
          <CornerDecor />
        </a>
      ) : null}
    </div>
  );
}

function GridDivider() {
  return (
    <div
      className="relative w-[8px] shrink-0 self-stretch overflow-hidden"
      data-name="Grid Line'"
    >
      {/* top cap */}
      <div className="absolute top-[0.07px] left-0 h-[4px] w-[8px] -scale-y-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={GRID_CAP}
          alt=""
          className="block size-full max-w-none"
          aria-hidden
        />
      </div>
      {/* vertical line */}
      <div className="absolute left-1/2 top-0 h-full w-[1px] -translate-x-1/2 bg-white/10" aria-hidden />
      {/* bottom cap */}
      <div className="absolute bottom-[0.89px] left-0 h-[4px] w-[8px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={GRID_CAP}
          alt=""
          className="block size-full max-w-none"
          aria-hidden
        />
      </div>
    </div>
  );
}

export function TechnologyPagePillars({ data }: { data?: any } = {}) {
  const pillars = buildPillars(data);
  const hasThree = pillars.length >= 3;

  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-black"
      data-node-id="3037:480"
      data-name="Frame 1984079438"
      aria-label="Three breakthroughs: CubicCore, SenseMesh, ModelForge"
    >
      {/* DESKTOP (>=1024px) */}
      <div className="relative hidden h-[520px] w-[1204px] items-start justify-center gap-[32px] bg-[rgba(0,0,0,0.1)] border border-white/10 px-[20px] min-[1024px]:flex">
        {hasThree ? (
          <>
            <PillarStat pillar={pillars[0]} />
            <GridDivider />
            <PillarStat pillar={pillars[1]} />
            <GridDivider />
            <PillarStat pillar={pillars[2]} />
          </>
        ) : (
          pillars.map((p, i) => (
            <div key={i} className="flex items-start gap-[32px]">
              {i > 0 ? <GridDivider /> : null}
              <PillarStat pillar={p} />
            </div>
          ))
        )}
        <CornerDecor />
      </div>

      {/* MOBILE (<1024px) — basic responsive version */}
      <div className="flex w-full flex-col items-stretch gap-[24px] px-[24px] py-[56px] min-[1024px]:hidden">
        {pillars.map((pillar, idx) => (
          <div key={pillar.nodeId}>
            <div className="flex flex-col gap-[20px] rounded-[2px] bg-[rgba(0,0,0,0.1)] border border-white/10 px-[20px] py-[24px]">
              <div className="flex items-center gap-[16px]">
                <IconBox pillar={pillar} />
                <TagBadge
                  label={pillar.tag}
                  width={pillar.tagWidth}
                  labelOffsetX={0}
                  rightBarLeft={pillar.tagRightBarLeft}
                  centerLabel
                />
              </div>
              <p
                className={`${gilroyMedium.className} text-[26px] leading-[32px] font-medium text-white not-italic`}
              >
                {pillar.title}
              </p>
              <p
                className={`${interRegular.className} text-[13px] leading-[normal] font-normal text-[#6fe047] not-italic`}
              >
                {pillar.subtitle}
              </p>
              <p
                className={`${interRegular.className} text-[13px] leading-[normal] font-normal text-[#8e8e8e] not-italic`}
              >
                {pillar.desc}
              </p>
              <div
                className={`${interRegular.className} flex flex-col gap-[10px] font-normal leading-[normal] not-italic`}
              >
                {pillar.bullets.map((b, i) => (
                  <div key={i} className="flex items-start gap-[5px]">
                    <span className="text-[14px] text-[#3a9719] not-italic">+</span>
                    <span className="flex-1 whitespace-pre-line text-[13px] text-[rgba(255,255,255,0.9)] not-italic">
                      {b}
                    </span>
                  </div>
                ))}
              </div>
              {pillar.cta ? (
                <a
                  href={pillar.ctaHref || "/developer"}
                  className={`${gilroyMedium.className} mt-[4px] block w-full rounded-[2px] bg-[rgba(226,241,202,0.12)] px-[20px] py-[12px] text-center text-[14px] leading-[20px] font-medium text-white uppercase not-italic`}
                >
                  {pillar.cta}
                </a>
              ) : null}
            </div>
            {idx < pillars.length - 1 ? (
              <div className="mx-auto my-[12px] h-px w-[60%] bg-white/10" />
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
