import { mediaUrl } from "@/lib/strapi";
import { gilroyMedium, gilroySemiBold, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";

/**
 * Figma 2940:1244 — "The full picture".
 * Centered product image with 8 floating spec callout cards.
 * Self-contained: all layout data derived directly from the Figma frame.
 */

/* ---- Canvas (Figma frame width = 1440) ---- */
const CANVAS_WIDTH = 1440;
const SECTION_HEIGHT = 1000;

/* ---- Tokens ---- */
const TITLE_GRADIENT =
  "linear-gradient(112.319deg, rgb(255,255,255) 1.3527%, rgb(212,233,188) 55.161%, rgb(255,255,255) 111.67%)";
const IMAGE_VIGNETTE =
  "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)";
const ICON_TILE_BG =
  "radial-gradient(60% 75% at 50% 0%, rgba(57,74,54,1) 0%, rgba(43,54,41,1) 50%, rgba(29,34,28,1) 100%)";

const HEADER_COLOR = "#6fe047";
const PLUS_COLOR = "#3a9719";
const ITEM_TEXT_COLOR = "rgba(255,255,255,0.9)";

/* ---- Central image — 2940:1245 ---- */
const IMAGE = { left: 247, top: 191, width: 946.5, height: 631 };

/* ---- Callout card geometry — 2940:1340 et al. ---- */
const CALLOUT_WIDTH = 284.6950378417969;
const CARD_BG = "rgba(21,21,21,0.1)";
const CARD_DIVIDER = "rgba(255,255,255,0.1)";

const FALLBACK_HEADING = "The full picture";
const FALLBACK_SUBTITLE =
  "Bridge the lab and real world. The Sparsh module offers continuous, microwatt intelligence in a 21×21mm size, with a breakout board that snaps off for production.";

const FALLBACK_MEMORY_ITEMS = [
  "120 KB L0 cache",
  "2048 KB unified L1 SRAM",
  "Video + multi-bank sensor buffers",
  "Boot ROM",
  "External SRAM/Flash via QSPI/SPI",
];

const FALLBACK_SECURITY_ITEMS = [
  "Secure boot with signed firmware",
  "AES-256 hardware acceleration",
  "True random number generator",
  "Tamper-resistant key storage",
  "Active tamper detection",
];

const FALLBACK_CONNECTIVITY_ITEMS = [
  "Quad-SPI / SPI",
  "I2C x 4",
  "UART x 4",
  "USB 2.0 OTG",
  "84 programmable GPIO",
];

type Callout = {
  nodeId: string;
  left: number;
  top: number;
  header: string;
  items: string[];
  icon?: string | null;
};

const FALLBACK_CALLOUTS: Callout[] = [
  { nodeId: "2940:1340", left: 78, top: 238, header: "Memory", items: FALLBACK_MEMORY_ITEMS },
  { nodeId: "2940:1467", left: 578, top: 232, header: "Compute", items: ["512 GOPS neural compute"] },
  { nodeId: "2940:1372", left: 1058, top: 243, header: "Memory", items: FALLBACK_MEMORY_ITEMS },
  { nodeId: "2940:1435", left: 106, top: 489, header: "Power", items: ["Under 100 µW always-on"] },
  { nodeId: "2940:1483", left: 1060, top: 491, header: "Sensing", items: ["10 fused sensor streams"] },
  { nodeId: "2940:1404", left: 109, top: 610, header: "Security", items: FALLBACK_SECURITY_ITEMS },
  {
    nodeId: "2940:1499",
    left: 974.017578125,
    top: 592.53173828125,
    header: "Connectivity",
    items: FALLBACK_CONNECTIVITY_ITEMS,
  },
  { nodeId: "2940:1451", left: 569, top: 725, header: "Package", items: ["21 × 21 mm module"] },
];

function splitLinesFilter(value: string | undefined | null): string[] {
  if (!value) return [];
  return value
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function ProductsFullPicture({ data }: { data?: any }) {
  const heading = data?.heading || FALLBACK_HEADING;
  const subtitle = data?.subtitle || FALLBACK_SUBTITLE;
  const image = mediaUrl(data?.image) || "/products/full-picture.png";

  const memoryItems =
    splitLinesFilter(data?.memory_items) || FALLBACK_MEMORY_ITEMS;
  const securityItems =
    splitLinesFilter(data?.security_items) || FALLBACK_SECURITY_ITEMS;
  const connectivityItems =
    splitLinesFilter(data?.connectivity_items) || FALLBACK_CONNECTIVITY_ITEMS;

  const itemsByHeader: Record<string, string[]> = {
    Memory: memoryItems,
    Security: securityItems,
    Connectivity: connectivityItems,
  };

  const strapiCallouts: Record<string, string | null> = {};
  if (Array.isArray(data?.callouts)) {
    for (const c of data.callouts) {
      if (c?.label) strapiCallouts[c.label] = mediaUrl(c?.icon) || null;
    }
  }

  const callouts = FALLBACK_CALLOUTS.map((c) => {
    const dynamicItems = itemsByHeader[c.header];
    return {
      ...c,
      items: dynamicItems && dynamicItems.length > 0 ? dynamicItems : c.items,
      icon: strapiCallouts[c.header] ?? null,
    };
  });

  return (
    <>
      {/* DESKTOP (>=1024px) */}
      <section
        className="relative mx-auto hidden w-full bg-black min-[1024px]:block"
        aria-label="The full picture"
      >
        <div
          className="relative mx-auto"
          style={{ width: CANVAS_WIDTH, height: SECTION_HEIGHT - 120 }}
          data-node-id="2940:1244"
          data-name="The full picture"
        >
          <div className="relative size-full">
            <FullPictureDesktop
              heading={heading}
              subtitle={subtitle}
              image={image}
              callouts={callouts}
            />
          </div>
        </div>
      </section>

      {/* MOBILE (<1024px) */}
      <FullPictureMobile
        heading={heading}
        subtitle={subtitle}
        image={image}
        callouts={callouts}
      />
    </>
  );
}

function FullPictureDesktop({
  heading,
  subtitle,
  image,
  callouts,
}: {
  heading: string;
  subtitle: string;
  image: string;
  callouts: Callout[];
}) {
  return (
    <>
      {/* Section title — 2940:1331 (centered, w=800) */}
      <div
        className="absolute flex flex-col items-center gap-[24px]"
        style={{ left: 320, top: 52.5, width: 800 }}
        data-node-id="2940:1331"
        data-name="Frame 1984079432"
      >
        <div
          className="relative px-[10px]"
          style={{ width: 331, height: 49 }}
          data-node-id="2940:1333"
          data-name="Title"
        >
          <Corners />
          <h2
            className={`${gilroyMedium.className} absolute m-0 w-[311px] bg-clip-text text-center text-[46px] leading-[49px] font-medium text-transparent not-italic [word-break:break-word]`}
            style={{
              left: 10,
              top: 0,
              backgroundImage: TITLE_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
            data-node-id="2940:1334"
          >
            {heading}
          </h2>
        </div>
        <p
          className={`${interRegular.className} w-[800px] text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
          data-node-id="2940:1339"
        >
          {subtitle}
        </p>
      </div>

      {/* Central image — 2940:1245 */}
      <div
        className="pointer-events-none absolute overflow-hidden"
        style={{
          left: IMAGE.left,
          top: IMAGE.top,
          width: IMAGE.width,
          height: IMAGE.height,
        }}
        data-node-id="2940:1245"
        data-name="ChatGPT Image Jun 11, 2026, 07_07_16 PM 1"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Sparsh module"
          src={image}
          className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundImage: IMAGE_VIGNETTE, opacity: 0.7 }}
        />
      </div>

      {/* Spec callout cards */}
      {callouts.map((callout) => (
        <CalloutCard key={callout.nodeId} callout={callout} />
      ))}
    </>
  );
}

function CalloutCard({ callout }: { callout: Callout }) {
  return (
    <div
      className="absolute flex flex-col items-start gap-[8px] px-[12px] pb-[16px] pt-[8px] border border-white/10 rounded-[4px]"
      style={{
        left: callout.left,
        top: callout.top,
        width: CALLOUT_WIDTH,
        backgroundColor: CARD_BG,
      }}
      data-node-id={callout.nodeId}
      data-name="Content"
    >
      {/* Header (title + icon) — 2940:1341 */}
      <div
        className="flex w-full items-center justify-between border-b border-solid pb-[6px]"
        style={{ borderColor: CARD_DIVIDER }}
        data-node-id="2940:1341"
        data-name="Container"
      >
        <p
          className={`${gilroySemiBold.className} text-[16px] leading-[16px] font-semibold tracking-[0.6px] whitespace-nowrap uppercase not-italic`}
          style={{ color: HEADER_COLOR }}
        >
          {callout.header}
        </p>
        <div
          className="relative flex size-[27.649px] shrink-0 items-center justify-center overflow-clip rounded-[5.895px]"
          style={{ backgroundImage: ICON_TILE_BG }}
          aria-hidden
          data-name="Icon"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={callout.icon || "/products/spec-icon.svg"}
            className="block size-[19.649px] max-w-none"
          />
        </div>
      </div>

      {/* Items with dividers between */}
      {callout.items.map((item, i) => (
        <div key={i} className="contents">
          {i > 0 && (
            <div className="flex h-[1px] w-full shrink-0 items-center justify-center overflow-visible">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src="/products/spec-line.svg"
                className="block h-[1px] w-full max-w-none"
                aria-hidden
              />
            </div>
          )}
          <div className="relative h-[17px] w-full shrink-0">
            <span
              className={`${interRegular.className} absolute left-0 top-[1.5px] text-[14px] font-normal leading-[normal] tracking-[-0.1504px] not-italic`}
              style={{ color: PLUS_COLOR }}
            >
              +
            </span>
            <span
              className={`${interRegular.className} absolute left-[15px] top-0 text-[13px] font-normal leading-[normal] whitespace-nowrap not-italic`}
              style={{ color: ITEM_TEXT_COLOR }}
            >
              {item}
            </span>
          </div>
        </div>
      ))}

      <Corners />
    </div>
  );
}

function FullPictureMobile({
  heading,
  subtitle,
  image,
  callouts,
}: {
  heading: string;
  subtitle: string;
  image: string;
  callouts: Callout[];
}) {
  return (
    <section
      className="relative w-full overflow-hidden bg-black px-[24px] pt-[64px] pb-[80px] min-[1024px]:hidden"
      aria-label="The full picture"
    >
      {/* Title */}
      <div className="flex flex-col items-center gap-[16px]">
        <h2
          className={`${gilroyMedium.className} max-w-full bg-clip-text text-center text-[30px] leading-[34px] font-medium text-transparent not-italic [word-break:break-word]`}
          style={{
            backgroundImage: TITLE_GRADIENT,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          {heading}
        </h2>
        <p
          className={`${interRegular.className} max-w-full text-center text-[16px] leading-[24px] font-normal text-[#f0f0f0] opacity-65`}
        >
          {subtitle}
        </p>
      </div>

      {/* Central image */}
      <div className="relative mt-[24px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Sparsh module"
          src={image}
          className="h-auto w-full rounded-[8px]"
        />
      </div>

      {/* Callouts as stacked grid */}
      <div className="mt-[32px] grid grid-cols-1 gap-[24px] sm:grid-cols-2">
        {callouts.map((callout) => (
          <div
            key={callout.nodeId}
            className="relative flex flex-col gap-[8px] px-[12px] pb-[12px] pt-[8px] border border-white/10 rounded-[4px]"
            style={{ backgroundColor: CARD_BG }}
          >
            <div
              className="flex w-full items-center justify-between border-b border-solid pb-[6px]"
              style={{ borderColor: CARD_DIVIDER }}
            >
              <p
                className={`${gilroySemiBold.className} text-[14px] font-semibold tracking-[0.6px] uppercase not-italic`}
                style={{ color: HEADER_COLOR }}
              >
                {callout.header}
              </p>
              <div
                className="flex size-[24px] items-center justify-center rounded-[5px]"
                style={{ backgroundImage: ICON_TILE_BG }}
                aria-hidden
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src={callout.icon || "/products/spec-icon.svg"}
                  className="block size-[16px]"
                />
              </div>
            </div>
            {callout.items.map((item, i) => (
              <div key={i} className="contents">
                {i > 0 && (
                  <div className="flex h-[1px] w-full shrink-0 items-center justify-center overflow-visible">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt=""
                      src="/products/spec-line.svg"
                      className="block h-[1px] w-full max-w-none"
                      aria-hidden
                    />
                  </div>
                )}
                <div className="relative h-[17px] w-full shrink-0">
                  <span
                    className={`${interRegular.className} absolute left-0 top-[1.5px] text-[14px] font-normal leading-[normal] tracking-[-0.1504px] not-italic`}
                    style={{ color: PLUS_COLOR }}
                  >
                    +
                  </span>
                  <span
                    className={`${interRegular.className} absolute left-[15px] top-0 text-[13px] font-normal leading-[normal] whitespace-nowrap not-italic`}
                    style={{ color: ITEM_TEXT_COLOR }}
                  >
                    {item}
                  </span>
                </div>
              </div>
            ))}
            <Corners />
          </div>
        ))}
      </div>
    </section>
  );
}
