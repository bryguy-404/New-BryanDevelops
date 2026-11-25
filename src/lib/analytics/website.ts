// Pin this site's stream so a stale environment variable cannot send data elsewhere.
export const MEASUREMENT_ID = "G-HYM1RKG6KM";
export const CONSENT_KEY = "bd-analytics-consent-v1";
export const SETTINGS_EVENT = "bd-analytics-settings";
export const CONSENT_EVENT = "bd-analytics-consent-change";
export const CONSENT_MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000;
export type Consent = "granted" | "denied";

const PAGE_TITLES: Record<string, string> = {
  "/": "Bryan Develops",
  "/about": "About | Bryan Develops",
  "/contact": "Contact | Bryan Develops",
  "/projects": "Projects | Bryan Develops",
  "/engineering": "Engineering | Bryan Develops",
  "/services": "Services | Bryan Develops",
  "/services/software": "Custom Software | Bryan Develops",
  "/services/web-development": "Web Development | Bryan Develops",
  "/privacy": "Privacy | Bryan Develops",
};

// Fixed form/product labels; click URLs and CTA labels are sanitized below.
export const EVENTS = {
  contact_page_click: ["contact_click", { method: "contact_page" }],
  phone_click: ["phone_click", {}],
  email_click: ["email_click", {}],
  cta_click: ["cta_click", {}],
  booking_click: ["booking_click", {}],
  simplassist_click: ["software_click", { product: "SimplAssist" }],
  simplseo_click: ["software_click", { product: "SimplSEO" }],
  captura_download: ["file_download", { file_name: "Captura.dmg", file_extension: "dmg" }],
  pinmemories_download: ["file_download", { file_name: "PinMemories.dmg", file_extension: "dmg" }],
  seo_opportunities: ["software_preview", { product: "SimplSEO", preview: "Opportunities" }],
  seo_mentor: ["software_preview", { product: "SimplSEO", preview: "AI mentor" }],
  seo_content: ["software_preview", { product: "SimplSEO", preview: "Content" }],
  assist_inbox: ["software_preview", { product: "SimplAssist", preview: "Inbox" }],
  assist_calendar: ["software_preview", { product: "SimplAssist", preview: "Calendar" }],
  chat_open: ["chat_open", {}],
  contact_form_start: ["contact_form_start", { form_name: "contact" }],
  contact_form_success: ["generate_lead", { form_name: "contact", method: "contact_form" }],
} as const;
export type WebsiteEvent = keyof typeof EVENTS;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let activeId: string | null = null;
let previousPage: string | null = null;
let paused = true;

export function isMeasurementId(value: string) { return /^G-[A-Z0-9]+$/.test(value); }
export function isPublicPath(pathname: string) { return Object.hasOwn(PAGE_TITLES, pathname); }
export function isProductionLocation(host: string, path: string) {
  return ["bryandevelops.com", "www.bryandevelops.com"].includes(host) && isPublicPath(path);
}
export function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const saved = JSON.parse(window.localStorage.getItem(CONSENT_KEY) || "null");
    if (!saved || !["granted", "denied"].includes(saved.choice) ||
      !Number.isFinite(saved.expires) || saved.expires <= Date.now() ||
      saved.expires > Date.now() + CONSENT_MAX_AGE_MS) return null;
    return saved.choice;
  } catch { return null; }
}
export function consentTimeRemaining(): number | null {
  if (readConsent() === null) return null;
  try {
    return Math.max(0, JSON.parse(window.localStorage.getItem(CONSENT_KEY)!).expires - Date.now());
  } catch { return null; }
}
function disable(disabled: boolean) {
  if (activeId) (window as unknown as Record<string, unknown>)[`ga-disable-${activeId}`] = disabled;
}
export function pauseAnalytics() {
  paused = true;
  disable(true);
  previousPage = null;
}
export function clearAnalyticsCookies() {
  for (const entry of document.cookie.split(";")) {
    const name = entry.trim().split("=")[0];
    if (name !== "_ga" && !name.startsWith("_ga_")) continue;
    for (const domain of ["", "; domain=" + window.location.hostname, "; domain=bryandevelops.com", "; domain=.bryandevelops.com"]) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain}; SameSite=Lax`;
    }
  }
}
export function saveConsent(choice: Consent) {
  if (choice === "denied") pauseAnalytics();
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify({ choice, expires: Date.now() + CONSENT_MAX_AGE_MS }));
  } catch {
    pauseAnalytics();
    try { window.localStorage.removeItem(CONSENT_KEY); } catch { /* Storage unavailable. */ }
  }
  if (readConsent() !== "granted") {
    pauseAnalytics();
    clearAnalyticsCookies();
  }
  window.dispatchEvent(new Event(CONSENT_EVENT));
  // Reload after revocation unloads Google's listeners and queued timers too.
  // No consent-update ping is sent after opting out.
  if (choice === "denied" && activeId) window.location.reload();
}
export function safeReferrer(raw: string) {
  try {
    const url = new URL(raw);
    return ["http:", "https:"].includes(url.protocol) ? `${url.origin}/` : "";
  } catch { return ""; }
}
export function pageContext(path: string, referrer: string) {
  return {
    page_path: isPublicPath(path) ? path : "/",
    page_location: `https://bryandevelops.com${isPublicPath(path) ? path : "/"}`,
    page_title: PAGE_TITLES[path] || "Bryan Develops",
    page_referrer: safeReferrer(referrer),
  };
}
function canMeasure() {
  return typeof window !== "undefined" &&
    isProductionLocation(window.location.hostname, window.location.pathname) && readConsent() === "granted";
}
export function startAnalytics(id: string) {
  if (id !== MEASUREMENT_ID || !canMeasure()) return false;
  if (!activeId) {
    activeId = id;
    window.dataLayer = window.dataLayer || [];
    // The documented Google tag queue requires Arguments objects.
    // eslint-disable-next-line prefer-rest-params
    window.gtag = function () { window.dataLayer!.push(arguments); };
    window.gtag("consent", "default", {
      analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied",
    });
    window.gtag("consent", "update", { analytics_storage: "granted" });
    const settings = {
      ...pageContext(window.location.pathname, document.referrer),
      // Tag Assistant supplies this signal in its test URL. Keep the signal
      // out of page_location while explicitly enabling GA4 DebugView.
      ...(new URLSearchParams(window.location.search).has("gtm_debug") ? { debug_mode: true } : {}),
      send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false,
      cookie_domain: "bryandevelops.com", cookie_expires: CONSENT_MAX_AGE_MS / 1000,
      cookie_flags: "SameSite=Lax;Secure",
    };
    window.gtag("set", settings);
    window.gtag("js", new Date());
    window.gtag("config", id, settings);
  }
  paused = false;
  disable(false);
  return true;
}
export function trackPageView() {
  if (!activeId || paused || !canMeasure()) { pauseAnalytics(); return; }
  const path = window.location.pathname;
  if (previousPage === path) return;
  const context = pageContext(path, document.referrer);
  if (previousPage) context.page_referrer = `https://bryandevelops.com${previousPage}`;
  previousPage = path;
  window.gtag?.("set", context);
  window.gtag?.("event", "page_view", context);
}
function sendEvent(key: WebsiteEvent, linkParams: { link_url?: string; cta_text?: string } = {}): boolean {
  if (!activeId || paused || !canMeasure() || !Object.hasOwn(EVENTS, key)) return false;
  const [event, params] = EVENTS[key];
  window.gtag?.("event", event, { ...pageContext(window.location.pathname, document.referrer), ...params, ...linkParams });
  return true;
}

