import { NextResponse, type NextRequest } from "next/server";
import { insertSubscriber } from "./db";
import { sendNotification } from "./mail";
import { INTERESTS, type Interest, type Source } from "./types";

const VALID_INTERESTS = new Set(INTERESTS.map((i) => i.value));
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clientIp(req: NextRequest): string | undefined {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]?.trim();
  return req.headers.get("x-real-ip") || undefined;
}

export function createSubscribeHandler(source: Source) {
  return async function POST(req: NextRequest) {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const b = body as Record<string, unknown>;

    // Honeypot — bots fill hidden fields
    if (typeof b.website === "string" && b.website.length > 0) {
      return NextResponse.json({ ok: true });
    }

    const email = typeof b.email === "string" ? b.email.trim() : "";
    if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const name = typeof b.name === "string" ? b.name.slice(0, 120) : undefined;
    const phone = typeof b.phone === "string" ? b.phone.slice(0, 40) : undefined;

    const interests: Interest[] = Array.isArray(b.interests)
      ? (b.interests.filter(
          (v): v is Interest => typeof v === "string" && VALID_INTERESTS.has(v as Interest)
        ) as Interest[])
      : [];

    try {
      const { isNew } = await insertSubscriber({
        email,
        name,
        phone,
        interests,
        source,
        ip: clientIp(req),
        userAgent: req.headers.get("user-agent") || undefined,
      });

      // Fire-and-forget; don't block response on email
      sendNotification({ email, name, phone, interests, source, isNew }).catch((err) =>
        console.error("[newsletter] notify failed:", err)
      );

      return NextResponse.json({ ok: true, isNew });
    } catch (err) {
      console.error("[newsletter] insert failed:", err);
      return NextResponse.json({ error: "Subscription failed" }, { status: 500 });
    }
  };
}
