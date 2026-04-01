"use client";

import { useState } from "react";
import Image from "next/image";

export default function WatchPage() {
  const [amount, setAmount] = useState("5");
  const [email, setEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [showPromo, setShowPromo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const amountCents = Math.max(0, Math.round(parseFloat(amount || "0") * 100));

    // Validate minimum unless promo code is entered
    if (!promoCode && amountCents < 300) {
      setError("Minimum amount is $3");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: amountCents, email, promoCode }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      setError(data.error || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const displayAmount = parseFloat(amount || "0");

  return (
    <div className="flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <Image
            src="/images/sophia-smiles-flyer.jpg"
            alt="Sophia Smiles"
            width={200}
            height={275}
            className="mx-auto rounded-xl mb-6 shadow-2xl shadow-black/10"
          />
          <h1 className="font-[family-name:var(--font-fraunces)] text-3xl font-700 text-htf-fg mb-2">
            Watch Sophia Smiles
          </h1>
          <p className="text-htf-fg-muted text-sm font-[family-name:var(--font-dm-sans)]">
            Pay what you want to support the film
          </p>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-htf-fg-muted text-xs font-[family-name:var(--font-dm-sans)] font-500 mb-2 tracking-wide uppercase"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full bg-htf-bg-muted border border-htf-border rounded-xl px-4 py-3.5 text-htf-fg font-[family-name:var(--font-dm-sans)] text-sm placeholder:text-htf-fg-subtle focus:outline-none focus:border-htf-border-strong transition-colors"
            />
          </div>

          {/* Amount */}
          <div>
            <label
              htmlFor="amount"
              className="block text-htf-fg-muted text-xs font-[family-name:var(--font-dm-sans)] font-500 mb-2 tracking-wide uppercase"
            >
              Amount (USD)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-htf-fg-subtle font-[family-name:var(--font-dm-sans)]">
                $
              </span>
              <input
                id="amount"
                type="number"
                min="3"
                step="1"
                required
                value={amount}
                onChange={(e) => { setAmount(e.target.value); setError(""); }}
                className="w-full bg-htf-bg-muted border border-htf-border rounded-xl pl-8 pr-4 py-3.5 text-htf-fg font-[family-name:var(--font-dm-sans)] text-sm placeholder:text-htf-fg-subtle focus:outline-none focus:border-htf-border-strong transition-colors"
              />
            </div>
            <p className="mt-1.5 text-htf-fg-subtle text-[11px] font-[family-name:var(--font-dm-sans)]">
              Minimum $3 — every dollar supports the mission
            </p>
          </div>

          {/* Quick amounts */}
          <div className="flex gap-2">
            {["3", "5", "10", "25"].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => { setAmount(val); setError(""); }}
                className={`flex-1 py-2.5 rounded-lg text-sm font-[family-name:var(--font-dm-sans)] font-500 transition-all duration-200 ${
                  amount === val
                    ? "bg-htf-accent text-white"
                    : "bg-htf-bg-muted text-htf-fg-muted hover:bg-htf-bg-subtle border border-htf-border"
                }`}
              >
                ${val}
              </button>
            ))}
          </div>

          {/* Promo Code */}
          {!showPromo ? (
            <button
              type="button"
              onClick={() => setShowPromo(true)}
              className="text-htf-fg-subtle hover:text-htf-fg-muted text-xs font-[family-name:var(--font-dm-sans)] transition-colors"
            >
              Have a promo code?
            </button>
          ) : (
            <div>
              <label
                htmlFor="promo"
                className="block text-htf-fg-muted text-xs font-[family-name:var(--font-dm-sans)] font-500 mb-2 tracking-wide uppercase"
              >
                Promo Code
              </label>
              <input
                id="promo"
                type="text"
                value={promoCode}
                onChange={(e) => { setPromoCode(e.target.value.toUpperCase()); setError(""); }}
                placeholder="Enter code"
                className="w-full bg-htf-bg-muted border border-htf-border rounded-xl px-4 py-3.5 text-htf-fg font-[family-name:var(--font-dm-sans)] text-sm placeholder:text-htf-fg-subtle focus:outline-none focus:border-htf-border-strong transition-colors uppercase tracking-wider"
              />
            </div>
          )}

          {/* Error */}
          {error && (
            <p className="text-red-500 text-xs font-[family-name:var(--font-dm-sans)] text-center">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-htf-accent hover:bg-htf-accent-hover text-white font-[family-name:var(--font-dm-sans)] font-600 text-sm py-4 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-black/10"
          >
            {loading
              ? "Redirecting..."
              : promoCode
                ? "Apply Code & Watch"
                : displayAmount > 0
                  ? `Pay $${amount} & Watch`
                  : "Watch"}
          </button>
        </form>

        {/* Back link */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-htf-fg-subtle hover:text-htf-fg-muted text-xs font-[family-name:var(--font-dm-sans)] transition-colors"
          >
            &larr; Back to trailer
          </a>
        </div>
      </div>
    </div>
  );
}
