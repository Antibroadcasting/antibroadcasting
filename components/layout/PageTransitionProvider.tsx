"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

const FLOOD_MS = 400;
const PRINT_MS = 400;
// Safety valve: if the pathname never changes (e.g. same-route double-click),
// force-remove the overlay after this long.
const STUCK_TIMEOUT_MS = FLOOD_MS + PRINT_MS + 1500;

type TransitionContextValue = {
  startTransition: (navigate: () => void) => void;
};

const TransitionContext = createContext<TransitionContextValue>({
  startTransition: (fn) => fn(),
});

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const activeFloodRef = useRef<Animation | null>(null);
  const printPhaseRef = useRef<(() => void) | null>(null);
  const transitionIdRef = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    if (!printPhaseRef.current) return;
    const startPrint = printPhaseRef.current;
    printPhaseRef.current = null;
    requestAnimationFrame(startPrint);
  }, [pathname]);

  const startTransition = useCallback((navigate: () => void) => {
    // Cancelling the flood prevents its onfinish from firing, which would
    // otherwise call navigate() for the old destination and potentially
    // consume the new transition's printPhaseRef.
    activeFloodRef.current?.cancel();
    activeFloodRef.current = null;
    overlayRef.current?.remove();
    overlayRef.current = null;
    printPhaseRef.current = null;

    const id = ++transitionIdRef.current;

    const overlay = document.createElement("div");
    // pointer-events:all blocks clicks reaching links beneath the overlay
    // while the wipe is in progress, preventing mid-transition re-triggers.
    overlay.style.cssText =
      "position:fixed;inset:0;z-index:90;background:var(--bg-subtle);pointer-events:all;transform:translateY(-100%)";
    document.body.appendChild(overlay);
    overlayRef.current = overlay;

    const flood = overlay.animate(
      [{ transform: "translateY(-100%)" }, { transform: "translateY(0)" }],
      { duration: FLOOD_MS, easing: "ease-out", fill: "forwards" },
    );
    activeFloodRef.current = flood;

    flood.onfinish = () => {
      // Guard: a newer transition already took over.
      if (transitionIdRef.current !== id) return;
      activeFloodRef.current = null;

      const executePrint = () => {
        if (transitionIdRef.current !== id) return;
        overlay.style.pointerEvents = "none";
        const print = overlay.animate(
          [{ transform: "translateY(0)" }, { transform: "translateY(100%)" }],
          { duration: PRINT_MS, easing: "ease-out", fill: "forwards" },
        );
        print.onfinish = () => {
          overlay.remove();
          if (overlayRef.current === overlay) overlayRef.current = null;
        };
      };

      printPhaseRef.current = executePrint;
      navigate();

      // Safety valve: if the pathname never changes (same-route navigate,
      // network error, etc.) force-remove the overlay so it can't stay stuck.
      setTimeout(() => {
        if (printPhaseRef.current === executePrint) {
          printPhaseRef.current = null;
          overlay.remove();
          if (overlayRef.current === overlay) overlayRef.current = null;
        }
      }, STUCK_TIMEOUT_MS);
    };
  }, []);

  return (
    <TransitionContext.Provider value={{ startTransition }}>
      {children}
    </TransitionContext.Provider>
  );
}

export const usePageTransition = () => useContext(TransitionContext);
