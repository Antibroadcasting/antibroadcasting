"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { type SiteInfo } from "@/lib/get-site-info";
import { TransitionLink } from "./TransitionLink";
import { Button } from "../ui/Button";
import { CopyEmailButton } from "../ui/CopyEmailButton";
import {
  PhoneOutlined,
  MailOutlined,
  InstagramOutlined,
  FacebookOutlined,
  XOutlined,
} from "@ant-design/icons";

const nav = siteConfig.navigation;
const DRAWER_ID = "mobile-nav";
const SCROLL_HIDE_THRESHOLD = 8;

// Focusable elements selector used by the focus trap
const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function NavLink({
  href,
  pathname,
  children,
  onClick,
  className,
}: {
  href: string;
  pathname: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
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

export function Header({ siteInfo }: { siteInfo: SiteInfo }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  const drawerRef = useRef<HTMLElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const logoCleanup = useRef<(() => void) | null>(null);

  const pathname = usePathname();

  // ── Logo hover animation ────────────────────────────────────────────────────

  const handleLogoEnter = useCallback(() => {
    const el = logoRef.current;
    if (!el) return;
    logoCleanup.current?.();
    logoCleanup.current = null;
    el.style.animation = "none";
    void el.offsetWidth; // force reflow to restart animation
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

  // ── Close drawer on navigation ──────────────────────────────────────────────

  useEffect(() => setOpen(false), [pathname]);

  // ── Scroll-hide header ──────────────────────────────────────────────────────

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastScrollY.current;
      if (currentY < 10) {
        setHidden(false);
      } else if (diff > SCROLL_HIDE_THRESHOLD) {
        setHidden(true);
      } else if (diff < -SCROLL_HIDE_THRESHOLD) {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Body overflow lock ──────────────────────────────────────────────────────

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // ── Focus trap + Escape key + focus restore ─────────────────────────────────
  // Runs when drawer opens. Cleanup fires when it closes, restoring focus to
  // the hamburger button so keyboard users don't lose their place.

  useEffect(() => {
    if (!open) return;

    const drawer = drawerRef.current;
    if (!drawer) return;

    const getFocusable = () =>
      Array.from(drawer.querySelectorAll<HTMLElement>(FOCUSABLE));

    // Move focus into the drawer immediately
    getFocusable()[0]?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;

      const focusable = getFocusable();
      if (!focusable.length) {
        e.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      hamburgerRef.current?.focus();
    };
  }, [open]);

  // ───────────────────────────────────────────────────────────────────────────

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
            className="logo font-black text-2xl font-display p-1 my-4 mr-6 tracking-wider text-text-primary uppercase leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            onMouseEnter={handleLogoEnter}
            onMouseLeave={handleLogoLeave}
          >
            {siteInfo.company.nickname}
          </TransitionLink>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center self-end gap-0.5">
            {nav.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                pathname={pathname}
                className="hover:text-text-inverse dark:hover:text-text-primary font-medium p-5 relative overflow-hidden before:absolute before:inset-0 before:-z-10 before:transform before:scale-y-0 before:origin-bottom before:transition-transform before:duration-300 before:ease-in-out hover:before:scale-y-100 hover:before:origin-top before:bg-(--color-primary-500) transition-all"
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex grow justify-end self-center items-center gap-4">
            <div className="flex items-center gap-4 text-xs">
              <a
                href={siteInfo.contact.phoneHref}
                className="flex items-center gap-1 font-medium text-text-primary hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label={`Call ${siteInfo.contact.phone}`}
              >
                <PhoneOutlined aria-hidden="true" className="text-lg xl:text-sm" />
                <span className="hidden text-sm 2xl:inline">
                  {siteInfo.contact.phone}
                </span>
              </a>
              <a
                href={`mailto:${siteInfo.contact.email}`}
                className="flex items-center gap-1 font-medium text-text-primary hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label={`Email ${siteInfo.contact.email}`}
              >
                <MailOutlined aria-hidden="true" className="text-lg xl:text-sm" />
                <span className="hidden text-sm 2xl:inline">
                  {siteInfo.contact.email}
                </span>
              </a>
            </div>
            <Button variant="primary" size="sm">
              <TransitionLink href="/contact">Get a Quote</TransitionLink>
            </Button>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          ref={hamburgerRef}
          className="lg:hidden flex flex-col justify-center gap-1.5 w-8 h-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls={DRAWER_ID}
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

      {/* Backdrop — always in DOM so it can fade out in sync with the drawer */}
      <div
        className={`fixed inset-0 z-40 bg-bg-inset/80 backdrop-blur-xs lg:hidden transition-opacity duration-300 ease-in-out ${open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile drawer */}
      <nav
        ref={drawerRef}
        id={DRAWER_ID}
        className={`fixed top-16 right-0 z-40 h-full w-72 bg-bg-base shadow-xl transition-transform duration-300 ease-in-out lg:hidden ${open ? "translate-x-0" : "translate-x-full"
          }`}
        aria-label="Mobile navigation"
        aria-modal={open ? true : undefined}
        aria-hidden={!open}
        // inert removes all children from tab order and AT when drawer is closed,
        // preventing keyboard users from reaching off-screen content.
        inert={!open || undefined}
      >
        <div className="flex flex-col gap-1 p-6">
          {nav.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              pathname={pathname}
              onClick={() => setOpen(false)}
            >
              <span className="block py-2 text-lg">{item.label}</span>
            </NavLink>
          ))}
        </div>

        <div className="px-6 text-sm text-text-muted flex flex-col space-y-2">
          <Button variant="primary" size="sm">
            <TransitionLink href="/contact">Get a Quote</TransitionLink>
          </Button>

          <div className="flex flex-col gap-3 mt-6">
            <a
              href={siteInfo.contact.phoneHref}
              className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <PhoneOutlined aria-hidden="true" className="text-base shrink-0" />
              <span>{siteInfo.contact.phone}</span>
            </a>

            <div className="flex items-center gap-2 text-text-muted">
              <MailOutlined aria-hidden="true" className="text-base shrink-0" />
              <CopyEmailButton email={siteInfo.contact.email} />
            </div>

            <div className="flex items-center gap-1 mt-2 -ml-2">
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

            <p className="mt-2">{siteInfo.contact.address.street}</p>
            <p className="-mt-2">{siteInfo.contact.address.location}</p>
          </div>
        </div>
      </nav>
    </>
  );
}
