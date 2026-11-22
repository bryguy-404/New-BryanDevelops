"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

type TurnstileApi = {
  render: (container: HTMLElement, options: {
    sitekey: string;
    action: string;
    theme: "dark";
    appearance: "interaction-only";
    size: "flexible" | "compact";
    callback: (token: string) => void;
    "before-interactive-callback": () => void;
    "expired-callback": () => void;
    "error-callback": () => boolean;
    "timeout-callback": () => void;
  }) => string;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export default function ContactTurnstile({ onToken }: { onToken: (token: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<string | undefined>(undefined);
  const sizeRef = useRef<"flexible" | "compact" | undefined>(undefined);
  const [status, setStatus] = useState<"loading" | "interactive" | "verified" | "error">("loading");

  const handleError = useCallback(() => {
    onToken("");
    setStatus("error");
    return true;
  }, [onToken]);

  const renderWidget = useCallback(() => {
    if (!siteKey || !window.turnstile || !containerRef.current) return;
    const size = containerRef.current.clientWidth < 300 ? "compact" : "flexible";
    if (widgetRef.current !== undefined) {
      if (sizeRef.current === size) return;
      window.turnstile.remove(widgetRef.current);
      widgetRef.current = undefined;
      onToken("");
      setStatus("loading");
    }
    sizeRef.current = size;

    widgetRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      action: "contact",
      theme: "dark",
      appearance: "interaction-only",
      size,
      "before-interactive-callback": () => setStatus("interactive"),
      callback: (token) => {
        onToken(token);
        setStatus("verified");
      },
      "expired-callback": () => {
        onToken("");
        setStatus("loading");
      },
      "error-callback": handleError,
      "timeout-callback": () => {
        onToken("");
        setStatus("loading");
      },
    });
  }, [handleError, onToken]);

  useEffect(() => {
    const observer = new ResizeObserver(renderWidget);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
      if (widgetRef.current !== undefined) {
        window.turnstile?.remove(widgetRef.current);
        widgetRef.current = undefined;
      }
    };
  }, [renderWidget]);

  return (
    <div className={`min-w-0 rounded-xl border px-3 py-3 transition-colors sm:px-4 ${status === "verified" ? "border-emerald-400/15 bg-emerald-400/[0.035]" : "border-white/10 bg-white/[0.025]"}`}>
      {siteKey && (
        <Script
          id="contact-turnstile-script"
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onReady={renderWidget}
          onError={handleError}
        />
      )}
      <div className="flex items-center gap-3">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={`h-5 w-5 shrink-0 ${status === "verified" ? "text-emerald-400" : "text-neutral-500"}`}>
          <path d="M12 3 4.5 6v5c0 4.8 3.2 8.1 7.5 10 4.3-1.9 7.5-5.2 7.5-10V6L12 3Z" />
          {status === "verified" && <path d="m8.5 12 2.3 2.3 4.7-4.7" />}
        </svg>
        <div className="min-w-0 flex-1">
          <p role="status" aria-live="polite" className={`text-sm font-medium ${status === "verified" ? "text-emerald-200" : "text-neutral-300"}`}>
            {!siteKey || status === "error" ? "Check unavailable" : status === "verified" ? "Security verified" : status === "interactive" ? "One quick check" : "Checking security…"}
          </p>
          <a href="https://www.cloudflare.com/turnstile-privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-500 underline-offset-4 hover:text-neutral-300 hover:underline focus-visible:underline">Cloudflare Turnstile</a>
        </div>
        {siteKey && status === "loading" && <span aria-hidden="true" className="h-3.5 w-3.5 shrink-0 animate-spin rounded-full border-2 border-white/10 border-t-indigo-400 motion-reduce:animate-none" />}
      </div>
      <div ref={containerRef} className={`flex justify-center ${status === "interactive" ? "mt-3" : ""}`} />
      {(!siteKey || status === "error") && (
        <p className="mt-3 text-sm leading-relaxed text-neutral-400">Please reload this page or <a href="mailto:bryan@bryandevelops.com" className="text-indigo-300 underline underline-offset-4">email me directly</a>.</p>
      )}
    </div>
  );
}
