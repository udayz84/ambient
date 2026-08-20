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
  const normalizedPathname = pathname.toLowerCase();
  const showNewsletter = normalizedPathname === "/" || normalizedPathname === "/company";

  return (
    <SiteFooter
      showNewsletter={showNewsletter}
      isContactPage={normalizedPathname === "/contact"}
      isCareersPage={normalizedPathname === "/careers"}
      isResourcesPage={normalizedPathname === "/resources"}
      isOverlapPage={["/technology", "/products", "/applications", "/dvk", "/som", "/partners"].includes(normalizedPathname)}
      pathname={normalizedPathname}
      data={data}
      brandData={brandData}
      newsletterData={newsletterData}
    />
  );
}
