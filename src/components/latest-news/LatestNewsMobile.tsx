import Image from "next/image";
import Link from "next/link";
import { TagBadge } from "../hero/TagBadge";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { LATEST_NEWS_ARTICLES } from "./latest-news-data";

const GREEN_CTA_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

export function LatestNewsMobile() {
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
            Latest from Ambient
          </h2>
        </div>
      </div>

      <p
        className={`${interRegular.className} mt-[16px] w-full max-w-[375px] text-center text-[14px] leading-[20px] font-normal text-white not-italic px-[8px]`}
      >
        Ambient works with partners across silicon,<br />
        development, distribution, and system integration,<br />
        helping teams move from evaluation to deployment<br />
        with confidence
      </p>

      <div className="mt-[28px] flex w-full snap-x snap-mandatory gap-[14px] overflow-x-auto pb-[8px] px-[24px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {LATEST_NEWS_ARTICLES.map((article) => (
          <article
            key={article.nodeId}
            className="relative flex w-[327px] shrink-0 snap-start flex-col overflow-clip bg-[rgba(255,255,255,0.04)]"
          >
            <div className="relative h-[184px] w-full shrink-0 overflow-hidden">
              <Image
                src={article.imageSrc}
                alt=""
                fill
                className="object-cover"
                sizes="327px"
              />
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
                centerLabel={article.category === "TECHNICAL INSIGHT"}
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
        href="#"
        className="relative mt-[28px] flex h-[48px] w-[186px] items-center justify-center gap-[10px] shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
        />
        <p className={`${interRegular.className} relative z-10 shrink-0 whitespace-nowrap text-[14px] font-semibold text-white uppercase not-italic tracking-[0.05em]`}>
          Explore more
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
        
        <div className="pointer-events-none absolute -top-[0.5px] right-0 z-20 flex size-[6px] items-center justify-center">
          <div className="rotate-180 flex-none">
            <div className="relative size-[6px]">
              <img src="/hero/corner-tag-2.svg" alt="" width={6} height={6} className="block size-full max-w-none" aria-hidden />
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute -top-[0.5px] left-0 z-20 flex size-[6px] items-center justify-center">
          <div className="-scale-y-100 flex-none">
            <div className="relative size-[6px]">
              <img src="/hero/corner-tag-1.svg" alt="" width={6} height={6} className="block size-full max-w-none" aria-hidden />
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute right-0 bottom-0 z-20 flex size-[6px] items-center justify-center">
          <div className="-scale-x-100 flex-none">
            <div className="relative size-[6px]">
              <img src="/hero/corner-tag-2.svg" alt="" width={6} height={6} className="block size-full max-w-none" aria-hidden />
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 z-20 flex size-[6px] items-center justify-center">
          <div className="flex-none">
            <div className="relative size-[6px]">
              <img src="/hero/corner-tag-1.svg" alt="" width={6} height={6} className="block size-full max-w-none" aria-hidden />
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
