"use client";

/* eslint-disable @next/next/no-img-element */
import { useFadeIn, getFadeInClass } from "../shared/useFadeIn";
import { dmMono, gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";

const TITLE_GRADIENT_DEG = "128.886deg";
const FALLBACK_SUBTITLE =
  "Purpose-built edge modules. Validate your software on our evaluation kits today, and drop our SOMs directly into your final product tomorrow.";
const FALLBACK_HEADING = "The Ambient SOM Ecosystem";
const FALLBACK_CHIP_IMG = "/som/som-chip.webp";
const FALLBACK_BG = "/som/ecosystem-bg.webp";

const BG_IMAGE_OVERLAY =
  "linear-gradient(180deg, rgba(0, 0, 0, 0.4) 48.412%, rgb(0, 0, 0) 88.067%), linear-gradient(180deg, rgba(0, 0, 0, 0.4) 37.886%, rgb(0, 0, 0) 88.067%), linear-gradient(180deg, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 69.056%)";

const SECTION_TITLE_STYLE = {
  backgroundImage: `linear-gradient(${TITLE_GRADIENT_DEG}, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)`,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
} as const;

/* ----------------------------- Mobile (Figma 4046:7908) ----------------------------- */
const MOBILE_TITLE_GRADIENT_DEG = "103.536deg";
const MOBILE_TOP_BG = "/som/ecosystem-mobile-topbg.png";
const MOBILE_BOTTOM_GLOW = "/som/features-mobile-glow.png";
const MOBILE_TITLE_STYLE = {
  backgroundImage: `linear-gradient(${MOBILE_TITLE_GRADIENT_DEG}, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)`,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
} as const;

/* ----------------------------- Decorative image overlays ----------------------------- */
/* Rendered only inside the desktop tree. Positioned within the card's NewsSection. */

function MotionImage({ chipImg }: { chipImg: string }) {
  return (
    <>
      <div className="pointer-events-none absolute left-[148.63px] top-[-55px] h-[263.699px] w-[261.827px] overflow-hidden">
        <img loading="lazy" decoding="async"
          src={chipImg}
          alt=""
          aria-hidden
          className="absolute left-[-21.85%] top-[-21.61%] h-[254.77%] w-[256.59%] max-w-none mix-blend-screen"
        />
      </div>
      <img loading="lazy" decoding="async"
        src="/som/motion-icon.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-[233.08px] top-[23.79px] h-[47.764px] w-[38.109px] max-w-none"
      />
    </>
  );
}

function VisionImage({ chipImg }: { chipImg: string }) {
  return (
    <>
      <div className="pointer-events-none absolute left-[144px] top-[-47.08px] h-[237.193px] w-[262.016px] overflow-hidden">
        <img loading="lazy" decoding="async"
          src={chipImg}
          alt=""
          aria-hidden
          className="absolute left-[-124.32%] top-[-26.4%] h-[264.72%] w-[239.65%] max-w-none mix-blend-screen"
        />
      </div>
      <img loading="lazy" decoding="async"
        src="/som/vision-icon.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-[229.29px] top-[40.13px] size-[57.768px] max-w-none"
      />
    </>
  );
}

function SoundImage({ chipImg }: { chipImg: string }) {
  return (
    <>
      <div className="pointer-events-none absolute left-[156.09px] top-[-35.61px] h-[238.119px] w-[252.171px] overflow-hidden">
        <img loading="lazy" decoding="async"
          src={chipImg}
          alt=""
          aria-hidden
          className="absolute left-[-16.41%] top-[-131.38%] h-[254.27%] w-[240.1%] max-w-none mix-blend-screen"
        />
      </div>

    </>
  );
}

function PredictiveImage({ chipImg }: { chipImg: string }) {
  return (
    <>
      <div className="pointer-events-none absolute left-[152.9px] top-[-39.61px] h-[240px] w-[259.31px] overflow-hidden">
        <img loading="lazy" decoding="async"
          src={chipImg}
          alt=""
          aria-hidden
          className="absolute left-[-125.17%] top-[-135.5%] h-[259.87%] w-[240.52%] max-w-none mix-blend-screen"
        />
      </div>
      <div className="pointer-events-none absolute left-[291.15px] top-[128.77px] h-[24.067px] w-[10.309px] rounded-[1.714px] bg-[#d9d9d9]" />
      <div className="pointer-events-none absolute left-[323.94px] top-[103.14px] h-[49.693px] w-[10.309px] rounded-[1.714px] bg-[#d9d9d9]" />
    </>
  );
}

function PetImage() {
  return (
    <>
      <div className="pointer-events-none absolute right-[10px] top-[-40px] h-[240px] w-[220px] overflow-hidden flex items-center justify-center">
        <img loading="lazy" decoding="async"
          src="/pet.png"
          alt=""
          aria-hidden
          className="size-full object-contain mix-blend-screen"
        />
      </div>
    </>
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
      className={`relative h-[26px] shrink-0 overflow-clip ${available ? "bg-[rgba(115,190,91,0.8)]" : "bg-[rgba(115,190,91,0.12)] border-[0.5px] border-solid border-[rgba(240,240,240,0.4)]"} ${widthClass}`}
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
      className={`relative h-[48px] shrink-0 overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] px-[20px] py-[10px] ${soon ? "bg-transparent opacity-40" : "bg-[rgba(226,241,202,0.12)] hover:bg-[rgba(226,241,202,0.2)] transition-colors"} ${widthClass}`}
      data-name="CTA - Secondary"
    >
      <div className="flex h-full items-center justify-center">
        <p
          className={`${gilroyMedium.className} text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap not-italic [word-break:break-word] ${soon ? "text-[rgba(255,255,255,0.8)]" : "text-white"}`}
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
  const { fadeRef, isVisible } = useFadeIn();

  return (
    <div
      ref={fadeRef}
      className={`flex flex-col overflow-y-visible overflow-x-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] hover:border-[#a8ed90] hover:bg-[rgba(68,120,7,0.2)] transition-colors duration-300 cursor-pointer ${cardBg} ${padClass} ${frameClass} ${getFadeInClass(isVisible)}`}
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
  overlay: (chipImg: string) => React.ReactNode;
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
    overlay: (chipImg) => <MotionImage chipImg={chipImg} />,
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
    overlay: (chipImg) => <VisionImage chipImg={chipImg} />,
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
    overlay: (chipImg) => <SoundImage chipImg={chipImg} />,
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
    overlay: (chipImg) => <PredictiveImage chipImg={chipImg} />,
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
    desktopSize: "w-[400px] h-[370px]",
    overlay: () => <PetImage />,
    cardBg: "bg-black",
    padClass: "px-[20px] py-[28px]",
    tagLabel: "Under-development",
    tagAvailable: false,
    tagWidthClass: "w-[170px]",
    title: "Pet & Livestock SOM",
    titleWidthClass: "min-[1024px]:w-[235px]",
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

/* ------------------------------ Mobile card (4059:8948) ------------------------------ */

type MobileOverlay = "motion" | "vision" | "sound" | "predictive" | "pet" | null;

function MobileMotionOverlay({ chipImg }: { chipImg: string }) {
  return (
    <>
      <div className="pointer-events-none absolute left-[127px] top-[-48px] size-[230px] overflow-hidden">
        <img loading="lazy" decoding="async"
          src={chipImg}
          alt=""
          aria-hidden
          className="absolute left-[-21.85%] top-[-21.61%] h-[254.77%] w-[256.59%] max-w-none mix-blend-screen"
        />
      </div>
      <img loading="lazy" decoding="async"
        src="/som/motion-icon.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-[201px] top-[21px] h-[42px] w-[33px] max-w-none"
      />
    </>
  );
}

function MobileVisionOverlay({ chipImg }: { chipImg: string }) {
  return (
    <>
      <div className="pointer-events-none absolute left-[128px] top-[-42px] h-[210px] w-[230px] overflow-hidden">
        <img loading="lazy" decoding="async"
          src={chipImg}
          alt=""
          aria-hidden
          className="absolute left-[-124.32%] top-[-26.4%] h-[264.72%] w-[239.65%] max-w-none mix-blend-screen"
        />
      </div>
      <img loading="lazy" decoding="async"
        src="/som/vision-icon.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-[204px] top-[36px] size-[50px] max-w-none"
      />
    </>
  );
}

function MobileSoundOverlay({ chipImg }: { chipImg: string }) {
  return (
    <>
      <div className="pointer-events-none absolute left-[139px] top-[-32px] h-[210px] w-[224px] overflow-hidden">
        <img loading="lazy" decoding="async"
          src={chipImg}
          alt=""
          aria-hidden
          className="absolute left-[-16.41%] top-[-131.38%] h-[254.27%] w-[240.1%] max-w-none mix-blend-screen"
        />
      </div>

    </>
  );
}

function MobilePredictiveOverlay({ chipImg }: { chipImg: string }) {
  return (
    <>
      <div className="pointer-events-none absolute left-[136px] top-[-35px] h-[213px] w-[230px] overflow-hidden">
        <img loading="lazy" decoding="async"
          src={chipImg}
          alt=""
          aria-hidden
          className="absolute left-[-125.17%] top-[-135.5%] h-[259.87%] w-[240.52%] max-w-none mix-blend-screen"
        />
      </div>
      <div className="pointer-events-none absolute left-[258px] top-[114px] h-[21px] w-[10px] rounded-[1.5px] bg-[#d9d9d9]" />
      <div className="pointer-events-none absolute left-[287px] top-[92px] h-[44px] w-[10px] rounded-[1.5px] bg-[#d9d9d9]" />
    </>
  );
}

function MobilePetOverlay() {
  return (
    <>
      <div className="pointer-events-none absolute left-[100px] top-[-10px] h-[250px] w-[230px] overflow-hidden flex items-center justify-center">
        <img loading="lazy" decoding="async"
          src="/pet.png"
          alt=""
          aria-hidden
          className="size-full object-contain max-w-none"
        />
      </div>
    </>
  );
}

function MobileEcoOverlay({ type, chipImg }: { type: MobileOverlay; chipImg: string }) {
  switch (type) {
    case "motion":
      return <MobileMotionOverlay chipImg={chipImg} />;
    case "vision":
      return <MobileVisionOverlay chipImg={chipImg} />;
    case "sound":
      return <MobileSoundOverlay chipImg={chipImg} />;
    case "predictive":
      return <MobilePredictiveOverlay chipImg={chipImg} />;
    case "pet":
      return <MobilePetOverlay />;
    default:
      return null;
  }
}

type MobileCardMeta = {
  height: number;
  overlay: MobileOverlay;
  tagWidth: string;
  titleWidth: string;
  descWidth: string;
  contentGap: number;
};

const MOBILE_CARD_META: MobileCardMeta[] = [
  { height: 310, overlay: "motion", tagWidth: "w-[120px]", titleWidth: "w-[296.417px]", descWidth: "w-[200.645px]", contentGap: 6 },
  { height: 310, overlay: "vision", tagWidth: "w-[150px]", titleWidth: "w-[296.417px]", descWidth: "w-[206.603px]", contentGap: 10 },
  { height: 310, overlay: "sound", tagWidth: "w-[150px]", titleWidth: "w-[296.417px]", descWidth: "w-[206.603px]", contentGap: 6 },
  { height: 330, overlay: "predictive", tagWidth: "w-[150px]", titleWidth: "w-[200.641px]", descWidth: "w-[296.416px]", contentGap: 6 },
  { height: 330, overlay: "pet", tagWidth: "w-[150px]", titleWidth: "w-[296.417px]", descWidth: "w-[287.55px]", contentGap: 6 },
];

function MobileEcoTag({
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
      className={`relative h-[24px] shrink-0 overflow-clip ${available ? "bg-[rgba(115,190,91,0.8)]" : "bg-[rgba(115,190,91,0.12)]"} ${widthClass}`}
      data-name="Menu"
    >
      <Corners />
      <p
        className={`${dmMono.className} absolute left-1/2 top-[calc(50%-4px)] -translate-x-1/2 text-[12px] leading-[17.306px] font-normal tracking-[-0.36px] text-[#ecfae5] uppercase whitespace-nowrap not-italic [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word]`}
      >
        {label}
      </p>
      <div className="absolute top-[calc(50%-0.46px)] left-[6.21px] h-[10.65px] w-[1.775px] -translate-y-1/2 bg-white opacity-60" />
      <div className="absolute top-[calc(50%-0.46px)] right-[6.21px] h-[10.65px] w-[1.775px] -translate-y-1/2 bg-white opacity-60" />
    </div>
  );
}

function MobileEcoCta({ label, soon }: { label: string; soon: boolean }) {
  return (
    <div
      className={`relative inline-flex w-fit shrink-0 items-center justify-center overflow-clip bg-[rgba(226,241,202,0.12)] px-[20px] py-[10px] ${soon ? "opacity-60" : ""}`}
      data-name="CTA - Secondary"
    >
      <p
        className={`${gilroyMedium.className} text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic [word-break:break-word]`}
      >
        {label}
      </p>
      <Corners />
    </div>
  );
}

type MobileEcoCardProps = {
  meta: MobileCardMeta;
  overlay: React.ReactNode;
  tagLabel: string;
  tagAvailable: boolean;
  title: string;
  subtitle: string;
  description: string;
  ctaLabel: string;
  ctaSoon: boolean;
  dataName?: string;
};

function MobileEcoCard({
  meta,
  overlay,
  tagLabel,
  tagAvailable,
  title,
  subtitle,
  description,
  ctaLabel,
  ctaSoon,
  dataName = "Article",
}: MobileEcoCardProps) {
  return (
    <div
      className="relative flex w-full flex-col items-center gap-[18px] overflow-clip border-[0.444px] border-solid border-[rgba(240,240,240,0.2)] bg-black px-[20px] py-[28px]"
      style={{ height: `${meta.height}px` }}
      data-name={dataName}
    >
      <div className="relative flex w-full flex-1 flex-col items-start justify-between">
        {overlay}
        <MobileEcoTag label={tagLabel} available={tagAvailable} widthClass={meta.tagWidth} />
        <div
          className="relative flex w-full flex-col items-start"
          style={{ gap: `${meta.contentGap}px` }}
        >
          <h3
            className={`${gilroyMedium.className} text-[28px] leading-[33.725px] font-medium text-white not-italic [word-break:break-word] ${meta.titleWidth}`}
          >
            {title}
          </h3>
          <p
            className={`${interRegular.className} text-[16px] leading-[23.962px] font-normal uppercase whitespace-nowrap text-[#8ce66c] not-italic [word-break:break-word]`}
          >
            {subtitle}
          </p>
          <p
            className={`${interRegular.className} text-[14px] leading-[23.075px] font-normal tracking-[-0.2773px] text-[#99a1af] not-italic [word-break:break-word] ${meta.descWidth}`}
          >
            {description}
          </p>
          <MobileEcoCta label={ctaLabel} soon={ctaSoon} />
        </div>
      </div>
      <Corners />
    </div>
  );
}

export function SomEcosystem({ data }: { data?: any }) {
  const subtitle = data?.subtitle || FALLBACK_SUBTITLE;
  const heading = data?.heading || FALLBACK_HEADING;
  const chipImg = FALLBACK_CHIP_IMG;
  const bgImage = FALLBACK_BG;
  const dataCards: any[] = Array.isArray(data?.cards) ? data.cards : [];
  const cards: CardData[] = CARDS.map((fb, i) => {
    const c = dataCards[i];
    if (!c) return fb;
    const status = c.status || fb.tagLabel;
    const available = status.toLowerCase() === "available";
    return {
      ...fb,
      tagLabel: status,
      tagAvailable: available,
      title: c.title || fb.title,
      subtitle: c.subtitle || fb.subtitle,
      description: fb.description,
      ctaLabel: c.cta_label || fb.ctaLabel,
      ctaSoon: (c.cta_label || fb.ctaLabel).toLowerCase() === "coming soon" || (!c.cta_label && fb.ctaSoon),
    };
  });
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
        <div className="absolute left-1/2 top-0 h-[320px] w-[881.616px] -translate-x-1/2">
          <img loading="lazy" decoding="async"
            src="/som/ecosystem-abstract.svg"
            alt=""
            aria-hidden
            className="block size-full max-w-none object-cover object-bottom"
          />
        </div>

        {/* Background image 124 */}
        <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[100vw] min-w-[1440px] opacity-40">
          <div className="absolute inset-0 overflow-hidden">
            <img loading="lazy" decoding="async"
              src={bgImage}
              alt=""
              aria-hidden
              className="absolute inset-0 size-full max-w-none object-cover"
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
              {heading}
            </div>
            <Corners />
          </div>
          <p
            className={`${interRegular.className} text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
          >
            {subtitle}
          </p>
        </div>

        {/* Cards */}
        {cards.map((card) => (
          <EcoCard
            key={card.dataName}
            frameClass={`${card.desktopSize} ${card.desktopPos} z-10`}
            cardBg={card.cardBg}
            padClass={card.padClass}
            overlay={card.overlay(chipImg)}
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

      {/* ============================= MOBILE (<1024px) — Figma 4046:7908 "3rd Fold" 393×1946 ============================= */}
      <div
        className="relative mx-auto h-[1946px] w-[393px] overflow-hidden bg-black min-[1024px]:hidden"
        data-node-id="4046:7908"
        data-name="3rd Fold"
      >
        {/* Top background graphic (4046:7995) */}
        <img loading="lazy" decoding="async"
          src={MOBILE_TOP_BG}
          alt=""
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[260px] w-[1441px] max-w-none -translate-x-1/2 object-cover"
        />
        {/* Bottom decorative glow (4046:7996) */}
        <img loading="lazy" decoding="async"
          src={MOBILE_BOTTOM_GLOW}
          alt=""
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[1340px] h-[341px] w-[1441px] max-w-none -translate-x-1/2 object-cover"
        />
        {/* Abstract design (4046:7909) */}
        <div className="pointer-events-none absolute left-1/2 top-[36px] h-[247.559px] w-[682.036px] -translate-x-1/2">
          <img loading="lazy" decoding="async"
            src="/som/ecosystem-abstract.svg"
            alt=""
            aria-hidden
            className="block size-full max-w-none object-cover object-bottom"
          />
        </div>

        {/* Title block (4046:7998) */}
        <div
          className="absolute left-1/2 top-[30px] flex w-[352px] -translate-x-1/2 flex-col items-center gap-[15px]"
          data-node-id="4046:7998"
        >
          <div
            className="relative flex w-[350px] justify-center"
            data-name="Title"
          >
            <Corners />
            <h2
              className={`${gilroyMedium.className} bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
              style={MOBILE_TITLE_STYLE}
            >
              {heading}
            </h2>
          </div>
          <p
            className={`${interRegular.className} w-[352px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0]/75 not-italic [word-break:break-word]`}
          >
            {subtitle}
          </p>
        </div>

        {/* Cards container (4059:8947) */}
        <div
          className="absolute left-1/2 top-[250px] flex w-[355px] -translate-x-1/2 flex-col gap-[24px]"
          data-node-id="4059:8947"
        >
          {cards.map((card, i) => {
            const meta = MOBILE_CARD_META[i] ?? MOBILE_CARD_META[0];
            return (
              <MobileEcoCard
                key={card.dataName}
                meta={meta}
                overlay={<MobileEcoOverlay type={meta.overlay} chipImg={chipImg} />}
                tagLabel={card.tagLabel}
                tagAvailable={card.tagAvailable}
                title={card.title}
                subtitle={card.subtitle}
                description={card.description}
                ctaLabel={card.ctaLabel}
                ctaSoon={card.ctaSoon}
                dataName={card.dataName}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
