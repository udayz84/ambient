"use client";

import { useEffect, useRef, useState } from "react";
import { TURNSTILE_SITE_KEY } from "@/lib/recaptcha";

export interface CloudflareTurnstileProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: (error?: string) => void;
  className?: string;
  action?: string;
}

/**
 * Official native Cloudflare Turnstile CAPTCHA component.
 * Explicitly renders Cloudflare's privacy-first challenge widget.
 */
export function CloudflareTurnstile({
  onVerify,
  onExpire,
  onError,
  className = "",
  action = "contact",
}: CloudflareTurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const isLocalhost =
      typeof window !== "undefined" &&
      (window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1" ||
        window.location.hostname === "0.0.0.0");

    // Cloudflare official test key for localhost prevents domain-restriction spinning
    const siteKey = isLocalhost
      ? "1x00000000000000000000AA"
      : (TURNSTILE_SITE_KEY || "1x00000000000000000000AA");

    let checkInterval: NodeJS.Timeout | null = null;
    let cancelled = false;

    const renderWidget = () => {
      if (cancelled || !containerRef.current || !window.turnstile) return;
      if (widgetIdRef.current) return;

      try {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme: "dark",
          action,
          callback: (token: string) => {
            if (!cancelled) onVerify(token);
          },
          "expired-callback": () => {
            if (!cancelled) onExpire?.();
          },
          "error-callback": (errCode?: string) => {
            console.warn("[Turnstile] Widget error:", errCode);
            if (!cancelled) onError?.(errCode);
          },
        });
      } catch (err) {
        console.error("[Turnstile] Failed to render widget:", err);
      }
    };

    if (typeof window !== "undefined" && window.turnstile) {
      renderWidget();
    } else {
      checkInterval = setInterval(() => {
        if (typeof window !== "undefined" && window.turnstile) {
          if (checkInterval) clearInterval(checkInterval);
          renderWidget();
        }
      }, 100);
    }

    return () => {
      cancelled = true;
      if (checkInterval) clearInterval(checkInterval);
      if (widgetIdRef.current && typeof window !== "undefined" && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {}
        widgetIdRef.current = null;
      }
    };
  }, [mounted, action, onVerify, onExpire, onError]);

  if (!TURNSTILE_SITE_KEY) return null;

  return (
    <div className={`h-[65px] max-h-[65px] overflow-hidden flex items-center ${className}`}>
      <div ref={containerRef} className="h-[65px] max-h-[65px] overflow-hidden rounded-[4px]" />
    </div>
  );
}
