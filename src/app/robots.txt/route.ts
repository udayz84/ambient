import { getSingleType } from "@/lib/strapi";
import { getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-dynamic";

type SeoSettings = {
  robotsEnabled: boolean;
  robotsContent: string;
  sitemapUrl?: string | null;
};

export async function GET() {
  const siteUrl = getSiteUrl();
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
    const rawSitemapUrl = seoSettings?.sitemapUrl?.trim();
    const sitemapUrl = rawSitemapUrl && !rawSitemapUrl.includes("azurewebsites.net")
      ? rawSitemapUrl 
      : `${siteUrl}/sitemap.xml`;
      
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
    return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml`, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  }
}
