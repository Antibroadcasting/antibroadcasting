import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { getSiteInfo } from "@/lib/get-site-info";
import { reader } from "@/lib/keystatic";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { RegistrationMark } from "@/components/ui/RegistrationMark";
import { CtaBand } from "@/components/ui/CtaBand";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Everything you need to know before placing an order — art requirements, minimums, turnaround, proofing, and the full quote process.",
  alternates: { canonical: `${siteConfig.site.url}/how-it-works` },
  openGraph: {
    title: "How It Works | Antibroadcasting Inc.",
    description:
      "Everything you need to know before placing an order — art requirements, minimums, turnaround, proofing, and the full quote process.",
    url: `${siteConfig.site.url}/how-it-works`,
  },
};

const steps = [
  {
    n: "01",
    title: "Submit a Quote",
    body: "Tell us about your project — quantity, colors, garment type, and timeline. The more detail you give us, the faster we can turn around an accurate price. We respond to every request within 1–2 business days.",
    tips: [
      "Minimum order is 50 pieces per design",
      "Not sure on all the details? A rough estimate is enough to get started",
      "Artwork files welcome but not required at this stage",
    ],
  },
  {
    n: "02",
    title: "Approve the Proof",
    body: "We build a digital mock-up of your artwork on the garment. Review it, request changes, and give us the green light. Nothing goes to press until you're satisfied.",
    tips: [
      "Vector files (AI, EPS, PDF) produce the sharpest results",
      "We review your art for print issues before building the proof",
      "Revisions are included — just ask",
    ],
  },
  {
    n: "03",
    title: "Pick Up Your Order",
    body: "Standard turnaround is 7–10 business days after we receive your blanks. You can supply your own garments or we can source them for you — just mention it when you submit your quote.",
    tips: [
      "Pickup at the shop by appointment",
      "We'll reach out as soon as your order is ready",
      "Rush turnaround available on select orders — ask when quoting",
    ],
  },
];

