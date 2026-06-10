import Image from "next/image";
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
  cornerBottom,
  category,
  categoryOffsetX,
  centerCategory,
  title,
  excerpt,
  excerptWidth,
  imageSrc,
  imageClassName = "absolute inset-0 size-full max-w-none object-cover",
}: CompanyArticleCardCompactProps) {
  return (
    <article
      className="relative w-[590px] shrink-0 overflow-clip bg-[rgba(255,255,255,0.04)]"
      style={{ height }}
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
        className="absolute left-[24px] flex h-[132px] w-[542px] flex-col"
        style={{ top: newsSectionTop }}
        data-name="NewsSection"
      >
        <TagBadge
          label={category}
          width={180}
          labelOffsetX={categoryOffsetX}
          rightBarLeft={170.48046875}
          centerLabel={centerCategory}
        />

        <div className="mt-[20px] flex flex-col">
          <h3
            className={`${gilroyMedium.className} w-[353.684px] text-[22px] leading-[28px] font-medium text-white not-italic [word-break:break-word]`}
          >
            {title}
          </h3>
          <p
            className={`${interRegular.className} mt-[10px] text-[16px] leading-[24px] font-normal text-[rgba(240,240,240,0.8)] not-italic [word-break:break-word]`}
            style={{ width: excerptWidth }}
          >
            {excerpt}
          </p>
        </div>
      </div>

      <CompanyArticleCorners cornerBottom={cornerBottom} />
    </article>
  );
}
