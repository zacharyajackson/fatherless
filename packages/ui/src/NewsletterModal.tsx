"use client";

import { useEffect } from "react";
import NewsletterForm, { type Theme } from "./NewsletterForm";

type Props = {
  open: boolean;
  onClose: () => void;
  endpoint: string;
  theme?: Theme;
  title?: string;
  subtitle?: string;
};

export default function NewsletterModal({
  open,
  onClose,
  endpoint,
  theme = "dark",
  title = "Stay in the loop",
  subtitle = "New music, films, and announcements — only when there's something worth sending.",
}: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const isDark = theme === "dark";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm cursor-default"
      />

      <div
        className={
          isDark
            ? "relative w-full max-w-lg rounded-2xl bg-dark-card border border-white/[0.06] px-7 sm:px-10 pt-12 pb-8 sm:pt-14 sm:pb-10 shadow-2xl shadow-black/70 max-h-[92vh] overflow-y-auto"
            : "relative w-full max-w-lg rounded-2xl bg-htf-bg border border-htf-border px-7 sm:px-10 pt-12 pb-8 sm:pt-14 sm:pb-10 shadow-2xl shadow-black/20 max-h-[92vh] overflow-y-auto"
        }
        style={{ animation: "scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className={
            isDark
              ? "absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-white/[0.06] transition-colors"
              : "absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-htf-fg-muted hover:text-htf-fg hover:bg-htf-bg-muted transition-colors"
          }
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>

        <div className="mb-8">
          <h2
            className={
              isDark
                ? "font-[family-name:var(--font-syne)] text-3xl sm:text-4xl font-700 tracking-[-0.01em] leading-[1.05] text-white"
                : "font-[family-name:var(--font-fraunces)] text-3xl sm:text-4xl font-800 leading-[0.98] tracking-[-0.02em] text-htf-fg"
            }
          >
            {title}
          </h2>
          <div
            aria-hidden="true"
            className={
              isDark
                ? "mt-4 w-10 h-px bg-gradient-to-r from-gold via-gold to-transparent"
                : "mt-4 w-10 h-px bg-htf-fg/40"
            }
          />
          <p
            className={
              isDark
                ? "mt-4 text-white/55 text-[15px] leading-relaxed font-[family-name:var(--font-dm-sans)] max-w-[420px]"
                : "mt-4 text-htf-fg-muted text-[15px] leading-relaxed font-[family-name:var(--font-dm-sans)] max-w-[420px]"
            }
          >
            {subtitle}
          </p>
        </div>

        <NewsletterForm endpoint={endpoint} theme={theme} />
      </div>
    </div>
  );
}