export default async function HowItWorksPage() {
  const [faqEntries, artEntries, siteInfo] = await Promise.all([
    reader.collections.faq.all(),
    reader.collections.artRequirements.all(),
    getSiteInfo(),
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

      <div className="w-full max-w-300 xl:max-w-360 2xl:max-w-400 mx-auto">
        {/* ── Hero ────────────────────────────────────────────────────── */}
        <section className="pt-10 pb-16 border-b border-foreground/10">
          {/* Meta row */}
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-xs uppercase tracking-widest text-text-tertiary">
              Est. 2005 {siteInfo.contact.address.city}{" "}
              {siteInfo.contact.address.state} · Artist-Run
            </span>
            <span className="h-px w-16 bg-gold hidden sm:block" />
          </div>

          <h1 className="font-display font-black uppercase leading-[0.85] text-[clamp(5rem,18vw,12rem)]">
            Our Process<span className="text-gold">.</span>
          </h1>

          {/* Anchor nav */}
          <div className="mt-10 pt-8 border-t border-foreground/10 flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-text-tertiary shrink-0 mr-2">
              On This Page
            </span>
            {[
              { label: "The Steps", href: "#steps" },
              { label: "Art Requirements", href: "#art-requirements" },
              { label: "FAQs", href: "#faq" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-2 px-4 py-1.5 font-mono text-xs uppercase tracking-widest border border-foreground/20 text-text-secondary hover:border-gold hover:text-text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
            <span className="ml-auto hidden lg:block">
              <RegistrationMark className="w-5 h-5 text-foreground/20" />
            </span>
          </div>
        </section>

        {/* ── Process steps ───────────────────────────────────────────── */}
        <section
          id="steps"
          aria-labelledby="steps-heading"
          className="py-20 lg:py-28 border-b border-foreground/10"
        >
          {/* Section label — visual eyebrow only; aria-labelledby works with <p> */}
          <div className="flex items-center gap-3 mb-16">
            <p
              id="steps-heading"
              className="font-mono text-xs uppercase tracking-widest text-text-accent shrink-0"
            >
              01 / The Steps
            </p>
            <span className="flex-1 h-px bg-gold/30" aria-hidden="true" />
            <RegistrationMark
              className="w-4 h-4 text-text-accent shrink-0"
              aria-hidden="true"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-foreground/10">
            {steps.map((step) => (
              <div
                key={step.n}
                className="bg-background p-8 lg:p-10 flex flex-col gap-6"
              >
                {/* Step header */}
                <div className="flex items-center gap-3" aria-hidden="true">
                  <span className="font-mono text-xs uppercase tracking-widest text-text-accent shrink-0">
                    Step {step.n}
                  </span>
                  <span className="flex-1 h-px bg-gold/30" />
                  <RegistrationMark className="w-4 h-4 text-text-accent shrink-0" />
                </div>

                <h2 className="font-display font-black uppercase text-[clamp(2rem,3.5vw,3rem)] leading-[0.9] text-text-primary">
                  {step.title}
                  <span className="text-gold">.</span>
                </h2>

                <p className="text-text-secondary leading-relaxed text-pretty">
                  {step.body}
                </p>

                {/* Tips */}
                <ul className="flex flex-col gap-2 pt-2 border-t border-foreground/10">
                  {step.tips.map((tip) => (
                    <li
                      key={tip}
                      className="flex gap-3 items-start text-sm text-text-tertiary leading-relaxed"
                    >
                      <span
                        aria-hidden="true"
                        className="font-mono text-text-accent shrink-0 mt-0.5"
                      >
                        —
                      </span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── Art Requirements + FAQ ───────────────────────────────────── */}
        <div className="flex flex-col xl:flex-row gap-16 xl:gap-24 py-20 lg:py-28">
          {/* Art Requirements */}
          <div className="flex-1" id="art-requirements">
            {/* Section label */}
            <div className="flex items-center gap-3 mb-12">
              <span className="font-mono text-xs uppercase tracking-widest text-text-accent shrink-0">
                02 / Art Requirements
              </span>
              <span className="flex-1 h-px bg-gold/30" />
              <RegistrationMark className="w-4 h-4 text-text-accent shrink-0" />
            </div>

            <h2 className="font-display font-black uppercase text-[clamp(3rem,8vw,5rem)] leading-[0.9] text-text-primary mb-12">
              Art Requirements<span className="text-gold">.</span>
            </h2>

            <div className="flex flex-col gap-8">
              {artSections.map((section) => (
                <div key={section.heading}>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-text-tertiary mb-4 pb-3 border-b border-foreground/10">
                    {section.heading}
                  </h3>
                  <ul className="flex flex-col gap-2.5">
                    {section.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 items-start text-sm text-text-secondary leading-relaxed"
                      >
                        <span
                          aria-hidden="true"
                          className="font-mono text-text-accent shrink-0 mt-0.5"
                        >
                          —
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Still have questions nudge */}
            <p className="mt-12 font-mono text-xs uppercase tracking-widest text-text-tertiary">
              Still have questions?{" "}
              <TransitionLink
                href="/contact"
                className="text-text-accent hover:text-text-primary transition-colors"
              >
                Just ask →
              </TransitionLink>
            </p>
          </div>

          {/* FAQ */}
          <div className="flex-1" id="faq">
            {/* Section label */}
            <div className="flex items-center gap-3 mb-12">
              <span className="font-mono text-xs uppercase tracking-widest text-text-accent shrink-0">
                03 / Frequently Asked
              </span>
              <span className="flex-1 h-px bg-gold/30" />
              <RegistrationMark className="w-4 h-4 text-text-accent shrink-0" />
            </div>

            <h2 className="font-display font-black uppercase text-[clamp(3rem,8vw,5rem)] leading-[0.9] text-text-primary mb-12">
              Frequently Asked<span className="text-gold">.</span>
            </h2>

            <FaqAccordion items={items} />
          </div>
        </div>
      </div>

      {/* ── CTA — full-bleed ──────────────────────────────────────────── */}
      <CtaBand
        heading={
          <>
            Let's Work
            <br />
            Together.
          </>
        }
        description="We appreciate your business and look forward to getting your artwork onto garments. Reach out and we'll take it from there."
        primaryCta={{ label: "Get a Quote", href: "/contact" }}
        secondaryCta={{ label: "See Our Work", href: "/portfolio" }}
        broadsideNo="017"
      />
    </>
  );
}
