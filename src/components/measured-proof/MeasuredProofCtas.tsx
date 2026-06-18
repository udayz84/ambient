import { gilroyMedium } from "../hero/fonts";
import { RepelDots } from "../shared/RepelDots";
import { Corners } from "../shared/Corners";

export function MeasuredProofCtas() {
  return (
    <div
      className="absolute top-[812.5px] left-1/2 flex -translate-x-1/2 gap-[20px] items-center"
      data-node-id="2379:1485"
    >
      <a
        href="#"
        className={`${gilroyMedium.className} relative h-[48px] w-[204px] shrink-0 overflow-hidden shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]`}
        data-node-id="2379:1486"
        data-name="Cta"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
        />
        <RepelDots />
        <p
          className="absolute top-[calc(50%-12px)] left-1/2 -translate-x-1/2 text-[14px] leading-[24px] font-medium whitespace-nowrap text-white uppercase not-italic [word-break:break-word]"
          data-node-id="2379:1487"
        >
          SEE WHAT WE CAN DO
        </p>
        <Corners />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
        />
      </a>

      <a
        href="#"
        className={`${gilroyMedium.className} relative h-[48px] w-[204px] shrink-0 overflow-clip bg-[rgba(226,241,202,0.12)]`}
        data-node-id="2379:1497"
        data-name="Menu"
      >
        <p
          className="absolute top-[calc(50%-12px)] left-1/2 -translate-x-1/2 text-[14px] leading-[24px] font-medium whitespace-nowrap text-white uppercase not-italic [word-break:break-word]"
          data-node-id="2379:1498"
        >
          Explore ambient store
        </p>
        <Corners />
      </a>
    </div>
  );
}
