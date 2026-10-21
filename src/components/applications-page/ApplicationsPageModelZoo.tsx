/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { gilroyMedium, interRegular, dmMono } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";
import { PARTNERS_WHY } from "../partners/partners-data";

/* Hearables slug pages swap the shared partner-journey card art for
   hearables imagery. Slot 3 keeps its existing image until hear-3 lands. */
const HEARABLES_CARD_IMAGES: Record<number, string> = {
  0: "/applications/hearables/hear-1.webp",
  1: "/applications/hearables/hear-2.webp",
  2: "/applications/hearables/hear-3.webp",
  3: "/applications/hearables/hear-4.webp",
  4: "/applications/hearables/hear-5.webp",
};

/* Industrial IoT slug pages use their own card art. */
const IIOT_CARD_IMAGES: Record<number, string> = {
  0: "/applications/industrial-iot/iiot-one.webp",
  1: "/applications/industrial-iot/iiot-two.webp",
  2: "/applications/industrial-iot/iiot-three.webp",
  3: "/applications/industrial-iot/iiot-four.webp",
  4: "/applications/industrial-iot/iiot-five.webp",
};

const TITLE_GRADIENT =
  "linear-gradient(123.792deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

const EYEBROW = "READY TO RUN";
const HEADING = "Every application here runs on real, ready models.";
const SUBTITLE =
  "Browse a growing library of open-source and Ambient-built models — tuned for GPX, deployable in one click. Don't build from scratch; start from something that works.";

const SECONDARY_CTA = { label: "See it live in ApplicationForge", href: "/application-forge" };

/** Left fade over the collage rows. */
const COLLAGE_LEFT_FADE =
  "linear-gradient(262.733deg, rgba(0, 0, 0, 0) 15.711%, rgb(0, 0, 0) 72.391%)";

/** Row 1 cards — duplicated from ModelZooHero. */
export const COLLAGE_ROW_1 = [
  { label: "Anomaly Detection", img: "/model-zoo/collage-r1-c1.webp" },
  { label: "Keyword Spotting", img: "/model-zoo/collage-r1-c2.webp" },
  { label: "Human Activity Recognition", img: "/model-zoo/collage-r1-c3.webp" },
  { label: "Fall Detection", img: "/model-zoo/collage-r1-c4.webp" },
  { label: "IMU Gesture Recognition", img: "/model-zoo/collage-r1-c5.webp" },
];

/** Row 2 cards — duplicated from ModelZooHero. */
export const COLLAGE_ROW_2 = [
  { label: "Person / No-Person", img: "/model-zoo/collage-r2-c1.webp" },
  { label: "Presence Detection", img: "/model-zoo/collage-r2-c2.webp" },
  { label: "Voice Activity Detection", img: "/model-zoo/collage-r2-c3.webp" },
];

export function PrimaryCta({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="relative flex h-[48px] w-auto shrink-0 items-center justify-center gap-[10px] px-[24px] py-[10px] drop-shadow-[0px_42px_53.5px_rgba(69,196,24,0.2)]"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
      />
      <span className="relative flex items-center gap-[10px]">
        <p
          className={`${gilroyMedium.className} text-[14px] min-[1024px]:text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic`}
        >
          {label}
        </p>
      </span>
      <GreenCtaCorners />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
      />
    </a>
  );
}

