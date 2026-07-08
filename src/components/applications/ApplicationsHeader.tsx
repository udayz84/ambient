import Image from "next/image";
import { gilroyMedium, interRegular } from "../hero/fonts";

const cornerLeft = "/hero/corner-tag-1.svg";
const cornerRight = "/hero/corner-tag-2.svg";

export function ApplicationsHeader({ data }: { data?: any }) {
  const heading = data?.heading || "Build the impossible today";
  const subtitle =
    data?.subtitle ||
    "Don't let legacy design limit your roadmap. Discover the market-differentiating features of the GPX10 and what's coming next.";
  return (
    <div
      className="absolute top-[1px] left-1/2 h-[148px] w-[607px] -translate-x-1/2"
      data-node-id="2379:933"
      data-name="Group 78"
    >
      <div
        className="relative inline-grid grid-cols-[max-content] grid-rows-[max-content] place-items-start leading-[0]"
        data-name="Headline frame"
      >
        <h2
          className={`${gilroyMedium.className} relative col-start-1 row-start-1 mt-[16px] ml-[22.87109375px] bg-clip-text text-center text-[46px] leading-[49px] font-medium whitespace-nowrap text-[transparent] not-italic [word-break:break-word]`}
          style={{
            backgroundImage:
              "linear-gradient(126.324deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
          }}
          data-node-id="2379:934"
        >
          {heading}
        </h2>

        <div className="relative col-start-1 row-start-1 mt-[4px] ml-[607px] flex size-[4px] items-center justify-center">
          <div className="rotate-180 flex-none">
            <div className="relative size-[4px]" data-node-id="2379:935">
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
        <div className="relative col-start-1 row-start-1 mt-[70px] ml-[607px] flex size-[4px] items-center justify-center">
          <div className="-scale-y-100 rotate-180 flex-none">
            <div className="relative size-[4px]" data-node-id="2379:936">
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
        <div className="relative col-start-1 row-start-1 mt-[4px] ml-0 flex size-[4px] items-center justify-center">
          <div className="-scale-y-100 flex-none">
            <div className="relative size-[4px]" data-node-id="2379:938">
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

      <p
        className={`${interRegular.className} absolute top-[94px] left-1/2 w-[600px] -translate-x-1/2 text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
        data-node-id="2379:939"
      >
        {subtitle}
      </p>
    </div>
  );
}
