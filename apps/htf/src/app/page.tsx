import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: "Sophia Smiles",
    description:
      "A moving story about the struggles of a single mother.",
    director: { "@type": "Person", name: "Tiffani D", url: "https://tiffanid.com" },
    productionCompany: {
      "@type": "Organization",
      name: "Heal The Fatherless",
      url: "https://healthefatherless.com",
    },
    url: "https://healthefatherless.com",
    image: "https://healthefatherless.com/images/og-image.jpg",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HTF Hero Logo — Full Viewport */}
      <section className="h-[100dvh] bg-black flex flex-col items-center justify-center relative overflow-hidden">
        {/* Subtle radial glow behind logo */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_0%,_transparent_60%)]" />

        <div className="relative px-6">
          <Image
            src="/images/htf-hero-logo.jpg"
            alt="HTF — Heal The Fatherless"
            width={800}
            height={800}
            className="w-[85vw] max-w-[600px] h-auto"
            style={{ animation: "scale-in 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards, subtle-pulse 4s ease-in-out 2s infinite" }}
            priority
          />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 sm:bottom-10 animate-float flex flex-col items-center gap-3">
          <span className="text-white text-xs sm:text-sm font-[family-name:var(--font-dm-sans)] font-500 tracking-[0.25em] uppercase">
            Scroll Down
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-white to-white/20 animate-fade-in" />
        </div>
      </section>

      {/* Flyer */}
      <section className="bg-black">
        <div className="max-w-2xl mx-auto px-4 sm:px-0">
          <Image
            src="/images/sophia-smiles-flyer.jpg"
            alt="Sophia Smiles — A Film by Tiffani D"
            width={800}
            height={1100}
            className="w-full h-auto"
          />
        </div>
      </section>

      {/* Trailer + CTA */}
      <section className="px-4 sm:px-6 py-10 sm:py-16 max-w-3xl mx-auto">
        <h2 className="font-[family-name:var(--font-fraunces)] text-2xl sm:text-3xl md:text-4xl font-800 text-center text-htf-fg mb-2">
          Watch The Trailer
        </h2>
        <p className="text-htf-fg-muted text-xs sm:text-sm font-[family-name:var(--font-dm-sans)] text-center mb-6 sm:mb-10">
          A moving story about the struggles of a single mother
        </p>

        <div className="rounded-xl sm:rounded-2xl overflow-hidden bg-htf-bg-muted mb-8 sm:mb-12 shadow-xl shadow-black/5">
          <video
            className="w-full aspect-video object-cover"
            controls
            playsInline
            preload="metadata"
            poster="/images/trailer-poster.jpg"
          >
            <source src="/images/sophia-smiles-trailer.mp4" type="video/mp4" />
          </video>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/watch"
            className="group inline-flex items-center gap-2.5 sm:gap-3 bg-htf-accent hover:bg-htf-accent-hover text-white font-[family-name:var(--font-dm-sans)] font-600 text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-5 rounded-full transition-all duration-300 shadow-xl shadow-black/15 hover:shadow-2xl hover:shadow-black/20 hover:scale-[1.02] w-full sm:w-auto justify-center"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span>Watch Now</span>
          </Link>
          <p className="mt-4 sm:mt-5 text-htf-fg-subtle text-xs sm:text-sm font-[family-name:var(--font-dm-sans)]">
            Pay what you want to support the film
          </p>
        </div>
      </section>
    </>
  );
}
