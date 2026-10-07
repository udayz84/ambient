import { interRegular } from "../hero/fonts";
import { GradientTitle } from "../contact/contact-shared";
import { CornerDecor } from "./company-corners";

const HERO_BG_GRADIENT =
  "linear-gradient(132.873deg, rgb(0, 0, 0) 31.15%, rgba(0, 0, 0, 0) 76.987%), linear-gradient(187.824deg, rgba(0, 0, 0, 0) 49.061%, rgb(0, 0, 0) 90.541%)";

const FALLBACK_TITLE = "A new paradigm for\nefficient AI compute";
const FALLBACK_BODY =
  "We build energy-aware, programmable, mixed-signal AI processors that unlock orders-of-magnitude improvements in performance-per-watt, enabling scalable intelligence across edge, enterprise, and cloud.";
const FALLBACK_BG = "/company/hero-bg.webp";

type CompanyHeroProps = {
  data?: any;
};

export function CompanyHero({ data }: CompanyHeroProps = {}) {
  let title = (data?.title as string) || FALLBACK_TITLE;
  if (title === "A new paradigm for efficient AI compute" || title === "A new paradigm for efficient AI compute.") {
    title = "A new paradigm for\nefficient AI compute";
  }
  const body = (data?.body as string) || FALLBACK_BODY;
  const bgSrc = FALLBACK_BG;
  const titleLines = title.split("\n");

  return (
    <section
      className="relative flex h-[787px] w-full justify-center overflow-hidden bg-black"
      data-node-id="2379:2135"
      data-name="Hero Section"
      aria-label="Company hero"
    >
      <div className="relative h-full w-full max-w-[1440px]">
        {/* 2379:2135 — hero background image */}
        <div
          className="pointer-events-none absolute top-[19px] left-[136px] z-0 h-[768px] w-[1304px] overflow-hidden"
          data-node-id="2379:2135"
          data-name="image 125"
        >
          <div aria-hidden className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={bgSrc}
                alt=""
                className="absolute top-0 left-0 h-full w-full max-w-none object-cover"
              />
            </div>
          </div>
        </div>

        {/* 2379:2264 — headline + body */}
        <div
          className="absolute top-[298.57px] left-[118px] z-10 flex w-[606px] flex-col items-start"
          data-node-id="2379:2264"
          data-name="Frame 1618875863"
        >
          <div
            className="relative w-max max-w-[606px] shrink-0 overflow-visible"
            data-node-id="2379:2265"
            data-name="Section Title"
          >
            <div
              className="relative h-[98px] w-max min-w-[442px] shrink-0 overflow-visible px-[10px]"
              data-node-id="2379:2266"
              data-name="Title"
            >
              <GradientTitle
                nodeId="2379:2267"
                className="h-[98px] max-w-[606px] [word-break:break-word]"
              >
                {titleLines.map((line, i) => (
                  <span
                    key={i}
                    className="block h-[49px] shrink-0 leading-[49px] [word-break:break-word]"
                  >
                    {line}
                  </span>
                ))}
              </GradientTitle>
              <CornerDecor />
            </div>
          </div>

          <div
            className="relative mt-[12px] flex w-[544px] max-w-full shrink-0 flex-col items-start overflow-visible pl-[12px]"
            data-node-id="2379:2272"
            data-name="Frame 1984079417"
          >
            <p
              className={`${interRegular.className} w-[532px] max-w-full shrink-0 text-[18px] leading-[27px] font-normal text-[#f0f0f0] not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
              data-node-id="2379:2273"
            >
              {body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
