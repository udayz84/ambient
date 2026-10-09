import { gilroyMedium } from "../hero/fonts";
import { RepelDots } from "../shared/RepelDots";
import { Corners } from "../shared/Corners";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";

type CtaItem = {
  label?: string;
  href?: string;
  variant?: string;
};

export function MeasuredProofCtas({ data }: { data?: any }) {
  const ctas: CtaItem[] = Array.isArray(data?.ctas) ? data.ctas : [];

  const find = (variant: string) =>
    ctas.find((c) => (c?.variant || "").toLowerCase() === variant);

  const primary = find("primary") || { variant: "primary" };
  const secondary = find("secondary") || { variant: "secondary" };

  const primaryLabel = primary.label || "";
  const primaryHref = primary.href || "";
  const secondaryLabel = secondary.label || "";
  const secondaryHref = secondary.href || "";

  return (
    <div
      className="absolute top-[852.5px] left-1/2 flex -translate-x-1/2 gap-[20px] items-center"
      data-node-id="2379:1485"
    >
      <a
        href={primaryHref}
        className={`${gilroyMedium.className} relative h-[48px] w-[204px] shrink-0 shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]`}
        data-node-id="2379:1486"
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
          className="absolute z-10 top-[calc(50%-12px)] left-1/2 -translate-x-1/2 max-w-full text-[14px] leading-[24px] font-medium whitespace-nowrap text-white uppercase not-italic overflow-hidden text-ellipsis [word-break:break-word]"
          data-node-id="2379:1487"
        >
          {primaryLabel}
        </p>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[2] shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)] rounded-[inherit]"
        />

        <GreenCtaCorners />
      </a>
    </div>
  );
}
