"use client";

import { useRef, useEffect, type ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function FadeIn({ children, delay = 0, className = "" }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window) || typeof el.animate !== "function") return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animation: Animation | undefined;
    let observer: IntersectionObserver | undefined;
    const show = () => {
      animation?.cancel();
      observer?.disconnect();
    };
    const containsAnchor = () => {
      try {
        const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
        return target !== null && (el.contains(target) || target.contains(el));
      } catch {
        return false;
      }
    };
    const onHashChange = () => { if (containsAnchor()) show(); };
    const onMotionChange = () => { if (motion.matches) show(); };

    // Never hide server HTML or wait for JS to make content readable. Keep the
    // initial viewport visible, and animate below-fold groups only on arrival.
    if (motion.matches || containsAnchor() || el.contains(document.activeElement) ||
      el.getBoundingClientRect().top < window.innerHeight) return;

    try {
      observer = new IntersectionObserver(([entry]) => {
        if (!entry?.isIntersecting) return;
        observer?.disconnect();
        if (motion.matches || containsAnchor() || el.contains(document.activeElement)) return;
        try {
          animation = el.animate(
            [{ opacity: 0, translate: "0 24px" }, { opacity: 1, translate: "0 0" }],
            { duration: 700, delay, easing: "ease-out", fill: "backwards" }
          );
        } catch {
          // Enhancement failure leaves the default, visible presentation intact.
        }
      }, { threshold: 0 });
      observer.observe(el);
    } catch {
      show();
    }

    el.addEventListener("focusin", show);
    window.addEventListener("hashchange", onHashChange);
    motion.addEventListener("change", onMotionChange);
    return () => {
      show();
      el.removeEventListener("focusin", show);
      window.removeEventListener("hashchange", onHashChange);
      motion.removeEventListener("change", onMotionChange);
    };
  }, [delay]);

  return <div ref={ref} className={`fade-in ${className}`}>{children}</div>;
}
