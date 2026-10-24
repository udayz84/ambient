export const GA4_MEASUREMENT_ID = "G-R9CNVQ4SYG";
export const GTM_ID = "GTM-TPJQQR8N";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Ensures window.gtag and window.dataLayer always exist.
 * Even if third-party scripts haven't finished downloading over the network,
 * this queues calls into dataLayer so nothing is ever dropped.
 */
function getGtag(): (...args: unknown[]) => void {
  if (typeof window === "undefined") return () => {};
  if (typeof window.gtag === "function") return window.gtag;
  window.dataLayer = window.dataLayer || [];
  const queuedGtag = function (...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.gtag = queuedGtag;
  return queuedGtag;
}

/**
 * Dispatches a page_view event to both GA4 (gtag) and GTM (dataLayer).
 * Safe to call on both client-side navigation (SPA) and initial load.
 */
export function trackPageView(url: string, title?: string): void {
  if (typeof window === "undefined") return;

  const pageTitle = title || document.title;
  const pageLocation = window.location.href;
  const gtag = getGtag();

  // 1. Update GA4 context parameters so subsequent events inherit the active page
  gtag("set", {
    page_title: pageTitle,
    page_location: pageLocation,
    page_path: url,
  });

  // 2. Direct GA4 page_view hit
  gtag("event", "page_view", {
    page_title: pageTitle,
    page_location: pageLocation,
    page_path: url,
    send_to: GA4_MEASUREMENT_ID,
  });

  // 3. dataLayer events for GTM (both page_view and virtual_page_view for custom triggers)
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "page_view",
    page_title: pageTitle,
    page_location: pageLocation,
    page_path: url,
  });
  window.dataLayer.push({
    event: "virtual_page_view",
    page_title: pageTitle,
    page_location: pageLocation,
    page_path: url,
  });
}

/**
 * Dispatches custom events (e.g., form submissions, downloads, clicks)
 * to both GA4 and Google Tag Manager.
 */
export function trackEvent(
  eventName: string,
  parameters: Record<string, unknown> = {}
): void {
  if (typeof window === "undefined") return;

  const gtag = getGtag();
  gtag("event", eventName, {
    ...parameters,
    send_to: GA4_MEASUREMENT_ID,
  });

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...parameters,
  });
}
