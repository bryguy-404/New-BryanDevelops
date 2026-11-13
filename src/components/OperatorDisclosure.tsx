import Link from "next/link";
import { AnalyticsSettingsButton } from "./WebsiteAnalytics";

export default function OperatorDisclosure({
  variant = "dark",
}: {
  variant?: "light" | "dark";
}) {
  return (
    <div
      className={`mt-3 px-6 text-sm leading-6 ${
        variant === "light" ? "text-neutral-600" : "text-neutral-400"
      }`}
    >
      <p>Bryan Develops is operated by Arambula Ventures LLC.</p>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
        <Link href="/privacy" className="underline underline-offset-4 hover:opacity-80">Privacy</Link>
        <AnalyticsSettingsButton className="min-h-11 underline underline-offset-4 hover:opacity-80" />
      </div>
    </div>
  );
}
