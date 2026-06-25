import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import {
  ARTICLE_ICON_BG,
  CORNER_LEFT,
  CORNER_RIGHT,
  DEVELOPER_ARTICLES,
  SECTION_TITLE_GRADIENT,
} from "./developer-data";

/**
 * Figma 2640:1215 — "Hello world in three lines" section.
 * Positioned at 119,674 / 1204×762 within the Developer canvas.
 * Code editor card (left, 602) + three article cards (right, 578) + connectors.
 */
export function DeveloperCodeSection() {
  return (
    <div
      className="absolute flex flex-col items-center gap-[48px]"
      style={{ left: 119, top: 674, width: 1204 }}
      data-node-id="2640:1215"
    >
      {/* Section title block — 2640:1216 (800 wide, centered) */}
      <div
        className="flex w-[800px] flex-col items-center gap-[24px]"
        data-node-id="2640:1216"
      >
        <div
          className="relative px-[10px]"
          style={{ width: 529 }}
          data-node-id="2640:1218"
        >
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            className={`${gilroyMedium.className} bg-clip-text text-center text-[46px] leading-[49px] font-medium text-transparent not-italic [word-break:break-word]`}
            style={{ backgroundImage: SECTION_TITLE_GRADIENT }}
          >
            Hello world in three lines
          </h2>
        </div>
        <p
          className={`${interRegular.className} w-[500px] text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] not-italic opacity-65 [word-break:break-word]`}
        >
          We invisibly map AI cores to your host drop your model straight into
          your existing application.
        </p>
      </div>

      {/* Content row — 2640:1225 (1204 wide, items-end) */}
      <div
        className="relative flex w-full items-end gap-[24px]"
        data-node-id="2640:1225"
      >
        <CodeEditorCard />
        <ArticleColumn />

        {/* Connectors (absolute, decorative) */}
        {/* line102 — 2684:1098 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          aria-hidden
          src="/developer/connector-line.svg"
          className="pointer-events-none absolute h-auto w-[24px] max-w-none"
          style={{ left: 626.001, top: 57.78 }}
        />
        {/* arrow — 2684:1109 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          aria-hidden
          src="/developer/connector-arrow-1.svg"
          className="pointer-events-none absolute h-[87.869px] w-[167.404px] max-w-none"
          style={{ left: 458, top: 223.78 }}
        />
        {/* arrow — 2684:1111 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          aria-hidden
          src="/developer/connector-arrow-2.svg"
          className="pointer-events-none absolute h-[87.869px] w-[167.404px] max-w-none"
          style={{ left: 458, top: 402.65 }}
        />
      </div>
    </div>
  );
}

/** Code editor card — 2640:1227 (602×587). */
function CodeEditorCard() {
  return (
    <div
      className="relative h-[587px] w-[602px] shrink-0 overflow-clip rounded-[16px] border border-solid border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] backdrop-blur-[9.5px]"
      data-node-id="2640:1227"
    >
      {/* Header bar — 2640:1228 (57 tall) */}
      <div className="absolute left-0 top-0 flex h-[57px] w-full items-center gap-[24px] border-b border-solid border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] px-[24px] pt-[16px] pb-[17px]">
        <div className="flex h-[12px] w-[52px] items-center gap-[8px]">
          <span className="size-[12px] rounded-full bg-[rgba(251,44,54,0.6)]" />
          <span className="size-[12px] rounded-full bg-[rgba(240,177,0,0.6)]" />
          <span className="size-[12px] rounded-full bg-[rgba(0,201,80,0.6)]" />
        </div>
        <span
          className={`${interRegular.className} text-[16px] leading-[24px] font-normal tracking-[-0.3125px] whitespace-nowrap text-[rgba(255,255,255,0.6)] not-italic`}
        >
          main.c
        </span>
      </div>

      {/* Code body — 2640:1235 (top 57, 528 tall) */}
      <div className="absolute left-0 top-[57px] h-[528px] w-full overflow-clip px-[24px] pt-[24px]">
        <pre
          className="whitespace-pre text-[14px] leading-[20px] text-[rgba(255,255,255,0.4)]"
          style={{ fontFamily: 'Menlo, Monaco, "Courier New", monospace' }}
        >
{`#include <ambient.h>
#include <sensor_drivers.h>

int main(void) {
    // Initialize system
    ambient_init();
    sensor_config_t sensor;
    model_t model_obj;

    // Load AI model
    ambient_load_model(&model_obj, "fall_detect.bin");

    while(1) {
        `}
          <Hl>ambient_read_i2s_mic</Hl>
          {`(&sensor);

        `}
          <Hl>ambient_run_fft</Hl>
          {`(&sensor);

        `}
          <Hl>run_ai_inference</Hl>
          {`(&model_obj);

        if(model_obj.result > THRESHOLD) {
            trigger_alert();
        }
    }
}`}
        </pre>
      </div>

      {/* Green tint overlay — 2640:1247 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(139.378deg, rgba(1, 255, 0, 0.05) 0%, rgba(0, 0, 0, 0) 100%)",
        }}
      />
    </div>
  );
}

function Hl({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-[2px] bg-[rgba(1,255,0,0.2)] px-[4px] text-[#0f0]">
      {children}
    </span>
  );
}

/** Article column — 2640:1248 (578×587, three flex-1 cards). */
function ArticleColumn() {
  return (
    <div
      className="flex h-[587px] w-[578px] shrink-0 flex-col gap-[24px]"
      data-node-id="2640:1248"
    >
      {DEVELOPER_ARTICLES.map((article) => (
        <ArticleCard key={article.title} article={article} />
      ))}
    </div>
  );
}

function ArticleCard({
  article,
}: {
  article: (typeof DEVELOPER_ARTICLES)[number];
}) {
  return (
    <div className="relative flex min-h-0 flex-1 items-start gap-[20px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.2)] px-[16px] pt-[16px] pb-[24px]">
      {/* Icon tile — 2684:1050 (50×49, rounded 12) */}
      <div
        className="relative h-[49px] w-[50px] shrink-0 overflow-clip rounded-[12px]"
        style={{ backgroundImage: ARTICLE_ICON_BG, backgroundColor: "#1d221c" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          aria-hidden
          src={article.icon}
          className="absolute left-[13px] top-[13px] size-[24px] object-contain"
        />
      </div>
      {/* Text — 2640:1260 */}
      <div className="flex min-w-0 flex-1 flex-col gap-[10px]">
        <p
          className={`${gilroyMedium.className} w-full text-[22px] leading-[28px] font-medium text-white not-italic [word-break:break-word]`}
        >
          {article.title}
        </p>
        <p
          className={`${interRegular.className} w-full text-[16px] leading-[24px] font-normal text-[rgba(240,240,240,0.6)] not-italic [word-break:break-word]`}
        >
          {article.description}
        </p>
      </div>
      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
    </div>
  );
}
