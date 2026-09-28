import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";

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
            className={`${interRegular.className} relative w-full text-[14px] leading-[1.4] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
            data-node-id="2379:646"
          >
            GPX10 is the best-in-class processor for always-on embedded AI
            applications on power constrained edge devices for sensor-fusion,
            always-on voice detection and low frequency vision applications.
          </p>
        </div>
      </div>

      <Corners
        leftSrc="/platform-scale/stat-corner-tl.svg"
        rightSrc="/platform-scale/stat-corner-tr.svg"
      />
    </div>
  );
}
