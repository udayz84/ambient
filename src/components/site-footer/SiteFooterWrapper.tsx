"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "./SiteFooter";

export function SiteFooterWrapper() {
  const pathname = usePathname();
  // We only show the newsletter on the exact homepage route
  const showNewsletter = pathname === "/";

  return <SiteFooter showNewsletter={showNewsletter} />;
}
