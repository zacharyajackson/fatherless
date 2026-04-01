"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function HTFHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-htf-bg/80 backdrop-blur-xl border-b border-htf-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-3">
        <a href="/" className="group flex items-center gap-3">
          <Image
            src="/images/htf-hero-logo.jpg"
            alt="Heal The Fatherless"
            width={36}
            height={36}
            className={`rounded transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`}
          />
          <span
            className={`font-[family-name:var(--font-fraunces)] font-600 text-sm tracking-wide hidden sm:block transition-colors duration-500 ${
              scrolled ? "text-htf-fg" : "text-white"
            }`}
          >
            Heal The Fatherless
          </span>
        </a>

        <a
          href="https://tiffanid.com"
          className={`group flex items-center gap-2 text-xs font-[family-name:var(--font-dm-sans)] tracking-wide transition-colors duration-500 ${
            scrolled
              ? "text-htf-fg-subtle hover:text-htf-fg"
              : "text-white/50 hover:text-white"
          }`}
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
