import type { Metadata } from "next";
import { reader } from "@/lib/keystatic";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Everything you need to know before placing an order — art requirements, minimums, turnaround, proofing, and the full quote process.",
};

export default async function HowItWorksPage() {
  const faqEntries = await reader.collections.faq.all();

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

  return (
    <section className="w-full max-w-400 mx-auto">
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
        Everything you need to know before placing an order — from art
        requirements to payment. Still have questions?{" "}
        <a
          href="/contact"
          className="font-medium text-text-primary hover:underline"
        >
          Just ask.
        </a>
      </p>

      {/* Process steps */}
      <div className="flex flex-col sm:flex-row gap-px bg-border-subtle border border-border-subtle rounded-card overflow-hidden mb-16">
        {[
          {
            step: "01",
            title: "Submit a Quote",
            body: "Tell us about your project — quantity, colors, garment, and timeline. We'll get back to you within 1–2 business days.",
          },
          {
            step: "02",
            title: "Approve the Proof",
            body: "We create a digital mock-up of your design. No printing starts until you give the green light.",
          },
          {
            step: "03",
            title: "Pick Up Your Order",
            body: "Standard turnaround is 7–10 business days from when we receive your blanks.",
          },
        ].map((s) => (
          <div key={s.step} className="flex-1 bg-bg-base p-8 flex flex-col gap-3">
            <span className="text-xl font-mono tracking-widest text-text-muted">
              {s.step}
            </span>
            <h2 className="font-semibold font-display text-[clamp(2rem,8vw,2.75rem)] leading-[0.85] text-text-primary">
              {s.title}
            </h2>
            <p className="text-text-secondary leading-relaxed text-pretty">
              {s.body}
            </p>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="max-w-2xl">
        <h2 className="font-display font-black text-[clamp(3rem,12vw,6rem)] uppercase leading-[0.9] text-text-primary text-balance mb-8">
          Frequently Asked Questions
        </h2>
        <FaqAccordion items={items} />
      </div>
    </section>
  );
}
