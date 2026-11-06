"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

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

  // EdgeSphere is a standalone console application page that renders without the global footer
  if (normalizedPathname === "/edgesphere") {
    return null;
  }

  const showNewsletter =
    normalizedPathname === "/" ||
    normalizedPathname === "/company" ||
    normalizedPathname === "/electronica-munich-2026";

  return (
    <SiteFooter
      showNewsletter={showNewsletter}
      isContactPage={normalizedPathname === "/contact"}
      isCareersPage={normalizedPathname === "/careers"}
      isResourcesPage={normalizedPathname === "/resources"}
      isOverlapPage={
        ["/technology", "/products", "/applications", "/dvk", "/evk", "/som", "/partners", "/model-zoo", "/developer"].includes(normalizedPathname) ||
        normalizedPathname.startsWith("/applications/")
      }
      pathname={normalizedPathname}
      data={data}
      brandData={brandData}
      newsletterData={newsletterData}
    />
  );
}
