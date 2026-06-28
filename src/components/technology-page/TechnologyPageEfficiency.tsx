import { gilroyMedium, interBold, interMedium, interRegular } from "../hero/fonts";
import { GradientTitle, CornerDecor } from "../contact/contact-shared";

const TITLE_GRADIENT_DEG = "114.359deg";
const SUBTITLE_TEXT =
  "The same chip, tuned to the job — from a wrist to a factory floor.";
const FOOTNOTE =
  "* Architectural efficiency, edge SKUs. Silicon-measured figures on the GPX10 page.";

const HEADERS = ["APPROACH", "Peak compute", "POWER", "EFFICIENCY", "TRADEOFF"];

type Row = {
  label: string;
  values: string[];
  bg: "none" | "marker" | "green";
};

const ROWS: Row[] = [
  {
    label: "Conventional MCU",
    values: ["0.002 GOPS", "600 mW", "0.03 TOPS/W", "No real AI"],
    bg: "none",
  },
  {
    label: "MCU + NPU",
    values: ["100 GOPS", "200 µW idle / 80 mW active", "1.2 TOPS/W", "Fixed models, host polling"],
    bg: "marker",
  },
  {
    label: "GPU / EDGE Accelerator",
    values: ["1-10 TOPS", "1-5 W", "2–5 TOPS/W", "Needs cloud or wall power"],
    bg: "none",
  },
  {
    label: "A-Cube",
    values: ["512 GOPS", "~80 µW always-on", "~30 TOPS/W*", "None — full AI at coin-cell power"],
    bg: "green",
  },
];

const ROW_BG: Record<Row["bg"], string> = {
  none: "",
  marker: "bg-[rgba(255,255,255,0.05)]",
  green: "bg-[rgba(83,216,36,0.3)]",
};

const COL_W = "w-[250.6px]";

function EfficiencyTable() {
  return (
    <div
      className="absolute top-[268px] left-[91.5px] flex w-[1253px] flex-col"
      data-node-id="2995:1344"
      data-name="Category"
    >
      {/* header row */}
      <div className="flex">
        {HEADERS.map((h) => (
          <div
            key={h}
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
      {ROWS.map((row) => {
        const isAcube = row.bg === "green";
        const valueColor = isAcube ? "text-[#e2f9da]" : "text-white";
        return (
          <div key={row.label} className="flex">
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
                key={i}
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

export function TechnologyPageEfficiency() {
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
                The efficiency gap isn&apos;t a few
              </span>
              <span className="block h-[49px] leading-[49px] whitespace-nowrap">
                percent. It&apos;s a different category.
              </span>
            </GradientTitle>
            <CornerDecor />
          </div>
          <p
            className={`${interRegular.className} text-[14px] leading-[21px] font-normal whitespace-nowrap text-[#f0f0f0] not-italic`}
            data-node-id="2995:1343"
          >
            {SUBTITLE_TEXT}
          </p>
        </div>

        <EfficiencyTable />

        {/* footnote */}
        <p
          className={`${interRegular.className} absolute top-[540px] left-[93.5px] text-[14px] leading-[22.75px] font-normal tracking-[-0.1504px] whitespace-nowrap text-[rgba(255,255,255,0.4)] not-italic`}
          data-node-id="2999:1616"
        >
          {FOOTNOTE}
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
          <span className="block">The efficiency gap isn&apos;t a few</span>
          <span className="block">percent. It&apos;s a different category.</span>
        </div>
        <p
          className={`${interRegular.className} max-w-[327px] text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic`}
        >
          {SUBTITLE_TEXT}
        </p>

        {ROWS.map((row) => {
          const isAcube = row.bg === "green";
          return (
            <div
              key={row.label}
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
              {HEADERS.slice(1).map((h, i) => (
                <div key={h} className="flex items-baseline justify-between gap-[12px]">
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
          {FOOTNOTE}
        </p>
      </div>
    </section>
  );
}
