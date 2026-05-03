import { siteConfig } from "@/lib/site-config";
import {
  InstagramOutlined,
  FacebookOutlined,
  XOutlined,
} from "@ant-design/icons";

export function Footer() {
  return (
    <footer className="p-6 md:p-8 lg:p-10 xl:p-12 bg-bg-inset sticky bottom-0 z-0">
      <div className="max-w-400 mx-auto flex flex-col md:flex-row justify-between gap-8">
        <div className="flex flex-col gap-0.5">
          <p className="font-bold text-lg text-text-primary">
            {siteConfig.company.legalName}
          </p>
          <p className="text-sm text-text-secondary mt-1">
            {siteConfig.contact.address.full}
          </p>
          <a
            href={siteConfig.contact.phoneHref}
            className="font-medium text-text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background self-start"
          >
            {siteConfig.contact.phone}
          </a>
          <a
            href={siteConfig.contact.emailHref}
            className="font-medium text-text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background self-start"
          >
            {siteConfig.contact.email}
          </a>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm text-text-secondary">
          <div className="flex flex-col items-center self-start gap-3">
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
            <div className="flex items-center gap-3 md:ml-2">
              <a
                href="/privacy"
                className="font-medium text-text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Privacy
              </a>
              <a
                href="/terms"
                className="font-medium text-text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
      <p className="md:text-center text-xs text-pretty text-text-muted mt-8">
        &copy; {new Date().getFullYear()} {siteConfig.company.name}. All rights
        reserved.
      </p>
    </footer>
  );
}
