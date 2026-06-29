import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { CORNER_LEFT, CORNER_RIGHT, MODELFORGE_TITLE_GRADIENT, CARD_BG, CARD_BORDER } from "./dvk-data";

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

      {/* Toolchain Diagram */}
      <div className="mt-[32px] flex w-full items-center justify-center gap-[32px] min-[1024px]:mt-[64px]">
        {/* Left Article */}
        <div
          className="relative flex w-[240px] shrink-0 flex-col items-center overflow-clip border-[0.5px] border-solid p-[20px] pb-[32px]"
          style={{ backgroundColor: CARD_BG, borderColor: CARD_BORDER }}
        >
          <div
            className="relative flex h-[160px] w-full shrink-0 items-center justify-center overflow-hidden rounded-[6px] border border-solid"
            style={{
              borderColor: "rgba(0,255,0,0.3)",
              backgroundImage:
                "radial-gradient(ellipse 65% 100% at 50% 50%, rgba(26,26,26,1) 0%, rgba(13,13,13,1) 25%, rgba(7,7,7,1) 37.5%, rgba(0,0,0,1) 50%)",
            }}
          >
            <div className="relative flex items-center justify-center gap-[16px]">
              <div className="flex h-[48px] w-[48px] items-center justify-center rounded-[6px] border-[1.5px] border-[#00ff00] font-mono text-[14px] font-medium text-[#00ff00]">
                TF
              </div>
              <div className="flex h-[48px] w-[48px] items-center justify-center rounded-[6px] border-[1.5px] border-[#00ff00] font-mono text-[14px] font-medium text-[#00ff00]">
                PT
              </div>
            </div>
          </div>
          
          <h3 className={`${gilroyMedium.className} mt-[24px] text-center text-[18px] text-white`}>Your Model</h3>
          <p className={`${interRegular.className} mt-[8px] max-w-[200px] text-center text-[12px] leading-[18px] text-[rgba(240,240,240,0.6)]`}>
            Automated TFLite conversion &<br />quantization
          </p>
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
        </div>

        {/* Right-pointing Arrow */}
        <svg width="40" height="12" viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 opacity-60">
          <path d="M0 6H39" stroke="rgba(255,255,255,0.8)" strokeWidth="1" />
          <path d="M35 2L39 6L35 10" stroke="rgba(255,255,255,0.8)" strokeWidth="1" />
        </svg>

        {/* Center Section */}
        <div className="relative flex shrink-0 flex-col items-center justify-center" style={{ width: 440 }}>
          <div className="relative flex h-[220px] w-[220px] items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/dvk/card-glow.png"
              alt=""
              className="pointer-events-none absolute h-[550px] w-[550px] max-w-none object-contain opacity-70"
            />
          </div>
          <div className="flex flex-col items-center">
            <h3 className={`${gilroyMedium.className} mt-[8px] text-center text-[32px] text-white`}>
              ModelForge SDK
            </h3>
            <p className={`${interRegular.className} mt-[8px] max-w-[300px] text-center text-[14px] text-[rgba(240,240,240,0.6)]`}>
              Pre-integrated RTOS & Eclipse-based Unified Build
            </p>
            <div className="mt-[24px] flex gap-[12px]">
              {["RTOS", "DRIVERS", "COMPILER"].map((tag) => (
                <div
                  key={tag}
                  className="flex items-center border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.5)] px-[16px] py-[8px] font-mono text-[12px]"
                >
                  <span className="text-[#00ff00] opacity-70">|</span>
                  <span className="mx-[12px] text-[rgba(240,240,240,0.8)]">{tag}</span>
                  <span className="text-[#00ff00] opacity-70">|</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Left-pointing Arrow */}
        <svg width="40" height="12" viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 opacity-60">
          <path d="M40 6H1" stroke="rgba(255,255,255,0.8)" strokeWidth="1" />
          <path d="M5 2L1 6L5 10" stroke="rgba(255,255,255,0.8)" strokeWidth="1" />
        </svg>

        {/* Right Article */}
        <div
          className="relative flex w-[240px] shrink-0 flex-col items-center overflow-clip border-[0.5px] border-solid p-[20px] pb-[32px]"
          style={{ backgroundColor: CARD_BG, borderColor: CARD_BORDER }}
        >
          <div
            className="relative flex h-[160px] w-full shrink-0 items-center justify-center overflow-hidden rounded-[6px] border border-solid"
            style={{
              borderColor: "rgba(0,255,0,0.3)",
              backgroundImage:
                "radial-gradient(ellipse 65% 100% at 50% 50%, rgba(26,26,26,1) 0%, rgba(13,13,13,1) 25%, rgba(7,7,7,1) 37.5%, rgba(0,0,0,1) 50%)",
            }}
          >
            <div className="relative flex items-center justify-center">
              <div className="flex h-[48px] w-[48px] items-center justify-center rounded-[6px] border-[1.5px] border-[#00ff00]">
                <div className="h-[20px] w-[20px] bg-[#00ff00]" />
              </div>
            </div>
          </div>

          <h3 className={`${gilroyMedium.className} mt-[24px] text-center text-[18px] text-white`}>Cranium DVK</h3>
          <p className={`${interRegular.className} mt-[8px] max-w-[200px] text-center text-[12px] leading-[18px] text-[rgba(240,240,240,0.6)]`}>
            15 minutes to on-silicon execution
          </p>
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
        </div>
      </div>
    </div>
  );
}
