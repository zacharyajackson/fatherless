import AnimateIn from "@repo/ui/animate-in";
import NewsletterForm from "@repo/ui/newsletter-form";

export default function NewsletterSection() {
  return (
    <section className="bg-htf-bg-subtle">
      <div className="max-w-3xl mx-auto px-6 sm:px-10 py-24 sm:py-32 md:py-40">
        <AnimateIn>
          <div className="flex items-center gap-5 mb-16 sm:mb-20">
            <span className="flex-1 h-px bg-htf-border" />
            <span className="text-htf-fg-muted text-[10px] tracking-[0.32em] uppercase font-[family-name:var(--font-dm-sans)] font-700">
              Newsletter
            </span>
            <span className="flex-1 h-px bg-htf-border" />
          </div>
        </AnimateIn>

        <AnimateIn>
          <h2 className="font-[family-name:var(--font-fraunces)] text-5xl sm:text-6xl md:text-7xl font-800 leading-[0.95] tracking-[-0.025em] text-htf-fg text-center max-w-[14ch] mx-auto">
            Stay close to the work.
          </h2>
          <p className="mt-8 text-htf-fg-muted text-base sm:text-lg leading-relaxed font-[family-name:var(--font-dm-sans)] max-w-md mx-auto text-center">
            New releases, screenings, and what we&apos;re building next — sent only when there&apos;s something to share.
          </p>
        </AnimateIn>

        <AnimateIn delay={120}>
          <div className="mt-16 sm:mt-20 max-w-md mx-auto">
            <NewsletterForm endpoint="/api/subscribe" theme="light" />
          </div>
        </AnimateIn>

        <AnimateIn delay={240}>
          <div className="mt-20 sm:mt-24 flex justify-center">
            <span className="w-12 h-px bg-htf-border-strong" />
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
