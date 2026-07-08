import { mediaUrl } from "@/lib/strapi";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { TagBadge } from "../hero/TagBadge";
import { ProductsScrollIndicator } from "./ProductsScrollIndicator";
import {
  COIN_BG,
  COIN_FG,
  COIN_GROUP,
  CORNER_LEFT,
  CORNER_RIGHT,
  HERO_IMAGE_OVERLAY,
  HERO_TITLE_GRADIENT,
  PRIMARY_CTA_INSET,
  PRIMARY_CTA_SHADOW,
  SECONDARY_CTA_BG,
} from "./products-data";

const HERO_DESKTOP_HEIGHT = 798;

const FALLBACK_TITLE = "Full AI inference. \nOn a coin cell.";
const FALLBACK_SUBTITLE =
  "The world's first energy-aware AI processor — running real neural networks, not rule-based shortcuts, at microwatt power. Built on the A-Cube architecture.";
const FALLBACK_PRIMARY = { label: "Request Evaluation Kit", href: "#" };
const FALLBACK_SECONDARY = { label: "Download Product Brief", href: "#" };

function splitLines(value: string): string[] {
  return value.split("\n");
}

export function ProductsHero({ data }: { data?: any }) {
  const title = data?.title || FALLBACK_TITLE;
  const titleLines = splitLines(title);
  const subtitle = data?.subtitle || FALLBACK_SUBTITLE;
  const primary = {
    label: data?.primary_button?.label ?? FALLBACK_PRIMARY.label,
    href: data?.primary_button?.href ?? FALLBACK_PRIMARY.href,
  };
  const secondary = {
    label: data?.secondary_button?.label ?? FALLBACK_SECONDARY.label,
    href: data?.secondary_button?.href ?? FALLBACK_SECONDARY.href,
  };
  const chipset1 = mediaUrl(data?.chipset_image_2) || "/products/coin-chipset-1.png";
  const chipset2 = mediaUrl(data?.chipset_image_1) || "/products/coin-chipset-2.png";
  return (
    <>
      {/* DESKTOP (>=1024px) — hero canvas, source of truth (Figma 2900:418) */}
      <div
        className="relative mx-auto -mt-[78px] hidden w-full overflow-x-clip bg-black min-[1024px]:block"
        style={{ height: HERO_DESKTOP_HEIGHT }}
        data-node-id="2900:418"
        data-name="Hero Section"
        aria-label="Products"
      >
      <div
        className="relative mx-auto h-full w-[1442px]">
          <ProductsHeroDesktop
            titleLines={titleLines}
            subtitle={subtitle}
            primary={primary}
            secondary={secondary}
            chipset1={chipset1}
            chipset2={chipset2}
          />
        </div>
        {/* Blend the coin image's bright right edge into black on screens
            wider than the 1442 canvas. */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 right-0 hidden h-full w-[360px] min-[1442px]:block"
          style={{
            background:
              "linear-gradient(270deg, #000000 6%, rgba(0,0,0,0.86) 22%, rgba(0,0,0,0.4) 52%, rgba(0,0,0,0) 100%)",
          }}
        />
      </div>

      {/* MOBILE (<1024px) — basic stacked layout */}
      <ProductsHeroMobile
        titleLines={titleLines}
        subtitle={subtitle}
        primary={primary}
        secondary={secondary}
        chipset2={chipset2}
      />
    </>
  );
}

function ProductsHeroDesktop({
  titleLines,
  subtitle,
  primary,
  secondary,
  chipset1,
  chipset2,
}: {
  titleLines: string[];
  subtitle: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  chipset1: string;
  chipset2: string;
}) {
  return (
    <>
      {/* Coin & chipset image group — 2900:507 */}
      <div
        className="pointer-events-none absolute overflow-clip"
        style={{
          left: COIN_GROUP.left,
          top: COIN_GROUP.top,
          width: COIN_GROUP.width,
          height: COIN_GROUP.height,
        }}
        data-node-id="2900:507"
        data-name="Coin And Chipset"
        aria-hidden
      >
        {/* Background coin+chipset — 2900:508 */}
        <div
          className="absolute"
          style={{
            left: COIN_BG.left,
            top: COIN_BG.top,
            width: COIN_BG.width,
            height: COIN_BG.height,
          }}
          data-node-id="2900:508"
          data-name="Coin and the chipset 2"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={chipset2}
            className="absolute inset-0 size-full max-w-none object-bottom"
          />
          <div
            className="absolute inset-0"
            style={{ backgroundImage: HERO_IMAGE_OVERLAY }}
          />
        </div>
        {/* Foreground chip — 2900:509 */}
        <div
          className="absolute"
          style={{
            right: COIN_FG.right,
            top: COIN_FG.top,
            width: COIN_FG.width,
            height: COIN_FG.height,
          }}
          data-node-id="2900:509"
          data-name="Coin and the chipset 1"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={chipset1}
            className="absolute inset-0 size-full max-w-none object-bottom"
          />
        </div>
      </div>

      {/* Left vertical guide line — 2900:421 (h-821) */}
      <div className="pointer-events-none absolute top-[79px] left-[95px] flex h-[821px] w-0 items-center justify-center">
        <div className="flex-none rotate-90">
          <div
            className="relative h-0 w-[821px]"
            data-node-id="2900:421"
            data-name="Line 82"
          >
            <div className="absolute inset-[-1px_0_0_0]">
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
      </div>
      {/* Left line cap — 2900:422 */}
      <div
        className="pointer-events-none absolute top-[77px] left-[93px] h-[4px] w-[5px]"
        data-node-id="2900:422"
        data-name="Vector"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero/line-cap-left.svg"
          alt=""
          className="absolute inset-0 block size-full max-w-none"
          aria-hidden
        />
      </div>

      {/* Right vertical guide line — 2900:423 (h-597) */}
      <div className="pointer-events-none absolute top-[79px] right-[95px] flex h-[597px] w-0 items-center justify-center">
        <div className="flex-none rotate-90">
          <div
            className="relative h-0 w-[597px]"
            data-node-id="2900:423"
            data-name="Line 83"
          >
            <div className="absolute inset-[-0.5px_0]">
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
      </div>
      {/* Right line cap — 2900:424 */}
      <div
        className="pointer-events-none absolute top-[77.634765625px] left-[1344.5px] h-[4px] w-[5px]"
        data-node-id="2900:424"
        data-name="Vector"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero/line-cap-right.svg"
          alt=""
          className="absolute inset-0 block size-full max-w-none"
          aria-hidden
        />
      </div>

      {/* Menu container — 2900:571 (left=100, top=359) */}
      <div
        className="absolute flex items-start gap-[15px]"
        style={{ left: 100, top: 359 }}
        data-node-id="2900:571"
        data-name="Menu Container"
      >
        <TagBadge
          label="Real-time AI at edge"
          width={185.9921875}
          labelOffsetX={77}
          rightBarLeft={176.15625}
          nodeId="2900:545"
        />
        <TagBadge
          label="Real-time AI at edge"
          width={185.9921875}
          labelOffsetX={77}
          rightBarLeft={176.15625}
          nodeId="2900:563"
        />
      </div>

      {/* Title + description — 2900:463 (left=100, top=417.87, w=442) */}
      <div
        className={`${gilroyMedium.className} absolute flex flex-col items-start gap-[15px] not-italic [word-break:break-word]`}
        style={{ left: 100, top: 417.86553955078125, width: 442 }}
        data-node-id="2900:463"
        data-name="Container"
      >
        <h1
          className="min-w-full w-[min-content] shrink-0 bg-clip-text text-[46px] leading-[49px] font-medium text-transparent"
          style={{
            backgroundImage: HERO_TITLE_GRADIENT,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
          data-node-id="2900:464"
          data-name="Title"
        >
          {titleLines.map((line, i) => (
            <span key={i} className="block leading-[49px]">{line}</span>
          ))}
        </h1>
        <p
          className={`${interRegular.className} w-[419px] shrink-0 text-[16px] leading-[24px] font-normal text-[#f0f0f0] opacity-80`}
          data-node-id="2900:465"
          data-name="Description"
        >
          {subtitle}
        </p>
      </div>

      {/* CTA row — 2900:572 (left=100, top=634.87, gap=24) */}
      <div
        className="absolute flex items-start gap-[24px]"
        style={{ left: 100, top: 634.86553955078125 }}
        data-node-id="2900:572"
        data-name="Frame 1984079464"
      >
        <PrimaryCta href={primary.href}>{primary.label}</PrimaryCta>
        <SecondaryCta href={secondary.href}>{secondary.label}</SecondaryCta>
      </div>

      {/* Scroll indicator — 2900:460 (left=1335.5, top=696) */}
      <ProductsScrollIndicator />
    </>
  );
}

function PrimaryCta({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      className={`${PRIMARY_CTA_SHADOW} ${gilroyMedium.className} relative flex h-[48px] w-[223px] shrink-0 items-center justify-center overflow-hidden`}
      data-node-id="2900:573"
      data-name="Cta"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
      />
      <span className="relative text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
        {children}
      </span>
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 rounded-[inherit] ${PRIMARY_CTA_INSET}`}
      />
      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
    </a>
  );
}

function SecondaryCta({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      className={`${gilroyMedium.className} relative flex h-[48px] w-[255px] shrink-0 items-center justify-center overflow-clip`}
      style={{ backgroundColor: SECONDARY_CTA_BG }}
      data-node-id="2900:584"
      data-name="CTA - Secondary"
    >
      <span className="relative px-[20px] py-[10px] text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
        {children}
      </span>
      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
    </a>
  );
}

function ProductsHeroMobile({
  titleLines,
  subtitle,
  primary,
  secondary,
  chipset2,
}: {
  titleLines: string[];
  subtitle: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  chipset2: string;
}) {
  return (
    <section
      className="relative -mt-[78px] w-full bg-black min-[1024px]:hidden"
      aria-label="Products"
    >
      <div className="relative flex w-full flex-col pt-[100px] pb-[56px]">
        {/* Background chip image */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={chipset2}
            className="absolute inset-0 size-full object-cover object-[center_bottom] opacity-60"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(0deg, #000000 12%, rgba(0,0,0,0.55) 48%, rgba(0,0,0,0.2) 100%)",
            }}
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
            {titleLines.join(" ")}
          </h1>
          <p
            className={`${interRegular.className} w-[332px] max-w-full text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-80`}
          >
            {subtitle}
          </p>

          <div className="mt-[9px] flex w-full flex-col gap-[16px]">
            <a
              href={primary.href}
              className={`${PRIMARY_CTA_SHADOW} ${gilroyMedium.className} relative flex h-[48px] w-full shrink-0 items-center justify-center overflow-hidden`}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
              />
              <span className="relative text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
                {primary.label}
              </span>
              <span
                aria-hidden
                className={`pointer-events-none absolute inset-0 rounded-[inherit] ${PRIMARY_CTA_INSET}`}
              />
              <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            </a>
            <a
              href={secondary.href}
              className={`${gilroyMedium.className} relative flex h-[48px] w-full shrink-0 items-center justify-center overflow-clip`}
              style={{ backgroundColor: SECONDARY_CTA_BG }}
            >
              <span className="relative px-[20px] py-[10px] text-[14px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
                {secondary.label}
              </span>
              <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
