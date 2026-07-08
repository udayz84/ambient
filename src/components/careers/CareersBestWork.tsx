"use client";

import { useEffect, useRef, useState } from "react";
import { CornerDecor, GradientTitle } from "../contact/contact-shared";
import { CAREERS_WORK_CARDS } from "./careers-data";
import { CareersGradientCard } from "./careers-shared";
import { mediaUrl } from "@/lib/strapi";
import type { CareersValueCard } from "./careers-data";

const FADE_IN_CLASS = "animate-hero-text-fade-in opacity-0";

export function CareersBestWork({ data }: { data?: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const heading = data?.heading || "Do the best work of your life";
  const cards: CareersValueCard[] = (
    data?.cards && Array.isArray(data.cards) && data.cards.length > 0
      ? data.cards
      : CAREERS_WORK_CARDS
  ).map((c: any, i: number) => ({
    icon:
      mediaUrl(c?.icon) ||
      CAREERS_WORK_CARDS[i]?.icon ||
      "",
    title: c?.title || CAREERS_WORK_CARDS[i]?.title || "",
    description:
      c?.description || CAREERS_WORK_CARDS[i]?.description || "",
  }));

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
    <section
      className="absolute top-[827px] left-1/2 z-10 flex w-[1319.98px] -translate-x-1/2 flex-col items-center gap-[40px]"
      data-node-id="2379:8710"
      aria-label="Do the best work of your life"
    >
      <div
        className="relative flex flex-col items-center px-[10px]"
        data-node-id="2379:8711"
      >
        <GradientTitle
          nodeId="2379:8712"
          gradientDeg="127.769deg"
          className="text-center whitespace-nowrap"
        >
          {heading}
        </GradientTitle>
        <CornerDecor />
      </div>

      <div
        ref={ref}
        className={`flex w-[1318px] shrink-0 items-center gap-[20px] ${
          isVisible ? FADE_IN_CLASS : "translate-y-[25px] opacity-0"
        }`}
        data-node-id="2379:8718"
      >
        {cards.map((card, index) => (
          <CareersGradientCard
            key={card.title}
            card={card}
            nodeId={index === 0 ? "2379:8719" : index === 1 ? "2379:8730" : "2379:8743"}
          />
        ))}
      </div>
    </section>
  );
}
