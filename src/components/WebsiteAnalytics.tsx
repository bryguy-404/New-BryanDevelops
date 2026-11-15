"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ConsentCelebration, ConsentPeek } from "@/components/ConsentMascot";
import {
  CONSENT_KEY, CONSENT_EVENT, SETTINGS_EVENT, MEASUREMENT_ID,
  clearAnalyticsCookies, consentTimeRemaining, eventForLink, isMeasurementId, isProductionLocation,
  isPublicPath, pauseAnalytics, readConsent, saveConsent, startAnalytics,
  trackEvent, trackPageView, type Consent,
} from "@/lib/analytics/website";

const subscribeReady = () => () => {};
const clientReady = () => true;
const serverReady = () => false;
const serverConsent = () => null;

function subscribeConsent(notify: () => void) {
  let timer: number;
  const scheduleExpiry = () => {
    window.clearTimeout(timer);
    const remaining = consentTimeRemaining();
    // Browser timers have a signed 32-bit limit. Recheck long-lived choices daily.
    if (remaining !== null) timer = window.setTimeout(sync, Math.min(remaining + 1, 86_400_000));
  };
  const sync = () => {
    if (readConsent() !== "granted") {
      pauseAnalytics();
      clearAnalyticsCookies();
      // Stop an already loaded tag when consent expires or another tab revokes it.
      if (document.getElementById("bryan-google-analytics")) window.location.reload();
    }
    notify();
    scheduleExpiry();
  };
  const localChange = () => { notify(); scheduleExpiry(); };
  const storage = (event: StorageEvent) => {
    if (event.key === CONSENT_KEY || event.key === null) sync();
  };
  window.addEventListener("storage", storage);
  window.addEventListener(CONSENT_EVENT, localChange);
  window.addEventListener("focus", sync);
  document.addEventListener("visibilitychange", sync);
  scheduleExpiry();
  return () => {
    window.removeEventListener("storage", storage);
    window.removeEventListener(CONSENT_EVENT, localChange);
    window.removeEventListener("focus", sync);
    document.removeEventListener("visibilitychange", sync);
    window.clearTimeout(timer);
  };
}

