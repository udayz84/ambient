import Image from "next/image";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { TagBadge } from "../hero/TagBadge";
import { CompanyArticleCorners } from "../company/CompanyArticleCorners";
import { NEWS_ARTICLE_IMAGE_BASE, type NewsArticle } from "./news-data";

export function NewsArticleCard({
  article,
  bgClass,
}: {
  article: NewsArticle;
  bgClass: string;
}) {
  const { nodeId, category, title, titleFontSize = 22, excerpt, imageOverlaySrc } =
    article;

  return (
    <article
      className={`relative flex w-full min-[1024px]:w-[388px] shrink-0 flex-col items-center gap-[20px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] px-[12px] pt-[12px] pb-[24px] ${bgClass}`}
      data-node-id={nodeId}
      data-name="Article"
    >
      <div
        className="relative h-[200px] min-[1024px]:h-[259.161px] w-full min-[1024px]:w-[356px] shrink-0 overflow-clip"
        data-name="Image"
      >
        <Image
          src={NEWS_ARTICLE_IMAGE_BASE}
          alt=""
          fill
          sizes="356px"
          className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
          unoptimized
        />
        <div className="absolute left-0 top-[0.41px] h-full min-[1024px]:h-[258.753px] w-full min-[1024px]:w-[356.446px]">
          <Image
            src={imageOverlaySrc}
            alt=""
            fill
            sizes="356px"
            className="pointer-events-none absolute inset-0 size-full max-w-none object-contain"
            unoptimized
          />
        </div>
      </div>

      <div className="flex w-full flex-col gap-[20px]">
        <TagBadge
          label={category}
          width={180}
          labelOffsetX={0.5}
          rightBarLeft={170.48046875}
          centerLabel
        />

        <div className="flex flex-col gap-[10px]">
          <h3
            className={`${gilroyMedium.className} w-full font-medium text-white not-italic [word-break:break-word]`}
            style={{ fontSize: titleFontSize, lineHeight: "28px" }}
          >
            {title}
          </h3>
          <p
            className={`${interRegular.className} w-full min-[1024px]:w-[346.611px] text-[16px] leading-[24px] font-normal not-italic [word-break:break-word]`}
          >
            <span className="text-[rgba(240,240,240,0.6)]">{excerpt}</span>
            <a href="#" className="text-[#53d824] transition-opacity hover:opacity-80">
              read more
            </a>
          </p>
        </div>
      </div>

      <CompanyArticleCorners />
    </article>
  );
}
