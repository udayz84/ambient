/* eslint-disable @next/next/no-img-element */
import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";

const TITLE_GRADIENT =
  "linear-gradient(123.792deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

const SUBTITLE =
  "Accelerate your time-to-market. Our System-on-Modules (SOMs) provide fully integrated, production-ready AI hardware that drops directly into your carrier board.";

const IMG_A = "/applications/som-img-a.png";
const IMG_B = "/applications/som-img-b.png";

function Visual1() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <img
        alt=""
        aria-hidden
        src={IMG_A}
        className="absolute left-0 top-[0.48%] h-[100.61%] w-full max-w-none object-cover"
      />
    </div>
  );
}

function Visual2() {
  return (
    <div className="absolute inset-0 overflow-hidden blur-[4px] opacity-50">
      <img
        alt=""
        aria-hidden
        src={IMG_B}
        className="absolute inset-0 size-full max-w-none object-cover"
      />
    </div>
  );
}

function Visual3() {
  return (
    <div className="absolute inset-0 overflow-hidden blur-[4px] opacity-50">
      <img
        alt=""
        aria-hidden
        src={IMG_B}
        className="absolute inset-0 size-full max-w-none object-cover"
      />
      <div className="absolute inset-0 overflow-hidden">
        <img
          alt=""
          aria-hidden
          src={IMG_A}
          className="absolute left-0 top-[0.48%] h-[100.61%] w-full max-w-none object-cover"
        />
      </div>
    </div>
  );
}

function SomLabel() {
  return (
    <div className="flex flex-col items-center justify-center gap-[12px]">
      <p
        className={`${gilroyMedium.className} text-[38px] leading-[47px] font-medium whitespace-nowrap text-white not-italic`}
      >
        &lt;1mW
      </p>
      <p
        className={`${interRegular.className} text-[18px] leading-[27px] font-normal uppercase whitespace-nowrap text-[#f0f0f0] not-italic`}
      >
        GPX-Edge Micro
      </p>
      <div className="flex items-center justify-center">
        <div className="rotate-180">
          <img
            alt=""
            aria-hidden
            src="/applications/som-line.svg"
            className="block h-[1px] w-[191.796px] max-w-none"
          />
        </div>
      </div>
      <p
        className={`${interRegular.className} text-[16px] leading-[24px] font-normal tracking-[-0.3125px] whitespace-nowrap text-[rgba(255,255,255,0.6)] not-italic`}
      >
        Wearables &amp; Hearables
      </p>
    </div>
  );
}

function SomCard({ visual, isUpcoming }: { visual: React.ReactNode; isUpcoming?: boolean }) {
  return (
    <div className="flex w-full flex-col items-center gap-[32px]">
      <div className="flex h-[320px] w-full items-center justify-center">
        <div 
          className={`relative flex w-full items-center justify-center overflow-clip transition-transform ${isUpcoming ? 'h-[260px] scale-95' : 'h-[320px]'}`}
        >
          {visual}
          {isUpcoming && (
            <div className="absolute z-10 flex items-center justify-center border-[0.5px] border-[#cca839] bg-[rgba(0,0,0,0.8)] px-[16px] py-[6px]">
              <span className="text-[#cca839] opacity-70">|</span>
              <span className="mx-[12px] font-mono text-[10px] uppercase tracking-[1px] text-[#cca839]">
                LAUNCHING SOON
              </span>
              <span className="text-[#cca839] opacity-70">|</span>
            </div>
          )}
        </div>
      </div>
      <SomLabel />
    </div>
  );
}

function ViewSomsCta() {
  return (
    <div className="relative flex h-[48px] w-[200px] shrink-0 items-center justify-center gap-[10px] px-[20px] py-[10px] drop-shadow-[0px_42px_53.5px_rgba(69,196,24,0.2)]">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
      />
      <span className="relative flex items-center gap-[10px]">
        <p
          className={`${gilroyMedium.className} text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic`}
        >
          View SOMs
        </p>
        <img
          alt=""
          aria-hidden
          src="/applications/som-arrow.svg"
          className="size-[18px]"
        />
      </span>
      <Corners />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
      />
    </div>
  );
}

function DiscussCta() {
  return (
    <div className="relative flex shrink-0 items-center bg-[rgba(226,241,202,0.12)] px-[20px] py-[10px]">
      <p
        className={`${gilroyMedium.className} text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic`}
      >
        Discuss Your Use Case
      </p>
      <Corners />
    </div>
  );
}

const CARDS = [
  { key: "som-1", visual: <Visual1 />, isUpcoming: false },
  { key: "som-2", visual: <Visual2 />, isUpcoming: true },
  { key: "som-3", visual: <Visual3 />, isUpcoming: true },
];

export function ApplicationsPageSom() {
  return (
    <section
      className="relative z-20 mb-0 min-[1024px]:mb-[-409px] flex w-full justify-center overflow-hidden bg-transparent"
      aria-label="Don't start from scratch"
    >
      {/* DESKTOP (>=1024px) */}
      <div className="hidden w-full max-w-[1440px] flex-col items-center gap-[72px] pt-[120px] pb-[120px] min-[1024px]:flex">
        {/* Header */}
        <div className="flex w-full flex-col items-center gap-[24px]">
          <div className="relative inline-block px-[14px]">
            <h2
              className={`${gilroyMedium.className} bg-clip-text text-center text-[46px] leading-[49px] font-medium whitespace-nowrap text-transparent not-italic`}
              style={{
                backgroundImage: TITLE_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
              data-node-id="2438:4151"
            >
              Don&apos;t start from scratch.
            </h2>
            <Corners />
          </div>
          <p
            className={`${interRegular.className} w-[800px] text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
            data-node-id="2438:4157"
          >
            {SUBTITLE}
          </p>
        </div>

        {/* 3 SOM cards */}
        <div className="flex w-full items-start justify-center gap-[40px]">
          {CARDS.map((card) => (
            <SomCard key={card.key} visual={card.visual} isUpcoming={card.isUpcoming} />
          ))}
        </div>

        {/* CTA row */}
        <div className="flex items-center justify-center gap-[24px]">
          <ViewSomsCta />
          <DiscussCta />
        </div>
      </div>

      {/* MOBILE (<1024px) */}
      <div className="flex w-full flex-col items-center gap-[56px] px-[24px] pt-[72px] pb-[80px] min-[1024px]:hidden">
        <div className="flex w-full flex-col items-center gap-[20px]">
          <div className="relative inline-block px-[10px]">
            <h2
              className={`${gilroyMedium.className} bg-clip-text text-center text-[32px] leading-[38px] font-medium text-transparent not-italic [word-break:break-word]`}
              style={{
                backgroundImage: TITLE_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              Don&apos;t start from scratch.
            </h2>
            <Corners />
          </div>
          <p
            className={`${interRegular.className} w-full max-w-[332px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-65 not-italic`}
          >
            {SUBTITLE}
          </p>
        </div>
        <div className="flex w-full flex-col items-center gap-[48px]">
          {CARDS.map((card) => (
            <SomCard key={card.key} visual={card.visual} isUpcoming={card.isUpcoming} />
          ))}
        </div>
        <div className="flex flex-col items-center gap-[16px]">
          <ViewSomsCta />
          <DiscussCta />
        </div>
      </div>
    </section>
  );
}
