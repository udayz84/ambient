import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { DvkDemosCards } from "./DvkDemosCards";
import { CORNER_LEFT, CORNER_RIGHT, DEMOS_TITLE_GRADIENT } from "./dvk-data";

/**
 * Figma 2761:2791 (+ 2799/2809/2819) — demos section.
 * Title frame (872 wide) sits above the three-card row (1256 wide); both are
 * centered. The 53px gap mirrors the Figma canvas spacing between the title
 * frame bottom (y=1705) and the cards top (y=1758.5).
 */
export function DvkDemos() {
  return (
    <div className="relative flex w-full flex-col items-center gap-[53px]">
      {/* Section title — 2761:2791 (872×136) */}
      <div
        className="relative flex w-[872px] flex-col items-center justify-center gap-[24px]"
        data-node-id="2761:2791"
        data-name="Section Title"
      >
        {/* Title — 2761:2792 (872×49, px-10 corners frame) */}
        <div
          className="relative px-[10px]"
          style={{ width: 872 }}
          data-node-id="2761:2792"
          data-name="Title"
        >
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            className={`${gilroyMedium.className} relative m-0 bg-clip-text text-center text-[46px] leading-[49px] font-medium text-transparent not-italic whitespace-nowrap`}
            style={{
              width: 852,
              backgroundImage: DEMOS_TITLE_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
            data-node-id="2761:2793"
          >
            Pre-loaded demos. Instant AI validation.
          </h2>
        </div>

        {/* Description — 2761:2798 (650 wide) */}
        <p
          className={`${interRegular.className} text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
          style={{ width: 650 }}
          data-node-id="2761:2798"
        >
          Don&apos;t spend your first day writing sensor configuration code. The
          Cranium board comes ready to run out of the box, allowing you to
          instantly test physical AI models and validate performance on the metal
          with zero setup required.
        </p>
      </div>

      {/* Demo cards row — 1256 wide */}
      <DvkDemosCards />
    </div>
  );
}
