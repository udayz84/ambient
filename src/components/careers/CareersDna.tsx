"use client";

import { useEffect, useRef, useState } from "react";
import { CornerDecor, GradientTitle } from "../contact/contact-shared";
import { interRegular } from "../hero/fonts";
import {
  CareersGlassPanel,
  DNA_BG_GRADIENT,
  GLASS_PANEL_VISIBLE_BORDER_CLASS,
} from "./careers-shared";
import { mediaUrl } from "@/lib/strapi";

const CHIP_FADE_IN_CLASS = "animate-hero-text-fade-in opacity-0";

const DNA_HEADING_FALLBACK = "Driven by physics.\nDefined by our DNA.";
const DNA_SUBTITLE_FALLBACK = "This is how we work, build, and solve at Ambient.";

const DNA_PANEL_FALLBACKS = [
  {
    title: "Grounded in Science",
    description:
      "You work from first principles. Every decision you make is expected to be backed by data, validation, and a clear understanding of the underlying system.",
  },
  {
    title: "Stay Curious. Stay Skeptical.",
    description:
      "You are encouraged to question, challenge, and refine. Strong thinking, clear reasoning, and continuous learning are expected at every stage of the work.",
  },
  {
    title: "Chase the Impossible",
    description:
      "You take on problems that don't have predefined solutions. The expectation is not iteration, but pushing beyond accepted limits and building what doesn't yet exist.",
  },
  {
    title: "Build for Everyone",
    description:
      "Your work is not isolated. You build systems that must scale across real-world environments, constraints, and users, making advanced technology practical and usable.",
  },
  {
    title: "Protect What Powers Us",
    description:
      "You design with power as a constraint from day one. Efficiency is not an afterthought, it is a core part of how you think, build, and optimize systems.",
  },
];

export function CareersDna({ data }: { data?: any }) {
  const headingText = data?.heading || DNA_HEADING_FALLBACK;
  const headingLines = headingText.split("\n");
  const subtitle = data?.subtitle || DNA_SUBTITLE_FALLBACK;
  const bgImg =
    mediaUrl(data?.background_image) || "/careers/dna-section-bg.png";
  const chipBg = mediaUrl(data?.chip_background) || "/careers/chip-bg.png";
  const chipObject =
    mediaUrl(data?.chip_object) || "/careers/chip-object.png";
  const strapiPanels: any[] =
    data?.panels && Array.isArray(data.panels) ? data.panels : [];
  const panels = DNA_PANEL_FALLBACKS.map((fallback, i) => ({
    title: strapiPanels[i]?.title || fallback.title,
    description: strapiPanels[i]?.description || fallback.description,
  }));

  return (
    <section
      className="absolute top-[1379px] left-1/2 z-10 h-[950px] w-full -translate-x-1/2 overflow-hidden"
      data-node-id="2379:8843"
      aria-label="Driven by physics. Defined by our DNA."
    >
      <div
        className="pointer-events-none absolute top-[80px] left-0 h-[689.269px] w-full overflow-hidden"
        data-node-id="2379:8844"
        data-name="image 108"
      >
        <div className="absolute inset-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={bgImg}
            alt=""
            className="absolute size-full max-w-none"
          />
          <div className="absolute inset-0" style={{ backgroundImage: DNA_BG_GRADIENT }} aria-hidden />
        </div>
      </div>

      <div
        className="absolute top-px left-1/2 flex w-[1204px] -translate-x-1/2 flex-col items-center gap-[40px]"
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
              className="text-center whitespace-nowrap"
            >
              {headingLines.map((line: string, i: number) => (
                <p
                  key={i}
                  className={i === 0 ? "mb-0 leading-[49px]" : "leading-[49px]"}
                >
                  {line}
                </p>
              ))}
            </GradientTitle>
            <CornerDecor />
          </div>
          <p
            className={`${interRegular.className} shrink-0 text-center text-[18px] leading-[27px] font-normal whitespace-nowrap text-[#f0f0f0] not-italic [word-break:break-word]`}
            data-node-id="2379:8853"
          >
            {subtitle}
          </p>
        </div>

        <div
          className="flex w-[1204px] items-end justify-center gap-[20px]"
          data-node-id="2379:8854"
        >
          <div className="flex w-[389.999px] flex-col gap-[40px]" data-node-id="2379:8855">
            <CareersGlassPanel
              nodeId="2379:8856"
              title={panels[0].title}
              description={panels[0].description}
              borderClassName={GLASS_PANEL_VISIBLE_BORDER_CLASS}
            />
            <CareersGlassPanel
              nodeId="2379:8864"
              title={panels[1].title}
              description={panels[1].description}
              borderClassName={GLASS_PANEL_VISIBLE_BORDER_CLASS}
            />
          </div>

          <CareersDnaChipImage chipBg={chipBg} chipObject={chipObject} />

          <div className="flex w-[389.999px] flex-col gap-[40px]" data-node-id="2379:8876">
            <CareersGlassPanel
              nodeId="2379:8877"
              title={panels[2].title}
              description={panels[2].description}
              borderClassName={GLASS_PANEL_VISIBLE_BORDER_CLASS}
            />
            <CareersGlassPanel
              nodeId="2379:8885"
              title={panels[3].title}
              description={panels[3].description}
              borderClassName={GLASS_PANEL_VISIBLE_BORDER_CLASS}
            />
          </div>
        </div>

        <CareersGlassPanel
          nodeId="2379:8894"
          title={panels[4].title}
          description={panels[4].description}
          height="min-h-[126px]"
          className="w-[1204px]"
          borderClassName={GLASS_PANEL_VISIBLE_BORDER_CLASS}
        />
      </div>
    </section>
  );
}

function CareersDnaChipImage({
  chipBg,
  chipObject,
}: {
  chipBg: string;
  chipObject: string;
}) {
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
      className={`relative h-[400px] w-[386px] shrink-0 ${
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
          src={chipBg}
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
            src={chipObject}
            alt=""
            className="absolute top-[-28.9%] left-[-44.69%] h-[127.84%] w-[144.32%] max-w-none object-cover"
          />
        </div>
      </div>
    </div>
  );
}
