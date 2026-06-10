import Image from "next/image";
import { gilroyMedium, interRegular } from "../hero/fonts";

const ctaTextClass = `${interRegular.className} text-[14px] leading-[normal] font-normal`;

const cornerLeft = "/hero/corner-tag-1.svg";
const cornerRight = "/hero/corner-tag-2.svg";
const ctaDot = "/navbar/cta-dot.svg";

export function EcosystemHeader() {
  return (
    <div
      className="relative mx-auto w-[804.2265625px] shrink-0"
      data-node-id="2379:1028"
      data-name="Group 89"
    >
      <div className="relative grid w-full grid-cols-1 grid-rows-[max-content] place-items-start leading-[0]">
        <h2
          className={`${gilroyMedium.className} relative col-start-1 row-start-1 mt-[14px] ml-[28.23px] bg-clip-text text-center text-[46px] leading-[49px] font-medium whitespace-nowrap text-[transparent] not-italic [word-break:break-word]`}
          style={{
            backgroundImage:
              "linear-gradient(134.597deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
          }}
          data-node-id="2379:1029"
        >
          Supported by a growing ecosystem
        </h2>

        <div className="relative col-start-1 row-start-1 mt-0 ml-[800.23px] flex size-[4px] items-center justify-center">
          <div className="rotate-180 flex-none">
            <div className="relative size-[4px]" data-node-id="2379:1030">
              <div className="absolute inset-[0_0_-12.5%_-12.5%]">
                <Image
                  src={cornerRight}
                  alt=""
                  width={4}
                  height={4}
                  className="block size-full max-w-none"
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </div>
        <div className="relative col-start-1 row-start-1 mt-[70px] ml-[800.23px] flex size-[4px] items-center justify-center">
          <div className="-scale-y-100 rotate-180 flex-none">
            <div className="relative size-[4px]" data-node-id="2379:1031">
              <div className="absolute inset-[0_0_-12.5%_-12.5%]">
                <Image
                  src={cornerRight}
                  alt=""
                  width={4}
                  height={4}
                  className="block size-full max-w-none"
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </div>
        <div className="relative col-start-1 row-start-1 mt-[70px] ml-0 size-[4px]">
          <div className="absolute inset-[0_0_-12.5%_-12.5%]">
            <Image
              src={cornerLeft}
              alt=""
              width={4}
              height={4}
              className="block size-full max-w-none"
              aria-hidden
            />
          </div>
        </div>
        <div className="relative col-start-1 row-start-1 mt-0 ml-0 flex size-[4px] items-center justify-center">
          <div className="-scale-y-100 flex-none">
            <div className="relative size-[4px]" data-node-id="2379:1033">
              <div className="absolute inset-[0_0_-12.5%_-12.5%]">
                <Image
                  src={cornerLeft}
                  alt=""
                  width={4}
                  height={4}
                  className="block size-full max-w-none"
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </div>

        <p
          className={`${interRegular.className} relative col-start-1 row-start-1 mt-[94px] ml-[1.23px] w-[803px] text-center text-[18px] leading-[27px] font-normal text-white not-italic [word-break:break-word]`}
          data-node-id="2379:1034"
        >
          Ambient works with partners across silicon, development, distribution,
          and system integration, helping teams move from evaluation to
          deployment with confidence
        </p>

        <a
          href="#"
          className="relative col-start-1 row-start-1 z-[1] mt-[174.5px] flex h-[44px] w-[186px] items-center justify-center gap-[10px] justify-self-center shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]"
          data-node-id="2379:1035"
          data-name="Cta"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
          />
          <p
            className={`${ctaTextClass} relative shrink-0 whitespace-nowrap text-white uppercase not-italic [word-break:break-word]`}
            data-node-id="2379:1036"
          >
            WORK WITH US
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ctaDot}
            alt=""
            width={6}
            height={6}
            className="relative size-[6px] shrink-0"
            aria-hidden
          />
          <CornerDecorations />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
          />
        </a>
      </div>
    </div>
  );
}

function CornerDecorations() {
  return (
    <>
      <div className="absolute top-0 right-0 flex size-[4px] items-center justify-center">
        <div className="rotate-180 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cornerRight}
                alt=""
                className="block size-full max-w-none"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cornerLeft}
                alt=""
                className="block size-full max-w-none"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute right-0 bottom-0 flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 rotate-180 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cornerRight}
                alt=""
                className="block size-full max-w-none"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 size-[4px]">
        <div className="absolute inset-[0_0_-12.5%_-12.5%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cornerLeft}
            alt=""
            className="block size-full max-w-none"
            aria-hidden
          />
        </div>
      </div>
    </>
  );
}
