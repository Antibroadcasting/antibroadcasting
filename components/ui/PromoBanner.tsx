import Image from "next/image";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { buttonVariants } from "@/components/ui/Button";
import { RegistrationMark } from "@/components/ui/RegistrationMark";
import type { ActivePromo } from "@/lib/get-active-promo";

export function PromoBanner({ promo }: { promo: ActivePromo }) {
  return (
    <section
      aria-labelledby="promo-heading"
      className="my-16 border border-foreground/15 px-6 py-8 md:px-10 md:py-10 flex flex-col lg:flex-row lg:items-center gap-6 md:gap-10"
    >
      <div className="flex items-center gap-3 shrink-0">
        {promo.badgeImage ? (
          <div className="relative min-h-40 w-full sm:min-h-52 sm:min-w-52 md:min-h-60 md:min-w-60 shrink-0">
            <Image
              src={promo.badgeImage}
              alt=""
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        ) : (
          <>
            <RegistrationMark className="w-5 h-5 text-gold" />
            <span className="font-mono text-xs uppercase tracking-widest text-text-accent">
              {promo.label || "The Latest News"}
            </span>
          </>
        )}
      </div>

      <div className="flex-1">
        <h2
          id="promo-heading"
          className="font-display font-black uppercase text-4xl md:text-5xl lg:text-6xl leading-none"
        >
          {promo.title}
        </h2>
        {promo.description && (
          <p className="mt-4 text-text-secondary max-w-prose leading-relaxed">
            {promo.description}
          </p>
        )}
      </div>

      {promo.ctaLabel && promo.ctaHref && (
        <TransitionLink
          href={promo.ctaHref}
          className={buttonVariants({ variant: "primary", size: "md" })}
        >
          {promo.ctaLabel}
        </TransitionLink>
      )}
    </section>
  );
}
