import Link from "next/link";
import Image from "next/image";
import { reader } from "@/lib/keystatic";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/Button";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { GalleryGrid } from "@/components/ui/GalleryGrid";

// ─── Data ─────────────────────────────────────────────────────────────────────

async function getFeaturedWork() {
  const entries = await reader.collections.gallery.all();
  return entries
    .filter((e) => e.entry.featured)
    .map((e) => ({
      slug: e.slug,
      title: e.entry.title,
      client: e.entry.client,
      category: e.entry.category ?? "",
      image: e.entry.image,
      description: e.entry.description ?? null,
      featured: e.entry.featured,
      colors: e.entry.colors,
      year: e.entry.year,
    }));
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function RegistrationMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden className={className}>
      <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" />
      <circle cx="20" cy="20" r="3" fill="currentColor" />
      <line
        x1="20"
        y1="2"
        x2="20"
        y2="38"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x1="2"
        y1="20"
        x2="38"
        y2="20"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function Hero() {
  return (
    <section className="relative flex flex-col justify-center min-h-[calc(100svh-4.5rem)] py-12 overflow-hidden">
      {/* Decorative registration marks */}
      <RegistrationMark className="absolute top-8 right-8 w-10 h-10 text-border-default opacity-80" />
      <RegistrationMark className="absolute bottom-8 left-0 w-6 h-6 text-border-default opacity-80" />

      <div className="z-20 xl:px-12">

        {/* Location badge */}
        <div className="flex items-center gap-2 mb-8">
          <span className="text-xs font-mono tracking-widest uppercase text-text-muted border border-border-default rounded-full px-3 py-1">
            {/* {siteConfig.contact.location} */}
            Currently accepting orders for Fall 2026
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display font-black uppercase leading-[0.85] tracking-tight text-text-primary">
          <span className="block text-[clamp(5rem,18vw,8rem)]">Custom</span>
          <span className="block text-[clamp(5rem,18vw,8rem)] text-[--color-primary-500]">
            Screen
          </span>
          <span className="block text-[clamp(5rem,18vw,8rem)]">Printing.</span>
        </h1>

        {/* Sub-headline */}
        <p className="mt-6 max-w-md text-text-secondary leading-relaxed">
          {siteConfig.company.nickname} is an artist-run shop in Minneapolis. We
          print for bands, artists, events, and our community.{" "}
          {siteConfig.company.tagline}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 mt-8">
          <Button asChild variant="primary" size="md">
            <TransitionLink href="/contact">Get a Quote</TransitionLink>
          </Button>
          <Button asChild variant="outline" size="md">
            <TransitionLink href="/portfolio">See Our Work</TransitionLink>
          </Button>
        </div>
      </div>

      <div className="hidden lg:block bg-bg-accent w-full max-w-1/2 aspect-3/4 absolute top-0 right-0 z-0">
        <Image
          src="/images/hero-img02.jpg"
          alt="Screen printing work by Anti-Broadcasting"
          fill
          priority
          className="object-cover mix-blend-difference"
          sizes="50vw"
        />
      </div>

      {/* Trust strip */}
      <div className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-border-subtle">
        {[
          { value: `${siteConfig.business.minimumOrder}pc`, label: "Minimum" },
          {
            value: siteConfig.business.turnaroundDays,
            label: "Day Turnaround",
          },
          { value: `${siteConfig.business.maxColors}`, label: "Color Max" },
        ].map((stat) => (
          <div key={stat.label}>
            <span className="block text-2xl font-display font-black text-text-primary">
              {stat.value}
            </span>
            <span className="block text-xs font-mono uppercase tracking-widest text-text-muted mt-0.5">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProcessStrip() {
  const steps = [
    {
      n: "01",
      title: "Submit a Quote",
      body: "Tell us your quantity, colors, garment, and timeline. We'll respond within 1–2 business days.",
    },
    {
      n: "02",
      title: "Approve the Proof",
      body: "We build a digital mock-up. Nothing goes to print until you give the green light.",
    },
    {
      n: "03",
      title: "Pick Up Your Order",
      body: "Standard turnaround is 7–10 business days from when we receive your blanks.",
    },
  ];

  return (
    <section className="py-16 border-t border-border-subtle">
      <div className="flex flex-col sm:flex-row gap-px bg-border-subtle border border-border-subtle rounded-card overflow-hidden">
        {steps.map((step) => (
          <div
            key={step.n}
            className="flex-1 bg-bg-base p-8 flex flex-col gap-3"
          >
            <span className="text-xs font-mono tracking-widest text-text-muted">
              {step.n}
            </span>
            <h3 className="font-semibold text-text-primary">{step.title}</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              {step.body}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <Button asChild variant="link">
          <TransitionLink href="/how-it-works">
            Full process &amp; FAQ →
          </TransitionLink>
        </Button>
      </div>
    </section>
  );
}

function CtaBand() {
  return (
    <section className="relative my-8 rounded-card overflow-hidden bg-bg-subtle border border-border-subtle px-8 md:px-12 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
      <RegistrationMark className="absolute top-6 right-8 w-10 h-10 text-border-inverse opacity-20" />

      <div>
        <h2 className="font-display font-black uppercase text-3xl md:text-4xl text-text-base leading-tight">
          Ready to Print?
        </h2>
        <p className="mt-2 text-text-base/60 text-sm max-w-sm">
          Tell us about your project and we'll get back to you within 1–2
          business days with pricing.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 shrink-0">
        <Button asChild variant="primary" size="lg">
          <TransitionLink href="/contact">Get a Quote</TransitionLink>
        </Button>
        <Button asChild variant="outline" size="lg">
          <TransitionLink href="/how-it-works">How It Works</TransitionLink>
        </Button>
      </div>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function Home() {
  const featuredWork = await getFeaturedWork();

  return (
    <div className="w-full max-w-400 mx-auto">
      <Hero />

      {/* Featured Work */}
      {featuredWork.length > 0 && (
        <section className="py-16 border-t border-border-subtle">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-display font-black uppercase text-2xl md:text-3xl text-text-primary">
              Featured Work
            </h2>
            <Button asChild variant="link">
              <TransitionLink href="/portfolio">All work →</TransitionLink>
            </Button>
          </div>
          <GalleryGrid items={featuredWork} />
        </section>
      )}

      <ProcessStrip />
      <CtaBand />
    </div>
  );
}
