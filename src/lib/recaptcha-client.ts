"use client";

import { useCallback } from "react";
import { TURNSTILE_SITE_KEY, type TurnstileAction } from "./recaptcha";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        params: {
          sitekey: string;
          action?: string;
          cData?: string;
          callback?: (token: string) => void;
          "error-callback"?: (errorCode?: string) => void;
          "expired-callback"?: () => void;
          "timeout-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
          appearance?: "always" | "execute" | "interaction-only";
          execution?: "render" | "execute";
        }
      ) => string;
      execute: (container?: string | HTMLElement, params?: Record<string, unknown>) => void;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
      getResponse: (widgetId?: string) => string | undefined;
    };
  }
}

// Pre-warmed background token cache
let activeWidgetId: string | null = null;
let currentToken: string | null = null;
let tokenPromise: Promise<string | null> | null = null;
let resolveTokenPromise: ((token: string | null) => void) | null = null;

function getOrCreateContainer(): HTMLElement | null {
  if (typeof document === "undefined") return null;
  let container = document.getElementById("turnstile-hidden-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "turnstile-hidden-container";
    container.style.position = "fixed";
    container.style.top = "-9999px";
    container.style.left = "-9999px";
    container.style.opacity = "0";
    container.style.pointerEvents = "none";
    document.body.appendChild(container);
  }
  return container;
}

/**
 * Initializes or warms up Turnstile in the background so a token is already
 * ready before the user clicks Submit.
 */
function initBackgroundTurnstile(): void {
  if (typeof window === "undefined" || !TURNSTILE_SITE_KEY || !window.turnstile) {
    return;
  }

  if (activeWidgetId) {
    return;
  }

  const container = getOrCreateContainer();
  if (!container) return;

  if (!tokenPromise) {
    tokenPromise = new Promise((resolve) => {
      resolveTokenPromise = resolve;
    });
  }

  try {
    activeWidgetId = window.turnstile.render(container, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: (token: string) => {
        currentToken = token;
        if (resolveTokenPromise) {
          resolveTokenPromise(token);
          resolveTokenPromise = null;
        }
      },
      "error-callback": () => {
        currentToken = null;
        if (resolveTokenPromise) {
          resolveTokenPromise(null);
          resolveTokenPromise = null;
        }
      },
      "expired-callback": () => {
        currentToken = null;
        // Refresh token silently
        if (activeWidgetId && window.turnstile) {
          window.turnstile.reset(activeWidgetId);
        }
      },
    });
  } catch (e) {
    console.warn("[Turnstile] Background init warning:", e);
  }
}

// Auto-trigger warmup as soon as window loads / idle
if (typeof window !== "undefined") {
  if (window.turnstile) {
    initBackgroundTurnstile();
  } else {
    const checkInterval = setInterval(() => {
      if (window.turnstile) {
        clearInterval(checkInterval);
        initBackgroundTurnstile();
      }
    }, 150);
    setTimeout(() => clearInterval(checkInterval), 10000);
  }
}

/**
 * Ultra-fast token retrieval:
 * If a background token is already warmed up, returns it in 0ms!
 * Otherwise awaits the in-flight token or requests a fresh one.
 */
export async function getTurnstileToken(
  action?: TurnstileAction | string
): Promise<string | null> {
  if (typeof window === "undefined" || !TURNSTILE_SITE_KEY) {
    return null;
  }

  // 1. Instant return if token is already pre-warmed in memory
  if (currentToken) {
    const readyToken = currentToken;
    currentToken = null; // consume token

    // Pre-warm the next token immediately in the background
    if (activeWidgetId && window.turnstile) {
      tokenPromise = new Promise((resolve) => {
        resolveTokenPromise = resolve;
      });
      window.turnstile.reset(activeWidgetId);
    }
    return readyToken;
  }

  // 2. If background token generation is currently in-flight, await it (with 3.5s timeout)
  if (tokenPromise) {
    const timeoutPromise = new Promise<null>((resolve) =>
      setTimeout(() => resolve(null), 3500)
    );
    const token = await Promise.race([tokenPromise, timeoutPromise]);
    if (token) {
      currentToken = null;
      if (activeWidgetId && window.turnstile) {
        tokenPromise = new Promise((resolve) => {
          resolveTokenPromise = resolve;
        });
        window.turnstile.reset(activeWidgetId);
      }
      return token;
    }
  }

  // 3. Fallback: on-demand one-off challenge
  const container = getOrCreateContainer();
  if (!container || !window.turnstile) {
    return null;
  }

  return new Promise<string | null>((resolve) => {
    let resolved = false;
    let tempWidgetId: string | undefined;

    const timeout = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        if (tempWidgetId && window.turnstile) {
          try {
            window.turnstile.remove(tempWidgetId);
          } catch {}
        }
        resolve(null);
      }
    }, 3000);

    try {
      if (!window.turnstile) {
        clearTimeout(timeout);
        resolve(null);
        return;
      }

      tempWidgetId = window.turnstile.render(container, {
        sitekey: TURNSTILE_SITE_KEY,
        action: action ? String(action) : undefined,
        callback: (tok: string) => {
          if (!resolved) {
            resolved = true;
            clearTimeout(timeout);
            if (tempWidgetId && window.turnstile) {
              try {
                window.turnstile.remove(tempWidgetId);
              } catch {}
            }
            resolve(tok);
          }
        },
        "error-callback": () => {
          if (!resolved) {
            resolved = true;
            clearTimeout(timeout);
            resolve(null);
          }
        },
      });
    } catch {
      clearTimeout(timeout);
      resolve(null);
    }
  });
}

/** Backward-compatible alias for existing form components */
export const getRecaptchaToken = getTurnstileToken;

export function useTurnstile() {
  return useCallback(
    (action?: TurnstileAction | string) => getTurnstileToken(action),
    []
  );
}

export const useRecaptcha = useTurnstile;
