import { interMedium, interRegular } from "./fonts";
import { HeroMetrics } from "./HeroMetrics";
import { HeroScrollIndicator } from "./HeroScrollIndicator";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  return (
    <section
      className="relative -mt-[78px] mx-auto h-[798px] w-full max-w-[1442px] min-w-[1442px] overflow-hidden bg-black"
      data-node-id="2379:734"
      data-name="Hero Section"
      aria-label="Hero"
    >
      <HeroVisual />

      <div className="pointer-events-none absolute top-[79px] left-[95px] flex h-[821px] w-0 items-center justify-center">
        <div className="flex-none rotate-90">
          <div className="relative h-0 w-[821px]" data-node-id="2379:738" data-name="Line 82">
            <div className="absolute inset-[-1px_0_0_0]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hero/line-82.svg"
                alt=""
                className="block size-full max-w-none"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="pointer-events-none absolute top-[77px] left-[93px] h-[4px] w-[5px]"
        data-node-id="2379:739"
        data-name="Vector"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero/line-cap-left.svg"
          alt=""
          className="absolute inset-0 block size-full max-w-none"
          aria-hidden
        />
      </div>

      <div className="pointer-events-none absolute top-[79px] right-[95px] flex h-[597px] w-0 items-center justify-center">
        <div className="flex-none rotate-90">
          <div className="relative h-0 w-[597px]" data-node-id="2379:740" data-name="Line 83">
            <div className="absolute inset-[-0.5px_0]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hero/line-83.svg"
                alt=""
                className="block size-full max-w-none"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="pointer-events-none absolute top-[77.634765625px] left-[1344.5px] h-[4px] w-[5px]"
        data-node-id="2379:741"
        data-name="Vector"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero/line-cap-right.svg"
          alt=""
          className="absolute inset-0 block size-full max-w-none"
          aria-hidden
        />
      </div>

      <div
        className={`${interMedium.className} absolute top-[130px] left-[936px] flex w-[442px] flex-col items-start gap-[15px] [word-break:break-word] not-italic animate-hero-text-fade-in opacity-0`}
        data-node-id="2379:780"
      >
        <h1
          className="min-w-full w-[min-content] shrink-0 bg-clip-text text-[46px] leading-[49px] font-medium text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(101.005deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
          data-node-id="2379:781"
        >
          Limitless AI, reimagined with Ambient efficiency
        </h1>
        <p
          className={`${interRegular.className} shrink-0 text-[16px] leading-[24px] font-normal text-[#f0f0f0] opacity-80 w-[419px]`}
          data-node-id="2379:782"
        >
          A new class of AI chips that unlocks richer intelligence from microwatt
          to hyperscaler cloud, once constrained by power, space and legacy design
          tradeoffs
        </p>
      </div>

      <HeroMetrics />
      <HeroScrollIndicator />
    </section>
  );
}
