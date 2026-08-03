/* eslint-disable @next/next/no-img-element */
import { gilroyMedium, interRegular } from "../hero/fonts";
import { GradientTitle, CornerDecor } from "../contact/contact-shared";
import { Corners } from "../shared/Corners";
import { mediaUrl } from "@/lib/strapi";

const MARQUEE_CARD_BG =
  "radial-gradient(120% 120% at 50% 50%, rgba(0,0,0,0.30) 0%, rgba(5,14,2,0.30) 8%, rgba(10,27,5,0.30) 14%, rgba(21,54,9,0.30) 28%, rgba(31,81,14,0.30) 40%, rgba(42,108,18,0.30) 52%, rgba(62,162,27,0.30) 76%, rgba(83,216,36,0.30) 100%), linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2))";

const ICON_BG =
  "radial-gradient(29.884px 14.501px at 20.351px -2.403px, rgb(57, 74, 54) 0%, rgb(43, 54, 41) 50%, rgb(29, 34, 28) 100%)";

const TOP_OVERLAY_BG =
  "linear-gradient(180deg, rgb(4, 4, 4) 63.365%, rgba(4, 4, 4, 0) 100%)";

const BOTTOM_OVERLAY_BG =
  "linear-gradient(0deg, rgb(4, 4, 4) 17.573%, rgba(4, 4, 4, 0) 100%)";

const SUBTITLE =
  "Legacy silicon forces you to choose. High performance or low power. Complex models or small footprint. We re-architected the physics so you can finally unleash your creativity and build with freedom.";

const FALLBACK_HEADING = "The death of hardware tradeoffs.";

const SMALL_CORNER = "/applications/corner-vector-59.svg";
const FEATURE_ICON = "/applications/dvk-feature-icon.svg";
const FEATURE_CHECK = "/applications/dvk-feature-check.svg";

function CardCorners({
  w,
  h,
  src,
}: {
  w: number;
  h: number;
  src: string;
}) {
  const position =
    "pointer-events-none absolute flex items-center justify-center";
  return (
    <>
      <div
        className={`${position} top-0 left-0`}
        style={{ width: w, height: h }}
      >
        <div className="-scale-y-100 flex-none">
          <div className="relative" style={{ width: w, height: h }}>
            <img
              alt=""
              aria-hidden
              src={src}
              className="block size-full max-w-none"
            />
          </div>
        </div>
      </div>
      <div
        className={`${position} top-0 right-0`}
        style={{ width: w, height: h }}
      >
        <div className="rotate-180 flex-none">
          <div className="relative" style={{ width: w, height: h }}>
            <img
              alt=""
              aria-hidden
              src={src}
              className="block size-full max-w-none"
            />
          </div>
        </div>
      </div>
      <div
        className={`${position} bottom-0 right-0`}
        style={{ width: w, height: h }}
      >
        <div className="-scale-x-100 flex-none">
          <div className="relative" style={{ width: w, height: h }}>
            <img
              alt=""
              aria-hidden
              src={src}
              className="block size-full max-w-none"
            />
          </div>
        </div>
      </div>
      <div
        className={`${position} bottom-0 left-0`}
        style={{ width: w, height: h }}
      >
        <div className="flex-none">
          <div className="relative" style={{ width: w, height: h }}>
            <img
              alt=""
              aria-hidden
              src={src}
              className="block size-full max-w-none"
            />
          </div>
        </div>
      </div>
    </>
  );
}

function MarqueeCard({
  imageSrc,
  height,
  nodeId,
}: {
  imageSrc: string;
  height: number;
  nodeId?: string;
}) {
  return (
    <div
      className="relative flex w-[238px] flex-col items-center justify-center gap-[10px] p-[10px] backdrop-blur-[10px]"
      style={{ height, background: MARQUEE_CARD_BG }}
      data-node-id={nodeId}
    >
      <div className="relative h-[153.968px] w-[194.886px] shrink-0">
        <img
          alt=""
          aria-hidden
          src={imageSrc}
          className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
        />
      </div>
      <CardCorners w={2.122} h={1.995} src={SMALL_CORNER} />
    </div>
  );
}

function FeatureCard({
  title,
  nodeId,
}: {
  title: string;
  nodeId?: string;
}) {
  return (
    <div
      className="relative flex flex-col items-start gap-[20px] self-stretch justify-self-stretch overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.2)] px-[24px] pt-[16px] pb-[24px]"
      data-node-id={nodeId}
    >
      <div
        className="relative h-[40px] w-[40.702px] shrink-0 overflow-clip rounded-[8.421px]"
        style={{ backgroundImage: ICON_BG }}
        data-name="Icon"
      >
        <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center">
          <div className="relative size-[28.07px] shrink-0">
            <img
              alt=""
              aria-hidden
              src={FEATURE_ICON}
              className="absolute inset-0 block size-full max-w-none"
            />
          </div>
        </div>
      </div>
      <div className="relative flex w-full flex-col items-start">
        <div className="relative flex flex-col items-start gap-[12px]">
          <p
            className={`${gilroyMedium.className} text-[26px] leading-[29px] font-medium not-italic text-white [word-break:break-word]`}
          >
            {title}
          </p>
        </div>
      </div>
      <Corners />
      <div className="absolute top-[15.21px] right-[19.5px] size-[35px]">
        <img
          alt=""
          aria-hidden
          src={FEATURE_CHECK}
          className="absolute inset-0 block size-full max-w-none"
        />
      </div>
    </div>
  );
}

