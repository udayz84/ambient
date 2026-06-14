import Image from "next/image";
import { TagBadge } from "../hero/TagBadge";
import { gilroyMedium, interRegular } from "../hero/fonts";
import type { LatestNewsArticle } from "./latest-news-data";

const cornerTopLeft = "/hero/corner-tag-1.svg";
const cornerTopRight = "/hero/corner-tag-2.svg";

type LatestNewsCardProps = LatestNewsArticle;

export function LatestNewsCard({
  nodeId,
  category,
  categoryOffsetX,
  title,
  excerpt,
  date,
  imageSrc,
  imageClassName = "absolute inset-0 size-full max-w-none object-cover",
  imageSizes = "386px",
}: LatestNewsCardProps) {
  return (
    <article
      className="relative flex h-[530px] w-[388px] shrink-0 flex-col items-center justify-between overflow-clip bg-[rgba(255,255,255,0.04)] py-px"
      data-node-id={nodeId}
      data-name="Article"
    >
      <div className="pointer-events-none absolute inset-0 z-[2]" aria-hidden>
        <Image
          src="/latest-news/article-frame-border.svg"
          alt=""
          fill
          className="object-fill"
          sizes="388px"
        />
      </div>

      <div
        className="relative mb-[-1.263px] h-[229.263px] w-[386px] shrink-0 overflow-clip"
        data-name="NewsSection"
      >
        <div className="absolute top-[-0.09px] left-0 h-[229px] w-[386px] overflow-hidden">
          <Image
            src={imageSrc}
            alt=""
            fill
            className={imageClassName}
            sizes={imageSizes}
          />
        </div>
        <div
          className="absolute top-[-0.09px] left-0 h-[229px] w-[386px] bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-[rgba(0,0,0,0)]"
          aria-hidden
        />
      </div>

      <div className="relative flex h-[300px] w-[368px] shrink-0 flex-col items-start justify-between px-[12px] py-[18px]">
        <TagBadge
          label={category}
          width={180}
          labelOffsetX={categoryOffsetX}
          rightBarLeft={170.48046875}
          centerLabel={category === "TECHNICAL INSIGHT"}
        />

        <h3
          className={`${gilroyMedium.className} w-[353.684px] shrink-0 text-[22px] leading-[28px] font-medium text-white not-italic [word-break:break-word]`}
        >
          {title}
        </h3>

        <p
          className={`${interRegular.className} w-[346.611px] shrink-0 text-[16px] leading-[24px] font-normal not-italic [word-break:break-word]`}
        >
          <span className="text-[rgba(240,240,240,0.8)]">{excerpt}</span>
          <span className="text-[#53d824]">read more</span>
        </p>

        <div className="flex h-[20.211px] w-[359.076px] shrink-0 items-center gap-[8.084px]">
          <div className="relative size-[16.168px] shrink-0">
            <Image
              src="/latest-news/calendar-icon.svg"
              alt=""
              width={16}
              height={16}
              className="block size-full max-w-none"
              aria-hidden
            />
          </div>
          <p
            className={`${interRegular.className} text-[14px] leading-[21px] font-normal whitespace-nowrap text-[#99a1af] not-italic`}
          >
            {date}
          </p>
        </div>
      </div>

      <ArticleCorner
        className="absolute top-0 left-0 z-[3] flex size-[4px] items-center justify-center"
        src={cornerTopLeft}
        flipY
      />
      <ArticleCorner
        className="absolute top-0 right-0 z-[3] flex size-[4px] items-center justify-center"
        src={cornerTopRight}
        rotate
      />
      <ArticleCorner
        className="absolute right-0 bottom-0 z-[3] flex size-[4px] items-center justify-center"
        src={cornerTopRight}
        rotate
        flipY
      />
      <div className="absolute bottom-0 left-0 z-[3] size-[4px]">
        <Image
          src={cornerTopLeft}
          alt=""
          width={4}
          height={4}
          className="block size-full max-w-none"
          aria-hidden
        />
      </div>
    </article>
  );
}

function ArticleCorner({
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
  const inner = (
    <div className="relative size-[4px]">
      <div className="absolute inset-[0_0_-12.5%_-12.5%]">
        <Image
          src={src}
          alt=""
          width={4}
          height={4}
          className="block size-full max-w-none"
          aria-hidden
        />
      </div>
    </div>
  );

  return (
    <div className={className}>
      <div
        className={`flex-none ${flipY ? "-scale-y-100" : ""} ${rotate ? "rotate-180" : ""}`}
      >
        {inner}
      </div>
    </div>
  );
}
