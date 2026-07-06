"use client";

import { useState } from "react";
import { dmMono, gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";

const PIPELINE_TITLE_GRADIENT =
  "linear-gradient(124.414deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

const BADGE_LEFT = "/developer/pipeline-corner-42.svg";
const BADGE_RIGHT = "/developer/pipeline-corner-43.svg";

export function DeveloperPipeline() {
  const [activeTab, setActiveTab] = useState(1); // 1 = Optimize

  return (
    <div
      className="absolute"
      style={{ left: 0, top: 1582, width: 1440, height: 665 }}
      data-node-id="2900:677"
      data-name="Model Forge - Pipeline"
    >
      {/* Abstract design background */}
      <div
        className="absolute -translate-x-1/2 pointer-events-none"
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

      {/* Badge "Real-time AI at edge" */}
      <div
        className="absolute -translate-x-1/2 overflow-clip bg-[rgba(255,255,255,0.06)]"
        style={{ left: "calc(50% - 0.2px)", top: 48.9, width: 180, height: 26 }}
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

      {/* Title "The ModelForge Pipeline" */}
      <div
        className="absolute"
        style={{ left: 438.37, top: 99.36, width: 558, height: 61 }}
      >
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

      {/* Active Tab Glow */}
      {activeTab !== 1 && (
        <div
          className="absolute w-[100px] h-[100px] rounded-full pointer-events-none transition-all duration-300"
          style={{
            left: activeTab === 0 ? 524 : activeTab === 2 ? 773 : 920,
            top: 226.5,
            transform: "translate(-50%, -50%)",
            border: "2px solid rgba(108,237,63,1)",
            boxShadow: "0 0 20px 5px rgba(108,237,63,0.6), inset 0 0 15px rgba(108,237,63,0.5)",
            background: "radial-gradient(circle, rgba(108,237,63,0.4) 0%, rgba(108,237,63,0) 70%)",
            mixBlendMode: "lighten",
          }}
        />
      )}

      {/* Logos — mix-blend-lighten, top 178.32 */}
      <PipelineLogo
        src="/developer/pipeline-logo-1.png"
        left="calc(50% - 195.66px)"
        width={152.288}
        fit="object-bottom"
        style={{ filter: activeTab === 0 ? "brightness(1.2)" : "brightness(0.7) grayscale(0.3)" }}
      />
      <PipelineLogo
        src="/developer/pipeline-logo-3.png"
        left="calc(50% + 126.66px)"
        width={290.304}
        fit="object-bottom"
        style={{ filter: activeTab === 2 || activeTab === 3 ? "none" : "brightness(0.7) grayscale(0.3)" }}
      />
      <PipelineLogo
        src="/developer/pipeline-logo-2.png"
        left="calc(50% - 69.01px)"
        width={101.024}
        fit="object-cover"
        style={{ filter: activeTab === 1 ? "brightness(1.2)" : "brightness(0.4) grayscale(0.6)" }}
      />

      {/* Clickable hotspots to change active tab diagram */}
      <button onClick={() => setActiveTab(0)} className="absolute w-[80px] h-[80px] rounded-full cursor-pointer z-50 transition-transform hover:scale-110" style={{ left: 524, top: 226.5, transform: "translate(-50%, -50%)", background: "transparent", border: "none" }} aria-label="Train" />
      <button onClick={() => setActiveTab(1)} className="absolute w-[80px] h-[80px] rounded-full cursor-pointer z-50 transition-transform hover:scale-110" style={{ left: 651, top: 226.5, transform: "translate(-50%, -50%)", background: "transparent", border: "none" }} aria-label="Optimize" />
      <button onClick={() => setActiveTab(2)} className="absolute w-[80px] h-[80px] rounded-full cursor-pointer z-50 transition-transform hover:scale-110" style={{ left: 773, top: 226.5, transform: "translate(-50%, -50%)", background: "transparent", border: "none" }} aria-label="Integrate" />
      <button onClick={() => setActiveTab(3)} className="absolute w-[80px] h-[80px] rounded-full cursor-pointer z-50 transition-transform hover:scale-110" style={{ left: 920, top: 226.5, transform: "translate(-50%, -50%)", background: "transparent", border: "none" }} aria-label="Deploy" />

      {/* Step labels */}
      <StepLabel left={477.83} top={281.8} active={activeTab === 0} onClick={() => setActiveTab(0)}>Train</StepLabel>
      <StepLabel left={606.8} top={281.8} active={activeTab === 1} onClick={() => setActiveTab(1)}>Optimize</StepLabel>
      <StepLabel left={748.8} top={282.8} active={activeTab === 2} onClick={() => setActiveTab(2)}>Integrate</StepLabel>
      <StepLabel left={904.8} top={281.8} active={activeTab === 3} onClick={() => setActiveTab(3)}>Deploy</StepLabel>

      {/* Dynamic Flow Diagrams */}
      <FlowDiagram activeTab={activeTab} />
    </div>
  );
}

function PipelineLogo({
  src,
  left,
  width,
  fit,
  style,
}: {
  src: string;
  left: string;
  width: number;
  fit: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`absolute -translate-x-1/2 mix-blend-lighten pointer-events-none`}
      style={{ left, top: 178.32, width, height: 96.477, ...style }}
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" src={src} className={`absolute inset-0 size-full max-w-none ${fit}`} />
    </div>
  );
}

