"use client";

import { useLayoutEffect, useRef } from "react";

/**
 * useFitText — shrink-to-fit guard for CMS-driven titles in fixed Figma boxes.
 *
 * Attach the returned ref to the title element. After mount (and on size or
 * content change / font load) it checks whether the rendered text exceeds
 * `maxLines` design lines and scales font-size (and line-height, when the
 * element owns it) down to `floor` until it fits. Content that already fits
 * is untouched — design values stay pixel-exact, including responsive
 * variants (design size is re-read from computed style on every fit).
 *
 * `maxLines` omitted → derived from content: each block-level child (the
 * `<p>`s of a `\n`-split title) is one design line; plain-text content falls
 * back to 2 lines, the standard hero/section box design.
 *
 * ponytail: child elements with their own `leading-[Npx]` class keep that px
 * height, so multi-block titles converge in whole-line steps — slightly
 * smaller font than mathematically necessary, never broken layout.
 */
export function useFitText<T extends HTMLElement>({
  maxLines,
  floor = 12,
}: {
  maxLines?: number;
  floor?: number;
}) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    let fittedWidth = 0;
    let fittedHeight = 0;
    // Preserve the element's own inline values (some titles set design
    // font-size/line-height via style prop) — reset back to these, not "".
    const ownFontSize = el.style.fontSize;
    const ownLineHeight = el.style.lineHeight;

    const fit = () => {
      el.style.fontSize = ownFontSize;
      el.style.lineHeight = ownLineHeight;
      const { fontSize, lineHeight } = getComputedStyle(el);
      const designSize = parseFloat(fontSize);
      const designLH = parseFloat(lineHeight) || designSize * 1.2;
      const lhRatio = designLH / designSize;
      const blocks = Array.from(el.children).filter(
        (child) => !getComputedStyle(child).display.startsWith("inline"),
      );
      const lines = maxLines ?? (blocks.length > 0 ? blocks.length : 2);
      const allowed = lines * designLH;

      let size = designSize;
      const overflows = () =>
        el.scrollHeight > allowed + 1 || el.scrollWidth > el.clientWidth + 1;
      while (size > floor && overflows()) {
        size -= 0.5;
        el.style.fontSize = `${size}px`;
        el.style.lineHeight = `${size * lhRatio}px`;
      }
      fittedWidth = el.getBoundingClientRect().width;
      fittedHeight = el.getBoundingClientRect().height;
    };

    fit();
    document.fonts?.ready.then(fit).catch(() => {});
    // Re-fit when size differs from what our own fit produced (viewport
    // resize across breakpoints, or new CMS content) — never on our own edits.
    const ro = new ResizeObserver(() => {
      const { width, height } = el.getBoundingClientRect();
      if (Math.abs(width - fittedWidth) > 1 || Math.abs(height - fittedHeight) > 1) {
        fit();
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [maxLines, floor]);

  return ref;
}
