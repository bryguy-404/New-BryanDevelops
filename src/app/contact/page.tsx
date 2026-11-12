import type { Metadata } from "next";
import ContactPageContent from "@/components/ContactPageContent";
import Navbar from "@/components/Navbar";
import OperatorDisclosure from "@/components/OperatorDisclosure";

export const metadata: Metadata = {
  title: "Contact | Bryan Develops — Get a Free Quote",
  description:
    "Get in touch with Bryan Develops for custom web design and software development. Free consultations for businesses in South Bend and nationwide.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-neutral-950 font-sans selection:bg-indigo-500/30 pt-28">
      <Navbar variant="dark" />
      <ContactPageContent />
      <footer className="bg-neutral-950 border-t border-white/10 py-12 text-center text-neutral-500">
        <p>&copy; 2026 Bryan Develops. All rights reserved.</p>
        <OperatorDisclosure />
      </footer>
    </div>
  );
}
