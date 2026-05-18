import type { Metadata } from "next";
import { reader } from "@/lib/keystatic";
import { getSiteInfo, type SiteInfo } from "@/lib/get-site-info";
import { siteConfig } from "@/lib/site-config";
import { buttonVariants } from "@/components/ui/Button";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { RegistrationMark } from "@/components/ui/RegistrationMark";
import { FeaturedWorkGrid } from "@/components/ui/FeaturedWorkGrid";
import { CtaBand } from "@/components/ui/CtaBand";

export function generateMetadata(): Metadata {
  return {
    title: siteConfig.site.title.default,
    description: siteConfig.site.description,
    alternates: { canonical: siteConfig.site.url },
    openGraph: {
      title: siteConfig.openGraph.title,
      description: siteConfig.openGraph.description,
      url: siteConfig.site.url,
    },
  };
}

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

function Hero({ siteInfo }: { siteInfo: SiteInfo }) {
  return (
    <section className="relative flex flex-col min-h-screen">

      {/* Meta row — eyebrow + booking badge */}
      <div className="flex flex-col gap-4 md:flex-row items-start md:items-center justify-between pt-10 pb-2">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs uppercase tracking-widest text-text-tertiary">
            Est. 2005 Minneapolis · Artist-Run
          </span>
          <span className="hidden sm:block h-px w-16 bg-gold" />
        </div>
        <div className="flex items-center gap-2 font-mono text-xs font-black tracking-widest uppercase text-text-inverse bg-gold px-3 py-1">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bg-base opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-bg-base" />
          </span>
          Now Booking — Summer &apos;26
        </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 gap-12 py-12">
        {/* Left — headline, subhead, CTAs */}
        <div className="flex flex-col justify-center flex-3">
          <h1 className="font-display font-black uppercase leading-[0.75]">
            <span className="block text-[clamp(6rem,15vw,12rem)]">Custom</span>
            <span className="block text-[clamp(6rem,15vw,12rem)]">Screen</span>
            <span className="block text-[clamp(6rem,15vw,12rem)]">Printing<span className="text-gold">.</span></span>
          </h1>

          <p className="mt-6 text-text-secondary text-lg max-w-[64ch] leading-relaxed">
            {siteInfo.company.nickname} is an artist-run shop in Minneapolis. We
            print for bands, artists, events, and our community.{" "}
            {siteInfo.company.tagline}
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            <TransitionLink href="/contact" className={buttonVariants({ variant: "primary", size: "md" })}>
              Get a Quote
            </TransitionLink>
            <TransitionLink href="/portfolio" className={buttonVariants({ variant: "outline", size: "md" })}>
              See Our Work
            </TransitionLink>
          </div>
        </div>

        {/* Right — hero photograph with editorial overlay (decorative) */}
        <div className="hidden lg:flex flex-2 self-stretch relative" aria-hidden="true">
          <div
            className="relative w-full h-full min-h-[480px] overflow-hidden border border-paper/10"
            style={{
              backgroundImage: "url('/images/hero-img01.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Diagonal stripe overlay */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, transparent, transparent 8px, oklch(0% 0 0 / 0.08) 8px, oklch(0% 0 0 / 0.08) 9px)",
              }}
            />

            {/* Dark scrim for legibility */}
            <div className="absolute inset-0 bg-ink/30" />

            {/* Corner bracket — top-left */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-paper/60" />
            {/* Corner bracket — top-right */}
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-paper/60" />
            {/* Corner bracket — bottom-left */}
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-paper/60" />
            {/* Corner bracket — bottom-right */}
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-paper/60" />

            {/* Catalog label — top */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-paper/60">
                01 / Catalog No. 2026-A
              </span>
            </div>

            {/* Center registration mark */}
            <div className="absolute inset-0 flex items-center justify-center">
              <RegistrationMark className="w-12 h-12 text-paper/25" />
            </div>

            {/* Press label — center-left */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-center">
              <span className="font-mono text-[10px] uppercase tracking-widest text-paper/50">
                Press Photograph
              </span>
            </div>

            {/* File label — bottom */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-paper/60">
                File · Hero_01.tif
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Trust strip — mt-auto pins to bottom of flex column */}
      <div className="mt-auto pt-8 border-t border-foreground/10 flex flex-wrap items-end justify-between gap-y-8 gap-x-12 pb-8">
        {/* Stats */}
        <div className="flex flex-wrap gap-x-16 gap-y-6">
          {[
            { value: `${siteInfo.business.minimumOrder}+`, label: "Piece Minimum" },
            { value: `${siteInfo.business.turnaroundDays}`, label: "Day Turnaround" },
            { value: `${siteInfo.business.maxColors}`, label: "Color Maximum" },
          ].map((stat) => (
            <div key={stat.label}>
              <span className="block font-display font-black text-[clamp(2.5rem,5vw,4.5rem)] leading-none text-text-primary">
                {stat.value}
              </span>
              <span className="block font-mono uppercase tracking-widest text-xs text-text-tertiary mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Right — address + status */}
        <div className="flex flex-col items-end gap-2 text-right">
          <p className="font-mono text-xs uppercase tracking-widest text-text-secondary leading-relaxed">
            {siteInfo.contact.address.street}
          </p>
          <p className="font-mono text-xs uppercase tracking-widest text-text-secondary -mt-1">
            {siteInfo.contact.address.city}, {siteInfo.contact.address.state} {siteInfo.contact.address.zip}
          </p>
          <p className="font-mono text-xs uppercase tracking-widest text-text-accent">
            By Appointment Only
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-text-tertiary">
              Press Running · Bay 02
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessStrip() {
  const steps = [
    {
      n: "01",
      title: "Submit a Quote",
      body: "Tell us your quantity, colors, garment, and timeline. We'll write back within a day with pricing and a press date.",
    },
    {
      n: "02",
      title: "Approve the Proof",
      body: "We build a digital mock-up of your design on your chosen garment. Nothing goes to press until you're satisfied.",
    },
    {
      n: "03",
      title: "Pick Up Your Order",
      body: "Standard turnaround is 7–10 business days from when we receive your blanks. Local pickup or ship anywhere in the U.S.",
    },
  ];

  return (
    <section className="bg-bg-inverse -mx-4 md:-mx-6 lg:-mx-8 xl:-mx-12" data-inverse>
      <div className="w-full max-w-300 xl:max-w-360 2xl:max-w-400 mx-auto px-4 md:px-6 lg:px-8 xl:px-12 pt-20 pb-32">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="block h-px w-8 bg-text-inverse/30" />
          <span className="font-mono text-xs uppercase tracking-widest text-text-inverse/40">
            Index 02 — How It Works
          </span>
        </div>

        {/* Heading row */}
        <div className="mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <h2 className="font-display font-black uppercase leading-[0.85] text-[clamp(4rem,10vw,8rem)] text-text-inverse">
            Our<br />Process<span className="text-gold">.</span>
          </h2>
          <div className="flex flex-col items-start lg:items-end gap-3 lg:pb-2 shrink-0">
            <p className="font-mono text-xs uppercase tracking-widest text-text-inverse/40">
              Three Steps, Start to Finish
            </p>
            <TransitionLink
              href="/how-it-works"
              className={buttonVariants({ variant: "neutral", size: "md" })}
            >
              Read the Full Guide →
            </TransitionLink>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-text-inverse/15 mb-0" />

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-text-inverse/15">
          {steps.map((step) => (
            <div key={step.n} className="pt-8 pb-12 px-0 md:px-8 first:pl-0 last:pr-0 flex flex-col gap-6">
              {/* Step header — label + rule + mark */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-text-accent uppercase tracking-widest shrink-0">
                  Step {step.n}
                </span>
                <span className="flex-1 h-px bg-gold/30" />
                <RegistrationMark className="w-4 h-4 text-text-accent shrink-0" />
              </div>

              <h3 className="font-display font-black uppercase text-[clamp(2rem,3.5vw,3.5rem)] leading-[0.9] text-text-inverse">
                {step.title}<span className="text-gold">.</span>
              </h3>
              <p className="text-text-on-inverse-muted text-sm leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function Home() {
  const [featuredWork, siteInfo] = await Promise.all([
    getFeaturedWork(),
    getSiteInfo(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteInfo.company.legalName,
    url: siteConfig.site.url,
    telephone: siteInfo.contact.phone,
    description: siteConfig.site.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteInfo.contact.address.street,
      addressLocality: siteInfo.contact.address.city,
      addressRegion: siteInfo.contact.address.state,
      postalCode: siteInfo.contact.address.zip,
      addressCountry: "US",
    },
    sameAs: [
      siteInfo.social.instagram.url,
      siteInfo.social.facebook.url,
      siteInfo.social.twitter.url,
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Constrained wrapper — Hero + Featured Work only */}
      <div className="w-full max-w-300 xl:max-w-360 2xl:max-w-400 mx-auto">
        <Hero siteInfo={siteInfo} />

        {/* Featured Work */}
        {featuredWork.length > 0 && (
          <section className="pt-40 pb-16 border-t border-foreground/10">

            {/* Section label */}
            <div className="flex items-center gap-4 mb-12">
              <span className="block h-px w-8 bg-foreground/30" />
              <span className="font-mono text-xs uppercase tracking-widest text-text-tertiary">
                Index 01 — Recent Work
              </span>
            </div>

            {/* Heading row */}
            <div className="mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <h2 className="font-display font-black uppercase leading-[0.85] text-[clamp(4rem,10vw,8rem)]">
                Featured<br />Work<span className="text-gold">.</span>
              </h2>
              <div className="flex flex-col items-start lg:items-end gap-3 lg:pb-2 shrink-0">
                <p className="font-mono text-xs uppercase tracking-widest text-text-tertiary">
                  Pulled From the Archive
                </p>
                <TransitionLink
                  href="/portfolio"
                  className={buttonVariants({ variant: "outline", size: "sm" })}
                >
                  View All Portfolio →
                </TransitionLink>
              </div>
            </div>

            {/* Cards — asymmetric staggered grid with lightbox */}
            <FeaturedWorkGrid items={featuredWork.slice(0, 3)} />
          </section>
        )}
      </div>

      {/* Full-bleed sections — outside the constrained wrapper so -mx-* only escapes main's padding */}
      <ProcessStrip />
      <CtaBand
        heading={<>Ready to<br />Print?</>}
        description="Send us your file, your idea, or a napkin sketch. We answer every quote request personally — usually within 24 hours."
        primaryCta={{ label: "Get a Quote", href: "/contact" }}
        secondaryCta={{ label: "How It Works", href: "/how-it-works" }}
      />
    </>
  );
}
