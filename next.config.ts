import type { NextConfig } from "next";

// Reviewed consolidation map: see LOCATION-PAGES-GUIDE.md.
// Match only existing city URLs; unknown service paths must remain 404s.
const consolidatedCities = [
  "south-bend", "fort-wayne", "warsaw", "mishawaka", "laporte", "goshen", "niles",
];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      ...["web-development", "software"].flatMap((service) =>
        consolidatedCities.map((city) => ({
          source: `/services/${service}/${city}`,
          destination: `/services/${service}`,
          permanent: true,
        }))
      ),
      {
        source: "/south-bend-web-developer",
        destination: "/services/web-development",
        permanent: true,
      },
      {
        source: "/my-work",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/website-design-development",
        destination: "/services/web-development",
        permanent: true,
      },
      {
        source: "/website-design-development/",
        destination: "/services/web-development",
        permanent: true,
      },
      {
        source: "/best-website-builders",
        destination: "/services/web-development",
        permanent: true,
      },
      {
        source: "/best-website-builders/",
        destination: "/services/web-development",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
