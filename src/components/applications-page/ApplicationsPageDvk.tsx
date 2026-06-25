/* eslint-disable @next/next/no-img-element */
import { gilroyMedium, interRegular } from "../hero/fonts";
import { GradientTitle, CornerDecor } from "../contact/contact-shared";

const DVK_BG_OVERLAY =
  "linear-gradient(180deg, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 25.145%), linear-gradient(180deg, rgba(0, 0, 0, 0) 27.95%, rgb(4, 4, 4) 64.806%)";

const CENTER_CARD_BG =
  "radial-gradient(120% 120% at 50% 50%, rgba(0,0,0,0.30) 0%, rgba(5,14,2,0.30) 8%, rgba(10,27,5,0.30) 14%, rgba(21,54,9,0.30) 28%, rgba(31,81,14,0.30) 40%, rgba(42,108,18,0.30) 52%, rgba(62,162,27,0.30) 76%, rgba(83,216,36,0.30) 100%), linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2))";

const SUBTITLE =
  "Legacy silicon forces you to choose. High performance or low power. Complex models or small footprint. We re-architected the physics so you can finally unleash your creativity and build with freedom.";

const CENTER_CAPTION_BODY =
  "Always-on biometric tracking and complex activity recognition running continuously on standard wearable batteries.";

const SMALL_CORNER = "/applications/corner-vector-59.svg";
const CENTER_CORNER = "/applications/corner-vector-56.svg";

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

type DvkCardProps = {
  size: number;
  padding: number;
  gap: number;
  backdropBlur: number;
  background: string;
  imageSrc: string;
  imageW: number;
  imageH: number;
  imageBlur: number;
  cornerW: number;
  cornerH: number;
  cornerSrc: string;
  flipped?: boolean;
  nodeId?: string;
};

function DvkCard({
  size,
  padding,
  gap,
  backdropBlur,
  background,
  imageSrc,
  imageW,
  imageH,
  imageBlur,
  cornerW,
  cornerH,
  cornerSrc,
  flipped = false,
  nodeId,
}: DvkCardProps) {
  const card = (
    <div
      className="relative flex flex-col items-center justify-center"
      style={{
        width: size,
        height: size,
        padding,
        gap,
        backdropFilter: `blur(${backdropBlur}px)`,
        WebkitBackdropFilter: `blur(${backdropBlur}px)`,
        background,
      }}
      data-node-id={nodeId}
    >
      <div
        className="relative shrink-0"
        style={{
          width: imageW,
          height: imageH,
          filter: imageBlur ? `blur(${imageBlur}px)` : undefined,
        }}
      >
        <img
          alt=""
          aria-hidden
          src={imageSrc}
          className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
        />
      </div>
      <CardCorners w={cornerW} h={cornerH} src={cornerSrc} />
    </div>
  );

  return flipped ? (
    <div className="-scale-y-100 rotate-180">{card}</div>
  ) : (
    card
  );
}

const SATELLITE_CARDS: Array<{
  top: number;
  offset: number;
  size: number;
  imageSrc: string;
  imageW: number;
  imageH: number;
  imageBlur: number;
  flipped: boolean;
  nodeId: string;
}> = [
  {
    top: 391.64,
    offset: -338.75,
    size: 180,
    imageSrc: "/applications/card-left-mid.png",
    imageW: 144,
    imageH: 113.766,
    imageBlur: 0.8,
    flipped: false,
    nodeId: "2761:3760",
  },
  {
    top: 393.14,
    offset: 334.13,
    size: 180,
    imageSrc: "/applications/card-right-mid.png",
    imageW: 144,
    imageH: 113.766,
    imageBlur: 0.8,
    flipped: true,
    nodeId: "2761:3766",
  },
  {
    top: 549.14,
    offset: -626.5,
    size: 170,
    imageSrc: "/applications/card-left-far.png",
    imageW: 126,
    imageH: 99.545,
    imageBlur: 1.4,
    flipped: false,
    nodeId: "2761:3772",
  },
  {
    top: 547.14,
    offset: 635,
    size: 170,
    imageSrc: "/applications/card-right-far.png",
    imageW: 126,
    imageH: 99.545,
    imageBlur: 1.4,
    flipped: true,
    nodeId: "2761:3778",
  },
];

