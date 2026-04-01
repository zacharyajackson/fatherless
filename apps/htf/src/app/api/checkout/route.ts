import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const { amount, email } = await req.json();
  const origin = req.headers.get("origin") || "https://healthefatherless.com";

  // Free access — skip Stripe
  if (!amount || amount === 0) {
    return NextResponse.json({
      url: `${origin}/watch/success?free=1&email=${encodeURIComponent(email || "")}`,
    });
  }

  // Stripe minimum is $0.50 (50 cents)
  if (amount < 50) {
    return NextResponse.json({ error: "Minimum paid amount is $1" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer_email: email || undefined,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Sophia Smiles — Full Film",
            description: "A moving story about the struggles of a single mother. A film by Tiffani D.",
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
