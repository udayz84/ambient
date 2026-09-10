import Image from "next/image";
import { TagBadge } from "../hero/TagBadge";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { type ResourceArticle } from "./resources-data";

const frameCornerLeft = "/hero/vector-57.svg";
const frameCornerRight = "/hero/vector-55.svg";

type ResourcesArticleCardProps = ResourceArticle;

export function ResourcesArticleCard({
  nodeId,
  category,
  categoryOffsetX,
  centerCategory,
  title,
  titleFontSize = 22,
  excerpt,
  imageOverlaySrc,
  imageSrc,
  href = "#",
}: ResourcesArticleCardProps) {
  return (
    <a
      href={href}
      className="group relative block h-full w-[388px] shrink-0 overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-black px-[12px] pt-[12px] pb-[24px] hover:border-[#53d824]/50 transition-colors cursor-pointer"
      data-node-id={nodeId}
    >
      <div className="flex flex-col items-center gap-[20px]">
      <div
        className="relative h-[259.161px] w-[356px] shrink-0 overflow-clip"
        data-name="Image"
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt=""
            width={356}
            height={259}
            className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
            unoptimized
          />
        ) : null}
        {imageOverlaySrc ? (
          <div className="absolute top-[0.41px] left-0 h-[258.753px] w-[356.446px]">
            <Image
              src={imageOverlaySrc}
              alt=""
              width={356}
              height={259}
              className="pointer-events-none absolute inset-0 size-full max-w-none object-contain"
              unoptimized
            />
          </div>
        ) : null}
      </div>

      <div className="flex w-full flex-col gap-[20px] px-0">
        <TagBadge
          label={category}
          width={180}
          labelOffsetX={categoryOffsetX}
          rightBarLeft={170.48046875}
          centerLabel={centerCategory}
        />

        <div className="flex flex-col gap-[10px]">
          <h3
            className={`${gilroyMedium.className} w-full font-medium text-white not-italic [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden`}
            style={{
              fontSize: titleFontSize,
              lineHeight: "28px",
            }}
          >
            {title}
          </h3>
          <p
            className={`${interRegular.className} w-[346.611px] text-[16px] leading-[24px] font-normal not-italic [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden`}
          >
            <span className="text-[rgba(240,240,240,0.6)]">
              {excerpt}
            </span>
            {" "}
            <span className="text-[#53d824] transition-opacity group-hover:opacity-80">read more</span>
          </p>
        </div>
      </div>

      <ArticleCorner className="absolute top-0 left-0" src={frameCornerLeft} flipY />
      <ArticleCorner className="absolute top-0 right-0" src={frameCornerRight} rotate />
      <ArticleCorner className="absolute right-0 bottom-0" src={frameCornerRight} rotate flipY />
      <ArticleCorner className="absolute bottom-0 left-0" src={frameCornerLeft} />
      </div>
    </a>
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
  return (
    <div className={`flex size-[4px] items-center justify-center ${className}`}>
      <div
        className={`relative size-[4px] flex-none ${flipY ? "-scale-y-100" : ""} ${rotate ? "rotate-180" : ""}`}
      >
        <Image src={src} alt="" fill className="object-contain" aria-hidden />
      </div>
    </div>
  );
}

