"use client";

import { useEffect, useState } from "react";
import { interRegular, gilroyMedium } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { useFadeIn } from "../shared/useFadeIn";
import { PARTNER_CAPABILITIES, PARTNERS_ECOSYSTEM } from "./partners-data";
import { JourneyIcon, PartnersSectionHeading, PartnersBridgeBox } from "./partners-shared";

function CapabilityRow({
  index,
  title,
  short,
  description,
  journeyIcon,
  active,
  onHover,
  onToggle,
}: {
  index: number;
  title: string;
  short: string;
  description: string;
  journeyIcon: string;
  active: boolean;
  onHover: () => void;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      aria-expanded={active}
      onClick={onToggle}
      onMouseEnter={onHover}
      onFocus={onHover}
      className={`group relative flex w-full cursor-pointer flex-col border-[0.5px] border-solid text-left backdrop-blur-[8px] transition-[border-color,background-color,box-shadow] duration-300 ${
        active
          ? "border-[rgba(83,216,36,0.5)] bg-[rgba(46,119,20,0.14)] shadow-[0px_0px_32px_0px_rgba(83,216,36,0.14)]"
          : "border-[rgba(240,240,240,0.2)] bg-[rgba(21,21,21,0.3)] hover:border-[rgba(83,216,36,0.35)]"
      }`}
    >
      <Corners />
      <div className="flex w-full items-center gap-[20px] px-[28px] py-[22px] min-[1024px]:px-[32px]">
        <span
          className={`${interRegular.className} hidden w-[32px] shrink-0 text-[12px] leading-[18px] tracking-[1.2px] transition-colors duration-300 min-[1024px]:block ${
            active ? "text-[#53d824]" : "text-[#8a8a8a]"
          }`}
        >
          0{index + 1}
        </span>
        <span
          className={`flex size-[40px] shrink-0 items-center justify-center border-[0.5px] border-solid transition-colors duration-300 ${
            active
              ? "border-[rgba(83,216,36,0.55)] bg-[rgba(83,216,36,0.12)] text-[#a9e28c]"
              : "border-[rgba(240,240,240,0.2)] text-[#f0f0f0] opacity-75"
          }`}
        >
          <JourneyIcon name={journeyIcon} className="size-[22px]" />
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-[2px]">
          <span className={`${gilroyMedium.className} truncate text-[20px] leading-[26px] font-medium text-white not-italic min-[1024px]:text-[22px] min-[1024px]:leading-[28px]`}>
            {title}
          </span>
          <span className="text-[11px] leading-[16px] tracking-[1px] text-[#8a8a8a] uppercase">
            {short}
          </span>
        </span>
      </div>

      {/* expandable description */}
      <div
        className={`grid transition-[grid-template-rows] duration-400 ease-out ${
          active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className={`${interRegular.className} w-full px-[28px] pb-[26px] text-[16px] leading-[24px] font-normal text-[#f0f0f0] opacity-75 [word-break:break-word] not-italic min-[1024px]:pl-[100px] min-[1024px]:pr-[48px] max-[1023px]:text-[14px] max-[1023px]:leading-[21px]`}>
            {description}
          </p>
        </div>
      </div>
    </button>
  );
}

export function PartnersCapabilities() {
  const { fadeRef, isVisible } = useFadeIn<HTMLElement>();
  const fadeCls = isVisible ? "animate-hero-text-fade-in opacity-0" : "translate-y-[25px] opacity-0";
  const [hoverIndex, setHoverIndex] = useState(0);
  const [touchIndex, setTouchIndex] = useState(0);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    const update = () => setIsTouch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section
      ref={fadeRef}
      className={`relative mx-auto flex w-full max-w-[1204px] flex-col items-center gap-[40px] px-[24px] py-[40px] min-[1024px]:py-[64px] ${fadeCls} transform-gpu`}
      aria-label="The ecosystem, by capability"
    >
      <div className="relative flex flex-col items-center gap-[16px] px-[10px]">
        <PartnersSectionHeading deg="101.272deg">{PARTNERS_ECOSYSTEM.heading}</PartnersSectionHeading>
        <Corners />
      </div>

      <p className={`${interRegular.className} max-w-[720px] text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 [word-break:break-word] not-italic max-[1023px]:text-[14px] max-[1023px]:leading-[21px]`}>
        {PARTNERS_ECOSYSTEM.subheading}
      </p>

      <div className="flex w-full flex-col gap-[12px]">
        {PARTNER_CAPABILITIES.map((cap, i) => (
          <CapabilityRow
            key={cap.id}
            index={i}
            title={cap.title}
            short={cap.short}
            description={cap.description}
            journeyIcon={cap.journeyIcon}
            active={isTouch ? touchIndex === i : hoverIndex === i}
            onHover={() => setHoverIndex(i)}
            onToggle={() => setTouchIndex((prev) => (prev === i ? -1 : i))}
          />
        ))}
      </div>

      {/* bridge line */}
      <PartnersBridgeBox className="mt-[16px]">
        {PARTNERS_ECOSYSTEM.bridge}
      </PartnersBridgeBox>
    </section>
  );
}
