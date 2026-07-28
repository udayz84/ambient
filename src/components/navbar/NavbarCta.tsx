"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { gilroySemiBold } from "../hero/fonts";

const GREEN_CTA_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

const BUTTON_WIDTH = 147;
const BUTTON_HEIGHT = 36;
const DOT_SPACING = 8;
const REPEL_RADIUS = 40;
const REPEL_STRENGTH = 12;
const LERP = 0.18;

type Particle = { id: number; x: number; y: number };

function buildParticles(): Particle[] {
  const items: Particle[] = [];
  let id = 0;

  const cols = Math.ceil(BUTTON_WIDTH / DOT_SPACING);
  const rows = Math.ceil(BUTTON_HEIGHT / DOT_SPACING);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      items.push({
        id: id++,
        x: col * DOT_SPACING + DOT_SPACING / 2,
        y: row * DOT_SPACING + DOT_SPACING / 2,
      });
    }
  }

  return items;
}

function getRepelOffset(
  particleX: number,
  particleY: number,
  mouseX: number,
  mouseY: number,
): { x: number; y: number } {
  const dx = particleX - mouseX;
  const dy = particleY - mouseY;
  const distance = Math.hypot(dx, dy);

  if (distance <= 0 || distance >= REPEL_RADIUS) {
    return { x: 0, y: 0 };
  }

  const force = (REPEL_RADIUS - distance) / REPEL_RADIUS;
  const strength = force * REPEL_STRENGTH;
  return {
    x: (dx / distance) * strength,
    y: (dy / distance) * strength,
  };
}

export function NavbarCta({ data }: { data?: any } = {}) {
  const ctaLabel = data?.cta_label || "GET IN TOUCH";
  const ctaHref = data?.cta_href || "/contact";
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const particleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const offsetRefs = useRef<{ x: number; y: number }[]>([]);
  const mouseRef = useRef({ x: -999, y: -999 });
  const isHoveringRef = useRef(false);

  const particles = useMemo(() => buildParticles(), []);

  useEffect(() => {
    offsetRefs.current = particles.map(() => ({ x: 0, y: 0 }));

    let frameId = 0;

    const tick = () => {
      const hovering = isHoveringRef.current;
      const { x: mouseX, y: mouseY } = mouseRef.current;

      particles.forEach((particle, index) => {
        const target = hovering
          ? getRepelOffset(particle.x, particle.y, mouseX, mouseY)
          : { x: 0, y: 0 };

        const current = offsetRefs.current[index];
        current.x += (target.x - current.x) * LERP;
        current.y += (target.y - current.y) * LERP;

        const el = particleRefs.current[index];
        if (!el) return;

        el.style.transform = `translate(-50%, -50%) translate(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px)`;
      });

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [particles]);

  const updateMouse = useCallback((clientX: number, clientY: number) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;

    mouseRef.current = {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  }, []);

  const handlePointerEnter = useCallback(() => {
    isHoveringRef.current = true;
  }, []);

  const handlePointerLeave = useCallback(() => {
    isHoveringRef.current = false;
    mouseRef.current = { x: -999, y: -999 };
  }, []);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLAnchorElement>) => {
      updateMouse(event.clientX, event.clientY);
    },
    [updateMouse],
  );

  return (
    <a
      ref={buttonRef}
      href={ctaHref}
      className={`${gilroySemiBold.className} relative block h-[36px] w-[147px] shrink-0 ${GREEN_CTA_SHADOW}`}
      data-node-id="2379:1589"
      data-name="Cta"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[inherit]"
      >
        {particles.map((particle, index) => (
          <span
            key={particle.id}
            ref={(node) => {
              particleRefs.current[index] = node;
            }}
            className="absolute size-[1px] bg-white/[0.4] will-change-transform"
            style={{
              left: particle.x,
              top: particle.y,
            }}
          />
        ))}
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)] rounded-[inherit]"
      />
      <span
        className="pointer-events-none absolute top-[calc(50%-8px)] left-[20px] z-10 text-[14px] leading-[normal] whitespace-nowrap text-white uppercase not-italic"
        data-node-id="2379:1590"
      >
        {ctaLabel}
      </span>
      <span
        className="pointer-events-none absolute top-1/2 left-[126px] z-10 size-[6px] -translate-y-1/2"
        data-node-id="2379:1591"
      >
        <Image
          src="/navbar/cta-dot.svg"
          alt=""
          width={6}
          height={6}
          className="block size-full max-w-none"
          aria-hidden
        />
      </span>
      
      {/* Corner brackets */}
      <div className="pointer-events-none absolute right-0 top-0 z-20 flex size-[4px] items-center justify-center">
        <div className="-scale-x-100 -scale-y-100 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              <Image src="/hero/corner-tag-1.svg" alt="" fill className="block max-w-none" aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute left-0 top-0 z-20 flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              <Image src="/hero/corner-tag-1.svg" alt="" fill className="block max-w-none" aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 right-0 z-20 flex size-[4px] items-center justify-center">
        <div className="-scale-x-100 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              <Image src="/hero/corner-tag-1.svg" alt="" fill className="block max-w-none" aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 z-20 size-[4px]">
        <div className="absolute inset-[0_0_-12.5%_-12.5%]">
          <Image src="/hero/corner-tag-1.svg" alt="" fill className="block max-w-none" aria-hidden />
        </div>
      </div>
    </a>
  );
}