"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePageTransition } from "./PageTransitionProvider";
import type { ComponentPropsWithoutRef } from "react";

type Props = Omit<ComponentPropsWithoutRef<typeof Link>, "onClick"> & {
  href: string;
  onClick?: () => void;
};

export const TransitionLink = forwardRef<HTMLAnchorElement, Props>(
  function TransitionLink({ href, children, onClick, ...props }, ref) {
    const router = useRouter();
    const { startTransition } = usePageTransition();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Let modifier-key clicks fall through (new tab, etc.)
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      // Skip transition on same-page links — prevent default to avoid flash of light mode
      if (
        new URL(href.toString(), window.location.origin).pathname ===
        window.location.pathname
      ) {
        e.preventDefault();
        return;
      }
      e.preventDefault();
      onClick?.();
      startTransition(() => router.push(href.toString()));
    };

    return (
      <Link ref={ref} href={href} onClick={handleClick} {...props}>
        {children}
      </Link>
    );
  },
);
