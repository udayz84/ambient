"use client";

import { useState } from "react";
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

/**
 * Structured code lines for interactive hover highlighting (Figma 4661:9213).
 * group maps each line to the article card that highlights it:
 *   0 = "No Proprietary IDEs"  -> top skeleton (main / includes / APP_Start)
 *   1 = "A Single Line of Inference" -> ProcessTask (inference) block
 *   2 = "The End of Glue Code" -> ReadTask + LCD task-creation glue blocks
 */
export type CodeLine = { text: string; group: 0 | 1 | 2 };

export const DEFAULT_CODE_LINES: CodeLine[] = [
  { text: "main.c", group: 0 },
  { text: "", group: 0 },
  { text: '#include "sys_clk.h"', group: 0 },
  { text: '#include "FreeRTOS.h"', group: 0 },
  { text: "", group: 0 },
  { text: "void main()", group: 0 },
  { text: "", group: 0 },
  { text: "{", group: 0 },
  { text: "APP_Start();", group: 0 },
  { text: "}", group: 0 },
  { text: "", group: 0 },
  { text: "static void APP_Start()", group: 0 },
  { text: "{", group: 0 },
  { text: "", group: 0 },
  { text: "\txTaskCreate(application_read_task_entry,", group: 2 },
  { text: '\t\t\t\t"DataTask",', group: 2 },
  { text: "\t\t\t\t1024,", group: 2 },
  { text: "\t\t\t\t(void *)0,", group: 2 },
  { text: "\t\t\t\ttskIDLE_PRIORITY + 4,", group: 2 },
  { text: "\t\t\t\tNULL );", group: 2 },
  { text: "", group: 0 },
  { text: "\txTaskCreate(application_process_task_entry,", group: 1 },
  { text: '\t\t\t\t"ProcessTask",', group: 1 },
  { text: "\t\t\t\t1024,", group: 1 },
  { text: "\t\t\t\t(void *)0,", group: 1 },
  { text: "\t\t\t\ttskIDLE_PRIORITY + 3,", group: 1 },
  { text: "\t\t\t\tNULL );", group: 1 },
  { text: "", group: 0 },
  { text: "", group: 0 },
  { text: "\txTaskCreate(application_LCD_DISPLAY_task_entry,", group: 2 },
  { text: '\t\t\t\t"PrintTask",', group: 2 },
  { text: "\t\t\t\t1024,", group: 2 },
  { text: "\t\t\t\t(void *)0,", group: 2 },
  { text: "\t\t\t\ttskIDLE_PRIORITY + 2,", group: 2 },
  { text: "\t\t\t\tNULL );", group: 2 },
  { text: "", group: 0 },
  { text: "}", group: 0 },
];

/** Connector vector <-> article card index mapping (top -> bottom). */
const CONNECTOR_LINE = "/developer/connector-line.svg";
const CONNECTOR_VECTOR = "/developer/connector-vector.svg";

/**
 * Figma 2640:1215 / 4661:9213 — "Hello world in three lines" section.
 * Positioned at 119,671 / 1204×809 within the Developer canvas.
 * Code editor card (left, 602×646) + three article cards (right, 578) + connectors.
 * Hovering an article card highlights the card, its linked code region, and animates the connector vector.
 */
