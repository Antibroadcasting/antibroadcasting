"use client";

import { useEffect, useLayoutEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

  if (theme === "light" || (theme === "system" && prefersLight)) {
    root.classList.add("light");
  } else {
    root.classList.remove("light");
  }

  root.dataset.theme = theme;
}

export function useTheme() {
  // Always start as "system" so the server render and initial client render
  // match (no hydration mismatch). useLayoutEffect then syncs the real value
  // synchronously before the browser paints — no visible flash.
  const [theme, setThemeState] = useState<Theme>("system");

  useLayoutEffect(() => {
    const stored = (localStorage.getItem("theme") as Theme | null) ?? "system";
    // One-time read of localStorage (unavailable during SSR) to sync React
    // state with what the inline <head> script already applied to the DOM —
    // not a candidate for the "compute during render" pattern since the
    // value genuinely isn't known until the client mounts.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setThemeState(stored);
    // applyTheme is mostly a no-op here since the inline <head> script already
    // set the class, but it keeps data-theme and the class list in sync.
    applyTheme(stored);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
    const handleChange = () => {
      const current = (localStorage.getItem("theme") as Theme | null) ?? "system";
      if (current === "system") applyTheme("system");
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    localStorage.setItem("theme", next);
    applyTheme(next);
  };

  return { theme, setTheme };
}