export function trackEvent(key: WebsiteEvent): boolean {
  return sendEvent(key);
}

const BOOKING_HOSTS = ["calendly.com", "cal.com", "acuityscheduling.com", "youcanbook.me", "setmore.com"];
// Only reviewed, static CTA labels can enter reports, never arbitrary/user-entered text.
const CTA_LABELS = new Set([
  "contact", "contact me", "get started", "get in touch", "let's talk", "let's talk.",
  "let's talk about your project", "get a quote", "get a free quote", "get a free consultation",
  "book a call", "start a project", "start your project", "send message",
]);

export function safeLinkUrl(href: string, origin: string): string {
  try {
    const url = new URL(href, origin);
    // Retain the public link destination, excluding prefilled mail bodies, booking
    // form values, query strings, fragments, and URL credentials.
    if (["tel:", "mailto:"].includes(url.protocol)) return `${url.protocol}${url.pathname}`;
    if (["https:", "http:"].includes(url.protocol)) return `${url.origin}${url.pathname}`;
  } catch { /* Ignore invalid URLs. */ }
  return "";
}

export function eventForLink(href: string, origin: string): WebsiteEvent | null {
  try {
    const url = new URL(href, origin);
    if (url.protocol === "tel:") return "phone_click";
    if (url.protocol === "mailto:") return "email_click";
    if (!["https:", "http:"].includes(url.protocol)) return null;
    if (BOOKING_HOSTS.some(host => url.hostname === host || url.hostname.endsWith(`.${host}`))) return "booking_click";
    if (url.origin === origin) {
      if (url.pathname === "/contact") return "contact_page_click";
      if (url.pathname === "/Captura.dmg") return "captura_download";
      if (url.pathname === "/PinMemories.dmg") return "pinmemories_download";
    }
    if (url.protocol === "https:") {
      if (["simplassist.com", "www.simplassist.com"].includes(url.hostname)) return "simplassist_click";
      if (["simpl-seo.com", "www.simpl-seo.com"].includes(url.hostname)) return "simplseo_click";
    }
  } catch { /* Ignore non-URL controls. */ }
  return null;
}

export function trackLink(href: string, text: string, origin: string) {
  const link_url = safeLinkUrl(href, origin);
  if (!link_url) return;
  const key = eventForLink(href, origin);
  if (key) sendEvent(key, { link_url });
  const label = ctaLabel(text);
  if (label || key === "contact_page_click") {
    sendEvent("cta_click", { cta_text: label || "Contact", link_url });
  }
}

function ctaLabel(text: string): string | null {
  const label = text.replace(/\s+/g, " ").trim();
  return CTA_LABELS.has(label.toLowerCase().replace(/’/g, "'")) ? label : null;
}

// One delegated listener covers nested icons and links added after hydration.
export function trackClick(event: MouseEvent) {
  if (!(event.target instanceof Element)) return;
  const control = event.target.closest("a, button");
  if (!control) return;
  if (control.matches(".sa-widget-btn") && !document.querySelector(".sa-widget-panel.sa-visible")) {
    trackEvent("chat_open");
  }
  const label = control.textContent || "";
  if (control instanceof HTMLAnchorElement) {
    trackLink(control.getAttribute("href") || "", label, window.location.origin);
  } else if (control instanceof HTMLButtonElement && !control.disabled) {
    const cta_text = ctaLabel(label);
    if (cta_text) sendEvent("cta_click", {
      cta_text, link_url: safeLinkUrl(window.location.pathname, window.location.origin),
    });
  }
}