type MarqueeCardDef = {
  height: number;
  imageSrc: string;
  nodeId: string;
};

function MarqueeColumn({
  offset,
  top,
  gap,
  direction,
  setsPerHalf,
  cards,
}: {
  offset: number;
  top: number;
  gap: number;
  direction: "up" | "down";
  setsPerHalf: number;
  cards: MarqueeCardDef[];
}) {
  const half = (hidden: boolean) => (
    <div
      aria-hidden={hidden || undefined}
      className="flex flex-col"
      style={{ gap, paddingBottom: gap }}
    >
      {Array.from({ length: setsPerHalf }).flatMap((_, setIdx) =>
        cards.map((card) => (
          <MarqueeCard
            key={`${setIdx}-${card.nodeId}`}
            height={card.height}
            imageSrc={card.imageSrc}
            nodeId={!hidden && setIdx === 0 ? card.nodeId : undefined}
          />
        )),
      )}
    </div>
  );

  return (
    <div
      className="absolute -translate-x-1/2"
      style={{ top, left: `calc(50% + ${offset}px)` }}
    >
      <div
        className={
          direction === "up"
            ? "animate-dvk-marquee-up"
            : "animate-dvk-marquee-down"
        }
      >
        {half(false)}
        {half(true)}
      </div>
    </div>
  );
}

const MARQUEE_COLUMNS: Array<{
  offset: number;
  top: number;
  gap: number;
  direction: "up" | "down";
  setsPerHalf: number;
  cards: MarqueeCardDef[];
}> = [
  {
    offset: -499.14,
    top: 231.57,
    gap: 30,
    direction: "up",
    setsPerHalf: 2,
    cards: [
      {
        height: 219,
        imageSrc: "/applications/dvk-m-watch.png",
        nodeId: "3591:1711",
      },
      {
        height: 219,
        imageSrc: "/applications/dvk-m-robot-arm.png",
        nodeId: "3591:1729",
      },
      {
        height: 219,
        imageSrc: "/applications/dvk-m-humanoid.png",
        nodeId: "3591:1741",
      },
    ],
  },
  {
    offset: -243.14,
    top: 63.57,
    gap: 29,
    direction: "down",
    setsPerHalf: 1,
    cards: [
      {
        height: 220,
        imageSrc: "/applications/dvk-m-watch.png",
        nodeId: "3591:1723",
      },
      {
        height: 220,
        imageSrc: "/applications/dvk-m-headphones.png",
        nodeId: "3591:1717",
      },
      {
        height: 221,
        imageSrc: "/applications/dvk-m-rover.png",
        nodeId: "3591:1735",
      },
      {
        height: 220,
        imageSrc: "/applications/dvk-m-surgical.png",
        nodeId: "3591:1747",
      },
    ],
  },
];

const COLUMN_LAYOUTS = MARQUEE_COLUMNS.map((c) => ({
  offset: c.offset,
  top: c.top,
  gap: c.gap,
  direction: c.direction,
  setsPerHalf: c.setsPerHalf,
}));

/** Distribute a flat list of carousel image URLs across the two columns. */
function buildColumns(images: string[]): typeof MARQUEE_COLUMNS {
  const groups: MarqueeCardDef[][] = [[], []];
  images.forEach((src, i) => {
    groups[i % 2].push({ height: 219, imageSrc: src, nodeId: `carousel-${i}` });
  });
  return COLUMN_LAYOUTS.map((layout, idx) => ({ ...layout, cards: groups[idx] }));
}

const FEATURE_NODE_IDS = [
  "3591:1765",
  "3591:1786",
  "3591:1807",
  "3591:1828",
  "3591:1849",
  "3591:1870",
];

const FALLBACK_FEATURES = [
  "Complex AI Model",
  "Realtime & low latency",
  "Ondevice, cloud-free",
  "Compact footprint",
  "Programmable & future proof",
  "Ultra -low power consumption",
];

