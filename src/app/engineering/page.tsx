import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import EngineeringPageContent from "@/components/EngineeringPageContent";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Bryan Arambula | Full-Stack & Applied AI Engineer",
  description:
    "Engineering work by Bryan Arambula: SimplAssist, AI-powered web applications, and API integrations. From requirements and architecture through deployment and support.",
  alternates: { canonical: "https://bryandevelops.com/engineering" },
  openGraph: {
    title: "Bryan Arambula | Full-Stack & Applied AI Engineer",
    description:
      "Explore SimplAssist and selected software projects by Bryan Arambula, a full-stack and applied AI engineer in South Bend, Indiana.",
    url: "https://bryandevelops.com/engineering",
    type: "website",
    siteName: "Bryan Develops",
  },
};

export default function EngineeringPage() {
  return (
    <div
      className={`${styles.page} min-h-screen bg-neutral-950 font-sans text-neutral-900 selection:bg-indigo-500/30`}
    >
      <a
        href="#engineering-content"
        className="sr-only fixed left-6 top-5 z-[60] rounded-full bg-white px-6 py-3 text-sm font-semibold text-black focus:not-sr-only"
      >
        Skip to content
      </a>
      <Navbar />
      <EngineeringPageContent />
    </div>
  );
}
