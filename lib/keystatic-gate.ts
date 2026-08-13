const COOKIE_NAME = "keystatic_gate";
const SIGNING_MESSAGE = "keystatic-gate-v1";

function isGateEnabled(): boolean {
  return !!process.env.KEYSTATIC_ADMIN_PASSWORD;
}

async function hmac(key: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", cryptoKey, enc.encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function signGateCookie(): Promise<string> {
  const password = process.env.KEYSTATIC_ADMIN_PASSWORD ?? "";
  return hmac(password, SIGNING_MESSAGE);
}

async function verifyGateCookie(value: string | undefined): Promise<boolean> {
  if (!isGateEnabled() || !value) return false;
  const expected = await signGateCookie();
  return timingSafeEqual(value, expected);
}

async function verifyPassword(input: string): Promise<boolean> {
  const password = process.env.KEYSTATIC_ADMIN_PASSWORD;
  if (!password) return false;
  return timingSafeEqual(
    await hmac(input, SIGNING_MESSAGE),
    await hmac(password, SIGNING_MESSAGE),
  );
}

export { COOKIE_NAME, isGateEnabled, signGateCookie, verifyGateCookie, verifyPassword };
