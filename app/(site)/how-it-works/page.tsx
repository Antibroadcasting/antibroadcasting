import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { reader } from "@/lib/keystatic";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { Button } from "@/components/ui/Button";
import { RegistrationMark } from "@/components/ui/RegistrationMark";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Everything you need to know before placing an order — Art Requirements, minimums, turnaround, proofing, and the full quote process.",
  alternates: { canonical: `${siteConfig.site.url}/how-it-works` },
  openGraph: {
    title: "How It Works | Antibroadcasting Inc.",
    description:
      "Everything you need to know before placing an order — Art Requirements, minimums, turnaround, proofing, and the full quote process.",
    url: `${siteConfig.site.url}/how-it-works`,
  },
};

export default async function HowItWorksPage() {
  const [faqEntries, artEntries] = await Promise.all([
    reader.collections.faq.all(),
    reader.collections.artRequirements.all(),
  ]);

  const artSections = artEntries
    .map((entry) => ({
      heading: entry.entry.heading,
      items: (entry.entry.items ?? "")
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      order: entry.entry.order ?? 99,
    }))
    .sort((a, b) => a.order - b.order);

  const items = faqEntries
    .map((entry) => ({
      slug: entry.slug,
      question: entry.entry.question,
      answer: entry.entry.answer,
      category: entry.entry.category,
      order: entry.entry.order ?? 99,
    }))
    .sort((a, b) => {
      if (a.category !== b.category)
        return a.category.localeCompare(b.category);
      return a.order - b.order;
    });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="w-full max-w-400 mx-auto">
        {/* ── Page header ──────────────────────────────────────────────── */}
        <header className="my-12 max-w-2xl">
          <span className="inline-block text-xs font-mono font-black tracking-widest uppercase text-text-inverse bg-(--color-secondary-500) px-3 py-1 mb-4">
            How it works
          </span>
          <h1 className="font-display font-black text-[clamp(4.25rem,18vw,8rem)] uppercase leading-[0.85] text-text-primary">
            Our process.
          </h1>
        </header>
        <p className="text-text-secondary mb-12">
          Everything you need to know before placing an order — from{" "}
          <a href="#art-requirements" className="font-black text-text-primary hover:underline">
            Art Requirements
          </a>{" "}
          to{" "}
          <a href="#faq" className="font-black text-text-primary hover:underline">
            FAQs
          </a>
          . Still have questions?{" "}
          <TransitionLink
            href="/contact"
            className="font-black text-text-primary hover:underline"
          >
            Just ask.
          </TransitionLink>
        </p>

        {/* Process steps */}
        <div className="flex flex-col sm:flex-row gap-px bg-border-subtle border border-border-subtle rounded-card overflow-hidden mb-16">
          {[
            {
              step: "01",
              title: "Submit a Quote",
              body: "Tell us about your project — quantity, colors, garment type, and timeline. The more detail you give us, the faster we can turn around an accurate price. We respond to every request within 1–2 business days.",
              tips: [
                `Minimum order is 50 pieces per design`,
                "Not sure on all the details? A rough estimate is enough to get started",
                "Artwork files welcome but not required at this stage",
              ],
            },
            {
              step: "02",
              title: "Approve the Proof",
              body: "We build a digital mock-up of your artwork on the garment. Review it, request changes, and give us the green light. Nothing goes to press until you're satisfied.",
              tips: [
                "Vector files (AI, EPS, PDF) produce the sharpest results",
                "We review your art for print issues before building the proof",
                "Revisions are included — just ask",
              ],
            },
            {
              step: "03",
              title: "Pick Up Your Order",
              body: "Standard turnaround is 7–10 business days after we receive your blanks. You can supply your own garments or we can source them for you — just mention it when you submit your quote.",
              tips: [
                "Pickup at the shop by appointment",
                "We'll reach out as soon as your order is ready",
                "Rush turnaround available on select orders — ask when quoting",
              ],
            },
          ].map((s) => (
            <div
              key={s.step}
              className="flex-1 bg-bg-base p-8 flex flex-col gap-3"
            >
              <span className="text-xl font-mono tracking-widest text-text-muted">
                {s.step}
              </span>
              <h2 className="font-semibold font-display text-[clamp(2rem,4vw,2.5rem)] leading-[0.85] text-text-primary">
                {s.title}
              </h2>
              <p className="text-text-secondary leading-relaxed text-pretty">
                {s.body}
              </p>
              <ul className="mt-1 flex flex-col gap-1.5">
                {s.tips.map((tip) => (
                  <li
                    key={tip}
                    className="flex gap-2.5 items-start text-text-muted text-pretty"
                  >
                    <span
                      className="mt-[0.4rem] shrink-0 w-1 h-1 rounded-full bg-text-muted"
                      aria-hidden="true"
                    />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col xl:flex-row gap-8">
          {/* Art Requirements */}
          <div className="flex-1" id="art-requirements">
            <h2 className="font-display font-black text-[clamp(3rem,10vw,5rem)] uppercase leading-[0.9] text-text-primary text-balance pt-16 mb-8">
              Art Requirements
            </h2>
            <div className="flex flex-col gap-6 p-4">
              {artSections.map((section) => (
                <div key={section.heading}>
                  <h3 className="font-mono font-black tracking-widest uppercase text-text-muted mb-3">
                    {section.heading}
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {section.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-text-secondary leading-relaxed"
                      >
                        <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-text-muted" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="flex-1" id="faq">
            <h2 className="font-display font-black text-[clamp(3rem,10vw,5rem)] uppercase leading-[0.9] text-text-primary text-balance pt-16 mb-8">
              Frequently Asked Questions
            </h2>
            <FaqAccordion items={items} />
          </div>
        </div>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <section className="relative my-8 rounded-card overflow-hidden bg-bg-subtle border border-border-subtle px-8 md:px-12 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <RegistrationMark className="absolute top-6 right-8 w-10 h-10 text-border-default opacity-20" />
          <div>
            <h2 className="font-display font-black uppercase text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-text-base leading-tight">
              Let's Work Together.
            </h2>
            <p className="mt-2 text-text-muted text-sm text-pretty max-w-sm">
              We appreciate your business and look forward to getting your
              artwork onto garments.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Button asChild variant="primary">
              <TransitionLink href="/contact">Get a Quote</TransitionLink>
            </Button>
            <Button asChild variant="outline">
              <TransitionLink href="/portfolio">See Our Work</TransitionLink>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
