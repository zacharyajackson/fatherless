import HeroSection from "@/components/HeroSection";
import MusicSection from "@/components/MusicSection";
import VideoSection from "@/components/VideoSection";
import BioSection from "@/components/BioSection";
import SocialLinks from "@/components/SocialLinks";
import AnimateIn from "@repo/ui/animate-in";

export default function ArtistPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Tiffani D",
    url: "https://tiffanid.com",
    description: "Actor, rapper, storyteller, and founder of Heal The Fatherless.",
    sameAs: [
      "https://www.instagram.com/theetiffanid/",
      "https://www.youtube.com/c/TIFFANIDent",
      "https://www.facebook.com/theeTIFFANID/",
      "https://x.com/theeTIFFANID",
      "https://open.spotify.com/artist/5I0pzhfzmjvNaYNywD8xgb",
      "https://music.apple.com/us/artist/tiffani-d/1593096776",
    ],
    jobTitle: "Artist",
    knowsAbout: ["Acting", "Rap", "Storytelling", "Filmmaking"],
    image: "https://tiffanid.com/images/og-image.jpg",
    founder: {
      "@type": "Organization",
      name: "Heal The Fatherless",
      url: "https://healthefatherless.com",
    },
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white grain-overlay dark-scroll relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main className="max-w-2xl mx-auto relative z-10">
        <HeroSection />

        {/* Gold divider */}
        <div className="flex items-center justify-center gap-3 px-12">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold/10" />
          <div className="w-1 h-1 rotate-45 bg-gold/30" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold/10" />
        </div>

        <MusicSection />
        <BioSection />
        <VideoSection />
        <SocialLinks />
      </main>

      {/* Footer */}
      <AnimateIn as="footer" className="relative z-10 border-t border-white/[0.04] py-10 text-center">
        <a
          href="https://healthefatherless.com"
          className="group inline-flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-white/20 hover:text-gold/60 text-xs tracking-[0.15em] uppercase transition-colors duration-300"
        >
          <span>Heal The Fatherless</span>
          <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
        <p className="text-white/10 text-[10px] font-[family-name:var(--font-dm-sans)] mt-4 tracking-wider">
          &copy; 2021-2026 TIFFANI D. All Rights Reserved.
        </p>
      </AnimateIn>
    </div>
  );
}
