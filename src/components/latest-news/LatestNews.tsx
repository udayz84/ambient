import Image from "next/image";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { RepelDots } from "../shared/RepelDots";
import { Corners } from "../shared/Corners";
import { LatestNewsCard } from "./LatestNewsCard";
import { LATEST_NEWS_ARTICLES } from "./latest-news-data";
import { LatestNewsMobile } from "./LatestNewsMobile";

const cornerLeft = "/hero/corner-tag-1.svg";
const cornerRight = "/hero/corner-tag-2.svg";
const ctaDot = "/navbar/cta-dot.svg";
const ctaTextClass = `${interRegular.className} text-[16px] leading-[normal] font-normal`;

export function LatestNews() {
  return (
    <section
      className="relative mt-[150px] flex w-full justify-center overflow-x-clip bg-black max-[1023px]:mt-[60px]"
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
                className={`${gilroyMedium.className} relative col-start-1 row-start-1 mt-[14.5px] ml-[86.11px] bg-clip-text text-center text-[46px] leading-[49px] font-medium whitespace-nowrap text-[transparent] not-italic [word-break:break-word]`}
                style={{
                  backgroundImage:
                    "linear-gradient(119.407deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
                }}
                data-node-id="2379:1285"
              >
                Latest from Ambient
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
                Ambient works with partners across silicon, development,
                distribution, and system integration, helping teams move from
                evaluation to deployment with confidence
              </p>
            </div>
          </div>

          <div
            className="flex w-full shrink-0 items-center gap-[20px]"
            data-node-id="2379:1291"
          >
            {LATEST_NEWS_ARTICLES.map((article) => (
              <LatestNewsCard key={article.nodeId} {...article} />
            ))}
          </div>

          <a
            href="#"
            className="relative flex h-[44px] w-[186px] shrink-0 items-center justify-center gap-[10px] overflow-hidden shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]"
            data-node-id="2379:1381"
            data-name="Cta"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
            />
            <RepelDots />
            <p
              className={`${ctaTextClass} relative shrink-0 whitespace-nowrap text-white uppercase not-italic [word-break:break-word]`}
            >
              Explore more
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ctaDot}
              alt=""
              width={6}
              height={6}
              className="relative size-[6px] shrink-0"
              aria-hidden
            />
            <Corners />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
            />
          </a>
        </div>
      </div>

      {/* MOBILE (<1024px) — dedicated layout, desktop is untouched above */}
      <div className="relative w-full min-[1024px]:hidden">
        <LatestNewsMobile />
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

