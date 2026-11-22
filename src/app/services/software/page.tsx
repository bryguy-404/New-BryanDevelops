import type { Metadata } from "next";
import SoftwarePageContent from "@/components/SoftwarePageContent";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  "title": "Custom Software Development in South Bend | Bryan Develops",
  "description": "Custom software, workflow automation, dashboards, integrations, and apps by Bryan Arambula in South Bend. Explore project examples and plan your first build.",
  "alternates": {
    "canonical": "https://bryandevelops.com/services/software"
  },
  "openGraph": {
    "title": "Custom Software Development in South Bend | Bryan Develops",
    "description": "Custom software, workflow automation, dashboards, integrations, and apps by Bryan Arambula in South Bend. Explore project examples and plan your first build.",
    "url": "https://bryandevelops.com/services/software",
    "type": "website"
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://bryandevelops.com/services/software#service",
  "name": "Custom Software Development",
  "description": "Custom software, workflow automation, dashboards, integrations, and apps by Bryan Arambula in South Bend. Explore project examples and plan your first build.",
  "url": "https://bryandevelops.com/services/software",
  "provider": {
    "@type": "ProfessionalService",
    "name": "Bryan Develops",
    "url": "https://bryandevelops.com"
  },
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  }
};

export default function SoftwarePage() {
  return (
    <div className="min-h-screen bg-neutral-950 font-sans selection:bg-indigo-500/30 pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar variant="dark" />
      <SoftwarePageContent />
    </div>
  );
}
