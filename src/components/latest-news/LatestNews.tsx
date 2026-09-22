"use client";

import Image from "next/image";
import { mediaUrl } from "@/lib/strapi";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { RepelDots } from "../shared/RepelDots";
import { Corners } from "../shared/Corners";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";
import { LatestNewsCard } from "./LatestNewsCard";
import {
  LATEST_NEWS_ARTICLES,
  mapArticleToNewsCard,
  type LatestNewsArticle,
} from "./latest-news-data";
import { LatestNewsMobile } from "./LatestNewsMobile";
import { useFitText } from "../shared/FitText";

const cornerLeft = "/hero/corner-tag-1.svg";
const cornerRight = "/hero/corner-tag-2.svg";
const ctaDot = "/navbar/cta-dot.svg";
const ctaTextClass = `${interRegular.className} text-[16px] leading-[normal] font-normal`;

/**
 * Resolve the visible news cards. Articles from the `articles` collection
 * (flagged with `show_on_homepage`) take precedence; otherwise we fall back
 * to the embedded `latest_news.cards` components. Capped to 3 to preserve
 * the home-page layout (3 × 388px cards in a 1204px row).
 */
const VISIBLE_CARD_COUNT = 3;

function resolveCards(data: any): LatestNewsArticle[] {
  const collectionArticles = Array.isArray(data?.articles)
    ? data.articles
    : null;
  if (collectionArticles && collectionArticles.length > 0) {
    return collectionArticles
      .slice(0, VISIBLE_CARD_COUNT)
      .map((a: any, i: number) => mapArticleToNewsCard(a, i));
  }
  if (data?.cards && data.cards.length > 0) {
    return data.cards
      .slice(0, VISIBLE_CARD_COUNT)
      .map((c: any, index: number) => {
        const fallback =
          LATEST_NEWS_ARTICLES[index % LATEST_NEWS_ARTICLES.length];
        return {
          nodeId: `cms-news-card-${index}`,
          title: c.title || "",
          excerpt: c.body || "",
          category: fallback.category,
          categoryOffsetX: fallback.categoryOffsetX,
          date: fallback.date,
          href: fallback.href,
          imageSrc:
            mediaUrl(c.image)
              ? mediaUrl(c.image)
              : fallback.imageSrc,
        };
      });
  }
  return [];
}

export function LatestNews({ data }: { data?: any }) {
  const heading = data?.heading || "";
  const subtitle = data?.subtitle || "";
  const ctaLabel = data?.cta_label || "";
  const ctaHref = data?.cta_href || "";
  const cards = resolveCards(data);
  const fitRef = useFitText<HTMLHeadingElement>({ maxLines: 2 });
  return (
    <section
      className="relative mt-[150px] flex w-full justify-center overflow-x-clip bg-black max-[1023px]:mt-[24px]"
      aria-label="Latest from Ambient"
      data-node-id="2379:1283"
    >
      <div className="relative mx-auto hidden w-full max-w-[1440px] justify-center min-[1024px]:flex">
        <div className="mx-auto flex w-[1204px] flex-col items-center gap-[48px]">
          <div
            className="relative w-[600px] shrink-0"
            data-node-id="2379:1284"
            data-name="Group 90"
          >
            <div className="relative inline-grid grid-cols-[max-content] grid-rows-[max-content] place-items-start leading-[0]">
              <h2
                ref={fitRef}
                className={`${gilroyMedium.className} relative col-start-1 row-start-1 mt-[14.5px] ml-[86.11px] max-w-[486px] bg-clip-text text-center text-[46px] leading-[49px] font-medium text-[transparent] not-italic [word-break:break-word]`}
                style={{
                  backgroundImage:
                    "linear-gradient(119.407deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
                }}
                data-node-id="2379:1285"
              >
                {heading}
              </h2>

              <Corner
                className="col-start-1 row-start-1 mt-0 ml-[543.73px]"
                src={cornerRight}
                rotate
              />
              <Corner
                className="col-start-1 row-start-1 mt-[70px] ml-[543.73px]"
                src={cornerRight}
                rotate
                flipY
              />
              <div className="relative col-start-1 row-start-1 mt-[70px] ml-[57.5px] size-[4px]">
                <Image
                  src={cornerLeft}
                  alt=""
                  width={4}
                  height={4}
                  className="block size-full max-w-none"
                  aria-hidden
                />
              </div>
              <Corner
                className="col-start-1 row-start-1 mt-0 ml-[57.5px]"
                src={cornerLeft}
                flipY
              />

              <p
                className={`${interRegular.className} relative col-start-1 row-start-1 mt-[94px] ml-0 w-[600px] text-center text-[18px] leading-[27px] font-normal text-white not-italic [word-break:break-word]`}
                data-node-id="2379:1290"
              >
                {subtitle}
              </p>
            </div>
          </div>

          <div
            className="flex w-full shrink-0 items-center gap-[20px]"
            data-node-id="2379:1291"
          >
            {cards.map((article: LatestNewsArticle) => (
              <LatestNewsCard key={article.nodeId} {...article} />
            ))}
          </div>

          <a
            href={ctaHref}
            className="relative flex h-[44px] w-[186px] shrink-0 items-center justify-center gap-[10px] shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]"
            data-node-id="2379:1381"
            data-name="Cta"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
            />
            <span className="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[inherit]">
              <RepelDots />
            </span>
            <p
              className={`${ctaTextClass} relative z-10 shrink-0 whitespace-nowrap text-white uppercase not-italic [word-break:break-word]`}
            >
              {ctaLabel}
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async"
              src={ctaDot}
              alt=""
              width={6}
              height={6}
              className="relative z-10 size-[6px] shrink-0"
              aria-hidden
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 z-[2] shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)] rounded-[inherit]"
            />
            
            <GreenCtaCorners />
          </a>
        </div>
      </div>

      {/* MOBILE (<1024px) — dedicated layout, desktop is untouched above */}
      <div className="relative w-full min-[1024px]:hidden">
        <LatestNewsMobile data={data} />
      </div>
    </section>
  );
}

function Corner({
  className,
  src,
  rotate,
  flipY,
}: {
  className: string;
  src: string;
  rotate?: boolean;
  flipY?: boolean;
}) {
  return (
    <div className={`relative flex size-[4px] items-center justify-center ${className}`}>
      <div
        className={`flex-none ${rotate ? "rotate-180" : ""} ${flipY ? "-scale-y-100" : ""}`}
      >
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

