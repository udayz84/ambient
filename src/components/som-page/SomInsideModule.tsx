"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { GradientTitle } from "../contact/contact-shared";

const TITLE_GRADIENT_DEG = "127.627deg";
const FALLBACK_SUBTITLE =
  "Bridge the lab and real world. The Sparsh module offers continuous, microwatt intelligence in a 21×21mm size, with a breakout board that snaps off for production.";
const FALLBACK_HEADING = "Inside the Sparsh AI Module";

const BOARD_IMAGE = "/som/inside-module/pcba.webp";
const COLORFUL_BOARD = "/som/sparsh-chip.webp";
const POWER_V95 = "/som/inside-module/power-v95.png";
const POWER_V96 = "/som/inside-module/power-v96.png";
const POWER_V97 = "/som/inside-module/power-v97.png";
const SENSORS_V95 = "/som/inside-module/sensors-v95.png";
const SENSORS_ELLIPSE = "/som/inside-module/sensors-ellipse.png";
const COMMS_V95 = "/som/inside-module/comms-v95.webp";
const COMMS_V97 = "/som/inside-module/comms-v97.png";
const COMMS_V99 = "/som/inside-module/comms-v99.png";
const COMMS_V100 = "/som/inside-module/comms-v100.png";
const COMMS_V98 = "/som/inside-module/comms-v98.png";
const HIGHLIGHT_FILL = "/dvk/inside-module/dvk-fill.webp";

const RECT_BORDER =
  "border-[1.09px] border-[#47b81f] border-solid shadow-[0px_7px_7.1px_0px_rgba(111,224,71,0.3)]";

const SPECS: { title: string; body: string }[] = [
  { title: "Footprint", body: "21×21mm (Core) | 42×21mm (With Breakout)" },
  { title: "Power", body: "Optimized for months of inference on a CR2032 coin-cell." },
  { title: "Sensors", body: "Integrated 6-axis IMU & Digital Mic" },
  { title: "Comms & I/O", body: "Onboard BLE, SPI, I2C, and UART interfaces" },
];

