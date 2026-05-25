import Image from "next/image";

const cornerTopLeft = "/hero/corner-tag-1.svg";
const cornerTopRight = "/hero/corner-tag-2.svg";

type CompanyArticleCornersProps = {
  cornerBottom: number;
};

export function CompanyArticleCorners({
  cornerBottom,
}: CompanyArticleCornersProps) {
  return (
    <>
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
        className="absolute right-0 z-[3] flex size-[4px] items-center justify-center"
        style={{ top: cornerBottom }}
        src={cornerTopRight}
        rotate
        flipY
      />
      <div
        className="absolute left-0 z-[3] size-[4px]"
        style={{ top: cornerBottom }}
      >
        <Image
          src={cornerTopLeft}
          alt=""
          width={4}
          height={4}
          className="block size-full max-w-none"
          aria-hidden
        />
      </div>
    </>
  );
}

function ArticleCorner({
  className,
  src,
  flipY,
  rotate,
  style,
}: {
  className: string;
  src: string;
  flipY?: boolean;
  rotate?: boolean;
  style?: React.CSSProperties;
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
    <div className={className} style={style}>
      <div
        className={`flex-none ${flipY ? "-scale-y-100" : ""} ${rotate ? "rotate-180" : ""}`}
      >
        {inner}
      </div>
    </div>
  );
}
