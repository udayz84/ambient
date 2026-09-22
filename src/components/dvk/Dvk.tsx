import { gilroyMedium, interRegular, dmMono } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { DvkHero } from "./DvkHero";
import { DvkScrollIndicator } from "./DvkScrollIndicator";
import { SomInsideModule } from "@/components/som-page/SomInsideModule";
import { SomPrototypeTitleDesktop, SomPrototypeTitleMobile } from "@/components/som-page/SomPrototypeTitle";
import { SPEC_CARDS } from "./dvk-data";
import { DvkDemos } from "./DvkDemos";
import { DEMO_CARDS } from "./DvkDemosCards";
import { DvkModelForge } from "./DvkModelForge";
import { DvkComingSoon } from "./DvkComingSoon";
import { DvkIntegratedModules } from "./DvkIntegratedModules";
import {
  ACCENT_CARD_BG,
  ACCENT_CARD_BORDER,
  CARD_BG,
  CARD_BORDER,
  CORNER_LEFT,
  CORNER_RIGHT,
  DEMOS_TITLE_GRADIENT_MOBILE,
  FEATURE_CARD_BG,
  HERO_IMAGE_OVERLAY_MOBILE,
  HERO_TITLE_GRADIENT_MOBILE,
  MODELFORGE_TITLE_GRADIENT_MOBILE,
  PRIMARY_CTA_INSET,
  PRIMARY_CTA_SHADOW,
} from "./dvk-data";

/**
 * Figma 2761:2971 — Cranium Development Kit (DVK) page.
 * Desktop hero canvas is 1442 wide / 658 tall; hardware stack frame is 1232 wide.
 */
const DVK_DESKTOP_HEIGHT = 658;

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

      <SomPrototypeTitleDesktop data={data?.prototype} />

      {/* DESKTOP (>=1024px) — hardware stack section (2761:2905) */}
      <div id="dvk-content" className="relative mx-auto hidden w-full bg-black min-[1024px]:block">
        {data?.inside_module ? (
          <SomInsideModule data={data.inside_module} />
        ) : null}
      </div>

      {/* DESKTOP (>=1024px) — demos section (2761:2791 + cards row) */}
      <div className="relative mx-auto hidden w-full bg-black min-[1024px]:block">
        <div className="mx-auto w-full max-w-[1684px] px-[32px] xl:px-[64px] pb-[64px]">
          {data?.demos ? <DvkDemos data={data.demos} /> : null}
        </div>
      </div>

      {/* DESKTOP (>=1024px) — ModelForge section (3773:685, 1440×873 canvas) */}
      <div className="relative mx-auto hidden w-full bg-black min-[1024px]:block">
        <div className="mx-auto w-[1440px] pb-[80px]">
          {data?.modelforge ? <DvkModelForge data={data.modelforge} /> : null}
        </div>
      </div>

      {/* Coming Soon section — "Test on the metal, without the metal" (4497:2938) */}
      <DvkComingSoon data={data?.coming_soon} />

      {/* MOBILE (<1024px) — stacked layout */}
      <DvkHeroMobile data={data?.hero} />
      <SomPrototypeTitleMobile data={data?.prototype} />
      <div className="min-[1024px]:hidden">
        {data?.inside_module ? <SomInsideModule data={data.inside_module} /> : null}
      </div>
      <DvkDemosMobile data={data?.demos} />
      <DvkModelForgeMobile data={data?.modelforge} />

      {/* Shared Section (Desktop & Mobile) */}
      {data?.integrated_modules ? (
        <DvkIntegratedModules data={data.integrated_modules} />
      ) : null}
    </main>
  );
}

/**
 * Figma 4059:10006 — mobile hero banner (393×700 canvas).
 * Rendered below the 78px navbar (-mt pulls the section under it), so every
 * design y-coordinate is offset by +78. All children absolutely positioned.
 *
 * Text frame 4059:10007 (20, 0 / 352×256)
 * Board image 4059:10015 (0, 268 / 393×360)
 * CTA 4059:10016 (72, 652 / 250×48)
 */
