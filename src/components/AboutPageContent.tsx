"use client";

import OperatorDisclosure from "@/components/OperatorDisclosure";
import Image from "next/image";
import Link from "next/link";
import FloatingDots from "./CursorDots";
import FadeIn from "./FadeIn";
import { MapPin } from "lucide-react";

const workValues = [
  {
    title: "Vision First",
    desc: "Every project starts with understanding your business, your goals, and what success looks like for you. No cookie-cutter solutions.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    title: "No Surprises",
    desc: "Flat-rate pricing, clear scope, and a timeline you can count on. You know exactly what you are paying from day one.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Your Input Drives It",
    desc: "Your feedback shapes every step. I send updates, incorporate your ideas, and make sure every detail fits your brand perfectly.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    title: "Budget-Friendly",
    desc: "Great websites and software do not have to break the bank. I work with businesses of all sizes and find solutions that balance quality and affordability.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Support After Launch",
    desc: "I do not disappear after your site goes live. I stick around for updates, troubleshooting, and I teach you how to manage things yourself.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
];

const nerds = [
  "Databases",
  "iOS App Dev",
  "React & Next.js",
  "TypeScript",
  "Swift",
  "Node.js",
  "MongoDB",
  "APIs",
  "AI Tools",
  "Tailwind CSS",
  "Automation",
  "UI/UX Design",
];

// Two per line, so the list reads like a short array in an editor.
const nerdRows = nerds.reduce<string[][]>((rows, item, i) => {
  if (i % 2 === 0) rows.push([item]);
  else rows[rows.length - 1].push(item);
  return rows;
}, []);

export default function AboutPageContent() {
  return (
    <main className="relative overflow-hidden">
      <FloatingDots variant="light" />

      {/* ========== HERO ========== */}
      <section className="relative py-32 sm:py-40 overflow-hidden">
        <div className="absolute top-20 right-0 w-[30rem] h-[30rem] bg-indigo-200/40 rounded-full filter blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[25rem] h-[25rem] bg-purple-200/30 rounded-full filter blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn>
              <div>
                <p className="flex items-center gap-2 text-indigo-600 text-sm font-semibold tracking-widest uppercase mb-5">
                  <MapPin className="size-4" aria-hidden="true" />
                  South Bend, Indiana
                </p>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 tracking-tight leading-[1.1] mb-6">
                  Hey, I&apos;m{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                    Bryan.
                  </span>
                </h1>
                <p className="text-neutral-500 text-lg sm:text-xl max-w-lg leading-relaxed mb-6">
                  I build websites and custom software that help
                  businesses serve customers and simplify their work. Based in South Bend, working with clients locally
                  and across the country.
                </p>
                <p className="text-neutral-400 text-base leading-relaxed">
                  When I am not coding, you will probably find me hanging out with my wife
                  and our four-legged interns, nerding out over databases, or figuring out
                  how to automate something that does not need to be automated.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.1)] border border-neutral-200/60">
                  <Image
                    src="/about-img.png"
                    alt="Bryan Arambula with his wife and dogs on a bridge in South Bend, Indiana"
                    width={700}
                    height={400}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 px-5 py-3 rounded-2xl bg-white border border-neutral-200/80 shadow-lg">
                  <p className="text-neutral-900 font-bold text-sm">The whole team</p>
                  <p className="text-neutral-400 text-xs">Me, my wife, and the interns</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ========== THE STORY ========== */}
      <section className="relative py-24 sm:py-32 border-t border-neutral-200/60">
        <div className="absolute top-1/2 left-0 w-[25rem] h-[25rem] bg-blue-100/30 rounded-full filter blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <FadeIn>
              <div>
                <p className="text-indigo-600 text-sm font-semibold tracking-widest uppercase mb-3">
                  The Story
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight mb-6">
                  Why I Do This
                </h2>
                <div className="space-y-4 text-neutral-500 text-base leading-relaxed">
                  <p>
                    I got into web development because I genuinely enjoy building things.
                    There is something about taking an idea, whether it is a small business
                    website or a full custom software platform, and turning it into something
                    real that people actually use every day.
                  </p>
                  <p>
                    I have worked with local businesses right here in South Bend, marketing
                    agencies, and clients across the country. Every project is different,
                    and that is what keeps it interesting. One week I am designing a sleek
                    site for a car wash, the next I am building an SEO tool from scratch.
                  </p>
                  <p>
                    I am not a big agency. I am one person who genuinely cares about your
                    project. When you work with me, you get my full attention, not a
                    rotating team of people who have never heard your name. I pick up the
                    phone. I answer the emails. And I do not stop until it is right.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="relative rounded-[1.25rem] bg-white border border-neutral-200 p-8">
                <h3 className="text-neutral-900 text-lg font-bold mb-6">
                  A Few Things About Me
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="icon-tile">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-neutral-900 font-semibold text-sm">Based in South Bend, IN</p>
                      <p className="text-neutral-400 text-sm">Serving Michiana and clients nationwide</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="icon-tile">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-neutral-900 font-semibold text-sm">Websites &amp; Custom Software</p>
                      <p className="text-neutral-400 text-sm">If it lives on the internet, I can probably build it</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="icon-tile">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-neutral-900 font-semibold text-sm">One-Person Operation</p>
                      <p className="text-neutral-400 text-sm">You work directly with me, start to finish</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="icon-tile">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-neutral-900 font-semibold text-sm">The Team Behind Me</p>
                      <p className="text-neutral-400 text-sm">My wife keeps me grounded. The dogs keep me company during late night deploys.</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ========== WHAT IT'S LIKE TO WORK WITH ME ========== */}
      <section className="relative py-24 sm:py-32 border-t border-neutral-200/60">
        <div className="absolute top-0 right-1/4 w-[28rem] h-[28rem] bg-indigo-100/30 rounded-full filter blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="mb-16">
              <p className="text-indigo-600 text-sm font-semibold tracking-widest uppercase mb-3">
                How I Work
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight mb-4">
                What It&apos;s Like to Work With Me
              </h2>
              <p className="text-neutral-500 text-lg max-w-2xl">
                Choosing the right developer is a big decision. Here is what you
                can expect when we work together.
              </p>
            </div>
          </FadeIn>

          {/* Two wide cards over three, the same arrangement as the home page services */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
            {workValues.map((val, i) => (
              <FadeIn
                key={val.title}
                delay={(i < 2 ? i : i - 2) * 100}
                className={i < 2 ? "lg:col-span-3" : i === 4 ? "sm:col-span-2 lg:col-span-2" : "lg:col-span-2"}
              >
                <div className="card-light p-7 h-full">
                  <div className="icon-tile mb-5">
                    {val.icon}
                  </div>
                  <h3 className="text-neutral-900 text-lg font-bold mb-2">{val.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{val.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ========== BEYOND THE CODE ========== */}
      <section className="relative py-24 sm:py-32 border-t border-neutral-200/60">
        <div className="absolute bottom-0 left-1/3 w-[25rem] h-[25rem] bg-purple-100/30 rounded-full filter blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn>
              <div>
                <p className="text-indigo-600 text-sm font-semibold tracking-widest uppercase mb-3">
                  Beyond the Code
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight mb-6">
                  The Nerdy Side
                </h2>
                <div className="space-y-4 text-neutral-500 text-base leading-relaxed">
                  <p>
                    Outside of client work, I am constantly tinkering. I have built iOS apps
                    for fun, created SimplSEO (my own SEO software), and I am always exploring
                    new technologies, from AI integrations to database design to automation tools.
                  </p>
                  <p>
                    I genuinely enjoy the craft. Whether it is learning a new framework,
                    optimizing a database query, or figuring out how to make a website load
                    half a second faster, this stuff never gets old to me.
                  </p>
                  <p>
                    If you are curious about the kind of things I build outside of client
                    projects, take a look at my portfolio.
                  </p>
                </div>
                <Link
                  href="https://bryanarambula.com"
                  className="inline-flex items-center gap-2 mt-6 text-indigo-600 font-semibold text-sm hover:text-indigo-700 transition-colors"
                >
                  View My Portfolio
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="card-dark overflow-hidden">
                <h3 className="sr-only">Things I Nerd Out About</h3>
                <div className="window-bar px-4 py-3">
                  <span className="window-dots" aria-hidden="true"><i /><i /><i /></span>
                  <span className="font-code text-xs">nerdy-side.ts</span>
                </div>
                <pre className="font-code overflow-x-auto p-5 sm:p-6 text-[13px] leading-7 text-neutral-300">
                  <code>
                    <span className="text-neutral-500">{"// Things I nerd out about"}</span>
                    {"\n"}
                    <span className="text-[#a594ff]">const</span> interests = [{"\n"}
                    {nerdRows.map((row) => (
                      <span key={row[0]}>
                        {"  "}
                        {row.map((item) => (
                          <span key={item}>
                            <span className="text-emerald-300">&quot;{item}&quot;</span>,{" "}
                          </span>
                        ))}
                        {"\n"}
                      </span>
                    ))}
                    ];
                  </code>
                </pre>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="relative py-24 sm:py-32">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[30rem] bg-indigo-100/30 rounded-full filter blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-indigo-600 text-sm font-semibold tracking-widest uppercase mb-4">
                Let&apos;s Work Together
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight mb-4">
                Ready to Build Something Great?
              </h2>
              <p className="text-neutral-500 text-lg mb-8">
                Whether you need a website, custom software, or help improving an existing application.
                I am here to help. Based in South Bend, serving Mishawaka, Elkhart,
                Fort Wayne, and clients nationwide. Free consultation, no strings attached.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/contact"
                  className="header-cta is-large"
                >
                  Let&apos;s Talk
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex h-[3.25rem] items-center px-7 rounded-full border border-neutral-300 text-neutral-700 font-semibold text-[0.9375rem] hover:bg-neutral-100 transition-colors"
                >
                  See My Work
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 py-12 text-center text-neutral-400">
        <p>&copy; 2026 Bryan Develops. All rights reserved.</p>
        <OperatorDisclosure variant="light" />
      </footer>
    </main>
  );
}
