"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error || "Login failed");
        setLoading(false);
        return;
      }
      router.refresh();
    } catch {
      setError("Network error");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="font-[family-name:var(--font-syne)] text-[10px] tracking-[0.32em] uppercase text-gold/70 font-700">
            Admin
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-syne)] text-3xl font-700 text-white">
            Sign in
          </h1>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-white/50 text-[10px] tracking-[0.2em] uppercase font-[family-name:var(--font-syne)] font-600">
              Email
            </label>
            <input
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-gold/50 focus:bg-white/[0.06] transition-colors font-[family-name:var(--font-dm-sans)]"
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-white/50 text-[10px] tracking-[0.2em] uppercase font-[family-name:var(--font-syne)] font-600">
              Password
            </label>
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-gold/50 focus:bg-white/[0.06] transition-colors font-[family-name:var(--font-dm-sans)]"
            />
          </div>

          {error && (
            <p className="text-red-400/90 text-xs font-[family-name:var(--font-dm-sans)]" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold hover:bg-gold-light text-black font-[family-name:var(--font-syne)] font-700 text-sm tracking-[0.15em] uppercase py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
