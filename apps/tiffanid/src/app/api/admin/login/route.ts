import { NextRequest, NextResponse } from "next/server";
import { checkCredentials, makeAdminToken, ADMIN_COOKIE_NAME, ADMIN_TTL_SECONDS } from "@/lib/adminAuth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { email, password } = (body || {}) as { email?: unknown; password?: unknown };
  if (typeof email !== "string" || typeof password !== "string") {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Tiny per-instance throttle to slow brute force (each cold start resets)
  await new Promise((r) => setTimeout(r, 400));

  if (!checkCredentials(email, password)) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, makeAdminToken(), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: ADMIN_TTL_SECONDS,
    path: "/",
  });
  return res;
}
