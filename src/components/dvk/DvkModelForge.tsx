import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { CORNER_LEFT, CORNER_RIGHT, MODELFORGE_TITLE_GRADIENT } from "./dvk-data";

/**
 * Figma 2761:3009 — "Powered by ModelForge." section title.
 * Root frame is 650 wide / 136 tall. The title frame (540, px-10) is centered
 * within the 650 root; the description spans the full 650 width.
 *
 * Header for the ModelForge section — additional content can be appended below.
 */
export function DvkModelForge() {
  return (
    <div
      className="relative flex w-full flex-col items-center justify-center gap-[24px]"
      data-node-id="2761:3009"
      data-name="Section Title"
    >
      {/* Title — 2761:3010 (540×49, px-10 corners frame) */}
      <div
        className="relative px-[10px]"
        style={{ width: 540 }}
        data-node-id="2761:3010"
        data-name="Title"
      >
        <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
        <h2
          className={`${gilroyMedium.className} relative m-0 bg-clip-text text-center text-[46px] leading-[49px] font-medium text-transparent not-italic whitespace-nowrap`}
          style={{
            width: 520,
            backgroundImage: MODELFORGE_TITLE_GRADIENT,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
          data-node-id="2761:3011"
        >
          Powered by ModelForge.
        </h2>
      </div>

      {/* Description — 2761:3016 (650 wide) */}
      <p
        className={`${interRegular.className} text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
        style={{ width: 650 }}
        data-node-id="2761:3016"
      >
        Don&apos;t let software be the bottleneck. The Cranium DVK is fully
        supported by our unified software toolchain, designed to take you from a
        standard TensorFlow model to on-silicon inference in under 15 minutes.
      </p>
    </div>
  );
}
