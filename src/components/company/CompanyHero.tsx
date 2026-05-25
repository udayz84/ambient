import { interRegular } from "../hero/fonts";
import { CornerDecor, GradientTitle } from "../contact/contact-shared";

const HERO_BG_GRADIENT =
  "linear-gradient(132.873deg, rgb(0, 0, 0) 31.15%, rgba(0, 0, 0, 0) 76.987%), linear-gradient(187.824deg, rgba(0, 0, 0, 0) 49.061%, rgb(0, 0, 0) 90.541%)";

export function CompanyHero() {
  return (
    <section
      className="relative h-[787px] w-full max-w-[1440px] min-w-[1440px] overflow-hidden bg-black"
      data-node-id="2379:2135"
      data-name="Hero Section"
      aria-label="Company hero"
    >
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
              src="/company/hero-bg.png"
              alt=""
              className="absolute top-0 left-0 h-full w-[99.97%] max-w-none object-cover"
            />
          </div>
          <div
            className="absolute inset-0"
            style={{ backgroundImage: HERO_BG_GRADIENT }}
          />
        </div>
      </div>

      {/* 2379:2264 — headline + body */}
      <div
        className="absolute top-[298.57px] left-[118px] z-10 flex w-[606px] flex-col items-start"
        data-node-id="2379:2264"
        data-name="Frame 1618875863"
      >
        <div
          className="relative flex w-[442px] shrink-0 flex-col items-start"
          data-node-id="2379:2265"
          data-name="Section Title"
        >
          <div
            className="relative flex w-[442px] shrink-0 flex-col items-start px-[10px]"
            data-node-id="2379:2266"
            data-name="Title"
          >
            <GradientTitle nodeId="2379:2267" className="w-[422px]">
              <p className="mb-0 leading-[49px]">A new paradigm for</p>
              <p className="leading-[49px]">efficient AI compute</p>
            </GradientTitle>
            <CornerDecor />
          </div>
        </div>

        <div
          className="relative mt-[12px] flex w-[544px] shrink-0 flex-col items-start pl-[12px]"
          data-node-id="2379:2272"
          data-name="Frame 1984079417"
        >
          <p
            className={`${interRegular.className} w-[532px] shrink-0 text-[18px] leading-[27px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
            data-node-id="2379:2273"
          >
            We build energy-aware, programmable, mixed-signal AI processors that
            unlock orders-of-magnitude improvements in performance-per-watt,
            enabling scalable intelligence across edge, enterprise, and cloud.
          </p>
        </div>
      </div>
    </section>
  );
}
