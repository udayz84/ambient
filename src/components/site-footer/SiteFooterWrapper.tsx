"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "./SiteFooter";

export function SiteFooterWrapper({
  data,
  brandData,
  newsletterData,
}: {
  data?: any;
  brandData?: any;
  newsletterData?: any;
}) {
  const pathname = usePathname();
  const showNewsletter = pathname === "/" || pathname === "/company";

  return (
    <SiteFooter
      showNewsletter={showNewsletter}
      isContactPage={pathname === "/contact"}
      isCareersPage={pathname === "/careers"}
      isResourcesPage={pathname === "/resources"}
      isOverlapPage={["/technology", "/products", "/applications", "/dvk", "/som"].includes(pathname)}
      data={data}
      brandData={brandData}
      newsletterData={newsletterData}
    />
  );
}
