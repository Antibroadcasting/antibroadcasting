import type { Metadata } from "next";
import { getSiteInfo } from "@/lib/get-site-info";
import { siteConfig } from "@/lib/site-config";
import { QuoteForm } from "@/components/ui/QuoteForm";
import { Button } from "@/components/ui/Button";
import {
  FacebookOutlined,
  InstagramOutlined,
  XOutlined,
} from "@ant-design/icons";

export async function generateMetadata(): Promise<Metadata> {
  const siteInfo = await getSiteInfo();
  const description = `Ready to print? Tell us about your project and we'll get back to you within ${siteInfo.forms.quote.responseTime}.`;
  return {
    title: "Contact",
    description,
    alternates: { canonical: `${siteConfig.site.url}/contact` },
    openGraph: {
      title: "Contact | Antibroadcasting Inc.",
      description,
      url: `${siteConfig.site.url}/contact`,
    },
  };
}

export default async function ContactPage() {
  const siteInfo = await getSiteInfo();
  const { contact, company, social, forms } = siteInfo;

  return (
    <div className="w-full max-w-400 mx-auto">
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
              {company.name}
            </p>
            <p className="text-lg">
              {contact.address.street}
              <br />
              {contact.address.city},{" "}
              {contact.address.state}{" "}
              {contact.address.zip}
            </p>
            <a
              href={contact.phoneHref}
              className="font-medium text-text-primary hover:underline self-start"
            >
              {contact.phone}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="font-medium text-text-primary hover:underline self-start"
            >
              {contact.email}
            </a>
            <div className="flex items-center gap-1 -ml-2">
              <Button asChild variant="ghost" size="icon">
                <a
                  href={social.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram (opens in new tab)"
                >
                  <InstagramOutlined className="text-lg" />
                </a>
              </Button>
              <Button asChild variant="ghost" size="icon">
                <a
                  href={social.facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook (opens in new tab)"
                >
                  <FacebookOutlined className="text-lg" />
                </a>
              </Button>
              <Button asChild variant="ghost" size="icon">
                <a
                  href={social.twitter.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X / Twitter (opens in new tab)"
                >
                  <XOutlined className="text-lg" />
                </a>
              </Button>
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
            Tell us about your project and we&apos;ll get back to you within{" "}
            {forms.quote.responseTime}. The more detail you give us, the faster
            we can turn around an accurate quote.
          </p>
          <QuoteForm
            garmentOptions={forms.quote.garmentOptions}
            timelineOptions={forms.quote.timelineOptions}
            minimumOrder={siteInfo.business.minimumOrder}
            maxColors={siteInfo.business.maxColors}
            responseTime={forms.quote.responseTime}
            email={contact.email}
            emailHref={`mailto:${contact.email}`}
          />
        </div>
      </div>
    </div>
  );
}
