/* eslint-disable @next/next/no-img-element */
import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";

const SHAPE = "/applications/wearables/rectangle-divider.svg";

const TITLE_GRADIENT =
  "linear-gradient(107.367deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

const CTA_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

type PanelData = {
  title: string;
  body: string;
  cta: string;
  ctaLeft: string;
};

const PANELS: PanelData[] = [
  {
    title: "Discuss Your Product Roadmap",
    body: "Explore how Ambient AI can unlock new capabilities in your wearable product. Strategic planning session with our applications team.",
    cta: "Schedule Strategy Call",
    ctaLeft: "calc(50% - 100px)",
  },
  {
    title: "Talk to a Hardware Engineer",
    body: "Be the first to access our upcoming Vision, Sound, and Industrial modules.",
    cta: "Schedule Technical Review",
    ctaLeft: "calc(50% - 114px)",
  },
];

function TitleFrameCorners() {
  return (
    <div className="pointer-events-none absolute left-px top-[1.03px] size-full">
      {/* Bottom-left */}
      <div className="absolute left-px top-[103.03px] h-[4px] w-[3.071px]">
        <img alt="" src="/applications/wearables/vector-59.svg" className="block size-full max-w-none" />
      </div>
      {/* Bottom-right */}
      <div className="absolute left-[446.93px] top-[103.03px] flex h-[4px] w-[3.071px] items-center justify-center">
        <div className="-scale-y-100 flex-none rotate-180">
          <div className="h-[4px] w-[3.071px]">
            <img alt="" src="/applications/wearables/vector-60.svg" className="block size-full max-w-none" />
          </div>
        </div>
      </div>
      {/* Top-left */}
      <div className="absolute left-px top-0 flex h-[4px] w-[3.071px] items-center justify-center">
        <div className="-scale-y-100 flex-none">
          <div className="h-[4px] w-[3.071px]">
            <img alt="" src="/applications/wearables/vector-59.svg" className="block size-full max-w-none" />
          </div>
        </div>
      </div>
      {/* Top-right */}
      <div className="absolute left-[446.93px] top-0 flex h-[4px] w-[3.071px] items-center justify-center">
        <div className="flex-none rotate-180">
          <div className="h-[4px] w-[3.071px]">
            <img alt="" src="/applications/wearables/vector-60.svg" className="block size-full max-w-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CtaPanel({ data }: { data: PanelData }) {
  return (
    <div className="relative h-[320px] w-[558px] shrink-0">
      {/* Shape background */}
      <div className="pointer-events-none absolute left-[0.5px] top-[0.12px] h-[319.572px] w-[557.336px]">
        <img
          alt=""
          src={SHAPE}
          className="absolute inset-0 block size-full max-w-none"
          aria-hidden
        />
      </div>
      {/* Content — vertically centered */}
      <div className="absolute left-[52px] top-[calc(50%-6px)] w-[450px] -translate-y-1/2">
        <div className="flex w-full flex-col gap-[36px]">
          {/* Title with frame */}
          <div className="relative h-[108px] w-full">
            <p
              className={`${gilroyMedium.className} absolute top-[7.03px] left-1/2 w-[473.877px] -translate-x-1/2 bg-clip-text text-center text-[46px] leading-[49px] font-medium text-transparent whitespace-nowrap not-italic [word-break:break-word]`}
              style={{
                backgroundImage: TITLE_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              {data.title}
            </p>
            <TitleFrameCorners />
          </div>
          {/* Body + CTA */}
          <div className="flex w-full flex-col gap-[20px]">
            <p
              className={`${interRegular.className} h-[48px] w-full text-center text-[14px] leading-[24px] tracking-[-0.3125px] text-white not-italic [word-break:break-word]`}
            >
              {data.body}
            </p>
            {/* CTA */}
            <div
              className={`${gilroyMedium.className} relative h-[48px] w-full shrink-0 ${CTA_SHADOW}`}
              data-name="Cta"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
              />
              <p
                className="absolute top-[calc(50%-14px)] whitespace-nowrap text-[16px] leading-[28px] font-medium text-white uppercase not-italic"
                style={{ left: data.ctaLeft }}
              >
                {data.cta}
              </p>
              <Corners
                leftSrc="/applications/wearables/vector-47.svg"
                rightSrc="/applications/wearables/vector-46.svg"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WearablesFooterAccent() {
  return (
    <section
      className="relative z-20 mb-0 min-[1024px]:mb-[-409px] flex w-full justify-center overflow-x-clip bg-transparent"
      data-name="Footer CTA"
      aria-label="Contact options"
    >
      {/* DESKTOP (>=1024px) */}
      <div className="relative hidden w-full max-w-[1440px] min-[1024px]:block">
        <div className="flex w-full justify-center gap-[84px] pt-[89.5px]">
          {PANELS.map((panel) => (
            <CtaPanel key={panel.title} data={panel} />
          ))}
        </div>
      </div>

      {/* MOBILE (<1024px) */}
      <div className="relative flex w-full flex-col items-center gap-[20px] px-[24px] pt-[60px] pb-[40px] min-[1024px]:hidden">
        {PANELS.map((panel) => (
          <div key={panel.title} className="relative w-full">
            {/* Shape background */}
            <div className="pointer-events-none absolute inset-0">
              <img
                alt=""
                src={SHAPE}
                className="absolute inset-0 block size-full max-w-none"
                aria-hidden
              />
            </div>
            {/* Content */}
            <div className="relative flex w-full flex-col items-center gap-[24px] px-[28px] py-[28px]">
              <div className="relative w-full">
                <p
                  className={`${gilroyMedium.className} bg-clip-text text-center text-[26px] leading-[30px] font-medium text-transparent not-italic [word-break:break-word]`}
                  style={{
                    backgroundImage: TITLE_GRADIENT,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                  }}
                >
                  {panel.title}
                </p>
                <Corners
                  leftSrc="/applications/wearables/vector-59.svg"
                  rightSrc="/applications/wearables/vector-60.svg"
                />
              </div>
              <p
                className={`${interRegular.className} w-full text-center text-[13px] leading-[20px] tracking-[-0.3125px] text-white not-italic`}
              >
                {panel.body}
              </p>
              {/* CTA */}
              <div
                className={`${gilroyMedium.className} relative h-[48px] w-full shrink-0 ${CTA_SHADOW}`}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
                />
                <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[14px] leading-[28px] font-medium text-white uppercase not-italic">
                  {panel.cta}
                </p>
                <Corners
                  leftSrc="/applications/wearables/vector-47.svg"
                  rightSrc="/applications/wearables/vector-46.svg"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
