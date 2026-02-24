import AnimateIn from "@/components/AnimateIn";
import Image from "next/image";

export default function VideoSection() {
  return (
    <section className="py-8 w-full">
      <AnimateIn className="px-6 max-w-xl mx-auto">
        <h2 className="font-[family-name:var(--font-syne)] text-xs font-600 tracking-[0.3em] uppercase text-white/50 text-center mb-5">
          Watch
        </h2>
      </AnimateIn>

      {/* Trailer */}
      <AnimateIn className="px-6 max-w-xl mx-auto mb-4">
        <div className="rounded-2xl overflow-hidden bg-dark-surface">
          <video
            className="w-full aspect-video object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/images/sophia-smiles-poster.jpg"
          >
            <source src="/images/trailer.mp4" type="video/mp4" />
          </video>
        </div>
      </AnimateIn>

      {/* Promo photo + video thumbnails */}
      <div className="px-6 max-w-xl mx-auto">
        <div className="grid grid-cols-2 gap-3">
          {/* Promo photo */}
          <AnimateIn delay={100}>
            <div className="group relative block">
              <div className="aspect-[3/4] rounded-xl overflow-hidden relative">
                <Image
                  src="/images/sophia-smiles-poster.jpg"
                  alt="Tiffani D - Sophia Smiles"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
                  <span className="text-gold/70 text-[8px] tracking-[0.15em] uppercase font-[family-name:var(--font-syne)] font-600">
                    Promo
                  </span>
                  <p className="text-white/80 text-xs font-[family-name:var(--font-syne)] font-500 mt-1 leading-tight">
                    Sophia Smiles
                  </p>
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* YouTube link card */}
          <AnimateIn delay={200}>
            <a
              href="https://www.youtube.com/c/TIFFANIDent"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block"
            >
              <div className="aspect-[3/4] rounded-xl bg-dark-surface overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                <div
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-12 h-12 rounded-full bg-gold/10 backdrop-blur-sm border border-gold/20 flex items-center justify-center group-hover:bg-gold/20 group-hover:scale-110 transition-all duration-300">
                    <svg className="w-5 h-5 text-gold ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
                  <span className="text-gold/70 text-[8px] tracking-[0.15em] uppercase font-[family-name:var(--font-syne)] font-600">
                    YouTube
                  </span>
                  <p className="text-white/80 text-xs font-[family-name:var(--font-syne)] font-500 mt-1 leading-tight">
                    More Videos
                  </p>
                </div>
              </div>
            </a>
          </AnimateIn>
        </div>
      </div>

      {/* Channel link */}
      <AnimateIn delay={300} className="px-6 max-w-xl mx-auto">
        <a
          href="https://www.youtube.com/c/TIFFANIDent"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center justify-center gap-2 text-white/25 hover:text-gold/70 text-[11px] tracking-[0.15em] uppercase font-[family-name:var(--font-dm-sans)] transition-colors duration-300"
        >
          <span>View all on YouTube</span>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </AnimateIn>
    </section>
  );
}
