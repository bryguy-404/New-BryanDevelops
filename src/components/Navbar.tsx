"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, Blocks, MonitorSmartphone } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "My Work", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const serviceLinks = [
  { label: "Custom Software", href: "/services/software", desc: "Automation, AI & business tools", icon: Blocks },
  { label: "Web Development", href: "/services/web-development", desc: "Affordable websites on any platform", icon: MonitorSmartphone },
];

const desktopLinkClass = (active: boolean) =>
  `relative z-10 flex h-9 items-center gap-1.5 rounded-full px-3.5 text-sm transition-colors duration-200 ${
    active ? "text-white font-semibold" : "text-neutral-400 font-medium hover:text-white"
  }`;

// The mark is inline so its two letters can react to hover.
function LogoMark() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="50 55 1152 1152" aria-hidden="true">
      <path
        className="logo-d"
        fill="#FFFFFF"
        fillRule="evenodd"
        d="M885 570V478C885 413 935 362 1000 362S1113 413 1113 478V855C1113 1021 969 1155 782 1155C600 1155 458 1036 458 869C458 700 624 562 805 562C834 562 862 565 885 570ZM909 837C909 904 855 958 789 958S669 904 669 837S723 715 790 715S909 770 909 837Z"
      />
      <path
        className="logo-b"
        fill="#5000FF"
        fillRule="evenodd"
        d="M138 233C138 163 187 109 255 109C321 109 369 162 369 227V296C390 292 409 289 427 289C581 289 706 412 706 567C706 735 562 869 395 869C250 869 138 767 138 624ZM521 573C521 637 471 688 410 688S300 637 300 573S349 457 411 457S521 509 521 573Z"
      />
    </svg>
  );
}

