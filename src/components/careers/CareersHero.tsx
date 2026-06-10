import Image from "next/image";
import { interRegular, interSemiBold } from "../hero/fonts";
import { GradientTitle } from "../contact/contact-shared";

const cornerCtaLeft = "/hero/corner-tag-1.svg";
const cornerCtaRight = "/hero/corner-tag-2.svg";

export function CareersHero() {
  return (
    <section
      className="relative h-[600px] w-full overflow-hidden bg-black md:h-[700px] lg:h-[798px]"
      data-node-id="2379:8679"
      data-name="Hero Section"
      aria-label="Careers hero"
    >
      {/* 2379:8615 — hero background */}
      <div
        className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full overflow-hidden md:h-[764px] md:w-[1440px] md:left-1/2 md:-translate-x-1/2 lg:left-0 lg:translate-x-0"
        data-node-id="2379:8615"
        data-name="image 105"
      >
        <div className="absolute inset-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/careers/hero-bg.png"
            alt=""
            className="absolute top-0 left-0 h-full w-full object-cover object-center md:left-[0.05%] md:w-[99.91%]"
          />
        </div>
      </div>

      {/* 2379:8680 — ellipse glow */}
      <div
        className="pointer-events-none absolute top-[40px] left-[-120px] z-[1] size-[500px] md:left-[-169.89px] md:size-[657px] lg:top-[60.97px]"
        data-node-id="2379:8680"
        data-name="Ellipse 16188"
      >
        <div className="absolute inset-[-60.88%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/careers/hero-ellipse-glow.svg"
            alt=""
            className="block size-full max-w-none"
            aria-hidden
          />
        </div>
      </div>

      {/* 2379:8681 — left vertical line */}
      <div className="pointer-events-none absolute top-[79px] left-[95px] z-[2] hidden h-[821px] w-0 items-center justify-center lg:flex">
        <div className="flex-none rotate-90">
          <div className="relative h-0 w-[821px]" data-node-id="2379:8681" data-name="Line 82">
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
        className="pointer-events-none absolute top-[77px] left-[93px] z-[2] hidden h-[4px] w-[5px] lg:block"
        data-node-id="2379:8682"
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

      {/* 2379:8683 — right vertical line */}
      <div className="pointer-events-none absolute top-[79px] right-[95px] z-[2] hidden h-[597px] w-0 items-center justify-center lg:flex">
        <div className="flex-none rotate-90">
          <div className="relative h-0 w-[597px]" data-node-id="2379:8683" data-name="Line 83">
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
        className="pointer-events-none absolute top-[77.634765625px] right-[93.5px] z-[2] hidden h-[4px] w-[5px] lg:block"
        data-node-id="2379:8684"
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

      {/* 2379:8685 — content */}
      <div
        className="absolute top-[160px] left-0 z-10 flex w-full flex-col items-start gap-[20px] px-[24px] md:top-[200px] md:px-[60px] lg:top-[245.97px] lg:left-[150px] lg:w-[576px] lg:px-0"
        data-node-id="2379:8685"
        data-name="Content"
      >
        <div
          className="relative h-auto w-full max-w-[382px] shrink-0"
          data-node-id="2379:8686"
          data-name="Title"
        >
          <div
            className="pointer-events-none relative hidden h-[116px] w-[380px] lg:block"
            data-node-id="2379:8687"
            data-name="Frame"
          >
            <div className="absolute inset-[-0.43%_-0.13%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/careers/hero-title-frame.svg"
                alt=""
                className="block size-full max-w-none"
                aria-hidden
              />
            </div>
          </div>
          <GradientTitle
            nodeId="2379:8692"
            gradientDeg="102.971deg"
            className="whitespace-normal text-[36px] leading-[42px] md:text-[42px] md:leading-[49px] lg:absolute lg:top-[10px] lg:left-[20.16px] lg:w-[349px] lg:whitespace-nowrap lg:text-[46px] lg:leading-[49px]"
          >
            <p className="mb-0 leading-inherit">Re-architect the</p>
            <p className="leading-inherit">physics of AI</p>
          </GradientTitle>
        </div>

        <div
          className="relative flex w-full max-w-[576px] shrink-0 flex-col items-start gap-[24px] pl-0 md:pl-[22px]"
          data-node-id="2379:8693"
          data-name="Sub"
        >
          <p
            className={`${interRegular.className} w-full shrink-0 text-[16px] leading-[24px] font-normal text-[#f0f0f0] not-italic [word-break:break-word] md:w-[554px] md:text-[18px] md:leading-[27px]`}
            data-node-id="2379:8694"
          >
            Don&apos;t iterate on legacy silicon. Build the fundamental compute
            substrate for the next generation of intelligence.
          </p>

          <a
            href="#open-roles"
            className={`${interSemiBold.className} relative block h-[48px] w-[220px] shrink-0 shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)] lg:w-[231px]`}
            data-node-id="2379:8695"
            data-name="Cta"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
            />
            <span
              className="absolute top-[calc(50%-8px)] left-[30px] text-[13px] leading-[normal] whitespace-nowrap text-white uppercase not-italic lg:left-[47.11px] lg:text-[14px]"
              data-node-id="2379:8696"
            >
              VIEW OPEN ROLES
            </span>
            <Image
              src="/careers/cta-dot.svg"
              alt=""
              width={6}
              height={6}
              className="pointer-events-none absolute top-1/2 left-[160px] size-[6px] -translate-y-1/2 lg:left-[177.5px]"
              aria-hidden
            />
            <CtaCorners />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
            />
          </a>
        </div>
      </div>

      {/* 2379:8707 — scroll indicator */}
      <div
        className={`${interRegular.className} pointer-events-none absolute bottom-[30px] right-[40px] z-10 hidden flex-col content-stretch items-center gap-[10px] lg:flex`}
        data-node-id="2379:8707"
        aria-hidden
      >
        <div
          className="relative size-[18px] shrink-0 overflow-clip"
          data-node-id="2379:8708"
          data-name="mouse-01"
        >
          <div className="absolute inset-[8.33%_18.75%]" data-name="elements">
            <div className="absolute inset-[-5%_-6.67%]">
              <Image
                src="/hero/mouse-scroll.svg"
                alt=""
                width={18}
                height={18}
                className="block size-full max-w-none"
              />
            </div>
          </div>
        </div>
        <div
          className="relative flex h-[47px] min-w-full w-[min-content] shrink-0 items-center justify-center"
          style={{ containerType: "size" }}
        >
          <div className="h-[100cqw] flex-none rotate-90">
            <p
              className="relative h-full w-[47px] text-[12px] leading-[1.4] font-normal text-[#505f4b] [word-break:break-word] not-italic"
              data-node-id="2379:8709"
            >
              SCROLL
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaCorners() {
  return (
    <>
      <div className="pointer-events-none absolute top-0 right-0 flex size-[4px] items-center justify-center">
        <div className="rotate-180 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="block size-full max-w-none" src={cornerCtaRight} aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute top-0 left-0 flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="block size-full max-w-none" src={cornerCtaLeft} aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute right-0 bottom-0 flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 rotate-180 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="block size-full max-w-none" src={cornerCtaRight} aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 size-[4px]">
        <div className="absolute inset-[0_0_-12.5%_-12.5%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src={cornerCtaLeft} aria-hidden />
        </div>
      </div>
    </>
  );
}
