import type { Metadata } from "next";
import Image from "next/image";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description: `Artist-run screen printing out of ${siteConfig.contact.location}. Learn who we are and how we work.`,
};

function RegistrationMark({ className }: { className?: string }) {
  return (
    <Image
      src="/images/registration_mark.svg"
      alt=""
      aria-hidden
      width={12}
      height={12}
      className={className}
    />
  );
}

export default function AboutPage() {
  return (
    <article className="w-full max-w-400 mx-auto">

      {/* ── Page header ──────────────────────────────────────────────── */}
      <header className="my-16 max-w-2xl">
        <span className="inline-block text-xs font-mono tracking-widest uppercase text-text-muted border border-border-default rounded-full px-3 py-1 mb-4">
          About Us
        </span>
        <h1 className="font-display font-black text-[clamp(4.25rem,18vw,8rem)] uppercase leading-[0.85] text-text-primary">
          Experience<br />That Matters.
        </h1>
      </header>

      {/* ── Section 01: Philosophy ───────────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20 lg:mb-28 items-center">
        <div className="order-2 lg:order-1 flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <RegistrationMark className="opacity-50 invert dark:invert-0" />
            <span className="text-xs font-mono tracking-widest uppercase text-text-muted">
              01 / What Sets Us Apart
            </span>
          </div>
          <h2 className="font-display font-black text-[clamp(3rem,12vw,6rem)] uppercase leading-[0.9] text-text-primary text-balance">
            Quality Over Volume.
          </h2>
          <div className="space-y-4 text-text-secondary leading-relaxed max-w-[68ch] text-pretty">
            <p>
              We're a shop that cares about consistency and quality — not just
              spitting out volume. We take extra care with your files so the
              final print is something we're proud of too.
            </p>
            <p>
              Our entire staff is made up of artists and musicians who
              understand the need for top-notch merch. Whether you're doing
              full-color artwork or a single-color strike, the same attention
              and care goes into everything we produce.
            </p>
          </div>

          {/* Callout stat */}
          <div className="mt-2 border-l-2 border-[--color-primary-500] pl-5">
            <p className="text-text-primary font-semibold">
              Every job is personally overseen by our owner.
            </p>
            <p className="text-sm text-text-muted mt-1">
              Not a production line — a print shop with standards.
            </p>
          </div>
        </div>

        <div className="order-1 lg:order-2 relative aspect-4/3 rounded-card overflow-hidden bg-bg-inset">
          <Image
            src="/images/about01.jpg"
            alt="Inside the Antibroadcasting print shop"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* ── Section 02: Founder story ────────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20 lg:mb-28 items-center">
        <div className="relative aspect-4/3 rounded-card overflow-hidden bg-bg-inset">
          <Image
            src="/images/about02.jpg"
            alt="Chris at the press"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <RegistrationMark className="opacity-50 invert dark:invert-0" />
            <span className="text-xs font-mono tracking-widest uppercase text-text-muted">
              02 / The Story
            </span>
          </div>
          <h2 className="font-display font-black uppercase text-[clamp(3rem,12vw,6rem)] leading-[0.9] text-text-primary text-balance">
            Built From the Ground Up.
          </h2>
          <div className="space-y-4 text-text-secondary leading-relaxed max-w-[60ch] text-pretty">
            <p>
              Antibroadcasting was incorporated in 2005. Our owner, Chris, grew up
              working alongside his uncle and father at their shop in Minot, North Dakota — back when rubylith, hand-cut stencils, and hand-stretched
              2×2" screens were still standard.
            </p>
            <p>
              Over time, he began slowly acquiring his own equipment and
              building his own practice. Today he brings over 20 years of
              hands-on screen printing experience to every job that comes
              through the shop.
            </p>
          </div>

          {/* Founded badge */}
          <div className="flex items-center gap-4 mt-2">
            <div className="flex flex-col">
              <span className="font-display font-black text-4xl text-text-primary leading-none">
                2005
              </span>
              <span className="text-xs font-mono tracking-widest uppercase text-text-muted mt-1">
                Year Founded
              </span>
            </div>
            <div className="w-px h-10 bg-border-subtle" />
            <div className="flex flex-col">
              <span className="font-display font-black text-4xl text-text-primary leading-none">
                20+
              </span>
              <span className="text-xs font-mono tracking-widest uppercase text-text-muted mt-1">
                Years Experience
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 03: Who we work with ─────────────────────────────── */}
      <section className="border-t border-border-subtle pt-16 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <RegistrationMark className="opacity-50 invert dark:invert-0" />
              <span className="text-xs font-mono tracking-widest uppercase text-text-muted">
                03 / Who We Work With
              </span>
            </div>
            <h2 className="font-display font-black text-[clamp(3rem,12vw,5rem)] leading-[0.9] text-text-primary">
              Anyone Who Needs Great Prints.
            </h2>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "Bands & Musicians",
                body: "Merch that holds up on the road and looks good doing it. We know what the scene needs.",
              },
              {
                title: "Local Artists",
                body: "Limited runs, specialty inks, and the care your work deserves. Artist-to-artist.",
              },
              {
                title: "Events & Organizations",
                body: "Staff shirts, event tees, and promo apparel — on time and on spec.",
              },
              {
                title: "Businesses",
                body: "From single-color workwear to full-color branded pieces. We work with all types.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border border-border-subtle rounded-card p-6 flex flex-col gap-2"
              >
                <h3 className="font-semibold text-text-primary">{item.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="relative my-8 rounded-card overflow-hidden bg-bg-subtle border border-border-subtle px-8 md:px-12 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <RegistrationMark className="absolute top-6 right-8 w-10 h-10 text-border-accent opacity-20" />
        <div>
          <h2 className="font-display font-black uppercase text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-text-base leading-tight">
            Let's Work Together.
          </h2>
          <p className="mt-2 text-text-muted text-sm text-pretty max-w-sm">
            We appreciate your business and look forward to getting your images
            onto garments.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Button asChild variant="primary" size="lg">
            <TransitionLink href="/contact">Get a Quote</TransitionLink>
          </Button>
          <Button asChild variant="outline" size="lg">
            <TransitionLink href="/portfolio">See Our Work</TransitionLink>
          </Button>
        </div>
      </section>

    </article>
  );
}
