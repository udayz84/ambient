import { gilroyMedium, interRegular, dmMono } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { DvkHero } from "./DvkHero";
import { DvkScrollIndicator } from "./DvkScrollIndicator";
import { DvkHardwareStack } from "./DvkHardwareStack";
import { SPEC_CARDS } from "./dvk-data";
import { DvkDemos } from "./DvkDemos";
import { DEMO_CARDS } from "./DvkDemosCards";
import { DvkModelForge } from "./DvkModelForge";
import { mediaUrl } from "@/lib/strapi";
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

import { DvkIntegratedModules } from "./DvkIntegratedModules";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";

export function Dvk({ data }: { data?: any }) {
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
          {data?.hero ? <DvkHero data={data.hero} /> : null}
        </div>
        <DvkScrollIndicator />
      </div>

      {/* DESKTOP (>=1024px) — hardware stack section (2761:2905) */}
      <div id="dvk-content" className="relative mx-auto hidden w-full bg-black min-[1024px]:block">
        <div className="mx-auto w-[1232px] pb-[60px]">
          {data?.hardware_stack ? (
            <DvkHardwareStack data={data.hardware_stack} />
          ) : null}
        </div>
      </div>

      {/* DESKTOP (>=1024px) — demos section (2761:2791 + cards row) */}
      <div className="relative mx-auto hidden w-full bg-black min-[1024px]:block">
        <div className="mx-auto w-[1256px] pb-[64px]">
          {data?.demos ? <DvkDemos data={data.demos} /> : null}
        </div>
      </div>

      {/* DESKTOP (>=1024px) — ModelForge section (3773:685, 1440×873 canvas) */}
      <div className="relative mx-auto hidden w-full bg-black min-[1024px]:block">
        <div className="mx-auto w-[1440px] pb-[80px]">
          {data?.modelforge ? <DvkModelForge data={data.modelforge} /> : null}
        </div>
      </div>

      {/* MOBILE (<1024px) — stacked layout */}
      <DvkHeroMobile data={data?.hero} />
      <DvkHardwareStackMobile data={data?.hardware_stack} />
      <DvkDemosMobile data={data?.demos} />
      <DvkModelForgeMobile data={data?.modelforge} />

      {/* Shared Section (Desktop & Mobile) */}
      {data?.integrated_modules ? (
        <DvkIntegratedModules data={data.integrated_modules} />
      ) : null}
    </main>
  );
}

