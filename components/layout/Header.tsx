"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { TransitionLink } from "./TransitionLink";
import { Button } from "../ui/Button";
import {
  PhoneOutlined,
  MailOutlined,
  InstagramOutlined,
  FacebookOutlined,
  XOutlined,
} from "@ant-design/icons";

const nav = siteConfig.navigation;

function NavLink({
  href,
  children,
  onClick,
  className,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <TransitionLink
      href={href}
      onClick={onClick}
      className={`relative rounded-xs border-b-3 border-transparent transition-colors self-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${active
          ? "pointer-events-none lg:border-b-(--color-primary-500)"
          : "text-text-muted"
        } ${className || ""}`}
    >
      {children}
    </TransitionLink>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  const logoRef = useRef<HTMLAnchorElement>(null);
  const logoCleanup = useRef<(() => void) | null>(null);

  const handleLogoEnter = useCallback(() => {
    const el = logoRef.current;
    if (!el) return;
    logoCleanup.current?.();
    logoCleanup.current = null;
    el.style.animation = "none";
    void el.offsetWidth;
    el.style.animation = "logo-hover-in 275ms ease forwards";
  }, []);

  const handleLogoLeave = useCallback(() => {
    const el = logoRef.current;
    if (!el) return;
    logoCleanup.current?.();

    el.style.animation = "none";
    void el.offsetWidth;
    el.style.animation = "logo-hover-out 275ms ease forwards";

    const onEnd = () => {
      el.removeEventListener("animationend", onEnd);
      logoCleanup.current = null;
      el.style.animation = "none";
      el.style.backgroundPosition = "0 100%";
      requestAnimationFrame(() => {
        el.style.backgroundPosition = "";
        el.style.animation = "";
      });
    };
    el.addEventListener("animationend", onEnd);
    logoCleanup.current = () => el.removeEventListener("animationend", onEnd);
  }, []);

  // Close drawer on route change
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastScrollY.current;
      if (currentY < 10) {
        setHidden(false);
      } else if (diff > 8) {
        setHidden(true);
      } else if (diff < -8) {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-150 focus-visible:rounded-input focus-visible:bg-bg-base focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-medium focus-visible:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        Skip to main content
      </a>
      <header
        className={`fixed top-0 left-0 right-0 z-100 px-4 md:px-6 lg:px-8 xl:px-12 flex items-center justify-between bg-bg-base border-b border-border-default transition-transform duration-300 ease-in-out ${hidden ? "-translate-y-full" : "translate-y-0"}`}
        onFocus={() => setHidden(false)}
      >
        <div className="max-w-400 mx-auto flex flex-1 items-center gap-2">
          <TransitionLink
            ref={logoRef}
            href="/"
            className="logo font-black text-2xl font-display p-1 my-5 mr-6 tracking-wider text-text-primary uppercase leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            onMouseEnter={handleLogoEnter}
            onMouseLeave={handleLogoLeave}
          >
            {siteConfig.company.nickname}
          </TransitionLink>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center self-end gap-0.5">
            {nav.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                className="text-base hover:text-text-inverse dark:hover:text-text-primary font-medium p-5 relative overflow-hidden before:absolute before:inset-0 before:-z-10 before:transform before:scale-y-0 before:origin-bottom before:transition-transform before:duration-300 before:ease-in-out hover:before:scale-y-100 hover:before:origin-top before:bg-(--color-primary-500) transition-all"
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="hidden lg:flex grow justify-end self-center items-center gap-4">
            <div className="flex items-center gap-4 text-xs">
              <a
                href={siteConfig.contact.phoneHref}
                className="flex items-center gap-1 font-medium text-text-primary hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label="Phone"
              >
                <PhoneOutlined className="text-lg xl:text-sm" />
                <span className="hidden xl:inline">
                  {siteConfig.contact.phone}
                </span>
              </a>
              <a
                href={siteConfig.contact.emailHref}
                className="flex items-center gap-1 font-medium text-text-primary hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label="Email"
              >
                <MailOutlined className="text-lg xl:text-sm" />
                <span className="hidden xl:inline">
                  {siteConfig.contact.email}
                </span>
              </a>
              {/* <a
                href={siteConfig.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label="Instagram"
              >
                <InstagramOutlined className="text-lg" />
              </a>
              <a
                href={siteConfig.social.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label="Facebook"
              >
                <FacebookOutlined className="text-lg" />
              </a>
              <a
                href={siteConfig.social.twitter.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label="Twitter"
              >
                <XOutlined className="text-lg" />
              </a> */}
            </div>
            <Button variant="primary" size="sm">
              Get a Quote
            </Button>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col justify-center gap-1.5 w-8 h-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span
            className={`block h-0.5 w-full bg-foreground transition-transform origin-center ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-full bg-foreground transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-full bg-foreground transition-transform origin-center ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-bg-inset/80 backdrop-blur-xs lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}
      <nav
        className={`fixed top-18 right-0 z-40 h-full w-72 bg-bg-base shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden ${open ? "translate-x-0" : "translate-x-full"}`}
        aria-label="Mobile navigation"
        aria-modal={open ? "true" : undefined}
        aria-hidden={!open}
      >
        <div className="flex flex-col gap-1 p-6">
          {nav.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
            >
              <span className="block py-2 text-lg">{item.label}</span>
            </NavLink>
          ))}
        </div>
        <div className="px-6 text-sm text-text-muted flex flex-col space-y-2">
          <Button variant="primary" size="sm">
            Get a Quote
          </Button>
          <div className="flex flex-col gap-3 mt-6">
            <div className="flex items-center gap-3">
              <a
                href={siteConfig.contact.phoneHref}
                className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <PhoneOutlined className="text-base" />
                <span>{siteConfig.contact.phone}</span>
              </a>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={siteConfig.contact.emailHref}
                className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <MailOutlined className="text-base" />
                <span className="text-sm">{siteConfig.contact.email}</span>
              </a>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <a
                href={siteConfig.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label="Instagram"
              >
                <InstagramOutlined className="text-lg" />
              </a>
              <a
                href={siteConfig.social.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label="Facebook"
              >
                <FacebookOutlined className="text-lg" />
              </a>
              <a
                href={siteConfig.social.twitter.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label="Twitter"
              >
                <XOutlined className="text-lg" />
              </a>
            </div>
            <p className="mt-2">{siteConfig.contact.address.street}</p>
            <p className="-mt-2">{siteConfig.contact.location}</p>
          </div>
        </div>
      </nav>
    </>
  );
}
