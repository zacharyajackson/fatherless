import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "htf_free";
const TTL_SECONDS = 60 * 60 * 24; // 24h

function secret(): string {
  const s = process.env.FREE_ACCESS_SECRET;
  if (!s) throw new Error("FREE_ACCESS_SECRET is not set");
  return s;
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

export function makeFreeAccessToken(): string {
  const expiry = Math.floor(Date.now() / 1000) + TTL_SECONDS;
  const payload = String(expiry);
  return `${payload}.${sign(payload)}`;
}

export function verifyFreeAccessToken(token: string | undefined): boolean {
  if (!token) return false;
  const dot = token.indexOf(".");
  if (dot < 0) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);

  const expected = sign(payload);
  if (sig.length !== expected.length) return false;
  try {
    if (!timingSafeEqual(Buffer.from(sig, "hex"), Buffer.from(expected, "hex"))) return false;
  } catch {
    return false;
  }

  const expiry = Number(payload);
  if (!Number.isFinite(expiry)) return false;
  if (Math.floor(Date.now() / 1000) > expiry) return false;
  return true;
}

export const FREE_COOKIE_NAME = COOKIE_NAME;
export const FREE_TTL_SECONDS = TTL_SECONDS;
