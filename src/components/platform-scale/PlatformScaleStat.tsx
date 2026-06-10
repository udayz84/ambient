import { gilroyMedium, interRegular } from "../hero/fonts";

const cornerTr = "/platform-scale/stat-corner-tr.svg";
const cornerTl = "/platform-scale/stat-corner-tl.svg";

export function PlatformScaleStat() {
  return (
    <div
      className="relative absolute top-[813px] left-1/2 flex w-[500px] -translate-x-1/2 items-center gap-[32px] bg-[rgba(0,0,0,0.1)] px-[10px]"
      data-node-id="2379:641"
    >
      <div
        className="relative flex min-w-px flex-[1_0_0] flex-col items-center justify-center gap-[12px] py-[20px] pl-[20px]"
        data-node-id="2379:642"
        data-name="Stat"
      >
        <p
          className={`${gilroyMedium.className} relative w-full min-w-full shrink-0 text-center text-[32px] leading-[36px] font-medium tracking-[-0.32px] whitespace-nowrap text-white not-italic [word-break:break-word]`}
          data-node-id="2379:643"
        >
          GPX 10
        </p>
        <div
          className="relative flex w-full shrink-0 flex-col items-start"
          data-node-id="2379:645"
          data-name="Content"
        >
          <p
            className={`${interRegular.className} relative w-full text-[14px] leading-[1.4] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
            data-node-id="2379:646"
          >
            GPX10 is the best-in-class processor for always-on embedded AI
            applications on power constrained edge devices for sensor-fusion,
            always-on voice detection and low frequency vision applications.
          </p>
        </div>
      </div>

      <div className="absolute top-[0.49px] right-[0.52px] flex size-[4px] items-center justify-center">
        <div className="rotate-180 flex-none">
          <div className="relative size-[4px]" data-node-id="2379:647">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cornerTr}
                alt=""
                className="block size-full max-w-none"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute right-[0.52px] bottom-[0.53px] flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 rotate-180 flex-none">
          <div className="relative size-[4px]" data-node-id="2379:648">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cornerTr}
                alt=""
                className="block size-full max-w-none"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-[0.51px] left-[0.51px] flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 flex-none">
          <div className="relative size-[4px]" data-node-id="2379:649">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cornerTl}
                alt=""
                className="block size-full max-w-none"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[0.5px] left-[0.51px] size-[4px]">
        <div className="absolute inset-[0_0_-12.5%_-12.5%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cornerTl}
            alt=""
            className="block size-full max-w-none"
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}
