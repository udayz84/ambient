"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { interSemiBold } from "../hero/fonts";
import {
  DEVELOPMENT_PARTNER_ROW,
  SILICON_PARTNER_ROW,
} from "./ecosystem-data";
import { DEV_LOGO_STAT_NODES, EcosystemPartnerRow } from "./EcosystemPartnerRow";

const TITLE_GRADIENT_SILICON =
  "linear-gradient(119.414deg, rgb(22, 22, 22) 9.0248%, rgb(39, 39, 39) 37.884%, rgb(18, 18, 18) 111.41%)";

const TITLE_GRADIENT_DEVELOPMENT =
  "linear-gradient(127.267deg, rgb(22, 22, 22) 9.0248%, rgb(39, 39, 39) 37.884%, rgb(18, 18, 18) 111.41%)";

const CONTENT_WIDTH_PX = 1204;
const SECTION_GAP_PX = 20;
const SLIDE_MS = 12000;

const PAN_TO_DEV_PX = -(CONTENT_WIDTH_PX + SECTION_GAP_PX);
const PAN_EXIT_PX = -(CONTENT_WIDTH_PX * 2 + SECTION_GAP_PX * 2);

const SLIDE_TRANSITION = `transform ${SLIDE_MS}ms linear`;
const TRACK_TRANSITION = `transform ${SLIDE_MS}ms linear`;

type SequencePhase =
  | "idle"
  | "silicon-slide"
  | "track-pan-dev"
  | "track-exit"
  | "reset";

function PartnerCategoryTitle({
  children,
  nodeId,
  gradient,
}: {
  children: string;
  nodeId: string;
  gradient: string;
}) {
  return (
    <p
      className={`${interSemiBold.className} relative shrink-0 bg-clip-text text-[56px] leading-[60px] font-semibold tracking-[-1.12px] whitespace-nowrap text-[transparent] opacity-90 not-italic [word-break:break-word]`}
      style={{ backgroundImage: gradient }}
      data-node-id={nodeId}
    >
      {children}
    </p>
  );
}

function PartnerSection({
  title,
  titleNodeId,
  gradient,
  cardsNodeId,
  slideIn,
  animateSlide,
  slideTransition,
  children,
}: {
  title: string;
  titleNodeId: string;
  gradient: string;
  cardsNodeId: string;
  slideIn: boolean;
  animateSlide: boolean;
  slideTransition: string;
  children: ReactNode;
}) {
  return (
    <div
      className="relative h-[285px] shrink-0 overflow-hidden"
      style={{ width: CONTENT_WIDTH_PX }}
    >
      <div
        className="relative flex h-full w-full flex-col items-start"
        data-node-id={cardsNodeId}
      >
        <div
          className="flex w-full flex-col items-start will-change-transform"
          style={{
            transform: slideIn ? "translateX(0)" : "translateX(100%)",
            transition: animateSlide ? slideTransition : "none",
          }}
        >
          <PartnerCategoryTitle nodeId={titleNodeId} gradient={gradient}>
            {title}
          </PartnerCategoryTitle>

          <div className="relative h-[225px] w-full shrink-0 overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function EcosystemPartners() {
  const ref = useRef<HTMLDivElement>(null);
  const isInViewRef = useRef(false);
  const loopActiveRef = useRef(false);
  const [phase, setPhase] = useState<SequencePhase>("idle");
  const [trackOffset, setTrackOffset] = useState(0);
  const [siliconSlideIn, setSiliconSlideIn] = useState(false);
  const [transitionsEnabled, setTransitionsEnabled] = useState(true);

  const beginLoopCycle = useCallback(() => {
    loopActiveRef.current = true;
    setTransitionsEnabled(true);
    setTrackOffset(0);
    setSiliconSlideIn(false);
    setPhase("silicon-slide");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setSiliconSlideIn(true);
      });
    });
  }, []);

  const resetAndContinueLoop = useCallback(() => {
    setTransitionsEnabled(false);
    setTrackOffset(0);
    setSiliconSlideIn(false);
    setPhase("reset");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (isInViewRef.current) {
          beginLoopCycle();
        } else {
          loopActiveRef.current = false;
          setPhase("idle");
          setTransitionsEnabled(true);
        }
      });
    });
  }, [beginLoopCycle]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;

        if (entry.isIntersecting && !loopActiveRef.current) {
          beginLoopCycle();
        }

        if (!entry.isIntersecting) {
          loopActiveRef.current = false;
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [beginLoopCycle]);

  useEffect(() => {
    if (phase === "silicon-slide") {
      const timer = window.setTimeout(() => setPhase("track-pan-dev"), SLIDE_MS);
      return () => window.clearTimeout(timer);
    }

    if (phase === "track-pan-dev") {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTrackOffset(PAN_TO_DEV_PX);
        });
      });
      const timer = window.setTimeout(() => setPhase("track-exit"), SLIDE_MS);
      return () => window.clearTimeout(timer);
    }

    if (phase === "track-exit") {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTrackOffset(PAN_EXIT_PX);
        });
      });
      const timer = window.setTimeout(() => resetAndContinueLoop(), SLIDE_MS);
      return () => window.clearTimeout(timer);
    }
  }, [phase, resetAndContinueLoop]);

  const slideTransition = transitionsEnabled ? SLIDE_TRANSITION : "none";
  const trackTransition = transitionsEnabled ? TRACK_TRANSITION : "none";

  return (
    <div
      ref={ref}
      className="relative mx-auto h-[285px] w-full max-w-[1204px] overflow-hidden"
      data-node-id="2379:1047"
    >
      <div
        className="flex h-full shrink-0 will-change-transform"
        style={{
          width: CONTENT_WIDTH_PX * 2 + SECTION_GAP_PX,
          gap: SECTION_GAP_PX,
          transform: `translateX(${trackOffset}px)`,
          transition: trackTransition,
        }}
        data-node-id="2379:1051"
      >
        <PartnerSection
          title="SILICON PARTNERS"
          titleNodeId="2379:1048"
          gradient={TITLE_GRADIENT_SILICON}
          cardsNodeId="2379:1051-silicon"
          slideIn={siliconSlideIn}
          animateSlide
          slideTransition={slideTransition}
        >
          <EcosystemPartnerRow config={SILICON_PARTNER_ROW} />
        </PartnerSection>

        <PartnerSection
          title="DEVELOPMENT PARTNERS"
          titleNodeId="2379:1049"
          gradient={TITLE_GRADIENT_DEVELOPMENT}
          cardsNodeId="2379:1051-dev"
          slideIn
          animateSlide={false}
          slideTransition={slideTransition}
        >
          <EcosystemPartnerRow
            config={DEVELOPMENT_PARTNER_ROW}
            logoStatNodeIds={DEV_LOGO_STAT_NODES}
          />
        </PartnerSection>
      </div>
    </div>
  );
}
