import Image from "next/image";
import Link from "next/link";
import { TagBadge } from "../hero/TagBadge";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { CompanyArticleCorners } from "./CompanyArticleCorners";
import type { CompanyCompactArticle } from "./company-articles-data";

type CompanyArticleCardCompactProps = CompanyCompactArticle;

export function CompanyArticleCardCompact({
  nodeId,
  height,
  imageHeight,
  newsSectionTop,
  category,
  categoryOffsetX,
  centerCategory,
  title,
  excerpt,
  excerptWidth,
  imageSrc,
  imageClassName = "absolute inset-0 size-full max-w-none object-cover",
  link,
}: CompanyArticleCardCompactProps) {
  return (
    <Link
      href={link || "#"}
      className="relative flex flex-col w-[590px] shrink-0 border-[0.5px] border-solid border-[rgba(240,240,240,0.3)] bg-[rgba(0,0,0,0.5)] transition-transform hover:scale-[1.01] cursor-pointer p-[12px_10px_16px_10px]"
      style={{ minHeight: height }}
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
        className="flex flex-col w-full px-[14px] pt-[18px]"
        data-name="NewsSection"
      >
        <TagBadge
          label={category}
          width={180}
          labelOffsetX={categoryOffsetX}
          rightBarLeft={170.48046875}
          centerLabel={centerCategory}
        />

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
