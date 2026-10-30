"use client";

import { useEffect, useRef } from "react";

const DOT_SPACING = 8;
const REPEL_RADIUS = 40;
const REPEL_STRENGTH = 12;
const LERP = 0.18;

type Particle = { x: number; y: number };
type Offset = { x: number; y: number };

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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const parent = containerRef.current?.parentElement;
    const canvas = canvasRef.current;
    if (!parent || !canvas || !containerRef.current) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let offsets: Offset[] = [];
    let width = 0;
    let height = 0;
    let isHovering = false;
    let mouse = { x: -999, y: -999 };
    let frameId = 0;
    let isAnimating = false;

    const drawGrid = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const o = offsets[i];
        const x = Math.round(p.x + o.x);
        const y = Math.round(p.y + o.y);
        ctx.fillRect(x, y, 1, 1);
      }
    };

    const updateDimensions = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      width = Math.round(rect.width);
      height = Math.round(rect.height);

      if (width <= 0 || height <= 0) return;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.ceil(width / DOT_SPACING);
      const rows = Math.ceil(height / DOT_SPACING);
      particles = [];
      offsets = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          particles.push({
            x: col * DOT_SPACING + DOT_SPACING / 2,
            y: row * DOT_SPACING + DOT_SPACING / 2,
          });
          offsets.push({ x: 0, y: 0 });
        }
      }
      drawGrid();
    };

    const tick = () => {
      let maxMovement = 0;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const target = isHovering
          ? getRepelOffset(p.x, p.y, mouse.x, mouse.y)
          : { x: 0, y: 0 };
        const o = offsets[i];
        const nextX = o.x + (target.x - o.x) * LERP;
        const nextY = o.y + (target.y - o.y) * LERP;
        const delta = Math.abs(nextX - o.x) + Math.abs(nextY - o.y);
        if (delta > maxMovement) maxMovement = delta;
        o.x = nextX;
        o.y = nextY;
      }

      drawGrid();

      // If mouse left and all particles have returned to resting positions, stop animation loop
      if (!isHovering && maxMovement < 0.01) {
        for (let i = 0; i < offsets.length; i++) {
          offsets[i].x = 0;
          offsets[i].y = 0;
        }
        drawGrid();
        isAnimating = false;
        frameId = 0;
        return;
      }

      frameId = window.requestAnimationFrame(tick);
    };

    const startAnimation = () => {
      if (!isAnimating) {
        isAnimating = true;
        frameId = window.requestAnimationFrame(tick);
      }
    };

    const handlePointerEnter = (e: PointerEvent) => {
      isHovering = true;
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        mouse = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      }
      startAnimation();
    };

    const handlePointerLeave = () => {
      isHovering = false;
      mouse = { x: -999, y: -999 };
      // Allow tick to continue running until particles smoothly settle, then it self-terminates
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouse = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      if (!isHovering) {
        isHovering = true;
      }
      startAnimation();
    };

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    resizeObserver.observe(parent);
    updateDimensions();

    parent.addEventListener("pointerenter", handlePointerEnter as EventListener);
    parent.addEventListener("pointerleave", handlePointerLeave as EventListener);
    parent.addEventListener("pointermove", handlePointerMove as EventListener);

    return () => {
      resizeObserver.disconnect();
      if (frameId) window.cancelAnimationFrame(frameId);
      parent.removeEventListener("pointerenter", handlePointerEnter as EventListener);
      parent.removeEventListener("pointerleave", handlePointerLeave as EventListener);
      parent.removeEventListener("pointermove", handlePointerMove as EventListener);
    };
  }, []);

  return (
    <span
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[inherit]"
    >
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 block size-full"
      />
    </span>
  );
}
