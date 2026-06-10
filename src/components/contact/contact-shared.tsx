import Image from "next/image";
import { gilroyMedium, gilroySemiBold, interRegular } from "../hero/fonts";

const cornerLeft = "/hero/corner-tag-1.svg";
const cornerRight = "/hero/corner-tag-2.svg";
const cornerCtaLeft = "/hero/corner-tag-1.svg";
const cornerCtaRight = "/hero/corner-tag-2.svg";

export function CornerDecor({
  className = "",
}: {
  className?: string;
}) {
  return (
    <>
      <div
        className={`pointer-events-none absolute top-0 left-0 flex size-[4px] items-center justify-center ${className}`}
      >
        <div className="-scale-y-100 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                className="block size-full max-w-none"
                src={cornerLeft}
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute top-0 right-0 flex size-[4px] items-center justify-center">
        <div className="rotate-180 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                className="block size-full max-w-none"
                src={cornerRight}
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 size-[4px]">
        <div className="absolute inset-[0_0_-12.5%_-12.5%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className="block size-full max-w-none"
            src={cornerLeft}
            aria-hidden
          />
        </div>
      </div>
      <div className="pointer-events-none absolute right-0 bottom-0 flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 rotate-180 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                className="block size-full max-w-none"
                src={cornerRight}
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function GradientTitle({
  children,
  className = "",
  gradientDeg = "100.689deg",
  nodeId,
}: {
  children: React.ReactNode;
  className?: string;
  gradientDeg?: string;
  nodeId?: string;
}) {
  return (
    <div
      className={`${gilroyMedium.className} relative shrink-0 bg-clip-text text-[46px] leading-[49px] font-medium text-transparent not-italic [word-break:break-word] ${className}`}
      style={{
        backgroundImage: `linear-gradient(${gradientDeg}, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
      }}
      data-node-id={nodeId}
    >
      {children}
    </div>
  );
}

function CtaSpinner() {
  return (
    <span
      className="relative size-[18px] shrink-0 animate-spin rounded-full border-2 border-white/30 border-t-white"
      aria-hidden
    />
  );
}

export function GreenCtaButton({
  children,
  className = "",
  width,
  href = "#",
  onClick,
  disabled = false,
  loading = false,
}: {
  children: React.ReactNode;
  className?: string;
  width?: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}) {
  const sharedClassName = `${gilroySemiBold.className} relative block h-[48px] shrink-0 shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)] disabled:cursor-not-allowed disabled:opacity-70 ${className}`;
  const sharedStyle = width ? { width } : undefined;
  const content = (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
      />
      <span className="relative flex h-full items-center justify-center gap-[10px] text-[14px] leading-[normal] whitespace-nowrap text-white uppercase not-italic">
        {loading ? <CtaSpinner /> : null}
        {loading ? "Loading..." : children}
      </span>
      <CtaCorners />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
      />
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled || loading}
        aria-busy={loading}
        className={sharedClassName}
        style={sharedStyle}
      >
        {content}
      </button>
    );
  }

  return (
    <a href={href} className={sharedClassName} style={sharedStyle}>
      {content}
    </a>
  );
}

export function WhiteCtaButton({
  children,
  className = "",
  href = "#",
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
}) {
  return (
    <a
      href={href}
      className={`${gilroySemiBold.className} relative block h-[48px] shrink-0 shadow-[0px_24.721px_16.129px_rgba(255,255,255,0.15),0px_10.268px_6.699px_rgba(255,255,255,0.15),0px_3.714px_2.423px_rgba(255,255,255,0.1)] ${className}`}
    >
      <span aria-hidden className="pointer-events-none absolute inset-0 bg-white" />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[length:307.2px_307.2px] bg-top-left opacity-[0.35]"
        style={{ backgroundImage: "url(/contact/cta-texture.png)" }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(255,255,255,0.6)]"
      />
      <span className="absolute top-1/2 left-[31px] flex -translate-y-1/2 items-center gap-[8px] text-[14px] leading-[normal] whitespace-nowrap text-[#151515] uppercase not-italic">
        {children}
      </span>
    </a>
  );
}

function CtaCorners() {
  return (
    <>
      <div className="pointer-events-none absolute top-0 right-0 flex size-[4px] items-center justify-center">
        <div className="rotate-180 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="block size-full max-w-none" src={cornerCtaRight} aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute top-0 left-0 flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="block size-full max-w-none" src={cornerCtaLeft} aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute right-0 bottom-0 flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 rotate-180 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="block size-full max-w-none" src={cornerCtaRight} aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 size-[4px]">
        <div className="absolute inset-[0_0_-12.5%_-12.5%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src={cornerCtaLeft} aria-hidden />
        </div>
      </div>
    </>
  );
}

export function FramedBox({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] ${className}`}>
      <CornerDecor />
      {children}
    </div>
  );
}

export function LocationIcon() {
  return (
    <Image
      src="/contact/location-icon.svg"
      alt=""
      width={32}
      height={32}
      className="size-[32px] shrink-0"
      aria-hidden
    />
  );
}