export function SecondaryCta({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="relative flex h-[48px] w-auto shrink-0 items-center justify-center bg-[rgba(226,241,202,0.12)] px-[24px] py-[10px]"
    >
      <p
        className={`${gilroyMedium.className} text-[14px] min-[1024px]:text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic`}
      >
        {label}
      </p>
      <GreenCtaCorners />
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Collage rows — duplicated from ModelZooHero                         */
/* ------------------------------------------------------------------ */

export function CollageRow({
  cards,
  nodeId,
  direction = "left",
  duration = 30,
}: {
  cards: { label: string; img: string }[];
  nodeId: string;
  direction?: "left" | "right";
  duration?: number;
}) {
  // Quadruple the cards so the -50% translateX loop is seamless at any viewport width
  const track = [...cards, ...cards, ...cards, ...cards];
  return (
    <div
      className="relative w-full overflow-clip"
      style={{ height: 182 }}
      data-node-id={nodeId}
      aria-hidden
    >
      <div
        className={`flex w-max items-center gap-[10px] ${direction === "left" ? "animate-dvk-marquee-left" : "animate-dvk-marquee-right"}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {track.map((card, i) => (
          <div
            key={i}
            className="relative flex w-[198px] shrink-0 flex-col items-center gap-[10px] overflow-clip border-[0.245px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.95)] px-[8px] pt-[8px] pb-[14px]"
            data-node-id={`${nodeId}:${i}`}
            data-name="Article"
          >
            <div className="relative h-[126px] w-[182px] shrink-0 overflow-clip">
              <img alt="" src={card.img} className="pointer-events-none absolute inset-0 size-full object-cover" />
            </div>
            <p
              className={`${gilroyMedium.className} w-full text-[13.688px] leading-[23.954px] text-white not-italic`}
            >
              {card.label}
            </p>
            <MiniCorners />
          </div>
        ))}
      </div>
      {/* Left fade */}
      <div
        className="absolute top-1/2 left-0 h-[200px] w-[133px] -translate-y-1/2"
        style={{ backgroundImage: COLLAGE_LEFT_FADE }}
      />
      {/* Right fade */}
      <div
        className="absolute top-1/2 right-0 h-[200px] w-[133px] -translate-y-1/2"
        style={{ backgroundImage: "linear-gradient(97.267deg, rgba(0, 0, 0, 0) 15.711%, rgb(0, 0, 0) 72.391%)" }}
      />
    </div>
  );
}

/** 1.96px corner ticks on the collage mini cards. */
function MiniCorners() {
  return (
    <>
      {(
        [
          ["top-0 left-0", "/hero/corner-tag-1.svg", "-scale-y-100"],
          ["top-0 right-0", "/hero/corner-tag-2.svg", "rotate-180"],
          ["bottom-0 right-0", "/hero/corner-tag-2.svg", "-scale-x-100"],
          ["bottom-0 left-0", "/hero/corner-tag-1.svg", ""],
        ] as const
      ).map(([pos, src, transform], i) => (
        <div key={i} className={`pointer-events-none absolute size-[1.96px] ${pos}`}>
          <div className={`flex-none ${transform}`}>
            <Image src={src} alt="" width={4} height={4} className="block size-full max-w-none" aria-hidden />
          </div>
        </div>
      ))}
    </>
  );
}

const WHY_CARD_BG = "rgba(0,0,0,0.2)";
const WHY_CARD_BORDER = "rgba(240,240,240,0.2)";
const STEP_NUMBER_GRADIENT =
  "linear-gradient(to bottom, rgb(255, 255, 255), rgba(255, 255, 255, 0))";

function WhyCard({ step }: { step: any }) {
  return (
    <article
      className="group/card relative flex w-full flex-col overflow-hidden border border-solid px-[24px] pt-0 pb-[24px] h-full min-h-[430px]"
      style={{
        backgroundColor: WHY_CARD_BG,
        borderColor: WHY_CARD_BORDER,
      }}
      data-name="Article"
    >
      {/* Image box placeholder */}
      <div
        className="relative w-[140%] -ml-[20%] h-[180px] shrink-0 overflow-hidden"
        aria-hidden
      >
        {/* Soft grey radial gradient backlight for dark images */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 65%)"
          }}
          aria-hidden
        />
        {step.image && (
          <img loading="lazy" decoding="async"
            alt=""
            src={step.image}
            className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity duration-300 group-hover/card:opacity-100"
          />
        )}
        {/* Fade overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0) 70%, #000000 100%)",
          }}
        />
      </div>

      {/* Step number — positioned overlapping the image bottom */}
      <span
        className={`${gilroyMedium.className} pointer-events-none absolute bg-clip-text text-[50px] leading-[50px] font-medium text-transparent opacity-50 not-italic whitespace-nowrap min-[1280px]:text-[60px] min-[1280px]:leading-[60px]`}
        style={{
          left: 16,
          top: 155,
          backgroundImage: STEP_NUMBER_GRADIENT,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
        aria-hidden
      >
        {step.number}
      </span>

      {/* Title + description */}
      <div className="relative z-10 flex w-full flex-col items-start gap-[12px] not-italic [word-break:break-word] mt-[24px] flex-1">
        <h3
          className={`${gilroyMedium.className} w-full shrink-0 text-[18px] leading-[24px] font-medium text-white min-[1280px]:text-[22px] min-[1280px]:leading-[28px]`}
        >
          {step.title}
        </h3>

        <p
          className={`${interRegular.className} w-full text-[13px] leading-[20px] font-normal text-[#99a1af] tracking-[-0.3px] [word-break:break-word] min-[1280px]:text-[16px] min-[1280px]:leading-[24px]`}
        >
          {step.description}
        </p>
      </div>

      <Corners />
    </article>
  );
}

const SMART_HOME_EYEBROW = "MULTI-MODAL, FULLY ON-DEVICE";
const SMART_HOME_HEADING = "One chip. Every smart-home AI feature.";
const SMART_HOME_SUBTITLE =
  "The GPX architecture isn't an ASIC — it's a fully programmable AI engine. Here's what you run natively, privately, on the device.";

const SMART_HOME_FEATURES = [
  {
    number: "01",
    title: "Localized FaceID & Presence",
    description:
      "Wake appliances or adjust the environment on visual recognition — no images ever leave the device.",
    image: "/applications/smart-homes/faceid-presence.jpg",
  },
  {
    number: "02",
    title: "Glass-Break & Intrusion Audio",
    description:
      "Monitor continuous acoustic data for security events while the Wi-Fi SoC sleeps.",
    image: "/applications/smart-homes/glass-break.jpg",
  },
  {
    number: "03",
    title: "Unplugged Natural Language",
    description:
      "Run complex voice commands for thermostats and locks completely offline.",
    image: "/applications/smart-homes/voice-nlp.jpg",
  },
  {
    number: "04",
    title: "Radar & Fall Detection",
    description:
      "Monitor the elderly in a privacy-safe way using mmWave radar + motion AI.",
    image: "/applications/smart-homes/radar-fall.jpg",
  },
  {
    number: "05",
    title: "Bring Your Own Model",
    description:
      "Proprietary vision or NLP model? Compile it to GPX with ModelForge.",
    image: "/applications/smart-homes/byom-cube.jpg",
  },
];

const WEARABLES_EYEBROW = "AI MODEL ZOO";
const WEARABLES_HEADING = "One chip. Every wearable AI feature.";
const WEARABLES_SUBTITLE =
  "The GPX architecture isn't an ASIC — it's a fully programmable AI engine. Here's what you run natively.";

/* Main /applications page (strip variant) — Model Zoo copy instead of the
   wearables-page copy. */
const STRIP_HEADING = "Every application here runs on real, ready models";
const STRIP_SUBTITLE =
  "Browse a growing library of open-source and Ambient-built models, tuned for GPX, deployable in one click. Don't build from scratch, start from something that works.";

const WEARABLES_FEATURES = [
  {
    number: "01",
    title: "Complex Activity Classification",
    description:
      "Beyond step-counting — gym exercises, swim strokes, PT movements.",
    image: "/applications/wearables/feature-card-1.jpeg",
  },
  {
    number: "02",
    title: "Continuous Biomarker Tracking",
    description:
      "1D-CNNs for ECG and early anomaly detection without killing the coin cell.",
    image: "/applications/wearables/feature-card-2.jpeg",
  },
  {
    number: "03",
    title: "Always-On Safety Monitoring",
    description:
      "Fall detection and acoustic safety, always in the background.",
    image: "/applications/wearables/feature-card-3.jpeg",
  },
  {
    number: "04",
    title: "Gesture Recognition",
    description:
      "Micro-gestures for AR rings and glasses, zero cloud latency.",
    image: "/applications/wearables/feature-card-4.jpeg",
  },
  {
    number: "05",
    title: "Bring Your Own Model",
    description:
      "Proprietary model? Compile it to GPX with ModelForge.",
    image: "/applications/wearables/feature-card-5.jpeg",
  },
];

type FeatureCardItem = {
  number: string;
  title: string;
  description: string;
  image: string;
};

function FeatureCard({ item }: { item: FeatureCardItem }) {
  return (
    <article
      className="group/card relative flex w-full flex-col overflow-hidden border border-solid px-[24px] pt-[16px] pb-[24px] h-full min-h-[430px] transition-all duration-300 hover:border-[#45c418] hover:shadow-[0_0_24px_rgba(69,196,24,0.2)]"
      style={{
        backgroundColor: WHY_CARD_BG,
        borderColor: WHY_CARD_BORDER,
      }}
      data-name="Article"
    >
      {/* Image box */}
      <div
        className="relative w-[140%] -ml-[20%] h-[180px] shrink-0 overflow-hidden"
        aria-hidden
      >
        {/* Soft grey radial gradient backlight */}
        <div 
          className="absolute inset-0" 
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 65%)"
          }}
          aria-hidden
        />
        {item.image && (
          <img
            loading="lazy"
            decoding="async"
            alt=""
            src={item.image}
            className={`absolute inset-0 h-full w-full opacity-75 transition-opacity duration-300 group-hover/card:opacity-100 ${
              item.image.endsWith(".svg") ? "object-contain" : "object-cover object-center"
            }`}
          />
        )}
        {/* Fade overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0) 70%, #000000 100%)",
          }}
        />
      </div>

      {/* Step number — positioned overlapping the image bottom */}
      <span
        className={`${gilroyMedium.className} pointer-events-none absolute bg-clip-text text-[50px] leading-[50px] font-medium text-transparent opacity-50 not-italic whitespace-nowrap min-[1280px]:text-[60px] min-[1280px]:leading-[60px]`}
        style={{
          left: 16,
          top: 155,
          backgroundImage: STEP_NUMBER_GRADIENT,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
        aria-hidden
      >
        {item.number}
      </span>

      {/* Title + description */}
      <div className="relative z-10 flex w-full flex-col items-start gap-[12px] not-italic [word-break:break-word] mt-[24px] flex-1">
        <h3
          className={`${gilroyMedium.className} w-full shrink-0 text-[18px] leading-[24px] font-medium text-white min-[1280px]:text-[22px] min-[1280px]:leading-[28px]`}
        >
          {item.title}
        </h3>

        <p
          className={`${interRegular.className} w-full text-[13px] leading-[20px] font-normal text-[#99a1af] tracking-[-0.3px] [word-break:break-word] min-[1280px]:text-[16px] min-[1280px]:leading-[24px]`}
        >
          {item.description}
        </p>
      </div>

      <Corners />
    </article>
  );
}

export function ApplicationsPageModelZoo({
  variant = "cards",
  slug,
}: {
  data?: any;
  variant?: "strip" | "cards";
  slug?: string;
}) {
  const isSmartHome = Boolean(
    slug && (slug === "smarthomes" || slug === "smart-homes" || slug.includes("home"))
  );
  const isHearables = Boolean(slug && slug.includes("hearable"));
  const isIiot = Boolean(slug && slug.includes("industrial"));
  const isWearables = Boolean(
    !slug || slug === "wearables" || slug.includes("wearable")
  );

  const eyebrow = isSmartHome
    ? SMART_HOME_EYEBROW
    : isWearables
      ? WEARABLES_EYEBROW
      : EYEBROW;
  const heading = variant === "strip"
    ? STRIP_HEADING
    : isSmartHome
      ? SMART_HOME_HEADING
      : isWearables
        ? WEARABLES_HEADING
        : HEADING;
  const subtitle = variant === "strip"
    ? STRIP_SUBTITLE
    : isSmartHome
      ? SMART_HOME_SUBTITLE
      : isWearables
        ? WEARABLES_SUBTITLE
        : SUBTITLE;
  const primaryCta = { label: "Explore the Model Zoo →", href: "/model-zoo" };
  const features = isSmartHome
    ? SMART_HOME_FEATURES
    : isWearables
      ? WEARABLES_FEATURES
      : null;

  return (
    <section className="relative flex w-full flex-col items-center overflow-hidden bg-black pt-[100px] pb-[80px]">
      
      {/* Header Info */}
      <div className="flex w-full max-w-[1024px] flex-col items-center gap-[24px] px-[24px] z-10 text-center">
        
        <div
          className="relative overflow-clip bg-[rgba(255,255,255,0.06)] px-[24px] flex items-center justify-center inline-flex"
          style={{ height: 26 }}
        >
          <Corners leftSrc="/developer/pipeline-corner-42.svg" rightSrc="/developer/pipeline-corner-43.svg" />
          <p
            className={`${dmMono.className} relative text-[16px] leading-[24px] uppercase tracking-[-0.39px] whitespace-nowrap text-[#ecfae5] not-italic`}
          >
            {eyebrow}
          </p>
          <div className="absolute left-[6.48px] top-1/2 h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
          <div className="absolute right-[6.48px] top-1/2 h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
        </div>

        <div className="relative inline-block px-[14px]">
          <h2
            className={`${gilroyMedium.className} bg-clip-text text-center text-[36px] min-[1024px]:text-[46px] leading-[1.2] font-medium text-transparent not-italic`}
            style={{ backgroundImage: TITLE_GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text" }}
          >
            {heading}
          </h2>
          <Corners />
        </div>

        <p className={`${interRegular.className} max-w-[800px] text-[16px] min-[1024px]:text-[16px] leading-[24px] min-[1024px]:leading-[24px] font-normal text-[#f0f0f0] opacity-65 not-italic`}>
          {subtitle}
        </p>

        {/* CTA Row */}
        {!isSmartHome && !isWearables && (
          <div className="mt-[16px] flex w-full flex-col min-[1024px]:flex-row items-center justify-center gap-[16px] px-[20px]">
            <PrimaryCta label={primaryCta.label} href={primaryCta.href} />
            <SecondaryCta label={SECONDARY_CTA.label} href={SECONDARY_CTA.href} />
          </div>
        )}
      </div>

      {variant === "strip" ? (
        /* Two-row collage carousel strip for the main Applications page */
        <div className="relative z-10 mt-[100px] flex w-full flex-col gap-[16px] overflow-hidden">
          <CollageRow
            cards={COLLAGE_ROW_1}
            nodeId="app-mz-r1"
            direction="left"
            duration={32}
          />
          <CollageRow
            cards={COLLAGE_ROW_2}
            nodeId="app-mz-r2"
            direction="right"
            duration={26}
          />
        </div>
      ) : null}

      {/* CTA underneath the carousel (strip variant only) */}
      {variant === "strip" ? (
        <div className="relative z-10 mt-[48px] flex w-full flex-col min-[1024px]:flex-row items-center justify-center gap-[16px] px-[20px]">
          <PrimaryCta label={primaryCta.label} href={primaryCta.href} />
        </div>
      ) : null}

      {variant !== "strip" ? (
        features ? (
          /* Hardcoded feature cards for Wearables & Smart Homes */
          <div className="relative z-10 mt-[60px] w-full py-[24px] px-[24px] min-[1024px]:px-[64px] min-[1024px]:py-[32px] max-w-[1440px]">
            <div className="flex w-full flex-wrap min-[1024px]:flex-nowrap justify-center gap-[16px] sm:gap-[24px]">
              {features.map((item) => (
                <div
                  key={item.title}
                  className="w-full sm:w-[calc(50%-12px)] min-[1024px]:w-[calc(20%-19.2px)] max-w-[400px] min-[1024px]:max-w-none"
                >
                  <FeatureCard item={item} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Partner cards on other application slug pages */
          <div className="relative z-10 mt-[60px] w-full py-[24px] px-[24px] min-[1024px]:px-[64px] min-[1024px]:py-[32px] max-w-[1440px]">
            <div className="flex w-full flex-wrap min-[1024px]:flex-nowrap justify-center gap-[16px] sm:gap-[24px]">
              {PARTNERS_WHY.journey.map((step, i) => (
                <div
                  key={step.title}
                  className="w-full sm:w-[calc(50%-12px)] min-[1024px]:w-[calc(20%-19.2px)] max-w-[400px] min-[1024px]:max-w-none"
                >
                  <WhyCard
                    step={{
                      ...step,
                      image:
                        (isHearables && HEARABLES_CARD_IMAGES[i]) ||
                        (isIiot && IIOT_CARD_IMAGES[i]) ||
                        step.image,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )
      ) : null}
    </section>
  );
}
