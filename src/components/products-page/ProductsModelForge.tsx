import { mediaUrl } from "@/lib/strapi";
import { dmMono, gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { AnimatedDotsBackground } from "../shared/AnimatedDotsBackground";
import {
  CORNER_LEFT,
  CORNER_RIGHT,
  MODELFORGE_CARD,
  MODELFORGE_CARD_BG,
  MODELFORGE_CARD_BORDER,
  MODELFORGE_IMAGE_BOX,
  MODELFORGE_STEPS,
  MODELFORGE_TITLE_GRADIENT,
  STEP_NUMBER_GRADIENT,
  PRIMARY_CTA_SHADOW,
  PRIMARY_CTA_INSET,
} from "./products-data";

const FALLBACK_HEADING = "Your models. Your IDE. No rewrites.";
const FALLBACK_SUBTITLE =
  "A new architecture shouldn't mean a new way of working. With ModelForge, it doesn't.";
const FALLBACK_PRIMARY = { label: "Explore the Developer Hub", href: "#" };
const FALLBACK_SECONDARY = { label: "Request the SDK", href: "#" };

const SUB_FEATURES = [
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <path d="M3 9h18" />
        <path d="M3 15h18" />
        <path d="M9 3v18" />
        <path d="M15 3v18" />
      </svg>
    ),
    text: "Speaks matrix math natively — none of the translation tax Arm/RISC-V pay",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
        <circle cx="2" cy="7" r="1.5" fill="currentColor"/>
        <circle cx="22" cy="7" r="1.5" fill="currentColor"/>
        <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
        <circle cx="12" cy="2" r="1.5" fill="currentColor"/>
      </svg>
    ),
    text: "Pre-integrated RTOS, drivers, DSP libraries",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 4H5a1 1 0 0 0-1 1v3" />
        <path d="M16 4h3a1 1 0 0 1 1 1v3" />
        <path d="M20 16v3a1 1 0 0 1-1 1h-3" />
        <path d="M4 16v3a1 1 0 0 0 1 1h3" />
        <circle cx="11" cy="11" r="3" />
        <path d="m13.5 13.5 3.5 3.5" />
      </svg>
    ),
    text: "Simulator + profiler — validate power and accuracy before the board arrives",
  },
];

/**
 * Figma 2917:1333 (title) + 2917:1341/1359/1377 (Train/Compile/Deploy cards).
 * "Your models. Your IDE. No rewrites."
 */
export function ProductsModelForge({ data }: { data?: any }) {
  const heading = data?.heading || FALLBACK_HEADING;
  const subtitle = data?.subtitle || FALLBACK_SUBTITLE;
  const image = mediaUrl(data?.image) || "/products/modelforge-image.png";
  const primary = {
    label: data?.primary_button?.label ?? FALLBACK_PRIMARY.label,
    href: data?.primary_button?.href ?? FALLBACK_PRIMARY.href,
  };
  const secondary = {
    label: data?.secondary_button?.label ?? FALLBACK_SECONDARY.label,
    href: data?.secondary_button?.href ?? FALLBACK_SECONDARY.href,
  };
  const steps =
    Array.isArray(data?.steps) && data.steps.length > 0
      ? data.steps.map((s: any, i: number) => {
          const fallback = MODELFORGE_STEPS[i] || MODELFORGE_STEPS[0];
          const stepNum = s?.step || fallback.number;
          return {
            nodeId: `modelforge-step-${i}`,
            number: stepNum,
            title: fallback.title,
            description: s?.description ?? fallback.description,
            image: mediaUrl(s?.image),
            imgLeft: fallback.imgLeft,
            imgTop: fallback.imgTop,
          };
        })
      : MODELFORGE_STEPS;
      
  const subfeatures =
    Array.isArray(data?.subfeatures) && data.subfeatures.length > 0
      ? data.subfeatures.map((sf: any, i: number) => {
          const fallback = SUB_FEATURES[i] || SUB_FEATURES[0];
          return {
            text: sf.text || fallback.text,
            icon: fallback.icon,
          };
        })
      : SUB_FEATURES;

  return (
    <>
      {/* DESKTOP (>=1024px) */}
      <section
        className="relative mx-auto hidden w-full bg-black min-[1024px]:block"
        aria-label="ModelForge workflow"
      >
        <ProductsModelForgeDesktop
          heading={heading}
          subtitle={subtitle}
          image={image}
          steps={steps}
          primary={primary}
          secondary={secondary}
          subfeatures={subfeatures}
        />
      </section>

      {/* MOBILE (<1024px) */}
      <ProductsModelForgeMobile
        heading={heading}
        subtitle={subtitle}
        image={image}
        steps={steps}
        subfeatures={subfeatures}
      />
    </>
  );
}

