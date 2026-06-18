"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "./SiteFooter";

export function SiteFooterWrapper() {
  const pathname = usePathname();
  // Show the newsletter signup on the homepage and company page
  const showNewsletter = pathname === "/" || pathname === "/company";

  return <SiteFooter showNewsletter={showNewsletter} />;
}
