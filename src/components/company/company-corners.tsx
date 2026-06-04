import Image from "next/image";

export { CornerDecor } from "../contact/contact-shared";

const cornerLeft = "/hero/corner-tag-1.svg";
const cornerRight = "/hero/corner-tag-2.svg";
const cornerBr = "/hero/vector-55.svg";

const cornerTlGlass = "/careers/corner-tl-glass.svg";
const cornerTrGlass = "/careers/corner-tr-glass.svg";
const cornerBl = "/careers/corner-card-bl.svg";
function CornerMark({
  src,
  wrapperClassName,
  innerClassName = "",
  style,
}: {
  src: string;
  wrapperClassName: string;
  innerClassName?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`pointer-events-none ${wrapperClassName}`}
      style={style}
    >
      <div className={`flex-none ${innerClassName}`}>
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
      </div>
    </div>
  );
}

/** Title / frame corners — Figma vector58 & vector55 at inset 0 */
export function CompanyStandardCorners() {
  return (
    <>
      <CornerMark
        src={cornerLeft}
        wrapperClassName="absolute top-0 left-0 flex size-[4px] items-center justify-center"
        innerClassName="-scale-y-100"
      />
      <CornerMark
        src={cornerRight}
        wrapperClassName="absolute top-0 right-0 flex size-[4px] items-center justify-center"
        innerClassName="rotate-180"
      />
      <CornerMark
        src={cornerLeft}
        wrapperClassName="absolute bottom-0 left-0 size-[4px]"
      />
      <CornerMark
        src={cornerRight}
        wrapperClassName="absolute right-0 bottom-0 flex size-[4px] items-center justify-center"
        innerClassName="-scale-y-100 rotate-180"
      />
    </>
  );
}

/** DNA value cards — Figma 2379:2104–2107 */
export function CompanyGlassCardCorners() {
  return (
    <>
      <CornerMark
        src={cornerTlGlass}
        wrapperClassName="absolute top-0 left-0 flex size-[4px] items-center justify-center"
        innerClassName="-scale-y-100"
      />
      <CornerMark
        src={cornerTrGlass}
        wrapperClassName="absolute top-0 right-0 flex size-[4px] items-center justify-center"
        innerClassName="rotate-180"
      />
      <CornerMark
        src={cornerBl}
        wrapperClassName="absolute bottom-0 left-0 flex size-[4px] items-center justify-center"
        innerClassName="-rotate-90 -scale-y-100"
      />
      <CornerMark
        src={cornerBr}
        wrapperClassName="absolute right-0 bottom-0 flex size-[4px] items-center justify-center"
        innerClassName="-scale-y-100 rotate-180"
      />
    </>
  );
}

/**
 * Mission content frame border brackets — Figma 2379:4761–4764 (vector58/55 at frame edges).
 * Lines-only border is in mission-frame-border.svg; these are the bright L-marks.
 */
export function CompanyMissionFrameCorners() {
  return <CompanyStandardCorners />;
}

/** Large cards (articles, engagement) — bottom Y from Figma */
export function CompanyCardCorners({
  cornerBottom,
}: {
  cornerBottom: number;
}) {
  return (
    <>
      <CornerMark
        src={cornerLeft}
        wrapperClassName="absolute top-0 left-0 z-[3] flex size-[4px] items-center justify-center"
        innerClassName="-scale-y-100"
      />
      <CornerMark
        src={cornerRight}
        wrapperClassName="absolute top-0 right-0 z-[3] flex size-[4px] items-center justify-center"
        innerClassName="rotate-180"
      />
      <CornerMark
        src={cornerLeft}
        wrapperClassName="absolute left-0 z-[3] size-[4px]"
        style={{ top: cornerBottom }}
      />
      <CornerMark
        src={cornerRight}
        wrapperClassName="absolute right-0 z-[3] flex size-[4px] items-center justify-center"
        innerClassName="-scale-y-100 rotate-180"
        style={{ top: cornerBottom }}
      />
    </>
  );
}
