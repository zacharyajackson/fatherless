import Image from "next/image";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden px-6 py-14 md:py-20">
      {/* Background organic shapes */}
      <div
        className="absolute top-10 -right-20 w-64 h-64 rounded-full opacity-30 blur-3xl organic-blob"
        style={{ background: "radial-gradient(circle, #00000008, transparent)" }}
      />
      <div
        className="absolute -bottom-10 -left-20 w-80 h-80 rounded-full opacity-20 blur-3xl organic-blob"
        style={{
          background: "radial-gradient(circle, #00000006, transparent)",
          animationDelay: "3s",
        }}
      />

      <div className="max-w-2xl mx-auto text-center relative z-10">
        {/* Logo */}
        <div className="mb-6">
          <Image
            src="/images/htf-logo.png"
            alt="Heal The Fatherless"
            width={100}
            height={100}
            className="rounded-full mx-auto shadow-lg shadow-black/5 grayscale contrast-125"
          />
        </div>

        {/* Decorative overline */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-8 h-px bg-htf-fg-subtle/40" />
          <span className="text-htf-fg-muted text-[10px] tracking-[0.3em] uppercase font-[family-name:var(--font-dm-sans)] font-500">
            Community &middot; Healing &middot; Empowerment
          </span>
          <div className="w-8 h-px bg-htf-fg-subtle/40" />
        </div>

        {/* Heading */}
        <h1 className="font-[family-name:var(--font-fraunces)] text-5xl md:text-6xl lg:text-7xl font-800 text-htf-fg leading-[1.1] tracking-tight">
          Healing{" "}
          <span className="relative inline-block">
            Starts
            <svg
              className="absolute -bottom-2 left-0 w-full h-3 text-htf-fg/20"
              viewBox="0 0 200 12"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M2 8c30-5 60-3 90-4s70 2 106-2"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>{" "}
          Here
        </h1>

        {/* Subheading */}
        <p className="mt-8 font-[family-name:var(--font-dm-sans)] text-htf-fg-muted text-base md:text-lg leading-relaxed max-w-lg mx-auto">
          Empowering individuals impacted by fatherlessness through community,
          creativity, and connection. Because every story deserves to be heard.
        </p>

        {/* CTA */}
        <div className="mt-10">
          <a
            href="#updates"
            className="group inline-flex items-center gap-2 bg-htf-accent hover:bg-htf-accent-hover text-white font-[family-name:var(--font-dm-sans)] font-500 text-sm px-7 py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/15"
          >
            <span>See Latest Updates</span>
            <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
