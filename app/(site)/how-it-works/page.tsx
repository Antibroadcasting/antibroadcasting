import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { getFaq } from "@/lib/get-faq";
import { getArtRequirements } from "@/lib/get-art-requirements";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { RegistrationMark } from "@/components/ui/RegistrationMark";
import { IndexLabel } from "@/components/ui/IndexLabel";
import { PulseDot } from "@/components/ui/PulseDot";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";

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
  const [items, artSections] = await Promise.all([
    getFaq(),
    getArtRequirements(),
  ]);

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
        <section className="pt-10">
          <PageBreadcrumb page="How It Works" />

          <h1 className="font-display font-black uppercase leading-[0.85] text-[clamp(5rem,18vw,12rem)]">
            Our Process<span className="text-gold">.</span>
          </h1>

          {/* Anchor nav */}
          {/* <div className="mt-10 pt-8 border-t border-foreground/10 flex flex-wrap items-center gap-3">
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
          </div> */}
          {/* <p className="mt-10 text-text-secondary leading-relaxed max-w-[60ch]">
            Everything you need to know before placing an order — from{" "}
            <a href="#art-requirements">Art Requirements</a> to{" "}
            <a href="#faq">FAQs</a>. Still have questions? Just ask.
          </p> */}
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <PulseDot />
              <span className="font-mono text-sm uppercase tracking-widest text-text-tertiary">
                Everything you need to know before placing an order — from{" "}
                <a
                  href="#art-requirements"
                  className="font-black hover:underline"
                >
                  Art Requirements
                </a>{" "}
                to{" "}
                <a href="#faq" className="font-black hover:underline">
                  FAQs
                </a>
                . Still have questions?{" "}
                <TransitionLink
                  href="/contact"
                  className="font-black hover:underline"
                >
                  Just ask.
                </TransitionLink>
              </span>
            </div>
            <span className="h-px flex-1 bg-foreground/10 hidden sm:block" />
            <RegistrationMark className="w-5 h-5 text-foreground/20 hidden lg:block" />
          </div>
        </section>

        {/* ── Process steps ───────────────────────────────────────────── */}
        <section
          id="steps"
          aria-labelledby="steps-heading"
          className="py-20 lg:py-28 border-b border-foreground/10"
        >
          <IndexLabel as="p" id="steps-heading" className="mb-16">
            01 / The Steps
          </IndexLabel>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-foreground/10">
            {steps.map((step) => (
              <div
                key={step.n}
                className="bg-background p-8 lg:p-10 flex flex-col gap-6"
              >
                <IndexLabel ariaHidden>Step {step.n}</IndexLabel>

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
            <IndexLabel className="mb-12">02 / Art Requirements</IndexLabel>

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
            <IndexLabel className="mb-12">03 / Frequently Asked</IndexLabel>

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
            Let&apos;s Work
            <br />
            Together.
          </>
        }
        description="We appreciate your business and look forward to getting your artwork onto garments. Reach out and we'll take it from there."
        primaryCta={{ label: "Get a Quote", href: "/contact" }}
        secondaryCta={{ label: "See Our Work", href: "/portfolio" }}
      />
    </>
  );
}