export default function Navbar({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  // Hover highlight that glides between the desktop nav links.
  const [glider, setGlider] = useState({ left: 0, width: 0, visible: false, slide: false });

  const showGlider = (event: React.SyntheticEvent<HTMLElement>) => {
    const links = linksRef.current;
    if (!links) return;
    const bounds = links.getBoundingClientRect();
    const target = event.currentTarget.getBoundingClientRect();
    setGlider((current) => ({
      left: target.left - bounds.left,
      width: target.width,
      visible: true,
      slide: current.visible,
    }));
  };

  const hideGlider = () => setGlider((current) => ({ ...current, visible: false }));

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const updateHeader = () => {
      frame = 0;
      const offset = Math.max(0, window.scrollY);
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      const t = reducedMotion.matches ? Number(offset >= 100) : Math.min(offset / 160, 1);
      const amount = t * t * (3 - 2 * t);
      header.style.setProperty("--header-t", String(amount));
      header.style.setProperty("--reading-progress", String(distance > 0 ? Math.min(offset / distance, 1) : 0));
    };

    function scheduleUpdate() {
      if (!frame) frame = window.requestAnimationFrame(updateHeader);
    }

    const observer = new ResizeObserver(scheduleUpdate);
    observer.observe(document.body);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    reducedMotion.addEventListener("change", scheduleUpdate);
    updateHeader();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      reducedMotion.removeEventListener("change", scheduleUpdate);
      window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDrawerOpen(false);
    };
    if (drawerOpen) window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [drawerOpen]);

  useEffect(() => {
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const isServicesActive = pathname.startsWith("/services");

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setServicesOpen(false), 150);
  };

  return (
    <>
      <nav
        ref={headerRef}
        aria-label="Main"
        className="site-header pointer-events-none fixed inset-x-0 z-50"
      >
        {/* The bar itself. It tightens into a floating capsule as the page scrolls. */}
        <div className="site-header-plate" aria-hidden="true">
          <span className="site-header-progress" />
        </div>

        <div className="site-header-inner pointer-events-none relative mx-auto flex h-full max-w-7xl items-center">
          <Link
            href="/"
            aria-label="Bryan Develops"
            className="site-header-logo pointer-events-auto shrink-0 lg:-ml-2.5"
          >
            <LogoMark />
          </Link>

          {/* Desktop nav links, grouped beside the logo */}
          <div
            ref={linksRef}
            className="pointer-events-auto relative ml-5 hidden h-full items-center md:flex lg:ml-8"
            onMouseLeave={hideGlider}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) hideGlider();
            }}
          >
            <span
              aria-hidden="true"
              className="nav-glider"
              style={{
                width: glider.width,
                opacity: glider.visible ? 1 : 0,
                transform: `translateX(${glider.left}px)`,
                transitionProperty: glider.slide ? "transform, width, opacity" : "opacity",
              }}
            />

            <Link
              href="/"
              onMouseEnter={showGlider}
              onFocus={showGlider}
              className={desktopLinkClass(isActive("/"))}
            >
              {isActive("/") && <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />}
              Home
            </Link>

            {/* Services Dropdown */}
            <div
              ref={dropdownRef}
              className="relative flex h-full items-center"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) setServicesOpen(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape") setServicesOpen(false);
              }}
            >
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={servicesOpen}
                onClick={(e) => setServicesOpen((open) => (e.detail === 0 ? !open : true))}
                onMouseEnter={showGlider}
                onFocus={showGlider}
                className={desktopLinkClass(isServicesActive)}
              >
                {isServicesActive && <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />}
                Services
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                className={`absolute left-0 top-full -ml-3 origin-top-left pt-2.5 transition-all duration-200 ease-out ${
                  servicesOpen
                    ? "visible opacity-100 translate-y-0 scale-100 pointer-events-auto"
                    : "invisible opacity-0 -translate-y-1.5 scale-[0.98] pointer-events-none"
                }`}
              >
                <div className="w-80 overflow-hidden rounded-2xl border border-white/[0.14] bg-[#101017]/95 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                  <div className="p-2">
                    {serviceLinks.map((svc) => (
                      <Link
                        key={svc.href}
                        href={svc.href}
                        className={`group/svc flex items-center gap-3 rounded-xl px-3 py-3 transition-colors ${
                          isActive(svc.href)
                            ? "bg-indigo-500/10 text-white"
                            : "text-neutral-300 hover:bg-white/[0.06] hover:text-white"
                        }`}
                      >
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[#a594ff] transition-colors group-hover/svc:border-[#8b76ff]/40 group-hover/svc:bg-[#5000ff]/25 group-hover/svc:text-white">
                          <svc.icon className="size-[18px]" aria-hidden="true" />
                        </span>
                        <span className="flex min-w-0 flex-col gap-0.5">
                          <span className="text-sm font-medium">{svc.label}</span>
                          <span className="text-[11px] text-neutral-500">{svc.desc}</span>
                        </span>
                        <ArrowRight
                          className="ml-auto size-4 shrink-0 -translate-x-1 text-neutral-500 opacity-0 transition-all duration-200 group-hover/svc:translate-x-0 group-hover/svc:opacity-100"
                          aria-hidden="true"
                        />
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-white/[0.06] p-2">
                    <Link
                      href="/services"
                      className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-colors text-xs font-medium"
                    >
                      View all services
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Other nav links */}
            {navLinks.filter(l => l.label !== "Home" && l.label !== "Contact").map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={showGlider}
                  onFocus={showGlider}
                  className={desktopLinkClass(active)}
                >
                  {active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop actions */}
          <div className="pointer-events-auto ml-auto hidden items-center gap-3 md:flex lg:gap-4">
            <Link href="/contact" className="header-cta group">
              <span>Get Started</span>
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>

            <button
              onClick={() => setDrawerOpen(true)}
              className="group flex flex-col items-end justify-center w-9 h-9 px-2 gap-1.5 rounded-lg transition-colors hover:bg-white/10"
              aria-label="Open info panel"
            >
              <span className="block w-5 h-[2px] rounded-full bg-white" />
              <span className="block w-5 h-[2px] rounded-full bg-white" />
              <span className="block w-3 h-[2px] rounded-full bg-white transition-all duration-200 group-hover:w-5" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="pointer-events-auto ml-auto md:hidden flex flex-col items-end justify-center w-9 h-9 px-2 gap-1.5 rounded-lg transition-colors hover:bg-white/10"
            aria-label="Open menu"
          >
            <span className="block w-5 h-[2px] rounded-full bg-white" />
            <span className="block w-5 h-[2px] rounded-full bg-white" />
            <span className="block w-3 h-[2px] rounded-full bg-white" />
          </button>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Side menu: a floating card, detached from the screen edge like the scrolled header */}
      <aside
        className={`fixed inset-y-3 right-3 z-[70] w-[85vw] max-w-sm rounded-[28px] bg-white ring-1 ring-black/5 shadow-[0_24px_70px_-12px_rgba(0,0,0,0.55)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col overflow-y-auto ${
          drawerOpen
            ? "visible translate-x-0 opacity-100"
            : "invisible translate-x-[calc(100%+1.5rem)] opacity-0"
        }`}
      >
        {/* Close button */}
        <div className="flex items-center justify-end p-5">
          <button
            onClick={() => setDrawerOpen(false)}
            className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center hover:bg-neutral-800 transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Logo + Description */}
        <div className="px-7 mb-6">
          <div className="flex items-center mb-4">
            <Image
              src="/bryan-develops-light.svg"
              alt="Bryan Develops"
              width={80}
              height={80}
              className="size-20 p-2 object-contain"
            />
          </div>
          <p className="text-neutral-500 text-sm leading-relaxed">
            Custom websites and software for businesses in South Bend and across the country. I build practical tools, clear interfaces, and websites you can manage with confidence.
          </p>
        </div>

        {/* Nav Links — mobile only */}
        <nav className="px-7 mb-6 flex flex-col gap-1 md:hidden">
          {/* Home */}
          <Link
            href="/"
            onClick={() => setDrawerOpen(false)}
            className={`flex items-center gap-2.5 px-3 py-3 rounded-xl text-base font-medium transition-colors ${
              isActive("/")
                ? "bg-indigo-50 text-indigo-600"
                : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
            }`}
          >
            {isActive("/") && <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />}
            Home
          </Link>

          {/* Services — expandable */}
          <div>
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className={`flex items-center justify-between w-full px-3 py-3 rounded-xl text-base font-medium transition-colors ${
                isServicesActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
              }`}
            >
              <span className="flex items-center gap-2.5">
                {isServicesActive && <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />}
                Services
              </span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                mobileServicesOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="pl-6 py-1 flex flex-col gap-0.5">
                {serviceLinks.map((svc) => (
                  <Link
                    key={svc.href}
                    href={svc.href}
                    onClick={() => setDrawerOpen(false)}
                    className={`flex flex-col px-3 py-2.5 rounded-lg transition-colors ${
                      isActive(svc.href)
                        ? "bg-indigo-50/60 text-indigo-600"
                        : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
                    }`}
                  >
                    <span className="text-sm font-medium">{svc.label}</span>
                    <span className="text-[11px] text-neutral-400">{svc.desc}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Other links */}
          {navLinks.filter(l => l.label !== "Home" && l.label !== "Contact").map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setDrawerOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-3 rounded-xl text-base font-medium transition-colors ${
                  active
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                }`}
              >
                {active && <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />}
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Divider — mobile only */}
        <div className="mx-7 border-t border-neutral-100 md:hidden" />

        {/* Contact Info */}
        <div className="px-7 pt-6 flex flex-col gap-4">
          <h4 className="text-neutral-900 font-semibold text-sm tracking-wide">Contact</h4>

          <a href="tel:+15743236945" className="flex items-center gap-3 text-neutral-600 text-sm hover:text-neutral-900 transition-colors">
            <svg className="w-4 h-4 text-indigo-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            (574) 323-6945
          </a>

          <a href="mailto:bryan@bryandevelops.com" className="flex items-center gap-3 text-neutral-600 text-sm hover:text-neutral-900 transition-colors">
            <svg className="w-4 h-4 text-indigo-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            bryan@bryandevelops.com
          </a>

          <div className="flex items-center gap-3 text-neutral-600 text-sm">
            <svg className="w-4 h-4 text-indigo-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            South Bend, Indiana
          </div>
        </div>

        {/* Services summary — desktop only */}
        <div className="hidden md:block px-7 pt-6">
          <div className="border-t border-neutral-100 pt-6">
            <h4 className="text-neutral-900 font-semibold text-sm tracking-wide mb-3">Services</h4>
            <div className="-mx-3 flex flex-col">
              {serviceLinks.map((svc) => (
                <Link
                  key={svc.href}
                  href={svc.href}
                  onClick={() => setDrawerOpen(false)}
                  className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-neutral-50"
                >
                  <span className="icon-tile">
                    <svc.icon aria-hidden="true" />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="text-sm font-medium text-neutral-900">{svc.label}</span>
                    <span className="text-xs text-neutral-500">{svc.desc}</span>
                  </span>
                  <ArrowRight
                    className="ml-auto size-4 shrink-0 text-neutral-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[#5000ff]"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
            <p className="mt-3 text-xs text-neutral-500">Also app development, AI tools, and branding.</p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-auto p-7">
          <Link
            href="/contact"
            onClick={() => setDrawerOpen(false)}
            className="flex items-center justify-center w-full px-6 py-3.5 rounded-full bg-neutral-900 text-white font-semibold text-sm hover:bg-neutral-800 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </aside>
    </>
  );
}
