"use client";

import { useEffect, useRef, useState } from "react";

const DOT_SPACING = 8;
const REPEL_RADIUS = 40;
const REPEL_STRENGTH = 12;
const LERP = 0.18;

type Particle = { id: number; x: number; y: number };

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

export function AnimatedDotsBackground() {
  const containerRef = useRef<HTMLSpanElement>(null);
  const particleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const offsetRefs = useRef<{ x: number; y: number }[]>([]);
  const mouseRef = useRef({ x: -999, y: -999 });
  const isHoveringRef = useRef(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const parent = containerRef.current?.parentElement;
    if (!parent || !containerRef.current) return;

    const isGreenCta = parent.innerHTML.includes('from-[#6ced3f]') || parent.className.includes('from-[#6ced3f]');
    if (!isGreenCta) return;

    const updateDimensions = () => {
      const rect = containerRef.current!.getBoundingClientRect();
      const cols = Math.ceil(rect.width / DOT_SPACING);
      const rows = Math.ceil(rect.height / DOT_SPACING);
      const items: Particle[] = [];
      let id = 0;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          items.push({
            id: id++,
            x: col * DOT_SPACING + DOT_SPACING / 2,
            y: row * DOT_SPACING + DOT_SPACING / 2,
          });
        }
      }
      setParticles(items);
    };

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    resizeObserver.observe(parent);
    
    // Fallback if resize observer doesn't fire immediately
    updateDimensions();

    const handlePointerEnter = () => {
      isHoveringRef.current = true;
    };

    const handlePointerLeave = () => {
      isHoveringRef.current = false;
      mouseRef.current = { x: -999, y: -999 };
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    parent.addEventListener("pointerenter", handlePointerEnter as any);
    parent.addEventListener("pointerleave", handlePointerLeave as any);
    parent.addEventListener("pointermove", handlePointerMove as any);

    return () => {
      resizeObserver.disconnect();
      parent.removeEventListener("pointerenter", handlePointerEnter as any);
      parent.removeEventListener("pointerleave", handlePointerLeave as any);
      parent.removeEventListener("pointermove", handlePointerMove as any);
    };
  }, []);

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
        if (!current) return;
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

  return (
    <span
      ref={containerRef}
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
  );
}
