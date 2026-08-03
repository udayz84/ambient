import Image from "next/image";
import Link from "next/link";
import { mediaUrl } from "@/lib/strapi";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { TagBadge } from "../hero/TagBadge";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";
import {
  LATEST_NEWS_ARTICLES,
  mapArticleToNewsCard,
  type LatestNewsArticle,
} from "./latest-news-data";

const GREEN_CTA_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

/** Mobile carousel shows up to 6 cards (2 × visible-by-3 swipe). */
const VISIBLE_CARD_COUNT = 6;

function resolveCards(data: any): LatestNewsArticle[] {
  const collectionArticles = Array.isArray(data?.articles)
    ? data.articles
    : null;
  if (collectionArticles && collectionArticles.length > 0) {
    return collectionArticles
      .slice(0, VISIBLE_CARD_COUNT)
      .map((a: any, i: number) =>
        mapArticleToNewsCard(a, i, { nodeIdPrefix: "cms-news-card-mobile" }),
      );
  }
  if (data?.cards && data.cards.length > 0) {
    return data.cards.slice(0, VISIBLE_CARD_COUNT).map((c: any, index: number) => {
      const fallback =
        LATEST_NEWS_ARTICLES[index % LATEST_NEWS_ARTICLES.length];
      return {
        nodeId: `cms-news-card-mobile-${index}`,
        title: c.title || "",
        excerpt: c.body || "",
        category: fallback.category,
        categoryOffsetX: fallback.categoryOffsetX,
        date: fallback.date,
        href: fallback.href,
        imageSrc:
          mediaUrl(c.image) && !mediaUrl(c.image)?.match(/\.(mp4|webm)$/i)
            ? mediaUrl(c.image)
            : "",
      };
    });
  }
  return [];
}

export function LatestNewsMobile({ data }: { data?: any }) {
  const heading = data?.heading || "";
  const subtitle = data?.subtitle || "";
  const ctaLabel = data?.cta_label || "";
  const ctaHref = data?.cta_href || "";
  const articles = resolveCards(data);
  return (
    <div className="relative flex flex-col items-center py-[48px]">
      <div className="relative flex flex-col items-center">
        <div className="relative px-[16px] py-[4px]">
          <div className="absolute top-0 right-0 flex size-[4px] items-center justify-center">
            <div className="rotate-180 flex-none">
              <div className="relative size-[4px]">
                <Image src="/hero/corner-tag-2.svg" alt="" fill className="object-contain" aria-hidden />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 flex size-[4px] items-center justify-center">
            <div className="-scale-x-100 flex-none">
              <div className="relative size-[4px]">
                <Image src="/hero/corner-tag-2.svg" alt="" fill className="object-contain" aria-hidden />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 flex size-[4px] items-center justify-center">
            <div className="flex-none">
              <div className="relative size-[4px]">
                <Image src="/hero/corner-tag-1.svg" alt="" fill className="object-contain" aria-hidden />
              </div>
            </div>
          </div>
          <div className="absolute top-0 left-0 flex size-[4px] items-center justify-center">
            <div className="-scale-y-100 flex-none">
              <div className="relative size-[4px]">
                <Image src="/hero/corner-tag-1.svg" alt="" fill className="object-contain" aria-hidden />
              </div>
            </div>
          </div>

          <h2
            className={`${gilroyMedium.className} bg-clip-text text-center text-[36px] leading-[44px] font-medium text-transparent not-italic whitespace-nowrap`}
            style={{
              backgroundImage:
                "linear-gradient(119.407deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
            }}
          >
            {heading}
          </h2>
        </div>
      </div>

      <p
        className={`${interRegular.className} mt-[16px] w-full max-w-[375px] text-center text-[14px] leading-[20px] font-normal text-white not-italic px-[8px]`}
      >
        {subtitle}
      </p>

      <div className="mt-[28px] flex w-full snap-x snap-mandatory gap-[14px] overflow-x-auto pb-[8px] px-[24px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {articles.map((article: any) => (
          <article
            key={article.nodeId}
            className="relative flex w-[327px] shrink-0 snap-start flex-col overflow-clip bg-[rgba(255,255,255,0.04)]"
          >
            <div className="relative h-[184px] w-full shrink-0 overflow-hidden">
              {article.imageSrc ? (
                <Image
                  src={article.imageSrc}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="327px"
                />
              ) : null}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"
                aria-hidden
              />
            </div>

            <div className="flex flex-1 flex-col items-start gap-[14px] p-[18px]">
              <TagBadge
                label={article.category}
                width={180}
                labelOffsetX={article.categoryOffsetX}
                rightBarLeft={170.48046875}
                centerLabel={article.categoryOffsetX === 0 || article.category === "TECHNICAL INSIGHT"}
              />

              <h3
                className={`${gilroyMedium.className} text-[18px] leading-[24px] font-medium text-white not-italic [word-break:break-word]`}
              >
                {article.title}
              </h3>

              <p
                className={`${interRegular.className} text-[13px] leading-[19px] font-normal not-italic [word-break:break-word]`}
              >
                <span className="text-[rgba(240,240,240,0.8)]">
                  {article.excerpt}
                </span>{" "}
                <Link
                  href={article.href}
                  className="text-[#53d824] transition-colors hover:text-[#6ced3f]"
                >
                  read more
                </Link>
              </p>

              <div className="mt-auto flex items-center gap-[8px] pt-[8px]">
                <Image
                  src="/latest-news/calendar-icon.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="block max-w-none"
                  aria-hidden
                />
                <p
                  className={`${interRegular.className} text-[13px] leading-[19px] font-normal whitespace-nowrap text-[#99a1af] not-italic`}
                >
                  {article.date}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <a
        href={ctaHref}
        className="relative mt-[28px] flex h-[48px] w-[186px] items-center justify-center gap-[10px] shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
        />
        <p className={`${interRegular.className} relative z-10 shrink-0 whitespace-nowrap text-[14px] font-semibold text-white uppercase not-italic tracking-[0.05em]`}>
          {ctaLabel}
        </p>
        <Image
          src="/navbar/cta-dot.svg"
          alt=""
          width={6}
          height={6}
          className="relative z-10 size-[6px] shrink-0"
          aria-hidden
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden z-[2] shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)] rounded-[inherit]"
        />
        
        <GreenCtaCorners />
      </a>
    </div>
  );
}
