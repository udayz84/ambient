import { dmMono, gilroyMedium, gilroySemiBold, interRegular } from "./fonts";
import { HeroMetrics } from "./HeroMetrics";
import { HeroScrollIndicator } from "./HeroScrollIndicator";
import { HeroVisual } from "./HeroVisual";
import { HeroVisualMedia } from "./HeroVisualMedia";

const statValueGradient = (deg: number) =>
  `linear-gradient(${deg}deg, rgb(255, 255, 255) 29.352%, rgba(115, 115, 115, 0.5) 98.158%)`;

export function Hero() {
  return (
    <section
      className="relative -mt-[78px] flex h-[798px] w-full justify-center overflow-hidden bg-black max-[1023px]:h-auto"
      data-node-id="2379:734"
      data-name="Hero Section"
      aria-label="Hero"
    >
      <div className="relative hidden h-full w-full max-w-[1442px] min-[1024px]:block">
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
          className={`${gilroyMedium.className} absolute top-[130px] left-[936px] flex w-[442px] flex-col items-start gap-[15px] [word-break:break-word] not-italic animate-hero-text-fade-in transform-gpu`}
          style={{ animationDelay: '1s', animationDuration: '1000ms' }}
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
      </div>

      {/* MOBILE (<1024px) — dedicated layout, desktop is untouched above */}
      <div className="relative flex w-full flex-col min-[1024px]:hidden pt-[100px] pb-[56px]">
        {/* Text Area */}
        <div className="flex flex-col px-[24px]">
          <h1
            className={`${gilroyMedium.className} w-full bg-clip-text text-[30px] leading-[36px] font-medium text-transparent [word-break:break-word] not-italic`}
            style={{
              backgroundImage:
                "linear-gradient(101.005deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            Limitless AI, reimagined with Ambient efficiency
          </h1>
          <p
            className={`${interRegular.className} mt-[16px] w-full text-[14px] leading-[22px] font-normal text-[#f0f0f0] opacity-80`}
          >
            A new class of AI chips that unlocks richer intelligence from
            microwatt to hyperscaler cloud, once constrained by power, space and
            legacy design tradeoffs
          </p>
        </div>

        {/* Video Area - Sized down to be fully visible on mobile */}
        <div className="relative mt-[32px] w-full h-[300px] overflow-hidden">
          <HeroVisualMedia />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent"
            aria-hidden
          />
        </div>

        {/* Stats Area */}
        <div className="px-[24px] mt-[32px]">
          <div className="grid grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] gap-[16px]">
            <div className="flex flex-col items-start gap-[14px]">
              <p
                className={`${dmMono.className} text-[10px] tracking-[0.16em] uppercase text-[#9be37f]`}
              >
                Real-time AI at edge
              </p>
              <p
                className={`${gilroySemiBold.className} bg-clip-text text-[34px] leading-[1.1] font-semibold text-transparent`}
                style={{
                  backgroundImage: statValueGradient(152.329),
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                100%
              </p>
              <div className="flex flex-col gap-[8px]">
                <p
                  className={`${gilroyMedium.className} text-[16px] leading-[22px] font-medium text-white`}
                >
                  Programmability
                </p>
                <p
                  className={`${interRegular.className} text-[11px] leading-[16px] font-normal text-[#f0f0f0] opacity-65`}
                >
                  AI cores with 4 to 32 bit resolution for control in
                  applications.
                </p>
              </div>
            </div>

            <div className="bg-white/10" />

            <div className="flex flex-col items-start gap-[14px]">
              <p
                className={`${dmMono.className} text-[10px] tracking-[0.16em] uppercase text-[#9be37f]`}
              >
                Scalable arch.
              </p>
              <p
                className={`${gilroySemiBold.className} bg-clip-text font-semibold leading-[1.1] text-transparent`}
                style={{
                  backgroundImage: statValueGradient(154.251),
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                <span className="text-[34px]">512</span>
                <span className="text-[11px]">{` GOPs`}</span>
              </p>
              <div className="flex flex-col gap-[8px]">
                <p
                  className={`${gilroyMedium.className} text-[16px] leading-[22px] font-medium text-white`}
                >
                  Peak Performance
                </p>
                <p
                  className={`${interRegular.className} text-[11px] leading-[16px] font-normal text-[#f0f0f0] opacity-65`}
                >
                  Unmatched AI throughput far exceeds typical low-power MCUs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
