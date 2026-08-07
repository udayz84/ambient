import { gilroyMedium, interRegular } from "../hero/fonts";
import { WhiteCtaButton } from "../contact/contact-shared";

const BUILDING_TITLE_GRADIENT =
  "linear-gradient(122.573deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

const BUILDING_TITLE_FRAME = "/resources/building-title-frame.svg";

type ResourcesBuildingProps = {
  data?: any;
};

export function ResourcesBuilding({ data }: ResourcesBuildingProps = {}) {
  const heading = (data?.heading as string) || "";
  const subtitle = (data?.subtitle as string) || "";
  const ctaLabel = (data?.cta_label as string) || "";
  const ctaHref = (data?.cta_href as string) || "";

  return (
    <section
      className="absolute top-[1499px] left-1/2 h-[513px] w-[1440px] -translate-x-1/2 overflow-hidden"
      aria-label="Building with Ambient"
      data-node-id="2379:1606"
    >

      <div
        className="absolute top-[144.54px] left-[98px] z-10 h-[154px] w-[537px]"
        data-node-id="2379:1609"
        data-name="Content"
      >
        <div
          className="absolute top-0 left-0 h-[106px] w-[537px]"
          data-node-id="2379:1610"
          data-name="Frame 1618875832"
        >
          <p
            className={`${gilroyMedium.className} absolute top-[28.46px] left-[269px] -translate-x-1/2 bg-clip-text text-center text-[46px] leading-[49px] font-medium whitespace-nowrap text-transparent not-italic [word-break:break-word]`}
            style={{
              backgroundImage: BUILDING_TITLE_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
            data-node-id="2379:1611"
          >
            {heading}
          </p>
          <div
            className="pointer-events-none absolute top-0 left-0 h-[106px] w-[537px]"
            data-node-id="2379:1612"
            data-name="Frame"
            aria-hidden
          >
            <div className="absolute inset-[-0.47%_0]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={BUILDING_TITLE_FRAME}
                alt=""
                className="block size-full max-w-none"
              />
            </div>
          </div>
        </div>

        <p
          className={`${interRegular.className} absolute top-[106.46px] left-[27px] h-[48px] w-[484px] text-[18px] leading-[27px] font-normal text-[rgba(255,255,255,0.6)] not-italic [word-break:break-word]`}
          data-node-id="2379:1617"
        >
          {subtitle}
        </p>
      </div>

      <div
        className="absolute top-[197.54px] left-[1111px] z-10"
        data-node-id="2379:1618"
      >
        <WhiteCtaButton className="w-[231px]" href={ctaHref} textClassName="text-[16px] leading-[normal]">
          {ctaLabel}
        </WhiteCtaButton>
      </div>
    </section>
  );
}
