"use client";

import { useEffect, useState } from "react";

/**
 * CMS-editable copy for a CTA modal form, fetched once per key and cached
 * module-level (every modal with the same key shares one request).
 * Returns null until loaded — callers use their hardcoded copy as fallback,
 * so a missing/empty CMS entry never changes the rendered UI.
 */

export type PopupField = {
  id: number;
  name: string;
  label?: string;
  type: string;
  placeholder?: string;
  helper_text?: string;
  required: boolean;
};

export type PopupConfig = {
  title?: string;
  description?: string;
  cta_label?: string;
  success_title?: string;
  success_text?: string;
  fields?: PopupField[];
} | null;

const cache = new Map<string, PopupConfig>();

export function usePopupConfig(key: string): PopupConfig {
  const [config, setConfig] = useState<PopupConfig>(cache.get(key) ?? null);

  useEffect(() => {
    if (cache.has(key)) return;
    let cancelled = false;
    fetch(`/api/popup-config?key=${encodeURIComponent(key)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data: PopupConfig) => {
        if (cancelled) return;
        cache.set(key, data);
        setConfig(data);
      })
      .catch(() => {
        /* keep null — hardcoded fallback copy is used */
      });
    return () => {
      cancelled = true;
    };
  }, [key]);

  return config;
}

/** Field lookup by name, for modals whose layout is code-fixed. */
export function popupField(config: PopupConfig, name: string): PopupField | undefined {
  return config?.fields?.find((f) => f.name === name);
}
