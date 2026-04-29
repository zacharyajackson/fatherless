import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { makeFreeAccessToken, FREE_COOKIE_NAME, FREE_TTL_SECONDS } from "@/lib/freeAccess";

const PROMO_CODE = "SSFREE";

export async function POST(req: NextRequest) {
  const { amount, email, promoCode } = await req.json();
  const origin = req.headers.get("origin") || "https://healthefatherless.com";

  // Promo code grants free access — issue a signed httpOnly cookie
  if (promoCode && promoCode.toUpperCase() === PROMO_CODE) {
    const token = makeFreeAccessToken();
    const res = NextResponse.json({
      url: `${origin}/watch/success?free=1${email ? `&email=${encodeURIComponent(email)}` : ""}`,
    });
    res.cookies.set(FREE_COOKIE_NAME, token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: FREE_TTL_SECONDS,
      path: "/",
    });
    return res;
  }

  // Minimum $3 (300 cents)
  if (!amount || amount < 300) {
    return NextResponse.json({ error: "Minimum amount is $3" }, { status: 400 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer_email: email || undefined,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Sophia Smiles — Full Film",
            description: "A moving story about the struggles of a single mother. A film by TIFFANI D.",
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${origin}/watch/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/watch`,
  });

  return NextResponse.json({ url: session.url });
}