function DvkHeroMobile({ data }: { data?: any }) {
  const title =
    data?.title || "The physical launchpad for microwatt Edge AI.";
  const subtitle =
    data?.subtitle ||
    "Validate real-time AI at microwatt power levels out of the box. The Cranium Development Kit comes fully loaded with onboard sensors, rich I/O, and pre-integrated drivers so you can stop breadboarding and start testing inferences in minutes.";
  const ctaLabel = data?.cta_label || "Request Evaluation Kit";
  return (
    <section
      className="relative -mt-[78px] h-[778px] w-full overflow-clip bg-black min-[1024px]:hidden"
      aria-label="Cranium Development Kit"
      data-node-id="4059:10006"
      data-name="Banner"
    >
      {/* Background vertical lines connecting to Navbar */}
      <div className="pointer-events-none absolute top-[78px] bottom-0 left-[26px] z-0">
        <div className="absolute top-0 left-1/2 h-full w-[1px] -translate-x-1/2 overflow-hidden">
          <div className="absolute top-0 left-0 h-full w-[821px] origin-top-left rotate-90 opacity-60">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async"
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
            <img loading="lazy" decoding="async"
              src="/hero/line-83.svg"
              alt=""
              className="block size-full max-w-none"
              aria-hidden
            />
          </div>
        </div>
      </div>

      {/* Text — 4059:10007 (20, 0 / 352×256, design y + 78 navbar offset) */}
      <div
        className="absolute top-[138px] left-1/2 z-10 flex w-[352px] max-w-[calc(100%-40px)] -translate-x-1/2 flex-col items-center gap-[15px]"
        data-node-id="4059:10007"
      >
        {/* Title group — 4059:10008 (352×115, corner ticks) */}
        <div
          className="relative h-[115px] w-full"
          data-node-id="4059:10008"
        >
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h1
            className={`${gilroyMedium.className} absolute top-[7px] left-1/2 m-0 w-[321px] max-w-[calc(100%-32px)] -translate-x-1/2 bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
            style={{
              backgroundImage: HERO_TITLE_GRADIENT_MOBILE,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
            data-node-id="4059:10009"
          >
            {title}
          </h1>
        </div>
        <p
          className={`${interRegular.className} w-[336px] max-w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-75 not-italic [word-break:break-word]`}
          data-node-id="4059:10014"
        >
          {subtitle}
        </p>
      </div>

      {/* Board image — 4059:10015 (0, 268 / 393×360) */}
      <div
        className="pointer-events-none absolute top-[386px] left-0 h-[360px] w-full"
        data-node-id="4059:10015"
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" decoding="async"
          alt=""
          src="/dvk/hero-bg-mobile.webp"
          className="absolute inset-0 size-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundImage: HERO_IMAGE_OVERLAY_MOBILE }}
        />
      </div>

      {/* CTA — 4059:10016 (72, 652 / 250×48, bottom-anchored) */}
      <div className="absolute bottom-0 left-[calc(50%+0.5px)] z-10 w-[250px] -translate-x-1/2">
        <a
          href="#"
          className={`${PRIMARY_CTA_SHADOW} ${gilroyMedium.className} relative flex h-[48px] w-[250px] shrink-0 items-center justify-center`}
          data-node-id="4059:10017"
          data-name="Cta"
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
    </section>
  );
}

/**
 * Figma 4059:10040 — mobile hardware stack (353 wide at x=20 of the 393 canvas).
 * Header 4059:10041 (352 wide, right-aligned) + cards 4059:10049 (355 wide,
 * right-aligned, 24px below header). Bottom row splits Interfaces (left) and
 * MCU/Booting (right column).
 */
function DvkHardwareStackMobile({ data }: { data?: any }) {
  const heading =
    data?.heading ||
    "The complete Edge AI hardware stack in a single footprint";
  const subtitle =
    data?.subtitle ||
    "An exhaustive suite of sensors, interfaces, and debug tools pre-integrated with the GPX-10 Pro AI Processor.";
  const label = data?.label || "The Hardware Blueprint";
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
  const fullCards = cards.slice(0, 4);
  const interfacesCard = cards[4];
  const mcuCard = cards[5];
  const bootingCard = cards[6];
  return (
    <section
      className="relative w-full bg-black min-[1024px]:hidden"
      aria-label="Edge AI hardware stack"
      data-node-id="4059:10040"
    >
      <div className="relative mx-auto flex w-full max-w-[393px] flex-col items-end gap-[24px] px-[20px] pt-[30px] pb-[90px]">
        {/* Header — 4059:10041 (352 wide, gap 15) */}
        <div
          className="flex w-[352px] max-w-full flex-col items-center gap-[15px]"
          data-node-id="4059:10041"
        >
          {/* Title group — 4059:10042 (352×112.93, corner ticks) */}
          <div className="relative h-[112.93px] w-full" data-node-id="4059:10042">
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            <h2
              className={`${gilroyMedium.className} absolute top-[4.93px] left-[16px] m-0 w-[321px] max-w-[calc(100%-32px)] bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
              style={{
                backgroundImage: HERO_TITLE_GRADIENT_MOBILE,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
              data-node-id="4059:10043"
            >
              {heading}
            </h2>
          </div>
          <p
            className={`${interRegular.className} w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-75 not-italic [word-break:break-word]`}
            data-node-id="4059:10048"
          >
            {subtitle}
          </p>
        </div>

        {/* Cards — 4059:10049 (355 wide, gap 12) */}
        <div
          className="flex w-[355px] max-w-full flex-col gap-[12px]"
          data-node-id="4059:10049"
        >
          {/* Feature card — 4062:10673 */}
          <div
            className="relative flex w-full flex-col items-center justify-center gap-[12px] overflow-clip border-[0.279px] border-solid px-[10px] py-[12px]"
            style={{ backgroundColor: FEATURE_CARD_BG, borderColor: CARD_BORDER }}
            data-node-id="4062:10673"
          >
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            <p
              className={`${gilroyMedium.className} w-full text-center text-[18px] leading-[24px] text-white not-italic [word-break:break-word]`}
              data-node-id="4062:10674"
            >
              {label}
            </p>
            <div className="relative h-[294px] w-full" data-node-id="4062:10675">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async"
                alt=""
                src="/dvk/board-blueprint-mobile.webp"
                className="pointer-events-none absolute inset-0 size-full max-w-none object-bottom"
              />
            </div>
          </div>

          {/* Spec cards — 4062:10681 (gap 8) */}
          <div className="flex w-full flex-col gap-[8px]" data-node-id="4062:10681">
            {fullCards.map((card: any, idx: number) => (
              <MobileSpecCard key={card.title || idx} card={card} />
            ))}

            {/* Bottom row — 4062:10718: Interfaces + MCU/Booting column */}
            <div className="flex w-full items-stretch gap-[8px]" data-node-id="4062:10718">
              {interfacesCard && (
                <MobileSpecCard card={interfacesCard} className="min-w-0 flex-1" />
              )}
              <div className="flex min-w-0 flex-1 flex-col gap-[8px]">
                {mcuCard && <MobileSpecCard card={mcuCard} className="flex-1" />}
                {bootingCard && (
                  <MobileSpecCard card={bootingCard} className="flex-1" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Figma 4062:10682 — mobile spec card (default + accent variants). */
function MobileSpecCard({
  card,
  className = "",
}: {
  card: { title: string; items: string[]; accent?: boolean };
  className?: string;
}) {
  // Mobile design: removed the accent/hover effect per user request
  const isAccent = false;
  return (
    <div
      className={`relative flex w-full flex-col gap-[20px] overflow-clip border-[0.5px] border-solid px-[16px] pt-[16px] pb-[24px] ${className}`}
      style={{
        backgroundColor: isAccent ? ACCENT_CARD_BG : CARD_BG,
        borderColor: isAccent ? ACCENT_CARD_BORDER : CARD_BORDER,
      }}
    >
      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
      <div className="flex w-full flex-col gap-[10px]">
        <p
          className={`${gilroyMedium.className} w-full text-[18px] leading-[28px] text-white not-italic`}
        >
          {card.title}
        </p>
        <ul
          className={`${interRegular.className} list-disc text-[12px] leading-[0] font-normal text-[rgba(240,240,240,0.6)] ${
            isAccent ? "w-[258px] max-w-full" : "w-full"
          }`}
        >
          {card.items.map((item: string) => (
            <li key={item} className="ms-[18px]">
              <span className="leading-[18px]">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Figma 4062:10784/10795/10806 — mobile demo card illustrations (250×238). */
const MOBILE_DEMO_MEDIA = [
  {
    img: "/dvk/demo-voice.webp",
    imgOverlay: null as string | null,
    imgRight: -35,
    imgTop: -35,
    cover: true,
  },
  {
    img: "/dvk/demo-fall.webp",
    imgOverlay: null as string | null,
    imgRight: -43,
    imgTop: -46,
    cover: false,
  },
  {
    img: "/dvk/demo-fall.webp",
    imgOverlay: "/dvk/demo-vision.webp" as string | null,
    imgRight: -43,
    imgTop: -36,
    cover: true,
  },
];

/** Figma 4062:10793 / 10804 / 10815 — per-card decorative accents. */
const MOBILE_DEMO_DECOR = [
  // Voice — mic capsule highlight
  <div
    key="voice"
    aria-hidden
    className="pointer-events-none absolute top-[49.31px] left-[154.92px] h-[21.24px] w-[25.64px] rounded-tl-[798.75px] rounded-tr-[798.75px] bg-[#f0f0f0]"
    data-node-id="4062:10793"
  />,
  // Fall — ring accent
  // eslint-disable-next-line @next/next/no-img-element
  <img loading="lazy" decoding="async"
    key="fall"
    alt=""
    src="/dvk/demo-ellipse-1.svg"
    aria-hidden
    className="pointer-events-none absolute top-[47.93px] left-[293.86px] h-[19.93px] w-[19.32px] max-w-none"
    data-node-id="4062:10804"
  />,
  // Vision — dot accent
  // eslint-disable-next-line @next/next/no-img-element
  <img loading="lazy" decoding="async"
    key="vision"
    alt=""
    src="/dvk/demo-ellipse-2.svg"
    aria-hidden
    className="pointer-events-none absolute top-[86.09px] left-[316.94px] size-[12.22px] max-w-none"
    data-node-id="4062:10815"
  />,
];

/**
 * Figma 4059:10124 — mobile demos ("3rd Fold", 393×1414 canvas).
 * Header 4059:10213 (21, 30 / 352 wide), cards 4062:10782 (19, 292 / 355 wide,
 * gap 12, three 355×356 cards). Background textures 4059:10210.
 */
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
        }))
      : DEMO_CARDS;
  return (
    <section
      className="relative w-full overflow-clip bg-black min-[1024px]:hidden"
      aria-label="Pre-loaded demos"
      data-node-id="4059:10124"
      data-name="3rd Fold"
    >
      <div className="relative mx-auto h-[1414px] w-full max-w-[393px]">
        {/* Background textures removed per user request to fix rogue lines */}

        {/* Header — 4059:10213 (21, 30 / 352 wide, gap 15) */}
        <div
          className="absolute top-[30px] left-[calc(50%+0.5px)] flex w-[352px] max-w-[calc(100%-40px)] -translate-x-1/2 flex-col items-center gap-[15px]"
          data-node-id="4059:10213"
        >
          {/* Title frame — 4059:10214 (350×112, corner ticks) */}
          <div
            className="relative h-[112px] w-[350px] max-w-full"
            data-node-id="4059:10214"
          >
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            <h2
              className={`${gilroyMedium.className} absolute top-[4.5px] left-1/2 m-0 w-[268px] max-w-full -translate-x-1/2 bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
              style={{
                backgroundImage: DEMOS_TITLE_GRADIENT_MOBILE,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
              data-node-id="4059:10216"
            >
              {heading}
            </h2>
          </div>
          <p
            className={`${interRegular.className} w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-75 not-italic [word-break:break-word]`}
            data-node-id="4059:10221"
          >
            {subtitle}
          </p>
        </div>

        {/* Cards — 4062:10782 (19, 292 / 355 wide, gap 12) */}
        <div
          className="absolute top-[292px] left-1/2 flex w-[355px] max-w-[calc(100%-38px)] -translate-x-1/2 flex-col gap-[12px]"
          data-node-id="4062:10782"
        >
          {cards.slice(0, 3).map((card: any, idx: number) => {
            const media = MOBILE_DEMO_MEDIA[idx] || MOBILE_DEMO_MEDIA[0];
            return (
              <div
                key={card.nodeId || idx}
                className="relative flex h-[356px] w-full flex-col overflow-clip border-[0.444px] border-solid border-[rgba(240,240,240,0.2)] bg-black px-[20px] pt-[14px] pb-[22px]"
                data-name={card.name}
              >
                {/* Illustration — 250×238, clipped to card bounds */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute h-[238px] w-[250px]"
                  style={{ right: media.imgRight, top: media.imgTop }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" decoding="async"
                    alt=""
                    src={media.img}
                    className={`absolute inset-0 size-full max-w-none ${media.cover ? "object-cover" : ""}`}
                  />
                  {media.imgOverlay && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img loading="lazy" decoding="async"
                      alt=""
                      src={media.imgOverlay}
                      className="absolute inset-0 size-full max-w-none object-cover"
                    />
                  )}
                </div>

                {/* NewsSection — text pinned to the bottom of the 320px content box */}
                <div className="relative flex h-full flex-col items-start justify-end">
                  <div className="flex flex-col gap-[10px]">
                    <h3
                      className={`${gilroyMedium.className} m-0 w-[296.417px] max-w-full text-[22px] leading-[0] font-medium text-white not-italic whitespace-pre-wrap`}
                    >
                      <p className="mb-0 leading-[28px]">{`${card.titleLine1} `}</p>
                      <p className="m-0 leading-[28px]">{card.titleLine2}</p>
                    </h3>
                    <p
                      className={`${interRegular.className} m-0 w-[296.417px] max-w-full text-[14px] leading-[21.3px] font-normal text-[#99a1af] not-italic [word-break:break-word]`}
                    >
                      {card.desc}
                    </p>
                  </div>
                </div>

                <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
                {MOBILE_DEMO_DECOR[idx]}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Figma 4062:11132 — radial backdrop for the mobile model image containers. */
const MOBILE_MODEL_CARD_RADIAL =
  "radial-gradient(ellipse 363.01px 135px at 146px 135px, rgba(26,26,26,1) 0%, rgba(13,13,13,1) 25%, rgba(7,7,7,1) 37.5%, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 100%)";

/**
 * Figma 4062:10817 — mobile ModelForge ("4th Fold", 393×1748 canvas).
 * Abstract arc 4062:10818, background textures 4062:10903, header 4062:10906
 * (21, 30), card/brain stack 4062:11130 (19, 262 / 355×1333, gap 10),
 * toolchain block 4062:11241 (19, 1623).
 */
function DvkModelForgeMobile({ data }: { data?: any }) {
  const heading = data?.heading || "Powered by ModelForge.";
  const subtitle =
    data?.subtitle ||
    "Don't let software be the bottleneck. The Cranium DVK is fully supported by our unified software toolchain, designed to take you from a standard TensorFlow model to on-silicon inference in under 15 minutes.";

  const yourModelTitle = data?.your_model_title || "Your Model";
  const yourModelDesc =
    data?.your_model_description || "Automated TFLite conversion & quantization";

  const dvkBoardTitle = data?.dvk_board_title || "Cranium DVK";
  const dvkBoardDesc =
    data?.dvk_board_description || "15 minutes to on-silicon execution";

  const toolchainTitle = data?.toolchain_title || "ModelForge SDK";
  const toolchainSubtitle =
    data?.toolchain_subtitle ||
    "Pre-integrated RTOS & Eclipse-based Unified Build";
  const toolchainLabels =
    Array.isArray(data?.toolchain_labels) && data.toolchain_labels.length > 0
      ? data.toolchain_labels.map((t: any) => t?.text).filter(Boolean)
      : ["RTOS", "DRIVERS", "COMPILER"];

  const floatingTags = Array.isArray(data?.floating_tags) && data.floating_tags.length > 0
    ? data.floating_tags.map((t: any) => t?.text).filter(Boolean)
    : ["RTOS", "DSP", "Drivers", "Build"];

  return (
    <section
      className="relative w-full overflow-clip bg-black min-[1024px]:hidden"
      aria-label="Powered by ModelForge"
      data-node-id="4062:10817"
      data-name="4th Fold"
    >
      <div className="relative mx-auto h-[1748px] w-full max-w-[393px]">
        {/* Abstract Design — 4062:10818 */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-[36px] left-[calc(50%+0.15px)] h-[247.559px] w-[682.036px] -translate-x-1/2"
          data-node-id="4062:10818"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async"
            alt=""
            src="/dvk/modelforge-abstract-mobile.svg"
            className="absolute inset-0 block size-full max-w-none"
          />
        </div>

        {/* Background textures removed per user request to fix rogue lines */}

        {/* Header — 4062:10906 (21, 30 / 352 wide, gap 15) */}
        <div
          className="absolute top-[30px] left-[calc(50%+0.5px)] flex w-[352px] max-w-[calc(100%-40px)] -translate-x-1/2 flex-col items-center gap-[15px]"
          data-node-id="4062:10906"
        >
          {/* Title frame — 4062:10907 (350×82, corner ticks) */}
          <div
            className="relative h-[82px] w-[350px] max-w-full"
            data-node-id="4062:10907"
          >
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            <h2
              className={`${gilroyMedium.className} absolute top-[4.99px] left-1/2 m-0 w-[268px] max-w-full -translate-x-1/2 bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
              style={{
                backgroundImage: MODELFORGE_TITLE_GRADIENT_MOBILE,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
              data-node-id="4062:10909"
            >
              {heading}
            </h2>
          </div>
          <p
            className={`${interRegular.className} w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-75 not-italic [word-break:break-word]`}
            data-node-id="4062:10914"
          >
            {subtitle}
          </p>
        </div>

        {/* Stack — 4062:11130 (19, 262 / 355 wide, gap 10) */}
        <div
          className="absolute top-[262px] left-1/2 flex w-[355px] max-w-[calc(100%-38px)] -translate-x-1/2 flex-col items-center gap-[10px]"
          data-node-id="4062:11130"
        >
          <MobileModelCard
            image="/dvk/modelforge-your-model-mobile.webp"
            title={yourModelTitle}
            description={yourModelDesc}
            height={422}
            nodeId="4062:11131"
          />
          <MobileForgeCanvas floatingTags={floatingTags} />
          <MobileModelCard
            image="/dvk/modelforge-dvk-mobile.webp"
            title={dvkBoardTitle}
            description={dvkBoardDesc}
            height={386}
            imageRounded
            nodeId="4062:11191"
          />
        </div>

        {/* Toolchain — 4062:11241 (19, 1623 / 355 wide, gap 12) */}
        <div
          className="absolute top-[1623px] left-1/2 flex w-[355px] max-w-[calc(100%-38px)] -translate-x-1/2 flex-col items-center gap-[12px]"
          data-node-id="4062:11241"
        >
          <p
            className={`${gilroyMedium.className} w-full text-center text-[26px] leading-[29px] text-white not-italic [word-break:break-word]`}
            data-node-id="4062:11242"
          >
            {toolchainTitle}
          </p>
          <p
            className={`${interRegular.className} w-full text-center text-[12px] leading-[18px] font-normal text-[#bbbbbb] not-italic [word-break:break-word]`}
            data-node-id="4062:11243"
          >
            {toolchainSubtitle}
          </p>
          {toolchainLabels.length > 0 && (
            <div className="flex items-center justify-center gap-[10px]">
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

/** Figma 4062:11131 / 4062:11191 — mobile model card (Your Model / Cranium DVK). */
function MobileModelCard({
  image,
  title,
  description,
  height,
  imageRounded = false,
  nodeId,
}: {
  image: string;
  title: string;
  description: string;
  height: number;
  imageRounded?: boolean;
  nodeId: string;
}) {
  return (
    <div
      className="relative flex w-[332px] max-w-full shrink-0 flex-col gap-[20px] overflow-clip border-[0.5px] border-solid px-[20px] pt-[20px] pb-[32px]"
      style={{
        height,
        backgroundColor: "rgba(0,0,0,0.5)",
        borderColor: "rgba(240,240,240,0.2)",
      }}
      data-node-id={nodeId}
      data-name="Article"
    >
      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
      <div
        className="flex h-[270px] w-full shrink-0 items-center justify-center rounded-[6px] border border-solid px-[21px] py-px"
        style={{
          borderColor: "rgba(0,255,0,0.3)",
          backgroundImage: MOBILE_MODEL_CARD_RADIAL,
        }}
      >
        <div className="relative h-full min-w-px flex-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async"
            alt=""
            src={image}
            className={`pointer-events-none absolute inset-0 size-full max-w-none object-contain ${imageRounded ? "rounded-[6px]" : ""}`}
          />
        </div>
      </div>
      <div className="flex w-full flex-col gap-[10px]">
        <p
          className={`${gilroyMedium.className} w-full text-center text-[22px] leading-[28px] text-white not-italic whitespace-nowrap`}
        >
          {title}
        </p>
        <p
          className={`${interRegular.className} w-full text-center text-[14px] leading-[21px] font-normal text-[rgba(240,240,240,0.6)] not-italic [word-break:break-word]`}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

/** Figma 4062:11143 — brain/chip canvas with corner tags and elbow connectors. */
function MobileForgeCanvas({ floatingTags = ["RTOS", "DSP", "Drivers", "Build"] }: { floatingTags?: string[] }) {
  return (
    <div className="relative h-[505px] w-full shrink-0" data-node-id="4062:11143">
      {/* Center image — 4062:11181 */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[71px] left-[calc(50%+0.5px)] h-[330px] w-[320px] -translate-x-1/2"
        data-node-id="4062:11181"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" decoding="async"
          alt=""
          src="/dvk/modelforge-center-mobile.webp"
          className="absolute inset-0 size-full max-w-none object-cover"
        />
      </div>

      {/* Vertical connector lines — 4062:11182 / 4062:11183 */}
      <div
        aria-hidden
        className="absolute top-[-10px] left-[calc(50%+0.5px)] flex h-[60px] w-0 -translate-x-1/2 items-center justify-center"
      >
        <div className="flex-none rotate-90">
          <div className="relative h-0 w-[60px]" data-node-id="4062:11182">
            <div className="absolute inset-[-2.89px_-4.81%_-2.89px_-4.44%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async"
                alt=""
                src="/dvk/mf-line-103.svg"
                className="block size-full max-w-none"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        aria-hidden
        className="absolute bottom-[-10px] left-[calc(50%+0.5px)] flex h-[60px] w-0 -translate-x-1/2 items-center justify-center"
      >
        <div className="-rotate-90 -scale-y-100 flex-none">
          <div className="relative h-0 w-[60px]" data-node-id="4062:11183">
            <div className="absolute inset-[-2.89px_-4.81%_-2.89px_-4.44%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async"
                alt=""
                src="/dvk/mf-line-104.svg"
                className="block size-full max-w-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Elbow connectors — Groups 93 / 95 / 96 / 94 */}
      <ForgeElbow
        diamondClass="top-[98.49px] left-[51.72px] -rotate-45 -scale-y-100"
        lineClass="top-[51px] left-[39.21px] rotate-180"
        dotClass="top-[108.01px] left-[61.54px] -rotate-45 -scale-y-100"
      />
      <ForgeElbow
        diamondClass="top-[382.01px] left-[53.72px] rotate-45"
        lineClass="top-[395.77px] left-[41.21px] -scale-y-100 rotate-180"
        dotClass="top-[392.29px] left-[63.54px] rotate-45"
      />
      <ForgeElbow
        diamondClass="top-[376.01px] left-[275.22px] -scale-y-100 rotate-135"
        lineClass="top-[389.76px] left-[288px]"
        dotClass="top-[386.29px] left-[285.19px] -scale-y-100 rotate-135"
      />
      {/* Group 94 — smaller right-top elbow */}
      <div aria-hidden className="contents">
        <div className="absolute top-[97.52px] left-[290.99px] flex size-[23.482px] items-center justify-center">
          <div className="-rotate-135 flex-none">
            <div className="relative size-[16.604px]">
              <div className="absolute inset-[-24.09%]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" decoding="async"
                  alt=""
                  src="/dvk/mf-rect56.svg"
                  className="block size-full max-w-none"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-[51px] left-[302.4px] flex h-[58.098px] w-[20.596px] items-center justify-center">
          <div className="-scale-y-100 flex-none">
            <div className="relative h-[58.098px] w-[20.596px]">
              <div className="absolute inset-[-1.06%_-3.64%_0_-2.08%]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" decoding="async"
                  alt=""
                  src="/dvk/mf-vector33.svg"
                  className="block size-full max-w-none"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-[104.86px] left-[299.92px] flex size-[7.045px] items-center justify-center">
          <div className="-rotate-135 flex-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async"
              alt=""
              src="/dvk/mf-rect57.svg"
              className="block size-[4.981px] max-w-none"
            />
          </div>
        </div>
      </div>

      {/* Corner tags — 4062:11184 (RTOS) / 11167 (DSP) / 11174 (Drivers) / 11160 (Build) */}
      <MobileForgeTag label={floatingTags[0] || "RTOS"} className="top-[17px] left-[10px]" nodeId="4062:11184" />
      <MobileForgeTag label={floatingTags[1] || "DSP"} className="top-[13px] right-[11px]" nodeId="4062:11167" />
      <MobileForgeTag label={floatingTags[2] || "Drivers"} className="bottom-[10px] left-[10px]" nodeId="4062:11174" />
      <MobileForgeTag label={floatingTags[3] || "Build"} className="top-[450px] right-[13px]" nodeId="4062:11160" />
    </div>
  );
}

/** Figma Groups 93/95/96 — elbow connector (diamond + 28×62 line + dot). */
function ForgeElbow({
  diamondClass,
  lineClass,
  dotClass,
}: {
  diamondClass: string;
  lineClass: string;
  dotClass: string;
}) {
  return (
    <div aria-hidden className="contents">
      <div
        className={`absolute flex size-[28.284px] items-center justify-center ${diamondClass}`}
      >
        <div className="relative size-[20px]">
          <div className="absolute inset-[-20%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async"
              alt=""
              src="/dvk/mf-rect54.svg"
              className="block size-full max-w-none"
            />
          </div>
        </div>
      </div>
      <div
        className={`absolute flex h-[62px] w-[28px] items-center justify-center ${lineClass}`}
      >
        <div className="relative h-[62px] w-[28px]">
          <div className="absolute inset-[-1.06%_-2.68%_0_-1.28%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async"
              alt=""
              src="/dvk/mf-vector32.svg"
              className="block size-full max-w-none"
            />
          </div>
        </div>
      </div>
      <div
        className={`absolute flex size-[8.485px] items-center justify-center ${dotClass}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" decoding="async"
          alt=""
          src="/dvk/mf-rect55.svg"
          className="block size-[6px] max-w-none"
        />
      </div>
    </div>
  );
}

/** Figma 4062:11160 — small corner-ticked tag chip (RTOS/DSP/Drivers/Build). */
function MobileForgeTag({
  label,
  className = "",
  nodeId,
}: {
  label: string;
  className?: string;
  nodeId: string;
}) {
  return (
    <div
      className={`absolute flex items-start gap-[20px] overflow-clip border-[0.5px] border-solid p-[10px] ${className}`}
      style={{
        backgroundColor: "rgba(0,0,0,0.2)",
        borderColor: "rgba(240,240,240,0.2)",
      }}
      data-node-id={nodeId}
      data-name="Article"
    >
      <p
        className={`${interRegular.className} text-[14px] leading-[21px] font-normal whitespace-nowrap text-white not-italic`}
      >
        {label}
      </p>
      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
    </div>
  );
}

/** Figma 4062:11245 — toolchain chip (103×24, corner ticks, side bars). */
function MobileToolchainChip({ label }: { label: string }) {
  return (
    <div
      className="relative flex h-[24px] w-auto min-w-[103px] shrink-0 items-center justify-center overflow-clip px-[14px]"
      style={{ backgroundColor: "rgba(115,190,91,0.12)" }}
    >
      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
      <p
        className={`${dmMono.className} relative z-10 text-center text-[12px] leading-[19.5px] tracking-[-0.36px] whitespace-nowrap text-[#ecfae5] uppercase not-italic [word-break:break-word]`}
      >
        {label}
      </p>
      <div className="absolute top-1/2 left-[7px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
      <div className="absolute top-1/2 right-[7px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
    </div>
  );
}
