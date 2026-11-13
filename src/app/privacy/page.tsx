import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import OperatorDisclosure from "@/components/OperatorDisclosure";
import { AnalyticsSettingsButton } from "@/components/WebsiteAnalytics";

export const metadata: Metadata = {
  title: "Privacy & Analytics | Bryan Develops",
  description: "How Bryan Develops handles website inquiries and optional website analytics, and how to change your analytics choice.",
  alternates: { canonical: "https://bryandevelops.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-300">
      <Navbar variant="dark" />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-40 sm:pt-48">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-indigo-400">Your privacy</p>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Privacy &amp; analytics</h1>
        <p className="mt-5 text-sm text-neutral-400">Updated November 13, 2026</p>
        <p className="mt-8 leading-8">Bryan Develops is operated by Arambula Ventures LLC. This page explains how information is used on bryandevelops.com. Separate products linked from this website have their own privacy information.</p>

        <section className="mt-12" aria-labelledby="inquiries-heading">
          <h2 id="inquiries-heading" className="mb-4 text-2xl font-semibold text-white">When you contact me</h2>
          <p className="leading-8">The contact form sends the information you provide—including your name, email, optional phone number, service, budget, and message—to Bryan’s business email so I can respond to your inquiry. Email and website hosting providers process this information to deliver the service.</p>
          <p className="mt-4 leading-8">The website chat is provided by SimplAssist. If you use it, your messages and any details you choose to share are processed by SimplAssist to respond and help with your inquiry. See <a href="https://simplassist.com/privacy" className="text-indigo-300 underline underline-offset-4">SimplAssist’s privacy policy</a>. Avoid including passwords, payment details, or other sensitive information in a message.</p>
        </section>

        <section id="website-analytics" className="mt-12 scroll-mt-32" aria-labelledby="analytics-privacy-heading">
          <h2 id="analytics-privacy-heading" className="mb-4 text-2xl font-semibold text-white">Optional website analytics</h2>
          <p className="leading-8">With your permission, Google Analytics helps me understand which pages people visit, which software interests them, and whether they take steps to get in touch. Google’s analytics tag loads only after you choose “Allow analytics.” Choosing “No thanks” leaves analytics off and does not prevent you from using the site or contacting me. Allowing analytics plays a short thank-you animation; that is the only difference you’ll see on the site.</p>
          <ul className="my-5 list-disc space-y-3 pl-6 leading-7">
            <li>Measured interactions include product links and preview tabs, download clicks, phone and email links, opening chat, starting the contact form, and successful contact form submissions.</li>
            <li>Analytics receives page paths, the referring website, interaction types, and basic browser, device, and session information. Cookies help distinguish visits.</li>
            <li>The tracking code does not send form answers, names, email addresses, phone numbers, chat messages, or URL query strings and fragments to Google Analytics.</li>
            <li>This setup does not include session recordings, advertising personalization, or Google signals.</li>
          </ul>
          <p className="leading-8">Your choice is saved in this browser for up to 180 days. You can change it at any time below or through “Analytics preferences” in the footer. Withdrawing permission stops collection and removes this site’s Google Analytics cookies from this browser; the page may reload to stop the loaded tag. It does not delete information already received by Google.</p>
          <p className="mt-4 leading-8">Google processes analytics data under its <a href="https://policies.google.com/privacy" className="text-indigo-300 underline underline-offset-4">privacy policy</a>. Reports reflect visitors who allow analytics; a click does not confirm a completed download, connected call, or purchase.</p>
          <AnalyticsSettingsButton className="mt-6 min-h-11 rounded-full border border-indigo-400/60 px-5 py-3 text-sm font-semibold text-indigo-200 hover:bg-indigo-500/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-400" />
        </section>

        <section className="mt-12" aria-labelledby="privacy-contact-heading">
          <h2 id="privacy-contact-heading" className="mb-4 text-2xl font-semibold text-white">Questions about your information</h2>
          <p className="leading-8">To ask about information you have shared or request its deletion, email <a href="mailto:bryan@bryandevelops.com" className="text-indigo-300 underline underline-offset-4">bryan@bryandevelops.com</a>.</p>
        </section>
      </main>
      <footer className="border-t border-white/10 py-12 text-center text-neutral-500">
        <p>&copy; 2026 Bryan Develops. All rights reserved.</p>
        <OperatorDisclosure />
      </footer>
    </div>
  );
}
