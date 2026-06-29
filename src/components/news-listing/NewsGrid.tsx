import { interRegular, gilroyMedium } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { NewsArticleCard } from "./NewsArticleCard";
import { NEWS_ARTICLES } from "./news-data";

const ROW_ONE_BG = "bg-[rgba(255,255,255,0.04)]";
const ROW_TWO_BG = "bg-[rgba(0,0,0,0.04)]";

const GREEN_GLOW_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

function Tick({ height, tone }: { height: number; tone: "white" | "dark" }) {
  return (
    <span
      aria-hidden
      className={`w-px shrink-0 ${tone === "white" ? "bg-white/70" : "bg-[#333333]"}`}
      style={{ height: `${height}px` }}
    />
  );
}

function NewsPill() {
  return (
    <div
      className="relative flex h-[44px] w-[100px] shrink-0 items-center justify-center overflow-clip bg-[#f0f0f0]"
      data-node-id="2500:1853"
      data-name="Cta"
    >
      <span
        className={`${interRegular.className} relative text-[16px] leading-[24px] font-normal whitespace-nowrap text-[#0e1a0e] not-italic`}
      >
        NEWS
      </span>
      <Corners
        leftSrc="/applications/corners/tab-corner-tl.svg"
        rightSrc="/applications/corners/tab-corner-tr.svg"
      />
    </div>
  );
}

function NewsFilterBar() {
  return (
    <div
      className="flex w-[712px] max-w-full items-center justify-between overflow-x-auto"
      data-node-id="2500:1826"
      data-name="Options"
    >
      <div className="flex shrink-0 items-center gap-[24px]">
        <Tick height={7} tone="white" />
        <Tick height={8} tone="white" />
        <NewsPill />
        <Tick height={8} tone="white" />
        <Tick height={7} tone="white" />
      </div>
      <Tick height={8} tone="dark" />
      <Tick height={8} tone="dark" />
      <span
        className={`${interRegular.className} shrink-0 px-[20px] py-[14px] text-[16px] leading-[24px] font-normal whitespace-nowrap text-[#666] not-italic`}
      >
        PRESS RELEASES
      </span>
      <Tick height={8} tone="dark" />
      <Tick height={8} tone="dark" />
      <span
        className={`${interRegular.className} shrink-0 px-[20px] py-[14px] text-[16px] leading-[24px] font-normal whitespace-nowrap text-[#666] not-italic`}
      >
        BLOGS &amp; ARTICLES
      </span>
      <Tick height={8} tone="dark" />
      <Tick height={8} tone="dark" />
    </div>
  );
}

function LoadMoreCta() {
  return (
    <a
      href="#"
      className={`${gilroyMedium.className} ${GREEN_GLOW_SHADOW} relative flex h-[48px] w-[225px] shrink-0 items-center justify-center`}
      data-node-id="2500:2002"
      data-name="Cta"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
      />
      <span className="relative z-10 text-[16px] leading-[28px] font-medium whitespace-nowrap text-white uppercase not-italic [word-break:break-word]">
        Load More Resources
      </span>
      <Corners />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
      />
    </a>
  );
}

export function NewsGrid() {
  return (
    <section
      className="relative z-20 mb-[-409px] flex w-full justify-center overflow-hidden bg-transparent"
      aria-label="News articles"
      data-node-id="2500:1825"
    >
      <div className="flex w-full min-[1024px]:w-[1236px] flex-col items-center gap-[60px] px-[24px] py-[64px] min-[1024px]:px-0">
        <NewsFilterBar />

        <div className="flex w-full flex-col items-center gap-[36px]">
          <div className="grid w-full grid-cols-1 gap-[36px] min-[1024px]:grid-cols-3">
            {NEWS_ARTICLES.slice(0, 3).map((article) => (
              <NewsArticleCard key={article.nodeId} article={article} bgClass={ROW_ONE_BG} />
            ))}
          </div>
          <div className="grid w-full grid-cols-1 gap-[36px] min-[1024px]:grid-cols-3">
            {NEWS_ARTICLES.slice(3, 6).map((article) => (
              <NewsArticleCard key={article.nodeId} article={article} bgClass={ROW_TWO_BG} />
            ))}
          </div>
          <LoadMoreCta />
        </div>
      </div>
    </section>
  );
}
