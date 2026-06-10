import Image from "next/image";
import { dmMono, gilroyMedium, interRegular } from "../hero/fonts";
import { CompanyArticleCorners } from "./CompanyArticleCorners";
import type { CompanyFeaturedArticle } from "./company-articles-data";

const cornerLeft = "/hero/vector-57.svg";
const cornerRight = "/hero/vector-55.svg";

type CompanyArticleCardFeaturedProps = CompanyFeaturedArticle;

export function CompanyArticleCardFeatured({
  nodeId,
  category,
  title,
  excerpt,
  metadata,
  imageSrc,
  imageHeight,
  imageClassName = "absolute inset-0 size-full max-w-none object-cover",
}: CompanyArticleCardFeaturedProps) {
  return (
    <article
      className="relative h-[692px] w-[590px] shrink-0 overflow-clip bg-[rgba(255,255,255,0.04)]"
      data-node-id={nodeId}
      data-name="Article"
    >
      <div
        className="absolute top-[12px] left-[10px] w-[570px] overflow-hidden"
        style={{ height: imageHeight }}
        data-name="Image 2"
      >
        <Image
          src={imageSrc}
          alt=""
          width={570}
          height={imageHeight}
          className={imageClassName}
          unoptimized
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-[rgba(0,0,0,0)]"
          aria-hidden
        />
      </div>

      <div
        className="absolute top-[440px] left-[24px] flex w-[542px] flex-col"
        data-name="NewsSection"
      >
        <CompanyArticleGreenBadge label={category} />

        <h3
          className={`${gilroyMedium.className} mt-[20px] w-[542px] text-[22px] leading-[28px] font-medium text-white not-italic [word-break:break-word]`}
        >
          {title}
        </h3>

        <p
          className={`${interRegular.className} mt-[10px] w-[542px] text-[16px] leading-[24px] font-normal text-[rgba(240,240,240,0.8)] not-italic [word-break:break-word]`}
        >
          {excerpt}
        </p>

        <div className="mt-[20px] flex flex-wrap items-center gap-x-[10px] gap-y-[4px]">
          <MetadataItem>{metadata.date}</MetadataItem>
          <MetadataItem>{metadata.totalFunding}</MetadataItem>
          <MetadataItem>{metadata.fundingRounds}</MetadataItem>
        </div>
      </div>

      <CompanyArticleCorners cornerBottom={688} />
    </article>
  );
}

function CompanyArticleGreenBadge({ label }: { label: string }) {
  return (
    <div
      className={`${dmMono.className} relative h-[26px] w-[180px] shrink-0 overflow-clip bg-[rgba(255,255,255,0.06)]`}
      data-name="Menu"
    >
      <Corner className="absolute top-0 left-0" src={cornerLeft} flipY />
      <Corner className="absolute top-0 right-0" src={cornerRight} rotate />
      <Corner className="absolute bottom-0 left-0" src={cornerLeft} />
      <Corner
        className="absolute right-0 bottom-0"
        src={cornerRight}
        rotate
        flipY
      />
      <p className="absolute top-[calc(50%-4.5px)] left-1/2 -translate-x-1/2 text-[13px] leading-[19.5px] font-normal tracking-[-0.39px] whitespace-nowrap text-[#53d824] uppercase not-italic">
        {label}
      </p>
      <div className="absolute top-1/2 left-[6.48px] h-[12px] w-[2px] -translate-y-1/2 bg-[#53d824]" />
      <div className="absolute top-1/2 right-[9.52px] h-[12px] w-[2px] -translate-y-1/2 bg-[#53d824]" />
    </div>
  );
}

function MetadataItem({ children }: { children: string }) {
  return (
    <span
      className={`${interRegular.className} inline-flex items-center gap-[10px] text-[14px] leading-[21px] font-normal whitespace-nowrap text-[#99a1af] not-italic`}
    >
      <span className="text-[#53d824]" aria-hidden>
        |
      </span>
      {children}
    </span>
  );
}

function Corner({
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
