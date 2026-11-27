"use client";

import OperatorDisclosure from "@/components/OperatorDisclosure";
import Link from "next/link";
import Image from "next/image";
import FloatingDots from "./CursorDots";
import FadeIn from "./FadeIn";
import SoftwareProducts from "./SoftwareProducts";

const painPoints = [
  { icon: "clipboard", text: "Still tracking leads in spreadsheets?" },
  { icon: "clock", text: "Wasting hours on tasks that could be automated?" },
  { icon: "phone-missed", text: "Missing calls and losing potential customers?" },
  { icon: "repeat", text: "Copy-pasting data between tools every day?" },
  { icon: "bar-chart", text: "No way to see how your business is actually performing?" },
  { icon: "message", text: "Manually following up with every single lead?" },
];

const solutions = [
  {
    title: "Workflow Automation",
    description:
      "Automate defined steps such as data entry, follow-ups, notifications, and reporting. Start with one workflow and agree how exceptions and manual review should work.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    accent: "indigo",
  },
  {
    title: "Custom Dashboards",
    description:
      "Bring selected business metrics into one view. The data sources, update frequency, and access permissions determine what the dashboard can show.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    accent: "purple",
  },
  {
    title: "AI-Powered Tools",
    description:
      "From chatbots that answer customer questions 24/7 to AI that responds to missed calls with a text. I build smart tools that work even when you're off the clock.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    accent: "emerald",
  },
  {
    title: "Business Platforms",
    description:
      "Need a full platform with user accounts, billing, and admin controls? I build complete SaaS products and internal tools from the ground up.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    accent: "amber",
  },
  {
    title: "Integrations & APIs",
    description:
      "Connect tools such as your CRM, email, payments, or scheduling system where their APIs and permissions allow it. We review access, limits, and failure handling before choosing an integration.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    accent: "indigo",
  },
];

const accentClasses: Record<string, { bg: string; text: string; border: string }> = {
  indigo: { bg: "bg-indigo-500/10", text: "text-indigo-400", border: "border-indigo-500/20" },
  purple: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20" },
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
  amber: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" },
  pink: { bg: "bg-pink-500/10", text: "text-pink-400", border: "border-pink-500/20" },
};

const processSteps = [
  { num: "01", title: "Discovery", desc: "We talk about what's slowing your business down, what you wish was easier, and where you're losing time or money." },
  { num: "02", title: "Blueprint", desc: "I map out exactly what the software will do, how it works, and what the end result looks like, in plain English, no jargon." },
  { num: "03", title: "Build & Test", desc: "I build it, you test it. You review a working version during development so we can check the workflow and address problems before launch." },
  { num: "04", title: "Launch & Support", desc: "We plan deployment, training, and the support your team needs. Hosting, third-party service costs, bug fixes, and future changes belong in the agreed scope." },
];

