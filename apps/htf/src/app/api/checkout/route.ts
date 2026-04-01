import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const { amount, email } = await req.json();

  if (!amount || amount < 100) {
    return NextResponse.json({ error: "Minimum amount is $1" }, { status: 400 });
  }

  const origin = req.headers.get("origin") || "https://healthefatherless.com";

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
