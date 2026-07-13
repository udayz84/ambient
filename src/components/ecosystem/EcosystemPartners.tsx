"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { gilroySemiBold } from "../hero/fonts";
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
const PAN_TO_SILICON_AGAIN_PX = -(CONTENT_WIDTH_PX * 2 + SECTION_GAP_PX * 2);
const PAN_TO_DEV_AGAIN_PX = -(CONTENT_WIDTH_PX * 3 + SECTION_GAP_PX * 3);

const TRACK_TRANSITION = `transform ${SLIDE_MS}ms linear`;

type SequencePhase =
  | "idle"
  | "track-pan-dev"
  | "track-pan-silicon-again"
  | "track-pan-dev-again"
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
      className={`${gilroySemiBold.className} relative shrink-0 bg-clip-text text-[56px] leading-[60px] font-semibold tracking-[-1.12px] whitespace-nowrap text-[transparent] opacity-90 not-italic [word-break:break-word]`}
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
  children,
}: {
  title: string;
  titleNodeId: string;
  gradient: string;
  cardsNodeId: string;
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
        <PartnerCategoryTitle nodeId={titleNodeId} gradient={gradient}>
          {title}
        </PartnerCategoryTitle>

        <div className="relative h-[225px] w-full shrink-0 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}

export function EcosystemPartners({ data }: { data?: any }) {
  const siliconPartners = data?.silicon_partners;
  const developmentPartners = data?.development_partners;
  const ref = useRef<HTMLDivElement>(null);
  const isInViewRef = useRef(false);
  const loopActiveRef = useRef(false);
  const [phase, setPhase] = useState<SequencePhase>("idle");
  const [trackOffset, setTrackOffset] = useState(0);
  const [transitionsEnabled, setTransitionsEnabled] = useState(true);

  const beginLoopCycle = useCallback(() => {
    loopActiveRef.current = true;
    setTransitionsEnabled(false);
    setTrackOffset(0);
    setPhase("track-pan-dev");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTransitionsEnabled(true);
        setTrackOffset(PAN_TO_DEV_PX);
      });
    });
  }, []);

  const resetAndContinueLoop = useCallback(() => {
    setTransitionsEnabled(false);
    setTrackOffset(PAN_TO_DEV_AGAIN_PX);
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
    if (phase === "track-pan-dev") {
      const timer = window.setTimeout(() => setPhase("track-pan-silicon-again"), SLIDE_MS);
      return () => window.clearTimeout(timer);
    }

    if (phase === "track-pan-silicon-again") {
      setTransitionsEnabled(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTrackOffset(PAN_TO_SILICON_AGAIN_PX);
        });
      });
      const timer = window.setTimeout(() => setPhase("track-pan-dev-again"), SLIDE_MS);
      return () => window.clearTimeout(timer);
    }

    if (phase === "track-pan-dev-again") {
      setTransitionsEnabled(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTrackOffset(PAN_TO_DEV_AGAIN_PX);
        });
      });
      const timer = window.setTimeout(() => resetAndContinueLoop(), SLIDE_MS);
      return () => window.clearTimeout(timer);
    }
  }, [phase, resetAndContinueLoop]);

  const trackTransition = transitionsEnabled ? TRACK_TRANSITION : "none";

  return (
    <div
      ref={ref}
      className="relative h-[285px] w-full overflow-hidden"
      data-node-id="2379:1047"
    >
      <div
        className="flex h-full shrink-0 will-change-transform"
        style={{
          width: CONTENT_WIDTH_PX * 4 + SECTION_GAP_PX * 3,
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
        >
          <EcosystemPartnerRow
            config={SILICON_PARTNER_ROW}
            partners={siliconPartners}
            isDevelopment={false}
          />
        </PartnerSection>

        <PartnerSection
          title="DEVELOPMENT PARTNERS"
          titleNodeId="2379:1049"
          gradient={TITLE_GRADIENT_DEVELOPMENT}
          cardsNodeId="2379:1051-dev"
        >
          <EcosystemPartnerRow
            config={DEVELOPMENT_PARTNER_ROW}
            logoStatNodeIds={DEV_LOGO_STAT_NODES}
            partners={developmentPartners}
            isDevelopment={true}
          />
        </PartnerSection>

        <PartnerSection
          title="SILICON PARTNERS"
          titleNodeId="2379:1048"
          gradient={TITLE_GRADIENT_SILICON}
          cardsNodeId="2379:1051-silicon-2"
        >
          <EcosystemPartnerRow
            config={SILICON_PARTNER_ROW}
            partners={siliconPartners}
            isDevelopment={false}
          />
        </PartnerSection>

        <PartnerSection
          title="DEVELOPMENT PARTNERS"
          titleNodeId="2379:1049"
          gradient={TITLE_GRADIENT_DEVELOPMENT}
          cardsNodeId="2379:1051-dev-2"
        >
          <EcosystemPartnerRow
            config={DEVELOPMENT_PARTNER_ROW}
            logoStatNodeIds={DEV_LOGO_STAT_NODES}
            partners={developmentPartners}
            isDevelopment={true}
          />
        </PartnerSection>
      </div>
    </div>
  );
}
