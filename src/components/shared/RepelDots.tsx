"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const DOT_SPACING = 8;
const REPEL_RADIUS = 40;
const REPEL_STRENGTH = 12;
const LERP = 0.18;
const IDLE_THRESHOLD = 0.05;

type Particle = { id: number; x: number; y: number };

function buildParticles(width: number, height: number): Particle[] {
  if (width <= 0 || height <= 0) return [];

  const items: Particle[] = [];
  let id = 0;

  const cols = Math.ceil(width / DOT_SPACING);
  const rows = Math.ceil(height / DOT_SPACING);

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

export function RepelDots({ dotClass = "bg-white/[0.4]" }: { dotClass?: string }) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const particleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [dims, setDims] = useState({ width: 0, height: 0 });

  const particles = useMemo(
    () => buildParticles(dims.width, dims.height),
    [dims.width, dims.height],
  );

  useEffect(() => {
    const parent = containerRef.current?.parentElement;
    if (!parent) return;

    const measure = () => {
      const rect = parent.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      setDims((prev) =>
        prev.width === width && prev.height === height
          ? prev
          : { width, height },
      );
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (particles.length === 0) return;

    const parent = containerRef.current?.parentElement;
    if (!parent) return;

    const offsets = particles.map(() => ({ x: 0, y: 0 }));
    const mouse = { x: -999, y: -999 };
    let hovering = false;
    let frameId = 0;

    const applyTransforms = () => {
      const mouseX = mouse.x;
      const mouseY = mouse.y;
      let movement = 0;

      for (let index = 0; index < particles.length; index++) {
        const particle = particles[index];
        const target = hovering
          ? getRepelOffset(particle.x, particle.y, mouseX, mouseY)
          : { x: 0, y: 0 };

        const current = offsets[index];
        if (!current) continue;

        current.x += (target.x - current.x) * LERP;
        current.y += (target.y - current.y) * LERP;

        movement +=
          Math.abs(target.x - current.x) + Math.abs(target.y - current.y);

        const el = particleRefs.current[index];
        if (el) {
          el.style.transform = `translate(-50%, -50%) translate(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px)`;
        }
      }

      return movement;
    };

    const tick = () => {
      const movement = applyTransforms();

      if (!hovering && movement < IDLE_THRESHOLD) {
        frameId = 0;
        return;
      }

      frameId = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    const onEnter = () => {
      hovering = true;
      start();
    };

    const onMove = (event: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    const onLeave = () => {
      hovering = false;
      mouse.x = -999;
      mouse.y = -999;
      start();
    };

    parent.addEventListener("pointerenter", onEnter);
    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerleave", onLeave);

    frameId = window.requestAnimationFrame(tick);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      parent.removeEventListener("pointerenter", onEnter);
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
    };
  }, [particles]);

  return (
    <span
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {particles.map((particle, index) => (
        <span
          key={particle.id}
          ref={(node) => {
            particleRefs.current[index] = node;
          }}
          className={`absolute size-[1px] will-change-transform ${dotClass}`}
          style={{ left: particle.x, top: particle.y }}
        />
      ))}
    </span>
  );
}
