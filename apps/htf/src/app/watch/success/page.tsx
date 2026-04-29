import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Stripe from "stripe";
import SuccessVideo from "./SuccessVideo";
import { verifyFreeAccessToken, FREE_COOKIE_NAME } from "@/lib/freeAccess";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; free?: string }>;
}) {
  const { session_id, free } = await searchParams;

  // Free access requires a signed cookie set by /api/checkout when promo validates
  if (free === "1") {
    const cookieStore = await cookies();
    const token = cookieStore.get(FREE_COOKIE_NAME)?.value;
    if (!verifyFreeAccessToken(token)) {
      redirect("/watch");
    }
    return <SuccessLayout paid={false} sessionId={undefined} />;
  }

  // Paid access — verify session via Stripe
  if (!session_id) {
    redirect("/watch");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(session_id);
  } catch {
    redirect("/watch");
  }

  if (session.payment_status !== "paid") {
    redirect("/watch");
  }

  return <SuccessLayout paid={true} sessionId={session_id} />;
}

function SuccessLayout({ paid, sessionId }: { paid: boolean; sessionId: string | undefined }) {
  return (
    <div className="py-10">
      {/* Header */}
      <div className="text-center px-6 pb-6">
        <div className="inline-flex items-center gap-2 bg-htf-bg-muted border border-htf-border rounded-full px-4 py-2 mb-4">
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-htf-fg-muted text-xs font-[family-name:var(--font-dm-sans)]">
            {paid ? "Payment successful — thank you for your support" : "Thank you — enjoy the film"}
          </span>
        </div>
        <h1 className="font-[family-name:var(--font-fraunces)] text-3xl md:text-4xl font-700 text-htf-fg">
          Sophia Smiles
        </h1>
        <p className="text-htf-fg-muted text-sm font-[family-name:var(--font-dm-sans)] mt-2">
          A Film by TIFFANI D
        </p>
      </div>

      {/* Video Player */}
      <div className="max-w-4xl mx-auto px-6 pb-12">
        <SuccessVideo sessionId={sessionId} />

        <div className="mt-8 text-center">
          <p className="text-htf-fg-subtle text-xs font-[family-name:var(--font-dm-sans)]">
            This video is for your personal viewing only. Please do not share or redistribute.
          </p>
        </div>
      </div>
    </div>
  );
}
