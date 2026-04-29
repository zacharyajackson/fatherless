"use client";

import { useState, type FormEvent } from "react";

type Interest = "artist" | "film" | "fan";

const INTERESTS: { value: Interest; label: string }[] = [
  { value: "artist", label: "Artist" },
  { value: "film", label: "Film Enthusiast" },
  { value: "fan", label: "Fan of Tiffani D" },
];

export type Theme = "dark" | "light";

const themes = {
  dark: {
    label:
      "block text-white/55 text-[11px] tracking-[0.28em] uppercase font-[family-name:var(--font-syne)] font-600 mb-3.5",
    optional:
      "ml-2 normal-case tracking-normal text-white/30 text-[11px] font-[family-name:var(--font-dm-sans)] font-400 italic",
    input:
      "w-full bg-white/[0.02] hover:bg-white/[0.035] focus:bg-white/[0.04] border border-white/[0.08] focus:border-gold/60 rounded-xl px-5 py-4 text-white text-base placeholder-white/25 focus:outline-none focus:shadow-[0_0_0_3px_rgba(212,175,55,0.08)] transition-all font-[family-name:var(--font-dm-sans)]",
    chip:
      "px-5 py-2.5 rounded-full text-sm font-[family-name:var(--font-dm-sans)] font-500 border transition-all",
    chipIdle:
      "bg-transparent text-white/55 border-white/15 hover:border-white/35 hover:text-white/85",
    chipActive:
      "bg-gold text-black border-gold shadow-[0_0_0_4px_rgba(212,175,55,0.12)]",
    button:
      "group relative w-full bg-gold hover:bg-gold-light text-black font-[family-name:var(--font-syne)] font-700 text-[13px] tracking-[0.28em] uppercase py-4 rounded-full transition-all hover:shadow-[0_10px_40px_-10px_rgba(212,175,55,0.7)] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none",
    buttonText: "Subscribe",
    helper:
      "text-white/30 text-[11px] leading-relaxed font-[family-name:var(--font-dm-sans)] text-center",
    successTitle:
      "font-[family-name:var(--font-syne)] font-700 text-2xl tracking-[0.02em] text-white",
    successBody:
      "text-white/55 text-sm font-[family-name:var(--font-dm-sans)] mt-2 max-w-[280px]",
    successRule: "w-12 h-px bg-gold/60 mt-5",
    error:
      "text-red-300/90 text-xs font-[family-name:var(--font-dm-sans)] flex items-center gap-2",
    sectionRule: "h-px bg-white/[0.07]",
    sectionEyebrow:
      "text-white/35 text-[10px] tracking-[0.28em] uppercase font-[family-name:var(--font-syne)] font-600",
  },
  light: {
    label:
      "block text-htf-fg text-[11px] tracking-[0.28em] uppercase font-[family-name:var(--font-dm-sans)] font-700 mb-3.5",
    optional:
      "ml-2 normal-case tracking-normal text-htf-fg-subtle text-[11px] font-[family-name:var(--font-dm-sans)] font-400 italic",
    input:
      "w-full bg-white hover:bg-white border border-htf-border focus:border-htf-accent rounded-xl px-5 py-4 text-htf-fg text-base placeholder-htf-fg-subtle/70 focus:outline-none focus:shadow-[0_0_0_3px_rgba(23,23,23,0.06)] transition-all font-[family-name:var(--font-dm-sans)]",
    chip:
      "px-5 py-2.5 rounded-full text-sm font-[family-name:var(--font-dm-sans)] font-500 border transition-all",
    chipIdle:
      "bg-transparent text-htf-fg-muted border-htf-border-strong hover:border-htf-fg hover:text-htf-fg",
    chipActive:
      "bg-htf-accent text-white border-htf-accent shadow-[0_4px_18px_-6px_rgba(0,0,0,0.4)]",
    button:
      "group relative w-full bg-htf-accent hover:bg-htf-accent-hover text-white font-[family-name:var(--font-dm-sans)] font-600 text-base py-4 rounded-full transition-all hover:shadow-[0_12px_36px_-12px_rgba(0,0,0,0.5)] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none",
    buttonText: "Subscribe",
    helper:
      "text-htf-fg-subtle text-[11px] leading-relaxed font-[family-name:var(--font-dm-sans)] text-center",
    successTitle:
      "font-[family-name:var(--font-fraunces)] font-800 text-3xl text-htf-fg",
    successBody:
      "text-htf-fg-muted text-sm font-[family-name:var(--font-dm-sans)] mt-2 max-w-[300px]",
    successRule: "w-12 h-px bg-htf-fg/40 mt-5",
    error:
      "text-red-700/90 text-xs font-[family-name:var(--font-dm-sans)] flex items-center gap-2",
    sectionRule: "h-px bg-htf-border",
    sectionEyebrow:
      "text-htf-fg-muted text-[10px] tracking-[0.28em] uppercase font-[family-name:var(--font-dm-sans)] font-700",
  },
} as const;

