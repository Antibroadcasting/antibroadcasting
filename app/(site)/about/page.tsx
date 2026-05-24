import type { Metadata } from "next";
import Image from "next/image";
import { getSiteInfo } from "@/lib/get-site-info";
import { siteConfig } from "@/lib/site-config";
import { RegistrationMark } from "@/components/ui/RegistrationMark";
import { CtaBand } from "@/components/ui/CtaBand";

export async function generateMetadata(): Promise<Metadata> {
  const siteInfo = await getSiteInfo();
  const description = `Artist-run screen printing out of ${siteInfo.contact.address.location}. Learn who we are and how we work.`;
  return {
    title: "About",
    description,
    alternates: { canonical: `${siteConfig.site.url}/about` },
    openGraph: {
      title: "About | Antibroadcasting Inc.",
      description,
      url: `${siteConfig.site.url}/about`,
    },
  };
}

/** Reusable photo frame — corner brackets + diagonal stripe overlay */
function PhotoFrame({
  src,
  alt,
  priority = false,
  catalogLabel,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  catalogLabel?: string;
}) {
  return (
    <div className="relative w-full aspect-4/3 overflow-hidden border border-paper/10">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
        priority={priority}
      />

      {/* Diagonal stripe overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 8px, oklch(0% 0 0 / 0.08) 8px, oklch(0% 0 0 / 0.08) 9px)",
        }}
      />

      {/* Dark scrim */}
      <div aria-hidden="true" className="absolute inset-0 bg-ink/20" />

      {/* Corner brackets */}
      <div
        aria-hidden="true"
        className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-paper/60"
      />
      <div
        aria-hidden="true"
        className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-paper/60"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-paper/60"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-paper/60"
      />

      {/* Catalog label */}
      {catalogLabel && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-paper/60">
            {catalogLabel}
          </span>
        </div>
      )}
    </div>
  );
}

