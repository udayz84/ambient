import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar/Navbar";
import { SiteFooterWrapper } from "@/components/site-footer/SiteFooterWrapper";
import { NewsletterPopup } from "@/components/newsletter-popup/NewsletterPopup";
import { CookieConsent } from "@/components/cookie-consent/CookieConsent";
import { SmoothScroll } from "@/components/SmoothScroll";
import {
  getNavbar,
  getFooter,
  getApplicationPages,
  type ApplicationPageSummary,
} from "@/lib/strapi";
import { TabletScaleInit } from "@/components/shared/TabletScaleInit";
import "./globals.css";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const GTM_ID = "GTM-TPJQQR8N";
const GA4_MEASUREMENT_ID = "G-R9CNVQ4SYG";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ambient Scientific",
    template: "%s | Ambient Scientific",
  },
  description:
    "Ambient Scientific builds energy-aware, programmable, mixed-signal AI processors that deliver orders-of-magnitude improvements in performance-per-watt — from microwatt edge devices to hyperscaler cloud.",
  // Fresh URLs bypass previously cached redirects to missing Blob Storage files.
  icons: {
    icon: [{ url: "/icon.png?v=20261019", type: "image/png", sizes: "512x512" }],
    apple: [{ url: "/apple-icon.png?v=20261019", type: "image/png", sizes: "180x180" }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let navbar: any = null;
  let footer: any = null;
  let applicationPages: ApplicationPageSummary[] | undefined = undefined;
  const [navbarRes, footerRes, applicationPagesRes] = await Promise.allSettled([
    getNavbar<any>(),
    getFooter<any>(),
    getApplicationPages(),
  ]);
  if (navbarRes.status === "fulfilled") navbar = navbarRes.value;
  if (footerRes.status === "fulfilled") footer = footerRes.value;
  if (applicationPagesRes.status === "fulfilled") {
    applicationPages = applicationPagesRes.value;
  }
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full overflow-x-clip scroll-smooth antialiased bg-black`}
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-full flex-col overflow-x-clip bg-black">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <TabletScaleInit />
        <SmoothScroll>
          <Navbar
            data={navbar?.header}
            brandData={navbar?.brand}
            applicationPages={applicationPages}
          />
          {children}
          <SiteFooterWrapper data={footer?.footer} brandData={navbar?.brand} newsletterData={footer?.newsletter} />
        </SmoothScroll>
        <NewsletterPopup />
        <CookieConsent />
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        {/* End Google Tag Manager */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA4_MEASUREMENT_ID}');`}
        </Script>
      </body>
    </html>
  );
}
