import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import Stripe from "stripe";
import { verifyFreeAccessToken, FREE_COOKIE_NAME } from "@/lib/freeAccess";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");

  let authorized = false;

  if (sessionId) {
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      authorized = session.payment_status === "paid";
    } catch {
      authorized = false;
    }
  }

  if (!authorized) {
    const cookieStore = await cookies();
    const token = cookieStore.get(FREE_COOKIE_NAME)?.value;
    authorized = verifyFreeAccessToken(token);
  }

  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = process.env.BLOB_VIDEO_URL;
  if (!url) {
    return NextResponse.json({ error: "Video not configured" }, { status: 500 });
  }

  return NextResponse.redirect(url, { status: 302 });
}