export default function SoftwarePageContent() {
  return (
    <main className="relative overflow-hidden">
      <FloatingDots variant="dark" />

      {/* ========== HERO ========== */}
      <section className="hero-grid-bg relative min-h-[85vh] flex items-center bg-black overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[30rem] h-[30rem] bg-indigo-600/15 rounded-full filter blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[25rem] h-[25rem] bg-purple-600/10 rounded-full filter blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-32 sm:py-40">
          <FadeIn>
            <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-4">
              Software Development, South Bend, Indiana
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] max-w-4xl mb-6">
              Custom Software for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Your Workflow.
              </span>
            </h1>
            <p className="text-neutral-400 text-lg sm:text-xl max-w-2xl mb-8 leading-relaxed">
              I&apos;m Bryan Arambula, a developer based in South Bend. I build web applications,
              automations, dashboards, and integrations around the way your team works,
              for businesses in Michiana and across the country.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="header-cta is-large"
              >
                Start a Project
              </Link>
              <Link
                href="#solutions"
                className="px-7 py-3.5 rounded-full border border-white/15 text-white font-semibold text-sm tracking-wide hover:bg-white/10 transition-all"
              >
                See What I Build
              </Link>
            </div>
          </FadeIn>

          {/* Credibility line */}
          <FadeIn delay={200}>
            <p className="mt-12 text-neutral-600 text-sm">
              Work directly with the developer. Explore my software products and the project process below.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ========== PAIN POINTS ========== */}
      <section className="relative py-24 sm:py-32 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                Sound Familiar?
              </h2>
              <p className="text-neutral-400 text-lg max-w-xl mx-auto">
                Start by identifying the recurring task, the people involved, and where the current tools fall short.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {painPoints.map((p, i) => (
              <FadeIn key={i} delay={(i % 3) * 100}>
                <div className="card-dark flex items-center gap-4 p-5">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-neutral-300 text-sm font-medium">{p.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ========== WHAT I BUILD ========== */}
      <section id="solutions" className="relative py-24 sm:py-32 bg-neutral-950">
        <div className="absolute top-0 left-1/3 w-[28rem] h-[28rem] bg-indigo-600/8 rounded-full filter blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="mb-16">
              <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">Solutions</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                What I Build
              </h2>
              <p className="text-neutral-400 text-lg max-w-2xl">
                Every business is different. Whether you&apos;re a local shop or a growing company, I build software tailored to your specific workflows and goals.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
            {solutions.map((sol, i) => {
              const ac = accentClasses[sol.accent];
              return (
                <FadeIn
                  key={sol.title}
                  delay={(i < 2 ? i : i - 2) * 100}
                  className={i < 2 ? "lg:col-span-3" : i === solutions.length - 1 ? "md:col-span-2 lg:col-span-2" : "lg:col-span-2"}
                >
                  <div className="card-dark is-interactive p-7 h-full group">
                    <div className={`w-12 h-12 rounded-xl ${ac.bg} border ${ac.border} flex items-center justify-center mb-5 ${ac.text} group-hover:scale-110 transition-transform`}>
                      {sol.icon}
                    </div>
                    <h3 className="text-white text-lg font-bold mb-2">{sol.title}</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">{sol.description}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <section id="project-fit" className="relative py-20 sm:py-24 bg-neutral-950 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
              Does Your Workflow Need Custom Software?
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl mb-10">
              Start with the task, rather than a feature list. An existing product or a small integration
              may be enough. A custom build is worth discussing when a specific workflow, set of users,
              or connection between systems needs more control.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: "Describe one workflow", text: "Walk through what starts the task, who does each step, and what a successful result looks like. Include exceptions, approvals, and the manual fallback when something fails." },
              { title: "List systems and access", text: "Identify the tools and data involved, who can access them, and any API or export options. Integrations depend on each provider’s permissions, limits, and pricing." },
              { title: "Define the first release", text: "Choose a small, useful version and how your team will test it. Discuss deployment, training, hosting costs, maintenance, and future changes before committing to a larger build." },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 80}>
                <div className="card-dark p-7 h-full">
                  <h3 className="text-white text-lg font-bold mb-3">{item.title}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">{item.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <p className="text-neutral-400 leading-relaxed mt-10 max-w-3xl">
              I&apos;m based in South Bend and work with businesses in Michiana and nationwide.
              Teams in Mishawaka, Goshen, LaPorte, Niles, Warsaw, and Fort Wayne can use the same
              project process. The scope depends on the workflow and systems involved.
            </p>
            <p className="text-neutral-400 leading-relaxed mt-4 max-w-3xl">
              The product examples below include SimplAssist for customer communication and SimplSEO
              for SEO workflows. <Link href="/engineering" className="text-indigo-400 underline underline-offset-4">Read the engineering case study</Link>{" "}
              for implementation details. If you need a public site or online store,
              see <Link href="/services/web-development" className="text-indigo-400 underline underline-offset-4">website development</Link>.
            </p>
          </FadeIn>
        </div>
      </section>

      <SoftwareProducts />

      {/* ========== PROCESS ========== */}
      <section id="process" className="relative py-24 sm:py-32 bg-neutral-950 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[40rem] bg-indigo-900/15 rounded-full filter blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">Process</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                How It Works
              </h2>
              <p className="text-neutral-400 text-lg max-w-xl mx-auto">
                No tech jargon, no confusing proposals. Whether we meet locally in Indiana or work together remotely, here&apos;s how it goes.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {processSteps.map((step, i) => (
              <FadeIn key={step.num} delay={i * 100}>
                <div className="card-dark is-interactive p-7 h-full group">
                  <div className="text-4xl font-black text-white/[0.06] absolute top-5 right-5 group-hover:text-white/10 transition-colors">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 mt-6">{step.title}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ========== APP SHOWCASE ========== */}
      <section className="relative py-20 sm:py-24 bg-black border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
              <div>
                <p className="text-neutral-500 text-sm font-semibold tracking-widest uppercase mb-3">
                  App Development
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Mobile App Development
                </h2>
                <p className="text-neutral-500 text-base mt-2 max-w-lg">
                  Need an app for your business or a personal idea brought to life? I design and develop iOS apps from concept to App Store, right here in Indiana.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-neutral-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <span className="text-neutral-400 text-xs font-medium">Available on the App Store</span>
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                name: "La Loteria",
                icon: "/logos/laloteria.png",
                desc: "The classic Mexican bingo game. Caller mode, play against the computer, all 54 traditional cards with authentic riddles. Perfect for family game nights.",
                status: "Live",
                url: "https://apps.apple.com/us/app/la-loteria-mexican-bingo/id6759211287",
              },
              {
                name: "Remind Me - Reminders",
                icon: "/logos/remindme.png",
                desc: "Simple, beginner-friendly reminder app with location-based and date/time alerts. No sign-up required. Just create and let it assist you when you need it.",
                status: "Live",
                url: "https://apps.apple.com/us/app/remind-me-reminders/id1617564386",
              },
              {
                name: "Team Up - Teams",
                icon: "/logos/teamup.png",
                desc: "Stop wasting time picking teams. Type player names, choose the number of teams, and Team Up divides everyone evenly. No arguing over who's captain.",
                status: "Live",
                url: "https://apps.apple.com/us/app/team-up-teams/id1618447199",
              },
            ].map((app, i) => (
              <FadeIn key={app.name} delay={i * 100}>
                <Link
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-dark block p-6 group"
                >
                  <div className="flex items-start gap-4 mb-3">
                    <Image
                      src={app.icon}
                      alt={`${app.name} icon`}
                      width={56}
                      height={56}
                      className="rounded-xl object-contain flex-shrink-0"
                    />
                    <div className="flex items-center justify-between flex-1 min-w-0">
                      <h3 className="text-white font-semibold group-hover:text-indigo-300 transition-colors">{app.name}</h3>
                      <span className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-400 flex-shrink-0">
                        <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                        {app.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-neutral-500 text-sm leading-relaxed">{app.desc}</p>
                  <span className="inline-flex items-center gap-1.5 mt-3 text-indigo-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    View on App Store
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={300}>
            <p className="mt-10 text-neutral-600 text-sm max-w-2xl">
              Looking for an app development company in Indiana? Whether it&apos;s a customer-facing mobile app, an internal business tool, or a personal project, I handle the full process from design to deployment on the App Store.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ========== macOS DESKTOP APPS ========== */}
      <section className="relative py-20 sm:py-24 bg-neutral-950 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
              <div>
                <p className="text-neutral-500 text-sm font-semibold tracking-widest uppercase mb-3">
                  Desktop Apps
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Macbook Apps
                </h2>
                <p className="text-neutral-500 text-base mt-2 max-w-lg">
                  Lightweight macOS utilities I designed and built. Free to download and use.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span className="text-neutral-400 text-xs font-medium">Direct Download</span>
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {
                name: "PinMemories",
                icon: "/logos/PinMemories.png",
                desc: "Pin personal photos directly onto your desktop wallpaper. Drag, rotate, resize, and keep multiple photos visible. Your memories persist across reboots.",
                url: "https://bryandevelops.com/PinMemories.dmg",
              },
              {
                name: "Captura",
                icon: "/logos/Captura.png",
                desc: "Lightweight menu bar utility that surfaces your 3 most recent screenshots instantly. Copy to clipboard or drag into any app — no Finder needed.",
                url: "https://bryandevelops.com/Captura.dmg",
              },
            ].map((app, i) => (
              <FadeIn key={app.name} delay={i * 100}>
                <a
                  href={app.url}
                  download
                  className="card-dark block p-6 group"
                >
                  <div className="flex items-start gap-4 mb-3">
                    <Image
                      src={app.icon}
                      alt={`${app.name} icon`}
                      width={56}
                      height={56}
                      className="rounded-xl object-contain flex-shrink-0"
                    />
                    <div className="flex items-center justify-between flex-1 min-w-0">
                      <h3 className="text-white font-semibold group-hover:text-indigo-300 transition-colors">{app.name}</h3>
                      <span className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-400 flex-shrink-0">
                        <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                        Free
                      </span>
                    </div>
                  </div>
                  <p className="text-neutral-500 text-sm leading-relaxed">{app.desc}</p>
                  <span className="inline-flex items-center gap-1.5 mt-3 text-indigo-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Download
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </span>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="relative py-24 sm:py-32 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-4">
                Serving Indiana &amp; Beyond
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                Ready to Automate Your Business?
              </h2>
              <p className="text-neutral-400 text-lg mb-8">
                Whether you&apos;re in Indiana or anywhere in the country. Let&apos;s talk about what&apos;s slowing you down and how custom software can fix it.
                Free consultation, no strings attached.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/contact"
                  className="header-cta is-large"
                >
                  Get a Free Quote
                </Link>
                <Link
                  href="/projects"
                  className="px-8 py-4 rounded-full border border-white/15 text-white font-semibold text-sm tracking-wide hover:bg-white/10 transition-all"
                >
                  See My Work
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-950 border-t border-white/10 py-12 text-center text-neutral-500">
        <p>&copy; 2026 Bryan Develops. All rights reserved.</p>
        <OperatorDisclosure />
      </footer>
    </main>
  );
}
