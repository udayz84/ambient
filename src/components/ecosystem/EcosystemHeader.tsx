import Image from "next/image";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { RepelDots } from "../shared/RepelDots";
import { Corners } from "../shared/Corners";

const ctaTextClass = `${interRegular.className} text-[16px] leading-[normal] font-normal`;

const ctaDot = "/navbar/cta-dot.svg";

export function EcosystemHeader() {
  return (
    <div
      className="relative mx-auto flex flex-col items-center w-full max-w-[804.22px] px-4 shrink-0"
      data-node-id="2379:1028"
      data-name="Group 89"
    >
      <div className="relative flex w-full items-center justify-center h-[74px] max-md:h-auto max-md:py-[16px]">
        <h2
          className={`${gilroyMedium.className} relative bg-clip-text text-center text-[46px] max-md:text-[32px] max-md:whitespace-normal leading-[49px] font-medium whitespace-nowrap text-[transparent] not-italic [word-break:break-word]`}
          style={{
            backgroundImage:
              "linear-gradient(134.597deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
          }}
          data-node-id="2379:1029"
        >
          Supported by a growing ecosystem
        </h2>

        <Corners />
      </div>

      <p
        className={`${interRegular.className} mt-[20px] max-md:mt-[16px] w-full max-w-[803px] text-center text-[18px] max-md:text-[16px] leading-[27px] font-normal text-white not-italic [word-break:break-word]`}
        data-node-id="2379:1034"
      >
        Ambient works with partners across silicon, development, distribution,
        and system integration, helping teams move from evaluation to
        deployment with confidence
      </p>

      <a
        href="/contact"
        className="relative mt-[32px] z-[1] flex h-[44px] w-[186px] items-center justify-center gap-[10px] shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]"
        data-node-id="2379:1035"
        data-name="Cta"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
        />
        <span className="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[inherit]">
          <RepelDots />
        </span>
        <p
          className={`${ctaTextClass} relative z-10 shrink-0 whitespace-nowrap text-white uppercase not-italic [word-break:break-word]`}
          data-node-id="2379:1036"
        >
          WORK WITH US
        </p>
        <Image
          src={ctaDot}
          alt=""
          width={6}
          height={6}
          className="relative z-10 size-[6px] shrink-0"
          aria-hidden
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[2] shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)] rounded-[inherit]"
        />
        
        {/* Custom Corners that pop out slightly to avoid the inset shadow */}
        <div className="pointer-events-none absolute -top-[0.5px] right-0 z-20 flex size-[4px] items-center justify-center">
          <div className="rotate-180 flex-none">
            <div className="relative size-[4px]">
              <img src="/hero/corner-tag-2.svg" alt="" width={4} height={4} className="block size-full max-w-none" aria-hidden />
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute -top-[0.5px] left-0 z-20 flex size-[4px] items-center justify-center">
          <div className="-scale-y-100 flex-none">
            <div className="relative size-[4px]">
              <img src="/hero/corner-tag-1.svg" alt="" width={4} height={4} className="block size-full max-w-none" aria-hidden />
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute right-0 bottom-0 z-20 flex size-[4px] items-center justify-center">
          <div className="-scale-x-100 flex-none">
            <div className="relative size-[4px]">
              <img src="/hero/corner-tag-2.svg" alt="" width={4} height={4} className="block size-full max-w-none" aria-hidden />
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 z-20 flex size-[4px] items-center justify-center">
          <div className="flex-none">
            <div className="relative size-[4px]">
              <img src="/hero/corner-tag-1.svg" alt="" width={4} height={4} className="block size-full max-w-none" aria-hidden />
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
