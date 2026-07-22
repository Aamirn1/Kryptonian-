import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://kryptondigital.co.uk";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/", // Don't crawl API routes
        "/_next/", // Don't crawl Next.js internals
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
