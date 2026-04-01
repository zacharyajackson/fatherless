"use client";

import { useState } from "react";
import Image from "next/image";

export default function WatchPage() {
  const [amount, setAmount] = useState("5");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: Math.max(1, Math.round(parseFloat(amount) * 100)),
        email,
      }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      setLoading(false);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <Image
            src="/images/sophia-smiles-flyer.jpg"
            alt="Sophia Smiles"
            width={200}
            height={275}
            className="mx-auto rounded-xl mb-6 shadow-2xl shadow-white/5"
          />
          <h1 className="font-[family-name:var(--font-fraunces)] text-3xl font-700 mb-2">
            Watch Sophia Smiles
          </h1>
          <p className="text-white/40 text-sm font-[family-name:var(--font-dm-sans)]">
            Pay what you want to support the film
          </p>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-white/50 text-xs font-[family-name:var(--font-dm-sans)] font-500 mb-2 tracking-wide uppercase"
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
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white font-[family-name:var(--font-dm-sans)] text-sm placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>

          {/* Amount */}
          <div>
            <label
              htmlFor="amount"
              className="block text-white/50 text-xs font-[family-name:var(--font-dm-sans)] font-500 mb-2 tracking-wide uppercase"
            >
              Amount (USD)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-[family-name:var(--font-dm-sans)]">
                $
              </span>
              <input
                id="amount"
                type="number"
                min="1"
                step="1"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-4 py-3.5 text-white font-[family-name:var(--font-dm-sans)] text-sm placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
            <p className="mt-1.5 text-white/20 text-[11px] font-[family-name:var(--font-dm-sans)]">
              Minimum $1 — every dollar supports the mission
            </p>
          </div>

          {/* Quick amounts */}
          <div className="flex gap-2">
            {["3", "5", "10", "25"].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setAmount(val)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-[family-name:var(--font-dm-sans)] font-500 transition-all duration-200 ${
                  amount === val
                    ? "bg-white text-black"
                    : "bg-white/5 text-white/50 hover:bg-white/10 border border-white/10"
                }`}
              >
                ${val}
              </button>
            ))}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-[family-name:var(--font-dm-sans)] font-600 text-sm py-4 rounded-full transition-all duration-300 hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-white/10"
          >
            {loading ? "Redirecting to checkout..." : `Pay $${amount || "0"} & Watch`}
          </button>
        </form>

        {/* Back link */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-white/30 hover:text-white/60 text-xs font-[family-name:var(--font-dm-sans)] transition-colors"
          >
            &larr; Back to trailer
          </a>
        </div>
      </div>
    </div>
  );
}
