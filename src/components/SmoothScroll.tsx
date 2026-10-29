"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import LocomotiveScroll from "locomotive-scroll";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const locomotiveRef = useRef<LocomotiveScroll | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!scrollRef.current) return;

    const scroll = new LocomotiveScroll();
    locomotiveRef.current = scroll;
    (window as unknown as Record<string, unknown>).locomotiveScroll = scroll;

    return () => {
      scroll.destroy();
      locomotiveRef.current = null;
      delete (window as unknown as Record<string, unknown>).locomotiveScroll;
    };
  }, []);

  // Helper to scroll to a target element smoothly via Locomotive/Lenis
  const scrollToTarget = useCallback((targetId: string, immediate = false) => {
    const cleanId = targetId.replace(/^[#/]+/, "");
    if (!cleanId) return;

    const element = document.getElementById(cleanId);
    if (!element) return;

    const scrollInstance = locomotiveRef.current || (window as unknown as { locomotiveScroll?: LocomotiveScroll }).locomotiveScroll;
    if (scrollInstance && typeof scrollInstance.scrollTo === "function") {
      scrollInstance.scrollTo(element, { offset: -90, immediate });
    } else {
      const top = element.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top, behavior: immediate ? "auto" : "smooth" });
    }
  }, []);

  // Sync scroll on route change and handle any existing hash in the URL
  useEffect(() => {
    const scrollInstance = locomotiveRef.current || (window as unknown as { locomotiveScroll?: LocomotiveScroll }).locomotiveScroll;
    if (scrollInstance && typeof scrollInstance.resize === "function") {
      scrollInstance.resize();
    }

    const handleHash = () => {
      const hash = window.location.hash;
      if (!hash) return;

      scrollToTarget(hash, false);

      // Staggered retries to account for image/layout hydration and reflow
      const timers = [100, 300, 600, 1000].map((delay) =>
        setTimeout(() => {
          scrollToTarget(hash, false);
        }, delay)
      );

      return () => {
        timers.forEach(clearTimeout);
      };
    };

    const cleanup = handleHash();
    window.addEventListener("hashchange", handleHash);

    return () => {
      window.removeEventListener("hashchange", handleHash);
      if (cleanup) cleanup();
    };
  }, [pathname, scrollToTarget]);

  // Global click interceptor for anchor links pointing to sections
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Ignore modified clicks or new tabs
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.defaultPrevented) return;

      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;
      if (anchor.target === "_blank") return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // 1. Pure in-page hash: "#case-studies"
      if (href.startsWith("#") && href.length > 1) {
        const hashId = href.slice(1);
        const el = document.getElementById(hashId);
        if (el) {
          e.preventDefault();
          window.history.pushState(null, "", href);
          scrollToTarget(hashId);
        }
        return;
      }

      // 2. Homepage anchor link clicked while already on homepage: "/#case-studies"
      if ((pathname === "/" || pathname === "") && href.startsWith("/#") && href.length > 2) {
        const hashId = href.slice(2);
        const el = document.getElementById(hashId);
        if (el) {
          e.preventDefault();
          window.history.pushState(null, "", href);
          scrollToTarget(hashId);
        }
        return;
      }

      // 3. Absolute URL pointing to current pathname with hash
      try {
        const url = new URL(href, window.location.origin);
        const isCurrentPage =
          url.origin === window.location.origin &&
          (url.pathname === pathname || (url.pathname === "/" && (pathname === "/" || pathname === "")));

        if (isCurrentPage && url.hash && url.hash.length > 1) {
          const hashId = url.hash.slice(1);
          const el = document.getElementById(hashId);
          if (el) {
            e.preventDefault();
            window.history.pushState(null, "", url.hash);
            scrollToTarget(hashId);
          }
        }
      } catch {
        // Not a standard URL, allow default browser behavior
      }
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
    };
  }, [pathname, scrollToTarget]);

  return <div className="min-w-0 overflow-x-clip" ref={scrollRef}>{children}</div>;
}
