"use client";

import { useEffect, useState } from "react";
import { gilroyBold, gilroySemiBold, dmMono } from "@/components/hero/fonts";
import { HERO_TITLE_GRADIENT } from "@/components/products-page/products-data";

interface ElectronicaCountdownProps {
  className?: string;
  badgeClassName?: string;
  labelClassName?: string;
}

function RollingDigit({ char }: { char: string }) {
  if (!/^\d$/.test(char)) {
    return <span className="inline-block select-none">{char}</span>;
  }

  return (
    <span className="relative inline-flex h-[1.15em] w-[0.62em] items-center justify-center overflow-hidden align-middle tabular-nums select-none">
      <span
        key={char}
        className="flex items-center justify-center animate-[countdownRollUp_300ms_cubic-bezier(0.16,1,0.3,1)_forwards] bg-clip-text text-transparent not-italic"
        style={{
          backgroundImage: HERO_TITLE_GRADIENT,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {char}
      </span>
    </span>
  );
}

function TimeUnit({
  value,
  label,
  digits = 2,
}: {
  value: number;
  label: string;
  digits?: number;
}) {
  const formatted = String(value).padStart(digits, "0");
  const chars = formatted.split("");

  return (
    <div className="flex flex-col items-center">
      <div
        className={`${gilroyBold.className} flex items-center text-[28px] sm:text-[34px] font-bold leading-none tracking-[-0.01em]`}
      >
        {chars.map((ch, idx) => (
          <RollingDigit key={`${idx}-${ch}`} char={ch} />
        ))}
      </div>
      <span
        className={`${gilroySemiBold.className} mt-[5px] text-[9px] sm:text-[10px] font-semibold tracking-[0.16em] uppercase text-[#53d824] opacity-90 select-none`}
      >
        {label}
      </span>
    </div>
  );
}

export function ElectronicaCountdown({
  className = "",
  badgeClassName = "",
  labelClassName = "",
}: ElectronicaCountdownProps) {
  // Initial SSR state matching anticipated target
  const [time, setTime] = useState({
    days: 10,
    hours: 12,
    minutes: 43,
    seconds: 0,
    isLive: false,
  });

  useEffect(() => {
    // Electronica 2026 starts Nov 10, 2026 09:00 CET
    const target = new Date("2026-11-10T09:00:00+01:00").getTime();

    function update() {
      const now = Date.now();
      const diff = target - now;
      if (diff <= 0) {
        setTime({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isLive: true,
        });
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTime({
        days,
        hours,
        minutes,
        seconds,
        isLive: false,
      });
    }

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        @keyframes countdownRollUp {
          0% {
            transform: translateY(100%);
            opacity: 0.2;
          }
          100% {
            transform: translateY(0%);
            opacity: 1;
          }
        }
      `}</style>
      <div
        className={`relative inline-flex flex-col sm:flex-row items-center gap-[12px] sm:gap-[20px] select-none ${badgeClassName} ${className}`}
      >
        {/* Live Status Eyebrow */}
        <div className="flex items-center gap-[8px] border-b sm:border-b-0 sm:border-r border-white/20 pb-[6px] sm:pb-0 sm:pr-[20px]">
          <span className="relative flex size-[8px]">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#53d824] opacity-75" />
            <span className="relative inline-flex size-[8px] rounded-full bg-[#53d824]" />
          </span>
          <span
            className={`${dmMono.className} text-[11px] sm:text-[12px] font-medium tracking-[0.16em] text-[#f0f0f0]/90 uppercase select-none ${labelClassName}`}
          >
            {time.isLive ? "EVENT LIVE NOW" : "ELECTRONICA OPENS IN"}
          </span>
        </div>

        {/* Crazy Clock Units - Borderless, Crisp, Vector Sharp */}
        <div className="flex items-center gap-[10px] sm:gap-[14px]">
          <TimeUnit value={time.days} label="DAYS" />
          <span className="text-[#53d824]/70 text-[20px] sm:text-[24px] font-mono select-none self-start pt-[2px] animate-pulse">
            :
          </span>
          <TimeUnit value={time.hours} label="HOURS" />
          <span className="text-[#53d824]/70 text-[20px] sm:text-[24px] font-mono select-none self-start pt-[2px] animate-pulse">
            :
          </span>
          <TimeUnit value={time.minutes} label="MINS" />
          <span className="text-[#53d824]/70 text-[20px] sm:text-[24px] font-mono select-none self-start pt-[2px] animate-pulse">
            :
          </span>
          <TimeUnit value={time.seconds} label="SECS" />
        </div>
      </div>
    </>
  );
}