export default async function AboutPage() {
  const siteInfo = await getSiteInfo();

  return (
    <>
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
            Experience
            <br />
            That Matters<span className="text-gold">.</span>
          </h1>

          {/* Stats strip */}
          <div className="mt-10 pt-8 border-t border-foreground/10 flex flex-wrap items-end gap-x-16 gap-y-6">
            {[
              { value: "2005", label: "Year Founded" },
              { value: "20+", label: "Years Experience" },
              { value: siteInfo.contact.address.city, label: "Based In" },
            ].map((stat) => (
              <div key={stat.label}>
                <span className="block font-display font-black text-[clamp(2.5rem,5vw,4rem)] leading-none text-text-primary">
                  {stat.value}
                </span>
                <span className="block font-mono uppercase tracking-widest text-xs text-text-tertiary mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
            <div className="ml-auto hidden lg:flex items-center gap-2">
              <RegistrationMark className="w-5 h-5 text-foreground/20" />
            </div>
          </div>
        </section>

        {/* ── Section 01: Philosophy ───────────────────────────────────── */}
        <section className="py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center border-b border-foreground/10">
          {/* Text — left */}
          <div className="order-2 lg:order-1 flex flex-col gap-6">
            {/* Section label */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-text-accent shrink-0">
                01 / What Sets Us Apart
              </span>
              <span className="flex-1 h-px bg-gold/30" />
              <RegistrationMark className="w-4 h-4 text-text-accent shrink-0" />
            </div>

            <h2 className="font-display font-black text-[clamp(3rem,8vw,5.5rem)] uppercase leading-[0.9] text-text-primary">
              Quality Over
              <br />
              Volume<span className="text-gold">.</span>
            </h2>

            <div className="space-y-4 text-text-secondary leading-relaxed max-w-[68ch]">
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

            {/* Callout */}
            <div className="mt-2 border-l-4 border-gold pl-5">
              <p className="text-text-primary font-semibold">
                Every job is personally overseen by our owner.
              </p>
              <p className="text-sm text-text-tertiary mt-1">
                Not a production line — a print shop with standards.
              </p>
            </div>
          </div>

          {/* Photo — right */}
          <div className="order-1 lg:order-2">
            <PhotoFrame
              src="/images/about01.jpg"
              alt="Inside the Antibroadcasting print shop"
              priority
              catalogLabel="File · Shop_01.tif"
            />
          </div>
        </section>

        {/* ── Section 02: Founder story ────────────────────────────────── */}
        <section className="py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center border-b border-foreground/10">
          {/* Photo — left */}
          <div>
            <PhotoFrame
              src="/images/about02.jpg"
              alt="Chris at the press"
              catalogLabel="File · Press_02.tif"
            />
          </div>

          {/* Text — right */}
          <div className="flex flex-col gap-6">
            {/* Section label */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-text-accent shrink-0">
                02 / The Story
              </span>
              <span className="flex-1 h-px bg-gold/30" />
              <RegistrationMark className="w-4 h-4 text-text-accent shrink-0" />
            </div>

            <h2 className="font-display font-black uppercase text-[clamp(3rem,8vw,5.5rem)] leading-[0.9] text-text-primary">
              Built From
              <br />
              the Ground Up<span className="text-gold">.</span>
            </h2>

            <div className="space-y-4 text-text-secondary leading-relaxed max-w-[60ch]">
              <p>
                Antibroadcasting was incorporated in 2005. Our owner, Chris,
                grew up working alongside his uncle and father at their shop in
                Minot, North Dakota — back when rubylith, hand-cut stencils, and
                hand-stretched 2×2&Prime; screens were still standard.
              </p>
              <p>
                Over time, he began slowly acquiring his own equipment and
                building his own practice. Today he brings over 20 years of
                hands-on screen printing experience to every job that comes
                through the shop.
              </p>
            </div>

            {/* Founded stats */}
            <div className="mt-2 flex items-end gap-10 pt-6 border-t border-foreground/10">
              {[
                { value: "2005", label: "Year Founded" },
                { value: "20+", label: "Years Experience" },
              ].map((stat) => (
                <div key={stat.label}>
                  <span className="block font-display font-black text-[clamp(2.5rem,5vw,3.5rem)] leading-none text-text-primary">
                    {stat.value}
                  </span>
                  <span className="block font-mono uppercase tracking-widest text-xs text-text-tertiary mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 03: Who we work with ─────────────────────────────── */}
        <section className="py-20 lg:py-28">
          {/* Section header */}
          <div className="flex items-center gap-3 mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-text-accent shrink-0">
              03 / Who We Work With
            </span>
            <span className="flex-1 h-px bg-gold/30" />
            <RegistrationMark className="w-4 h-4 text-text-accent shrink-0" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-20 items-start">
            <h2 className="font-display font-black text-[clamp(3rem,8vw,5rem)] leading-[0.9] text-text-primary uppercase">
              Anyone Who
              <br />
              Needs Great
              <br />
              Prints<span className="text-gold">.</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-foreground/10">
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
                  title: "Events & Orgs",
                  body: "Staff shirts, event tees, and promo apparel — on time and on spec.",
                },
                {
                  title: "Businesses",
                  body: "From single-color workwear to full-color branded pieces. We work with all types.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="relative group bg-background overflow-hidden p-8 flex flex-col gap-3"
                >
                  {/* Gold fill on hover */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gold scale-y-0 origin-bottom group-hover:scale-y-100 transition-[scale] duration-300 ease-in-out"
                  />
                  <h3 className="relative font-display font-black uppercase text-xl leading-tight text-text-primary group-hover:text-ink transition-colors duration-300">
                    {item.title}
                    <span className="text-text-accent group-hover:text-ink/40 transition-colors duration-300">
                      .
                    </span>
                  </h3>
                  <p className="relative text-sm text-text-secondary leading-relaxed group-hover:text-ink/70 transition-colors duration-300">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ── CTA — full-bleed ──────────────────────────────────────── */}
      <CtaBand
        heading={
          <>
            Ready to
            <br />
            Print?
          </>
        }
        description="Send us your file, your idea, or a napkin sketch. We answer every quote request personally — usually within 24 hours."
        primaryCta={{ label: "Get a Quote", href: "/contact" }}
        secondaryCta={{ label: "How It Works", href: "/how-it-works" }}
        broadsideNo="016"
      />
    </>
  );
}
