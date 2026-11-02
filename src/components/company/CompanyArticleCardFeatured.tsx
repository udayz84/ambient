import Image from "next/image";
import Link from "next/link";
import { dmMono, gilroyMedium, interRegular } from "../hero/fonts";
import { CompanyArticleCorners } from "./CompanyArticleCorners";
import type { CompanyFeaturedArticle } from "./company-articles-data";
import { Corners } from "../shared/Corners";

const cornerLeft = "/hero/vector-57.svg";
const cornerRight = "/hero/vector-55.svg";

type CompanyArticleCardFeaturedProps = CompanyFeaturedArticle;

export function CompanyArticleCardFeatured({
  nodeId,
  category,
  title,
  excerpt,
  imageSrc,
  imageHeight,
  imageClassName = "absolute inset-0 size-full max-w-none object-cover",
  link,
}: CompanyArticleCardFeaturedProps) {
  return (
    <Link
      href={link || "#"}
      className="relative flex flex-col justify-between w-[590px] shrink-0 border-[0.5px] border-solid border-[rgba(240,240,240,0.3)] bg-[rgba(0,0,0,0.5)] transition-transform hover:scale-[1.01] cursor-pointer p-[12px_10px_16px_10px]"
      data-node-id={nodeId}
      data-name="Article"
    >
      <div
        className="relative w-[570px] shrink-0 overflow-hidden"
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
        className="flex flex-1 flex-col w-full px-[14px] pt-[18px]"
        data-name="NewsSection"
      >
        <CompanyArticleGreenBadge label={category} />

        <div className="mt-[18px] flex flex-col">
          <h3
            className={`${gilroyMedium.className} w-full text-[22px] leading-[28px] font-medium text-white not-italic [word-break:break-word]`}
          >
            {title}
          </h3>

          <p
            className={`${interRegular.className} mt-[10px] w-full text-[16px] leading-[24px] font-normal text-[rgba(240,240,240,0.6)] not-italic [word-break:break-word]`}
          >
            {excerpt}
          </p>
        </div>
      </div>

      <CompanyArticleCorners />
    </Link>
  );
}

function CompanyArticleGreenBadge({ label }: { label: string }) {
  return (
    <div
      className={`${dmMono.className} relative h-[26px] w-[180px] shrink-0 overflow-hidden border-[0.5px] border-solid border-[rgba(240,240,240,0.3)] bg-[rgba(255,255,255,0.06)]`}
      data-name="Menu"
    >
      <Corners leftSrc={cornerLeft} rightSrc={cornerRight} />
      <p className="absolute top-[calc(50%-4.5px)] left-1/2 max-w-[calc(100%-16px)] -translate-x-1/2 overflow-hidden text-ellipsis text-[13px] leading-[19.5px] font-normal tracking-[-0.39px] whitespace-nowrap text-[#53d824] uppercase not-italic [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
        {label}
      </p>
      <div className="absolute top-1/2 left-[6.48px] h-[12px] w-[2px] -translate-y-1/2 bg-[#53d824]" />
      <div className="absolute top-1/2 right-[9.52px] h-[12px] w-[2px] -translate-y-1/2 bg-[#53d824]" />
    </div>
  );
}