export function ApplicationsPageDvk() {
  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-black"
      data-node-id="2761:3743"
      data-name="DVK"
      aria-label="The death of hardware tradeoffs"
    >
      {/* DESKTOP (>=1024px) */}
      <div className="relative hidden h-[845px] w-full max-w-[1440px] min-[1024px]:block">
        {/* Background */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-black" />
          <img
            alt=""
            aria-hidden
            src="/applications/dvk-bg.png"
            className="absolute inset-0 size-full max-w-none object-bottom"
          />
          <div
            className="absolute inset-0"
            style={{ backgroundImage: DVK_BG_OVERLAY }}
          />
        </div>

        {/* Header: title + subtitle */}
        <div
          className="absolute top-[59.64px] left-1/2 flex w-[800px] -translate-x-1/2 flex-col items-center gap-[24px]"
          data-node-id="2761:3744"
        >
          <div className="relative px-[10px]" data-name="Title">
            <GradientTitle
              gradientDeg="132.656deg"
              nodeId="2761:3747"
              className="text-center whitespace-nowrap"
            >
              The death of hardware tradeoffs.
            </GradientTitle>
            <CornerDecor />
          </div>
          <p
            className={`${interRegular.className} w-[718px] text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
            data-node-id="2761:3752"
          >
            {SUBTITLE}
          </p>
        </div>

        {/* Orbit ellipse */}
        <div
          className="absolute top-[470.87px] left-1/2 h-[1087.082px] w-[1713.258px] -translate-x-1/2"
          data-node-id="2761:3753"
        >
          <img
            alt=""
            aria-hidden
            src="/applications/orbit.svg"
            className="absolute inset-0 block size-full max-w-none"
          />
        </div>

        {/* Center card */}
        <div
          className="absolute top-[282.97px] left-1/2 -translate-x-1/2"
          data-node-id="2761:3754"
        >
          <DvkCard
            size={255.175}
            padding={12.759}
            gap={12.759}
            backdropBlur={12.759}
            background={CENTER_CARD_BG}
            imageSrc="/applications/card-center.png"
            imageW={248.65}
            imageH={196.444}
            imageBlur={0}
            cornerW={2.707}
            cornerH={2.545}
            cornerSrc={CENTER_CORNER}
            nodeId="2761:3754"
          />
        </div>

        {/* Satellite cards */}
        {SATELLITE_CARDS.map((card) => (
          <div
            key={card.nodeId}
            className="absolute -translate-x-1/2"
            style={{
              top: `${card.top}px`,
              left: `calc(50% + ${card.offset}px)`,
            }}
          >
            <DvkCard
              size={card.size}
              padding={10}
              gap={10}
              backdropBlur={10}
              background="rgba(0,0,0,0.2)"
              imageSrc={card.imageSrc}
              imageW={card.imageW}
              imageH={card.imageH}
              imageBlur={card.imageBlur}
              cornerW={2.122}
              cornerH={1.995}
              cornerSrc={SMALL_CORNER}
              flipped={card.flipped}
              nodeId={card.nodeId}
            />
          </div>
        ))}

        {/* Center caption */}
        <div
          className="absolute top-[583.14px] left-1/2 flex w-[345px] -translate-x-1/2 flex-col items-center"
          data-node-id="2761:3784"
        >
          <div className="flex w-full flex-col items-center justify-center gap-[10px] text-center not-italic">
            <p
              className={`${gilroyMedium.className} text-[20.211px] leading-[28.295px] tracking-[-0.4539px] whitespace-nowrap text-white`}
              data-node-id="2761:3786"
            >
              Wearables
            </p>
            <p
              className={`${interRegular.className} min-w-full w-[min-content] text-[14px] leading-[21px] font-normal text-[rgba(240,240,240,0.6)]`}
              data-node-id="2761:3787"
            >
              {CENTER_CAPTION_BODY}
            </p>
          </div>
        </div>

        {/* Bottom image */}
        <div
          className="absolute top-[659.14px] left-0 h-[185.861px] w-[1437.878px]"
          data-node-id="2761:3789"
        >
          <img
            alt=""
            aria-hidden
            src="/applications/dvk-bottom.png"
            className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
          />
        </div>
      </div>

      {/* MOBILE (<1024px) */}
      <div className="relative flex w-full flex-col items-center min-[1024px]:hidden">
        {/* Background */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-black" />
          <img
            alt=""
            aria-hidden
            src="/applications/dvk-bg.png"
            className="absolute inset-0 size-full max-w-none object-bottom opacity-50"
          />
          <div
            className="absolute inset-0"
            style={{ backgroundImage: DVK_BG_OVERLAY }}
          />
        </div>

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
                The death of hardware tradeoffs.
              </div>
              <CornerDecor />
            </div>
            <p
              className={`${interRegular.className} max-w-[332px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-65 not-italic`}
            >
              {SUBTITLE}
            </p>
          </div>

          {/* Center card */}
          <div
            className="relative flex size-[200px] flex-col items-center justify-center"
            style={{
              padding: 12,
              gap: 12,
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              background: CENTER_CARD_BG,
            }}
          >
            <div className="relative h-[150px] w-[190px] shrink-0">
              <img
                alt=""
                aria-hidden
                src="/applications/card-center.png"
                className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
              />
            </div>
            <CardCorners w={2.707} h={2.545} src={CENTER_CORNER} />
          </div>

          {/* Caption */}
          <div className="flex max-w-[345px] flex-col items-center gap-[10px] text-center">
            <p
              className={`${gilroyMedium.className} text-[20.211px] leading-[28.295px] tracking-[-0.4539px] whitespace-nowrap text-white`}
            >
              Wearables
            </p>
            <p
              className={`${interRegular.className} text-[14px] leading-[21px] font-normal text-[rgba(240,240,240,0.6)]`}
            >
              {CENTER_CAPTION_BODY}
            </p>
          </div>

          {/* Bottom image */}
          <div className="h-[140px] w-full overflow-hidden">
            <img
              alt=""
              aria-hidden
              src="/applications/dvk-bottom.png"
              className="pointer-events-none size-full max-w-none object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