function DvkHeroMobile({ data }: { data?: any }) {
  const bgImg = mediaUrl(data?.background_image);
  const title =
    data?.title || "The physical launchpad for microwatt Edge AI.";
  const subtitle =
    data?.subtitle ||
    "Validate real-time AI at microwatt power levels out of the box. The Cranium Development Kit comes fully loaded with onboard sensors, rich I/O, and pre-integrated drivers so you can stop breadboarding and start testing inferences in minutes.";
  const ctaLabel = data?.cta_label || "Request Evaluation Kit";
  return (
    <section
      className="relative -mt-[78px] w-full bg-black min-[1024px]:hidden"
      aria-label="Cranium Development Kit"
    >
      <div className="relative flex w-full flex-col pt-[100px] pb-[56px]">
        {/* Background image */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {bgImg && (
            <img
              alt=""
              src={bgImg}
              className="absolute inset-0 size-full object-cover object-center"
            />
          )}
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
            {title}
          </h1>
          <p
            className={`${interRegular.className} w-[332px] max-w-full text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-80`}
          >
            {subtitle}
          </p>

          <a
            href="#"
            className={`${PRIMARY_CTA_SHADOW} ${gilroyMedium.className} relative mt-[9px] flex h-[48px] w-[229px] shrink-0 items-center justify-center`}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
            />
            <span className="relative text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
              {ctaLabel}
            </span>
            <span
              aria-hidden
              className={`pointer-events-none absolute inset-0 rounded-[inherit] ${PRIMARY_CTA_INSET}`}
            />
            <GreenCtaCorners />
          </a>
        </div>
      </div>
    </section>
  );
}

function DvkHardwareStackMobile({ data }: { data?: any }) {
  const heading =
    data?.heading ||
    "The complete Edge AI hardware stack in a single footprint";
  const subtitle =
    data?.subtitle ||
    "An exhaustive suite of sensors, interfaces, and debug tools pre-integrated with the GPX-10 Pro AI Processor.";
  const label = data?.label || "The Hardware Blueprint";
  const boardImage = mediaUrl(data?.board_image);
  const cards =
    data?.spec_cards && Array.isArray(data?.spec_cards) && data.spec_cards.length > 0
      ? data.spec_cards.map((c: any, i: number) => ({
          title: c?.title || SPEC_CARDS[i]?.title || "",
          items: c?.items
            ? c.items.split("\n").filter(Boolean)
            : SPEC_CARDS[i]?.items || [],
          accent: c?.is_accent === true,
        }))
      : SPEC_CARDS;
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
            {heading}
          </h2>
          <p
            className={`${interRegular.className} max-w-full text-center text-[15px] leading-[23px] font-normal text-[#f0f0f0] not-italic`}
            style={{ opacity: 0.65 }}
          >
            {subtitle}
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
            {label}
          </p>
          {boardImage && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              alt=""
              src={boardImage}
              className="pointer-events-none h-auto w-full rounded-[7.572px] object-bottom"
            />
          )}
        </div>

        {/* Spec cards — stacked */}
        <div className="flex w-full flex-col gap-[8px]">
          {cards.map((card: any, idx: number) => {
            const isAccent = card.accent === true;
            return (
              <div
                key={card.title || idx}
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
                  {card.items.map((item: string) => (
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

function DvkDemosMobile({ data }: { data?: any }) {
  const heading = data?.heading || "Pre-loaded demos. Instant AI validation.";
  const subtitle =
    data?.subtitle ||
    "Don't spend your first day writing sensor configuration code. The Cranium board comes ready to run out of the box, allowing you to instantly test physical AI models and validate performance on the metal with zero setup required.";
  const cards =
    data?.demo_cards && Array.isArray(data?.demo_cards) && data.demo_cards.length > 0
      ? data.demo_cards.map((c: any, i: number) => ({
          nodeId: String(i),
          titleLine1: c?.title_line_1 || DEMO_CARDS[i]?.titleLine1 || "",
          titleLine2: c?.title_line_2 || DEMO_CARDS[i]?.titleLine2 || "",
          desc:
            c?.description ||
            DEMO_CARDS[i]?.desc ||
            "",
          img: mediaUrl(c?.image) || null,
          imgOverlay: DEMO_CARDS[i]?.imgOverlay,
        }))
      : DEMO_CARDS;
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
            {heading}
          </h2>
          <p
            className={`${interRegular.className} max-w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic`}
          >
            {subtitle}
          </p>
        </div>

        {/* Stacked demo cards */}
        <div className="flex w-full flex-col gap-[16px]">
          {cards.map((card: any) => (
            <div
              key={card.nodeId}
              className="relative flex flex-col gap-[16px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-black px-[24px] pt-[16px] pb-[24px]"
            >
              {/* Header image */}
              <div className="relative h-[200px] w-full overflow-hidden">
                {card.img && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    alt=""
                    src={card.img}
                    className="absolute inset-0 size-full object-cover"
                  />
                )}
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

        {/* Explore CTA */}
        <a
          href="/applications"
          className={`${interRegular.className} relative mt-[8px] flex h-[48px] w-full max-w-[320px] items-center justify-center border border-solid border-[rgba(255,255,255,0.15)] bg-[#1a1a1a] px-[24px] text-[13px] tracking-[0.02em] text-white transition-colors hover:bg-[#2a2a2a]`}
        >
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          EXPLORE TARGET APPLICATIONS &rarr;
        </a>
      </div>
    </section>
  );
}

function DvkModelForgeMobile({ data }: { data?: any }) {
  const heading = data?.heading || "Powered by ModelForge.";
  const subtitle =
    data?.subtitle ||
    "Don't let software be the bottleneck. The Cranium DVK is fully supported by our unified software toolchain, designed to take you from a standard TensorFlow model to on-silicon inference in under 15 minutes.";
  const centerImage = mediaUrl(data?.center_image);

  const yourModelTitle = data?.your_model_title || "Your Model";
  const yourModelDesc =
    data?.your_model_description || "Automated TFLite conversion & quantization";
  const yourModelImage = mediaUrl(data?.your_model_image);

  const dvkBoardTitle = data?.dvk_board_title || "Cranium DVK";
  const dvkBoardDesc =
    data?.dvk_board_description || "15 minutes to on-silicon execution";
  const dvkBoardImage = mediaUrl(data?.dvk_board_image);

  const toolchainTitle = data?.toolchain_title || "ModelForge SDK";
  const toolchainSubtitle =
    data?.toolchain_subtitle ||
    "Pre-integrated RTOS & Eclipse-based Unified Build";
  const toolchainLabels =
    Array.isArray(data?.toolchain_labels) && data.toolchain_labels.length > 0
      ? data.toolchain_labels.map((t: any) => t?.text).filter(Boolean)
      : ["RTOS", "DRIVERS", "COMPILER"];

  return (
    <section
      className="relative w-full bg-black min-[1024px]:hidden"
      aria-label="Powered by ModelForge"
    >
      <div className="flex w-full flex-col items-center justify-center gap-[24px] px-[24px] pt-[64px] pb-[48px]">
        {/* Heading + subtitle */}
        <div className="flex w-full flex-col items-center gap-[12px]">
          <h2
            className={`${gilroyMedium.className} max-w-full bg-clip-text text-center text-[28px] leading-[32px] font-medium text-transparent not-italic [word-break:break-word]`}
            style={{
              backgroundImage: MODELFORGE_TITLE_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            {heading}
          </h2>
          <p
            className={`${interRegular.className} max-w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic`}
          >
            {subtitle}
          </p>
        </div>

        {/* Center visual */}
        <div className="relative flex w-full max-w-[345px] justify-center">
          {centerImage && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              alt=""
              src={centerImage}
              className="pointer-events-none h-auto w-full max-w-[345px] object-contain"
            />
          )}
        </div>

        {/* Your Model card */}
        <MobileModelCard
          image={yourModelImage}
          title={yourModelTitle}
          description={yourModelDesc}
        />

        {/* Cranium DVK card */}
        <MobileModelCard
          image={dvkBoardImage}
          title={dvkBoardTitle}
          description={dvkBoardDesc}
          imageRounded
        />

        {/* Toolchain block */}
        <div className="flex w-full flex-col items-center gap-[12px]">
          <p
            className={`${gilroyMedium.className} text-center text-[24px] leading-[30px] text-white not-italic [word-break:break-word]`}
          >
            {toolchainTitle}
          </p>
          <p
            className={`${interRegular.className} text-center text-[14px] leading-[21px] font-normal text-[#bbbbbb] not-italic [word-break:break-word]`}
          >
            {toolchainSubtitle}
          </p>
          {toolchainLabels.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-[10px]">
              {toolchainLabels.map((label: string) => (
                <MobileToolchainChip key={label} label={label} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function MobileModelCard({
  image,
  title,
  description,
  imageRounded = false,
}: {
  image?: string | null;
  title: string;
  description: string;
  imageRounded?: boolean;
}) {
  return (
    <div
      className="relative flex w-full flex-col items-center gap-[16px] overflow-clip border-[0.5px] border-solid px-[20px] pt-[20px] pb-[28px]"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        borderColor: "rgba(255,255,255,0.3)",
      }}
    >
      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
      <div
        className="relative flex h-[200px] w-full shrink-0 items-center justify-center rounded-[6px] border border-solid p-[12px]"
        style={{
          borderColor: "rgba(0,255,0,0.3)",
          backgroundImage:
            "radial-gradient(ellipse 363.01px 135px at 146px 135px, rgba(26,26,26,1) 0%, rgba(13,13,13,1) 25%, rgba(7,7,7,1) 37.5%, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 100%)",
        }}
      >
        {image && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            alt=""
            src={image}
            className={`pointer-events-none absolute inset-0 size-full max-w-none object-contain ${imageRounded ? "rounded-[6px]" : ""}`}
          />
        )}
      </div>
      <div className="flex w-full flex-col items-center gap-[8px]">
        <p
          className={`${gilroyMedium.className} text-center text-[22px] leading-[28px] text-white not-italic [word-break:break-word]`}
        >
          {title}
        </p>
        <p
          className={`${interRegular.className} text-center text-[14px] leading-[21px] font-normal text-[rgba(240,240,240,0.6)] not-italic [word-break:break-word]`}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

function MobileToolchainChip({ label }: { label: string }) {
  return (
    <div
      className="relative h-[26px] w-[103px] shrink-0 overflow-clip border-[0.5px] border-solid"
      style={{
        backgroundColor: "rgba(115,190,91,0.12)",
        borderColor: "rgba(255,255,255,0.3)",
      }}
    >
      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
      <p
        className={`${dmMono.className} absolute top-[calc(50%-4.5px)] left-1/2 -translate-x-1/2 text-center text-[13px] leading-[19.5px] tracking-[-0.39px] whitespace-nowrap text-[#ecfae5] uppercase not-italic [word-break:break-word]`}
      >
        {label}
      </p>
      <div className="absolute top-1/2 left-[7px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
      <div className="absolute top-1/2 right-[7px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
    </div>
  );
}
