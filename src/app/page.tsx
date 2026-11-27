import type { CSSProperties } from "react";
import OperatorDisclosure from "@/components/OperatorDisclosure";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import Navbar from "@/components/Navbar";
import FadeIn from "@/components/FadeIn";
import FAQSection from "@/components/FAQSection";

const processSteps = [
  {
    title: "Strategy",
    desc: "I analyze your competition and target audience to uncover what works. Using insights to craft a custom strategy.",
  },
  {
    title: "Design",
    desc: "From color schemes to layouts, bringing your brand to life with a custom design unique to your business.",
  },
  {
    title: "Develop",
    desc: "Building your site on a dev server, giving you live access to see your vision come to life every step.",
  },
  {
    title: "Support",
    desc: "Launch with confidence. I'll be here to ensure your website stays fast, secure, and running smoothly.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 font-sans selection:bg-indigo-500/30">
      <Navbar variant="dark" />

      {/* 
        ========================================================
        HERO SECTION
        ========================================================
      */}
      <HeroSection />

      {/* 
        ========================================================
        SERVICES SECTION (Light Mode + Light Glassmorphism)
        ========================================================
      */}
      <section id="services" className="relative py-32 bg-[#f8f9fa] overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full filter blur-[100px] opacity-70"></div>
          <div className="absolute top-40 -left-40 w-96 h-96 bg-purple-100 rounded-full filter blur-[100px] opacity-70"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 tracking-tight">Everything you need to grow.</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Practical websites, custom software, and ongoing support to help your business run smoothly and serve customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
            <FadeIn delay={0} className="lg:col-span-3">
            <div className="card-light p-8 h-full">
              <div className="icon-tile mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Web Design</h3>
              <p className="text-neutral-600 leading-relaxed">
              Custom website design built to attract customers and convert visitors. Fast, mobile-friendly, and tailored to your brand, whether you're in South Bend or anywhere in the country.
              </p>
            </div>
            </FadeIn>

            <FadeIn delay={100} className="lg:col-span-3">
            <div className="card-light p-8 h-full">
              <div className="icon-tile mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">App & Software Development</h3>
              <p className="text-neutral-600 leading-relaxed">
              Need a custom web app, mobile app, or business tool to automate your workflows? I build software solutions that solve real problems. From booking systems and dashboards to full SaaS platforms.
              </p>
            </div>
            </FadeIn>

            <FadeIn delay={0} className="lg:col-span-2">
            <div className="card-light p-8 h-full">
              <div className="icon-tile mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Technical Support</h3>
              <p className="text-neutral-600 leading-relaxed">
              Something broken on your website? I offer fast troubleshooting, bug fixes, and website support so your site stays online and running smoothly.
              </p>
            </div>
            </FadeIn>

            <FadeIn delay={100} className="lg:col-span-2">
            <div className="card-light p-8 h-full">
              <div className="icon-tile mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">WP Maintenance</h3>
              <p className="text-neutral-600 leading-relaxed">
              Keep your WordPress site secure, fast, and up to date with a monthly maintenance plan. Includes plugin updates, backups, performance monitoring, and priority support.
              </p>
            </div>
            </FadeIn>

            <FadeIn delay={200} className="md:col-span-2 lg:col-span-2">
            <div className="card-light p-8 h-full">
              <div className="icon-tile mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Branding</h3>
              <p className="text-neutral-600 leading-relaxed">
              Build a brand people remember. I create logos, color palettes, and brand guidelines that give your business a professional, consistent look across every platform.
              </p>
            </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 
        ========================================================
        PROJECTS / MY WORK SECTION
        ========================================================
      */}
      <ProjectsSection />

      <FAQSection />

      {/* 
        ========================================================
        PROCESS SECTION (Dark Mode + Glassmorphism)
        ========================================================
      */}
      <section className="relative py-32 bg-neutral-950 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[40rem] bg-indigo-900/20 rounded-full mix-blend-screen filter blur-[120px]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">How we make it happen.</h2>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
              A streamlined, four-step process to take your website from an idea to a high-performing digital asset.
            </p>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12">
            {processSteps.map((step, i) => (
              <li
                key={step.title}
                className="process-step pt-8 pr-8"
                style={{ "--step": i } as CSSProperties}
              >
                <p className="font-code text-xs text-[#a594ff] mb-3">Step {i + 1}</p>
                <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <footer className="bg-neutral-950 border-t border-white/10 py-12 text-center text-neutral-500">
        <p>&copy; 2026 Bryan Develops. All rights reserved.</p>
        <OperatorDisclosure />
      </footer>
    </div>
  );
}
