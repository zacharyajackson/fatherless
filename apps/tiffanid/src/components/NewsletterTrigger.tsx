"use client";

import { useState } from "react";
import NewsletterModal from "@repo/ui/newsletter-modal";

export default function NewsletterTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gold/25 hover:border-gold/60 bg-gold/[0.04] hover:bg-gold/[0.08] text-gold/80 hover:text-gold text-[11px] tracking-[0.25em] uppercase font-[family-name:var(--font-syne)] font-600 transition-all duration-300"
      >
        <svg className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <span>Newsletter</span>
      </button>

      <NewsletterModal
        open={open}
        onClose={() => setOpen(false)}
        endpoint="/api/subscribe"
        theme="dark"
        title="Newsletter"
        subtitle="Subscribe for new music, films, and announcements."
      />
    </>
  );
}
