"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { SubscriberRow } from "@repo/newsletter/query";
import type { Source } from "@repo/newsletter/types";

const SOURCE_LABELS: Record<Source, string> = {
  tiffanid: "TIFFANI D",
  htf: "Heal The Fatherless",
};

const INTEREST_LABELS: Record<string, string> = {
  artist: "Artist",
  film: "Film Enthusiast",
  fan: "Fan of Tiffani D",
};

type Props = {
  subscribers: SubscriberRow[];
  counts: { source: Source; count: number }[];
  activeSource: Source | undefined;
};

export default function Dashboard({ subscribers, counts, activeSource }: Props) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const totalCount = counts.reduce((s, c) => s + c.count, 0);

  async function logout() {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  function setSource(s: Source | undefined) {
    const url = s ? `/admin?source=${s}` : "/admin";
    router.push(url);
  }

  const csvHref = activeSource
    ? `/api/admin/subscribers.csv?source=${activeSource}`
    : "/api/admin/subscribers.csv";

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      {/* Header */}
      <header className="border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-gold/70 text-[10px] tracking-[0.32em] uppercase font-[family-name:var(--font-syne)] font-700">
              Admin
            </p>
            <h1 className="mt-1 font-[family-name:var(--font-syne)] text-xl font-700 tracking-[-0.01em]">
              Dashboard
            </h1>
          </div>
          <button
            type="button"
            onClick={logout}
            disabled={loggingOut}
            className="text-white/50 hover:text-white text-xs tracking-[0.15em] uppercase font-[family-name:var(--font-dm-sans)] transition-colors disabled:opacity-50"
          >
            {loggingOut ? "Signing out…" : "Sign out"}
          </button>
        </div>
      </header>

      {/* Summary */}
      <section className="max-w-6xl mx-auto px-6 pt-8">
        <div className="grid sm:grid-cols-3 gap-3">
          <SummaryCard label="Total subscribers" value={totalCount} active={!activeSource} onClick={() => setSource(undefined)} />
          {(["tiffanid", "htf"] as Source[]).map((s) => (
            <SummaryCard
              key={s}
              label={SOURCE_LABELS[s]}
              value={counts.find((c) => c.source === s)?.count ?? 0}
              active={activeSource === s}
              onClick={() => setSource(s)}
            />
          ))}
        </div>
      </section>

      {/* Actions */}
      <section className="max-w-6xl mx-auto px-6 mt-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <p className="text-white/50 text-xs tracking-[0.18em] uppercase font-[family-name:var(--font-syne)] font-600">
            Subscribers
          </p>
          <span className="text-white/30 text-[11px] font-[family-name:var(--font-dm-sans)]">
            Showing {subscribers.length} most recent
            {activeSource ? ` from ${SOURCE_LABELS[activeSource]}` : ""}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={csvHref}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 hover:border-gold/40 text-white/70 hover:text-gold text-xs tracking-[0.15em] uppercase font-[family-name:var(--font-syne)] font-600 transition-colors"
          >
            Export CSV
          </a>
          <a
            href="https://dashboard.stripe.com/payments"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white/70 hover:text-white text-xs tracking-[0.15em] uppercase font-[family-name:var(--font-syne)] font-600 transition-colors"
          >
            Payments ↗
          </a>
        </div>
      </section>

      {/* Table */}
      <section className="max-w-6xl mx-auto px-6 mt-4 mb-16">
        <div className="rounded-xl border border-white/[0.06] overflow-hidden bg-dark-surface">
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-[family-name:var(--font-dm-sans)]">
              <thead>
                <tr className="text-left text-white/40 text-[11px] tracking-[0.15em] uppercase">
                  <th className="px-4 py-3 font-600">Date</th>
                  <th className="px-4 py-3 font-600">Email</th>
                  <th className="px-4 py-3 font-600">Name</th>
                  <th className="px-4 py-3 font-600">Phone</th>
                  <th className="px-4 py-3 font-600">Source</th>
                  <th className="px-4 py-3 font-600">Interests</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-white/40">
                      No subscribers yet.
                    </td>
                  </tr>
                )}
                {subscribers.map((s) => (
                  <tr key={s.id} className="border-t border-white/[0.04] hover:bg-white/[0.02]">
                    <td className="px-4 py-3 text-white/50 whitespace-nowrap text-xs">
                      {formatDate(s.created_at)}
                    </td>
                    <td className="px-4 py-3 text-white">{s.email}</td>
                    <td className="px-4 py-3 text-white/70">{s.name || "—"}</td>
                    <td className="px-4 py-3 text-white/70">{s.phone || "—"}</td>
                    <td className="px-4 py-3 text-white/60 text-xs">
                      {SOURCE_LABELS[s.source]}
                    </td>
                    <td className="px-4 py-3 text-white/60 text-xs">
                      {s.interests.length === 0
                        ? "—"
                        : s.interests
                            .map((i) => INTEREST_LABELS[i] ?? i)
                            .join(", ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  active,
  onClick,
}: {
  label: string;
  value: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left rounded-xl border px-5 py-4 transition-all ${
        active
          ? "border-gold/50 bg-gold/[0.06]"
          : "border-white/[0.06] bg-dark-surface hover:border-white/20"
      }`}
    >
      <p className="text-white/40 text-[11px] tracking-[0.18em] uppercase font-[family-name:var(--font-syne)] font-600">
        {label}
      </p>
      <p className="mt-2 text-3xl font-[family-name:var(--font-syne)] font-700 text-white tabular-nums">
        {value}
      </p>
    </button>
  );
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}
