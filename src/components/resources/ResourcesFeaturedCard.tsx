import Image from "next/image";
import { dmMono, interMedium, interRegular } from "../hero/fonts";
import { GreenCtaButton } from "../contact/contact-shared";
import type { ResourceFeaturedCard } from "./resources-data";

const badgeCornerTl = "/resources/badge-corner-tl.svg";
const badgeCornerTr = "/resources/badge-corner-tr.svg";
const cardCornerLeft = "/hero/vector-57.svg";
const cardCornerRight = "/hero/vector-55.svg";

type ResourcesFeaturedCardProps = ResourceFeaturedCard;

export function ResourcesFeaturedCard({
  nodeId,
  imageNodeId,
  imageWidth,
  imageSrc,
  imageClassName,
  badgeNodeId,
  badgeLabel,
  badgeVariant,
}: ResourcesFeaturedCardProps) {
  return (
    <article
      className="relative flex min-w-px flex-[1_0_0] flex-col gap-[8px] overflow-clip border-[0.5px] border-solid border-[rgba(255,255,255,0.3)] bg-[#191919] p-[10px]"
      data-node-id={nodeId}
    >
      <div
        className="relative flex h-[281px] shrink-0 flex-col items-end overflow-clip p-[12px]"
        style={{ width: imageWidth }}
        data-node-id={imageNodeId}
        data-name="Image"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className={imageClassName} src={imageSrc} />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(25,25,25,0)] from-[79.181%] to-[#191919]" />
        </div>
        <WhitepaperBadge
          nodeId={badgeNodeId}
          label={badgeLabel}
          variant={badgeVariant}
        />
      </div>

      <div className="flex w-full flex-col gap-[24px] p-[16px]">
        <div className="flex flex-col gap-[12px]">
          <h3
            className={`${interMedium.className} w-[290px] text-[22px] leading-[28px] font-medium text-white opacity-90 not-italic [word-break:break-word]`}
          >
            Re-architecting the Physics of AI Compute.
          </h3>
          <p
            className={`${interRegular.className} text-[14px] leading-[21px] font-normal text-[#a4a4a4] opacity-90 not-italic [word-break:break-word]`}
          >
            Standard chips waste time translating AI workloads. Our architecture
            processes matrix math natively for high-density performance.
          </p>
        </div>
        <GreenCtaButton className="w-[231px]" href="#">
          Download PDF
        </GreenCtaButton>
      </div>

      <CardCorner className="absolute top-0 left-0" src={cardCornerLeft} flipY />
      <CardCorner className="absolute top-0 right-0" src={cardCornerRight} rotate />
      <CardCorner className="absolute bottom-0 left-0" src={cardCornerLeft} />
      <CardCorner
        className="absolute right-0 bottom-0"
        src={cardCornerRight}
        rotate
        flipY
      />
    </article>
  );
}

function WhitepaperBadge({
  nodeId,
  label,
  variant,
}: {
  nodeId: string;
  label: string;
  variant: "white" | "stacked";
}) {
  if (variant === "stacked") {
    return (
      <div
        className={`${dmMono.className} relative h-[26px] w-[140px] shrink-0 overflow-clip bg-[rgba(255,255,255,0.79)]`}
        data-node-id="2379:2025"
        data-name="Menu"
      >
        <BadgeCorners />
        <div
          className={`${dmMono.className} absolute top-1/2 left-1/2 h-[26px] w-[140px] -translate-x-1/2 -translate-y-1/2 overflow-clip bg-white`}
          data-node-id={nodeId}
          data-name="Menu"
        >
          <BadgeCorners />
          <p
            className="absolute top-[calc(50%-4.5px)] left-1/2 -translate-x-1/2 text-center text-[13px] leading-[19.5px] font-normal whitespace-nowrap text-black uppercase not-italic [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]"
            data-node-id="2379:2035"
          >
            {label}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${dmMono.className} relative h-[26px] w-[140px] shrink-0 overflow-clip bg-white`}
      data-node-id={nodeId}
      data-name="Menu"
    >
      <BadgeCorners />
      <p
        className="absolute top-[calc(50%-4.5px)] left-1/2 -translate-x-1/2 text-center text-[13px] leading-[19.5px] font-normal whitespace-nowrap text-black uppercase not-italic [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]"
        data-node-id="2379:1976"
      >
        {label}
      </p>
    </div>
  );
}

function BadgeCorners() {
  return (
    <>
      <div className="absolute top-0 left-0 flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="block size-full max-w-none" src={badgeCornerTl} aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 flex size-[4px] items-center justify-center">
        <div className="flex-none rotate-180">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="block size-full max-w-none" src={badgeCornerTr} aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 size-[4px]">
        <div className="absolute inset-[0_0_-12.5%_-12.5%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src={badgeCornerTl} aria-hidden />
        </div>
      </div>
      <div className="absolute right-0 bottom-0 flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 flex-none rotate-180">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="block size-full max-w-none" src={badgeCornerTr} aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function CardCorner({
  className,
  src,
  flipY,
  rotate,
}: {
  className: string;
  src: string;
  flipY?: boolean;
  rotate?: boolean;
}) {
  return (
    <div className={`flex size-[4px] items-center justify-center ${className}`}>
      <div
        className={`flex-none ${flipY ? "-scale-y-100" : ""} ${rotate ? "rotate-180" : ""}`}
      >
        <div className="relative size-[4px]">
          <div className="absolute inset-[0_0_-12.5%_-12.5%]">
            <Image src={src} alt="" width={4} height={4} aria-hidden />
          </div>
        </div>
      </div>
    </div>
  );
}