type Props = {
  endpoint: string;
  theme: Theme;
  onSuccess?: () => void;
};

function AlertIcon() {
  return (
    <svg className="w-3.5 h-3.5 flex-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" d="M12 8v5M12 16h.01" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
      <path d="M21 12a9 9 0 00-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function NewsletterForm({ endpoint, theme, onSuccess }: Props) {
  const t = themes[theme];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interests, setInterests] = useState<Interest[]>([]);
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function toggleInterest(v: Interest) {
    setInterests((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, interests, website }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setStatus("error");
        setErrorMsg(data?.error || "Something went wrong");
        return;
      }

      setStatus("done");
      onSuccess?.();
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Try again.");
    }
  }

  if (status === "done") {
    return (
      <div
        className="flex flex-col items-center text-center py-8"
        style={{ animation: "fade-in 0.6s ease forwards" }}
      >
        <h3 className={t.successTitle}>You&apos;re in.</h3>
        <p className={t.successBody}>
          Thanks for subscribing. Watch your inbox for what comes next.
        </p>
        <div className={t.successRule} />
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-9" noValidate>
      {/* Honeypot — hidden from real users */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}>
        <label>
          Website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </label>
      </div>

      <div className="space-y-7">
        <div>
          <label htmlFor="nl-name" className={t.label}>
            Name
          </label>
          <input
            id="nl-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={t.input}
            placeholder="Your name"
            maxLength={120}
          />
        </div>

        <div>
          <label htmlFor="nl-email" className={t.label}>
            Email
          </label>
          <input
            id="nl-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={t.input}
            placeholder="you@example.com"
            maxLength={254}
          />
        </div>

        <div>
          <label htmlFor="nl-phone" className={t.label}>
            Phone<span className={t.optional}>optional</span>
          </label>
          <input
            id="nl-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={t.input}
            placeholder="(555) 123-4567"
            maxLength={40}
          />
        </div>
      </div>

      <div className={t.sectionRule} />

      <fieldset>
        <legend className={t.label}>What brings you here</legend>
        <div className="flex flex-wrap gap-2.5">
          {INTERESTS.map((i) => {
            const active = interests.includes(i.value);
            return (
              <button
                key={i.value}
                type="button"
                onClick={() => toggleInterest(i.value)}
                aria-pressed={active}
                className={`${t.chip} ${active ? t.chipActive : t.chipIdle}`}
              >
                {i.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      {status === "error" && errorMsg && (
        <p className={t.error} role="alert">
          <AlertIcon />
          <span>{errorMsg}</span>
        </p>
      )}

      <div className="space-y-3">
        <button type="submit" disabled={status === "submitting"} className={t.button}>
          <span className="inline-flex items-center justify-center gap-2.5">
            {status === "submitting" ? (
              <>
                <Spinner />
                <span>Subscribing</span>
              </>
            ) : (
              <span>{t.buttonText}</span>
            )}
          </span>
        </button>

        <p className={t.helper}>
          We&apos;ll only email you about new releases, screenings, and announcements.
        </p>
      </div>
    </form>
  );
}
