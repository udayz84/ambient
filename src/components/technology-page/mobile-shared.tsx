/** Shared mobile-only corner-mark helpers for technology page sections. */

export const M_CORNER_CARD = "/technology/m-corner-card.svg";
export const M_CORNER_PANEL = "/technology/m-corner-panel.svg";
export const M_CORNER_TITLE = "/technology/m-corner-title.svg";

export function MobileCornerMark({
  src,
  sizeClassName,
  insetClassName,
  positionClassName,
  flipClassName,
}: {
  src: string;
  sizeClassName: string;
  insetClassName: string;
  positionClassName: string;
  flipClassName?: string;
}) {
  const mark = (
    <div className={`relative ${sizeClassName}`}>
      <div className={`absolute ${insetClassName}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" decoding="async" src={src} alt="" className="block size-full max-w-none" />
      </div>
    </div>
  );
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute flex items-center justify-center ${sizeClassName} ${positionClassName}`}
    >
      {flipClassName ? (
        <div className={`flex-none ${flipClassName}`}>{mark}</div>
      ) : (
        mark
      )}
    </div>
  );
}

export function MobileTitleCorners() {
  const size = "h-[4px] w-[2.346px]";
  const inset = "inset-[0_0_-12.5%_-21.31%]";
  return (
    <>
      <MobileCornerMark src={M_CORNER_TITLE} sizeClassName={size} insetClassName={inset} positionClassName="top-0 right-0" flipClassName="rotate-180" />
      <MobileCornerMark src={M_CORNER_TITLE} sizeClassName={size} insetClassName={inset} positionClassName="right-0 bottom-0" flipClassName="-scale-y-100 rotate-180" />
      <MobileCornerMark src={M_CORNER_TITLE} sizeClassName={size} insetClassName={inset} positionClassName="bottom-0 left-0" />
      <MobileCornerMark src={M_CORNER_TITLE} sizeClassName={size} insetClassName={inset} positionClassName="top-0 left-0" flipClassName="-scale-y-100" />
    </>
  );
}