function SpecCard({ 
  title, 
  body,
  isActive,
  onHover,
}: { 
  title: string; 
  body: string;
  isActive?: boolean;
  onHover?: () => void;
}) {
  return (
    <div
      className={`relative flex w-full flex-col items-center overflow-clip border-[0.5px] border-solid transition-colors duration-300 shrink-0 ${
        isActive
          ? "border-[#a8ed90] bg-[rgba(68,120,7,0.2)]"
          : "border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.2)] hover:bg-[rgba(255,255,255,0.03)]"
      } px-[16px] pt-[16px] pb-[20px] min-[1024px]:min-h-[102px] min-[1024px]:pb-[24px] cursor-pointer`}
      onMouseEnter={onHover}
      data-name="Article"
    >
      <div className="flex w-full flex-col items-start gap-[10px]">
        <h3
          className={`${gilroyMedium.className} text-[18px] leading-[24px] font-medium text-white not-italic min-[1024px]:text-[22px] min-[1024px]:leading-[28px]`}
        >
          {title}
        </h3>
        <p
          className={`${interRegular.className} text-[14px] leading-[21px] font-normal text-[rgba(240,240,240,0.6)] not-italic min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
        >
          {body}
        </p>
      </div>
      <Corners />
    </div>
  );
}

export function SomInsideModule({ data }: { data?: any }) {
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const subtitle = data?.subtitle || FALLBACK_SUBTITLE;
  const heading = data?.heading || FALLBACK_HEADING;
  const baseSpecs = Array.isArray(data?.specs) && data.specs.length > 0
    ? data.specs.map((s: any, i: number) => {
        const fb = SPECS[i] || SPECS[0];
        return {
          title: s?.label || fb.title,
          body: s?.value || fb.body,
        };
      })
    : SPECS;

  const specs = [...baseSpecs];
  if (!specs.find((s) => s.title.toLowerCase().includes("memory"))) {
    specs.push({ title: "Memory", body: "Get it done." });
  }
  if (!specs.find((s) => s.title.toLowerCase().includes("debug"))) {
    specs.push({ title: "Debug", body: "Get it done." });
  }
  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-black"
      data-node-id="2438:4964"
      data-name="Inside the Sparsh AI Module"
      aria-label="Inside the Sparsh AI Module"
    >
      {/* DESKTOP (>=1024px) */}
      <div className="relative hidden w-[1192.509px] flex-col items-center gap-[48px] pt-[80px] pb-[40px] min-[1024px]:flex">
        {/* Header */}
        <div
          className="flex w-[800px] flex-col items-center gap-[24px]"
          data-node-id="2438:4965"
        >
          <div className="relative px-[10px]" data-node-id="2438:4967" data-name="Title">
            <GradientTitle gradientDeg={TITLE_GRADIENT_DEG} className="text-center">
              {heading}
            </GradientTitle>
            <Corners />
          </div>
          <p
            className={`${interRegular.className} w-[679.389px] text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
            data-node-id="2438:4973"
          >
            {subtitle}
          </p>
        </div>

        {/* Body */}
        <div className="flex w-full items-start gap-[24px]" data-node-id="2438:4974">
          {/* Left: module photo card */}
          <div
            className="relative flex h-[542.191px] w-[590.509px] shrink-0 flex-col items-center gap-[20px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.5)] pt-[10px] px-[16px] pb-[20px]"
            data-node-id="2438:4975"
            data-name="Article"
          >
            <div
              className="relative h-[464.191px] w-[558.509px] shrink-0 overflow-hidden"
              data-node-id="2438:4976"
            >
              <div className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out ${hoveredIndex === -1 || hoveredIndex === 0 ? "opacity-100" : "opacity-0"}`}>
                <img loading="lazy" decoding="async"
                  src={COLORFUL_BOARD}
                  alt=""
                  className="absolute inset-0 size-full max-w-none object-contain"
                />
              </div>
              <div className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out ${hoveredIndex === 1 || hoveredIndex === 2 || hoveredIndex === 3 || hoveredIndex === 4 || hoveredIndex === 5 ? "opacity-100" : "opacity-0"}`}>
                <img loading="lazy" decoding="async"
                  src={BOARD_IMAGE}
                  alt=""
                  className="absolute inset-0 size-full max-w-none object-contain"
                />
              </div>
              <div className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out ${hoveredIndex === 1 ? "opacity-100" : "opacity-0"}`}>
                <img loading="lazy" decoding="async" src={POWER_V95} alt="" aria-hidden className="absolute left-[183.97px] top-[364.42px] block h-[50.16px] w-[79.58px] max-w-none" />
                <img loading="lazy" decoding="async" src={POWER_V96} alt="" aria-hidden className="absolute left-[437.24px] top-[177.31px] block h-[105.68px] w-[113.99px] max-w-none" />
                <img loading="lazy" decoding="async" src={POWER_V97} alt="" aria-hidden className="absolute left-[40.44px] top-[293.91px] block h-[66.94px] w-[62.47px] max-w-none" />
              </div>
              <div className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out ${hoveredIndex === 2 ? "opacity-100" : "opacity-0"}`}>
                <img loading="lazy" decoding="async" src={SENSORS_V95} alt="" aria-hidden className="absolute left-[164.46px] top-[277.76px] block h-[72.39px] w-[61.1px] max-w-none" />
                <img loading="lazy" decoding="async" src={SENSORS_ELLIPSE} alt="" aria-hidden className="absolute left-[18.33px] top-[39.74px] block h-[53.34px] w-[53.34px] max-w-none" />
              </div>
              <div className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out ${hoveredIndex === 3 ? "opacity-100" : "opacity-0"}`}>
                <img loading="lazy" decoding="async" src={COMMS_V95} alt="" aria-hidden className="absolute left-[236.81px] top-[243.82px] block h-[178.57px] w-[119.69px] max-w-none" />
                <img loading="lazy" decoding="async" src={COMMS_V97} alt="" aria-hidden className="absolute left-[36.81px] top-[291.81px] block h-[69.88px] w-[68.74px] max-w-none" />
                <img loading="lazy" decoding="async" src={COMMS_V99} alt="" aria-hidden className="absolute left-[259.81px] top-[114.81px] block h-[67.3px] w-[61.38px] max-w-none" />
                <img loading="lazy" decoding="async" src={COMMS_V100} alt="" aria-hidden className="absolute left-[425.81px] top-[134.81px] block h-[62.3px] w-[126.38px] max-w-none" />
                <img loading="lazy" decoding="async" src={COMMS_V98} alt="" aria-hidden className="absolute left-[30.31px] top-[144.31px] block h-[52.38px] w-[52.38px] max-w-none" />
              </div>
              <div className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out ${hoveredIndex === 4 ? "opacity-100" : "opacity-0"}`}>
                <div className="absolute left-[267.5px] top-[245.23px] h-[78px] w-[44px]">
                  <img loading="lazy" decoding="async" alt="" aria-hidden src="/dvk/memory.png" className="absolute left-[-8.18px] top-[-1.19px] h-[94.4px] w-[60.4px] max-w-none" />
                </div>
              </div>
              <div className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out ${hoveredIndex === 5 ? "opacity-100" : "opacity-0"}`}>
                {/* 5720:6518 */}
                <div className="absolute left-[444.5px] top-[135.04px] h-[133px] w-[99px]">
                  <img loading="lazy" decoding="async" alt="" aria-hidden src="/dvk/debug-1.png" className="absolute left-[-8.2px] top-[-1.18px] w-[115.4px] h-[149.4px] max-w-none" />
                </div>
                {/* 5720:6435 */}
                <div className="absolute left-[129.5px] top-[369.04px] h-[30px] w-[26px]">
                  <img loading="lazy" decoding="async" alt="" aria-hidden src="/dvk/debug-2.png" className="absolute left-[-8.19px] top-[-1.19px] w-[42.4px] h-[46.4px] max-w-none" />
                </div>
                {/* 5720:6516 */}
                <div className="absolute left-[377.5px] top-[41.04px] h-[71px] w-[163px]">
                  <img loading="lazy" decoding="async" alt="" aria-hidden src="/dvk/debug-3.png" className="absolute left-[-8.18px] top-[-1.19px] w-[179.4px] h-[87.4px] max-w-none" />
                </div>
                {/* 5720:6517 */}
                <div className="absolute left-[377.5px] top-[323.04px] h-[85px] w-[163px]">
                  <img loading="lazy" decoding="async" alt="" aria-hidden src="/dvk/debug-4.png" className="absolute left-[-8.18px] top-[-1.19px] w-[179.4px] h-[101.4px] max-w-none" />
                </div>
              </div>
            </div>
            <Corners />
          </div>

          {/* Right: spec cards column */}
          <div
            className="flex w-[578px] shrink-0 flex-col gap-[16px] h-[542.191px] overflow-y-auto pr-[8px] [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[rgba(255,255,255,0.2)] [&::-webkit-scrollbar-thumb]:rounded-full"
            data-node-id="2438:4984"
            data-lenis-prevent="true"
            onMouseLeave={() => setHoveredIndex(-1)}
          >
            {specs.map((spec, index) => (
              <SpecCard 
                key={spec.title} 
                {...spec} 
                isActive={hoveredIndex === index}
                onHover={() => setHoveredIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE (<1024px) */}
      <div className="relative flex w-full flex-col items-center gap-[40px] px-[24px] pt-[64px] pb-[64px] min-[1024px]:hidden">
        {/* Header */}
        <div className="flex w-full flex-col items-center gap-[20px]">
          <div className="relative px-[10px]">
            <div
              className={`${gilroyMedium.className} bg-clip-text text-center text-[34px] leading-[37px] font-medium text-transparent not-italic [word-break:break-word]`}
              style={{
                backgroundImage: `linear-gradient(${TITLE_GRADIENT_DEG}, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              {heading}
            </div>
            <Corners />
          </div>
          <p
            className={`${interRegular.className} max-w-[332px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0]/80 not-italic min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
          >
            {subtitle}
          </p>
        </div>

        {/* Body */}
        <div className="flex w-full flex-col gap-[24px]">
          {/* Module photo card */}
          <div className="relative flex w-full flex-col items-center gap-[16px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.5)] pt-[10px] px-[16px] pb-[20px]">
            <div className="relative h-[200px] w-full shrink-0 overflow-hidden">
              <img loading="lazy" decoding="async"
                src={BOARD_IMAGE}
                alt="Sparsh AI Module"
                className="absolute inset-0 size-full object-cover"
              />
            </div>
            <Corners />
          </div>

          {/* Spec cards */}
          <div className="flex w-full flex-col gap-[16px]">
            {specs.map((spec) => (
              <SpecCard key={spec.title} {...spec} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
