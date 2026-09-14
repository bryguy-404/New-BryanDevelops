"use client";

import { useState } from "react";

const steps = [
  {
    title: "Missed call",
    label: "A customer reaches out",
    description:
      "The business is busy. A missed call becomes the starting point for an SMS conversation.",
  },
  {
    title: "AI reply",
    label: "Keep the conversation going",
    description:
      "An automatic text invites a reply. The AI uses the business’s configured information to handle questions and appointment requests.",
  },
  {
    title: "Shared inbox",
    label: "Give the business the context",
    description:
      "The conversation and lead are organized in the inbox, alongside website chats, so the business can follow up.",
  },
];

export default function SimplAssistFlow() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#111117] text-white shadow-2xl">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4 sm:px-7">
        <div className="flex items-center gap-2 text-xs font-medium text-neutral-300">
          <span className="h-2 w-2 rounded-full bg-orange-400" />
          Inside the workflow
        </div>
        <span className="text-[10px] font-medium uppercase tracking-widest text-neutral-400">
          Illustrative · sample data
        </span>
      </div>

      <div className="px-5 pt-5 sm:px-7">
        <div
          className="grid grid-cols-3 gap-2"
          role="group"
          aria-label="Explore the SimplAssist workflow"
        >
          {steps.map((step, index) => (
            <button
              key={step.title}
              type="button"
              aria-pressed={activeStep === index}
              aria-controls="simplassist-flow-detail"
              onClick={() => setActiveStep(index)}
              className={`min-h-16 rounded-xl border px-2 py-3 text-left transition-colors sm:px-3 ${activeStep === index ? "border-orange-400/40 bg-orange-500/10 text-orange-200" : "border-white/10 bg-white/[0.02] text-neutral-400 hover:border-white/25 hover:text-white"}`}
            >
              <span className="mb-1 block text-[10px] tabular-nums opacity-70">
                0{index + 1}
              </span>
              <span className="block text-[10px] font-semibold sm:text-xs">
                {step.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div
        id="simplassist-flow-detail"
        aria-live="polite"
        aria-atomic="true"
        className="px-5 pb-6 sm:px-7 sm:pb-7"
      >
        <div className="flex min-h-[305px] flex-col justify-center py-6">
          {activeStep === 0 && (
            <div className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-7 text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-orange-400/20 bg-orange-500/10 text-orange-300">
                <svg
                  aria-hidden="true"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3.1 5.2 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.6a2 2 0 0 1-.5 2.1L9 10.7a16 16 0 0 0 4.3 4.3l1.3-1.3a2 2 0 0 1 2.1-.5c.8.3 1.7.6 2.6.7a2 2 0 0 1 1.7 2ZM16 3l5 5m0-5-5 5"
                  />
                </svg>
              </div>
              <p className="text-lg font-semibold">Missed call from Alex</p>
              <p className="mt-2 text-sm text-neutral-400">
                Sample Service Co.
              </p>
              <p className="mt-5 inline-flex rounded-full bg-orange-500/10 px-3 py-1.5 text-xs text-orange-200">
                Next: automatic text reply
              </p>
            </div>
          )}
          {activeStep === 1 && (
            <div className="space-y-4 text-sm leading-relaxed">
              <div className="mr-6 sm:mr-12">
                <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-orange-300">
                  SimplAssist · SMS
                </p>
                <p className="rounded-2xl rounded-tl-sm border border-white/10 bg-white/[0.06] px-4 py-3">
                  Hi! Sorry we missed your call at Sample Service Co. How can we
                  help?
                </p>
              </div>
              <div className="ml-10 sm:ml-20">
                <p className="mb-1.5 text-right text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                  Alex · Customer
                </p>
                <p className="rounded-2xl rounded-tr-sm border border-indigo-400/25 bg-indigo-500/20 px-4 py-3 text-indigo-100">
                  I’d like to book a service visit.
                </p>
              </div>
              <div className="mr-6 sm:mr-12">
                <p className="rounded-2xl rounded-tl-sm border border-white/10 bg-white/[0.06] px-4 py-3">
                  I can help with that. What type of service do you need?
                </p>
              </div>
            </div>
          )}
          {activeStep === 2 && (
            <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <p className="text-sm font-semibold">Conversations</p>
                <span className="text-[10px] text-neutral-400">
                  SMS + Web chat
                </span>
              </div>
              <div className="m-3 rounded-lg border border-indigo-400/20 bg-indigo-500/10 p-4">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold">Alex</p>
                  <span className="rounded-full bg-indigo-400/10 px-2 py-1 text-[10px] text-indigo-200">
                    SMS
                  </span>
                </div>
                <p className="text-sm text-neutral-300">
                  Service visit inquiry
                </p>
                <p className="mt-3 border-t border-white/10 pt-3 text-xs leading-relaxed text-neutral-400">
                  Missed call → AI conversation → lead in the inbox
                </p>
              </div>
              <p className="px-4 pb-4 text-xs text-neutral-400">
                Conversation history ready for the business.
              </p>
            </div>
          )}
        </div>
        <div className="min-h-[112px] border-t border-white/10 pt-5">
          <p className="text-sm font-semibold">{steps[activeStep].label}</p>
          <p className="mt-2 text-xs leading-relaxed text-neutral-400">
            {steps[activeStep].description}
          </p>
        </div>
      </div>
    </div>
  );
}
