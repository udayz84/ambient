import { getSingleType } from "@/lib/strapi";

export const dynamic = "force-dynamic";
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

type SeoSettings = {
  robotsEnabled: boolean;
  robotsContent: string;
  sitemapUrl?: string | null;
};

export async function GET() {
  try {
    const seoSettings = await getSingleType<SeoSettings>("seo-setting");

    if (seoSettings && !seoSettings.robotsEnabled) {
      return new Response("User-agent: *\nDisallow: /", {
        status: 200,
        headers: {
          "Content-Type": "text/plain",
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      });
    }

    const robotsContent = seoSettings?.robotsContent || "User-agent: *\nAllow: /";
    
    // Append sitemap URL
    // If the editor provided a custom sitemap URL in Strapi, use it.
    // Otherwise, fallback to the canonical site URL + /sitemap.xml
    const sitemapUrl = seoSettings?.sitemapUrl 
      ? seoSettings.sitemapUrl 
      : `${SITE_URL}/sitemap.xml`;
      
    // Make sure sitemap is only appended once
    const finalContent = robotsContent.includes("Sitemap:") 
      ? robotsContent 
      : `${robotsContent.trim()}\n\nSitemap: ${sitemapUrl}`;

    return new Response(finalContent, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Failed to fetch robots.txt from Strapi:", error);
    // Fallback to default robots.txt if Strapi is down
    return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml`, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  }
}
