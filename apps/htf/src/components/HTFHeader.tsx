"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function HTFHeader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show header after scrolling past the hero viewport
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 bg-htf-bg/80 backdrop-blur-xl border-b border-htf-border transition-all duration-500 ${
        visible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0"
      }`}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        <a href="/" className="group flex items-center gap-2 sm:gap-3">
          <Image
            src="/images/htf-hero-logo.jpg"
            alt="Heal The Fatherless"
            width={32}
            height={32}
            className="rounded sm:w-9 sm:h-9"
          />
          <span className="font-[family-name:var(--font-fraunces)] text-htf-fg font-600 text-xs sm:text-sm tracking-wide">
            Heal The Fatherless
          </span>
        </a>

        <a
          href="https://tiffanid.com"
          className="group flex items-center gap-1.5 sm:gap-2 text-htf-fg-subtle hover:text-htf-fg text-[10px] sm:text-xs font-[family-name:var(--font-dm-sans)] tracking-wide transition-colors duration-300"
        >
          <svg className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          <span>Artist Page</span>
        </a>
      </div>
    </header>
  );
}
