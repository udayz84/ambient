import { interMedium, interRegular, interSemiBold, gilroyMedium } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import {
  COMPARISON_COLUMNS,
  type ComparisonColumn,
  CORNER_LEFT,
  CORNER_RIGHT,
  GPX_TAG_BG,
  GPX_TAG_TEXT,
  HIGHLIGHT_COL_BG,
  HIGHLIGHT_COL_BORDER,
  HIGHLIGHT_ROW_MARKER_BG,
  MEASURED_TITLE_GRADIENT,
  ROW_MARKER_BG,
  TABLE_BG,
} from "./products-data";

/**
 * Figma 2906:3290 (title) + 2906:3186 (comparison table).
 * "Not projected. Measured in silicon."
 */
export function ProductsMeasured() {
  return (
    <>
      {/* DESKTOP (>=1024px) */}
      <section
        className="relative mx-auto hidden w-[1253px] bg-black min-[1024px]:block"
        aria-label="Measured in silicon"
      >
        <ProductsMeasuredDesktop />
      </section>

      {/* MOBILE (<1024px) */}
      <ProductsMeasuredMobile />
    </>
  );
}

function ProductsMeasuredDesktop() {
  return (
    <div className="flex flex-col pb-[120px]">
      {/* Section title — 2906:3290 (left-aligned, w=430) */}
      <div
        className="flex flex-col items-start gap-[24px]"
        style={{ width: 430 }}
        data-node-id="2906:3290"
        data-name="Section Title"
      >
        <div
          className="relative px-[10px]"
          style={{ width: 430, height: 98 }}
          data-node-id="2906:3291"
          data-name="Title"
        >
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            className={`${gilroyMedium.className} absolute m-0 w-[410px] bg-clip-text text-[46px] leading-[49px] font-medium text-transparent not-italic [word-break:break-word]`}
            style={{
              left: 10,
              top: 0,
              backgroundImage: MEASURED_TITLE_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
            data-node-id="2906:3292"
          >
            <span className="block leading-[49px]">{`Not projected. `}</span>
            <span className="block leading-[49px]">Measured in silicon.</span>
          </h2>
        </div>
        <p
          className={`${interRegular.className} w-[428px] text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
          data-node-id="2906:3297"
        >
          The same chip, tuned to the job — from a wrist to a factory floor.
        </p>
      </div>

      {/* Comparison table — 2906:3186 */}
      <div className="mt-[52px]">
        <ComparisonTable />
      </div>
    </div>
  );
}

function ComparisonTable() {
  return (
    <div
      className="flex w-full overflow-clip rounded-[8px]"
      style={{ backgroundColor: TABLE_BG }}
      data-node-id="2906:3186"
      data-name="Category"
    >
      {COMPARISON_COLUMNS.map((col) => (
        <ComparisonColumnView key={col.header} col={col} />
      ))}
    </div>
  );
}

function ComparisonColumnView({ col }: { col: ComparisonColumn }) {
  const highlight = !!col.highlight;
  return (
    <div
      className="flex flex-1 flex-col items-start"
      style={{
        backgroundColor: highlight ? HIGHLIGHT_COL_BG : undefined,
        borderLeft: highlight
          ? `1px solid ${HIGHLIGHT_COL_BORDER}`
          : undefined,
      }}
      data-name="Сompetitor"
    >
      {/* Header cell (h=56) */}
      <div className="flex h-[56px] w-full shrink-0 flex-col items-center justify-center p-[4px]">
        {highlight ? (
          <div
            className="flex h-[37px] w-[145px] items-center justify-center"
            style={{ backgroundColor: GPX_TAG_BG }}
            data-node-id="2906:3193"
            data-name="Tag"
          >
            <span
              className={`${interSemiBold.className} text-[12px] leading-[16px] font-semibold whitespace-nowrap not-italic`}
              style={{ color: GPX_TAG_TEXT }}
            >
              GPX10 Pro
            </span>
          </div>
        ) : (
          <span
            className={`${interMedium.className} text-center text-[12px] leading-[16px] font-medium text-white not-italic`}
          >
            {col.header}
          </span>
        )}
      </div>

      {/* Data cells (h=48 each) */}
      {col.values.map((value, rowIndex) => {
        const isMarkerRow = rowIndex % 2 === 0;
        const bg = highlight
          ? isMarkerRow
            ? HIGHLIGHT_ROW_MARKER_BG
            : "transparent"
          : isMarkerRow
            ? ROW_MARKER_BG
            : "transparent";
        return (
          <div
            key={rowIndex}
            className="flex h-[48px] w-full shrink-0 flex-col items-center justify-center p-[4px]"
            style={{ backgroundColor: bg }}
            data-name="Cell"
          >
            <span
              className={`${interMedium.className} text-center text-[14px] leading-[16px] font-medium text-white not-italic [word-break:break-word]`}
            >
              {value}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function ProductsMeasuredMobile() {
  return (
    <section
      className="relative w-full bg-black px-[24px] pt-[64px] pb-[80px] min-[1024px]:hidden"
      aria-label="Measured in silicon"
    >
      {/* Title */}
      <div className="flex flex-col items-start gap-[16px]">
        <h2
          className={`${gilroyMedium.className} max-w-full bg-clip-text text-[30px] leading-[34px] font-medium text-transparent not-italic [word-break:break-word]`}
          style={{
            backgroundImage: MEASURED_TITLE_GRADIENT,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          {`Not projected. Measured in silicon.`}
        </h2>
        <p
          className={`${interRegular.className} max-w-full text-[14px] leading-[21px] font-normal text-[#f0f0f0]`}
        >
          The same chip, tuned to the job — from a wrist to a factory floor.
        </p>
      </div>

      {/* Comparison table — horizontally scrollable to preserve structure */}
      <div className="mt-[32px] -mx-[24px] overflow-x-auto px-[24px] pb-[8px]">
        <div
          className="flex w-[720px] shrink-0 overflow-clip rounded-[8px]"
          style={{ backgroundColor: TABLE_BG }}
        >
          {COMPARISON_COLUMNS.map((col) => (
            <ComparisonColumnView key={col.header} col={col} />
          ))}
        </div>
      </div>
    </section>
  );
}