export function ApplicationsPageDvk({ data }: { data?: any }) {
  const heading = data?.heading || FALLBACK_HEADING;
  const subtitle = data?.subtitle || SUBTITLE;

  // Carousel images drive both marquee columns. When the CMS provides images
  // they are distributed across the two columns (interleaved) so any image
  // added in Strapi automatically appears in the carousel. When absent, the
  // hardcoded pixel-perfect fallback columns are used.
  const cmsCarousel: string[] = (Array.isArray(data?.carousel_images)
    ? data.carousel_images
    : []
  )
    .map((m: any) => mediaUrl(m))
    .filter((u: string | null): u is string => !!u);

  const columns =
    cmsCarousel.length > 0 ? buildColumns(cmsCarousel) : MARQUEE_COLUMNS;

  const mobileCards: { imageSrc: string; nodeId: string }[] =
    cmsCarousel.length > 0
      ? cmsCarousel.slice(0, 4).map((src, i) => ({
          imageSrc: src,
          nodeId: `carousel-m-${i}`,
        }))
      : [
          MARQUEE_COLUMNS[0].cards[0],
          MARQUEE_COLUMNS[1].cards[1],
          MARQUEE_COLUMNS[0].cards[1],
          MARQUEE_COLUMNS[1].cards[2],
        ];

  const features: string[] = Array.isArray(data?.features)
    ? data.features.map(
        (f: { title?: string } | null, i: number) =>
          f?.title || FALLBACK_FEATURES[i] || FALLBACK_FEATURES[0] || "",
      )
    : FALLBACK_FEATURES;

  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-[#040404]"
      data-node-id="3591:1710"
      data-name="Desktop - 9"
      aria-label="The death of hardware tradeoffs"
    >
      {/* DESKTOP (>=1024px) */}
      <div className="relative hidden h-[825px] w-full max-w-[1440px] min-[1024px]:block">
        {/* Marquee columns (opposite directions) */}
        {columns.map((col, colIdx) => (
          <MarqueeColumn
            key={colIdx}
            offset={col.offset}
            top={col.top}
            gap={col.gap}
            direction={col.direction}
            setsPerHalf={col.setsPerHalf}
            cards={col.cards}
          />
        ))}

        {/* Top overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 h-[312.758px] w-[670.39px]"
          style={{ backgroundImage: TOP_OVERLAY_BG }}
          data-node-id="3591:1753"
        />

        {/* Bottom overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 h-[105.005px] w-[636.501px]"
          style={{ backgroundImage: BOTTOM_OVERLAY_BG }}
          data-node-id="3591:1754"
        />

        {/* Header: title + subtitle */}
        <div
          className="absolute top-[26.14px] left-1/2 flex w-[800px] -translate-x-1/2 flex-col items-center gap-[24px]"
          data-node-id="3591:1755"
        >
          <div className="relative px-[10px]" data-name="Title">
            <GradientTitle
              gradientDeg="132.656deg"
              nodeId="3591:1758"
              className="text-center whitespace-nowrap"
            >
              {heading}
            </GradientTitle>
            <CornerDecor />
          </div>
          <p
            className={`${interRegular.className} w-[718px] text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
            data-node-id="3591:1763"
          >
            {subtitle}
          </p>
        </div>

        {/* Feature grid */}
        <div
          className="absolute top-[272.5px] left-[678.27px] grid h-[516px] w-[707px] grid-cols-2 gap-x-[35px] gap-y-[50px]"
          data-node-id="3591:1764"
        >
          {features.map((title, idx) => (
            <FeatureCard
              key={FEATURE_NODE_IDS[idx] || idx}
              title={title}
              nodeId={FEATURE_NODE_IDS[idx]}
            />
          ))}
        </div>
      </div>

      {/* MOBILE (<1024px) */}
      <div className="relative flex w-full flex-col items-center min-[1024px]:hidden">
        <div className="relative z-10 flex w-full flex-col items-center gap-[40px] px-[24px] pt-[72px] pb-[64px]">
          {/* Header */}
          <div className="flex w-full flex-col items-center gap-[24px]">
            <div className="relative px-[10px]">
              <div
                className={`${gilroyMedium.className} bg-clip-text text-center text-[34px] leading-[37px] font-medium text-transparent not-italic [word-break:break-word]`}
                style={{
                  backgroundImage:
                    "linear-gradient(132.656deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                {heading}
              </div>
              <CornerDecor />
            </div>
            <p
              className={`${interRegular.className} w-full max-w-[332px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-65 not-italic`}
            >
              {subtitle}
            </p>
          </div>

          {/* Product cards */}
          <div className="grid w-full max-w-[496px] grid-cols-2 gap-[18px]">
            {mobileCards.map((card) => (
              <div
                key={card.nodeId}
                className="relative flex w-full flex-col items-center justify-center gap-[10px] p-[10px] backdrop-blur-[10px]"
                style={{
                  aspectRatio: "238 / 219",
                  background: MARQUEE_CARD_BG,
                }}
              >
                <div className="relative aspect-[194.886/153.968] w-[82%] shrink-0">
                  <img
                    alt=""
                    aria-hidden
                    src={card.imageSrc}
                    className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
                  />
                </div>
                <CardCorners w={2.122} h={1.995} src={SMALL_CORNER} />
              </div>
            ))}
          </div>

          {/* Feature cards */}
          <div className="grid w-full max-w-[496px] grid-cols-1 gap-[24px]">
            {features.map((title, idx) => (
              <FeatureCard
                key={FEATURE_NODE_IDS[idx] || idx}
                title={title}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
