"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import FloatingDots from "./CursorDots";
import FadeIn from "./FadeIn";
import { ArrowUpRight } from "lucide-react";

const cyclingWords = ["Software", "Web Design", "Development"];

const trustedBy = [
  "Ananta Breathwork",
  "Friendship Roofing",
  "Goldstar Roofing",
  "Eastland Family Dental",
  "Every1Camp",
  "Drive & Shine",
  "United Way",
  "Wyckoff Consulting",
  "Flores Landscaping",
  "Big Rapids Products",
  "Great Lakes Solar",
  "AVTech Specialists",
  "Rise'n Roll Bakery",
  "Middletown Family Dentistry",
  "EME Flooring",
  "Opulent Outdoors",
  "CPK Media Communications",
];

const featured = [
  {
    kind: "Featured Website",
    accent: "text-indigo-300",
    href: "#projects",
    external: false,
    address: "driveandshine.com",
    title: "Drive & Shine",
    tags: ["Web Design", "SEO"],
    desc: "Modern redesign with custom forms and full mobile optimization.",
    stats: [["3x", "Traffic"], ["Top 5", "Google"], ["2 Mo", "Delivered"]],
  },
  {
    kind: "Featured Software",
    accent: "text-orange-300",
    href: "https://simplassist.com",
    external: true,
    address: "simplassist.com",
    title: "SimplAssist",
    tags: ["Software", "AI"],
    desc: "Texts back missed calls, chats 24/7, and keeps every lead in one inbox.",
    stats: [["24/7", "Coverage"], ["1", "Inbox"], ["Live", "Now"]],
  },
];

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % cyclingWords.length);
        setIsAnimating(false);
      }, 400);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-grid-bg relative h-screen bg-black overflow-hidden flex flex-col pt-15">
      <FloatingDots />
      {/* Subtle gradient blobs */}
      <div className="absolute top-1/4 right-0 w-[30rem] h-[30rem] bg-indigo-600/15 rounded-full filter blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-[25rem] h-[25rem] bg-purple-600/10 rounded-full filter blur-[120px] pointer-events-none"></div>

      {/* Bryan photo — mobile: bottom-center, desktop: right side */}
      <div className="absolute bottom-0 pointer-events-none right-0 w-full h-[65%] sm:h-[60%] lg:right-[32%] lg:w-[65%] lg:h-full">
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/60 via-transparent to-transparent lg:from-black lg:via-black/40"></div>
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/50 to-transparent lg:hidden"></div>

        <Image
          src="/Bryan-Develops.png"
          alt="Bryan Arambula — Web Developer"
          fill
          className="object-contain object-bottom scale-[1.6] origin-bottom sm:scale-125 lg:scale-100 lg:object-right-bottom"
          priority
        />
      </div>

      {/* Main content area */}
      <div className="relative z-20 flex-1 flex flex-col min-h-0 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12 pt-16 sm:pt-20 lg:pt-20">
        {/* Desktop: two-column grid | Mobile: stacked with photo behind */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4 lg:gap-12 items-center">
          {/* Left — Headline + subtitle + CTAs */}
          <div className="flex flex-col gap-2 sm:gap-3 lg:gap-6 pt-2 sm:pt-4 lg:pt-0">
            <h1 className="text-[clamp(2.2rem,7vw,5rem)] font-bold leading-[1.1] tracking-tight">
              <span className="sr-only">
                Web Design &amp; Custom Software — South Bend, Indiana
              </span>
              <span aria-hidden="true">
                <span className="relative block h-[1.25em]">
                  <span
                    className={`block whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 transition-all duration-400 ${
                      isAnimating
                        ? "opacity-0 translate-y-3"
                        : "opacity-100 translate-y-0"
                    }`}
                  >
                    {cyclingWords[wordIndex]}
                  </span>
                </span>
                <span className="text-white/40 block">Solutions.</span>
              </span>
            </h1>

            <p className="text-sm lg:text-lg text-neutral-300 max-w-md leading-relaxed">
              Custom websites and software built for businesses in South Bend and across the country.{" "}
              <span className="text-white"> <br></br>
                Need affordable solutions? That&apos;s where I come in.
              </span>
            </p>

            <div className="flex flex-row flex-wrap items-start gap-2 sm:gap-3">
              <Link
                href="/projects"
                className="px-4 py-2 sm:px-5 sm:py-2 lg:px-7 lg:py-3 rounded-full bg-white text-black font-semibold text-sm tracking-wide hover:bg-neutral-200 transition-colors active:scale-[0.98]"
              >
                See My Work
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 sm:px-5 sm:py-2 lg:px-7 lg:py-3 rounded-full border border-white/20 text-white font-semibold text-sm tracking-wide hover:bg-white/10 backdrop-blur-md transition-all active:scale-[0.98]"
              >
                Contact Me
              </Link>
            </div>
          </div>

          {/* Right — Featured Website + Featured Software */}
          <div className="relative flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:gap-5 lg:gap-6 pb-2 sm:pb-4 lg:items-center lg:pb-0 lg:justify-end">
            {featured.map((item, i) => (
              <FadeIn key={item.title} delay={200 + i * 200}>
                <Link
                  href={item.href}
                  {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="card-dark is-glass group block w-64 sm:w-48 lg:w-64 min-w-0 overflow-hidden"
                >
                  {/* Window bar, so each card reads as the real site or app it points to */}
                  <div className="window-bar px-3 py-2 lg:px-4 lg:py-2.5">
                    <span className="window-dots" aria-hidden="true"><i /><i /><i /></span>
                    {/* Phones have less height, so the label moves up here in place of the address */}
                    <span className={`sm:hidden ${item.accent} text-[10px] font-semibold tracking-wider uppercase`}>{item.kind}</span>
                    <span className="hidden sm:inline font-code truncate text-[9px] lg:text-[11px]">{item.address}</span>
                    <ArrowUpRight
                      className="ml-auto size-3 lg:size-3.5 shrink-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="px-4 py-2.5 sm:p-3.5 lg:p-5">
                    <p className={`hidden sm:block ${item.accent} text-[9px] lg:text-[11px] font-semibold tracking-wider uppercase mb-1 lg:mb-1.5`}>
                      {item.kind}
                    </p>
                    <h3 className="text-white text-sm lg:text-lg font-bold mb-1 lg:mb-1.5">{item.title}</h3>
                    <p className="tag-line text-neutral-400 text-[10px] sm:text-[9px] lg:text-xs font-medium mb-2 sm:mb-1.5 lg:mb-2.5">
                      {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </p>
                    <p className="text-neutral-300 text-xs sm:text-[10px] lg:text-sm leading-relaxed mb-2 lg:mb-3">
                      {item.desc}
                    </p>
                    <div className="grid grid-cols-3 pt-2 lg:pt-3 border-t border-white/10">
                      {item.stats.map(([value, label]) => (
                        <div key={label}>
                          <p className="text-white text-sm sm:text-xs lg:text-base font-bold">{value}</p>
                          <p className="text-neutral-400 text-[9px] sm:text-[8px] lg:text-[11px]">{label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* Logo / Trust Marquee — pinned to the bottom */}
      <div className="relative z-20 border-t border-white/[0.06] shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-2.5 sm:py-3 lg:py-5">
          <p className="text-neutral-400 text-[9px] lg:text-[10px] font-semibold tracking-widest uppercase mb-1.5 lg:mb-3">
            Trusted by businesses across the country
          </p>
          <div className="overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

            <div className="marquee-track flex items-center gap-6 sm:gap-12 w-max">
              {[...trustedBy, ...trustedBy].map((name, i) => (
                <span
                  key={i}
                  className="text-neutral-400 text-[11px] sm:text-sm font-semibold tracking-wide whitespace-nowrap hover:text-neutral-200 transition-colors"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
