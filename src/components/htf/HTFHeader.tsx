import Link from "next/link";
import Image from "next/image";

export default function HTFHeader() {
  return (
    <header className="sticky top-0 z-40 bg-cream/80 backdrop-blur-xl border-b border-brown/[0.06]">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-3">
        <Link href="/htf" className="group flex items-center gap-3">
          <Image
            src="/images/htf-logo.jpeg"
            alt="Heal The Fatherless"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="font-[family-name:var(--font-fraunces)] text-brown font-600 text-sm tracking-wide hidden sm:block">
            Heal The Fatherless
          </span>
        </Link>

        <Link
          href="/"
          className="group flex items-center gap-2 text-brown-light/50 hover:text-brown text-xs font-[family-name:var(--font-dm-sans)] tracking-wide transition-colors duration-300"
        >
          <svg className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          <span>Artist Page</span>
        </Link>
      </div>
    </header>
  );
}
