import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Flyer Hero */}
      <section className="relative">
        <div className="max-w-2xl mx-auto">
          <Image
            src="/images/sophia-smiles-flyer.jpg"
            alt="Sophia Smiles — A Film by Tiffani D"
            width={800}
            height={1100}
            className="w-full h-auto"
            priority
          />
        </div>
      </section>

      {/* Trailer + CTA */}
      <section className="px-6 py-12 max-w-3xl mx-auto">
        <h2 className="font-[family-name:var(--font-fraunces)] text-2xl md:text-3xl font-700 text-center mb-2">
          Watch The Trailer
        </h2>
        <p className="text-white/40 text-sm font-[family-name:var(--font-dm-sans)] text-center mb-8">
          A moving story about the struggles of a single mother
        </p>

        <div className="rounded-2xl overflow-hidden bg-white/5 mb-10">
          <video
            className="w-full aspect-video object-cover"
            controls
            playsInline
            preload="metadata"
          >
            <source src="/images/sophia-smiles-trailer.mp4" type="video/mp4" />
          </video>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/watch"
            className="group inline-flex items-center gap-3 bg-white text-black font-[family-name:var(--font-dm-sans)] font-600 text-base px-10 py-4 rounded-full transition-all duration-300 hover:bg-white/90 shadow-lg shadow-white/10 hover:shadow-xl hover:shadow-white/15"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span>Watch Now</span>
          </Link>
          <p className="mt-4 text-white/30 text-xs font-[family-name:var(--font-dm-sans)]">
            Pay what you want to support the film
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] px-6 py-6 text-center">
        <p className="text-white/20 text-[11px] font-[family-name:var(--font-dm-sans)] tracking-wide">
          &copy; {new Date().getFullYear()} Heal The Fatherless. All rights reserved.
        </p>
        <a
          href="https://tiffanid.com"
          className="inline-block mt-2 text-white/30 hover:text-white/60 text-[11px] font-[family-name:var(--font-dm-sans)] tracking-wide transition-colors"
        >
          Tiffani D Artist Page &rarr;
        </a>
      </footer>
    </div>
  );
}
