import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { reader } from "@/lib/keystatic";
import { getSiteInfo, type SiteInfo } from "@/lib/get-site-info";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/Button";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { GalleryGrid } from "@/components/ui/GalleryGrid";
import { RegistrationMark } from "@/components/ui/RegistrationMark";

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
    <section className="relative flex flex-col justify-center min-h-[calc(100svh-4.5rem)]">
      {/* Decorative registration marks */}
      <RegistrationMark className="absolute z-40 top-8 right-8 w-10 h-10 text-border-default" />
      <RegistrationMark className="absolute z-40 bottom-32 right-8 w-6 h-6 text-border-default" />

      <div className="z-20 xl:px-12">
        {/* Location badge */}
        <div className="flex items-center gap-2 mb-8">
          <span className="inline-block text-xs font-mono font-black tracking-widest uppercase text-text-inverse bg-text-warning px-3 py-1">
            {/* {siteConfig.contact.location} */}
            Accepting orders for Fall 2026
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display font-black uppercase leading-[0.85] text-text-primary">
          <span className="block text-[clamp(5rem,18vw,8rem)]">Custom</span>
          <span className="block text-[clamp(5rem,18vw,8rem)]">Screen</span>
          <span className="block text-[clamp(5rem,18vw,8rem)]">Printing.</span>
        </h1>

        {/* Sub-headline */}
        <p className="mt-6 max-w-md text-text-secondary leading-relaxed">
          {siteInfo.company.nickname} is an artist-run shop in Minneapolis. We
          print for bands, artists, events, and our community.{" "}
          {siteInfo.company.tagline}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 mt-8">
          <Button asChild variant="primary">
            <TransitionLink href="/contact">Get a Quote</TransitionLink>
          </Button>
          <Button asChild variant="outline">
            <TransitionLink href="/portfolio">See Our Work</TransitionLink>
          </Button>
        </div>
      </div>

      <div className="hidden lg:block bg-(--color-primary-500) w-full max-w-1/2 aspect-3/4 max-h-[80svh] absolute top-0 right-0 z-0 rounded-card overflow-hidden">
        <Image
          src="/images/hero-img02.jpg"
          alt="Screen printing work by Anti-Broadcasting"
          fill
          priority
          className="object-cover mix-blend-luminosity brightness-50 saturate-150 rounded-card"
          sizes="50vw"
        />
      </div>

      {/* Trust strip */}
      <div className="flex flex-wrap gap-6 mt-12 py-8 px-4 lg:px-8 border-t border-border-subtle">
        {[
          { value: `${siteInfo.business.minimumOrder} pc`, label: "Minimum" },
          {
            value: siteInfo.business.turnaroundDays,
            label: "Day Turnaround",
          },
          { value: `${siteInfo.business.maxColors}`, label: "Color Max" },
        ].map((stat) => (
          <div key={stat.label}>
            <span className="block text-3xl font-display font-black text-text-primary tracking-wider">
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
            <span className="text-xl font-mono tracking-widest text-text-muted">
              {step.n}
            </span>
            <h2 className="font-semibold font-display text-[clamp(2rem,8vw,2.75rem)] leading-[0.85] text-text-primary">
              {step.title}
            </h2>
            <p className="text-text-secondary leading-relaxed text-pretty">
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
      <RegistrationMark className="absolute top-6 right-8 w-10 h-10 text-border-primary opacity-20" />

      <div>
        <h2 className="font-display font-black uppercase text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-text-base leading-tight">
          Ready to Print?
        </h2>
        <p className="mt-2 text-text-muted text-sm text-pretty max-w-sm">
          Tell us about your project and we'll get back to you within 1–2
          business days with pricing.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 shrink-0">
        <Button asChild variant="primary">
          <TransitionLink href="/contact">Get a Quote</TransitionLink>
        </Button>
        <Button asChild variant="outline">
          <TransitionLink href="/how-it-works">How It Works</TransitionLink>
        </Button>
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
      <div className="w-full max-w-300 2xl:max-w-360 3xl:max-w-400 mx-auto">
        <Hero siteInfo={siteInfo} />

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
    </>
  );
}
