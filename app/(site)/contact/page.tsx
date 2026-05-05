import type { Metadata } from "next";
import { QuoteForm } from "@/components/ui/QuoteForm";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: siteConfig.forms.quote.responseTime
    ? `Ready to print? Tell us about your project and we'll get back to you within ${siteConfig.forms.quote.responseTime}.`
    : "Ready to print? Tell us about your project and we'll get back to you within 1–2 business days.",
};

export default function ContactPage() {
  return (
    <section className="w-full max-w-400 mx-auto">
      <header className="my-16 max-w-2xl">
        <span className="inline-block text-xs font-mono tracking-widest uppercase text-text-muted border border-border-default rounded-full px-3 py-1 mb-4">
          Contact us
        </span>
        <h1 className="font-display font-black text-[clamp(4.25rem,18vw,8rem)] uppercase leading-[0.85] text-text-primary">
          Get in touch.
        </h1>
      </header>
      <p className="text-text-secondary mb-10">
        Ready to print? Tell us about your project and we'll get back to you within 1–2 business
        days. The more detail you give us, the faster we can turn around an
        accurate quote.
      </p>

      <QuoteForm />

      <div className="mt-12 pt-8 border-t border-border-subtle text-sm text-text-secondary space-y-1">
        <p>Prefer to call or email directly?</p>
        <p>
          <a
            href={siteConfig.contact.phoneHref}
            className="font-medium text-text-primary hover:underline"
          >
            {siteConfig.contact.phone}
          </a>
        </p>
        <p>
          <a
            href={siteConfig.contact.emailHref}
            className="font-medium text-text-primary hover:underline"
          >
            {siteConfig.contact.email}
          </a>
        </p>
      </div>
    </section>
  );
}
