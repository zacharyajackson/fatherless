import AnimateIn from "@/components/AnimateIn";
import Image from "next/image";

const youtubeVideos = [
  { id: "_qkuugs4DDA", title: "My Year" },
  { id: "v5NXUgIPpHs", title: "Belly Out" },
  { id: "W8HAXbJJO64", title: "Real Estate" },
];

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

      {/* More Than Music video */}
      <AnimateIn delay={100} className="px-6 max-w-xl mx-auto mb-4">
        <div className="rounded-2xl overflow-hidden bg-dark-surface">
          <video
            className="w-full aspect-video object-cover"
            controls
            playsInline
            preload="metadata"
            poster="/images/more-than-music-poster.jpg"
          >
            <source src="/images/more-than-music.mp4" type="video/mp4" />
          </video>
        </div>
        <p className="text-white/30 text-[10px] tracking-[0.15em] uppercase font-[family-name:var(--font-syne)] font-600 text-center mt-2">
          More Than Music
        </p>
      </AnimateIn>

      {/* YouTube Embeds */}
      <div className="px-6 max-w-xl mx-auto space-y-4">
        {youtubeVideos.map((video, i) => (
          <AnimateIn key={video.id} delay={150 + i * 100}>
            <div className="rounded-2xl overflow-hidden bg-dark-surface">
              <iframe
                className="w-full aspect-video"
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <p className="text-white/30 text-[10px] tracking-[0.15em] uppercase font-[family-name:var(--font-syne)] font-600 text-center mt-2">
              {video.title}
            </p>
          </AnimateIn>
        ))}
      </div>

      {/* Promo photo */}
      <div className="px-6 max-w-xl mx-auto mt-4">
        <AnimateIn delay={450}>
          <div className="group relative block">
            <div className="aspect-[3/4] rounded-xl overflow-hidden relative max-w-[50%]">
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
      </div>

      {/* Channel link */}
      <AnimateIn delay={500} className="px-6 max-w-xl mx-auto">
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
