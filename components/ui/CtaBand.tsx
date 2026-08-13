import { TransitionLink } from "@/components/layout/TransitionLink";
import { buttonVariants } from "@/components/ui/Button";
import { DotOverlay } from "@/components/ui/DotOverlay";

interface CtaButton {
  label: string;
  href: string;
}

interface CtaBandProps {
  heading: React.ReactNode;
  description?: string;
  primaryCta?: CtaButton;
  secondaryCta?: CtaButton;
  /** Right-side ticker text, e.g. "Printed in Minneapolis · MMXXVI" */
  broadsideTag?: string;
  /** Extra classes applied to the outer <section> */
  className?: string;
}

export function CtaBand({
  heading,
  description,
  primaryCta,
  secondaryCta,
  broadsideTag = "Printed in Minneapolis · MMXXVI",
  // cSpell:ignore MMXXVI
  className = "",
}: CtaBandProps) {
  return (
    <section
      aria-labelledby="ctaband-heading"
      className={`bg-gold -mx-4 md:-mx-6 lg:-mx-8 xl:-mx-12 relative overflow-hidden ${className}`}
      data-surface="gold"
    >
      <DotOverlay color="oklch(12% 0.008 40)" size="9px" opacity={0.12} />
      {/* Broadside ticker */}
      <div className="relative z-10 flex items-center gap-4 px-4 md:px-6 lg:px-8 xl:px-12 py-4">
        <div className="flex items-center gap-3 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-ink shrink-0" />
        </div>
        <span className="flex-1 h-px bg-ink/20" />
        <span className="font-mono text-2xs uppercase tracking-widest text-ink shrink-0">
          {broadsideTag}
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-300 xl:max-w-360 2xl:max-w-400 mx-auto px-4 md:px-6 lg:px-8 xl:px-12 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-center">
          <h2
            id="ctaband-heading"
            className="font-display font-black uppercase text-[clamp(4rem,10vw,12rem)] leading-[0.75] text-ink"
          >
            {heading}
          </h2>
          {/* cSpell:ignore ctaband */}
          <div className="flex flex-col gap-6 lg:pb-2">
            {description && (
              <p className="text-lg text-ink font-medium max-w-prose leading-relaxed">
                {description}
              </p>
            )}
            {(primaryCta || secondaryCta) && (
              <div className="flex flex-wrap gap-4">
                {primaryCta && (
                  <TransitionLink
                    href={primaryCta.href}
                    className={buttonVariants({
                      variant: "neutral",
                      size: "md",
                    })}
                  >
                    {primaryCta.label} →
                  </TransitionLink>
                )}
                {secondaryCta && (
                  <TransitionLink
                    href={secondaryCta.href}
                    className={buttonVariants({
                      variant: "outline",
                      size: "md",
                    })}
                  >
                    {secondaryCta.label}
                  </TransitionLink>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
