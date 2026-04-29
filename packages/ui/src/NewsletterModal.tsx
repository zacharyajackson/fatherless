"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

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

  if (!open || !mounted) return null;

  const isDark = theme === "dark";

  return createPortal(
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
        className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-default"
      />

      <div
        className={`relative w-full max-w-xl rounded-2xl px-8 sm:px-14 pt-14 pb-10 sm:pt-16 sm:pb-14 shadow-2xl max-h-[92vh] overflow-y-auto ${
          isDark
            ? "bg-dark-card border border-white/[0.06] shadow-black/70"
            : "bg-htf-bg border border-htf-border shadow-black/20"
        }`}
        style={{ animation: "scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className={`absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full transition-colors ${
            isDark
              ? "text-white/40 hover:text-white hover:bg-white/[0.06]"
              : "text-htf-fg-muted hover:text-htf-fg hover:bg-htf-bg-muted"
          }`}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>

        <div className="mb-10 sm:mb-12">
          <h2
            className={
              isDark
                ? "font-[family-name:var(--font-syne)] text-4xl sm:text-5xl font-700 tracking-[-0.015em] leading-[1] text-white"
                : "font-[family-name:var(--font-fraunces)] text-4xl sm:text-5xl font-800 leading-[0.98] tracking-[-0.02em] text-htf-fg"
            }
          >
            {title}
          </h2>
          <div
            aria-hidden="true"
            className={
              isDark
                ? "mt-6 w-12 h-px bg-gold"
                : "mt-6 w-12 h-px bg-htf-fg"
            }
          />
          <p
            className={
              isDark
                ? "mt-6 text-white/60 text-[15px] sm:text-base leading-relaxed font-[family-name:var(--font-dm-sans)] max-w-[440px]"
                : "mt-6 text-htf-fg-muted text-[15px] sm:text-base leading-relaxed font-[family-name:var(--font-dm-sans)] max-w-[440px]"
            }
          >
            {subtitle}
          </p>
        </div>

        <NewsletterForm endpoint={endpoint} theme={theme} />
      </div>
    </div>,
    document.body
  );
}
