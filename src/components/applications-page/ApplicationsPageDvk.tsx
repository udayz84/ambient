/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
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

  // Mobile carousel: two staggered centered rows (peek layout) per Figma 4032:9152.
  // Row 1 holds 2 cards, row 2 holds 3 cards.
  const carouselRow1: MarqueeCardDef[] = (() => {
    if (cmsCarousel.length > 0) {
      return cmsCarousel.slice(0, 2).map((src, i) => ({
        height: 219,
        imageSrc: src,
        nodeId: `m-row1-${i}`,
      }));
    }
    return [
      { height: 219, imageSrc: MARQUEE_COLUMNS[0].cards[0].imageSrc, nodeId: "4032:9093" },
      { height: 219, imageSrc: MARQUEE_COLUMNS[1].cards[1].imageSrc, nodeId: "4032:9099" },
    ];
  })();
  const carouselRow2: MarqueeCardDef[] = (() => {
    if (cmsCarousel.length > 0) {
      return cmsCarousel.slice(2, 5).map((src, i) => ({
        height: 220,
        imageSrc: src,
        nodeId: `m-row2-${i}`,
      }));
    }
    return [
      { height: 220, imageSrc: MARQUEE_COLUMNS[0].cards[1].imageSrc, nodeId: "4032:9133" },
      { height: 221, imageSrc: MARQUEE_COLUMNS[1].cards[2].imageSrc, nodeId: "4032:9139" },
      { height: 220, imageSrc: MARQUEE_COLUMNS[0].cards[2].imageSrc, nodeId: "4032:9145" },
    ];
  })();

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

      {/* MOBILE (<1024px) — node 4032:8633, desktop above is untouched */}
      <div
        className="relative flex w-full flex-col items-center overflow-hidden min-[1024px]:hidden"
        data-node-id="4032:8633"
        data-name="2nd Fold"
      >
        <style>{`.dvk-m-scroll::-webkit-scrollbar{display:none}.dvk-m-scroll{scrollbar-width:none;-ms-overflow-style:none}`}</style>

        {/* Header: title + subtitle (node 4032:8646) */}
        <div
          className="relative z-10 mt-[30px] flex w-[350px] flex-col items-center gap-[10px]"
          data-node-id="4032:8646"
        >
          {/* Title with corner brackets (node 4032:8655) */}
          <div className="relative h-[79px] w-[356px]" data-node-id="4032:8655" data-name="Group 78">
            <div
              className={`${gilroyMedium.className} absolute inset-0 flex items-center justify-center bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
              style={{
                backgroundImage:
                  "linear-gradient(107.453deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
              data-node-id="4032:8656"
            >
              {heading}
            </div>

            {/* Top-right bracket (Vector 55) */}
            <div className="absolute left-[353px] top-[4px] flex h-[4px] w-[2.346px] items-center justify-center">
              <div className="flex-none rotate-180">
                <div className="relative h-[4px] w-[2.346px]">
                  <div className="absolute inset-[0_0_-12.5%_-21.31%]">
                    <Image src="/hero/corner-tag-2.svg" alt="" fill className="object-contain" aria-hidden />
                  </div>
                </div>
              </div>
            </div>
            {/* Bottom-right bracket (Vector 56) */}
            <div className="absolute left-[353px] top-[75px] flex h-[4px] w-[2.346px] items-center justify-center">
              <div className="-scale-y-100 flex-none rotate-180">
                <div className="relative h-[4px] w-[2.346px]">
                  <div className="absolute inset-[0_0_-12.5%_-21.31%]">
                    <Image src="/hero/corner-tag-2.svg" alt="" fill className="object-contain" aria-hidden />
                  </div>
                </div>
              </div>
            </div>
            {/* Bottom-left bracket (Vector 57) */}
            <div className="absolute left-[-3px] top-[75px] h-[4px] w-[2.346px]">
              <div className="absolute inset-[0_0_-12.5%_-21.31%]">
                <Image src="/hero/corner-tag-1.svg" alt="" fill className="object-contain" aria-hidden />
              </div>
            </div>
            {/* Top-left bracket (Vector 58) */}
            <div className="absolute left-[-3px] top-[4px] flex h-[4px] w-[2.346px] items-center justify-center">
              <div className="-scale-y-100 flex-none">
                <div className="relative h-[4px] w-[2.346px]">
                  <div className="absolute inset-[0_0_-12.5%_-21.31%]">
                    <Image src="/hero/corner-tag-1.svg" alt="" fill className="object-contain" aria-hidden />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subtitle (node 4032:8693) */}
          <p
            className={`${interRegular.className} w-[336px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-75 not-italic [word-break:break-word]`}
            data-node-id="4032:8693"
          >
            {subtitle}
          </p>
        </div>

        {/* Carousel + Feature cards (node 4032:9153) */}
        <div
          className="relative z-10 mt-[38.5px] flex w-full flex-col items-center gap-[40px]"
          data-node-id="4032:9153"
        >
          {/* Product image carousel: two centered rows that peek beyond the viewport (node 4032:9152) */}
          <div className="flex w-full flex-col gap-[13px]" data-node-id="4032:9152">
            <div className="flex w-full justify-center">
              <div className="flex gap-[16px]">
                {carouselRow1.map((card) => (
                  <MarqueeCard
                    key={card.nodeId}
                    imageSrc={card.imageSrc}
                    height={card.height}
                    nodeId={card.nodeId}
                  />
                ))}
              </div>
            </div>
            <div className="flex w-full justify-center">
              <div className="flex gap-[16px]">
                {carouselRow2.map((card) => (
                  <MarqueeCard
                    key={card.nodeId}
                    imageSrc={card.imageSrc}
                    height={card.height}
                    nodeId={card.nodeId}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Feature cards: horizontal snap-scroll, one card centered per stop (node 4032:9001) */}
          <div
            className="dvk-m-scroll flex w-full snap-x snap-mandatory gap-[15px] overflow-x-auto px-[29px]"
            data-node-id="4032:9001"
            data-name="death of hardware"
          >
            {features.map((title, idx) => (
              <div
                key={FEATURE_NODE_IDS[idx] || idx}
                className="w-[335px] shrink-0 snap-center"
              >
                <FeatureCard title={title} nodeId={FEATURE_NODE_IDS[idx]} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
