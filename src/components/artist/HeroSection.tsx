import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center pt-8 pb-6 px-6 overflow-hidden">
      {/* Radial spotlight gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_top,_rgba(212,175,55,0.08)_0%,_transparent_60%)]" />

      {/* Decorative ring behind profile */}
      <div className="relative mb-4">
        <div
          className="absolute -inset-3 rounded-full border border-dashed border-gold/20"
          style={{ animation: "spin-slow 25s linear infinite" }}
        />
        <div
          className="absolute -inset-6 rounded-full border border-gold/5"
          style={{ animation: "spin-slow 40s linear infinite reverse" }}
        />

        {/* Profile image */}
        <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden animate-glow-pulse">
          <Image
            src="/images/banner.png"
            alt="Tiffani D"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Logo text */}
      <div className="relative mb-1">
        <Image
          src="/images/tiffanid-logo.png"
          alt="TIFFANI D"
          width={280}
          height={60}
          className="brightness-0 invert"
          priority
        />
      </div>

      {/* Tagline */}
      <p className="mt-1 text-sm tracking-[0.25em] uppercase text-white/40 font-[family-name:var(--font-dm-sans)] font-300">
        Actor &nbsp;&middot;&nbsp; Rapper &nbsp;&middot;&nbsp; Storyteller
      </p>

      {/* Decorative gold line */}
      <div className="mt-4 w-12 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
    </section>
  );
}
