import { dmMono, gilroyMedium, gilroyRegular, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { mediaUrl } from "@/lib/strapi";
import {
  ARTICLE_ICON_BG,
  CORNER_LEFT,
  CORNER_RIGHT,
  DEVELOPER_ARTICLES,
  SECTION_TITLE_GRADIENT,
} from "./developer-data";

const DEFAULT_HEADING = "Hello world in three lines";
const DEFAULT_SUBTITLE =
  "We invisibly map AI cores to your host drop your model straight into your existing application.";
const DEFAULT_CODE_SNIPPET = `main.c

#include "sys_clk.h"
#include "FreeRTOS.h"

void main()

{
APP_Start();
}

static void APP_Start()
{

	xTaskCreate(application_read_task_entry,
				"DataTask",
				1024,
				(void *)0,
				tskIDLE_PRIORITY + 4,
				NULL );

	xTaskCreate(application_process_task_entry,
				"ProcessTask",
				1024,
				(void *)0,
				tskIDLE_PRIORITY + 3,
				NULL );


	xTaskCreate(application_LCD_DISPLAY_task_entry,
				"PrintTask",
				1024,
				(void *)0,
				tskIDLE_PRIORITY + 2,
				NULL );

}`;

/**
 * Figma 2640:1215 — "Hello world in three lines" section.
 * Positioned at 119,671 / 1204×809 within the Developer canvas.
 * Code editor card (left, 602×646) + three article cards (right, 578) + connectors.
 */
export function DeveloperCodeSection({ data }: { data?: any }) {
  const heading = data?.heading || DEFAULT_HEADING;
  const subtitle = data?.subtitle || DEFAULT_SUBTITLE;
  const codeSnippet = data?.code_snippet || DEFAULT_CODE_SNIPPET;
  const rawArticles = Array.isArray(data?.articles) ? data.articles : [];
  const articles =
    rawArticles.length > 0
      ? rawArticles.map((a: any, i: number) => ({
          icon: mediaUrl(a?.icon) || DEVELOPER_ARTICLES[i]?.icon || "",
          title: a?.title || DEVELOPER_ARTICLES[i]?.title || "",
          description:
            a?.description || DEVELOPER_ARTICLES[i]?.description || "",
        }))
      : DEVELOPER_ARTICLES;
  return (
    <div
      className="absolute flex flex-col items-center gap-[36px]"
      style={{ left: 119, top: 671, width: 1204 }}
      data-node-id="2640:1215"
    >
      {/* Section background — full-viewport-width circuit texture, dimmed, fades to black at section bottom */}
      <div
        aria-hidden
        className="absolute -z-10"
        style={{
          left: "50%",
          transform: "translateX(-50%)",
          top: -45,
          width: "max(1440px, 100vw)",
          height: 854 /* 45px above section + 809px section height — ends at section bottom */,
          backgroundImage:
            "linear-gradient(to bottom, rgba(0,0,0,0) 55%, rgba(0,0,0,1) 100%), url('/developer/Gemini_Generated_Image_6dyqpp6dyqpp6dyq 5.png')",
          backgroundSize: "100% 100%, cover",
          backgroundPosition: "0 0, center top",
          backgroundRepeat: "no-repeat, no-repeat",
          filter: "brightness(0.8)",
        }}
      />
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
            className={`${gilroyMedium.className} bg-clip-text text-center text-[46px] leading-[49px] font-medium whitespace-nowrap text-transparent not-italic [word-break:break-word]`}
            style={{ backgroundImage: SECTION_TITLE_GRADIENT }}
          >
            {heading}
          </h2>
        </div>
        <p
          className={`${interRegular.className} w-[500px] text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] not-italic opacity-65 [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden`}
          data-node-id="2640:1224"
        >
          {subtitle}
        </p>
      </div>

      {/* Content — 3586:1346 (1204 wide) */}
      <div
        className="flex w-[1204px] flex-col items-center gap-[48px]"
        data-node-id="3586:1346"
      >
        {/* Row — 3586:1356 (gap 24, items-start) */}
        <div
          className="relative flex w-full items-start justify-center gap-[24px]"
          data-node-id="3586:1356"
        >
          <CodeEditorCard codeSnippet={codeSnippet} />
          <ArticleColumn articles={articles} />

          {/* Connectors (absolute, decorative) — exact Figma nested structure */}
          {/* Line 102 — 3586:1422 */}
          <div
            className="absolute flex h-0 w-[24.008px] -translate-x-1/2 -translate-y-1/2 items-center justify-center"
            style={{ left: "calc(50% + 12px)", top: "calc(50% - 216.22px)" }}
            data-node-id="3586:1422"
            aria-hidden
          >
            <div className="flex-none rotate-180">
              <div className="relative h-0 w-[24.008px]">
                <div className="absolute inset-[-2.89px_0_-2.89px_-12.02%]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    src="/developer/connector-line.svg"
                    className="block size-full max-w-none"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Vector — 3586:1423 (left 538.31, top 313.79) */}
          <div
            className="absolute h-0 w-[87.093px]"
            style={{ left: 538.31, top: 313.79 }}
            data-node-id="3586:1423"
            aria-hidden
          >
            <div className="absolute inset-[-2.89px_-3.31%_-2.89px_0]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src="/developer/connector-vector.svg"
                className="block size-full max-w-none"
              />
            </div>
          </div>
          {/* Vector — 3586:1424 (left 538.31, top 540.63, vertically flipped) */}
          <div
            className="absolute flex h-0 w-[87.093px] items-center justify-center"
            style={{ left: 538.31, top: 540.63 }}
            data-node-id="3586:1424"
            aria-hidden
          >
            <div className="-scale-y-100 flex-none">
              <div className="relative h-0 w-[87.093px]">
                <div className="absolute inset-[-2.89px_-3.31%_-2.89px_0]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    src="/developer/connector-vector.svg"
                    className="block size-full max-w-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Code editor card — 3586:1357 (602×646). */
function CodeEditorCard({ codeSnippet }: { codeSnippet: string }) {
  return (
    <div
      className="relative h-[646px] w-[602px] shrink-0 overflow-clip rounded-[16px] border border-solid border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] backdrop-blur-[9.5px]"
      data-node-id="3586:1357"
    >
      {/* Header bar — 3586:1358 (57 tall) */}
      <div
        className="absolute left-0 top-0 flex h-[57px] w-full items-center gap-[24px] border-b border-solid border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] px-[24px] pt-[16px] pb-[17px]"
        data-node-id="3586:1358"
      >
        <div className="flex h-[12px] w-[52px] items-start gap-[8px]">
          <span className="size-[12px] shrink-0 rounded-full bg-[rgba(251,44,54,0.6)]" />
          <span className="size-[12px] shrink-0 rounded-full bg-[rgba(240,177,0,0.6)]" />
          <span className="size-[12px] shrink-0 rounded-full bg-[rgba(0,201,80,0.6)]" />
        </div>
        <span
          className={`${interRegular.className} text-[16px] leading-[24px] font-normal tracking-[-0.3125px] whitespace-nowrap text-[rgba(255,255,255,0.6)] not-italic`}
        >
          main.c
        </span>
      </div>

      {/* Code body — 3586:1365 (left 11, top 45) */}
      <div
        className="absolute left-[11px] top-[45px] flex flex-col items-start px-[24px] pt-[24px]"
        data-node-id="3586:1365"
      >
        <pre
          className={`${dmMono.className} w-[498.852px] text-[12px] leading-[15px] font-normal whitespace-pre-wrap text-[rgba(255,255,255,0.4)] not-italic [word-break:break-word]`}
          data-node-id="3586:1366"
        >
{codeSnippet}
        </pre>
      </div>
    </div>
  );
}

/** Article column — 3586:1371 (578 wide, self-stretch, vertically centered). */
function ArticleColumn({ articles }: { articles: typeof DEVELOPER_ARTICLES }) {
  return (
    <div
      className="flex w-[578px] shrink-0 flex-col items-start justify-center self-stretch"
      data-node-id="3586:1371"
    >
      <div
        className="flex min-h-px w-full flex-[1_0_0] flex-col items-start gap-[24px]"
        data-node-id="3586:1372"
      >
        {articles.map((article) => (
          <ArticleCard key={article.title} article={article} />
        ))}
      </div>
    </div>
  );
}

function ArticleCard({
  article,
}: {
  article: (typeof DEVELOPER_ARTICLES)[number];
}) {
  return (
    <div className="relative flex min-h-px w-full flex-[1_0_0] items-center gap-[20px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.2)] px-[16px] pt-[16px] pb-[24px]">
      {/* Icon tile — 3586:1374 (50×49, rounded 12) */}
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
      {/* Text — 3586:1385 */}
      <div className="flex min-w-px flex-[1_0_0] flex-col items-start gap-[10px]">
        <p
          className={`${gilroyRegular.className} w-full text-[26px] leading-[29px] font-normal text-white not-italic [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden`}
        >
          {article.title}
        </p>
        <p
          className={`${interRegular.className} w-[438.651px] text-[18px] leading-[27px] font-normal text-[rgba(240,240,240,0.6)] not-italic [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden`}
        >
          {article.description}
        </p>
      </div>
      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
    </div>
  );
}
