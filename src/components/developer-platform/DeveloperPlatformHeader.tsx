import Image from "next/image";
import { gilroyMedium, interRegular } from "../hero/fonts";

const cornerLeft = "/hero/corner-tag-1.svg";
const cornerRight = "/hero/corner-tag-2.svg";

export function DeveloperPlatformHeader({ data }: { data?: any }) {
  const heading = data?.heading || "";
  const subtitle = data?.subtitle || "";
  return (
    <div
      className="absolute top-0 left-1/2 z-10 h-[151px] w-[604.2265625px] -translate-x-1/2"
      data-node-id="2379:1019"
      data-name="Group 88"
    >
      <div
        className="relative inline-grid grid-cols-[max-content] grid-rows-[max-content] place-items-start leading-[0]"
        data-name="Headline frame"
      >
        <h2
          className={`${gilroyMedium.className} relative col-start-1 row-start-1 mt-[18px] ml-[23.22607421875px] max-w-[581px] bg-clip-text text-center text-[46px] leading-[49px] font-medium text-[transparent] not-italic [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1] overflow-hidden`}
          style={{
            backgroundImage:
              "linear-gradient(126.324deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
          }}
          data-node-id="2379:1020"
        >
          {heading}
        </h2>

        <div className="relative col-start-1 row-start-1 mt-[4px] ml-[604.2265625px] flex size-[4px] items-center justify-center">
          <div className="rotate-180 flex-none">
            <div className="relative size-[4px]" data-node-id="2379:1021">
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
        <div className="relative col-start-1 row-start-1 mt-[70px] ml-[604.2265625px] flex size-[4px] items-center justify-center">
          <div className="-scale-y-100 rotate-180 flex-none">
            <div className="relative size-[4px]" data-node-id="2379:1022">
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
            <div className="relative size-[4px]" data-node-id="2379:1024">
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
        className={`${interRegular.className} absolute top-[97px] left-1/2 w-[600px] -translate-x-1/2 text-center text-[18px] leading-[27px] font-normal text-white not-italic [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden`}
        data-node-id="2379:1025"
      >
        {subtitle}
      </p>
    </div>
  );
}
