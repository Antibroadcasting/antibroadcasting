// Developer / infrastructure config only.
// Editorial content (company info, contact, social, SEO, business rules, form options)
// lives in content/site-info.json and is accessed via lib/get-site-info.ts.

export const siteConfig = {
  // Website Configuration
  site: {
    // Interim launch domain — antibroadcasting.com isn't attached yet.
    // Differs per deployment (staging vs. production fork each have their
    // own Vercel domain), so it's env-driven rather than hardcoded. Swap
    // the fallback back to the custom domain once it's live everywhere.
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://antibroadcasting.vercel.app",
    baseUrl: "https://antibroadcasting.com",
    domain: "antibroadcasting.com",
    titleTemplate: "%s | Antibroadcasting Inc.",
    language: "en",
    locale: "en_US",
  },

  // Navigation — route definitions belong in code
  navigation: [
    { label: "Portfolio", href: "/portfolio" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
export type NavigationItem = (typeof siteConfig.navigation)[0];
