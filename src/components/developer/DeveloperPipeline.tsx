"use client";

import { Fragment, useState } from "react";
import { dmMono, gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { mediaUrl } from "@/lib/strapi";

const PIPELINE_TITLE_GRADIENT =
  "linear-gradient(124.414deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

const BADGE_LEFT = "/developer/pipeline-corner-42.svg";
const BADGE_RIGHT = "/developer/pipeline-corner-43.svg";

const DEFAULT_HEADING = "The ModelForge Pipeline";
const DEFAULT_TAG = "Real-time AI at edge";
const DEFAULT_TABS = ["Train", "Optimize", "Integrate", "Deploy"];
const DEFAULT_FLOW_IMAGES = [
  "/developer/train-flow-1.png",
  "/developer/train-flow-2.png",
  "/developer/train-flow-3.png",
  "/developer/train-flow-4.png",
];
const DEFAULT_LOGOS = [
  "/developer/pipeline-logo-1.png",
  "/developer/pipeline-logo-2.png",
  "/developer/pipeline-logo-3.png",
];

export function DeveloperPipeline({ data }: { data?: any }) {
  const [activeTab, setActiveTab] = useState(1); // 1 = Optimize

  const heading = data?.heading || DEFAULT_HEADING;
  const tagText = data?.tag?.text || DEFAULT_TAG;
  const rawTabs = Array.isArray(data?.tabs) ? data.tabs : [];
  const tabs = rawTabs.length
    ? rawTabs.map((t: any, i: number) => ({
        label: t?.label || DEFAULT_TABS[i] || "",
        flowImage: mediaUrl(t?.flow_image) || DEFAULT_FLOW_IMAGES[i] || "",
        logo: mediaUrl(t?.logo) || DEFAULT_LOGOS[i] || DEFAULT_LOGOS[0] || "",
      }))
    : DEFAULT_TABS.map((label, i) => ({
        label,
        flowImage: DEFAULT_FLOW_IMAGES[i] || "",
        logo: DEFAULT_LOGOS[i] || DEFAULT_LOGOS[0] || "",
      }));
  const flowSrc = (i: number) => tabs[i]?.flowImage || DEFAULT_FLOW_IMAGES[i];
  const tabLabels = tabs.map((t: any) => t.label);

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
          {tagText}
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
          {heading}
        </h2>
      </div>

      <PipelineFilterBar tabs={tabLabels} activeTab={activeTab} onSelect={setActiveTab} />

      {/* Dynamic Flow Diagrams */}
      <FlowDiagram activeTab={activeTab} flowSrc={flowSrc} />
    </div>
  );
}

function FlowDiagram({
  activeTab,
  flowSrc,
}: {
  activeTab: number;
  flowSrc: (i: number) => string;
}) {
  return (
    <div className="pointer-events-none">
      {/* State 0: Train */}
      <div
        className={`absolute -translate-x-1/2 overflow-hidden transition-opacity duration-300 ${activeTab === 0 ? "opacity-100" : "opacity-0"}`}
        style={{ left: "50%", top: 347.8, width: 1135, height: 270 }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" src={flowSrc(0)} className="absolute left-[-36.45%] top-[-42.84%] h-[194.25%] w-[138.68%] max-w-none" />
        </div>
      </div>

      {/* State 1: Optimize */}
      <div
        className={`absolute -translate-x-1/2 overflow-hidden transition-opacity duration-300 ${activeTab === 1 ? "opacity-100" : "opacity-0"}`}
        style={{ left: "50%", top: 310.58, width: 1292.934, height: 306.901 }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" src={flowSrc(1)} className="absolute left-[-28.88%] top-[-36.36%] h-[181.28%] w-[128.88%] max-w-none" />
        </div>
      </div>

      {/* State 2: Integrate */}
      <div
        className={`absolute -translate-x-1/2 overflow-hidden transition-opacity duration-300 ${activeTab === 2 ? "opacity-100" : "opacity-0"}`}
        style={{ left: "50%", top: 342.58, width: 1271.162, height: 284.896 }}
      >
        <img alt="" src={flowSrc(2)} className="absolute inset-0 size-full max-w-none object-cover" />
      </div>

      {/* State 3: Deploy */}
      <div
        className={`absolute -translate-x-1/2 overflow-hidden transition-opacity duration-300 ${activeTab === 3 ? "opacity-100" : "opacity-0"}`}
        style={{ left: "50%", top: 361.08, width: 1280.186, height: 216.001 }}
      >
        <img alt="" src={flowSrc(3)} className="absolute inset-0 size-full max-w-none object-cover" />
      </div>
    </div>
  );
}

function CategoryDivider({
  variant = "normal",
}: {
  variant?: "normal" | "before-active" | "after-active";
}) {
  const segments =
    variant === "before-active"
      ? [
          { height: 4, color: "bg-[#333333]" },
          { height: 5, color: "bg-[#333333]" },
          { height: 6, color: "bg-[#333333]" },
          { height: 7, color: "bg-white/70" },
          { height: 8, color: "bg-white" },
        ]
      : variant === "after-active"
      ? [
          { height: 8, color: "bg-white" },
          { height: 7, color: "bg-white/70" },
          { height: 6, color: "bg-[#333333]" },
          { height: 5, color: "bg-[#333333]" },
          { height: 4, color: "bg-[#333333]" },
        ]
      : [
          { height: 8, color: "bg-[#333333]" },
          { height: 8, color: "bg-[#333333]" },
          { height: 8, color: "bg-[#333333]" },
          { height: 8, color: "bg-[#333333]" },
          { height: 8, color: "bg-[#333333]" },
        ];

  return (
    <div className="flex shrink-0 items-center gap-[8.36px]" aria-hidden>
      {segments.map((seg, i) => (
        <span
          key={i}
          className={`w-px ${seg.color}`}
          style={{ height: `${seg.height}px` }}
        />
      ))}
    </div>
  );
}

function PipelineFilterBar({
  tabs,
  activeTab,
  onSelect,
}: {
  tabs: string[];
  activeTab: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div
      className="absolute flex items-center justify-center -translate-x-1/2"
      style={{ left: "50%", top: 200, height: 52 }}
    >
      <nav className="flex h-[52px] items-center justify-center gap-[9.61px]">
        {tabs.map((tabLabel, index) => {
          const isActive = activeTab === index;
          const dividerVariant =
            index === activeTab
              ? "before-active"
              : index === activeTab + 1
              ? "after-active"
              : "normal";

          return (
            <Fragment key={index}>
              {index > 0 && <CategoryDivider variant={dividerVariant} />}
              <button
                type="button"
                onClick={() => onSelect(index)}
                className={`${interRegular.className} relative flex h-[52px] shrink-0 cursor-pointer items-center justify-center px-[20px] text-[16px] leading-[24px] font-normal whitespace-nowrap not-italic transition-colors ${
                  isActive ? "text-[#0e1a0e]" : "text-[#666] hover:text-[#f0f0f0]"
                }`}
              >
                {isActive ? (
                  <span className="pointer-events-none absolute inset-y-[4px] inset-x-[13px] overflow-clip bg-[#f0f0f0]">
                    <Corners />
                  </span>
                ) : null}
                <span className="relative uppercase tracking-wide">{tabLabel}</span>
              </button>
            </Fragment>
          );
        })}
      </nav>
    </div>
  );
}