export function DeveloperCodeSection({ data }: { data?: any }) {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const heading = data?.heading || DEFAULT_HEADING;
  const subtitle = data?.subtitle || DEFAULT_SUBTITLE;
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

  /** Connector opacity: dim by default, bright on its card hover, faded when another card is active. */
  const connectorOpacity = (i: number) =>
    activeCard === null ? 0.45 : activeCard === i ? 1 : 0.2;

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
          <CodeEditorCard activeCard={activeCard} />
          <ArticleColumn
            articles={articles}
            activeCard={activeCard}
            onHover={setActiveCard}
          />

          {/* Connectors (absolute, decorative) — animate opacity with active card */}
          {/* Line 102 — 3586:1422 -> card 0 */}
          <div
            className="pointer-events-none absolute flex h-0 w-[24.008px] -translate-x-1/2 -translate-y-1/2 items-center justify-center transition-opacity duration-300"
            style={{
              left: "calc(50% + 12px)",
              top: "calc(50% - 216.22px)",
              opacity: connectorOpacity(0),
            }}
            data-node-id="3586:1422"
            aria-hidden
          >
            <div className="flex-none rotate-180">
              <div className="relative h-0 w-[24.008px]">
                <div className="absolute inset-[-2.89px_0_-2.89px_-12.02%]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    src={CONNECTOR_LINE}
                    className="block size-full max-w-none"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Vector — 3586:1423 (left 538.31, top 313.79) -> card 1 */}
          <div
            className="pointer-events-none absolute h-0 w-[87.093px] transition-opacity duration-300"
            style={{ left: 538.31, top: 313.79, opacity: connectorOpacity(1) }}
            data-node-id="3586:1423"
            aria-hidden
          >
            <div className="absolute inset-[-2.89px_-3.31%_-2.89px_0]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src={CONNECTOR_VECTOR}
                className="block size-full max-w-none"
              />
            </div>
          </div>
          {/* Vector — 3586:1424 (left 538.31, top 540.63, vertically flipped) -> card 2 */}
          <div
            className="pointer-events-none absolute flex h-0 w-[87.093px] items-center justify-center transition-opacity duration-300"
            style={{ left: 538.31, top: 540.63, opacity: connectorOpacity(2) }}
            data-node-id="3586:1424"
            aria-hidden
          >
            <div className="-scale-y-100 flex-none">
              <div className="relative h-0 w-[87.093px]">
                <div className="absolute inset-[-2.89px_-3.31%_-2.89px_0]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    src={CONNECTOR_VECTOR}
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
function CodeEditorCard({ activeCard }: { activeCard: number | null }) {
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
        {DEFAULT_CODE_LINES.map((line, i) => {
          const isActive = activeCard === line.group;
          return (
            <span
              key={i}
              className={`${dmMono.className} block whitespace-pre text-[12px] leading-[15px] font-normal not-italic transition-colors duration-300 ${
                isActive
                  ? "text-white"
                  : "text-[rgba(255,255,255,0.4)]"
              }`}
            >
              {line.text || "\u00A0"}
            </span>
          );
        })}
      </div>
    </div>
  );
}

/** Article column — 3586:1371 (578 wide, self-stretch, vertically centered). */
function ArticleColumn({
  articles,
  activeCard,
  onHover,
}: {
  articles: typeof DEVELOPER_ARTICLES;
  activeCard: number | null;
  onHover: (i: number | null) => void;
}) {
  return (
    <div
      className="flex w-[578px] shrink-0 flex-col items-start justify-center self-stretch"
      data-node-id="3586:1371"
    >
      <div
        className="flex min-h-px w-full flex-[1_0_0] flex-col items-start gap-[24px]"
        data-node-id="3586:1372"
      >
        {articles.map((article, i) => (
          <ArticleCard
            key={article.title}
            article={article}
            isActive={activeCard === i}
            onHoverStart={() => onHover(i)}
            onHoverEnd={() => onHover(null)}
          />
        ))}
      </div>
    </div>
  );
}

function ArticleCard({
  article,
  isActive,
  onHoverStart,
  onHoverEnd,
}: {
  article: (typeof DEVELOPER_ARTICLES)[number];
  isActive: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  return (
    <div
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      className={`relative flex min-h-px w-full flex-[1_0_0] cursor-default items-center gap-[20px] overflow-clip border-[0.5px] border-solid px-[16px] pt-[16px] pb-[24px] transition-colors duration-300 ${
        isActive
          ? "border-[#a8ed90] bg-[rgba(68,120,7,0.2)]"
          : "border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.2)]"
      }`}
    >
      {/* Icon tile — 3586:1374 (50×49, rounded 12) */}
      <div
        className="relative h-[49px] w-[50px] shrink-0 overflow-clip rounded-[12px]"
        style={{
          backgroundImage: isActive
            ? `${ARTICLE_ICON_BG}, linear-gradient(90deg, rgb(29, 34, 28) 0%, rgb(29, 34, 28) 100%)`
            : ARTICLE_ICON_BG,
          backgroundColor: "#1d221c",
        }}
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
