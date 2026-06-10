"use client";

import { useEffect, useRef, useState } from "react";
import { CornerDecor, GradientTitle } from "../contact/contact-shared";
import { interRegular } from "../hero/fonts";
import {
  CareersGlassPanel,
  DNA_BG_GRADIENT,
  GLASS_PANEL_VISIBLE_BORDER_CLASS,
} from "./careers-shared";

const CHIP_FADE_IN_CLASS = "animate-hero-text-fade-in opacity-0";

export function CareersDna() {
  return (
    <section
      className="relative mt-[60px] flex w-full flex-col items-center overflow-hidden lg:mt-[197px]"
      data-node-id="2379:8843"
      aria-label="Driven by physics. Defined by our DNA."
    >
      {/* 2379:8844 — background */}
      <div
        className="pointer-events-none absolute top-[80px] left-1/2 h-[689.269px] w-[1444.395px] -translate-x-1/2 overflow-hidden lg:top-[80px]"
        data-node-id="2379:8844"
        data-name="image 108"
      >
        <div className="absolute inset-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/careers/dna-section-bg.png"
            alt=""
            className="absolute size-full max-w-none object-cover object-bottom"
          />
          <div className="absolute inset-0" style={{ backgroundImage: DNA_BG_GRADIENT }} aria-hidden />
        </div>
      </div>

      <div
        className="relative flex w-full max-w-[1204px] flex-col items-center gap-[40px] px-[24px] md:px-[40px] lg:px-0"
        data-node-id="2379:8845"
      >
        <div
          className="flex flex-col items-center gap-[24px]"
          data-node-id="2379:8846"
          data-name="Section Title"
        >
          <div className="relative flex flex-col items-center px-[10px]" data-node-id="2379:8847">
            <GradientTitle
              nodeId="2379:8848"
              gradientDeg="105.739deg"
              className="whitespace-normal text-center lg:whitespace-nowrap"
            >
              <p className="mb-0 leading-[49px]">Driven by physics.</p>
              <p className="leading-[49px]">Defined by our DNA.</p>
            </GradientTitle>
            <CornerDecor />
          </div>
          <p
            className={`${interRegular.className} shrink-0 text-center text-[16px] leading-[24px] font-normal text-[#f0f0f0] not-italic [word-break:break-word] md:text-[18px] md:leading-[27px] md:whitespace-nowrap`}
            data-node-id="2379:8853"
          >
            This is how we work, build, and solve at Ambient.
          </p>
        </div>

        <div
          className="flex w-full flex-col items-center gap-[20px] lg:flex-row lg:items-end lg:justify-center lg:gap-[20px]"
          data-node-id="2379:8854"
        >
          <div className="flex w-full flex-col gap-[40px] lg:w-[389.999px]" data-node-id="2379:8855">
            <CareersGlassPanel
              nodeId="2379:8856"
              title="Grounded in Science"
              description="You work from first principles. Every decision you make is expected to be backed by data, validation, and a clear understanding of the underlying system."
              borderClassName={GLASS_PANEL_VISIBLE_BORDER_CLASS}
            />
            <CareersGlassPanel
              nodeId="2379:8864"
              title="Stay Curious. Stay Skeptical."
              description="You are encouraged to question, challenge, and refine. Strong thinking, clear reasoning, and continuous learning are expected at every stage of the work."
              borderClassName={GLASS_PANEL_VISIBLE_BORDER_CLASS}
            />
          </div>

          <CareersDnaChipImage />

          <div className="flex w-full flex-col gap-[40px] lg:w-[389.999px]" data-node-id="2379:8876">
            <CareersGlassPanel
              nodeId="2379:8877"
              title="Chase the Impossible"
              description="You take on problems that don't have predefined solutions. The expectation is not iteration, but pushing beyond accepted limits and building what doesn't yet exist."
              borderClassName={GLASS_PANEL_VISIBLE_BORDER_CLASS}
            />
            <CareersGlassPanel
              nodeId="2379:8885"
              title="Build for Everyone"
              description="Your work is not isolated. You build systems that must scale across real-world environments, constraints, and users, making advanced technology practical and usable."
              borderClassName={GLASS_PANEL_VISIBLE_BORDER_CLASS}
            />
          </div>
        </div>

        <CareersGlassPanel
          nodeId="2379:8894"
          title="Protect What Powers Us"
          description="You design with power as a constraint from day one. Efficiency is not an afterthought, it is a core part of how you think, build, and optimize systems."
          height="min-h-[126px]"
          borderClassName={GLASS_PANEL_VISIBLE_BORDER_CLASS}
        />
      </div>
    </section>
  );
}

function CareersDnaChipImage() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ animationDelay: '1s' }}
      className={`relative h-[300px] w-full max-w-[386px] shrink-0 md:h-[400px] ${
        isVisible ? CHIP_FADE_IN_CLASS : "translate-y-[25px] opacity-0"
      }`}
      data-node-id="2379:8873"
      data-name="Chip Image"
    >
      <div
        className="absolute top-1/2 left-1/2 h-[449px] w-[433px] -translate-x-1/2 -translate-y-1/2 overflow-hidden"
        data-node-id="2379:8874"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/careers/chip-bg.png"
          alt=""
          className="absolute top-[-4.24%] left-[-10.68%] h-[108.47%] w-[121.37%] max-w-none object-cover"
        />
      </div>
      <div
        className="absolute top-[calc(50%-131.56px)] left-[34.56%] right-[34.24%] flex aspect-[120.41/60.86] items-center justify-center"
        data-node-id="2379:8875"
      >
        <div className="relative h-full w-full rotate-[1.22deg] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/careers/chip-object.png"
            alt=""
            className="absolute top-[-28.9%] left-[-44.69%] h-[127.84%] w-[144.32%] max-w-none object-cover"
          />
        </div>
      </div>
    </div>
  );
}
