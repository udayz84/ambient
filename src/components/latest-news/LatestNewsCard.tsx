import Image from "next/image";
import Link from "next/link";
import { TagBadge } from "../hero/TagBadge";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import type { LatestNewsArticle } from "./latest-news-data";

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
  href,
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
          {imageSrc ? (
            /\.(mp4|webm)$/i.test(imageSrc) ? (
              <video
                src={imageSrc}
                autoPlay
                loop
                muted
                playsInline
                className={imageClassName}
              />
            ) : (
              <Image
                src={imageSrc}
                alt=""
                fill
                className={imageClassName}
                sizes={imageSizes}
                unoptimized={imageSrc.startsWith("/")}
              />
            )
          ) : null}
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
          centerLabel={categoryOffsetX === 0 || category === "TECHNICAL INSIGHT"}
        />

        <h3
          className={`${gilroyMedium.className} w-[353.684px] shrink-0 text-[22px] leading-[28px] font-medium text-white not-italic [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden`}
        >
          {title}
        </h3>

        <p
          className={`${interRegular.className} w-[346.611px] shrink-0 text-[16px] leading-[24px] font-normal not-italic [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden`}
        >
          <span className="text-[rgba(240,240,240,0.8)]">{excerpt}</span>{" "}
          <Link href={href} className="text-[#53d824] transition-colors hover:text-[#6ced3f]">
            read more
          </Link>
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
            className={`${interRegular.className} text-[14px] leading-[21px] font-normal whitespace-nowrap text-[#99a1af] not-italic overflow-hidden text-ellipsis`}
          >
            {date}
          </p>
        </div>
      </div>

      <Corners className="z-[3]" />
    </article>
  );
}

