export default function OperatorDisclosure({
  variant = "dark",
}: {
  variant?: "light" | "dark";
}) {
  return (
    <p
      className={`mt-3 px-6 text-sm leading-6 ${
        variant === "light" ? "text-neutral-600" : "text-neutral-400"
      }`}
    >
      Bryan Develops is operated by Arambula Ventures LLC.
    </p>
  );
}
