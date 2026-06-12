import Image from "next/image";
import { interMedium, interRegular } from "../hero/fonts";

const cornerLeft = "/hero/corner-tag-1.svg";
const cornerRight = "/hero/corner-tag-2.svg";

export function PlatformScaleHeader() {
  return (
    <>
      <div
        className="absolute top-[225px] left-[100px] h-[120px] w-[321.87109375px]"
        data-node-id="2379:619"
        data-name="Group 87"
      >
        <div
          className="relative inline-grid grid-cols-[max-content] grid-rows-[max-content] place-items-start leading-[0]"
          data-node-id="2379:620"
        >
          <h2
            className={`${interMedium.className} relative col-start-1 row-start-1 mt-[10.6806640625px] ml-[12.87109375px] bg-clip-text text-[46px] leading-[0] font-medium whitespace-nowrap text-[transparent] [word-break:break-word] not-italic`}
            style={{
              backgroundImage:
                "linear-gradient(100.945deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
            }}
          >
            <p className="mb-0 leading-[49px]">One platform,</p>
            <p className="leading-[49px]">infinite scale</p>
          </h2>

          <div className="relative col-start-1 row-start-1 mt-[4px] ml-[321.87109375px] flex size-[4px] items-center justify-center">
            <div className="rotate-180 flex-none">
              <div className="relative size-[4px]" data-node-id="2379:621">
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
          <div className="relative col-start-1 row-start-1 mt-[116px] ml-[321.87109375px] flex size-[4px] items-center justify-center">
            <div className="-scale-y-100 rotate-180 flex-none">
              <div className="relative size-[4px]" data-node-id="2379:622">
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
          <div className="relative col-start-1 row-start-1 mt-[116px] ml-0 size-[4px]">
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
          <div className="relative col-start-1 row-start-1 mt-[4px] ml-0 flex size-[4px] items-center justify-center">
            <div className="-scale-y-100 flex-none">
              <div className="relative size-[4px]" data-node-id="2379:624">
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
        </div>
      </div>

      <p
        className={`${interRegular.className} absolute top-[245px] left-[805.11279296875px] w-[517px] text-right text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
        data-node-id="2379:625"
      >
        A modular compute fabric for your entire product roadmap, from a
        microwatt edge array to a hyperscaler server grid, without every
        changing your software
      </p>
    </>
  );
}
