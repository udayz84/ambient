import Link from "next/link";
import { gilroyMedium } from "../hero/fonts";
import { RepelDots } from "../shared/RepelDots";
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

  const primaryLabel = (primary.label || "").trim();
  const primaryHref = (primary.href || "#").trim();

  return (
    <div
      className="absolute top-[852.5px] left-1/2 flex -translate-x-1/2 gap-[20px] items-center z-20 pointer-events-auto"
      data-node-id="2379:1485"
    >
      <Link
        href={primaryHref}
        className={`${gilroyMedium.className} relative flex h-[48px] min-w-[250px] w-max px-[32px] shrink-0 items-center justify-center shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]`}
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
        <span
          className="relative z-10 max-w-full text-[16px] leading-[28px] font-medium whitespace-nowrap text-white uppercase not-italic"
          data-node-id="2379:1487"
        >
          {primaryLabel}
        </span>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[2] shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)] rounded-[inherit]"
        />

        <GreenCtaCorners />
      </Link>
    </div>
  );
}
