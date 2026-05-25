import Image from "next/image";
import { interMedium, interRegular, interSemiBold } from "../hero/fonts";
import { TagBadge } from "../hero/TagBadge";
import type { CareersValueCard } from "./careers-data";

const cornerBr = "/careers/corner-card-br.svg";
const cornerBl = "/careers/corner-card-bl.svg";
const cornerTrGlass = "/careers/corner-tr-glass.svg";
const cornerTlGlass = "/careers/corner-tl-glass.svg";
const cornerBrGlass = "/hero/vector-55.svg";
const cornerTrGradient = "/careers/corner-card-tr.svg";
const cornerTlGradient = "/careers/corner-card-tl.svg";
const cornerCtaLeft = "/careers/corner-menu-tl.svg";
const cornerCtaRight = "/careers/corner-menu-tr.svg";
const cornerMenuLeft = "/hero/vector-57.svg";
const cornerMenuRight = "/hero/vector-55.svg";

export const BOX_BORDER_CLASS =
  "border-[0.5px] border-solid border-[rgba(240,240,240,0.2)]";

export const CARD_GRADIENT_BG =
  "linear-gradient(rgba(83, 216, 36, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%), linear-gradient(90deg, rgba(21, 21, 21, 0.3) 0%, rgba(21, 21, 21, 0.3) 100%)";

const DNA_BG_GRADIENT =
  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 1444.4 689.27' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%25' width='100%25' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(4.4222e-15 34.463 -123.35 -1.1701e-14 722.2 344.63)'><stop stop-color='rgba(0,0,0,0)' offset='0'/><stop stop-color='rgba(0,0,0,1)' offset='1'/></radialGradient></defs></svg>\")";

function CornerImg({ src, className = "" }: { src: string; className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-[0_0_-12.5%_-12.5%] ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" className="block size-full max-w-none" src={src} aria-hidden />
    </div>
  );
}

function GradientCardTopCorners() {
  return (
    <>
      <div className="pointer-events-none absolute top-0 left-[421.94px] flex h-[4.301px] w-[4.057px] items-center justify-center">
        <div className="-scale-y-100 rotate-90 flex-none">
          <div className="relative h-[4.301px] w-[4.057px]">
            <CornerImg src={cornerTrGradient} />
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute top-0 left-0 flex h-[4.301px] w-[4.057px] items-center justify-center">
        <div className="-scale-y-100 flex-none">
          <div className="relative h-[4.301px] w-[4.057px]">
            <CornerImg src={cornerTlGradient} />
          </div>
        </div>
      </div>
    </>
  );
}

function GradientCardBottomCorners() {
  return (
    <>
      <div className="pointer-events-none absolute right-0 bottom-0 flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 rotate-180 flex-none">
          <div className="relative size-[4px]">
            <CornerImg src={cornerBr} />
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 flex size-[4px] items-center justify-center">
        <div className="-rotate-90 -scale-y-100 flex-none">
          <div className="relative size-[4px]">
            <CornerImg src={cornerBl} />
          </div>
        </div>
      </div>
    </>
  );
}

function GlassPanelCorners() {
  return (
    <>
      <div className="pointer-events-none absolute bottom-0 left-0 flex size-[4px] items-center justify-center">
        <div className="-rotate-90 -scale-y-100 flex-none">
          <div className="relative size-[4px]">
            <CornerImg src={cornerBl} />
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute top-[-0.49px] right-[0.19px] flex h-[4px] w-[3.81px] items-center justify-center">
        <div className="-scale-y-100 rotate-90 flex-none">
          <div className="relative h-[3.81px] w-[4px]">
            <CornerImg src={cornerTrGlass} />
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute top-0 left-0 flex h-[4px] w-[3.81px] items-center justify-center">
        <div className="-scale-y-100 flex-none">
          <div className="relative h-[4px] w-[3.81px]">
            <CornerImg src={cornerTlGlass} />
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute right-0 bottom-[0.49px] flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 rotate-180 flex-none">
          <div className="relative size-[4px]">
            <CornerImg src={cornerBrGlass} />
          </div>
        </div>
      </div>
    </>
  );
}

function BoxCorners() {
  return (
    <>
      <div className="pointer-events-none absolute top-0 left-0 flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 flex-none">
          <div className="relative size-[4px]">
            <CornerImg src={cornerMenuLeft} />
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute top-0 right-0 flex size-[4px] items-center justify-center">
        <div className="rotate-180 flex-none">
          <div className="relative size-[4px]">
            <CornerImg src={cornerMenuRight} />
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 size-[4px]">
        <CornerImg src={cornerMenuLeft} />
      </div>
      <div className="pointer-events-none absolute right-0 bottom-0 flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 rotate-180 flex-none">
          <div className="relative size-[4px]">
            <CornerImg src={cornerMenuRight} />
          </div>
        </div>
      </div>
    </>
  );
}

