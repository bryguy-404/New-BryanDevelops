import type { Metadata } from "next";
import ServicesPageContent from "@/components/ServicesPageContent";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  "title": "Website & Software Services | Bryan Develops",
  "description": "Compare website development and custom software from Bryan Arambula in South Bend. Explore platforms, automation, integrations, and how to start a project.",
  "alternates": {
    "canonical": "https://bryandevelops.com/services"
  },
  "openGraph": {
    "title": "Website & Software Services | Bryan Develops",
    "description": "Compare website development and custom software from Bryan Arambula in South Bend. Explore platforms, automation, integrations, and how to start a project.",
    "url": "https://bryandevelops.com/services",
    "type": "website"
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Website & Software Services",
  "url": "https://bryandevelops.com/services",
  "about": {
    "@type": "ProfessionalService",
    "name": "Bryan Develops",
    "url": "https://bryandevelops.com"
  },
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Web Development",
        "url": "https://bryandevelops.com/services/web-development"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Custom Software",
        "url": "https://bryandevelops.com/services/software"
      }
    ]
  }
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-neutral-950 font-sans selection:bg-indigo-500/30 pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar variant="dark" />
      <ServicesPageContent />
    </div>
  );
}
