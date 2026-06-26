import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { DvkHero } from "./DvkHero";
import { DvkHardwareStack, SPEC_CARDS } from "./DvkHardwareStack";
import { DvkDemos } from "./DvkDemos";
import { DEMO_CARDS } from "./DvkDemosCards";
import { DvkModelForge } from "./DvkModelForge";
import {
  ACCENT_CARD_BG,
  ACCENT_CARD_BORDER,
  CARD_BG,
  CARD_BORDER,
  CORNER_LEFT,
  CORNER_RIGHT,
  DEMOS_TITLE_GRADIENT,
  FEATURE_CARD_BG,
  HERO_IMAGE_OVERLAY,
  HERO_TITLE_GRADIENT,
  MODELFORGE_TITLE_GRADIENT,
  PRIMARY_CTA_INSET,
  PRIMARY_CTA_SHADOW,
  SECTION_TITLE_GRADIENT,
} from "./dvk-data";

/**
 * Figma 2761:2971 — Cranium Development Kit (DVK) page.
 * Desktop hero canvas is 1442 wide / 658 tall; hardware stack frame is 1232 wide.
 */
const DVK_DESKTOP_HEIGHT = 658;

export function Dvk() {
  return (
    <main className="flex w-full flex-col overflow-x-clip bg-black">
      {/* DESKTOP (>=1024px) — hero canvas, source of truth */}
      <div
        className="relative mx-auto -mt-[78px] hidden w-full overflow-x-clip bg-black min-[1024px]:block"
        style={{ height: DVK_DESKTOP_HEIGHT }}
        data-node-id="2761:2971"
        data-name="Hero Section"
      >
        <div className="relative mx-auto h-full w-[1442px]">
          <DvkHero />
        </div>
      </div>

      {/* DESKTOP (>=1024px) — hardware stack section (2761:2905) */}
      <div className="relative mx-auto hidden w-full bg-black min-[1024px]:block">
        <div className="mx-auto w-[1232px] pb-[120px]">
          <DvkHardwareStack />
        </div>
      </div>

      {/* DESKTOP (>=1024px) — demos section (2761:2791 + cards row) */}
      <div className="relative mx-auto hidden w-full bg-black min-[1024px]:block">
        <div className="mx-auto w-[1256px] pb-[200px]">
          <DvkDemos />
        </div>
      </div>

      {/* DESKTOP (>=1024px) — ModelForge section title (2761:3009) */}
      <div className="relative mx-auto hidden w-full bg-black min-[1024px]:block">
        <div className="mx-auto w-[650px] pb-[80px]">
          <DvkModelForge />
        </div>
      </div>

      {/* MOBILE (<1024px) — stacked layout */}
      <DvkHeroMobile />
      <DvkHardwareStackMobile />
      <DvkDemosMobile />
      <DvkModelForgeMobile />
    </main>
  );
}

