import { redirect } from "next/navigation";
import Stripe from "stripe";
import SuccessVideo from "./SuccessVideo";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id) {
    redirect("/watch");
  }

  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(session_id);
  } catch {
    redirect("/watch");
  }

  if (session.payment_status !== "paid") {
    redirect("/watch");
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="text-center px-6 pt-10 pb-6">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-4">
          <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-white/60 text-xs font-[family-name:var(--font-dm-sans)]">
            Payment successful — thank you for your support
          </span>
        </div>
        <h1 className="font-[family-name:var(--font-fraunces)] text-3xl md:text-4xl font-700">
          Sophia Smiles
        </h1>
        <p className="text-white/40 text-sm font-[family-name:var(--font-dm-sans)] mt-2">
          A Film by Tiffani D
        </p>
      </div>

      {/* Video Player */}
      <div className="max-w-4xl mx-auto px-6 pb-12">
        <SuccessVideo />

        <div className="mt-8 text-center">
          <p className="text-white/30 text-xs font-[family-name:var(--font-dm-sans)]">
            This video is for your personal viewing only. Please do not share or redistribute.
          </p>
          <a
            href="https://tiffanid.com"
            className="inline-block mt-4 text-white/40 hover:text-white/70 text-xs font-[family-name:var(--font-dm-sans)] transition-colors"
          >
            Visit Tiffani D &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