function StepLabel({
  left,
  top,
  active,
  onClick,
  children,
}: {
  left: number;
  top: number;
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="absolute z-50" style={{ left, top }}>
      <button
        onClick={onClick}
        className={`${interRegular.className} text-[18px] leading-[27px] font-normal uppercase whitespace-nowrap not-italic transition-colors cursor-pointer ${
          active ? "text-[#6ced3f]" : "text-[#f0f0f0] hover:text-[#6ced3f]"
        }`}
        style={{ background: "transparent", border: "none", padding: 0 }}
      >
        {children}
      </button>
    </div>
  );
}

function FlowDiagram({ activeTab }: { activeTab: number }) {
  return (
    <div className="pointer-events-none">
      {/* State 0: Train */}
      <div
        className={`absolute -translate-x-1/2 transition-opacity duration-300 ${activeTab === 0 ? "opacity-100" : "opacity-0"}`}
        style={{ left: "50%", top: 347.8, width: 1135, height: 270 }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" src="/developer/train-flow-1.png" className="absolute left-[-36.45%] top-[-42.84%] h-[194.25%] w-[138.68%] max-w-none" />
        </div>
      </div>

      {/* State 1: Optimize */}
      <div
        className={`absolute -translate-x-1/2 transition-opacity duration-300 ${activeTab === 1 ? "opacity-100" : "opacity-0"}`}
        style={{ left: "50%", top: 310.58, width: 1292.934, height: 306.901 }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" src="/developer/train-flow-2.png" className="absolute left-[-28.88%] top-[-36.36%] h-[181.28%] w-[128.88%] max-w-none" />
        </div>
      </div>

      {/* State 2: Integrate */}
      <div
        className={`absolute -translate-x-1/2 transition-opacity duration-300 ${activeTab === 2 ? "opacity-100" : "opacity-0"}`}
        style={{ left: "50%", top: 342.58, width: 1271.162, height: 284.896 }}
      >
        <img alt="" src="/developer/train-flow-3.png" className="absolute inset-0 size-full max-w-none object-cover" />
      </div>

      {/* State 3: Deploy */}
      <div
        className={`absolute -translate-x-1/2 transition-opacity duration-300 ${activeTab === 3 ? "opacity-100" : "opacity-0"}`}
        style={{ left: "50%", top: 361.08, width: 1280.186, height: 216.001 }}
      >
        <img alt="" src="/developer/train-flow-4.png" className="absolute inset-0 size-full max-w-none object-cover" />
      </div>
    </div>
  );
}