export default function WebsiteAnalytics() {
  const pathname = usePathname();
  const ready = useSyncExternalStore(subscribeReady, clientReady, serverReady);
  const consent = useSyncExternalStore(subscribeConsent, readConsent, serverConsent);
  const [showChoices, setShowChoices] = useState(false);
  const [storageError, setStorageError] = useState(false);
  // While the thank-you animation plays: the card height to hold, so its top edge stays put.
  const [celebration, setCelebration] = useState<number | null>(null);
  const panel = useRef<HTMLElement>(null);
  const settingsTrigger = useRef<HTMLElement | null>(null);
  const configured = isMeasurementId(MEASUREMENT_ID);
  const eligible = ready && configured && isProductionLocation(window.location.hostname, pathname);
  // Local development shows the same UI, but never loads or sends Google Analytics.
  const preview = ready && process.env.NODE_ENV === "development" &&
    ["localhost", "127.0.0.1"].includes(window.location.hostname) && isPublicPath(pathname);

  useEffect(() => {
    const open = () => {
      settingsTrigger.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setShowChoices(true);
      requestAnimationFrame(() => panel.current?.focus());
    };
    window.addEventListener(SETTINGS_EVENT, open);
    return () => window.removeEventListener(SETTINGS_EVENT, open);
  }, []);

  useEffect(() => {
    if (!eligible || consent !== "granted") { pauseAnalytics(); return; }
    if (startAnalytics(MEASUREMENT_ID)) {
      trackPageView();
      if (!document.getElementById("bryan-google-analytics")) {
        const script = document.createElement("script");
        script.id = "bryan-google-analytics";
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
        document.head.appendChild(script);
      }
    }
  }, [eligible, consent, pathname]);

  useEffect(() => {
    if (!eligible || consent !== "granted") return;
    const click = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const control = event.target.closest("a, button");
      if (control?.matches(".sa-widget-btn") && !document.querySelector(".sa-widget-panel.sa-visible")) {
        trackEvent("chat_open");
      }
      if (control instanceof HTMLAnchorElement) {
        const key = eventForLink(control.getAttribute("href") || "", window.location.origin);
        if (key) trackEvent(key);
      }
    };
    document.addEventListener("click", click, true);
    return () => document.removeEventListener("click", click, true);
  }, [eligible, consent]);

  function choose(choice: Consent) {
    saveConsent(choice);
    if (readConsent() === null) { setStorageError(true); return; }
    setStorageError(false);
    // Consent is already saved; the card only stays up for the thank-you animation.
    if (choice === "granted" && panel.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCelebration(panel.current.offsetHeight);
      panel.current.focus();
      return;
    }
    setShowChoices(false);
    settingsTrigger.current?.focus();
  }

  const endCelebration = useCallback(() => {
    // Hand focus back only if the visitor hasn't moved on to something else.
    const restore = panel.current?.contains(document.activeElement);
    setCelebration(null);
    setShowChoices(false);
    if (restore) settingsTrigger.current?.focus();
  }, []);

  const celebrating = celebration !== null;
  if ((!eligible && !preview) || (consent !== null && !showChoices && !celebrating)) return null;
  return (
    <>
      <div className="fixed bottom-24 left-4 right-4 z-[90] sm:bottom-5 sm:right-auto sm:max-w-md">
        {celebrating ? null : <ConsentPeek />}
        <section id="analytics-preferences" ref={panel} tabIndex={-1} aria-labelledby="analytics-heading"
          style={celebrating ? { minHeight: celebration } : undefined}
          className="relative flex max-h-[70dvh] flex-col justify-center overflow-y-auto rounded-2xl border border-white/15 bg-neutral-900 p-5 text-white shadow-2xl focus-visible:outline-2 focus-visible:outline-indigo-400">
          {celebrating ? (
            <div role="status">
              <h2 id="analytics-heading" className="text-base font-semibold">Thanks! Enjoy the show.</h2>
              <p className="mt-2 text-sm leading-6 text-neutral-300">
                Analytics is on. You can change this anytime under “Analytics preferences” in the footer.
              </p>
            </div>
          ) : (
            <>
              <h2 id="analytics-heading" className="text-base font-semibold">Help improve Bryan Develops</h2>
              <p className="mt-2 text-sm leading-6 text-neutral-300">
                Want to see the pixel dev peeking over this card do a trick?
                Allow Google Analytics cookies and he’ll put on a quick show.{" "}
                <Link href="/privacy#website-analytics" className="underline underline-offset-2 hover:text-white">Privacy details</Link>
              </p>
              {storageError ? <p role="status" className="mt-2 text-sm text-amber-200">Your browser couldn’t save this choice. Analytics remains off.</p> : null}
              <div className="mt-4 flex flex-wrap gap-3">
                <button type="button" onClick={() => choose("granted")} className="min-h-11 rounded-xl border border-white/30 px-4 py-2 text-sm font-medium hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400">Allow analytics</button>
                <button type="button" onClick={() => choose("denied")} className="min-h-11 rounded-xl border border-white/30 px-4 py-2 text-sm font-medium hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400">No thanks</button>
                {showChoices && consent !== null ? <button type="button" onClick={() => { setShowChoices(false); settingsTrigger.current?.focus(); }} className="min-h-11 px-2 text-sm underline focus-visible:outline-2 focus-visible:outline-indigo-400">Close</button> : null}
              </div>
            </>
          )}
        </section>
      </div>
      {celebrating ? <ConsentCelebration anchor={panel} onDone={endCelebration} /> : null}
    </>
  );
}

export function AnalyticsSettingsButton({ className }: { className?: string }) {
  const ready = useSyncExternalStore(subscribeReady, clientReady, serverReady);
  if (!ready || (!isProductionLocation(window.location.hostname, window.location.pathname) &&
    !(process.env.NODE_ENV === "development" && ["localhost", "127.0.0.1"].includes(window.location.hostname))) ||
    !isMeasurementId(MEASUREMENT_ID)) return null;
  return <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(SETTINGS_EVENT))}>Analytics preferences</button>;
}
