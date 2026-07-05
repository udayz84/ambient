import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { WearablesCarousel } from "./WearablesCarousel";

const WEARABLES_BG_GRADIENT =
  "linear-gradient(260.505deg, rgba(255, 255, 255, 0.12) 0.12143%, rgba(255, 255, 255, 0.6) 44.084%, rgba(255, 255, 255, 0) 113.37%)";

const TITLE_GRADIENT =
  "linear-gradient(104.008deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

const SUBTITLE =
  "Hospital-grade biometric tracking and voice processing directly to the ring, wrist, or lens. No cloud latency or battery compromise.";

function PrimaryCta() {
  return (
    <a
      href="#"
      className={`${gilroyMedium.className} relative block h-[48px] w-[251px] shrink-0 cursor-pointer overflow-hidden shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]`}
      data-node-id="2509:389"
      data-name="Cta"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
      />
      <Corners
        leftSrc="/applications/wearables/vector-47.svg"
        rightSrc="/applications/wearables/vector-46.svg"
      />
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[16px] leading-[28px] font-medium text-white uppercase not-italic">
        Talk About Your Roadmap
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
      />
    </a>
  );
}

function SecondaryCta() {
  return (
    <a
      href="#"
      className={`${gilroyMedium.className} relative flex shrink-0 cursor-pointer items-center overflow-clip bg-[rgba(226,241,202,0.12)] px-[20px] py-[10px]`}
      data-node-id="2509:400"
      data-name="CTA - Secondary"
    >
      <span className="whitespace-nowrap text-[16px] leading-[28px] font-medium text-white uppercase not-italic">
        Talk a Hardware Engineer.
      </span>
      <Corners
        leftSrc="/applications/wearables/vector-42.svg"
        rightSrc="/applications/wearables/vector-43.svg"
      />
    </a>
  );
}

export function WearablesHero() {
  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-black"
      data-node-id="2509:372"
      data-name="Hero Section"
      aria-label="Wearables hero"
    >
      {/* DESKTOP (>=1024px) */}
      <div className="relative hidden h-[800px] w-full max-w-[1440px] min-[1024px]:block">
        {/* Background image 162 */}
        <div
          className="pointer-events-none absolute top-[-37px] left-0 h-[824.693px] w-[1440px]"
          data-node-id="2509:373"
          data-name="image 162"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/applications/wearables/hero-bg-162.png"
            alt=""
            className="absolute inset-0 size-full max-w-none object-cover"
            aria-hidden
          />
        </div>

        {/* "Wearables" oversized background text */}
        <div
          className="pointer-events-none absolute top-[122.92px] left-1/2 -translate-x-1/2"
          data-node-id="2509:374"
          data-name="BG"
        >
          <p
            className="whitespace-nowrap bg-clip-text text-center text-[200px] leading-[210px] tracking-[0.5px] font-extrabold text-transparent uppercase not-italic [word-break:break-word]"
            style={{
              backgroundImage: WEARABLES_BG_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
            data-node-id="2509:376"
          >
            Wearables
          </p>
        </div>

        <WearablesCarousel />

        {/* Foreground image 163 with gradient overlay */}
        <div
          className="pointer-events-none absolute top-[-37px] left-0 h-[876px] w-[1440px]"
          data-node-id="2509:377"
          data-name="image 163"
          aria-hidden
        >
          <div className="absolute inset-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/applications/wearables/hero-bg-163.png"
              alt=""
              className="absolute top-[-11.78%] left-0 size-full max-w-none object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0)] from-[63.47%] to-black to-[90.411%]" />
        </div>

        {/* Title — "Clinical precision. Coin-cell power." */}
        <div
          className="absolute bottom-[103.19px] left-[98px] flex flex-col items-start"
          data-node-id="2509:378"
          data-name="Content"
        >
          <div
            className="relative h-[118px] w-[411px] shrink-0"
            data-node-id="2509:379"
            data-name="Title"
          >
            <div
              className="absolute top-[0.81px] left-[0.82px] h-[116px] w-[409.266px]"
              data-node-id="2509:380"
              data-name="Frame"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/applications/wearables/title-frame.svg"
                alt=""
                className="block size-full max-w-none"
                aria-hidden
              />
            </div>
            <div
              className={`${gilroyMedium.className} absolute top-[10px] left-1/2 -translate-x-1/2 text-center text-[46px] leading-[49px] font-medium text-transparent not-italic [word-break:break-word]`}
              style={{
                backgroundImage: TITLE_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
              data-node-id="2509:385"
            >
              <span className="block h-[49px] leading-[49px] whitespace-nowrap">
                Clinical precision.
              </span>
              <span className="block h-[49px] leading-[49px] whitespace-nowrap">
                Coin-cell power.
              </span>
            </div>
          </div>
        </div>

        {/* Subtitle + CTAs */}
        <div
          className="absolute top-[624px] left-[790px] flex w-[590px] flex-col items-start gap-[12px] pl-[22px]"
          data-node-id="2509:386"
          data-name="Sub"
        >
          <p
            className={`${interRegular.className} w-[591.92px] shrink-0 text-[18px] leading-[27px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
            data-node-id="2509:387"
          >
            {SUBTITLE}
          </p>
          <div
            className="flex shrink-0 items-start gap-[24px]"
            data-node-id="2509:388"
          >
            <PrimaryCta />
            <SecondaryCta />
          </div>
        </div>
      </div>

      {/* MOBILE (<1024px) */}
      <div className="relative flex w-full flex-col overflow-hidden min-[1024px]:hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/applications/wearables/hero-bg-163.png"
            alt=""
            className="size-full max-w-none object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        </div>

        <WearablesCarousel />

        <div className="relative z-10 flex w-full flex-col items-start gap-[20px] px-[24px] pt-[104px] pb-[64px]">
          {/* Title */}
          <div className="relative h-[82px] w-full max-w-[300px] shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/applications/wearables/title-frame.svg"
              alt=""
              className="block size-full max-w-none"
              aria-hidden
            />
            <div
              className={`${gilroyMedium.className} absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center text-[28px] leading-[30px] font-medium text-transparent not-italic`}
              style={{
                backgroundImage: TITLE_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              <span className="block">Clinical precision.</span>
              <span className="block">Coin-cell power.</span>
            </div>
          </div>

          {/* Subtitle */}
          <p
            className={`${interRegular.className} w-full max-w-[327px] text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic`}
          >
            {SUBTITLE}
          </p>

          {/* CTAs */}
          <div className="flex w-full flex-col items-stretch gap-[14px]">
            <a
              href="#"
              className={`${gilroyMedium.className} relative flex h-[48px] w-full cursor-pointer items-center justify-center overflow-hidden shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]`}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
              />
              <Corners
                leftSrc="/applications/wearables/vector-47.svg"
                rightSrc="/applications/wearables/vector-46.svg"
              />
              <span className="relative whitespace-nowrap text-[14px] leading-[28px] font-medium text-white uppercase not-italic">
                Talk About Your Roadmap
              </span>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
              />
            </a>
            <a
              href="#"
              className={`${gilroyMedium.className} relative flex h-[48px] w-full cursor-pointer items-center justify-center overflow-clip bg-[rgba(226,241,202,0.12)]`}
            >
              <span className="relative whitespace-nowrap text-[14px] leading-[28px] font-medium text-white uppercase not-italic">
                Talk a Hardware Engineer.
              </span>
              <Corners
                leftSrc="/applications/wearables/vector-42.svg"
                rightSrc="/applications/wearables/vector-43.svg"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
