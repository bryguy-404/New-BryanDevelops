// Public GA4 web stream for bryandevelops.com, verified in the owner's account.
export const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? "G-HYM1RKG6KM";
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
for (const city of ["south-bend", "fort-wayne", "warsaw", "mishawaka", "laporte", "goshen", "niles"]) {
  for (const service of ["software", "web-development"]) {
    PAGE_TITLES[`/services/${service}/${city}`] = `${service} in ${city} | Bryan Develops`;
  }
}

// Fixed events only: never pass form values, link text, or arbitrary URLs.
export const EVENTS = {
  contact_page_click: ["contact_click", { method: "contact_page" }],
  phone_click: ["contact_click", { method: "phone" }],
  email_click: ["contact_click", { method: "email" }],
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
  contact_form_success: ["generate_lead", { method: "contact_form" }],
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
  if (!isMeasurementId(id) || !canMeasure()) return false;
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
export function trackEvent(key: WebsiteEvent): boolean {
  if (!activeId || paused || !canMeasure() || !Object.hasOwn(EVENTS, key)) return false;
  const [event, params] = EVENTS[key];
  window.gtag?.("event", event, { ...pageContext(window.location.pathname, document.referrer), ...params });
  return true;
}

export function eventForLink(href: string, origin: string): WebsiteEvent | null {
  if (href === "tel:+15743236945") return "phone_click";
  if (href === "mailto:bryan@bryandevelops.com") return "email_click";
  try {
    const url = new URL(href, origin);
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
