"use client";

import { useState } from "react";
import { interSemiBold, interMedium } from "../hero/fonts";

export function TabSwitcher({ className = "" }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<"sensor" | "vision">("sensor");

  return (
    <div
      className={`relative flex h-[52px] w-[302px] shrink-0 items-center rounded-[90px] bg-[#1a1a18] overflow-clip ${className}`}
    >
      <div
        className="absolute top-[4px] h-[44px] w-[151px] rounded-[90px] bg-white shadow-sm transition-all duration-300 ease-in-out"
        style={{ left: activeTab === "sensor" ? "3.5px" : "147.5px" }}
      />
      <button
        type="button"
        onClick={() => setActiveTab("sensor")}
        className={`relative z-10 flex h-full flex-1 items-center justify-center text-[14px] leading-[21px] cursor-pointer bg-transparent border-0 transition-colors duration-300 ${
          activeTab === "sensor"
            ? `${interSemiBold.className} text-black font-semibold`
            : `${interMedium.className} text-white font-medium`
        }`}
      >
        Sensor-Fusion AI
      </button>
      <button
        type="button"
        onClick={() => setActiveTab("vision")}
        className={`relative z-10 flex h-full flex-1 items-center justify-center text-[14px] leading-[21px] cursor-pointer bg-transparent border-0 transition-colors duration-300 ${
          activeTab === "vision"
            ? `${interSemiBold.className} text-black font-semibold`
            : `${interMedium.className} text-white font-medium`
        }`}
      >
        Vision AI
      </button>
    </div>
  );
}
