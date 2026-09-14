import Image from "next/image";
import FadeIn from "./FadeIn";
import SimplAssistFlow from "./SimplAssistFlow";

const resumeUrl = "/resume/Bryan-Arambula-Resume.pdf";
const githubUrl = "https://github.com/bryguy-404";
const linkedinUrl = "https://www.linkedin.com/in/bryan-arambula-823a86191/";
const container = "relative mx-auto max-w-7xl px-6 lg:px-12";
const reveal = "motion-reduce:opacity-100 motion-reduce:translate-y-0";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d={diagonal ? "M7 17 17 7M7 7h10v10" : "M4 12h16m-6-6 6 6-6 6"}
      />
    </svg>
  );
}

function Download() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v12m-4-4 4 4 4-4M5 16v4h14v-4"
      />
    </svg>
  );
}

function Tags({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <ul aria-label="Technologies" className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className={`rounded-full border px-3 py-1 text-xs font-medium ${dark ? "border-white/10 bg-white/[0.04] text-neutral-300" : "border-neutral-200 bg-neutral-50 text-neutral-600"}`}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

const skills = [
  {
    number: "01",
    title: "Build the application",
    description:
      "Interfaces, application logic, and the workflows between them.",
    items:
      "TypeScript · JavaScript · React · Next.js · Tailwind CSS · Node.js · Express",
  },
  {
    number: "02",
    title: "Connect the systems",
    description:
      "Data, authentication, payments, and event-driven integrations.",
    items:
      "PostgreSQL · Supabase · Firebase · REST APIs · Webhooks · Stripe · Telnyx / Twilio · Resend",
  },
  {
    number: "03",
    title: "Apply AI",
    description:
      "LLM-powered features with business context and reviewed output.",
    items:
      "OpenAI API · Anthropic API / SDK · AI workflows · Prompt & system design",
  },
  {
    number: "04",
    title: "Ship and support",
    description:
      "Deployments, infrastructure, and troubleshooting after launch.",
    items:
      "Git · GitHub · Vercel · Railway · Cloudflare · Docker · VPS / cPanel · DNS · SSL",
  },
];

// Pass a verified walkthrough URL here when the recorded demo is available.
export default function EngineeringPageContent({
  demoVideoUrl,
}: {
  demoVideoUrl?: string;
}) {
  return (
    <>
      <main id="engineering-content">
        <section className="hero-grid-bg relative overflow-hidden bg-black pt-44 text-white sm:pt-48">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-20 h-[38rem] w-[38rem] rounded-full bg-indigo-600/15 blur-[150px]"
          />
          <div className={container}>
            <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
              <div className="relative z-10 pb-7 sm:pb-12">
                <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">
                  <span className="h-px w-8 bg-indigo-400" />
                  Bryan Arambula
                </p>
                <h1 className="max-w-3xl text-[clamp(2.7rem,5.3vw,4.75rem)] font-bold leading-[1.08] tracking-tight">
                  Full-Stack &amp;
                  <br />
                  <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    Applied AI
                  </span>
                  <br />
                  Engineer.
                </h1>
                <p className="mt-7 max-w-lg text-base leading-relaxed text-neutral-300 sm:text-lg">
                  I build production web applications, AI-powered SaaS, and API
                  integrations. From the first requirement to deployment and the
                  work that comes after.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#simplassist"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-xs font-semibold text-black transition-colors hover:bg-neutral-200 sm:gap-3 sm:px-6 sm:text-sm"
                  >
                    Explore my work <Arrow />
                  </a>
                  <a
                    href={resumeUrl}
                    download
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 px-4 py-3 text-xs font-semibold transition-colors hover:bg-white/10 sm:gap-3 sm:px-6 sm:text-sm"
                  >
                    Resume{" "}
                    <span className="text-xs font-normal text-neutral-400">
                      PDF
                    </span>
                    <Download />
                  </a>
                </div>
                <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-400">
                  <a
                    className="inline-flex min-h-8 items-center gap-1.5 hover:text-white"
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub <Arrow diagonal />
                  </a>
                  <a
                    className="inline-flex min-h-8 items-center gap-1.5 hover:text-white"
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn <Arrow diagonal />
                  </a>
                  <a
                    className="inline-flex min-h-8 items-center gap-1.5 hover:text-white"
                    href="mailto:bryan@bryandevelops.com"
                  >
                    Email <Arrow diagonal />
                  </a>
                </div>
              </div>
              <div className="relative mx-auto h-[270px] w-full max-w-lg overflow-hidden sm:h-[400px] lg:h-[510px] lg:self-end">
                <div
                  aria-hidden="true"
                  className="absolute bottom-8 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full border border-indigo-300/10 bg-indigo-500/5 sm:h-96 sm:w-96"
                />
                <Image
                  src="/Bryan-Develops.png"
                  alt="Bryan Arambula"
                  fill
                  priority
                  sizes="(max-width: 1023px) 512px, 40vw"
                  className="object-cover object-right-bottom"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"
                />
                <div className="absolute inset-x-0 bottom-8 flex justify-center">
                  <p className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-black/60 px-4 py-2.5 text-xs text-neutral-300 backdrop-blur-md">
                    <svg
                      aria-hidden="true"
                      className="h-3.5 w-3.5 text-indigo-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                    South Bend, Indiana
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-xs sm:flex-row sm:items-center sm:justify-between sm:py-7">
              <p className="font-medium uppercase tracking-[0.16em] text-neutral-500">
                Selected engineering work
              </p>
              <p className="text-neutral-400">
                Full-stack applications{" "}
                <span className="mx-3 text-neutral-700">/</span> Applied AI{" "}
                <span className="mx-3 text-neutral-700">/</span> Integrations
              </p>
            </div>
          </div>
        </section>

        <section
          id="simplassist"
          aria-labelledby="simplassist-heading"
          className="relative overflow-hidden bg-[#f8f9fa] py-20 sm:py-28"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 h-96 w-96 rounded-full bg-indigo-100/60 blur-[120px]"
          />
          <div className={container}>
            <FadeIn className={reveal}>
              <div className="mb-10 flex items-end justify-between gap-6">
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">
                    Featured project / 01
                  </p>
                  <h2
                    id="simplassist-heading"
                    className="text-4xl font-bold tracking-tight sm:text-5xl"
                  >
                    A missed call.
                    <br />
                    <span className="text-neutral-500">
                      A conversation that continues.
                    </span>
                  </h2>
                </div>
              </div>
            </FadeIn>

            <article className="overflow-hidden rounded-3xl border border-neutral-200/80 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.04)]">
              <div className="h-1 bg-gradient-to-r from-orange-400 via-indigo-500 to-purple-500" />
              <div className="grid gap-10 p-6 sm:p-9 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:p-12">
                <div className="flex flex-col items-start">
                  <div className="mb-7 flex items-center gap-3.5">
                    <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-orange-100 bg-orange-50">
                      <span className="relative h-[42px] w-[42px]">
                        <Image
                          src="/logos/simplassist.png"
                          alt=""
                          fill
                          sizes="42px"
                          className="object-contain"
                        />
                      </span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold tracking-tight">
                        SimplAssist
                      </h3>
                      <p className="mt-0.5 text-xs text-neutral-500">
                        Independent product · AI communication SaaS
                      </p>
                    </div>
                  </div>
                  <p className="text-lg font-medium leading-relaxed text-neutral-800">
                    A business communication platform that connects missed
                    calls, SMS, website chat, and appointment workflows.
                  </p>
                  <div className="mt-6 space-y-5 text-sm leading-relaxed text-neutral-600">
                    <div>
                      <h4 className="mb-1.5 font-semibold text-neutral-900">
                        The problem
                      </h4>
                      <p>
                        Small teams can’t answer every call or website inquiry
                        while serving customers. Following up means keeping
                        track of conversations across different channels.
                      </p>
                    </div>
                    <div>
                      <h4 className="mb-1.5 font-semibold text-neutral-900">
                        What I built
                      </h4>
                      <p>
                        I built the multi-tenant application, including AI
                        conversation flows, authentication, onboarding, business
                        configuration, billing, messaging integrations, and
                        email workflows.
                      </p>
                    </div>
                  </div>
                  <div className="mt-7">
                    <Tags
                      items={[
                        "Next.js",
                        "TypeScript",
                        "Supabase",
                        "PostgreSQL",
                        "LLM APIs",
                        "Telnyx / Twilio",
                        "Stripe",
                        "Resend",
                      ]}
                    />
                  </div>
                  <div className="mt-8 flex flex-wrap items-center gap-5">
                    <a
                      href="https://simplassist.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
                    >
                      Visit SimplAssist <Arrow diagonal />
                    </a>
                    {demoVideoUrl && (
                      <a
                        href={demoVideoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-indigo-700"
                      >
                        Watch walkthrough <Arrow diagonal />
                      </a>
                    )}
                  </div>
                </div>
                <div className="min-w-0 self-center">
                  <SimplAssistFlow />
                </div>
              </div>
              <div className="border-t border-neutral-200/70 bg-neutral-50/70 p-6 sm:p-9 lg:px-12">
                <p className="mb-6 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                  Engineering considerations
                </p>
                <div className="grid gap-7 md:grid-cols-3 md:gap-8">
                  <div>
                    <span className="mb-3 block text-xs font-semibold text-indigo-600">
                      01 / Business context
                    </span>
                    <h4 className="mb-2 text-sm font-bold">
                      Make the AI business-specific.
                    </h4>
                    <p className="text-sm leading-relaxed text-neutral-600">
                      Responses use the business profile, services, FAQs, hours,
                      and AI settings. Configuration gives the conversation its
                      context.
                    </p>
                  </div>
                  <div>
                    <span className="mb-3 block text-xs font-semibold text-indigo-600">
                      02 / Connected channels
                    </span>
                    <h4 className="mb-2 text-sm font-bold">
                      Bring the conversation together.
                    </h4>
                    <p className="text-sm leading-relaxed text-neutral-600">
                      SMS and embeddable web chat lead into a shared inbox,
                      connecting the customer-facing experience to the
                      business’s follow-up work.
                    </p>
                  </div>
                  <div>
                    <span className="mb-3 block text-xs font-semibold text-indigo-600">
                      03 / Product delivery
                    </span>
                    <h4 className="mb-2 text-sm font-bold">
                      Build beyond the AI response.
                    </h4>
                    <p className="text-sm leading-relaxed text-neutral-600">
                      Authentication, onboarding, billing, email, and
                      appointment workflows are part of the application around
                      the conversation.
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section
          aria-labelledby="supporting-heading"
          className="border-t border-neutral-200/70 bg-[#f8f9fa] py-20 sm:py-24"
        >
          <div className={container}>
            <FadeIn className={reveal}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">
                More selected work
              </p>
              <h2
                id="supporting-heading"
                className="mb-10 text-3xl font-bold tracking-tight sm:text-4xl"
              >
                Useful software. Different problems.
              </h2>
            </FadeIn>
            <div className="grid gap-6 md:grid-cols-2">
              <article className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.025)]">
                <div
                  className="flex min-h-32 items-center justify-center gap-2 border-b border-emerald-100 bg-emerald-50/60 px-5 py-8 sm:gap-4"
                  aria-label="Search data to insights to recommendations"
                >
                  <span className="rounded-xl border border-emerald-200/70 bg-white px-3 py-3 text-xs font-medium text-emerald-800">
                    Search data
                  </span>
                  <span className="text-emerald-500">
                    <Arrow />
                  </span>
                  <span className="rounded-xl border border-emerald-200/70 bg-white px-3 py-3 text-xs font-medium text-emerald-800">
                    Insights
                  </span>
                  <span className="text-emerald-500">
                    <Arrow />
                  </span>
                  <span className="rounded-xl border border-emerald-200/70 bg-white px-3 py-3 text-xs font-medium text-emerald-800">
                    Next steps
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                    02 / Independent product
                  </p>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="relative h-[34px] w-[34px]">
                      <Image
                        src="/logos/simplseo.png"
                        alt=""
                        fill
                        sizes="34px"
                        className="object-contain"
                      />
                    </span>
                    <h3 className="text-2xl font-bold tracking-tight">
                      SimplSEO
                    </h3>
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-neutral-600">
                    Turns Google Search Console data into actionable
                    recommendations for small businesses: low-CTR pages, ranking
                    and content opportunities, and an AI SEO mentor.
                  </p>
                  <p className="mb-6 text-sm leading-relaxed text-neutral-600">
                    <span className="font-semibold text-neutral-900">
                      My contribution:
                    </span>{" "}
                    Built the application connecting search performance data
                    with recommendations and AI guidance.
                  </p>
                  <div className="mt-auto">
                    <Tags
                      items={[
                        "Next.js",
                        "React",
                        "Firebase",
                        "Search Console API",
                        "OpenAI",
                      ]}
                    />
                    <a
                      href="https://simplseo-io.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-indigo-700 hover:text-indigo-900"
                    >
                      Open SimplSEO <Arrow diagonal />
                    </a>
                  </div>
                </div>
              </article>
              <article className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.025)]">
                <div
                  className="flex min-h-32 items-center justify-center gap-2 border-b border-indigo-100 bg-indigo-50/60 px-5 py-8 sm:gap-4"
                  aria-label="Survey to webhook to SMS follow-up"
                >
                  <span className="rounded-xl border border-indigo-200/70 bg-white px-3 py-3 text-xs font-medium text-indigo-800">
                    Survey
                  </span>
                  <span className="text-indigo-500">
                    <Arrow />
                  </span>
                  <span className="rounded-xl border border-indigo-200/70 bg-white px-3 py-3 text-xs font-medium text-indigo-800">
                    Webhook
                  </span>
                  <span className="text-indigo-500">
                    <Arrow />
                  </span>
                  <span className="rounded-xl border border-indigo-200/70 bg-white px-3 py-3 text-xs font-medium text-indigo-800">
                    SMS follow-up
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                    03 / Agency &amp; client work
                  </p>
                  <h3 className="mb-4 text-2xl font-bold tracking-tight">
                    Customer feedback
                    <br />
                    &amp; review automation
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-neutral-600">
                    Connects survey responses to SMS follow-up, stored feedback,
                    and conditional Google review routing in a Node.js
                    application.
                  </p>
                  <p className="mb-6 text-sm leading-relaxed text-neutral-600">
                    <span className="font-semibold text-neutral-900">
                      My contribution:
                    </span>{" "}
                    Connected survey webhooks, Twilio messaging, and Supabase
                    storage, and deployed the application on Railway.
                  </p>
                  <div className="mt-auto">
                    <Tags
                      items={[
                        "Node.js",
                        "Webhooks",
                        "Twilio",
                        "Supabase",
                        "Railway",
                      ]}
                    />
                    <p className="mt-6 flex min-h-11 items-center text-xs text-neutral-500">
                      Internal workflow · no public application
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="skills-heading"
          className="relative overflow-hidden bg-neutral-950 py-20 text-white sm:py-24"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-indigo-600/10 blur-[140px]"
          />
          <div className={container}>
            <FadeIn className={reveal}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-400">
                The toolkit
              </p>
              <h2
                id="skills-heading"
                className="text-3xl font-bold tracking-tight sm:text-4xl"
              >
                From interface to infrastructure.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-400">
                The tools I use to build the product, connect its moving parts,
                and keep it running.
              </p>
            </FadeIn>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {skills.map((skill) => (
                <div
                  key={skill.number}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                >
                  <span className="text-xs font-medium text-indigo-400">
                    {skill.number}
                  </span>
                  <h3 className="mb-3 mt-5 text-lg font-semibold tracking-tight">
                    {skill.title}
                  </h3>
                  <p className="mb-5 text-sm leading-relaxed text-neutral-400">
                    {skill.description}
                  </p>
                  <p className="border-t border-white/10 pt-5 text-xs leading-loose text-neutral-300">
                    {skill.items}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="experience-heading"
          className="bg-[#f8f9fa] py-20 sm:py-24"
        >
          <div
            className={`${container} grid gap-10 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20`}
          >
            <FadeIn className={reveal}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">
                Experience
              </p>
              <h2
                id="experience-heading"
                className="text-3xl font-bold tracking-tight sm:text-4xl"
              >
                Ownership beyond
                <br />
                the first release.
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-neutral-600">
                My work spans client applications and independent products, from
                requirements and UX planning to deployment and ongoing support.
              </p>
              <p className="mt-6 text-xs text-neutral-500">
                South Bend, IN <span className="mx-2 text-neutral-300">/</span>{" "}
                English &amp; Spanish
              </p>
            </FadeIn>
            <div>
              <article className="relative border-l border-indigo-200 pb-9 pl-7">
                <span
                  aria-hidden="true"
                  className="absolute -left-[5px] top-1 h-[9px] w-[9px] rounded-full bg-indigo-500 ring-4 ring-[#f8f9fa]"
                />
                <p className="mb-2 text-xs font-medium text-indigo-600">
                  2024–Present
                </p>
                <h3 className="text-xl font-bold tracking-tight">
                  Alpha Dog Agency
                </h3>
                <p className="mt-1 text-sm font-medium text-neutral-700">
                  Web &amp; Software Developer
                </p>
                <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                  Build and maintain production websites and applications, API
                  and webhook integrations, and internal AI tools. Manage
                  infrastructure, deployments, and production troubleshooting.
                </p>
              </article>
              <article className="relative border-l border-indigo-200 pl-7">
                <span
                  aria-hidden="true"
                  className="absolute -left-[5px] top-1 h-[9px] w-[9px] rounded-full border-2 border-indigo-400 bg-[#f8f9fa] ring-4 ring-[#f8f9fa]"
                />
                <p className="mb-2 text-xs font-medium text-indigo-600">
                  December 2022–Present
                </p>
                <h3 className="text-xl font-bold tracking-tight">
                  Bryan Develops
                </h3>
                <p className="mt-1 text-sm font-medium text-neutral-700">
                  Independent Software Developer / Owner
                </p>
                <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                  Own custom web applications and SaaS from requirements and
                  architecture through authentication, payments, integrations,
                  deployment, and support. Direct and review AI-assisted
                  development with responsibility for the final output.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="contact-heading"
          className="relative overflow-hidden border-t border-neutral-200 bg-[#f8f9fa] py-20 sm:py-24"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-80 w-full max-w-xl -translate-x-1/2 rounded-full bg-indigo-100/60 blur-[100px]"
          />
          <div className={`${container} text-center`}>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">
              Continue the conversation
            </p>
            <h2
              id="contact-heading"
              className="text-4xl font-bold tracking-tight sm:text-5xl"
            >
              Let’s talk software.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-neutral-600">
              Want to go deeper on a project or the engineering behind it? I’d
              be happy to walk through the work.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="mailto:bryan@bryandevelops.com"
                className="inline-flex min-h-12 items-center gap-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(99,102,241,0.2)] transition-colors hover:from-indigo-700 hover:to-purple-700"
              >
                Get in touch <Arrow />
              </a>
              <a
                href={resumeUrl}
                download
                className="inline-flex min-h-12 items-center gap-3 rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-700 hover:bg-white"
              >
                Download resume <Download />
              </a>
            </div>
            <a
              href="mailto:bryan@bryandevelops.com"
              className="mt-6 inline-flex min-h-10 items-center text-sm text-neutral-500 hover:text-indigo-700"
            >
              bryan@bryandevelops.com
            </a>
          </div>
        </section>
      </main>
      <footer className="border-t border-white/10 bg-neutral-950 px-6 py-10 text-center text-sm text-neutral-500">
        <p>&copy; 2026 Bryan Develops. All rights reserved.</p>
      </footer>
    </>
  );
}
