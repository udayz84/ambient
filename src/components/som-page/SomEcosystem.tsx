/* eslint-disable @next/next/no-img-element */
import { dmMono, gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";

const TITLE_GRADIENT_DEG = "128.886deg";
const SUBTITLE =
  "Purpose-built edge modules. Validate your software on our evaluation kits today, and drop our SOMs directly into your final product tomorrow.";

const CHIP_IMG = "/som/som-chip.png";

const BG_IMAGE_OVERLAY =
  "linear-gradient(180deg, rgba(0, 0, 0, 0.4) 48.412%, rgb(0, 0, 0) 88.067%), linear-gradient(180deg, rgba(0, 0, 0, 0.4) 37.886%, rgb(0, 0, 0) 88.067%), linear-gradient(180deg, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 69.056%)";

const SECTION_TITLE_STYLE = {
  backgroundImage: `linear-gradient(${TITLE_GRADIENT_DEG}, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)`,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
} as const;

/* ----------------------------- Decorative image overlays ----------------------------- */
/* Rendered only inside the desktop tree. Positioned within the card's NewsSection. */

function MotionImage() {
  return (
    <div className="pointer-events-none absolute left-[148.63px] top-[-55px] h-[263.699px] w-[261.827px]">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={CHIP_IMG}
          alt=""
          aria-hidden
          className="absolute left-[-21.85%] top-[-21.61%] h-[254.77%] w-[256.59%] max-w-none"
        />
      </div>
      <img
        src="/som/motion-icon.svg"
        alt=""
        aria-hidden
        className="absolute left-[233.08px] top-[23.79px] h-[47.764px] w-[38.109px] max-w-none"
      />
    </div>
  );
}

function VisionImage() {
  return (
    <div className="pointer-events-none absolute left-[144px] top-[-47.08px] h-[237.193px] w-[262.016px]">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={CHIP_IMG}
          alt=""
          aria-hidden
          className="absolute left-[-124.32%] top-[-26.4%] h-[264.72%] w-[239.65%] max-w-none"
        />
      </div>
      <img
        src="/som/vision-icon.svg"
        alt=""
        aria-hidden
        className="absolute left-[229.29px] top-[40.13px] size-[57.768px] max-w-none"
      />
    </div>
  );
}

function SoundImage() {
  return (
    <div className="pointer-events-none absolute left-[156.09px] top-[-35.61px] h-[238.119px] w-[252.171px]">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={CHIP_IMG}
          alt=""
          aria-hidden
          className="absolute left-[-16.41%] top-[-131.38%] h-[254.27%] w-[240.1%] max-w-none"
        />
      </div>
      <div className="absolute left-[258.62px] top-[7.38px] h-[45.468px] w-[42.073px] rounded-tl-[762.93px] rounded-tr-[762.93px] bg-[#f0f0f0]" />
    </div>
  );
}

function PredictiveImage() {
  return (
    <div className="pointer-events-none absolute left-[152.9px] top-[-39.61px] h-[240px] w-[259.31px]">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={CHIP_IMG}
          alt=""
          aria-hidden
          className="absolute left-[-125.17%] top-[-135.5%] h-[259.87%] w-[240.52%] max-w-none"
        />
      </div>
      <div className="absolute left-[291.15px] top-[128.77px] h-[24.067px] w-[10.309px] rounded-[1.714px] bg-[#d9d9d9]" />
      <div className="absolute left-[323.94px] top-[103.14px] h-[49.693px] w-[10.309px] rounded-[1.714px] bg-[#d9d9d9]" />
    </div>
  );
}

/* --------------------------------- Tag / Menu --------------------------------- */

function EcoTag({
  label,
  available,
  widthClass,
}: {
  label: string;
  available: boolean;
  widthClass: string;
}) {
  return (
    <div
      className={`relative h-[26px] shrink-0 overflow-clip ${available ? "bg-[rgba(115,190,91,0.8)]" : "bg-[rgba(115,190,91,0.12)]"} ${widthClass}`}
      data-name="Menu"
    >
      <Corners />
      <p
        className={`${dmMono.className} absolute left-1/2 top-[calc(50%-4.5px)] -translate-x-1/2 text-[13px] leading-[19.5px] font-normal tracking-[-0.39px] text-[#ecfae5] uppercase whitespace-nowrap not-italic [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word]`}
      >
        {label}
      </p>
      <div className="absolute top-1/2 left-[7px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
      <div className="absolute top-1/2 right-[7px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
    </div>
  );
}

/* ----------------------------------- CTA -------------------------------------- */

function EcoCta({
  label,
  soon,
  widthClass,
}: {
  label: string;
  soon: boolean;
  widthClass: string;
}) {
  return (
    <div
      className={`relative h-[48px] shrink-0 overflow-clip bg-[rgba(226,241,202,0.12)] px-[20px] py-[10px] ${soon ? "opacity-60" : ""} ${widthClass}`}
      data-name="CTA - Secondary"
    >
      <div className="flex h-full items-center justify-center">
        <p
          className={`${gilroyMedium.className} text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap not-italic [word-break:break-word] ${soon ? "text-[rgba(255,255,255,0.6)]" : "text-white"}`}
        >
          {label}
        </p>
      </div>
      <Corners />
    </div>
  );
}

/* ----------------------------------- Card ------------------------------------- */

type EcoCardProps = {
  frameClass: string;
  cardBg: string;
  padClass: string;
  overlay?: React.ReactNode;
  tagLabel: string;
  tagAvailable: boolean;
  tagWidthClass: string;
  title: string;
  titleWidthClass: string;
  subtitle: string;
  description: string;
  descWidthClass: string;
  ctaLabel: string;
  ctaSoon: boolean;
  ctaWidthClass: string;
  dataName?: string;
};

function EcoCard({
  frameClass,
  cardBg,
  padClass,
  overlay,
  tagLabel,
  tagAvailable,
  tagWidthClass,
  title,
  titleWidthClass,
  subtitle,
  description,
  descWidthClass,
  ctaLabel,
  ctaSoon,
  ctaWidthClass,
  dataName = "Article",
}: EcoCardProps) {
  return (
    <div
      className={`relative flex flex-col overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] ${cardBg} ${padClass} ${frameClass}`}
      data-name={dataName}
    >
      <div className="relative flex w-full flex-1 flex-col items-start justify-between">
        {overlay}
        <EcoTag label={tagLabel} available={tagAvailable} widthClass={tagWidthClass} />
        <div className="relative mt-[24px] flex flex-col items-start gap-[12px] min-[1024px]:mt-0">
          <h3
            className={`${gilroyMedium.className} text-[26px] leading-[32px] font-medium text-white not-italic [word-break:break-word] min-[1024px]:text-[32px] min-[1024px]:leading-[38px] ${titleWidthClass}`}
          >
            {title}
          </h3>
          <p
            className={`${interRegular.className} text-[16px] leading-[24px] font-normal uppercase text-[#8ce66c] not-italic whitespace-nowrap [word-break:break-word] min-[1024px]:text-[18px] min-[1024px]:leading-[27px]`}
          >
            {subtitle}
          </p>
          <p
            className={`${interRegular.className} text-[14px] leading-[21px] font-normal tracking-[-0.3125px] text-[#99a1af] not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[26px] ${descWidthClass}`}
          >
            {description}
          </p>
          <EcoCta label={ctaLabel} soon={ctaSoon} widthClass={ctaWidthClass} />
        </div>
      </div>
      <Corners />
    </div>
  );
}

/* --------------------------------- Card data ---------------------------------- */

type CardData = {
  desktopPos: string;
  desktopSize: string;
  overlay: React.ReactNode;
  cardBg: string;
  padClass: string;
  tagLabel: string;
  tagAvailable: boolean;
  tagWidthClass: string;
  title: string;
  titleWidthClass: string;
  subtitle: string;
  description: string;
  descWidthClass: string;
  ctaLabel: string;
  ctaSoon: boolean;
  ctaWidthClass: string;
  dataName: string;
};

const CARDS: CardData[] = [
  {
    desktopPos: "absolute left-[92px] top-[212.5px]",
    desktopSize: "w-[400px] h-[349px]",
    overlay: <MotionImage />,
    cardBg: "bg-black",
    padClass: "pl-[24px] pr-[16px] py-[32px]",
    tagLabel: "Available",
    tagAvailable: true,
    tagWidthClass: "w-[134px]",
    title: "Motion SOM",
    titleWidthClass: "min-[1024px]:w-[333.991px]",
    subtitle: "Motion & Audio",
    description: "Voice and gesture intelligence on a micro battery.",
    descWidthClass: "min-[1024px]:w-[226.079px]",
    ctaLabel: "VIEW MORE",
    ctaSoon: false,
    ctaWidthClass: "w-[161px]",
    dataName: "Motion SOM",
  },
  {
    desktopPos: "absolute left-[527px] top-[212.5px]",
    desktopSize: "w-[400px] h-[349px]",
    overlay: <VisionImage />,
    cardBg: "bg-black",
    padClass: "pl-[24px] pr-[16px] py-[32px]",
    tagLabel: "Under-development",
    tagAvailable: false,
    tagWidthClass: "w-[160px]",
    title: "Vision SOM",
    titleWidthClass: "min-[1024px]:w-[333.991px]",
    subtitle: "Motion & Audio",
    description: "Voice and gesture intelligence on a micro battery.",
    descWidthClass: "min-[1024px]:w-[232.792px]",
    ctaLabel: "Coming soon",
    ctaSoon: true,
    ctaWidthClass: "w-[155px]",
    dataName: "Vision SOM",
  },
  {
    desktopPos: "absolute left-[962px] top-[212.5px]",
    desktopSize: "w-[400px] h-[349px]",
    overlay: <SoundImage />,
    cardBg: "bg-black",
    padClass: "pl-[24px] pr-[16px] py-[32px]",
    tagLabel: "Under-development",
    tagAvailable: false,
    tagWidthClass: "w-[160px]",
    title: "Sound SOM",
    titleWidthClass: "min-[1024px]:w-[333.991px]",
    subtitle: "Motion & Audio",
    description: "Voice and gesture intelligence on a micro battery.",
    descWidthClass: "min-[1024px]:w-[232.792px]",
    ctaLabel: "Coming soon",
    ctaSoon: true,
    ctaWidthClass: "w-[155px]",
    dataName: "SOund SOM",
  },
  {
    desktopPos: "absolute left-[303px] top-[606px]",
    desktopSize: "w-[400px] h-[370px]",
    overlay: <PredictiveImage />,
    cardBg: "bg-black",
    padClass: "pl-[24px] pr-[16px] py-[32px]",
    tagLabel: "Under-development",
    tagAvailable: false,
    tagWidthClass: "w-[160px]",
    title: "Predictive & Maintenance SOM",
    titleWidthClass: "min-[1024px]:w-[226.074px]",
    subtitle: "Motion & Audio",
    description: "Voice and gesture intelligence on a battery.",
    descWidthClass: "min-[1024px]:w-[333.99px]",
    ctaLabel: "Coming soon",
    ctaSoon: true,
    ctaWidthClass: "w-[155px]",
    dataName: "Predictive SOM",
  },
  {
    desktopPos: "absolute left-[734px] top-[606px]",
    desktopSize: "w-[400px] h-[349px]",
    overlay: null,
    cardBg: "bg-[rgba(0,0,0,0.2)]",
    padClass: "px-[32px] pt-[16px] pb-[24px]",
    tagLabel: "Under-development",
    tagAvailable: false,
    tagWidthClass: "w-full",
    title: "Pet & Livestock SOM",
    titleWidthClass: "min-[1024px]:w-[333.991px]",
    subtitle: "Motion & Audio",
    description:
      "Continuous voice and gesture intelligence running for months on a micro battery.",
    descWidthClass: "min-[1024px]:w-[324px]",
    ctaLabel: "Coming soon",
    ctaSoon: true,
    ctaWidthClass: "w-[155px]",
    dataName: "Article",
  },
];

export function SomEcosystem() {
  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      data-node-id="2695:297"
      data-name="SOM Ecosystem"
      aria-label="The Ambient SOM Ecosystem"
    >
      {/* ============================ DESKTOP (>=1024px) ============================ */}
      <div className="relative mx-auto hidden h-[1008px] w-[1440px] min-[1024px]:block">
        {/* Abstract design */}
        <div className="absolute left-1/2 top-[-50px] h-[320px] w-[881.616px] -translate-x-1/2">
          <img
            src="/som/ecosystem-abstract.svg"
            alt=""
            aria-hidden
            className="block size-full max-w-none"
          />
        </div>

        {/* Background image 124 */}
        <div className="absolute left-0 top-[163px] h-[922.344px] w-[1440px] opacity-40">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="/som/ecosystem-bg.png"
              alt=""
              aria-hidden
              className="absolute left-0 top-[0.03%] h-[119.42%] w-[99.99%] max-w-none"
            />
          </div>
          <div
            className="absolute inset-0"
            style={{ backgroundImage: BG_IMAGE_OVERLAY }}
          />
        </div>

        {/* Section title */}
        <div className="absolute left-1/2 top-[53px] z-10 flex w-[650px] -translate-x-1/2 flex-col items-center gap-[24px]">
          <div className="relative px-[10px]" data-name="Title">
            <div
              className={`${gilroyMedium.className} bg-clip-text text-center text-[46px] leading-[49px] font-medium text-transparent not-italic [word-break:break-word]`}
              style={SECTION_TITLE_STYLE}
            >
              The Ambient SOM Ecosystem
            </div>
            <Corners />
          </div>
          <p
            className={`${interRegular.className} text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
          >
            {SUBTITLE}
          </p>
        </div>

        {/* Cards */}
        {CARDS.map((card) => (
          <EcoCard
            key={card.dataName}
            frameClass={`${card.desktopSize} ${card.desktopPos} z-10`}
            cardBg={card.cardBg}
            padClass={card.padClass}
            overlay={card.overlay}
            tagLabel={card.tagLabel}
            tagAvailable={card.tagAvailable}
            tagWidthClass={card.tagWidthClass}
            title={card.title}
            titleWidthClass={card.titleWidthClass}
            subtitle={card.subtitle}
            description={card.description}
            descWidthClass={card.descWidthClass}
            ctaLabel={card.ctaLabel}
            ctaSoon={card.ctaSoon}
            ctaWidthClass={card.ctaWidthClass}
            dataName={card.dataName}
          />
        ))}
      </div>

      {/* ============================= MOBILE (<1024px) ============================= */}
      <div className="flex min-[1024px]:hidden flex-col items-center gap-[40px] px-[24px] pt-[64px] pb-[64px]">
        {/* Section title */}
        <div className="flex w-full flex-col items-center gap-[20px]">
          <div className="relative px-[10px]" data-name="Title">
            <div
              className={`${gilroyMedium.className} bg-clip-text text-center text-[34px] leading-[37px] font-medium text-transparent not-italic [word-break:break-word]`}
              style={SECTION_TITLE_STYLE}
            >
              The Ambient SOM Ecosystem
            </div>
            <Corners />
          </div>
          <p
            className={`${interRegular.className} max-w-[332px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0]/80 not-italic`}
          >
            {SUBTITLE}
          </p>
        </div>

        {/* Stacked cards */}
        <div className="flex w-full flex-col gap-[24px]">
          {CARDS.map((card) => (
            <EcoCard
              key={card.dataName}
              frameClass="w-full"
              cardBg={card.cardBg}
              padClass={card.padClass}
              overlay={null}
              tagLabel={card.tagLabel}
              tagAvailable={card.tagAvailable}
              tagWidthClass={card.tagWidthClass}
              title={card.title}
              titleWidthClass={card.titleWidthClass}
              subtitle={card.subtitle}
              description={card.description}
              descWidthClass={card.descWidthClass}
              ctaLabel={card.ctaLabel}
              ctaSoon={card.ctaSoon}
              ctaWidthClass={card.ctaWidthClass}
              dataName={card.dataName}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
