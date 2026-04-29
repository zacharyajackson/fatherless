import AnimateIn from "@repo/ui/animate-in";
import NewsletterForm from "@repo/ui/newsletter-form";

export default function NewsletterSection() {
  return (
    <section className="bg-htf-bg-subtle">
      <div className="max-w-2xl mx-auto px-6 sm:px-8 py-20 sm:py-28">
        <AnimateIn>
          <div className="flex items-center gap-4 mb-10 sm:mb-14">
            <span className="text-htf-fg-muted text-[10px] tracking-[0.32em] uppercase font-[family-name:var(--font-dm-sans)] font-700">
              Newsletter
            </span>
            <span className="flex-1 h-px bg-htf-border" />
          </div>
        </AnimateIn>

        <div className="grid sm:grid-cols-12 gap-10 sm:gap-12">
          <AnimateIn className="sm:col-span-5">
            <h2 className="font-[family-name:var(--font-fraunces)] text-4xl sm:text-5xl md:text-6xl font-800 leading-[0.95] tracking-[-0.02em] text-htf-fg">
              Stay close to the work.
            </h2>
            <p className="mt-5 text-htf-fg-muted text-[15px] leading-relaxed font-[family-name:var(--font-dm-sans)] max-w-sm">
              New releases, screenings, and what we&apos;re building next — sent only when there&apos;s something to share.
            </p>
          </AnimateIn>

          <AnimateIn delay={120} className="sm:col-span-7">
            <NewsletterForm endpoint="/api/subscribe" theme="light" />
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
