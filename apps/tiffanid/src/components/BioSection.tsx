import AnimateIn from "@repo/ui/animate-in";

export default function BioSection() {
  return (
    <section className="px-6 py-8 max-w-xl mx-auto w-full">
      <AnimateIn>
        <h2 className="font-[family-name:var(--font-syne)] text-xs font-600 tracking-[0.3em] uppercase text-white/50 text-center mb-5">
          About
        </h2>
      </AnimateIn>

      {/* Pull quote */}
      <AnimateIn delay={100}>
        <blockquote className="relative text-center mb-6 px-4">
          <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-6xl text-gold/15 font-[family-name:var(--font-fraunces)] font-900 leading-none select-none">
            &ldquo;
          </span>
          <p className="font-[family-name:var(--font-fraunces)] text-xl md:text-2xl font-300 italic text-white/70 leading-relaxed">
            I aim to uplift, serving as a voice for the fatherless and
            encouraging others to navigate life&apos;s challenges with faith.
          </p>
          <div className="mt-4 w-8 h-px bg-gold/30 mx-auto" />
        </blockquote>
      </AnimateIn>

      {/* Bio text */}
      <AnimateIn delay={200}>
        <div className="glass-card rounded-2xl p-6 md:p-8">
          <p className="font-[family-name:var(--font-dm-sans)] text-white/50 text-sm leading-[1.8]">
            A versatile artist with a distinct sound, TIFFANI D creates a rich
            musical tapestry designed to inspire. Her empowering lyrics, born
            from a place of resilience, resonate deeply with themes of faith,
            hope, and triumph.
          </p>
        </div>
      </AnimateIn>
    </section>
  );
}