export function CareersFramedTitle({
  children,
  frameSrc,
  frameClassName,
  gradientDeg,
  textClassName = "text-[46px] leading-[49px]",
  textTop = "top-[3.03px]",
  className = "",
  nodeId,
}: {
  children: React.ReactNode;
  frameSrc: string;
  frameClassName: string;
  gradientDeg: string;
  textClassName?: string;
  textTop?: string;
  className?: string;
  nodeId?: string;
}) {
  return (
    <div className={`relative ${className}`} data-node-id={nodeId}>
      <div className={`pointer-events-none absolute ${frameClassName}`}>
        <div className="absolute inset-[-0.85%_0]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src={frameSrc} aria-hidden />
        </div>
      </div>
      <div
        className={`${interMedium.className} absolute left-1/2 ${textTop} -translate-x-1/2 bg-clip-text text-center font-medium text-transparent not-italic whitespace-nowrap [word-break:break-word] ${textClassName}`}
        style={{
          backgroundImage: `linear-gradient(${gradientDeg}, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)`,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function CareersGradientCard({
  card,
  className = "",
  nodeId,
}: {
  card: CareersValueCard;
  className?: string;
  nodeId?: string;
}) {
  const titleClass =
    card.titleSize === "lg"
      ? "text-[28px] leading-[36px] tracking-[-0.28px]"
      : "text-[22px] leading-[28px]";

  return (
    <div
      className={`relative h-[260px] w-[425.999px] shrink-0 overflow-visible ${className}`}
      data-node-id={nodeId}
    >
      <div
        className="absolute inset-0 flex flex-col items-start justify-between p-[32px]"
        style={{ backgroundImage: CARD_GRADIENT_BG }}
      >
        <div className="relative size-[36px] shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={card.icon} />
        </div>
        <div className="flex w-full flex-col items-start gap-[10px]">
          <p
            className={`${interMedium.className} w-full font-medium text-white not-italic [word-break:break-word] ${titleClass}`}
          >
            {card.title}
          </p>
          <p
            className={`${interRegular.className} w-full text-[14px] leading-[1.4] font-normal text-white opacity-65 not-italic [word-break:break-word]`}
          >
            {card.description}
          </p>
        </div>
      </div>
      <GradientCardBottomCorners />
      <GradientCardTopCorners />
    </div>
  );
}

export function CareersGlassPanel({
  title,
  description,
  className = "",
  height = "h-[222px]",
  bodySize = "text-[16px] leading-[24px]",
  nodeId,
}: {
  title: string;
  description: string;
  className?: string;
  height?: string;
  bodySize?: string;
  nodeId?: string;
}) {
  return (
    <div className={`relative w-full ${className}`} data-node-id={nodeId}>
      <div
        className={`relative flex ${height} w-full items-start bg-[rgba(21,21,21,0.3)] ${BOX_BORDER_CLASS}`}
      >
        <div className="flex min-w-px flex-[1_0_0] flex-col gap-[10px] p-[32px]">
          <p
            className={`${interMedium.className} w-full text-[22px] leading-[28px] font-medium text-white not-italic [word-break:break-word]`}
          >
            {title}
          </p>
          <p
            className={`${interRegular.className} w-full font-normal text-white opacity-65 not-italic [word-break:break-word] ${bodySize}`}
          >
            {description}
          </p>
        </div>
        <GlassPanelCorners />
      </div>
    </div>
  );
}

export function CareersJobCard({
  title,
  category,
  location,
  nodeId,
}: {
  title: string;
  category: string;
  location: string;
  nodeId?: string;
}) {
  return (
    <article
      className={`relative h-[153px] w-full shrink-0 bg-black ${BOX_BORDER_CLASS}`}
      data-node-id={nodeId}
      data-name="Job Details"
    >
      <div className="absolute top-[19.34px] left-[calc(50%-492px)]">
        <TagBadge label={category} width={180} labelOffsetX={0} rightBarLeft={170.48} centerLabel />
      </div>
      <p
        className={`${interMedium.className} absolute top-[75px] left-[19px] text-[22px] leading-[28px] font-medium whitespace-nowrap text-white not-italic [word-break:break-word]`}
      >
        {title}
      </p>
      <p
        className={`${interRegular.className} absolute top-[105px] left-[19px] w-[350px] text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
      >
        {location}
      </p>
      <a
        href="#"
        className={`${interMedium.className} absolute top-[51px] right-[49px] flex h-[48px] items-center gap-[20px] bg-[rgba(226,241,202,0.12)] px-[20px] py-[10px] text-[16px] leading-[28px] font-medium whitespace-nowrap text-white uppercase not-italic ${BOX_BORDER_CLASS}`}
      >
        APPLY NOW
        <Image
          src="/careers/chevron-apply.svg"
          alt=""
          width={12}
          height={6}
          className="h-[6px] w-[12px] shrink-0"
          aria-hidden
        />
        <BoxCorners />
      </a>
    </article>
  );
}

export function CareersFilterField({ label, nodeId }: { label: string; nodeId?: string }) {
  return (
    <div
      className={`relative flex w-[200px] shrink-0 items-center ${BOX_BORDER_CLASS}`}
      data-node-id={nodeId}
    >
      <div className="flex h-[48px] min-w-px flex-[1_0_0] items-center gap-[10px] bg-transparent px-[20px]">
        <p
          className={`${interRegular.className} min-w-px flex-[1_0_0] text-[14px] leading-[1.4] font-normal text-white not-italic [word-break:break-word]`}
        >
          {label}
        </p>
        <Image
          src="/careers/chevron-down.svg"
          alt=""
          width={24}
          height={24}
          className="size-[24px] shrink-0"
          aria-hidden
        />
      </div>
      <BoxCorners />
    </div>
  );
}

const GREEN_CTA_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

export function CareersRolesProfileCta({ href = "#" }: { href?: string }) {
  return (
    <a
      href={href}
      data-node-id="2379:8941"
      data-name="Cta"
      className={`${interSemiBold.className} absolute top-[68px] left-[59.93px] block h-[48px] w-[231px] ${GREEN_CTA_SHADOW}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
      />
      <span className="absolute top-[calc(50%-8px)] left-[37.07px] text-[14px] leading-[normal] whitespace-nowrap text-white uppercase not-italic">
        SHARE YOUR PROFILE
      </span>
      <span className="pointer-events-none absolute top-1/2 left-[187.5px] size-[6px] -translate-y-1/2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/careers/cta-dot.svg"
          alt=""
          className="absolute inset-0 block size-full max-w-none"
          aria-hidden
        />
      </span>
      <RolesProfileCtaCorners />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
      />
    </a>
  );
}

export function CareersGreenCta({
  children,
  href = "#",
  width = "w-[231px]",
  textLeft = "left-[47.11px]",
  dotLeft = "left-[177.5px]",
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  width?: string;
  textLeft?: string;
  dotLeft?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`${interSemiBold.className} relative block h-[48px] shrink-0 ${GREEN_CTA_SHADOW} ${width} ${className}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
      />
      <span
        className={`absolute top-[calc(50%-8px)] ${textLeft} text-[14px] leading-[normal] whitespace-nowrap text-white uppercase not-italic`}
      >
        {children}
      </span>
      <span className={`pointer-events-none absolute top-1/2 ${dotLeft} size-[6px] -translate-y-1/2`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/careers/cta-dot.svg"
          alt=""
          className="absolute inset-0 block size-full max-w-none"
          aria-hidden
        />
      </span>
      <CtaCorners />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
      />
    </a>
  );
}

export function CareersWhiteCta({
  children,
  href = "#",
  width = "w-[170px]",
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  width?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`${interSemiBold.className} relative block h-[48px] shrink-0 shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)] ${width} ${className}`}
    >
      <span aria-hidden className="pointer-events-none absolute inset-0 bg-white" />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[length:307.2px_307.2px] bg-top-left opacity-40 mix-blend-plus-lighter"
        style={{ backgroundImage: "url(/careers/white-cta-texture.png)" }}
      />
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14px] leading-[normal] whitespace-nowrap text-[#121212] uppercase not-italic">
        {children}
      </span>
      <CtaCorners />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
      />
    </a>
  );
}

function RolesProfileCtaCorners() {
  return (
    <>
      <div className="pointer-events-none absolute top-0 right-0 flex size-[4px] items-center justify-center">
        <div className="rotate-180 flex-none">
          <div className="relative size-[4px]">
            <CornerImg src={cornerCtaRight} />
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute top-0 left-0 flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 flex-none">
          <div className="relative size-[4px]">
            <CornerImg src={cornerCtaLeft} />
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute right-0 bottom-0 flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 rotate-180 flex-none">
          <div className="relative size-[4px]">
            <CornerImg src={cornerCtaRight} />
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 size-[4px]">
        <CornerImg src={cornerCtaLeft} />
      </div>
    </>
  );
}

function CtaCorners() {
  return <RolesProfileCtaCorners />;
}

export { DNA_BG_GRADIENT, BOX_BORDER_CLASS as BOX_BORDER };
