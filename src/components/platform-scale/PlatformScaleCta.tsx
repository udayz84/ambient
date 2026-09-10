import { interMedium } from "../hero/fonts";
import { RepelDots } from "../shared/RepelDots";
import { Corners } from "../shared/Corners";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";

export function PlatformScaleCta({ data }: { data?: any }) {
  const cta = data?.cta || {};
  const label = cta.label || "";
  const href = cta.href || "";
  return (
    <a
      href={href}
      className={`${interMedium.className} absolute top-[1000.912109375px] left-[604.5px] h-[48px] w-[231px] shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]`}
      data-node-id="2379:660"
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
        className="absolute z-10 top-[calc(50%-13.91px)] left-1/2 -translate-x-1/2 max-w-full text-[16px] leading-[28px] font-medium whitespace-nowrap text-white uppercase not-italic overflow-hidden text-ellipsis [word-break:break-word]"
        data-node-id="2379:661"
      >
        {label}
      </p>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)] rounded-[inherit]"
      />

      <GreenCtaCorners />
    </a>
  );
}
