import AnimateIn from "@/components/AnimateIn";

const products = [
  {
    title: "HTF Logo Tee",
    category: "Merch",
    price: "$35",
    gradient: "from-[#E8D5B5] to-[#F5E6C8]",
  },
  {
    title: "Healing Journal",
    category: "Resources",
    price: "$18",
    gradient: "from-[#D4C5A9] to-[#E8DCC4]",
  },
  {
    title: '"Fatherless" EP',
    category: "Music",
    price: "$9.99",
    gradient: "from-[#C8B896] to-[#DDD0BA]",
  },
  {
    title: "HTF Hoodie",
    category: "Merch",
    price: "$55",
    gradient: "from-[#E0D0B0] to-[#F0E4CE]",
  },
  {
    title: "Mentor Guide",
    category: "Resources",
    price: "$22",
    gradient: "from-[#D8C8A8] to-[#EAE0CA]",
  },
  {
    title: "Community Cap",
    category: "Merch",
    price: "$28",
    gradient: "from-[#E4D4B4] to-[#F2E8D2]",
  },
];

export default function ProductsSection() {
  return (
    <section className="relative px-6 py-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream to-cream-warm" />
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, #623914 0.5px, transparent 0)",
        backgroundSize: "24px 24px",
      }} />

      <div className="max-w-5xl mx-auto relative z-10">
        <AnimateIn>
          <div className="flex items-center gap-4 mb-14">
            <h2 className="font-[family-name:var(--font-fraunces)] text-2xl md:text-3xl font-700 text-brown whitespace-nowrap">
              Shop &amp; Support
            </h2>
            <div className="flex-1 h-px bg-brown/[0.08]" />
          </div>
        </AnimateIn>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {products.map((product, i) => (
            <AnimateIn key={i} delay={i * 80}>
              <div className="group cursor-pointer">
                {/* Image area */}
                <div className={`aspect-[4/5] rounded-2xl bg-gradient-to-br ${product.gradient} overflow-hidden relative mb-4`}>
                  {/* Subtle pattern overlay */}
                  <div className="absolute inset-0 opacity-[0.04]" style={{
                    backgroundImage: "linear-gradient(45deg, #623914 25%, transparent 25%, transparent 75%, #623914 75%)",
                    backgroundSize: "4px 4px",
                  }} />

                  {/* Center icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-2xl bg-white/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-white/40 transition-all duration-500">
                      <svg
                        className="w-6 h-6 text-brown/30 group-hover:text-brown/50 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                  </div>

                  {/* Category pill */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-2.5 py-1 rounded-full bg-white/50 backdrop-blur-sm text-brown/60 text-[9px] font-[family-name:var(--font-dm-sans)] font-600 tracking-[0.1em] uppercase">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Text */}
                <h3 className="font-[family-name:var(--font-dm-sans)] text-sm font-500 text-brown group-hover:text-brown-mid transition-colors">
                  {product.title}
                </h3>
                <p className="font-[family-name:var(--font-dm-sans)] text-brown-light/50 text-sm mt-0.5">
                  {product.price}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
