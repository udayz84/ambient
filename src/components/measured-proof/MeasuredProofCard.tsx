import Image from "next/image";
import { gilroyMedium, interRegular } from "../hero/fonts";

type MeasuredProofCardProps = {
  metric: string;
  label: string;
  description: string;
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  imageTop: number;
  imageClassName?: string;
  imageSizes?: string;
  statWidth: number;
  descriptionWidth: number;
  descriptionBottom?: number;
  statJustifyEnd?: boolean;
  nodeId: string;
};

export function MeasuredProofCard({
  metric,
  label,
  description,
  imageSrc,
  imageWidth,
  imageHeight,
  imageTop,
  imageClassName = "absolute inset-0 max-w-none object-cover",
  imageSizes = "332px",
  statWidth,
  descriptionWidth,
  descriptionBottom = 110.5,
  statJustifyEnd = false,
  nodeId,
}: MeasuredProofCardProps) {
  return (
    <div
      className="relative h-[600px] w-[388px] shrink-0 overflow-clip border-[0.5px] border-solid border-[rgba(255,255,255,0.1)] max-[1023px]:border max-[1023px]:border-white/20 backdrop-blur-[12px] bg-black/40"
      data-node-id={nodeId}
      data-name="Lower power consumption"
    >
      <div
        className="pointer-events-none absolute inset-0"
        data-name="Cornor Elements"
      >
        <Image
          src="/measured-proof/corner-elements.svg"
          alt=""
          fill
          className="object-contain p-[1px]"
          aria-hidden
        />
      </div>

      <div
        className="absolute left-1/2 -translate-x-1/2 shadow-[0px_20px_20px_0px_rgba(9,38,6,0.25)] max-[1023px]:shadow-none"
        style={{ top: imageTop, width: imageWidth, height: imageHeight }}
      >
        <div className="pointer-events-none absolute inset-0">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt=""
              fill
              className={imageClassName}
              sizes={imageSizes}
            />
          ) : null}
        </div>
      </div>

      <p
        className={`${interRegular.className} absolute left-[30px] text-[18px] leading-[27px] font-normal text-white opacity-90 [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden not-italic`}
        style={{
          bottom: descriptionBottom,
          width: descriptionWidth,
          transform: "translateY(100%)",
        }}
      >
        {description}
      </p>

      <div
        className={`absolute top-[30px] left-[30px] flex flex-col items-start gap-[12px] ${statJustifyEnd ? "justify-end" : ""}`}
        style={{ width: statWidth }}
      >
        <p
          className={`${gilroyMedium.className} shrink-0 text-[68px] leading-[72px] font-medium whitespace-nowrap text-white [word-break:break-word] not-italic`}
        >
          {metric}
        </p>
        <p
          className={`${interRegular.className} max-w-full shrink-0 text-[18px] leading-[27px] font-normal whitespace-nowrap text-[#f0f0f0] overflow-hidden text-ellipsis [word-break:break-word] not-italic`}
        >
          {label}
        </p>
        <div className="relative h-0 w-[151.832px] shrink-0">
          <div className="absolute inset-[-1px_0_0_0]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async"
              src="/measured-proof/line-88.svg"
              alt=""
              className="block size-full max-w-none"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </div>
  );
}
