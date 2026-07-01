import Image from "next/image";
import { gilroySemiBold, interRegular } from "../hero/fonts";
import { GradientTitle } from "../contact/contact-shared";
import { RepelDots } from "../shared/RepelDots";
import { Corners } from "../shared/Corners";

export function CareersHero() {
  return (
    <section
      className="relative flex h-[798px] w-full justify-center overflow-hidden bg-black"
      data-node-id="2379:8679"
      data-name="Hero Section"
      aria-label="Careers hero"
    >
      <div className="relative h-full w-full max-w-[1442px]">
        {/* 2379:8615 — hero background (page sibling in Figma) */}
        <div
          className="pointer-events-none absolute top-0 left-0 z-0 h-[764px] w-[1440px] overflow-hidden"
          data-node-id="2379:8615"
          data-name="image 105"
        >
          <div className="absolute inset-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/careers/hero-bg.png"
              alt=""
              className="absolute top-0 left-[0.05%] h-full w-[99.91%] max-w-none object-cover"
            />
          </div>
          {/* Edge fade gradients for large screens */}
          <div className="absolute inset-y-0 left-0 w-[200px] bg-gradient-to-r from-black to-transparent max-[1442px]:hidden" />
          <div className="absolute inset-y-0 right-[2px] w-[200px] bg-gradient-to-l from-black to-transparent max-[1442px]:hidden" />
        </div>

        {/* 2379:8680 — ellipse glow */}
        <div
          className="pointer-events-none absolute top-[60.97px] left-[-169.89px] z-[1] size-[657px]"
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
        <div className="pointer-events-none absolute top-[79px] left-[95px] z-[2] flex h-[821px] w-0 items-center justify-center">
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
          className="pointer-events-none absolute top-[77px] left-[93px] z-[2] h-[4px] w-[5px]"
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
        <div className="pointer-events-none absolute top-[79px] right-[95px] z-[2] flex h-[597px] w-0 items-center justify-center">
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
          className="pointer-events-none absolute top-[77.634765625px] left-[1344.5px] z-[2] h-[4px] w-[5px]"
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
          className="absolute top-[245.97px] left-[150px] z-10 flex w-[576px] flex-col items-start gap-[20px]"
          data-node-id="2379:8685"
          data-name="Content"
        >
          <div
            className="relative h-[118px] w-[382px] shrink-0"
            data-node-id="2379:8686"
            data-name="Title"
          >
            <div
              className="pointer-events-none absolute top-[0.81px] left-[0.93px] h-[116px] w-[380px]"
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
              className="absolute top-[10px] left-[20.16px] w-[349px] whitespace-nowrap"
            >
              <p className="mb-0 leading-[49px]">Re-architect the</p>
              <p className="leading-[49px]">physics of AI</p>
            </GradientTitle>
          </div>

          <div
            className="relative flex w-[576px] shrink-0 flex-col items-start gap-[24px] pl-[22px]"
            data-node-id="2379:8693"
            data-name="Sub"
          >
            <p
              className={`${interRegular.className} w-[554px] shrink-0 text-[18px] leading-[27px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
              data-node-id="2379:8694"
            >
              Don&apos;t iterate on legacy silicon. Build the fundamental compute
              substrate for the next generation of intelligence.
            </p>

            <a
              href="#open-roles"
              className={`${gilroySemiBold.className} relative block h-[48px] w-[231px] shrink-0 shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]`}
              data-node-id="2379:8695"
              data-name="Cta"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
              />
              <span className="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[inherit]">
                <RepelDots />
              </span>
              <span
                className="absolute z-10 top-[calc(50%-8px)] left-[47.11px] text-[14px] leading-[normal] whitespace-nowrap text-white uppercase not-italic"
                data-node-id="2379:8696"
              >
                VIEW OPEN ROLES
              </span>
              <img
                src="/careers/cta-dot.svg"
                alt=""
                className="pointer-events-none absolute z-10 top-1/2 left-[177.5px] size-[6px] -translate-y-1/2"
                aria-hidden
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 z-[2] shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)] rounded-[inherit]"
              />
              
              {/* Custom Corners that pop out slightly to avoid the inset shadow */}
              <div className="pointer-events-none absolute -top-[2px] -right-[2px] z-20 flex size-[4px] items-center justify-center">
                <div className="rotate-180 flex-none">
                  <div className="relative size-[4px]">
                    <img src="/hero/corner-tag-2.svg" alt="" width={4} height={4} className="block size-full max-w-none" aria-hidden />
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute -top-[2px] -left-[2px] z-20 flex size-[4px] items-center justify-center">
                <div className="-scale-y-100 flex-none">
                  <div className="relative size-[4px]">
                    <img src="/hero/corner-tag-1.svg" alt="" width={4} height={4} className="block size-full max-w-none" aria-hidden />
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute -bottom-[2px] -right-[2px] z-20 flex size-[4px] items-center justify-center">
                <div className="-scale-x-100 flex-none">
                  <div className="relative size-[4px]">
                    <img src="/hero/corner-tag-2.svg" alt="" width={4} height={4} className="block size-full max-w-none" aria-hidden />
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute -bottom-[2px] -left-[2px] z-20 flex size-[4px] items-center justify-center">
                <div className="flex-none">
                  <div className="relative size-[4px]">
                    <img src="/hero/corner-tag-1.svg" alt="" width={4} height={4} className="block size-full max-w-none" aria-hidden />
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* 2379:8707 — scroll indicator */}
        <div
          className={`${interRegular.className} pointer-events-none absolute top-[616px] left-[1335.5px] z-10 flex h-[75px] w-[18px] flex-col content-stretch items-center gap-[10px]`}
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
      </div>
    </section>
  );
}