function DvkHeroMobile() {
  return (
    <section
      className="relative -mt-[78px] w-full bg-black min-[1024px]:hidden"
      aria-label="Cranium Development Kit"
    >
      <div className="relative flex w-full flex-col pt-[100px] pb-[56px]">
        {/* Background image */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src="/dvk/hero-bg-1.png"
            className="absolute inset-0 size-full object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{ backgroundImage: HERO_IMAGE_OVERLAY }}
          />
        </div>

        {/* Background vertical lines connecting to Navbar */}
        <div className="pointer-events-none absolute top-[78px] bottom-0 left-[26px] z-0">
          <div className="absolute top-0 left-1/2 h-full w-[1px] -translate-x-1/2 overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-[821px] origin-top-left rotate-90 opacity-60">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hero/line-82.svg"
                alt=""
                className="block size-full max-w-none"
                aria-hidden
              />
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute top-[78px] bottom-0 right-[26px] z-0">
          <div className="absolute top-0 left-1/2 h-full w-[1px] -translate-x-1/2 overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-[821px] origin-top-left rotate-90 opacity-60">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hero/line-83.svg"
                alt=""
                className="block size-full max-w-none"
                aria-hidden
              />
            </div>
          </div>
        </div>

        {/* Text area */}
        <div className="relative z-10 flex flex-col gap-[15px] px-[24px]">
          <h1
            className={`${gilroyMedium.className} w-[320px] max-w-full bg-clip-text text-[36px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
            style={{
              backgroundImage: HERO_TITLE_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            The physical launchpad for microwatt Edge AI.
          </h1>
          <p
            className={`${interRegular.className} w-[332px] max-w-full text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-80`}
          >
            Validate real-time AI at microwatt power levels out of the box. The
            Cranium Development Kit comes fully loaded with onboard sensors,
            rich I/O, and pre-integrated drivers so you can stop breadboarding
            and start testing inferences in minutes.
          </p>

          <a
            href="#"
            className={`${PRIMARY_CTA_SHADOW} ${gilroyMedium.className} relative mt-[9px] flex h-[48px] w-[229px] shrink-0 items-center justify-center overflow-hidden`}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
            />
            <span className="relative text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
              Request Evaluation Kit
            </span>
            <span
              aria-hidden
              className={`pointer-events-none absolute inset-0 rounded-[inherit] ${PRIMARY_CTA_INSET}`}
            />
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          </a>
        </div>
      </div>
    </section>
  );
}

function DvkHardwareStackMobile() {
  return (
    <section
      className="relative w-full bg-black min-[1024px]:hidden"
      aria-label="Edge AI hardware stack"
    >
      <div className="relative flex w-full flex-col items-center gap-[40px] px-[24px] pt-[64px] pb-[80px]">
        {/* Header */}
        <div className="flex w-full flex-col items-center gap-[20px]">
          <h2
            className={`${gilroyMedium.className} max-w-full bg-clip-text text-center text-[30px] leading-[34px] font-medium text-transparent not-italic [word-break:break-word]`}
            style={{
              backgroundImage: SECTION_TITLE_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            The complete Edge AI hardware stack in a single footprint
          </h2>
          <p
            className={`${interRegular.className} max-w-full text-center text-[15px] leading-[23px] font-normal text-[#f0f0f0] not-italic`}
            style={{ opacity: 0.65 }}
          >
            An exhaustive suite of sensors, interfaces, and debug tools
            pre-integrated with the GPX-10 Pro AI Processor.
          </p>
        </div>

        {/* Feature card */}
        <div
          className="relative flex w-full flex-col items-center justify-center gap-[16px] overflow-clip border-[0.5px] border-solid p-[14px]"
          style={{ backgroundColor: FEATURE_CARD_BG, borderColor: CARD_BORDER }}
        >
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <p
            className={`${gilroyMedium.className} text-center text-[20px] leading-[28px] text-white not-italic`}
          >
            The Hardware Blueprint
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src="/dvk/board-main.png"
            className="pointer-events-none h-auto w-full rounded-[7.572px] object-bottom"
          />
        </div>

        {/* Spec cards — stacked */}
        <div className="flex w-full flex-col gap-[8px]">
          {SPEC_CARDS.map((card) => {
            const isAccent = card.accent === true;
            return (
              <div
                key={card.title}
                className="relative flex w-full flex-col gap-[10px] overflow-clip border-[0.5px] border-solid px-[16px] pt-[14px] pb-[18px]"
                style={{
                  backgroundColor: isAccent ? ACCENT_CARD_BG : CARD_BG,
                  borderColor: isAccent ? ACCENT_CARD_BORDER : CARD_BORDER,
                }}
              >
                <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
                <p
                  className={`${gilroyMedium.className} text-[20px] leading-[28px] text-white not-italic`}
                >
                  {card.title}
                </p>
                <ul
                  className={`${interRegular.className} list-disc text-[15px] leading-[0] font-normal text-[rgba(240,240,240,0.6)]`}
                >
                  {card.items.map((item) => (
                    <li key={item} className="ms-[20px]">
                      <span className="leading-[22px]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DvkDemosMobile() {
  return (
    <section
      className="relative w-full bg-black min-[1024px]:hidden"
      aria-label="Pre-loaded demos"
    >
      <div className="flex w-full flex-col items-center justify-center gap-[32px] px-[24px] pt-[56px] pb-[80px]">
        {/* Title + description */}
        <div className="flex w-full flex-col items-center justify-center gap-[16px]">
          <h2
            className={`${gilroyMedium.className} max-w-full bg-clip-text text-center text-[28px] leading-[32px] font-medium text-transparent not-italic [word-break:break-word]`}
            style={{
              backgroundImage: DEMOS_TITLE_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            Pre-loaded demos. Instant AI validation.
          </h2>
          <p
            className={`${interRegular.className} max-w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic`}
          >
            Don&apos;t spend your first day writing sensor configuration code.
            The Cranium board comes ready to run out of the box, allowing you to
            instantly test physical AI models and validate performance on the
            metal with zero setup required.
          </p>
        </div>

        {/* Stacked demo cards */}
        <div className="flex w-full flex-col gap-[16px]">
          {DEMO_CARDS.map((card) => (
            <div
              key={card.nodeId}
              className="relative flex flex-col gap-[16px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-black px-[24px] pt-[16px] pb-[24px]"
            >
              {/* Header image */}
              <div className="relative h-[200px] w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src={card.img}
                  className="absolute inset-0 size-full object-cover"
                />
                {card.imgOverlay && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    alt=""
                    src={card.imgOverlay}
                    className="absolute inset-0 size-full object-cover"
                  />
                )}
              </div>
              <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
              <div className="relative flex flex-col gap-[10px]">
                <h3
                  className={`${gilroyMedium.className} text-[24px] leading-[30px] text-white not-italic`}
                >{`${card.titleLine1} ${card.titleLine2}`}</h3>
                <p
                  className={`${interRegular.className} text-[15px] leading-[22px] font-normal text-[#99a1af] not-italic`}
                >
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DvkModelForgeMobile() {
  return (
    <section
      className="relative w-full bg-black min-[1024px]:hidden"
      aria-label="Powered by ModelForge"
    >
      <div className="flex w-full flex-col items-center justify-center gap-[16px] px-[24px] pt-[64px] pb-[48px]">
        <h2
          className={`${gilroyMedium.className} max-w-full bg-clip-text text-center text-[28px] leading-[32px] font-medium text-transparent not-italic [word-break:break-word]`}
          style={{
            backgroundImage: MODELFORGE_TITLE_GRADIENT,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          Powered by ModelForge.
        </h2>
        <p
          className={`${interRegular.className} max-w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic`}
        >
          Don&apos;t let software be the bottleneck. The Cranium DVK is fully
          supported by our unified software toolchain, designed to take you from
          a standard TensorFlow model to on-silicon inference in under 15
          minutes.
        </p>
      </div>
    </section>
  );
}
