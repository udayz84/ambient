import { dmMono, gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";

const PIPELINE_TITLE_GRADIENT =
  "linear-gradient(124.414deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

const BADGE_LEFT = "/developer/pipeline-corner-42.svg";
const BADGE_RIGHT = "/developer/pipeline-corner-43.svg";

/**
 * Figma 2900:677 — "Model Forge - Train" pipeline section.
 * Positioned at 0,1582 / 1440×665 within the Developer canvas.
 */
export function DeveloperPipeline() {
  return (
    <div
      className="absolute"
      style={{ left: 0, top: 1582, width: 1440, height: 665 }}
      data-node-id="2900:677"
      data-name="Model Forge - Train"
    >
      {/* Abstract design background — 3259:1342 */}
      <div
        className="absolute -translate-x-1/2"
        style={{ left: "50%", top: -69.74, width: 985.295, height: 357.632 }}
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src="/developer/pipeline-abstract.svg"
          className="absolute inset-0 block size-full max-w-none"
        />
      </div>

      {/* Badge — 3259:1437 "Real-time AI at edge" */}
      <div
        className="absolute -translate-x-1/2 overflow-clip bg-[rgba(255,255,255,0.06)]"
        style={{ left: "calc(50% - 0.2px)", top: 48.9, width: 180, height: 26 }}
        data-node-id="3259:1437"
      >
        <Corners leftSrc={BADGE_LEFT} rightSrc={BADGE_RIGHT} />
        <p
          className={`${dmMono.className} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[13px] leading-[19.5px] uppercase tracking-[-0.39px] whitespace-nowrap text-[#ecfae5] not-italic`}
        >
          Real-time AI at edge
        </p>
        <div className="absolute left-[6.48px] top-1/2 h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
        <div className="absolute left-[170.48px] top-1/2 h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
      </div>

      {/* Title — 3259:1430 "The ModelForge Pipeline" */}
      <div
        className="absolute"
        style={{ left: 438.37, top: 99.36, width: 558, height: 61 }}
        data-node-id="3259:1430"
      >
        {/* Group93 frame — 3259:1432 */}
        <div
          className="absolute"
          style={{ left: 1.21, top: 1.03, width: 555.646, height: 59 }}
          aria-hidden
        >
          <div className="absolute inset-[-0.85%_0]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src="/developer/pipeline-title-frame.svg"
              className="block size-full max-w-none"
            />
          </div>
        </div>
        <h2
          className={`${gilroyMedium.className} absolute left-1/2 top-[calc(50%-24.5px)] -translate-x-1/2 bg-clip-text text-[46px] leading-[49px] font-medium whitespace-nowrap text-transparent not-italic`}
          style={{ backgroundImage: PIPELINE_TITLE_GRADIENT }}
        >
          The ModelForge Pipeline
        </h2>
      </div>

      {/* Logos — mix-blend-lighten, top 178.32 */}
      <PipelineLogo
        src="/developer/pipeline-logo-1.png"
        left="calc(50% - 195.66px)"
        width={152.288}
        fit="object-bottom"
      />
      <PipelineLogo
        src="/developer/pipeline-logo-3.png"
        left="calc(50% + 126.66px)"
        width={290.304}
        fit="object-bottom"
      />
      <PipelineLogo
        src="/developer/pipeline-logo-2.png"
        left="calc(50% - 69.01px)"
        width={101.024}
        fit="object-cover"
      />

      {/* Step labels — Train / Optimize / Integrate / Deploy */}
      <StepLabel left={477.83} top={281.8}>
        Train
      </StepLabel>
      <StepLabel left={606.8} top={281.8}>
        Optimize
      </StepLabel>
      <StepLabel left={748.8} top={282.8}>
        Integrate
      </StepLabel>
      <StepLabel left={904.8} top={281.8}>
        Deploy
      </StepLabel>

      {/* Train Flow diagram — 2900:787 */}
      <div
        className="absolute -translate-x-1/2"
        style={{ left: "50%", top: 347.8, width: 1135, height: 270 }}
        data-node-id="2900:787"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src="/developer/train-flow.png"
            className="absolute left-[-36.45%] top-[-42.84%] h-[194.25%] w-[138.68%] max-w-none"
          />
        </div>
      </div>
    </div>
  );
}

function PipelineLogo({
  src,
  left,
  width,
  fit,
}: {
  src: string;
  left: string;
  width: number;
  fit: string;
}) {
  return (
    <div
      className={`absolute -translate-x-1/2 mix-blend-lighten`}
      style={{ left, top: 178.32, width, height: 96.477 }}
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        src={src}
        className={`absolute inset-0 size-full max-w-none ${fit}`}
      />
    </div>
  );
}

function StepLabel({
  left,
  top,
  children,
}: {
  left: number;
  top: number;
  children: React.ReactNode;
}) {
  return (
    <p
      className={`${interRegular.className} absolute text-[18px] leading-[27px] font-normal uppercase whitespace-nowrap text-[#f0f0f0] not-italic`}
      style={{ left, top }}
    >
      {children}
    </p>
  );
}
