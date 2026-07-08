import { gilroyMedium, interBold, interMedium, interRegular } from "../hero/fonts";
import { GradientTitle, CornerDecor } from "../contact/contact-shared";

const TITLE_GRADIENT_DEG = "114.359deg";
const FALLBACK_SUBTITLE =
  "The same chip, tuned to the job — from a wrist to a factory floor.";
const FALLBACK_FOOTNOTE =
  "* Architectural efficiency, edge SKUs. Silicon-measured figures on the GPX10 page.";

const FALLBACK_HEADERS = ["APPROACH", "Peak compute", "POWER", "EFFICIENCY", "TRADEOFF"];

type Row = {
  label: string;
  values: string[];
  bg: "none" | "marker" | "green";
};

const FALLBACK_ROWS: Row[] = [
  {
    label: "Conventional MCU",
    values: ["0.002 GOPS", "600 mW", "0.03 TOPS/W", "No real AI"],
    bg: "none",
  },
  {
    label: "MCU + NPU",
    values: ["100 GOPS", "200 \u00b5W idle / 80 mW active", "1.2 TOPS/W", "Fixed models, host polling"],
    bg: "marker",
  },
  {
    label: "GPU / EDGE Accelerator",
    values: ["1-10 TOPS", "1-5 W", "2\u20135 TOPS/W", "Needs cloud or wall power"],
    bg: "none",
  },
  {
    label: "A-Cube",
    values: ["512 GOPS", "~80 \u00b5W always-on", "~30 TOPS/W*", "None \u2014 full AI at coin-cell power"],
    bg: "green",
  },
];

const FALLBACK_HEADING =
  "The efficiency gap isn't a few\npercent. It's a different category.";

const ROW_BG: Record<Row["bg"], string> = {
  none: "",
  marker: "bg-[rgba(255,255,255,0.05)]",
  green: "bg-[rgba(83,216,36,0.3)]",
};

const COL_W = "w-[250.6px]";

function EfficiencyTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: Row[];
}) {
  return (
    <div
      className="absolute top-[268px] left-[91.5px] flex w-[1253px] flex-col"
      data-node-id="2995:1344"
      data-name="Category"
    >
      {/* header row */}
      <div className="flex">
        {headers.map((h, i) => (
          <div
            key={`hdr-${i}`}
            className={`${COL_W} flex h-[56px] shrink-0 items-center bg-[#191c1b] py-[4px] pr-[4px] pl-[20px]`}
          >
            <p
              className={`${interMedium.className} text-[12px] leading-[16px] font-medium whitespace-nowrap text-white not-italic`}
            >
              {h}
            </p>
          </div>
        ))}
      </div>

      {/* data rows */}
      {rows.map((row, ri) => {
        const isAcube = row.bg === "green";
        const valueColor = isAcube ? "text-[#e2f9da]" : "text-white";
        return (
          <div key={`row-${ri}`} className="flex">
            {/* label cell (left-aligned) */}
            <div
              className={`${COL_W} flex h-[48px] shrink-0 items-center py-[4px] pr-[4px] pl-[20px] ${ROW_BG[row.bg]}`}
            >
              <p
                className={
                  isAcube
                    ? `${interBold.className} text-[16px] leading-[16px] font-bold whitespace-nowrap text-[#e2f9da] not-italic`
                    : `${interMedium.className} text-[14px] leading-[16px] font-medium whitespace-nowrap text-white not-italic`
                }
              >
                {row.label}
              </p>
            </div>
            {/* value cells (centered) */}
            {row.values.map((v, i) => (
              <div
                key={`cell-${ri}-${i}`}
                className={`${COL_W} flex h-[48px] shrink-0 items-center justify-center py-[4px] px-[4px] ${ROW_BG[row.bg]}`}
              >
                <p
                  className={`${interMedium.className} text-center text-[14px] leading-[16px] font-medium whitespace-nowrap ${valueColor} not-italic`}
                >
                  {v}
                </p>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export function TechnologyPageEfficiency({ data }: { data?: any } = {}) {
  const heading = data?.heading || FALLBACK_HEADING;
  const headingLines = heading.split("\n");
  const subtitle = data?.subtitle || FALLBACK_SUBTITLE;
  const footnote = data?.footnote || FALLBACK_FOOTNOTE;

  const headersText = typeof data?.headers === "string" ? data.headers : null;
  const headers: string[] = headersText
    ? headersText.split("\t")
    : FALLBACK_HEADERS;

  const strapiRows = Array.isArray(data?.rows) ? data.rows : null;
  const rows: Row[] =
    strapiRows && strapiRows.length > 0
      ? strapiRows.map((r: any) => ({
          label: (r?.approach as string) || "",
          values: [
            (r?.peak_compute as string) || "",
            (r?.power as string) || "",
            (r?.efficiency as string) || "",
            (r?.tradeoff as string) || "",
          ],
          bg: r?.is_highlighted ? "green" : "none",
        }))
      : FALLBACK_ROWS;

  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-black"
      data-node-id="3018:490"
      data-name="Table for efficient"
      aria-label="The efficiency gap is a different category"
    >
      {/* DESKTOP (>=1024px) */}
      <div className="relative hidden h-[635px] w-full max-w-[1440px] min-[1024px]:block">
        {/* 2995:1336 — section title (left-aligned) */}
        <div
          className="absolute top-[73px] left-[93.5px] flex flex-col items-start gap-[24px]"
          data-node-id="2995:1336"
          data-name="Section Title"
        >
          <div
            className="relative flex flex-col items-center px-[10px]"
            data-node-id="2995:1337"
            data-name="Title"
          >
            <GradientTitle gradientDeg={TITLE_GRADIENT_DEG} nodeId="2995:1338">
              <span className="block h-[49px] leading-[49px] whitespace-nowrap">
                {headingLines[0] ?? ""}
              </span>
              <span className="block h-[49px] leading-[49px] whitespace-nowrap">
                {headingLines[1] ?? ""}
              </span>
            </GradientTitle>
            <CornerDecor />
          </div>
          <p
            className={`${interRegular.className} text-[14px] leading-[21px] font-normal whitespace-nowrap text-[#f0f0f0] not-italic`}
            data-node-id="2995:1343"
          >
            {subtitle}
          </p>
        </div>

        <EfficiencyTable headers={headers} rows={rows} />

        {/* footnote */}
        <p
          className={`${interRegular.className} absolute top-[540px] left-[93.5px] text-[14px] leading-[22.75px] font-normal tracking-[-0.1504px] whitespace-nowrap text-[rgba(255,255,255,0.4)] not-italic`}
          data-node-id="2999:1616"
        >
          {footnote}
        </p>
      </div>

      {/* MOBILE (<1024px) — card-based comparison */}
      <div className="flex w-full flex-col gap-[20px] px-[24px] py-[56px] min-[1024px]:hidden">
        <div
          className={`${gilroyMedium.className} bg-clip-text text-[28px] leading-[33px] font-medium text-transparent not-italic`}
          style={{
            backgroundImage: `linear-gradient(${TITLE_GRADIENT_DEG}, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          <span className="block">{headingLines[0] ?? ""}</span>
          <span className="block">{headingLines[1] ?? ""}</span>
        </div>
        <p
          className={`${interRegular.className} max-w-[327px] text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic`}
        >
          {subtitle}
        </p>

        {rows.map((row, ri) => {
          const isAcube = row.bg === "green";
          return (
            <div
              key={`m-row-${ri}`}
              className={`flex flex-col gap-[10px] rounded-[6px] border-[0.5px] border-solid border-[rgba(255,255,255,0.1)] p-[16px] ${
                isAcube ? "bg-[rgba(83,216,36,0.3)]" : row.bg === "marker" ? "bg-[rgba(255,255,255,0.05)]" : "bg-[rgba(15,14,14,0.4)]"
              }`}
            >
              <p
                className={
                  isAcube
                    ? `${interBold.className} text-[18px] leading-[20px] font-bold text-[#e2f9da] not-italic`
                    : `${interMedium.className} text-[16px] leading-[18px] font-medium text-white not-italic`
                }
              >
                {row.label}
              </p>
              {headers.slice(1).map((h: string, i: number) => (
                <div key={`m-cell-${ri}-${i}`} className="flex items-baseline justify-between gap-[12px]">
                  <span className={`${interRegular.className} text-[11px] leading-[14px] font-normal tracking-[0.2px] whitespace-nowrap text-[rgba(255,255,255,0.5)] uppercase not-italic`}>
                    {h}
                  </span>
                  <span
                    className={`${interMedium.className} text-right text-[13px] leading-[16px] font-medium text-white not-italic`}
                  >
                    {row.values[i]}
                  </span>
                </div>
              ))}
            </div>
          );
        })}

        <p
          className={`${interRegular.className} text-[12px] leading-[18px] font-normal text-[rgba(255,255,255,0.4)] not-italic`}
        >
          {footnote}
        </p>
      </div>
    </section>
  );
}