function ProductsModelForgeDesktop({
  heading,
  subtitle,
  image,
  steps,
  primary,
  secondary,
  subfeatures,
}: {
  heading: string;
  subtitle: string;
  image: string;
  steps: any[];
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  subfeatures: any[];
}) {
  return (
    <div className="mx-auto flex w-full max-w-[1256px] flex-col items-center pb-[120px]">
      {/* Section title — 2917:1333 (centered, w=739) */}
      <div
        className="flex flex-col items-center gap-[24px]"
        style={{ width: 739 }}
        data-node-id="2917:1333"
        data-name="Section Title"
      >
        <MenuChip label="BUILD WITH GPX10PRO" />
        <div
          className="relative px-[10px]"
          style={{ width: 739, height: 49 }}
          data-node-id="2917:1334"
          data-name="Title"
        >
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            className={`${gilroyMedium.className} absolute m-0 w-[719px] bg-clip-text text-center text-[46px] leading-[49px] font-medium text-transparent not-italic [word-break:break-word]`}
            style={{
              left: 10,
              top: 0,
              backgroundImage: MODELFORGE_TITLE_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
            data-node-id="2917:1335"
          >
            {heading}
          </h2>
        </div>
        <p
          className={`${interRegular.className} w-[650px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
          data-node-id="2917:1340"
        >
          {subtitle}
        </p>
      </div>

      {/* Cards row — 2917:1341 / 1359 / 1377 */}
      <div
        className="mt-[46px] flex items-start"
        style={{ gap: MODELFORGE_CARD.gap }}
      >
        {steps.map((step) => (
          <ModelForgeCard key={step.nodeId} step={step} />
        ))}
      </div>

      {/* Sub-features row */}
      <div
        className="mt-[28px] flex items-stretch"
        style={{ gap: MODELFORGE_CARD.gap }}
      >
        {subfeatures.map((feat, i) => (
          <div 
            key={i} 
            className="relative flex flex-col p-[24px] border border-solid"
            style={{ 
              width: MODELFORGE_CARD.width,
              borderColor: MODELFORGE_CARD_BORDER,
              background: "linear-gradient(90deg, rgba(21,43,14,0.6) 0%, rgba(5,10,3,0.3) 100%)"
            }}
          >
            <div className="text-[#d4e9bc] mb-[16px]">
              {feat.icon}
            </div>
            <p className={`${interRegular.className} text-[14px] leading-[21px] text-[#f0f0f0]`}>{feat.text}</p>
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          </div>
        ))}
      </div>

      {/* CTAs row — 2917:1396 */}
      <div className="mt-[64px] flex items-center justify-center gap-[24px]">
        {/* Primary CTA */}
        <a
          href={primary.href}
          className={`${PRIMARY_CTA_SHADOW} ${gilroyMedium.className} relative flex h-[48px] w-[251px] shrink-0 items-center justify-center overflow-hidden uppercase bg-transparent border-0 cursor-pointer text-white text-[16px] leading-[28px]`}
        >
          <div aria-hidden className="absolute bg-gradient-to-b from-[#6ced3f] inset-0 pointer-events-none to-[#38a612]" />
          <AnimatedDotsBackground />
          <span className="relative z-10">{primary.label}</span>
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <div className={`pointer-events-none absolute inset-0 rounded-[inherit] ${PRIMARY_CTA_INSET}`} />
        </a>

        {/* Secondary CTA */}
        <a
          href={secondary.href}
          className={`${gilroyMedium.className} relative flex h-[48px] w-[174px] shrink-0 items-center justify-center overflow-hidden uppercase bg-[rgba(226,241,202,0.12)] border-0 cursor-pointer text-white text-[16px] leading-[28px]`}
        >
          <span className="relative z-10">{secondary.label}</span>
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
        </a>
      </div>
    </div>
  );
}

function ModelForgeCard({ step }: { step: any }) {

  return (
    <article
      className="relative flex flex-col border border-solid px-[32px] pt-[16px] pb-[24px]"
      style={{
        width: MODELFORGE_CARD.width,
        height: MODELFORGE_CARD.height,
        backgroundColor: MODELFORGE_CARD_BG,
        borderColor: MODELFORGE_CARD_BORDER,
      }}
      data-node-id={step.nodeId}
      data-name="Article"
    >
      {/* NewsSection (content area) */}
      <div className="relative w-full flex-1" data-name="NewsSection">
        {/* Image box */}
        <div
          className="absolute overflow-hidden"
          style={{
            left: MODELFORGE_IMAGE_BOX.left,
            top: MODELFORGE_IMAGE_BOX.top,
            width: MODELFORGE_IMAGE_BOX.width,
            height: MODELFORGE_IMAGE_BOX.height,
          }}
          data-name="image 168"
          aria-hidden
        >
          {step.image && (
            <img
              alt=""
              src={step.image}
              className="absolute inset-0 h-full w-full object-contain"
            />
          )}
          {/* Fade overlay — transparent until 88%, then to black */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0) 88.146%, #000000 100%)",
            }}
          />
        </div>

        {/* Title + description */}
        <div
          className="absolute left-0 flex flex-col items-start gap-[12px] not-italic [word-break:break-word]"
          style={{ top: 317 }}
          data-name="Frame 1618875841"
        >
          <h3
            className={`${gilroyMedium.className} w-[333.991px] shrink-0 text-[32px] leading-[38px] font-medium text-white`}
          >
            {step.title}
          </h3>

          <p
            className={`${interRegular.className} w-[333.99px] shrink-0 text-[16px] leading-[26px] font-normal text-[#99a1af] tracking-[-0.3125px]`}
          >
            {step.description}
          </p>
        </div>
      </div>

      {/* Step number — card-relative, left-aligned with content */}
      <span
        className={`${gilroyMedium.className} pointer-events-none absolute bg-clip-text text-[70px] leading-[70px] font-medium text-transparent opacity-50 not-italic whitespace-nowrap`}
        style={{
          left: 32,
          top: 257,
          backgroundImage: STEP_NUMBER_GRADIENT,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
        aria-hidden
      >
        {step.number.split(" ")[0]}
      </span>

      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
    </article>
  );
}

function ProductsModelForgeMobile({
  heading,
  subtitle,
  image,
  steps,
  subfeatures,
}: {
  heading: string;
  subtitle: string;
  image: string;
  steps: any[];
  subfeatures: any[];
}) {
  return (
    <section
      className="relative w-full bg-black px-[24px] pt-[64px] pb-[80px] min-[1024px]:hidden"
      aria-label="ModelForge workflow"
    >
      {/* Title */}
      <div className="flex flex-col items-center gap-[16px]">
        <MenuChip label="BUILD WITH GPX10PRO" />
        <h2
          className={`${gilroyMedium.className} max-w-full bg-clip-text text-center text-[30px] leading-[34px] font-medium text-transparent not-italic [word-break:break-word]`}
          style={{
            backgroundImage: MODELFORGE_TITLE_GRADIENT,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          {heading}
        </h2>
        <p
          className={`${interRegular.className} max-w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0]`}
        >
          {subtitle}
        </p>
      </div>

      {/* Cards */}
      <div className="mt-[32px] flex flex-col gap-[20px]">
        {steps.map((step) => (
          <article
            key={step.nodeId}
            className="relative flex flex-col border border-solid p-[20px]"
            style={{
              backgroundColor: MODELFORGE_CARD_BG,
              borderColor: MODELFORGE_CARD_BORDER,
            }}
          >
            {/* Image */}
            <div
              className="relative mb-[16px] h-[180px] w-full overflow-hidden"
              aria-hidden
            >
              {step.image && (
                <img
                  alt=""
                  src={step.image}
                  className="absolute inset-0 h-full w-full object-contain"
                />
              )}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0) 80%, #000000 100%)",
                }}
              />
            </div>

            <div className="flex items-center gap-[12px]">
              <span
                className={`${gilroyMedium.className} bg-clip-text text-[44px] leading-[44px] font-medium text-transparent opacity-50 not-italic`}
                style={{
                  backgroundImage: STEP_NUMBER_GRADIENT,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
                aria-hidden
              >
                {step.number.split(" ")[0]}
              </span>
              <h3
                className={`${gilroyMedium.className} text-[24px] leading-[30px] font-medium text-white not-italic`}
              >
                {step.title}
              </h3>
            </div>
            <p
              className={`${interRegular.className} mt-[8px] text-[14px] leading-[21px] font-normal text-[#99a1af] not-italic`}
            >
              {step.description}
            </p>

            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          </article>
        ))}
      </div>

      {/* Mobile Sub-features */}
      <div className="mt-[20px] flex flex-col gap-[20px]">
        {subfeatures.map((feat, i) => (
          <div 
            key={i} 
            className="relative flex flex-col p-[20px] border border-solid"
            style={{ 
              borderColor: MODELFORGE_CARD_BORDER,
              background: "linear-gradient(90deg, rgba(21,43,14,0.6) 0%, rgba(5,10,3,0.3) 100%)"
            }}
          >
            <div className="text-[#d4e9bc] mb-[16px]">
              {feat.icon}
            </div>
            <p className={`${interRegular.className} text-[14px] leading-[21px] text-[#f0f0f0]`}>{feat.text}</p>
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          </div>
        ))}
      </div>
    </section>
  );
}

function MenuChip({ label }: { label: string }) {
  return (
    <div
      className={`${dmMono.className} bg-[rgba(255,255,255,0.06)] flex gap-[6px] h-[27px] items-center overflow-clip px-[24px] relative shrink-0 border-[0.5px] border-solid border-[rgba(240,240,240,0.25)]`}
      data-name="Menu"
    >
      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] leading-[20px] not-italic relative shrink-0 text-[#ecfae5] text-[13px] tracking-[-0.4px] uppercase whitespace-nowrap">
        {label}
      </p>
      <div
        className="absolute bg-white h-[12px] left-[12px] opacity-60 top-1/2 -translate-y-1/2 w-[2px]"
        aria-hidden
      />
      <div
        className="absolute bg-white h-[12px] opacity-60 right-[12px] top-1/2 -translate-y-1/2 w-[2px]"
        aria-hidden
      />
    </div>
  );
}
