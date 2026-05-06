import type { Metadata } from "next";
import { QuoteForm } from "@/components/ui/QuoteForm";
import { siteConfig } from "@/lib/site-config";
import {
  FacebookOutlined,
  InstagramOutlined,
  XOutlined,
} from "@ant-design/icons";

export const metadata: Metadata = {
  title: "Contact",
  description: siteConfig.forms.quote.responseTime
    ? `Ready to print? Tell us about your project and we'll get back to you within ${siteConfig.forms.quote.responseTime}.`
    : "Ready to print? Tell us about your project and we'll get back to you within 1–2 business days.",
};

export default function ContactPage() {
  return (
    <article className="w-full max-w-400 mx-auto">
      <header className="my-12 max-w-2xl">
        <span className="inline-block text-xs font-mono font-black tracking-widest uppercase text-text-inverse bg-(--color-secondary-500) px-3 py-1 mb-4">
          Contact us
        </span>
        <h1 className="font-display font-black text-[clamp(4.25rem,18vw,8rem)] uppercase leading-[0.85] text-text-primary">
          Get in touch.
        </h1>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3 lg:order-2">
          <div className="text-text-secondary flex flex-col space-y-2 lg:max-w-96 mx-auto p-8 xl:p-16 bg-bg-muted border border-border-subtle rounded-md">
            <p className="font-display font-black text-[clamp(2rem,4vw,2.25rem)] uppercase leading-[0.9] text-text-primary text-balance mb-4">
              {siteConfig.company.name}
            </p>
            <p className="text-lg">
              {siteConfig.contact.address.street}
              <br />
              {siteConfig.contact.address.city},{" "}
              {siteConfig.contact.address.state}{" "}
              {siteConfig.contact.address.zip}
            </p>
            <a
              href={siteConfig.contact.phoneHref}
              className="font-medium text-text-primary hover:underline self-start"
            >
              {siteConfig.contact.phone}
            </a>
            <a
              href={siteConfig.contact.emailHref}
              className="font-medium text-text-primary hover:underline self-start"
            >
              {siteConfig.contact.email}
            </a>
            <div className="flex items-center gap-3">
              <a
                href={siteConfig.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram (opens in new tab)"
                className="p-2 hover:text-text-primary transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <InstagramOutlined className="text-lg" />
              </a>
              <a
                href={siteConfig.social.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook (opens in new tab)"
                className="p-2 hover:text-text-primary transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <FacebookOutlined className="text-lg" />
              </a>
              <a
                href={siteConfig.social.twitter.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter (opens in new tab)"
                className="p-2 hover:text-text-primary transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <XOutlined className="text-lg" />
              </a>
            </div>
            <span className="inline-block text-xs font-mono tracking-widest uppercase text-text-secondary">
              Hours by Appointment Only
            </span>
          </div>
        </div>

        <div className="flex-1 border border-border-subtle rounded-md p-8 lg:p-16">
          <p className="font-display font-black text-[clamp(2rem,5vw,3rem)] uppercase leading-[0.9] text-text-primary text-balance mb-4">
            Ready to print? Get a quote.
          </p>
          <p className="text-text-secondary max-w-[60ch] text-pretty text-sm mb-10">
            Tell us about your project and we'll get back to you within 1–2
            business days. The more detail you give us, the faster we can turn
            around an accurate quote.
          </p>
          <QuoteForm />
        </div>
      </div>
    </article>
  );
}
