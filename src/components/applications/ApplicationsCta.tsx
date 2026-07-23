import { mediaUrl } from "@/lib/strapi";
import { gilroySemiBold } from "../hero/fonts";
import { RepelDots } from "../shared/RepelDots";
import { Corners } from "../shared/Corners";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";

export function ApplicationsCta({ data }: { data?: any }) {
  const cta = data?.cta || {};
  const label = cta.label || "EXPLORE APPLICATION";
  const href = cta.href || "/applications";
  const dotIcon = mediaUrl(cta.dot_icon) || "/applications/cta-dot.svg";
  return (
    <a
      href={href}
      className={`${gilroySemiBold.className} absolute top-[819.2216796875px] left-1/2 h-[48px] w-[205px] -translate-x-1/2 shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]`}
      data-node-id="2379:952"
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
        className="absolute z-10 top-[calc(50%-8px)] left-[20px] text-[14px] leading-[normal] font-semibold whitespace-nowrap text-white uppercase not-italic [word-break:break-word]"
        data-node-id="2379:953"
      >
        {label}
      </p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        src={dotIcon}
        className="absolute z-10 top-1/2 left-[178px] size-[6px] -translate-y-1/2"
        aria-hidden
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)] rounded-[inherit]"
      />

      <GreenCtaCorners />
    </a>
  );
}
