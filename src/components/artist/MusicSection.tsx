import AnimateIn from "@/components/AnimateIn";

const platforms = [
  {
    name: "Spotify",
    sub: "Stream all tracks",
    url: "https://open.spotify.com/artist/5I0pzhfzmjvNaYNywD8xgb",
    color: "#1DB954",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
    ),
  },
  {
    name: "Apple Music",
    sub: "Listen now",
    url: "https://music.apple.com/us/artist/tiffani-d/1485498887",
    color: "#FC3C44",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.802.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03c.525 0 1.048-.034 1.57-.1.823-.106 1.597-.35 2.296-.81a5.046 5.046 0 001.88-2.207c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.045-1.773-.6-1.943-1.536a1.88 1.88 0 011.038-2.022c.323-.16.67-.25 1.018-.324.378-.082.758-.153 1.134-.24.274-.063.477-.242.56-.526.023-.076.033-.158.033-.237V9.15c0-.297-.04-.322-.332-.263-.825.166-1.647.338-2.47.507l-3.545.727c-.018.004-.033.013-.05.02-.065.04-.098.097-.098.175-.005.015-.003.032-.003.05v7.47c0 .457-.058.91-.283 1.32-.312.57-.77.933-1.394 1.1-.34.092-.69.14-1.043.155-.96.04-1.78-.614-1.94-1.563a1.88 1.88 0 011.072-2.01c.312-.152.647-.242.99-.313.39-.082.783-.156 1.17-.247.283-.066.49-.24.576-.53.026-.09.038-.19.04-.285V7.563c0-.18.052-.337.194-.458a.81.81 0 01.322-.167l5.817-1.19c.274-.058.55-.107.827-.153.107-.018.16.035.167.143.003.05.002.1.002.152v4.218z" />
      </svg>
    ),
  },
];

export default function MusicSection() {
  return (
    <section className="px-6 py-8 max-w-xl mx-auto w-full">
      <AnimateIn className="flex items-center justify-center gap-3 mb-5">
        {/* Sound bars decoration */}
        <div className="flex items-end gap-[3px] h-7">
          {[0, 0.2, 0.4, 0.2, 0.6].map((d, i) => (
            <div key={i} className="sound-bar" style={{ animationDelay: `${d}s`, height: 12 }} />
          ))}
        </div>
        <h2 className="font-[family-name:var(--font-syne)] text-xs font-600 tracking-[0.3em] uppercase text-white/50">
          Listen
        </h2>
        <div className="flex items-end gap-[3px] h-7">
          {[0.3, 0.1, 0.5, 0.3, 0].map((d, i) => (
            <div key={i} className="sound-bar" style={{ animationDelay: `${d}s`, height: 12 }} />
          ))}
        </div>
      </AnimateIn>

      <div className="space-y-3">
        {platforms.map((p, i) => (
          <AnimateIn key={p.name} delay={i * 120}>
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card flex items-center gap-4 rounded-2xl p-5 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Hover glow effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 20% 50%, ${p.color}10, transparent 70%)`,
                }}
              />

              {/* Left accent bar */}
              <div
                className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                style={{ backgroundColor: p.color }}
              />

              <div
                className="relative w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${p.color}18` }}
              >
                <span style={{ color: p.color }}>{p.icon}</span>
              </div>

              <div className="relative flex-1">
                <p className="text-white/90 font-[family-name:var(--font-syne)] font-600 text-sm tracking-wide group-hover:text-white transition-colors">
                  {p.name}
                </p>
                <p className="text-white/30 text-xs font-[family-name:var(--font-dm-sans)] mt-0.5">
                  {p.sub}
                </p>
              </div>

              <svg
                className="relative w-4 h-4 text-white/15 group-hover:text-gold group-hover:translate-x-1 transition-all duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </AnimateIn>
        ))}
      </div>
    </section>
  );
}
