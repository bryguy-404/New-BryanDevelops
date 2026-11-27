"use client";

import { useRef, useState, type FormEvent } from "react";
import { trackEvent } from "@/lib/analytics/website";
import FloatingDots from "./CursorDots";
import FadeIn from "./FadeIn";
import ContactTurnstile from "./ContactTurnstile";

const services = [
  "Web Design",
  "Custom Software",
  "Branding",
  "Technical Support",
  "Other",
];

const contactRows = [
  { label: "Phone", value: "(574) 323-6945", href: "tel:+15743236945" },
  { label: "Email", value: "bryan@bryandevelops.com", href: "mailto:bryan@bryandevelops.com" },
  { label: "Location", value: "South Bend, Indiana", href: "" },
];

const nextSteps = [
  "I read your message and reply within 24 hours.",
  "We talk through what you need. The consultation is free.",
  "You get a clear scope and a flat-rate quote.",
];

const labelClass = "block text-neutral-300 text-sm font-medium mb-2";

export default function ContactPageContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [verificationAttempt, setVerificationAttempt] = useState(0);
  const submittingRef = useRef(false);
  const trackedStart = useRef(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submittingRef.current) return;
    if (!turnstileToken) {
      setError("Please complete the security check before sending.");
      return;
    }
    submittingRef.current = true;
    setSending(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, turnstileToken }),
      });

      const result = await res.json().catch(() => null);
      if (!res.ok || result?.success !== true) {
        setError(result?.error || "Something went wrong. Please try again or email me directly.");
        return;
      }
      trackEvent("contact_form_success");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or email me directly.");
    } finally {
      // A token can be redeemed only once, including when email delivery fails.
      setTurnstileToken("");
      setVerificationAttempt((attempt) => attempt + 1);
      submittingRef.current = false;
      setSending(false);
    }
  };

  return (
    <main className="relative min-h-screen pt-20 sm:pt-24 pb-24 sm:pb-32 overflow-hidden">
      <FloatingDots variant="dark" />

      {/* One soft glow behind the form */}
      <div className="absolute top-1/4 right-0 w-[30rem] h-[30rem] bg-indigo-600/10 rounded-full filter blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-14 lg:gap-20">
          {/* Left — Info */}
          <FadeIn delay={0}>
            <div className="flex flex-col gap-10 lg:sticky lg:top-28">
              <div>
                <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
                  Get In Touch
                </p>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-5">
                  Let&apos;s Build Something Great.
                </h1>
                <p className="text-neutral-400 text-lg leading-relaxed max-w-md">
                  Have a project in mind? Whether it&apos;s a website, custom software,
                  or support for an existing project, I&apos;d love to hear about it.
                </p>
                <p className="mt-6 text-sm font-medium text-neutral-200">
                  Available for new projects
                </p>
              </div>

              {/* Contact details: plain rows, no icon boxes */}
              <div className="border-t border-white/10">
                {contactRows.map((row) => {
                  const body = (
                    <>
                      <span className="text-sm text-neutral-500">{row.label}</span>
                      <span className="flex items-center gap-2 text-white font-medium transition-colors group-hover:text-[#a594ff]">
                        {row.value}
                        {row.href && (
                          <svg
                            className="size-4 text-neutral-500 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#a594ff]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M8 7h9v9" />
                          </svg>
                        )}
                      </span>
                    </>
                  );
                  const rowClass = "group flex items-center justify-between gap-6 border-b border-white/10 py-4";
                  return row.href ? (
                    <a key={row.label} href={row.href} className={rowClass}>{body}</a>
                  ) : (
                    <div key={row.label} className={rowClass}>{body}</div>
                  );
                })}
              </div>

              {/* What happens after the form is sent */}
              <div>
                <h2 className="text-white text-sm font-semibold mb-4">What happens next</h2>
                <ol className="flex flex-col gap-3">
                  {nextSteps.map((step, i) => (
                    <li key={step} className="flex gap-4 text-sm leading-relaxed text-neutral-400">
                      <span className="font-code text-xs leading-6 text-[#a594ff]">{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </FadeIn>

          {/* Right — Form */}
          <FadeIn delay={200}>
            <div className="card-dark p-6 sm:p-9">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center mb-6">
                    <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-neutral-400 max-w-sm">
                    Thanks for reaching out! <br></br> I&apos;ll get back to you within 24 hours (:
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      trackedStart.current = false;
                      setFormData({ name: "", email: "", phone: "", service: "", budget: "", message: "" });
                    }}
                    className="mt-6 px-5 py-2 rounded-full border border-white/15 text-sm font-medium text-white hover:bg-white/10 transition-colors"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} onChange={() => {
                  if (!trackedStart.current) trackedStart.current = trackEvent("contact_form_start");
                }} className="flex flex-col gap-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Send a Message</h2>
                    <p className="mt-1.5 text-sm text-neutral-400">Free consultation — no strings attached.</p>
                  </div>

                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className={labelClass}>
                        Name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        autoComplete="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="field"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClass}>
                        Email *
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="field"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  {/* Service: tiles instead of a dropdown */}
                  <fieldset>
                    <legend className={labelClass}>Service *</legend>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {services.map((s) => (
                        <label key={s} className="choice">
                          <input
                            type="radio"
                            name="service"
                            value={s}
                            required
                            checked={formData.service === s}
                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          />
                          {s}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  {/* Phone + Budget row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className={labelClass}>
                        Phone
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="field"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <label htmlFor="budget" className={labelClass}>
                        Budget Range
                      </label>
                      <select
                        id="budget"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="field appearance-none"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", backgroundSize: "16px" }}
                      >
                        <option value="" className="bg-neutral-900 text-neutral-500">Select a range</option>
                        <option value="under-1k" className="bg-neutral-900 text-white">Under $1,000</option>
                        <option value="1k-3k" className="bg-neutral-900 text-white">$1,000 – $3,000</option>
                        <option value="3k-5k" className="bg-neutral-900 text-white">$3,000 – $5,000</option>
                        <option value="5k-10k" className="bg-neutral-900 text-white">$5,000 – $10,000</option>
                        <option value="10k+" className="bg-neutral-900 text-white">$10,000+</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className={labelClass}>
                      Message *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="field resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <ContactTurnstile key={verificationAttempt} onToken={setTurnstileToken} />

                  {error && (
                    <p role="alert" className="text-red-400 text-sm text-center">{error}</p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={sending || !turnstileToken}
                    className="header-cta is-large group w-full"
                  >
                    <span>{sending ? "Sending..." : "Send Message"}</span>
                    <svg
                      className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </button>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </main>
  );
}
