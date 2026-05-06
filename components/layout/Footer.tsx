"use client";

import { type SiteInfo } from "@/lib/get-site-info";
import { Button } from "@/components/ui/Button";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { TransitionLink } from "./TransitionLink";
import {
  InstagramOutlined,
  FacebookOutlined,
  XOutlined,
} from "@ant-design/icons";

export function Footer({ siteInfo }: { siteInfo: SiteInfo }) {
  return (
    <footer
      className="p-6 md:p-8 lg:p-10 xl:p-12 bg-bg-inset sticky bottom-0 z-0"
      onFocus={() => {
        const reduced = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: reduced ? "instant" : "smooth",
        });
      }}
    >
      <div className="max-w-400 mx-auto flex flex-col md:flex-row justify-between gap-8">
        <div className="flex flex-col gap-0.5">
          <p className="font-bold font-display text-2xl text-text-primary uppercase">
            {siteInfo.company.legalName}
          </p>
          <p className="text-text-secondary mt-1">
            {siteInfo.contact.address.full}
          </p>
          <a
            href={siteInfo.contact.phoneHref}
            className="font-medium text-text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background self-start"
          >
            {siteInfo.contact.phone}
          </a>
          <CopyEmailButton email={siteInfo.contact.email} />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm text-text-secondary">
          <div className="flex flex-col items-start gap-3">
            <div className="flex items-center gap-1">
              <Button asChild variant="ghost" size="icon">
                <a
                  href={siteInfo.social.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram (opens in new tab)"
                >
                  <InstagramOutlined className="text-lg" />
                </a>
              </Button>
              <Button asChild variant="ghost" size="icon">
                <a
                  href={siteInfo.social.facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook (opens in new tab)"
                >
                  <FacebookOutlined className="text-lg" />
                </a>
              </Button>
              <Button asChild variant="ghost" size="icon">
                <a
                  href={siteInfo.social.twitter.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X / Twitter (opens in new tab)"
                >
                  <XOutlined className="text-lg" />
                </a>
              </Button>
            </div>
            <div className="flex items-center gap-3 pl-1">
              <TransitionLink
                href="/privacy"
                className="font-medium text-text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Privacy
              </TransitionLink>
              <TransitionLink
                href="/terms"
                className="font-medium text-text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Terms
              </TransitionLink>
            </div>
          </div>
        </div>
      </div>

      <p className="md:text-center text-xs text-pretty text-text-muted mt-8">
        &copy; {new Date().getFullYear()} {siteInfo.company.name}. All rights
        reserved.
      </p>
    </footer>
  );
}
