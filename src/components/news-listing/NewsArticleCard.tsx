import Image from "next/image";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { TagBadge } from "../hero/TagBadge";
import { Corners } from "../shared/Corners";
import { type NewsArticle } from "./news-data";

export function NewsArticleCard({
  article,
  bgClass,
}: {
  article: NewsArticle;
  bgClass: string;
}) {
  const { nodeId, category, title, titleFontSize = 22, excerpt, imageOverlaySrc, href } =
    article;

  return (
    <a
      href={href || "#"}
      className={`group relative block w-full min-[1024px]:w-[388px] shrink-0 overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] px-[12px] pt-[9px] min-[1024px]:pt-[12px] pb-[24px] [--tag-w:129px] min-[1024px]:[--tag-w:180px] [--tag-rb:120.48px] min-[1024px]:[--tag-rb:170.48046875px] transition-colors duration-300 hover:border-[#a8ed90] hover:bg-[rgba(68,120,7,0.2)] cursor-pointer ${bgClass}`}
      data-node-id={nodeId}
      data-name="Article"
    >
      <div className="flex flex-col items-center gap-[20px]">
      <div
        className="relative h-[244px] min-[1024px]:h-[259.161px] w-full min-[1024px]:w-[356px] shrink-0 overflow-clip"
        data-name="Image"
      >
        {imageOverlaySrc ? (
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
        ) : null}
      </div>

      <div className="flex w-full flex-col gap-[20px]">
        <TagBadge
          label={category}
          width={180}
          labelOffsetX={0.5}
          rightBarLeft={170.48046875}
          centerLabel
          labelClassName="text-[12px] leading-[19.5px] tracking-[-0.36px] min-[1024px]:text-[13px] min-[1024px]:tracking-[-0.39px]"
        />

        <div className="flex flex-col gap-[10px]">
          <h3
            className={`${gilroyMedium.className} w-full font-medium text-white not-italic [word-break:break-word] text-[16px] leading-[18px] min-[1024px]:text-[length:var(--card-tfs)] min-[1024px]:leading-[var(--card-tlh)]`}
            style={{ "--card-tfs": `${titleFontSize}px`, "--card-tlh": "28px" } as React.CSSProperties}
          >
            {title}
          </h3>
          <p
            className={`${interRegular.className} w-full min-[1024px]:w-[346.611px] text-[14px] leading-[21px] min-[1024px]:text-[16px] min-[1024px]:leading-[24px] font-normal not-italic [word-break:break-word]`}
          >
            <span className="text-[rgba(240,240,240,0.6)]">{excerpt}</span>
            <span className="text-[#53d824] transition-opacity group-hover:opacity-80">
              read more
            </span>
          </p>
        </div>
      </div>

      <Corners />
      </div>
    </a>
  );
}
