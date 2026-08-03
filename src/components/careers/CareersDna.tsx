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

export function CareersDna({ data }: { data?: any }) {
  const headingText = data?.heading || "";
  const headingLines = headingText.split("\n");
  const subtitle = data?.subtitle || "";
  const bgImg = "/careers/dna-section-bg.png";
  const chipObject = mediaUrl(data?.chip_object);
  const strapiPanels: any[] =
    data?.panels && Array.isArray(data.panels) ? data.panels : [];
  const panels = strapiPanels.map((p: any) => ({
    title: p?.title || "",
    description: p?.description || "",
  }));
  // Pad panels to 5 to match designed DNA section layout (uses indices 0..4)
  while (panels.length < 5) {
    panels.push({ title: "", description: "" });
  }

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

          <CareersDnaChipImage chipObject={chipObject} />

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
  chipObject,
}: {
  chipObject: string | null;
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
      className={`relative h-[400px] w-[386px] flex shrink-0 items-center justify-center ${
        isVisible ? CHIP_FADE_IN_CLASS : "translate-y-[25px] opacity-0"
      }`}
      data-node-id="2379:8873"
      data-name="Chip Image"
    >
      {chipObject ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={chipObject}
          alt=""
          className="w-full max-h-[449px] object-contain scale-[1.2]"
        />
      ) : null}
    </div>
  );
}
