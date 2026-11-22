type VerificationResult =
  | { success: true }
  | { success: false; status: 400 | 503; error: string };

const verificationError = "Please complete the security check and try again.";
const unavailableError =
  "The security check is unavailable. Please try again or email me directly.";

/** Verify before creating an email transport or processing the inquiry. */
export async function verifyTurnstile(token: unknown): Promise<VerificationResult> {
  if (typeof token !== "string" || !token.trim() || token.length > 2048) {
    return { success: false, status: 400, error: verificationError };
  }

  const secret = process.env.TURNSTILE_SECRET_KEY;
  const allowedHostnames = (
    process.env.TURNSTILE_ALLOWED_HOSTNAMES || "bryandevelops.com,www.bryandevelops.com"
  ).split(",").map((hostname) => hostname.trim()).filter(Boolean);

  // Dummy keys are for local tests only, never a deployed form.
  if (!secret || (process.env.VERCEL_ENV && /^[123]x0+AA$/.test(secret))) {
    console.error("Contact security configuration is missing or invalid.");
    return { success: false, status: 503, error: unavailableError };
  }

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, response: token }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      return { success: false, status: 503, error: unavailableError };
    }

    const result = await response.json();
    if (
      result?.success !== true ||
      result.action !== "contact" ||
      !allowedHostnames.includes(result.hostname)
    ) {
      return { success: false, status: 400, error: verificationError };
    }

    return { success: true };
  } catch {
    // Do not log tokens, keys, or inquiry contents.
    console.error("Contact security verification could not be completed.");
    return { success: false, status: 503, error: unavailableError };
  }
}
