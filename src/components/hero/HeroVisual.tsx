import { heroVisualMaskStyle } from "./hero-visual-mask";
import { HeroVisualMedia } from "./HeroVisualMedia";

export function HeroVisual() {
  return (
    <div
      className="pointer-events-none absolute top-[130px] left-[126px] contents"
      data-node-id="2379:735"
      data-name="Mask group"
    >
      <div
        className="absolute top-[-1px] left-[0.11px] h-[802px] w-[1442px] overflow-hidden"
        style={heroVisualMaskStyle}
        data-node-id="2379:737"
        data-name="Rectangle 1618873457"
      >
        <HeroVisualMedia />
      </div>
    </div>
  );
}
