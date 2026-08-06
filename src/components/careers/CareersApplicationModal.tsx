"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { gilroyMedium, interMedium, interRegular } from "../hero/fonts";
import { BOX_BORDER } from "./careers-shared";

export function CareersApplicationModal({
  isOpen,
  onClose,
  jobTitle,
}: {
  isOpen: boolean;
  onClose: () => void;
  jobTitle?: string;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (isOpen) {
      setShouldRender(true);
      // Wait a tick for the DOM to render before starting animation
      timeoutId = setTimeout(() => setIsAnimating(true), 50);
    } else {
      setIsAnimating(false);
      // Wait for animation to finish before unmounting
      timeoutId = setTimeout(() => setShouldRender(false), 300);
    }
    
    return () => clearTimeout(timeoutId);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);
    document.body.style.overflow = "hidden"; // Prevent background scrolling

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!mounted || !shouldRender) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 overflow-hidden">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isAnimating ? "opacity-100" : "opacity-0"}`} 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Floating Modal */}
      <div
        ref={modalRef}
        className={`relative w-full max-w-[800px] max-h-[90vh] bg-[#121212] flex flex-col transition-all duration-300 ease-out transform ${isAnimating ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95"}`}
        style={{
          // Top-left chamfer, notch in center, bottom-left chamfer
          clipPath: "polygon(70px 0, 100% 0, 100% 100%, 70px 100%, 40px calc(100% - 30px), 40px calc(50% + 100px), 0 calc(50% + 50px), 0 calc(50% - 50px), 40px calc(50% - 100px), 40px 30px)"
        }}
      >
        {/* Header Section */}
        <div className="relative flex items-center justify-between p-8 pl-[80px] border-b border-[rgba(255,255,255,0.1)] shrink-0">
          <div className="flex items-center gap-6">
            <button
              onClick={onClose}
              className="flex h-[40px] w-[40px] items-center justify-center border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] transition-colors shrink-0"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>
            <div className="flex flex-col overflow-hidden">
              <h2 className={`${gilroyMedium.className} text-[22px] leading-[28px] text-white truncate`}>
                {jobTitle || "Senior Product Manager"}
              </h2>
              <div className={`${interRegular.className} flex items-center gap-4 text-[13px] text-[rgba(255,255,255,0.6)] mt-1`}>
                <span>10+ Years Experience</span>
                <span>San Francisco</span>
              </div>
            </div>
          </div>
          
          <button
            className={`${interMedium.className} relative flex h-[40px] items-center justify-center px-6 text-[14px] leading-[24px] font-medium whitespace-nowrap text-white uppercase not-italic transition-shadow duration-200 hover:shadow-[0px_42px_107px_0px_rgba(69,196,24,0.3)] shrink-0 ml-4`}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
            />
            <span className="relative z-10 flex items-center gap-[10px]">
              APPLY NOW
            </span>
          </button>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-8 pl-[80px] flex flex-col gap-6 overflow-hidden">
          
          {/* About the Role */}
          <section className="flex flex-col gap-2">
            <h3 className={`${gilroyMedium.className} text-[18px] text-white`}>
              About the Role
            </h3>
            <p className={`${interRegular.className} text-[14px] leading-[22px] text-[rgba(255,255,255,0.6)]`}>
              Lead the strategy, roadmap, and execution of next-generation Edge AI semiconductor products, collaborating with engineering, AI, software, and business teams to deliver innovative solutions. Define product requirements, prioritize features, analyze market trends, and drive successful product launches. Work closely with customers and stakeholders to ensure Ambient Scientific&apos;s ultra-low-power AI processors meet evolving industry needs while accelerating the adoption of intelligent edge computing technologies.
            </p>
          </section>

          {/* Key Responsibilities */}
          <section className="flex flex-col gap-2">
            <h3 className={`${gilroyMedium.className} text-[18px] text-white`}>
              Key Responsibilities
            </h3>
            <ul className={`${interRegular.className} text-[14px] leading-[22px] text-[rgba(255,255,255,0.6)] list-disc pl-5 flex flex-col gap-1`}>
              <li>Define and execute the product vision, strategy, and roadmap for Ambient Scientific&apos;s Edge AI and semiconductor solutions.</li>
              <li>Gather customer, partner, and market insights to identify product opportunities and drive innovation.</li>
              <li>Collaborate with hardware, AI, firmware, and software engineering teams throughout the product lifecycle.</li>
              <li>Translate business goals into clear product requirements, user stories, and technical specifications.</li>
              <li>Prioritize features, manage product backlogs, and ensure timely delivery of high-impact releases.</li>
              <li>Work closely with sales, marketing, and business development teams to support product positioning, launches, and customer engagements.</li>
              <li>Monitor industry trends, competitive landscape, and emerging AI technologies to maintain product leadership.</li>
              <li>Define and track product KPIs, analyze performance metrics, and continuously optimize product success.</li>
            </ul>
          </section>

          {/* Perks and Benefits */}
          <section className="flex flex-col gap-2">
            <h3 className={`${gilroyMedium.className} text-[18px] text-white`}>
              Perks and Benefits
            </h3>
            <ul className={`${interRegular.className} text-[14px] leading-[22px] text-[rgba(255,255,255,0.6)] list-disc pl-5 flex flex-col gap-1`}>
              <li>Competitive salary with performance-based incentives and long-term career growth opportunities.</li>
              <li>Work on cutting-edge Edge AI and semiconductor technologies alongside industry experts.</li>
              <li>Collaborative, innovation-driven culture with opportunities to influence product strategy and business decisions.</li>
              <li>Comprehensive health benefits, paid time off, and flexible work arrangements to support work-life balance.</li>
              <li>Access to continuous learning, technical training, conferences, and professional development programs.</li>
            </ul>
          </section>

        </div>
      </div>
    </div>,
    document.body
  );
}
