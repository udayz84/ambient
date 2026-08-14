"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { TagBadge } from "../hero/TagBadge";
import { Corners } from "../shared/Corners";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { PARTNERS_HERO } from "./partners-data";
import { GhostGreenCta, PartnersGreenCta } from "./partners-shared";

/**
 * Ecosystem constellation — production-grade layered animation:
 *   • Central GPX chip carries the REAL CubicCore icon (paths embedded from
 *     public/technology/icon-cubiccore.svg) with a soft green glow.
 *   • Dashed data-flow streams along every connector (site's connector-flow
 *     language), plus glowing packets that travel core → partner → core
 *     ("help flows both ways"), each with a trailing glow.
 *   • Radar pings ripple off partner nodes; orbit rings + core ring rotate
 *     imperceptibly slowly; star-field dots twinkle.
 *   • All motion is SMIL/CSS-transform (GPU friendly, zero JS per frame)
 *     and fully disabled under prefers-reduced-motion.
 */
function Constellation({ className = "" }: { className?: string }) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const core = { x: 360, y: 320 };
  const nodes = [
    { x: 150, y: 118, label: "AI", bend: -40 },
    { x: 556, y: 96, label: "FW", bend: 36 },
    { x: 634, y: 330, label: "HW", bend: -30 },
    { x: 528, y: 532, label: "ODM", bend: 40 },
    { x: 196, y: 540, label: "EMS", bend: -34 },
    { x: 88, y: 336, label: "SI", bend: 30 },
  ];
  const stars = [
    { x: 96, y: 190, r: 1.2, d: 5.2 },
    { x: 250, y: 60, r: 1, d: 6.4 },
    { x: 430, y: 210, r: 1.4, d: 4.8 },
    { x: 660, y: 200, r: 1, d: 7.1 },
    { x: 690, y: 460, r: 1.2, d: 5.8 },
    { x: 470, y: 600, r: 1, d: 6.9 },
    { x: 250, y: 620, r: 1.2, d: 5.5 },
    { x: 60, y: 480, r: 1, d: 6.1 },
    { x: 380, y: 80, r: 1, d: 7.6 },
    { x: 560, y: 640, r: 1.1, d: 5.9 },
  ];

  return (
    <svg
      viewBox="0 0 720 640"
      className={className}
      fill="none"
      aria-hidden
      role="presentation"
    >
      <defs>
        <radialGradient id="partners-core-glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(360 320) scale(170)">
          <stop offset="0" stopColor="#53d824" stopOpacity="0.30" />
          <stop offset="0.45" stopColor="#53d824" stopOpacity="0.10" />
          <stop offset="1" stopColor="#53d824" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="partners-node-glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(0 0) scale(40)">
          <stop offset="0" stopColor="#53d824" stopOpacity="0.38" />
          <stop offset="1" stopColor="#53d824" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="partners-chip-fill" x1="326" y1="286" x2="394" y2="354" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#101c0b" />
          <stop offset="1" stopColor="#0a1406" />
        </linearGradient>
        <filter id="partners-soft-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.6" />
        </filter>
      </defs>

      {/* star field — faint twinkle */}
      {stars.map((s, i) => (
        <circle key={`star-${i}`} cx={s.x} cy={s.y} r={s.r} fill="#e2f9da" opacity="0.18">
          {reducedMotion ? null : (
            <animate attributeName="opacity" values="0.08;0.32;0.08" dur={`${s.d}s`} begin={`${-i * 0.7}s`} repeatCount="indefinite" />
          )}
        </circle>
      ))}

      {/* orbit rings — imperceptibly slow drift */}
      <g
        className={reducedMotion ? undefined : "partners-orbit-slow"}
        style={{ transformOrigin: "360px 320px" }}
      >
        <ellipse cx="360" cy="320" rx="290" ry="238" stroke="rgba(255,255,255,0.07)" strokeDasharray="2 8" />
        <ellipse cx="360" cy="320" rx="188" ry="150" stroke="rgba(255,255,255,0.05)" strokeDasharray="2 8" />
      </g>

      {/* connectors: base line + streaming data dashes + glowing packets */}
      {nodes.map((node, i) => {
        const mx = (core.x + node.x) / 2 + node.bend;
        const my = (core.y + node.y) / 2 - node.bend * 0.6;
        const path = `M${core.x} ${core.y} Q${mx} ${my} ${node.x} ${node.y}`;
        const dur = `${4.2 + i * 0.55}s`;
        const begin = `${-i * 0.83}s`;
        const motion = {
          dur,
          begin,
          repeatCount: "indefinite" as const,
          calcMode: "spline" as const,
          keyPoints: "0;1;0",
          keyTimes: "0;0.5;1",
          keySplines: "0.45 0 0.55 1;0.45 0 0.55 1",
          path,
        };
        return (
          <g key={node.label}>
            <path d={path} stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            {reducedMotion ? null : (
              <path
                d={path}
                stroke="rgba(169,226,140,0.4)"
                strokeWidth="1"
                strokeDasharray="3 9"
                opacity="0.55"
              >
                <animate attributeName="stroke-dashoffset" from="12" to="0" dur="1.4s" begin={begin} repeatCount="indefinite" />
              </path>
            )}
            {reducedMotion ? null : (
              <g>
                <circle r="7" fill="#53d824" opacity="0.22">
                  <animateMotion {...motion} />
                </circle>
                <circle r="2.4" fill="#a9e28c">
                  <animateMotion {...motion} />
                </circle>
              </g>
            )}
          </g>
        );
      })}

      {/* partner nodes: halo, radar ping, chip, label */}
      {nodes.map((node, i) => (
        <g key={`node-${node.label}`}>
          <circle cx={node.x} cy={node.y} r="34" fill="url(#partners-node-glow)" />
          {reducedMotion ? null : (
            <circle cx={node.x} cy={node.y} r="12" stroke="rgba(169,226,140,0.55)" strokeWidth="1">
              <animate attributeName="r" values="10;30" dur="2.8s" begin={`${i * 0.47}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.55;0" dur="2.8s" begin={`${i * 0.47}s`} repeatCount="indefinite" />
            </circle>
          )}
          <g
            className={reducedMotion ? undefined : "partners-node"}
            style={{ animationDelay: `${i * 0.55}s`, transformOrigin: `${node.x}px ${node.y}px` }}
          >
            <rect
              x={node.x - 7}
              y={node.y - 7}
              width="14"
              height="14"
              stroke="rgba(169,226,140,0.9)"
              strokeWidth="1.2"
              fill="rgba(83,216,36,0.14)"
            />
            <path
              d={`M${node.x - 7} ${node.y - 7 + 4}V${node.y - 7}H${node.x - 7 + 4}M${node.x + 7 - 4} ${node.y - 7}H${node.x + 7}V${node.y - 7 + 4}M${node.x + 7} ${node.y + 7 - 4}V${node.y + 7}H${node.x + 7 - 4}M${node.x - 7 + 4} ${node.y + 7}H${node.x - 7}V${node.y + 7 - 4}`}
              stroke="#53d824"
              strokeWidth="1.1"
            />
          </g>
          <text
            x={node.x + (node.x >= 360 ? 17 : -17)}
            y={node.y + 4}
            textAnchor={node.x >= 360 ? "start" : "end"}
            fill="rgba(236,250,229,0.78)"
            fontSize="12"
            letterSpacing="1.6"
            fontFamily="var(--font-geist-mono), monospace"
          >
            {node.label}
          </text>
        </g>
      ))}

      {/* central GPX chip with the real CubicCore icon */}
      <g className={reducedMotion ? undefined : "partners-core"} style={{ transformOrigin: "360px 320px" }}>
        <circle cx="360" cy="320" r="170" fill="url(#partners-core-glow)" />
      </g>
      <g
        className={reducedMotion ? undefined : "partners-ring-rotate"}
        style={{ transformOrigin: "360px 320px" }}
      >
        <circle cx="360" cy="320" r="56" stroke="rgba(83,216,36,0.4)" strokeDasharray="2 7" />
      </g>
      <g>
        <rect
          x="326"
          y="286"
          width="68"
          height="68"
          stroke="rgba(169,226,140,0.9)"
          strokeWidth="1.4"
          fill="url(#partners-chip-fill)"
        />
        <rect x="326" y="286" width="68" height="68" fill="#53d824" opacity="0.07" />
        {/* corner brackets — site DNA */}
        <path d="M326 291V286H331M389 286H394V291M394 349V354H389M331 354H326V349" stroke="#a9e28c" strokeWidth="1.4" />
        {/* CubicCore icon — paths from public/technology/icon-cubiccore.svg */}
        <g transform="translate(340 300) scale(1.8605)">
          <g stroke="#53d824" strokeWidth="2.6" opacity="0.35" filter="url(#partners-soft-glow)">
            <path d="M5.75 3.25009C4.09315 3.25009 2.75 4.59324 2.75 6.25009C2.75 6.81876 2.90822 7.35046 3.18304 7.80359C1.79727 8.06865 0.75 9.28707 0.75 10.7501C0.75 12.2131 1.79727 13.4315 3.18304 13.6966M5.75 3.25009C5.75 1.86938 6.86929 0.750095 8.25 0.750095C9.63071 0.750095 10.75 1.86938 10.75 3.25009V18.2501C10.75 19.6308 9.63071 20.7501 8.25 20.7501C6.86929 20.7501 5.75 19.6308 5.75 18.2501C4.09315 18.2501 2.75 16.9069 2.75 15.2501C2.75 14.6814 2.90822 14.1497 3.18304 13.6966M5.75 3.25009C5.75 4.068 6.14278 4.79417 6.75 5.25028M3.18304 13.6966C3.53948 13.1089 4.09207 12.6533 4.75 12.4208" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15.75 18.25C17.4069 18.25 18.75 16.9069 18.75 15.25C18.75 14.6813 18.5918 14.1496 18.317 13.6965C19.7027 13.4314 20.75 12.213 20.75 10.75C20.75 9.28698 19.7027 8.06855 18.317 7.8035M15.75 18.25C15.75 19.6307 14.6307 20.75 13.25 20.75C11.8693 20.75 10.75 19.6307 10.75 18.25L10.75 3.25C10.75 1.86929 11.8693 0.75 13.25 0.75C14.6307 0.75 15.75 1.86929 15.75 3.25C17.4069 3.25 18.75 4.59315 18.75 6.25C18.75 6.81866 18.5918 7.35037 18.317 7.8035M15.75 18.25C15.75 17.4321 15.3572 16.7059 14.75 16.2498M18.317 7.8035C17.9605 8.39122 17.4079 8.84675 16.75 9.07929" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <g stroke="#6FE047" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5.75 3.25009C4.09315 3.25009 2.75 4.59324 2.75 6.25009C2.75 6.81876 2.90822 7.35046 3.18304 7.80359C1.79727 8.06865 0.75 9.28707 0.75 10.7501C0.75 12.2131 1.79727 13.4315 3.18304 13.6966M5.75 3.25009C5.75 1.86938 6.86929 0.750095 8.25 0.750095C9.63071 0.750095 10.75 1.86938 10.75 3.25009V18.2501C10.75 19.6308 9.63071 20.7501 8.25 20.7501C6.86929 20.7501 5.75 19.6308 5.75 18.2501C4.09315 18.2501 2.75 16.9069 2.75 15.2501C2.75 14.6814 2.90822 14.1497 3.18304 13.6966M5.75 3.25009C5.75 4.068 6.14278 4.79417 6.75 5.25028M3.18304 13.6966C3.53948 13.1089 4.09207 12.6533 4.75 12.4208" />
            <path d="M15.75 18.25C17.4069 18.25 18.75 16.9069 18.75 15.25C18.75 14.6813 18.5918 14.1496 18.317 13.6965C19.7027 13.4314 20.75 12.213 20.75 10.75C20.75 9.28698 19.7027 8.06855 18.317 7.8035M15.75 18.25C15.75 19.6307 14.6307 20.75 13.25 20.75C11.8693 20.75 10.75 19.6307 10.75 18.25L10.75 3.25C10.75 1.86929 11.8693 0.75 13.25 0.75C14.6307 0.75 15.75 1.86929 15.75 3.25C17.4069 3.25 18.75 4.59315 18.75 6.25C18.75 6.81866 18.5918 7.35037 18.317 7.8035M15.75 18.25C15.75 17.4321 15.3572 16.7059 14.75 16.2498M18.317 7.8035C17.9605 8.39122 17.4079 8.84675 16.75 9.07929" />
          </g>
        </g>
      </g>
      <text
        x="360"
        y="394"
        textAnchor="middle"
        fill="rgba(236,250,229,0.85)"
        fontSize="13"
        letterSpacing="3"
        fontFamily="var(--font-geist-mono), monospace"
      >
        GPX · CUBICCORE
      </text>
    </svg>
  );
}

export function PartnersHero() {
  const { tag, title, subtitle, primaryCta, secondaryCta } = PARTNERS_HERO;

  return (
    <section
      className="relative -mt-[78px] flex w-full justify-center overflow-hidden bg-black"
      aria-label="Partners — The Promise"
    >
      {/* ambient glow backdrop */}
      <div
        className="pointer-events-none absolute top-[150px] left-1/2 -translate-x-1/2 h-[720px] w-[920px] opacity-70 min-[1024px]:top-[-120px] min-[1024px]:left-auto min-[1024px]:right-[-160px] min-[1024px]:translate-x-0"
        style={{
          background:
            "radial-gradient(closest-side, rgba(83,216,36,0.10), rgba(83,216,36,0.03) 55%, transparent 75%)",
        }}
        aria-hidden
      />

      {/* DESKTOP — 1442px design canvas, scaled down proportionally on
          1024–1442px viewports (same approach as the Contact map). */}
      <div className="relative hidden w-full min-[1024px]:block">
        <div className="relative h-[820px] w-full">
          <div
            className="absolute top-0 left-1/2 h-[820px] w-[1442px] origin-top"
            style={{
              transform:
                "translateX(-50%) scale(min(1, calc((100vw - 40px) / 1442px)))",
            }}
          >

            <div className="absolute top-1/2 left-[100px] w-[680px] -translate-y-1/2">
              <div className="flex animate-hero-text-fade-in transform-gpu flex-col items-start gap-[24px]">
                <TagBadge label={tag} width={196} labelOffsetX={0} rightBarLeft={187} centerLabel />
                <div className="relative p-[24px] -m-[24px] w-max max-w-full">
                  <Corners />
                  <h1
                    className={`${gilroyMedium.className} bg-clip-text text-[46px] leading-[52px] font-medium text-transparent [word-break:break-word] not-italic`}
                    style={{
                      backgroundImage:
                        "linear-gradient(101.005deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                    }}
                  >
                    {title.split('. ').map((part, i, arr) => (
                      <span key={i} className="block">
                        {part}{i < arr.length - 1 ? "." : ""}
                      </span>
                    ))}
                  </h1>
                </div>
                <p className={`${interRegular.className} w-[500px] text-[16px] leading-[24px] font-normal text-[#f0f0f0] opacity-80 [word-break:break-word] not-italic`}>
                  {subtitle}
                </p>
                <div className="mt-[12px] flex items-center gap-[20px]">
                  <PartnersGreenCta width="204px" href={primaryCta.href}>
                    {primaryCta.label}
                  </PartnersGreenCta>
                  <GhostGreenCta width="204px" href={secondaryCta.href}>
                    {secondaryCta.label}
                  </GhostGreenCta>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute top-1/2 right-[24px] w-[740px] -translate-y-1/2">
              <div className="animate-hero-text-fade-in transform-gpu [animation-delay:0.15s]">
                <Constellation className="h-auto w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="relative flex w-full flex-col px-[24px] pt-[100px] pb-[48px] min-[1024px]:hidden">
        <div className="relative z-10 flex animate-hero-text-fade-in transform-gpu flex-col items-center gap-[15px]">
          <TagBadge label={tag} width={196} labelOffsetX={0} rightBarLeft={187} centerLabel />
          <div className="relative p-[16px] -m-[16px]">
            <Corners />
            <h1
              className={`${gilroyMedium.className} w-[332px] max-w-full bg-clip-text text-center text-[36px] leading-[38px] font-medium text-transparent [word-break:break-word] not-italic`}
              style={{
                backgroundImage:
                  "linear-gradient(100.849deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              {title}
            </h1>
          </div>
          <p className={`${interRegular.className} w-[332px] max-w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-80 not-italic`}>
            {subtitle}
          </p>
        </div>

        <div className="pointer-events-none relative z-0 mt-[8px] w-full animate-hero-text-fade-in transform-gpu [animation-delay:0.15s]">
          <div className="mx-auto w-[115%] max-w-[520px] -translate-x-[6.5%]">
            <Constellation className="h-[460px] w-full" />
          </div>
        </div>

        <div className="relative z-10 flex flex-col gap-[12px]">
          <PartnersGreenCta href={primaryCta.href}>{primaryCta.label}</PartnersGreenCta>
          <GhostGreenCta href={secondaryCta.href} className="w-full">
            {secondaryCta.label}
          </GhostGreenCta>
        </div>
      </div>
    </section>
  );
}
