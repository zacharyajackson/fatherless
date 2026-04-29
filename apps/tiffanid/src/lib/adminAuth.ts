import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "tfd_admin";
const TTL_SECONDS = 60 * 60 * 12; // 12h

function secret(): string {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s) throw new Error("ADMIN_SESSION_SECRET is not set");
  return s;
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

export function makeAdminToken(): string {
  const expiry = Math.floor(Date.now() / 1000) + TTL_SECONDS;
  const payload = String(expiry);
  return `${payload}.${sign(payload)}`;
}

export function verifyAdminToken(token: string | undefined): boolean {
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

export async function isAdminAuthed(): Promise<boolean> {
  const c = await cookies();
  return verifyAdminToken(c.get(COOKIE_NAME)?.value);
}

export function checkCredentials(email: string, password: string): boolean {
  const expectedEmail = process.env.ADMIN_EMAIL;
  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (!expectedEmail || !expectedPassword) return false;

  const emailMatch = safeEqual(email.trim().toLowerCase(), expectedEmail.trim().toLowerCase());
  const passMatch = safeEqual(password, expectedPassword);
  return emailMatch && passMatch;
}

function safeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a, "utf8");
  const bBuf = Buffer.from(b, "utf8");
  // Pad shorter buffer to avoid leaking length via timingSafeEqual exception
  const len = Math.max(aBuf.length, bBuf.length);
  const aPadded = Buffer.alloc(len);
  aBuf.copy(aPadded);
  const bPadded = Buffer.alloc(len);
  bBuf.copy(bPadded);
  return timingSafeEqual(aPadded, bPadded) && aBuf.length === bBuf.length;
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
export const ADMIN_TTL_SECONDS = TTL_SECONDS;
