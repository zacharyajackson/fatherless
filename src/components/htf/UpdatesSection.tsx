import AnimateIn from "@/components/AnimateIn";

const updates = [
  {
    date: "Feb 15, 2026",
    title: "Community Healing Circle — March 2026",
    excerpt:
      "Join us for our monthly healing circle in Charlotte. A safe space to share, reflect, and grow together as a community. Open to all ages.",
    featured: true,
  },
  {
    date: "Jan 28, 2026",
    title: "New Podcast Episode: Finding Your Voice",
    excerpt:
      "Tiffani D sits down with local mentors to discuss the power of storytelling in overcoming the absence of a father figure.",
    featured: false,
  },
  {
    date: "Jan 10, 2026",
    title: "2025 Year in Review",
    excerpt:
      "A look back at everything Heal The Fatherless accomplished — from community events to partnerships and the lives we touched.",
    featured: false,
  },
  {
    date: "Dec 5, 2025",
    title: "Holiday Gift Drive Success",
    excerpt:
      "Thanks to our community, we provided gifts and resources to over 200 families this holiday season.",
    featured: false,
  },
];

export default function UpdatesSection() {
  const [featured, ...rest] = updates;

  return (
    <section id="updates" className="px-6 py-12 max-w-5xl mx-auto">
      <AnimateIn>
        <div className="flex items-center gap-4 mb-14">
          <h2 className="font-[family-name:var(--font-fraunces)] text-2xl md:text-3xl font-700 text-brown whitespace-nowrap">
            Latest Updates
          </h2>
          <div className="flex-1 h-px bg-brown/[0.08]" />
        </div>
      </AnimateIn>

      {/* Featured post */}
      <AnimateIn delay={100}>
        <article className="group relative bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-brown/[0.04] hover:shadow-lg hover:shadow-brown/[0.04] transition-all duration-500 mb-6">
          {/* Accent corner */}
          <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden rounded-tl-3xl">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-htf-gold/10 to-transparent" />
          </div>

          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block px-3 py-1 rounded-full bg-htf-gold/10 text-htf-gold text-[10px] font-[family-name:var(--font-dm-sans)] font-600 tracking-[0.1em] uppercase">
                New
              </span>
              <time className="text-brown-light/40 text-xs font-[family-name:var(--font-dm-sans)]">
                {featured.date}
              </time>
            </div>
            <h3 className="font-[family-name:var(--font-fraunces)] text-xl md:text-2xl font-600 text-brown leading-snug mb-3 group-hover:text-brown-mid transition-colors">
              {featured.title}
            </h3>
            <p className="font-[family-name:var(--font-dm-sans)] text-brown-light/60 text-sm leading-relaxed max-w-2xl">
              {featured.excerpt}
            </p>
            <button className="mt-6 inline-flex items-center gap-2 text-htf-gold hover:text-htf-gold-light text-sm font-[family-name:var(--font-dm-sans)] font-500 transition-colors group/btn">
              <span>Read more</span>
              <svg className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </article>
      </AnimateIn>

      {/* Remaining posts */}
      <div className="grid gap-4 md:grid-cols-3">
        {rest.map((update, index) => (
          <AnimateIn key={index} delay={200 + index * 100}>
            <article className="group bg-white rounded-2xl p-6 shadow-sm border border-brown/[0.04] hover:shadow-md hover:shadow-brown/[0.04] transition-all duration-400 h-full flex flex-col">
              <time className="text-brown-light/35 text-[11px] font-[family-name:var(--font-dm-sans)] tracking-wide">
                {update.date}
              </time>
              <h3 className="font-[family-name:var(--font-fraunces)] text-base font-600 text-brown leading-snug mt-2 mb-3 group-hover:text-brown-mid transition-colors">
                {update.title}
              </h3>
              <p className="font-[family-name:var(--font-dm-sans)] text-brown-light/50 text-[13px] leading-relaxed flex-1">
                {update.excerpt}
              </p>
              <button className="mt-4 text-htf-gold text-[13px] font-[family-name:var(--font-dm-sans)] font-500 self-start hover:text-htf-gold-light transition-colors">
                Read more &rarr;
              </button>
            </article>
          </AnimateIn>
        ))}
      </div>
    </section>
  );
}
