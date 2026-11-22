import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://bryandevelops.com";
  // Only canonical, public pages. Omit lastModified until actual per-page
  // content dates are maintained; a build date is not a content-change date.
  return [
    "", "/services", "/services/web-development", "/services/software",
    "/projects", "/engineering", "/about", "/contact", "/privacy",
  ].map((path) => ({ url: `${baseUrl}${path}` }));
}
