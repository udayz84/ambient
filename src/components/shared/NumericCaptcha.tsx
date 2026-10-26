"use client";

import { useEffect, useState, useCallback } from "react";
import { interRegular } from "../hero/fonts";

export interface NumericCaptchaProps {
  value: string;
  onChange: (val: string) => void;
  onTokenChange: (token: string) => void;
  error?: string;
  className?: string;
}

export function NumericCaptcha({
  value,
  onChange,
  onTokenChange,
  error,
  className = "",
}: NumericCaptchaProps) {
  const [svg, setSvg] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const fetchCaptcha = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/captcha", { cache: "no-store" });
      const data = await res.json();
      if (data?.ok && data?.svg && data?.token) {
        setSvg(data.svg);
        onTokenChange(data.token);
      }
    } catch (err) {
      console.error("[Captcha] Failed to load numeric captcha:", err);
    } finally {
      setLoading(false);
    }
  }, [onTokenChange]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCaptcha();
  }, [fetchCaptcha]);

  return (
    <div className={`flex flex-col gap-[6px] ${className}`}>
      <div className="flex items-center justify-between">
        <label
          htmlFor="numeric-captcha-input"
          className={`${interRegular.className} text-[12px] font-normal leading-[18px] text-[#a0a0a0]`}
        >
          Security Code*
        </label>
        <span className="text-[11px] text-[#6ced3f]/80">Enter the 4 digits</span>
      </div>

      <div className="flex items-center gap-[10px]">
        {/* SVG Display */}
        <div
          className="relative flex h-[40px] w-[120px] shrink-0 items-center justify-center overflow-hidden rounded-[4px] border border-[#333] bg-[#141414] select-none"
          title="Security verification code"
        >
          {loading ? (
            <div className="size-[16px] animate-spin rounded-full border-2 border-white/20 border-t-[#6ced3f]" />
          ) : svg ? (
            <div
              className="pointer-events-none flex size-full items-center justify-center"
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          ) : (
            <span className="text-[11px] text-white/40">Loading...</span>
          )}
        </div>

        {/* Refresh Button */}
        <button
          type="button"
          onClick={fetchCaptcha}
          disabled={loading}
          aria-label="Refresh security code"
          title="Get a new security code"
          className="flex size-[40px] shrink-0 items-center justify-center rounded-[4px] border border-[#333] bg-[#1a1a1a] text-white/70 transition-all hover:border-[#6ced3f]/60 hover:text-[#6ced3f] active:scale-95 disabled:opacity-50"
        >
          <svg
            className={`size-[16px] ${loading ? "animate-spin" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>

        {/* Input Field */}
        <input
          id="numeric-captcha-input"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={4}
          required
          value={value}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, "").slice(0, 4);
            onChange(val);
          }}
          placeholder="Type code"
          className={`${interRegular.className} h-[40px] flex-1 rounded-[4px] border border-[#4a4a4a] bg-transparent px-[12px] text-center font-mono text-[16px] tracking-[0.2em] text-white placeholder:font-sans placeholder:text-[13px] placeholder:tracking-normal placeholder:text-[#666] outline-none transition-colors focus:border-[#6ced3f]`}
        />
      </div>

      {error && (
        <span className="text-[11px] text-[#ff5555]">{error}</span>
      )}
    </div>
  );
}
